(function ($) {
	'use strict';
	
    window.google.load('visualization', '1', { packages: ['corechart', 'geochart'] });
	
	$.fn.chart = function (typeChart, settings) {
		return window.chart.factory.chartFactory().createNew(typeChart, settings, this);
	};
	
})(window.jQuery);