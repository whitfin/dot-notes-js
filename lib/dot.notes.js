var util = require('./util');

module.exports = {

    create: function create(str, val, obj){
        var unNotatedObj = obj || {};
        var keys = util.keys(str);
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
    },

    flatten: function flatten(obj){
        var notatedObj = { };

        util.recurse(obj, function(value, key, path){
            notatedObj[path] = value;
        });

        return notatedObj;
    },

    get: function get(str, obj){
        var keys = util.keys(str);
        var tmp = obj;

        for(var k = 0; k < keys.length - 1; k++){
            tmp = tmp[keys[k]];
            if(!tmp){
                return;
            }
        }

        return tmp[keys[keys.length - 1]];
    },

    inflate: function inflate(notatedObj, obj){
        var unNotatedObj = obj || { };

        Object.keys(notatedObj).forEach(function(k){
            this.create(k, notatedObj[k], unNotatedObj);
        }.bind(this));

        return unNotatedObj;
    },

    keys: util.keys

};