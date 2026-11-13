---
title: "Performance measurement APIs (part 3 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/perf_hooks.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Performance measurement APIs (part 3 of 7)

## Class: `PerformanceResourceTiming`

* Extends: {PerformanceEntry}

Provides detailed network timing data regarding the loading of an application's
resources.

The constructor of this class is not exposed to users directly.

### `performanceResourceTiming.workerStart`

* Type: {number}

The high resolution millisecond timestamp at immediately before dispatching
the `fetch` request. If the resource is not intercepted by a worker the property
will always return 0.

### `performanceResourceTiming.redirectStart`

* Type: {number}

The high resolution millisecond timestamp that represents the start time
of the fetch which initiates the redirect.

### `performanceResourceTiming.redirectEnd`

* Type: {number}

The high resolution millisecond timestamp that will be created immediately after
receiving the last byte of the response of the last redirect.

### `performanceResourceTiming.fetchStart`

* Type: {number}

The high resolution millisecond timestamp immediately before the Node.js starts
to fetch the resource.

### `performanceResourceTiming.domainLookupStart`

* Type: {number}

The high resolution millisecond timestamp immediately before the Node.js starts
the domain name lookup for the resource.

### `performanceResourceTiming.domainLookupEnd`

* Type: {number}

The high resolution millisecond timestamp representing the time immediately
after the Node.js finished the domain name lookup for the resource.

### `performanceResourceTiming.connectStart`

* Type: {number}

The high resolution millisecond timestamp representing the time immediately
before Node.js starts to establish the connection to the server to retrieve
the resource.

### `performanceResourceTiming.connectEnd`

* Type: {number}

The high resolution millisecond timestamp representing the time immediately
after Node.js finishes establishing the connection to the server to retrieve
the resource.

### `performanceResourceTiming.secureConnectionStart`

* Type: {number}

The high resolution millisecond timestamp representing the time immediately
before Node.js starts the handshake process to secure the current connection.

### `performanceResourceTiming.requestStart`

* Type: {number}

The high resolution millisecond timestamp representing the time immediately
before Node.js receives the first byte of the response from the server.

### `performanceResourceTiming.finalResponseHeadersStart`

* Type: {number}

The high resolution millisecond timestamp representing the time immediately
after Node.js receives the first byte of the final response,
as opposed to an interim response.

### `performanceResourceTiming.firstInterimResponseStart`

* Type: {number}

The high resolution millisecond timestamp representing the time immediately
after Node.js receives the first byte of the first interim response, such as
a `103 Early Hints` response.

### `performanceResourceTiming.responseStart`

* Type: {number}

The high resolution millisecond timestamp representing the time immediately
after Node.js receives the first byte of the response from the server. This
is `firstInterimResponseStart` when it is non-zero, and
`finalResponseHeadersStart` otherwise.

### `performanceResourceTiming.responseEnd`

* Type: {number}

The high resolution millisecond timestamp representing the time immediately
after Node.js receives the last byte of the resource or immediately before
the transport connection is closed, whichever comes first.

### `performanceResourceTiming.transferSize`

* Type: {number}

A number representing the size (in octets) of the fetched resource. The size
includes the response header fields plus the response payload body.

### `performanceResourceTiming.encodedBodySize`

* Type: {number}

A number representing the size (in octets) received from the fetch
(HTTP or cache), of the payload body, before removing any applied
content-codings.

### `performanceResourceTiming.decodedBodySize`

* Type: {number}

A number representing the size (in octets) received from the fetch
(HTTP or cache), of the message body, after removing any applied
content-codings.

### `performanceResourceTiming.renderBlockingStatus`

* Type: {string}

The render blocking status of the resource. It is either `'blocking'` or `'non-blocking'`.

### `performanceResourceTiming.contentType`

* Type: {string}

The minimized MIME type of the content of the fetched resource, or an empty
string if it cannot be determined.

### `performanceResourceTiming.contentEncoding`

* Type: {string}

The content encoding of the fetched resource, such as `'gzip'` or `'br'`.

### `performanceResourceTiming.toJSON()`

Returns a `object` that is the JSON representation of the
`PerformanceResourceTiming` object

## Class: `PerformanceObserver`

### `PerformanceObserver.supportedEntryTypes`

* Type: {string\[]}

Get supported types.

### `new PerformanceObserver(callback)`

* `callback` {Function}
  * `list` {PerformanceObserverEntryList}
  * `observer` {PerformanceObserver}

`PerformanceObserver` objects provide notifications when new
`PerformanceEntry` instances have been added to the Performance Timeline.

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries());

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['mark'], buffered: true });

