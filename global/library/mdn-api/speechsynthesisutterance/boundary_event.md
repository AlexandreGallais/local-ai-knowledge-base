---
title: "SpeechSynthesisUtterance: boundary event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisutterance/boundary_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisUtterance: boundary event

The **`boundary`** event of the Web Speech API is fired when the spoken utterance reaches a word or sentence boundary.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("boundary", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onboundary = (event) => { }
```

## Event type

A `SpeechSynthesisEvent`. Inherits from `Event`.

## Examples

You can use the `boundary` event in an `addEventListener` method:

```js
utterThis.addEventListener("boundary", (event) => {
  console.log(
    `${event.name} boundary reached after ${event.elapsedTime} seconds.`,
  );
});
```

Or use the `onboundary` event handler property (but note that this replaces other event listeners added using `onboundary`, if any):

```js
utterThis.onboundary = (event) => {
  console.log(
    `${event.name} boundary reached after ${event.elapsedTime} seconds.`,
  );
};
```

## See also

- Web Speech API
