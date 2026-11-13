---
title: "HTMLElement: title property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/title/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: title property

The **`HTMLElement.title`** property
represents the title of the element: the text usually displayed in a 'tooltip' popup
when the mouse is over the node.

## Value

A string.

## Examples

```js
const link = document.createElement("a");
link.innerText = "grapes";
link.href = "https://en.wikipedia.org/wiki/Grape";
link.title = "Wikipedia page on grapes";
```

## See also

- The HTML **title**
  global attribute.
