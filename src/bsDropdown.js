(function(window, angular, undefined){
'use strict';

var bd = angular.module("ng.bs.dropdown", []);
bd.constant('bsDropdownCfg', {
	display: 'DropDown',
	divider:[]
});
bd.run(['$templateCache', function($templateCache){
	$templateCache.put('bsDropdown/templates/defaultTemplate.html',[
		'<div class="dropdown">',
		  '<button class="btn btn-default dropdown-toggle" type="button" id="bsDropDown" data-toggle="dropdown" aria-expanded="true">',
		    '{{showText}}',
		    '<span class="caret"></span>',
		  '</button>',
		  '<ul class="dropdown-menu" role="menu" aria-labelledby="bsDropDown">',
		    "<li role='presentation' ng-repeat='item in _bsDropdownItems' ng-class='{divider:item.isDivider}'>",
		      '<a ng-if="!item.isDivider" role="menuitem" tabindex="-1" href="#" ng-click="selectItem(item.text)">{{item.text}}</a>',
		    '</li>',
		  '</ul>',
		'</div>'
	].join(''));
}]);
bd.directive("bsDropdown", ['bsDropdownCfg', function(bsDropdownCfg){
		return{
			scope:{
				bsDropdownItems: "="
			},
			require: ['?ngModel'],
			templateUrl: "bsDropdown/templates/defaultTemplate.html",
			link: function(scope, el, attr, ctrl){
				var ngModelCtrl = ctrl[0];
				scope._bsDropdownItems = scope.bsDropdownItems;
				var defaultDisplay = angular.isDefined(attr.bsDropdownDisplay)?
										attr.bsDropdownDisplay:bsDropdownCfg.display;
				scope.divider = angular.isDefined(attr.bsDropdownDivider)?
									scope.$eval(attr.bsDropdownDivider):bsDropdownCfg.divider;								
				
				ngModelCtrl.$render = function(){
					if(angular.isDefined(scope.selected))
						ngModelCtrl.$setViewValue(scope.selected);
					_changeShowText(ngModelCtrl.$viewValue);
				};

				_createDropdownItems();
				_render();
				
				scope.selectItem = function(item){
					scope.selected = item;					
					ngModelCtrl.$render();
				};

				function _render(){
					var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
					el.find("#bsDropDown").attr("id", id);
					el.find(".dropdown-menu").attr("aria-labelledby", id);
					_changeShowText(defaultDisplay);
				}

				function _changeShowText(text){
					scope.showText = text !== null?text:defaultDisplay;
				}

				function _createDropdownItems(){
					var dropdownItem = [];
					var _k = 0;
					for(var i=0;i<scope.bsDropdownItems.length;i++){
						var isDivider = scope.divider.indexOf(i)!=-1;
						var text = scope.bsDropdownItems[i];
						if(isDivider){
							var option  = _createDropdownOption(_k++, text, !isDivider);
							var divider = _createDropdownOption(_k++, null, isDivider);
							dropdownItem.push(option);
							dropdownItem.push(divider);
						}else{
							var option = _createDropdownOption(_k++, text, isDivider);
							dropdownItem.push(option);
						}
					}
					scope._bsDropdownItems = dropdownItem;
				}

				function _createDropdownOption(k, text_, isDivider_){
					return {
						_k: k,
						text: text_,
						isDivider: isDivider_
					};
				}
			},
			restrict: "AE"
		};
	}]);
})(window, window.angular);