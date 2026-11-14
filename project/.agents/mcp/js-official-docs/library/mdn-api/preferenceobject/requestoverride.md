---
title: "PreferenceObject: requestOverride() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/preferenceobject/requestoverride/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PreferenceObject: requestOverride() method

The **`requestOverride`** method of the `PreferenceObject` interface sets an `override` value for a particular preference.

## Syntax

```js
requestOverrides(value)
```

### Parameters

- `value`
    The value to request an override with.

### Return value

A `Promise` which resolves to `undefined` on success, or rejects on failure.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if the given value is not allowed.

## Examples

### Basic usage

The following example requests an override of the `colorScheme`.

```js
await navigator.preferences.colorScheme.requestOverride("dark");
console.log(navigator.preferences.colorScheme.override);
```
