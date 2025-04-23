class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
    this.bookList = this.bookRepository.getBooks();
  }

  addBook(book) {
    this.bookList.push(book);
    this.bookRepository.addBooks(this.bookList);
  }

  removeBookByIndex(index) {
    if (index >= 0 && index < this.bookList.length) {
      this.bookList.splice(index, 1);
      this.bookRepository.addBooks(this.bookList);
    } else {
      console.log("Wrong index");
    }
  }

  getBookByTitle(title) {
    return this.bookList.find((book) => book.title === title);
  }

  getBookByIndex(index) {
    return this.bookList[index] ?? null;
  }

  getAllBooks() {
    return this.bookList;
  }
}

module.exports = BookService;
