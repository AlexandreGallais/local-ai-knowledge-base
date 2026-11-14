---
title: "`-webkit-box-reflect` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-webkit-box-reflect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-box-reflect` CSS property

The **`-webkit-box-reflect`** CSS property lets you reflect the content of an element in one specific direction.

## Syntax

```css
/* Direction values */
-webkit-box-reflect: above;
-webkit-box-reflect: below;
-webkit-box-reflect: left;
-webkit-box-reflect: right;

/* Offset value */
-webkit-box-reflect: below 10px;

/* Mask value */
-webkit-box-reflect: below 0 linear-gradient(transparent, white);

/* Global values */
-webkit-box-reflect: inherit;
-webkit-box-reflect: initial;
-webkit-box-reflect: revert;
-webkit-box-reflect: revert-layer;
-webkit-box-reflect: unset;
```

### Values

This property is specified as a space-separated list of the following values:

- `above`_,_ `below`_,_ `right`_,_ `left`
    Are keywords indicating in which direction the reflection is to happen.
- `<length>`
    Indicates the size of the reflection.
- `image`
    Describes the mask to be applied to the reflection.

## Specifications

Not part of any standard. The standard way to do reflection in CSS is to use the CSS `element()` function.

## See also

- The Apple documentation.
- The WebKit specification.
