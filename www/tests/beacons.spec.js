describe('Beacons', function() {

  describe('The Controller: BeaconCtrl', function() {

    beforeEach(function() {
      angular.module('firebase.utils', []);
      angular.module('firebase', []);
      angular.module('firebase.auth', []);
      module('beacons');

      module(function($provide) {
        $provide.service('$beaconSniffer', function() {
          return {
            sniff: function() {
              return true;
            }
          };
        });
      });
    });

    var ctrl;

    beforeEach(inject(function($controller) {
      ctrl = $controller('BeaconCtrl');
    }));

    it('calls the beaconSniffer', function() {
      expect(ctrl.startSniff).toBe(true);
    });

  });

  describe('The Service: $beaconSniffer', function() {

    beforeEach(function() {
      angular.module('firebase.utils', []);
      angular.module('firebase', []);
      angular.module('firebase.auth', []);
      module('beacons');
    });

    var beaconService;
    var loca;
    var rootScope;

    beforeEach(inject(function($beaconSniffer, $location, $rootScope) {
      beaconService = $beaconSniffer;
      loca = $location;
      rootScope = $rootScope;
      estimote = {
        beacons: {
          requestAlwaysAuthorization: function() {},
          startRangingBeaconsInRegion: function() {},
          stopRangingBeaconsInRegion: function() {}
        }
      };
    }));

    describe('#sniff', function() {
      it('responds to sniff', function() {
        expect(beaconService.sniff).toBeDefined();
      });

      it('can start the scan of beacons', function() {
        spyOn(beaconService, 'startScan');
        beaconService.sniff();
        expect(beaconService.startScan).toHaveBeenCalled();
      });

      it('calls to checkHotelBeacon', function() {
        spyOn(window, 'setInterval');
        beaconService.sniff();
        expect(window.setInterval).toHaveBeenCalled();
      });
    });


    describe('#startScan', function() {
      it('requests authorization to use location services on iOS', function() {
        spyOn(estimote.beacons, 'requestAlwaysAuthorization');
        beaconService.startScan();
        expect(estimote.beacons.requestAlwaysAuthorization).toHaveBeenCalled();
      });

      it('starts ranging', function() {
        spyOn(estimote.beacons, 'startRangingBeaconsInRegion');
        beaconService.startScan();
        expect(estimote.beacons.startRangingBeaconsInRegion).toHaveBeenCalled();
      });
    });

    describe('#onBeaconsRanged', function() {
      it('sets beacons array to data from onBeaconsRanged', function() {
        var beaconInfo = {
          beacons: [1, 2, 3]
        };
        beaconService.onBeaconsRanged(beaconInfo);
        expect(beaconService.beacons).toEqual([1, 2, 3]);
      });
    });

    describe('#onError', function() {
      it('console logs the error message if their is one', function() {
        spyOn(console, 'log');
        beaconService.onError('All the bacon is gone');
        expect(console.log).toHaveBeenCalledWith('Ranging beacons did fail: All the bacon is gone');
      });
    });

    describe('#isInHotel', function() {
      it('returns true if the beacon is within range', function() {
        var beacon = {
          proximityUUID: "51ea51f9-2455-49fe-b751-09c609c70633",
          distance: 0.1
        };
        expect(beaconService.isInHotel(beacon)).toBe(true);
      });

      it('returns false if the beacon is out of range', function() {
        var beacon = {
          proximityUUID: "51ea51f9-2455-49fe-b751-09c609c70633",
          distance: 1
        };
        expect(beaconService.isInHotel(beacon)).toBe(false);
      });

      it('returns false if the beacon has the wrong UUID', function() {
        var beacon = {
          proximityUUID: "CLEARLY WRONG",
          distance: 0.1
        };
        expect(beaconService.isInHotel(beacon)).toBe(false);
      });
    });

    describe('#isNearHotel', function() {
      it('returns true if the beacon is out of range', function() {
        var beacon = {
          proximityUUID: "51ea51f9-2455-49fe-b751-09c609c70633",
          distance: 1
        };
        expect(beaconService.isNearHotel(beacon)).toBe(true);
      });

      it('returns false if the beacon is in range', function() {
        var beacon = {
          proximityUUID: "51ea51f9-2455-49fe-b751-09c609c70633",
          distance: 0.1
        };
        expect(beaconService.isNearHotel(beacon)).toBe(false);
      });

      it('returns false if the beacon has the wrong UUID', function() {
        var beacon = {
          proximityUUID: "CLEARLY WRONG",
          distance: 0.1
        };
        expect(beaconService.isNearHotel(beacon)).toBe(false);
      });
    });

    // describe('#sendDataToFirebase', function() {
    //   it('creates a Firebase instance', function() {
    //     spyOn(Firebase, 'new');
    //     beaconService.sendDataToFirebase();
    //     expect(Firebase).toHaveBeenCalledWith('https://hotel-check-in.firebaseio.com/')
    //   });
    // });

    describe('#stopSniffing', function() {
      it('stops the beacons from being sniffed out', function() {
        spyOn(estimote.beacons, 'stopRangingBeaconsInRegion');
        beaconService.stopSniffing();
        expect(estimote.beacons.stopRangingBeaconsInRegion).toHaveBeenCalled();
      });

      it('clears the interval', function() {
        spyOn(window, 'clearInterval');
        beaconService.stopSniffing();
        expect(window.clearInterval).toHaveBeenCalled();
      });
    });

    describe('#changePathToMessages', function() {
      it('tells $location to change the path to messages', function() {
        spyOn(loca, 'path');
        beaconService.changePathToMessages();
        expect(loca.path).toHaveBeenCalledWith('/messages');
      });

      it('applies the rootscope', function() {
        spyOn(rootScope, '$apply');
        beaconService.changePathToMessages();
        expect(rootScope.$apply).toHaveBeenCalled();
      });
    });

    // describe('#updatePageWithNear', function() {
    //   it('updates the page', function() {
    //     beaconService.updatePageWithNear();
    //     expect($('#found_beacons').text).toBe("You are near the hotel");
    //   });
    // });

  });

  describe('The Config: Routes', function() {
    beforeEach(function() {
      angular.module('firebase.utils', []);
      angular.module('firebase', []);
      angular.module('firebase.auth', []);
      module('beacons');

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

    describe('Login route', function() {
      beforeEach(inject(
        function($httpBackend) {
          $httpBackend.expectGET('beacons/beacons.html')
            .respond(200);
        }));

      it('should load the beacons page on successful load of /beacons', function() {
        location.path('/beacons');
        rootScope.$digest();
        expect(route.current.controller).toBe('BeaconCtrl');
      });
    });
  });

});
