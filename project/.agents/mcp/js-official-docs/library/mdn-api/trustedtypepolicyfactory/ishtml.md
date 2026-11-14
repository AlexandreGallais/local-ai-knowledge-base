---
title: "TrustedTypePolicyFactory: isHTML() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicyfactory/ishtml/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicyFactory: isHTML() method

The **`isHTML()`** method of the `TrustedTypePolicyFactory` interface returns true if it is passed a valid `TrustedHTML` object.

> **Note:**
> The purpose of the functions `isHTML()`, `isScript()`, and `isScriptURL()` is to check if the object is a valid TrustedType object, created by a configured policy.

## Syntax

```js
isHTML(value)
```

### Parameters

- `value`
    A `TrustedHTML` object.

### Return value

A `Boolean` that is true if the object is a valid `TrustedHTML` object.

## Examples

In the below example the constant `html` was created by a policy, and therefore `isHTML()` returns true. The second example is an attempt to fake an object, and the third is a string. Both of these will return false when passed to `isHTML()`.

```js
const html = policy.createHTML("<div>");
console.log(trustedTypes.isHTML(html)); // true;

const fake = Object.create(TrustedHTML.prototype);
console.log(trustedTypes.isHTML(fake)); // false

console.log(trustedTypes.isHTML("<div>plain string</div>")); // false
```
