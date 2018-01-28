var palm_app = angular.module('palmApp', ['ngMaterial', 'ngAnimate']);

palm_app.controller('palmAppController', function ($scope, $http, $location) {


    // Is the first ground in the page hidden?
    params = $location.search();
    if (params.dbid) {
        $scope.currentPage = 'selected';
        
    }
    else{
        $scope.currentPage = 'start';
    }


    // Does the product have palm oil?
    $scope.hasPalm = false;
    console.log(params);
    // If there
    var parseNdbId = function (id) {
        var result = $http.get('https://api.nal.usda.gov/ndb/reports/?' +
            'ndbno=' + id + '&' +
            'type=b&' +
            'format=json&' +
            'api_key=YyAhPMz3MUxL5X1r2jhdo5rFtavN95Iqe7wNVCHL').then(function (value) {
            $scope.currentPage = 'selected';
            $location.search('dbid', id);
            $scope.hasPalm = hasPalmOil(value);
            console.log($scope.hasPalm);
            console.log($scope.currentPage);
        })
    };




    if (params.dbid) {
        parseNdbId(params.dbid);
        $scope.currentPage = 'selected';
    }
    else{
        $scope.currentPage = 'start';
    }




var productName = function (json){
    all_names = json.data.report.food.name
    return all_names.split(",")[0];
};



var hasPalmOil = function (json){
    console.log(json.data.report.food.ing.desc)
    var pattern = /(palm[^,]*oil)|(oil[^,]*palm)|(oil[^,].*\(.*palm.*\))/i
    ingredient_string = json.data.report.food.ing.desc
    return pattern.test(ingredient_string)
};

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