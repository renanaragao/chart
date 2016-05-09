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
			charts : {
				setOnLoadCallback: function (callback) {
					callbackExpected = callback;
				}
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
			},
			load: function (p1, p2, p3) {
					
			}
	};
	
	beforeEach(function () {
		
		window.google = {};
		chart.charts.ChartBase.prototype.draw = function () {
			
		}		
	});
	
	it("Must validate ChartBase's data source ", function () { 
		
		expect(function(){
			
			new chart.charts.ChartBase();
			
		}).toThrow(new Error('Data source not found.'));
		
		window.google = google;
				
		new chart.charts.ChartBase({data: []});
		
	});
	
	it("Must run google's method setOnLoadCallback", function () {
		
		window.google = google;
		
		new chart.charts.ChartBase({data: []});
		
		expect(typeof callbackExpected).toEqual('function');
		
	});
	
	it("Must run google's method visualization.arrayToDataTable", function () {
		
		window.google = google;
		
		var ChartFake = function (options, el) {
		
		var self = this;				
		
		chart.charts.ChartBase.call(self, options, el);
		
		self._drawTemplateMethod = draw;
		
		function draw(pElement, datatable, pOptions) {
				dataTableExpected = datatable;
			}
		}
		
		ChartFake.prototype = Object.create(chart.charts.ChartBase.prototype);
		
		new ChartFake({data: data});
		
		var dataTableExpected = [
			['Grupo', 'a', 'b', 'c'],
			['sp', {v: 10, f: '10.00'}, {v: 5, f: '5.00'}, {v: 2, f: '2.00'}],
			['rj', {v: 0, f: '0'}, {v: 4, f: '4.00'}, {v: 6, f: '6.00'}],
			['sc', {v: 8, f: '8.00'}, {v: 0, f: '0'}, {v: 10, f: '10.00'}],
			['bh', {v: 0, f: '0'}, {v: 20, f: '20.00'}, {v: 20, f: '20.00'}],
			
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
			
			self._drawTemplateMethod = draw;
			
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
			['Grupo', 'a', 'b', 'c'],
			['sp', {v: 10, f: '10.00'}, {v: 5, f: '5.00'}, {v: 2, f: '2.00'}],
			['rj', {v: 0, f: '0.00'}, {v: 4, f: '4.00'}, {v: 6, f: '6.00'}],
			['sc', {v: 8, f: '8.00'}, {v: 0, f: '0.00'}, {v: 10, f: '10.00'}],
			['bh', {v: 0, f: '0.00'}, {v: 20, f: '20.00'}, {v: 20, f: '20.00'}],
		];
		
		new ChartFake(options, el);
		callbackExpected();
		expect(elementExpected).toEqual(el);
		expect(optionsExpected).toEqual({width: 15});
		expect(dataTableExpected).toEqual(dataTable);
		
	});
	
	it("If options's property 'responsive' to equal true and if the multiplication between column numbers and 65 to be bigger than chart's width, must calculate width based in number of columns", function () {
		
		var optionsExpected = {
			width: 23
		};
		
		window.google = {
				charts : {
					setOnLoadCallback: function (callback) {
						callbackExpected = callback;
					}
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
			},
			load: function (p1, p2, p3) { }
		};
		
		var ChartFake = function (options, el) {
			
			var self = this;
			
			chart.charts.ChartBase.call(self, options, el);
			
			self._drawTemplateMethod = draw;
			
			function draw(pElement, datatable, pOptions) {
				optionsExpected = pOptions;
			}
		}
		
		ChartFake.prototype = Object.create(chart.charts.ChartBase.prototype);
		
		new ChartFake({data: data, options: {width: 23}});
		callbackExpected();
		expect(optionsExpected).toEqual({width: 23});
		
		new ChartFake({data: data, options: {width: 23}, responsive: true});
		callbackExpected();
		expect(optionsExpected).toEqual({width: 130});
		
		new ChartFake({data: data, options: {width: 230}, responsive: true});
		callbackExpected();
		expect(optionsExpected).toEqual({width: 230});
		
	});
	
	it('Must capture the click event', function () {
		
		var eventExpected = {};
		
		var expectedChart = {};
		
		var setSelecttion = false;
		
		var dataSource = [
			            { Grupo: 'sp', Descricao: 'a', Valor: 10 },
			            { Grupo: 'sp', Descricao: 'b', Valor: 5 },
			            { Grupo: 'sp', Descricao: 'c', Valor: 2 },
			            { Grupo: 'rj', Descricao: 'b', Valor: 4 },
			            { Grupo: 'rj', Descricao: 'c', Valor: 6 },
			            { Grupo: 'sc', Descricao: 'a', Valor: 8 },
			            { Grupo: 'sc', Descricao: 'c', Valor: 10 },
			            { Grupo: 'bh', Descricao: 'c', Valor: 20 },
			            { Grupo: 'bh', Descricao: 'b', Valor: 20 }
			      ];
		
		window.google = {
				charts : {
					setOnLoadCallback: function (callback) {
						callbackExpected = callback;
					}
				},
				visualization: {
					arrayToDataTable: function (data) {
							
							return {
								getValue: function (indexRow, indexColumn) {
									if(indexRow === 1 && indexColumn === 0) return 'rj';
								}
							};
							
						},
					events: {
						addListener: function (chart, event, select) {
							eventExpected.idChart = chart.id;
							eventExpected.event = event;
							eventExpected.select = select;
						}
					}
				},
			load: function (p1, p2, p3) { }
		};
		
		var ChartFake = function (options, el) {
			
			var self = this;
			
			chart.charts.ChartBase.call(self, options, el);
			
			self._drawTemplateMethod = draw;
			
			function draw(pElement, datatable, pOptions) {
				return {
					getSelection: function () {
						return [{row: 1}];
					},
					setSelection: function () {
						setSelecttion = true;
					},
					id: 45
				};
			}
		}
		
		ChartFake.prototype = Object.create(chart.charts.ChartBase.prototype);
		
		new ChartFake({
				data: dataSource,  
				responsive: false,
				select: function (chart) {
					expectedChart = chart;
				}
			});
		callbackExpected();
		expect(eventExpected.idChart).toEqual(45);
		expect(eventExpected.event).toEqual('select');
		
		eventExpected.select();
		expect(expectedChart).toEqual({text: 'rj'});
		
	});
	
	
	it('Must exists drawChart function', function(){
		
		window.google = {
				charts : {
					setOnLoadCallback: function (callback) {
						callbackExpected = callback;
					}
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
			},
			load: function (p1, p2, p3) { }
		};
		
		var chartBase = new chart.charts.ChartBase({data: [], moneyFormat: 'BRL', options: { width: 500 }},{el: 'div'});
		
		var drawFunctionP1, drawFunctionP2, drawFunctionP3;
		
		chartBase._drawTemplateMethod = function(p1, p2, p3){
			
			drawFunctionP1 = p1;			
			drawFunctionP2 = p2;
			drawFunctionP3 = p3;
			
		};
					
		expect(chartBase.drawChart).toBeDefined();
		
		var dataSource = [
			            { Grupo: 'sp', Descricao: 'a', Valor: 10 },
			            { Grupo: 'sp', Descricao: 'b', Valor: 5 },
			            { Grupo: 'sp', Descricao: 'c', Valor: 2 },
			            { Grupo: 'rj', Descricao: 'b', Valor: 4 },
			            { Grupo: 'rj', Descricao: 'c', Valor: 6 },
			            { Grupo: 'sc', Descricao: 'a', Valor: 8 },
			            { Grupo: 'sc', Descricao: 'c', Valor: 10 },
			            { Grupo: 'bh', Descricao: 'c', Valor: 20 },
			            { Grupo: 'bh', Descricao: 'b', Valor: 20 }
			      ];
		
		chartBase.drawChart(dataSource, { width: 120 });
		
		var dataTableExpected = [
			['Grupo', 'a', 'b', 'c'],
			['sp', {v: 10, f: 'R$ 10,00'}, {v: 5, f: 'R$ 5,00'}, {v: 2, f: 'R$ 2,00'}],
			['rj', {v: 0, f: 'R$ 0,00'}, {v: 4, f: 'R$ 4,00'}, {v: 6, f: 'R$ 6,00'}],
			['sc', {v: 8, f: 'R$ 8,00'}, {v: 0, f: 'R$ 0,00'}, {v: 10, f: 'R$ 10,00'}],
			['bh', {v: 0, f: 'R$ 0,00'}, {v: 20, f: 'R$ 20,00'}, {v: 20, f: 'R$ 20,00'}],
		];
		
		expect(drawFunctionP1).toEqual({el: 'div'});
		expect(drawFunctionP3).toEqual({width: 120});
		expect(dataTable).toEqual(dataTableExpected);	
		
	});	
	
});