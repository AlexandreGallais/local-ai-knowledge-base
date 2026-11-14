---
title: "SecurityPolicyViolationEvent: SecurityPolicyViolationEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/securitypolicyviolationevent/securitypolicyviolationevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SecurityPolicyViolationEvent: SecurityPolicyViolationEvent() constructor

The **`SecurityPolicyViolationEvent()`** constructor creates a new `SecurityPolicyViolationEvent` object.

## Syntax

```js
new SecurityPolicyViolationEvent(type)
new SecurityPolicyViolationEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `securitypolicyviolation`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `blockedURI` (optional)
        The `blockedURI` of the `SecurityPolicyViolationEvent`.
        If not included, the default value is `""`.
    - `columnNumber` (optional)
        The `columnNumber` of the `SecurityPolicyViolationEvent`.
        If not included, the default value is `0`.
    - `disposition`
        The `disposition` of the `SecurityPolicyViolationEvent`.
    - `documentURI`
        The `documentURI` of the `SecurityPolicyViolationEvent`.
    - `effectiveDirective`
        The `effectiveDirective` of the `SecurityPolicyViolationEvent`.
    - `lineNumber` (optional)
        The `lineNumber` of the `SecurityPolicyViolationEvent`.
        If not included, the default value is `0`.
    - `originalPolicy`
        The `originalPolicy` of the `SecurityPolicyViolationEvent`.
    - `referrer` (optional)
        The `referrer` of the `SecurityPolicyViolationEvent`.
        If not included, the default value is `""`.
    - `sample` (optional)
        The `sample` of the `SecurityPolicyViolationEvent`.
        If not included, the default value is `""`.
    - `sourceFile` (optional)
        The `sourceFile` of the `SecurityPolicyViolationEvent`.
        If not included, the default value is `""`.
    - `statusCode`
        The `statusCode` of the `SecurityPolicyViolationEvent`.
    - `violatedDirective`
        The `violatedDirective` of the `SecurityPolicyViolationEvent`.

### Return value

A new `SecurityPolicyViolationEvent` object.

## Examples

```js
let SPVEvt = new SecurityPolicyViolationEvent("foo", {/* ... */});
```

## See also

- Content Security Policy (CSP)
