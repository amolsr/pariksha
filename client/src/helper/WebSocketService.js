import io from 'socket.io-client';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.mediaRecorder = null;
    this.stream = null;
    this.recordingInterval = null;
  }

  connect(token) {
    if (this.socket && this.isConnected) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      this.socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
        transports: ['websocket'],
        auth: {
          token: token
        }
      });

      this.socket.on('connect', () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        resolve();
      });

      this.socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
        this.isConnected = false;
        reject(error);
      });

      this.socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
        this.isConnected = false;
        this.stopVideoStreaming();
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.stopVideoStreaming();
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  async startVideoStreaming() {
    if (!this.isConnected) {
      throw new Error('WebSocket not connected');
    }

    try {
      // Get user media
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 15, max: 30 }
        },
        audio: false
      });

      // Create MediaRecorder
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: 'video/webm;codecs=vp8',
        videoBitsPerSecond: 250000 // 250kbps
      });

      // Handle data available
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && this.isConnected) {
          this.socket.emit('videoStream', {
            chunk: event.data
          });
        }
      };

      // Start recording in chunks
      this.mediaRecorder.start(1000); // 1 second chunks

      // Send stream info to server
      this.socket.emit('videoStream', {
        type: 'info',
        width: 640,
        height: 480,
        frameRate: 15
      });

      console.log('Video streaming started');
      return this.stream;
    } catch (error) {
      console.error('Error starting video stream:', error);
      throw error;
    }
  }

  stopVideoStreaming() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    if (this.recordingInterval) {
      clearInterval(this.recordingInterval);
      this.recordingInterval = null;
    }

    console.log('Video streaming stopped');
  }

  sendStreamUpdate(data) {
    if (this.isConnected) {
      this.socket.emit('streamUpdate', data);
    }
  }

  // Method to get the video stream for display
  getVideoStream() {
    return this.stream;
  }

  // Method to check if streaming is active
  isStreaming() {
    return this.mediaRecorder && this.mediaRecorder.state === 'recording';
  }
}

// Create singleton instance
const webSocketService = new WebSocketService();
export default webSocketService;
