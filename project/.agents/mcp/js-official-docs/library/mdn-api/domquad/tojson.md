---
title: "DOMQuad: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domquad/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMQuad: toJSON() method

The **`toJSON()`** method of the `DOMQuad` interface returns a JSON-serializable plain object representing the `DOMQuad` object.

The method is automatically called by `JSON.stringify()` when a `DOMQuad` object is encountered during JSON serialization. The serialized value can then be deserialized using the `DOMQuad.fromQuad()` function within the reviver of `JSON.parse()`.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `p1`
- `p2`
- `p3`
- `p4`

Each property's value is copied as-is. When the returned object is passed to `JSON.stringify()`, the `p1`, `p2`, `p3`, and `p4` properties are further serialized using `DOMPointReadOnly.toJSON()`.

## Examples

### Calling toJSON() directly

This example creates a `DOMQuad` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const topLeft = new DOMPoint(window.screenX, window.screenY);
const topRight = new DOMPoint(
  window.screenX + window.innerWidth,
  window.screenY,
);
const bottomLeft = new DOMPoint(
  window.screenX,
  window.screenY + window.innerHeight,
);
const bottomRight = new DOMPoint(
  window.screenX + window.innerWidth,
  window.screenY + window.innerHeight,
);

const quad = new DOMQuad(topLeft, topRight, bottomRight, bottomLeft);

const json = quad.toJSON();
console.log(json); // A plain object
console.log(typeof json); // "object"
console.log(json.p1.x); // Same value as quad.p1.x
```

### Serializing to a JSON string

The `DOMQuad` object from the previous example is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
const quadJSON = JSON.stringify(quad);
console.log(quadJSON);
```

For a window at screen coordinates `(0, 0)` with an inner width of `800` and an inner height of `600`, this would log a JSON string like so (formatted for readability):

```json
{
  "p1": {
    "x": 0,
    "y": 0,
    "z": 0,
    "w": 1
  },
  "p2": {
    "x": 800,
    "y": 0,
    "z": 0,
    "w": 1
  },
  "p3": {
    "x": 800,
    "y": 600,
    "z": 0,
    "w": 1
  },
  "p4": {
    "x": 0,
    "y": 600,
    "z": 0,
    "w": 1
  }
}
```
