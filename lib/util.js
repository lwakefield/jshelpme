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


        /**
         *  A helper function to test whether obj1 does in fact, equal obj2.
         *  This is just a mask for JSON.stringify(obj1) === JSON.stringify(obj2);
         *  @param {Object} obj1
         *  @param {Object} obj2
         *  @return {Boolean}
         */
        value: function objectsEqual(obj1, obj2) {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        }

        /**
         * Flatten a deeply nested object into a single level object using dot 
         * notation to indicate depth.
         *
         * let a = {one: {two: {three: ['a', 'b', 'c']}}}
         * objectDotify(a) == {'one.two.three.0': 'a', 'one.two.three.1': 'b', 'one.two.three.2': 'c' }
         * @param {Object} obj object to dotify
         * @return {Object} dotified object
         */

    }, {
        key: 'objectDotify',
        value: function objectDotify(obj) {
            var objTraverser = new ObjectTraverse(obj);
            return objTraverser.dotify();
        }

        /**
         * Set a property in a deeply nested object using dot notation.
         * Handles the fact that parent properties might not exist.
         *
         * let a = {}
         * objectSet(a, 'one.two.three', 'hello world')
         * a === {one: {two: {three: 'hello world'}}}
         *
         * @param {Object} obj object to set val on. obj is mutable.
         * @param {String} key key in dot notation
         * @param {Object} val val used when setting the dot notation property
         * @return undefined
         */

    }, {
        key: 'objectSet',
        value: function objectSet(obj, key, val) {
            if (!key.trim()) {
                throw new Error('Trying to set an empty property on an object. Use obj = newVal instead.');
            }

            var path = key.split('.');

            var currObj = obj ? obj : {};
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

        /**
         * Gets a property in a deeply nested object using dot notation.
         * If the value is not set it will return the undefined, or the optional
         * defaultVal param.
         *
         * let a = {one: {two: {three: ['a', 'b', 'c']}}}
         * objectGet(a, 'one.two.three.1') == 'b'
         * objectGet(a, 'one.two.three.3') == undefined
         * objectGet(a, 'one.two.three.3', 'd') == 'd'
         *
         * @param {Object} obj object to get val from
         * @param {String} key key in dot notation
         * @param {Object} [defaultVal=undefined] value to default to if the
         * property does not exist
         * @return {Object} the deeply nested property
         */

    }, {
        key: 'objectGet',
        value: function objectGet(obj, key) {
            var defaultVal = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            if (!obj) return defaultVal;
            if (!key.trim()) return obj;
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

        /**
         * Given some keys, this function returns a copy of the original object with
         * only those keys set. 
         * This function handles dot notation.
         * If a key doesn't exist, it will be set as undefined in the resulting 
         * object
         *
         * let a = {one: 'a', two: 'b', three: 'c'}
         * objectOnly(a, ['one', 'three']) == {one: 'a', three:'c'}
         *
         * @param {Object} obj object to get val from
         * @param {Array} keys keys in dot notation
         * @return {Object} the resulting object
         */

    }, {
        key: 'objectOnly',
        value: function objectOnly(obj, keys) {
            var newObj = {};

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    var val = this.objectGet(obj, key);
                    this.objectSet(newObj, key, val);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return newObj;
        }
    }]);

    return Util;
}();

exports.default = Util;


var objectDotify = Util.objectDotify;
var objectsEqual = Util.objectsEqual;
var objectSet = Util.objectSet;
var objectGet = Util.objectGet;
var objectOnly = Util.objectOnly;
exports.objectDotify = objectDotify;
exports.objectsEqual = objectsEqual;
exports.objectSet = objectSet;
exports.objectGet = objectGet;
exports.objectOnly = objectOnly;