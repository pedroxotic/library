let books = [];
let table = document.getElementById('table');
const tbody = table.querySelector('tbody');
const API_URL = 'http://localhost:3000';

// Load books from backend when page loads
async function loadBooks() {
  try {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) throw new Error('Failed to load books');
    books = await response.json();
    console.log('Loaded books:', books);
    renderBooks();
  } catch (error) {
    console.error('Error loading books:', error);
  }
}

// Load books when page loads
loadBooks();

//Book constructor
function Book(title, author, pages, id = null, readornot = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id || crypto.randomUUID();
  this.readornot = readornot;
}

Book.prototype.changeReadStatus = async function(read) {
  try {
    const response = await fetch(`${API_URL}/books/${this.id}/read`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ readornot: read }),
    });
    if (!response.ok) throw new Error('Failed to update read status');
    this.readornot = read;
  } catch (error) {
    console.error('Error updating read status:', error);
  }
}

async function addBookToLibrary(title, author, pages) {
  try {
    console.log('Adding book:', { title, author, pages });
    const response = await fetch(`${API_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, pages }),
    });
    if (!response.ok) throw new Error('Failed to add book');
    const newBook = await response.json();
    console.log('Received new book from server:', newBook);
    books.push(new Book(
      newBook.title,
      newBook.author,
      newBook.pages,
      newBook.id,
      newBook.readornot
    ));
    console.log('Current books array:', books);
    renderBooks();
  } catch (error) {
    console.error('Error adding book:', error);
    alert('Failed to add book. Please try again.');
  }
}

// form hide and unhide
let newbtn = document.getElementById("newbtn");
let formulario = document.getElementById("modalOverlay");
newbtn.addEventListener('click', function(event) {
  formulario.style.display = 'flex';
})

let closemodal = document.getElementById("closeModal");
closemodal.addEventListener('click', function(event) {
  formulario.style.display = 'none';
})

const bookForm = document.getElementById("bookForm");
bookForm.addEventListener('submit', function(event) {
  event.preventDefault();
  let booktitle = bookForm.elements['title'].value;
  let bookauthor = bookForm.elements['author'].value;
  let bookpages = bookForm.elements['pages'].value;
  console.log('Form submitted with values:', { booktitle, bookauthor, bookpages });
  addBookToLibrary(booktitle, bookauthor, bookpages);
  bookForm.reset();
  formulario.style.display = 'none';
})

// Render all books in the table
function renderBooks() {
  console.log('Rendering books:', books);
  // Clear the tbody
  tbody.innerHTML = '';

  books.forEach((book) => {
    console.log('Rendering book:', book);
    const fila = document.createElement('tr');
    fila.dataset.id = book.id;
    tbody.appendChild(fila);

    let bookarr = [book.title, book.author, book.pages];
    bookarr.forEach((item) => {
      let celda = document.createElement('td');
      celda.textContent = item;
      fila.appendChild(celda);
    });

    //checkbox button 
    let readCheckboxTd = document.createElement('td');
    let readCheckbox = document.createElement('input');
    readCheckbox.type = 'checkbox';
    readCheckbox.checked = book.readornot;
    readCheckboxTd.appendChild(readCheckbox);
    fila.appendChild(readCheckboxTd);
    
    readCheckbox.addEventListener('change', async () => {
      await book.changeReadStatus(readCheckbox.checked);
    });

    let celdaDelete = document.createElement('button');
    celdaDelete.textContent = "x";
    celdaDelete.dataset.id = book.id;
    let celdaDeleteTd = document.createElement('td');
    celdaDeleteTd.appendChild(celdaDelete);
    fila.appendChild(celdaDeleteTd);

    celdaDelete.addEventListener('click', async function(event) {
      try {
        const response = await fetch(`${API_URL}/books/${book.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete book');
        
        // Remove book from local array
        const bookIndex = books.findIndex(b => b.id === book.id);
        if (bookIndex !== -1) {
          books.splice(bookIndex, 1);
          renderBooks();
        }
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book. Please try again.');
      }
    });
  });
}

