---
title: "CSSTransformValue: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransformvalue/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransformValue: values() method

The **`values()`** method of the `CSSTransformValue` interface returns a new _array iterator_ that yields each item in the object.

## Syntax

```js
values()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Iterating over values

```js
const transform = new CSSTransformValue([
  new CSSTranslate(CSS.px(10), CSS.px(20)),
  new CSSScale(2, 3),
]);

for (const component of transform.values()) {
  console.log(component.toString());
}
// "translate(10px, 20px)"
// "scale(2, 3)"
```

## See also

- `CSSTransformValue()`
- `CSSTransformValue.entries()`
- `CSSTransformValue.forEach()`
- `CSSTransformValue.keys()`
- `CSSTransformValue.length`
- Using the CSS Typed OM
- CSS Typed Object Model API
