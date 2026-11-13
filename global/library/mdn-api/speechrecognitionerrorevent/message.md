---
title: "SpeechRecognitionErrorEvent: message property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionerrorevent/message/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionErrorEvent: message property

The **`message`** read-only property of the
`SpeechRecognitionErrorEvent` interface returns a message describing the
error in more detail.

## Value

A string containing more details about the error that was raised.
Note that the spec does not define the exact wording of these messages — this is up to
the implementors to decide upon.

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
