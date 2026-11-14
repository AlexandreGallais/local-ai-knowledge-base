---
title: "core::ptr (part 5 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ptr/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ptr (part 5 of 5)

## On `packed` structs

Attempting to create a raw pointer to an `unaligned` struct field with
an expression such as `&packed.unaligned as *const FieldType` creates an
intermediate unaligned reference before converting that to a raw pointer.
That this reference is temporary and immediately cast is inconsequential
as the compiler always expects references to be properly aligned.
As a result, using `&packed.unaligned as *const FieldType` causes immediate
*undefined behavior* in your program.

Instead, you must use the `&raw mut` syntax to create the pointer.
You may use that constructed pointer together with this function.

An example of how to do it and how this relates to `write_unaligned` is:

```rust
#[repr(packed, C)]
struct Packed {
    _padding: u8,
    unaligned: u32,
}

let mut packed: Packed = unsafe { std::mem::zeroed() };

// Take the address of a 32-bit integer which is not aligned.
// In contrast to `&packed.unaligned as *mut _`, this has no undefined behavior.
let unaligned = &raw mut packed.unaligned;

unsafe { std::ptr::write_unaligned(unaligned, 42) };

assert_eq!({packed.unaligned}, 42); // `{...}` forces copying the field instead of creating a reference.
```

Accessing unaligned fields directly with e.g. `packed.unaligned` is safe however
(as can be seen in the `assert_eq!` above).

# Examples

Write a `usize` value to a byte buffer:

```rust
fn write_usize(x: &mut [u8], val: usize) {
    assert!(x.len() >= size_of::<usize>());

    let ptr = x.as_mut_ptr() as *mut usize;

    unsafe { ptr.write_unaligned(val) }
}
```

## fn read_volatile

```rust
pub const unsafe fn read_volatile<T>(src: *const T) -> T
```

Performs a volatile read of the value from `src` without moving it.

Volatile operations are intended to act on I/O memory. As such, they are considered externally
observable events (just like syscalls, but less opaque), and are guaranteed to not be elided or
reordered by the compiler across other externally observable events. With this in mind, there
are two cases of usage that need to be distinguished:

- When a volatile operation is used for memory inside an [allocation], it behaves exactly like
  `read`, except for the additional guarantee that it won't be elided or reordered across
  other externally observable events (see above). This implies that the operation will actually
  access memory and not e.g. be lowered to reusing data from a previous read. Other than that,
  all the usual rules for memory accesses apply (including provenance). In particular, just
  like in C, whether an operation is volatile has no bearing whatsoever on questions involving
  concurrent accesses from multiple threads. Volatile accesses behave exactly like non-atomic
  accesses in that regard.

- Volatile operations, however, may also be used to access memory that is _outside_ of any Rust
  allocation. In this use-case, the pointer does *not* have to be [valid] for reads. This is
  typically used for CPU and peripheral registers that must be accessed via an I/O memory
  mapping, most commonly at fixed addresses reserved by the hardware. These often have special
  semantics associated to their manipulation, and cannot be used as general purpose memory.
  Here, any address value is possible, including 0 and `usize::MAX`, so long as the semantics
  of such a read are well-defined by the target hardware. The provenance of the pointer is
  irrelevant, and it can be created with `without_provenance`. The access is allowed to trap,
  which must immediately abort the process. It can also cause other side-effects, but those
  must not affect Rust-allocated memory in any way. This access is still not considered
  [atomic], and as such it cannot be used for inter-thread synchronization.

Note that volatile memory operations where T is a zero-sized type are noops and may be ignored.

When invoked during const evaluation, this behaves like a regular read. In particular, such
reads must always follow the first of the two cases above.

# Load splitting

Exactly which hardware loads are performed by this function is, in general, highly target-dependent.

For a simple scalar, such as when `T` is a thin pointer, this will typically be one load assuming
your target supports a load of exactly that size and alignment.

For anything else, it will be split into multiple loads in some unspecified way.
This can happen even for scalars: notably, on many targets loading a `u128` will still need to be split,
despite being "one" scalar.  On many targets loading anything larger than a pointer will need to be split.
On all current targets a load larger than 64 bytes will need to be split.
Any load whose size is not a power of two will also almost certainly need to be split.

There is no stability guarantee on how that splitting happens.  It may change at any point.

# Safety

