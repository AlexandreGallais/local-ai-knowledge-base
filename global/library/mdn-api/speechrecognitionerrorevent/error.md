---
title: "SpeechRecognitionErrorEvent: error property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionerrorevent/error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionErrorEvent: error property

The **`error`** read-only property of the
`SpeechRecognitionErrorEvent` interface returns the type of error raised.

## Value

An enumerated value representing the type of error. Possible values include:

- `aborted`
    Speech input was aborted in some manner, perhaps by some user-agent-specific
    behavior like a button the user can press to cancel speech input.
- `audio-capture`
    Audio capture failed.
- `bad-grammar` (deprecated) (non-standard)
    There was an error in the speech recognition grammar or semantic tags, or the chosen
    grammar format or semantic tag format was unsupported.
    > **Note:**
    > This error is no longer part of the Web Speech API specification; the concept of grammar has been removed from the Web Speech API. Related features remain in the specification and are still recognized by supporting browsers for backwards compatibility, but they have no effect on speech recognition services.
- `language-not-supported`
    The user agent does not support the language specified in the `lang` attribute of the `SpeechRecognition` object. The set of supported languages is browser-dependent, and there is no way to programmatically determine from front-end code the languages a user's browser supports for speech recognition.
- `network`
    Network communication required for completing the recognition failed.
- `no-speech`
    No speech was detected.
- `not-allowed`
    The user agent disallowed any speech input from occurring for reasons of security,
    privacy or user preference.
- `phrases-not-supported`
    The speech recognition model does not support `phrases` for contextual biasing.
- `service-not-allowed`
    The user agent disallowed the requested speech recognition service, either because
    the user agent doesn't support it or because of reasons of security, privacy or user
    preference. In this case it would allow another more suitable speech recognition
    service to be used instead.

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
