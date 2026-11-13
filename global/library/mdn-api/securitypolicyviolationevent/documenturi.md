---
title: "SecurityPolicyViolationEvent: documentURI property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securitypolicyviolationevent/documenturi/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurityPolicyViolationEvent: documentURI property

The **`documentURI`** read-only property of the `SecurityPolicyViolationEvent` interface is a string representing the URI of the document or worker in which the Content Security Policy (CSP) violation occurred.

## Value

A string representing the URI of the document or worker in which the violation occurred.

## Examples

```js
document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.documentURI);
});
```

## See also

- `CSPViolationReport.documentURL`
