---
title: "SpeechSynthesisEvent: elapsedTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisevent/elapsedtime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisEvent: elapsedTime property

The **`elapsedTime`** read-only property of the `SpeechSynthesisEvent` returns the elapsed time in seconds, after the `SpeechSynthesisUtterance.text` started being spoken, at which the event was triggered.

## Value

A float containing the elapsed time, in seconds.

> **Note:**
> Early versions of the specification required the elapsed time in milliseconds.
> Check the compatibility table below for your browser.

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
