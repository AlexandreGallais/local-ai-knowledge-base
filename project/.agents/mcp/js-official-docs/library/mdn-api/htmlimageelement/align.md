---
title: "HTMLImageElement: align property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/align/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: align property

The _deprecated_ **`align`** property of the `HTMLImageElement` interface is a string which indicates how to position the image relative to its container. It reflects the `` element's `align` content attribute.

You should instead use the CSS property `vertical-align`, which does in fact also work on images despite its name. You can also use the `float` property to float the image to the left or right margin.

## Value

A string whose value is one of `top`, `middle`, `bottom`, `left`, or `right`. For their meanings, see the HTML `` reference.

## Examples

### Setting the align attribute

```js
const img = new Image();
img.src = "example.png";
img.align = "top";
```

Instead of using the deprecated `align` property, consider setting the CSS `vertical-align` property instead:

```js
const img = new Image();
img.src = "example.png";
img.style.verticalAlign = "top";
```
