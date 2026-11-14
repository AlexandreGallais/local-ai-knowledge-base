---
title: "core::intrinsics (part 6 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/intrinsics/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::intrinsics (part 6 of 7)

## fn saturating_sub

```rust
pub const fn saturating_sub<T: Copy>(a: T, b: T) -> T
```

Computes `a - b`, saturating at numeric bounds.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `saturating_sub` method. For example,
`u32::saturating_sub`

## fn read_via_copy

```rust
pub const unsafe fn read_via_copy<T>(ptr: *const T) -> T
```

This is an implementation detail of `crate::ptr::read` and should
not be used anywhere else.  See its comments for why this exists.

This intrinsic can *only* be called where the pointer is a local without
projections (`read_via_copy(ptr)`, not `read_via_copy(*ptr)`) so that it
trivially obeys runtime-MIR rules about derefs in operands.

## fn write_via_move

```rust
pub const unsafe fn write_via_move<T>(ptr: *mut T, value: T)
```

This is an implementation detail of `crate::ptr::write` and should
not be used anywhere else.  See its comments for why this exists.

This intrinsic can *only* be called where the pointer is a local without
projections (`write_via_move(ptr, x)`, not `write_via_move(*ptr, x)`) so
that it trivially obeys runtime-MIR rules about derefs in operands.

## fn discriminant_value

```rust
pub const fn discriminant_value<T>(v: &T) -> <T as DiscriminantKind>::Discriminant
```

Returns the value of the discriminant for the variant in 'v';
if `T` has no discriminant, returns `0`.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized version of this intrinsic is `core::mem::discriminant`.

## fn catch_unwind

```rust
pub unsafe fn catch_unwind<Data: ptr::Thin>( _try_fn: unsafe fn(*mut Data), _data: *mut Data, _catch_fn: unsafe fn(*mut Data, *mut u8), ) -> bool
```

Rust's "try catch" construct for unwinding. Invokes the function pointer `try_fn` with the
data pointer `data`, and calls `catch_fn` if unwinding occurs while `try_fn` runs.
Returns `true` if unwinding occurred and `catch_fn` was called; returns `false` otherwise.

`catch_fn` must not unwind.

The third argument is a function called if an unwind occurs (both Rust `panic` and foreign
unwinds). This function takes the data pointer and a pointer to the target- and
runtime-specific exception object that was caught.

Note that in the case of a foreign unwinding operation, the exception object data may not be
safely usable from Rust, and should not be directly exposed via the standard library. To
prevent unsafe access, the library implementation may either abort the process or present an
opaque error type to the user.

For more information, see the compiler's source, as well as the documentation for the stable
version of this intrinsic, `std::panic::catch_unwind`.

## fn nontemporal_store

```rust
pub unsafe fn nontemporal_store<T>(ptr: *mut T, val: T)
```

Emits a `nontemporal` store, which gives a hint to the CPU that the data should not be held
in cache. Except for performance, this is fully equivalent to `ptr.write(val)`.

Not all architectures provide such an operation. For instance, x86 does not: while `MOVNT`
exists, that operation is *not* equivalent to `ptr.write(val)` (`MOVNT` writes can be reordered
in ways that are not allowed for regular writes).

## fn ptr_offset_from

```rust
pub const unsafe fn ptr_offset_from<T>(ptr: *const T, base: *const T) -> isize
```

See documentation of `<*const T>::offset_from` for details.

## fn ptr_offset_from_unsigned

```rust
pub const unsafe fn ptr_offset_from_unsigned<T>(ptr: *const T, base: *const T) -> usize
```

See documentation of `<*const T>::offset_from_unsigned` for details.

## fn ptr_guaranteed_cmp

```rust
pub const fn ptr_guaranteed_cmp<T>(ptr: *const T, other: *const T) -> u8
```

See documentation of `<*const T>::guaranteed_eq` for details.
Returns `2` if the result is unknown.
Returns `1` if the pointers are guaranteed equal.
Returns `0` if the pointers are guaranteed inequal.

## fn raw_eq

```rust
pub const unsafe fn raw_eq<T>(a: &T, b: &T) -> bool
```

Determines whether the raw bytes of the two values are equal.

This is particularly handy for arrays, since it allows things like just
comparing `i96`s instead of forcing `alloca`s for `[6 x i16]`.

Above some backend-decided threshold this will emit calls to `memcmp`,
like slice equality does, instead of causing massive code size.

Since this works by comparing the underlying bytes, the actual `T` is
not particularly important.  It will be used for its size and alignment,
but any validity restrictions will be ignored, not enforced.

