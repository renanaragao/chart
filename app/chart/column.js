/// <reference path="../../typings/jquery/jquery.d.ts"/>

(function(c){
	'use strict';
	
	c.charts = c.charts || {};
		
	c.charts.Column = function(options, element){
			
		var self = this;
		
		var settings = {
			legend: { position: 'none' },
            height: 100,
            width: 100,
            backgroundColor: 'transparent',
			bar: {groupWidth: "95%"}
			
		};
		
		self._draw = function (pElement, datatable, pOptions){
			
			$.extend(true, settings, pOptions);
			
			var chart = new window.google.visualization.ColumnChart(pElement);
            chart.draw(datatable, settings);
			
			return chart;
			
		};
		
		c.charts.ChartBase.call(self, options, element);
	
		
	};
	
	c.charts.Column.prototype = Object.create(c.charts.ChartBase.prototype);
	
})(window.chart);