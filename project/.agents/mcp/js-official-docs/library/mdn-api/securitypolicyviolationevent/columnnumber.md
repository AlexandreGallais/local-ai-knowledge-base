---
title: "SecurityPolicyViolationEvent: columnNumber property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securitypolicyviolationevent/columnnumber/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurityPolicyViolationEvent: columnNumber property

The **`columnNumber`** read-only property of the `SecurityPolicyViolationEvent` interface is the character position in the source file line of the document or worker script at which the Content Security Policy (CSP) violation occurred.

This property is used with the `SecurityPolicyViolationEvent.sourceFile` and `SecurityPolicyViolationEvent.lineNumber` properties, which together provide the exact location in the source that caused the violation.

## Value

A number representing the character position number where the violation occurred.

## Examples

```js
document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.columnNumber);
});
```

## See also

- `CSPViolationReport.columnNumber`
