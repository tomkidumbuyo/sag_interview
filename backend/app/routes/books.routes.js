const controller = require("../controllers/book.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/book/create",[authJwt.verifyToken], controller.create);

    app.put("/api/book/:id",[authJwt.verifyToken], controller.update);

    app.delete("/api/book/:id",[authJwt.verifyToken], controller.delete);

    app.get("/api/book", controller.getAllBooks);

    app.get("/api/books/:id", controller.getBookById);

}