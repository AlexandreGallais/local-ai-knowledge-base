---
title: "Document: caretRangeFromPoint() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/caretrangefrompoint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: caretRangeFromPoint() method

The **`caretRangeFromPoint()`** method of the `Document` interface returns a `Range` object for the document fragment under the specified coordinates.

This method predates the concept of shadow DOM, and will return unpredictable and implementation-specific results in a document that contains `ShadowRoot` objects.

Use `caretPositionFromPoint()` instead on supporting browsers because it is a standard method that can return the caret position from within `ShadowRoot` instances, provided the relevant shadow roots are passed in its `options` parameter.

## Syntax

```js
caretRangeFromPoint(x, y)
```

### Parameters

- `x`
    A horizontal position within the current viewport.
- `y`
    A vertical position within the current viewport.

### Return value

One of the following:

- A `Range`.
- `null`, if _x_ or _y_ are negative, outside the viewport, or there is no text entry node.

## Examples

Visit the `Document.caretPositionFromPoint()` page to view a live sample of this method.

## Specifications

Not part of any specification.

## See also

- `Document.caretPositionFromPoint()`
