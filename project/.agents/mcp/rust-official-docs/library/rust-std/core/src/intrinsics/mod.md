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

# Const intrinsics

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

# Volatiles

The volatile intrinsics provide operations intended to act on I/O
memory, which are guaranteed to not be reordered by the compiler
across other volatile intrinsics. See [`read_volatile`][ptr::read_volatile]
and [`write_volatile`][ptr::write_volatile].

# Atomics

The atomic intrinsics provide common atomic operations on machine
words, with multiple possible memory orderings. See the
[atomic types][atomic] docs for details.

# Unwinding

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
[`atomic`] types via the `compare_exchange` method.
For example, [`AtomicBool::compare_exchange`].

## fn atomic_cxchgweak

```rust
pub const unsafe fn atomic_cxchgweak< T: Copy, const ORD_SUCC: AtomicOrdering, const ORD_FAIL: AtomicOrdering, >( _dst: *mut T, _old: T, _src: T, ) -> (T, bool)
```

Stores a value if the current value is the same as the `old` value.
`T` must be an integer or pointer type. The comparison may spuriously fail.

The stabilized version of this intrinsic is available on the
[`atomic`] types via the `compare_exchange_weak` method.
For example, [`AtomicBool::compare_exchange_weak`].

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
[`atomic`] types via the `load` method. For example, [`AtomicBool::load`].

[Atomic::load_volatile]: AtomicI32::load_volatile
[Atomic::from_ptr]: AtomicI32::from_ptr
[Atomic::load]: AtomicI32::load

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
[`atomic`] types via the `store` method. For example, [`AtomicBool::store`].

[Atomic::store_volatile]: AtomicI32::store_volatile
[Atomic::from_ptr]: AtomicI32::from_ptr
[Atomic::store]: AtomicI32::store

## fn atomic_xchg

```rust
pub const unsafe fn atomic_xchg<T: Copy, const ORD: AtomicOrdering>(dst: *mut T, src: T) -> T
```

Stores the value at the specified memory location, returning the old value.
`T` must be an integer or pointer type.

The stabilized version of this intrinsic is available on the
[`atomic`] types via the `swap` method. For example, [`AtomicBool::swap`].

## fn atomic_xadd

```rust
pub const unsafe fn atomic_xadd<T: Copy, U: Copy, const ORD: AtomicOrdering>( dst: *mut T, src: U, ) -> T
```

Adds to the current value, returning the previous value.
`T` must be an integer or pointer type.
`U` must be the same as `T` if that is an integer type, or `usize` if `T` is a pointer type.

The stabilized version of this intrinsic is available on the
[`atomic`] types via the `fetch_add` method. For example, [`AtomicIsize::fetch_add`].

## fn atomic_xsub

```rust
pub const unsafe fn atomic_xsub<T: Copy, U: Copy, const ORD: AtomicOrdering>( dst: *mut T, src: U, ) -> T
```

Subtract from the current value, returning the previous value.
`T` must be an integer or pointer type.
`U` must be the same as `T` if that is an integer type, or `usize` if `T` is a pointer type.

The stabilized version of this intrinsic is available on the
[`atomic`] types via the `fetch_sub` method. For example, [`AtomicIsize::fetch_sub`].

## fn atomic_and

```rust
pub const unsafe fn atomic_and<T: Copy, U: Copy, const ORD: AtomicOrdering>( dst: *mut T, src: U, ) -> T
```

Bitwise and with the current value, returning the previous value.
`T` must be an integer or pointer type.
`U` must be the same as `T` if that is an integer type, or `usize` if `T` is a pointer type.

The stabilized version of this intrinsic is available on the
[`atomic`] types via the `fetch_and` method. For example, [`AtomicBool::fetch_and`].

## fn atomic_nand

```rust
pub const unsafe fn atomic_nand<T: Copy, U: Copy, const ORD: AtomicOrdering>( dst: *mut T, src: U, ) -> T
```

Bitwise nand with the current value, returning the previous value.
`T` must be an integer or pointer type.
`U` must be the same as `T` if that is an integer type, or `usize` if `T` is a pointer type.

The stabilized version of this intrinsic is available on the
[`AtomicBool`] type via the `fetch_nand` method. For example, [`AtomicBool::fetch_nand`].

## fn atomic_or

```rust
pub const unsafe fn atomic_or<T: Copy, U: Copy, const ORD: AtomicOrdering>( dst: *mut T, src: U, ) -> T
```

Bitwise or with the current value, returning the previous value.
`T` must be an integer or pointer type.
`U` must be the same as `T` if that is an integer type, or `usize` if `T` is a pointer type.

The stabilized version of this intrinsic is available on the
[`atomic`] types via the `fetch_or` method. For example, [`AtomicBool::fetch_or`].

## fn atomic_xor

```rust
pub const unsafe fn atomic_xor<T: Copy, U: Copy, const ORD: AtomicOrdering>( dst: *mut T, src: U, ) -> T
```

Bitwise xor with the current value, returning the previous value.
`T` must be an integer or pointer type.
`U` must be the same as `T` if that is an integer type, or `usize` if `T` is a pointer type.

The stabilized version of this intrinsic is available on the
[`atomic`] types via the `fetch_xor` method. For example, [`AtomicBool::fetch_xor`].

## fn atomic_max

```rust
pub const unsafe fn atomic_max<T: Copy, const ORD: AtomicOrdering>(dst: *mut T, src: T) -> T
```

Maximum with the current value using a signed comparison.
`T` must be a signed integer type.

The stabilized version of this intrinsic is available on the
[`atomic`] signed integer types via the `fetch_max` method. For example, [`AtomicI32::fetch_max`].

## fn atomic_min

```rust
pub const unsafe fn atomic_min<T: Copy, const ORD: AtomicOrdering>(dst: *mut T, src: T) -> T
```

Minimum with the current value using a signed comparison.
`T` must be a signed integer type.

The stabilized version of this intrinsic is available on the
[`atomic`] signed integer types via the `fetch_min` method. For example, [`AtomicI32::fetch_min`].

## fn atomic_umin

```rust
pub const unsafe fn atomic_umin<T: Copy, const ORD: AtomicOrdering>(dst: *mut T, src: T) -> T
```

Minimum with the current value using an unsigned comparison.
`T` must be an unsigned integer type.

The stabilized version of this intrinsic is available on the
[`atomic`] unsigned integer types via the `fetch_min` method. For example, [`AtomicU32::fetch_min`].

## fn atomic_umax

```rust
pub const unsafe fn atomic_umax<T: Copy, const ORD: AtomicOrdering>(dst: *mut T, src: T) -> T
```

Maximum with the current value using an unsigned comparison.
`T` must be an unsigned integer type.

The stabilized version of this intrinsic is available on the
[`atomic`] unsigned integer types via the `fetch_max` method. For example, [`AtomicU32::fetch_max`].

## fn atomic_fence

```rust
pub const unsafe fn atomic_fence<const ORD: AtomicOrdering>()
```

An atomic fence.

The stabilized version of this intrinsic is available in
[`atomic::fence`].

## fn atomic_singlethreadfence

```rust
pub const unsafe fn atomic_singlethreadfence<const ORD: AtomicOrdering>()
```

An atomic fence for synchronization within a single thread.

The stabilized version of this intrinsic is available in
[`atomic::compiler_fence`].

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

