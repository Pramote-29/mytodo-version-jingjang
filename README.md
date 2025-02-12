# Express Authentication API

## Project Overview

This is a Node.js authentication API built with Express, Prisma, and JWT, providing secure user registration and login functionality.

## Features

- User registration with email validation
- Secure password hashing
- JWT-based authentication
- Login with credential validation
- Error handling middleware

## Technologies Used

- Express.js
- Prisma ORM
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cors
- dotenv

## Prerequisites

- Node.js (v14 or later)
- npm
- PostgreSQL or another Prisma-supported database

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd <project-directory>
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=5001
DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_jwt_secret_key"
```

## Project Structure

- `src/controllers/auth.controller.js`: Authentication logic for registration and login
- `src/middleware/auth.middleware.js`: JWT authentication middleware
- `src/middleware/validation.middleware.js`: Input validation middleware
- `src/middleware/error.middleware.js`: Centralized error handling
- `src/routes/auth.routes.js`: API route definitions
- `src/server.js`: Express server setup

## API Endpoints

### Registration
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- **Validations:**
  - Email is required
  - Password must be at least 6 characters
  - Valid email format

### Login
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

## Authentication Flow

1. User registers with email, password, and name
2. Password is hashed before storing in the database
3. JWT token is generated upon successful registration/login
4. Token is valid for 1 day
5. Subsequent authenticated requests require the token in the Authorization header

## Error Handling

- 400 status: Validation errors
- 401 status: Authentication failures
- 500 status: Server errors

## Running the Server

```bash
npm start
```

## Security Considerations

- Passwords are hashed using bcrypt
- JWT tokens are signed with a secret key
- Middleware validates and sanitizes input
- Centralized error handling prevents information leakage

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

[Specify your license here]