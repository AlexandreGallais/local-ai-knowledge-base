---
title: "TrustedTypePolicyFactory: getAttributeType() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicyfactory/getattributetype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicyFactory: getAttributeType() method

The **`getAttributeType()`** method of the `TrustedTypePolicyFactory` interface allows web developers to check if a Trusted Type is required for an element, and if so which Trusted Type is used.

## Syntax

```js
getAttributeType(tagName, attribute)
getAttributeType(tagName, attribute, elementNS)
getAttributeType(tagName, attribute, elementNS, attrNS)
```

### Parameters

- `tagName`
    A string containing the name of an HTML tag.
- `attribute`
    A string containing an attribute.
- `elementNS` (optional)
    A string containing a namespace, if empty defaults to the HTML namespace.
- `attrNS` (optional)
    A string containing a namespace, if empty defaults to null.

### Return value

A string with one of:

- `"TrustedHTML"`
- `"TrustedScript"`
- `"TrustedScriptURL"`

Or, null.

## Examples

In this example, passing the `<script>` element and `src` attribute to `getAttributeType()` returns "TrustedScriptURL".

```js
console.log(trustedTypes.getAttributeType("script", "src")); // "TrustedScriptURL"
```
