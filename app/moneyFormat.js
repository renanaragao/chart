(function (c) {
    
    c.charts = c.charts || {};
	
	c.moneyFormat = moneyFormat;
        
     function moneyFormat(value, format) {
        
        var formats = {
            'BRL': {
                description: 'BRL',
                symbol: 'R$ ',
                centsSeparator: ',',
                thousandsSeparator: '.'
            },
            'USD': {
                description: 'USD',
                symbol: 'US$ ',
                centsSeparator: '.',
                thousandsSeparator: ','
            },
            'EUR': {
                description: 'EUR',
                symbol: '€ ',
                centsSeparator: ',',
                thousandsSeparator: '.'
            },
            'HKD': {
                description: 'HKD',
                symbol: 'HK$ ',
                centsSeparator: '.',
                thousandsSeparator: ','
            }
        };
    
        var settings = formats[format] || {
            description: 'USD',
            symbol: '',
            centsSeparator: '.',
            thousandsSeparator: ','
        };
    
        var formattedValue = replaceSeparators(value, settings);
    
        formattedValue = settings.symbol + formattedValue;
    
        return formattedValue.trim();
                         
     };        
        
    function replaceSeparators(value, settings) {
        
        var regex, match, countGroupRegex;
    
        var length = value.length;
       
        if (value < 0) length -= 1;
        
        countGroupRegex = length / 3;
                 
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
    
        