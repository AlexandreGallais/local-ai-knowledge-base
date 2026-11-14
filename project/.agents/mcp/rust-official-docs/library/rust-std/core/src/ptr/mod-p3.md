---
title: "core::ptr (part 3 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ptr/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ptr (part 3 of 5)

## fn drop_in_place

```rust
pub const unsafe fn drop_in_place<T: PointeeSized>(to_drop: *mut T) where T: [const] Destruct,
```

* It is *required* to use `drop_in_place` to drop unsized types like
  trait objects, because they can't be read out onto the stack and
  dropped normally.

* It is friendlier to the optimizer to do this over `ptr::read` when
  dropping manually allocated memory (e.g., in the implementations of
  `Box`/`Rc`/`Vec`), as the compiler doesn't need to prove that it's
  sound to elide the copy.

* It can be used to drop [pinned] data when `T` is not `repr(packed)`
  (pinned data must not be moved before it is dropped).

Unaligned values cannot be dropped in place, they must be copied to an aligned
location first using `ptr::read_unaligned`. For packed structs, this move is
done automatically by the compiler. This means the fields of packed structs
are not dropped in-place.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `to_drop` must be [valid] for both reads and writes.

* `to_drop` must be properly aligned, even if `T` has size 0.

* `to_drop` must be nonnull, even if `T` has size 0.

* The value `to_drop` points to must be valid for dropping, which may mean
  it must uphold additional invariants. These invariants depend on the type
  of the value being dropped. For instance, when dropping a Box, the box's
  pointer to the heap must be valid.

* While `drop_in_place` is executing, the only way to access parts of
  `to_drop` is through the `&mut self` references supplied to the
  `Drop::drop` methods that `drop_in_place` invokes.

Additionally, if `T` is not `Copy`, using the pointed-to value after
calling `drop_in_place` can cause undefined behavior. Note that `*to_drop =
foo` counts as a use because it will cause the value to be dropped
again. `write()` can be used to overwrite data without causing it to be
dropped.

# Examples

Manually remove the last item from a vector:

```rust
use std::ptr;
use std::rc::Rc;

let last = Rc::new(1);
let weak = Rc::downgrade(&last);

let mut v = vec![Rc::new(0), last];

unsafe {
    // Get a raw pointer to the last element in `v`.
    let ptr = &mut v[1] as *mut _;
    // Shorten `v` to prevent the last item from being dropped. We do that first,
    // to prevent issues if the `drop_in_place` below panics.
    v.set_len(1);
    // Without a call `drop_in_place`, the last item would never be dropped,
    // and the memory it manages would be leaked.
    ptr::drop_in_place(ptr);
}

assert_eq!(v, &[0.into()]);

// Ensure that the last item was dropped.
assert!(weak.upgrade().is_none());
```

## fn null

```rust
pub const fn null<T: PointeeSized + Thin>() -> *const T
```

Creates a null raw pointer.

This function is equivalent to zero-initializing the pointer:
`MaybeUninit::<*const T>::zeroed().assume_init()`.
The resulting pointer has the address 0.

# Examples

```rust
use std::ptr;

let p: *const i32 = ptr::null();
assert!(p.is_null());
assert_eq!(p as usize, 0); // this pointer has the address 0
```

## fn null_mut

```rust
pub const fn null_mut<T: PointeeSized + Thin>() -> *mut T
```

Creates a null mutable raw pointer.

This function is equivalent to zero-initializing the pointer:
`MaybeUninit::<*mut T>::zeroed().assume_init()`.
The resulting pointer has the address 0.

# Examples

```rust
use std::ptr;

let p: *mut i32 = ptr::null_mut();
assert!(p.is_null());
assert_eq!(p as usize, 0); // this pointer has the address 0
```

## fn without_provenance

```rust
pub const fn without_provenance<T>(addr: usize) -> *const T
```

Creates a pointer with the given address and no provenance.

This is equivalent to `ptr::null().with_addr(addr)`.

Without provenance, this pointer is not associated with any actual allocation. Such a
no-provenance pointer may be used for zero-sized memory accesses (if suitably aligned), but
non-zero-sized memory accesses with a no-provenance pointer are UB. No-provenance pointers are
little more than a `usize` address in disguise.

This is different from `addr as *const T`, which creates a pointer that picks up a previously
exposed provenance. See `with_exposed_provenance` for more details on that operation.

This is a Strict Provenance API.

