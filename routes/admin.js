var express = require('express');
var { MongoClient } = require('mongodb');

var router = express.Router();

const books = [
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Lev Nikolayevich Tolstoy',
      bookId: 656,
      read: false
    },
    {
      title: 'Les Misérables',
      genre: 'Historical Fiction',
      author: 'Victor Hugo',
      bookId: 24280,
      read: false
    },
    {
      title: 'The Time Machine',
      genre: 'Science Fiction',
      author: 'H. G. Wells',
      read: false
    },
    {
      title: 'A Journey into the Center of the Earth',
      genre: 'Science Fiction',
      author: 'Jules Verne',
      read: false
    },
    {
      title: 'The Dark World',
      genre: 'Fantasy',
      author: 'Henry Kuttner',
      read: false
    },
    {
      title: 'The Wind in the Willows',
      genre: 'Fantasy',
      author: 'Kenneth Grahame',
      read: false
    },
    {
      title: 'Life On The Mississippi',
      genre: 'History',
      author: 'Mark Twain',
      read: false
    },
    {
      title: 'Childhood',
      genre: 'Biography',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    }];

const title = process.env.TITLE;
/* GET home page. */
router.get('/', function(req, res, next) {
    const url = 'mongodb://library-data:@library-data.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';
    const password = 'nfnlHYRjrVDQ1SRNUkR0AVxxYjgOBX9xCXByQzsbNcxgssZOx1S2koWJoIjcy5f3rV85eh04o08JIf2RHIDtoA==';
    const user = 'library-data';
    const dbName = 'library';

    (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url, {
                auth: {
                    user,
                    password
                }
            }
        );
            const db = client.db(dbName);
            const response = await db.collection('books').insertMany(books);
            res.json(response);
        }catch(err){
            console.log(err);
        }
    })
});

module.exports = router;
