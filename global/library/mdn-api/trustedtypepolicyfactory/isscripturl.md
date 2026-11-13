---
title: "TrustedTypePolicyFactory: isScriptURL() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicyfactory/isscripturl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicyFactory: isScriptURL() method

The **`isScriptURL()`** method of the `TrustedTypePolicyFactory` interface returns true if it is passed a valid `TrustedScriptURL` object.

> **Note:**
> The purpose of the functions `isScriptURL()`, `isHTML()`, and `isScript()` is to check if the object is a valid TrustedType object, created by a configured policy.

## Syntax

```js
isScriptURL(value)
```

### Parameters

- `value`
    A `TrustedScriptURL` object.

### Return value

A `Boolean` that is true if the object is a valid `TrustedScriptURL` object.

## Examples

In the below example the constant `url` was created by a policy, and therefore `isScriptURL()` returns true. The second example is an attempt to fake an object, and the third is a string. Both of these will return false when passed to `isScriptURL()`.

```js
const url = policy.createScriptURL("https://example.com/myscript.js");
console.log(trustedTypes.isScriptURL(url)); // true;

const fake = Object.create(TrustedScriptURL.prototype);
console.log(trustedTypes.isScriptURL(fake)); // false

console.log(trustedTypes.isScriptURL("https://example.com/myscript.js")); // false
```
