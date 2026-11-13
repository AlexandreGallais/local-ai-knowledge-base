---
title: "`::-webkit-meter-even-less-good-value` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-webkit-meter-even-less-good-value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-webkit-meter-even-less-good-value` CSS pseudo-element

The **`::-webkit-meter-even-less-good-value`** styles the `<meter>` element when the value and the optimum attributes fall outside the low-high range, but in opposite zones. To illustrate, it applies when _value_ < _low_ < _high_ < _optimum_ or _value_ > _high_ > _low_ > _optimum_.

Red is the default color.

## Syntax

```css
::-webkit-meter-even-less-good-value {
  /* ... */
}
```

## Examples

### HTML

```html
Normal:
<meter min="0" max="10" low="3" high="7" optimum="8" value="2">
  Score 2/10
</meter>
<br />
Styled:
<meter id="styled" min="0" max="10" low="3" high="7" optimum="8" value="2">
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

#styled::-webkit-meter-even-less-good-value {
  background: linear-gradient(
    to bottom,
    #ff7777,
    #990000 45%,
    #990000 55%,
    #ff7777
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
- `::-webkit-meter-optimum-value`
- `::-webkit-meter-suboptimum-value`
