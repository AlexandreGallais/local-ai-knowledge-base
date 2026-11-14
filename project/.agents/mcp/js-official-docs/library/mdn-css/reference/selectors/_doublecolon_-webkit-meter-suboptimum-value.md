---
title: "`::-webkit-meter-suboptimum-value` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-webkit-meter-suboptimum-value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-webkit-meter-suboptimum-value` CSS pseudo-element

The **`::-webkit-meter-suboptimum-value`** pseudo-element styles the `<meter>` element when the value attribute falls outside of the low-high range and is not equivalent to the optimum value.

Yellow is the default color.

## Syntax

```css
::-webkit-meter-suboptimum-value {
  /* ... */
}
```

## Examples

This example will only work in browsers based on WebKit or Blink.

### HTML

```html
Normal:
<meter min="0" max="10" low="3" high="7" optimum="6" value="2">
  Score 2/10
</meter>
<br />
Styled:
<meter id="styled" min="0" max="10" low="3" high="7" optimum="6" value="2">
  Score 2/10
</meter>
```

### CSS

```css
body {
  font-family: monospace;
}

.safari meter {
  /* Reset the default appearance for Safari only */
  /* .safari class is added via JavaScript */
  -webkit-appearance: none;
}

#styled::-webkit-meter-suboptimum-value {
  background: linear-gradient(
    to bottom,
    #ffff77,
    #999900 45%,
    #999900 55%,
    #ffff77
  );
  height: 100%;
  box-sizing: border-box;
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

The pseudo-elements used by WebKit/Blink to style other parts of a `<meter>` element are as follows:

- `::-webkit-meter-inner-element`
- `::-webkit-meter-bar`
- `::-webkit-meter-even-less-good-value`
- `::-webkit-meter-optimum-value`
