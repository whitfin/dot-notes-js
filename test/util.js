var util = require('../lib/util');

var should = require('should');

describe('#toKeys', function(){

    it('is able to parse variable keys', function(){

        var str = 'this.is.a.test[0][\'test\']["test"].test[15].test';

        var keys = util.toKeys(str);

        should(keys).be.ok;
        should(keys).be.an.Array;
        should(keys).have.length(10);
        should(keys.join(',')).eql('this,is,a,test,[0],test,test,test,[15],test');
    });

    it('throws ParseExceptions on empty braces', function(){

        var str = 'this.is[]';

        try {
            util.toKeys(str);
            throw new Error('Should have failed!');
        } catch(e) {
            should(e.name).eql('ParseException');
            should(e.message).eql('Unable to parse character \']\' at column 9! ' +
                                  'Did you remember to wrap brace keys in quotes?');
        }

    });

    it('throws ParseExceptions on mismatching quotes', function(){

        var str = 'this.is[\'t]';

        try {
            util.toKeys(str);
            throw new Error('Should have failed!');
        } catch(e) {
            should(e.name).eql('ParseException');
            should(e.message).eql('Unable to find matching quote at index 8!');
        }

    });

    it('throws ParseExceptions on double dots', function(){

        var str = 'this..is';

        try {
            util.toKeys(str);
            throw new Error('Should have failed!');
        } catch(e) {
            should(e.name).eql('ParseException');
            should(e.message).eql('Unable to parse character \'.\' at column 6!');
        }

    });

});