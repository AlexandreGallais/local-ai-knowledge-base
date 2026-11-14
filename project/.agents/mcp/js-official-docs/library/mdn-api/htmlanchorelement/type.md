---
title: "HTMLAnchorElement: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlanchorelement/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAnchorElement: type property

The **`type`** property of the `HTMLAnchorElement` interface is a string that indicates the MIME type of the linked resource.

It reflects the `type` attribute of the `` element.

## Value

A string.

## Example

```html
<a id="exampleLink" href="https://example.com" type="text/html">Example Link</a>
<p class="type"></p>
```

```css
#exampleLink {
  font-size: 1.5rem;
}
```

```js
const anchorElement = document.getElementById("exampleLink");
const pTag = document.querySelector(".type");
console.log(anchorElement.type); // Output: "text/html"
pTag.textContent = anchorElement.type;
```

## See also

- `HTMLLinkElement.type` property
- `HTMLSourceElement.type` property
- `HTMLEmbedElement.type` property
