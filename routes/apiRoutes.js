const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/notes', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while reading the notes.' });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

router.post('/notes', (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: 'Note title and text are required.' });
  }

  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while reading the notes.' });
    }
    const notes = JSON.parse(data);
    const newNote = {
      id: generateId(),
      title,
      text,
    };
    notes.push(newNote);

    fs.writeFile('db.json', JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while saving the note.' });
      }
      res.json(newNote);
    });
  });
});

module.exports = router;