Like `read`, `read_volatile` creates a bitwise copy of `T`, regardless of whether `T` is
`Copy`. If `T` is not `Copy`, using both the returned value and the value at `*src` can
violate memory safety. However, storing non-`Copy` types in volatile memory
is almost certainly incorrect.

Behavior is undefined if any of the following conditions are violated:

* `src` must be either [valid] for reads, or `T` must be a ZST, or `src` must point to memory
  outside of all Rust allocations and reading from that memory must not cause any memory inside
  a Rust allocation to be modified.

* `src` must be properly aligned.

* Reading from `src` must produce a properly initialized value of type `T`.

Note that even if `T` has size `0`, the pointer must be properly aligned.

# Examples

Basic usage:

```rust
let x = 12;
let y = &x as *const i32;

unsafe {
    assert_eq!(std::ptr::read_volatile(y), 12);
}
```

## fn write_volatile

```rust
pub const unsafe fn write_volatile<T>(dst: *mut T, src: T)
```

Performs a volatile write of a memory location with the given value without reading or dropping
the old value.

Volatile operations are intended to act on I/O memory. As such, they are considered externally
observable events (just like syscalls), and are guaranteed to not be elided or reordered by the
compiler across other externally observable events. With this in mind, there are two cases of
usage that need to be distinguished:

- When a volatile operation is used for memory inside an [allocation], it behaves exactly like
  `write`[write()], except for the additional guarantee that it won't be elided or reordered
  across other externally observable events (see above). This implies that the operation will
  actually access memory and not e.g. be lowered to a register access. Other than that, all the
  usual rules for memory accesses apply (including provenance). In particular, just like in C,
  whether an operation is volatile has no bearing whatsoever on questions involving concurrent
  access from multiple threads. Volatile accesses behave exactly like non-atomic accesses in
  that regard.

- Volatile operations, however, may also be used to access memory that is _outside_ of any Rust
  allocation. In this use-case, the pointer does *not* have to be [valid] for writes. This is
  typically used for CPU and peripheral registers that must be accessed via an I/O memory
  mapping, most commonly at fixed addresses reserved by the hardware. These often have special
  semantics associated to their manipulation, and cannot be used as general purpose memory.
  Here, any address value is possible, including 0 and `usize::MAX`, so long as the semantics
  of such a write are well-defined by the target hardware. The provenance of the pointer is
  irrelevant, and it can be created with `without_provenance_mut`. The access is allowed to
  trap, which must immediately abort the process. It can also cause other side-effects, but
  those must not affect Rust-allocated memory in any way. This access is still not considered
  [atomic], and as such it cannot be used for inter-thread synchronization.

Note that volatile memory operations on zero-sized types (e.g., if a zero-sized type is passed
to `write_volatile`) are noops and may be ignored.

`write_volatile` does not drop the contents of `dst`. This is safe, but it could leak
allocations or resources, so care should be taken not to overwrite an object that should be
dropped when operating on Rust memory. Additionally, it does not drop `src`. Semantically, `src`
is moved into the location pointed to by `dst`.

When invoked during const evaluation, this behaves like a regular write. In particular, such
reads must always follow the first of the two cases above.

# Store splitting

Exactly which hardware stores are performed by this function is, in general, highly target-dependent.

For a simple scalar, such as when `T` is a thin pointer, this will typically be one store assuming
your target supports a store of exactly that size and alignment.

For anything else, it will be split into multiple stores in some unspecified way.
This can happen even for scalars: notably, on many targets storing a `u128` will still need to be split,
despite being "one" scalar.  On many targets storing anything larger than a pointer will need to be split.
On all current targets a store larger than 64 bytes will need to be split.
Any store whose size is not a power of two will also almost certainly need to be split.

There is no stability guarantee on how that splitting happens.  It may change at any point.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `dst` must be either [valid] for writes, or `T` must be a ZST, or `dst` must point to memory
  outside of all Rust allocations and writing to that memory must not cause any memory inside a
  Rust allocation to be modified.

* `dst` must be properly aligned.

Note that even if `T` has size `0`, the pointer must be properly aligned.

# Examples

Basic usage:

```rust
let mut x = 0;
let y = &mut x as *mut i32;
let z = 12;

unsafe {
    std::ptr::write_volatile(y, z);
    assert_eq!(std::ptr::read_volatile(y), 12);
}
```

## fn eq

```rust
pub fn eq<T: PointeeSized>(a: *const T, b: *const T) -> bool
```

Compares raw pointers for equality.

