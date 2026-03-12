
<div align="center">

<!-- Project Banner -->
<!-- <img src="admin/public/screenshot-for-readme.png" alt="Project Banner" /> -->

<!-- Mobile Stack -->
<div>
<img src="https://img.shields.io/badge/-React%20Native-61DBFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/-Expo-000020?style=for-the-badge&logo=expo&logoColor=white"/>
<img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/-NativeWind-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
</div>

<!-- Backend Stack -->
<div>
<img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/-MongoDB-00A35C?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/-Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white"/>
<img src="https://img.shields.io/badge/-Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white"/>
</div>

<h3>🛒 Full-Stack E-Commerce App (Mobile + Admin + API)</h3>

A **production-style full-stack e-commerce platform** built with  
**React Native (Expo), Node.js, Express, MongoDB, Stripe, and Clerk**.

This project includes:

📱 Customer Mobile App  
🛠️ Admin Dashboard  
⚙️ REST API Backend

<i>Designed with modern architecture, scalable APIs, and secure authentication.</i>

</div>

---

# 📋 Table of Contents

- [📋 Table of Contents](#-table-of-contents)
- [✨ Introduction](#-introduction)
- [⚙️ Tech Stack](#️-tech-stack)
  - [📱 Mobile App](#-mobile-app)
  - [🖥️ Admin Dashboard](#️-admin-dashboard)
  - [⚙️ Backend](#️-backend)
- [📱 Mobile App](#-mobile-app-1)
    - [Key Screens](#key-screens)
    - [Mobile Features](#mobile-features)
- [🖥️ Admin Dashboard](#️-admin-dashboard-1)
    - [Pages](#pages)
    - [Admin Features](#admin-features)
- [⚙️ Backend API](#️-backend-api)
    - [API Routes](#api-routes)
- [🔋 Core Features](#-core-features)
    - [📱 Customer Features](#-customer-features)
    - [🛠️ Admin Features](#️-admin-features)
    - [⚙️ Backend Features](#️-backend-features)
- [💳 Payment Flow](#-payment-flow)
- [🧱 Project Structure](#-project-structure)
- [🤸 Quick Start](#-quick-start)
  - [Prerequisites](#prerequisites)
- [1️⃣ Clone Repository](#1️⃣-clone-repository)
- [2️⃣ Setup Backend](#2️⃣-setup-backend)
- [3️⃣ Setup Admin Dashboard](#3️⃣-setup-admin-dashboard)
- [4️⃣ Setup Mobile App](#4️⃣-setup-mobile-app)
- [🧠 Architecture Overview](#-architecture-overview)
    - [Backend](#backend)
    - [Mobile App](#mobile-app)
    - [Admin Dashboard](#admin-dashboard)
- [🚀 Future Enhancements](#-future-enhancements)
- [🤝 Contribution](#-contribution)
- [🔗 Contacts](#-contacts)
- [⭐ Show Your Support](#-show-your-support)

---

# ✨ Introduction

**Expo Ecommerce** is a **full-stack e-commerce platform** featuring:

- 📱 **Customer Mobile App**
- 🛠️ **Admin Dashboard**
- ⚙️ **Backend REST API**

Users can:

- Browse products
- Add items to cart
- Manage wishlist
- Checkout securely using Stripe
- Track order history
- Manage addresses
- Leave product reviews

Admins can:

- Manage products
- View orders
- Manage customers
- Monitor analytics

The system is built using a **modern full-stack architecture** with authentication, payments, image storage, and background jobs.

---

# ⚙️ Tech Stack

## 📱 Mobile App

- **React Native + Expo**
- **Expo Router**
- **TypeScript**
- **NativeWind (Tailwind for RN)**
- **TanStack React Query**
- **Stripe React Native SDK**
- **Clerk Authentication**
- **Sentry Monitoring**
- **Expo Image**

---

## 🖥️ Admin Dashboard

- **React + Vite**
- **React Router**
- **TanStack React Query**
- **TailwindCSS**
- **DaisyUI**
- **Clerk Authentication**
- **Lucide Icons**

---

## ⚙️ Backend

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Stripe Payments**
- **Cloudinary Image Storage**
- **Clerk Authentication**
- **Inngest Background Jobs**
- **Multer File Uploads**

---

# 📱 Mobile App

Customer mobile application built using **Expo + React Native**.

### Key Screens

| Screen | Description |
|------|-------------|
| Shop | Browse products |
| Product Detail | View product info & images |
| Cart | Manage cart & checkout |
| Profile | User account menu |
| Orders | Order history |
| Wishlist | Favorite products |
| Addresses | Manage delivery addresses |
| Privacy & Security | Settings |

### Mobile Features

- 🔐 Google & Apple login with Clerk
- 🛒 Add to cart
- ❤️ Wishlist
- 🗺️ Address management
- 💳 Stripe payments
- 📦 Order tracking
- ⭐ Product reviews
- 📊 Error monitoring with Sentry

---

# 🖥️ Admin Dashboard

Admin interface to manage store operations.

### Pages

| Page | Description |
|-----|-------------|
| Dashboard | Store analytics |
| Products | Product CRUD |
| Orders | Manage customer orders |
| Customers | View users |
| Login | Admin authentication |

### Admin Features

- Product creation & editing
- Order management
- Customer listing
- Image uploads
- Store statistics

---

# ⚙️ Backend API

The backend is built using **Express.js + MongoDB** and handles:

- Authentication
- Product management
- Cart operations
- Order creation
- Payments
- Reviews
- Background jobs

### API Routes

| Endpoint | Purpose |
|--------|--------|
| `/api/products` | Product list |
| `/api/cart` | Cart CRUD |
| `/api/orders` | Orders |
| `/api/reviews` | Product reviews |
| `/api/users` | Wishlist & addresses |
| `/api/admin` | Admin APIs |
| `/api/payment` | Stripe payments |

---

# 🔋 Core Features

### 📱 Customer Features

- Product browsing
- Cart management
- Wishlist
- Address system
- Order history
- Product reviews
- Secure Stripe checkout

### 🛠️ Admin Features

- Product CRUD
- Order tracking
- Customer management
- Analytics dashboard

### ⚙️ Backend Features

- Stripe payment processing
- Cloudinary image uploads
- Clerk authentication
- Inngest background jobs
- MongoDB database models

---

# 💳 Payment Flow

1️⃣ User adds items to cart  
2️⃣ User selects shipping address  
3️⃣ Mobile app creates **Stripe PaymentIntent**  
4️⃣ Stripe Payment Sheet opens  
5️⃣ Payment confirmed via **Stripe Webhook**  
6️⃣ Order created in database  
7️⃣ Product stock updated

---

# 🧱 Project Structure

```

expo-ecommerce
│
├── mobile
│ ├── app
│ ├── components
│ ├── hooks
│ ├── lib
│ ├── types
│
├── admin
│ ├── src
│ ├── pages
│ ├── components
│
├── backend
│ ├── controllers
│ ├── routes
│ ├── models
│ ├── middleware
│ ├── config
│
└── package.json

````

---

# 🤸 Quick Start

## Prerequisites

- Node.js >= 20
- MongoDB Atlas
- Stripe account
- Clerk account

---

# 1️⃣ Clone Repository

```bash
git clone https://github.com/Itssanthoshhere/Expo-Ecommerce.git
cd Expo-Ecommerce
````

---

# 2️⃣ Setup Backend

```
cd backend
npm install
npm run dev
```

---

# 3️⃣ Setup Admin Dashboard

```
cd admin
npm install
npm run dev
```

---

# 4️⃣ Setup Mobile App

```
cd mobile
npm install
npx expo start
```

Scan QR code using **Expo Go**.

---

# 🧠 Architecture Overview

### Backend

Express REST API connected to MongoDB.

Responsibilities:

* Authentication
* Orders
* Payments
* Product management
* Reviews

---

### Mobile App

Handles:

* UI & navigation
* Authentication
* Cart operations
* Stripe checkout
* Address management

---

### Admin Dashboard

Manages:

* Products
* Orders
* Customers
* Analytics

---

# 🚀 Future Enhancements

* 📦 Push notifications
* 🧾 Order invoices
* 📊 Advanced analytics
* 🔍 Product search & filters
* 📬 Email order confirmations
* 📱 Native iOS/Android builds
* 🛍️ Product recommendations

---

# 🤝 Contribution

Contributions are welcome.

Steps:

```
git checkout -b feature/my-feature
git commit -m "feat: add feature"
git push origin feature/my-feature
```

Open a Pull Request.

---

# 🔗 Contacts

GitHub: [<b>Itssanthoshhere</b>](https://github.com/Itssanthoshhere) <br/>
LinkedIn: [<b>Santhosh VS</b>](https://www.linkedin.com/in/thesanthoshvs/)

---

# ⭐ Show Your Support

If you like this project, consider giving it a ⭐ on GitHub!

---
