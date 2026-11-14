---
title: "TrustedScript"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedscript/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedScript

The **`TrustedScript`** interface of the `Trusted Types API` represents a string with an uncompiled script body that a developer can insert into an injection sink that might execute the script. These objects are created via `TrustedTypePolicy.createScript()` and therefore have no constructor.

The value of a **TrustedScript** object is set when the object is created and cannot be changed by JavaScript as there is no setter exposed.

## Instance methods

- `TrustedScript.toJSON()`
    Returns a string representing the `TrustedScript` object, which is the same value as `TrustedScript.toString()`. Automatically called by `JSON.stringify()`.
- `TrustedScript.toString()`
    A string containing the sanitized script.

## Examples

The constant `sanitized` is an object created via a Trusted Types policy.

```js
const sanitized = scriptPolicy.createScript("eval('2 + 2')");
console.log(sanitized); /* a TrustedScript object */
```

## See also

- Prevent DOM-based cross-site scripting vulnerabilities with Trusted Types
