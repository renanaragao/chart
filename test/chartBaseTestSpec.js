/// <reference path="../typings/jasmine/jasmine.d.ts"/>
describe('ChartBase - ', function () {
	
	'use strict';
	
	var callbackExpected,
		data = [
            { Grupo: 'sp', Descricao: 'a', Valor: 10 },
            { Grupo: 'sp', Descricao: 'b', Valor: 5 },
            { Grupo: 'sp', Descricao: 'c', Valor: 2 },
            { Grupo: 'rj', Descricao: 'b', Valor: 4 },
            { Grupo: 'rj', Descricao: 'c', Valor: 6 },
            { Grupo: 'sc', Descricao: 'a', Valor: 8 },
            { Grupo: 'sc', Descricao: 'c', Valor: 10 },
            { Grupo: 'bh', Descricao: 'c', Valor: 20 },
            { Grupo: 'bh', Descricao: 'b', Valor: 20 }
    ],
	dataTable = [];
	
	var google = {
		setOnLoadCallback: function (callback) {
			callbackExpected = callback;
		},
		visualization: {
			arrayToDataTable: function (data) {
				dataTable = data;
				
				return data;
			},
			events: {
						addListener: function (chart, event, select) {
						}
					}
		}
	};
	
	beforeEach(function () {
		
		window.google = {};
		
	});
	
	it('Must validate the data source of the ChartBase.', function () { 
		
		expect(function(){
			
			new chart.charts.ChartBase();
			
		}).toThrow(new Error('Data source not found.'));
		
		window.google = google;
		
		new chart.charts.ChartBase({source: 'url'});
		
		new chart.charts.ChartBase({data: 'url'});
		
	});
	
	it("Must validate google's library", function () {
		
		delete window.google;
		
		expect(function () {
			
			new chart.charts.ChartBase({data: []});
			
		}).toThrow(new Error("google chart not found."));
		
	});
	
	it("Must run google's method setOnLoadCallback", function () {
		
		window.google = google;
		
		new chart.charts.ChartBase({data: []});
		
		expect(typeof callbackExpected).toEqual('function');
		
	});
	
	it("Must run google's method visualization.arrayToDataTable", function () {
		
		window.google = google;
		
		new chart.charts.ChartBase({data: data});
		
		var dataTableExpected = [
			['Grupo', 'sp', 'rj', 'sc', 'bh'],
			['a', {v: 10, f: '10.00'}, {v: 0, f: '0'}, {v: 8, f: '8.00'}, {v: 0, f: '0'}],
			['b', {v: 5, f: '5.00'}, {v: 4, f: '4.00'}, {v: 0, f: '0'}, {v: 20, f: '20.00'}],
			['c', {v: 2, f: '2.00'}, {v: 6, f: '6.00'}, {v: 10, f: '10.00'}, {v: 20, f: '20.00'}],
		];
		
		callbackExpected();
		
		expect(dataTable).toEqual(dataTableExpected);
		
	});
	
	it('Must draw chart', function () {
		
		window.google = google;
		
			var elementExpected = {},
				optionsExpected = {},
				dataTableExpected = {};
		
		var ChartFake = function (options, el) {
			
			var self = this;
			
			chart.charts.ChartBase.call(self, options, el);
			
			self._draw = draw;
			
			function draw(pElement, datatable, pOptions) {
				elementExpected = pElement;
				optionsExpected = pOptions;
				dataTableExpected = datatable;
			}
		}
		
		ChartFake.prototype = Object.create(chart.charts.ChartBase.prototype);
		
		var options = {data: data, options: {width: 15}},
			el = {node: 'div'},
		    dataTable = [
			['Grupo', 'sp', 'rj', 'sc', 'bh'],
			['a', {v: 10, f: '10.00'}, {v: 0, f: '0'}, {v: 8, f: '8.00'}, {v: 0, f: '0'}],
			['b', {v: 5, f: '5.00'}, {v: 4, f: '4.00'}, {v: 0, f: '0'}, {v: 20, f: '20.00'}],
			['c', {v: 2, f: '2.00'}, {v: 6, f: '6.00'}, {v: 10, f: '10.00'}, {v: 20, f: '20.00'}],
		];;
		
		new ChartFake(options, el);
		
		callbackExpected();
		
		expect(elementExpected).toEqual(el);
		expect(optionsExpected).toEqual({width: 15, height: 100});
		expect(dataTableExpected).toEqual(dataTable);
		
	});
	
	it("If options's property 'responsive' to equal true, must calculate width based in number of columns", function () {
		
		var optionsExpected = {
			width: 23
		};
		
		window.google = {
				setOnLoadCallback: function (callback) {
					callbackExpected = callback;
				},
				visualization: {
				arrayToDataTable: function (data) {
					dataTable = data;
					
					return {
						getNumberOfColumns: function () {
							return 2;
						}
					};
				},
				events: {
						addListener: function (chart, event, select) {
						}
					}
			}
		};
		
		var ChartFake = function (options, el) {
			
			var self = this;
			
			chart.charts.ChartBase.call(self, options, el);
			
			self._draw = draw;
			
			function draw(pElement, datatable, pOptions) {
				optionsExpected = pOptions;
			}
		}
		
		ChartFake.prototype = Object.create(chart.charts.ChartBase.prototype);
		
		new ChartFake({data: data, options: {width: 23}});
		
		callbackExpected();
		
		expect(optionsExpected).toEqual({width: 23, height: 100});
		
		new ChartFake({data: data, options: {width: 23}, responsive: true});
		
		callbackExpected();
		
		expect(optionsExpected).toEqual({width: 130, height: 100});
		
	});
	
	it('Must capture the event click of mouse', function () {
		
		var eventEspected = {};
		
		var selectedChart = false;
		
		window.google = {
				setOnLoadCallback: function (callback) {
						callbackExpected = callback;
					},
				visualization: {
					arrayToDataTable: function (data) {
						},
					events: {
						addListener: function (chart, event, select) {
							eventEspected.chart = chart;
							eventEspected.event = event;
							eventEspected.select = select;
						}
					}
				}
		};
		
		var ChartFake = function (options, el) {
			
			var self = this;
			
			chart.charts.ChartBase.call(self, options, el);
			
			self._draw = draw;
			
			function draw(pElement, datatable, pOptions) {
				return 'chart';
			}
		}
		
		ChartFake.prototype = Object.create(chart.charts.ChartBase.prototype);
		
		new ChartFake({
				data: [],  
				responsive: false,
				select: function (chart) {
					selectedChart = true;
				}
			});
		
		callbackExpected();
		
		expect(eventEspected.chart).toEqual('chart');
		expect(eventEspected.event).toEqual('select');
		
		eventEspected.select();
		expect(selectedChart).toEqual(true);
		
	});
	
});