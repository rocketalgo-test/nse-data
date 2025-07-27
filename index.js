const express = require('express');
const cors = require('cors');
const { NSE } = require('nse-data');

const app = express();
app.use(cors());

const nse = new NSE();

app.get('/option-chain', async (req, res) => {
  const symbol = req.query.symbol || 'NIFTY';
  try {
    const data = await nse.getOptionChain(symbol.toUpperCase());
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ NSE proxy running on port ${PORT}`);
});
