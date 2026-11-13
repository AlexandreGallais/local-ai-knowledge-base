---
title: "SpeechRecognitionErrorEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionerrorevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionErrorEvent

The **`SpeechRecognitionErrorEvent`** interface of the Web Speech API represents error messages from the recognition service.

## Constructor

- `SpeechRecognitionErrorEvent()`
    Creates a new `SpeechRecognitionErrorEvent` object.

## Instance properties

_`SpeechRecognitionErrorEvent` also inherits properties from its parent interface, `Event`._

- `SpeechRecognitionErrorEvent.error` (read-only)
    Returns the type of error raised.
- `SpeechRecognitionErrorEvent.message` (read-only)
    Returns a message describing the error in more detail.

## Examples

```js
const recognition = new SpeechRecognition();

recognition.onerror = (event) => {
  console.log(`Speech recognition error detected: ${event.error}`);
  console.log(`Additional information: ${event.message}`);
};
```

## See also

- Web Speech API
