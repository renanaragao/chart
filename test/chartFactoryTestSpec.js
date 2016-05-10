/// <reference path="../typings/jasmine/jasmine.d.ts"/>


'use strict';

describe('ChartFactory - ', function () {

	beforeEach(function () {
		
		window.google = {
			charts:{
				setOnLoadCallback: function (callback) {
				}
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
	
	it('chartFactory Should have a method to create a new chart', function () {
		
		expect(chart.factory.chartFactory).toBeDefined();
		
	});
	
	
	it('chartFactory Should create a new chart based on passed parameter (parameter chart.enumChat.column)', function () {
		
		var chartCreated = chart.factory.chartFactory().createNew(chart.enumChart.column, {data: []}, {});
		
		expect(chartCreated).toBeDefined();
		
	});
	
	it('chartFactory Should create a new chart based on passed parameter (parameter chart.enumChat.geo)', function () {
		
		var chartCreated = chart.factory.chartFactory().createNew(chart.enumChart.geo, {data: []}, {});
		
		expect(chartCreated).toBeDefined();
		
	});
	
	it('chartFactory Should create a new chart based on passed parameter (parameter chart.enumChat.line)', function () {
		
		var chartCreated = chart.factory.chartFactory().createNew(chart.enumChart.line, {data: []}, {});
		
		expect(chartCreated).toBeDefined();
		
	});
	
	it('chartFactory Should create a new chart based on passed parameter (parameter chart.enumChat.pie)', function () {
		
		var chartCreated = chart.factory.chartFactory().createNew(chart.enumChart.pie, {data: []}, {});
		
		expect(chartCreated).toBeDefined();
		
	});
	
	it('chartFactory Should create a new chart based on passed parameter (parameter chart.enumChat.gauge)', function () {
		
		var chartCreated = chart.factory.chartFactory().createNew(chart.enumChart.gauge, {data: []}, {});
		
		expect(chartCreated).toBeDefined();
		
	});	
	

	
});