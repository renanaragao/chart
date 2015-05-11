
/// <reference path="../typings/jasmine/jasmine.d.ts"/>

describe('EnumChart - ', function () {
	
	it("The properties value can't be changed", function () {
		
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
