---
title: "Stream (part 6 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Stream (part 6 of 11)

* `fn` {Function|AsyncFunction} a function to map over every chunk in the
  stream.
  * `data` {any} a chunk of data from the stream.
  * `options` {Object}
    * `signal` {AbortSignal} aborted if the stream is destroyed allowing to
      abort the `fn` call early.
* `options` {Object}
  * `concurrency` {number} the maximum concurrent invocation of `fn` to call
    on the stream at once. **Default:** `1`.
  * `highWaterMark` {number} how many items to buffer while waiting for user
    consumption of the mapped items. **Default:** `concurrency * 2 - 1`.
  * `signal` {AbortSignal} allows destroying the stream if the signal is
    aborted.
* Returns: {Readable} a stream mapped with the function `fn`.

This method allows mapping over the stream. The `fn` function will be called
for every chunk in the stream. If the `fn` function returns a promise - that
promise will be `await`ed before being passed to the result stream.

```mjs
import { Readable } from 'node:stream';
import { Resolver } from 'node:dns/promises';

// With a synchronous mapper.
for await (const chunk of Readable.from([1, 2, 3, 4]).map((x) => x * 2)) {
  console.log(chunk); // 2, 4, 6, 8
}
// With an asynchronous mapper, making at most 2 queries at a time.
const resolver = new Resolver();
const dnsResults = Readable.from([
  'nodejs.org',
  'openjsf.org',
  'www.linuxfoundation.org',
]).map((domain) => resolver.resolve4(domain), { concurrency: 2 });
for await (const result of dnsResults) {
  console.log(result); // Logs the DNS result of resolver.resolve4.
}
```

##### `readable.filter(fn[, options])`

> Stability: 1 - Experimental

* `fn` {Function|AsyncFunction} a function to filter chunks from the stream.
  * `data` {any} a chunk of data from the stream.
  * `options` {Object}
    * `signal` {AbortSignal} aborted if the stream is destroyed allowing to
      abort the `fn` call early.
* `options` {Object}
  * `concurrency` {number} the maximum concurrent invocation of `fn` to call
    on the stream at once. **Default:** `1`.
  * `highWaterMark` {number} how many items to buffer while waiting for user
    consumption of the filtered items. **Default:** `concurrency * 2 - 1`.
  * `signal` {AbortSignal} allows destroying the stream if the signal is
    aborted.
* Returns: {Readable} a stream filtered with the predicate `fn`.

This method allows filtering the stream. For each chunk in the stream the `fn`
function will be called and if it returns a truthy value, the chunk will be
passed to the result stream. If the `fn` function returns a promise - that
promise will be `await`ed.

```mjs
import { Readable } from 'node:stream';
import { Resolver } from 'node:dns/promises';

// With a synchronous predicate.
for await (const chunk of Readable.from([1, 2, 3, 4]).filter((x) => x > 2)) {
  console.log(chunk); // 3, 4
}
// With an asynchronous predicate, making at most 2 queries at a time.
const resolver = new Resolver();
const dnsResults = Readable.from([
  'nodejs.org',
  'openjsf.org',
  'www.linuxfoundation.org',
]).filter(async (domain) => {
  const { address } = await resolver.resolve4(domain, { ttl: true });
  return address.ttl > 60;
}, { concurrency: 2 });
for await (const result of dnsResults) {
  // Logs domains with more than 60 seconds on the resolved dns record.
  console.log(result);
}
```

##### `readable.forEach(fn[, options])`

> Stability: 1 - Experimental

* `fn` {Function|AsyncFunction} a function to call on each chunk of the stream.
  * `data` {any} a chunk of data from the stream.
  * `options` {Object}
    * `signal` {AbortSignal} aborted if the stream is destroyed allowing to
      abort the `fn` call early.
* `options` {Object}
  * `concurrency` {number} the maximum concurrent invocation of `fn` to call
    on the stream at once. **Default:** `1`.
  * `signal` {AbortSignal} allows destroying the stream if the signal is
    aborted.
* Returns: {Promise} a promise for when the stream has finished.

This method allows iterating a stream. For each chunk in the stream the
`fn` function will be called. If the `fn` function returns a promise - that
promise will be `await`ed.

This method is different from `for await...of` loops in that it can optionally
process chunks concurrently. In addition, a `forEach` iteration can only be
stopped by having passed a `signal` option and aborting the related
`AbortController` while `for await...of` can be stopped with `break` or
`return`. In either case the stream will be destroyed.

This method is different from listening to the `'data'` event in that it
uses the `readable` event in the underlying machinery and can limit the
number of concurrent `fn` calls.

