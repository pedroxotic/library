
let books = new Array();
let counter = 0;
let table = document.getElementById('table');

//Book constructor
function Book (title,author, pages){
this.title=title,
this.author=author,
this.pages=pages
this.id=crypto.randomUUID();
this.read = false;
}

Book.prototype.changeReadStatus= function (read){
  if (read==true) {
    this.read=false;
  } else {
    this.read=true;
  }
  
}

function addBookToLibrary (title,author, pages){
    let book = new Book(title,author, pages);
    books.push(book);
    console.log(book);
}

// form hide and unhide
let newbtn = document.getElementById("newbtn");
let formulario = document.getElementById("modalOverlay");
newbtn.addEventListener('click', function(event){
  formulario.style.display = 'flex';
})
let closemodal = document.getElementById("closeModal");
closemodal.addEventListener('click', function(event){
  formulario.style.display = 'none';
})

const bookForm = document.getElementById("bookForm");
bookForm.addEventListener('submit', function(event){
  event.preventDefault();
  let booktitle = bookForm.elements['title'].value;
  let bookauthor = bookForm.elements['author'].value;
  let bookpages = bookForm.elements['pages'].value;
  addBookToLibrary(booktitle, bookauthor, bookpages);

  renderBooks();
  console.log(books);
})

// hacer funcion displayBook
// Render all books in the table
function renderBooks() {
  // Remove all rows except the header
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  books.forEach((book) => {
    const fila = document.createElement('tr');
    fila.dataset.id = book.id;
    table.appendChild(fila);

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
    readCheckboxTd.appendChild(readCheckbox);
    fila.appendChild(readCheckboxTd);
    readCheckbox.addEventListener('change', ()=>
       {
      book.changeReadStatus(book.read);
        console.log(book);

    })

    let celdaDelete = document.createElement('button');
    celdaDelete.textContent = "x";
    celdaDelete.dataset.id = book.id;
    let celdaDeleteTd = document.createElement('td');
    celdaDeleteTd.appendChild(celdaDelete);
    fila.appendChild(celdaDeleteTd);
  

    celdaDelete.addEventListener('click', function(event) {
      // Find the book by id and remove it
      const bookIndex = books.findIndex(b => b.id === celdaDelete.dataset.id);
      if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        renderBooks();
        console.log(books);
      }
    });
  });
}

