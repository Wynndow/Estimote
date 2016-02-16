angular.module('messages', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/messages', {
      controller: 'messageCtrl',
      templateUrl: 'messages/messages.html'
    });
  }])


  .controller('messageCtrl', [function () {}])

  .factory('messageFactory', function() {
    return {}
  });
