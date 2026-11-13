---
title: "HTMLAnchorElement: text property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlanchorelement/text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAnchorElement: text property

The **`text`** property of the `HTMLAnchorElement` represents the text inside the element.
This property represents the same information as `Node.textContent`.

## Value

A string.

## Example

```html
<a id="exampleLink" href="https://example.com">Example Link</a>
<p class="text"></p>
```

```css
#exampleLink {
  font-size: 1.5rem;
}
```

```js
const anchorElement = document.getElementById("exampleLink");
const pTag = document.querySelector(".text");
pTag.textContent = `Text property: ${anchorElement.text}`;
```

## See also

- `HTMLScriptElement.text` property
- `HTMLOptionElement.text` property
