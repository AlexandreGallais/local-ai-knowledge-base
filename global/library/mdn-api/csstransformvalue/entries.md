---
title: "CSSTransformValue: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransformvalue/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransformValue: entries() method

The **`entries()`** method of the `CSSTransformValue` interface returns a new _array iterator_ that yields `[index, value]` pairs for each item in the object.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Iterating over index/value pairs

```js
const transform = new CSSTransformValue([
  new CSSTranslate(CSS.px(10), CSS.px(20)),
  new CSSScale(2, 3),
]);

for (const [index, component] of transform.entries()) {
  console.log(index, component.toString());
}
// 0 "translate(10px, 20px)"
// 1 "scale(2, 3)"
```

## See also

- `CSSTransformValue()`
- `CSSTransformValue.forEach()`
- `CSSTransformValue.keys()`
- `CSSTransformValue.length`
- `CSSTransformValue.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