## fn rustc_peek

```rust
pub fn rustc_peek<T>(_: T) -> T
```

Magic intrinsic that derives its meaning from attributes
attached to the function.

For example, dataflow uses this to inject static assertions so
that `rustc_peek(potentially_uninitialized)` would actually
double-check that dataflow did indeed compute that it is
uninitialized at that point in the control flow.

This intrinsic should not be used outside of the compiler.

## fn abort

```rust
pub fn abort() -> !
```

Aborts the execution of the process.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

[`std::process::abort`](../../std/process/fn.abort.html) is to be preferred if possible,
as its behavior is more user-friendly and more stable.

The current implementation of `intrinsics::abort` is to invoke an invalid instruction,
on most platforms.
On Unix, the
process will probably terminate with a signal like `SIGABRT`, `SIGILL`, `SIGTRAP`, `SIGSEGV` or
`SIGBUS`.  The precise behavior is not guaranteed and not stable.

The stabilization-track version of this intrinsic is [`core::process::abort_immediate`].

## fn unreachable

```rust
pub const unsafe fn unreachable() -> !
```

Informs the optimizer that this point in the code is not reachable,
enabling further optimizations.

N.B., this is very different from the `unreachable!()` macro: Unlike the
macro, which panics when it is executed, it is *undefined behavior* to
reach code marked with this function.

The stabilized version of this intrinsic is [`core::hint::unreachable_unchecked`].

## fn cold_path

```rust
pub const fn cold_path()
```

Hints to the compiler that current code path is cold.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized version of this intrinsic is [`core::hint::cold_path`].

## fn assert_inhabited

```rust
pub const fn assert_inhabited<T>()
```

A guard for unsafe functions that cannot ever be executed if `T` is uninhabited:
This will statically either panic, or do nothing. It does not *guarantee* to ever panic,
and should only be called if an assertion failure will imply language UB in the following code.

This intrinsic does not have a stable counterpart.

## fn assert_zero_valid

```rust
pub const fn assert_zero_valid<T>()
```

A guard for unsafe functions that cannot ever be executed if `T` does not permit
zero-initialization: This will statically either panic, or do nothing. It does not *guarantee*
to ever panic, and should only be called if an assertion failure will imply language UB in the
following code.

This intrinsic does not have a stable counterpart.

## fn assert_mem_uninitialized_valid

```rust
pub const fn assert_mem_uninitialized_valid<T>()
```

A guard for `std::mem::uninitialized`. This will statically either panic, or do nothing. It does
not *guarantee* to ever panic, and should only be called if an assertion failure will imply
language UB in the following code.

This intrinsic does not have a stable counterpart.

## fn caller_location

```rust
pub const fn caller_location() -> &'static crate::panic::Location<'static>
```

Gets a reference to a static `Location` indicating where it was called.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

Consider using [`core::panic::Location::caller`] instead.

## fn forget

```rust
pub const fn forget<T: ?Sized>(_: T)
```

Moves a value out of scope without running drop glue.

This exists solely for [`crate::mem::forget_unsized`]; normal `forget` uses
`ManuallyDrop` instead.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

## fn transmute

```rust
pub const unsafe fn transmute<Src, Dst>(src: Src) -> Dst
```

Reinterprets the bits of a value of one type as another type.

Both types must have the same size. Compilation will fail if this is not guaranteed.

`transmute` is semantically equivalent to a bitwise move of one type
into another. It copies the bits from the source value into the
destination value, then forgets the original. Note that source and destination
are passed by-value, which means if `Src` or `Dst` contain padding, that padding
is *not* guaranteed to be preserved by `transmute`.

Both the argument and the result must be [valid](../../nomicon/what-unsafe-does.html) at
their given type. Violating this condition leads to [undefined behavior][ub]. The compiler
will generate code *assuming that you, the programmer, ensure that there will never be
undefined behavior*. It is therefore your responsibility to guarantee that every value
passed to `transmute` is valid at both types `Src` and `Dst`. Failing to uphold this condition
may lead to unexpected and unstable compilation results. This makes `transmute` **incredibly
unsafe**. `transmute` should be the absolute last resort.

Because `transmute` is a by-value operation, alignment of the *transmuted values
themselves* is not a concern. As with any other function, the compiler already ensures
both `Src` and `Dst` are properly aligned. However, when transmuting values that *point
elsewhere* (such as pointers, references, boxes…), the caller has to ensure proper
alignment of the pointed-to values.

The [nomicon](../../nomicon/transmutes.html) has additional documentation.

[ub]: ../../reference/behavior-considered-undefined.html

# Transmutation between pointers and integers

Special care has to be taken when transmuting between pointers and integers, e.g.
transmuting between `*const ()` and `usize`.

Transmuting *pointers to integers* in a `const` context is [undefined behavior][ub], unless
the pointer was originally created *from* an integer. (That includes this function
specifically, integer-to-pointer casts, and helpers like [`dangling`][crate::ptr::dangling],
but also semantically-equivalent conversions such as punning through `repr(C)` union
fields.) Any attempt to use the resulting value for integer operations will abort
const-evaluation. (And even outside `const`, such transmutation is touching on many
unspecified aspects of the Rust memory model and should be avoided. See below for
alternatives.)

Transmuting *integers to pointers* is a largely unspecified operation. It is likely *not*
equivalent to an `as` cast. Doing non-zero-sized memory accesses with a pointer constructed
this way is currently considered undefined behavior.

All this also applies when the integer is nested inside an array, tuple, struct, or enum.
However, `MaybeUninit<usize>` is not considered an integer type for the purpose of this
section. Transmuting `*const ()` to `MaybeUninit<usize>` is fine---but then calling
`assume_init()` on that result is considered as completing the pointer-to-integer transmute
and thus runs into the issues discussed above.

In particular, doing a pointer-to-integer-to-pointer roundtrip via `transmute` is *not* a
lossless process. If you want to round-trip a pointer through an integer in a way that you
can get back the original pointer, you need to use `as` casts, or replace the integer type
by `MaybeUninit<$int>` (and never call `assume_init()`). If you are looking for a way to
store data of arbitrary type, also use `MaybeUninit<T>` (that will also handle uninitialized
memory due to padding). If you specifically need to store something that is "either an
integer or a pointer", use `*mut ()`: integers can be converted to pointers and back without
any loss (via `as` casts or via `transmute`).

# Examples

There are a few things that `transmute` is really useful for.

Turning a pointer into a function pointer. This is *not* portable to
machines where function pointers and data pointers have different sizes.

```
fn foo() -> i32 {
    0
}
// Crucially, we `as`-cast to a raw pointer before `transmute`ing to a function pointer.
// This avoids an integer-to-pointer `transmute`, which can be problematic.
// Transmuting between raw pointers and function pointers (i.e., two pointer types) is fine.
let pointer = foo as fn() -> i32 as *const ();
let function = unsafe {
    std::mem::transmute::<*const (), fn() -> i32>(pointer)
};
assert_eq!(function(), 0);
```

Extending a lifetime, or shortening an invariant lifetime. This is
advanced, very unsafe Rust!

