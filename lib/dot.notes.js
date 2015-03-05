var util = require('./util');

module.exports = {

    fromNotation: function fromNotation(notatedObj, obj){
        var unNotatedObj = obj || { };

        var keySets = [];
        var valSets = [];

        Object.keys(notatedObj).forEach(function(k){
            keySets.push(k);
            valSets.push(notatedObj[k]);
        });

        for(var i = 0; i < keySets.length; i++){
            this.parseObject(keySets[i], valSets[i], unNotatedObj);
        }

        return unNotatedObj;
    },

    toNotation: function toNotation(obj){
        var notatedObj = { };

        util.recurse(obj, function(value, key, path){
            notatedObj[path] = value;
        });

        return notatedObj;
    },

    parseObject: function parseObject(str, val, obj){
        var unNotatedObj = obj || {};
        var keys = util.toKeys(str);
        var tmp = unNotatedObj;

        for(var k = 0; k < keys.length - 1; k++){
            var key = keys[k];
            var sKey = keys[k + 1].slice(1, -1);
            var lKey = key.slice(1, -1);
            var index = lKey && !isNaN(lKey) && k + 1 !== keys.length ? Number(lKey) : key;

            if(!tmp[index]){
                if(sKey){
                    tmp[index] = !isNaN(sKey) ? [] : {};
                } else {
                    tmp[index] = {};
                }
            }

            tmp = tmp[index];
        }

        var endKey = keys.pop();
        var innerVal = endKey.slice(1, -1);
        var o = innerVal && !isNaN(innerVal) ? Number(innerVal) : endKey;

        tmp[o] = val;

        return unNotatedObj;

    }

};