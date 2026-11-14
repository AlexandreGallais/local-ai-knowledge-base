---
title: "core::intrinsics (part 7 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/intrinsics/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::intrinsics (part 7 of 7)

## fn minimum_number_nsz_f128

```rust
pub const fn minimum_number_nsz_f128(x: f128, y: f128) -> f128
```

Returns the minimum of two `f128` values, ignoring NaN.

This behaves like IEEE 754-2019 minimumNumber, *except* that it does not order signed
zeros deterministically. In particular:
If one of the arguments is NaN (quiet or signaling), then the other argument is returned. If
both arguments are NaN, returns NaN. If the inputs compare equal (such as for the case of `+0.0`
and `-0.0`), either input may be returned non-deterministically.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized version of this intrinsic is `f128::min`.

## fn minimumf16

```rust
pub const fn minimumf16(x: f16, y: f16) -> f16
```

Returns the minimum of two `f16` values, propagating NaN.

This behaves like IEEE 754-2019 minimum. In particular:
If one of the arguments is NaN, then a NaN is returned using the usual NaN propagation rules.
For this operation, -0.0 is considered to be strictly less than +0.0.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

## fn minimumf32

```rust
pub const fn minimumf32(x: f32, y: f32) -> f32
```

Returns the minimum of two `f32` values, propagating NaN.

This behaves like IEEE 754-2019 minimum. In particular:
If one of the arguments is NaN, then a NaN is returned using the usual NaN propagation rules.
For this operation, -0.0 is considered to be strictly less than +0.0.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

## fn minimumf64

```rust
pub const fn minimumf64(x: f64, y: f64) -> f64
```

Returns the minimum of two `f64` values, propagating NaN.

This behaves like IEEE 754-2019 minimum. In particular:
If one of the arguments is NaN, then a NaN is returned using the usual NaN propagation rules.
For this operation, -0.0 is considered to be strictly less than +0.0.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

## fn minimumf128

```rust
pub const fn minimumf128(x: f128, y: f128) -> f128
```

Returns the minimum of two `f128` values, propagating NaN.

This behaves like IEEE 754-2019 minimum. In particular:
If one of the arguments is NaN, then a NaN is returned using the usual NaN propagation rules.
For this operation, -0.0 is considered to be strictly less than +0.0.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

## fn maximum_number_nsz_f16

```rust
pub const fn maximum_number_nsz_f16(x: f16, y: f16) -> f16
```

Returns the maximum of two `f16` values, ignoring NaN.

This behaves like IEEE 754-2019 maximumNumber, *except* that it does not order signed
zeros deterministically. In particular:
If one of the arguments is NaN (quiet or signaling), then the other argument is returned. If
both arguments are NaN, returns NaN. If the inputs compare equal (such as for the case of `+0.0`
and `-0.0`), either input may be returned non-deterministically.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized version of this intrinsic is `f16::max`.

## fn maximum_number_nsz_f32

```rust
pub const fn maximum_number_nsz_f32(x: f32, y: f32) -> f32
```

Returns the maximum of two `f32` values, ignoring NaN.

This behaves like IEEE 754-2019 maximumNumber, *except* that it does not order signed
zeros deterministically. In particular:
If one of the arguments is NaN (quiet or signaling), then the other argument is returned. If
both arguments are NaN, returns NaN. If the inputs compare equal (such as for the case of `+0.0`
and `-0.0`), either input may be returned non-deterministically.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized version of this intrinsic is `f32::max`.

## fn maximum_number_nsz_f64

```rust
pub const fn maximum_number_nsz_f64(x: f64, y: f64) -> f64
```

Returns the maximum of two `f64` values, ignoring NaN.

This behaves like IEEE 754-2019 maximumNumber, *except* that it does not order signed
zeros deterministically. In particular:
If one of the arguments is NaN (quiet or signaling), then the other argument is returned. If
both arguments are NaN, returns NaN. If the inputs compare equal (such as for the case of `+0.0`
and `-0.0`), either input may be returned non-deterministically.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized version of this intrinsic is `f64::max`.

## fn maximum_number_nsz_f128

```rust
pub const fn maximum_number_nsz_f128(x: f128, y: f128) -> f128
```

