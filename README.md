![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)


# 🌌 UniVerse – Hackathons, Teams & Beyond 🚀  

> *Where ideas find teammates, and events find YOU ✨*  

UniVerse is a **galaxy-themed web platform** built for students and hackers to:  
- Discover and track **college & hackathon events** 📅  
- Find teammates through **HackMate** (a swipe-based "Tinder for hackathons") 💻❤️  
- Ask questions or get help from the **AI-powered Help Box** 🤖  

---

## ✨ Features  

### 🔭 Landing Page  
- Cosmic **galaxy theme** with stars & glassmorphism  
- Options to **Login** or **Sign Up** for new users  
- Auto-detects if logged in → directly jump to Dashboard  

### 📅 Event Manager  
- Track events as **Recent, Live, Upcoming**  
- Each event card shows details, timings & external link  

### 🔥 HackMate  
- Swipe left/right on student profiles  
- Send **collaboration requests** for hackathons  
- Matched users get **notifications**  

### 🛠️ Help Box  
- Chat-style Q&A system  
- Ask about events, teammates, or random bugs  
- Feels like an AI-assistant (but with memes)  

### 👤 Auth System  
- Secure **JWT-based Login & Register**  
- Passwords encrypted with **bcryptjs**  
- **MongoDB Atlas** as the database  

---

## 🛠️ Tech Stack  

### Frontend 🌠
- React.js (Vite) ⚡  
- CSS (custom styles, glassmorphism, galaxy background)  
- React Router v6  

### Backend 🚀
- Node.js + Express  
- MongoDB Atlas (cloud DB)  
- JWT for authentication  
- Bcrypt for password hashing  

---

 
## 📂 Project Structure  

```bash
UniVerse/  
├── client/                  # React frontend  
│   ├── src/pages/           # Landing, Login, Register, Dashboard  
│   ├── App.jsx              # Router setup  
│   ├── styles.css           # Cosmic theme  
│   └── ...  
│  
├── server/                  # Node.js backend  
│   ├── index.js             # Main server (Express APIs)  
│   ├── models/              # MongoDB schemas  
│   ├── routes/              # Auth, Events, HackMate, HelpBox APIs  
│   └── ...  
│  
├── .env                     # Environment variables  
├── package.json             # Project metadata  
└── README.md                # Documentation  



---
```

## 🚀 Installation & Setup  

Follow these steps to run UniVerse locally:

```bash

1️⃣ Clone the repository
git clone https://github.com/unnkarm/uniVerse.git
cd universe

2️⃣ Install dependencies

For both frontend and backend, install required packages:

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

3️⃣ Setup environment variables

Create a .env file inside the server/ folder with the following:

MONGO_URI=mongodb+srv://universe:byteroversuniverse@universecluster.rlmu2f5.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key
PORT=5000


4️⃣ Start the project

Run backend and frontend separately:

# Start backend (server)
cd server
npm start

# Start frontend (client)
cd client
npm run dev


Now open 👉 http://localhost:5173
 in your browser.

```

## 🎮 Demo Usage

Once the project is running locally:

- Visit the app → Open http://localhost:5173
 in your browser.

- New User? Register

- Go to the Sign Up page.

- Enter your email & password (stored securely in MongoDB with hashing 🔒).

- Login

- Use your registered credentials.

- On successful login, a JWT token is stored in your browser (localStorage).

- You’ll be redirected to the Dashboard.

## Explore Dashboard

📅 Events → Track Recent, Live, and Upcoming college events.

🔥 HackMate → Swipe right/left to find your coding soulmate & send requests.

🛠️ Help Box → Ask questions and get AI-powered assistance.



## 🤝 Contributing

We love contributions from the community! 💜

Here’s how you can contribute:

```bash
Fork the repo

Create a new branch

git checkout -b feature/amazing-feature


Commit your changes

git commit -m "✨ Added amazing feature"


Push to the branch

git push origin feature/amazing-feature


Open a Pull Request 🚀
```

## 📜 License

This project is licensed under the MIT License.
You’re free to use, modify, and distribute this project, as long as proper credit is given.





