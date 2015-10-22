(function() {
	'use strict';
	angular.module('app')
	.controller('CreateController', CreateController);
	function CreateController(HomeFactory, $state) {
		var vm = this;
    vm.post = {};

    vm.createPost = function(){
      HomeFactory.createPost(vm.post).then(function(){
        $state.go('MovieList');
      });
    };




  }
})();
