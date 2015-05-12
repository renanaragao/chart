/// <reference path="../typings/jasmine/jasmine.d.ts"/>


'use strict';

describe('ChartFactory - ', function () {

	beforeEach(function () {
		
		window.google = {};
		
	});
	
	it('chartFactory must have a method to create a new chart', function () {
		
		expect(chart.factory.chartFactory).toBeDefined();
		
	});
	
	
	it('chartFactory must create a new chart based on passed parameter (parameter 0 (column))', function () {
		
		var chartCreated = chart.factory.chartFactory().createNew(0, {data: []}, {});
		
		expect(chartCreated).toBeDefined();
		
	});
	
	it('chartFactory must create a new chart based on passed parameter (parameter 1 (column))', function () {
		
		var chartCreated = chart.factory.chartFactory().createNew(1, {data: []}, {});
		
		expect(chartCreated).toBeDefined();
		
	});

	
});