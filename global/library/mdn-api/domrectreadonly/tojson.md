---
title: "DOMRectReadOnly: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domrectreadonly/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMRectReadOnly: toJSON() method

The **`toJSON()`** method of the `DOMRectReadOnly` interface returns a JSON-serializable plain object representing the `DOMRectReadOnly` object.

The method is automatically called by `JSON.stringify()` when a `DOMRectReadOnly` object is encountered during JSON serialization. The serialized value can then be deserialized using the `DOMRectReadOnly.fromRect()` function within the reviver of `JSON.parse()`.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `x`
- `y`
- `width`
- `height`
- `top`
- `right`
- `bottom`
- `left`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

Calling `toJSON()` directly returns a plain object containing the `DOMRectReadOnly` object's properties.

```js
const rect = new DOMRectReadOnly(10, 20, 100, 50);

const json = rect.toJSON();
console.log(json);
// { x: 10, y: 20, width: 100, height: 50, top: 20, right: 110, bottom: 70, left: 10 }
console.log(typeof json); // "object"
```

### Serializing to a JSON string

The `DOMRectReadOnly` object from the previous example is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
const rectJSON = JSON.stringify(rect);
console.log(rectJSON);
```

This would log a JSON string like so (formatted for readability):

```json
{
  "x": 10,
  "y": 20,
  "width": 100,
  "height": 50,
  "top": 20,
  "right": 110,
  "bottom": 70,
  "left": 10
}
```
