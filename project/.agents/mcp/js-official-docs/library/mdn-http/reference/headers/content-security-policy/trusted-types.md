---
title: "Content-Security-Policy: trusted-types directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/trusted-types/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: trusted-types directive

The HTTP `Content-Security-Policy` (CSP) **`trusted-types`** directive is used to specify an allowlist of Trusted Type policy names that a website can create using `trustedTypes.createPolicy()`.

This prevents website code from creating unexpected policies, making it easier to audit trusted type code (`createPolicy()` will throw an exception if it is passed a name which was not listed in `trusted-types`).

> **Note:**
> The `require-trusted-types-for` directive must be set to enable enforcement of trusted types, and the `trusted-types-eval` keyword is used to relax restrictions on `eval()` and `Function()` when trusted types are enabled.
>
> See Trusted Type API for more information.

## Syntax

```http
Content-Security-Policy: trusted-types;
Content-Security-Policy: trusted-types 'none';
Content-Security-Policy: trusted-types <policyName>;
Content-Security-Policy: trusted-types <policyName> <policyName> 'allow-duplicates';
```

- \<policyName>
    A valid policy name consists only of alphanumeric characters, or one of `-#=_/@.%`. A star (`*`) as a policy name instructs the user agent to allow any unique policy name (`allow-duplicates` may relax that further).
- `'none'`
    Disallows creating any Trusted Type policy (same as not specifying any _\<policyName>_).
- `'allow-duplicates'`
    Allows for creating policies with a name that was already used.

## Examples

```js
// Content-Security-Policy: trusted-types foo bar 'allow-duplicates';

if (typeof trustedTypes !== "undefined") {
  const policyFoo = trustedTypes.createPolicy("foo", {});
  const policyFoo2 = trustedTypes.createPolicy("foo", {});
  const policyBaz = trustedTypes.createPolicy("baz", {}); // Throws and dispatches a SecurityPolicyViolationEvent.
}
```

## See also

- `Content-Security-Policy`
  - `require-trusted-types-for` directive
  - `trusted-types-eval` keyword
- Trusted Types API
  - Injection sink interfaces
- Cross-Site Scripting (XSS)
