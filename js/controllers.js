var employeeControllers = angular.module('employeeControllers', []);

//Defining controller with dependency on firebase and filter
employeeControllers.controller('CrudController', function ($scope, $firebaseArray, $filter) {

    var key;
    var ref = new Firebase("https://incandescent-heat-6174.firebaseio.com/employees/");
    //Initializing employees with the data from firebase
    //employees is an array of objects
    $scope.employees = $firebaseArray(ref);

    //Defining variables for implementing sorting in results table
    $scope.predicate = 'name';
    $scope.reverse = false;

    /**
     * Function for adding new employee to database
     * It inserts the employee if validation is successful
     * After inserting data, the fields get empty again
     */
    $scope.saveEmployee = function () {
        if ($scope.isValidEmployee()) {
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
        }

    };
    /**
     * This function validates the data entered for adding or updating the employee
     * Validation 1: Name is required field
     * Validation 2: Email should be in valid format
     * Validation 3: Phone number should be in valid format
     * @returns {boolean}
     */
    $scope.isValidEmployee = function () {

        var result = true;

        var errName = document.getElementById('errName');
        var name = document.getElementById('searchName');

        var errEmail = document.getElementById('errEmail');
        var email = document.getElementById('searchEmail');

        var errPhone = document.getElementById('errPhone');
        var phone = document.getElementById('searchPhone');

        //Name validation

        if (name.value.length < 1) {
            errName.innerHTML = "Please enter employee name";
            errName.className = "alert active";
            result = false;
        }
        else {
            errName.innerHTML = "";
            errName.className = "alert";
        }
        if (!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            errEmail.innerHTML = "Please enter valid email";
            errEmail.className = "alert active";
            result = false;
        }
        else {
            errEmail.innerHTML = "";
            errEmail.className = "alert";
        }
        if (!phone.value.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)) {
            errPhone.innerHTML = "Please enter valid phone number";
            errPhone.className = "alert active";
            result = false;
        }
        else {
            errPhone.innerHTML = "";
            errPhone.className = "alert";
        }
        return result;
    };
    /**
     * This function gets called when user clicks on Edit button corresponding to any employee
     * in the results table. It populates the data of selected employee to the edit section.
     * @param employee
     * @param index
     */
    $scope.editEmployee = function (employee, index) {
        key = index;
        $scope.m_name = employee.name;
        $scope.m_title = employee.title;
        $scope.m_location = employee.location;
        $scope.m_email = employee.email;
        $scope.m_phone = employee.phone;
    };
    /**
     * This function is for updating the employee data for any particular employee.
     * It updates the employee if validation is successful
     * @param name
     * @param title
     * @param location
     * @param email
     * @param phone
     */
    $scope.updateEmployee = function (name, title, location, email, phone) {
        if ($scope.isValidEmployee()) {
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
        }
    };
    /**
     * This function is for deleting the employee.
     * @param index
     */
    $scope.deleteEmployee = function (index) {
        $scope.employees.$remove(index).then(function (ref) {
        });
    };

});
