---
title: "SVGPathElement: setPathData() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgpathelement/setpathdata/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGPathElement: setPathData() method

The **`SVGPathElement.setPathData()`** method sets the sequence of path segments as the new path data.

## Syntax

```js
setPathData(pathData)
```

### Parameters

- `pathData`
    An array of path segments.
    Each path segment is an object with the following properties:
    - `type`
        A path commands.
        If `options.normalize` is true this will be one of the absolute commands: `'M'`, `'L'`, `'C'` and `'Z'`.
    - `values`
        An array or value containing the parameters for the corresponding command.

### Return value

None (`undefined`).

## Example

### Set path data

Consider the following `` element, drawing a square:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
  <path d="M0,0 h64 v64 h-64 z" />
</svg>
```

The code below uses `getPathData()` method to return the normalized path data as absolute commands.
Setting the returned data back to the `` element using the `setPathData()` method will result in the different set of path commands in the DOM:

```js
const svgPath = document.querySelector("path");
const pathData = path.getPathData({ normalize: true });

svgPath.setPathData(pathData);

// <path d="M 0 0 L 64 0 L 64 64 L 0 64 Z" />
```
