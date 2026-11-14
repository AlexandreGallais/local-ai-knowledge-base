---
title: "Permissions-Policy: language-model directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/language-model/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: language-model directive

The HTTP `Permissions-Policy` header `language-model` directive controls access to the Prompt API.

Specifically, where a defined policy blocks usage, the `LanguageModel.availability()` static method will return `unavailable`, and any attempts to call other `LanguageModel` methods will fail with a `NotAllowedError` `DOMException`.

## Syntax

```http
Permissions-Policy: language-model=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `language-model` is `self`. The top-level browsing context and same-origin iframes are allowed access to the Prompt API by default.

## Examples

### Basic usage

SecureCorp Inc. wants to disallow `language-model` within all cross-origin iframes except those whose origin is `https://example.com`. It can do so by delivering the following HTTP response header to define a Permissions Policy:

```http
Permissions-Policy: language-model=(self "https://example.com")
```

SecureCorp Inc. must also include an `<allow>` attribute on each `` element where `language-model` is to be allowed:

```html
<iframe src="https://example.com/blue" allow="language-model"></iframe>
```

> **Note:**
> Specifying the `Permissions-Policy` header in this manner disallows `language-model` for other origins, even if they are allowed by the `` `allow` attribute.

### Using the default policy

If an allowlist for `language-model` is not defined by a `Permissions-Policy` response header, user agents will apply the default allowlist `self`. In this mode, `language-model` is automatically allowed in the top-level browsing context and same-origin iframes, but not in cross-origin iframes.

To allow `language-model` in a cross-origin iframe, include an `<allow>` attribute on the `` element:

```html
<iframe src="https://other.com/blue" allow="language-model"></iframe>
```

## See also

- `Permissions-Policy` header
- Permissions Policy
