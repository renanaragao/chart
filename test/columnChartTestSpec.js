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
		
		var expectedOptions = {
			legend: { position: 'none' },
            height: 100,
            width: 250,
            backgroundColor: 'transparent',
			bar: {groupWidth: "95%"}
			
		};
		
		var columnChart = new chart.charts.Column({ data:[], options: {width: 250} }, { element: 'div' });
			
		var returnChart = columnChart.draw({ element: 'div' }, {source: 'source'}, {width: 250});
		
		expect(returnChart).toBeDefined();
		expect(element).toEqual({element: 'div'});
		expect(chartSource).toEqual({source: 'source'});
		expect(chartOptions).toEqual(expectedOptions); 
		expect(chart.charts.Column.prototype instanceof chart.charts.ChartBase).toEqual(true);
		
	});
	
		
});