---
title: "Summarizer: format property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/summarizer/format/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Summarizer: format property

The **`format`** read-only property of the `Summarizer` interface returns the text format summaries will be returned in.

## Value

An enumerated value specifying the format of returned summaries. Possible values are:

- `markdown`
    Summaries contain markdown formatting (conforming to the CommonMark spec).
- `plain-text`
    Summaries contain no formatting.

## Examples

```js
const summarizer = await Summarizer.create({
  format: "plain-text",
  // ...
});

// Logs "plain-text"
console.log(summarizer.format);
```

## See also

- Using the Summarizer API
- Web AI demos on chrome.dev