## fn dangling

```rust
pub const fn dangling<T>() -> *const T
```

Creates a new pointer that is dangling, but non-null and well-aligned.

This is useful for initializing types which lazily allocate, like
`Vec::new` does.

Note that the address of the returned pointer may potentially
be that of a valid pointer, which means this must not be used
as a "not yet initialized" sentinel value.
Types that lazily allocate must track initialization by some other means.

## fn without_provenance_mut

```rust
pub const fn without_provenance_mut<T>(addr: usize) -> *mut T
```

Creates a pointer with the given address and no provenance.

This is equivalent to `ptr::null_mut().with_addr(addr)`.

Without provenance, this pointer is not associated with any actual allocation. Such a
no-provenance pointer may be used for zero-sized memory accesses (if suitably aligned), but
non-zero-sized memory accesses with a no-provenance pointer are UB. No-provenance pointers are
little more than a `usize` address in disguise.

This is different from `addr as *mut T`, which creates a pointer that picks up a previously
exposed provenance. See `with_exposed_provenance_mut` for more details on that operation.

This is a Strict Provenance API.

## fn dangling_mut

```rust
pub const fn dangling_mut<T>() -> *mut T
```

Creates a new pointer that is dangling, but non-null and well-aligned.

This is useful for initializing types which lazily allocate, like
`Vec::new` does.

Note that the address of the returned pointer may potentially
be that of a valid pointer, which means this must not be used
as a "not yet initialized" sentinel value.
Types that lazily allocate must track initialization by some other means.

## fn with_exposed_provenance

```rust
pub const fn with_exposed_provenance<T>(addr: usize) -> *const T
```

Converts an address back to a pointer, picking up some previously 'exposed'
provenance.

This is fully equivalent to `addr as *const T`. The provenance of the returned pointer is that
of *some* pointer that was previously exposed by passing it to
`expose_provenance`[pointer::expose_provenance], or a `ptr as usize` cast. In addition, memory
which is outside the control of the Rust abstract machine (MMIO registers, for example) is
always considered to be accessible with an exposed provenance, so long as this memory is disjoint
from memory that will be used by the abstract machine such as the stack, heap, and statics.

The exact provenance that gets picked is not specified. The compiler will do its best to pick
the "right" provenance for you (whatever that may be), but currently we cannot provide any
guarantees about which provenance the resulting pointer will have -- and therefore there
is no definite specification for which memory the resulting pointer may access.

If there is *no* previously 'exposed' provenance that justifies the way the returned pointer
will be used, the program has undefined behavior. In particular, the aliasing rules still apply:
pointers and references that have been invalidated due to aliasing accesses cannot be used
anymore, even if they have been exposed!

Due to its inherent ambiguity, this operation may not be supported by tools that help you to
stay conformant with the Rust memory model. It is recommended to use Strict
Provenance APIs such as `with_addr`[pointer::with_addr] wherever
possible.

On most platforms this will produce a value with the same bytes as the address. Platforms
which need to store additional information in a pointer may not support this operation,
since it is generally not possible to actually *compute* which provenance the returned
pointer has to pick up.

This is an Exposed Provenance API.

## fn with_exposed_provenance_mut

```rust
pub const fn with_exposed_provenance_mut<T>(addr: usize) -> *mut T
```

Converts an address back to a mutable pointer, picking up some previously 'exposed'
provenance.

This is fully equivalent to `addr as *mut T`. The provenance of the returned pointer is that
of *some* pointer that was previously exposed by passing it to
`expose_provenance`[pointer::expose_provenance], or a `ptr as usize` cast. In addition, memory
which is outside the control of the Rust abstract machine (MMIO registers, for example) is
always considered to be accessible with an exposed provenance, so long as this memory is disjoint
from memory that will be used by the abstract machine such as the stack, heap, and statics.

The exact provenance that gets picked is not specified. The compiler will do its best to pick
the "right" provenance for you (whatever that may be), but currently we cannot provide any
guarantees about which provenance the resulting pointer will have -- and therefore there
is no definite specification for which memory the resulting pointer may access.

If there is *no* previously 'exposed' provenance that justifies the way the returned pointer
will be used, the program has undefined behavior. In particular, the aliasing rules still apply:
pointers and references that have been invalidated due to aliasing accesses cannot be used
anymore, even if they have been exposed!

