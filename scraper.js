import axios from 'axios';
import * as cheerio from 'cheerio';
import cron from 'node-cron';
import { saveStory, getStoriesInLastFiveMinutes } from './database.js';

const HN_URL = 'https://news.ycombinator.com/';

async function scrapeHackerNews() {
    try {
      const { data } = await axios.get(HN_URL); // Fetch the HTML of Hacker News
      const $ = cheerio.load(data); // Load the HTML into Cheerio
      const stories = []; // Array to hold all scraped stories
  
      // Loop through each row with class 'athing'
      $('.athing').each((index, element) => {
        // Extract story ID and title from the first row (tr with class 'athing')
        const id = $(element).attr('id'); // Story ID
        const title = $(element).find('.titleline > a').text(); // Story title
        const url = $(element).find('.titleline > a').attr('href'); // Story link
  
        // Find the next row (which contains the metadata like score and author)
        const nextRow = $(element).next(); // This is the <tr> with the subtext
  
        // Extract metadata from the next row
        const score = nextRow.find('.score').text(); // Story score
        const author = nextRow.find('.hnuser').text(); // Story author
        const comments = nextRow.find('.age').text(); // Time ago
  
        // Add the extracted information into the stories array
        stories.push({ id, title, url, score, author, comments });
      });
  
      return stories; // Return all scraped stories
    } catch (error) {
      console.error('Error scraping Hacker News:', error);
      return []; // Return an empty array if there's an error
    }
  }
  

export function startScraping(wss) {
  cron.schedule('*/5 * * * *', async () => {
    const stories = await scrapeHackerNews();
    for (const story of stories) {
      await saveStory(story);
    }
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ type: 'update', stories }));
    });
  });
}

export async function getInitialData() {
    const storiesCount = await getStoriesInLastFiveMinutes();
    return { storiesCount };
  }
  