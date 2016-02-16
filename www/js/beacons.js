(function(angular) {
  "use strict";

  var app = angular.module('beacons', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute']);

  app.controller('BeaconCtrl', ['$beaconSniffer', function($beaconSniffer) {
    $beaconSniffer.sniff();
  }]);

  app.factory('$beaconSniffer', function($location, $rootScope) {

    var beacons = [];
    var updateTimer;

    function onDeviceReady() {
      startScan();
      updateTimer = setInterval(checkHotelBeacon, 1000);
    }

    function startScan() {

      estimote.beacons.requestAlwaysAuthorization();
      estimote.beacons.startRangingBeaconsInRegion({}, onBeaconsRanged, onError);

      function onBeaconsRanged(beaconInfo) {
        beacons = beaconInfo.beacons;
      }

      function onError(errorMessage) {
        console.log('Ranging beacons did fail: ' + errorMessage);
      }
    }

    function checkHotelBeacon() {
      for (var i in beacons) {
        var beacon = beacons[i];
        if (isInHotel(beacon)) {
          sendDataToFirebase();
          stopSniffing();
          changePathToMessages();
        } else if (isNearHotel(beacon)) {
          updatePageWithNear()
        }
      }
    }

    function isInHotel(beacon) {
      return ((beacon.proximityUUID === "51ea51f9-2455-49fe-b751-09c609c70633") && (beacon.distance < 0.25));
    }

    function isNearHotel(beacon) {
      return (beacon.proximityUUID === "51ea51f9-2455-49fe-b751-09c609c70633") && (beacon.distance > 0.25);
    }

    function sendDataToFirebase() {
      var db = new Firebase('https://hotel-check-in.firebaseio.com/');
      var uid = db.getAuth().uid;
      var ref = new Firebase('https://hotel-check-in.firebaseio.com/users/' + uid);
      ref.update({
        onSite: true
      });
    }

    function stopSniffing() {
      estimote.beacons.stopRangingBeaconsInRegion({});
      clearInterval(updateTimer);
    }

    function changePathToMessages() {
      $location.path('/messages');
      $rootScope.$apply();
    }

    function updatePageWithNear() {
      $('#found_beacons').text("You are near the hotel");
    }

    return {
      sniff: function() {
        onDeviceReady();
      }
    };

  });

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/beacons', {
      templateUrl: 'beacons/beacons.html',
      controller: 'BeaconCtrl',
      resolve: {
        user: ['Auth', function(Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });
  }]);


})(angular);
