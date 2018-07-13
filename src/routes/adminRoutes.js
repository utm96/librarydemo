const express = require('express');
const adminRouter = express.Router();
const debug = require('debug')('app:adminRoutes');
const  mongoClient  = require('mongodb').MongoClient;
const bookcontroll = require('../services/goodreadsService');

function route(nav) {
    adminRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://utm:m123456@ds129541.mlab.com:29541/librarydemo';
            const dbName = 'librarydemo';
            (async function mongo() {
                let client;
                try {
                    client = await mongoClient.connect(url);
                    debug('connect correctly');
                    const db = client.db(dbName);
                    for (let i=600;i<=700;i++){
                    let book = await bookcontroll.getBookById(i);
                    const response = await db.collection('books').insertOne(book);}
                    // res.json(response);
                } catch (error) {
                    debug(error.stack);
                }
                client.close();
            } ());
});
return adminRouter;
}

module.exports = route;