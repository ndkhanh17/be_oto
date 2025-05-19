# Car Dealership Backend API

This is the backend API for the Car Dealership website. It provides endpoints for managing cars, users, dealerships, and news.

## Setup Instructions

1. Install dependencies:
   \`\`\`
   cd be
   npm install
   \`\`\`

2. Create uploads directories:
   \`\`\`
   mkdir -p uploads/cars uploads/news
   \`\`\`

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     \`\`\`
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/otodat
     JWT_SECRET=your_jwt_secret_key_here
     JWT_EXPIRES_IN=7d
     \`\`\`

4. Start the server:
   \`\`\`
   npm run dev
   \`\`\`

## API Documentation

### Authentication

- **Register User**
  - `POST /api/auth/register`
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123", "phone": "1234567890" }`

- **Login User**
  - `POST /api/auth/login`
  - Body: `{ "email": "john@example.com", "password": "password123" }`

- **Get Current User**
  - `GET /api/auth/me`
  - Headers: `Authorization: Bearer {token}`

### Cars

- **Get All Cars**
  - `GET /api/cars?page=1&limit=10&sort=createdAt&order=desc`

- **Get Car by ID**
  - `GET /api/cars/:id`

- **Create Car**
  - `POST /api/cars`
  - Headers: `Authorization: Bearer {token}`
  - Body: Form data with car details and images

- **Update Car**
  - `PUT /api/cars/:id`
  - Headers: `Authorization: Bearer {token}`
  - Body: Form data with car details and images

- **Delete Car**
  - `DELETE /api/cars/:id`
  - Headers: `Authorization: Bearer {token}`

### Users

- **Get All Users (Admin)**
  - `GET /api/users?page=1&limit=10`
  - Headers: `Authorization: Bearer {token}`

- **Get User by ID (Admin)**
  - `GET /api/users/:id`
  - Headers: `Authorization: Bearer {token}`

- **Create User (Admin)**
  - `POST /api/users`
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123", "phone": "1234567890", "role": "user" }`

- **Update User (Admin)**
  - `PUT /api/users/:id`
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ "name": "John Doe", "email": "john@example.com", "phone": "1234567890", "role": "user" }`

- **Delete User (Admin)**
  - `DELETE /api/users/:i
