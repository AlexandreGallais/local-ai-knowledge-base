---
title: "SVGFEDropShadowElement: setStdDeviation() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfedropshadowelement/setstddeviation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEDropShadowElement: setStdDeviation() method

The `setStdDeviation()` method of the `SVGFEDropShadowElement` interface sets the values for the `stdDeviation` attribute.

## Syntax

```js
setStdDeviation(x, y)
```

### Parameters

- `x`
    A float representing X component of the `stdDeviation` attribute.
- `y`
    A float representing Y component of the `stdDeviation` attribute.

### Return value

None (`undefined`).

## Examples

### Using `setStdDeviation()`

In this example, we set the horizontal and vertical standard deviations for a blur operation for a `<feDropShadow>` filter shadow effect using the `setStdDeviation()` method of the `SVGFEDropShadowElement` interface.

```html
<svg height="200" width="200" viewBox="0 0 200 200">
  <defs>
    <filter id="drop-shadow-filter">
      <feDropShadow
        in="SourceGraphic"
        dx="10"
        dy="10"
        stdDeviation="5 5"
        flood-color="gray" />
    </filter>
  </defs>

  <!-- Rectangle with an initial gray shadow -->
  <rect
    x="50"
    y="50"
    width="100"
    height="100"
    fill="red"
    filter="url(#drop-shadow-filter)" />
</svg>

<!-- Button to update the shadow -->
<button id="updateShadow" type="button">Update Shadow</button>
```

```js
// Get the feDropShadow element
const dropShadow = document.querySelector("feDropShadow");

// Button to trigger the update
document.getElementById("updateShadow").addEventListener("click", () => {
  // Change the standard deviation (blur radius) of the shadow
  dropShadow.setStdDeviation(15, 20);
});
```

Click on the red rectangle to update the drop shadow's blur effect.

## See also

- `SVGAnimatedLength`
