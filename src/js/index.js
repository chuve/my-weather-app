'use strict';
var angular = require('angular'),
    ngAutocomplete = require('ng-autocomplete');

var weatherApp = angular.module('weatherApp', [
    'ngAutocomplete'
]);

weatherApp.constant('AppConfig', require('./constants'));
weatherApp.service('WeatherProvider', require('./services/weatherProvider'));
weatherApp.factory('CityStorage', require('./services/cityStorage'));
weatherApp.controller('cityListController', require('./controllers/cityListController'));
weatherApp.controller('cityAddController', require('./controllers/cityAddController'));
