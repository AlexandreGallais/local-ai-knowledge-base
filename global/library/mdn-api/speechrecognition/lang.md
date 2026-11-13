---
title: "SpeechRecognition: lang property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognition/lang/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognition: lang property

The **`lang`** property of the `SpeechRecognition`
interface returns and sets the language of the current `SpeechRecognition`.
If not specified, this defaults to the HTML `lang` attribute
value, or the user agent's language setting if that isn't set either.

## Value

A string representing the language for the current `SpeechRecognition`. The value should be a valid BCP 47 language tag.

## Examples

This code is excerpted from our Speech color changer example.

```js
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// …
```

## See also

- Web Speech API
