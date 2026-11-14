---
title: "DOMTokenList: supports() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domtokenlist/supports/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMTokenList: supports() method

The **`supports()`** method of the `DOMTokenList` interface
returns `true` if a given `token` is in the associated attribute's supported tokens.
This method is intended to support feature detection.

## Syntax

```js
supports(token)
```

### Parameters

- `token`
    A string containing the token to query for.

### Return value

A boolean value indicating whether the token was found.

## Example

```js
const iframe = document.getElementById("display");

if (iframe.sandbox.supports("an-upcoming-feature")) {
  // support code for mystery future feature
} else {
  // fallback code
}

if (iframe.sandbox.supports("allow-scripts")) {
  // instruct frame to run JavaScript
  //
  // (NOTE: This feature is well-supported; this is just an example!)
  //
}
```
