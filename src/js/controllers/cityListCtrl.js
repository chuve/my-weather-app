module.exports = ['$scope', '$interval', 'CityStorage', function($scope, $interval, CityStorage) {
    CityStorage.init();

    $scope.cityList = CityStorage.getList();

    $scope.$on('$destroy', function(event) {
        console.log(event);
    });

    $scope.removeCity = function(index) {
        if ($scope.cityList[index].hasOwnProperty('intervalPromise')) {
            $interval.cancel($scope.cityList[index].intervalPromise);
        }
        $scope.cityList.splice(index, 1);
    }
}];