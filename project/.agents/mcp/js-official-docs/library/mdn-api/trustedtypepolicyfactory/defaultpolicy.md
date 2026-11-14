---
title: "TrustedTypePolicyFactory: defaultPolicy property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicyfactory/defaultpolicy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicyFactory: defaultPolicy property

The **`defaultPolicy`** read-only property of the `TrustedTypePolicyFactory` interface returns the default `TrustedTypePolicy` or null if this is empty.

See The default policy for more details.

## Value

A `TrustedTypePolicy` or `null`.

## Examples

The first line below returns `null` as no default policy has been created. Once a default policy is created, calling `defaultPolicy` returns that policy object.

```js
console.log(trustedTypes.defaultPolicy); // null
const dp = trustedTypes.createPolicy("default", {});
console.log(trustedTypes.defaultPolicy); // a TrustedTypePolicy object
```
