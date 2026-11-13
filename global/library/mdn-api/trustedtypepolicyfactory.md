---
title: "TrustedTypePolicyFactory"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicyfactory/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicyFactory

The **`TrustedTypePolicyFactory`** interface of the `Trusted Types API` creates policies and allows the verification of Trusted Type objects against created policies.

## Instance properties

- `TrustedTypePolicyFactory.emptyHTML` (read-only)
    Returns a `TrustedHTML` object containing an empty string.
- `TrustedTypePolicyFactory.emptyScript` (read-only)
    Returns a `TrustedScript` object containing an empty string.
- `TrustedTypePolicyFactory.defaultPolicy` (read-only)
    Returns the default `TrustedTypePolicy` or null if this is empty.

## Instance methods

- `TrustedTypePolicyFactory.createPolicy()`
    Creates a `TrustedTypePolicy` object that implements the rules passed as `policyOptions`.
- `TrustedTypePolicyFactory.isHTML()`
    When passed a value checks that it is a valid `TrustedHTML` object.
- `TrustedTypePolicyFactory.isScript()`
    When passed a value checks that it is a valid `TrustedScript` object.
- `TrustedTypePolicyFactory.isScriptURL()`
    When passed a value checks that it is a valid `TrustedScriptURL` object.
- `TrustedTypePolicyFactory.getAttributeType()`
    Allows web developers to check whether a Trusted Type is required for an element and attribute, and if so which one.
- `TrustedTypePolicyFactory.getPropertyType()`
    Allows web developers to check whether a Trusted Type is required for a property, and if so which one.

## Examples

The below code creates a policy with the name `"myEscapePolicy"` with a function defined for `createHTML()` which sanitizes HTML.

We then use the policy to sanitize a string, creating a `TrustedHTML` object, `escaped`. This object can be tested with `isHTML()` to ensure that it was created by one of our policies.

```js
const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
  createHTML: (string) => string.replace(/</g, "&lt;"),
});

const escaped = escapeHTMLPolicy.createHTML("<img src=x onerror=alert(1)>");

console.log(trustedTypes.isHTML(escaped)); // true;
```
