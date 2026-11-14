---
title: "HTMLScriptElement: text property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlscriptelement/text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLScriptElement: text property

> **Warning:**
> This property represents the text content of a script element, which may be executable depending on the script type.
> APIs like this are known as injection sinks, and are potentially a vector for cross-site scripting (XSS) attacks.
>
> You can mitigate this risk by always assigning `TrustedScript` objects instead of strings and enforcing trusted types.
> See Security considerations for more information.

The **`text`** property of the `HTMLScriptElement` interface represents the inline text content of the `<script>` element.
It behaves in the same way as the `textContent` and `innerText` property.

## Value

Getting the property returns a string containing the script's text.

Setting the property accepts either a `TrustedScript` object or a string.

### Exceptions

- `TypeError`
    Thrown if the property is set to a string when Trusted Types are enforced by a CSP and no default policy is defined.

## Description

The **`text`** property of the `HTMLScriptElement` interface represents the text content inside the `<script>` element.

For an executable script (that is, a script whose `type` indicates that it is a module or classic script), this text is inline executable code.
For other types it might represent an import map, speculation rules, or some other kind of data block.

Note that if the `src` property is set the content of the `text` property is ignored.

### Security considerations

See security considerations in `HTMLScriptElement.textContent` (the considerations are the same for `text`, `textContent` and `innerText` properties).

## Examples

See the examples in `HTMLScriptElement.textContent`.

## See also

- `HTMLScriptElement.textContent`
- `HTMLScriptElement.innerText`