```mjs
import { Readable } from 'node:stream';
import { Resolver } from 'node:dns/promises';

// With a synchronous predicate.
for await (const chunk of Readable.from([1, 2, 3, 4]).filter((x) => x > 2)) {
  console.log(chunk); // 3, 4
}
// With an asynchronous predicate, making at most 2 queries at a time.
const resolver = new Resolver();
const dnsResults = Readable.from([
  'nodejs.org',
  'openjsf.org',
  'www.linuxfoundation.org',
]).map(async (domain) => {
  const { address } = await resolver.resolve4(domain, { ttl: true });
  return address;
}, { concurrency: 2 });
await dnsResults.forEach((result) => {
  // Logs result, similar to `for await (const result of dnsResults)`
  console.log(result);
});
console.log('done'); // Stream has finished
```

##### `readable.toArray([options])`

> Stability: 1 - Experimental

* `options` {Object}
  * `signal` {AbortSignal} allows cancelling the toArray operation if the
    signal is aborted.
* Returns: {Promise} a promise containing an array with the contents of the
  stream.

This method allows easily obtaining the contents of a stream.

As this method reads the entire stream into memory, it negates the benefits of
streams. It's intended for interoperability and convenience, not as the primary
way to consume streams.

```mjs
import { Readable } from 'node:stream';
import { Resolver } from 'node:dns/promises';

await Readable.from([1, 2, 3, 4]).toArray(); // [1, 2, 3, 4]

const resolver = new Resolver();

// Make dns queries concurrently using .map and collect
// the results into an array using toArray
const dnsResults = await Readable.from([
  'nodejs.org',
  'openjsf.org',
  'www.linuxfoundation.org',
]).map(async (domain) => {
  const { address } = await resolver.resolve4(domain, { ttl: true });
  return address;
}, { concurrency: 2 }).toArray();
```

##### `readable.some(fn[, options])`

> Stability: 1 - Experimental

* `fn` {Function|AsyncFunction} a function to call on each chunk of the stream.
  * `data` {any} a chunk of data from the stream.
  * `options` {Object}
    * `signal` {AbortSignal} aborted if the stream is destroyed allowing to
      abort the `fn` call early.
* `options` {Object}
  * `concurrency` {number} the maximum concurrent invocation of `fn` to call
    on the stream at once. **Default:** `1`.
  * `signal` {AbortSignal} allows destroying the stream if the signal is
    aborted.
* Returns: {Promise} a promise evaluating to `true` if `fn` returned a truthy
  value for at least one of the chunks.

This method is similar to `Array.prototype.some` and calls `fn` on each chunk
in the stream until the awaited return value is `true` (or any truthy value).
Once an `fn` call on a chunk awaited return value is truthy, the stream is
destroyed and the promise is fulfilled with `true`. If none of the `fn`
calls on the chunks return a truthy value, the promise is fulfilled with
`false`.

```mjs
import { Readable } from 'node:stream';
import { stat } from 'node:fs/promises';

// With a synchronous predicate.
await Readable.from([1, 2, 3, 4]).some((x) => x > 2); // true
await Readable.from([1, 2, 3, 4]).some((x) => x < 0); // false

// With an asynchronous predicate, making at most 2 file checks at a time.
const anyBigFile = await Readable.from([
  'file1',
  'file2',
  'file3',
]).some(async (fileName) => {
  const stats = await stat(fileName);
  return stats.size > 1024 * 1024;
}, { concurrency: 2 });
console.log(anyBigFile); // `true` if any file in the list is bigger than 1MB
console.log('done'); // Stream has finished
```

##### `readable.find(fn[, options])`

> Stability: 1 - Experimental

* `fn` {Function|AsyncFunction} a function to call on each chunk of the stream.
  * `data` {any} a chunk of data from the stream.
  * `options` {Object}
    * `signal` {AbortSignal} aborted if the stream is destroyed allowing to
      abort the `fn` call early.
* `options` {Object}
  * `concurrency` {number} the maximum concurrent invocation of `fn` to call
    on the stream at once. **Default:** `1`.
  * `signal` {AbortSignal} allows destroying the stream if the signal is
    aborted.
* Returns: {Promise} a promise evaluating to the first chunk for which `fn`
  evaluated with a truthy value, or `undefined` if no element was found.

This method is similar to `Array.prototype.find` and calls `fn` on each chunk
in the stream to find a chunk with a truthy value for `fn`. Once an `fn` call's
awaited return value is truthy, the stream is destroyed and the promise is
fulfilled with value for which `fn` returned a truthy value. If all of the
`fn` calls on the chunks return a falsy value, the promise is fulfilled with
`undefined`.

