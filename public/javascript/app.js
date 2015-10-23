(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider,$httpProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/Home.html'
		}).state('Login_Register',{
			url:'/login-register',
			templateUrl:'views/login_register.html'
		}).state('CreatePost',{
			url:'/create',
			templateUrl:"views/create.html"
		}).state('MovieList',{
			url:'/movielist',
			templateUrl:'views/movieList.html'
		}).state('EditPost',{
			url:'/editpost/:id',
			templateUrl:'views/editPost.html'
		}).state('PostDetails',{
			url:'/post/:id',
			templateUrl:'views/postDetails.html'
		});
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push('AuthInterceptor');
	}
})();