performance.mark('test');
```

```cjs
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries());

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['mark'], buffered: true });

performance.mark('test');
```

Because `PerformanceObserver` instances introduce their own additional
performance overhead, instances should not be left subscribed to notifications
indefinitely. Users should disconnect observers as soon as they are no
longer needed.

The `callback` is invoked when a `PerformanceObserver` is
notified about new `PerformanceEntry` instances. The callback receives a
`PerformanceObserverEntryList` instance and a reference to the
`PerformanceObserver`.

### `performanceObserver.disconnect()`

Disconnects the `PerformanceObserver` instance from all notifications.

### `performanceObserver.observe(options)`

* `options` {Object}
  * `type` {string} A single {PerformanceEntry} type. Must not be given
    if `entryTypes` is already specified.
  * `entryTypes` {string\[]} An array of strings identifying the types of
    {PerformanceEntry} instances the observer is interested in. If not
    provided an error will be thrown.
  * `buffered` {boolean} If true, the observer callback is called with a
    list global `PerformanceEntry` buffered entries. If false, only
    `PerformanceEntry`s created after the time point are sent to the
    observer callback. **Default:** `false`.

Subscribes the {PerformanceObserver} instance to notifications of new
{PerformanceEntry} instances identified either by `options.entryTypes`
or `options.type`:

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((list, observer) => {
  // Called once asynchronously. `list` contains three items.
});
obs.observe({ type: 'mark' });

for (let n = 0; n < 3; n++)
  performance.mark(`test${n}`);
```

```cjs
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((list, observer) => {
  // Called once asynchronously. `list` contains three items.
});
obs.observe({ type: 'mark' });

for (let n = 0; n < 3; n++)
  performance.mark(`test${n}`);
```

### `performanceObserver.takeRecords()`

* Returns: {PerformanceEntry\[]} Current list of entries stored in the performance observer, emptying it out.

## Class: `PerformanceObserverEntryList`

The `PerformanceObserverEntryList` class is used to provide access to the
`PerformanceEntry` instances passed to a `PerformanceObserver`.
The constructor of this class is not exposed to users.

### `performanceObserverEntryList.getEntries()`

* Returns: {PerformanceEntry\[]}

Returns a list of `PerformanceEntry` objects in chronological order
with respect to `performanceEntry.startTime`.

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntries());
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 81.465639,
   *     duration: 0,
   *     detail: null
   *   },
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 81.860064,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ type: 'mark' });

performance.mark('test');
performance.mark('meow');
```

```cjs
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntries());
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 81.465639,
   *     duration: 0,
   *     detail: null
   *   },
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 81.860064,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ type: 'mark' });

performance.mark('test');
performance.mark('meow');
```

### `performanceObserverEntryList.getEntriesByName(name[, type])`

* `name` {string}
* `type` {string}
* Returns: {PerformanceEntry\[]}

Returns a list of `PerformanceEntry` objects in chronological order
with respect to `performanceEntry.startTime` whose `performanceEntry.name` is
equal to `name`, and optionally, whose `performanceEntry.entryType` is equal to
`type`.

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntriesByName('meow'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 98.545991,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */
  console.log(perfObserverList.getEntriesByName('nope')); // []

  console.log(perfObserverList.getEntriesByName('test', 'mark'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 63.518931,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */
  console.log(perfObserverList.getEntriesByName('test', 'measure')); // []

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['mark', 'measure'] });

performance.mark('test');
performance.mark('meow');
```

```cjs
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntriesByName('meow'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 98.545991,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */
  console.log(perfObserverList.getEntriesByName('nope')); // []

  console.log(perfObserverList.getEntriesByName('test', 'mark'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 63.518931,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */
  console.log(perfObserverList.getEntriesByName('test', 'measure')); // []

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['mark', 'measure'] });

performance.mark('test');
performance.mark('meow');
```

### `performanceObserverEntryList.getEntriesByType(type)`

* `type` {string}
* Returns: {PerformanceEntry\[]}

Returns a list of `PerformanceEntry` objects in chronological order
with respect to `performanceEntry.startTime` whose `performanceEntry.entryType`
is equal to `type`.

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntriesByType('mark'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 55.897834,
   *     duration: 0,
   *     detail: null
   *   },
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 56.350146,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */
  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ type: 'mark' });

performance.mark('test');
performance.mark('meow');
```

```cjs
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntriesByType('mark'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 55.897834,
   *     duration: 0,
   *     detail: null
   *   },
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 56.350146,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */
  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ type: 'mark' });

performance.mark('test');
performance.mark('meow');
```
