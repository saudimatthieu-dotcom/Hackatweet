# Hackatweet

A Twitter clone built as a team during a hackathon at the La Capsule full-stack bootcamp.

## Features

- Sign up and sign in
- Post tweets (280 characters maximum, with a live counter)
- Hashtags, with a "Trends" panel listing the most used ones
- Like and unlike tweets
- Delete your own tweets

## Stack

| Part     | Technologies |
| -------- | ------------ |
| Frontend | Next.js, React, Redux Toolkit, redux-persist, Font Awesome |
| Backend  | Node.js, Express, MongoDB (Mongoose), bcrypt, uid2 |

## API

| Method | Route            | Description |
| ------ | ---------------- | ----------- |
| POST   | `/users/signup`  | Create an account |
| POST   | `/users/signin`  | Sign in |
| GET    | `/tweets`        | Get all tweets |
| POST   | `/tweets`        | Post a tweet |
| PUT    | `/tweets/like`   | Like or unlike a tweet |
| DELETE | `/tweets/delete` | Delete a tweet |

## Getting started

**Backend** (port 3000)

```bash
cd backend
npm install
npm run dev
```

Create `backend/.env` with `CONNECTION_STRING=` followed by your MongoDB connection string.

**Frontend** (port 3001)

```bash
cd frontend
npm install
npm run dev
```
