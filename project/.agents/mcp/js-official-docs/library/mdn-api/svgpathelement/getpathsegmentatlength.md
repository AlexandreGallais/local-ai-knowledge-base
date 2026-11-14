---
title: "SVGPathElement: getPathSegmentAtLength() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgpathelement/getpathsegmentatlength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGPathElement: getPathSegmentAtLength() method

The **`getPathSegmentAtLength()`** method of the `SVGPathElement` interface returns the path segment at a given distance along the path.

## Syntax

```js
getPathSegmentAtLength(distance)
```

### Parameters

- `distance`
    A number indicating the distance along the path.

### Return value

A path segment object. If no valid segment exists, returns null.

Segment object has the following properties:

- `type`
    A path commands.
- `values`
    An array or value containing the parameters for the corresponding command.

## Examples

### Get path segment

Consider the following `` element, drawing a square:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
  <path d="M0,0 h64 v64 h-64 z" />
</svg>
```

The `getPathSegmentAtLength()` method will return an object that represents the `v64` segment that lays 65px along the path:

```js
const path = document.querySelector("path");

console.log(path.getPathSegmentAtLength(65));

// Output: path segment
// {
//   type: "v",
//   values: [64]
// }
```
