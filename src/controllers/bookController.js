var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {
  var middleware = function (req, res, next) {
    // if (!req.user) {
    // res.redirect('/');
    // }
    next();
  };

  var getIndex = function(req, res) {
    var url = 'mongodb://localhost:27017/libraryapp';
    mongodb.connect(url, function (err, db) {
      var collection = db.collection('books');
      collection.find({}).toArray(function (err, results) {
        res.render('booklistView', {
          title: 'Books',
          nav: nav,
          books: results
        });
      });
    });
  };

  var getById = function(req, res) {
    var id = new ObjectId(req.params.id);
    var url = 'mongodb://localhost:27017/libraryapp';
    mongodb.connect(url, function (err, db) {
      var collection = db.collection('books');
      collection.findOne({_id: id}, function (err, results) {
        if (results.bookId) {
          bookService.getBookById(results.bookId, function (err, book) {
            results.book = book;
            res.render('bookView', {
              title: 'Books',
              nav: nav,
              books: results
            });
          });
        } else {
          res.render('bookView', {
            title: 'Books',
            nav: nav,
            books: results
          });
        }
      });
    });
  };

  return {
    getIndex: getIndex,
    getById: getById,
    middleware: middleware
  };
};

module.exports = bookController;
