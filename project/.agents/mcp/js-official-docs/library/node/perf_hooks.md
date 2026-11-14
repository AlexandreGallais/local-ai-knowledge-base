---
title: "Performance measurement APIs (part 1 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/perf_hooks.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Performance measurement APIs

> Stability: 2 - Stable

This module provides an implementation of a subset of the W3C
Web Performance APIs as well as additional APIs for
Node.js-specific performance measurements.

Node.js supports the following Web Performance APIs:

* High Resolution Time
* Performance Timeline
* User Timing
* Resource Timing

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration);
  performance.clearMarks();
});
obs.observe({ type: 'measure' });
performance.measure('Start to Now');

performance.mark('A');
doSomeLongRunningProcess(() => {
  performance.measure('A to Now', 'A');

  performance.mark('B');
  performance.measure('A to B', 'A', 'B');
});
```

```cjs
const { PerformanceObserver, performance } = require('node:perf_hooks');

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration);
});
obs.observe({ type: 'measure' });
performance.measure('Start to Now');

performance.mark('A');
(async function doSomeLongRunningProcess() {
  await new Promise((r) => setTimeout(r, 5000));
  performance.measure('A to Now', 'A');

  performance.mark('B');
  performance.measure('A to B', 'A', 'B');
})();
```

## `perf_hooks.performance`

An object that can be used to collect performance metrics from the current
Node.js instance. It is similar to `window.performance` in browsers.

### `performance.clearMarks([name])`

* `name` {string}

If `name` is not provided, removes all `PerformanceMark` objects from the
Performance Timeline. If `name` is provided, removes only the named mark.

### `performance.clearMeasures([name])`

* `name` {string}

If `name` is not provided, removes all `PerformanceMeasure` objects from the
Performance Timeline. If `name` is provided, removes only the named measure.

### `performance.clearResourceTimings([name])`

* `name` {string}

If `name` is not provided, removes all `PerformanceResourceTiming` objects from
the Resource Timeline. If `name` is provided, removes only the named resource.

### `performance.eventLoopUtilization([utilization1[, utilization2]])`

* `utilization1` {Object} The result of a previous call to
  `eventLoopUtilization()`.
* `utilization2` {Object} The result of a previous call to
  `eventLoopUtilization()` prior to `utilization1`.
* Returns: {Object}
  * `idle` {number}
  * `active` {number}
  * `utilization` {number}

This is an alias of `perf_hooks.eventLoopUtilization()`.

_This property is an extension by Node.js. It is not available in Web browsers._

### `performance.getEntries()`

* Returns: {PerformanceEntry\[]}

Returns a list of `PerformanceEntry` objects in chronological order with
respect to `performanceEntry.startTime`. If you are only interested in
performance entries of certain types or that have certain names, see
`performance.getEntriesByType()` and `performance.getEntriesByName()`.

### `performance.getEntriesByName(name[, type])`

* `name` {string}
* `type` {string}
* Returns: {PerformanceEntry\[]}

Returns a list of `PerformanceEntry` objects in chronological order
with respect to `performanceEntry.startTime` whose `performanceEntry.name` is
equal to `name`, and optionally, whose `performanceEntry.entryType` is equal to
`type`.

### `performance.getEntriesByType(type)`

* `type` {string}
* Returns: {PerformanceEntry\[]}

Returns a list of `PerformanceEntry` objects in chronological order
with respect to `performanceEntry.startTime` whose `performanceEntry.entryType`
is equal to `type`.

### `performance.mark(name[, options])`

* `name` {string}
* `options` {Object}
  * `detail` {any} Additional optional detail to include with the mark.
  * `startTime` {number} An optional timestamp to be used as the mark time.
    **Default**: `performance.now()`.

Creates a new `PerformanceMark` entry in the Performance Timeline. A
`PerformanceMark` is a subclass of `PerformanceEntry` whose
`performanceEntry.entryType` is always `'mark'`, and whose
`performanceEntry.duration` is always `0`. Performance marks are used
to mark specific significant moments in the Performance Timeline.

The created `PerformanceMark` entry is put in the global Performance Timeline
and can be queried with `performance.getEntries`,
`performance.getEntriesByName`, and `performance.getEntriesByType`. When the
observation is performed, the entries should be cleared from the global
Performance Timeline manually with `performance.clearMarks`.

### `performance.markResourceTiming(timingInfo, requestedUrl, initiatorType, global, cacheMode, bodyInfo, responseStatus[, deliveryType])`

* `timingInfo` {Object} Fetch Timing Info
* `requestedUrl` {string} The resource url
* `initiatorType` {string} The initiator name, e.g: 'fetch'
* `global` {Object}
* `cacheMode` {string} The cache mode must be an empty string ('') or 'local'
* `bodyInfo` {Object} Fetch Response Body Info
* `responseStatus` {number} The response's status code
* `deliveryType` {string} The delivery type.  **Default:** `''`.

_This property is an extension by Node.js. It is not available in Web browsers._

Creates a new `PerformanceResourceTiming` entry in the Resource Timeline. A
`PerformanceResourceTiming` is a subclass of `PerformanceEntry` whose
`performanceEntry.entryType` is always `'resource'`. Performance resources
are used to mark moments in the Resource Timeline.

The created `PerformanceMark` entry is put in the global Resource Timeline
and can be queried with `performance.getEntries`,
`performance.getEntriesByName`, and `performance.getEntriesByType`. When the
observation is performed, the entries should be cleared from the global
Performance Timeline manually with `performance.clearResourceTimings`.

### `performance.measure(name[, startMarkOrOptions[, endMark]])`

* `name` {string}
* `startMarkOrOptions` {string|Object} Optional.
  * `detail` {any} Additional optional detail to include with the measure.
  * `duration` {number} Duration between start and end times.
  * `end` {number|string} Timestamp to be used as the end time, or a string
    identifying a previously recorded mark.
  * `start` {number|string} Timestamp to be used as the start time, or a string
    identifying a previously recorded mark.
* `endMark` {string} Optional. Must be omitted if `startMarkOrOptions` is an
  {Object}.

Creates a new `PerformanceMeasure` entry in the Performance Timeline. A
`PerformanceMeasure` is a subclass of `PerformanceEntry` whose
`performanceEntry.entryType` is always `'measure'`, and whose
`performanceEntry.duration` measures the number of milliseconds elapsed since
`startMark` and `endMark`.

The `startMark` argument may identify any _existing_ `PerformanceMark` in the
Performance Timeline, or _may_ identify any of the timestamp properties
provided by the `PerformanceNodeTiming` class. If the named `startMark` does
not exist, an error is thrown.

The optional `endMark` argument must identify any _existing_ `PerformanceMark`
in the Performance Timeline or any of the timestamp properties provided by the
`PerformanceNodeTiming` class. `endMark` will be `performance.now()`
if no parameter is passed, otherwise if the named `endMark` does not exist, an
error will be thrown.

The created `PerformanceMeasure` entry is put in the global Performance Timeline
and can be queried with `performance.getEntries`,
`performance.getEntriesByName`, and `performance.getEntriesByType`. When the
observation is performed, the entries should be cleared from the global
Performance Timeline manually with `performance.clearMeasures`.

### `performance.nodeTiming`

* Type: {PerformanceNodeTiming}

_This property is an extension by Node.js. It is not available in Web browsers._

An instance of the `PerformanceNodeTiming` class that provides performance
metrics for specific Node.js operational milestones.

### `performance.now()`

* Returns: {number}

Returns the current high resolution millisecond timestamp, where 0 represents
the start of the current `node` process.

### `performance.setResourceTimingBufferSize(maxSize)`

Sets the global performance resource timing buffer size to the specified number
of "resource" type performance entry objects.

By default the max buffer size is set to 250.

### `performance.timeOrigin`

* Type: {number}

The `timeOrigin` specifies the high resolution millisecond timestamp at
which the current `node` process began, measured in Unix time.

### `performance.timerify(fn[, options])`

* `fn` {Function}
* `options` {Object}
  * `histogram` {RecordableHistogram} A histogram object created using
    `perf_hooks.createHistogram()` that will record runtime durations in
    nanoseconds.

This is an alias of `perf_hooks.timerify()`.

_This property is an extension by Node.js. It is not available in Web browsers._

### `performance.toJSON()`

An object which is JSON representation of the `performance` object. It
is similar to `window.performance.toJSON` in browsers.

#### Event: `'resourcetimingbufferfull'`

The `'resourcetimingbufferfull'` event is fired when the global performance
resource timing buffer is full. Adjust resource timing buffer size with
`performance.setResourceTimingBufferSize()` or clear the buffer with
`performance.clearResourceTimings()` in the event listener to allow
more entries to be added to the performance timeline buffer.

## Class: `PerformanceEntry`

The constructor of this class is not exposed to users directly.

### `performanceEntry.duration`

* Type: {number}

The total number of milliseconds elapsed for this entry. This value will not
be meaningful for all Performance Entry types.

### `performanceEntry.entryType`

* Type: {string}

The type of the performance entry. It may be one of:

* `'dns'` (Node.js only)
* `'function'` (Node.js only)
* `'gc'` (Node.js only)
* `'http2'` (Node.js only)
* `'http'` (Node.js only)
* `'mark'` (available on the Web)
* `'measure'` (available on the Web)
* `'net'` (Node.js only)
* `'node'` (Node.js only)
* `'resource'` (available on the Web)

### `performanceEntry.name`

* Type: {string}

The name of the performance entry.

### `performanceEntry.startTime`

* Type: {number}

The high resolution millisecond timestamp marking the starting time of the
Performance Entry.

## Class: `PerformanceMark`

* Extends: {PerformanceEntry}

Exposes marks created via the `Performance.mark()` method.

### `performanceMark.detail`

* Type: {any}

Additional detail specified when creating with `Performance.mark()` method.

## Class: `PerformanceMeasure`

* Extends: {PerformanceEntry}

Exposes measures created via the `Performance.measure()` method.

The constructor of this class is not exposed to users directly.

### `performanceMeasure.detail`

* Type: {any}

Additional detail specified when creating with `Performance.measure()` method.
