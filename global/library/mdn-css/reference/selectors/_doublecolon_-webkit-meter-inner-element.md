---
title: "`::-webkit-meter-inner-element` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-webkit-meter-inner-element/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-webkit-meter-inner-element` CSS pseudo-element

**`::-webkit-meter-inner-element`** is a proprietary WebKit CSS pseudo-element for selecting and applying styles to the outer containing element of a `<meter>` element. Additional markup to render the meter element as read-only.

## Syntax

```css
::-webkit-meter-inner-element {
  /* ... */
}
```

## Examples

This will only work in WebKit and Blink-based browsers, such as Safari, Chrome, and Chromium-based versions of Edge.

### HTML

```html
Normal: <meter min="0" max="10" value="6">Score 6/10</meter>
<br />
Styled: <meter id="styled" min="0" max="10" value="6">Score 6/10</meter>
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

#styled::-webkit-meter-inner-element {
  -webkit-appearance: inherit;
  box-sizing: inherit;
  border: 1px dashed #aaaaaa;
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

- `::-webkit-meter-bar`
- `::-webkit-meter-even-less-good-value`
- `::-webkit-meter-optimum-value`
- `::-webkit-meter-suboptimum-value`
