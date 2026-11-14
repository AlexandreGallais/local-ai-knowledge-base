---
title: "Summarizer: destroy() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/summarizer/destroy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Summarizer: destroy() method

The **`destroy()`** method of the `Summarizer` interface releases the resources assigned to the `Summarizer` instance it is called on and stops any further activity on it. This means that any ongoing and subsequent method calls made on the `Summarizer` will reject with an `AbortError`.

It makes sense to destroy `Summarizer` objects if they are no longer being used, as they tie up significant resources in their handling.

## Syntax

```js
destroy()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Basic `destroy()` usage

```js
const summarizer = await Summarizer.create({
  sharedContext:
    "A general summary to help a user decide if the text is worth reading",
  type: "tldr",
  length: "short",
});

// ...

summarizer.destroy();
```

## See also

- Using the Summarizer API
- Web AI demos on chrome.dev
