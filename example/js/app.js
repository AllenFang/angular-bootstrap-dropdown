'use strict';

angular.module("demoApp", ['ng.bs.dropdown'])
	.controller("YearController", function($scope){
		$scope.years = [
			"2015",
			"2014",
			"2013",
			"2012",
			"2011",
			"2010"
		];
		$scope.selectYear = $scope.years[2];
		$scope.changeYear = function(){
			console.log("YearController say... " + $scope.selectYear);
		}
	});