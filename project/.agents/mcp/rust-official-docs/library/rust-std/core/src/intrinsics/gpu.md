---
title: "core::intrinsics::gpu"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/intrinsics/gpu.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::intrinsics::gpu

Intrinsics for GPU targets.

Intrinsics in this module are intended for use on GPU targets.
They can be target specific but in general GPU targets are similar.

## fn amdgpu_dispatch_ptr

```rust
pub fn amdgpu_dispatch_ptr() -> *const ()
```

Returns a pointer to the HSA kernel dispatch packet.

A `gpu-kernel` on amdgpu is always launched through a kernel dispatch packet.
The dispatch packet contains the workgroup size, launch size and other data.
The content is defined by the [HSA Platform System Architecture Specification],
which is implemented e.g. in AMD's [hsa.h].
The intrinsic returns a unit pointer so that rustc does not need to know the packet struct.
The pointer is valid for the whole lifetime of the program.
