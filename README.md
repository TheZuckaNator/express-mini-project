# Express REST API

A RESTful API built with Express.js featuring JWT authentication, MongoDB integration, and comprehensive error handling.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Error Handling](#error-handling)
- [Testing with Postman](#testing-with-postman)

## Features

- Token-based authentication using JSON Web Tokens (JWT)
- Password hashing with bcrypt
- MongoDB database integration with Mongoose ODM
- RESTful route design following industry conventions
- Centralized error handling middleware
- Protected routes requiring authentication
- Input validation and sanitization

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd express-api
npm install
```

## Configuration

Create a `.env` file in the root directory based on the provided `.env.example`:

```bash
cp .env.example .env
```

Update the environment variables according to your setup:

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port number | 5005 |
| MONGODB_URI | MongoDB connection string | mongodb://127.0.0.1:27017/express-api-db |
| TOKEN_SECRET | Secret key for JWT signing | (required - set your own) |

## Running the Application

Development mode with auto-reload:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will start on the configured port (default: http://localhost:5005).

## API Reference

### Authentication Routes

#### Create Account

```
POST /auth/signup
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

Response (201 Created):

```json
{
  "message": "User created successfully",
  "user": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Login

```
POST /auth/login
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (200 OK):

```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Verify Token

```
GET /auth/verify
```

Headers:

```
Authorization: Bearer <token>
```

Response (200 OK):

```json
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
  "email": "user@example.com",
  "name": "John Doe"
}
```

### User Routes

All user routes require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

#### Get All Users

```
GET /api/users
```

Response (200 OK):

```json
[
  {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Get User by ID

```
GET /api/users/:id
```

Response (200 OK):

```json
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### Update User

```
PUT /api/users/:id
```

Note: Users can only update their own profile.

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

Response (200 OK):

```json
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
  "email": "jane@example.com",
  "name": "Jane Doe",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:45:00.000Z"
}
```

#### Delete User

```
DELETE /api/users/:id
```

Note: Users can only delete their own account.

Response (200 OK):

```json
{
  "message": "User deleted successfully"
}
```

## Project Structure

```
express-api/
├── config/
│   └── db.config.js        # Database connection setup
├── middleware/
│   ├── error.middleware.js # Error handling middleware
│   └── jwt.middleware.js   # JWT authentication middleware
├── models/
│   └── User.model.js       # User schema definition
├── routes/
│   ├── auth.routes.js      # Authentication endpoints
│   ├── index.routes.js     # Root endpoint
│   └── user.routes.js      # User CRUD endpoints
├── .env.example            # Environment variables template
├── .gitignore
├── package.json
├── README.md
└── server.js               # Application entry point
```

## Error Handling

The API implements centralized error handling with appropriate HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Resource created |
| 400 | Bad request / Validation error |
| 401 | Unauthorized / Invalid credentials |
| 403 | Forbidden / Access denied |
| 404 | Resource not found |
| 409 | Conflict / Duplicate resource |
| 500 | Internal server error |

Error responses follow a consistent format:

```json
{
  "message": "Description of the error"
}
```

## Testing with Postman

To test the API endpoints using Postman:

1. Create a new Postman Collection for this project
2. Add a collection variable called `baseUrl` with value `http://localhost:5005`
3. Add a collection variable called `authToken` (leave empty initially)

For authenticated requests, add the following to the Authorization tab:
- Type: Bearer Token
- Token: {{authToken}}

Suggested testing workflow:

1. POST to `/auth/signup` to create a new user
2. POST to `/auth/login` to obtain a token
3. Copy the token and set it as the `authToken` collection variable
4. Test protected routes (GET, PUT, DELETE on `/api/users`)
