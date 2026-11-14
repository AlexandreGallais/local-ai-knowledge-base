---
title: "AudioWorkletNode: processorerror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioworkletnode/processorerror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioWorkletNode: processorerror event

The `processorerror` event fires when the underlying `AudioWorkletProcessor` behind the node throws an exception in its constructor, the `process` method, or any user-defined class method.

Once an exception is thrown, the processor (and thus the node) will output silence throughout its lifetime.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("processorerror", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onprocessorerror = (event) => { }
```

## Event type

A generic `Event`.

## Examples

To be informed when the processor throws an exception, you can add a handler to your `AudioWorkletNode` instance using `addEventListener()`, like this:

```js
whiteNoiseNode.addEventListener("processorerror", (event) => {
  console.error("There was an error!");
});
```

Alternatively, you can use the `onprocessorerror` event handler property to establish a handler for the `processorerror` event (but note that this replaces other event listeners added using `onprocessorerror`, if any):

```js
whiteNoiseNode.onprocessorerror = (event) => {
  console.error("There was an error!");
};
```

## See also

- Using the Web Audio API
