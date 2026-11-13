---
title: "Default sanitizer configuration (part 1 of 12)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/html_sanitizer_api/default_sanitizer_configuration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Default sanitizer configuration

The default sanitizer configuration defines the configuration returned by the `Sanitizer()` constructor if no `configuration` is passed as an argument.
This same configuration is implicitly used if you call the safe sanitization methods, such as `Element.setHTML()`, `ShadowRoot.setHTML()`, and `Document.parseHTML()`, without specifying a custom sanitizer.

This configuration removes the following sorts of items:

1. Those that are known to be XSS-unsafe:
   - `<base>`, ``, `<frame>`, ``, `<object>`, `<script>`, and `<use>`.
   - All event handler content attributes, such as `onafterprint`, `onbeforeinput`, and so on.
2. Items that might be used in clickjacking, spoofing, or other attacks.
3. Deprecated items.
4. Comments and `data-*` attributes.

It therefore provides a sanitizer with a minimal attack surface, which is still suitable for the majority of sanitization use cases.

> **Note:**
> Calling `Sanitizer.removeUnsafe()`, or passing a custom sanitizer to the safe sanitization method, only removes the XSS-unsafe items.
> It does not remove the additional items, comments, and `data-*` attributes.

The following sections list all the elements, with a &check; mark indicating those that are _allowed_ by the default configuration (the ❌ therefore indicates those that will be removed).
The "Additional allowed attributes" column lists the attributes that are allowed for the corresponding elements; any other attributes on the element would be removed (unless allowed by the global attributes).
The Global attributes section lists the attributes that are allowed on all elements (the attributes that are not removed when the configuration is used).
