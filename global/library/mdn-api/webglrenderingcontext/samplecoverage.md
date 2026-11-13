---
title: "WebGLRenderingContext: sampleCoverage() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglrenderingcontext/samplecoverage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLRenderingContext: sampleCoverage() method

The **`WebGLRenderingContext.sampleCoverage()`** method of the
WebGL API specifies multi-sample coverage
parameters for anti-aliasing effects.

## Syntax

```js
sampleCoverage(value, invert)
```

### Parameters

- `value`
    A `GLclampf` which sets a single floating-point coverage value clamped
    to the range \[0,1]. The default value is 1.0.
- `invert`
    A `GLboolean` which sets whether or not the coverage masks should be
    inverted. The default value is `false`.

### Return value

None (`undefined`).

## Examples

Multi-sampling is disabled by default. To enable or disable multi-sampling, use the
`enable()` and
`disable()` methods with the argument
`gl.SAMPLE_COVERAGE` and `gl.SAMPLE_ALPHA_TO_COVERAGE`.

```js
gl.enable(gl.SAMPLE_COVERAGE);
gl.sampleCoverage(0.5, false);
```

To check the sample coverage values, query the `SAMPLE_COVERAGE_VALUE` and
`SAMPLE_COVERAGE_INVERT` constants.

```js
gl.getParameter(gl.SAMPLE_COVERAGE_VALUE); // 0.5
gl.getParameter(gl.SAMPLE_COVERAGE_INVERT); // false
```

## See also

- `HTMLCanvasElement.getContext()` – `antialias` parameter for
  the context.
