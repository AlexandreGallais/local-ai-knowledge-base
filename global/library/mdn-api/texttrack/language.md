---
title: "TextTrack: language property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrack/language/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrack: language property

The **`language`** read-only property of the `TextTrack` interface returns the language of the text track.

## Value

A string containing a language identifier. This will be a valid BCP 47 language tag, for example `"en-US"` for United States English or `"pt-BR"` for Brazilian Portuguese.

## Examples

In the following example the value of `language` is printed to the console.

```js
let video = document.querySelector("video");
let track = video.addTextTrack("captions", "Captions", "en-US");
track.mode = "showing";
console.log(track.language);
```
