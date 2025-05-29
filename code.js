
let books = new Array();
let counter = 0;
let table = document.getElementById('table');

//Book constructor
function Book (title,author, pages){
this.title=title,
this.author=author,
this.pages=pages
this.id=crypto.randomUUID();
}

function addBookToLibrary (title,author, pages){
    let book = new Book(title,author, pages);
    books.push(book);
}

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
  addBookToLibrary (booktitle,bookauthor, bookpages);
  
  displayBook(books, counter);
  counter += 1;
  console.log(books);
})

// hacer funcion displayBook

function displayBook(books, counter){
 const fila = document.createElement('tr'); // Create a new table row
  fila.id = 'fila';
  fila.dataset.id=counter;
  table.appendChild(fila);

 let bookarr = [books[counter].title, books[counter].author, books[counter].pages];

 bookarr.forEach((item, index) => {
    let celda = document.createElement('th');
    celda.textContent = bookarr[index];
    fila.appendChild(celda);
  });
    let celdaDelete = document.createElement('button');
    celdaDelete.textContent = "x";
    celdaDelete.dataset.id=counter;
    fila.appendChild(celdaDelete);

    celdaDelete.addEventListener('click', function(event){

    
     books.splice(parseInt(celdaDelete.dataset.id), 1);
     fila.remove();
     console.log(books);

    } )

  }


