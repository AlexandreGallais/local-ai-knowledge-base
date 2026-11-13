---
title: "prefer-path2d"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-path2d.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-path2d

📝 Prefer `Path2D` for repeatedly drawn canvas paths.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

`Path2D` lets you build a canvas path once and reuse it with `CanvasRenderingContext2D#stroke()`, `CanvasRenderingContext2D#fill()`, and related APIs. Rebuilding the same current path inside animation frames, intervals, or loops does unnecessary work.

This rule intentionally reports only repeated drawing paths. It checks loops, direct `requestAnimationFrame()` and `setInterval()` callbacks, and local functions called from those repeated contexts.

## Examples

```js
// ❌
function draw() {
	context.moveTo(220, 60);
	context.arc(170, 60, 50, 0, 2 * Math.PI);
	context.stroke();
}

function step() {
	draw();
	requestAnimationFrame(step);
}

requestAnimationFrame(step);
```

```js
// ✅
const path = new Path2D();
path.moveTo(220, 60);
path.arc(170, 60, 50, 0, 2 * Math.PI);

function step() {
	context.stroke(path);
	requestAnimationFrame(step);
}

requestAnimationFrame(step);
```
