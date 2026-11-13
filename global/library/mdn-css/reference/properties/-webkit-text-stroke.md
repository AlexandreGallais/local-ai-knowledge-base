---
title: "`-webkit-text-stroke` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-webkit-text-stroke/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-text-stroke` CSS property

The **`-webkit-text-stroke`** CSS shorthand property specifies the width and color of strokes for text characters.

## Constituent properties

This property is a shorthand for the following CSS properties:

- `-webkit-text-stroke-color`
- `-webkit-text-stroke-width`

## Syntax

```css
/* Width and color values */
-webkit-text-stroke: 4px navy;

/* Global values */
-webkit-text-stroke: inherit;
-webkit-text-stroke: initial;
-webkit-text-stroke: revert;
-webkit-text-stroke: revert-layer;
-webkit-text-stroke: unset;
```

### Values

This property is specified as two space-separated values:

- `<length>`
    The width of the stroke.
- `<color>`
    The color of the stroke.

## Examples

### Adding a red text stroke

#### HTML

```html
<p id="example">The stroke of this text is red.</p>
```

#### CSS

```css
#example {
  font-size: 3em;
  margin: 0;
  -webkit-text-stroke: 2px red;
}
```

#### Result

## See also

- Introducing Text-Stroke on webkit.org (2006)
- CSS-Tricks article explaining this feature
- `-webkit-text-stroke-width`
- `-webkit-text-stroke-color`
- `-webkit-text-fill-color`
