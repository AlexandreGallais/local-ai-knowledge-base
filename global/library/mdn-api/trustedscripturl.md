---
title: "TrustedScriptURL"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedscripturl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedScriptURL

The **`TrustedScriptURL`** interface of the `Trusted Types API` represents a string that a developer can insert into an injection sink that will parse it as a URL of an external script. These objects are created via `TrustedTypePolicy.createScriptURL()` and therefore have no constructor.

The value of a `TrustedScriptURL` object is set when the object is created and cannot be changed by JavaScript as there is no setter exposed.

## Instance methods

- `TrustedScriptURL.toJSON()`
    Returns a string representing the `TrustedScriptURL` object, which is the same value as `TrustedScriptURL.toString()`. Automatically called by `JSON.stringify()`.
- `TrustedScriptURL.toString()`
    A string containing the sanitized URL.

## Examples

The constant `sanitized` is an object created via a Trusted Types policy.

```js
const sanitized = scriptPolicy.createScriptURL(
  "https://example.com/my-script.js",
);
console.log(sanitized); /* a TrustedScriptURL object */
```

## See also

- Prevent DOM-based cross-site scripting vulnerabilities with Trusted Types
