---
title: "SecurityPolicyViolationEvent: disposition property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securitypolicyviolationevent/disposition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurityPolicyViolationEvent: disposition property

The **`disposition`** read-only property of the `SecurityPolicyViolationEvent` interface indicates how the violated Content Security Policy (CSP) is configured to be treated by the user agent.

## Value

Possible values are:

- `"enforce"`
    The policy is enforced and the resource request is blocked.
- `"report"`
    The violation is reported but the resource request is not blocked.

## Examples

```js
document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.disposition);
});
```

## See also

- `CSPViolationReport.disposition`
