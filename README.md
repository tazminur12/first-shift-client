# First Shift Courier Service 🚚

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18.x-blue)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6.x-green)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-v18.x-blue)](https://reactjs.org/)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

**First Shift Courier Service** is a modern parcel delivery management system designed to streamline parcel tracking, rider assignment, payment processing, and admin management. Built with a secure Node.js backend, MongoDB database, Firebase authentication, and a React dashboard, this system empowers courier companies to efficiently manage deliveries and track status in real-time.

---

## Features

- User authentication and role-based access (Admin, Rider, User)
- Parcel management: create, update, delete, track parcels
- Rider management: assign riders, track availability and status
- Real-time parcel delivery status updates and history
- Payment integration with Stripe
- Firebase ID Token verification for secure API access
- Dashboard with parcel stats, user roles, and delivery overview
- Responsive and modern React UI with Tailwind CSS
- Role-based API authorization middleware

---

## Demo

> _Coming soon_: Hosted demo URL or screenshots/videos can be added here.

---

## Tech Stack

| Frontend               | Backend                | Database      | Authentication | Payment Gateway |
|------------------------|------------------------|---------------|----------------|-----------------|
| React 18 + Tailwind CSS| Node.js + Express      | MongoDB Atlas | Firebase Admin | Stripe          |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account or local MongoDB setup
- Firebase project with admin SDK JSON file
- Stripe account with API keys

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tazminur12/first-shift-courier-service.git
   cd first-shift-courier-service
````

2. Install backend dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../client
   npm install
   ```

---

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=3000
DB_USER=yourMongoDBUsername
DB_PASSWORD=yourMongoDBPassword
PAYMENT_GATEWAY_KEY=yourStripeSecretKey
FIREBASE_ADMIN_SDK_PATH=./firebase_admin_key.json
```

* Replace `yourMongoDBUsername` and `yourMongoDBPassword` with your MongoDB Atlas credentials.
* Replace `yourStripeSecretKey` with your Stripe secret key.
* Place your Firebase Admin SDK JSON file as `firebase_admin_key.json` inside the `server` folder or update the path accordingly.

---

## Running the Application

From the `server` directory:

```bash
npm start
```

From the `client` directory:

```bash
npm run dev
```

---

## API Documentation

### Authentication

* Uses Firebase ID Tokens for authentication.
* All protected routes require the `Authorization: Bearer <token>` header.

### Key Endpoints

| Method | Endpoint                 | Description                             | Auth Required | Role        |
| ------ | ------------------------ | --------------------------------------- | ------------- | ----------- |
| GET    | `/`                      | Server status                           | No            | All         |
| GET    | `/users/search`          | Search users by email (partial match)   | No            | All         |
| POST   | `/users`                 | Add new user                            | No            | All         |
| GET    | `/users`                 | Get all users                           | Yes           | Admin only  |
| PATCH  | `/users/:id/role`        | Update user role                        | Yes           | Admin only  |
| GET    | `/parcels`               | Get parcels (filter by email, status)   | Yes           | User/Admin  |
| POST   | `/parcels`               | Create new parcel                       | Yes           | User/Admin  |
| PATCH  | `/parcels/:id/assign`    | Assign rider to parcel                  | Yes           | Admin only  |
| PATCH  | `/parcels/:id/status`    | Update parcel delivery status           | Yes           | Admin/Rider |
| DELETE | `/parcels/:id`           | Delete parcel                           | Yes           | Admin only  |
| POST   | `/payments`              | Record payment and update parcel status | Yes           | User/Admin  |
| POST   | `/create-payment-intent` | Create Stripe payment intent            | Yes           | User/Admin  |
| GET    | `/dashboard-data`        | Get dashboard stats                     | No            | All         |

> For full API details, please check the source code or API documentation folder (if available).

---

## Folder Structure

```
/server
  |-- firebase_admin_key.json
  |-- controllers/
  |-- middlewares/
  |-- models/
  |-- routes/
  |-- utils/
  |-- server.js

/client
  |-- src/
      |-- components/
      |-- hooks/
      |-- pages/
      |-- services/
      |-- App.jsx
      |-- main.jsx
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch

   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes

   ```bash
   git commit -m "Add some feature"
   ```
4. Push to your branch

   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request

> Please ensure your code follows existing style guidelines and passes tests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

Created by **Tazminur Rahman Tanim** — feel free to reach out!

* 📧 Email: [tanimkhalifa55@gmail.com](mailto:tanimkhalifa55@gmail.com)
* 💻 GitHub: [https://github.com/tazminur12](https://github.com/tazminur12)
* 🔗 LinkedIn: [https://linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
