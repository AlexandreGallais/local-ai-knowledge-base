---
title: "Summarizer: inputQuota property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/summarizer/inputquota/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Summarizer: inputQuota property

The **`inputQuota`** read-only property of the `Summarizer` interface returns the input quota available to the browser for generating summaries.

## Value

A number specifying the available input quota. This number is implementation-dependent. For example, it might be `Infinity` if there are no limits beyond the user's memory and the maximum length of JavaScript strings, or it might be a number of tokens in the case of AI models that use a token/credits scheme.

## Examples

### Checking if you have sufficient quota

In the below snippet, we create a new `Summarizer` instance using `create()`, then return the total input quota via `inputQuota` and the input quota usage for a summarizing a particular text string via `measureInputUsage()`.

We then test to see if the individual input usage for that string is great than the total available quota. If so, we throw an appropriate error; it not, we commence summarizing the string using `summarize()`.

```js
const summarizer = await Summarizer.create({
  sharedContext:
    "A general summary to help a user decide if the text is worth reading",
  type: "tldr",
  length: "short",
});

const totalInputQuota = summarizer.inputQuota;
const inputUsage = await summarizer.measureInputUsage(myTextString);

if (inputUsage > totalInputQuota) {
  throw new Error("Boo, insufficient quota to generate a summary.");
} else {
  console.log("Yay, quota available to generate a summary.");
  const summary = await summarizer.summarize(myTextString);
  // ...
}
```

## See also

- Using the Summarizer API
- Web AI demos on chrome.dev
