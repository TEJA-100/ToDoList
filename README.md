# TaskFlow ⚡️

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD627)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A modern, responsive, and feature-rich full-stack To-Do list application designed to streamline daily tasks, manage productivity, and organize schedules seamlessly.

---

## 1. Project Overview

**TaskFlow** is a MERN-stack application that provides users with an intuitive interface to manage, filter, and track their tasks. Designed with a sleek dark-themed/modern UI and smooth micro-animations, it offers seamless task organization with categories, prioritization, subtask tracking, and due dates. 

The application uses **React** on the frontend built with **Vite** for lightning-fast performance, styled with **Tailwind CSS**. The backend is powered by **Node.js** and **Express.js** with **MongoDB** (via **Mongoose**) serving as the persistent database layer, complete with a fallback mock database for zero-config local development.

---

## 2. Features

- 📝 **Create, Read, Update, Delete (CRUD)**: Manage tasks seamlessly with full database persistence.
- 🚦 **Priority Levels**: Set task priorities (`Low`, `Medium`, `High`) with clear visual indicators.
- 🏷️ **Task Categories**: Classify tasks (e.g., *Work*, *Personal*, *Study*) to keep your workspace structured.
- 🕒 **Due Dates & Times**: Assign start/end dates and times to keep track of schedules.
- 🌿 **Subtask Checklists**: Break down larger tasks into smaller action items.
- 🔍 **Search & Filters**: Instantly find tasks by keywords or filter by Category, Priority, and Status.
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile screens.
- 🔄 **Stateful Status Dashboard**: Track metrics showing Total, Completed, Pending, and Upcoming tasks.

---

## 3. Tech Stack

### Frontend
- **React.js**: Library for building interactive user interfaces.
- **Vite**: Ultra-fast next-generation frontend build tooling.
- **Tailwind CSS**: Utility-first CSS framework for styling.


### Backend
- **Node.js**: Cross-platform JavaScript runtime environment.
- **Express.js**: Fast, minimalist web framework for routing.


### Database
- **MongoDB**: Document-oriented NoSQL database.



## Folder Structure


```
├── 📁 public
│   ├── 🖼️ favicon.svg
│   └── 🖼️ icons.svg
├── 📁 server
│   ├── 📁 config
│   │   ├── 📄 db.js
│   │   └── 📄 mockDb.js
│   ├── 📁 controllers
│   │   └── 📄 taskController.js
│   ├── 📁 models
│   │   └── 📄 Task.js
│   ├── 📁 routes
│   │   └── 📄 taskRoutes.js
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── 📄 server.js
├── 📁 src
│   ├── 📁 assets
│   │   ├── 🖼️ hero.png
│   │   ├── 🖼️ react.svg
│   │   └── 🖼️ vite.svg
│   ├── 📁 components
│   │   ├── 📄 Navbar.jsx
│   │   ├── 📄 PriorityBadge.jsx
│   │   ├── 📄 StatusCard.jsx
│   │   ├── 📄 SubtaskInput.jsx
│   │   ├── 📄 TaskCard.jsx
│   │   └── 📄 TaskForm.jsx
│   ├── 📁 pages
│   │   ├── 📄 AllTasks.jsx
│   │   ├── 📄 CreateTask.jsx
│   │   ├── 📄 Dashboard.jsx
│   │   ├── 📄 EditTask.jsx
│   │   └── 📄 TaskDetails.jsx
│   ├── 📁 services
│   │   └── 📄 api.js
│   ├── 🎨 App.css
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   └── 📄 main.jsx
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 postcss.config.js
├── 📄 tailwind.config.js
└── 📄 vite.config.js
```

---
---

##  Installation Guide 

Ensure you have [Node.js](https://nodejs.org/) (v16+) and [MongoDB](https://www.mongodb.com/) installed on your machine.

Clone the repository to your local directory:
```bash
git clone https://github.com/TEJA-100/ToDoList.git
cd ToDoList
```

---

##  Frontend Setup Commands

Install the frontend dependencies and launch the dev environment:
```bash
# From the root directory:
npm install
npm run dev
```
The React development server will start on `http://localhost:5173`.

---

##  Backend Setup Commands

Initialize dependencies for the Express backend and launch the server:
```bash
# Navigate to the server folder:
cd server
npm install
npm start
```
The server will start on `http://localhost:5000`.

---

##  Required NPM Packages

Here are the primary packages required for each folder, along with the command to install them.

### Root / Frontend Packages
```bash
# Install root/frontend packages (run from the root directory)
npm install react react-dom axios lucide-react
npm install -D vite tailwindcss postcss autoprefixer
```

### Backend Packages
```bash
# Install backend packages (run from the server directory)
cd server
npm install express mongoose cors dotenv
```

---

##  Environment Variables

Create a `.env` file inside the `server/` directory to customize your server port and database connection.

### `server/.env` Example:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/taskflow?retryWrites=true&w=majority
```
*Note: If no `MONGO_URI` is specified, the application automatically boots up using the local in-memory database fallback (`server/config/mockDb.js`).*

---

##  Running the Application

To run both client and server locally:

1. **Start the Backend**:
   ```bash
   cd server
   npm start
   ```
2. **Start the Frontend**:
   ```bash
   # In a new terminal tab at the root directory:
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`.

---

##  Author Information

Created by:
* **Teja Sai GUDLA**    
* GitHub: [@TEJA-100](https://github.com/TEJA-100)
