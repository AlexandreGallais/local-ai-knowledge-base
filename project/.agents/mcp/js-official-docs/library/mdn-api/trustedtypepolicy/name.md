---
title: "TrustedTypePolicy: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicy/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicy: name property

The **`name`** read-only property of the `TrustedTypePolicy` interface returns the name of the policy.

## Value

A string containing the name of the policy.

## Examples

In the below example a policy called `myEscapePolicy` is created using `TrustedTypePolicyFactory.createPolicy()` and is represented by the object `escapeHTMLPolicy`. Calling `name` on this object returns the string "myEscapePolicy".

```js
const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
  createHTML: (string) => string.replace(/</g, "&lt;"),
});

console.log(escapeHTMLPolicy.name); /* "myEscapePolicy" */
```
