---
title: "Util (part 2 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/util.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Util (part 2 of 10)

## `util.throttle(fn, limit, interval[, options])`

* `fn` {Function} The function to throttle.
* `limit` {integer} The maximum number of times to invoke `fn` during an
  interval. Must be greater than `0`.
* `interval` {integer} The length of each interval in milliseconds.
* `options` {Object}
  * `concurrency` {number} The maximum number of invocations of `fn` whose
    return values may be unsettled at once. Must be a positive integer or
    `Infinity`. **Default:** `Infinity`.
  * `maxPending` {number} The maximum number of calls that may be queued when
    `overflow` is `'queue'`. Must be a non-negative integer or `Infinity`.
    **Default:** `Infinity`.
  * `overflow` {string} Determines how calls exceeding the limit are handled.
    **Default:** `'queue'`.
    * `'queue'`: Queue calls in the order received.
    * `'drop'`: Reject calls immediately without queueing them.
  * `signal` {AbortSignal} An `AbortSignal` that cancels pending calls and
    prevents future calls when aborted.
  * `strict` {boolean} When `true`, ensures that `limit` is not exceeded during
    any rolling interval. **Default:** `false`.
* Returns: {Function} The throttled function.

Creates a function that limits how often `fn` is invoked. By default, calls that
exceed the limit are queued in the order received rather than discarded. The
throttled function returns a {Promise} for the value returned by `fn`. If `fn`
throws or returns a rejected promise, the returned promise is rejected with the
same reason.

An invocation starts only when both rate and concurrency capacity are
available. Rate capacity is consumed when `fn` starts, not when a call enters
the queue. Concurrency capacity is released when the value returned by `fn`
settles. Non-promise values settle during the next microtask.

When `options.overflow` is `'drop'`, calls made without available rate or
concurrency capacity are rejected immediately. When `options.overflow` is
`'queue'` and `options.maxPending` calls are already queued, additional calls
are also rejected immediately. `maxPending` has no effect when `overflow` is
`'drop'`.

In both cases, rejected calls return a promise rejected with an
`ERR_THROTTLED` error. The rejected promise is marked as handled, so ignoring it
does not emit an `'unhandledRejection'` event. Awaiting or explicitly handling
the promise still observes the rejection. Rejected calls do not consume rate
or concurrency capacity, enter the queue, or schedule a timeout.

By default, the interval begins when the first call in a new window invokes
`fn`. Up to `limit` calls can invoke `fn` during that window. Queued calls are
processed in groups of up to `limit` as each subsequent window begins. This
windowed behavior can result in calls occurring close together at a window
boundary.

When `options.strict` is `true`, invocation times are tracked individually.
This ensures that no more than `limit` calls begin during any rolling interval,
at the cost of additional bookkeeping.

If `options.signal` is aborted, pending and future calls reject with an
`AbortError`, with the signal's reason set as the error's `cause`, and `fn` is
not invoked by those calls. If the signal is already aborted, `throttle()`
throws an `AbortError`.

The returned function has the following properties:

* `cancel([reason])` cancels all queued calls and resets the current throttle
  window. The queued promises reject with an `AbortError`. If provided,
  `reason` is set as the error's `cause`. Does not cancel invocations that have
  already started.
* `hasImmediateCapacity()` returns `true` if a call made at that moment could
  invoke `fn` without being queued or rejected. The check does not reserve
  capacity, and the throttled function always checks again when called. It
  returns `false` while calls are queued to preserve their order. Callers can
  avoid creating a timeout by only calling the throttled function when this
  method returns `true`.
* `pending` {Promise|null} is the promise returned by the most recently queued
  call, or `null` if no invocation is queued.
* `pendingCount` {integer} is the number of calls awaiting invocation.
* `activeCount` {integer} is the number of invocations whose return values have
  not settled.
* `ref()` makes the pending and future timeout keep the Node.js event loop
  active. Returns the throttled function.
* `unref()` allows the event loop to exit while a timeout is pending. This also
  applies to future timeouts. Returns the throttled function.

Calls that have already invoked `fn` are not affected by `cancel()` or by an
aborted signal. When invoked, `fn` has the throttled function as its `this`
value. The throttled function preserves the `name` and `length` of `fn`.

```mjs
import { throttle } from 'node:util';

const request = throttle(async (id) => {
  const response = await fetch(`https://example.com/items/${id}`);
  return response.json();
}, 2, 1_000);

