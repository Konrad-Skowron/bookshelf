let myLibrary = JSON.parse(localStorage.getItem('myLibrary') || JSON.stringify([]));
let index = localStorage.getItem('index') || 0;

function Book(title, author, pages, isRead, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.index = index;

  index++;
  localStorage.setItem('index', index);
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead, index);
  myLibrary.push(newBook);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  displayBooks();
}

function removeBook(index) {
  for (i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].index == index) {
      myLibrary.splice(i, 1);
    }
  }
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  displayBooks();
 }

function displayBooks() {
  const container = document.querySelector('#container');
  container.innerHTML = "";

  const h1 = document.createElement('h1');
  h1.innerHTML = "My Books 📚";
  container.append(h1);

  for (i = 0; i < myLibrary.length; i++) {
    const book = document.createElement('div');
    const leftField = document.createElement('div');
    const rightField = document.createElement('div');
    book.classList.add('book');

    leftField.innerHTML = `<span style="font-style: italic">${myLibrary[i].title}</span> 
                            by ${myLibrary[i].author}, 
                            ${myLibrary[i].pages} pages, `;
    
    const isReadBtn = document.createElement('button');
    isReadBtn.setAttribute('id', 'status');
    isReadBtn.classList.add(myLibrary[i].index);   
    if (myLibrary[i].isRead) {
      isReadBtn.innerHTML = "read";
    } else {
      isReadBtn.innerHTML = "not read yet";
    }
    isReadBtn.addEventListener('click', () => {
      for (i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].index == isReadBtn.className) {
          myLibrary[i].isRead = !myLibrary[i].isRead;
        }
      }
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
      displayBooks();
    });
    leftField.append(isReadBtn);

    const remove = document.createElement('button');
    remove.setAttribute('id', 'remove');
    remove.classList.add(myLibrary[i].index);
    remove.innerHTML = "X";
    remove.addEventListener('click', () => {
      removeBook(remove.className);
    });

    rightField.style.textAlign = 'right';
    rightField.append(remove);

    book.appendChild(leftField);
    book.appendChild(rightField);

    container.appendChild(book);
  }
  
  const button = document.createElement('button');
  button.innerHTML = "+";
  button.addEventListener('click', () => {
    outsideForm.style.display = 'grid';
  });

  container.appendChild(button);
}

displayBooks();

const outsideForm = document.querySelector('#outside');
const form = document.querySelector('#form');
const topDiv = document.querySelector('#top');
const leftDiv = document.querySelector('#left');
const rightDiv = document.querySelector('#right');
const bottomDiv = document.querySelector('#bottom');
const addBookBth = document.querySelector('#addBook');

topDiv.addEventListener('click', () => {
  outsideForm.style.display = 'none';
});

leftDiv.addEventListener('click', () => {
  outsideForm.style.display = 'none';
});

rightDiv.addEventListener('click', () => {
  outsideForm.style.display = 'none';
});

bottomDiv.addEventListener('click', () => {
  outsideForm.style.display = 'none';
});

addBookBth.addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.querySelector('#isRead').checked;
  console.log(!isRead);
  if (title && author && pages) {
    addBookToLibrary(title, author, pages, isRead);
  }
});