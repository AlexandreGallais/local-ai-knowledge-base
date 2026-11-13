---
title: "WorkerGlobalScope: error event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/error_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: error event

The **`error`** event of the `WorkerGlobalScope` interface fires when an error occurs in the worker.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("error", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onerror = (message, filename, lineno, colno, error) => { }
```

> **Note:**
> For historical reasons, `onerror` on `Window` and `WorkerGlobalScope` objects is the only event handler property that receives more than one argument.
>
> For more details about this, see the page for the `error` event on `Window` objects.

## Event type

A generic `Event`.

## Example

The following code snippet shows an `onerror` handler set inside a worker (but note that this replaces other event listeners added using `onerror`, if any):

```js
self.onerror = () => {
  console.log("There is an error inside your worker!");
};
```

The same snippet, but using `addEventListener()`:

```js
self.addEventListener("error", () => {
  console.log("There is an error inside your worker!");
});
```

## See also

The `WorkerGlobalScope` interface it belongs to.
