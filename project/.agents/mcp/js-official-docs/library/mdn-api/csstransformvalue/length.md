---
title: "CSSTransformValue: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransformvalue/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransformValue: length property

The **`length`** read-only property of the `CSSTransformValue` interface returns the number of items in the object.

## Value

An integer.

## Examples

### Basic usage

```js
const transform = new CSSTransformValue([
  new CSSTranslate(CSS.px(10), CSS.px(20)),
  new CSSScale(2, 3),
]);

console.log(transform.length); // 2
```

## See also

- `CSSTransformValue()`
- `CSSTransformValue.entries()`
- `CSSTransformValue.forEach()`
- `CSSTransformValue.keys()`
- `CSSTransformValue.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
