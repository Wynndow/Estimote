describe('Login', function() {

  describe('The Config: Routes', function() {
    beforeEach(function() {
      angular.module('ionic', []);
      angular.module('firebase.utils', []);
      angular.module('firebase.auth', []);
      module('login');

      module(function($provide) {
        $provide.service('Auth', function() {
          return {
            $waitForAuth: function() {
              return true;
            }
          };
        });
        $provide.service('$ionicPlatform', function() {
          return {
            ready: function() {}
          };
        });
      });
    });

    var location, route, rootScope;

    beforeEach(inject(
      function($location, $route, $rootScope) {
        location = $location;
        route = $route;
        rootScope = $rootScope;
        resolve = {};
      }));

    describe('Login route', function() {
      beforeEach(inject(
        function($httpBackend) {
          $httpBackend.expectGET('login/login.html')
            .respond(200);
        }));

      it('should load the beacons page on successful load of /beacons', function() {
        location.path('/login');
        rootScope.$digest();
        expect(route.current.controller).toBe('LoginCtrl');
      });
    });
  });

});
