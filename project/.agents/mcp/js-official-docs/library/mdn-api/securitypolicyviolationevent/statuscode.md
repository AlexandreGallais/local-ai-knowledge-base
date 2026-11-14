---
title: "SecurityPolicyViolationEvent: statusCode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securitypolicyviolationevent/statuscode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurityPolicyViolationEvent: statusCode property

The **`statusCode`** read-only property of the `SecurityPolicyViolationEvent` interface is a number representing the HTTP status code of the window or worker in which the Content Security Policy (CSP) violation occurred.

## Value

A number representing the status code of the window or worker in which the violation occurred.

## Examples

```js
document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.statusCode);
});
```

## See also

- `CSPViolationReport.statusCode`
