---
title: "TrustedTypePolicyFactory: emptyHTML property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicyfactory/emptyhtml/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicyFactory: emptyHTML property

The **`emptyHTML`** read-only property of the `TrustedTypePolicyFactory` interface returns a `TrustedHTML` object containing an empty string.

This object can be used when the application requires an empty string to be inserted into an injection sink.

## Value

A `TrustedHTML` object.

## Examples

In the below example an empty string is to be inserted into the element. Therefore there is no need to create a policy, and the `emptyHTML` property can be used to insert the empty element when a Trusted Types object is expected.

```js
el.innerHTML = trustedTypes.emptyHTML;
```
