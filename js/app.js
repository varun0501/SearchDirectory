var myApp = angular.module('myApp', [
    'ngRoute',
    'employeeControllers',
    'firebase'
]);

myApp.filter('offset', function() {
    return function(input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});

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