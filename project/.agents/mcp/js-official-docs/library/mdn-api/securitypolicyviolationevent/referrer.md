---
title: "SecurityPolicyViolationEvent: referrer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securitypolicyviolationevent/referrer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurityPolicyViolationEvent: referrer property

The **`referrer`** read-only property of the `SecurityPolicyViolationEvent` interface is a string representing the referrer for the resources whose Content Security Policy (CSP) was violated.
This will be a URL or `null`.

## Value

A string representing the URL for the referrer of the resources whose policy was violated, or `null`.

## Examples

```js
document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.referrer);
});
```

## See also

- `CSPViolationReport.referrer`
