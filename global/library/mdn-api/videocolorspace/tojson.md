---
title: "VideoColorSpace: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videocolorspace/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoColorSpace: toJSON() method

The **`toJSON()`** method of the `VideoColorSpace` interface returns a JSON-serializable plain object representing the `VideoColorSpace` object.

The method is automatically called by `JSON.stringify()` when a `VideoColorSpace` object is encountered during JSON serialization. The serialized value can then be deserialized using the `VideoColorSpace()` constructor within the reviver of `JSON.parse()`.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `fullRange`
- `matrix`
- `primaries`
- `transfer`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

Calling `toJSON()` directly returns a plain object containing the `VideoColorSpace` object's properties.

```js
const colorSpace = new VideoColorSpace({
  primaries: "bt709",
  transfer: "bt709",
  matrix: "bt709",
  fullRange: true,
});

const json = colorSpace.toJSON();
console.log(json);
// { fullRange: true, matrix: "bt709", primaries: "bt709", transfer: "bt709" }
console.log(typeof json); // "object"
```

### Serializing to a JSON string

The `VideoColorSpace` object from the previous example is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(colorSpace));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "fullRange": true,
  "matrix": "bt709",
  "primaries": "bt709",
  "transfer": "bt709"
}
```
