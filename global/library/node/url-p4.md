---
title: "URL (part 4 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/url.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# URL (part 4 of 6)

Parses a string as a URL. If `base` is provided, it will be used as the base
URL for the purpose of resolving non-absolute `input` URLs. Returns `null`
if the parameters can't be resolved to a valid URL.

### Class: `URLPattern`

> Stability: 1 - Experimental

The `URLPattern` API provides an interface to match URLs or parts of URLs
against a pattern.

```js
const myPattern = new URLPattern('https://nodejs.org/docs/latest/api/*.html');
console.log(myPattern.exec('https://nodejs.org/docs/latest/api/dns.html'));
// Prints:
// {
//  "hash": { "groups": {  "0": "" },  "input": "" },
//  "hostname": { "groups": {}, "input": "nodejs.org" },
//  "inputs": [
//    "https://nodejs.org/docs/latest/api/dns.html"
//  ],
//  "password": { "groups": { "0": "" }, "input": "" },
//  "pathname": { "groups": { "0": "dns" }, "input": "/docs/latest/api/dns.html" },
//  "port": { "groups": {}, "input": "" },
//  "protocol": { "groups": {}, "input": "https" },
//  "search": { "groups": { "0": "" }, "input": "" },
//  "username": { "groups": { "0": "" }, "input": "" }
// }

console.log(myPattern.test('https://nodejs.org/docs/latest/api/dns.html'));
// Prints: true
```

#### `new URLPattern()`

Instantiate a new empty `URLPattern` object.

#### `new URLPattern(string, baseURL)`

* `string` {string} A URL string
* `baseURL` {string | undefined} A base URL string
* `options` {Object} Options

Parse the `string` as a URL, and use it to instantiate a new
`URLPattern` object.

If `baseURL` is not specified, it defaults to `undefined`.

An option can have `ignoreCase` boolean attribute which enables
case-insensitive matching if set to true.

The constructor can throw a `TypeError` to indicate parsing failure.

#### `new URLPattern(obj, baseURL)`

* `obj` {Object} An input pattern
* `baseURL` {string | undefined} A base URL string
* `options` {Object} Options

Parse the `Object` as an input pattern, and use it to instantiate a new
`URLPattern` object. The object members can be any of `protocol`, `username`,
`password`, `hostname`, `port`, `pathname`, `search`, `hash` or `baseURL`.

If `baseURL` is not specified, it defaults to `undefined`.

An option can have `ignoreCase` boolean attribute which enables
case-insensitive matching if set to true.

The constructor can throw a `TypeError` to indicate parsing failure.

#### `urlPattern.exec(input[, baseURL])`

* `input` {string | Object} A URL or URL parts
* `baseURL` {string | undefined} A base URL string

Input can be a string or an object providing the individual URL parts. The
object members can be any of `protocol`, `username`, `password`, `hostname`,
`port`, `pathname`, `search`, `hash` or `baseURL`.

If `baseURL` is not specified, it will default to `undefined`.

Returns an object with an `inputs` key <example-value> the array of arguments
passed into the function and keys of the URL components which contains the
matched input and matched groups.

```js
const myPattern = new URLPattern('https://nodejs.org/docs/latest/api/*.html');
console.log(myPattern.exec('https://nodejs.org/docs/latest/api/dns.html'));
// Prints:
// {
//  "hash": { "groups": {  "0": "" },  "input": "" },
//  "hostname": { "groups": {}, "input": "nodejs.org" },
//  "inputs": [
//    "https://nodejs.org/docs/latest/api/dns.html"
//  ],
//  "password": { "groups": { "0": "" }, "input": "" },
//  "pathname": { "groups": { "0": "dns" }, "input": "/docs/latest/api/dns.html" },
//  "port": { "groups": {}, "input": "" },
//  "protocol": { "groups": {}, "input": "https" },
//  "search": { "groups": { "0": "" }, "input": "" },
//  "username": { "groups": { "0": "" }, "input": "" }
// }
```

#### `urlPattern.test(input[, baseURL])`

* `input` {string | Object} A URL or URL parts
* `baseURL` {string | undefined} A base URL string
* Returns {boolean}

Input can be a string or an object providing the individual URL parts. The
object members can be any of `protocol`, `username`, `password`, `hostname`,
`port`, `pathname`, `search`, `hash` or `baseURL`.

If `baseURL` is not specified, it will default to `undefined`.

Returns a boolean indicating if the input matches the current pattern.

```js
const myPattern = new URLPattern('https://nodejs.org/docs/latest/api/*.html');
console.log(myPattern.test('https://nodejs.org/docs/latest/api/dns.html'));
// Prints: true
```

### Class: `URLSearchParams`

The `URLSearchParams` API provides read and write access to the query of a
`URL`. The `URLSearchParams` class can also be used standalone with one of the
four following constructors.
The `URLSearchParams` class is also available on the global object.

