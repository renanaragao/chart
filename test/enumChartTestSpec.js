/// <reference path="../typings/jasmine/jasmine.d.ts"/>

describe('EnumChart - ', function () {
	
	'use strict';
	
	it("The properties value can't be changed", function () {
		
		expect(function () {
			chart.enumChart.column = 5;
		}).toThrow();
				
	});
	
	
	it("Can't be possible to create new properties", function () {
		
		expect(function () {
			chart.enumChart.pie = 10;
		}).toThrow();
		
	});
	
});
