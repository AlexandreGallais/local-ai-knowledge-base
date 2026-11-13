---
title: "TrustedTypePolicy: createScriptURL() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicy/createscripturl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicy: createScriptURL() method

The **`createScriptURL()`** method of the `TrustedTypePolicy` interface creates a `TrustedScriptURL` object using a policy created by `TrustedTypePolicyFactory.createPolicy()`.

## Syntax

```js
createScriptURL(input)
createScriptURL(input, args)
```

### Parameters

- `input`
    A string containing the string to be sanitized by the policy.
- `args` (optional)
    Additional arguments to be passed to the function represented by `TrustedTypePolicy`.

### Return value

A `TrustedScriptURL` object.

### Exceptions

- `TypeError`
    Thrown if `TrustedTypePolicy` does not contain a function to run on the input.

## Examples

In the below example a string containing the URL to an external resource is used as the input for `createScriptURL()`. The policy can check that this is an allowed URL before inserting it into an injection sink that could cause this external script to be executed.

```js
const escaped = escapeURLPolicy.createScriptURL(
  "https://example.com/my-script.js",
);
```
