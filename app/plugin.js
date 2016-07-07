(function ($) {
	'use strict';
	
    window.google.charts.load('visualization', '1', { packages: ['corechart', 'geochart', 'gauge'] });
	
	$.fn.chart = function (typeChart, settings) {
		return window.chart.factory.chartFactory().createNew(typeChart, settings, this[0]);
	};
	
})(window.jQuery);