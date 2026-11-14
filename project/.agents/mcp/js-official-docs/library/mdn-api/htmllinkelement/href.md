---
title: "HTMLLinkElement: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: href property

The **`href`** property of the `HTMLLinkElement` interface contains a string that is the URL associated with the link.

It reflects the `href` attribute of the `<link>` element. If the element does not have an `href` attribute, then this property's value is the empty string (`""`).

> **Note:**
> Every `<link>` element must contain either one or both of the `href` or `imagesrcset` attributes. This means, for each valid `<link>`, either this property or `imageSrcset` will not be empty.

## Value

A string that contains a URL, or the empty string (`""`) if there is no `href` element.

## Examples

```html
<link rel="stylesheet" href="example.css" />
```

```js
const link = document.getElementsByTag("link")[0];
console.log(link.href); // 'example.css'
```

## See also

- `HTMLLinkElement.imageSrcset` property
- `HTMLAnchorElement.href` property