Due to its inherent ambiguity, this operation may not be supported by tools that help you to
stay conformant with the Rust memory model. It is recommended to use Strict
Provenance APIs such as `with_addr`[pointer::with_addr] wherever
possible.

On most platforms this will produce a value with the same bytes as the address. Platforms
which need to store additional information in a pointer may not support this operation,
since it is generally not possible to actually *compute* which provenance the returned
pointer has to pick up.

This is an Exposed Provenance API.

## fn from_ref

```rust
pub const fn from_ref<T: PointeeSized>(r: &T) -> *const T
```

Converts a reference to a raw pointer.

For `r: &T`, `from_ref(r)` is equivalent to `r as *const T` (except for the caveat noted below),
but is a bit safer since it will never silently change type or mutability, in particular if the
code is refactored.

The caller must ensure that the pointee outlives the pointer this function returns, or else it
will end up dangling.

The caller must also ensure that the memory the pointer (non-transitively) points to is never
written to (except inside an `UnsafeCell`) using this pointer or any pointer derived from it. If
you need to mutate the pointee, use `from_mut`. Specifically, to turn a mutable reference `m:
&mut T` into `*const T`, prefer `from_mut(m).cast_const()` to obtain a pointer that can later be
used for mutation.

## Interaction with lifetime extension

Note that this has subtle interactions with the rules for lifetime extension of temporaries in
tail expressions. This code is valid, albeit in a non-obvious way:
```rust
// The temporary holding the return value of `foo` has its lifetime extended,
// because the surrounding expression involves no function call.
let p = &foo() as *const T;
unsafe { p.read() };
```
Naively replacing the cast with `from_ref` is not valid:
```rust
// The temporary holding the return value of `foo` does *not* have its lifetime extended,
// because the surrounding expression involves a function call.
let p = ptr::from_ref(&foo());
unsafe { p.read() }; // UB! Reading from a dangling pointer ⚠️
```
The recommended way to write this code is to avoid relying on lifetime extension
when raw pointers are involved:
```rust
let x = foo();
let p = ptr::from_ref(&x);
unsafe { p.read() };
```

## fn from_mut

```rust
pub const fn from_mut<T: PointeeSized>(r: &mut T) -> *mut T
```

Converts a mutable reference to a raw pointer.

For `r: &mut T`, `from_mut(r)` is equivalent to `r as *mut T` (except for the caveat noted
below), but is a bit safer since it will never silently change type or mutability, in particular
if the code is refactored.

The caller must ensure that the pointee outlives the pointer this function returns, or else it
will end up dangling.

## Interaction with lifetime extension

Note that this has subtle interactions with the rules for lifetime extension of temporaries in
tail expressions. This code is valid, albeit in a non-obvious way:
```rust
// The temporary holding the return value of `foo` has its lifetime extended,
// because the surrounding expression involves no function call.
let p = &mut foo() as *mut T;
unsafe { p.write(T::default()) };
```
Naively replacing the cast with `from_mut` is not valid:
```rust
// The temporary holding the return value of `foo` does *not* have its lifetime extended,
// because the surrounding expression involves a function call.
let p = ptr::from_mut(&mut foo());
unsafe { p.write(T::default()) }; // UB! Writing to a dangling pointer ⚠️
```
The recommended way to write this code is to avoid relying on lifetime extension
when raw pointers are involved:
```rust
let mut x = foo();
let p = ptr::from_mut(&mut x);
unsafe { p.write(T::default()) };
```

## fn slice_from_raw_parts

```rust
pub const fn slice_from_raw_parts<T>(data: *const T, len: usize) -> *const [T]
```

Forms a raw slice from a pointer and a length.

The `len` argument is the number of **elements**, not the number of bytes.

This function is safe, but actually using the return value is unsafe.
See the documentation of `slice::from_raw_parts` for slice safety requirements.

# Examples

```rust
use std::ptr;

// create a slice pointer when starting out with a pointer to the first element
let x = [5, 6, 7];
let raw_pointer = x.as_ptr();
let slice = ptr::slice_from_raw_parts(raw_pointer, 3);
assert_eq!(unsafe { &*slice }[2], 7);
```

You must ensure that the pointer is valid and not null before dereferencing
the raw slice. A slice reference must never have a null pointer, even if it's empty.

```rust
use std::ptr;
let danger: *const [u8] = ptr::slice_from_raw_parts(ptr::null(), 0);
unsafe {
    danger.as_ref().expect("references must not be null");
}
```
