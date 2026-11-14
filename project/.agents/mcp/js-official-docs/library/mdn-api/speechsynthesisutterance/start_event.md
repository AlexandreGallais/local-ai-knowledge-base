---
title: "SpeechSynthesisUtterance: start event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisutterance/start_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisUtterance: start event

The **`start`** event of the Web Speech API `SpeechSynthesisUtterance` object is fired when the utterance has begun to be spoken.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("start", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onstart = (event) => { }
```

## Event type

A `SpeechSynthesisEvent`. Inherits from `Event`.

## Examples

You can use the `start` event in an `addEventListener` method:

```js
utterThis.addEventListener("start", (event) => {
  console.log(`We have started uttering this speech: ${event.utterance.text}`);
});
```

Or use the `onstart` event handler property (but note that this replaces other event listeners added using `onstart`, if any):

```js
utterThis.onstart = (event) => {
  console.log(`We have started uttering this speech: ${event.utterance.text}`);
};
```

## See also

- Web Speech API
