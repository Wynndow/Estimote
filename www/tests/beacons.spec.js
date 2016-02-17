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



  });

});
