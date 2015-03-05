var should = require('should');

var dots = require('../');

describe('#fromNotation', function(){

    it('parses a flat object into nests', function(){
        var obj = {
            'this.is.a.test': 5
        };

        var unnoted = dots.fromNotation(obj);

        should(unnoted).be.ok;
        should(unnoted).be.an.Object;
        should(unnoted.this).be.ok;
        should(unnoted.this).be.an.Object;
        should(unnoted.this.is).be.ok;
        should(unnoted.this.is).be.an.Object;
        should(unnoted.this.is.a).be.ok;
        should(unnoted.this.is.a).be.an.Object;
        should(unnoted.this.is.a.test).be.ok;
        should(unnoted.this.is.a.test).be.a.Number;
        should(unnoted.this.is.a.test).eql(5);
    });

    it('parses multiple keys into nests', function(){
        var obj = {
            'first.one': 5,
            'second.one': 5
        };

        var unnoted = dots.fromNotation(obj);

        should(unnoted).be.ok;
        should(unnoted).be.an.Object;
        should(unnoted.first).be.ok;
        should(unnoted.first).be.an.Object;
        should(unnoted.first.one).be.ok;
        should(unnoted.first.one).be.an.Number;
        should(unnoted.first.one).eql(5);
        should(unnoted.second).be.ok;
        should(unnoted.second).be.an.Object;
        should(unnoted.second.one).be.ok;
        should(unnoted.second.one).be.a.Number;
        should(unnoted.second.one).eql(5);
    });

    it('merges together multiple keys', function(){
        var obj = {
            'test.one': 5,
            'test.two': 5
        };

        var unnoted = dots.fromNotation(obj);

        should(unnoted).be.ok;
        should(unnoted).be.an.Object;
        should(unnoted.test).be.ok;
        should(unnoted.test).be.an.Object;
        should(unnoted.test.one).be.ok;
        should(unnoted.test.one).be.an.Number;
        should(unnoted.test.one).eql(5);
        should(unnoted.test).be.ok;
        should(unnoted.test).be.an.Object;
        should(unnoted.test.two).be.ok;
        should(unnoted.test.two).be.a.Number;
        should(unnoted.test.two).eql(5);
    });

    it('merges together multiple keys', function(){
        var obj = {
            'test.one': 5,
            'test.two': 5
        };

        var unnoted = dots.fromNotation(obj);

        should(unnoted).be.ok;
        should(unnoted).be.an.Object;
        should(unnoted.test).be.ok;
        should(unnoted.test).be.an.Object;
        should(unnoted.test.one).be.ok;
        should(unnoted.test.one).be.an.Number;
        should(unnoted.test.one).eql(5);
        should(unnoted.test).be.ok;
        should(unnoted.test).be.an.Object;
        should(unnoted.test.two).be.ok;
        should(unnoted.test.two).be.a.Number;
        should(unnoted.test.two).eql(5);
    });

    it('merges together multiple objects', function(){
        var obj = {
            'test.one': 5
        };

        var unnoted = dots.fromNotation(obj, {
            test: {
                two: 5
            }
        });

        should(unnoted).be.ok;
        should(unnoted).be.an.Object;
        should(unnoted.test).be.ok;
        should(unnoted.test).be.an.Object;
        should(unnoted.test.one).be.ok;
        should(unnoted.test.one).be.an.Number;
        should(unnoted.test.one).eql(5);
        should(unnoted.test).be.ok;
        should(unnoted.test).be.an.Object;
        should(unnoted.test.two).be.ok;
        should(unnoted.test.two).be.a.Number;
        should(unnoted.test.two).eql(5);
    });

});

