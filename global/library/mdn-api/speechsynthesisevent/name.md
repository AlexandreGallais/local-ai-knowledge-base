---
title: "SpeechSynthesisEvent: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisevent/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisEvent: name property

The **`name`** read-only property of the `SpeechSynthesisUtterance` interface returns the name associated with certain types of events occurring as the `SpeechSynthesisUtterance.text` is being spoken:
the name of the SSML marker reached in the case of a `mark` event, or the type of boundary reached in the case of a `boundary` event.

## Value

A string.

## Examples

```js
utterThis.onboundary = (event) => {
  console.log(
    `${event.name} boundary reached after ${event.elapsedTime} seconds.`,
  );
};
```

## See also

- Web Speech API
