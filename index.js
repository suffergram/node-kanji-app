// external modules

const express = require('express');
const fs = require('fs').promises;
const path = require('path');


// app variables

const app = express();
const port = 4000;

const kanji = require('./data/kanji/kanji');
const vocab = require('./data/vocab/vocab');


// app configuration


// routes definitions

app.get('/', (req, res) => {
  res.writeHead(200);
  res.end(`
               This is Kanji App Api

  /----------------------------------------------/
  
  use  /kanji      to get all kanji
  use  /kanji/:id  to get kanji with a specific id

  /----------------------------------------------/

  use  /vocab      to get all vocab
  use  /vocab/:id  to get vocab with a specific id

  /----------------------------------------------/
  `);
});

app.get('/kanji', (req, res) => {
  try {
    let content = kanji;

    if (req.query) {
      console.log(req.query);

      if (req.query.jlpt) {
        const level = parseInt(req.query.jlpt);

        content = content.filter(item => item.jlpt <= level);
      }

      if (req.query.kanji) {
        const kanji = req.query.kanji;

        content = content.filter(item => item.kanji === kanji);
      }
    }

    if (content.length === 1) content = content[0];
    if (content.length === 0) throw new Error('Not found');

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(content));
  } catch (error) {
    res.writeHead(404);
    res.end(error.message);
  }
});

app.get('/kanji/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const content = kanji.filter(item => item.id === id)[0];

    if (!content) throw new Error('Not found');

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(content));
  } catch (error) {
    res.writeHead(404);
    res.end(error.message);
  }
});

app.get('/vocab', (req, res) => {
  try {
    let content = vocab;

    if (req.query) {

    }

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(content));
  } catch (error) {
    res.writeHead(404);
    res.end(error.message);
  }
});

app.get('/vocab/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const content = vocab.filter(item => item.id === id)[0];

    if (!content) throw new Error('Not found');

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(content));
  } catch (error) {
    res.writeHead(404);
    res.end(error.message);
  }
});


// server activation

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
