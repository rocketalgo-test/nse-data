const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/option-chain', async (req, res) => {
  const symbol = req.query.symbol || 'NIFTY';
  try {
    const response = await axios.get(
      `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json',
          'Referer': 'https://www.nseindia.com/',
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'NSE fetch failed', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ NSE Proxy running on port ${PORT}`);
});
