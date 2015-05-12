/// <reference path="../typings/jasmine/jasmine.d.ts"/>

describe('Column Chart - ', function () {
	
	var element, chartOptions, chartSource;	
	
	beforeEach(function () {
		window.google = {		
			setOnLoadCallback: function (callback) {
				},
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
			},
			load: function (p1, p2, p3) { }			
		};	
	});
	
	
	it('Must create a Column Chart', function () {	
		
		var columnChart = new chart.charts.Column({ data:[], options: 'options' }, { element: 'div' });
			
		var returnChart = columnChart._draw({ element: 'div' }, {source: 'source'}, { options: 'options' });
		
		expect(returnChart).toBeDefined();
		expect(element).toEqual({element: 'div'});
		expect(chartSource).toEqual({source: 'source'});
		expect(chartOptions).toEqual({options: 'options'}); 
		
	});
	
		
});