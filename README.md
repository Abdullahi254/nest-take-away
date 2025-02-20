# 🚀 NestJS Firestore API
A REST and GraphQL API using NestJS and Firestore, featuring **user management** and a **webhook integration** for WhatsApp message processing.

---

## 📌 Table of Contents
- [Setup Instructions](#-setup-instructions)
- [API Endpoints](#-api-endpoints)
- [GraphQL API](#-graphql-api)
- [Design Decisions](#-design-decisions)

---

## 🛠 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-repo/nestjs-firestore-api.git
cd nestjs-firestore-api
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Firebase
#### 🔥 Firestore Setup
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project & enable Firestore.
3. Generate a **Service Account Key** under:
   - **Project Settings** → **Service Accounts** → **Generate new private key**.
4. Save it as **`firebase-service-account.json`** in `src/config/`.

#### 🔑 Environment Variables
Create a `.env` file in the root:
```
PORT=3000
WEBHOOK_SECRET=my_secret_token
```

> **🔥 Ensure** `firebase-service-account.json` is **added to `.gitignore`** for security.

### 4️⃣ Run the Server
```bash
npm run start
```
For development with auto-restart:
```bash
npm run start:dev
```

---

## 📡 API Endpoints

### 📌 User Management

#### ➕ Create a User
**`POST /users`**  
✅ **Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```
❌ **Error (Email Exists)**
```json
{
  "statusCode": 409,
  "message": "Email already in use"
}
```

#### 📋 Get Users (Paginated)
**`GET /users?page=1&limit=2`**  
✅ **Response:**
```json
{
  "users": [
    { "id": "user1", "name": "John Doe", "email": "john@example.com", "phone": "+1234567890" },
    { "id": "user2", "name": "Jane Doe", "email": "jane@example.com", "phone": "+0987654321" }
  ]
}
```

#### 👤 Get a Single User
**`GET /users/{id}`**  
✅ **Response:**
```json
{
  "id": "user1",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

#### 🛠 Update User (Email Immutable)
**`PATCH /users/{id}`**  
✅ **Request:**
```json
{
  "name": "John Updated",
  "phone": "+1122334455"
}
```
✅ **Response:**
```json
{
  "id": "user1",
  "name": "John Updated",
  "email": "john@example.com",
  "phone": "+1122334455"
}
```
❌ **Error (Trying to Change Email)**
```json
{
  "statusCode": 400,
  "message": "Email cannot be updated"
}
```

---

## 📩 Webhook Integration

#### ➕ Process Incoming WhatsApp Message
**`POST /webhook`**  
✅ **Request:**
```json
{
  "message": "Hello",
  "phone": "+1234567890"
}
```
✅ **Response:**
```json
{
  "status": "Message received"
}
```
❌ **Unauthorized Request**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

#### 🤖 Automated "Help" Reply
**Request:**
```json
{
  "message": "help",
  "phone": "+1234567890"
}
```
✅ **Response:**
```json
{
  "reply": "Support contact: support@company.com"
}
```

---

## 📡 GraphQL API

Navigate to **`http://localhost:3000/graphql`**.

### 📌 Query Users
```graphql
query Getusers{
  getUsers(limit: 2, cursor: "lastUserId") {
    name
    email
    phone
  }
}
```

### 📌 Get User by ID
```graphql
query GetUserById{
  getUserById(id: "user1") {
    name
    email
  }
}
```

---

## 📐 Design Decisions

### 🗂 Modular Structure
```
src/
 ├── config/
 │    ├── firebase.config.ts
 │    ├── firebase-service-account.json  # (Ignored in Git)
 ├── users/
 │    ├── users.module.ts
 │    ├── users.service.ts
 │    ├── users.controller.ts
 ├── webhook/
 │    ├── webhook.module.ts
 │    ├── webhook.controller.ts
 │    ├── webhook.service.ts
 ├── common/
 │    ├── guards/auth.guard.ts  # Webhook Security
 │    ├── rate-limiter/rate-limiter.service.ts
 |    ├── exceptions/firestore.exception.ts
 ├── main.ts
```

### 🔥 Efficient Firestore Queries
- **Unique Email Check**: Uses `WHERE` query instead of fetching all users.  
- **Pagination**: Uses Firestore cursors instead of skipping records.  
- **Realtime Updates**: Firestore `onSnapshot()` keeps Webhooks reactive.  

### 🛡 Security Considerations
- **`firebase-service-account.json` ignored in Git**
- **Rate-limiting** (5 requests/min per phone)
- **Webhook authentication** via **Bearer Token**

---

## 🧪 Running Tests

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

---

## 📜 License

MIT License © 2025 Abdullahi

---

🚀 **Enjoy building with NestJS + Firestore!** 🚀  
Let me know if you need any refinements. 😊
