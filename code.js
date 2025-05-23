
let books = new Array();

function Book (title,author, pages){
this.title=title,
this.author=author,
this.pages=pages
this.id=crypto.randomUUID()
}

function addBookToLibrary (title,author, pages){
    let book = new Book(title,author, pages);
    books.push(book);
}
const body = document.body;
addBookToLibrary('hobbit', 'Jk', 500);
addBookToLibrary('df', 'Jk', 600);
books.forEach(book => {
  const p = document.createElement('p');
  p.textContent = book.title;
  body.appendChild(p);
});


/*
const button = document.querySelector('button');
boton.addEventListener('click', )
*/