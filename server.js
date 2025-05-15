const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// GET /api/v1/typhoon/
app.get('/api/v1/typhoon/', (req, res) => {
  const filePath = path.join(__dirname, 'response.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read JSON file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const json = JSON.parse(data);
      res.status(200).json(json);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      res.status(500).json({ error: 'Malformed JSON data' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}/api/v1/typhoon/`);
});