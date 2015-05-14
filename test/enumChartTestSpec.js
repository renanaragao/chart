
/// <reference path="../typings/jasmine/jasmine.d.ts"/>

describe('EnumChart - ', function () {
	
	beforeEach(function () {
		
		window.google.load = function (p1, p2, p3) { };
		
	});
	
	it("The property values can't be changed", function () {
		
		try {
			
			window.chart.enumChart.column = 5;
			
			expect(window.chart.enumChart.column).toEqual(1);
			
		} catch (error) {
			expect(true).toEqual(true);
		}
				
	});
	
	
	it("Can't be possible create new properties", function () {
		
		try {
			
			window.chart.enumChart.pie = 10;
			
			expect(window.chart.enumChart.pie).toBeUndefined();
			
		} catch (error) {
			expect(true).toEqual(true);
		}
		
	});
	
});
