/// <reference path="../typings/jasmine/jasmine.d.ts"/>

describe('Gauge Chart - ', function () {
	
	var element, chartOptions, chartSource;	
	
	beforeEach(function () {
		window.google = {		
			charts:{
				setOnLoadCallback: function (callback) {
				}
			},	
			visualization: {
				
				Gauge: function (el) {
										
					element = el;	
									
					return {	
											
						draw: function(source, options){
														
							chartSource = source;
														
							chartOptions = options;	
													
						}						
					};					
				}
			},
			load: function (p1, p2, p3) { }			
		};	
	});
	
	
	it('Should create a Gauge Chart', function () {	
		
		var expectedOptions = {
			legend: { position: 'none' },
            backgroundColor: 'transparent',
			width: 250
		};
		
		var gaugeChart = new chart.charts.Gauge({ data:[], options: {width: 250} }, { element: 'div' });
			
		var returnChart = gaugeChart._drawTemplateMethod({ element: 'div' }, {source: 'source'}, {width: 250});
		
		expect(returnChart).toBeDefined();
		expect(element).toEqual({element: 'div'});
		expect(chartSource).toEqual({source: 'source'});
		expect(chartOptions).toEqual(expectedOptions); 
		expect(chart.charts.Line.prototype instanceof chart.charts.ChartBase).toEqual(true);
		
	});
	
		
});