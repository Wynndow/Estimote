(function(angular) {
"use strict";

var app = angular.module('beacons', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute']);

app.controller('BeaconCtrl', ['$beaconSniffer', '$scope', 'fbutil', 'user', '$firebaseObject', 'FBURL', function ($beaconSniffer, $scope, fbutil, user, $firebaseObject, FBURL) {
  $scope.syncedValue = $firebaseObject(fbutil.ref('syncedValue'));
  $scope.user = user;
  $scope.FBURL = FBURL;
  $beaconSniffer.sniff();
}]);

app.factory('$beaconSniffer', function () {

  var beacons = [];

  function onDeviceReady() {
    startScan();
    var updateTimer = setInterval(checkHotelBeacon, 1000);
  }

  function startScan() {

    function onBeaconsRanged(beaconInfo) {
      for (var i in beaconInfo.beacons) {
        var beacon = beaconInfo.beacons[i];
        if (beacon.rssi < 0) {
          beacon.timeStamp = Date.now();
          var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
          beacons[key] = beacon;
        }
      }
    }

    function onError(errorMessage) {
      console.log('Ranging beacons did fail: ' + errorMessage);
    }

    estimote.beacons.requestAlwaysAuthorization();
    estimote.beacons.startRangingBeaconsInRegion({}, onBeaconsRanged, onError);

  }

  function checkHotelBeacon() {
    for (var i in beacons) {
      var beacon = beacons[i];
      if ((beacon.macAddress = 'C5:A5:F9:2D:52:3F') && (beacon.distance < 0.5)) {
        $('#found_beacons').text("You have entered the hotel");
        console.log("Distance: " + beacon.distance + "-In");
        sendDataToFirebase();
      } else if ((beacon.macAddress = 'C5:A5:F9:2D:52:3F') && (beacon.distance > 1)) {
        $('#found_beacons').text("You are near the hotel");
        console.log("Distance: " + beacon.distance + '-Near');
      }
    }
  }

  function sendDataToFirebase() {
    var db = new Firebase('https://hotel-check-in.firebaseio.com/');
    var uid = db.getAuth().uid;
    var ref = new Firebase('https://hotel-check-in.firebaseio.com/users/' + uid);
    ref.update({
      onSite: true
    });
  }

  return {
    sniff : function () {
      console.log("Sniffer sniffing...");
      onDeviceReady();
    }
  };

  });

 app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/beacons', {
    templateUrl: 'beacons/beacons.html',
    controller: 'BeaconCtrl',
    resolve: {
      user: ['Auth', function (Auth) {
        return Auth.$waitForAuth();
      }]
      }
    });
  }]);


  })(angular);
