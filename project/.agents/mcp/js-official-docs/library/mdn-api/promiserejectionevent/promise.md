---
title: "PromiseRejectionEvent: promise property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/promiserejectionevent/promise/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PromiseRejectionEvent: promise property

The `PromiseRejectionEvent` interface's
**`promise`** read-only property indicates the JavaScript
`Promise` which was rejected. You can examine the event's
`PromiseRejectionEvent.reason` property to learn why the promise was
rejected.

## Value

The JavaScript `Promise` which was rejected, and whose rejection went
unhandled.

## Examples

This example listens for unhandled promises and, if the
`reason` is an object with a
`code` field containing the text "Module not ready", it sets up an idle
callback that will retry the task that failed to execute correctly.

`event.preventDefault()` is called to indicate that the promise has now
been handled.

```js
window.onunhandledrejection = (event) => {
  if (event.reason?.code === "Module not ready") {
    requestIdleCallback((deadline) => {
      loadModule(event.reason.moduleName).then(performStartup);
    });
    event.preventDefault();
  }
};
```

## See also

- Promise rejection events
- `Promise`
- `PromiseRejectionEvent`
- `rejectionhandled`
- `unhandledrejection`
