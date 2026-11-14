---
title: "OrientationSensor: populateMatrix() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/orientationsensor/populatematrix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OrientationSensor: populateMatrix() method

The **`populateMatrix()`** method of the
`OrientationSensor` interface populates the given target matrix with the
rotation matrix based on the latest sensor reading. The rotation matrix is shown
below.

where:

- W = cos(θ/2)
- X = Vx \* sin(θ/2)
- Y = Vy \* sin(θ/2)
- Z = Vz \* sin(θ/2)

## Syntax

```js
populateMatrix(targetMatrix)
```

Because `OrientationSensor` is a base class, `populateMatrix`
may only be read from one of its derived classes.

### Parameters

- `targetMatrix`
    TBD

### Return value

None (`undefined`).

## Examples

```js
// TBD
```
