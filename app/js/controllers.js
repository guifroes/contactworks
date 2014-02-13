'use strict';

angular.module('contactWorks.controllers', []);

angular.module('contactWorks.controllers').controller('AddCtrl', ['$scope', '$location', 'contacts', function ($scope, $location, contacts) {
  console.log('reached AddCtrl controller');

  $scope.contactdata = {};
  $scope.save = function () {
    var id = contacts.save({
      name: $scope.contactdata.name,
      phone: $scope.contactdata.phone,
      email: $scope.contactdata.email
    });

    $location.path('/view/' + id);
  };
}]);

angular.module('contactWorks.controllers').controller('ViewCtrl', ['$scope', 'contacts', '$routeParams', function ($scope, contacts, $routeParams) {
  console.log('reached ViewCtrl controller');

  $scope.contact = contacts.get($routeParams.id);
}]);

angular.module('contactWorks.controllers').controller('EditCtrl', ['$scope', '$location', 'contacts', '$routeParams', function ($scope, $location, contacts, $routeParams) {
  console.log('reached EditCtrl controller');

  $scope.contactdata = contacts.get($routeParams.id);

  $scope.update = function () {
    var id = contacts.update({
      id:$scope.contactdata.id,
      name:$scope.contactdata.name,
      phone:$scope.contactdata.phone,
      email:$scope.contactdata.email
    });
    $location.path('/view/' + id);
  };

  $scope.delete = function () {
    contacts.remove($scope.contactdata.id);
    $location.path('/');
  };

}]);

angular.module('contactWorks.controllers').controller('SearchCtrl', ['$scope', 'contacts', function ($scope, contacts) {
  console.log('reached SearchCtrl controller');

  $scope.contacts = contacts.contacts;
}]);

angular.module('contactWorks.controllers').controller('ListCtrl', ['$scope', 'contacts', function ($scope, contacts) {
  console.log('reached ListCtrl controller');

  $scope.contacts = contacts.contacts;

  $scope.$watch('contacts', function() {
    $scope.groups = _.groupBy($scope.contacts, function(contact) {
      return contact.name.charAt(0).toUpperCase();
    });
  }, true);
}]);
