---
title: "TrustedHTML: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedhtml/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedHTML: toString() method

The **`toString()`** method of the `TrustedHTML` interface returns a string which may safely inserted into an injection sink.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string containing the sanitized HTML.

## Examples

The constant `escaped` is an object created via the Trusted Types policy escapeHTMLPolicy. The `toString()` method returns a string to safely insert into a document.

```js
const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
  createHTML: (string) => string.replace(/</g, "&lt;"),
});

const escaped = escapeHTMLPolicy.createHTML("<img src=x onerror=alert(1)>");
console.log(escaped.toString());
```
