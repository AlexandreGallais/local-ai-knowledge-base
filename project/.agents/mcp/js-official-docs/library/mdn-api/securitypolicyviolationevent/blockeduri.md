---
title: "SecurityPolicyViolationEvent: blockedURI property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securitypolicyviolationevent/blockeduri/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurityPolicyViolationEvent: blockedURI property

The **`blockedURI`** read-only property of the `SecurityPolicyViolationEvent` interface is a string representing the URI of the resource that was blocked because it violates a Content Security Policy (CSP).

## Value

A string representing the URI of the blocked resource.

## Examples

```js
document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.blockedURI);
});
```

## See also

- `CSPViolationReport.blockedURL`
