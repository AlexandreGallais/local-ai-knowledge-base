---
title: "TrustedTypePolicyFactory: emptyScript property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicyfactory/emptyscript/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicyFactory: emptyScript property

The **`emptyScript`** read-only property of the `TrustedTypePolicyFactory` interface returns a `TrustedScript` object containing an empty string.

This object can be used when the application requires an empty string to be inserted into an injection sink which is expecting a `TrustedScript` object.

## Value

A `TrustedScript` object.

## Examples

The specification explains that the `emptyScript` object can be used to detect support for dynamic code compilation.

Native Trusted Types implementations can support `eval(TrustedScript)`, therefore in the below example a native implementation will return false for `eval(trustedTypes.emptyScript)`. A polyfill will return a truthy object.

```js
const supportsTS = !eval(trustedTypes.emptyScript);
eval(supportsTS ? myTrustedScriptObj : myTrustedScriptObj.toString());
```
