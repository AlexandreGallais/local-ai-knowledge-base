---
title: "core::intrinsics (part 1 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/intrinsics/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::intrinsics

Compiler intrinsics.

The functions in this module are implementation details of `core` and should
not be used outside of the standard library. We generally provide access to
intrinsics via stable wrapper functions. Use these instead.

These are the imports making intrinsics available to Rust code. The actual implementations live in the compiler.
Some of these intrinsics are lowered to MIR in <https://github.com/rust-lang/rust/blob/HEAD/compiler/rustc_mir_transform/src/lower_intrinsics.rs>.
The remaining intrinsics are implemented for the LLVM backend in <https://github.com/rust-lang/rust/blob/HEAD/compiler/rustc_codegen_ssa/src/mir/intrinsic.rs>
and <https://github.com/rust-lang/rust/blob/HEAD/compiler/rustc_codegen_llvm/src/intrinsic.rs>,
and for const evaluation in <https://github.com/rust-lang/rust/blob/HEAD/compiler/rustc_const_eval/src/interpret/intrinsics.rs>.

Intrinsics don't need a body. However, they optionally can have a body, which we call the
"fallback body". This will be used by codegen backends that do not have a dedicated
implementation of the intrinsic, making it easier to add new intrinsics for specific operations
without having to implement them in each codegen backend. The fallback body obviously has to be
a valid implementation of the documented specification of the intrinsic. In some cases, the
fallback body will be *equivalent* to the specification. Note that this is a strong requirement:
if the spec says "UB if input `x` is even", then a valid implementation can just ignore this and
do whatever it wants in that case; an *equivalent* implementation needs to actually check this
condition and trigger UB in that case (e.g. by using `hint::assert_unchecked()`). Similar, if
the spec says "returns `x` or `y` non-deterministically", then an *equivalent* implementation
must actually do non-deterministic choice and return either value (e.g. by invoking some other
language operation that has the same non-determinism). Intrinsics with such a fallback body that
is equivalent to the spec may be marked with `#[miri::intrinsic_fallback_is_spec]`; the fallback
body will then also be used by Miri for UB checking. When in doubt, do not use this attribute or
ask the Miri maintainers for advice.

Intrinsics are, in general, language extensions. Therefore, t-lang should be involved whenever a
new intrinsic is exposed to stable code. However, if an intrinsic is marked
`#[miri::intrinsic_fallback_is_spec]` with a fallback body that only uses stable features (or if
such a fallback body could be written, but for one reason or another the actual fallback body is
different), and if it also does not make other promises that go beyond observable program
behavior (such as steering the optimizer in a particular direction), then an intrinsic may be
used without t-lang involvement.

#### Const intrinsics

In order to make an intrinsic unstable usable at compile-time, copy the implementation from
<https://github.com/rust-lang/miri/blob/master/src/intrinsics> to
<https://github.com/rust-lang/rust/blob/HEAD/compiler/rustc_const_eval/src/interpret/intrinsics.rs>
and make the intrinsic declaration below a `const fn`. This should be done in coordination with
wg-const-eval.

If an intrinsic is supposed to be used from a `const fn` with a `rustc_const_stable` attribute,
`#[rustc_intrinsic_const_stable_indirect]` needs to be added to the intrinsic. Such a change
requires T-lang approval, because it may bake a feature into the language that cannot be
replicated in user code without compiler support. The same exception as above applies for
`#[miri::intrinsic_fallback_is_spec]` intrinsics.

#### Volatiles

The volatile intrinsics provide operations intended to act on I/O
memory, which are guaranteed to not be reordered by the compiler
across other volatile intrinsics. See `read_volatile`[ptr::read_volatile]
and `write_volatile`[ptr::write_volatile].

#### Atomics

The atomic intrinsics provide common atomic operations on machine
words, with multiple possible memory orderings. See the
atomic types docs for details.

#### Unwinding

Rust intrinsics may, in general, unwind. If an intrinsic can never unwind, add the
`#[rustc_nounwind]` attribute so that the compiler can make use of this fact.

However, even for intrinsics that may unwind, rustc assumes that a Rust intrinsics will never
initiate a foreign (non-Rust) unwind, and thus for panic=abort we can always assume that these
intrinsics cannot unwind.

## enum AtomicOrdering

```rust
pub enum AtomicOrdering
```

A type for atomic ordering parameters for intrinsics. This is a separate type from
`atomic::Ordering` so that we can make it `ConstParamTy` and fix the values used here without a
risk of leaking that to stable code.

## fn atomic_cxchg

```rust
pub const unsafe fn atomic_cxchg< T: Copy, const ORD_SUCC: AtomicOrdering, const ORD_FAIL: AtomicOrdering, >( dst: *mut T, old: T, src: T, ) -> (T, bool)
```

Stores a value if the current value is the same as the `old` value.
`T` must be an integer or pointer type.

