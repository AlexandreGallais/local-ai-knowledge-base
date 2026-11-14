---
title: "core::intrinsics (part 2 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/intrinsics/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::intrinsics (part 2 of 7)

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

`std::process::abort` is to be preferred if possible,
as its behavior is more user-friendly and more stable.

The current implementation of `intrinsics::abort` is to invoke an invalid instruction,
on most platforms.
On Unix, the
process will probably terminate with a signal like `SIGABRT`, `SIGILL`, `SIGTRAP`, `SIGSEGV` or
`SIGBUS`.  The precise behavior is not guaranteed and not stable.

The stabilization-track version of this intrinsic is `core::process::abort_immediate`.

## fn unreachable

```rust
pub const unsafe fn unreachable() -> !
```

Informs the optimizer that this point in the code is not reachable,
enabling further optimizations.

N.B., this is very different from the `unreachable!()` macro: Unlike the
macro, which panics when it is executed, it is *undefined behavior* to
reach code marked with this function.

The stabilized version of this intrinsic is `core::hint::unreachable_unchecked`.

## fn cold_path

```rust
pub const fn cold_path()
```

Hints to the compiler that current code path is cold.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized version of this intrinsic is `core::hint::cold_path`.

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

Consider using `core::panic::Location::caller` instead.

## fn forget

```rust
pub const fn forget<T: ?Sized>(_: T)
```

Moves a value out of scope without running drop glue.

This exists solely for `crate::mem::forget_unsized`; normal `forget` uses
`ManuallyDrop` instead.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.
