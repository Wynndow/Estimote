(function(angular) {
  "use strict";

  var app = angular.module('home', ['firebase.auth', 'ngRoute']);

  app.controller('HomeCtrl', ['$scope', function($scope) {
    self = $scope;
    self.loggedIn = false;
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl',
      resolve: {
        user: ['Auth', function(Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });
  }]);

})(angular);
