---
title: "PromiseRejectionEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/promiserejectionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PromiseRejectionEvent

The **`PromiseRejectionEvent`** interface represents events which are sent to the global script context when JavaScript `Promise`s are rejected. These events are particularly useful for telemetry and debugging purposes.

For details, see Promise rejection events.

## Constructor

- `PromiseRejectionEvent()`
    Creates a `PromiseRejectionEvent` event, given the type of event (`unhandledrejection` or `rejectionhandled`) and other details.

## Instance properties

_Also inherits properties from its parent `Event`_.

- `PromiseRejectionEvent.promise` (read-only)
    The JavaScript `Promise` that was rejected.
- `PromiseRejectionEvent.reason` (read-only)
    A value or `Object` indicating why the promise was rejected, as passed to `Promise.reject()`.

## Instance methods

_This interface has no unique methods; inherits methods from its parent `Event`_.

## Events

- `rejectionhandled`
    Fired when a JavaScript `Promise` is rejected, and after the rejection is handled by the promise's rejection handling code.
- `unhandledrejection`
    Fired when a JavaScript `Promise` is rejected but there is no rejection handler to deal with the rejection.

## Examples

This simple example catches unhandled promise rejections and logs them for debugging purposes.

```js
window.onunhandledrejection = (e) => {
  console.log(e.reason);
};
```

## See also

- Using promises
- `Promise`
- `rejectionhandled`
- `unhandledrejection`
