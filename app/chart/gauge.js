(function(c){
    
    "use strict";
    
	c.charts = c.charts || {};
		
	c.charts.Gauge = gauge;
    
    c.charts.Gauge.prototype = Object.create(c.charts.ChartBase.prototype);
    
    function gauge(options, element){
		
        var self = this;
        
        var settings = {
			legend: { position: 'none' },
            backgroundColor: 'transparent'			
		};
        
		self._drawTemplateMethod = function (pElement, datatable, pOptions){
			
			$.extend(true, settings, pOptions);
			
			var chart = new google.visualization.Gauge(pElement);
            chart.draw(datatable, settings);
			
			return chart;
			
		};
		
		c.charts.ChartBase.call(self, options, element);        
    }
    
    
})(window.chart);