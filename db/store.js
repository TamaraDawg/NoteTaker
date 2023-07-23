//Requiring necessary packages from npm
const util = require('util');
const fs = require('fs');

// This package will be used to generate ids
const { v1: uuidv1 } = require('uuid');

//Used to read and write files asynchronously
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
//Creates a class that stores notes in the db/json file
class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  readNotes() {
    return this.read().then((notes) => {
      let parseNotes;
      try {
        parseNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parseNotes = [];
      }

      return parseNotes;
    });
  }

  makeNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    const newNote = { title, text, id: uuidv1() };

    return this.readNotes()
      .then((notes) => [...notes, newNote])
      .then((updateNotes) => this.write(updateNotes))
      .then(() => newNote);
  }

  deleteNote(id) {
    return this.readNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filterNotes) => this.write(filterNotes));
  }
}

module.exports = new Store();