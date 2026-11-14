---
title: "SecurityPolicyViolationEvent: lineNumber property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securitypolicyviolationevent/linenumber/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurityPolicyViolationEvent: lineNumber property

The **`lineNumber`** read-only property of the `SecurityPolicyViolationEvent` interface is the line number in the document or worker script at which the Content Security Policy (CSP) violation occurred.

## Value

A number representing the line number at which the violation occurred.

## Examples

```js
document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.lineNumber);
});
```

## See also

- `CSPViolationReport.lineNumber`
