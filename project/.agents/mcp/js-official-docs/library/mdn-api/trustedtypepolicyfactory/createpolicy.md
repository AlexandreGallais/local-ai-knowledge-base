---
title: "TrustedTypePolicyFactory: createPolicy() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicyfactory/createpolicy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicyFactory: createPolicy() method

The **`createPolicy()`** method of the `TrustedTypePolicyFactory` interface creates a `TrustedTypePolicy` object that implements the rules passed as `policyOptions`.

## Syntax

```js
createPolicy(policyName, policyOptions)
```

### Parameters

- `policyName`
    A string with the name of the policy.
- `policyOptions` (optional)
    User-defined functions for converting strings into trusted values.
    - `createHTML(input[,args])`
        A callback function in the form of a string that contains code to run when creating a `TrustedHTML` object.
    - `createScript(input[,args])`
        A callback function in the form of a string that contains code to run when creating a `TrustedScript` object.
    - `createScriptURL(input[,args])`
        A callback function in the form of a string that contains code to run when creating a `TrustedScriptURL` object.

### Return value

A `TrustedTypePolicy` object.

### Exceptions

- `TypeError`
    Thrown if policy names are restricted by the Content Security Policy `trusted-types` directive and this name is not on the allowlist.
- `TypeError`
    Thrown if the name is a duplicate and the Content Security Policy trusted-types directive is not using `allow-duplicates`.

## Examples

### Creating a policy for HTML sinks

The below code creates a policy with the name `"myEscapePolicy"` with a function defined for `createHTML()` which sanitizes HTML.

```js
const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
  createHTML: (string) => string.replace(/</g, "&lt;"),
});
```

### Creating a default policy

On a site where Trusted Types are enforced via a Content Security Policy with the `require-trusted-types-for` directive set to `script`, any injection script that accepts a script expects a Trusted Type object. In the case that a string is inserted instead, a default policy will be used.

The default policy logs a message to the console to remind the developer to refactor this part of the application to use a Trusted Type object. It also appends details of the use of the default policy, type, and injection sink to the returned value.

```js
trustedTypes.createPolicy("default", {
  createScriptURL(s, type, sink) {
    console.log("Please refactor.");
    return `${s}?default-policy-used&type=${encodeURIComponent(
      type,
    )}&sink=${encodeURIComponent(sink)}`;
  },
});
```
