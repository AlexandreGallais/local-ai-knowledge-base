---
title: "Global objects (part 2 of 2)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/globals.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Global objects (part 2 of 2)

## Class: `ReadableStream`

A browser-compatible implementation of `ReadableStream`.

## Class: `ReadableStreamBYOBReader`

A browser-compatible implementation of `ReadableStreamBYOBReader`.

## Class: `ReadableStreamBYOBRequest`

A browser-compatible implementation of `ReadableStreamBYOBRequest`.

## Class: `ReadableStreamDefaultController`

A browser-compatible implementation of `ReadableStreamDefaultController`.

## Class: `ReadableStreamDefaultReader`

A browser-compatible implementation of `ReadableStreamDefaultReader`.

## Class: `Request`

A browser-compatible implementation of {Request}.

## `require()`

This variable may appear to be global but is not. See `require()`.

## Class: `Response`

A browser-compatible implementation of {Response}.

## `sessionStorage`

> Stability: 1.2 - Release candidate. Disable this API with `--no-experimental-webstorage`.

A browser-compatible implementation of `sessionStorage`. Data is stored in
memory, with a storage quota of 10 MB. `sessionStorage` data persists only within
the currently running process, and is not shared between workers.

## `setImmediate(callback[, ...args])`

`setImmediate` is described in the timers section.

## `setInterval(callback, delay[, ...args])`

`setInterval` is described in the timers section.

## `setTimeout(callback, delay[, ...args])`

`setTimeout` is described in the timers section.

## Class: `Storage`

> Stability: 1.2 - Release candidate. Disable this API with `--no-experimental-webstorage`.

A browser-compatible implementation of {Storage}.

## `structuredClone(value[, options])`

The WHATWG `structuredClone` method.

## Class: `SubtleCrypto`

A browser-compatible implementation of {SubtleCrypto}. This global is available
only if the Node.js binary was compiled with including support for the
`node:crypto` module.

## Class: `TextDecoder`

The WHATWG `TextDecoder` class. See the `TextDecoder` section.

## Class: `TextDecoderStream`

A browser-compatible implementation of `TextDecoderStream`.

## Class: `TextEncoder`

The WHATWG `TextEncoder` class. See the `TextEncoder` section.

## Class: `TextEncoderStream`

A browser-compatible implementation of `TextEncoderStream`.

## Class: `TransformStream`

A browser-compatible implementation of `TransformStream`.

## Class: `TransformStreamDefaultController`

A browser-compatible implementation of `TransformStreamDefaultController`.

## Class: `URL`

The WHATWG `URL` class. See the `URL` section.

## Class: `URLPattern`

> Stability: 1 - Experimental

The WHATWG `URLPattern` class. See the `URLPattern` section.

## Class: `URLSearchParams`

The WHATWG `URLSearchParams` class. See the `URLSearchParams` section.

## Class: `WebAssembly`

* Type: {Object}

The object that acts as the namespace for all W3C
WebAssembly related functionality. See the
Mozilla Developer Network for usage and compatibility.

## Class: `WebSocket`

A browser-compatible implementation of {WebSocket}. Disable this API
with the `--no-experimental-websocket` CLI flag.

## Class: `Worker`

> Stability: 1 - Experimental. Enable this API with the
> `--experimental-web-worker` CLI flag.

A mostly browser-compatible implementation of Web Workers of the HTML Standard,
implemented on top of `node:worker_threads`. Threads created with it
are given the {DedicatedWorkerGlobalScope} API (`self`,
`name`, `location`, `navigator`, `postMessage()`, `close()`, and
`importScripts()`), in addition to the usual Node.js globals, such as `process`.

```js
// worker.js
addEventListener('message', (event) => {
  postMessage(`${event.data} from ${name}!`);
});
```

```js
// main.js
const worker = new Worker('./worker.js', { name: 'greeter' });

worker.addEventListener('message', (event) => {
  console.log(event.data); // Prints: Hello from greeter!
  worker.terminate();
});

worker.postMessage('Hello');
```

