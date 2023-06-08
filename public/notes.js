// notes.js

document.querySelector('.save-note').addEventListener('click', () => {
    const title = document.querySelector('.note-title').value;
    const text = document.querySelector('.note-textarea').value;
  
    if (title && text) {
      saveNote(title, text);
      clearInputs();
      fetchNotes();
    }
  });
  
  document.querySelector('.new-note').addEventListener('click', () => {
    clearInputs();
  });
  
  function saveNote(title, text) {
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, text }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  
  function clearInputs() {
    document.querySelector('.note-title').value = '';
    document.querySelector('.note-textarea').value = '';
  }
  
  function fetchNotes() {
    fetch('/api/notes')
      .then((response) => response.json())
      .then((data) => renderNotes(data))
      .catch((error) => console.error(error));
  }
  
  function renderNotes(notes) {
    const listContainer = document.querySelector('.list-container');
    listContainer.innerHTML = '';
  
    notes.forEach((note) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.innerText = note.title;
      listContainer.appendChild(listItem);
    });
  }
  
  fetchNotes();
  