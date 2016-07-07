describe('Pie Chart - ', function () {
	
	var element, chartOptions, chartSource;	
	
	beforeEach(function () {
		
		window.google = {	
			charts:{
				setOnLoadCallback: function (callback) {
				}
			},	
			visualization: {
				
				PieChart: function (el) {
										
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
	
	
	it('Should create a Line Chart', function () {	
		
		var expectedOptions = {
            legend: { position: "none" },
            backgroundColor: "transparent"
        };
		
		var pieChart = new chart.charts.Pie({ data:[], options: {width: 250} }, { element: 'div' });
			
		var returnChart = pieChart._drawTemplateMethod({
            legend: { position: "none" },
            backgroundColor: "transparent"
        });
		
		expect(returnChart).toBeDefined();
		expect(chartOptions).toEqual(expectedOptions); 
		expect(chart.charts.Line.prototype instanceof chart.charts.ChartBase).toEqual(true);
		
	});
	
		
});