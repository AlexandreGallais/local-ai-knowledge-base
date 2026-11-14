---
title: "SpeechSynthesisEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisEvent

The **`SpeechSynthesisEvent`** interface of the Web Speech API contains information about the current state of `SpeechSynthesisUtterance` objects that have been processed in the speech service.

## Constructor

- `SpeechSynthesisEvent()`
    Creates a new `SpeechSynthesisEvent`.

## Instance properties

_The `SpeechSynthesisEvent` interface also inherits properties from its parent interface, `Event`._

- `SpeechSynthesisEvent.charIndex` (read-only)
    Returns the index position of the character in the `SpeechSynthesisUtterance.text` that was being spoken when the event was triggered.
- `SpeechSynthesisEvent.charLength` (read-only)
    Returns the number of characters left to be spoken after the `charIndex` position, if the speaking engine supports it. Returns 0 if the speaking engine can't provide the information.
- `SpeechSynthesisEvent.elapsedTime` (read-only)
    Returns the elapsed time in seconds after the `SpeechSynthesisUtterance.text` started being spoken that the event was triggered at.
- `SpeechSynthesisEvent.name` (read-only)
    Returns the name associated with certain types of events occurring as the `SpeechSynthesisUtterance.text` is being spoken: the name of the SSML marker reached in the case of a `mark` event, or the type of boundary reached in the case of a `boundary` event.
- `SpeechSynthesisEvent.utterance` (read-only)
    Returns the `SpeechSynthesisUtterance` instance that the event was triggered on.

## Instance methods

_The `SpeechSynthesisEvent` interface also inherits methods from its parent interface, `Event`._

## Examples

```js
utterThis.onpause = (event) => {
  const char = event.utterance.text.charAt(event.charIndex);
  console.log(
    `Speech paused at character ${event.charIndex} of "${event.utterance.text}", which is "${char}".`,
  );
};

utterThis.onboundary = (event) => {
  console.log(
    `${event.name} boundary reached after ${event.elapsedTime} seconds.`,
  );
};
```

## See also

- Web Speech API
