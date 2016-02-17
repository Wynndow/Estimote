describe('Home', function() {

  describe('The Config: Routes', function() {
    beforeEach(function() {
      angular.module('firebase.auth', []);
      module('home');

      module(function($provide) {
        $provide.service('Auth', function() {
          return {
            $waitForAuth: function() {
              return true;
            }
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

    describe('Home route', function() {
      beforeEach(inject(
        function($httpBackend) {
          $httpBackend.expectGET('home/home.html')
            .respond(200);
        }));

      it('should load the beacons page on successful load of /beacons', function() {
        location.path('/home');
        rootScope.$digest();
        expect(route.current.controller).toBe('HomeCtrl');
      });
    });
  });

});
