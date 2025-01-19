# HackerNewsScraper

HackerNewsScraper is a Node.js application that scrapes the latest stories from Hacker News, stores them in a MySQL database, and provides real-time updates to connected clients via WebSockets.

## Features
- Scrapes Hacker News every 5 minutes for the latest stories.
- Stores story details (ID, title, URL, score, author) in a MySQL database.
- Sends real-time updates to WebSocket clients.
- Tracks the number of stories added in the last 5 minutes.

## Prerequisites
Before setting up the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://dev.mysql.com/downloads/installer/)
- [Git](https://git-scm.com/)

## Setup Instructions

### 1. Clone the Repository
Open Command Prompt (CMD) and run the following command:
```cmd
git clone <repository_url>
```
Replace `<repository_url>` with the URL of the GitHub repository.

### 2. Navigate to the Project Directory
```cmd
cd HackerNewsScraper
```

### 3. Install Dependencies
```cmd
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the project root directory and add the following content:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD="please use your password"
DB_NAME=hacker_news
PORT=3000
```
Replace `DB_USER` and `DB_PASSWORD` with your MySQL credentials.

### 5. Set Up the Database
Run the following command to initialize the database:
```cmd
mysql -u root -p < init.sql
```
Replace `root` with your MySQL username. Enter your MySQL password when prompted.

### 6. Start the Application
```cmd
npm start
```
The application will start on `http://localhost:3000`.

### 7. WebSocket Connection
The application uses WebSockets to send real-time updates. Connect to the WebSocket server at:
```
ws://localhost:3000
```

## Project Structure
```
HackerNewsScraper/
├── .env                 # Environment variables
├── database.js          # Database initialization and queries
├── init.sql             # SQL script for database setup
├── package.json         # Project metadata and dependencies
├── scraper.js           # Scraping logic and scheduled tasks
├── server.js            # Main server entry point
├── websocket.js         # WebSocket server setup
└── README.md            # Project documentation
```

## How It Works
1. **Scraping**: The `scraper.js` file fetches the Hacker News homepage, extracts story details using Cheerio, and stores them in the database.
2. **Database**: The `database.js` file manages the MySQL database connection and queries.
3. **WebSocket**: The `websocket.js` file establishes a WebSocket server to send updates to connected clients.
4. **Server**: The `server.js` file initializes the database, starts the scraping process, and sets up the WebSocket server.

## Known Limitations
- The scraper only fetches stories from the Hacker News homepage.
- The project assumes a local MySQL server is running.

## Troubleshooting
- **MySQL Errors**: Ensure your MySQL server is running and the credentials in `.env` are correct.
- **Port Conflicts**: If port `3000` is in use, update the `PORT` value in the `.env` file.
- **Dependencies**: Run `npm install` to ensure all required packages are installed.


