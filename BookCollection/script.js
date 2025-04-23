const readline = require("readline");
const BookRepository = require("./Repository/BookRepository");
const BookService = require("./Service/BookService");
const filePath = require("./path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const bookRepository = new BookRepository(filePath);
const bookService = new BookService(bookRepository);

function showMenu() {
  console.log("\nMenu:");
  console.log("1. Add a book");
  console.log("2. View all books");
  console.log("3. Remove a book");
  console.log("4. Exit");
  rl.question("\nChoose an option: ", handleMenuChoice);
}

function handleMenuChoice(choice) {
  switch (choice) {
    case "1":
      addBook();
      break;
    case "2":
      viewBooks();
      break;
    case "3":
      removeBook();
      break;
    case "4":
      console.log("Goodbye!");
      rl.close();
      break;
    default:
      console.log("Invalid choice, please try again.");
      showMenu();
      break;
  }
}

function addBook() {
  rl.question("Enter book title: ", (title) => {
    rl.question("Enter book author: ", (author) => {
      rl.question("Enter book year: ", (year) => {
        bookService.addBook({ title, author, year });
        console.log(`Book added: ${title} by ${author} ${year}`);
        showMenu();
      });
    });
  });
}

function viewBooks() {
  const books = bookService.getAllBooks();
  if (books.length === 0) {
    console.log("No books found.");
  } else {
    console.log("\nBooks in the collection:");
    books.forEach((book, index) => {
      console.log(`${index + 1}. ${book.title} by ${book.author}`);
    });
  }
  showMenu();
}

function removeBook() {
  const books = bookService.getAllBooks();
  if (books.length === 0) {
    console.log("No books to remove.");
    showMenu();
    return;
  }

  rl.question("Enter the index of the book to remove: ", (index) => {
    const bookIndex = parseInt(index) - 1;
    bookService.removeBookByIndex(bookIndex);
    showMenu();
  });
}

showMenu();
