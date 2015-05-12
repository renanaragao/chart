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
        
        self._draw = draw;
        
        init();
        
        function init() {
            		
            validate();
            window.google.setOnLoadCallback(drawChart);
            
        }
        
        function drawChart() {
            
            var dataTable = getDataTable(settings.data);
            
            var data = window.google.visualization.arrayToDataTable(dataTable);
            
            if(settings.responsive) settings.options.width = data.getNumberOfColumns() * 65;
            
            var chart = self._draw(el, data, settings.options);
            
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
                    return item === data[i]["Grupo"];
                });

                if (found.length === 0) {
                    groups.push(settings.data[i]["Grupo"]);
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
                    return item === settings.data[i]["Descricao"];
                });

                if (found.length === 0) {
                    groups.push(settings.data[i]["Descricao"]);
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

                return item["Descricao"] === row && item["Grupo"] === column;

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
        
        function draw() {
            
        }
        
	};
	
})(window.chart);
