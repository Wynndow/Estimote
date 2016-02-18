describe('Messages', function() {

  describe('The Controller: ', function() {

    beforeEach(function() {
      angular.module('ngCordova', []);
      angular.module('firebase.auth', []);
      angular.module('firebase', []);
      angular.module('firebase.utils', []);
      module('messages')

      module(function($provide) {
        $provide.service('messagesService', function() {
          return {
            notifyUser: 'The Notification Function',
            getMessage: function() {}
          };
        });
      })
    })
    var ctrl;

    beforeEach(inject(function($controller) {
      ctrl = $controller('messageCtrl');
    }))


    it('initializes with callback set to the notifyUser function', function() {
      expect(ctrl.callback).toEqual('The Notification Function');
    });

  });

  describe('The Service: ', function() {

    beforeEach(function() {
      angular.module('ngCordova', []);
      angular.module('firebase.auth', []);
      angular.module('firebase', []);
      angular.module('firebase.utils', []);
      module('messages');

      module(function($provide) {
        $provide.service('$cordovaLocalNotification', function() {
        });
        $provide.service('$ionicPlatform', function() {
          return {
            ready: function() {}
          }
        });
      })
    })

    var messServ, ionicPlatform;

    beforeEach(inject(function(messagesService, $ionicPlatform) {
      messServ = messagesService;
      ionicPlatform = $ionicPlatform;
    }));

    describe('#notifyUser', function() {
      it('calls the $ionicPlatform.ready function', function() {
        spyOn(ionicPlatform, 'ready');
        messServ.notifyUser();
        expect(ionicPlatform.ready).toHaveBeenCalled();
      });
    });

  })


});
