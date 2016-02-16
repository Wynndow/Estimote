(function(angular) {
  "use strict";

  var app = angular.module('messages', ['ngRoute', 'ngCordova', 'firebase.auth', 'firebase', 'firebase.utils']);

  app.controller('messageCtrl', ['messagesFactory', function(messagesFactory) {
    self = this;
    var callback = messagesFactory.notifyUser;
    messagesFactory.getMessage(callback);
  }]);

  app.factory('messagesFactory', function($cordovaLocalNotification, $ionicPlatform) {
    return {
      getMessage: function(callback) {
        var db = new Firebase('https://hotel-check-in.firebaseio.com/');
        var uid = db.getAuth().uid;
        var ref = new Firebase('https://hotel-check-in.firebaseio.com/users/' + uid + '/arrivalMessage');
        ref.on('value', function(snapshot) {
          self.message = snapshot.val();
          callback(snapshot.val());
        }, function(errorObject) {
          callback('Please go to reception');
        });
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
          });
        });
      }
    };
  });

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/messages', {
      controller: 'messageCtrl',
      templateUrl: 'messages/messages.html'
    });
  }]);

})(angular);
