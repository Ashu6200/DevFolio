# 🚀 Full-Stack Developer Portfolio

A modern, production-ready developer portfolio built with **Next.js**, **TypeScript**, **tRPC**, **MongoDB**, and **Redis/Upstash**.

This project is more than a static portfolio. It is a full-stack application designed to showcase projects, skills, experience, and other professional information through a scalable and type-safe architecture.

The application uses **Next.js** for the frontend and server-side functionality, **tRPC** for end-to-end type-safe APIs, **MongoDB** for persistent data storage, and **Redis/Upstash** for caching and performance optimization.

---

## ✨ Features

* Modern and responsive portfolio UI
* Full-stack architecture using Next.js
* Type-safe API communication with tRPC
* MongoDB database integration
* Redis/Upstash caching
* Server-side rendering and static generation where appropriate
* Dynamic project management
* Skills and technology showcase
* Experience and education sections
* Contact functionality
* SEO-friendly metadata
* Responsive design for mobile, tablet, and desktop
* Optimized API and database access
* Environment-based configuration
* Clean and scalable project structure
* TypeScript throughout the application
* Developer-focused architecture
* Production-ready deployment setup

---

## 🛠️ Tech Stack

### Frontend

* [Next.js](https://nextjs.org/)
* React
* TypeScript
* Tailwind CSS
* Modern CSS
* Responsive UI

### Backend

* Next.js Server Components / Server Actions
* tRPC
* TypeScript
* Node.js runtime

### Database

* MongoDB
* MongoDB Atlas
* Mongoose / MongoDB driver

### Caching

* Redis
* Upstash Redis

### Development

* ESLint
* Prettier
* Git
* GitHub
* npm / pnpm

---

## 🏗️ Architecture

The application follows a modern full-stack architecture:

```text
┌─────────────────────────────────────┐
│             Client / UI             │
│          Next.js + React             │
└─────────────────┬───────────────────┘
                  │
                  │ tRPC
                  ▼
┌─────────────────────────────────────┐
│             API Layer               │
│              tRPC                   │
│      Type-safe server procedures    │
└───────────────┬───────────┬─────────┘
                │           │
                ▼           ▼
       ┌─────────────┐  ┌─────────────┐
       │   MongoDB   │  │    Redis    │
       │ Persistent  │  │   Caching   │
       │    Data     │  │  / Upstash  │
       └─────────────┘  └─────────────┘
```

The frontend communicates with the backend through tRPC procedures. Database operations are handled through MongoDB, while Redis/Upstash is used for frequently accessed or cacheable data.

---

## 📁 Project Structure

```text
portfolio/
│
├── app/
│   ├── api/
│   │   └── trpc/
│   │
│   ├── about/
│   ├── projects/
│   ├── experience/
│   ├── contact/
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   ├── navbar/
│   ├── footer/
│   ├── projects/
│   └── sections/
│
├── server/
│   ├── routers/
│   │   ├── project.ts
│   │   ├── profile.ts
│   │   └── contact.ts
│   │
│   ├── trpc.ts
│   └── context.ts
│
├── lib/
│   ├── mongodb.ts
│   ├── redis.ts
│   └── utils.ts
│
├── models/
│   ├── Project.ts
│   ├── Profile.ts
│   └── Contact.ts
│
├── types/
│   └── index.ts
│
├── public/
│   ├── images/
│   └── icons/
│
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

> The exact structure may change as the project evolves.

---

# 🚀 Getting Started

## Prerequisites

Before running the project locally, make sure you have the following installed:

* Node.js 18+
* npm, pnpm, or yarn
* MongoDB database
* Redis instance or Upstash Redis
* Git

You can verify your Node.js installation:

```bash
node --version
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Move into the project directory:

```bash
cd YOUR_REPOSITORY
```

Install dependencies:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

---

# 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Redis / Upstash
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

Example:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

MONGODB_URI=mon_
```
