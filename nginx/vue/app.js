import express from 'express';
//const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  console.log('You are Gay');
  res.send('Hello World!');
});

app.get('/api/connect', (req, res) => {
  console.log('Connection Established');
  res.json({ message: 'Connection Established' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
