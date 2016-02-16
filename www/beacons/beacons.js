(function(angular) {
"use strict";

var app = angular.module('beacons', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute']);

app.controller('BeaconCtrl', ['$beaconSniffer', function ($beaconSniffer) {
  $beaconSniffer.sniff();
}]);

app.factory('$beaconSniffer', function ($location, $rootScope) {

  var beacons = [];
  var updateTimer;

  function onDeviceReady() {
    startScan();
    updateTimer = setInterval(checkHotelBeacon, 1000);
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
        sendDataToFirebase();
        stopSniffing();
        changePathToMessages();
      } else if ((beacon.macAddress = 'C5:A5:F9:2D:52:3F') && (beacon.distance > 1)) {
        $('#found_beacons').text("You are near the hotel");
        console.log("Distance: " + beacon.distance + '-Near');
      }
    }
  }

  function stopSniffing() {
    estimote.beacons.stopRangingBeaconsInRegion({});
    clearInterval(updateTimer);
    console.log("Sniffing stopped");

  }

  function changePathToMessages() {
    $location.path('/messages');
    console.log("Change path to messages");
    $rootScope.$apply();
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
