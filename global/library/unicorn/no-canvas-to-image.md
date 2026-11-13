---
title: "no-canvas-to-image"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-canvas-to-image.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-canvas-to-image

📝 Prefer drawing canvases directly instead of converting them to images.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

`CanvasRenderingContext2D#drawImage()` accepts a canvas as the image source. Converting a canvas to a data URL and loading it as an image, or copying it through `getImageData()` and `putImageData()`, does unnecessary work when the goal is just to draw one canvas onto another.

This rule intentionally checks simple syntactic patterns and does not infer DOM types. For the `toDataURL()` pattern, it only checks identifiers and non-computed property names that contain `canvas`, case-insensitively.

## Examples

```js
// ❌
const image = await loadImage(canvas.toDataURL());
context.drawImage(image, 0, 0);

// ✅
context.drawImage(canvas, 0, 0);
```

```js
// ❌
const imageData = sourceContext.getImageData(0, 0, width, height);
targetContext.putImageData(imageData, 0, 0);

// ✅
targetContext.drawImage(sourceCanvas, 0, 0);
```

```js
// ✅
const imageData = context.getImageData(0, 0, width, height);
imageData.data[0] = 0;
context.putImageData(imageData, 0, 0);
```
