(function(window, angular, undefined){
'use strict';

var dd = angular.module("ng.bs.dropdown", []);

dd.run(['$templateCache', function($templateCache){
	$templateCache.put('bsDropdown/templates/defaultTemplate.html',[
		'<div class="dropdown">',
		  '<button class="btn btn-default dropdown-toggle" type="button" id="myDropDown" data-toggle="dropdown" aria-expanded="true">',
		    '{{showText}}',
		    '<span class="caret"></span>',
		  '</button>',
		  '<ul class="dropdown-menu" role="menu" aria-labelledby="myDropDown">',
		    '<li role="presentation" ng-repeat="item in items">',
		      '<a role="menuitem" tabindex="-1" href="#" ng-click="selectItem(item)">{{item}}</a>',
		    '</li>',
		  '</ul>',
		'</div>'
	].join(''));
}]);

dd.directive("bsDropdown", function(){
		return{
			scope:{
				items: "="
			},
			require: ['?ngModel'],
			templateUrl: "bsDropdown/templates/defaultTemplate.html",
			link: function(scope, el, attr, ctrl){
				var ngModelCtrl = ctrl[0];
				var defaulrShowText = angular.isDefined(attr.showText)?attr.showText:"DropDown";
				ngModelCtrl.$render = function(){
					if(angular.isDefined(scope.selected))
						ngModelCtrl.$setViewValue(scope.selected);
					_changeShowText(ngModelCtrl.$viewValue);
				};

				_changeShowText(defaulrShowText);
				
				scope.selectItem = function(item){
					scope.selected = item;					
					ngModelCtrl.$render();
				};

				function _changeShowText(text){
					scope.showText = text !== null?text:defaulrShowText;
				}
			},
			restrict: "AE"
		};
	});


})(window, window.angular);