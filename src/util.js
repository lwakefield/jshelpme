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

    static objectsEqual(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    static objectDotify(obj) {
        let objTraverser = new ObjectTraverse(obj);
        return objTraverser.dotify();
    }

    static objectSet(obj, key, val) {
        let path = key.split('.');

        let currObj = obj;
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

    static objectGet(obj, key, defaultVal=undefined) {
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

