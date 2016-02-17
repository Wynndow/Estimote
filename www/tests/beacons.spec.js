describe('beacons', function() {

  describe('BeaconCtrl', function() {

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


    it('can do some simple maths', function() {
      expect(1+1).toEqual(2);
    });

    it('calls the beaconSniffer', function() {
      spyOn($beaconSniffer, 'sniff');
      expect($beaconSniffer.sniff).toHaveBeenCalled();
    });

  });

});
