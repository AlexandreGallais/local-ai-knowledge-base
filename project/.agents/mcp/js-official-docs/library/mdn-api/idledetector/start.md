---
title: "IdleDetector: start() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idledetector/start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdleDetector: start() method

The **`start()`** method of the `IdleDetector` interface returns a
`Promise` that resolves when the detector starts listening for changes in the
user's idle state. This
method takes an optional `options` object with the `threshold` in milliseconds
where inactivity should be reported and `signal` for an `AbortSignal` to abort
the idle detector.

## Syntax

```js
start()
start(options)
```

### Parameters

- `options` (optional)
    An object with the following properties:
    - `threshold`
        The minimum number of idle milliseconds before reporting should begin.
    - `signal`
        A reference to an `AbortSignal` instance allowing you to abort idle detection.

### Return value

A `Promise`.

### Exceptions

- `NotAllowedError` `DOMException`
    Use of this feature was blocked by a Permissions Policy.

## Examples

The following example shows how to start idle detection using the `options` argument. It retrieves an instance of `AbortSignal` from an instance of `AbortController`.

```js
const controller = new AbortController();
const signal = controller.signal;

await idleDetector.start({
  threshold: 60_000,
  signal,
});
console.log("IdleDetector is active.");
```
