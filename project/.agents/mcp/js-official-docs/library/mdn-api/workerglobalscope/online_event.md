---
title: "WorkerGlobalScope: online event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/online_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: online event

The **`online`** event of the `WorkerGlobalScope` fires when the device reconnects to the internet.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("online", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ononline = (event) => { }
```

## Event type

A generic `Event`.

## Example

The following code snippet shows an `ononline` handler set inside a worker (but note that this replaces other event listeners added using `ononline`, if any):

```js
self.ononline = () => {
  console.log("Your worker is now online");
};
```

The same snippet, but using `addEventListener()`:

```js
self.addEventListener("online", () => {
  console.log("Your worker is now online");
});
```

## See also

The `WorkerGlobalScope` interface it belongs to.
