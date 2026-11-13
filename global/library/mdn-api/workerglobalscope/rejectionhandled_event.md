---
title: "WorkerGlobalScope: rejectionhandled event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/rejectionhandled_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: rejectionhandled event

The **`rejectionhandled`** event is sent to the script's global scope (typically `WorkerGlobalScope`) whenever a rejected `Promise` is handled late, i.e., when a handler is attached to the promise after its rejection had caused an `unhandledrejection` event.

This can be used in debugging and for general application resiliency, in tandem with the `unhandledrejection` event, which is sent when a promise is rejected but there is no handler for the rejection at the time.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("rejectionhandled", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onrejectionhandled = (event) => { }
```

## Event type

A `PromiseRejectionEvent`. Inherits from `Event`.

## Example

You can use the `rejectionhandled` event to log promises that get rejected to the console, along with the reasons why they were rejected:

```js
self.addEventListener("rejectionhandled", (event) => {
  console.log(`Promise rejected; reason: ${event.reason}`);
});
```

## See also

- Promise rejection events
- `PromiseRejectionEvent`
- `Promise`
- `unhandledrejection`
