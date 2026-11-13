---
title: "SecurityPolicyViolationEvent: originalPolicy property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securitypolicyviolationevent/originalpolicy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurityPolicyViolationEvent: originalPolicy property

The **`originalPolicy`** read-only property of the `SecurityPolicyViolationEvent` interface is a string containing the Content Security Policy (CSP) whose enforcement uncovered the violation.

## Value

A string representing the policy whose enforcement uncovered the violation.

This is the string in the `Content-Security-Policy` HTTP header that contains the list of directives and their values that make the CSP policy.

## Examples

```js
document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.originalPolicy);
});
```

## See also

- `CSPViolationReport.originalPolicy`
