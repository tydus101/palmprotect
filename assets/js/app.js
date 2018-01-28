var palm_app = angular.module('palmApp', ['ngMaterial']);

palm_app.controller('palmAppController', function ($scope, $http) {



$scope.searchFood = function (term) {
    var search = $http.get('https://api.nal.usda.gov/ndb/search/?' +
        'format=json&' +
        'q=' + term + '&' +
        'max=25&' +
        'api_key=YyAhPMz3MUxL5X1r2jhdo5rFtavN95Iqe7wNVCHL&' +
        'ds=Branded Food Products')
        .then(function (result) {
            console.log(result)
    })
}





});