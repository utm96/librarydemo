const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb');
module.exports = function bookController(nav, bookService) {
    function getIndex(req, res) {
        const url = 'mongodb://utm:m123456@ds129541.mlab.com:29541/librarydemo';
        const dbName = 'librarydemo';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('connect correctly');
                const db = client.db(dbName);

                const col = await db.collection('books');
                const books = await col.find().toArray();
                res.render('bookListView',
                    {
                        nav,
                        title: 'Library',
                        books
                    }
                );
            }
            catch (error) {
                debug(error.stack);
            }
            client.close();
        }());
    }
    function getById(req, res) {
        const { id } = req.params;
        const url = 'mongodb://utm:m123456@ds129541.mlab.com:29541/librarydemo';
        const dbName = 'librarydemo';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('connect correctly');
                const db = client.db(dbName);

                const col = await db.collection('books');
                debug('ok');
                const book = await col.findOne({ id });
                debug(book);
                res.render('bookView',
                    {
                        nav,
                        title: 'Library',
                        book
                    }
                );
                client.close();

            }

            catch (error) {
                error.stack;
            }
        }());

    }
    function middleware(req, res, next) {
        if (req.user) {
            next();
        }
        else {
            res.redirect('/');
        }
    }

    return {
        getIndex, getById, middleware
    };
}