The WHATWG `URLSearchParams` interface and the `querystring` module have
similar purpose, but the purpose of the `querystring` module is more
general, as it allows the customization of delimiter characters (`&` and `=`).
On the other hand, this API is designed purely for URL query strings.

```js
const myURL = new URL('https://example.org/?abc=123');
console.log(myURL.searchParams.get('abc'));
// Prints 123

myURL.searchParams.append('abc', 'xyz');
console.log(myURL.href);
// Prints https://example.org/?abc=123&abc=xyz

myURL.searchParams.delete('abc');
myURL.searchParams.set('a', 'b');
console.log(myURL.href);
// Prints https://example.org/?a=b

const newSearchParams = new URLSearchParams(myURL.searchParams);
// The above is equivalent to
// const newSearchParams = new URLSearchParams(myURL.search);

newSearchParams.append('a', 'c');
console.log(myURL.href);
// Prints https://example.org/?a=b
console.log(newSearchParams.toString());
// Prints a=b&a=c

// newSearchParams.toString() is implicitly called
myURL.search = newSearchParams;
console.log(myURL.href);
// Prints https://example.org/?a=b&a=c
newSearchParams.delete('a');
console.log(myURL.href);
// Prints https://example.org/?a=b&a=c
```

#### `new URLSearchParams()`

Instantiate a new empty `URLSearchParams` object.

#### `new URLSearchParams(string)`

* `string` {string} A query string

Parse the `string` as a query string, and use it to instantiate a new
`URLSearchParams` object. A leading `'?'`, if present, is ignored.

```js
let params;

params = new URLSearchParams('user=abc&query=xyz');
console.log(params.get('user'));
// Prints 'abc'
console.log(params.toString());
// Prints 'user=abc&query=xyz'

params = new URLSearchParams('?user=abc&query=xyz');
console.log(params.toString());
// Prints 'user=abc&query=xyz'
```

#### `new URLSearchParams(obj)`

* `obj` {Object} An object representing a collection of key-value pairs

Instantiate a new `URLSearchParams` object with a query hash map. The key and
value of each property of `obj` are always coerced to strings.

Unlike `querystring` module, duplicate keys in the form of array values are
not allowed. Arrays are stringified using `array.toString()`, which simply
joins all array elements with commas.

```js
const params = new URLSearchParams({
  user: 'abc',
  query: ['first', 'second'],
});
console.log(params.getAll('query'));
// Prints [ 'first,second' ]
console.log(params.toString());
// Prints 'user=abc&query=first%2Csecond'
```

#### `new URLSearchParams(iterable)`

* `iterable` {Iterable} An iterable object whose elements are key-value pairs

Instantiate a new `URLSearchParams` object with an iterable map in a way that
is similar to {Map}'s constructor. `iterable` can be an `Array` or any
iterable object. That means `iterable` can be another `URLSearchParams`, in
which case the constructor will simply create a clone of the provided
`URLSearchParams`. Elements of `iterable` are key-value pairs, and can
themselves be any iterable object.

Duplicate keys are allowed.

```js
let params;

// Using an array
params = new URLSearchParams([
  ['user', 'abc'],
  ['query', 'first'],
  ['query', 'second'],
]);
console.log(params.toString());
// Prints 'user=abc&query=first&query=second'

// Using a Map object
const map = new Map();
map.set('user', 'abc');
map.set('query', 'xyz');
params = new URLSearchParams(map);
console.log(params.toString());
// Prints 'user=abc&query=xyz'

// Using a generator function
function* getQueryPairs() {
  yield ['user', 'abc'];
  yield ['query', 'first'];
  yield ['query', 'second'];
}
params = new URLSearchParams(getQueryPairs());
console.log(params.toString());
// Prints 'user=abc&query=first&query=second'

// Each key-value pair must have exactly two elements
new URLSearchParams([
  ['user', 'abc', 'error'],
]);
// Throws TypeError [ERR_INVALID_TUPLE]:
//        Each query pair must be an iterable [name, value] tuple
```

#### `urlSearchParams.append(name, value)`

* `name` {string}
* `value` {string}

Append a new name-value pair to the query string.

#### `urlSearchParams.delete(name[, value])`

* `name` {string}
* `value` {string}

If `value` is provided, removes all name-value pairs
where name is `name` and value is `value`..

If `value` is not provided, removes all name-value pairs whose name is `name`.

#### `urlSearchParams.entries()`

* Returns: {Iterator}

Returns an ES6 `Iterator` over each of the name-value pairs in the query.
Each item of the iterator is a JavaScript `Array`. The first item of the `Array`
is the `name`, the second item of the `Array` is the `value`.

Alias for `urlSearchParamsSymbol.iterator`.

#### `urlSearchParams.forEach(fn[, thisArg])`

* `fn` {Function} Invoked for each name-value pair in the query
* `thisArg` {Object} To be used as `this` value for when `fn` is called

Iterates over each name-value pair in the query and invokes the given function.

```js
const myURL = new URL('https://example.org/?a=b&c=d');
myURL.searchParams.forEach((value, name, searchParams) => {
  console.log(name, value, myURL.searchParams === searchParams);
});
// Prints:
//   a b true
//   c d true
```

