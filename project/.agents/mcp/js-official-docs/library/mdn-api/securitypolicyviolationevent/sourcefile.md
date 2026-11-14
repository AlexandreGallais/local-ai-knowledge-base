---
title: "SecurityPolicyViolationEvent: sourceFile property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securitypolicyviolationevent/sourcefile/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurityPolicyViolationEvent: sourceFile property

The **`sourceFile`** read-only property of the `SecurityPolicyViolationEvent` interface is a string representing the URL of the script in which the Content Security Policy (CSP) violation occurred.

## Value

A string representing the URL of the script in which the violation occurred, or `null` if the violation is not in a script.

Note that both `columnNumber` and `lineNumber` should have non-null values if this property is not `null`.

## Examples

```js
document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.sourceFile);
});
```

## See also

- `CSPViolationReport.sourceFile`
