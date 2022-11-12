const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    name: String,
    private: {
      type: Boolean,
      default: false
    },
    authors: [String],
    description: { type: String, maxlength: 200 },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  })
);

module.exports = Book;