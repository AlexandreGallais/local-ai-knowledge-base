---
title: "SpeechSynthesisEvent: SpeechSynthesisEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechsynthesisevent/speechsynthesisevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechSynthesisEvent: SpeechSynthesisEvent() constructor

The **`SpeechSynthesisEvent()`** constructor creates a new `SpeechSynthesisEvent` object.

> **Note:**
> A web developer doesn't typically need to call this constructor, as the browser creates these objects itself when firing events.

## Syntax

```js
new SpeechSynthesisEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `start`, `end`, `error`, `pause`, `resume`, `mark`, or `boundary`.
- `options`
    An object that, _in addition to the properties defined in `Event()`_, has the following properties:
    - `utterance`
        A `SpeechSynthesisUtterance` object, which is the speech request the event was triggered on.
    - `charIndex` (optional)
        The index position of the character in `SpeechSynthesisUtterance.text` that was being spoken when the event was triggered. Its default value is `0`.
    - `charLength` (optional)
        The number of characters left to be spoken after the character at the `charIndex` position. Its default value is `0`.
    - `elapsedTime` (optional)
        The elapsed time in seconds, after the `SpeechSynthesisUtterance.text` started being spoken, at which the event was triggered. Its default value is `0`.
    - `name` (optional)
        The name associated with certain types of events: the name of the SSML marker reached in the case of a `mark` event, or the type of boundary reached in the case of a `boundary` event. It defaults to the empty string (`""`).

### Return value

A new `SpeechSynthesisEvent` object.

## See also

- `SpeechSynthesisErrorEvent`
