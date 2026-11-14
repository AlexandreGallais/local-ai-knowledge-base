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

[HSA Platform System Architecture Specification]: https://hsafoundation.com/wp-content/uploads/2021/02/HSA-SysArch-1.2.pdf
[hsa.h]: https://github.com/ROCm/rocm-systems/blob/rocm-7.1.0/projects/rocr-runtime/runtime/hsa-runtime/inc/hsa.h#L2959