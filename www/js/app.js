// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'beacons'])

.run(function($ionicPlatform, $beaconSniffer) {
  $ionicPlatform.ready(function() {
    // console.log(estimote);
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
      // console.log(cordova.plugins.estimote.beacons);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    // var beacons = [];
    $beaconSniffer.sniff();

    // function onDeviceReady() {
    //   $('#found_beacons').text('Device Ready');
    //   startScan();
    //   updateTimer = setInterval(checkHotelBeacon, 1000);
    // }
    //
    // function startScan() {
    //   $('#found_beacons').text('Start Scan');
    //
    //   function onBeaconsRanged(beaconInfo) {
    //     for (var i in beaconInfo.beacons) {
    //       var beacon = beaconInfo.beacons[i];
    //       if (beacon.rssi < 0) {
    //         beacon.timeStamp = Date.now();
    //         var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
    //         beacons[key] = beacon;
    //       }
    //     }
    //   }
    //
    //   function onError(errorMessage) {
    //     console.log('Ranging beacons did fail: ' + errorMessage);
    //   }
    //
    //   $('#found_beacons').text('Before');
    //   estimote.beacons.requestAlwaysAuthorization();
    //   $('#found_beacons').text('After');
    //   estimote.beacons.startRangingBeaconsInRegion({}, onBeaconsRanged, onError);
    // }
    //
    // function checkHotelBeacon() {
    //   for (var i in beacons) {
    //     var beacon = beacons[i];
    //     if ((beacon.macAddress = 'C5:A5:F9:2D:52:3F') && (beacon.distance < 0.1)) {
    //       $('#found_beacons').text("You have entered the hotel");
    //       console.log("Distance: " + beacon.distance + "-In" + beacon.macAddress);
    //     } else if ((beacon.macAddress = 'C5:A5:F9:2D:52:3F') && (beacon.distance > 0.1)) {
    //       $('#found_beacons').text("You are near the hotel");
    //       console.log("Distance: " + beacon.distance + '-Near' + beacon.macAddress);
    //     }
    //   }
    // }



    });
})
