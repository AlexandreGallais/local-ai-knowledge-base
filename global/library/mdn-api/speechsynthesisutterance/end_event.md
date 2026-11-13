---
title: "SpeechSynthesisUtterance: end event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisutterance/end_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisUtterance: end event

The **`end`** event of the Web Speech API `SpeechSynthesisUtterance` object is fired when the utterance has finished being spoken.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("end", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onend = (event) => { }
```

## Event type

A `SpeechSynthesisEvent`. Inherits from `Event`.

## Examples

You can use the `end` event in an `addEventListener` method:

```js
utterThis.addEventListener("end", (event) => {
  console.log(
    `Utterance has finished being spoken after ${event.elapsedTime} seconds.`,
  );
});
```

Or use the `onend` event handler property (but note that this replaces other event listeners added using `onend`, if any):

```js
utterThis.onend = (event) => {
  console.log(
    `Utterance has finished being spoken after ${event.elapsedTime} seconds.`,
  );
};
```

## See also

- Web Speech API
