---
title: "`-webkit-text-stroke-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-webkit-text-stroke-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-text-stroke-width` CSS property

The **`-webkit-text-stroke-width`** CSS property specifies the width of the stroke for text.

## Syntax

```css
/* Keyword values */
-webkit-text-stroke-width: thin;
-webkit-text-stroke-width: medium;
-webkit-text-stroke-width: thick;

/* <length> values */
-webkit-text-stroke-width: 2px;
-webkit-text-stroke-width: 0.1em;
-webkit-text-stroke-width: 1mm;
-webkit-text-stroke-width: 5pt;

/* Global values */
-webkit-text-stroke-width: inherit;
-webkit-text-stroke-width: initial;
-webkit-text-stroke-width: revert;
-webkit-text-stroke-width: revert-layer;
-webkit-text-stroke-width: unset;
```

### Values

This property is specified as the following value:

- `<line-width>`
    The width of the stroke.

## Examples

### Varying stroke widths

#### HTML

```html
<p id="thin">Thin stroke</p>
<p id="medium">Medium stroke</p>
<p id="thick">Thick stroke</p>
```

#### CSS

```css
p {
  margin: 0;
  font-size: 4em;
  -webkit-text-stroke-color: red;
}

#thin {
  -webkit-text-stroke-width: thin;
}

#medium {
  -webkit-text-stroke-width: 3px;
}

#thick {
  -webkit-text-stroke-width: 1.5mm;
}
```

#### Results

## See also

- Introducing Text-Stroke on webkit.org (2006)
- CSS-Tricks article explaining this feature
- `-webkit-text-stroke-color`
- `-webkit-text-stroke`
- `-webkit-text-fill-color`
