/// <reference path="../typings/jasmine/jasmine.d.ts"/>

describe('Geo Chart - ', function () {
	
	var element, chartOptions, chartSource;	
	
	beforeEach(function () {
		window.google = {		
			setOnLoadCallback: function (callback) {
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
	
	
	it('Must create a Geo Chart', function () {	
		
		var geoChart = new window.chart.charts.Geo({ data:[], options: 'options' }, { element: 'div' });
		
		var returnChart = geoChart.draw({ element: 'div' }, {source: 'source'}, { options: 'options' });
		
		expect(returnChart).toBeDefined();
		expect(element).toEqual({element: 'div'});
		expect(chartSource).toEqual({source: 'source'});
		expect(chartOptions).toEqual({options: 'options'}); 
		expect(chart.charts.Geo.prototype instanceof chart.charts.ChartBase).toEqual(true);
		
	});
	
		
});