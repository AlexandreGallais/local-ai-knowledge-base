---
title: "PreferenceObject: clearOverride() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/preferenceobject/clearoverride/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PreferenceObject: clearOverride() method

The **`clearOverride`** method of the `PreferenceObject` interface resets the `override` value.

## Syntax

```js
clearOverrides()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Basic usage

The following example clears the override of the color scheme.

```js
navigator.preferences.colorScheme.clearOverride();
console.log(navigator.preferences.colorScheme.override);
```
