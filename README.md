# 🧶 Yarniq — Crafted by Prachee

A production-grade e-commerce platform for handmade crochet products. Built with a $0-budget architecture using entirely free-tier services.

## Tech Stack

| Layer | Technology | Hosting |
|---|---|---|
| Frontend | Next.js 15 (App Router) + Tailwind CSS | Vercel |
| Backend | Express.js + Mongoose | Render |
| Database | MongoDB Atlas (Free M0) | Cloud |
| Auth | Clerk | Free Tier |
| Storage | Cloudinary | Free Tier |
| Payments | Razorpay | Test/Live |
| Emails | Nodemailer + Gmail SMTP | Free |

## Getting Started

### Backend

```bash
cd backend
npm install
cp .env.example .env   # Fill in your credentials
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # Fill in your credentials
npm run dev
```

## Project Structure

```
Yarniq/
├── frontend/    # Next.js app (Vercel)
├── backend/     # Express API (Render)
└── README.md
```

## Environment Setup

See `backend/.env.example` and `frontend/.env.example` for required environment variables.

---

*Handcrafted with ❤️ by Prachee*
