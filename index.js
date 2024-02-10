const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 4000;



app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
