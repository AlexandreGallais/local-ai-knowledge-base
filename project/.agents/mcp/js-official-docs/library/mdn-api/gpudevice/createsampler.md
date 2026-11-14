---
title: "GPUDevice: createSampler() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/createsampler/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: createSampler() method

The **`createSampler()`** method of the
`GPUDevice` interface creates a `GPUSampler`, which controls how shaders transform and filter texture resource data.

## Syntax

```js
createSampler()
createSampler(descriptor)
```

### Parameters

- `descriptor` (optional)
    An object containing the following properties:
    - `addressModeU` (optional)
        An enumerated value specifying the behavior of the sampler when the sample footprint width extends beyond the width of the texture. Possible values are:
        - `"clamp-to-edge"`: The texture coordinates are clamped between 0.0 and 1.0, inclusive.
        - `"repeat"`: The texture coordinates wrap to the other side of the texture.
        - `"mirror-repeat"`: The texture coordinates wrap to the other side of the texture, but the texture is flipped when the integer part of the coordinate is odd.

        If omitted, `addressModeU` defaults to `"clamp-to-edge"`.

    - `addressModeV` (optional)
        An enumerated value specifying the behavior of the sampler when the sample footprint height extends beyond the height of the texture. Possible and default values are the same as for `addressModeU`.
    - `addressModeW` (optional)
        An enumerated value specifying the behavior of the sampler when the sample footprint depth extends beyond the depth of the texture. Possible and default values are the same as for `addressModeU`.

    - `compare` (optional)
        If specified, the sampler will be a comparison sampler of the specified type. Possible (enumerated) values are:
        - `"never"`: Comparison tests never pass.
        - `"less"`: A provided value passes the comparison test if it is less than the sampled value.
        - `"equal"`: A provided value passes the comparison test if it is equal to the sampled value.
        - `"less-equal"`: A provided value passes the comparison test if it is less than or equal to the sampled value.
        - `"greater"`: A provided value passes the comparison test if it is greater than the sampled value.
        - `"not-equal"`: A provided value passes the comparison test if it is not equal to the sampled value.
        - `"greater-equal"`: A provided value passes the comparison test if it is greater than or equal to the sampled value.
        - `"always"`: Comparison tests always pass.

        Comparison samplers may use filtering, but the sampling results will be implementation-dependent and may differ from the normal filtering rules.

    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.

    - `lodMinClamp` (optional)
        A number specifying the minimum level of detail used internally when sampling a texture. If omitted, `lodMinClamp` defaults to 0.
    - `lodMaxClamp` (optional)
        A number specifying the maximum level of detail used internally when sampling a texture. If omitted, `lodMaxClamp` defaults to 32.

    - `maxAnisotropy` (optional)
        Specifies the maximum anisotropy value clamp used by the sampler. If omitted, `maxAnisotropy` defaults to 1.

        Most implementations support `maxAnisotropy` values in a range between 1 and 16, inclusive. The value used will be clamped to the maximum value that the underlying platform supports.

    - `magFilter` (optional)
        An enumerated value specifying the sampling behavior when the sample footprint is smaller than or equal to one texel. Possible values are:
        - `"nearest"`: Return the value of the texel nearest to the texture coordinates.
        - `"linear"`: Select two texels in each dimension and return a linear interpolation between their values.

        If omitted, `magFilter` defaults to `"nearest"`.

        > **Note:**
        > The `float32-filterable` feature needs to be enabled for `r32float`-, `rg32float`-, and `rgba32float`-`format` `GPUTexture`s to be filterable.

    - `minFilter` (optional)
        An enumerated value specifying the sampling behavior when the sample footprint is larger than one texel. Possible and default values are the same as for `magFilter`.
    - `mipmapFilter` (optional)
        An enumerated value specifying the behavior when sampling between mipmap levels. Possible and default values are the same as for `magFilter`.

### Return value

A `GPUSampler` object instance.

### Validation

The following criteria must be met when calling **`createSampler()`**, otherwise a `GPUValidationError` is generated and an invalid `GPUSampler` object is returned:

- `lodMinClamp` is equal to or more than 0.
- `lodMaxClamp` is equal to or more than `lodMinClamp`.
- `maxAnisotropy` is equal to or more than 1.
- If `maxAnisotropy` is more than 1, `magFilter`, `minFilter`, and `mipmapFilter` are `"linear"`.

## Examples

The following snippet creates a `GPUSampler` that does trilinear filtering and repeats texture coordinates:

```js
// …

const sampler = device.createSampler({
  addressModeU: "repeat",
  addressModeV: "repeat",
  magFilter: "linear",
  minFilter: "linear",
  mipmapFilter: "linear",
});
```

The WebGPU samples Shadow Mapping sample uses comparison samplers to sample from a depth texture to render shadows.

## See also

- The WebGPU API