The stabilized version of this intrinsic is available on the
`atomic` types via the `compare_exchange` method.
For example, `AtomicBool::compare_exchange`.

## fn atomic_cxchgweak

```rust
pub const unsafe fn atomic_cxchgweak< T: Copy, const ORD_SUCC: AtomicOrdering, const ORD_FAIL: AtomicOrdering, >( _dst: *mut T, _old: T, _src: T, ) -> (T, bool)
```

Stores a value if the current value is the same as the `old` value.
`T` must be an integer or pointer type. The comparison may spuriously fail.

The stabilized version of this intrinsic is available on the
`atomic` types via the `compare_exchange_weak` method.
For example, `AtomicBool::compare_exchange_weak`.

## fn atomic_load

```rust
pub const unsafe fn atomic_load<T: Copy, const ORD: AtomicOrdering, const VOLATILE: bool>( src: *const T, ) -> T
```

Loads the current value of the pointer.
`T` must be an integer or pointer type.

# Safety

* If `VOLATILE` is `true`, this is equivalent to [Atomic::load_volatile].
  Refer to the documentation of that method for safety requirements.

* If `VOLATILE` is `false`, this is equivalent to [Atomic::from_ptr] followed
  by [Atomic::load]. Refer to the documentation of [Atomic::from_ptr] for safety requirements.

The stabilized version of this intrinsic is available on the
`atomic` types via the `load` method. For example, `AtomicBool::load`.

## fn atomic_store

```rust
pub const unsafe fn atomic_store<T: Copy, const ORD: AtomicOrdering, const VOLATILE: bool>( dst: *mut T, val: T, )
```

Stores the value at the specified memory location.
`T` must be an integer or pointer type.

# Safety

* If `VOLATILE` is `true`, this is equivalent to [Atomic::store_volatile].
  Refer to the documentation of that method for safety requirements.

* If `VOLATILE` is `false`, this is equivalent to [Atomic::from_ptr] followed
  by [Atomic::store]. Refer to the documentation of [Atomic::from_ptr] for safety requirements.

The stabilized version of this intrinsic is available on the
`atomic` types via the `store` method. For example, `AtomicBool::store`.

## fn atomic_xchg

```rust
pub const unsafe fn atomic_xchg<T: Copy, const ORD: AtomicOrdering>(dst: *mut T, src: T) -> T
```

Stores the value at the specified memory location, returning the old value.
`T` must be an integer or pointer type.

The stabilized version of this intrinsic is available on the
`atomic` types via the `swap` method. For example, `AtomicBool::swap`.

## fn atomic_xadd

```rust
pub const unsafe fn atomic_xadd<T: Copy, U: Copy, const ORD: AtomicOrdering>( dst: *mut T, src: U, ) -> T
```

Adds to the current value, returning the previous value.
`T` must be an integer or pointer type.
`U` must be the same as `T` if that is an integer type, or `usize` if `T` is a pointer type.

The stabilized version of this intrinsic is available on the
`atomic` types via the `fetch_add` method. For example, `AtomicIsize::fetch_add`.

## fn atomic_xsub

```rust
pub const unsafe fn atomic_xsub<T: Copy, U: Copy, const ORD: AtomicOrdering>( dst: *mut T, src: U, ) -> T
```

Subtract from the current value, returning the previous value.
`T` must be an integer or pointer type.
`U` must be the same as `T` if that is an integer type, or `usize` if `T` is a pointer type.

The stabilized version of this intrinsic is available on the
`atomic` types via the `fetch_sub` method. For example, `AtomicIsize::fetch_sub`.

## fn atomic_and

```rust
pub const unsafe fn atomic_and<T: Copy, U: Copy, const ORD: AtomicOrdering>( dst: *mut T, src: U, ) -> T
```

Bitwise and with the current value, returning the previous value.
`T` must be an integer or pointer type.
`U` must be the same as `T` if that is an integer type, or `usize` if `T` is a pointer type.

The stabilized version of this intrinsic is available on the
`atomic` types via the `fetch_and` method. For example, `AtomicBool::fetch_and`.

## fn atomic_nand

```rust
pub const unsafe fn atomic_nand<T: Copy, U: Copy, const ORD: AtomicOrdering>( dst: *mut T, src: U, ) -> T
```

Bitwise nand with the current value, returning the previous value.
`T` must be an integer or pointer type.
`U` must be the same as `T` if that is an integer type, or `usize` if `T` is a pointer type.

The stabilized version of this intrinsic is available on the
`AtomicBool` type via the `fetch_nand` method. For example, `AtomicBool::fetch_nand`.

## fn atomic_or

```rust
pub const unsafe fn atomic_or<T: Copy, U: Copy, const ORD: AtomicOrdering>( dst: *mut T, src: U, ) -> T
```

Bitwise or with the current value, returning the previous value.
`T` must be an integer or pointer type.
`U` must be the same as `T` if that is an integer type, or `usize` if `T` is a pointer type.

