---
title: "SpeechSynthesisUtterance: pause event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisutterance/pause_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisUtterance: pause event

The **`pause`** event of the Web Speech API `SpeechSynthesisUtterance` object is fired when the utterance is paused part way through.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pause", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpause = (event) => { }
```

## Event type

A `SpeechSynthesisEvent`. Inherits from `Event`.

## Examples

You can use the `pause` event in an `addEventListener` method:

```js
utterThis.addEventListener("pause", (event) => {
  console.log(`Speech paused after ${event.elapsedTime} seconds.`);
});
```

Or use the `onpause` event handler property (but note that this replaces other event listeners added using `onpause`, if any):

```js
utterThis.onpause = (event) => {
  console.log(`Speech paused after ${event.elapsedTime} seconds.`);
};
```

## See also

- Web Speech API
