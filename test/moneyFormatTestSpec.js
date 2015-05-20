/// <reference path="../typings/jasmine/jasmine.d.ts"/>

'use strict';

describe('moneyFormat - ', function () {

	it('Must format the money values', function () {
		
		var value = '1000.00';
		
		var returnValue = window.chart.moneyFormat(value, 'BRL'); 
		
		expect(returnValue).toEqual('R$ 1.000,00');
		
	});
	
	

});