---
title: "Summarizer: measureInputUsage() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/summarizer/measureinputusage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Summarizer: measureInputUsage() method

The **`measureInputUsage()`** method of the `Summarizer` interface reports how much `inputQuota` would be used by a summarize operation for a given text input.

## Syntax

```js
measureInputUsage(input)
measureInputUsage(input, options)
```

### Parameters

- `input`
    A string representing the input text you want an input usage measurement for.
- `options` (optional)
    An object specifying configuration options for the `measureInputUsage()` operation. Possible values include:
    - `context`
        A string describing the context the input text would be used in, to help generate a more suitable summary.
    - `signal`
        An `AbortSignal` object instance, which allows the `measureInputUsage()` operation to be aborted via the associated `AbortController`.

### Return value

A `Promise` that fulfills with a number specifying the `inputQuota` usage of the given input text.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if usage of the Summarizer API is blocked by a `summarizer` `Permissions-Policy`.
- `NotReadableError` `DOMException`
    Thrown if the output summary was filtered by the user agent, for example because it was detected to be harmful, inaccurate, or nonsensical.
- `NotSupportedError` `DOMException`
    Thrown if the provided `context` is not in language the `Summarizer` supports.
- `UnknownError` `DOMException`
    Thrown if the `measureInputUsage()` call failed for any other reason, or a reason the user agent did not wish to disclose.

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
