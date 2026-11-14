---
title: "class: GenericAssertions (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-genericassertions.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: GenericAssertions (part 2 of 2)

## method: GenericAssertions.arrayContaining
* since: v1.9

`expect.arrayContaining()` matches an array that contains all of the elements in the expected array, in any order. Note that received array may be a superset of the expected array and contain some extra elements.

Use this method inside [`method: GenericAssertions.toEqual`] to perform pattern matching.

**Usage**

```js
expect([1, 2, 3]).toEqual(expect.arrayContaining([3, 1]));
expect([1, 2, 3]).not.toEqual(expect.arrayContaining([1, 4]));
```

### param: GenericAssertions.arrayContaining.expected
* since: v1.9
- `expected` <[Array]<[any]>>

Expected array that is a subset of the received value.

## method: GenericAssertions.arrayOf
* since: v1.57

`expect.arrayOf()` matches array of objects created from the [`param: constructor`] or a corresponding primitive type. Use it inside [`method: GenericAssertions.toEqual`] to perform pattern matching.

**Usage**

```js
// Match instance of a class.
class Example {}
expect([new Example(), new Example()]).toEqual(expect.arrayOf(Example));

// Match any string.
expect(['a', 'b', 'c']).toEqual(expect.arrayOf(String));
```

### param: GenericAssertions.arrayOf.constructor
* since: v1.57
- `constructor` <[Function]>

Constructor of the expected object like `ExampleClass`, or a primitive boxed type like `Number`.

## method: GenericAssertions.closeTo
* since: v1.9

Compares floating point numbers for approximate equality. Use this method inside [`method: GenericAssertions.toEqual`] to perform pattern matching. When just comparing two numbers, prefer [`method: GenericAssertions.toBeCloseTo`].

**Usage**

```js
expect({ prop: 0.1 + 0.2 }).not.toEqual({ prop: 0.3 });
expect({ prop: 0.1 + 0.2 }).toEqual({ prop: expect.closeTo(0.3, 5) });
```

### param: GenericAssertions.closeTo.expected
* since: v1.9
- `expected` <[float]>

Expected value.

### param: GenericAssertions.closeTo.numDigits
* since: v1.9
- `numDigits` ?<[int]>

The number of decimal digits after the decimal point that must be equal.

## method: GenericAssertions.objectContaining
* since: v1.9

`expect.objectContaining()` matches an object that contains and matches all of the properties in the expected object. Note that received object may be a superset of the expected object and contain some extra properties.

Use this method inside [`method: GenericAssertions.toEqual`] to perform pattern matching. Object properties can be matchers to further relax the expectation. See examples.

**Usage**

```js
// Assert some of the properties.
expect({ foo: 1, bar: 2 }).toEqual(expect.objectContaining({ foo: 1 }));

// Matchers can be used on the properties as well.
expect({ foo: 1, bar: 2 }).toEqual(expect.objectContaining({ bar: expect.any(Number) }));

// Complex matching of sub-properties.
expect({
  list: [1, 2, 3],
  obj: { prop: 'Hello world!', another: 'some other value' },
  extra: 'extra',
}).toEqual(expect.objectContaining({
  list: expect.arrayContaining([2, 3]),
  obj: expect.objectContaining({ prop: expect.stringContaining('Hello') }),
}));
```

### param: GenericAssertions.objectContaining.expected
* since: v1.9
- `expected` <[Object]>

Expected object pattern that contains a subset of the properties.

## method: GenericAssertions.stringContaining
* since: v1.9

`expect.stringContaining()` matches a string that contains the expected substring. Use this method inside [`method: GenericAssertions.toEqual`] to perform pattern matching.

**Usage**

```js
expect('Hello world!').toEqual(expect.stringContaining('Hello'));
```

### param: GenericAssertions.stringContaining.expected
* since: v1.9
- `expected` <[string]>

Expected substring.

## method: GenericAssertions.stringMatching
* since: v1.9

`expect.stringMatching()` matches a received string that in turn matches the expected pattern. Use this method inside [`method: GenericAssertions.toEqual`] to perform pattern matching.

**Usage**

```js
expect('123ms').toEqual(expect.stringMatching(/\d+m?s/));

// Inside another matcher.
expect({
  status: 'passed',
  time: '123ms',
}).toEqual({
  status: expect.stringMatching(/passed|failed/),
  time: expect.stringMatching(/\d+m?s/),
});
```

### param: GenericAssertions.stringMatching.expected
* since: v1.9
- `expected` <[string]|[RegExp]>

Pattern that expected string should match.
