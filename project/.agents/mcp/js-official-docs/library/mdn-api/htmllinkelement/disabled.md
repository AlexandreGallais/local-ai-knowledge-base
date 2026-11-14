---
title: "HTMLLinkElement: disabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/disabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: disabled property

The **`disabled`** property of the `HTMLLinkElement` interface is a boolean value that represents whether the link is disabled. It only has an effect with style sheet links (`rel` property set to `stylesheet`).

If `disabled` attribute is specified in the HTML when it is loaded, the stylesheet will not be loaded during page load. Instead, the stylesheet will be loaded only when the `disabled` property is set to `false` or removed. Setting the `disabled` property using JavaScript causes the stylesheet to be removed from the document's `Document.styleSheets` list.

It reflects the `disabled` attribute of the `<link>` element.

## Value

A boolean.

## Examples

```html
<link
  id="el"
  href="https://cdn.jsdelivr.net/npm/user@example.com/dist/css/bootstrap.min.css"
  rel="stylesheet"
  disabled
  crossorigin="anonymous" />
```

```js
const el = document.getElementById("el");
console.log(el.disabled); // Output: true

// Set the disabled property to false to enable the stylesheet
el.disabled = false;
console.log(el.disabled); // Output: false
```

## See also

- `HTMLScriptElement.integrity`
- Subresource Integrity