describe('#toNotation', function() {

    it('converts an object into flat dot notation', function () {
        var obj = {
            test: {
                one: 5
            }
        };

        var noted = dots.toNotation(obj);

        should(noted).be.ok;
        should(noted).be.an.Object;
        should(noted['test.one']).be.ok;
        should(noted['test.one']).be.a.Number;
        should(noted['test.one']).eql(5);
    });

    it('handles array values', function () {
        var obj = {
            test: {
                one: 5,
                two: [ 1, 2, 3 ]
            }
        };

        var noted = dots.toNotation(obj);

        should(noted).be.ok;
        should(noted).be.an.Object;
        should(noted['test.one']).be.ok;
        should(noted['test.one']).be.a.Number;
        should(noted['test.one']).eql(5);
        should(noted['test.two[0]']).be.ok;
        should(noted['test.two[0]']).be.a.Number;
        should(noted['test.two[0]']).eql(1);
        should(noted['test.two[1]']).be.ok;
        should(noted['test.two[1]']).be.a.Number;
        should(noted['test.two[1]']).eql(2);
        should(noted['test.two[2]']).be.ok;
        should(noted['test.two[2]']).be.a.Number;
        should(noted['test.two[2]']).eql(3);
    });

    it('handles complex object values', function () {
        var obj = {
            test: {
                one: 5,
                two: [ 1, 2, { three: 3 } ]
            }
        };

        var noted = dots.toNotation(obj);

        should(noted).be.ok;
        should(noted).be.an.Object;
        should(noted['test.one']).be.ok;
        should(noted['test.one']).be.a.Number;
        should(noted['test.one']).eql(5);
        should(noted['test.two[0]']).be.ok;
        should(noted['test.two[0]']).be.a.Number;
        should(noted['test.two[0]']).eql(1);
        should(noted['test.two[1]']).be.ok;
        should(noted['test.two[1]']).be.a.Number;
        should(noted['test.two[1]']).eql(2);
        should(noted['test.two[2].three']).be.ok;
        should(noted['test.two[2].three']).be.a.Number;
        should(noted['test.two[2].three']).eql(3);
    });

    it('handles special field names', function () {
        var obj = {
            'testing': {
                'test.one': [ { 'test.two': 2 }]
            }
        };

        var noted = dots.toNotation(obj);

        should(noted).be.ok;
        should(noted).be.an.Object;
        should(noted['testing[\'test.one\'][0][\'test.two\']']).be.ok;
        should(noted['testing[\'test.one\'][0][\'test.two\']']).be.a.Number;
        should(noted['testing[\'test.one\'][0][\'test.two\']']).eql(2);
    });

});

describe('#parseObject', function(){

    it('parses a string into an object', function(){
        var parsed = dots.parseObject('this.is.a.test', 5);
        
        should(parsed).be.ok;
        should(parsed).be.an.Object;
        should(parsed.this).be.ok;
        should(parsed.this).be.an.Object;
        should(parsed.this.is).be.ok;
        should(parsed.this.is).be.an.Object;
        should(parsed.this.is.a).be.ok;
        should(parsed.this.is.a).be.an.Object;
        should(parsed.this.is.a.test).be.ok;
        should(parsed.this.is.a.test).be.ok;
        should(parsed.this.is.a.test).be.a.Number;
        should(parsed.this.is.a.test).eql(5);
    });

    it('handles undefined values', function(){
        var parsed = dots.parseObject('this.is.a.test');

        should(parsed).be.ok;
        should(parsed).be.an.Object;
        should(parsed.this).be.ok;
        should(parsed.this).be.an.Object;
        should(parsed.this.is).be.ok;
        should(parsed.this.is).be.an.Object;
        should(parsed.this.is.a).be.ok;
        should(parsed.this.is.a).be.an.Object;
        should(parsed.this.is.a.test).not.be.ok;
    });

    it('merges a string into an object', function(){
        var parsed = dots.parseObject('this.is.a.test', 5, {
            this: {
                is: {
                    a: {
                        party: 5
                    }
                }
            }
        });

        should(parsed).be.ok;
        should(parsed).be.an.Object;
        should(parsed.this).be.ok;
        should(parsed.this).be.an.Object;
        should(parsed.this.is).be.ok;
        should(parsed.this.is).be.an.Object;
        should(parsed.this.is.a).be.ok;
        should(parsed.this.is.a).be.an.Object;
        should(parsed.this.is.a.test).be.ok;
        should(parsed.this.is.a.test).be.a.Number;
        should(parsed.this.is.a.test).eql(5);
        should(parsed.this.is.a.party).be.ok;
        should(parsed.this.is.a.party).be.a.Number;
        should(parsed.this.is.a.party).eql(5);
    });

});