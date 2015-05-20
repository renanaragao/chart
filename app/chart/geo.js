/// <reference path="../../typings/jquery/jquery.d.ts"/>

(function(c){
	'use strict';
	
	c.charts = c.charts || {};
		
	c.charts.Geo = function(options, element){
			
		var self = this;
		
		var settings = {
               	region: 'BR', //Brazil
				displayMode: 'provinces'
            };
		
		self._draw = function (pElement, datatable, pOptions){
			
			$.extend(true, settings, pOptions);
			
			var chart = new google.visualization.GeoChart(pElement);
            chart.draw(datatable, settings);
			
			return chart;
			
		};
		
		c.charts.ChartBase.call(self, options, element);
		
		
		
	};
	
	c.charts.Geo.prototype = Object.create(c.charts.ChartBase.prototype);
	
})(window.chart);