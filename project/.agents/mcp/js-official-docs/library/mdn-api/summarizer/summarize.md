---
title: "Summarizer: summarize() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/summarizer/summarize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Summarizer: summarize() method

The **`summarize()`** method of the `Summarizer` interface generates a new summary string.

## Syntax

```js
summarize(input)
summarize(input, options)
```

### Parameters

- `input`
    A string representing the text to be summarized.
- `options` (optional)
    An object specifying configuration options for the `summarize()` operation. Possible values include:
    - `context`
        A string describing the context the input text is being used in, which helps the `Summarizer` generate a more suitable summary.
    - `signal`
        An `AbortSignal` object instance, which allows the `summarize()` operation to be aborted via the associated `AbortController`.

### Return value

A `Promise` that fulfills with a string containing the generated summary.

### Exceptions

- `AbortError` `DOMException`
    Thrown if the `Summarizer` was previously destroyed (had `Summarizer.destroy()` called on it, or was aborted via its abort `signal` after creation).
- `InvalidStateError` `DOMException`
    Thrown if the current `Document` is not active.
- `NotAllowedError` `DOMException`
    Thrown if usage of the Summarizer API is blocked by a `summarizer` `Permissions-Policy`.
- `NotReadableError` `DOMException`
    Thrown if the output summary was filtered by the user agent, for example because it was detected to be harmful, inaccurate, or nonsensical.
- `NotSupportedError` `DOMException`
    Thrown if the provided `context` is not in language the `Summarizer` supports.
- `QuotaExceededError`
    Thrown if the summarize operation exceeds the available `inputQuota`.
- `UnknownError` `DOMException`
    Thrown if the `summarize()` call failed for any other reason, or a reason the user agent did not wish to disclose.

## Examples

### Basic `summarize()` usage

```js
const summarizer = await Summarizer.create({
  sharedContext:
    "A general summary to help a user decide if the text is worth reading",
  type: "tldr",
  length: "short",
});

const summary = await summarizer.summarize(myTextString);
console.log(summary);
```

## See also

- Using the Summarizer API
- Web AI demos on chrome.dev
