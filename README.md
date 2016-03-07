[![Build Status](https://travis-ci.org/Wynndow/Estimote.svg?branch=master)](https://travis-ci.org/Wynndow/Estimote)

## Hotelligence Mobile App

#### About 

This is the partner app to augment the main [Hotelligence](https://github.com/Wynndow/hotel_check_in) app. It's created using Firebase as the backend with Angular on the front. It utilises the Ionic framework to bring the app to mobile, with extra plugins to enable functionality with Estimote bluetooth beacons and to allow local notifications. Testing is via Karma

#### Installation

0. Clone this repo using ```$ git clone git@github.com:Wynndow/Estimote.git```
0. Move into the new directory using `$ cd Estimote`
0. Install node packages with `$ npm install`
0. Install bower packages with `$ bower install`
0. If not already installed, install Cordova with `$ sudo npm install -g cordova`
0. If not already installed, install Ionic with `$ sudo npm install -g ionic`
0. Withing the `beacons.js` file update the UUID to match your beacon.

#### Usage

As the app is not currently released for iOS or Android, it needs to be run locally.

0. Plug an Android phone in to your computer via USB and ensure debugging mode is enabled.
0. Run `$ ionic run android` to start the app on your phone.
0. Sign in with the same credentials as used for the main Hotelligence app.
0. When the mobile phone is within range of the specified beacon, the app will update the database and retrieve any messages specified in the main app.

#### Testing

0. Ensure Karma is installed.
0. Karma unit tests can be run via Grunt with `$ grunt unit`
