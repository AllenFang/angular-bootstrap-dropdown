# angular-bootstrap-dropdown
It's a angular directive for bootstrap dropdown

angular-bootstrap-dropdown dependencies on AngularJS 1.2.x and Bootstrap 3  

Current version is 0.1, there will be more improvement on angular-bootstrap-dropdown.  
You can see the example on example folder.  

### Development
```bash
$ git clone https://github.com/AllenFang/angular-bootstrap-dropdown.git
$ cd angular-practice-example
$ npm install
$ bower install
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

Use ```bs-dropdown-display``` attribute to display default text on dropdown if there is no any default value selected  
Use ```bs-dropdown-items``` attribute to specify the dropdown options  
Use ```ng-model``` to set the default selected value   
Use ```ng-change``` to listen up the change event on dropdown  
