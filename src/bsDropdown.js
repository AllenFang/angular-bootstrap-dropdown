(function(window, angular, undefined){
'use strict';

var bd = angular.module("ng.bs.dropdown", []);

bd.run(['$templateCache', function($templateCache){
	$templateCache.put('bsDropdown/templates/defaultTemplate.html',[
		'<div class="dropdown">',
		  '<button class="btn btn-default dropdown-toggle" type="button" id="bsDropDown" data-toggle="dropdown" aria-expanded="true">',
		    '{{showText}}',
		    '<span class="caret"></span>',
		  '</button>',
		  '<ul class="dropdown-menu" role="menu" aria-labelledby="bsDropDown">',
		    '<li role="presentation" ng-repeat="item in bsDropdownItems">',
		      '<a role="menuitem" tabindex="-1" href="#" ng-click="selectItem(item)">{{item}}</a>',
		    '</li>',
		  '</ul>',
		'</div>'
	].join(''));
}]);
bd.constant('bsDropdownCfg', {
	display: 'DropDown'
}).directive("bsDropdown", ['bsDropdownCfg', function(bsDropdownCfg){
		return{
			scope:{
				bsDropdownItems: "="
			},
			require: ['?ngModel'],
			templateUrl: "bsDropdown/templates/defaultTemplate.html",
			link: function(scope, el, attr, ctrl){
				var ngModelCtrl = ctrl[0];
				var defaultDisplay = angular.isDefined(attr.bsDropdownDisplay)?
										attr.bsDropdownDisplay:bsDropdownCfg.display;
				ngModelCtrl.$render = function(){
					if(angular.isDefined(scope.selected))
						ngModelCtrl.$setViewValue(scope.selected);
					_changeShowText(ngModelCtrl.$viewValue);
				};
				
				_changeShowText(defaultDisplay);
				
				scope.selectItem = function(item){
					scope.selected = item;					
					ngModelCtrl.$render();
				};

				function _changeShowText(text){
					scope.showText = text !== null?text:defaultDisplay;
				}
			},
			restrict: "AE"
		};
	}]);
})(window, window.angular);