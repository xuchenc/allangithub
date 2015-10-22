(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);
	function GlobalController(UserFactory, $state) {
		var vm = this;
    vm.user = {};
    vm.isLogin = true;
    vm.status = UserFactory.status;


    vm.logout = function(){
      UserFactory.logout();
    };


    vm.register = function(){
      UserFactory.register(vm.user).then(function(){
        $state.go('Home');
      });
    };


    vm.login = function(){
      UserFactory.login(vm.user).then(function(){
        $state.go('Home');
      });
    };

	}
})();
