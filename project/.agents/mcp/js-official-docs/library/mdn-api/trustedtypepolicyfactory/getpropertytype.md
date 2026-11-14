---
title: "TrustedTypePolicyFactory: getPropertyType() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicyfactory/getpropertytype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicyFactory: getPropertyType() method

The **`getPropertyType()`** method of the `TrustedTypePolicyFactory` interface allows web developers to check if a Trusted Type is required for an element's property.

## Syntax

```js
getPropertyType(tagName, property)
getPropertyType(tagName, property, elementNS)
```

### Parameters

- `tagName`
    A string containing the name of an HTML tag.
- `property`
    A string containing a property, for example `"innerHTML"`.
- `elementNS` (optional)
    A string containing a namespace, if empty defaults to the HTML namespace.

### Return value

A string with one of:

- `"TrustedHTML"`
- `"TrustedScript"`
- `"TrustedScriptURL"`

Or, `null`.

## Examples

In this example, passing the `` element and `innerHTML` attribute to `getPropertyType()` returns "TrustedHTML".

```js
console.log(trustedTypes.getPropertyType("div", "innerHTML")); // "TrustedHTML"
```
