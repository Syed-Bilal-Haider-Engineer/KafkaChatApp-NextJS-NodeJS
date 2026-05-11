# ChatApp (Real-Time Learning Project)

A scalable real-time chat application built as a learning project to explore modern distributed systems, event-driven architecture, and full-stack development using Node.js, Next.js, Kafka, Redis, and PostgreSQL.

---

## 🚀 Overview

This project demonstrates how a production-like chat system can be designed using a **monorepo architecture** with real-time communication, event streaming, caching, and persistent storage.

It was built for **learning and practical experience** with scalable backend systems and modern frontend frameworks.

---

## 🧰 Tech Stack

### Frontend

* Next.js
* React
* Socket.io Client

### Backend

* Node.js
* Express.js
* Socket.io

### Messaging & Caching

* Apache Kafka (event-driven messaging)
* Redis (caching + pub/sub)

### Database

* PostgreSQL
* Prisma ORM

### Infrastructure & Tooling

* Turborepo (monorepo management)
* Aiven (managed Kafka & PostgreSQL services)

---

## ✨ Features

* ⚡ Real-time messaging using WebSockets (Socket.io)
* 🔁 Event-driven communication using Kafka
* 🚀 Fast message delivery using Redis pub/sub
* 💾 Persistent chat storage with PostgreSQL
* 🧠 Prisma ORM for database management
* 📦 Monorepo architecture for scalability
* 🎯 Clean separation of frontend and backend services

---

## 📁 Project Structure (Monorepo)

```
chatapp-monorepo/
├── apps/
│   ├── web/        # Next.js frontend
│   └── server/     # Node.js backend
├── packages/
│   ├── db/         # Prisma schema & client
│   ├── shared/     # Shared types & utilities
├── turbo.json
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone repository

```bash
git clone <repository-url>
cd chatapp-monorepo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env` files in both frontend and backend:

```env
DATABASE_URL=
REDIS_URL=
KAFKA_BROKER_URL=
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start development server

```bash
npm run dev
```

---

## 🧠 What I Learned

This project helped me understand:

* Real-time systems using Socket.io
* Event-driven architecture using Kafka
* Redis caching and pub/sub patterns
* Scalable backend design principles
* Monorepo architecture using Turborepo
* Prisma ORM for database interaction
* Full-stack integration between Next.js and Node.js

---

## 📌 Future Improvements

* 🔐 Authentication (JWT / OAuth)
* 👥 Group chats and channels
* 📎 File sharing support
* 🔒 End-to-end encryption
* ☁️ Deployment (Docker + Kubernetes)
* 📱 Mobile app version

---

## 👨‍💻 Author

**Syed Bilal Haider**

A learning project focused on mastering scalable backend systems, distributed architecture, and real-time communication technologies.

---

## 📜 License

This project is for **educational purposes only**.
