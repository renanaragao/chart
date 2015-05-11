/// <reference path="../typings/jasmine/jasmine.d.ts"/>


'use strict';

describe('ChartFactory - ', function () {

	beforeEach(function () {
		
		chart.charts = {
			Column: function(options, el){
				return {
					returned: 'column'
				};
			},
			Pie: function (options, el) {
				return {
					returned: 'pie'
				};
			}
		};	
	});
	

	it('chartFactory must have a method to create a new chart', function () {
		
		expect(chart.factory.chartFactory).toBeDefined();
		
	});
	
	
	it('chartFactory must create a new chart based on passed parameter (parameter 0 (column))', function () {
		
		var chartCreated = chart.factory.chartFactory().createNew(0, {}, {});
		
		expect(chartCreated).toBeDefined();
		expect(chartCreated.returned).toEqual('column');
		
	});
	
	it('chartFactory must create a new chart based on passed parameter (parameter 1 (column))', function () {
		
		var chartCreated = chart.factory.chartFactory().createNew(1, {}, {});
		
		expect(chartCreated).toBeDefined();
		expect(chartCreated.returned).toEqual('pie');
		
	});

	
});