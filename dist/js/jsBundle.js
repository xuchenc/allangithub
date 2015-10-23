(function() {
    'use strict';
    angular.module('app', ['ui.router'])
        .config(Config);

    function Config($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider.state('Home', {
            url: '/',
            templateUrl: 'views/Home.html'
        }).state('Login_Register', {
            url: '/login-register',
            templateUrl: 'views/login_register.html'
        }).state('CreatePost', {
            url: '/create',
            templateUrl: "views/create.html"
        }).state('MovieList', {
            url: '/movielist',
            templateUrl: 'views/movieList.html'
        }).state('EditPost', {
            url: '/editpost/:id',
            templateUrl: 'views/editPost.html'
        }).state('PostDetails', {
            url: '/post/:id',
            templateUrl: 'views/postDetails.html'
        });
        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push('AuthInterceptor');
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('CreateController', CreateController);

    function CreateController(HomeFactory, $state) {
        var vm = this;
        vm.post = {};

        vm.createPost = function() {
            HomeFactory.createPost(vm.post).then(function() {
                $state.go('MovieList');
            });
        };




    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('EditController', EditController);

    function EditController(HomeFactory, $state) {
        var vm = this;
        vm.post = {};

        vm.editPost = function() {
            HomeFactory.editPost(vm.edittedPost).then(function(res) {

            });
        };



    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('GlobalController', GlobalController);

    function GlobalController(UserFactory, $state) {
        var vm = this;
        vm.user = {};
        vm.isLogin = true;
        vm.status = UserFactory.status;


        vm.logout = function() {
            UserFactory.logout();
        };


        vm.register = function() {
            UserFactory.register(vm.user).then(function() {
                $state.go('Home');
            });
        };


        vm.login = function() {
            UserFactory.login(vm.user).then(function() {
                $state.go('Home');
            });
        };

    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('HomeController', HomeController);



    function HomeController(HomeFactory) {
        var vm = this;
        vm.edittedPost = {};


        HomeFactory.getAllMovie().then(function(res) {
            vm.posts = res;

        });

        vm.deletePost = function(post) {
            HomeFactory.deletePost(post._id).then(function() {
                vm.posts.splice(vm.posts.indexOf(post), 1);
            });
        };

        vm.editPost = function(postId) {
            HomeFactory.editPost({
                IDofpostToEdit: postId,
                postEditted: vm.edittedPost
            }).then(function(res) {
                console.log("Made it back");
                console.log(res);
                vm.edittedPost = null;
                //  vm.showEdit = false;


                HomeFactory.getAllMovie().then(function(res) {
                    vm.posts = res;
                });
            });
        };






    }




})();

(function() {
    'use strict';
    angular.module('app')
        .controller('PostDetailsController', PostDetailsController);



    function PostDetailsController(HomeFactory, $state, $stateParams) {
        var vm = this;
        vm.comment = {};
        if ($stateParams.id) {
            HomeFactory.getMovieById($stateParams.id).then(function(res) {
                vm.movie = res;
            });
        }

        vm.addComment = function() {
            HomeFactory.createComment(vm.comment, $stateParams.id).then(function(res) {

            });
        };




    }
})();

(function() {
    'use strict';
    angular.module('app')
        .factory('AuthInterceptor', AuthInterceptor);



    function AuthInterceptor($window) {
        var o = {
            request: function(config) {
                if ($window.localStorage.getItem('token')) {
                    config.headers.authorization = "Bearer " + $window.localStorage.getItem('token');
                }
                return config;
            }
        };

        return o;

    }
})();

(function() {
    'use strict';
    angular.module('app')
        .factory('HomeFactory', HomeFactory);



    function HomeFactory($http, $q) {
        var o = {};


        o.getAllMovie = function() {
            var q = $q.defer();
            $http.get('/api/movie').then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.editPost = function(edittedPostObj) {
            var q = $q.defer();
            $http.put('/api/movie', edittedPostObj).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.deletePost = function(id) {
            var q = $q.defer();
            $http.delete('/api/movie/' + id).then(function() {
                q.resolve();
            });
            return q.promise;
        };

        o.getMovieById = function(id) {
            var q = $q.defer();
            $http.get('/api/movie/' + id).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.createComment = function(comment, movieId) {
            var q = $q.defer();
            $http.post('/api/movie/' + movieId + '/comment', comment).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.createPost = function(post) {
            var q = $q.defer();
            $http.post('/api/movie', post).then(function() {
                q.resolve();
            });
            return q.promise;
        };





        return o;
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .factory('UserFactory', UserFactory);

    function UserFactory($http, $q) {
        var o = {};
        o.status = {};


        o.register = function(user) {
            var q = $q.defer();
            $http.post('/api/users/register', user).then(function(res) {
                console.log(res.data);
                setToken(res.data);
                setUser();
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.login = function(user) {
            var q = $q.defer();
            $http.post('/api/users/login', user).then(function(res) {
                setToken(res.data);
                setUser();
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.logout = function() {
            removeToken();
            removeUser();
        };


        function setUser() {
            var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
            o.status.username = user.username;
            o.status._id = user._id;
        }

        function removeUser() {
            o.status.username = null;
            o.status._id = null;
        }


        function getToken() {
            return localStorage.getItem('token');
        }

        function setToken(token) {
            return localStorage.setItem('token', token);
        }

        function removeToken() {
            return localStorage.removeItem('token');
        }


        function urlBase64Decode(str) {
            var output = str.replace(/-/g, '+').replace(/_/g, '/');
            switch (output.length % 4) {
                case 0:
                    {
                        break;
                    }
                case 2:
                    {
                        output += '==';
                        break;
                    }
                case 3:
                    {
                        output += '=';
                        break;
                    }
                default:
                    {
                        throw 'Illegal base64url string!';
                    }
            }
            return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
        }


        if (getToken()) setUser();
        return o;
    }
})();