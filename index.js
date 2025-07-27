const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const tough = require('tough-cookie');

const app = express();
app.use(cors());

const jar = new tough.CookieJar();
const client = wrapper(axios.create({ jar }));

const headers = {
  'User-Agent': 'Mozilla/5.0',
  'Accept': 'application/json',
  'Referer': 'https://www.nseindia.com',
};

app.get('/option-chain', async (req, res) => {
  const symbol = req.query.symbol || 'NIFTY';

  try {
    // Warm-up request to set cookie
    await client.get('https://www.nseindia.com', { headers });

    // Actual data fetch
    const response = await client.get(
      `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`,
      { headers }
    );

    res.json(response.data);
  } catch (error) {
    console.error('❌ NSE fetch failed:', error.message);
    res.status(502).json({
      error: 'NSE Gateway failed',
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ NSE proxy running on port ${PORT}`));
