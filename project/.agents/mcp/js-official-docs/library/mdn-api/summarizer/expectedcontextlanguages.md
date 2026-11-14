---
title: "Summarizer: expectedContextLanguages property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/summarizer/expectedcontextlanguages/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Summarizer: expectedContextLanguages property

The **`expectedContextLanguages`** read-only property of the `Summarizer` interface returns the languages the context strings should be written in.

## Value

An array of strings specifying the expected languages of any provided context strings (either the `Summarizer.sharedContext`, or a `context` specified during a `summarize()` or `summarizeStreaming()` call).

The strings should be valid BCP 47 language tags.

## Examples

```js
const summarizer = await Summarizer.create({
  expectedContextLanguages: ["en-US", "fr"],
  // ...
});

// Logs "en-US"
console.log(summarizer.expectedContextLanguages[0]);
```

## See also

- Using the Summarizer API
- Web AI demos on chrome.dev
