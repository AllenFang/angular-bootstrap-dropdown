describe("bsDropdown Tests", function(){
	var mockScope;
	var compile;
	var el;
	var dropdownItem = [
		"Option0",
		"Option1",
		"Option2",
		"Option3",
		"Option4",
		"Option5"
	];

	beforeEach(angular.mock.module("ng.bs.dropdown"));

	describe("A basic dropdown test", function(){
		beforeEach(inject(function($rootScope, $compile){
			mockScope = $rootScope.$new();
			compile = $compile;
			mockScope.data = dropdownItem;
			//default select value
			mockScope.selectData = mockScope.data[3];

			el = "<div bs-dropdown bs-dropdown-items='data' ng-model='selectData'></div>";
			el = $compile(el)(mockScope);
			mockScope.$digest();
		}));

		it("the isolateScope in bsDropdown directive should be correct", function(){
			var isolated = el.isolateScope();
			var _bsDropdownItems = isolated._bsDropdownItems;
			expect(_bsDropdownItems).not.toBeNull();
			expect(_bsDropdownItems).toBeDefined();
			expect(mockScope.data.length).toBe(_bsDropdownItems.length);		
			for(var i=0;i<_bsDropdownItems.length;i++){
				var item = _bsDropdownItems[i];
				expect(item).toBeDefined();
				expect(item._k).toBe(i);
				expect(item.text).toBe(mockScope.data[i]);
				expect(item.isDivider).toBe(false);
				expect(item.isDisabled).toBe(false);
			}
			expect(isolated.showText).toBeDefined();
			expect(isolated.showText).toBe(mockScope.selectData);
			expect(isolated.divider).toBeDefined();
			expect(isolated.divider.length).toBe(0);
			expect(isolated.disabledItems).toBeDefined();
			expect(isolated.disabledItems.length).toBe(0);
			expect(isolated.disabled).toBeDefined();
			expect(isolated.disabled).toBe(false);
		});

		it("the display text should be default selected data", function(){
			expect(el.find("button").text()).toBe(mockScope.selectData);
		});

		it("the item on dropdown should be correct", function(){
			var itemElms = el.find("li");
			expect(itemElms.length).toBe(mockScope.data.length);
			for(var i=0;i<itemElms.length;i++){
				expect(itemElms.eq(i).find("a").text()).toBe(mockScope.data[i]);
			}
		});

		it("click item should change the value of ngModel", function(){
			var itemElms = el.find("li");
			for(var i=0;i<itemElms.length;i++){
				itemElms.eq(i).find("a").triggerHandler("click");
				expect(mockScope.selectData).toBe(mockScope.data[i]);
			}
		});
	});

	describe("A dropdown with divider test", function(){
		var _newDividerPos;
		beforeEach(inject(function($rootScope, $compile){
			mockScope = $rootScope.$new();
			compile = $compile;
			mockScope.data = dropdownItem;
			//default select value
			mockScope.selectData = null;

			el = "<div bs-dropdown bs-dropdown-items='data' bs-dropdown-divider='{{[1,3]}}' ng-model='selectData'></div>";
			el = $compile(el)(mockScope);
			mockScope.$digest();
		}));

		it("the isolateScope in bsDropdown directive should be correct", function(){
			var isolated = el.isolateScope();
			expect(isolated.divider).toBeDefined();
			expect(isolated.divider.length).toBe(2);

			var _bsDropdownItems = isolated._bsDropdownItems;
			expect(_bsDropdownItems).not.toBeNull();
			expect(_bsDropdownItems).toBeDefined();
			expect(mockScope.data.length+isolated.divider.length).toBe(_bsDropdownItems.length);		
			
			var offset = 0;
			_newDividerPos = [];
			var pos = 1;
			for(var i=0;i<isolated.divider.length;i++){
				_newDividerPos.push(isolated.divider[i]+pos);
				pos++;
			}
			for(var i=0;i<_bsDropdownItems.length;i++){
				var item = _bsDropdownItems[i];
				expect(item).toBeDefined();
				expect(item._k).toBe(i);
				expect(item.isDisabled).toBe(false);

				if(_newDividerPos.indexOf(i) != -1){
					expect(item.text).toBe(null);
					expect(item.isDivider).toBe(true);
					offset++;
				}else{
					expect(item.text).toBe(mockScope.data[i-offset]);
					expect(item.isDivider).toBe(false);
				}
			}
		});

		it("the item on dropdown should be correct", function(){
			var itemElms = el.find("li");
			var offset = 0;
			for(var i=0;i<itemElms.length;i++){
				if(_newDividerPos.indexOf(i) != -1){
					offset++;
					expect(itemElms.eq(i).attr("class").indexOf('divider')).not.toBe(-1);
				}else{
					expect(itemElms.eq(i).find("a").text()).toBe(mockScope.data[i-offset]);
				}
			}
		});
	});

	describe("A dropdown with disabled items test", function(){
		beforeEach(inject(function($rootScope, $compile){
			mockScope = $rootScope.$new();
			compile = $compile;
			mockScope.data = dropdownItem;
			//default select value
			mockScope.selectData = null;

			el = "<div bs-dropdown bs-dropdown-items='data' bs-dropdown-item-disabled='{{[1,3]}}' ng-model='selectData'></div>";
			el = $compile(el)(mockScope);
			mockScope.$digest();
		}));

		it("the isolateScope in bsDropdown directive should be correct", function(){
			var isolated = el.isolateScope();
			expect(isolated.disabledItems).toBeDefined();
			expect(isolated.disabledItems.length).toBe(2);

			var _bsDropdownItems = isolated._bsDropdownItems;
			expect(_bsDropdownItems).not.toBeNull();
			expect(_bsDropdownItems).toBeDefined();
			expect(mockScope.data.length).toBe(_bsDropdownItems.length);		
			
			for(var i=0;i<_bsDropdownItems.length;i++){
				var item = _bsDropdownItems[i];
				expect(item).toBeDefined();
				expect(item._k).toBe(i);
				expect(item.isDivider).toBe(false);
				expect(item.text).toBe(mockScope.data[i]);
				if(isolated.disabledItems.indexOf(i) != -1)
					expect(item.isDisabled).toBe(true);
				else
					expect(item.isDisabled).toBe(false);
			}
		});

		it("the item on dropdown should be correct", function(){
			var isolated = el.isolateScope();
			var itemElms = el.find("li");
			for(var i=0;i<itemElms.length;i++){
				if(isolated.disabledItems.indexOf(i) != -1)
					expect(itemElms.eq(i).attr("class").indexOf('disabled')).not.toBe(-1);
				expect(itemElms.eq(i).find("a").text()).toBe(mockScope.data[i]);
			}
		});
	});

	describe("A disabled dropdown test", function(){
		beforeEach(inject(function($rootScope, $compile){
			mockScope = $rootScope.$new();
			compile = $compile;
			mockScope.data = dropdownItem;
			mockScope.selectData = null;

			el = "<div bs-dropdown bs-dropdown-items='data' bs-dropdown-disabled='true' ng-model='selectData'></div>";
			el = $compile(el)(mockScope);
			mockScope.$digest();
		}));

		it("the dropdown should be desabled", function(){
			expect(el.find("button").attr("class").indexOf('disabled')).not.toBe(-1);
		});
	});
});