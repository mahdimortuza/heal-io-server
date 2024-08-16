# Heal.io server

## Description

Heal.io server is the backend application, developed for the people who want to buy their products online.
This application is built using TypeScript, Node.js, Express.js, and MongoDB. The application uses Mongoose for data modeling, JWT for API security, bcrypt for password hashing, and Nodemailer for sending emails to users. The codebase is organized using a modular pattern.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Tests](#tests)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/mahdimortuza/heal-io-server.git
   ```
2. Navigate to the project directory
   ```bash
   cd heal-io-server
   ```
3. Install the dependencies
   ```bash
   npm install
   ```
4. Set up the environment variables (see [Environment Variables](#environment-variables))
5. Start the server
   ```bash
   npm run start:dev
   ```

## Scripts

## Running the server

### To build the server, use:

```bash
npm run build
```

### To start the server in development mode, use:

```bash
npm run start:dev
```

### To start the server in production mode, use:

```bash
npm run start:prod
```

### To fix code using ESlint, use:

```bash
npm run lint:fix
```

### To fix code using Prettier, use:

```bash
npm run prettier:fix
```

## Environment Variables

### Setup your environment variables in the .env.example file and rename the file to .env

- `NODE_DEV`=development
- `PORT`=Port number the server listens on. Default: 5000
- `DATABASE_URL`=URI for MongoDB database.
- `BCRYPT_SALT_ROUND`=12
- `DEFAULT_PASSWORD`=Default password
- `JWT_ACCESS_SECRET`=Secret key for JWT access token generation.
- `JWT_REFRESH_SECRET`=Secret key for JWT refresh token generation.
- `JWT_ACCESs_EXPIRES_IN`=JWT access token expiration time
- `JWT_REFRESH_EXPIRES_IN`=JWT refresh token expiration time
- `CLOUDINARY_CLOUD_NAME`=Your cloud name
- `CLOUDINARY_API_KEY`=Your cloud api key
- `CLOUDINARY_API_SECRET`=Your API secret
- `SUPER_ADMIN_PASSWORD`=your super admin password

# API Documentation

## User management endpoints

- API Endpoints:

  - POST `/api/v1/users/create-user`

    - Description: Creates an user and returns user data.
    - Request:
      ```json
      {
        "name": "Alice Johnson",
        "email": "icse@example.com",
        "password": "123456",
        "photo": "https://example.com/photos/alice.jpg"
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "User created successfully!",
        "data": {
          "name": "Alice Johnson",
          "email": "icse@example.com",
          "password": "",
          "photo": "https://example.com/photos/alice.jpg",
          "isDeleted": false,
          "role": "user",
          "_id": "66beacd2979999fad64da4d7",
          "__v": 0
        }
      }
      ```

  - get `/api/v1/user`

    - Description: Returns all users (only admin can retrieve data)

  - get `/api/v1/user/:id`

    - Description: Returns users (only admin can retrieve data)

  - patch `/api/v1/user/:id`

    - Description: update single user (only admin can update data)

  - delete `/api/v1/user/:id`
    - Description: update single user (only admin can update data)

## Get me endpoint

- API Endpoints:

  - GET `/api/v1/user/me`

    - Description: Get the information of current users (all user can see this).
    - Request:

      - requests with access token

## Authentication endpoints

- API Endpoints:

  - POST `/api/v1/auth/login`

  - Description: Login user, admin, super admin.
    - Request:
      ```json
      {
        "email": "example@gmail.com",
        "password": "123"
      }
      ```

- POST `/api/v1/auth/refresh-token`

  - Description: Get refresh token user, students, studentPlus, admin, super admin.
    - Request:
      ```json
      {
        "email": "example@gmail.com",
        "password": "123"
      }
      ```

## Products management

- API Endpoints:

  - POST `/api/v1/product/create-product`

  - Description: Creates products.

    - Request:

      ```json
      {
        "name": "Test",
        "slug": "test",
        "description": "Zabres offers a unique formula designed to enhance your daily health with a balance of essential nutrients.",
        "metaKey": "essential nutrients, daily health, unique formula, Zabres",
        "discount": 0.22,
        "stockStatus": true,
        "ProductDetail": [
          {
            "photo": "https://raw.githubusercontent.com/mahdimortuza/heal-io-client/main/src/assets/product%20image/zabres%202.webp",
            "variant": "66bc97e44324b62b7008bb7d",
            "price": "16.99"
          },
          {
            "photo": "https://raw.githubusercontent.com/mahdimortuza/heal-io-client/main/src/assets/product%20image/zabres1.webp",
            "variant": "66bc97e44324b62b7008bb7d",
            "price": "21.99"
          }
        ],
        "category": "66bc80c8ca0547c8e33efc71"
      }
      ```

    - GET `/api/v1/product`

      - Description: Get all subject names for quiz.

    - GET `/api/v1/product/:id`

      - Description: Get single subject name for quiz.

    - PATCH `/api/v1/product/:id`

      - Description: Update single subject for quiz.

    - DELETE `/api/v1/product/:id`

      - Description: Delete single subject name for quiz.

## Category management

- API Endpoints:

  - POST `/api/v1/category/create-category`

  - Description: Creates a category.

    - Request:

      ```json
      {
        "name": "tertiary",
        "slug": "tertiary",
        "thumbnail": "/uploads/aspirin-thumbnail.jpg"
      }
      ```

    - GET `/api/v1/category`

      - Description: Get all category names for category.

    - GET `/api/v1/category:id`

      - Description: Get single category.

    - PATCH `/api/v1/category:id`

      - Description: Update single

    - DELETE `/api/v1/category:id`

      - Description: Delete single category.

## Variant management

- API Endpoints:

  - POST `/api/v1/variant/create-variant`

  - Description: Creates a variant.

    - Request:

      ```json
      {
        "variant": "1000"
      }
      ```

    - GET `/api/v1/variant`

      - Description: Get all variant names for variant.

    - GET `/api/v1/variant/:id`

      - Description: Get single variant.

    - PATCH `/api/v1/variant/:id`

      - Description: Update single

    - DELETE `/api/v1/variant/:id`

      - Description: Delete single variant.

# Dependencies:

- `bcrypt`: Library for hashing passwords.
- `cors`: Express middleware for enabling CORS.
- `dotenv`: Loads environment variables from .env file.
- `express`: Web framework for Node.js.
- `jsonwebtoken`: Library for generating and verifying JWT tokens.
- `mongoose`: MongoDB driver for Node.js.
- `cookie-parser`: To send token to client.
- `http-status`: HTTP status sends status code in response.
- `zod`: Zod is a JavaScript validation library.

# Tests

- No test cases are written yet.
