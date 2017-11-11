angular.module('codecc', ['ngRoute', 'ngResource', 'codecc.controllers', 'codecc.factories', 'codecc.services'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/login', {
        templateUrl: 'views/login.html', 
        controller: 'LoginController'
    })
    .when('/signup', {
        templateUrl: 'views/signup.html', 
        controller: 'SignupController' 
    })
    .when('/', {
        templateUrl: 'views/home.html', 
        controller: 'HomeController',
        requiresLogin: true
    })
    .when('/home', {
        templateUrl: 'views/home.html', 
        controller: 'HomeController',
        requiresLogin: true
    })
    .when('/posts/:id', {
        templateUrl: 'views/one_post.html',
        controller: 'PostReplyController', 
        requiresLogin: true
    })
    .when('/codeplay', {
        templateUrl: 'views/codeplay.html',
        requiresLogin: true
    })    
    .when('/codeplay/color-game', {
        templateUrl: 'views/color-game.html',
        controller: 'ColorGameController',
        requiresLogin: true
    })
    .when('/codeplay/multichoice', {
        templateUrl: 'views/multichoice.html', 
        controller: 'MultichoiceController',
        requiresLogin: true
    })
    .when('/careers', {
        templateUrl: 'views/careers.html',
        controller: 'CareersController',
        requiresLogin: true
    })
    .when('/bootcamps', {
        templateUrl: 'views/bootcamps.html', 
        controller: 'BootcampsController',
        requiresLogin: true
    })
    .when('/bootcamps/:id', {
        templateUrl: 'views/one_bootcamp.html', 
        controller: 'OneBootcampController',
        requiresLogin: true
    })
    .when('/resources', {
        templateUrl: 'views/resources.html',
        requiresLogin: true
    })
    .otherwise({
        redirectTo: '/'
    });
}])
.run(['$rootScope', '$location', 'UserService', function($rootScope, $location, UserService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, previousRoute) {
        if (nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()) {
            event.preventDefault();
            UserService.loginRedirect();
        } else if (nextRoute.$$route.requiresAdmin && !UserService.isAdmin()) {
            event.preventDefault();
            $location.replace().path('/');
        }
    });
}]);