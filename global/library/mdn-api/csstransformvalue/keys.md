---
title: "CSSTransformValue: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransformvalue/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransformValue: keys() method

The **`keys()`** method of the `CSSTransformValue` interface returns a new _array iterator_ that yields the index of each item in the object.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Iterating over indexes

```js
const transform = new CSSTransformValue([
  new CSSTranslate(CSS.px(10), CSS.px(20)),
  new CSSScale(2, 3),
]);

for (const index of transform.keys()) {
  console.log(index);
}
// 0
// 1
```

## See also

- `CSSTransformValue()`
- `CSSTransformValue.entries()`
- `CSSTransformValue.forEach()`
- `CSSTransformValue.length`
- `CSSTransformValue.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
