(function(angular) {
"use strict";

var app = angular.module('beacons', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute']);

app.controller('BeaconCtrl', ['$scope', 'fbutil', 'user', '$firebaseObject', 'FBURL', function ($scope, fbutil, user, $firebaseObject, FBURL) {
  $scope.syncedValue = $firebaseObject(fbutil.ref('syncedValue'));
  $scope.user = user;
  $scope.FBURL = FBURL;
}]);


 app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/beacons', {
    templateUrl: 'beacons/beacons.html',
    controller: 'BeaconCtrl',
    resolve: {
      user: ['Auth', function (Auth) {
        return Auth.$waitForAuth();
      }]
      }
    });
  }]);


  })(angular);