#### `urlSearchParams.get(name)`

* `name` {string}
* Returns: {string | null} A string or `null` if there is no name-value pair
  with the given `name`.

Returns the value of the first name-value pair whose name is `name`. If there
are no such pairs, `null` is returned.

#### `urlSearchParams.getAll(name)`

* `name` {string}
* Returns: {string\[]}

Returns the values of all name-value pairs whose name is `name`. If there are
no such pairs, an empty array is returned.

#### `urlSearchParams.has(name[, value])`

* `name` {string}
* `value` {string}
* Returns: {boolean}

Checks if the `URLSearchParams` object contains key-value pair(s) based on
`name` and an optional `value` argument.

If `value` is provided, returns `true` when name-value pair with
same `name` and `value` exists.

If `value` is not provided, returns `true` if there is at least one name-value
pair whose name is `name`.

#### `urlSearchParams.keys()`

* Returns: {Iterator}

Returns an ES6 `Iterator` over the names of each name-value pair.

```js
const params = new URLSearchParams('foo=bar&foo=baz');
for (const name of params.keys()) {
  console.log(name);
}
// Prints:
//   foo
//   foo
```

#### `urlSearchParams.set(name, value)`

* `name` {string}
* `value` {string}

Sets the value in the `URLSearchParams` object associated with `name` to
`value`. If there are any pre-existing name-value pairs whose names are `name`,
set the first such pair's value to `value` and remove all others. If not,
append the name-value pair to the query string.

```js
const params = new URLSearchParams();
params.append('foo', 'bar');
params.append('foo', 'baz');
params.append('abc', 'def');
console.log(params.toString());
// Prints foo=bar&foo=baz&abc=def

params.set('foo', 'def');
params.set('xyz', 'opq');
console.log(params.toString());
// Prints foo=def&abc=def&xyz=opq
```

#### `urlSearchParams.size`

The total number of parameter entries.

#### `urlSearchParams.sort()`

Sort all existing name-value pairs in-place by their names. Sorting is done
with a stable sorting algorithm, so relative order between name-value pairs
with the same name is preserved.

This method can be used, in particular, to increase cache hits.

```js
const params = new URLSearchParams('query[]=abc&type=search&query[]=123');
params.sort();
console.log(params.toString());
// Prints query%5B%5D=abc&query%5B%5D=123&type=search
```

#### `urlSearchParams.toString()`

* Returns: {string}

Returns the search parameters serialized as a string, with characters
percent-encoded where necessary.

#### `urlSearchParams.values()`

* Returns: {Iterator}

Returns an ES6 `Iterator` over the values of each name-value pair.

#### `urlSearchParamsSymbol.iterator`

* Returns: {Iterator}

Returns an ES6 `Iterator` over each of the name-value pairs in the query string.
Each item of the iterator is a JavaScript `Array`. The first item of the `Array`
is the `name`, the second item of the `Array` is the `value`.

Alias for `urlSearchParams.entries()`.

```js
const params = new URLSearchParams('foo=bar&xyz=baz');
for (const [name, value] of params) {
  console.log(name, value);
}
// Prints:
//   foo bar
//   xyz baz
```

### `url.domainToASCII(domain)`

* `domain` {string}
* Returns: {string}

Returns the Punycode ASCII serialization of the `domain`. If `domain` is an
invalid domain, the empty string is returned.

It performs the inverse operation to `url.domainToUnicode()`.

```mjs
import url from 'node:url';

console.log(url.domainToASCII('español.com'));
// Prints xn--espaol-zwa.com
console.log(url.domainToASCII('中文.com'));
// Prints xn--fiq228c.com
console.log(url.domainToASCII('xn--iñvalid.com'));
// Prints an empty string
```

```cjs
const url = require('node:url');

console.log(url.domainToASCII('español.com'));
// Prints xn--espaol-zwa.com
console.log(url.domainToASCII('中文.com'));
// Prints xn--fiq228c.com
console.log(url.domainToASCII('xn--iñvalid.com'));
// Prints an empty string
```

### `url.domainToUnicode(domain)`

* `domain` {string}
* Returns: {string}

Returns the Unicode serialization of the `domain`. If `domain` is an invalid
domain, the empty string is returned.

It performs the inverse operation to `url.domainToASCII()`.

```mjs
import url from 'node:url';

console.log(url.domainToUnicode('xn--espaol-zwa.com'));
// Prints español.com
console.log(url.domainToUnicode('xn--fiq228c.com'));
// Prints 中文.com
console.log(url.domainToUnicode('xn--iñvalid.com'));
// Prints an empty string
```

```cjs
const url = require('node:url');

console.log(url.domainToUnicode('xn--espaol-zwa.com'));
// Prints español.com
console.log(url.domainToUnicode('xn--fiq228c.com'));
// Prints 中文.com
console.log(url.domainToUnicode('xn--iñvalid.com'));
// Prints an empty string
```
