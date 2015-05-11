/// <reference path="../../typings/jquery/jquery.d.ts"/>

(function(c){
	'use strict';
	
	c.charts = c.charts || {};
		
	c.charts.Geo = function(options, element){
			
		var self = this;
		
		c.charts.ChartBase.call(self, options, element);
		
		var settings = {
            source: '',
            data: null,
            options: {
                legend: { position: 'none' },
                height: 100,
                width: 100,
                backgroundColor: 'transparent',
				bar: {groupWidth: "95%"},
                tooltip: {
                    textStyle: {
                        fontSize: 10
                    }
                },
				region: 'BR', //Brazil
				displayMode: 'markers',
  				colorAxis: {colors: ['#0000FF','#0000CD','#00008B']}
            },
            selected: function (pchart) { },
            mouseOver: function (pchart) { }
        };
		
		self._draw = draw;
		
		function draw(pElement, datatable, pOptions){
			
			$.extend(true, settings, pOptions);
			
			var chart = new google.visualization.ColumnChart(pElement);
            chart.draw(datatable, pOptions);
			
			return chart;
			
		};
		
	};
	
	c.charts.Column.prototype = Object.create(c.charts.ChartBase.prototype);
	
})(window.chart);