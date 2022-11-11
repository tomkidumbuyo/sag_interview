const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    name: String,
    authors: [String]
  })
);

module.exports = Book;