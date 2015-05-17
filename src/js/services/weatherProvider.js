module.exports = ['$http', 'AppConfig', function($http, AppConfig) {
    this.getWeatherByName = function(name) {
        return $http.get(AppConfig.apiUrl + 'weather', {
            params: {
                q : name,
                units: 'metric'
            }
        });
    };

    this.getWeatherById = function(id) {
        return $http.get(AppConfig.apiUrl + 'weather', {
            params: {
                id : id,
                units: 'metric'
            }
        });
    };

    this.getWeatherByIds = function(hash) {
        return $http.get(AppConfig.apiUrl + 'group', {
            params: {
                id: hash.join(','),
                units: 'metric'
            }
        })
    };
}];