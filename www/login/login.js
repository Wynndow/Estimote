angular.module('login', ['ionic', 'firebase.utils', 'firebase.auth', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    controller: 'LoginCtrl',
    templateUrl: 'login/login.html'
  });
}])

.controller('LoginCtrl', ['$scope', 'Auth', '$location', 'fbutil', function($scope, Auth, $location, fbutil) {
  $scope.email = null;
  $scope.pass = null;
  $scope.confirm = null;
  $scope.userType = 'guestUser';

  $scope.login = function(email, pass) {
    $scope.err = null;
    Auth.$authWithPassword({
        email: email,
        password: pass
      }, {
        rememberMe: true
      })
      .then(function() {
        console.log('Logged in');
        $location.path('/beacons');
      }, function(err) {
        console.log('failure');
        $scope.err = errMessage(err);
      });
  };


  function assertValidAccountProps() {
    if (!$scope.email) {
      $scope.err = 'Please enter an email address';
    } else if (!$scope.pass || !$scope.confirm) {
      $scope.err = 'Please enter a password';
    } else if ($scope.pass !== $scope.confirm) {
      $scope.err = 'Passwords do not match';
    }
    return !$scope.err;
  }

  function errMessage(err) {
    return angular.isObject(err) && err.code ? err.code : err + '';
  }

}])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
});
