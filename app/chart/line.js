/// <reference path="../../typings/jquery/jquery.d.ts"/>

(function(c){
	'use strict';
	
	c.charts = c.charts || {};
		
	c.charts.Line = function(options, element){
			
		var self = this;
		
		var settings = {
			legend: { position: 'none' },
            backgroundColor: 'transparent'			
		};
		
		self._draw = function (pElement, datatable, pOptions){
			
			$.extend(true, settings, pOptions);
			
			var chart = new window.google.visualization.LineChart(pElement);
            chart.draw(datatable, settings);
			
			return chart;
			
		};
		
		c.charts.ChartBase.call(self, options, element);
	
		
	};
	
	c.charts.Line.prototype = Object.create(c.charts.ChartBase.prototype);
	
})(window.chart);