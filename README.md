TrackR

TrackR is a modern job tracking platform designed to help users stay organized during their job search journey. Instead of managing applications, interviews, resumes, and follow-ups across scattered notes or browser tabs, TrackR keeps everything in one clean and focused dashboard.

Users can:

Add and manage job applications
Track application progress
Upload and manage resumes
Organize interview stages
Stay productive throughout the hiring process
🚀 Features
Authentication System (JWT)
User Registration & Login
Protected Routes
Add Job Applications
Track Application Status
Resume Upload System
Resume Manager
Mobile Responsive Dashboard
Modern UI/UX
Toast Notifications & Status Popups
Sidebar + Mobile Bottom Navigation
File Upload Handling
REST API Architecture
🛠 Tech Stack
Frontend
React.js
React Router DOM
Tailwind CSS
Material Symbols
React Icons
Fetch API
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Multer
Deployment
Frontend
Vercel
Backend
Render
Database
MongoDB Atlas
🎨 Design & UI Tools
Figma
Tailwind CSS
Material Design Icons
Responsive Mobile-First Design Principles
📁 Project Structure
TrackR/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── routes/
│   │   └── assets/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── uploads/
│   │   ├── config/
│   │   └── utils/
🔐 Authentication

TrackR uses JWT (JSON Web Tokens) for secure authentication.

Features include:

User registration
User login
Protected API routes
Token storage with localStorage
Route protection middleware
📦 API Features
Users
Register User
Login User
Delete User
Get User Profile
Jobs
Add Job
Get All Jobs
Update Job Status
Delete Job
Resumes
Upload Resume
Get User Resumes
📱 Responsive Design

TrackR is fully responsive across:

Mobile
Tablet
Desktop

Special attention was given to:

Mobile navigation
Dashboard responsiveness
Clean spacing
Modern card layouts
Smooth UX interactions
⚡ Installation
Clone Repository
git clone https://github.com/yourusername/trackr.git
Frontend Setup
cd client
npm install
npm run dev
Backend Setup
cd server
npm install
npm run dev
Environment Variables

Create a .env file inside the server folder:

PORT=4000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
🌍 Live Demo

Frontend:

https://trackr-sepia.vercel.app

Backend:

https://trackr-zpcz.onrender.com
📸 Screenshots

Add screenshots of:

Landing Page
Dashboard
Add Job Modal
Resume Manager
Mobile View
🧠 Inspiration

TrackR was built to simplify the stressful and chaotic process of job hunting by giving users a clean and organized workspace for their career journey.

📌 Future Improvements
Google Authentication
LinkedIn Authentication
Job Analytics Dashboard
Drag & Drop Resume Upload
Interview Calendar Integration
Email Notifications
AI Resume Feedback
Dark Mode
👨‍💻 Author

Built by Gideon.

Documenting the entire build process publicly across social platforms while learning and improving in public 🚀
