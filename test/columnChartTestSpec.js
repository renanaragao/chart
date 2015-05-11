/// <reference path="../typings/jasmine/jasmine.d.ts"/>

describe('Column Chart - ', function () {


	beforeEach(function() {
	
		window.chart = {
			charts: {
				ChartBase: function() {
					
				}
			}
		};		
				
	});
	
	
	it('Must create a Column Chart', function () {	
						console.log(window.chart);
		var columnChart = new chart.charts.Column({ options: 'options' }, { element: 'div' });
			
		var element, chartOptions, chartSource;	
			
		window.google = {		
			
			visualization: {
				
				ColumnChart: function (el) {
										
					element = el;	
									
					return {	
											
						draw: function(source, options){
														
							chartSource = source;
														
							chartOptions = options;	
													
						}						
					};					
				}
			}			
		};	
		
		var returnChart = columnChart._draw({ element: 'div' }, {source: 'source'}, { options: 'options' });
		
		expect(returnChart).toBeDefined();
		expect(element).toEqual({element: 'div'});
		expect(chartSource).toEqual({source: 'source'});
		expect(chartOptions).toEqual({options: 'options'}); 
		
	});
	
		
});