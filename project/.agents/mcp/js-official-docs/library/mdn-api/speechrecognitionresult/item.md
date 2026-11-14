---
title: "SpeechRecognitionResult: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speechrecognitionresult/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SpeechRecognitionResult: item() method

The **`item`** getter of the
`SpeechRecognitionResult` interface is a standard getter that allows
`SpeechRecognitionAlternative` objects within the result to be accessed via
array syntax.

## Syntax

```js
item(index)
```

### Parameters

- `index`
    Index of the item to retrieve.

### Return value

A `SpeechRecognitionAlternative` object.

## Examples

This code is excerpted from our Speech color changer example.

```js
recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;
};
```

## See also

- Web Speech API
