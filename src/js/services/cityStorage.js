module.exports = ['$interval', 'WeatherProvider', 'AppConfig', function($interval, WeatherProvider, AppConfig) {
    'use strict';

    var cityStorage = [];

    return {
        init: function() {
            this.addAll(AppConfig.initCitiesIds);
        },

        getList: function() {
            return cityStorage;
        },

        fillModel: function(cityObj, providerData) {
            cityObj.name = providerData.name;
            cityObj.openweathermap_id = providerData.id;
            cityObj.icon = providerData.weather[0].icon;
            cityObj.temp = Number(providerData.main.temp).toFixed(1);
            cityObj.weather = providerData.weather[0].main;
            return cityObj;
        },

        addIntervalPromise: function(cityObj) {
            var self = this;
            cityObj.intervalPromise = $interval(function() {
                WeatherProvider.getWeatherById(cityObj.openweathermap_id).
                    success(function(newData) {
                        self.fillModel(cityObj, newData);
                    });
            }, cityObj.update_interval * 1000);
        },

        addAll: function(ids) {
            var self = this;
            WeatherProvider.getWeatherByIds(ids).
                success(function(data) {
                    data.list.forEach(function(cityData){
                        var cityObj = { update_interval: AppConfig.defaultUpdateTimeout };
                        self.fillModel(cityObj, cityData);
                        self.addIntervalPromise(cityObj);
                        cityStorage.push(cityObj);
                    })
                }).
                error(function(data, status, headers, config) {
                    console.error(status);
                });
        },

        addOne: function(cityObj) {
            var self = this;

            WeatherProvider.getWeatherByName(cityObj.name).
                success(function(data, status, headers, config) {
                    if (data.cod !== '404') {
                        self.fillModel(cityObj, data);
                        self.addIntervalPromise(cityObj);
                        cityStorage.push(cityObj);
                    }
                }).
                error(function(data, status, headers, config) {
                    console.error(status);
                });
        }
    };
}];