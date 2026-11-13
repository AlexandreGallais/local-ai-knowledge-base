---
title: "HTMLMetaElement: scheme property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmetaelement/scheme/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMetaElement: scheme property

The **`HTMLMetaElement.scheme`** property defines the scheme of the value in the `HTMLMetaElement.content` attribute.
The `scheme` property was created to enable providing additional information to be used to interpret the value of the `content` property. The `scheme` property takes as its value a scheme format (i.e., `YYYY-MM-DD`) or scheme format name (i.e., `ISBN`), or a URI providing more information regarding the scheme format. The scheme defines the format of the value of the `content` attribute.
The `scheme` content is interpreted as an extension of the element's `HTMLMetaElement.name` if a browser or user agent recognizes the scheme.

This property is deprecated and should not be used on new web pages.

## Value

A string.

## Examples

The following example queries a `<meta>` element that contains a `name` attribute with the value of `identifier`.
The `scheme` value is logged to the console to display the scheme of the metadata content:

```js
// given <meta name="identifier" content="1580081754" scheme="ISBN">
const meta = document.querySelector("meta[name='identifier']");
console.log(meta.scheme);
// "ISBN"
```

## See also

- `<meta>`
