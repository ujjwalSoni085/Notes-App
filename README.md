# NoteVault — Personal Notes Application

A full-stack personal notes application with secure authentication and CRUD operations.

## 🛠 Tech Stack

- **Frontend**: React (Vite) with React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas (Cloud-hosted)
- **Authentication**: JWT (JSON Web Token) + bcrypt
- **Deployment**: Frontend → Netlify | Backend → Railway

## 📁 Project Structure

```
Notes App/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── api/             # Axios instance
│   │   ├── components/      # Navbar, NoteCard, NoteForm, ProtectedRoute
│   │   ├── context/         # AuthContext (login/register/logout)
│   │   └── pages/           # Login, Register, Dashboard
│   ├── .env                 # VITE_API_URL
│   ├── netlify.toml         # Netlify deployment config
│   └── package.json
│
├── server/                  # Express backend
│   ├── config/db.js         # MongoDB connection
│   ├── middleware/auth.js   # JWT verification
│   ├── models/              # User, Note (Mongoose)
│   ├── routes/              # /api/auth, /api/notes
│   ├── .env                 # MONGO_URI, JWT_SECRET, PORT
│   ├── server.js            # Entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas account (free tier)

### 1. Clone the repository

```bash
git clone <repo-url>
cd "Notes App"
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/notevault?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
```

Start the server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

## 🔗 API Endpoints

### Auth

| Method | Endpoint             | Description          | Auth Required |
| ------ | -------------------- | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register a new user  | No            |
| POST   | `/api/auth/login`    | Login & get JWT      | No            |

### Notes

| Method | Endpoint          | Description          | Auth Required |
| ------ | ----------------- | -------------------- | ------------- |
| GET    | `/api/notes`      | Get all user's notes | Yes           |
| POST   | `/api/notes`      | Create a new note    | Yes           |
| PUT    | `/api/notes/:id`  | Update a note        | Yes           |
| DELETE | `/api/notes/:id`  | Delete a note        | Yes           |

## 🔐 Environment Variables

### Server (`server/.env`)

| Variable     | Description                          |
| ------------ | ------------------------------------ |
| `PORT`       | Server port (default: 5000)          |
| `MONGO_URI`  | MongoDB Atlas connection string      |
| `JWT_SECRET` | Secret key for JWT signing           |

### Client (`client/.env`)

| Variable       | Description                         |
| -------------- | ----------------------------------- |
| `VITE_API_URL` | Backend API URL                     |

## 🌐 Deployment

### Backend → Railway

1. Push code to GitHub
2. Connect GitHub repo to Railway
3. Set root directory to `server`
4. Add environment variables: `MONGO_URI`, `JWT_SECRET`
5. Railway auto-deploys on push

### Frontend → Netlify

1. Connect GitHub repo to Netlify
2. Set base directory to `client`
3. Build command: `npm run build`
4. Publish directory: `client/dist`
5. Add environment variable: `VITE_API_URL=https://your-railway-url.up.railway.app/api`

## 📝 Features

- ✅ User registration & login with JWT
- ✅ Password hashing with bcrypt (12 salt rounds)
- ✅ Protected routes (frontend & backend)
- ✅ Full CRUD operations for notes
- ✅ User-specific data isolation
- ✅ Input validation (client + server)
- ✅ Search/filter notes
- ✅ Responsive dark theme UI
- ✅ Token expiry handling