```
struct R<'a>(&'a i32);
unsafe fn extend_lifetime<'b>(r: R<'b>) -> R<'static> {
    unsafe { std::mem::transmute::<R<'b>, R<'static>>(r) }
}

unsafe fn shorten_invariant_lifetime<'b, 'c>(r: &'b mut R<'static>)
                                             -> &'b mut R<'c> {
    unsafe { std::mem::transmute::<&'b mut R<'static>, &'b mut R<'c>>(r) }
}
```

# Alternatives

Don't despair: many uses of `transmute` can be achieved through other means.
Below are common applications of `transmute` which can be replaced with safer
constructs.

Turning raw bytes (`[u8; SZ]`) into `u32`, `f64`, etc.:

```
# #![allow(unnecessary_transmutes)]
let raw_bytes = [0x78, 0x56, 0x34, 0x12];

let num = unsafe {
    std::mem::transmute::<[u8; 4], u32>(raw_bytes)
};

// use `u32::from_ne_bytes` instead
let num = u32::from_ne_bytes(raw_bytes);
// or use `u32::from_le_bytes` or `u32::from_be_bytes` to specify the endianness
let num = u32::from_le_bytes(raw_bytes);
assert_eq!(num, 0x12345678);
let num = u32::from_be_bytes(raw_bytes);
assert_eq!(num, 0x78563412);
```

Turning a pointer into a `usize`:

```no_run
let ptr = &0;
let ptr_num_transmute = unsafe {
    std::mem::transmute::<&i32, usize>(ptr)
};

// Use an `as` cast instead
let ptr_num_cast = ptr as *const i32 as usize;
```

Note that using `transmute` to turn a pointer to a `usize` is (as noted above) [undefined
behavior][ub] in `const` contexts. Also outside of consts, this operation might not behave
as expected -- this is touching on many unspecified aspects of the Rust memory model.
Depending on what the code is doing, the following alternatives are preferable to
pointer-to-integer transmutation:
- If the code just wants to store data of arbitrary type in some buffer and needs to pick a
  type for that buffer, it can use [`MaybeUninit`][crate::mem::MaybeUninit].
- If the code actually wants to work on the address the pointer points to, it can use `as`
  casts or [`ptr.addr()`][pointer::addr].

Turning a `*mut T` into a `&mut T`:

```
let ptr: *mut i32 = &mut 0;
let ref_transmuted = unsafe {
    std::mem::transmute::<*mut i32, &mut i32>(ptr)
};

// Use a reborrow instead
let ref_casted = unsafe { &mut *ptr };
```

Turning a `&mut T` into a `&mut U`:

```
let ptr = &mut 0;
let val_transmuted = unsafe {
    std::mem::transmute::<&mut i32, &mut u32>(ptr)
};

// Now, put together `as` and reborrowing - note the chaining of `as`
// `as` is not transitive
let val_casts = unsafe { &mut *(ptr as *mut i32 as *mut u32) };
```

Turning a `&str` into a `&[u8]`:

```
// this is not a good way to do this.
let slice = unsafe { std::mem::transmute::<&str, &[u8]>("Rust") };
assert_eq!(slice, &[82, 117, 115, 116]);

// You could use `str::as_bytes`
let slice = "Rust".as_bytes();
assert_eq!(slice, &[82, 117, 115, 116]);

// Or, just use a byte string, if you have control over the string
// literal
assert_eq!(b"Rust", &[82, 117, 115, 116]);
```

Turning a `Vec<&T>` into a `Vec<Option<&T>>`.

To transmute the inner type of the contents of a container, you must make sure to not
violate any of the container's invariants. For `Vec`, this means that both the size
*and alignment* of the inner types have to match. Other containers might rely on the
size of the type, alignment, or even the `TypeId`, in which case transmuting wouldn't
be possible at all without violating the container invariants.

```
let store = [0, 1, 2, 3];
let v_orig = store.iter().collect::<Vec<&i32>>();

// clone the vector as we will reuse them later
let v_clone = v_orig.clone();

// Using transmute: this relies on the unspecified data layout of `Vec`, which is a
// bad idea and could cause Undefined Behavior.
// However, it is no-copy.
let v_transmuted = unsafe {
    std::mem::transmute::<Vec<&i32>, Vec<Option<&i32>>>(v_clone)
};

let v_clone = v_orig.clone();

// This is the suggested, safe way.
// It may copy the entire vector into a new one though, but also may not.
let v_collected = v_clone.into_iter()
                         .map(Some)
                         .collect::<Vec<Option<&i32>>>();

let v_clone = v_orig.clone();

// This is the proper no-copy, unsafe way of "transmuting" a `Vec`, without relying on the
// data layout. Instead of literally calling `transmute`, we perform a pointer cast, but
// in terms of converting the original inner type (`&i32`) to the new one (`Option<&i32>`),
// this has all the same caveats. Besides the information provided above, also consult the
// [`from_raw_parts`] documentation.
let (ptr, len, capacity) = v_clone.into_raw_parts();
let v_from_raw = unsafe {
    Vec::from_raw_parts(ptr.cast::<*mut Option<&i32>>(), len, capacity)
};
```

[`from_raw_parts`]: ../../std/vec/struct.Vec.html#method.from_raw_parts

Implementing `split_at_mut`:

```
use std::{slice, mem};

// There are multiple ways to do this, and there are multiple problems
// with the following (transmute) way.
fn split_at_mut_transmute<T>(slice: &mut [T], mid: usize)
                             -> (&mut [T], &mut [T]) {
    let len = slice.len();
    assert!(mid <= len);
    unsafe {
        let slice2 = mem::transmute::<&mut [T], &mut [T]>(slice);
        // first: transmute is not type safe; all it checks is that T and
        // U are of the same size. Second, right here, you have two
        // mutable references pointing to the same memory.
        (&mut slice[0..mid], &mut slice2[mid..len])
    }
}

// This gets rid of the type safety problems; `&mut *` will *only* give
// you a `&mut T` from a `&mut T` or `*mut T`.
fn split_at_mut_casts<T>(slice: &mut [T], mid: usize)
                         -> (&mut [T], &mut [T]) {
    let len = slice.len();
    assert!(mid <= len);
    unsafe {
        let slice2 = &mut *(slice as *mut [T]);
        // however, you still have two mutable references pointing to
        // the same memory.
        (&mut slice[0..mid], &mut slice2[mid..len])
    }
}

// This is how the standard library does it. This is the best method, if
// you need to do something like this
fn split_at_stdlib<T>(to_split: &mut [T], mid: usize)
                      -> (&mut [T], &mut [T]) {
    let len = to_split.len();
    assert!(mid <= len);
    unsafe {
        let ptr = to_split.as_mut_ptr();
        let fst = slice::from_raw_parts_mut(ptr, mid);
        let snd = slice::from_raw_parts_mut(ptr.add(mid), len - mid);
        // The function now has three mutable references to overlapping memory:
        // `to_split`, `fst`, and `snd`.
        // `to_split` is never used after `let ptr = ...` so it can be treated as "dead".
        // This leaves two "live" mutable slice references, `fst` and `snd`, with no overlap.
        (fst, snd)
    }
}
```

## fn transmute_unchecked

```rust
pub const unsafe fn transmute_unchecked<Src, Dst>(src: Src) -> Dst
```

Like [`transmute`], but even less checked at compile-time: rather than
giving an error for `size_of::<Src>() != size_of::<Dst>()`, it's
**Undefined Behavior** at runtime.

