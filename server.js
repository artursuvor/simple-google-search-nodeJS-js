const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.use(express.static('public'));

app.get('/search', async (req, res) => {
    const query = req.query.query; 
    const apiKey = process.env.API_KEY;
    const searchEngineId = process.env.SEARCH_ENGINE_ID;
    
    try {
        const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${searchEngineId}`;
        const response = await axios.get(url);

        if (!response.data.items || response.data.items.length === 0) {
            res.status(404).send('No results found');
            return;
        }
        res.json(response.data.items);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).send('An error occurred while searching');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
