(function(c) {
	
	c.factory = c.factory || {};
	
	c.factory.chartFactory = function () {
		
		var Charts = {};
		Charts[c.enumChart.geo] = c.charts.Geo;
		Charts[c.enumChart.column] = c.charts.Column;
		Charts[c.enumChart.line] = c.charts.Line;
		Charts[c.enumChart.pie] = c.charts.Pie;
		Charts[c.enumChart.gauge] = c.charts.Gauge;
	
		return {
			createNew: createNew
		};
				
		function createNew(typeChart, options, el) {
			return new Charts[typeChart](options, el);
		};
	
	};
	
})(window.chart);