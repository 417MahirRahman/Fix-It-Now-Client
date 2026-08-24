# FixItNow — Frontend

FixItNow is a web-based service booking platform that connects customers with technicians. Customers can browse available technicians and services, view technician profiles, book services, make payments, and leave reviews after completed jobs.

> **Live Site:** [Live Link](https://fix-it-now-client.vercel.app/)

> **API Documentation:** See [`API Endpoints.md`](./API%20Endpoints.md)

---

## ✨ Features

### 👤 Customer
- Register and log in securely
- Browse available technicians
- Filter technicians by service type, location, and rating
- View detailed technician profiles
- View technician services, pricing, availability, ratings, and reviews
- Book a service
- View booking details and booking status
- Cancel a requested booking
- Make payments through Stripe
- View payment history
- Leave a review after completing a service
- Manage personal profile information

### 🧑‍🔧 Technician
- Manage technician profile and experience information
- Create and manage services
- Set availability
- View customer bookings
- Accept or decline booking requests
- Update booking status
- View customer information and reviews
- Manage technician service listings

### 🛡️ Admin
- Manage users
- Ban or unban users
- View all bookings
- Manage service categories
- View platform statistics

---

## 🛠️ Tech Stack

This frontend is built with:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React**
- **Stripe** payment integration through the backend API

The project was originally bootstrapped with `create-next-app` and uses Next.js App Router. The existing project also uses `next/font` for font optimization. fileciteturn3file0L1-L21

---

## 📁 Project Structure

A simplified structure of the frontend:

```text
.
├── app/
│   ├── allTechnicians/
│   ├── customer-dashboard/
│   ├── technician-dashboard/
│   ├── admin-dashboard/
│   └── ...
├── components/
│   └── ui/
├── public/
├── .env.local
├── package.json
├── next.config.*
├── tsconfig.json
└── README.md
```

> The exact structure may contain additional components, routes, and utility files depending on the current version of the project.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd YOUR_REPOSITORY_NAME
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or with Yarn:

```bash
yarn install
```

Or with pnpm:

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000
```

Replace the value with your deployed backend URL when using the production API.

> **Important:** Do not commit `.env.local` or private secrets to GitHub.

### 4. Start the development server

```bash
npm run dev
```

The original Next.js setup also supports `yarn dev`, `pnpm dev`, and `bun dev`. fileciteturn3file0L5-L17

Open:

```text
http://localhost:3000
```

The Next.js development server runs the application locally at this address. fileciteturn3file0L17-L19

---

## 🔗 Backend API

The frontend communicates with the FixItNow backend through the environment variable:

```env
NEXT_PUBLIC_BACKEND_API_URL
```

Example:

```env
NEXT_PUBLIC_BACKEND_API_URL=https://your-backend-url.com
```

For the available backend endpoints, authentication requirements, bookings, payments, reviews, technician management, and admin APIs, see:

**[`API Endpoints.md`](./API%20Endpoints.md)**

---

## 💳 Payments

FixItNow uses Stripe for payment processing through the backend API.

The frontend requests a checkout session from the backend and redirects the customer to the Stripe checkout page.

Payment-related API endpoints are documented in:

[`API Endpoints.md`](./API%20Endpoints.md)

---

## ⭐ Reviews & Ratings

Customers can submit a review after completing a booking.

Reviews contain:

- Customer information
- Rating from 1–5
- Optional review text
- Creation date
- Associated technician

Technician profile pages display the technician's reviews and average rating.

---

## 📅 Booking Flow

A typical customer booking flow is:

```text
Browse Technicians
       ↓
Select Technician
       ↓
Choose Service
       ↓
Create Booking
       ↓
Technician Accepts Request
       ↓
Customer Makes Payment
       ↓
Service Is Completed
       ↓
Customer Leaves Review
```

A requested booking can also be cancelled by the customer:

```text
Requested
    ↓
Cancelled
```

Cancelled bookings can be excluded from active booking lists while remaining stored in the database for history.

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Before deploying, make sure the production backend URL is configured correctly in the deployment environment:

```env
NEXT_PUBLIC_BACKEND_API_URL=https://your-production-backend-url.com
```

---

## 📚 API Documentation

All backend endpoints used by the application are documented separately:

👉 **[`API Endpoints.md`](./API%20Endpoints.md)**

This keeps the frontend README focused on installation, usage, features, and development while keeping API details in one dedicated document.

---

**FixItNow — Connecting customers with trusted technicians.**
