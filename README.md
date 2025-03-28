# To-Do App

A simple To-Do application built with Flutter for the frontend and Node.js with MongoDB for the backend.

## Features
- User authentication (Sign Up, Login, Logout)
- Secure password storage with bcrypt
- Token-based authentication using JWT
- Task management functionalities (to be implemented)

## Tech Stack
### Frontend (Flutter)
- Dart
- Flutter framework
- HTTP package for API calls
- Shared Preferences for local storage
- VelocityX for UI components

### Backend (Node.js)
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Nodemon for development

## Setup Instructions
### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/Siddiqui145/todo_mongo.git
   ```
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   flutter pub get
   ```
3. Run the app:
   ```bash
   flutter run
   ```

## API Endpoints
### Authentication
- **POST** `/register` - Register a new user
- **POST** `/login` - Login user and receive JWT token

## Environment Variables
Create a `.env` file in the backend directory and set up the following variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Project Structure
```
├── frontend
│   ├── lib
│   │   ├── main.dart
│   │   ├── login_page.dart
│   │   ├── registration.dart
│   │   ├── dashboard.dart
│   │   ├── config.dart
├── backend
│   ├── models
│   │   ├── user.model.js
│   ├── routes
│   │   ├── user.router.js
│   ├── services
│   │   ├── user.services.js
│   ├── configurations
│   │   ├── db.js
│   ├── app.js
│   ├── index.js
```

## Future Improvements
- Task management features
- UI enhancements
- Deploying the backend to a cloud service
- Implementing password reset functionality

## License
This project is licensed under the MIT License.
