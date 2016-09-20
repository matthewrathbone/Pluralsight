var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
  {
    title:  'War and Peace',
    genre:  'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read:   false
  },
  {
    title:  'Les Miserables',
    genre:  'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read:   false
  },
  {
    title:  'A Journey into the center of the Earth',
    genre:  'Science Fiction',
    author: 'Jules Verne',
    read:   false
  },
  {
    title:  'The Dark World',
    genre:  'Fantasy',
    author: 'Henry Kuttner',
    read:   false
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
    author: 'Lev Nikolavevich Tolstov',
    read: false
  }
];

var router = function (nav) {

  adminRouter.route('/addBooks')
    .get(function (req, res) {
      var url = 'mongodb://localhost:27017/libraryapp';
      mongodb.connect(url, function (err, db) {
        var collection = db.collection('books');
        collection.insertMany(books, function (err, results) {
          res.send(results);
          db.close();
        });
      });
      // res.send('Inserting books');
    });

  return adminRouter;
};

module.exports = router;
