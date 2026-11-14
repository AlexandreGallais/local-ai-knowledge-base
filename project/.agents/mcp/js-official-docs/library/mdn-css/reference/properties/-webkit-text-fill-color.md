---
title: "`-webkit-text-fill-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-webkit-text-fill-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-text-fill-color` CSS property

The **`-webkit-text-fill-color`** CSS property specifies the fill color of characters of text. If this property is not set, the value of the `color` property is used.

## Syntax

```css
/* <color> values */
-webkit-text-fill-color: red;
-webkit-text-fill-color: #123456;
-webkit-text-fill-color: rgb(100 200 0);

/* Global values */
-webkit-text-fill-color: inherit;
-webkit-text-fill-color: initial;
-webkit-text-fill-color: revert;
-webkit-text-fill-color: revert-layer;
-webkit-text-fill-color: unset;
```

### Values

This property is specified as one `<color>` value:

- `<color>`
    The foreground fill color of the element's text content.

## Examples

### Changing the fill color

#### HTML

```html
<p>This text is green.</p>
```

#### CSS

```css
p {
  margin: 0;
  font-size: 3em;
  -webkit-text-fill-color: green;
}
```

#### Results

## See also

- Introducing Text-Stroke on webkit.org (2006)
- CSS-Tricks article explaining this feature
- `-webkit-text-stroke-color`
- `-webkit-text-stroke-width`
- `-webkit-text-stroke`
