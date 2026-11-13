---
title: "`::-moz-meter-bar` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-moz-meter-bar/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-moz-meter-bar` CSS pseudo-element

The **`::-moz-meter-bar`** CSS pseudo-element represents the meter gauge in a `<meter>` element. It is used for selecting and applying styles to the gauge inside a meter element.

> **Note:**
> By default, the `<meter>` element uses native styling. To apply your own styles, first set `appearance: none` on the `<meter>` element, and then style using `::-moz-meter-bar`.

## Syntax

```css
meter {
  appearance: none;
}
::-moz-meter-bar {
  /* ... */
}
```

## Examples

### HTML

```html
Normal: <meter min="0" max="10" value="6">Score 6/10</meter>
<br />
Styled: &nbsp;&nbsp;<meter class="styled" min="0" max="10" value="6">
  Score 6/10
</meter>
```

### CSS

```css
meter {
  height: 20px;
  width: 200px;
  vertical-align: -0.4rem;
}

.styled {
  appearance: none;
}

.styled::-moz-meter-bar {
  background: lime;
  box-shadow: 0 2px 3px grey inset;
  border-radius: 5px;
}
```

## Specifications

Not part of any standard.

## See also

- `::-webkit-meter-bar`
- `appearance`
- `accent-color`
