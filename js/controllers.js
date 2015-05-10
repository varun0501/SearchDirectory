var employeeControllers = angular.module('employeeControllers', []);

employeeControllers.controller('CrudController', function ($scope, $firebaseArray, $filter) {

    var key;
    var ref = new Firebase("https://incandescent-heat-6174.firebaseio.com/employees/");

    $scope.employees = $firebaseArray(ref);
    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.predicate = 'name';
    $scope.reverse = false;

    $scope.range = function() {
        var rangeSize = 5;
        var ret = [];
        var start;

        start = $scope.currentPage;
        if ( start > $scope.pageCount()-rangeSize ) {
            start = $scope.pageCount()-rangeSize+1;
        }
        var pageCount = ($scope.pageCount()%rangeSize == 0) ? rangeSize : $scope.pageCount()%rangeSize;
        for (var i=start; i<start+pageCount; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.prevPageDisabled = function() {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function() {
        return Math.ceil($scope.employees.length/$scope.itemsPerPage);
    };

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };

    $scope.nextPageDisabled = function() {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function(n) {
        $scope.currentPage = n;
    };
    $scope.saveEmployee = function () {
        var save = $scope.employees.$add({
            name: $scope.m_name,
            title: $scope.m_title,
            location: $scope.m_location,
            email: $scope.m_email,
            phone: $scope.m_phone
        });
        $scope.m_name = '';
        $scope.m_title = '';
        $scope.m_location = '';
        $scope.m_email = '';
        $scope.m_phone = '';

    };
    $scope.editEmployee = function (employee, index) {
        key = index;
        $scope.m_name = employee.name;
        $scope.m_title = employee.title;
        $scope.m_location = employee.location;
        $scope.m_email = employee.email;
        $scope.m_phone = employee.phone;
    };
    $scope.updateEmployee = function (name, title, location, email, phone) {
        $scope.employees[key].name = name;
        $scope.employees[key].title = title;
        $scope.employees[key].location = location;
        $scope.employees[key].email = email;
        $scope.employees[key].phone = phone;
        $scope.m_name = '';
        $scope.m_title = '';
        $scope.m_location = '';
        $scope.m_email = '';
        $scope.m_phone = '';
        $scope.employees.$save(key).then(function (ref) {
        });
    };
    $scope.deleteEmployee = function (index) {
        $scope.employees.$remove(index).then(function (ref) {
        });
    };

});
