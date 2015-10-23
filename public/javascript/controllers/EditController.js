(function() {
	'use strict';
	angular.module('app')
	.controller('EditController', EditController);
	function EditController(HomeFactory, $state) {
		var vm = this;
    vm.post = {};

    vm.editPost = function(){
      HomeFactory.editPost(vm.edittedPost).then(function(res){
        
      });
    };



  }
})();
