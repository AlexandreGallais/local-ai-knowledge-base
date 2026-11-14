---
title: "ShadowRoot: getHTML() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/gethtml/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: getHTML() method

The **`getHTML()`** method of the `ShadowRoot` interface is used to serialize a shadow root's DOM to an HTML string.

The method provides an options argument that enables the serialization of child nodes that are shadow roots.
The options can be used to include nested shadow roots that have been set as `serializable`, and/or a specified array of `ShadowRoot` objects, which may be either open or closed.

Without arguments, child nodes that are shadow roots are not serialized, and this method behaves in the same way as reading the value of `Element.innerHTML`.

Note that some browsers serialize the `<` and `>` characters as `<` and `>` when they appear in attribute values (see Browser compatibility).
This is to prevent a potential security vulnerability (mutation XSS) in which an attacker can craft input that bypasses a sanitization function, enabling a cross-site scripting (XSS) attack.

## Syntax

```js
getHTML(options)
```

### Parameters

- `options` (optional)
    An options object with the following optional parameters:
    - `serializableShadowRoots`
        A boolean value that specifies whether to include serializable shadow roots.
        The default value is `false`.
    - `shadowRoots`
        An array of `ShadowRoot` objects to serialize.
        These are included regardless of whether they are marked as `serializable`, or if they are open or closed.
        The default value is an empty array.

### Return value

A string that represents the HTML serialization of the shadow root.

### Exceptions

None.

## See Also

- `Element.getHTML()`
- `Element.innerHTML`
- `ShadowRoot.setHTMLUnsafe()`
- `Element.setHTMLUnsafe()`
