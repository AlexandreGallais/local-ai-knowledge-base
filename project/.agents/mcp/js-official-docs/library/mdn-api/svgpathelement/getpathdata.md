---
title: "SVGPathElement: getPathData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgpathelement/getpathdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGPathElement: getPathData() method

The **`SVGPathElement.getPathData()`** method returns the sequence of path segments that corresponds to the path data, optionally normalizing the values and segment types.

## Syntax

```js
getPathData()
getPathData(options)
```

### Parameters

- `options` (optional)
    An optional object for controlling aspects of the path data retrieval process. This object may contain the following properties:
    - `normalize` (optional)
        A boolean value indicating whether the returned sequence of path segments is converted to the base set of absolute commands (`'M'`, `'L'`, `'C'` and `'Z'`), with the values adjusted accordingly.

### Return value

An array of path segments corresponding to the path data. If no valid path data exists, returns an empty sequence.

Each path segment is an object with the following properties:

- `type`
    A path commands.
    If `options.normalize` is true this will be one of the absolute commands: `'M'`, `'L'`, `'C'` and `'Z'`.
- `values`
    An array or value containing the parameters for the corresponding command.

## Examples

### Get path data

Consider the following `` element, drawing a square:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
  <path d="M0,0 h64 v64 h-64 z" />
</svg>
```

The `getPathData()` method will return an array with the raw path data, the same as it's set in the `d` attribute. With the `normalize: true` option set, it will return path data normalized to the base set of path commands:

```js
const path = document.querySelector("path");

console.log(path.getPathData());

// Output: raw path data:
// [
//   { type: "M", values: [0, 0] },
//   { type: "h", values: [64] },
//   { type: "v", values: [64] },
//   { type: "h", values: [-64] },
//   { type: "Z", values: [] }
// ]

console.log(path.getPathData({ normalize: true }));

// Output: normalized path data:
// [
//   { type: "M", values: [0, 0] },
//   { type: "L", values: [64, 0] },
//   { type: "L", values: [64, 64] },
//   { type: "L", values: [0, 64] },
//   { type: "Z", values: [] }
// ]
```
