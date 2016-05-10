/// <reference path="../typings/jasmine/jasmine.d.ts"/>

describe('Geo Chart - ', function () {
	
	var element, chartOptions, chartSource;	
	
	beforeEach(function () {
		window.google = {		
			charts:{
				setOnLoadCallback: function (callback) {
				}
			},	
			visualization: {
				
				GeoChart: function (el) {
										
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
	
	
	it('Should create a Geo Chart', function () {	
		
		var expectedOptions = {
                height: 500,
                width: 12,
				region: 'BR', //Brazil
				displayMode: 'provinces'
            } ;
		
		var geoChart = new window.chart.charts.Geo({ data:[], options: expectedOptions }, { element: 'div' });
		
		var returnChart = geoChart._drawTemplateMethod({ element: 'div' }, {source: 'source'}, expectedOptions);
		
		expect(returnChart).toBeDefined();
		expect(element).toEqual({element: 'div'});
		expect(chartSource).toEqual({source: 'source'});
		expect(chartOptions).toEqual(expectedOptions); 
		expect(chart.charts.Geo.prototype instanceof chart.charts.ChartBase).toEqual(true);
		
	});
	
		
});