const express = require('express');
const cache = require('memory-cache');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = 'bad86217a3c94531b8417cde183d01f2'; 
const CACHE_DURATION = 10 * 60 * 1000; 

app.use(cors());

app.get('/api/headlines', async (req, res) => {
    const cacheKey = 'headlines';
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse) {
        return res.json(cachedResponse);
    }

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch headlines');
        }
        const data = await response.json();
        cache.put(cacheKey, data, CACHE_DURATION);
        res.json(data);
    } catch (error) {
        console.error('Error fetching headlines:', error);
        res.status(500).json({ message: 'Failed to fetch headlines. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
