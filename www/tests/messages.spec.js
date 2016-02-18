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

    // it('calls the getMessage function with the callback', function() {
    //   expect(ctrl.runFunctions).toEqual(Function);
    // })
  });

  describe('The Service: ', function() {

    beforeEach(function() {
      angular.module('ngCordova', []);
      angular.module('firebase.auth', []);
      // angular.module('firebase', []);
      angular.module('firebase.utils', []);
      module('messages')

      module(function($provide) {
        $provide.service('$cordovaLocalNotification', function() {
        });
        $provide.service('$ionicPlatform', function() {
        });
      })
    })

    var messServ;
    function Firebase() {};

    beforeEach(inject(function(messagesService) {
      messServ = messagesService
      console.log(messServ)
    }));

    describe('#getMessage', function() {
      it('sets db to a firebase object', function() {
        messServ.getMessage();
      });
      //
      // // it('calls the function #on on the Firebase instance', function() {
      // //   spyOn(window.ref, 'on');
      // //   messServ.getMessage(1);
      // //   expect(window.ref.on).toHaveBeenCalled();
      // });
    });

  })


});
