---
title: "CSSTranslate: CSSTranslate() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstranslate/csstranslate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTranslate: CSSTranslate() constructor

The **`CSSTranslate()`** constructor creates a new `CSSTranslate` object representing the `translate()` value of the individual `transform` property in CSS.

## Syntax

```js
new CSSTranslate(x, y)
new CSSTranslate(x, y, z)
```

### Parameters

- `x`
    A value for the x-axis of the `CSSTranslate` object to be constructed.
    This must be a `length-percentage`.
- `y`
    A value for the y-axis of the `CSSTranslate` object to be constructed.
    This must be a `length-percentage`.
- `z` (optional)
    A value for the z-axis of the `CSSTranslate` object to be constructed.
    This must be a `length`.

    If a value is passed for the `z-axis` this is a 3D transform.
    The value of `is2D` will be set to false.

### Exceptions

- `TypeError`
    Thrown if the value of `CSSTranslate.x` or `CSSTranslate.y` is not a `length-percentage`, or if the value of `CSSTranslate.z` exists but is not a `length`.

## Examples

To do
