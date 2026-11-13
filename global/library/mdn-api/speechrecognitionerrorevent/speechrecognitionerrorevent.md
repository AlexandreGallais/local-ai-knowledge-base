---
title: "SpeechRecognitionErrorEvent: SpeechRecognitionErrorEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionerrorevent/speechrecognitionerrorevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionErrorEvent: SpeechRecognitionErrorEvent() constructor

The **`SpeechRecognitionErrorEvent()`** constructor creates a new
`SpeechRecognitionErrorEvent` object instance.

## Syntax

```js
new SpeechRecognitionErrorEvent(type, init)
```

### Parameters

- `type`
    A string containing the name of the event. This will always be `error`.
- `init`
    An initialization object that contains the following properties:
    - `error`
        An enumerated value representing the type of error. See the possible `error` values.
    - `message` (optional)
        A string containing more details about the error that was raised. Note that the specification does not define the exact wording of these messages — implementers must define their own wording.

## Examples

You would be unlikely to construct a `SpeechRecognitionErrorEvent` instance manually. Such instances are available as event objects inside `error` event handler functions.

For example:

```js
const recognition = new SpeechRecognition();

recognition.addEventListener("error", (event) => {
  console.log(`Speech recognition error detected: ${event.error}`);
  console.log(`Additional information: ${event.message}`);
});
```

## See also

- Web Speech API
