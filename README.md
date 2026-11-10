# Project Task Management System

A full-stack web application to manage project tasks efficiently. Users can add tasks, update their status, view tasks based on their progress, and delete tasks.

## Live Demo

[Click here to view the live application](https://project-task-management-57ci.vercel.app)

## Features

- Add new tasks
- View all tasks
- Organize tasks by status
- Update task status
- Delete tasks
- Store task details in MongoDB
- Responsive user interface

## Technologies Used

**Frontend**
- React.js
- Bootstrap
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- Mongoose

**Database**
- MongoDB Atlas

**Deployment**
- Vercel – Frontend
- Render – Backend
- GitHub – Source Code

## Task Status

- Pending
- InProgress
- Completed

## Project Structure

```text
ProjectTaskManagement/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   ├── public/
│   └── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Jayasri-2007/ProjectTaskManagement.git
```

### 2. Open the project folder

```bash
cd ProjectTaskManagement
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

Configure your MongoDB connection using a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend:

```bash
node server.js
```

### 4. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Add a new task |
| PATCH | `/tasks/:id` | Update task status |
| DELETE | `/tasks/:id` | Delete a task |

## Author

**Jayasri S**

B.Tech – Information Technology

GitHub: [Jayasri-2007](https://github.com/Jayasri-2007)

---

If you find this project useful, feel free to explore the repository!