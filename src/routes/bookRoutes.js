const express = require('express');
const bookRouter = express.Router();
const  bookController  = require('../controller/bookController');
const goodreadsService = require('../services/goodreadsService');

function Router(nav) {
    const { middleware, getIndex, getById } = bookController(nav,goodreadsService);
    // bookRouter.use(middleware);
    bookRouter.route('/')
        .get(getIndex);
    bookRouter.route('/:id')
        .get(getById);
    return bookRouter;

}

module.exports = Router;