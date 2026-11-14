---
title: "SpeechSynthesisUtterance: resume event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisutterance/resume_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisUtterance: resume event

The **`resume`** event of the Web Speech API `SpeechSynthesisUtterance` object is fired when a paused utterance is resumed.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("resume", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onresume = (event) => { }
```

## Event type

A `SpeechSynthesisEvent`. Inherits from `Event`.

## Examples

You can use the `resume` event in an `addEventListener` method:

```js
utterThis.addEventListener("resume", (event) => {
  console.log(`Speech resumed after ${event.elapsedTime} seconds.`);
});
```

Or use the `onresume` event handler property (but note that this replaces other event listeners added using `onresume`, if any):

```js
utterThis.onresume = (event) => {
  console.log(`Speech resumed after ${event.elapsedTime} seconds.`);
};
```

## See also

- Web Speech API
