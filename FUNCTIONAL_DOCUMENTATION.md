# Pariksha - Online Test Portal
## Functional Documentation

### Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Database Schema](#database-schema)
4. [API Documentation](#api-documentation)
5. [Frontend Components](#frontend-components)
6. [Authentication & Authorization](#authentication--authorization)
7. [Test Management System](#test-management-system)
8. [Question Management](#question-management)
9. [User Management](#user-management)
10. [Response & Feedback System](#response--feedback-system)
11. [Security Features](#security-features)
12. [Deployment & Configuration](#deployment--configuration)

---

## Project Overview

**Pariksha** is a comprehensive online examination platform built with React.js frontend and Node.js/Express.js backend. The system provides a secure, feature-rich environment for conducting online tests with real-time monitoring and anti-cheating measures.

### Key Features
- **Multi-role System**: Admin and Student roles with different access levels
- **Secure Authentication**: JWT-based authentication with Google OAuth integration
- **Test Management**: Create, schedule, and manage online tests
- **Question Bank**: Comprehensive question management with categories
- **Real-time Monitoring**: Webcam integration for test integrity
- **Anti-cheating Measures**: Tab switching detection and reporting
- **Responsive Design**: Material-UI based modern interface
- **File Upload Support**: Image uploads for questions and tests

### Technology Stack
- **Frontend**: React.js, Material-UI, React Router, React Webcam
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, Google OAuth
- **File Storage**: AWS S3 (via multer-s3)
- **Database**: MongoDB
- **Deployment**: Netlify (Frontend), Heroku (Backend)

---

## System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │◄──►│  Express API    │◄──►│   MongoDB       │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Netlify CDN   │    │   AWS S3        │
│   (Static Host) │    │   (File Storage)│
└─────────────────┘    └─────────────────┘
```

### Component Structure
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
└── server/                 # Node.js Backend
    ├── controller/         # Business logic
    ├── model/             # Database models
    ├── routes/            # API routes
    └── views/             # EJS templates
```

---

## Database Schema

### User Model
```javascript
{
  name: String,
  phoneNumber: Number,
  email: String,
  password: String,
  profileUrl: String,
  whatsAppNumber: Number,
  github: String,
  behance: String,
  skills: String,
  timestamps: true
}
```

### Test Model
```javascript
{
  title: String (unique),
  mandatoryCategory: [String],
  optionalCategory: [String],
  startTime: Number (timestamp),
  endTime: Number (timestamp),
  description: String,
  testUrl: String (S3 URL),
  timestamps: true
}
```

### Question Model
```javascript
{
  question: String (required),
  one: String (required),
  two: String (required),
  three: String (required),
  four: String (required),
  correct: String (required),
  category: String (required),
  QuestionPic: String (S3 URL)
}
```

### Response Model
```javascript
{
  userId: ObjectId,
  testId: ObjectId,
  hasAttempted: Boolean (default: false),
  switchCounter: Number (default: 0),
  questions: [ObjectId],
  responses: [{
    question: String,
    response: String,
    status: String
  }],
  timestamps: true
}
```

### Feedback Model
```javascript
{
  UserId: ObjectId,
  name: String,
  email: String,
  quality: String,
  feedback: String
}
```

---

## API Documentation

### Base URL
- **Development**: `http://localhost:3000`
- **Production**: `https://your-api-domain.com`

### Authentication Endpoints

#### POST `/api/register`
Register a new user
```json
{
  "name": "John Doe",
  "phoneNumber": "1234567890",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/login`
User login
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/api/v1/auth/google`
Google OAuth login
```json
{
  "token": "google_id_token"
}
```

### Student Endpoints (Protected)

#### GET `/api/student/tests`
Get available tests for student

#### GET `/api/student/test/:id`
Get specific test details

#### GET `/api/student/test-token/:id`
Get test access token (validates timing)

#### POST `/api/student/submit-feedback`
Submit feedback
```json
{
  "quality": "good|average|bad",
  "feedback": "Feedback text"
}
```

### Test Endpoints (Protected)

#### GET `/api/test/get-questions`
Get questions for current test session

#### POST `/api/test/submit-responses`
Submit answer responses
```json
{
  "responses": [{
    "question": "question_id",
    "response": "selected_option"
  }]
}
```

#### POST `/api/test/end-test`
End test session
```json
{
  "responses": [{
    "question": "question_id",
    "response": "selected_option"
  }]
}
```

#### PATCH `/api/test/unfairAttempt`
Report unfair attempt (tab switching)

### Admin Endpoints (Protected)

#### Question Management
- `POST /api/admin/add-question` - Add single question
- `POST /api/admin/upload-questions` - Bulk upload via CSV
- `GET /api/admin/questions` - Get all questions
- `PUT /api/admin/question/:id` - Update question
- `DELETE /api/admin/question/:id` - Delete question
- `GET /api/admin/category` - Get question categories

#### Test Management
- `POST /api/admin/test` - Create new test
- `GET /api/admin/tests` - Get all tests
- `PUT /api/admin/test/:id` - Update test
- `DELETE /api/admin/test/:id` - Delete test

#### User Management
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/user/:id` - Update user
- `DELETE /api/admin/user/:id` - Delete user

#### Analytics
- `GET /api/admin/count` - Get entity counts
- `GET /api/admin/feedbacks` - Get all feedbacks
- `GET /api/admin/responses` - Get all responses
- `GET /api/admin/get-result/:id` - Get test results

---

## Frontend Components

### Student Components

#### Home Component (`/components/home.js`)
- **Purpose**: Landing page with login functionality
- **Features**:
  - Email/password login form
  - Google OAuth integration
  - Form validation
  - Responsive design

#### Dashboard Component (`/components/dashboard.js`)
- **Purpose**: Student test dashboard
- **Features**:
  - Display available tests
  - Show test timing and duration
  - Test status (ongoing/expired)
  - Test selection and navigation

#### Questions Component (`/components/questions.js`)
- **Purpose**: Test taking interface
- **Features**:
  - Question navigation
  - Answer selection
  - Timer display
  - Auto-save functionality
  - Webcam integration
  - Anti-cheating measures

#### Feedback Component (`/components/feedback.js`)
- **Purpose**: Post-test feedback collection
- **Features**:
  - Quality rating selection
  - Text feedback input
  - Form submission

### Admin Components

#### Main Dashboard (`/components/admin/Main.js`)
- **Purpose**: Admin overview dashboard
- **Features**:
  - Entity count display (users, questions, tests, responses, feedbacks)
  - Statistics visualization
  - Quick access to management sections

#### Question Management
- **Create** (`/components/admin/question/Create.js`): Add new questions
- **Manage** (`/components/admin/question/Manage.js`): View, edit, delete questions

#### Test Management
- **Create** (`/components/admin/test/Create.js`): Create new tests
- **Manage** (`/components/admin/test/Manage.js`): Manage existing tests

#### User Management (`/components/admin/User.js`)
- **Purpose**: User administration
- **Features**:
  - User listing
  - User profile management
  - User deletion

#### Results (`/components/admin/Result.js`)
- **Purpose**: Test results and analytics
- **Features**:
  - Response analysis
  - Score calculation
  - Performance metrics

---

## Authentication & Authorization

### Authentication Flow
1. **User Registration/Login**: Users can register with email/password or use Google OAuth
2. **Token Generation**: JWT tokens are generated upon successful authentication
3. **Token Storage**: Tokens are stored in localStorage
4. **Route Protection**: Protected routes check for valid tokens
5. **Token Validation**: Middleware validates tokens on each protected request

### Authorization Levels
- **Public Routes**: Home, Login, Registration
- **Student Routes**: Dashboard, Test taking, Feedback
- **Admin Routes**: All management functions, Analytics

### Security Measures
- JWT token expiration (1 day for regular users, test duration for test tokens)
- Password validation (minimum 5 characters)
- Email format validation
- Phone number validation (10 digits)
- CORS configuration for cross-origin requests

---

## Test Management System

### Test Creation Process
1. **Admin creates test** with:
   - Title (unique)
   - Description
   - Start and end times
   - Mandatory and optional categories
   - Test image (optional)

2. **Time validation**:
   - End time must be after start time
   - Test duration cannot exceed 24 hours

3. **Question selection**:
   - Questions are randomly selected from specified categories
   - 5 questions per mandatory category
   - Additional questions from optional categories

### Test Execution Flow
1. **Student selects test** from dashboard
2. **Time validation** checks if test is currently active
3. **Test token generation** with test-specific expiration
4. **Question loading** with random selection
5. **Answer submission** with real-time saving
6. **Test completion** with automatic submission

### Test Security Features
- **Time-based access control**: Tests can only be accessed during specified time windows
- **One attempt per user**: Users cannot retake the same test
- **Real-time monitoring**: Webcam integration for test integrity
- **Tab switching detection**: Automatic reporting of suspicious behavior
- **Auto-submission**: Tests are automatically submitted when time expires

---

## Question Management

### Question Structure
Each question contains:
- **Question text**: The main question content
- **Four options**: Multiple choice options (one, two, three, four)
- **Correct answer**: The correct option identifier
- **Category**: Question classification for test organization
- **Image support**: Optional image attachment for visual questions

### Question Categories
- Questions are organized by categories (e.g., "Programming", "Mathematics", "General Knowledge")
- Categories are used for test configuration
- Admin can filter and manage questions by category

### Bulk Upload
- **CSV Support**: Questions can be uploaded in bulk via CSV files
- **Format**: CSV must contain columns for question, options, correct answer, and category
- **Validation**: Server validates CSV format before processing

---

## User Management

### User Registration
- **Required fields**: Name, phone number, email, password
- **Optional fields**: Profile URL, WhatsApp number, GitHub, Behance, skills
- **Validation**: Email format, phone number length, password strength

### User Profiles
- **Profile information**: Basic user details and contact information
- **Social links**: GitHub and Behance profile integration
- **Skills**: User skill set information

### Admin User Management
- **User listing**: View all registered users
- **User editing**: Update user information
- **User deletion**: Remove users from the system
- **User statistics**: Track user registration and activity

---

## Response & Feedback System

### Response Tracking
- **Answer storage**: All user responses are stored with timestamps
- **Question tracking**: System tracks which questions were presented
- **Response status**: Tracks whether questions were answered, marked, or skipped
- **Switch counter**: Monitors tab switching behavior

### Feedback Collection
- **Quality rating**: Users rate test quality (good/average/bad)
- **Text feedback**: Optional detailed feedback text
- **User identification**: Feedback linked to user account

### Results Processing
- **Automatic scoring**: System calculates scores based on correct answers
- **Result compilation**: Results are compiled with user information
- **Performance metrics**: Detailed analysis of test performance

---

## Security Features

### Anti-Cheating Measures
1. **Webcam Integration**: Continuous video monitoring during tests
2. **Tab Switching Detection**: Automatic detection and reporting of tab switches
3. **Time-based Access**: Tests can only be accessed during specified time windows
4. **One Attempt Policy**: Users cannot retake completed tests
5. **Real-time Monitoring**: Continuous surveillance during test sessions

### Data Security
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: Passwords are stored securely (though current implementation uses plain text - needs improvement)
- **CORS Protection**: Configured CORS policies
- **Input Validation**: Server-side validation of all inputs
- **File Upload Security**: Secure file upload with AWS S3 integration

### Session Management
- **Token Expiration**: Automatic token expiration
- **Session Cleanup**: Proper cleanup of test sessions
- **Local Storage Management**: Secure handling of client-side data

---

## Deployment & Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=3000
DB_CONNECT=mongodb://localhost:27017/pariksha
TOKEN_SECRET=your_jwt_secret
CLIENT_ID=your_google_client_id
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_s3_bucket
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
PUBLIC_URL=/
```

### Deployment Process

#### Backend Deployment (Heroku)
1. Configure environment variables
2. Set up MongoDB Atlas connection
3. Configure AWS S3 for file storage
4. Deploy using Heroku CLI

#### Frontend Deployment (Netlify)
1. Build React application
2. Configure environment variables
3. Deploy to Netlify
4. Set up custom domain (optional)

### Database Setup
1. **MongoDB Atlas**: Set up cloud MongoDB instance
2. **Connection String**: Configure connection in environment variables
3. **Collections**: System will create collections automatically
4. **Indexes**: Consider adding indexes for performance optimization

---

## API Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Pagination Response
```json
{
  "success": true,
  "results": [...],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

---

## Error Handling

### Client-Side Error Handling
- **Form Validation**: Real-time form validation with user feedback
- **API Error Handling**: Comprehensive error handling for API calls
- **User Feedback**: Toast notifications for success/error messages
- **Fallback UI**: Graceful degradation for failed operations

### Server-Side Error Handling
- **Validation Errors**: Detailed validation error messages
- **Database Errors**: Proper error handling for database operations
- **File Upload Errors**: Error handling for file upload operations
- **Authentication Errors**: Secure error messages for auth failures

---

## Performance Considerations

### Frontend Optimization
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Optimized images and lazy loading
- **Bundle Size**: Minimized JavaScript bundle size
- **Caching**: Local storage for test data

### Backend Optimization
- **Database Indexing**: Proper indexing for query performance
- **Pagination**: Paginated responses for large datasets
- **File Storage**: Efficient file storage with AWS S3
- **Memory Management**: Proper cleanup of resources

---

## Future Enhancements

### Recommended Improvements
1. **Password Security**: Implement proper password hashing (bcrypt)
2. **Real-time Features**: WebSocket integration for live updates
3. **Advanced Analytics**: Detailed performance analytics
4. **Mobile App**: React Native mobile application
5. **Offline Support**: Offline test taking capabilities
6. **Advanced Anti-cheating**: AI-powered cheating detection
7. **Multi-language Support**: Internationalization
8. **API Rate Limiting**: Implement rate limiting for API endpoints
9. **Database Optimization**: Query optimization and caching
10. **Monitoring**: Application performance monitoring

### Security Enhancements
1. **HTTPS Enforcement**: Force HTTPS in production
2. **Input Sanitization**: Enhanced input sanitization
3. **SQL Injection Prevention**: Additional security measures
4. **XSS Protection**: Cross-site scripting prevention
5. **CSRF Protection**: Cross-site request forgery protection

---

## Conclusion

Pariksha is a comprehensive online examination platform that provides a secure, feature-rich environment for conducting online tests. The system's modular architecture, robust security features, and user-friendly interface make it suitable for educational institutions and organizations requiring online assessment capabilities.

The documentation above provides a complete overview of the system's functionality, architecture, and implementation details, serving as a comprehensive guide for developers, administrators, and users of the platform.