```mjs
import { Readable } from 'node:stream';
import { stat } from 'node:fs/promises';

// With a synchronous predicate.
await Readable.from([1, 2, 3, 4]).find((x) => x > 2); // 3
await Readable.from([1, 2, 3, 4]).find((x) => x > 0); // 1
await Readable.from([1, 2, 3, 4]).find((x) => x > 10); // undefined

// With an asynchronous predicate, making at most 2 file checks at a time.
const foundBigFile = await Readable.from([
  'file1',
  'file2',
  'file3',
]).find(async (fileName) => {
  const stats = await stat(fileName);
  return stats.size > 1024 * 1024;
}, { concurrency: 2 });
console.log(foundBigFile); // File name of large file, if any file in the list is bigger than 1MB
console.log('done'); // Stream has finished
```

##### `readable.every(fn[, options])`

> Stability: 1 - Experimental

* `fn` {Function|AsyncFunction} a function to call on each chunk of the stream.
  * `data` {any} a chunk of data from the stream.
  * `options` {Object}
    * `signal` {AbortSignal} aborted if the stream is destroyed allowing to
      abort the `fn` call early.
* `options` {Object}
  * `concurrency` {number} the maximum concurrent invocation of `fn` to call
    on the stream at once. **Default:** `1`.
  * `signal` {AbortSignal} allows destroying the stream if the signal is
    aborted.
* Returns: {Promise} a promise evaluating to `true` if `fn` returned a truthy
  value for all of the chunks.

This method is similar to `Array.prototype.every` and calls `fn` on each chunk
in the stream to check if all awaited return values are truthy value for `fn`.
Once an `fn` call on a chunk awaited return value is falsy, the stream is
destroyed and the promise is fulfilled with `false`. If all of the `fn` calls
on the chunks return a truthy value, the promise is fulfilled with `true`.

```mjs
import { Readable } from 'node:stream';
import { stat } from 'node:fs/promises';

// With a synchronous predicate.
await Readable.from([1, 2, 3, 4]).every((x) => x > 2); // false
await Readable.from([1, 2, 3, 4]).every((x) => x > 0); // true

// With an asynchronous predicate, making at most 2 file checks at a time.
const allBigFiles = await Readable.from([
  'file1',
  'file2',
  'file3',
]).every(async (fileName) => {
  const stats = await stat(fileName);
  return stats.size > 1024 * 1024;
}, { concurrency: 2 });
// `true` if all files in the list are bigger than 1MiB
console.log(allBigFiles);
console.log('done'); // Stream has finished
```

##### `readable.flatMap(fn[, options])`

> Stability: 1 - Experimental

* `fn` {Function|AsyncGeneratorFunction|AsyncFunction} a function to map over
  every chunk in the stream.
  * `data` {any} a chunk of data from the stream.
  * `options` {Object}
    * `signal` {AbortSignal} aborted if the stream is destroyed allowing to
      abort the `fn` call early.
* `options` {Object}
  * `concurrency` {number} the maximum concurrent invocation of `fn` to call
    on the stream at once. **Default:** `1`.
  * `signal` {AbortSignal} allows destroying the stream if the signal is
    aborted.
* Returns: {Readable} a stream flat-mapped with the function `fn`.

This method returns a new stream by applying the given callback to each
chunk of the stream and then flattening the result.

It is possible to return a stream or another iterable or async iterable from
`fn` and the result streams will be merged (flattened) into the returned
stream.

```mjs
import { Readable } from 'node:stream';
import { createReadStream } from 'node:fs';

// With a synchronous mapper.
for await (const chunk of Readable.from([1, 2, 3, 4]).flatMap((x) => [x, x])) {
  console.log(chunk); // 1, 1, 2, 2, 3, 3, 4, 4
}
// With an asynchronous mapper, combine the contents of 4 files
const concatResult = Readable.from([
  './1.mjs',
  './2.mjs',
  './3.mjs',
  './4.mjs',
]).flatMap((fileName) => createReadStream(fileName));
for await (const result of concatResult) {
  // This will contain the contents (all chunks) of all 4 files
  console.log(result);
}
```

##### `readable.drop(limit[, options])`

> Stability: 1 - Experimental

* `limit` {number} the number of chunks to drop from the readable.
* `options` {Object}
  * `signal` {AbortSignal} allows destroying the stream if the signal is
    aborted.
* Returns: {Readable} a stream with `limit` chunks dropped.

This method returns a new stream with the first `limit` chunks dropped.

```mjs
import { Readable } from 'node:stream';

await Readable.from([1, 2, 3, 4]).drop(2).toArray(); // [3, 4]
```

##### `readable.take(limit[, options])`

> Stability: 1 - Experimental

* `limit` {number} the number of chunks to take from the readable.
* `options` {Object}
  * `signal` {AbortSignal} allows destroying the stream if the signal is
    aborted.
* Returns: {Readable} a stream with `limit` chunks taken.

This method returns a new stream with the first `limit` chunks.

```mjs
import { Readable } from 'node:stream';

await Readable.from([1, 2, 3, 4]).take(2).toArray(); // [1, 2]
```

##### `readable.reduce(fn[, initial[, options]])`

> Stability: 1 - Experimental
