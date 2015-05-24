'use strict';
var angular = require('angular'),
    ngRoute = require('angular-route'),
    ngAutocomplete = require('ng-autocomplete');

var weatherApp = angular.module('weatherApp', [
    'ngAutocomplete',
    'ngRoute'
]);

weatherApp.constant('AppConfig', require('./constants'));
weatherApp.service('WeatherProvider', require('./services/weatherProvider'));
weatherApp.factory('CityStorage', require('./services/cityStorage'));
weatherApp.controller('cityListController', require('./controllers/cityListController'));
weatherApp.controller('cityAddController', require('./controllers/cityAddController'));

weatherApp.config(function($routeProvider) {
    $routeProvider.
        when('/' , {
            templateUrl: 'src/templates/main.html'
        }).otherwise('/');
}).run(function(CityStorage) {
    CityStorage.init()
});