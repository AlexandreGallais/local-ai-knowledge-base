---
title: "MathMLElement: blur() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlelement/blur/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLElement: blur() method

The **`blur()`** method of the `MathMLElement` interface removes keyboard focus from the current MathML element.

## Syntax

```js
blur()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Remove focus from a MathML element

#### HTML

```html
<div>
  <math>
    <msup id="myMath" tabindex="0">
      <mi>x</mi>
      <mn>2</mn>
    </msup>
  </math>
  <button id="focusButton">Focus the Math</button>
  <button id="blurButton">Blur the Math</button>
</div>
```

#### JavaScript

```js
const mathElement = document.getElementById("myMath");
const focusButton = document.getElementById("focusButton");
const blurButton = document.getElementById("blurButton");

// Focus the MathMLElement when the "Focus" button is clicked
focusButton.addEventListener("click", () => {
  mathElement.focus();
});

// Blur the MathMLElement when the "Blur" button is clicked
blurButton.addEventListener("click", () => {
  mathElement.blur();
});
```

## See also

- `MathMLElement.focus()`
- `HTMLElement.blur()`
