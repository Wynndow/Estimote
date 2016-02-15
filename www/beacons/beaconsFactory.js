angular.module('beacons', [])

  .factory('$beaconSniffer', function () {

  var beacons = [];

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
      if ((beacon.macAddress = 'C5:A5:F9:2D:52:3F') && (beacon.distance < 1)) {
        $('#found_beacons').text("You have entered the hotel");
        console.log("Distance: " + beacon.distance + "-In");
      } else if ((beacon.macAddress = 'C5:A5:F9:2D:52:3F') && (beacon.distance > 1)) {
        $('#found_beacons').text("You are near the hotel");
        console.log("Distance: " + beacon.distance + '-Near');
      }
    }
  }

  return {
    sniff : function () {
      console.log("Sniffer sniffing...");
      onDeviceReady();
    }
  };

});
