(function (c) {
    "use strict";

    c.charts = c.charts || {};
    
    c.charts.Area = area;
    
    c.charts.Area.prototype = Object.create(c.charts.ChartBase.prototype);
    
    function area (options, element) {

        var self = this;

        var settings = {
            legend: { position: "none" },
            backgroundColor: "transparent"
        };

        self._drawTemplateMethod = function (pElement, datatable, pOptions) {

            $.extend(true, settings, pOptions);
            
            var chart = new window.google.visualization.AreaChart(pElement);
            
            chart.draw(datatable, settings);

            return chart;

        };

        c.charts.ChartBase.call(self, options, element);

    };

})(window.chart);