Because their lifetime and sharing model depend on origins and
browsing contexts, Node.js does not currently implement `SharedWorker`.

### Loading worker scripts

Worker scripts are read synchronously from the local file system or from
memory rather than fetched over the network, which changes which URLs are
accepted and how failures are reported:

* `new Worker()` and `importScripts()` accept only `file:`, `data:`, and
  `blob:` URLs. Any other scheme makes `new Worker()` throw a
  `NotSupportedError` and `importScripts()` throw a `NetworkError`.
* A script that cannot be read makes `importScripts()` throw a `NetworkError`;
  for `new Worker()` it fires an `error` event at the `Worker` object.
* Redirects, the `nosniff` check, and HTTP MIME type validation do not apply.
  MIME types are validated only for `data:` and `blob:` URLs. The
  `credentials` option is validated for API compatibility but has no effect,
  since no network request is made.
* On the main thread, relative script URLs are resolved against the current
  working directory, because there is no document base URL. Within a worker
  they are resolved against the worker's own URL (as is done in the spec).
* For `blob:` URLs, the script must be held in memory, so blobs backed by a file,
  such as those returned by `fs.openAsBlob()`, cannot be used.

Type stripping only applies to module workers loaded from
`file:` URLs. The `type` option, not the file extension, decides how an entry is
run, so a `.cts` entry is still evaluated as an ES module.

### Differences from the HTML Standard

Besides script loading, mentioned above:

* Node.js has no origin model, so same-origin and cross-origin distinctions do
  not exist and `location.origin` is `'null'` for every supported scheme.
* `close()` terminates the worker immediately instead of following the
  specification's "closing flag" algorithm, so code remaining in the current
  task after `close()` is not executed.
* The worker global is the normal Node.js global object with
  `DedicatedWorkerGlobalScope` inserted into its prototype chain, rather than
  a fresh global created from the interface. Node.js globals such as
  `process`, `Buffer`, and `require()` remain available to worker scripts.
* `ErrorEvent`s dispatched at `Worker` instances include `message` and
  `error`, but `filename`, `lineno`, and `colno` are always `''`, `0`, and
  `0`. An uncaught exception terminates the worker thread, and an unhandled
  `error` event is not propagated further: it neither reaches the parent's
  global scope nor affects the exit code of the process.
* The following {WorkerGlobalScope} events are never dispatched, although
  their handler properties exist: `languagechange`, `online`, and `offline`,
  since these concepts do not exist in Node.js; `rejectionhandled` and
  `unhandledrejection`, since Node.js exposes the equivalent does not
  implement the `PromiseRejectionEvent` interface or the per-rejection
  `preventDefault()` behavior required by the HTML Standard.
* Module workers loaded from `file:` URLs support type stripping.

### Web Workers and `node:worker_threads`

Every Web Worker is backed by a `node:worker_threads` {Worker}, so the
two APIs share their threading, structured clone, and transfer semantics.
Inside a worker, \[`worker_threads.parentPort`]\[] is the port behind
`self.postMessage()` and the worker's `message` events, `isMainThread` is
`false`, and `workerData` is `undefined`.

Web Workers, like `node:worker_threads` workers, keep the event loop alive by
default. In Node.js, Web Workers implement the Refable protocol, and can be
ref'd and unref'd using `process.ref(worker)` and `process.unref(worker)`.

As a rule of thumb, use `node:worker_threads` directly when a program
needs `workerData`, a custom `env` or `execArgv`, resource limits, stdio
redirection, the `'online'` and `'exit'` events, or `worker.threadId`;
`Worker` accepts only the `name`, `type`, and `credentials` options and,
per the specification, its `terminate()` returns `undefined`, rather than
a promise. Threads started through `node:worker_threads` are ordinary
Node.js threads and do not get the worker global scope APIs.

## Class: `WritableStream`

A browser-compatible implementation of `WritableStream`.

## Class: `WritableStreamDefaultController`

A browser-compatible implementation of `WritableStreamDefaultController`.

## Class: `WritableStreamDefaultWriter`

A browser-compatible implementation of `WritableStreamDefaultWriter`.
