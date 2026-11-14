---
title: "TrustedScriptURL: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedscripturl/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedScriptURL: toString() method

The **`toString()`** method of the `TrustedScriptURL` interface returns a string which may safely inserted into an injection sink.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string containing the sanitized URL

## Examples

The constant `sanitized` is an object created via a Trusted Types policy. The `toString()` method returns a string to safely use to load a third-party script.

```js
const sanitized = scriptPolicy.createScriptURL(
  "https://example.com/my-script.js",
);
console.log(sanitized.toString());
```