Prefer normal `transmute` where possible, for the extra checking, since
both do exactly the same thing at runtime, if they both compile.

This is not expected to ever be exposed directly to users, rather it
may eventually be exposed through some more-constrained API.

## fn needs_drop

```rust
pub fn needs_drop<T: ?Sized>() -> bool
```

Returns `true` if the actual type given as `T` requires drop
glue; returns `false` if the actual type provided for `T`
implements `Copy`.

If the actual type neither requires drop glue nor implements
`Copy`, then the return value of this function is unspecified.

Note that, unlike most intrinsics, this can only be called at compile-time
as backends do not have an implementation for it. The only caller (its
stable counterpart) wraps this intrinsic call in a `const` block so that
backends only see an evaluated constant.

The stabilized version of this intrinsic is [`mem::needs_drop`](crate::mem::needs_drop).

## fn offset

```rust
pub const unsafe fn offset<Ptr: bounds::BuiltinDeref, Delta>(dst: Ptr, offset: Delta) -> Ptr
```

Calculates the offset from a pointer.

This is implemented as an intrinsic to avoid converting to and from an
integer, since the conversion would throw away aliasing information.

This can only be used with `Ptr` as a raw pointer type (`*mut` or `*const`)
to a `Sized` pointee and with `Delta` as `usize` or `isize`.  Any other
instantiations may arbitrarily misbehave, and that's *not* a compiler bug.

# Safety

If the computed offset is non-zero, then both the starting and resulting pointer must be
either in bounds or at the end of an allocation. If either pointer is out
of bounds or arithmetic overflow occurs then this operation is undefined behavior.

The stabilized version of this intrinsic is [`pointer::offset`].

## fn arith_offset

```rust
pub const unsafe fn arith_offset<T>(dst: *const T, offset: isize) -> *const T
```

Calculates the offset from a pointer, potentially wrapping.

This is implemented as an intrinsic to avoid converting to and from an
integer, since the conversion inhibits certain optimizations.

# Safety

Unlike the `offset` intrinsic, this intrinsic does not restrict the
resulting pointer to point into or at the end of an allocated
object, and it wraps with two's complement arithmetic. The resulting
value is not necessarily valid to be used to actually access memory.

The stabilized version of this intrinsic is [`pointer::wrapping_offset`].

## fn slice_get_unchecked

```rust
pub const unsafe fn slice_get_unchecked< ItemPtr: bounds::ChangePointee<[T], Pointee = T, Output = SlicePtr>, SlicePtr, T, >( slice_ptr: SlicePtr, index: usize, ) -> ItemPtr
```

Projects to the `index`-th element of `slice_ptr`, as the same kind of pointer
as the slice was provided -- so `&mut [T] → &mut T`, `&[T] → &T`,
`*mut [T] → *mut T`, or `*const [T] → *const T` -- without a bounds check.

This is exposed via `<usize as SliceIndex>::get(_unchecked)(_mut)`,
and isn't intended to be used elsewhere.

Expands in MIR to `{&, &mut, &raw const, &raw mut} (*slice_ptr)[index]`,
depending on the types involved, so no backend support is needed.

# Safety

- `index < PtrMetadata(slice_ptr)`, so the indexing is in-bounds for the slice
- the resulting offsetting is in-bounds of the allocation, which is
  always the case for references, but needs to be upheld manually for pointers

## fn ptr_mask

```rust
pub fn ptr_mask<T>(ptr: *const T, mask: usize) -> *const T
```

Masks out bits of the pointer according to a mask.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

Consider using [`pointer::mask`] instead.

## fn volatile_copy_nonoverlapping_memory

```rust
pub unsafe fn volatile_copy_nonoverlapping_memory<T>(dst: *mut T, src: *const T, count: usize)
```

Equivalent to the appropriate `llvm.memcpy.p0i8.0i8.*` intrinsic, with
a size of `count` * `size_of::<T>()` and an alignment of `align_of::<T>()`.

This intrinsic does not have a stable counterpart.
# Safety

The safety requirements are consistent with [`copy_nonoverlapping`]
while the read and write behaviors are volatile,
which means it will not be optimized out unless `_count` or `size_of::<T>()` is equal to zero.

[`copy_nonoverlapping`]: ptr::copy_nonoverlapping

## fn volatile_copy_memory

```rust
pub unsafe fn volatile_copy_memory<T>(dst: *mut T, src: *const T, count: usize)
```

Equivalent to the appropriate `llvm.memmove.p0i8.0i8.*` intrinsic, with
a size of `count * size_of::<T>()` and an alignment of `align_of::<T>()`.

The volatile parameter is set to `true`, so it will not be optimized out
unless size is equal to zero.

This intrinsic does not have a stable counterpart.

## fn volatile_set_memory

```rust
pub const unsafe fn volatile_set_memory<T>(dst: *mut T, val: u8, count: usize)
```

Equivalent to the appropriate `llvm.memset.p0i8.*` intrinsic, with a
size of `count * size_of::<T>()` and an alignment of `align_of::<T>()`.

This intrinsic does not have a stable counterpart.
# Safety

The safety requirements are consistent with [`write_bytes`] while the write behavior is volatile,
which means it will not be optimized out unless `_count` or `size_of::<T>()` is equal to zero.

[`write_bytes`]: ptr::write_bytes

## fn volatile_load

```rust
pub const unsafe fn volatile_load<T>(src: *const T) -> T
```

Performs a volatile load from the `src` pointer.

The stabilized version of this intrinsic is [`core::ptr::read_volatile`].

## fn volatile_store

```rust
pub const unsafe fn volatile_store<T>(dst: *mut T, val: T)
```

Performs a volatile store to the `dst` pointer.

The stabilized version of this intrinsic is [`core::ptr::write_volatile`].

## fn unaligned_volatile_load

```rust
pub unsafe fn unaligned_volatile_load<T>(src: *const T) -> T
```

Performs a volatile load from the `src` pointer
The pointer is not required to be aligned.

This intrinsic does not have a stable counterpart.

## fn unaligned_volatile_store

```rust
pub unsafe fn unaligned_volatile_store<T>(dst: *mut T, val: T)
```

Performs a volatile store to the `dst` pointer.
The pointer is not required to be aligned.

This intrinsic does not have a stable counterpart.

## fn sqrtf16

```rust
pub fn sqrtf16(x: f16) -> f16
```

Returns the square root of an `f16`

