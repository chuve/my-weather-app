'use strict';
var weatherApp = require('angular').module('weatherApp', []);

weatherApp.constant('AppConfig', require('./constants'));
weatherApp.service('WeatherProvider', require('./services/weatherProvider'));
weatherApp.factory('CityStorage', require('./services/cityStorage'));
weatherApp.controller('CityListCtrl', require('./controllers/cityListCtrl'));
weatherApp.controller('CityAddCtrl', require('./controllers/cityAddCtrl'));