---
title: "SecurityPolicyViolationEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securitypolicyviolationevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurityPolicyViolationEvent

The **`SecurityPolicyViolationEvent`** interface inherits from `Event`, and represents the event object of a `securitypolicyviolation` event sent on an `Element`, `Document`, or `worker` when its Content Security Policy (CSP) is violated.

## Constructor

- `SecurityPolicyViolationEvent()`
    Creates a new `SecurityPolicyViolationEvent` object instance.

## Instance properties

- `SecurityPolicyViolationEvent.blockedURI` (read-only)
    A string representing the URI of the resource that was blocked because it violates a policy.
- `SecurityPolicyViolationEvent.columnNumber` (read-only)
    The column number in the document or worker at which the violation occurred.
- `SecurityPolicyViolationEvent.disposition` (read-only)
    A string indicating whether the user agent is configured to enforce or just report the policy violation.
- `SecurityPolicyViolationEvent.documentURI` (read-only)
    A string representing the URI of the document or worker in which the violation occurred.
- `SecurityPolicyViolationEvent.effectiveDirective` (read-only)
    A string representing the directive that was violated.
- `SecurityPolicyViolationEvent.lineNumber` (read-only)
    The line number in the document or worker at which the violation occurred.
- `SecurityPolicyViolationEvent.originalPolicy` (read-only)
    A string containing the policy whose enforcement caused the violation.
- `SecurityPolicyViolationEvent.referrer` (read-only)
    A string representing the URL for the referrer of the resources whose policy was violated, or `null`.
- `SecurityPolicyViolationEvent.sample` (read-only)
    A string representing a sample of the resource that caused the violation, usually the first 40 characters. This will only be populated if the resource is an inline script, event handler, or style — external resources causing a violation will not generate a sample.
- `SecurityPolicyViolationEvent.sourceFile` (read-only)
    If the violation occurred as a result of a script, this will be the URL of the script; otherwise, it will be `null`.
    Both `columnNumber` and `lineNumber` should have non-null values if this property is not `null`.
- `SecurityPolicyViolationEvent.statusCode` (read-only)
    A number representing the HTTP status code of the document or worker in which the violation occurred.
- `SecurityPolicyViolationEvent.violatedDirective` (read-only)
    A string representing the directive that was violated.
    This is a historical alias of `effectiveDirective`.

## Examples

```js
document.addEventListener("securitypolicyviolation", (e) => {
  console.log(e.blockedURI);
  console.log(e.violatedDirective);
  console.log(e.originalPolicy);
});
```

## See also

- HTTP Content Security Policy (CSP)
- `CSPViolationReport`
- The `securitypolicyviolation` event of the `Element` interface
- The `securitypolicyviolation` event of the `Document` interface
- The `securitypolicyviolation` event of the `WorkerGlobalScope` interface
