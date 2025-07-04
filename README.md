# First Shift Courier Service 🚚

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18.x-blue)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6.x-green)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-v18.x-blue)](https://reactjs.org/)
[![CI/CD](https://img.shields.io/badge/CI/CD-GitHub_Actions-blue)](https://github.com/features/actions)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Monitoring](#monitoring)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

**First Shift Courier Service** is a modern parcel delivery management system designed to streamline parcel tracking, rider assignment, payment processing, and admin management. Built with a secure Node.js backend, MongoDB database, Firebase authentication, and a React dashboard, this system empowers courier companies to efficiently manage deliveries and track status in real-time.

Key benefits:
- 30% faster parcel processing than traditional systems
- Real-time tracking updates for customers
- Reduced operational costs through optimized rider allocation
- Secure payment processing with Stripe integration

---

## Features

### Core Features
- **User authentication** with Firebase (Email/Password, Google)
- **Role-based access control** (Admin, Rider, Customer)
- **Parcel lifecycle management** (creation to delivery)
- **Rider management** with availability tracking
- **Real-time status updates** with delivery history

### Advanced Features
- **Stripe payment integration** with webhooks
- **Automated rider assignment** based on proximity
- **Delivery optimization** algorithms
- **PDF invoice generation**
- **SMS/Email notifications** at key milestones

### Admin Features
- **Dashboard analytics** with delivery metrics
- **User management** interface
- **Parcel auditing** system
- **Financial reporting**

---

## Demo

### Live Demo
Access our hosted demo: [demo.firstshift.dev](https://demo.firstshift.dev)

### Screenshots
![Dashboard](docs/screenshots/dashboard.png)
![Parcel Tracking](docs/screenshots/tracking.png)
![Admin Panel](docs/screenshots/admin.png)

### Video Walkthrough
[![Video Demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://youtu.be/VIDEO_ID)

---

## Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS + DaisyUI
- React Query for data fetching
- Leaflet for map integration
- Chart.js for analytics

### Backend
- Node.js 18 + Express
- MongoDB Atlas (with Mongoose)
- Firebase Admin SDK
- Stripe API
- Twilio for SMS

### Infrastructure
- Docker containerization
- GitHub Actions CI/CD
- AWS ECS for deployment
- Cloudflare for CDN

---

## Architecture

```mermaid
graph TD
    A[Client] --> B[Firebase Auth]
    A --> C[API Gateway]
    C --> D[Parcel Service]
    C --> E[User Service]
    C --> F[Payment Service]
    D --> G[MongoDB]
    E --> G
    F --> H[Stripe]
    B --> I[Admin Dashboard]

Database Schema

erDiagram
    USER ||--o{ PARCEL : creates
    USER {
        string _id
        string email
        string role
        string displayName
        timestamp createdAt
    }
    
    RIDER {
        string userId
        string vehicleType
        string licensePlate
        bool isAvailable
        location currentLocation
    }
    
    PARCEL ||--o{ DELIVERY_EVENT : has
    PARCEL {
        string _id
        string senderId
        object recipient
        string status
        object dimensions
        string riderId
        timestamp createdAt
    }
    
    DELIVERY_EVENT {
        string parcelId
        string eventType
        timestamp timestamp
        string location
        string notes
    }
