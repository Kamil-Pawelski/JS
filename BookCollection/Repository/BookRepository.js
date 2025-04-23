const fs = require("fs");

class BookRepository {
  constructor(path) {
    this.path = path;
  }

  addBooks(books) {
    let boooksJson = JSON.stringify(books);
    fs.writeFileSync(this.path, boooksJson, "utf-8");
  }

  getBooks() {
    if (!fs.existsSync(this.path)) {
      return [];
    }

    let books = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(books);
  }
}

module.exports = BookRepository;