This is the same as using the `==` operator, but less generic:
the arguments have to be `*const T` raw pointers,
not anything that implements `PartialEq`.

This can be used to compare `&T` references (which coerce to `*const T` implicitly)
by their address rather than comparing the values they point to
(which is what the `PartialEq for &T` implementation does).

When comparing wide pointers, both the address and the metadata are tested for equality.
However, note that comparing trait object pointers (`*const dyn Trait`) is unreliable: pointers
to values of the same underlying type can compare inequal (because vtables are duplicated in
multiple codegen units), and pointers to values of *different* underlying type can compare equal
(since identical vtables can be deduplicated within a codegen unit).

# Examples

```rust
use std::ptr;

let five = 5;
let other_five = 5;
let five_ref = &five;
let same_five_ref = &five;
let other_five_ref = &other_five;

assert!(five_ref == same_five_ref);
assert!(ptr::eq(five_ref, same_five_ref));

assert!(five_ref == other_five_ref);
assert!(!ptr::eq(five_ref, other_five_ref));
```

Slices are also compared by their length (fat pointers):

```rust
let a = [1, 2, 3];
assert!(std::ptr::eq(&a[..3], &a[..3]));
assert!(!std::ptr::eq(&a[..2], &a[..3]));
assert!(!std::ptr::eq(&a[0..2], &a[1..3]));
```

## fn addr_eq

```rust
pub fn addr_eq<T: PointeeSized, U: PointeeSized>(p: *const T, q: *const U) -> bool
```

Compares the *addresses* of the two pointers for equality,
ignoring any metadata in fat pointers.

If the arguments are thin pointers of the same type,
then this is the same as `eq`.

# Examples

```rust
use std::ptr;

let whole: &[i32; 3] = &[1, 2, 3];
let first: &i32 = &whole[0];

assert!(ptr::addr_eq(whole, first));
assert!(!ptr::eq::<dyn std::fmt::Debug>(whole, first));
```

## fn fn_addr_eq

```rust
pub fn fn_addr_eq<T: FnPtr, U: FnPtr>(f: T, g: U) -> bool
```

Compares the *addresses* of the two function pointers for equality.

This is the same as `f == g`, but using this function makes clear that the potentially
surprising semantics of function pointer comparison are involved.

There are **very few guarantees** about how functions are compiled and they have no intrinsic
“identity”; in particular, this comparison:

* May return `true` unexpectedly, in cases where functions are equivalent.

  For example, the following program is likely (but not guaranteed) to print `(true, true)`
  when compiled with optimization:

```rust
  let f: fn(i32) -> i32 = |x| x;
  let g: fn(i32) -> i32 = |x| x + 0;  // different closure, different body
  let h: fn(u32) -> u32 = |x| x + 0;  // different signature too
  dbg!(std::ptr::fn_addr_eq(f, g), std::ptr::fn_addr_eq(f, h)); // not guaranteed to be equal
```

* May return `false` in any case.

  This is particularly likely with generic functions but may happen with any function.
  (From an implementation perspective, this is possible because functions may sometimes be
  processed more than once by the compiler, resulting in duplicate machine code.)

Despite these false positives and false negatives, this comparison can still be useful.
Specifically, if

* `T` is the same type as `U`, `T` is a [subtype] of `U`, or `U` is a [subtype] of `T`, and
* `ptr::fn_addr_eq(f, g)` returns true,

then calling `f` and calling `g` will be equivalent.

# Examples

```rust
use std::ptr;

fn a() { println!("a"); }
fn b() { println!("b"); }
assert!(!ptr::fn_addr_eq(a as fn(), b as fn()));
```

## fn hash

```rust
pub fn hash<T: PointeeSized, S: hash::Hasher>(hashee: *const T, into: &mut S)
```

Hash a raw pointer.

This can be used to hash a `&T` reference (which coerces to `*const T` implicitly)
by its address rather than the value it points to
(which is what the `Hash for &T` implementation does).

# Examples

```rust
use std::hash::{DefaultHasher, Hash, Hasher};
use std::ptr;

let five = 5;
let five_ref = &five;

let mut hasher = DefaultHasher::new();
ptr::hash(five_ref, &mut hasher);
let actual = hasher.finish();

let mut hasher = DefaultHasher::new();
(five_ref as *const i32).hash(&mut hasher);
let expected = hasher.finish();

assert_eq!(actual, expected);
```
