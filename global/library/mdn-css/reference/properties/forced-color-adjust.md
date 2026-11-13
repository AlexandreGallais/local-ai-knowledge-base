---
title: "`forced-color-adjust` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/forced-color-adjust/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `forced-color-adjust` CSS property

The **`forced-color-adjust`** CSS property allows authors to opt certain elements out of forced colors mode. This then restores the control of those values to CSS.

## Syntax

```css
forced-color-adjust: auto;
forced-color-adjust: none;
forced-color-adjust: preserve-parent-color;

/* Global values */
forced-color-adjust: inherit;
forced-color-adjust: initial;
forced-color-adjust: revert;
forced-color-adjust: revert-layer;
forced-color-adjust: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    The element's colors are adjusted by the user agent in forced colors mode. This is the default value.
- `none`
    The element's colors are not automatically adjusted by the user agent in forced colors mode.
- `preserve-parent-color`
    In forced colors mode, if the `color` property inherits from its parent (i.e., there is no cascaded value or the cascaded value is `currentColor`, `inherit`, or another keyword that inherits from the parent), then it computes to the used color of its parent's `color` property. In all other cases, it behaves the same as `none`.

## Usage notes

This property should only be used to makes changes that will support a user's color and contrast requirements. For example, if you become aware that the color optimizations made by the user agent result in a poor experience when in a high contrast or dark mode. Using this property would enable tweaking of the result in that mode to provide a better experience. **It should not be used to prevent user choices being respected**.

## Examples

### Preserving colors

In the example below the first box will use the color scheme that the user has set. For example in Windows High Contrast mode black scheme it will have a black background and white text. The second box will preserve the site colors set on the `.box` class.

By using the `forced-colors` media feature, you could add any other optimizations for forced color mode alongside the `forced-color-adjust` property.

#### HTML

```html
<div class="box">
  <p>This is a box which should use your color preferences.</p>
</div>

<div class="box forced">
  <p>This is a box which should stay the colors set by the site.</p>
</div>
```

#### CSS

```css
.box {
  border: 5px solid grey;
  background-color: #cccccc;
  width: 300px;
  margin: 20px;
  padding: 10px;
}

@media (forced-colors: active) {
  .forced {
    forced-color-adjust: none;
  }
}
```

#### Result

The following screenshot shows the image above in Windows High Contrast Mode:

## See also

- Styling for Windows high contrast with standards for forced colors.
- `print-color-adjust`
