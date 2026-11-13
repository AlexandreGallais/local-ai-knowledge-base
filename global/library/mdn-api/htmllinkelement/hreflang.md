---
title: "HTMLLinkElement: hreflang property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/hreflang/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: hreflang property

The **`hreflang`** property of the `HTMLLinkElement` interface is used to indicate the language and the geographical targeting of a page. This hint can be used by browsers to select the more appropriate page or to improve SEO.

It reflects the `hreflang` attribute of the `<link>` element and is the empty string (`""`) if there is no `hreflang` attribute.

## Value

A string that contains a language tag, or the empty string (`""`) if there is no `hreflang` attribute.

## Example

```html
<link
  rel="alternate"
  href="www.example.com/fr/html"
  hreflang="fr"
  type="text/html"
  title="French HTML" />
<p class="tag"></p>
```

```css
.tag {
  margin-left: 20px;
  font-weight: bold;
  font-size: 24px;
}
```

```js
const myLink = document.querySelector("link");
const pTag = document.querySelector(".tag");
pTag.textContent = myLink.hreflang;
```

## See also

- `HTMLAnchorElement.hreflang` property
