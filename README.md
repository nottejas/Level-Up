# Level Up - 21-Day Task Management App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

A productivity task management application designed for a 21-day challenge. Track your tasks, earn points for completing them, and visually monitor your progress through a 21-day journey with day-by-day tracking.

> **Security Notice:** If you've cloned this repository before June 2023, please note that MongoDB credentials were previously exposed in the codebase. These credentials have been rotated and removed. Please use environment variables as described in the installation section.

![App Screenshot](screenshot.png)

## Features

- **Task Management**: Add, complete, and delete tasks with customizable point values
- **Points System**: Earn points for completed tasks, lose points for uncompleted tasks
- **Day-by-Day Tracking**: Organize tasks by specific days (1-21) in the challenge
- **Progress Visualization**: Multiple progress bars to track overall completion and daily progress
- **Real-time Clock**: Display current date and time
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Dark Mode**: Beautiful orange-black theme for better focus and reduced eye strain
- **Data Persistence**: MongoDB integration for storing tasks and progress

## Tech Stack

### Frontend
- **React**: UI framework using the latest React features
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Icons**: Icon library for UI elements
- **Moment.js**: Date and time handling

### Backend
- **Node.js**: Runtime environment for JavaScript
- **Express**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (or local MongoDB installation)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/level-up.git
cd level-up
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables
   
Copy the example environment files and update them with your actual values:
```bash
cp .env.example .env
cp .env.local.example .env.local
```

Then edit the `.env` file with your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

And verify the `.env.local` file for Vite:
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server (in two separate terminal windows)
```bash
# Terminal 1 - Start the backend server
npm run server

# Terminal 2 - Start the frontend development server
npm run dev
```

5. Open your browser and navigate to http://localhost:5173

## Project Structure

```
level-up/
├── src/                  # Frontend source code
│   ├── components/       # React components
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   └── ...
├── server.js             # Express server and API routes
├── .env                  # Environment variables (not tracked in git)
├── .env.example          # Example environment variables template
└── ...
```

## Usage Guide

### Adding Tasks

1. Select the day you want to add a task for using the day selector
2. Enter the task title and point value (positive for rewards, negative for penalties)
3. Click "Add Task"

### Managing Tasks

- Tasks are filtered by the selected day
- Toggle task completion status by clicking the checkbox or status button
- Delete tasks using the trash icon

### Tracking Progress

- The "Daily Progress" section shows your overall 21-day challenge progress
- Day 1 has a special highlighted section to track your Day 1 completion
- The progress grid shows completion status for all 21 days
- Each day's tasks completion is tracked separately

## Deployment

### Building for Production

```bash
npm run build
```

This will create a `dist` directory with optimized production files.

### Deploying to a Server

1. Set up environment variables on your server
2. Copy the build files to your server
3. Install dependencies and start the Node.js server:
```bash
npm install --production
NODE_ENV=production npm run server
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React Icons](https://react-icons.github.io/react-icons/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Moment.js](https://momentjs.com/) 