---
title: "SpeechSynthesisUtterance: mark event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisutterance/mark_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisUtterance: mark event

The **`mark`** event of the Web Speech API `SpeechSynthesisUtterance` object is fired when the spoken utterance reaches a named SSML "mark" tag.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("mark", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmark = (event) => { }
```

## Event type

A `SpeechSynthesisEvent`. Inherits from `Event`.

## Examples

You can use the `mark` event in an `addEventListener` method:

```js
utterThis.addEventListener("mark", (event) => {
  console.log(`A mark was reached: ${event.name}`);
});
```

Or use the `onmark` event handler property (but note that this replaces other event listeners added using `onmark`, if any):

```js
utterThis.onmark = (event) => {
  console.log(`A mark was reached: ${event.name}`);
};
```

## See also

- Web Speech API
