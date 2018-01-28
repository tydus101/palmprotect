var palm_app = angular.module('palmApp', ['ngMaterial', 'ngAnimate']);

palm_app.controller('palmAppController', function ($scope, $http) {

    // Is the first ground in the page hidden?
    $scope.groundOneHidden = false;
    var parseNdbId = function (id) {
    var result = $http.get('https://api.nal.usda.gov/ndb/reports/?' +
        'ndbno=' + id + '&' +
        'type=b&' +
        'format=json&' +
        'api_key=YyAhPMz3MUxL5X1r2jhdo5rFtavN95Iqe7wNVCHL').then(function (value) {

            console.log(value)
            //console.log(value)
        console.log(productName(value));
        console.log(hasPalmOil(value));
    })
    };

var productName = function (json){
    all_names = json.data.report.food.name
    return all_names.split(",")[0];
}

var hasPalmOil = function (json){
    console.log(json.data.report.food.ing.desc)
    var pattern = /(palm[^,]*oil)|(oil[^,]*palm)|(oil[^,].*\(.*palm.*\))/i
    ingredient_string = json.data.report.food.ing.desc
    return pattern.test(ingredient_string)
}

    $scope.searchFood = function (term) {
        var search = $http.get('https://api.nal.usda.gov/ndb/search/?' +
        'format=json&' +
        'q=' + term + '&' +
        'max=25&' +
        'api_key=YyAhPMz3MUxL5X1r2jhdo5rFtavN95Iqe7wNVCHL&' +
        'ds=Branded Food Products')
        .then(function (result) {
            console.log(result);
            parseNdbId(result.data.list.item[0].ndbno);
    })

}





});