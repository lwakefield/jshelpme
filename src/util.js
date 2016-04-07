class ObjectTraverse {

    constructor(obj) {
        this.vals = {};
        Object.keys(obj).forEach(key => {
            let val = obj[key];
            this.vals[key] = typeof val === 'object' ? new ObjectTraverse(val) : val;
        });
    }

    dotify() {
        let dotified = {};
        Object.keys(this.vals).forEach(key => {
            let val = this.vals[key];
            if (val instanceof ObjectTraverse) {
                let child = val.dotify();
                Object.keys(child).forEach(key1 => {
                    let val1 = child[key1]
                    dotified[key + '.' + key1] = val1;
                });
            } else {
                dotified[key] = val;
            }
        });
        return dotified;
    }
}

export default class Util {

    /**
     *  A helper function to test whether obj1 does in fact, equal obj2.
     *  This is just a mask for JSON.stringify(obj1) === JSON.stringify(obj2);
     *  @param {Object} obj1
     *  @param {Object} obj2
     *  @return {Boolean}
     */
    static objectsEqual(obj1, obj2) {
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
    static objectDotify(obj) {
        let objTraverser = new ObjectTraverse(obj);
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
    static objectSet(obj, key, val) {
        let path = key.split('.');

        let currObj = obj ? obj : {};
        while (path.length) {
            let firstKey = path.shift();
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
    static objectGet(obj, key, defaultVal=undefined) {
        if (!obj) return defaultVal;
        let path = key.split('.');

        let currObj = obj;
        while (path.length) {
            let firstKey = path.shift();
            if (path.length === 0) {
                return currObj[firstKey] ? currObj[firstKey] : defaultVal;
            } else if(!currObj[firstKey]) {
                return defaultVal;
            }
            currObj = currObj[firstKey];
        }
    }
}

let objectDotify = Util.objectDotify;
let objectsEqual = Util.objectsEqual;
let objectSet = Util.objectSet;
let objectGet = Util.objectGet;
export { 
    objectDotify,
    objectsEqual,
    objectSet,
    objectGet
};

