module.exports = ['$scope', '$interval', 'CityStorage', function($scope, $interval, CityStorage) {

    $scope.cityList = CityStorage.getList();

    $scope.removeCity = function(index) {
        if ($scope.cityList[index].hasOwnProperty('intervalPromise')) {
            $interval.cancel($scope.cityList[index].intervalPromise);
        }
        $scope.cityList.splice(index, 1);
    }
}];