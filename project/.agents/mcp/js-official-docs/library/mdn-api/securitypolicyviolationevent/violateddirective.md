---
title: "SecurityPolicyViolationEvent: violatedDirective property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securitypolicyviolationevent/violateddirective/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurityPolicyViolationEvent: violatedDirective property

The **`violatedDirective`** read-only property of the `SecurityPolicyViolationEvent` interface is a string representing the Content Security Policy (CSP) directive that was violated.

This is a historical alias of `SecurityPolicyViolationEvent.effectiveDirective`, and has the same value.

## Value

A string representing the `Content-Security-Policy` directive that was violated.

## Examples

```js
document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.violatedDirective);
});
```
