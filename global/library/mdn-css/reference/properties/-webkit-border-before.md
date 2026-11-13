---
title: "`-webkit-border-before` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-webkit-border-before/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-border-before` CSS property

The **`-webkit-border-before`** CSS shorthand property sets the individual logical block start border property values in a single place in the style sheet.

## Constituent properties

This property is a shorthand for the following CSS properties:

- `-webkit-border-before-color`
- `-webkit-border-before-style`
- `-webkit-border-before-width`

## Syntax

```css
/* Border values */
-webkit-border-before: 1px;
-webkit-border-before: 2px dotted;
-webkit-border-before: medium dashed blue;

/* Global values */
-webkit-border-before: inherit;
-webkit-border-before: initial;
-webkit-border-before: revert;
-webkit-border-before: revert-layer;
-webkit-border-before: unset;
```

### Values

This property is specified as a space-separated list of one to three of the following values:

- `<'border-width'>`
    See `border-width`
- `<'border-style'>`
    See `border-style`
- `<'color'>`
    See `color`

## Description

The `-webkit-border-before` property maps to a physical border depending on the element's writing mode, directionality, and text orientation. It corresponds to the `border-top`, `border-right`, `border-bottom`, or `border-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

It relates to `-webkit-border-after`, `-webkit-border-start`, and `-webkit-border-end`, which define the other borders of the element.

The standard-track equivalent of this property is `border-block-start`.

## Examples

### Applying a border with vertical text

#### HTML

```html
<div>
  <p class="exampleText">Example text</p>
</div>
```

#### CSS

```css
div {
  background-color: yellow;
  width: 120px;
  height: 120px;
}

.exampleText {
  writing-mode: vertical-rl;
  -webkit-border-before: 5px dashed blue;
}
```

#### Result

## Specifications

Not part of any standard, but it relates to the standards-track `border-block-start` property.

## See also

- `border-block-start`
- The mapped physical properties: `border-top`, `border-right`, `border-bottom`, and `border-left`
- `writing-mode`, `direction`, `text-orientation`
