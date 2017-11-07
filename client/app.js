angular.module('codecc', ['ngRoute', 'ngResource', 'codecc.controllers', 'codecc.factories', 'codecc.services'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/login.html', 
        controller: 'LoginController',
        requiresLogin: true,
        // requiresAdmin: true 
    })
    .when('/signup', {
        templateUrl: 'views/signup.html', 
        controller: 'SignupController' // server 500 error
    })
    .when('/home', {
        templateUrl: 'views/home.html', 
        controller: 'HomeController' 
    })
    .when('/posts/:id', {
        templateUrl: 'views/one_post.html',
        controller: 'PostReplyController', //issue loading replies
    })
    .when('/codeplay', {
        templateUrl: 'views/codeplay.html',
    })    
    .when('/codeplay/color-game', {
        templateUrl: 'views/color-game.html', //issue
        controller: 'ColorGameController'
    })
    .when('/codeplay/multichoice', {
        templateUrl: 'views/multichoice.html', //issue
        controller: 'MultichoiceController'
    })
    .when('/careers', {
        templateUrl: 'views/careers.html',
        controller: 'CareersController'
    })
    .when('/bootcamps', {
        templateUrl: 'views/bootcamps.html', 
        controller: 'BootcampsController'
    })
    .when('/resources', {
        templateUrl: 'views/resources.html'
    })
    .otherwise({
        redirectTo: '/'
    });
}])
// .run(['$rootScope', '$location', 'UserService', function($rootScope, $location, UserService) {
//     $rootScope.$on('$routeChangeStart', function(event, nextRoute, previousRoute) {
//         if (nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()) {
//             event.preventDefault();
//             UserService.loginRedirect();
//         } else if (nextRoute.$$route.requiresAdmin && !UserService.isAdmin()) {
//             event.preventDefault();
//             $location.replace().path('/');
//         }
//     });
// }]);