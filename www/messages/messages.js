angular.module('messages', ['ngRoute', 'ngCordova'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/messages', {
      controller: 'messageCtrl',
      templateUrl: 'messages/messages.html'
    });
  }])


  .controller('messageCtrl', ['messageFactory', function (messageFactory) {
    console.log("Inside the messageCtrl");

    self = this;
    self.message = messageFactory.getMessage();
    // messageFactory.notifyUser(self.message);

  }])

  .factory('messageFactory', function($cordovaLocalNotification, $ionicPlatform) {
    return {
      getMessage: function() {
        return "You are staying in room 101";
      },
      notifyUser: function(message) {
        $ionicPlatform.ready(function() {
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Warning',
            text: message,
            data: {
              customProperty: 'custom value'
            }
          }).then(function(result) {
            console.log('Notification 1 triggered');
          });
        });
      }
    };
  });
