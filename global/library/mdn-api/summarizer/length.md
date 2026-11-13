---
title: "Summarizer: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/summarizer/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Summarizer: length property

The **`length`** read-only property of the `Summarizer` interface returns the relative length of the generated summaries.

## Value

An enumerated value specifying the relative length of the generated summaries, the exact nature of which depends on the `Summarizer` `type` value.

Possible values are:

- `short`
    A "short" summary
    - For `type` `tldr` and `teaser`, the summary should fit into one sentence.
    - For `type` `key-points`, the summary should be no more than three bullet points.
    - For `type` `headline`, the summary should be no more than 12 words.
- `medium`
    A "medium" summary
    - For `type` `tldr` and `teaser`, the summary should fit into one short paragraph.
    - For `type` `key-points`, the summary should be no more than five bullet points.
    - For `type` `headline`, the summary should be no more than 17 words.
- `long`
    A "long" summary
    - For `type` `tldr` and `teaser`, the summary should fit into one paragraph.
    - For `type` `key-points`, the summary should be no more than seven bullet points.
    - For `type` `headline`, the summary should be no more than 22 words.

## Examples

```js
const summarizer = await Summarizer.create({
  length: "medium",
  // ...
});

// Logs "medium"
console.log(summarizer.length);
```

## See also

- Using the Summarizer API
- Web AI demos on chrome.dev.
