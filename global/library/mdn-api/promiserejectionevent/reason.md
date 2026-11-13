---
title: "PromiseRejectionEvent: reason property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/promiserejectionevent/reason/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PromiseRejectionEvent: reason property

The `PromiseRejectionEvent` **`reason`** read-only
property is any JavaScript value or `Object` which provides the reason
passed into `Promise.reject()`. This in theory provides information about
why the promise was rejected.

## Value

A value or object which provides information you can use to understand why the promise
was rejected. This could be anything from an error code to an object with text, links,
and whatever else you might wish to include.

## Examples

```js
window.onunhandledrejection = (e) => {
  console.log(e.reason);
};
```

## See also

- `Promise`
- `PromiseRejectionEvent`
- `rejectionhandled`
- `unhandledrejection`
