---
title: "core::ptr (part 2 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ptr/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ptr (part 2 of 5)

Note that a pointer *can* represent a `usize` (via `without_provenance`), so the right type to
use in situations where a value is "sometimes a pointer and sometimes a bare `usize`" is a
pointer type.

#### Strict Provenance

"Strict Provenance" refers to a set of APIs designed to make working with provenance more
explicit. They are intended as substitutes for casting a pointer to an integer and back.

Entirely avoiding integer-to-pointer casts successfully side-steps the inherent ambiguity of
that operation. This benefits compiler optimizations, and it is pretty much a requirement for
using tools like [Miri] and architectures like [CHERI] that aim to detect and diagnose pointer
misuse.

The key <example-value> to making programming without integer-to-pointer casts *at all* viable is the
`with_addr` method:

```
/// Creates a new pointer with the given address and the provenance  of `self`.
///
/// This is similar to a `addr as *const T` cast,
/// but copies the provenance of `self` to the new pointer.
/// This avoids the inherent ambiguity of the unary cast.
///
/// This is equivalent to using `wrapping_offset` to offset `self` to the given address,
/// and therefore has all the same capabilities and restrictions.
pub fn with_addr(self, addr: usize) -> Self;
```rust

So you're still able to drop down to the address representation and do whatever
clever bit tricks you want *as long as* you're able to keep around a pointer
into the allocation you care about that can "reconstitute" the provenance.
Usually this is very easy, because you only are taking a pointer, messing with the address,
and then immediately converting back to a pointer. To make this use case more ergonomic,
we provide the `map_addr` method.

To help make it clear that code is "following" Strict Provenance semantics, we also provide an
`addr` method which promises that the returned address is not part of a
pointer-integer-pointer roundtrip. In the future we may provide a lint for pointer<->integer
casts to help you audit if your code conforms to strict provenance.

#### Using Strict Provenance

Most code needs no changes to conform to strict provenance, as the only really concerning
operation is casts from `usize` to a pointer. For code which *does* cast a `usize` to a pointer,
the scope of the change depends on exactly what you're doing.

In general, you just need to make sure that if you want to convert a `usize` address to a
pointer and then use that pointer to read/write memory, you need to keep around a pointer
that has sufficient provenance to perform that read/write itself. In this way all of your
casts from an address to a pointer are essentially just applying offsets/indexing.

This is generally trivial to do for simple cases like tagged pointers *as long as you
represent the tagged pointer as an actual pointer and not a `usize`*. For instance:

```
// A flag we want to pack into our pointer
static HAS_DATA: usize = 0x1;
static FLAG_MASK: usize = !HAS_DATA;

// Our value, which must have enough alignment to have spare least-significant-bits.
let my_precious_data: u32 = 17;
assert!(align_of::<u32>() > 1);

// Create a tagged pointer
let ptr = &my_precious_data as *const u32;
let tagged = ptr.map_addr(|addr| addr | HAS_DATA);

// Check the flag:
if tagged.addr() & HAS_DATA != 0 {
    // Untag and read the pointer
    let data = unsafe { *tagged.map_addr(|addr| addr & FLAG_MASK) };
    assert_eq!(data, 17);
} else {
    unreachable!()
}
```rust

(Yes, if you've been using `AtomicUsize` for pointers in concurrent datastructures, you should
be using `AtomicPtr` instead. If that messes up the way you atomically manipulate pointers,
we would like to know why, and what needs to be done to fix it.)

