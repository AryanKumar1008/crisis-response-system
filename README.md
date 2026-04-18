# 🚨 Crisis Response System

A full-stack web application designed to handle emergency alerts and crisis management in real-time. Built with a modern frontend and scalable cloud backend.

---

## 🌐 Live Demo

* Frontend (Firebase Hosting):
  https://crisis-response-aryan-12-81773.web.app

* Backend (Google Cloud Run):
  https://crisis-backend-58557604639.asia-south1.run.app

---

## ⚙️ Tech Stack

### Frontend

* React (Vite)
* JavaScript (ES6)
* CSS

### Backend

* Node.js
* Express.js

### Cloud & Deployment

* Firebase Hosting (Frontend)
* Google Cloud Run (Backend)
* GitHub Actions (CI/CD)

---

## 🚀 Features

* 🔴 Emergency Panic Button
* 🏥 Blood Request System
* 📡 Real-time Alert Handling
* 👥 Role-based UI (Guest / Staff)
* ☁️ Cloud deployed backend
* 🔄 Auto deployment using CI/CD

---

## 🧩 Project Structure

```
crisis/
├── client/   # React frontend
├── server/   # Express backend
```

---

## 🔌 API Endpoints

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | /alert             | Create alert         |
| GET    | /alerts            | Get all alerts       |
| PATCH  | /alert/:id/resolve | Resolve alert        |
| POST   | /blood-request     | Create blood request |
| GET    | /blood-requests    | Get blood requests   |

---

## ⚡ Setup Instructions

### 1. Clone the repo

```
git clone https://github.com/Aryankumar1008/crisis-response.git
cd crisis-response
```

### 2. Install frontend

```
cd client
npm install
npm run build
```

### 3. Deploy frontend

```
firebase deploy
```

### 4. Deploy backend (Cloud Run)

```
gcloud run deploy crisis-backend \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated
```

---

## 🔄 CI/CD Setup

This project uses **GitHub Actions** for automatic deployment.

On every push to `main`:

* Project builds automatically
* Firebase Hosting is updated

---

## 📊 Monitoring

* Google Cloud Run Metrics & Logs used for backend monitoring
* Firebase Hosting for frontend delivery

---

## 🧠 Key Concepts Used

* REST API
* Cloud Deployment
* CI/CD Pipeline
* Serverless Architecture
* Containerization (Docker)

---

## 👨‍💻 Author

**Aryan Kumar**
GitHub: https://github.com/Aryankumar1008

---

## ⭐ Future Improvements

* Add database (MongoDB / Firestore)
* Authentication system
* Real-time notifications (WebSockets)
* Admin dashboard

---
