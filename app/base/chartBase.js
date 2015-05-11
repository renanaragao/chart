/// <reference path="../../typings/jquery/jquery.d.ts"/>
(function (c) {
    
	c.charts = c.charts || {};
	
	c.charts.ChartBase = function (pOptions, el) {
		
        var self = this,
            options = pOptions;
        
		var settings = {
            source: '',
            data: null,
            options: {
                height: 100,
                width: 100
            },
            selected: function (pchart) { },
            mouseOver: function (pchart) { }
        };
        
        $.extend(true, settings, options);
        
        init();
        
        function init() {
            
            validate();
            
            //google.setOnLoadCallback(drawChart());
            
        }
        
        function validate() {
            
            if(!settings.source && !settings.data) throw new Error("Data source not found.");
            
            if(!window.google) throw new Error("google chart not found.");
            
        }
        
	};
	
})(chart);