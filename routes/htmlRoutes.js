const express = require('express');
const path = require('path');

const router = express.Router();

// Route to notes.html
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../notes.html'));
});

// Default route to index.html
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = router;
