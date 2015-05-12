//Initializing Angular app with dependencies
var myApp = angular.module('myApp', [
    'ngRoute',
    'employeeControllers',
    'firebase'
]);


//Routing mechanism
myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/list', {
            templateUrl: 'partials/list.html',
            controller: 'CrudController'
        }).
        when('/listAdmin',{
            templateUrl: 'partials/listAdmin.html',
            controller: 'CrudController'
        }).
        when('/login', {
           templateUrl: 'partials/login.html'
        }).
        otherwise({
            redirectTo: '/list'
        });
}]);