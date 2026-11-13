---
title: "HTMLAnchorElement: hreflang property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlanchorelement/hreflang/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAnchorElement: hreflang property

The **`hreflang`** property of the `HTMLAnchorElement` interface is a string that is the language of the linked resource.

It reflects the `hreflang` attribute of the `` element and is the empty string (`""`) if there is no `hreflang` element.

Web browsers and search engines may use this information to understand the language of the linked content better, but they are not required to follow it. The value provided for the `hreflang` attribute adheres to the BCP 47 language tag format. If not, it is ignored.

Web browsers do not rely solely on the `hreflang` attribute after fetching the linked resource. Instead, they use language information directly associated with the resource (e.g., through HTTP headers) to determine its language.

## Value

A string that contains a language tag, or the empty string (`""`) if there is no `hreflang` element.

## Example

```html
<a id="exampleLink" href="https://example.com" hreflang="en-IN">Example Link</a>
<p class="hreflang"></p>
```

```css
#exampleLink {
  font-size: 1.5rem;
}
```

```js
const anchorElement = document.getElementById("exampleLink");
const pTag = document.querySelector(".hreflang");
console.log(anchorElement.hreflang); // Outputs: "en-IN"
pTag.textContent = anchorElement.hreflang;
```

## See also

- `HTMLLinkElement.hreflang` property
