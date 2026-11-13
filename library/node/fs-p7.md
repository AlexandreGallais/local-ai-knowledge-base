---
title: "File system (part 7 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 7 of 20)

### `fsPromises.watch(filename[, options])`

* `filename` {string|Buffer|URL}
* `options` {string|Object}
  * `persistent` {boolean} Indicates whether the process should continue to run
    as long as files are being watched. **Default:** `true`.
  * `recursive` {boolean} Indicates whether all subdirectories should be
    watched, or only the current directory. This applies when a directory is
    specified, and only on supported platforms (See caveats). **Default:**
    `false`.
  * `encoding` {string} Specifies the character encoding to be used for the
    filename passed to the listener. **Default:** `'utf8'`.
  * `signal` {AbortSignal} An {AbortSignal} used to signal when the watcher
    should stop.
  * `maxQueue` {number} Specifies the number of events to queue between iterations
    of the {AsyncIterator} returned. **Default:** `2048`.
  * `overflow` {string} Either `'ignore'` or `'error'` when there are more events to be
    queued than `maxQueue` allows. `'ignore'` means overflow events are dropped and a
    warning is emitted, while `'error'` means to throw an exception. **Default:** `'ignore'`.
  * `ignore` {string|RegExp|Function|Array} Pattern(s) to ignore. Strings are
    glob patterns (using `minimatch`), RegExp patterns are tested against
    the filename, and functions receive the filename and return `true` to
    ignore. **Default:** `undefined`.
* Returns: {AsyncIterator} of objects with the properties:
  * `eventType` {string} The type of change
  * `filename` {string|Buffer|null} The name of the file changed.

Returns an async iterator that watches for changes on `filename`, where `filename`
is either a file or a directory.

```js
const { watch } = require('node:fs/promises');

const ac = new AbortController();
const { signal } = ac;
setTimeout(() => ac.abort(), 10000);

(async () => {
  try {
    const watcher = watch(__filename, { signal });
    for await (const event of watcher)
      console.log(event);
  } catch (err) {
    if (err.name === 'AbortError')
      return;
    throw err;
  }
})();
```

On most platforms, `'rename'` is emitted whenever a filename appears or
disappears in the directory.

All the caveats for `fs.watch()` also apply to `fsPromises.watch()`.

### `fsPromises.writeFile(file, data[, options])`

* `file` {string|Buffer|URL|FileHandle} filename or `FileHandle`
* `data` {string|Buffer|TypedArray|DataView|AsyncIterable|Iterable}
* `options` {Object|string}
  * `encoding` {string|null} **Default:** `'utf8'`
  * `mode` {integer} **Default:** `0o666`
  * `flag` {string} See support of file system `flags`. **Default:** `'w'`.
  * `flush` {boolean} If all data is successfully written to the file, and
    `flush` is `true`, `filehandle.sync()` is used to flush the data.
    **Default:** `false`.
  * `signal` {AbortSignal} allows aborting an in-progress writeFile
* Returns: {Promise} Fulfills with `undefined` upon success.

Asynchronously writes data to a file, replacing the file if it already exists.
`data` can be a string, a buffer, an {AsyncIterable}, or an {Iterable} object.

The `encoding` option is ignored if `data` is a buffer.

If `options` is a string, then it specifies the encoding.

The `mode` option only affects the newly created file. See `fs.open()`
for more details.

Any specified {FileHandle} has to support writing.

It is unsafe to use `fsPromises.writeFile()` multiple times on the same file
without waiting for the promise to be settled.

Similarly to `fsPromises.readFile` - `fsPromises.writeFile` is a convenience
method that performs multiple `write` calls internally to write the buffer
passed to it. For performance sensitive code consider using
`fs.createWriteStream()` or `filehandle.createWriteStream()`.

It is possible to use an {AbortSignal} to cancel an `fsPromises.writeFile()`.
Cancelation is "best effort", and some amount of data is likely still
to be written.

```mjs
import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

try {
  const controller = new AbortController();
  const { signal } = controller;
  const data = new Uint8Array(Buffer.from('Hello Node.js'));
  const promise = writeFile('message.txt', data, { signal });

  // Abort the request before the promise settles.
  controller.abort();

  await promise;
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}
```

Aborting an ongoing request does not abort individual operating
system requests but rather the internal buffering `fs.writeFile` performs.

### `fsPromises.constants`

* Type: {Object}

Returns an object containing commonly used constants for file system
operations. The object is the same as `fs.constants`. See FS constants
for more details.
