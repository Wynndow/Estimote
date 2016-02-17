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
      beaconFactory = $beaconSniffer;
      estimote = {
        beacons: {
          requestAlwaysAuthorization: function() {},
          startRangingBeaconsInRegion: function() {}
        }
      };
    }));

    it('responds to sniff', function() {
      expect(beaconFactory.sniff).toBeDefined();
    });

    it('starts sniffing when sniff is run', function() {
      beaconFactory.sniff();
      expect(onDeviceReady).toHaveBeenCalled();
    })

  });

});
