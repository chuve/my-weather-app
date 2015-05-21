module.exports = ['$scope', 'CityStorage', function($scope, CityStorage) {
    $scope.cityObj = {};

    $scope.reset = function() {
        $scope.city = angular.copy({});
    };

    $scope.save = function(city) {
        if ($scope.cityAddForm.$valid) {
            $scope.cityObj = angular.copy(city);
            $scope.cityObj.name = $scope.cityObj.name.split(',')[0];

            CityStorage.addOne($scope.cityObj);

            $scope.reset();
        }
    }
}];