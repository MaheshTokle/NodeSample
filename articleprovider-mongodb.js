var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

ArticleProvider = function(host, port) {
  this.db = monk(host+':'+port+'/node-mongo-blog');
};


ArticleProvider.prototype.getCollection= function(callback) {
  var article_collection = db.get('articles');
  callback(null, article_collection);
};

ArticleProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, article_collection) {
        if (error) callback(error);
        else {
            article_collection.find({}, {}, function(error, docs) {
                if (error) callback(error);
                else callback(null, docs);
            });
        }
    });
};


ArticleProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.findById(id, function(error, doc){
          if( error ) callback(error)
          else callback(null, doc)
        });
      }
    });
};

ArticleProvider.prototype.save = function(articles, callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        if( typeof(articles.length)=="undefined")
          articles = [articles];

        for( var i =0;i< articles.length;i++ ) {
          article = articles[i];
          article.created_at = new Date();
          if( article.comments === undefined ) article.comments = [];
          for(var j =0;j< article.comments.length; j++) {
            article.comments[j].created_at = new Date();
          }
        }

        article_collection.insert(articles, function(error, arts) {
          callback(null, arts);
        });
      }
    });
};

exports.ArticleProvider = ArticleProvider;