# Round-Robin Coupon Distribution with Abuse Prevention

## 📌 Overview

A **live web application** that distributes coupons in a **round-robin manner** while preventing abuse through **IP tracking and cookies**. Users can claim coupons **without logging in**, and safeguards are in place to prevent multiple claims within a restricted time frame.

![preview](preview.png)

## 🚀 Features

- **Round-Robin Coupon Assignment**: Ensures fair distribution.
- **Guest Access**: No login required.
- **Abuse Prevention Mechanisms**:
  - **IP Tracking**: Restricts multiple claims from the same IP.
  - **Cookie-Based Tracking**: Prevents users from bypassing restrictions.
- **User Feedback**: Displays claim success messages and timers for reattempts.
- **Admin Panel**: Allows admins to add and manage coupons.
- **Deployment Ready**: Hosted on a live server.

## 🛠️ Tech Stack

- **Frontend**: Next.js (TypeScript)
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Auth & Tracking**: Cookies & IP Address Logging

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/adarshdotdev/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies

```bash
yarn install  # or npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```
DATABASE_URL=postgresql://user:password@localhost:5432/db_name

```

### 4️⃣ Apply Prisma Migrations

```bash
npx prisma migrate dev --name init
```

### 5️⃣ Run the Development Server

```bash
yarn dev  # or npm run dev
```
