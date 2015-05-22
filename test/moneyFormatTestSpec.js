/// <reference path="../typings/jasmine/jasmine.d.ts"/>

'use strict';

describe('moneyFormat - ', function () {

	it('Must format the money values - BRL', function () {
		
		var value = '1000.00';
		
		var returnValue = window.chart.moneyFormat(value, 'BRL'); 
		
		expect(returnValue).toEqual('R$ 1.000,00');
		
	});
	
	it('Must format the money values - USD', function () {
		
		var value = '1000.00';
		
		var returnValue = window.chart.moneyFormat(value, 'USD'); 
		
		expect(returnValue).toEqual('US$ 1,000.00');
		
	});
	
	it('Must format the money values - EUR', function () {
		
		var value = '1000.00';
		
		var returnValue = window.chart.moneyFormat(value, 'EUR'); 
		
		expect(returnValue).toEqual('€ 1.000,00');
		
	});
	
	it('Must format the money values - HKD', function () {
		
		var value = '1000.00';
		
		var returnValue = window.chart.moneyFormat(value, 'HKD'); 
		
		expect(returnValue).toEqual('HK$ 1,000.00');
		
	});
	
	it('Must format the money values - Without parameter', function () {
		
		var value = '1000.00';
		
		var returnValue = window.chart.moneyFormat(value); 
		
		expect(returnValue).toEqual('1,000.00');
		
	});

});