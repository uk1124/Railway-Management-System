# Railway Management System

A Railway Management System built with Node.js, Express.js, and MySQL. Users can register, log in, check train availability, book seats, and get booking details. Admins can add trains and update train details. This system handles race conditions and concurrent bookings.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Setup](#setup)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Assumptions](#assumptions)

## Features

- User Registration and Login
- Role-based Access Control (Admin and User)
- Add and Update Trains (Admin)
- Check Seat Availability (User)
- Book Seats (User)
- Get Booking Details (User)
- Real-time concurrency handling for bookings

## Tech Stack

- Node.js
- Express.js
- MySQL
- JWT for Authentication
- Sequelize ORM (Promise-based Node.js ORM for MySQL)
- Bcrypt (Library to hash passwords)

## Requirements

- Node.js and npm
- MySQL Server
- Postman or cURL for API Testing

## Setup

**1. Clone the Repository:**

```bash
git clone https://github.com/uk1124/Railway-Management-System.git
```

**2. Install Dependencies:**

```bash
npm install
```

**3. Create a .env File:**

Create a .env file in the root directory with the following variables:

    PORT = 4000
    DB_HOST = localhost
    DB_USER = root
    DB_PASSWORD = yourpassword
    DB_NAME = railway_db
    JWT_SECRET = your_jwt_secret
    ADMIN_API_KEY = your_admin_api_key

**4. Set Up the MySQL Database:**

- Ensure MySQL is running.

- Create the database:

```sql
    CREATE DATABASE railway_db;
```

## Running the Project

**1. Start the Server:**

```bash
   node app.js
```

You should see:

    Initializing Sequelize connection...
    Connection has been established successfully.
    Database sync complete.
    Server is running on port 4000

**2. Test the API Endpoints:**

Use Postman or cURL to test the endpoints (details below).

### API Endpoints

#### (i) User Registration

- Endpoint: POST /api/auth/register

- Body:

  ```json
  {
    "username": "user1",
    "password": "password123",
    "role": "user"
  }
  ```

#### (ii) User Login

- Endpoint: POST /api/auth/login

- Body:

  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```

- Response:

  ```json
  {
    "token": "jwt_token"
  }
  ```

#### (iii) Add a New Train (Admin Only)

- Endpoint: POST /api/admin/addTrain

- Headers:

  - x-api-key: your_admin_api_key

- Body:

  ```json
  {
    "name": "Express Train",
    "source": "Station A",
    "destination": "Station B",
    "totalSeats": 100
  }
  ```

#### (iv) Get Seat Availability

- Endpoint: POST /api/user/getSeatAvailability

- Headers:

  - Authorization: Bearer jwt_token

- Body:

  ```json
  {
    "source": "Station A",
    "destination": "Station B"
  }
  ```

#### (v) Book a Seat

- Endpoint: POST /api/user/bookSeat

- Headers:

  - Authorization: Bearer jwt_token

- Body:

  ```json
  {
    "trainId": 1
  }
  ```

#### (vi) Get Booking Details

- Endpoint: GET /api/user/getBookingDetails

- Headers:

  - Authorization: Bearer jwt_token

## Assumptions

- The database schema will be recreated every time the server starts (force: true in development). Remove force: true in production.

- The ADMIN_API_KEY is securely shared with the admin users.

- Passwords are securely hashed using bcrypt.
