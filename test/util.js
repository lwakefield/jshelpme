import Chai from 'chai';
import Util from '../src/util';

let should = Chai.should();
let expect = Chai.expect;

describe('#objectDotify', () => {
    it('dotifies basic object', () => {
        expect(Util.objectDotify({
                one: 'hello world'
            }))
            .to.deep.equal({
                one: 'hello world'
            });
    });
    it('dotifies nested object', () => {
        expect(Util.objectDotify({
                one: {
                    two: 'hello world'
                }
            }))
            .to.deep.equal({
                'one.two': 'hello world'
            });
    });
    it('dotifies nested array', () => {
        expect(Util.objectDotify({
                one: ['a', 'b', 'c']
            }))
            .to.deep.equal({
                'one.0': 'a',
                'one.1': 'b',
                'one.2': 'c'
            });
    });
});

describe('#objectSet', () => {
    it('sets val in object', () => {
        let obj = {};
        Util.objectSet(obj, 'one', 'hello world');
        expect(obj).to.deep.equal({
            one: 'hello world'
        });
    });
    it('sets nested val in object', () => {
        let obj = {};
        Util.objectSet(obj, 'one.two', 'hello world');
        expect(obj).to.deep.equal({
            one: {
                two: 'hello world'
            }
        });
    });
    it('sets val in object with existing properties', () => {
        let obj = {
            one: {
                two: 'hello world',
                three: 'hello other world'
            }
        };
        Util.objectSet(obj, 'one.three', 'hello my world');
        expect(obj).to.deep.equal({
            one: {
                two: 'hello world',
                three: 'hello my world'
            }
        });
    });
    it('sets indexed array val in object', () => {
        let obj = {
            one: {
                two: ['a', 'b', 'c']
            }
        };
        Util.objectSet(obj, 'one.two.3', 'd');
        expect(obj).to.deep.equal({
            one: {
                two: ['a', 'b', 'c', 'd']
            }
        });
    });
});

describe('#objectGet', () => {
    it('get indexed array val val in object', () => {
        let obj = {
            one: {
                two: ['a', 'b', 'c']
            }
        };
        expect(Util.objectGet(obj, 'one.two.1'))
            .to.deep.equal('b');
    });
    it('gets val in object', () => {
        let obj = {
            one: {
                two: 'hello world'
            }
        };
        expect(Util.objectGet(obj, 'one.two'))
            .to.deep.equal('hello world');
    });
    it('gets nonexistent val in object', () => {
        let obj = {
            one: {
                two: 'hello world'
            }
        };
        expect(Util.objectGet(obj, 'one.three', 'three'))
            .to.deep.equal('three');
    });
    it('gets empty key', () => {
        let obj = {
            one: {
                two: 'hello world'
            }
        };
        expect(Util.objectGet(obj, ''))
            .to.deep.equal(obj);
    });
});

describe('#objectOnly', () => {
    it('returns object with only some keys', () => {
        let obj = {
            one: 'a',
            two: {
                three: 'b',
                four: 'c'
            },
            five: 'd'
        };
        // one => basic test
        // two.four => nested test
        // six.seven.eight => nested undefined test
        let ans = Util.objectOnly(obj, ['one', 'two.four', 'six.seven.eight']);
        expect(ans).to.deep.equal({one: 'a', two: {four: 'c'}, six: {seven: {eight: undefined}}});
    });
});
