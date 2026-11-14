---
title: "CrashReportContext: initialize() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/crashreportcontext/initialize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CrashReportContext: initialize() method

The **`initialize()`** method of the `CrashReportContext` interface initializes a portion of memory to be used for storing crash report data specified by `set()`. This must be called before any other method is invoked on the object.

## Syntax

```js
initialize(length)
```

### Parameters

- `length`
    A number indicating the maximum number of bytes that can be stored in the key-value store by each individual `set()` call. The maximum allowable value is `65536` (64KB), which is also the maximum amount of crash report memory allowed for one origin.

### Return value

A `Promise` that fulfills with `undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if:
    - The calling document is not fully active.
    - A crash report key-value store was already initialized by a previous `initialize()` call.
- `NotAllowedError` `DOMException`
    `length` is more than `65536`.

## Examples

### Basic usage

```js
window.crashReport.initialize(1024).then(() => {
  // Do stuff with crash reporting API
});
```

## See also

- Reporting API
