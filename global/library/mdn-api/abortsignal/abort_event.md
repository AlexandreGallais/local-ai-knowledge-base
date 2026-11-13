---
title: "AbortSignal: abort event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/abortsignal/abort_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbortSignal: abort event

The **`abort`** event of the `AbortSignal` is fired when the associated request is aborted, i.e., using `AbortController.abort()`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("abort", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onabort = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

In the following snippets, we create a new `AbortController` object, and get its `AbortSignal` (available using the `signal` property). Later on we check whether or not the signal has been aborted using an event handler property,

You can detect the `abort` event using an `addEventListener` method:

```js
const controller = new AbortController();
const signal = controller.signal;

signal.addEventListener("abort", () => {
  console.log("Request aborted");
});
```

Or use the `onabort` event handler property (but note that this replaces other event listeners added using `onabort`, if any):

```js
const controller = new AbortController();
const signal = controller.signal;

signal.onabort = () => {
  console.log("Request aborted");
};
```
