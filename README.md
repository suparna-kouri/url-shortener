📌 URL Shortener – Full Stack Project

This is a full-stack URL shortener built with:
- Node.js + Express + MongoDB for the backend
- React for the frontend

You can:
-> Enter a long URL to get a short link
-> Click the short link to redirect
-> View basic stats: how many times your short URL was clicked

🛠 Installation & Running

Clone the repository and run both client & server.

Server (backend)
```bash
cd server
npm install
npm run dev

Server runs on: http://localhost:5000

Client (frontend)
```bash
cd client
npm install
npm start

Client runs on: http://localhost:3000

⚙️ Technologies Used
-> Node.js
-> Express.js
-> MongoDB
-> Mongoose
-> React
-> Axios
-> Jest & Supertest (for backend testing)


🧪 Testing
In the `server` folder, run:
```bash
npx jest url.test.js

📊 Features
-> Shortens a long URL and saves it in MongoDB
-> Redirects to original URL when short link is opened
-> Shows stats: original URL, short code, click count, and created date