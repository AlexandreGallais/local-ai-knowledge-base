---
title: "`box-flex` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/box-flex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `box-flex` CSS property

> **Warning:**
> This is a property for controlling parts of the XUL box model. It does not match either the old CSS flexible box layout Module drafts for `box-flex` (which were based on this property) or the behavior of `-webkit-box-flex` (which is based on those drafts). See flexbox for information about the current standard.

The **`-moz-box-flex`** and **`-webkit-box-flex`** CSS properties specify how a `-moz-box` or `-webkit-box` grows to fill the box that contains it, in the direction of the containing box's layout.

## Syntax

```css
/* <number> values */
-moz-box-flex: 0;
-moz-box-flex: 2;
-moz-box-flex: 3.5;
-webkit-box-flex: 0;
-webkit-box-flex: 2;
-webkit-box-flex: 3.5;

/* Global values */
-moz-box-flex: inherit;
-moz-box-flex: initial;
-moz-box-flex: revert;
-moz-box-flex: revert-layer;
-moz-box-flex: unset;
-webkit-box-flex: inherit;
-webkit-box-flex: initial;
-webkit-box-flex: revert;
-webkit-box-flex: revert-layer;
-webkit-box-flex: unset;
```

The `box-flex` property is specified as a `<number>`. If the value is 0, the box does not grow. If it is greater than 0, the box grows to fill a proportion of the available space.

## Notes

The containing box allocates the available extra space in proportion to the flex value of each of the content elements.

Content elements that have zero flex do not grow.

If only one content element has nonzero flex, then it grows to fill the available space.

Content elements that have the same flex grow by the same absolute amounts.

If the flex value is set using the element's `flex` attribute, then the style is ignored.

To make XUL elements in a containing box the same size, set the containing box's `equalsize` attribute to the value `always`. This attribute does not have a corresponding CSS property.

A trick to make all content elements in a containing box the same size, is to give them all a fixed size (e.g., `height: 0`), and the same `box-flex` value greater than zero (e.g., `-moz-box-flex: 1`).

## Examples

### Setting box-flex

```html
<div class="example">
  <p>I will expand to fill extra space</p>
  <p>I will not expand</p>
</div>
```

```css
div.example {
  display: -moz-box;
  display: -webkit-box;
  border: 1px solid black;
  width: 100%;
}
div.example > p:nth-child(1) {
  -moz-box-flex: 1; /* Mozilla */
  -webkit-box-flex: 1; /* WebKit */
  border: 1px solid black;
}
div.example > p:nth-child(2) {
  -moz-box-flex: 0; /* Mozilla */
  -webkit-box-flex: 0; /* WebKit */
  border: 1px solid black;
}
```

## Specifications

Not part of any standard.

## See also

- `box-orient`
- `box-pack`
- `box-direction`
- `flex`
