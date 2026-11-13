---
title: "`::-webkit-meter-bar` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-webkit-meter-bar/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-webkit-meter-bar` CSS pseudo-element

The **`::-webkit-meter-bar`** CSS pseudo-element is a WebKit extension that represents the background of a `<meter>` element. It is used for selecting and applying styles to the container of a meter gauge.

## Syntax

```css
::-webkit-meter-bar {
  /* ... */
}
```

## Examples

### HTML

```html
Normal: <meter min="0" max="10" value="6">Score 6/10</meter>
<br />
Styled: &nbsp;&nbsp;<meter id="styled" min="0" max="10" value="6">
  Score 6/10
</meter>
```

### CSS

```css
meter {
  height: 30px;
  width: 200px;
  vertical-align: -0.8rem;
}
```

```css
.safari meter {
  /* Reset the default appearance for Safari only */
  /* .safari class is added via JavaScript */
  -webkit-appearance: none;
}

#styled::-webkit-meter-bar {
  background: lime;
  box-shadow: 0 10px 20px grey inset;
  border-radius: 10px;
}
```

### JavaScript

```js
// Safari requires <meter> elements to have an `appearance` of `none` for custom styling
// using `::-webkit-meter-*` selectors, but `appearance: none` breaks rendering on Chrome.
// Therefore, we must check if the browser is Safari-based.

const isSafari =
  navigator.userAgent.includes("AppleWebKit/") &&
  !navigator.userAgent.includes("Chrome/");

if (isSafari) {
  document.body.classList.add("safari");
}
```

## Specifications

Not part of any standard.

## See also

- The pseudo-elements used by WebKit/Blink to style other parts of a `<meter>` element are as follows:
  - `::-webkit-meter-inner-element`
  - `::-webkit-meter-even-less-good-value`
  - `::-webkit-meter-optimum-value`
  - `::-webkit-meter-suboptimum-value`

- WebKit CSS extensions