# Safety

It's UB to call this if any of the *bytes* in `*a` or `*b` are uninitialized.
Note that this is a stricter criterion than just the *values* being
fully-initialized: if `T` has padding, it's UB to call this intrinsic.

At compile-time, it is furthermore UB to call this if any of the bytes
in `*a` or `*b` have provenance.

(The implementation is allowed to branch on the results of comparisons,
which is UB if any of their inputs are `undef`.)

## fn compare_bytes

```rust
pub const unsafe fn compare_bytes(left: *const u8, right: *const u8, bytes: usize) -> i32
```

Lexicographically compare `[left, left + bytes)` and `[right, right + bytes)`
as unsigned bytes, returning negative if `left` is less, zero if all the
bytes match, or positive if `left` is greater.

This underlies things like `<[u8]>::cmp`, and will usually lower to `memcmp`.

# Safety

`left` and `right` must each be [valid] for reads of `bytes` bytes.

Note that this applies to the whole range, not just until the first byte
that differs.  That allows optimizations that can read in large chunks.

## fn black_box

```rust
pub const fn black_box<T>(dummy: T) -> T
```

See documentation of `std::hint::black_box` for details.

## fn const_eval_select

```rust
pub const fn const_eval_select<ARG: Tuple, F, G, RET>( _arg: ARG, _called_in_const: F, _called_at_rt: G, ) -> RET where G: FnOnce<ARG, Output = RET>, F: const FnOnce<ARG, Output = RET>
```

Selects which function to call depending on the context.

If this function is evaluated at compile-time, then a call to this
intrinsic will be replaced with a call to `called_in_const`. It gets
replaced with a call to `called_at_rt` otherwise.

This function is safe to call, but note the stability concerns below.

# Type Requirements

The two functions must be both function items. They cannot be function
pointers or closures. The first function must be a `const fn`.

`arg` will be the tupled arguments that will be passed to either one of
the two functions, therefore, both functions must accept the same type of
arguments. Both functions must return RET.

# Stability concerns

Rust has not yet decided that `const fn` are allowed to tell whether
they run at compile-time or at runtime. Therefore, when using this
intrinsic anywhere that can be reached from stable, it is crucial that
the end-to-end behavior of the stable `const fn` is the same for both
modes of execution. (Here, Undefined Behavior is considered "the same"
as any other behavior, so if the function exhibits UB at runtime then
it may do whatever it wants at compile-time.)

Here is an example of how this could cause a problem:
```rust
#![feature(const_eval_select)]
#![feature(core_intrinsics)]
use std::intrinsics::const_eval_select;

// Standard library
pub const fn inconsistent() -> i32 {
    fn runtime() -> i32 { 1 }
    const fn compiletime() -> i32 { 2 }

    // ⚠ This code violates the required equivalence of `compiletime`
    // and `runtime`.
    const_eval_select((), compiletime, runtime)
}

// User Crate
const X: i32 = inconsistent();
let x = inconsistent();
assert_eq!(x, X);
```

Currently such an assertion would always succeed; until Rust decides
otherwise, that principle should not be violated.

## fn typed_swap_nonoverlapping

```rust
pub const unsafe fn typed_swap_nonoverlapping<T>(x: *mut T, y: *mut T)
```

Non-overlapping *typed* swap of a single value.

The codegen backends will replace this with a better implementation when
`T` is a simple type that can be loaded and stored as an immediate.

The stabilized form of this intrinsic is `crate::mem::swap`.

# Safety
Behavior is undefined if any of the following conditions are violated:

* Both `x` and `y` must be [valid] for both reads and writes.

* Both `x` and `y` must be properly aligned.

* The region of memory beginning at `x` must *not* overlap with the region of memory
  beginning at `y`.

* The memory pointed by `x` and `y` must both contain values of type `T`.

## fn ub_checks

```rust
pub const fn ub_checks() -> bool
```

Returns whether we should perform some UB-checking at runtime. This eventually evaluates to
`cfg!(ub_checks)`, but behaves different from `cfg!` when mixing crates built with different
flags: if the crate has UB checks enabled or carries the `#[rustc_preserve_ub_checks]`
attribute, evaluation is delayed until monomorphization (or until the call gets inlined into
a crate that does not delay evaluation further); otherwise it can happen any time.

