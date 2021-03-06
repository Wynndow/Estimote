(function(angular) {
  "use strict";

  var app = angular.module('beacons', ['firebase.utils', 'firebase', 'firebase.auth', 'ngRoute']);

  app.controller('BeaconCtrl', ['$beaconSniffer', function($beaconSniffer) {
    self = this;
    this.startSniff = $beaconSniffer.sniff();
  }]);


  app.service('$beaconSniffer', ['$location', '$rootScope', function($location, $rootScope) {

    var self = this;

    self.sniff = function() {
      self.beacons = [];
      self.startScan();
      self.updateTimer = setInterval(self.checkHotelBeacon, 1000);
    };

    self.startScan = function() {
      estimote.beacons.requestAlwaysAuthorization();
      estimote.beacons.startRangingBeaconsInRegion({}, self.onBeaconsRanged, self.onError);
    };

    self.onBeaconsRanged = function(beaconInfo) {
      self.beacons = beaconInfo.beacons;
    };

    self.onError = function(errorMessage) {
      console.log('Ranging beacons did fail: ' + errorMessage);
    };

    self.checkHotelBeacon = function() {
      for (var i in self.beacons) {
        var beacon = self.beacons[i];
        if (self.isInHotel(beacon)) {
          self.sendDataToFirebaseUser();
          self.sendDataToFirebaseHotel();
          self.getImageFromFirebase(self.sendImageToFirebase);
          self.stopSniffing();
          self.changePathToMessages();
        } else if (self.isNearHotel(beacon)) {
          self.updatePageWithNear();
        }
      }
    };

    self.isInHotel = function(beacon) {
      return ((beacon.proximityUUID === "51ea51f9-2455-49fe-b751-09c609c70633") && (beacon.distance < 0.25));
    };

    self.isNearHotel = function(beacon) {
      return (beacon.proximityUUID === "51ea51f9-2455-49fe-b751-09c609c70633") && (beacon.distance > 0.25);
    };

    self.sendDataToFirebaseUser = function() {
      var db = new Firebase('https://hotel-check-in.firebaseio.com/');
      var uid = db.getAuth().uid;
      var ref = new Firebase('https://hotel-check-in.firebaseio.com/users/' + uid);
      ref.update({
        onSite: true
      });
    };

    self.sendDataToFirebaseHotel = function() {
      var db = new Firebase('https://hotel-check-in.firebaseio.com/');
      var uid = db.getAuth().uid;
      var ref = new Firebase('https://hotel-check-in.firebaseio.com/users/9c22d12a-006c-4847-865f-78dee2ca69a7/bookings/0/');
      ref.update({
        checked_in: 'YES',
        guestUid: uid
      });
    };

    self.getImageFromFirebase = function(callback) {
      var db = new Firebase('https://hotel-check-in.firebaseio.com/');
      var uid = db.getAuth().uid;
      var ref = new Firebase('https://hotel-check-in.firebaseio.com/users/' + uid + '/image');
      ref.on('value', function(snapshot) {
        callback(snapshot.val());
      }, function(errorObject) {
        callback('Please go to reception');
      });
    };

    self.sendImageToFirebase = function(image) {
      var ref = new Firebase('https://hotel-check-in.firebaseio.com/users/9c22d12a-006c-4847-865f-78dee2ca69a7/bookings/0/');
      ref.update({
        photos: image
      });
    };

    self.stopSniffing = function() {
      estimote.beacons.stopRangingBeaconsInRegion({});
      clearInterval(self.updateTimer);
    };

    self.changePathToMessages = function() {
      $location.path('/messages');
      $rootScope.$apply();
    };

    self.updatePageWithNear = function() {
      $('#found_beacons').text("You are near the hotel");
    };


  }]);

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
