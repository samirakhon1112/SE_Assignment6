const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let transcripts = []; 

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/transcripts', (req, res) => {
  const { id, text, author } = req.body;
  if (!text) return res.status(400).json({ error: 'text required' });
  const item = {
    id: id || Date.now(),
    text,
    author: author || 'unknown',
    createdAt: new Date().toISOString()
  };
  transcripts.push(item);
  res.status(201).json(item);
});

app.get('/transcripts', (req, res) => res.json(transcripts));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Transcript API listening on port ${PORT}`);
});
