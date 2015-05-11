/// <reference path="../typings/jasmine/jasmine.d.ts"/>
describe('ChartBase - ', function () {
	
	'use strict';
	
	var callbackExpected;
	
	var google = {
		setOnLoadCallback: function (callback) {
			callbackExpected = callback;
		}
	};
	
	beforeEach(function () {
		
		window.google = {};
		
	});
	
	it('Must validate the data source of the ChartBase.', function () { 
		
		expect(function(){
			
			new chart.charts.ChartBase();
			
		}).toThrow(new Error('Data source not found.'));
		
		new chart.charts.ChartBase({source: 'url'});
		
		new chart.charts.ChartBase({data: 'url'});
		
	});
	
	it("Must validate google's library", function () {
		
		delete window.google;
		
		expect(function () {
			
			new chart.charts.ChartBase({data: []});
			
		}).toThrow(new Error("google chart not found."));
		
	});
	
	xit("Must run the google's mehtod setOnLoadCallback", function () {
		
		new chart.charts.ChartBase({data: []});
		
		expect(typeof callbackExpected).toEqual('function');
		
	});
	
});