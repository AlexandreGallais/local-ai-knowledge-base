---
title: "Summarizer: outputLanguage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/summarizer/outputlanguage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Summarizer: outputLanguage property

The **`outputLanguage`** read-only property of the `Summarizer` interface returns the language the summary should be generated in.

## Value

A string specifying the language the summary should be generated in.

The string should be a valid BCP 47 language tag.

## Examples

```js
const summarizer = await Summarizer.create({
  outputLanguage: "en-US",
  // ...
});

// Logs "en-US"
console.log(summarizer.outputLanguage);
```

## See also

- Using the Summarizer API
- Web AI demos on chrome.dev
