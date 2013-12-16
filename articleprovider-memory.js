var articleCounter = 1;
ArticleProvider = function() {};
ArticleProvider.prototype.dummydata = [];
ArticleProvider.prototype.findAll = function(callback){
	callback(null, this.dummydata);
};

ArticleProvider.prototype.findById = function(callback, id){
	var result = null;
	for (var i = 0; i < this.dummydata.length; i++) {
		if(dummydata[i]._id===id){
			result = dummydata[i];
		}
	};
	callback(null, result);
};

ArticleProvider.prototype.save = function(callback, articles){
	var article = null;
	if(typeof(articles.length)==="undefined"){
		articles = [articles];
	}
	for (var i = 0; i < articles.length; i++) {
		article = articles[i];
		article._id = articleCounter++;
		article.created_at = new Date();
		if(article.comments == undefined){
			article.comments = [];
		}
		for (var j = 0; j < article.comments.length; j++) {
			article.comments[j].created_at = new Date();
		};
		this.dummydata[this.dummydata.length] = article;
	};
	callback(null, articles);
};

new ArticleProvider().save(function(error, articles) {}, [
	{title:"Post one", body:"Body one", comments: [{author:"mt", comment: "Like"}, {author:"ut", comment:"Dont like it"}]},
	{title:"Post two", body:"Body two", comments: []}
]);

exports.ArticleProvider = ArticleProvider;