// At most two requests begin during each one-second interval. All other calls
// remain queued and retain their original arguments.
const results = await Promise.all([
  request(1),
  request(2),
  request(3),
  request(4),
]);
```

## `util.diff(actual, expected)`

> Stability: 1 - Experimental

* `actual` {Array|string} The first value to compare

* `expected` {Array|string} The second value to compare

* Returns: {Array} An array of difference entries. Each entry is an array with two elements:
  * `0` {number} Operation code: `-1` for delete, `0` for no-op/unchanged, `1` for insert
  * `1` {string} The value associated with the operation

* Algorithm complexity: O(N\*D), where:

* N is the total length of the two sequences combined (N = actual.length + expected.length)

* D is the edit distance (the minimum number of operations required to transform one sequence into the other).

`util.diff()` compares two string or array values and returns an array of difference entries.
It uses the Myers diff algorithm to compute minimal differences, which is the same algorithm
used internally by assertion error messages.

If the values are equal, an empty array is returned.

```js
const { diff } = require('node:util');

// Comparing strings
const actualString = '12345678';
const expectedString = '12!!5!7!';
console.log(diff(actualString, expectedString));
// [
//   [0, '1'],
//   [0, '2'],
//   [1, '3'],
//   [1, '4'],
//   [-1, '!'],
//   [-1, '!'],
//   [0, '5'],
//   [1, '6'],
//   [-1, '!'],
//   [0, '7'],
//   [1, '8'],
//   [-1, '!'],
// ]
// Comparing arrays
const actualArray = ['1', '2', '3'];
const expectedArray = ['1', '3', '4'];
console.log(diff(actualArray, expectedArray));
// [
//   [0, '1'],
//   [1, '2'],
//   [0, '3'],
//   [-1, '4'],
// ]
// Equal values return empty array
console.log(diff('same', 'same'));
// []
```

## `util.format(format[, ...args])`

* `format` {string} A `printf`-like format string.

The `util.format()` method returns a formatted string using the first argument
as a `printf`-like format string which can contain zero or more format
specifiers. Each specifier is replaced with the converted value from the
corresponding argument. Supported specifiers are:

* `%s`: `String` will be used to convert all values except `BigInt`, `Object`
  and `-0`. `BigInt` values will be represented with an `n` and Objects that
  have neither a user defined `toString` function nor `Symbol.toPrimitive` function are inspected using `util.inspect()`
  with options `{ depth: 0, colors: false, compact: 3 }`.
* `%d`: `Number` will be used to convert all values except `BigInt` and
  `Symbol`.
* `%i`: `parseInt(value, 10)` is used for all values except `BigInt` and
  `Symbol`.
* `%f`: `parseFloat(value)` is used for all values except `Symbol`.
* `%j`: JSON. Replaced with the string `'[Circular]'` if the argument contains
  circular references.
* `%o`: `Object`. A string representation of an object with generic JavaScript
  object formatting. Similar to `util.inspect()` with options
  `{ showHidden: true, showProxy: true }`. This will show the full object
  including non-enumerable properties and proxies.
* `%O`: `Object`. A string representation of an object with generic JavaScript
  object formatting. Similar to `util.inspect()` without options. This will show
  the full object not including non-enumerable properties and proxies.
* `%c`: `CSS`. This specifier is ignored and will skip any CSS passed in.
* `%%`: single percent sign (`'%'`). This does not consume an argument.
* Returns: {string} The formatted string

If a specifier does not have a corresponding argument, it is not replaced:

```js
util.format('%s:%s', 'foo');
// Returns: 'foo:%s'
```

Values that are not part of the format string are formatted using
`util.inspect()` if their type is not `string`.

If there are more arguments passed to the `util.format()` method than the
number of specifiers, the extra arguments are concatenated to the returned
string, separated by spaces:

```js
util.format('%s:%s', 'foo', 'bar', 'baz');
// Returns: 'foo:bar baz'
```

If the first argument does not contain a valid format specifier, `util.format()`
returns a string that is the concatenation of all arguments separated by spaces:

```js
util.format(1, 2, 3);
// Returns: '1 2 3'
```

If only one argument is passed to `util.format()`, it is returned as it is
without any formatting:

```js
util.format('%% %s');
// Returns: '%% %s'
```

`util.format()` is a synchronous method that is intended as a debugging tool.
Some input values can have a significant performance overhead that can block the
event loop. Use this function with care and never in a hot code path.

## `util.formatWithOptions(inspectOptions, format[, ...args])`

* `inspectOptions` {Object}
* `format` {string}

This function is identical to `util.format()`, except in that it takes
an `inspectOptions` argument which specifies options that are passed along to
`util.inspect()`.

```js
util.formatWithOptions({ colors: true }, 'See object %O', { foo: 42 });
// Returns 'See object { foo: 42 }', where `42` is colored as a number
// when printed to a terminal.
```

## `util.getCallSites(frameCount)`

> Stability: 1.1 - Active development

* `frameCount` {integer} Optional number of frames to capture as call site objects.
  **Default:** `10`. Allowable range is between 1 and 200.
* `options` {Object} Optional
  * `sourceMap` {boolean} Reconstruct the original location in the stacktrace from the source-map.
    Enabled by default with the flag `--enable-source-maps`.
* Returns: {Object\[]} An array of call site objects
  * `functionName` {string} Returns the name of the function associated with this call site.
  * `scriptName` {string} Returns the name of the resource that contains the script for the
    function for this call site.
  * `scriptId` {string} Returns the unique id of the script, as in Chrome DevTools protocol `Runtime.ScriptId`.
  * `lineNumber` {number} Returns the JavaScript script line number (1-based).
  * `columnNumber` {number} Returns the JavaScript script column number (1-based).

Returns an array of call site objects containing the stack of
the caller function.

Unlike accessing an `error.stack`, the result returned from this API is not
interfered with `Error.prepareStackTrace`.

```mjs
import { getCallSites } from 'node:util';

