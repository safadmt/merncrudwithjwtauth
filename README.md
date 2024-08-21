# CRUD with Authentication 

This is a full-stack CRUD application built with PostgreSQL, Express.js, React.js, and Prisma ORM. The application features role-based authentication using JWT and validations using Joi (server-side) and Yup (frontend). The app allows admin and user interactions with different permissions.

## Features

### Admin
- **Role-based Authentication**: Admin can log in and access admin-specific routes and functionalities.
- **Product Management**: Admin can create, edit, and soft delete products.
- **User Management**: Admin can view a list of all users and manage them.
- **Product Viewing**: Admin can also view a list of all products.

### User
- **Authentication**: Users can sign up and log in to the application.
- **Product Viewing**: Users can view a list of available products.

## Technologies Used

### Backend
- **Express.js**: Web framework for building RESTful APIs.
- **PostgreSQL**: Relational database for storing application data.
- **Prisma ORM**: Used for database interactions with PostgreSQL.
- **JWT (JSON Web Tokens)**: For securing routes and managing role-based authentication.
- **Joi**: For server-side validation of incoming data.

### Frontend
- **React.js**: JavaScript library for building user interfaces.
- **Yup**: For form validation on the frontend.

## Installation

### Backend Setup
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