The stabilized version of this intrinsic is available on the
`atomic` types via the `fetch_or` method. For example, `AtomicBool::fetch_or`.

## fn atomic_xor

```rust
pub const unsafe fn atomic_xor<T: Copy, U: Copy, const ORD: AtomicOrdering>( dst: *mut T, src: U, ) -> T
```

Bitwise xor with the current value, returning the previous value.
`T` must be an integer or pointer type.
`U` must be the same as `T` if that is an integer type, or `usize` if `T` is a pointer type.

The stabilized version of this intrinsic is available on the
`atomic` types via the `fetch_xor` method. For example, `AtomicBool::fetch_xor`.

## fn atomic_max

```rust
pub const unsafe fn atomic_max<T: Copy, const ORD: AtomicOrdering>(dst: *mut T, src: T) -> T
```

Maximum with the current value using a signed comparison.
`T` must be a signed integer type.

The stabilized version of this intrinsic is available on the
`atomic` signed integer types via the `fetch_max` method. For example, `AtomicI32::fetch_max`.

## fn atomic_min

```rust
pub const unsafe fn atomic_min<T: Copy, const ORD: AtomicOrdering>(dst: *mut T, src: T) -> T
```

Minimum with the current value using a signed comparison.
`T` must be a signed integer type.

The stabilized version of this intrinsic is available on the
`atomic` signed integer types via the `fetch_min` method. For example, `AtomicI32::fetch_min`.

## fn atomic_umin

```rust
pub const unsafe fn atomic_umin<T: Copy, const ORD: AtomicOrdering>(dst: *mut T, src: T) -> T
```

Minimum with the current value using an unsigned comparison.
`T` must be an unsigned integer type.

The stabilized version of this intrinsic is available on the
`atomic` unsigned integer types via the `fetch_min` method. For example, `AtomicU32::fetch_min`.

## fn atomic_umax

```rust
pub const unsafe fn atomic_umax<T: Copy, const ORD: AtomicOrdering>(dst: *mut T, src: T) -> T
```

Maximum with the current value using an unsigned comparison.
`T` must be an unsigned integer type.

The stabilized version of this intrinsic is available on the
`atomic` unsigned integer types via the `fetch_max` method. For example, `AtomicU32::fetch_max`.

## fn atomic_fence

```rust
pub const unsafe fn atomic_fence<const ORD: AtomicOrdering>()
```

An atomic fence.

The stabilized version of this intrinsic is available in
`atomic::fence`.

## fn atomic_singlethreadfence

```rust
pub const unsafe fn atomic_singlethreadfence<const ORD: AtomicOrdering>()
```

An atomic fence for synchronization within a single thread.

The stabilized version of this intrinsic is available in
`atomic::compiler_fence`.

## fn prefetch_read_data

```rust
pub const fn prefetch_read_data<T, const LOCALITY: i32>(data: *const T)
```

The `prefetch` intrinsic is a hint to the code generator to insert a prefetch instruction
for the given address if supported; otherwise, it is a no-op.
Prefetches have no effect on the behavior of the program but can change its performance
characteristics.

The `LOCALITY` argument is a temporal locality specifier ranging from (0) - no locality,
to (3) - extremely local keep in cache.

This intrinsic does not have a stable counterpart.

## fn prefetch_write_data

```rust
pub const fn prefetch_write_data<T, const LOCALITY: i32>(data: *const T)
```

The `prefetch` intrinsic is a hint to the code generator to insert a prefetch instruction
for the given address if supported; otherwise, it is a no-op.
Prefetches have no effect on the behavior of the program but can change its performance
characteristics.

The `LOCALITY` argument is a temporal locality specifier ranging from (0) - no locality,
to (3) - extremely local keep in cache.

This intrinsic does not have a stable counterpart.

## fn prefetch_read_instruction

```rust
pub const fn prefetch_read_instruction<T, const LOCALITY: i32>(data: *const T)
```

The `prefetch` intrinsic is a hint to the code generator to insert a prefetch instruction
for the given address if supported; otherwise, it is a no-op.
Prefetches have no effect on the behavior of the program but can change its performance
characteristics.

The `LOCALITY` argument is a temporal locality specifier ranging from (0) - no locality,
to (3) - extremely local keep in cache.

This intrinsic does not have a stable counterpart.

## fn prefetch_write_instruction

```rust
pub const fn prefetch_write_instruction<T, const LOCALITY: i32>(data: *const T)
```

The `prefetch` intrinsic is a hint to the code generator to insert a prefetch instruction
for the given address if supported; otherwise, it is a no-op.
Prefetches have no effect on the behavior of the program but can change its performance
characteristics.

The `LOCALITY` argument is a temporal locality specifier ranging from (0) - no locality,
to (3) - extremely local keep in cache.

This intrinsic does not have a stable counterpart.

## fn breakpoint

```rust
pub fn breakpoint()
```

Executes a breakpoint trap, for inspection by a debugger.

This intrinsic does not have a stable counterpart.
