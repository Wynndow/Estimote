angular.module('messages', ['ngRoute', 'ngCordova', 'firebase.auth', 'firebase', 'firebase.utils'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/messages', {
      controller: 'messageCtrl',
      templateUrl: 'messages/messages.html'
    });
  }])

  .controller('messageCtrl', ['messageFactory', function (messageFactory) {
    self = this;
    messageFactory.getMessage(messageFactory.notifyUser);
  }])

  .factory('messageFactory', function($cordovaLocalNotification, $ionicPlatform) {
    return {
      getMessage: function(callback) {
        var db = new Firebase('https://hotel-check-in.firebaseio.com/');
        var uid = db.getAuth().uid;
        var ref = new Firebase('https://hotel-check-in.firebaseio.com/users/' + uid + '/arrivalMessage');
        ref.on('value', function(snapshot) {
          console.log(snapshot.val());
          self.message = snapshot.val();
          callback(snapshot.val());
        }, function(errorObject) {
          console.log("The read failed: " + errorObject.code);
          return 'Please go to reception';
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
          }).then(function(result) {
            console.log('Notification 1 triggered');
          });
        });
      }
    };
  });
