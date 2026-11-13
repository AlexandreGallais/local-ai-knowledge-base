---
title: "Document: createTouch() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/createtouch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createTouch() method

The **`Document.createTouch()`** method creates and returns a new `Touch` object.

> **Note:**
> Use the `TouchEvent()` constructor.

## Syntax

```js
createTouch(view, target, identifier, pageX, pageY, screenX, screenY)
```

### Parameters

> **Note:**
> All parameters are optional.

- `view`
    The `window` in which the touch occurred.
- `target`
    The `EventTarget` for the touch.
- `identifier`
    The value for `Touch.identifier`.
- `pageX`
    The value for `Touch.pageX`.
- `pageY`
    The value for `Touch.pageY`.
- `screenX`
    The value for `Touch.screenX`.
- `screenY`
    The value for `Touch.screenY`.

> **Note:**
> Previous versions of this method included the
> following additional parameters but those parameters are not included in either of the
> standards listed below. Consequently, these parameters should be considered deprecated
> and not used.

- `clientX`
    The value for `Touch.clientX`.
- `clientY`
    The value for `Touch.clientY`.
- `radiusX`
    The value for `Touch.radiusX`.
- `radiusY`
    The value for `Touch.radiusY`.
- `rotationAngle`
    The value for `Touch.rotationAngle`.
- `force`
    The value for `Touch.force`.

### Return value

A `Touch` object configured as described by the input parameters.

## Examples

This example illustrates using the `Document.createTouch()` method to
create `Touch` objects.

In following code snippet, two `Touch` objects are created for the
`target` element.

```js
const target = document.getElementById("target");

const touch1 = document.createTouch(window, target, 1, 15, 20, 35, 40);
const touch2 = document.createTouch(window, target, 2, 25, 30, 45, 50);
```

## Specifications

This feature is not part of any current specification. It is no longer on track to become a standard.

## See also

- Touch events
- `TouchList`
- `Touch`
- `Document.createTouchList()`