The stabilized version of this intrinsic is
[`f16::sqrt`](../../std/primitive.f16.html#method.sqrt)

## fn sqrtf32

```rust
pub fn sqrtf32(x: f32) -> f32
```

Returns the square root of an `f32`

The stabilized version of this intrinsic is
[`f32::sqrt`](../../std/primitive.f32.html#method.sqrt)

## fn sqrtf64

```rust
pub fn sqrtf64(x: f64) -> f64
```

Returns the square root of an `f64`

The stabilized version of this intrinsic is
[`f64::sqrt`](../../std/primitive.f64.html#method.sqrt)

## fn sqrtf128

```rust
pub fn sqrtf128(x: f128) -> f128
```

Returns the square root of an `f128`

The stabilized version of this intrinsic is
[`f128::sqrt`](../../std/primitive.f128.html#method.sqrt)

## fn powif16

```rust
pub fn powif16(a: f16, x: i32) -> f16
```

Raises an `f16` to an integer power.

The stabilized version of this intrinsic is
[`f16::powi`](../../std/primitive.f16.html#method.powi)

## fn powif32

```rust
pub fn powif32(a: f32, x: i32) -> f32
```

Raises an `f32` to an integer power.

The stabilized version of this intrinsic is
[`f32::powi`](../../std/primitive.f32.html#method.powi)

## fn powif64

```rust
pub fn powif64(a: f64, x: i32) -> f64
```

Raises an `f64` to an integer power.

The stabilized version of this intrinsic is
[`f64::powi`](../../std/primitive.f64.html#method.powi)

## fn powif128

```rust
pub fn powif128(a: f128, x: i32) -> f128
```

Raises an `f128` to an integer power.

The stabilized version of this intrinsic is
[`f128::powi`](../../std/primitive.f128.html#method.powi)

## fn sin

```rust
pub fn sin<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns the sine of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`sin` method. For example, [`f32::sin`](../../std/primitive.f32.html#method.sin).

## fn cos

```rust
pub fn cos<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns the cosine of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`cos` method. For example, [`f32::cos`](../../std/primitive.f32.html#method.cos).

## fn powf16

```rust
pub fn powf16(a: f16, x: f16) -> f16
```

Raises an `f16` to an `f16` power.

The stabilized version of this intrinsic is
[`f16::powf`](../../std/primitive.f16.html#method.powf)

## fn powf32

```rust
pub fn powf32(a: f32, x: f32) -> f32
```

Raises an `f32` to an `f32` power.

The stabilized version of this intrinsic is
[`f32::powf`](../../std/primitive.f32.html#method.powf)

## fn powf64

```rust
pub fn powf64(a: f64, x: f64) -> f64
```

Raises an `f64` to an `f64` power.

The stabilized version of this intrinsic is
[`f64::powf`](../../std/primitive.f64.html#method.powf)

## fn powf128

```rust
pub fn powf128(a: f128, x: f128) -> f128
```

Raises an `f128` to an `f128` power.

The stabilized version of this intrinsic is
[`f128::powf`](../../std/primitive.f128.html#method.powf)

## fn exp

```rust
pub fn exp<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns the exponential of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`exp` method. For example, [`f32::exp`](../../std/primitive.f32.html#method.exp).

## fn exp2

```rust
pub fn exp2<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns 2 raised to the power of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`exp2` method. For example, [`f32::exp2`](../../std/primitive.f32.html#method.exp2).

## fn log

```rust
pub fn log<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns the natural logarithm of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`ln` method. For example, [`f32::ln`](../../std/primitive.f32.html#method.ln).

## fn log10

```rust
pub fn log10<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns the base 10 logarithm of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`log10` method. For example, [`f32::log10`](../../std/primitive.f32.html#method.log10).

## fn log2

```rust
pub fn log2<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns the base 2 logarithm of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`log2` method. For example, [`f32::log2`](../../std/primitive.f32.html#method.log2).

## fn fmaf16

```rust
pub const fn fmaf16(a: f16, b: f16, c: f16) -> f16
```

Returns `a * b + c` without rounding the intermediate result for `f16` values.

The stabilized version of this intrinsic is
[`f16::mul_add`](../../std/primitive.f16.html#method.mul_add)

## fn fmaf32

```rust
pub const fn fmaf32(a: f32, b: f32, c: f32) -> f32
```

Returns `a * b + c` without rounding the intermediate result for `f32` values.

The stabilized version of this intrinsic is
[`f32::mul_add`](../../std/primitive.f32.html#method.mul_add)

## fn fmaf64

```rust
pub const fn fmaf64(a: f64, b: f64, c: f64) -> f64
```

Returns `a * b + c` without rounding the intermediate result for `f64` values.

The stabilized version of this intrinsic is
[`f64::mul_add`](../../std/primitive.f64.html#method.mul_add)

## fn fmaf128

```rust
pub const fn fmaf128(a: f128, b: f128, c: f128) -> f128
```

Returns `a * b + c` without rounding the intermediate result for `f128` values.

The stabilized version of this intrinsic is
[`f128::mul_add`](../../std/primitive.f128.html#method.mul_add)

## fn fmuladdf16

```rust
pub const fn fmuladdf16(a: f16, b: f16, c: f16) -> f16
```

Returns `a * b + c` for `f16` values, non-deterministically executing
either a fused multiply-add or two operations with rounding of the
intermediate result.

The operation is fused if the code generator determines that target
instruction set has support for a fused operation, and that the fused
operation is more efficient than the equivalent, separate pair of mul
and add instructions. It is unspecified whether or not a fused operation
is selected, and that may depend on optimization level and context, for
example.

## fn fmuladdf32

```rust
pub const fn fmuladdf32(a: f32, b: f32, c: f32) -> f32
```

Returns `a * b + c` for `f32` values, non-deterministically executing
either a fused multiply-add or two operations with rounding of the
intermediate result.

The operation is fused if the code generator determines that target
instruction set has support for a fused operation, and that the fused
operation is more efficient than the equivalent, separate pair of mul
and add instructions. It is unspecified whether or not a fused operation
is selected, and that may depend on optimization level and context, for
example.

## fn fmuladdf64

```rust
pub const fn fmuladdf64(a: f64, b: f64, c: f64) -> f64
```

Returns `a * b + c` for `f64` values, non-deterministically executing
either a fused multiply-add or two operations with rounding of the
intermediate result.

The operation is fused if the code generator determines that target
instruction set has support for a fused operation, and that the fused
operation is more efficient than the equivalent, separate pair of mul
and add instructions. It is unspecified whether or not a fused operation
is selected, and that may depend on optimization level and context, for
example.

## fn fmuladdf128

```rust
pub const fn fmuladdf128(a: f128, b: f128, c: f128) -> f128
```

Returns `a * b + c` for `f128` values, non-deterministically executing
either a fused multiply-add or two operations with rounding of the
intermediate result.

The operation is fused if the code generator determines that target
instruction set has support for a fused operation, and that the fused
operation is more efficient than the equivalent, separate pair of mul
and add instructions. It is unspecified whether or not a fused operation
is selected, and that may depend on optimization level and context, for
example.

## fn floorf16

```rust
pub const fn floorf16(x: f16) -> f16
```

Returns the largest integer less than or equal to an `f16`.

The stabilized version of this intrinsic is
[`f16::floor`](../../std/primitive.f16.html#method.floor)

## fn floorf32

```rust
pub const fn floorf32(x: f32) -> f32
```

Returns the largest integer less than or equal to an `f32`.

The stabilized version of this intrinsic is
[`f32::floor`](../../std/primitive.f32.html#method.floor)

## fn floorf64

```rust
pub const fn floorf64(x: f64) -> f64
```

Returns the largest integer less than or equal to an `f64`.

The stabilized version of this intrinsic is
[`f64::floor`](../../std/primitive.f64.html#method.floor)

## fn floorf128

```rust
pub const fn floorf128(x: f128) -> f128
```

Returns the largest integer less than or equal to an `f128`.

The stabilized version of this intrinsic is
[`f128::floor`](../../std/primitive.f128.html#method.floor)

## fn ceilf16

```rust
pub const fn ceilf16(x: f16) -> f16
```

Returns the smallest integer greater than or equal to an `f16`.

The stabilized version of this intrinsic is
[`f16::ceil`](../../std/primitive.f16.html#method.ceil)

## fn ceilf32

```rust
pub const fn ceilf32(x: f32) -> f32
```

Returns the smallest integer greater than or equal to an `f32`.

The stabilized version of this intrinsic is
[`f32::ceil`](../../std/primitive.f32.html#method.ceil)

## fn ceilf64

```rust
pub const fn ceilf64(x: f64) -> f64
```

Returns the smallest integer greater than or equal to an `f64`.

The stabilized version of this intrinsic is
[`f64::ceil`](../../std/primitive.f64.html#method.ceil)

## fn ceilf128

```rust
pub const fn ceilf128(x: f128) -> f128
```

Returns the smallest integer greater than or equal to an `f128`.

The stabilized version of this intrinsic is
[`f128::ceil`](../../std/primitive.f128.html#method.ceil)

## fn truncf16

```rust
pub const fn truncf16(x: f16) -> f16
```

Returns the integer part of an `f16`.

The stabilized version of this intrinsic is
[`f16::trunc`](../../std/primitive.f16.html#method.trunc)

## fn truncf32

```rust
pub const fn truncf32(x: f32) -> f32
```

Returns the integer part of an `f32`.

The stabilized version of this intrinsic is
[`f32::trunc`](../../std/primitive.f32.html#method.trunc)

## fn truncf64

```rust
pub const fn truncf64(x: f64) -> f64
```

Returns the integer part of an `f64`.

The stabilized version of this intrinsic is
[`f64::trunc`](../../std/primitive.f64.html#method.trunc)

## fn truncf128

```rust
pub const fn truncf128(x: f128) -> f128
```

Returns the integer part of an `f128`.

The stabilized version of this intrinsic is
[`f128::trunc`](../../std/primitive.f128.html#method.trunc)

## fn round_ties_even_f16

```rust
pub const fn round_ties_even_f16(x: f16) -> f16
```

Returns the nearest integer to an `f16`. Rounds half-way cases to the number with an even
least significant digit.

The stabilized version of this intrinsic is
[`f16::round_ties_even`](../../std/primitive.f16.html#method.round_ties_even)

## fn round_ties_even_f32

```rust
pub const fn round_ties_even_f32(x: f32) -> f32
```

Returns the nearest integer to an `f32`. Rounds half-way cases to the number with an even
least significant digit.

The stabilized version of this intrinsic is
[`f32::round_ties_even`](../../std/primitive.f32.html#method.round_ties_even)

## fn round_ties_even_f64

```rust
pub const fn round_ties_even_f64(x: f64) -> f64
```

Returns the nearest integer to an `f64`. Rounds half-way cases to the number with an even
least significant digit.

The stabilized version of this intrinsic is
[`f64::round_ties_even`](../../std/primitive.f64.html#method.round_ties_even)

## fn round_ties_even_f128

```rust
pub const fn round_ties_even_f128(x: f128) -> f128
```

Returns the nearest integer to an `f128`. Rounds half-way cases to the number with an even
least significant digit.

The stabilized version of this intrinsic is
[`f128::round_ties_even`](../../std/primitive.f128.html#method.round_ties_even)

## fn roundf16

```rust
pub const fn roundf16(x: f16) -> f16
```

Returns the nearest integer to an `f16`. Rounds half-way cases away from zero.

The stabilized version of this intrinsic is
[`f16::round`](../../std/primitive.f16.html#method.round)

## fn roundf32

```rust
pub const fn roundf32(x: f32) -> f32
```

Returns the nearest integer to an `f32`. Rounds half-way cases away from zero.

The stabilized version of this intrinsic is
[`f32::round`](../../std/primitive.f32.html#method.round)

## fn roundf64

```rust
pub const fn roundf64(x: f64) -> f64
```

Returns the nearest integer to an `f64`. Rounds half-way cases away from zero.

The stabilized version of this intrinsic is
[`f64::round`](../../std/primitive.f64.html#method.round)

## fn roundf128

```rust
pub const fn roundf128(x: f128) -> f128
```

Returns the nearest integer to an `f128`. Rounds half-way cases away from zero.

The stabilized version of this intrinsic is
[`f128::round`](../../std/primitive.f128.html#method.round)

## fn fadd_fast

```rust
pub unsafe fn fadd_fast<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float addition that allows optimizations based on algebraic rules.
Requires that inputs and output of the operation are finite, causing UB otherwise.

This intrinsic does not have a stable counterpart.

## fn fsub_fast

```rust
pub unsafe fn fsub_fast<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float subtraction that allows optimizations based on algebraic rules.
Requires that inputs and output of the operation are finite, causing UB otherwise.

This intrinsic does not have a stable counterpart.

## fn fmul_fast

```rust
pub unsafe fn fmul_fast<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float multiplication that allows optimizations based on algebraic rules.
Requires that inputs and output of the operation are finite, causing UB otherwise.

This intrinsic does not have a stable counterpart.

## fn fdiv_fast

```rust
pub unsafe fn fdiv_fast<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float division that allows optimizations based on algebraic rules.
Requires that inputs and output of the operation are finite, causing UB otherwise.

This intrinsic does not have a stable counterpart.

## fn frem_fast

```rust
pub unsafe fn frem_fast<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float remainder that allows optimizations based on algebraic rules.
Requires that inputs and output of the operation are finite, causing UB otherwise.

This intrinsic does not have a stable counterpart.

## fn float_to_int_unchecked

```rust
pub unsafe fn float_to_int_unchecked<Float: bounds::FloatPrimitive, Int: Copy>(value: Float) -> Int
```

Converts with LLVM’s fptoui/fptosi, which may return undef for values out of range
(<https://github.com/rust-lang/rust/issues/10184>)

Stabilized as [`f32::to_int_unchecked`] and [`f64::to_int_unchecked`].

## fn fadd_algebraic

```rust
pub const fn fadd_algebraic<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float addition that allows optimizations based on algebraic rules.

Stabilized as [`f16::algebraic_add`], [`f32::algebraic_add`], [`f64::algebraic_add`] and [`f128::algebraic_add`].

## fn fsub_algebraic

```rust
pub const fn fsub_algebraic<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float subtraction that allows optimizations based on algebraic rules.

Stabilized as [`f16::algebraic_sub`], [`f32::algebraic_sub`], [`f64::algebraic_sub`] and [`f128::algebraic_sub`].

## fn fmul_algebraic

```rust
pub const fn fmul_algebraic<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float multiplication that allows optimizations based on algebraic rules.

Stabilized as [`f16::algebraic_mul`], [`f32::algebraic_mul`], [`f64::algebraic_mul`] and [`f128::algebraic_mul`].

## fn fdiv_algebraic

```rust
pub const fn fdiv_algebraic<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float division that allows optimizations based on algebraic rules.

Stabilized as [`f16::algebraic_div`], [`f32::algebraic_div`], [`f64::algebraic_div`] and [`f128::algebraic_div`].

## fn frem_algebraic

```rust
pub const fn frem_algebraic<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float remainder that allows optimizations based on algebraic rules.

Stabilized as [`f16::algebraic_rem`], [`f32::algebraic_rem`], [`f64::algebraic_rem`] and [`f128::algebraic_rem`].

## fn integer_min

```rust
pub const fn integer_min<T: [const] bounds::IntegerPrimitive>(a: T, b: T) -> T
```

Integer `min`imum, signed or unsigned depending on `T`.

Allowed only on `uN`, `iN`, `usize`, and `isize`.
(Not on `bool` nor on `char`.)

Stabilized as [`u16::min`] and [`i64::min`] and similar.

## fn integer_max

```rust
pub const fn integer_max<T: [const] bounds::IntegerPrimitive>(a: T, b: T) -> T
```

Integer `max`imum, signed or unsigned depending on `T`.

Allowed only on `uN`, `iN`, `usize`, and `isize`.
(Not on `bool` nor on `char`.)

Stabilized as [`u16::max`] and [`i64::max`] and similar.

## fn ctpop

```rust
pub const fn ctpop<T: Copy>(x: T) -> u32
```

Returns the number of bits set in an integer type `T`

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `count_ones` method. For example,
[`u32::count_ones`]

## fn ctlz

```rust
pub const fn ctlz<T: Copy>(x: T) -> u32
```

Returns the number of leading unset bits (zeroes) in an integer type `T`.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `leading_zeros` method. For example,
[`u32::leading_zeros`]

# Examples

```
#![feature(core_intrinsics)]
# #![allow(internal_features)]

use std::intrinsics::ctlz;

let x = 0b0001_1100_u8;
let num_leading = ctlz(x);
assert_eq!(num_leading, 3);
```

An `x` with value `0` will return the bit width of `T`.

```
#![feature(core_intrinsics)]
# #![allow(internal_features)]

use std::intrinsics::ctlz;

let x = 0u16;
let num_leading = ctlz(x);
assert_eq!(num_leading, 16);
```

## fn ctlz_nonzero

```rust
pub const unsafe fn ctlz_nonzero<T: Copy>(x: T) -> u32
```

Like `ctlz`, but extra-unsafe as it returns `undef` when
given an `x` with value `0`.

This intrinsic does not have a stable counterpart.

# Examples

```
#![feature(core_intrinsics)]
# #![allow(internal_features)]

use std::intrinsics::ctlz_nonzero;

let x = 0b0001_1100_u8;
let num_leading = unsafe { ctlz_nonzero(x) };
assert_eq!(num_leading, 3);
```

## fn cttz

```rust
pub const fn cttz<T: Copy>(x: T) -> u32
```

Returns the number of trailing unset bits (zeroes) in an integer type `T`.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `trailing_zeros` method. For example,
[`u32::trailing_zeros`]

# Examples

```
#![feature(core_intrinsics)]
# #![allow(internal_features)]

use std::intrinsics::cttz;

let x = 0b0011_1000_u8;
let num_trailing = cttz(x);
assert_eq!(num_trailing, 3);
```

An `x` with value `0` will return the bit width of `T`:

```
#![feature(core_intrinsics)]
# #![allow(internal_features)]

use std::intrinsics::cttz;

let x = 0u16;
let num_trailing = cttz(x);
assert_eq!(num_trailing, 16);
```

## fn cttz_nonzero

```rust
pub const unsafe fn cttz_nonzero<T: Copy>(x: T) -> u32
```

Like `cttz`, but extra-unsafe as it returns `undef` when
given an `x` with value `0`.

This intrinsic does not have a stable counterpart.

# Examples

```
#![feature(core_intrinsics)]
# #![allow(internal_features)]

use std::intrinsics::cttz_nonzero;

let x = 0b0011_1000_u8;
let num_trailing = unsafe { cttz_nonzero(x) };
assert_eq!(num_trailing, 3);
```

## fn bswap

```rust
pub const fn bswap<T: Copy>(x: T) -> T
```

Reverses the bytes in an integer type `T`.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `swap_bytes` method. For example,
[`u32::swap_bytes`]

## fn bitreverse

```rust
pub const fn bitreverse<T: Copy>(x: T) -> T
```

Reverses the bits in an integer type `T`.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `reverse_bits` method. For example,
[`u32::reverse_bits`]

## fn three_way_compare

```rust
pub const fn three_way_compare<T: Copy>(lhs: T, rhss: T) -> crate::cmp::Ordering
```

Does a three-way comparison between the two arguments,
which must be of character or integer (signed or unsigned) type.

This was originally added because it greatly simplified the MIR in `cmp`
implementations, and then LLVM 20 added a backend intrinsic for it too.

The stabilized version of this intrinsic is [`Ord::cmp`].

## fn disjoint_bitor

```rust
pub const unsafe fn disjoint_bitor<T: [const] fallback::DisjointBitOr>(a: T, b: T) -> T
```

Combine two values which have no bits in common.

This allows the backend to implement it as `a + b` *or* `a | b`,
depending which is easier to implement on a specific target.

# Safety

Requires that `(a & b) == 0`, or equivalently that `(a | b) == (a + b)`.

Otherwise it's immediate UB.

## fn add_with_overflow

```rust
pub const fn add_with_overflow<T: Copy>(x: T, y: T) -> (T, bool)
```

Performs checked integer addition.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `overflowing_add` method. For example,
[`u32::overflowing_add`]

## fn sub_with_overflow

```rust
pub const fn sub_with_overflow<T: Copy>(x: T, y: T) -> (T, bool)
```

Performs checked integer subtraction

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `overflowing_sub` method. For example,
[`u32::overflowing_sub`]

## fn mul_with_overflow

```rust
pub const fn mul_with_overflow<T: Copy>(x: T, y: T) -> (T, bool)
```

Performs checked integer multiplication

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `overflowing_mul` method. For example,
[`u32::overflowing_mul`]

## fn exact_div

```rust
pub const unsafe fn exact_div<T: Copy>(x: T, y: T) -> T
```

Performs an exact division, resulting in undefined behavior where
`x % y != 0` or `y == 0` or `x == T::MIN && y == -1`

This intrinsic does not have a stable counterpart.

## fn unchecked_div

```rust
pub const unsafe fn unchecked_div<T: Copy>(x: T, y: T) -> T
```

Performs an unchecked division, resulting in undefined behavior
where `y == 0` or `x == T::MIN && y == -1`

Safe wrappers for this intrinsic are available on the integer
primitives via the `checked_div` method. For example,
[`u32::checked_div`]

## fn unchecked_rem

```rust
pub const unsafe fn unchecked_rem<T: Copy>(x: T, y: T) -> T
```

Returns the remainder of an unchecked division, resulting in
undefined behavior when `y == 0` or `x == T::MIN && y == -1`

Safe wrappers for this intrinsic are available on the integer
primitives via the `checked_rem` method. For example,
[`u32::checked_rem`]

## fn unchecked_shl

```rust
pub const unsafe fn unchecked_shl<T: Copy, U: Copy>(x: T, y: U) -> T
```

Performs an unchecked left shift, resulting in undefined behavior when
`y < 0` or `y >= N`, where N is the width of T in bits.

Safe wrappers for this intrinsic are available on the integer
primitives via the `checked_shl` method. For example,
[`u32::checked_shl`]

## fn unchecked_shr

```rust
pub const unsafe fn unchecked_shr<T: Copy, U: Copy>(x: T, y: U) -> T
```

Performs an unchecked right shift, resulting in undefined behavior when
`y < 0` or `y >= N`, where N is the width of T in bits.

Safe wrappers for this intrinsic are available on the integer
primitives via the `checked_shr` method. For example,
[`u32::checked_shr`]

## fn unchecked_add

```rust
pub const unsafe fn unchecked_add<T: Copy>(x: T, y: T) -> T
```

Returns the result of an unchecked addition, resulting in
undefined behavior when `x + y > T::MAX` or `x + y < T::MIN`.

The stable counterpart of this intrinsic is `unchecked_add` on the various
integer types, such as [`u16::unchecked_add`] and [`i64::unchecked_add`].

## fn unchecked_sub

```rust
pub const unsafe fn unchecked_sub<T: Copy>(x: T, y: T) -> T
```

Returns the result of an unchecked subtraction, resulting in
undefined behavior when `x - y > T::MAX` or `x - y < T::MIN`.

The stable counterpart of this intrinsic is `unchecked_sub` on the various
integer types, such as [`u16::unchecked_sub`] and [`i64::unchecked_sub`].

## fn unchecked_mul

```rust
pub const unsafe fn unchecked_mul<T: Copy>(x: T, y: T) -> T
```

Returns the result of an unchecked multiplication, resulting in
undefined behavior when `x * y > T::MAX` or `x * y < T::MIN`.

The stable counterpart of this intrinsic is `unchecked_mul` on the various
integer types, such as [`u16::unchecked_mul`] and [`i64::unchecked_mul`].

## fn rotate_left

```rust
pub const fn rotate_left<T: [const] fallback::FunnelShift>(x: T, shift: u32) -> T
```

Performs rotate left.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `rotate_left` method. For example,
[`u32::rotate_left`]

## fn rotate_right

```rust
pub const fn rotate_right<T: [const] fallback::FunnelShift>(x: T, shift: u32) -> T
```

Performs rotate right.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `rotate_right` method. For example,
[`u32::rotate_right`]

## fn wrapping_add

```rust
pub const fn wrapping_add<T: Copy>(a: T, b: T) -> T
```

Wrapping (modular) addition. Computes `a + b`,
wrapping around at the boundary of the type.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `wrapping_add` method. For example,
[`u32::wrapping_add`]

## fn wrapping_sub

```rust
pub const fn wrapping_sub<T: Copy>(a: T, b: T) -> T
```

Wrapping (modular) subtraction. Computes `a - b`,
wrapping around at the boundary of the type.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `wrapping_sub` method. For example,
[`u32::wrapping_sub`]

## fn wrapping_mul

```rust
pub const fn wrapping_mul<T: Copy>(a: T, b: T) -> T
```

Wrapping (modular) multiplication. Computes `a *
b`, wrapping around at the boundary of the type.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `wrapping_mul` method. For example,
[`u32::wrapping_mul`]

## fn saturating_add

```rust
pub const fn saturating_add<T: Copy>(a: T, b: T) -> T
```

Computes `a + b`, saturating at numeric bounds.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `saturating_add` method. For example,
[`u32::saturating_add`]

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
[`u32::saturating_sub`]

## fn read_via_copy

```rust
pub const unsafe fn read_via_copy<T>(ptr: *const T) -> T
```

This is an implementation detail of [`crate::ptr::read`] and should
not be used anywhere else.  See its comments for why this exists.

This intrinsic can *only* be called where the pointer is a local without
projections (`read_via_copy(ptr)`, not `read_via_copy(*ptr)`) so that it
trivially obeys runtime-MIR rules about derefs in operands.

## fn write_via_move

```rust
pub const unsafe fn write_via_move<T>(ptr: *mut T, value: T)
```

This is an implementation detail of [`crate::ptr::write`] and should
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

The stabilized version of this intrinsic is [`core::mem::discriminant`].

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

[valid]: crate::ptr#safety

## fn black_box

```rust
pub const fn black_box<T>(dummy: T) -> T
```

See documentation of [`std::hint::black_box`] for details.

[`std::hint::black_box`]: crate::hint::black_box

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
```no_run
#![feature(const_eval_select)]
#![feature(core_intrinsics)]
# #![allow(internal_features)]
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

The stabilized form of this intrinsic is [`crate::mem::swap`].

# Safety
Behavior is undefined if any of the following conditions are violated:

* Both `x` and `y` must be [valid] for both reads and writes.

* Both `x` and `y` must be properly aligned.

* The region of memory beginning at `x` must *not* overlap with the region of memory
  beginning at `y`.

* The memory pointed by `x` and `y` must both contain values of type `T`.

[valid]: crate::ptr#safety

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
primarily used by [`crate::ub_checks::assert_unsafe_precondition`].

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

The stabilized version of this intrinsic is [`f16::min`].

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

The stabilized version of this intrinsic is [`f32::min`].

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

The stabilized version of this intrinsic is [`f64::min`].

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

The stabilized version of this intrinsic is [`f128::min`].

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

The stabilized version of this intrinsic is [`f16::max`].

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

The stabilized version of this intrinsic is [`f32::max`].

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

The stabilized version of this intrinsic is [`f64::max`].

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

The stabilized version of this intrinsic is [`f128::max`].

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
primitives via the `abs` method. For example, [`f32::abs`].

## fn copysignf16

```rust
pub const fn copysignf16(x: f16, y: f16) -> f16
```

Copies the sign from `y` to `x` for `f16` values.

The stabilized version of this intrinsic is
[`f16::copysign`](../../std/primitive.f16.html#method.copysign)

## fn copysignf32

```rust
pub const fn copysignf32(x: f32, y: f32) -> f32
```

Copies the sign from `y` to `x` for `f32` values.

The stabilized version of this intrinsic is
[`f32::copysign`](../../std/primitive.f32.html#method.copysign)

## fn copysignf64

```rust
pub const fn copysignf64(x: f64, y: f64) -> f64
```

Copies the sign from `y` to `x` for `f64` values.

The stabilized version of this intrinsic is
[`f64::copysign`](../../std/primitive.f64.html#method.copysign)

## fn copysignf128

```rust
pub const fn copysignf128(x: f128, y: f128) -> f128
```

Copies the sign from `y` to `x` for `f128` values.

The stabilized version of this intrinsic is
[`f128::copysign`](../../std/primitive.f128.html#method.copysign)

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

```rust,ignore (macro example)
#[autodiff_forward(df1, Dual, Const, Dual)]
pub fn f1(x: &[f64], y: f64) -> f64 {
    unimplemented!()
}
```

expands to:

```rust,ignore (macro example)
#[rustc_autodiff]
#[inline(never)]
pub fn f1(x: &[f64], y: f64) -> f64 {
    ::core::panicking::panic("not implemented")
}
#[rustc_autodiff(Forward, 1, Dual, Const, Dual)]
pub fn df1(x: &[f64], bx_0: &[f64], y: f64) -> (f64, f64) {
    ::core::intrinsics::autodiff(f1::<>, df1::<>, (x, bx_0, y))
}
```

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

```rust,ignore (pseudocode)
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
```

For reference, see the Clang documentation on offloading:
<https://clang.llvm.org/docs/OffloadingDesign.html>.

## fn offload_get_num_devices

```rust
pub const fn offload_get_num_devices() -> i32
```

Returns the number of offload devices available on the system.

Use this to discover which `device_id` values are valid to pass to
[`offload`]. Devices are numbered from `0` to the returned value minus one.

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