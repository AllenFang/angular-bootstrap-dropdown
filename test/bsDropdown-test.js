describe("bsDropdown Tests", function(){
	var mockScope;
	var compile;
	var el;

	beforeEach(angular.mock.module("ng.bs.dropdown"));

	describe("A basic dropdown test", function(){
		beforeEach(inject(function($rootScope, $compile){
			mockScope = $rootScope.$new();
			compile = $compile;
			mockScope.data = [
				"Option0",
				"Option1",
				"Option2",
				"Option3",
				"Option4",
				"Option5"
			];
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
});