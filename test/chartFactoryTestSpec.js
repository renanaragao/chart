/// <reference path="../typings/jasmine/jasmine.d.ts"/>


'use strict';

describe('ChartFactory - ', function () {

	beforeEach(function () {
		
		window.google = {
				setOnLoadCallback: function (callback) {
				},
				visualization: {
				arrayToDataTable: function (data) {
					
					return {
						getNumberOfColumns: function () {
						}
					};
				},
				events: {
						addListener: function (chart, event, select) {
						}
					}
			},
			load: function (p1, p2, p3) { }
		};
		
	});
	
	it('chartFactory must have a method to create a new chart', function () {
		
		expect(chart.factory.chartFactory).toBeDefined();
		
	});
	
	
	it('chartFactory must create a new chart based on passed parameter (parameter chart.enumChat.column)', function () {
		
		var chartCreated = chart.factory.chartFactory().createNew(chart.enumChart.column, {data: []}, {});
		
		expect(chartCreated).toBeDefined();
		
	});
	
	it('chartFactory must create a new chart based on passed parameter (parameter chart.enumChat.geo)', function () {
		
		var chartCreated = chart.factory.chartFactory().createNew(chart.enumChart.geo, {data: []}, {});
		
		expect(chartCreated).toBeDefined();
		
	});

	
});