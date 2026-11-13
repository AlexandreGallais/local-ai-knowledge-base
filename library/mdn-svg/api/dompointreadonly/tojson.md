---
title: "DOMPointReadOnly: toJSON() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dompointreadonly/tojson/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMPointReadOnly: toJSON() method

The **`toJSON()`** method of the `DOMPointReadOnly` interface returns a JSON-serializable plain object representing the `DOMPointReadOnly` object.

The method is automatically called by `JSON.stringify()` when a `DOMPointReadOnly` object is encountered during JSON serialization. The serialized value can then be deserialized using the `DOMPointReadOnly.fromPoint()` function within the reviver of `JSON.parse()`.

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
- `z`
- `w`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

Calling `toJSON()` directly returns a plain object containing the `DOMPointReadOnly` object's properties.

```js
const point = new DOMPointReadOnly(10, 20);

const json = point.toJSON();
console.log(json);
// { x: 10, y: 20, z: 0, w: 1 }
console.log(typeof json); // "object"
```

### Serializing to a JSON string

The `DOMPointReadOnly` object from the previous example is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
const pointJSON = JSON.stringify(point);
console.log(pointJSON);
```

This would log a JSON string like so (formatted for readability):

```json
{
  "x": 10,
  "y": 20,
  "z": 0,
  "w": 1
}
```
