var palm_app = angular.module('palmApp', ['ngMaterial', 'ngAnimate', 'ngMessages']);

palm_app.controller('palmAppController', function ($scope, $http, $location) {

    $scope.error_msg = '';
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
            $scope.product_name = productName(value);
            $scope.manufacturer_name = manufacturerName(value);
            console.log($scope.hasPalm);
            console.log(value);
            console.log($scope.currentPage);
        }, function (reason) {
            error_msg = 'Failed to make API request.';
        })
    };

    if (params.dbid) {
        parseNdbId(params.dbid);
        $scope.currentPage = 'selected';
    }
    else{
        $scope.currentPage = 'start';
    }


    var manufacturerName = function(json){
        manufacturer = json.data.report.food.manu;
        return manufacturer;
    };

    var productName = function (json){
        all_names = json.data.report.food.name;
        first_name = all_names.split(",")[0];
        second_name = all_names.split(",")[1];

        var pattern = /^[^\s]*(\s[^\s]*){0,2}/i
        return pattern.exec(first_name)[0] + " " + pattern.exec(second_name)[0];
    };

    var hasPalmOil = function (json){
        console.log(json.data.report.food.ing.desc)
        var pattern = /(palm[^,]*oil)|(oil[^,]*palm)|(oil[^,].*\(.*palm.*\))/i
        ingredient_string = json.data.report.food.ing.desc
        return pattern.test(ingredient_string)
    };

    $scope.searchFood = function (form) {
        console.log(form.term.$error);
        term = form.term.$modelValue;
        var search = $http.get('https://api.nal.usda.gov/ndb/search/?' +
        'format=json&' +
        'q=' + term + '&' +
        'max=25&' +
        'api_key=YyAhPMz3MUxL5X1r2jhdo5rFtavN95Iqe7wNVCHL&' +
        'ds=Branded Food Products')
        .then(function (result) {
            console.log(result);
            try {
                parseNdbId(result.data.list.item[0].ndbno);
                form.term.$error.validationError = false;
            }
            catch(err) {
                form.term.$error.validationError = true;
            }
    })

};
    $scope.submitAnother = function () {
        $location.search('dbid', null);
        $scope.currentPage = 'start';
    }





});