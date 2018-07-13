const axios = require('axios');
const xml2js = require('xml2js')

const parser = xml2js.Parser({ explicitArray: false });
const debug = require('debug')('app:goodreadsService');

function goodreadsService() {
    function getBookById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=sEyIKTDBB5dChTbL8DSGpQ`)
                .then((response) => {
                    parser.parseString(response.data, (err, result) => {
                        if (err) { debug(err);}
                        else {
                            debug('ok');
                            resolve(result.GoodreadsResponse.book);
                        }
                    });
                })
                .catch((err) => {
                    reject(err);
                    debug(err);
                })
        });
    }

    return { getBookById };
}
module.exports = goodreadsService();