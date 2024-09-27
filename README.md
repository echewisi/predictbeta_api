# PredictBeta API

This is the backend API for the PredictBeta platform, built using NestJS, TypeORM, and MySQL. It provides authentication, user management, and product management functionalities.

## Table of Contents

- [PredictBeta API](#predictbeta-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Clone the Repository](#clone-the-repository)
    - [Install dependencies](#install-dependencies)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
  - [Database Migrations](#database-migrations)
  - [Testing](#testing)
    - [End-to-End Testing](#end-to-end-testing)
    - [Unit Testing](#unit-testing)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)

## Features

- **Authentication**: User registration and login with JWT-based authentication.
- **Role-based Access Control**: Admin and user roles for managing permissions.
- **User Management**: CRUD operations for user profiles.
- **Product Management**: CRUD operations for products with association to users.
- **Database Migrations**: TypeORM migrations for managing database schema changes.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MySQL](https://www.mysql.com/) database

### Clone the Repository

```bash
git clone https://github.com/yourusername/predictbeta-api.git
cd predictbeta-api
```

### Install dependencies
```npm install```

## Configuration
Create a ```.env``` file in the root directory and provide the following environment variables:
```DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME= your db
JWT_SECRET=your_jwt_secret
```
though this application runs in an environment facilitated by cloud variables that are already established and running.

## Running the Application
```npm run start``` or watch mode:  ```npm run start:dev```

## API Endpoints
**Authentication**
*Register*: POST /auth/register
Body: { "firstName": "John", "lastName": "Doe", "email": "john@example.com", "password": "password" }
*Login*: POST /auth/login
Body: { "email": "john@example.com", "password": "password" }

**User Management**
*Get All Users*: GET /users (Admin only)
*Get User by ID*: GET /users/:id
*Update User*: PATCH /users/:id
*Delete User*: DELETE /users/:id (Admin only)

**Product Management**
*Create Product*: POST /products
Body: { "name": "Product Name", "description": "Product Description", "price": 100.00 }
*Get All Products*: GET /products
*Get Product by ID*: GET /products/:id
*Update Product*: PATCH /products/:id
*Delete Product*: DELETE /products/:id (Admin only)

## Database Migrations
Generate a New Migration for user
```npm migration:generate-user```

Generate a New Migration for product
```npm migration:generate-product```

run migrations
```npm run migration:run
```

revert migrations
```npm run migration:revert
```

## Testing
### End-to-End Testing
```npm run test:e2e```

### Unit Testing
```npm run test
```


## Technologies Used
1. NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
2. TypeORM: An ORM that runs in NodeJS and allows you to interact with your database using TypeScript.
3. MySQL: A relational database management system used to store application data.
4. Jest: A testing framework for JavaScript, providing unit and end-to-end testing capabilities.
5. Supertest: An HTTP assertion library for testing Node.js HTTP servers.

## Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Open a Pull Request.