Returns the maximum of two `f128` values, ignoring NaN.

This behaves like IEEE 754-2019 maximumNumber, *except* that it does not order signed
zeros deterministically. In particular:
If one of the arguments is NaN (quiet or signaling), then the other argument is returned. If
both arguments are NaN, returns NaN. If the inputs compare equal (such as for the case of `+0.0`
and `-0.0`), either input may be returned non-deterministically.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized version of this intrinsic is `f128::max`.

## fn maximumf16

```rust
pub const fn maximumf16(x: f16, y: f16) -> f16
```

Returns the maximum of two `f16` values, propagating NaN.

This behaves like IEEE 754-2019 maximum. In particular:
If one of the arguments is NaN, then a NaN is returned using the usual NaN propagation rules.
For this operation, -0.0 is considered to be strictly less than +0.0.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

## fn maximumf32

```rust
pub const fn maximumf32(x: f32, y: f32) -> f32
```

Returns the maximum of two `f32` values, propagating NaN.

This behaves like IEEE 754-2019 maximum. In particular:
If one of the arguments is NaN, then a NaN is returned using the usual NaN propagation rules.
For this operation, -0.0 is considered to be strictly less than +0.0.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

## fn maximumf64

```rust
pub const fn maximumf64(x: f64, y: f64) -> f64
```

Returns the maximum of two `f64` values, propagating NaN.

This behaves like IEEE 754-2019 maximum. In particular:
If one of the arguments is NaN, then a NaN is returned using the usual NaN propagation rules.
For this operation, -0.0 is considered to be strictly less than +0.0.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

## fn maximumf128

```rust
pub const fn maximumf128(x: f128, y: f128) -> f128
```

Returns the maximum of two `f128` values, propagating NaN.

This behaves like IEEE 754-2019 maximum. In particular:
If one of the arguments is NaN, then a NaN is returned using the usual NaN propagation rules.
For this operation, -0.0 is considered to be strictly less than +0.0.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

## fn fabs

```rust
pub const fn fabs<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns the absolute value of a floating-point value.

The stabilized versions of this intrinsic are available on the float
primitives via the `abs` method. For example, `f32::abs`.

## fn copysignf16

```rust
pub const fn copysignf16(x: f16, y: f16) -> f16
```

Copies the sign from `y` to `x` for `f16` values.

The stabilized version of this intrinsic is
`f16::copysign`

## fn copysignf32

```rust
pub const fn copysignf32(x: f32, y: f32) -> f32
```

Copies the sign from `y` to `x` for `f32` values.

The stabilized version of this intrinsic is
`f32::copysign`

## fn copysignf64

```rust
pub const fn copysignf64(x: f64, y: f64) -> f64
```

Copies the sign from `y` to `x` for `f64` values.

The stabilized version of this intrinsic is
`f64::copysign`

## fn copysignf128

```rust
pub const fn copysignf128(x: f128, y: f128) -> f128
```

Copies the sign from `y` to `x` for `f128` values.

The stabilized version of this intrinsic is
`f128::copysign`

## fn autodiff

```rust
pub const fn autodiff<F, G, T: crate::marker::Tuple, R>(f: F, df: G, args: T) -> R
```

Generates the LLVM body for the automatic differentiation of `f` using Enzyme,
with `df` as the derivative function and `args` as its arguments.

Used internally as the body of `df` when expanding the `#[autodiff_forward]`
and `#[autodiff_reverse]` attribute macros.

Type Parameters:
- `F`: The original function to differentiate. Must be a function item.
- `G`: The derivative function. Must be a function item.
- `T`: A tuple of arguments passed to `df`.
- `R`: The return type of the derivative function.

This shows where the `autodiff` intrinsic is used during macro expansion:

```
#[autodiff_forward(df1, Dual, Const, Dual)]
pub fn f1(x: &[f64], y: f64) -> f64 {
    unimplemented!()
}
```rust

expands to:

```
#[rustc_autodiff]
#[inline(never)]
pub fn f1(x: &[f64], y: f64) -> f64 {
    ::core::panicking::panic("not implemented")
}
#[rustc_autodiff(Forward, 1, Dual, Const, Dual)]
pub fn df1(x: &[f64], bx_0: &[f64], y: f64) -> (f64, f64) {
    ::core::intrinsics::autodiff(f1::<>, df1::<>, (x, bx_0, y))
}
```rust

