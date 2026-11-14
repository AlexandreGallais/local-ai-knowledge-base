---
title: "Performance measurement APIs (part 2 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/perf_hooks.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Performance measurement APIs (part 2 of 7)

## Class: `PerformanceNodeEntry`

* Extends: {PerformanceEntry}

_This class is an extension by Node.js. It is not available in Web browsers._

Provides detailed Node.js timing data.

The constructor of this class is not exposed to users directly.

### `performanceNodeEntry.detail`

* Type: {any}

Additional detail specific to the `entryType`.

### `performanceNodeEntry.flags`

> Stability: 0 - Deprecated: Use `performanceNodeEntry.detail` instead.

* Type: {number}

When `performanceEntry.entryType` is equal to `'gc'`, the `performance.flags`
property contains additional information about garbage collection operation.
The value may be one of:

* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_NO`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_CONSTRUCT_RETAINED`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_FORCED`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SYNCHRONOUS_PHANTOM_PROCESSING`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_EXTERNAL_MEMORY`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SCHEDULE_IDLE`

### `performanceNodeEntry.kind`

> Stability: 0 - Deprecated: Use `performanceNodeEntry.detail` instead.

* Type: {number}

When `performanceEntry.entryType` is equal to `'gc'`, the `performance.kind`
property identifies the type of garbage collection operation that occurred.
The value may be one of:

* `perf_hooks.constants.NODE_PERFORMANCE_GC_MAJOR`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_MINOR`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_MINOR_MARK_SWEEP`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_INCREMENTAL`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_WEAKCB`

### Garbage Collection ('gc') Details

When `performanceEntry.type` is equal to `'gc'`, the
`performanceNodeEntry.detail` property will be an {Object} with two properties:

