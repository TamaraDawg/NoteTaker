const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get all notes
router.get('/notes', (req, res) => {
  const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../db.json')));
  res.json(notesData);
});

// Save a new note
router.post('/notes', (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text
  };

  const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../db.json')));
  notesData.push(newNote);
  fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(notesData));

  res.json(newNote);
});

module.exports = router;
