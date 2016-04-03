# jshelpme

This package is largely inspired by [Laravel's helper methods](https://laravel.com/docs/5.2/helpers) `array_dot`, `array_get` and `array_set`.

## tl;dr

The tl;dr is as _get and set nested properties without worrying if parents exist_. Here are some quick examples.

```
> import { objectSet, objectGet } from 'jshelpme';
> 
> let a = {one: {two: {three: ['a', 'b', 'c']}}};
> objectGet(a, 'one.two.three')
['a', 'b', 'c']
> objectGet(a, 'one.two.three.1')
'b'
> objectGet(a, 'one.two.three.3')
undefined
> objectGet(a, 'one.two.three.3', 'd')
'd'
>
> let b = {};
> objectSet(b, 'my.nested.property', 'hello world');
> b
{ my: { nested: { property: 'hello world' } } }
>
> > objectDotify(a)
{ 'one.two.three.0': 'a',
  'one.two.three.1': 'b',
  'one.two.three.2': 'c' }
```

## More insight

For a bit more context, these are simple helper functions which help me ease the pain around worrying if a parent property is set. If I have a simple object, with a property I need.

```
let foo = someObject;
```

I can now do this.

```
let bar = objectGet(foo, 'my.deeply.nested.property', 'N/A');
```

Without worrying about the existence of `my`, `deeply`, `nested` or `property`. If any of those properties don't exist along the way, no exception will be thrown and the default value will be returned.

This works the same for setting properties. Any undefined properties will be set along the way, no exceptions are thrown.

```
objectSet(foo, 'my.deeply.nested.property', 'hello world');
// foo = {my: {deeply: {nested: {property: 'hello world'}}}}
```

## Docs

### objectGet
```
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
 objectGet(obj, key, defaultVal=undefined)
```

### objectSet
```
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
 objectSet(obj, key, val) 
```

### objectDotify
```
/**
 * Flatten a deeply nested object into a single level object using dot 
 * notation to indicate depth.
 *
 * let a = {one: {two: {three: ['a', 'b', 'c']}}}
 * objectDotify(a) == {'one.two.three.0': 'a', 'one.two.three.1': 'b', 'one.two.three.2': 'c' }
 * @param {Object} obj object to dotify
 * @return {Object} dotified object
 */
 objectDotify(obj)
```

### objectEquals
```
/**
 *  A helper function to test whether obj1 does in fact, equal obj2.
 *  This is just a mask for JSON.stringify(obj1) === JSON.stringify(obj2);
 *  @param {Object} obj1
 *  @param {Object} obj2
 *  @return {Boolean}
 */
 objectsEqual(obj1, obj2)
```
