---
title: "HTMLImageElement: border property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/border/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: border property

The _deprecated_ **`border`** property of the `HTMLImageElement` interface specifies the number of pixels thick the border surrounding the image should be. A value of 0, the default, indicates that no border should be drawn. It reflects the `` element's `border` content attribute.

You should instead use the CSS property `border` or its longhand properties to not only set the thickness of the border but also to potentially apply a wide variety of other styling options to it.

## Value

A string containing an integer value specifying the thickness of the border that should surround the image, in CSS pixels. A value of `0`, or an empty string, indicates that there should be no border drawn. The default value of `border` is `0`.

When set to the `null` value, that `null` value is converted to the empty string (`""`), so `elt.border = null` is equivalent to `elt.border = ""`.

## Examples

### Setting the border attribute

```js
const img = new Image();
img.src = "example.png";
img.border = "1";
```

Instead of using the deprecated `border` property, consider setting the CSS `border` property instead:

```js
const img = new Image();
img.src = "example.png";
img.style.border = "1px solid black";
```
