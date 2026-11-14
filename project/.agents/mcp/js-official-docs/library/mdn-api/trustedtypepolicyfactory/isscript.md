---
title: "TrustedTypePolicyFactory: isScript() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicyfactory/isscript/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicyFactory: isScript() method

The **`isScript()`** method of the `TrustedTypePolicyFactory` interface returns true if it is passed a valid `TrustedScript` object.

> **Note:**
> The purpose of the functions `isScript()`, `isHTML()`, and `isScriptURL()` is to check if the object is a valid TrustedType object, created by a configured policy.

## Syntax

```js
isScript(value)
```

### Parameters

- `value`
    A `TrustedScript` object.

### Return value

A `Boolean` that is true if the object is a valid `TrustedScript` object.

## Examples

In the below example the constant `url` was created by a policy, and therefore `isScriptURL()` returns true. The second example is an attempt to fake an object, and the third is a string. Both of these will return false when passed to `isScriptURL()`.

```js
const myScript = policy.createScript("eval('2 + 2')");
console.log(trustedTypes.isScript(myScript)); // true;

const fake = Object.create(TrustedScript.prototype);
console.log(trustedTypes.isScript(fake)); // false

console.log(trustedTypes.isScript("eval('2 + 2')")); // false
```
