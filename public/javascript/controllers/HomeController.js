(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);



	function HomeController(HomeFactory) {
		var vm = this;
		vm.edittedPost = {};


		 HomeFactory.getAllMovie().then(function(res){
			 vm.posts = res;

		 });

		 vm.deletePost = function(post){
				HomeFactory.deletePost(post._id).then(function(){
					vm.posts.splice(vm.posts.indexOf(post),1);
		 });
	 };

		 vm.editPost = function(postId){
			 HomeFactory.editPost({IDofpostToEdit: postId, postEditted: vm.edittedPost}).then(function(res){
				 console.log("Made it back");
				 console.log(res);
				 vm.edittedPost = null;
				//  vm.showEdit = false;


				 		 HomeFactory.getAllMovie().then(function(res){
				 			 vm.posts = res;
				 		 });
			 });
		 };






 }




})();
