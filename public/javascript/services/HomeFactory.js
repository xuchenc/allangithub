(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);



	function HomeFactory($http, $q) {
		var o = {};


		o.getAllMovie = function(){
			var q =$q.defer();
			$http.get('/api/movie').then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.editPost = function(edittedPostObj){
			var q  = $q.defer();
			$http.put('/api/movie',edittedPostObj).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.deletePost = function(id){
			var q  = $q.defer();
			$http.delete('/api/movie/' + id).then(function(){
				q.resolve();
			});
			return q.promise;
		};

		o.getMovieById = function(id){
			var q = $q.defer();
			$http.get('/api/movie/' + id).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.createComment = function(comment, movieId){
			var q = $q.defer();
			$http.post('/api/movie/' + movieId + '/comment',comment).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.createPost = function(post){
			var q  =$q.defer();
			$http.post('/api/movie',post).then(function(){
				q.resolve();
			});
			return q.promise;
		};





		return o;
	}
})();
