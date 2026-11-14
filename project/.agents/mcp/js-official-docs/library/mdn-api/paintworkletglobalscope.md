---
title: "PaintWorkletGlobalScope"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paintworkletglobalscope/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaintWorkletGlobalScope

The **`PaintWorkletGlobalScope`** interface of the CSS Painting API represents the global object available inside a paint `Worklet`.

## Privacy concerns

To avoid leaking visited links, this feature is currently disabled in Chrome-based browsers for `` elements with an `href` attribute, and for children of such elements. For details, see the following:

- The CSS Painting API Privacy Considerations section
- The CSS Painting API spec issue "CSS Paint API leaks browsing history"

## Instance properties

_This interface inherits properties from `WorkletGlobalScope`._

- `PaintWorkletGlobalScope.devicePixelRatio` (read-only) (experimental)
    Returns the current device's ratio of physical pixels to logical pixels.

## Instance methods

_This interface inherits methods from `WorkletGlobalScope`._

- `PaintWorkletGlobalScope.registerPaint()` (experimental)
    Registers a class to programmatically generate an image where a CSS property expects a file.

## Examples

The following three examples go together to show creating, loading, and using a paint `Worklet`.

### Create a paint worklet

The following shows an example worklet module. This should be in a separate js file. Note that `registerPaint()` is called without a reference to a paint `Worklet`.

```js
class CheckerboardPainter {
  paint(ctx, geom, properties) {
    // The global object here is a PaintWorkletGlobalScope
    // Methods and properties can be accessed directly
    // as global features or prefixed using self
    const dpr = self.devicePixelRatio;

    // Use `ctx` as if it was a normal canvas
    const colors = ["red", "green", "blue"];
    const size = 32;
    for (let y = 0; y < geom.height / size; y++) {
      for (let x = 0; x < geom.width / size; x++) {
        const color = colors[(x + y) % colors.length];
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(x * size, y * size, size, size);
        ctx.fill();
      }
    }
  }
}

// Register our class under a specific name
registerPaint("checkerboard", CheckerboardPainter);
```

### Load a paint worklet

The following example demonstrates loading the above worklet from its js file and does so by feature detection.

```js
if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule("checkerboard.js");
}
```

### Use a paint worklet

This example shows how to use a paint `Worklet` in a stylesheet, including the simplest way to provide a fallback if `CSS.paintWorklet` isn't supported.

```css
textarea {
  background-image: url("checkerboard.png"); /* Fallback */
  background-image: paint(checkerboard);
}
```

You can also use the `@supports` at-rule.

```css
@supports (background: paint(id)) {
  textarea {
    background-image: paint(checkerboard);
  }
}
```

## See also

- Using the CSS Painting API
- CSS Painting API
- Houdini APIs
