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

  describe('The Factory: $beaconSniffer', function() {

    beforeEach(function() {
      angular.module('firebase.utils', []);
      angular.module('firebase', []);
      angular.module('firebase.auth', []);
      module('beacons');
    });

    var beaconFactory;

    beforeEach(inject(function($beaconSniffer) {
      beaconService = $beaconSniffer;
      estimote = {
        beacons: {
          requestAlwaysAuthorization: function() {},
          startRangingBeaconsInRegion: function() {}
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
        beaconService.updateTimer = 0;
        beaconService.sniff();
        expect(beaconService.updateTimer).toEqual(2);
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
          beacons: [1,2,3]
        };
        beaconService.onBeaconsRanged(beaconInfo);
        expect(beaconService.beacons).toEqual([1,2,3]);
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



  });

});
