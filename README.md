# angular-bootstrap-dropdown
It's a angular directive for bootstrap dropdown, named 'bsDropdown'   

The bsDropdown include all basic function in dropdown, include set default value, and listen change etc.   

Also support multi-select on newest version.   

angular-bootstrap-dropdown dependencies on AngularJS 1.2.x and Bootstrap 3   

You can see an online demo on [here](http://frozen-tundra-7264.herokuapp.com/examples/L8/#).   

### Versions
0.1.0 support basic function in bsDropdown, include use ng-model to set default value, and ng-change to listen change   

0.1.1 add bootstrap divider in bsDropdown 

0.2.0 add bootstrap dropdown disabled and item disabled in bsDropdown   
 
0.9.0(latest) add multi-select to bsDropdown!!   

### Development
```
$ git clone https://github.com/AllenFang/angular-bootstrap-dropdown.git
$ cd angular-practice-example
$ npm install
$ bower install
```
Use gulp to test the bsDropdown
```
$ npm test
or
$ node_modules/gulp/bin/gulp.js test
```


### Usage
Include the angular-bootstrap-dropdown library to your html page
```
<script src="bsDropdown.min.js"></script>
```
The ```bsDropdown.min.js``` is in the dist folder.
In the next, include the ```ng.bs.dropdown``` to your angular module dependencies  
```
angular.module("demoApp", ['ng.bs.dropdown'])
```
Then, you can go to use the angular-bootstrap-dropdown, below is a simple example  

First of all, give an angular controller
```
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
		$scope.selectYear = $scope.years[2];  //current select item
		
		/*changeYear function will be called if dropdown change*/
		$scope.changeYear = function(){
			console.log("YearController say... " + $scope.selectYear);
		}
	});
```

So here is your partial html code
```
<div ng-controller="YearController">
			<h4>You select {{selectYear}} ....</h4><br/>
			<div bs-dropdown 
			     bs-dropdown-display="MyDropDown" 
				 bs-dropdown-items="years" 
			     ng-model="selectYear" 
			     ng-change="changeYear()"></div>
</div>
```

### Setting
Use ```bs-dropdown-display``` attribute to display default text on dropdown if there is no any default value selected  
Use ```bs-dropdown-items``` attribute to specify the dropdown options  
Use ```ng-model``` to set the default selected value   
Use ```ng-change``` to listen up the change event on dropdown  
Use ```bs-dropdown-divider``` to specify the divider, for example bs-dropdown-divider="{{[2,5]}}".   
Use ```bs-dropdown-item-disabled``` to specify which option should be disabled,for example bs-dropdown-item-disabled="{{[2,5]}}".   
Use ```bs-dropdown-disabled``` to set dropdown disabled, for example bs-dropdown-disabled="true".   
Use ```bs-dropdown-multi``` to specify bsDropdown to be a multi-select dropdown.   