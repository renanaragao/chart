var chart = chart || {};
(function (c) {
	
	c.enumChart = Object.freeze({
		column: 1,
		geo: 2,
		line: 3
	});
	
})(window.chart);
/// <reference path="../../typings/jquery/jquery.d.ts"/>
(function (c) {
    
	c.charts = c.charts || {};
	
	c.charts.ChartBase = function (pOptions, el) {
        
        var self = this,
            options = pOptions,
            chart,
            dataTableChart;
               
        
		var settings = {
            source: '',
            data: null,
            responsive: false,
            options: {
            },
            select: function (pchart) { },
            mouseOver: function (pchart) { },
            moneyFormat: null
        };
        
        $.extend(true, settings, options);
        
        self.drawChart = drawChart;
        
        init();
                
        function init() {
            		
            validate();
            window.google.setOnLoadCallback(drawChart);
            
        }                
        
        function drawChart(data, options) {
            
            if(data && data.length > 0) settings.data = data;
            
            if(options) $.extend(true, settings.options, options);
            
            var dataTable = getDataTable(settings.data);
            
            dataTableChart = window.google.visualization.arrayToDataTable(dataTable);
            
            if(settings.responsive){
                
                var resul = dataTableChart.getNumberOfColumns() * 65;
                
                if(resul > settings.options.width) settings.options.width = resul;
                
            }
            
            chart = self._draw(el, dataTableChart, settings.options);
            
            window.google.visualization.events.addListener(chart, 'select', select);
            
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

            if (found.length === 0) return { v: 0, f: window.chart.moneyFormat('0', settings.moneyFormat) };

            var value = found.reduce(function (ant, current) {

                return { Valor: ant["Valor"] + current["Valor"] };

            }).Valor;


            return { v: value, f: window.chart.moneyFormat((value).toFixed(2), settings.moneyFormat) };
            
        }
        
        function validate() {
            
            if(!settings.source && !settings.data) throw new Error("Data source not found.");
            
        }
        
        function select() {
            
            var dataChart = {};
            
             dataChart.text =  dataTableChart.getValue(chart.getSelection()[0].row, 0);

            chart.setSelection();

            settings.select(dataChart);
            
        }

	};
	
})(window.chart);

/// <reference path="../../typings/jquery/jquery.d.ts"/>

(function(c){
	'use strict';
	
	c.charts = c.charts || {};
		
	c.charts.Column = function(options, element){
			
		var self = this;
		
		var settings = {
			legend: { position: 'none' },
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
(function(c) {
	
	c.factory = c.factory || {};
	
	c.factory.chartFactory = function () {
		
		var Charts = {};
		Charts[c.enumChart.geo] = c.charts.Geo;
		Charts[c.enumChart.column] = c.charts.Column;
		Charts[c.enumChart.line] = c.charts.Line;
	
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
(function (c) {
    
    c.charts = c.charts || {};
	
	c.moneyFormat = moneyFormat;
        
     function moneyFormat(value, format) {
                  
         var formats = [
            {
                description: 'BRL',
                symbol: 'R$ ',
                centsSeparator: ',',
                thousandsSeparator: '.'
            }];

            var standard = {
                description: 'USD',
                symbol: '',
                centsSeparator: '.',
                thousandsSeparator: ''
            };
                        
            if (format) standard = formats.filter(function (item) { return item.description === format; })[0];

            var formattedValue = replaceSeparators(value, standard);

            formattedValue = standard.symbol + formattedValue;

            return formattedValue.trim();
         
     };        
        
    function replaceSeparators(value, settings) {
        
        var regex, match, countGroupRegex;
    
        if (typeof value !== "string") return '';
    
        countGroupRegex = value.length / 3;
    
        if (countGroupRegex <= 2) {
            regex = /(\d{1,3})\.(\d{2})/g;
            match = '$1' + settings.centsSeparator + '$2';
        } else if (countGroupRegex <= 3) {
            regex = /(\d{1,3}?)(\d{1,3})\.(\d{2})/g;
            match = '$1' + settings.thousandsSeparator + '$2' + settings.centsSeparator + '$3';
        } else if (countGroupRegex <= 4) {
            regex = /(\d{1,3}?)(\d{1,3})(\d{1,3})\.(\d{2})/g;
            match = '$1' + settings.thousandsSeparator + '$2' + settings.thousandsSeparator + '$3' + settings.centsSeparator + '$4';
        } else if (countGroupRegex <= 5) {
            regex = /(\d{1,3}?)(\d{1,3})(\d{1,3})(\d{1,3})\.(\d{2})/g;
            match = '$1' + settings.thousandsSeparator + '$2' + settings.thousandsSeparator + '$3' + settings.thousandsSeparator + '$4' + settings.centsSeparator + '$5';
        } else {
            regex = '';
            match = '';
        }
    
        return value.replace(regex, match);
    };
            
})(window.chart);
    
        