## fn offload

```rust
pub const fn offload<F, T: crate::marker::Tuple, R>( f: F, workgroup_dim: [u32; 3], thread_dim: [u32; 3], dyn_cache: u32, device_id: i32, args: T, ) -> R
```

Generates the LLVM body of a wrapper function to offload a kernel `f`.

Type Parameters:
- `F`: The kernel to offload. Must be a function item.
- `T`: A tuple of arguments passed to `f`.
- `R`: The return type of the kernel.

Arguments:
- `f`: The kernel function to offload.
- `workgroup_dim`: A 3D size specifying the number of workgroups to launch.
- `thread_dim`: A 3D size specifying the number of threads per workgroup.
- `dyn_cache`: The amount of dynamic shared memory to request for the kernel.
- `device_id`: The device to offload to. Use `-1` to select the default device.
- `args`: A tuple of arguments forwarded to `f`.

Example usage (pseudocode):

```
fn kernel(x: *mut [f64; 128]) {
    core::intrinsics::offload(kernel_1, [256, 1, 1], [32, 1, 1], 0, -1, (x,))
}

#[cfg(target_os = "linux")]
extern "C" {
    pub fn kernel_1(array_b: *mut [f64; 128]);
}

#[cfg(not(target_os = "linux"))]
#[rustc_offload_kernel]
extern "gpu-kernel" fn kernel_1(x: *mut [f64; 128]) {
    unsafe { (*x)[0] = 21.0 };
}
```rust

For reference, see the Clang documentation on offloading:
<https://clang.llvm.org/docs/OffloadingDesign.html>.

## fn offload_get_num_devices

```rust
pub const fn offload_get_num_devices() -> i32
```

Returns the number of offload devices available on the system.

Use this to discover which `device_id` values are valid to pass to
`offload`. Devices are numbered from `0` to the returned value minus one.

Returns `0` if no offloading devices are present.

## fn va_arg

```rust
pub const unsafe fn va_arg<T: VaArgSafe>(ap: &mut VaList<'_>) -> T
```

Loads an argument of type `T` from the `va_list` `ap` and increment the
argument `ap` points to.

# Safety

This function is only sound to call when:

- there is a next variable argument available.
- the next argument's type must be ABI-compatible with the type `T`.
- the next argument must have a properly initialized value of type `T`.

Calling this function with an incompatible type, an invalid value, or when there
are no more variable arguments, is unsound.

## fn va_copy

```rust
pub const fn va_copy<'f>(src: &VaList<'f>) -> VaList<'f>
```

Duplicates a variable argument list. The returned list is initially at the same position as
the one in `src`, but can be advanced independently.

Codegen backends should not have custom behavior for this intrinsic, they should always use
this fallback implementation. This intrinsic *does not* map to the LLVM `va_copy` intrinsic.

This intrinsic exists only as a hook for Miri and constant evaluation, and is used to detect UB
when a variable argument list is used incorrectly.

## fn va_end

```rust
pub const unsafe fn va_end(ap: &mut VaList<'_>)
```

Destroy the variable argument list `ap` after initialization with `va_start` (part of the
desugaring of `...`) or `va_copy`.

Code generation backends should not provide a custom implementation for this intrinsic. This
intrinsic *does not* map to the LLVM `va_end` intrinsic.

This function is a no-op on all current targets, but used as a hook for const evaluation to
detect UB when a variable argument list is used incorrectly.

# Safety

`ap` must not be used to access variable arguments after this call.

## fn return_address

```rust
pub fn return_address() -> *const ()
```

Returns the return address of the caller function (after inlining) in a best-effort manner or a null pointer if it is not supported on the current backend.
Returning an accurate value is a quality-of-implementation concern, but no hard guarantees are
made about the return value: formally, the intrinsic non-deterministically returns
an arbitrary pointer without provenance.

Note that unlike most intrinsics, this is safe to call. This is because it only finds the return address of the immediate caller, which is guaranteed to be possible.
Other forms of the corresponding gcc or llvm intrinsic (which can have wildly unpredictable results or even crash at runtime) are not exposed.
