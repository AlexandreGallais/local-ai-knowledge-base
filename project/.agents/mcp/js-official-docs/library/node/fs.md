---
title: "File system (part 1 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system

> Stability: 2 - Stable

The `node:fs` module enables interacting with the file system in a
way modeled on standard POSIX functions.

To use the promise-based APIs:

```mjs
import * as fs from 'node:fs/promises';
```

```cjs
const fs = require('node:fs/promises');
```

To use the callback and sync APIs:

```mjs
import * as fs from 'node:fs';
```

```cjs
const fs = require('node:fs');
```

All file system operations have synchronous, callback, and promise-based
forms, and are accessible using both CommonJS syntax and ES6 Modules (ESM).

## Promise example

Promise-based operations return a promise that is fulfilled when the
asynchronous operation is complete.

```mjs
import { unlink } from 'node:fs/promises';

try {
  await unlink('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (error) {
  console.error('there was an error:', error.message);
}
```

```cjs
const { unlink } = require('node:fs/promises');

(async function(path) {
  try {
    await unlink(path);
    console.log(`successfully deleted ${path}`);
  } catch (error) {
    console.error('there was an error:', error.message);
  }
})('/tmp/hello');
```

## Callback example

The callback form takes a completion callback function as its last
argument and invokes the operation asynchronously. The arguments passed to
the completion callback depend on the method, but the first argument is always
reserved for an exception. If the operation is completed successfully, then
the first argument is `null` or `undefined`.

```mjs
import { unlink } from 'node:fs';

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```

```cjs
const { unlink } = require('node:fs');

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```

The callback-based versions of the `node:fs` module APIs are preferable over
the use of the promise APIs when maximal performance (both in terms of
execution time and memory allocation) is required.

## Synchronous example

The synchronous APIs block the Node.js event loop and further JavaScript
execution until the operation is complete. Exceptions are thrown immediately
and can be handled using `try…catch`, or can be allowed to bubble up.

```mjs
import { unlinkSync } from 'node:fs';

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}
```

```cjs
const { unlinkSync } = require('node:fs');

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // handle the error
}
```
