(function(window, angular, undefined){
'use strict';

var bd = angular.module("ng.bs.dropdown", []);
bd.constant('bsDropdownCfg', {
	display: 'DropDown',
	disabled: false,
	divider:[],
	disabledItems: []
});
bd.run(['$templateCache', function($templateCache){
	$templateCache.put('bsDropdown/templates/defaultTemplate.html',[
		'<div class="dropdown">',
		  '<button class="btn btn-default dropdown-toggle" type="button" id="bsDropDown" data-toggle="dropdown" aria-expanded="true">',
		    '{{showText}}',
		    '<span class="caret"></span>',
		  '</button>',
		  '<ul class="dropdown-menu" role="menu" aria-labelledby="bsDropDown">',
		    "<li role='presentation' ng-repeat='item in _bsDropdownItems' ng-class='{divider:item.isDivider, disabled: item.isDisabled}'>",
		      '<a ng-if="!item.isDivider" role="menuitem" tabindex="-1" href="" ng-click="selectItem(item)">{{item.text}}</a>',
		    '</li>',
		  '</ul>',
		'</div>'
	].join(''));

	$templateCache.put('bsDropdown/templates/multiSelectTemplate.html',[
		'<div class="dropdown">',
		  '<button class="btn btn-default dropdown-toggle" type="button" id="bsDropDown" data-toggle="dropdown" aria-expanded="true">',
		    '{{showText}}',
		    '<span class="caret"></span>',
		  '</button>',
		  '<ul class="dropdown-menu" role="menu" aria-labelledby="bsDropDown">',
		    "<li role='presentation' ng-repeat='item in _bsDropdownItems' ng-class='{divider:item.isDivider, disabled: item.isDisabled}'>",
		      '<a ng-if="!item.isDivider" role="menuitem" tabindex="-1" href="" ng-click="selectItem(item)">',
		      	  '<input type="checkbox" ng-checked="item.checked"/> {{item.text}}',
		      '</a>',
		    '</li>',
		  '</ul>',
		'</div>'
	].join(''));
}]);
bd.controller("bsDropdownController", 
	["$scope", "$element", "$attrs", function($scope, $element, $attrs){
		var ngModelCtrl, self = this;
		this.init = function(ngModelCtrl_){
			ngModelCtrl = ngModelCtrl_;
			ngModelCtrl.$render = function(){
				var isSelectValDefined = angular.isDefined($scope.selected);
				if(isSelectValDefined)
					ngModelCtrl.$setViewValue($scope.selected);

				self.$render(ngModelCtrl.$viewValue);
				if($scope.multiSelect) {
					if(!isSelectValDefined)
						$scope.selected = ngModelCtrl.$viewValue;
					self.checkMultiOptions();
				}
			};
		};

		this.checkMultiOptions = function(){
			for(var i=0;i<$scope._bsDropdownItems.length;i++){
				var item = $scope._bsDropdownItems[i];
				if($scope.selected.indexOf(item.text) != -1){
					$scope._bsDropdownItems[i].checked = true;
				}else{
					$scope._bsDropdownItems[i].checked = false;
				}
			}
		};

		$scope.selectItem = function(item){
			var text = item.text;
			if(!item.isDisabled){
				if($scope.multiSelect)	{
					var index = -1;
					if((index=$scope.selected.indexOf(text)) == -1){
						var newSelected = [];
						for(var i=0;i<$scope.selected.length;i++){
							newSelected.push($scope.selected[i]);
						}
						newSelected.push(text);
						$scope.selected = newSelected;
					}
					else{
						var newSelected = [];
						for(var i=0;i<$scope.selected.length;i++){
							if(i != index) newSelected.push($scope.selected[i]);
						}
						$scope.selected = newSelected;
					}
				} else{
					$scope.selected = text;
				}
				ngModelCtrl.$render();
			}
		};
}]);
bd.directive("bsDropdown", ['bsDropdownCfg', function(bsDropdownCfg){
		return{
			scope:{
				bsDropdownItems: "="
			},
			require: ['bsDropdown','?ngModel'],
			controller: "bsDropdownController", 
			templateUrl: function(elem, attr){
				return angular.isDefined(attr.bsDropdownMulti)?
					"bsDropdown/templates/multiSelectTemplate.html":
					"bsDropdown/templates/defaultTemplate.html";
			}, 
			link: function(scope, el, attr, ctrls){
				var bsDropdownCtrl = ctrls[0], ngModelCtrl = ctrls[1];
				var defaultDisplay = angular.isDefined(attr.bsDropdownDisplay)?
										attr.bsDropdownDisplay:bsDropdownCfg.display;

				scope._bsDropdownItems = scope.bsDropdownItems;
				scope.divider = angular.isDefined(attr.bsDropdownDivider)?
									scope.$eval(attr.bsDropdownDivider):bsDropdownCfg.divider;
				scope.disabledItems = angular.isDefined(attr.bsDropdownItemDisabled)?
										scope.$eval(attr.bsDropdownItemDisabled):bsDropdownCfg.disabledItems;
				scope.disabled = angular.isDefined(attr.bsDropdownDisabled)?
									scope.$eval(attr.bsDropdownDisabled):bsDropdownCfg.disabled;
				scope.multiSelect = angular.isDefined(attr.bsDropdownMulti);

				bsDropdownCtrl.init(ngModelCtrl);
				bsDropdownCtrl.$render = function(displayText){
					changeShowText(displayText);
				};
				
				scope._bsDropdownItems = createDropdownItems();
				bsDropdownRender();
				
				function bsDropdownRender(){
					var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
					el.find("#bsDropDown").attr("id", id);
					el.find(".dropdown-menu").attr("aria-labelledby", id);
					changeShowText(defaultDisplay);
					if(scope.disabled){
						el.find("button").addClass("disabled");
					}
				}

				function changeShowText(text){
					var _text = text;
					if(angular.isArray(_text)) {
						if(_text.length == 0)
							_text = null;
						else
							_text = _text.join();
					}
					scope.showText = _text !== null?_text:defaultDisplay;
				}

				function createDropdownItems(){
					var dropdownItem = [];
					var _k = 0;
					for(var i=0;i<scope.bsDropdownItems.length;i++){
						var isDivider = scope.divider.indexOf(i)!=-1;
						var isDisabled = scope.disabledItems.indexOf(i)!=-1;
						var text = scope.bsDropdownItems[i];
						if(isDivider){
							var option  = _createDropdownItemObj(_k++, text, !isDivider, isDisabled);
							var divider = _createDropdownItemObj(_k++, null, isDivider, false);
							dropdownItem.push(option);
							dropdownItem.push(divider);
						}else{
							var option = _createDropdownItemObj(_k++, text, isDivider, isDisabled);
							dropdownItem.push(option);
						}
					}
					return dropdownItem;
				}

				function _createDropdownItemObj(k, text_, isDivider_, isDisabled_){
					return {
						_k: k,
						text: text_,
						isDivider: isDivider_,
						isDisabled: isDisabled_
					};
				}
			},
			restrict: "AE"
		};
	}]);
})(window, window.angular);