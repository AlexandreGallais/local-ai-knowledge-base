---
title: "HTMLScriptElement: innerText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlscriptelement/innertext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLScriptElement: innerText property

> **Warning:**
> This property represents the text content of a script element, which may be executable depending on the script type.
> APIs like this are known as injection sinks, and are potentially a vector for cross-site scripting (XSS) attacks.
>
> You can mitigate this risk by always assigning `TrustedScript` objects instead of strings and enforcing trusted types.
> See Security considerations for more information.

The **`innerText`** property of the `HTMLScriptElement` interface represents the text content of the `<script>` element.
It behaves in the same way as the `textContent` and `text` properties.

## Value

Getting the property returns a string containing the scripts's text.

Setting the property accepts either a `TrustedScript` object or a string.

### Exceptions

- `TypeError`
    Thrown if the property is set to a string when Trusted Types are enforced by a CSP and no default policy is defined.

## Description

The **`innerText`** property of the `HTMLScriptElement` interface represents the text content inside the `<script>` element.

For an executable script (that is, a script whose `type` indicates that it is a module or classic script), this text is inline executable code.
For other types it might represent an import map, speculation rules, or some other kind of data block.

Note that if the `src` property is set the content of the `innerText` property is ignored.

The `innerText` property is also defined on `HTMLElement` and can hence be used with other elements.
When used with other elements, the property does not expect or enforce the assignment of a `TrustedScript`.

### Security considerations

See security considerations in `HTMLScriptElement.textContent` (the considerations are the same for `text`, `textContent` and `innerText` properties).

## Examples

See the examples in `HTMLScriptElement.textContent`.

## See also

- `HTMLElement.innerText`
