---
title: "Content-Security-Policy: require-trusted-types-for directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/require-trusted-types-for/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: require-trusted-types-for directive

The HTTP `Content-Security-Policy` (CSP) **`require-trusted-types-for`** directive instructs user agents to control the data passed to DOM XSS sink functions, like `Element.innerHTML` setter.

When used, those functions only accept non-spoofable, typed values created by Trusted Type policies, and reject strings.
Together with the **`trusted-types`** directive, which guards creation of Trusted Type policies, this allows authors to define rules guarding writing values to the DOM and thus reducing the DOM XSS attack surface to small, isolated parts of the web application codebase, facilitating their monitoring and code review.

## Syntax

```http
Content-Security-Policy: require-trusted-types-for 'script';
```

- `'script'`
    Disallows using strings with DOM XSS injection sink functions, and requires matching types created by Trusted Type policies.

## Examples

```js
// Content-Security-Policy: require-trusted-types-for 'script'; trusted-types foo;

const attackerInput = '<svg onload="alert(/cross-site-scripting/)" />';
const el = document.createElement("div");

if (typeof trustedTypes !== "undefined") {
  // Create a policy that can create TrustedHTML values
  // after sanitizing the input strings with DOMPurify library.
  const sanitizer = trustedTypes.createPolicy("foo", {
    createHTML: (input) => DOMPurify.sanitize(input),
  });

  el.innerHTML = sanitizer.createHTML(attackerInput); // Puts the sanitized value into the DOM.
  el.innerHTML = attackerInput; // Rejects a string value; throws a TypeError.
}
```

## See also

- `Content-Security-Policy`
  - `trusted-types` directive
  - `trusted-types-eval` keyword
- Trusted Types API
  - Injection sink interfaces
- Cross-Site Scripting (XSS)
