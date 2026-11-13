---
title: "SpeechSynthesisUtterance: error event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisutterance/error_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisUtterance: error event

The **`error`** event of the Web Speech API `SpeechSynthesisUtterance` object is fired when an error occurs that prevents the utterance from being successfully spoken.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("error", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onerror = (event) => { }
```

## Event type

A `SpeechSynthesisErrorEvent`. Inherits from `SpeechSynthesisEvent` and `Event`.

## Examples

You can use the `error` event in an `addEventListener` method:

```js
utterThis.addEventListener("error", (event) => {
  console.log(
    `An error has occurred with the speech synthesis: ${event.error}`,
  );
});
```

Or use the `onerror` event handler property (but note that this replaces other event listeners added using `onerror`, if any):

```js
utterThis.onerror = (event) => {
  console.log(
    `An error has occurred with the speech synthesis: ${event.error}`,
  );
};
```

## See also

- Web Speech API
