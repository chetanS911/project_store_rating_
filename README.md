# Store Rating Web Application

This is a full-stack web application designed as a platform for users to rate and review stores. The application features a robust role-based access control system, a secure RESTful API, and a dynamic React frontend.

## Features

The application supports three distinct user roles, each with a specific set of permissions and functionalities.

### System Administrator
* **Dashboard:** View key statistics including the total number of users, stores, and ratings.
* **User Management:** Create new users of any role (Admin, Store Owner, Normal User) and view a complete list of all registered users.
* **Store Management:** Add new stores to the platform and view a complete list of all registered stores.

### Normal User
* **Authentication:** Secure sign-up and login functionality.
* **Store Discovery:** View a list of all stores, complete with their overall average rating and the user's own submitted rating.
* **Search:** Search for stores by name or address.
* **Rating System:** Submit and modify ratings (from 1 to 5) for any store.
* **Profile:** Update their own password after logging in.

### Store Owner
* **Authentication:** Secure login functionality.
* **Dashboard:** Access a dedicated dashboard that displays the store's overall average rating and total number of ratings.
* **Customer Insights:** View a list of all users who have submitted a rating for their specific store.
* **Profile:** Update their own password after logging in.

## Tech Stack

This project is built with a modern, industry-standard technology stack.

* **Backend:** **Express.js** (Node.js)
* **Frontend:** **React.js**
* **Database:** **PostgreSQL**
* **ORM:** **Sequelize** for database management.
* **Authentication:** **JSON Web Tokens (JWT)** for secure API access.
* **Password Security:** **bcryptjs** for one-way password hashing.

## Project Structure

The project is organized into two main directories:

```
/
├── backend/      # Express.js REST API
└── frontend/     # React.js Client Application
```

## Setup and Installation

Follow these steps to get the project running on your local machine.

### Prerequisites

* Node.js (v14 or later)
* npm
* Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd store-rating-app
```

### 2. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a file named `.env` in the `backend` directory and add the following variables.

    ```env
    # The port your backend server will run on
    PORT=5000

    # Your PostgreSQL database connection string (e.g., from Neon, ElephantSQL, or a local instance)
    DATABASE_URL="postgres://user:password@host:port/dbname"

    # A long, random, and secret string for signing JWTs
    JWT_SECRET="your_super_secret_jwt_key_here"
    ```

4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The server should be running at `http://localhost:5000`.

### 3. Frontend Setup

1.  **Open a new terminal window** and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the frontend development server:**
    ```bash
    npm start
    ```
    The React application will open in your browser at `http://localhost:3000`.

## API Endpoints

The backend provides a RESTful API with the following primary routes:

| Method | Endpoint                    | Description                                  | Access         |
| :----- | :-------------------------- | :------------------------------------------- | :------------- |
| `POST` | `/api/auth/signup`          | Register a new Normal User.                  | Public         |
| `POST` | `/api/auth/login`           | Log in any user to receive a JWT.            | Public         |
| `GET`  | `/api/stores`               | Get a list of all stores with ratings.       | Normal User    |
| `POST` | `/api/stores/:id/rate`      | Submit or update a rating for a store.       | Normal User    |
| `GET`  | `/api/admin/stats`          | Get dashboard statistics.                    | System Admin   |
| `GET`  | `/api/admin/users`          | Get a list of all users.                     | System Admin   |
| `POST` | `/api/admin/users`          | Create a new user.                           | System Admin   |
| `GET`  | `/api/admin/stores`         | Get a list of all stores.                    | System Admin   |
| `POST` | `/api/admin/stores`         | Create a new store.                          | System Admin   |
| `GET`  | `/api/owner/dashboard`      | Get dashboard data for the logged-in owner.  | Store Owner    |
| `PUT`  | `/api/users/password`       | Update the logged-in user's password.        | Any Logged-in  |
