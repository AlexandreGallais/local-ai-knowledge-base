---
title: "TrustedScript: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedscript/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedScript: toString() method

The **`toString()`** method of the `TrustedScript` interface returns a string which may be safely inserted into an injection sink.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string containing the sanitized script.

## Examples

The constant `sanitized` is an object created via a Trusted Types policy. The `toString()` method returns a string to safely execute as a script.

```js
const sanitized = scriptPolicy.createScript("eval('2 + 2')");
console.log(sanitized.toString());
```
