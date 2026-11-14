---
title: "Summarizer: sharedContext property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/summarizer/sharedcontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Summarizer: sharedContext property

The **`sharedContext`** read-only property of the `Summarizer` interface returns a string describing the context the pieces of text to summarize are being used in. This helps the `Summarizer` to generate more suitable summaries.

## Value

A string.

## Examples

```js
const summarizer = await Summarizer.create({
  sharedContext:
    "A general summary to help a user decide if the text is worth reading",
  // ...
});

// Logs "A general summary to help a user ..."
console.log(summarizer.sharedContext);
```

## See also

- Using the Summarizer API
- Web AI demos on chrome.dev
