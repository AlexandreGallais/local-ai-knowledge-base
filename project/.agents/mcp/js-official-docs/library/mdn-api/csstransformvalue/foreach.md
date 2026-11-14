---
title: "CSSTransformValue: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransformvalue/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransformValue: forEach() method

The **`forEach()`** method of the `CSSTransformValue` interface executes a provided function once for each item in the object.

## Syntax

```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

### Parameters

- `callbackFn`
    The function to execute for each element, taking three arguments:
    - `currentValue`
        The item being processed.
    - `index` (optional)
        The index of the current element being processed.
    - `array` (optional)
        The `CSSTransformValue` that `forEach()` is being called on.
- `thisArg` (optional)
    Value to use as `this` when executing `callbackFn`.

### Return value

None (`undefined`).

## Examples

### Iterating with forEach()

```js
const transform = new CSSTransformValue([
  new CSSTranslate(CSS.px(10), CSS.px(20)),
  new CSSScale(2, 3),
]);

transform.forEach((component, index) => {
  console.log(index, component.toString());
});
// 0 "translate(10px, 20px)"
// 1 "scale(2, 3)"
```

## See also

- `CSSTransformValue()`
- `CSSTransformValue.entries()`
- `CSSTransformValue.keys()`
- `CSSTransformValue.length`
- `CSSTransformValue.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
