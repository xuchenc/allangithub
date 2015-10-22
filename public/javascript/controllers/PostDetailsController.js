(function() {
	'use strict';
	angular.module('app')
	.controller('PostDetailsController', PostDetailsController);



	function PostDetailsController(HomeFactory,$state,$stateParams) {
		var vm = this;
    vm.comment = {};
    if($stateParams.id){
    HomeFactory.getMovieById($stateParams.id).then(function(res){
      vm.movie = res;
    });
  }

    vm.addComment = function(){
      HomeFactory.createComment(vm.comment, $stateParams.id).then(function(res){

      });
    };




  }
})();
