var chart = chart || {};
(function (c) {
	
	c.enumChart = Object.freeze({
		column: 1,
		geo: 2
	});
	
})(window.chart);
/// <reference path="../../typings/jquery/jquery.d.ts"/>
(function (c) {
    
	c.charts = c.charts || {};
	
	c.charts.ChartBase = function (pOptions, el) {
		
        var self = this,
            options = pOptions;
        
		var settings = {
            source: '',
            data: null,
            responsive: false,
            options: {
                height: 100,
                width: 100
            },
            select: function (pchart) { },
            mouseOver: function (pchart) { }
        };
        
        $.extend(true, settings, options);
        
        init();
        
        function init() {
            		
            validate();
            window.google.setOnLoadCallback(drawChart);
            
        }
        
        function drawChart() {
            
            var dataTable = getDataTable(settings.data);
            
            var data = window.google.visualization.arrayToDataTable(dataTable);
            
            if(settings.responsive) settings.options.width = data.getNumberOfColumns() * 65;
            
            var chart = self.draw(el, data, settings.options);
            
            window.google.visualization.events.addListener(chart, 'select', settings.select);
            
        }
        
        function getDataTable(data) {
            
            var dataTable = [];
            var columns = getColumns(data);
            var rows = getRows(columns, data);
            
            dataTable.push(columns);

            var countRows = rows.length;

            for (var i = 0; i < countRows; i++) {
                dataTable.push(rows[i]);
            }
            
            return dataTable;
            
        }
        
        function getColumns(data) {
            
            var count = data.length;
            var columns = ['Grupo'];

            var groups = [],
                found;

            for (var i = 0; i < count; i++) {

                found = groups.filter(function (item) {
                    return item === data[i]["Descricao"];
                });

                if (found.length === 0) {
                    groups.push(settings.data[i]["Descricao"]);
                }
            }

            columns.push.apply(columns, groups);

            return columns;
            
        }
        
        function getRows(columns, data) {
            
            var count = data.length;

            var rows = [], found;

            var groups = [];

            for (var i = 0; i < count; i++) {

                found = groups.filter(function (item) {
                    return item === settings.data[i]["Grupo"];
                });

                if (found.length === 0) {
                    groups.push(settings.data[i]["Grupo"]);
                }
            }

            count = groups.length;

            for (var y = 0; y < count; y++) {

                var row = [];

                row.push(groups[y]);

                var countColumns = columns.length;

                for (var j = 1; j < countColumns; j++) {

                    row.push(getValues(groups[y], columns[j], data));

                }

                rows.push(row);
            }
            
            return rows;
            
        }
        
        function getValues(row, column, data) {
            
            var found = data.filter(function (item) {

                return item["Grupo"] === row && item["Descricao"] === column;

            });

            if (found.length === 0) return { v: 0, f: '0' };

            var value = found.reduce(function (ant, current) {

                return { Valor: ant["Valor"] + current["Valor"] };

            }).Valor;


            return { v: value, f: (value).toFixed(2) };
            
        }
        
        function validate() {
            
            if(!settings.source && !settings.data) throw new Error("Data source not found.");
            
        }
        
	};
	
})(window.chart);

/// <reference path="../../typings/jquery/jquery.d.ts"/>

(function(c){
	'use strict';
	
	c.charts = c.charts || {};
		
	c.charts.Column = function(options, element){
			
		var self = this;
		
		self.draw = function (pElement, datatable, pOptions){
			
			$.extend(true, settings, pOptions);
			
			var chart = new window.google.visualization.ColumnChart(pElement);
            chart.draw(datatable, pOptions);
			
			return chart;
			
		};
		
		c.charts.ChartBase.call(self, options, element);
		
		var settings = {
			legend: { position: 'none' },
            height: 100,
            width: 100,
            backgroundColor: 'transparent',
			bar: {groupWidth: "95%"},
            tooltip: {
                textStyle: {
                    fontSize: 10
                }
            }
		};
		
	};
	
	c.charts.Column.prototype = Object.create(c.charts.ChartBase.prototype);
	
})(window.chart);
/// <reference path="../../typings/jquery/jquery.d.ts"/>

(function(c){
	'use strict';
	
	c.charts = c.charts || {};
		
	c.charts.Geo = function(options, element){
			
		var self = this;
				
		self.draw = function (pElement, datatable, pOptions){
			
			$.extend(true, settings, pOptions);
			
			var chart = new google.visualization.GeoChart(pElement);
            chart.draw(datatable, pOptions);
			
			return chart;
			
		};
		
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
		
	};
	
	c.charts.Geo.prototype = Object.create(c.charts.ChartBase.prototype);
	
})(window.chart);
(function(c) {
	
	c.factory = c.factory || {};
	
	c.factory.chartFactory = function () {
		
		var Charts = {};
		Charts[c.enumChart.geo] = c.charts.Geo;
		Charts[c.enumChart.column] = c.charts.Column;
	
		return {
			createNew: createNew
		};
				
		function createNew(typeChart, options, el) {
			return new Charts[typeChart](options, el);
		};
	
	};
	
})(window.chart);
(function ($) {
	'use strict';
	
    window.google.load('visualization', '1', { packages: ['corechart', 'geochart'] });
	
	$.fn.chart = function (typeChart, settings) {
		return window.chart.factory.chartFactory().createNew(typeChart, settings, this[0]);
	};
	
})(window.jQuery);