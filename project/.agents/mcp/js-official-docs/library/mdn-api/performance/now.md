---
title: "Performance: now() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/now/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: now() method

The **`performance.now()`** method returns a high resolution timestamp in milliseconds. It represents the time elapsed since `Performance.timeOrigin` (the time when navigation has started in window contexts, or the time when the worker is run in `Worker` and `ServiceWorker` contexts).

## Syntax

```js
now()
```

### Parameters

None.

### Return value

Returns a `DOMHighResTimeStamp` measured in milliseconds.

## Description

### `Performance.now` vs. `Date.now`

Unlike `Date.now`, the timestamps returned by `performance.now()` are not limited to one-millisecond resolution. Instead, they represent times as floating-point numbers with up to microsecond precision.

Also, `Date.now()` may have been impacted by system and user clock adjustments, clock skew, etc. as it is relative to the Unix epoch (1970-01-01T00:00:00Z) and dependent on the system clock.
The `performance.now()` method on the other hand is relative to the `timeOrigin` property which is a monotonic clock: its current time never decreases and isn't subject to adjustments.

### `performance.now` specification changes

The semantics of the `performance.now()` method changed between High Resolution Time Level 1 and Level 2.

| Changes               | Level 1                                                                                       | Level 2                                                                                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Relative to           | `performance.timing.navigationStart` | `Performance.timeOrigin`                                                                                                                       |
| Triggering conditions | Document fetch or unload prompt (if any).                                                     | Creation of the browsing context (if no prior document), unload prompt (if any), or start of the navigation (as defined in HTML, a few steps before fetch). |

The `performance.now()` method used to be relative to `performance.timing.navigationStart` property from the Navigation Timing specification. This changed and `performance.now()` is now relative to `Performance.timeOrigin` which avoids clock change risks when comparing timestamps across webpages.

```js
// Level 1 (clock change risks)
currentTime = performance.timing.navigationStart + performance.now();

// Level 2 (no clock change risks)
currentTime = performance.timeOrigin + performance.now();
```

### Ticking during sleep

The specification (Level 2) requires that `performance.now()` should tick when the operating system sleeps or the browser process freezes in any other way. It appears that only browsers on Windows keep ticking during sleep. Relevant browser bugs for other operating systems:

- Chrome/Chromium (bug)
- Firefox (bug)
- Safari/WebKit (bug)

Depending on your use case, this divergence may or may not be significant. For example, if you are timing short operations such as loading an image, during which time the system is unlikely to sleep, this may not cause any issues. If you are timing a long operation, you may find `Date.now()` more useful to avoid these limitations, since the high precision of `performance.now()` may not be as critical anyway.

More details can also be found in the specification issue hr-time#115.

## Security requirements

To offer protection against timing attacks and fingerprinting, `performance.now()` is coarsened based on whether or not the document is `cross-origin isolated`.

- Resolution in isolated contexts: 5 microseconds
- Resolution in non-isolated contexts: 100 microseconds

You can use the `Window.crossOriginIsolated` and `WorkerGlobalScope.crossOriginIsolated` properties to check if the document is cross-origin isolated:

```js
if (crossOriginIsolated) {
  // Use measureUserAgentSpecificMemory
}
```

## Examples

### Using `performance.now()`

To determine how much time has elapsed since a particular point in your code, you can do something like this:

```js
const t0 = performance.now();
doSomething();
const t1 = performance.now();
console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
```

## See also

- `Performance.timeOrigin`
