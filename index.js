const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

const headers = {
  'User-Agent': 'Mozilla/5.0',
  'Accept': 'application/json',
  'Referer': 'https://www.nseindia.com/',
};

app.get('/option-chain', async (req, res) => {
  const symbol = req.query.symbol || 'NIFTY';

  try {
    // Step 1: Warm up NSE site to get cookies
    await axios.get('https://www.nseindia.com', { headers });

    // Step 2: Fetch Option Chain
    const response = await axios.get(
      `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`,
      { headers, timeout: 10000 }
    );

    res.json(response.data);
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: 'NSE API failed', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ NSE proxy running on port ${PORT}`));
