const db = require("../models");
const Book = db.book;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

exports.create = async (req, res) => {
    const book = await Book.create({
        name: req.body.name,
        authors: req.body.authors,
        private: req.body.private,
        description: req.body.description,
        owner: req.userId
    });
    res.send(book)
}

exports.update = async (req, res) => {
    const book = await Book.create({
        id: req.params.id
    },{
        name: req.body.name,
        private: req.body.private,
        description: req.body.description,
        authors: req.body.authors,
    }) 
    res.send(book)
}

exports.delete = async (req, res) => {
    await Book.deleteOne({ _id: req.params.id});
    res.send({message: "book deleted successful", status: "success"})
}

exports.getAllBooks = async (req, res) => {
    if(req.session.token) {
        jwt.verify(req.session.token, config.secret, (err, decoded) => {
            req.userId = decoded.id;
        });
    }
    let query = req.userId ? {$or: [{private: false}, {owner: req.userId}]} : {private: false};
    const book = await Book.find(query)
    res.send(book)
}