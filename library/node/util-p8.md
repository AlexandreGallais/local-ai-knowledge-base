---
title: "Util (part 8 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/util.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Util (part 8 of 10)

## `util.aborted(signal, resource)`

* `signal` {AbortSignal}
* `resource` {Object} Any non-null object tied to the abortable operation and held weakly.
  If `resource` is garbage collected before the `signal` aborts, the promise remains pending,
  allowing Node.js to stop tracking it.
  This helps prevent memory leaks in long-running or non-cancelable operations.
* Returns: {Promise}

Listens to abort event on the provided `signal` and returns a promise that resolves when the `signal` is aborted.
If `resource` is provided, it weakly references the operation's associated object,
so if `resource` is garbage collected before the `signal` aborts,
then returned promise shall remain pending.
This prevents memory leaks in long-running or non-cancelable operations.

```cjs
const { aborted } = require('node:util');

// Obtain an object with an abortable signal, like a custom resource or operation.
const dependent = obtainSomethingAbortable();

// Pass `dependent` as the resource, indicating the promise should only resolve
// if `dependent` is still in memory when the signal is aborted.
aborted(dependent.signal, dependent).then(() => {

  // This code runs when `dependent` is aborted.
  console.log('Dependent resource was aborted.');
});

// Simulate an event that triggers the abort.
dependent.on('event', () => {
  dependent.abort(); // This will cause the `aborted` promise to resolve.
});
```

```mjs
import { aborted } from 'node:util';

// Obtain an object with an abortable signal, like a custom resource or operation.
const dependent = obtainSomethingAbortable();

// Pass `dependent` as the resource, indicating the promise should only resolve
// if `dependent` is still in memory when the signal is aborted.
aborted(dependent.signal, dependent).then(() => {

  // This code runs when `dependent` is aborted.
  console.log('Dependent resource was aborted.');
});

// Simulate an event that triggers the abort.
dependent.on('event', () => {
  dependent.abort(); // This will cause the `aborted` promise to resolve.
});
```
