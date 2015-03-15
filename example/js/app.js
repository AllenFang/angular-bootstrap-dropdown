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
	})
	.controller("DividerController", function($scope){
		$scope.actions = [
			"Action",
			"Another action",
			"Something else here",
			"separated link1",
			"Action anain",
			"Nothing else",
			"separated link2"
		];
		$scope.selectAction = null;
	})
	.controller("MultiSelectController", function($scope){
		$scope.actions = [
			"Action",
			"Another action",
			"Something else here",
			"separated link1",
			"Action anain",
			"Nothing else",
			"separated link2"
		];
		$scope.selectAction = [$scope.actions[0],$scope.actions[3]];
		$scope.change = function(){
			console.log("MultiSelectController say... " + $scope.selectAction);
		}
	});;