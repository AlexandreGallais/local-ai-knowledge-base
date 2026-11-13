---
title: "GPUQuerySet: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuqueryset/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUQuerySet: type property

The **`type`** read-only property of the
`GPUQuerySet` interface is an enumerated value specifying the type of queries managed by the `GPUQuerySet`.

## Value

An enumerated value. Possible values are:

- `"occlusion"`
    The `GPUQuerySet` manages occlusion queries.
- `"timestamp"` (experimental)
    The `GPUQuerySet` manages timestamp queries.

> **Note:**
> The `timestamp-query` feature needs to be enabled to use timestamp queries.

## Examples

See the main `GPUQuerySet` page for an example.

## See also

- The WebGPU API
