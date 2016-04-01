'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectTraverse = function () {
    function ObjectTraverse(obj) {
        var _this = this;

        _classCallCheck(this, ObjectTraverse);

        this.vals = {};
        Object.keys(obj).forEach(function (key) {
            var val = obj[key];
            _this.vals[key] = (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? new ObjectTraverse(val) : val;
        });
    }

    _createClass(ObjectTraverse, [{
        key: 'dotify',
        value: function dotify() {
            var _this2 = this;

            var dotified = {};
            Object.keys(this.vals).forEach(function (key) {
                var val = _this2.vals[key];
                if (val instanceof ObjectTraverse) {
                    (function () {
                        var child = val.dotify();
                        Object.keys(child).forEach(function (key1) {
                            var val1 = child[key1];
                            dotified[key + '.' + key1] = val1;
                        });
                    })();
                } else {
                    dotified[key] = val;
                }
            });
            return dotified;
        }
    }]);

    return ObjectTraverse;
}();

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
        key: 'objectsEqual',
        value: function objectsEqual(obj1, obj2) {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        }
    }, {
        key: 'objectDotify',
        value: function objectDotify(obj) {
            var objTraverser = new ObjectTraverse(obj);
            return objTraverser.dotify();
        }
    }, {
        key: 'objectSet',
        value: function objectSet(obj, key, val) {
            var path = key.split('.');

            var currObj = obj;
            while (path.length) {
                var firstKey = path.shift();
                if (path.length === 0) {
                    currObj[firstKey] = val;
                } else if (!currObj[firstKey]) {
                    currObj[firstKey] = {};
                }
                currObj = currObj[firstKey];
            }
        }
    }, {
        key: 'objectGet',
        value: function objectGet(obj, key) {
            var defaultVal = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            var path = key.split('.');

            var currObj = obj;
            while (path.length) {
                var firstKey = path.shift();
                if (path.length === 0) {
                    return currObj[firstKey] ? currObj[firstKey] : defaultVal;
                } else if (!currObj[firstKey]) {
                    return defaultVal;
                }
                currObj = currObj[firstKey];
            }
        }
    }]);

    return Util;
}();

exports.default = Util;


var objectDotify = Util.objectDotify;
var objectsEqual = Util.objectsEqual;
var objectSet = Util.objectSet;
var objectGet = Util.objectGet;
exports.objectDotify = objectDotify;
exports.objectsEqual = objectsEqual;
exports.objectSet = objectSet;
exports.objectGet = objectGet;