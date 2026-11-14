---
title: "SecurityPolicyViolationEvent: sample property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securitypolicyviolationevent/sample/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurityPolicyViolationEvent: sample property

The **`sample`** read-only property of the `SecurityPolicyViolationEvent` interface is a string representing a sample of the resource that caused the Content Security Policy (CSP) violation.

This is only for `script-src*` and `style-src*` violations, when the corresponding `Content-Security-Policy` directive contains the `'report-sample'` keyword.
In addition, this will only be populated if the resource is an inline script, event handler, or style — external resources causing a violation will not generate a sample.

> **Note:**
> Violation reports should be considered attacker-controlled data.
> The content of this field should be sanitized before storing or rendering.

## Value

A string containing a sample of the resource that caused the violation, usually the first 40 characters, or the empty string.

## Examples

```js
document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.sample);
});
```

## See also

- `CSPViolationReport.sample`
