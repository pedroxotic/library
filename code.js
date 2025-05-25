
let books = new Array();
let table = document.getElementById('table');

function Book (title,author, pages){
this.title=title,
this.author=author,
this.pages=pages
this.id=crypto.randomUUID();
}
let book1 = new Book('harry', 'jk', 100);
console.log(book1);
function addBookToLibrary (title,author, pages){
    let book = new Book(title,author, pages);
    books.push(book);
}
addBookToLibrary('hobbit', 'Jk', 500);
addBookToLibrary('df', 'Jk', 600);


books.forEach(book => {
  const fila = document.createElement('tr');
  fila.id = 'fila';
  table.appendChild(fila);

  // for each book agrega una celda a la fila
  bookarr = new Array();
  bookarr.push(book.title, book.author, book.pages);

  console.log(bookarr);

  
  bookarr.forEach( (item,index) =>{
    let celda = document.createElement('th');
    celda.textContent = bookarr[index];
    fila.appendChild(celda);
  })
  

});

let newbtn = document.getElementById("newbtn");
let formulario = document.getElementById("modalOverlay");
newbtn.addEventListener('click', function(event){
  formulario.style.display = 'flex';
})

let closemodal = document.getElementById("closeModal");
closemodal.addEventListener('click', function(event){
  formulario.style.display = 'none';
})

