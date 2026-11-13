---
title: "TrustedTypePolicy: createScript() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicy/createscript/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicy: createScript() method

The **`createScript()`** method of the `TrustedTypePolicy` interface creates a `TrustedScript` object using a policy created by `TrustedTypePolicyFactory.createPolicy()`.

## Syntax

```js
createScript(input)
createScript(input, args)
```

### Parameters

- `input`
    A string containing the string to be sanitized by the policy.
- `args` (optional)
    Additional arguments to be passed to the function represented by `TrustedTypePolicy`.

### Return value

A `TrustedScript` object.

### Exceptions

- `TypeError`
    Thrown if `TrustedTypePolicy` does not contain a function to run on the input.

## Examples

In the below example a string containing a potentially risky script is used as the input for `createScript()`. The policy can sanitize this script before inserting it into an injection sink that could cause it to be executed.

```js
const sanitized = scriptPolicy.createScript("eval('2 + 2')");
```