The common case here is a user program built with ub_checks linked against the distributed
sysroot which is built without ub_checks but with `#[rustc_preserve_ub_checks]`.
For code that gets monomorphized in the user crate (i.e., generic functions and functions with
`#[inline]`), gating assertions on `ub_checks()` rather than `cfg!(ub_checks)` means that
assertions are enabled whenever the *user crate* has UB checks enabled. However, if the
user has UB checks disabled, the checks will still get optimized out. This intrinsic is
primarily used by `crate::ub_checks::assert_unsafe_precondition`.

# Consteval

In consteval, this function currently returns `true`. This is because the value of the `ub_checks`
configuration can differ across crates, but we need this function to always return the same
value in consteval in order to avoid unsoundness.

## fn overflow_checks

```rust
pub const fn overflow_checks() -> bool
```

Returns whether we should perform some overflow-checking at runtime. This eventually evaluates to
`cfg!(overflow_checks)`, but behaves different from `cfg!` when mixing crates built with different
flags: if the crate has overflow checks enabled or carries the `#[rustc_inherit_overflow_checks]`
attribute, evaluation is delayed until monomorphization (or until the call gets inlined into
a crate that does not delay evaluation further); otherwise it can happen any time.

The common case here is a user program built with overflow_checks linked against the distributed
sysroot which is built without overflow_checks but with `#[rustc_inherit_overflow_checks]`.
For code that gets monomorphized in the user crate (i.e., generic functions and functions with
`#[inline]`), gating assertions on `overflow_checks()` rather than `cfg!(overflow_checks)` means that
assertions are enabled whenever the *user crate* has overflow checks enabled. However if the
user has overflow checks disabled, the checks will still get optimized out.

# Consteval

In consteval, this function currently returns `true`. This is because the value of the `overflow_checks`
configuration can differ across crates, but we need this function to always return the same
value in consteval in order to avoid unsoundness.

## fn const_allocate

```rust
pub const unsafe fn const_allocate(_size: usize, _align: usize) -> *mut u8
```

Allocates a block of memory at compile time.
At runtime, just returns a null pointer.

# Safety

- The `align` argument must be a power of two.
   - At compile time, a compile error occurs if this constraint is violated.
   - At runtime, it is not checked.

## fn const_make_global

```rust
pub const unsafe fn const_make_global(ptr: *mut u8) -> *const u8
```

Convert the allocation this pointer points to into immutable global memory.
The pointer must point to the beginning of a heap allocation.
This operation only makes sense during compile time. At runtime, it does nothing.

## fn type_id_vtable

```rust
pub fn type_id_vtable( _id: crate::any::TypeId, _trait: crate::any::TypeId, ) -> Option<ptr::DynMetadata<*const ()>>
```

Check if a type represented by a `TypeId` implements a trait represented by a `TypeId`.
It can only be called at compile time, the backends do
not implement it. If it implements the trait the dyn metadata gets returned for vtable access.

## fn minimum_number_nsz_f16

```rust
pub const fn minimum_number_nsz_f16(x: f16, y: f16) -> f16
```

Returns the minimum of two `f16` values, ignoring NaN.

This behaves like IEEE 754-2019 minimumNumber, *except* that it does not order signed
zeros deterministically. In particular:
If one of the arguments is NaN (quiet or signaling), then the other argument is returned. If
both arguments are NaN, returns NaN. If the inputs compare equal (such as for the case of `+0.0`
and `-0.0`), either input may be returned non-deterministically.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized version of this intrinsic is `f16::min`.

## fn minimum_number_nsz_f32

```rust
pub const fn minimum_number_nsz_f32(x: f32, y: f32) -> f32
```

Returns the minimum of two `f32` values, ignoring NaN.

This behaves like IEEE 754-2019 minimumNumber, *except* that it does not order signed
zeros deterministically. In particular:
If one of the arguments is NaN (quiet or signaling), then the other argument is returned. If
both arguments are NaN, returns NaN. If the inputs compare equal (such as for the case of `+0.0`
and `-0.0`), either input may be returned non-deterministically.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized version of this intrinsic is `f32::min`.

## fn minimum_number_nsz_f64

```rust
pub const fn minimum_number_nsz_f64(x: f64, y: f64) -> f64
```

Returns the minimum of two `f64` values, ignoring NaN.

This behaves like IEEE 754-2019 minimumNumber, *except* that it does not order signed
zeros deterministically. In particular:
If one of the arguments is NaN (quiet or signaling), then the other argument is returned. If
both arguments are NaN, returns NaN. If the inputs compare equal (such as for the case of `+0.0`
and `-0.0`), either input may be returned non-deterministically.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized version of this intrinsic is `f64::min`.
