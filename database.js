import mysql from 'mysql2/promise';

let pool;

export async function initializeDatabase() {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hacker_news',
    connectionLimit: 10,
  });

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS stories (
        id VARCHAR(255) PRIMARY KEY,
        title TEXT,
        url TEXT,
        score TEXT,
        author VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export async function saveStory(story) {
  try {
    await pool.query(
      'INSERT INTO stories (id, title, url, score, author) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = ?, url = ?, score = ?, author = ?',
      [story.id, story.title, story.url, story.score, story.author, story.title, story.url, story.score, story.author]
    );
  } catch (error) {
    console.error('Error saving story:', error);
  }
}

export async function getStoriesInLastFiveMinutes() {
  try {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM stories WHERE created_at >= NOW() - INTERVAL 5 MINUTE'
    );
    return rows[0].count;
  } catch (error) {
    console.error('Error getting stories count:', error);
    return 0;
  }
}