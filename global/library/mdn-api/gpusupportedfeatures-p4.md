---
title: "GPUSupportedFeatures (part 4 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpusupportedfeatures/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUSupportedFeatures (part 4 of 4)

| `subgroups`                          | When enabled, allows the use of subgroups in WGSL. Subgroups enable SIMD-level parallelism, allowing threads in a workgroup to communicate and execute collective math operations such as calculating a sum of numbers, and offering an efficient method for cross-thread data sharing. Note that the `subgroupMinSize` and `subgroupMaxSize` properties can be useful to check if, for example, you have a hardcoded algorithm that requires a subgroup of a certain size. You can use f16 values with subgroups when you request a GPUDevice with both the `shader-f16` and `subgroups` features. When `subgroups` is enabled, it also allows the `subgroup_id` WGSL language feature to be used.                                                                                                                                                                                                                                                  |
| `texture-component-swizzle`          | When enabled, allows the `swizzle` property to be set when calling `GPUTexture.createView()`. This feature allows a texture's red, green, blue, and alpha channel values to be rearranged or replaced in a texture view when accessed by a shader.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `texture-compression-bc`             | When enabled, allows creation of two-dimensional BC compressed textures. If `texture-compression-bc` is enabled, the following values can be used for the `format` property of the `createTexture()` descriptor when creating a `GPUTexture`: `bc1-rgba-unorm`, `bc1-rgba-unorm-srgb`, `bc2-rgba-unorm`, `bc2-rgba-unorm-srgb`, `bc3-rgba-unorm`, `bc3-rgba-unorm-srgb`, `bc4-r-unorm`, `bc4-r-snorm`, `bc5-rg-unorm`, `bc5-rg-snorm`, `bc6h-rgb-ufloat`, `bc6h-rgb-float`, `bc7-rgba-unorm`, and `bc7-rgba-unorm-srgb`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `texture-compression-bc-sliced-3d`   | When enabled, allows creation of three-dimensional BC compressed textures. If `texture-compression-bc-sliced-3d` is enabled, `texture-compression-bc` must also be enabled, as it enables the BC texture formats to be used (see `texture-compression-bc`, above) in the first two dimensions. `texture-compression-bc-sliced-3d` enables those same textures to be used in the third dimension.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `texture-compression-astc`           | When enabled, allows creation of two-dimensional ASTC compressed textures. If `texture-compression-astc` is enabled, the following values can be used for the `format` property of the `createTexture()` descriptor when creating a `GPUTexture`: `astc-4x4-unorm`, `astc-4x4-unorm-srgb`, `astc-5x4-unorm`, `astc-5x4-unorm-srgb`, `astc-5x5-unorm`, `astc-5x5-unorm-srgb`, `astc-6x5-unorm`, `astc-6x5-unorm-srgb`, `astc-6x6-unorm`, `astc-6x6-unorm-srgb`, `astc-8x5-unorm`, `astc-8x5-unorm-srgb`, `astc-8x6-unorm`, `astc-8x6-unorm-srgb`, `astc-8x8-unorm`, `astc-8x8-unorm-srgb`, `astc-10x5-unorm`, `astc-10x5-unorm-srgb`, `astc-10x6-unorm`, `astc-10x6-unorm-srgb`, `astc-10x8-unorm`, `astc-10x8-unorm-srgb`, `astc-10x10-unorm`, `astc-10x10-unorm-srgb`, `astc-12x10-unorm`, `astc-12x10-unorm-srgb`, and `astc-12x12-unorm``astc-12x12-unorm-srgb`.                                                                                                                                                                                          |
| `texture-compression-astc-sliced-3d` | When enabled, allows creation of three-dimensional ASTC compressed textures. If `texture-compression-astc-sliced-3d` is enabled, `texture-compression-astc` must also be enabled, as it enables the ASTC texture formats to be used (see `texture-compression-astc`, above) in the first two dimensions. `texture-compression-astc-sliced-3d` enables those same textures to be used in the third dimension.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `texture-compression-etc2`           | When enabled, allows creation of two-dimensional ETC2 compressed textures. If `texture-compression-etc2` is enabled, the following values can be used for the `format` property of the `createTexture()` descriptor when creating a `GPUTexture`: `etc2-rgb8unorm`, `etc2-rgb8unorm-srgb`, `etc2-rgb8a1unorm`, `etc2-rgb8a1unorm-srgb`, `etc2-rgba8unorm`, `etc2-rgba8unorm-srgb`, `eac-r11unorm`, `eac-r11snorm`, `eac-rg11unorm`, and `eac-rg11snorm`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `texture-formats-tier1`              | When enabled, automatically enables the `rg11b10ufloat-renderable` feature, and allows creation of `GPUTexture`s (via `GPUDevice.createTexture()`) with the formats specified in Tier 1. The Tier 1 set of texture formats is designed to allow developers to port existing content to the web without needing to rewrite it to use WebGPU's lower capabilities.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `texture-formats-tier2`              | When enabled, automatically enables the `rg11b10ufloat-renderable` and `texture-formats-tier1` features, and allows creation of `GPUTexture`s (via `GPUDevice.createTexture()`) with the formats specified in Tier 2. The Tier 2 set of texture formats supports storage texture formats that don't have support in "core" WebGPU, and are required for advanced usage.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `timestamp-query`                    | When enabled, allows timestamp queries to be run, which measure the time taken to run compute and render passes. If `timestamp-query` is enabled, the `timestamp` value can be set for the `type` property of the `createQuerySet()` descriptor when creating a `GPUQuerySet`. In addition, the `timestampWrites` property can be set on the `beginComputePass()` and `beginRenderPass()` descriptor when creating a `GPUComputePassEncoder` and `GPURenderPassEncoder`, respectively. `GPUQuerySet` objects are referenced within the objects included in the `timestampWrites` property, to specify where timestamps should be written to.                                                                                                                                                                                                                                                                                  |

## Instance properties

The following properties are available to all read-only `Set`-like objects (the links below are to the `Set` global object reference page).

- `size`
    Returns the number of values in the set.

## Instance methods

The following methods are available to all read-only `Set`-like objects (the below links are to the `Set` global object reference page).

- `has()`
    Returns a boolean asserting whether an element is present with the given value in the set or not.
- `values()`
    Returns a new iterator object that yields the **values** for each element in the set in insertion order.
- `keys()`
    An alias for `values()`.
- `entries()`
    Returns a new iterator object that contains **an array of `[value, value]`** for each element in the set, in insertion order.
- `forEach()`
    Calls a provided callback function once for each value present in the set, in insertion order.

## Examples

```js
async function init() {
  if (!navigator.gpu) {
    throw Error("WebGPU not supported.");
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const adapterFeatures = adapter.features;

  // Return the size of the set
  console.log(adapterFeatures.size);

  // Check whether a feature is supported by the adapter
  console.log(adapterFeatures.has("texture-compression-astc"));

  // Iterate through all the set values using values()
  const valueIterator = adapterFeatures.values();
  for (const value of valueIterator) {
    console.log(value);
  }

  // Iterate through all the set values using keys()
  const keyIterator = adapterFeatures.keys();
  for (const value of keyIterator) {
    console.log(value);
  }

  // Iterate through all the set values using entries()
  const entryIterator = adapterFeatures.entries();
  for (const entry of entryIterator) {
    console.log(entry[0]);
  }

  // Iterate through all the set values using forEach()
  adapterFeatures.forEach((value) => {
    console.log(value);
  });

  // …
}
```

## See also

- The WebGPU API
- The specification Feature Index