Situations where a valid pointer *must* be created from just an address, such as baremetal code
accessing a memory-mapped interface at a fixed address, cannot currently be handled with strict
provenance APIs and should use [exposed provenance](#exposed-provenance).

#### Exposed Provenance

As discussed above, integer-to-pointer casts are not possible with Strict Provenance APIs.
This is by design: the goal of Strict Provenance is to provide a clear specification that we are
confident can be formalized unambiguously and can be subject to precise formal reasoning.
Integer-to-pointer casts do not (currently) have such a clear specification.

However, there exist situations where integer-to-pointer casts cannot be avoided, or
where avoiding them would require major refactoring. Legacy platform APIs also regularly assume
that `usize` can capture all the information that makes up a pointer.
Bare-metal platforms can also require the synthesis of a pointer "out of thin air" without
anywhere to obtain proper provenance from.

Rust's model for dealing with integer-to-pointer casts is called *Exposed Provenance*. However,
the semantics of Exposed Provenance are on much less solid footing than Strict Provenance, and
at this point it is not yet clear whether a satisfying unambiguous semantics can be defined for
Exposed Provenance. (If that sounds bad, be reassured that other popular languages that provide
integer-to-pointer casts are not faring any better.) Furthermore, Exposed Provenance will not
work (well) with tools like [Miri] and [CHERI].

Exposed Provenance is provided by the `expose_provenance` and `with_exposed_provenance` methods,
which are equivalent to `as` casts between pointers and integers.
- `expose_provenance` is a lot like `addr`, but additionally adds the provenance of the
  pointer to a global list of 'exposed' provenances. (This list is purely conceptual, it exists
  for the purpose of specifying Rust but is not materialized in actual executions, except in
  tools like [Miri].)
  Memory which is outside the control of the Rust abstract machine (MMIO registers, for example)
  is always considered to be exposed, so long as this memory is disjoint from memory that will
  be used by the abstract machine such as the stack, heap, and statics.
- `with_exposed_provenance` can be used to construct a pointer with one of these previously
  'exposed' provenances. `with_exposed_provenance` takes only `addr: usize` as arguments, so
  unlike in `with_addr` there is no indication of what the correct provenance for the returned
  pointer is -- and that is exactly what makes integer-to-pointer casts so tricky to rigorously
  specify! The compiler will do its best to pick the right provenance for you, but currently we
  cannot provide any guarantees about which provenance the resulting pointer will have. Only one
  thing is clear: if there is *no* previously 'exposed' provenance that justifies the way the
  returned pointer will be used, the program has undefined behavior.

If at all possible, we encourage code to be ported to [Strict Provenance] APIs, thus avoiding
the need for Exposed Provenance. Maximizing the amount of such code is a major win for avoiding
specification complexity and to facilitate adoption of tools like [CHERI] and [Miri] that can be
a big help in increasing the confidence in (unsafe) Rust code. However, we acknowledge that this
is not always possible, and offer Exposed Provenance as a way to explicit "opt out" of the
well-defined semantics of Strict Provenance, and "opt in" to the unclear semantics of
integer-to-pointer casts.

[aliasing]: ../../nomicon/aliasing.html
[allocation]: #allocation
[provenance]: #provenance
[book]: ../../book/ch19-01-unsafe-rust.html#dereferencing-a-raw-pointer
[ub]: ../../reference/behavior-considered-undefined.html
[zst]: ../../nomicon/exotic-sizes.html#zero-sized-types-zsts
[atomic operations]: crate::sync::atomic
`offset`: pointer::offset
`offset_from`: pointer::offset_from
`wrapping_offset`: pointer::wrapping_offset
`with_addr`: pointer::with_addr
`map_addr`: pointer::map_addr
`addr`: pointer::addr
`AtomicUsize`: crate::sync::atomic::AtomicUsize
`AtomicPtr`: crate::sync::atomic::AtomicPtr
`expose_provenance`: pointer::expose_provenance
`with_exposed_provenance`: with_exposed_provenance
[Miri]: https://github.com/rust-lang/miri
[CHERI]: https://www.cl.cam.ac.uk/research/security/ctsrd/cheri/
[Strict Provenance]: #strict-provenance
`UnsafeCell`: core::cell::UnsafeCell

## type Alignment

```rust
pub type Alignment = mem::Alignment
```

Deprecated re-export of [mem::Alignment].

## fn copy_nonoverlapping

```rust
pub const unsafe fn copy_nonoverlapping<T>(src: *const T, dst: *mut T, count: usize)
```

Copies `count * size_of::<T>()` bytes from `src` to `dst`. The source
and destination must *not* overlap.

For regions of memory which might overlap, use `copy` instead.

`copy_nonoverlapping` is semantically equivalent to C's `memcpy`, but
with the source and destination arguments swapped,
and `count` counting the number of `T`s instead of bytes.

The copy is "untyped" in the sense that data may be uninitialized or otherwise violate the
requirements of `T`. The initialization state is preserved exactly.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `src` must be [valid] for reads of `count * size_of::<T>()` bytes or that number must be 0.

* `dst` must be [valid] for writes of `count * size_of::<T>()` bytes or that number must be 0.

* Both `src` and `dst` must be properly aligned.

* The region of memory beginning at `src` with a size of `count *
  size_of::<T>()` bytes must *not* overlap with the region of memory
  beginning at `dst` with the same size.

Like `read`, `copy_nonoverlapping` creates a bitwise copy of `T`, regardless of
whether `T` is `Copy`. If `T` is not `Copy`, using *both* the values
in the region beginning at `*src` and the region beginning at `*dst` can
violate memory safety.

Note that even if the effectively copied size (`count * size_of::<T>()`) is
`0`, the pointers must be properly aligned.

# Examples

Manually implement `Vec::append`:

```rust
use std::ptr;

/// Moves all the elements of `src` into `dst`, leaving `src` empty.
fn append<T>(dst: &mut Vec<T>, src: &mut Vec<T>) {
    let src_len = src.len();
    let dst_len = dst.len();

    // Ensure that `dst` has enough capacity to hold all of `src`.
    dst.reserve(src_len);

    unsafe {
        // The call to add is always safe because `Vec` will never
        // allocate more than `isize::MAX` bytes.
        let dst_ptr = dst.as_mut_ptr().add(dst_len);
        let src_ptr = src.as_ptr();

        // Truncate `src` without dropping its contents. We do this first,
        // to avoid problems in case something further down panics.
        src.set_len(0);

        // The two regions cannot overlap because mutable references do
        // not alias, and two different vectors cannot own the same
        // memory.
        ptr::copy_nonoverlapping(src_ptr, dst_ptr, src_len);

        // Notify `dst` that it now holds the contents of `src`.
        dst.set_len(dst_len + src_len);
    }
}

let mut a = vec!['r'];
let mut b = vec!['u', 's', 't'];

append(&mut a, &mut b);

assert_eq!(a, &['r', 'u', 's', 't']);
assert!(b.is_empty());
```

## fn copy

```rust
pub const unsafe fn copy<T>(src: *const T, dst: *mut T, count: usize)
```

Copies `count * size_of::<T>()` bytes from `src` to `dst`. The source
and destination may overlap.

If the source and destination will *never* overlap,
`copy_nonoverlapping` can be used instead.

`copy` is semantically equivalent to C's `memmove`, but
with the source and destination arguments swapped,
and `count` counting the number of `T`s instead of bytes.
Copying takes place as if the bytes were copied from `src`
to a temporary array and then copied from the array to `dst`.

The copy is "untyped" in the sense that data may be uninitialized or otherwise violate the
requirements of `T`. The initialization state is preserved exactly.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `src` must be [valid] for reads of `count * size_of::<T>()` bytes or that number must be 0.

* `dst` must be [valid] for writes of `count * size_of::<T>()` bytes or that number must be 0,
  and `dst` must remain valid even when `src` is read for `count * size_of::<T>()` bytes. (This
  means if the memory ranges overlap, the `dst` pointer must not be invalidated by `src` reads.)

* Both `src` and `dst` must be properly aligned.

Like `read`, `copy` creates a bitwise copy of `T`, regardless of
whether `T` is `Copy`. If `T` is not `Copy`, using both the values
in the region beginning at `*src` and the region beginning at `*dst` can
violate memory safety.

Note that even if the effectively copied size (`count * size_of::<T>()`) is
`0`, the pointers must be properly aligned.

# Examples

Efficiently create a Rust vector from an unsafe buffer:

```rust
use std::ptr;

/// # Safety
///
/// * `ptr` must be correctly aligned for its type and non-zero.
/// * `ptr` must be valid for reads of `elts` contiguous elements of type `T`.
/// * Those elements must not be used after calling this function unless `T: Copy`.
unsafe fn from_buf_raw<T>(ptr: *const T, elts: usize) -> Vec<T> {
    let mut dst = Vec::with_capacity(elts);

    // SAFETY: Our precondition ensures the source is aligned and valid,
    // and `Vec::with_capacity` ensures that we have usable space to write them.
    unsafe { ptr::copy(ptr, dst.as_mut_ptr(), elts); }

    // SAFETY: We created it with this much capacity earlier,
    // and the previous `copy` has initialized these elements.
    unsafe { dst.set_len(elts); }
    dst
}
```

## fn write_bytes

```rust
pub const unsafe fn write_bytes<T>(dst: *mut T, val: u8, count: usize)
```

Sets `count * size_of::<T>()` bytes of memory starting at `dst` to
`val`.

`write_bytes` is similar to C's `memset`, but sets `count *
size_of::<T>()` bytes to `val`.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `dst` must be [valid] for writes of `count * size_of::<T>()` bytes.

* `dst` must be properly aligned.

Note that even if the effectively copied size (`count * size_of::<T>()`) is
`0`, the pointer must be properly aligned.

Additionally, note that changing `*dst` in this way can easily lead to undefined behavior (UB)
later if the written bytes are not a valid representation of some `T`. For instance, the
following is an **incorrect** use of this function:

```rust
unsafe {
    let mut value: u8 = 0;
    let ptr: *mut bool = &mut value as *mut u8 as *mut bool;
    let _bool = ptr.read(); // This is fine, `ptr` points to a valid `bool`.
    ptr.write_bytes(42u8, 1); // This function itself does not cause UB...
    let _bool = ptr.read(); // ...but it makes this operation UB! ⚠️
}
```

# Examples

Basic usage:

```rust
use std::ptr;

let mut vec = vec![0u32; 4];
unsafe {
    let vec_ptr = vec.as_mut_ptr();
    ptr::write_bytes(vec_ptr, 0xfe, 2);
}
assert_eq!(vec, [0xfefefefe, 0xfefefefe, 0, 0]);
```
