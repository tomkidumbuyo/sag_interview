const db = require("../models");
const Book = db.book;

exports.create = async (req, res) => {
    const book = await Book.create({
        name: req.body.name,
        authors: req.body.authors,
    });
    res.send(book)
}

exports.update = async (req, res) => {
    const book = await Book.create({
        id: req.params.id
    },{
        name: req.body.name,
        authors: req.body.authors,
    }) 
}

exports.delete = async (req, res) => {
    await Book.deleteOne({ _id: req.params.id});
    res.send({message: "book deleted successful", status: "success"})
}

exports.getAllBooks = async (req, res) => {
    const book = await Book.find({})
    res.send(book)
}

exports.getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id)
    res.send(book)
}