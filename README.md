# 🎓 Pariksha - Online Examination Platform

[![GitHub Pages](https://github.com/amolsr/pariksha/actions/workflows/github-pages.yml/badge.svg)](https://github.com/amolsr/pariksha/actions/workflows/github-pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-17.0.2-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.12.10-green.svg)](https://www.mongodb.com/)

> A comprehensive online examination platform built with React.js and Node.js, featuring secure test administration, real-time monitoring, and advanced anti-cheating measures.

## 🌟 Live Demo

**Frontend**: [https://amolsr.github.io/pariksha/](https://amolsr.github.io/pariksha/)  
**API Documentation**: [Postman Collection](https://raw.githubusercontent.com/amolsr/pariksha/main/server/bin/Quiz.postman_collection.json)

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Security Features](#-security-features)
- [Contributing](#-contributing)
- [License](#-license)
- [Contributors](#-contributors)

## ✨ Features

### 🎯 Core Functionality
- **Multi-Role System**: Separate interfaces for students and administrators
- **Test Management**: Create, schedule, and manage online examinations
- **Question Bank**: Comprehensive question management with categories
- **Real-time Testing**: Live test sessions with automatic submission
- **Results & Analytics**: Detailed performance analysis and reporting

### 🔒 Security & Monitoring
- **JWT Authentication**: Secure token-based authentication
- **Google OAuth**: Social login integration
- **Anti-Cheating Measures**: Webcam monitoring and tab switching detection
- **Time-based Access**: Tests accessible only during specified time windows
- **One Attempt Policy**: Prevents test retakes

### 📱 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Material-UI**: Modern and intuitive user interface
- **Real-time Updates**: Live progress tracking and notifications
- **File Upload Support**: Image attachments for questions and tests
- **Feedback System**: Post-test feedback collection

## 🛠 Technology Stack

### Frontend
- **React.js 17.0.2** - User interface library
- **Material-UI 4.11.4** - Component library
- **React Router 5.2.0** - Client-side routing
- **React Webcam 5.2.4** - Camera integration
- **React Google Login 5.2.2** - OAuth integration

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.17.1** - Web framework
- **MongoDB 5.12.10** - Database
- **Mongoose 5.12.10** - ODM
- **JWT 8.5.1** - Authentication
- **AWS S3** - File storage

### Development Tools
- **Nodemon** - Development server
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Multer** - File upload handling

## 📁 Project Structure

```
pariksha/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components
│   │   │   ├── admin/      # Admin-specific components
│   │   │   └── student/    # Student-specific components
│   │   ├── helper/         # API helpers and utilities
│   │   ├── routes/         # Route protection
│   │   └── images/         # Static assets
│   └── public/             # Public assets
├── server/                 # Node.js Backend
│   ├── controller/         # Business logic
│   ├── model/             # Database models
│   ├── routes/            # API routes
│   └── views/             # EJS templates
├── .github/               # GitHub workflows
└── docs/                  # Documentation
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Git

### Clone the Repository
```bash
git clone https://github.com/amolsr/pariksha.git
cd pariksha
```

### Backend Setup
```bash
cd server
npm install
```

### Frontend Setup
```bash
cd client
npm install
```

## ⚙️ Configuration

### Environment Variables

Create `.env` file in the `server` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DB_CONNECT=mongodb://localhost:27017/pariksha

# JWT Secret
TOKEN_SECRET=your_jwt_secret_key

# Google OAuth
CLIENT_ID=your_google_client_id

# AWS S3 (Optional)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_s3_bucket
```

Create `.env` file in the `client` directory:

```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
PUBLIC_URL=/
```

## 🎮 Usage

### Development Mode

1. **Start the Backend Server**
```bash
cd server
npm run dev
```

2. **Start the Frontend Development Server**
```bash
cd client
npm start
```

3. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api

### Production Deployment

1. **Build the Frontend**
```bash
cd client
npm run build
```

2. **Start the Production Server**
```bash
cd server
npm start
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/api/v1/auth/google` - Google OAuth login

### Student Endpoints
- `GET /api/student/tests` - Get available tests
- `GET /api/student/test/:id` - Get test details
- `POST /api/student/submit-feedback` - Submit feedback

### Test Endpoints
- `GET /api/test/get-questions` - Get test questions
- `POST /api/test/submit-responses` - Submit answers
- `POST /api/test/end-test` - End test session

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `POST /api/admin/add-question` - Add question
- `GET /api/admin/tests` - Get all tests
- `GET /api/admin/analytics` - Get analytics data

For complete API documentation, see the [Postman Collection](https://raw.githubusercontent.com/amolsr/pariksha/main/server/bin/Quiz.postman_collection.json).

## 🔐 Security Features

### Authentication & Authorization
- JWT-based authentication with configurable expiration
- Role-based access control (Student/Admin)
- Google OAuth integration
- Password validation and security

### Anti-Cheating Measures
- Webcam integration for test monitoring
- Tab switching detection and reporting
- Time-based test access control
- One attempt per test policy
- Real-time session monitoring

### Data Protection
- Input validation and sanitization
- CORS configuration
- Secure file upload handling
- Error handling and logging

## 🧪 Testing

### Run Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

### Test Coverage
- Unit tests for controllers and utilities
- Integration tests for API endpoints
- Component tests for React components

## 🚀 Deployment

### Frontend (Netlify)
1. Build the React application
2. Deploy to Netlify
3. Configure environment variables
4. Set up custom domain (optional)

### Backend (Heroku)
1. Configure environment variables
2. Set up MongoDB Atlas
3. Deploy using Heroku CLI
4. Configure AWS S3 for file storage

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

| Username | Name | Role |
|----------|------|------|
| [@amolsr](https://github.com/amolsr) | Amol Saini | Lead Developer |
| [@ripu502](https://github.com/ripu502) | Ripudaman Singh | Co-Developer |

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/amolsr/pariksha/issues) page
2. Create a new issue with detailed description
3. Contact the maintainers

## 🔮 AI-Powered Product Roadmap

### 🤖 Phase 1: Intelligent Question Generation & Content Creation (Q1 2025)
- [ ] **AI Question Generator**: Leverage RAG (Retrieval-Augmented Generation) from [learning-rags](https://github.com/amolsr/learning-rags) repository to automatically generate questions from educational content
- [ ] **Smart Content Scraping**: Integrate web scraping capabilities from [web-scrapping](https://github.com/amolsr/web-scrapping) repository to gather educational materials from various sources
- [ ] **Adaptive Question Difficulty**: AI-powered difficulty assessment and automatic question calibration
- [ ] **Multi-format Question Support**: Generate questions in multiple formats (MCQ, True/False, Fill-in-the-blanks, Essay)

### 🧠 Phase 2: Advanced AI Proctoring & Monitoring (Q2 2025)
- [ ] **Behavioral Analysis AI**: Real-time analysis of student behavior patterns during exams
- [ ] **Intelligent Cheating Detection**: Advanced ML models to detect suspicious activities beyond basic tab switching
- [ ] **Facial Recognition & Emotion Analysis**: AI-powered emotion detection to identify stress, confusion, or cheating attempts
- [ ] **Voice Analysis**: Audio monitoring for unauthorized communication or assistance

### 📊 Phase 3: Real-time Analytics & Event Processing (Q3 2025)
- [ ] **Kafka Event Streaming**: Integrate [kafka-event-processing](https://github.com/amolsr/kafka-event-processing) for real-time exam event monitoring
- [ ] **Live Performance Analytics**: Real-time student performance tracking and insights
- [ ] **Predictive Analytics**: AI models to predict student performance and identify at-risk students
- [ ] **Automated Alert System**: Smart notifications for administrators based on exam events

### 🎯 Phase 4: Personalized Learning & Adaptive Testing (Q4 2025)
- [ ] **Adaptive Test Engine**: AI-powered dynamic question selection based on student performance
- [ ] **Personalized Learning Paths**: RAG-based recommendation system for study materials
- [ ] **Intelligent Feedback Generation**: AI-generated personalized feedback for each student
- [ ] **Learning Gap Analysis**: AI identification of knowledge gaps and suggested remediation

### 🚀 Phase 5: Advanced AI Features (2026)
- [ ] **Natural Language Processing**: AI-powered essay evaluation and open-ended question assessment
- [ ] **Multilingual AI Support**: Automatic translation and localization of questions and content
- [ ] **Voice-to-Text Integration**: AI-powered speech recognition for accessibility
- [ ] **AI Tutoring Assistant**: Intelligent chatbot for student queries and guidance

### 🔧 Technical Integration Points
- **RAG System**: Utilize the learning-rags repository for knowledge retrieval and question generation
- **Web Scraping**: Leverage web-scrapping tools for content aggregation and question bank expansion
- **Event Processing**: Implement kafka-event-processing for real-time monitoring and analytics
- **AI Model Integration**: Connect with OpenAI, Anthropic, or open-source LLMs for advanced capabilities

### 📈 Success Metrics
- 40% reduction in question creation time through AI automation
- 60% improvement in cheating detection accuracy
- 50% increase in student engagement through personalized experiences
- 30% reduction in administrative workload through AI automation

---

**Made with ❤️ by Team Trojan**