function exampleFunction() {
  const callSites = getCallSites();

  console.log('Call Sites:');
  callSites.forEach((callSite, index) => {
    console.log(`CallSite ${index + 1}:`);
    console.log(`Function Name: ${callSite.functionName}`);
    console.log(`Script Name: ${callSite.scriptName}`);
    console.log(`Line Number: ${callSite.lineNumber}`);
    console.log(`Column Number: ${callSite.columnNumber}`);
  });
  // CallSite 1:
  // Function Name: exampleFunction
  // Script Name: /home/example.js
  // Line Number: 5
  // Column Number: 26

  // CallSite 2:
  // Function Name: anotherFunction
  // Script Name: /home/example.js
  // Line Number: 22
  // Column Number: 3

  // ...
}

// A function to simulate another stack layer
function anotherFunction() {
  exampleFunction();
}

anotherFunction();
```

```cjs
const { getCallSites } = require('node:util');

function exampleFunction() {
  const callSites = getCallSites();

  console.log('Call Sites:');
  callSites.forEach((callSite, index) => {
    console.log(`CallSite ${index + 1}:`);
    console.log(`Function Name: ${callSite.functionName}`);
    console.log(`Script Name: ${callSite.scriptName}`);
    console.log(`Line Number: ${callSite.lineNumber}`);
    console.log(`Column Number: ${callSite.columnNumber}`);
  });
  // CallSite 1:
  // Function Name: exampleFunction
  // Script Name: /home/example.js
  // Line Number: 5
  // Column Number: 26

  // CallSite 2:
  // Function Name: anotherFunction
  // Script Name: /home/example.js
  // Line Number: 22
  // Column Number: 3

  // ...
}

// A function to simulate another stack layer
function anotherFunction() {
  exampleFunction();
}

anotherFunction();
```

It is possible to reconstruct the original locations by setting the option `sourceMap` to `true`.
If the source map is not available, the original location will be the same as the current location.
When the `--enable-source-maps` flag is enabled,`sourceMap` will be true by default.

```ts
import { getCallSites } from 'node:util';

interface Foo {
  foo: string;
}

const callSites = getCallSites({ sourceMap: true });

// With sourceMap:
// Function Name: ''
// Script Name: example.js
// Line Number: 7
// Column Number: 26

// Without sourceMap:
// Function Name: ''
// Script Name: example.js
// Line Number: 2
// Column Number: 26
```

```cjs
const { getCallSites } = require('node:util');

const callSites = getCallSites({ sourceMap: true });

// With sourceMap:
// Function Name: ''
// Script Name: example.js
// Line Number: 7
// Column Number: 26

// Without sourceMap:
// Function Name: ''
// Script Name: example.js
// Line Number: 2
// Column Number: 26
```

## `util.getSystemErrorName(err)`

* `err` {number}
* Returns: {string}

Returns the string name for a numeric error code that comes from a Node.js API.
The mapping between error codes and error names is platform-dependent.
See Common System Errors for the names of common errors.

```js
fs.access('file/that/does/not/exist', (err) => {
  const name = util.getSystemErrorName(err.errno);
  console.error(name);  // ENOENT
});
```

## `util.getSystemErrorMap()`

* Returns: {Map}

Returns a Map of all system error codes available from the Node.js API.
The mapping between error codes and error names is platform-dependent.
See Common System Errors for the names of common errors.

```js
fs.access('file/that/does/not/exist', (err) => {
  const errorMap = util.getSystemErrorMap();
  const name = errorMap.get(err.errno);
  console.error(name);  // ENOENT
});
```
