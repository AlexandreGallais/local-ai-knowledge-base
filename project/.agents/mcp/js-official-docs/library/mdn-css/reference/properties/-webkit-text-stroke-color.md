---
title: "`-webkit-text-stroke-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-webkit-text-stroke-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-text-stroke-color` CSS property

The **`-webkit-text-stroke-color`** CSS property specifies the stroke color of characters of text. If this property is not set, the value of the `color` property is used.

## Syntax

```css
/* <color> values */
-webkit-text-stroke-color: red;
-webkit-text-stroke-color: #e08ab4;
-webkit-text-stroke-color: rgb(200 100 0);

/* Global values */
-webkit-text-stroke-color: inherit;
-webkit-text-stroke-color: initial;
-webkit-text-stroke-color: revert;
-webkit-text-stroke-color: revert-layer;
-webkit-text-stroke-color: unset;
```

### Values

This property is specified as one `<color>` value:

- `<color>`
    The color of the stroke.

## Examples

### Varying the stroke color

#### HTML

```html
<p>Text with stroke</p>
<input type="color" value="#ff0000" />
```

#### CSS

```css
p {
  margin: 0;
  font-size: 4em;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: red; /* Can be changed in the live sample */
}
```

```js
const colorPicker = document.querySelector("input");
colorPicker.addEventListener("change", (evt) => {
  document.querySelector("p").style.webkitTextStrokeColor = evt.target.value;
});
```

#### Results

## See also

- Introducing Text-Stroke on webkit.org (2006)
- CSS-Tricks article explaining this feature
- `-webkit-text-fill-color`
- `-webkit-text-stroke-width`
- `-webkit-text-stroke`