* `kind` {number} One of:
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_MAJOR`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_MINOR`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_MINOR_MARK_SWEEP`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_INCREMENTAL`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_WEAKCB`
* `flags` {number} One of:
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_NO`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_CONSTRUCT_RETAINED`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_FORCED`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SYNCHRONOUS_PHANTOM_PROCESSING`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_EXTERNAL_MEMORY`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SCHEDULE_IDLE`

### HTTP ('http') Details

When `performanceEntry.type` is equal to `'http'`, the
`performanceNodeEntry.detail` property will be an {Object} containing
additional information.

If `performanceEntry.name` is equal to `HttpClient`, the `detail`
will contain the following properties: `req`, `res`. And the `req` property
will be an {Object} containing `method`, `url`, `headers`, the `res` property
will be an {Object} containing `statusCode`, `statusMessage`, `headers`.

If `performanceEntry.name` is equal to `HttpRequest`, the `detail`
will contain the following properties: `req`, `res`. And the `req` property
will be an {Object} containing `method`, `url`, `headers`, the `res` property
will be an {Object} containing `statusCode`, `statusMessage`, `headers`.

This could add additional memory overhead and should only be used for
diagnostic purposes, not left turned on in production by default.

### HTTP/2 ('http2') Details

When `performanceEntry.type` is equal to `'http2'`, the
`performanceNodeEntry.detail` property will be an {Object} containing
additional performance information.

If `performanceEntry.name` is equal to `Http2Stream`, the `detail`
will contain the following properties:

* `bytesRead` {number} The number of `DATA` frame bytes received for this
  `Http2Stream`.
* `bytesWritten` {number} The number of `DATA` frame bytes sent for this
  `Http2Stream`.
* `id` {number} The identifier of the associated `Http2Stream`
* `timeToFirstByte` {number} The number of milliseconds elapsed between the
  `PerformanceEntry` `startTime` and the reception of the first `DATA` frame.
* `timeToFirstByteSent` {number} The number of milliseconds elapsed between
  the `PerformanceEntry` `startTime` and sending of the first `DATA` frame.
* `timeToFirstHeader` {number} The number of milliseconds elapsed between the
  `PerformanceEntry` `startTime` and the reception of the first header.

If `performanceEntry.name` is equal to `Http2Session`, the `detail` will
contain the following properties:

* `bytesRead` {number} The number of bytes received for this `Http2Session`.
* `bytesWritten` {number} The number of bytes sent for this `Http2Session`.
* `framesReceived` {number} The number of HTTP/2 frames received by the
  `Http2Session`.
* `framesSent` {number} The number of HTTP/2 frames sent by the `Http2Session`.
* `maxConcurrentStreams` {number} The maximum number of streams concurrently
  open during the lifetime of the `Http2Session`.
* `pingRTT` {number} The number of milliseconds elapsed since the transmission
  of a `PING` frame and the reception of its acknowledgment. Only present if
  a `PING` frame has been sent on the `Http2Session`.
* `streamAverageDuration` {number} The average duration (in milliseconds) for
  all `Http2Stream` instances.
* `streamCount` {number} The number of `Http2Stream` instances processed by
  the `Http2Session`.
* `type` {string} Either `'server'` or `'client'` to identify the type of
  `Http2Session`.

### Timerify ('function') Details

When `performanceEntry.type` is equal to `'function'`, the
`performanceNodeEntry.detail` property will be an {Array} listing
the input arguments to the timed function.

### Net ('net') Details

When `performanceEntry.type` is equal to `'net'`, the
`performanceNodeEntry.detail` property will be an {Object} containing
additional information.

If `performanceEntry.name` is equal to `connect`, the `detail`
will contain the following properties: `host`, `port`.

### DNS ('dns') Details

When `performanceEntry.type` is equal to `'dns'`, the
`performanceNodeEntry.detail` property will be an {Object} containing
additional information.

If `performanceEntry.name` is equal to `lookup`, the `detail`
will contain the following properties: `hostname`, `family`, `hints`, `verbatim`,
`addresses`.

If `performanceEntry.name` is equal to `lookupService`, the `detail` will
contain the following properties: `host`, `port`, `hostname`, `service`.

If `performanceEntry.name` is equal to `queryxxx` or `getHostByAddr`, the `detail` will
contain the following properties: `host`, `ttl`, `result`. The value of `result` is
same as the result of `queryxxx` or `getHostByAddr`.

## Class: `PerformanceNodeTiming`

* Extends: {PerformanceEntry}

_This property is an extension by Node.js. It is not available in Web browsers._

Provides timing details for Node.js itself. The constructor of this class
is not exposed to users.

### `performanceNodeTiming.bootstrapComplete`

* Type: {number}

The high resolution millisecond timestamp at which the Node.js process
completed bootstrapping. If bootstrapping has not yet finished, the property
has the value of -1.

### `performanceNodeTiming.environment`

* Type: {number}

The high resolution millisecond timestamp at which the Node.js environment was
initialized.

### `performanceNodeTiming.idleTime`

* Type: {number}

The high resolution millisecond timestamp of the amount of time the event loop
has been idle within the event loop's event provider (e.g. `epoll_wait`). This
does not take CPU usage into consideration. If the event loop has not yet
started (e.g., in the first tick of the main script), the property has the
value of 0.

### `performanceNodeTiming.loopExit`

* Type: {number}

The high resolution millisecond timestamp at which the Node.js event loop
exited. If the event loop has not yet exited, the property has the value of -1.
It can only have a value of not -1 in a handler of the `'exit'` event.

### `performanceNodeTiming.loopStart`

* Type: {number}

The high resolution millisecond timestamp at which the Node.js event loop
started. If the event loop has not yet started (e.g., in the first tick of the
main script), the property has the value of -1.

### `performanceNodeTiming.nodeStart`

* Type: {number}

The high resolution millisecond timestamp at which the Node.js process was
initialized.

### `performanceNodeTiming.uvMetricsInfo`

* Type: {Object}
  * `loopCount` {number} Number of event loop iterations.
  * `events` {number} Number of events that have been processed by the event handler.
  * `eventsWaiting` {number} Number of events that were waiting to be processed when the event provider was called.

This is a wrapper to the `uv_metrics_info` function.
It returns the current set of event loop metrics.

The values are exact up to `Number.MAX_SAFE_INTEGER`. Use
`performanceNodeTiming.uvMetricsInfoBigInt` to obtain the full 64-bit
values reported by libuv.

It is recommended to use this property inside a function whose execution was
scheduled using `setImmediate` to avoid collecting metrics before finishing all
operations scheduled during the current loop iteration.

```cjs
const { performance } = require('node:perf_hooks');

setImmediate(() => {
  console.log(performance.nodeTiming.uvMetricsInfo);
});
```

```mjs
import { performance } from 'node:perf_hooks';

setImmediate(() => {
  console.log(performance.nodeTiming.uvMetricsInfo);
});
```

### `performanceNodeTiming.uvMetricsInfoBigInt`

* Type: {Object}
  * `loopCount` {bigint} Number of event loop iterations.
  * `events` {bigint} Number of events that have been processed by the event handler.
  * `eventsWaiting` {bigint} Number of events that were waiting to be processed when the event provider was called.

The same as `performanceNodeTiming.uvMetricsInfo`, except that the values
are {bigint}s carrying the full 64-bit range reported by libuv.

Because `JSON.stringify()` cannot serialize {bigint} values, this property is
not enumerable and is not included in the output of
`performanceNodeTiming.toJSON()`. Copies of `performance.nodeTiming` made by
spreading its enumerable properties, for example, remain serializable.

```cjs
const { performance } = require('node:perf_hooks');

setImmediate(() => {
  console.log(performance.nodeTiming.uvMetricsInfoBigInt);
});
```

```mjs
import { performance } from 'node:perf_hooks';

setImmediate(() => {
  console.log(performance.nodeTiming.uvMetricsInfoBigInt);
});
```

### `performanceNodeTiming.v8Start`

* Type: {number}

The high resolution millisecond timestamp at which the V8 platform was
initialized.
