---
title: "TrustedTypePolicy: createHTML() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trustedtypepolicy/createhtml/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrustedTypePolicy: createHTML() method

The **`createHTML()`** method of the `TrustedTypePolicy` interface creates a `TrustedHTML` object using a policy created by `TrustedTypePolicyFactory.createPolicy()`.

## Syntax

```js
createHTML(input)
createHTML(input, args)
```

### Parameters

- `input`
    A string containing the string to be sanitized by the policy.
- `args` (optional)
    Additional arguments to be passed to the function represented by `TrustedTypePolicy`.

### Return value

A `TrustedHTML` object.

### Exceptions

- `TypeError`
    Thrown if `TrustedTypePolicy` does not contain a function to run on the input.

## Examples

In the below example a string containing a potentially dangerous script is used as the input for `createHTML()`. Dangerous code inserted by a user could then be sanitized before insertion into any injection sink.

```js
const escaped = escapeHTMLPolicy.createHTML("<img src=x onerror=alert(1)>");
```
