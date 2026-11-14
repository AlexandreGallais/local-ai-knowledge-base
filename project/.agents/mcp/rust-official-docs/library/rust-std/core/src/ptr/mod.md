# core::ptr

Manually manage memory through raw pointers.

*[See also the pointer primitive types](pointer).*

# Safety

Many functions in this module take raw pointers as arguments and read from or write to them. For
this to be safe, these pointers must be *valid* for the given access. Whether a pointer is valid
depends on the operation it is used for (read or write), and the extent of the memory that is
accessed (i.e., how many bytes are read/written) -- it makes no sense to ask "is this pointer
valid"; one has to ask "is this pointer valid for a given access". Most functions use `*mut T`
and `*const T` to access only a single value, in which case the documentation omits the size and
implicitly assumes it to be `size_of::<T>()` bytes.

The precise rules for validity are not determined yet. The guarantees that are
provided at this point are very minimal:

* A [null] pointer is *never* valid for reads/writes.
* For memory accesses of [size zero][zst], *every* non-null pointer is valid for reads/writes.
  The following points are only concerned with non-zero-sized accesses.
* For a pointer to be valid for reads/writes, it is necessary, but not always sufficient, that
  the pointer be *dereferenceable*. The [provenance] of the pointer is used to determine which
  [allocation] it is derived from; a pointer is dereferenceable if the memory range of the given
  size starting at the pointer is entirely contained within the bounds of that allocation. Note
  that in Rust, every (stack-allocated) variable is considered a separate allocation.
* All accesses performed by functions in this module are *non-atomic* in the sense
  of [atomic operations] used to synchronize between threads. This means it is
  undefined behavior to perform two concurrent accesses to the same location from different
  threads unless both accesses only read from memory.
* The result of casting a reference to a pointer is valid for reads/writes for as long as the
  underlying allocation is live and no reference (just raw pointers) is used to
  access the same memory. That is, reference and pointer accesses cannot be
  interleaved.

These axioms, along with careful use of [`offset`] for pointer arithmetic,
are enough to correctly implement many useful things in unsafe code. Stronger guarantees
will be provided eventually, as the [aliasing] rules are being determined. For more
information, see the [book] as well as the section in the reference devoted
to [undefined behavior][ub].

Note that some operations such as [`read`] and [`write`][`write()`] do allow null pointers if
the total size of the access is zero. However, other operations internally convert pointers into
references. Therefore, the general notion of "valid for reads/writes" excludes null pointers,
and the specific operations that permit null pointers mention that as an exception. Furthermore,
[`read_volatile`] and [`write_volatile`] can be used in even more situations; see their
documentation for details.

We say that a pointer is "dangling" if it is not valid for any non-zero-sized accesses. This
means out-of-bounds pointers, pointers to freed memory, null pointers, and pointers created with
[`NonNull::dangling`] are all dangling.

## Alignment

Valid raw pointers as defined above are not necessarily properly aligned (where
"proper" alignment is defined by the pointee type, i.e., `*const T` must be
aligned to `align_of::<T>()`). However, most functions require their
arguments to be properly aligned, and will explicitly state
this requirement in their documentation. Notable exceptions to this are
[`read_unaligned`] and [`write_unaligned`].

When a function requires proper alignment, it does so even if the access
has size 0, i.e., even if memory is not actually touched. Consider using
[`NonNull::dangling`] in such cases.

## Pointer to reference conversion

When converting a pointer to a reference (e.g. via `&*ptr` or `&mut *ptr`),
there are several rules that must be followed:

* The pointer must be properly aligned.

* It must be non-null.

* It must be "dereferenceable" in the sense defined above.

* The pointer must point to a [valid value] of type `T`.

* You must enforce Rust's aliasing rules. The exact aliasing rules are not decided yet, so we
  only give a rough overview here. The rules also depend on whether a mutable or a shared
  reference is being created.
  * When creating a mutable reference, then while this reference exists, the memory it points to
    must not get accessed (read or written) through any other pointer or reference not derived
    from this reference.
  * When creating a shared reference, then while this reference exists, the memory it points to
    must not get mutated (except inside `UnsafeCell`).

If a pointer follows all of these rules, it is said to be
*convertible to a (mutable or shared) reference*.

These rules apply even if the result is unused!
(The part about being initialized is not yet fully decided, but until
it is, the only safe approach is to ensure that they are indeed initialized.)

An example of the implications of the above rules is that an expression such
as `unsafe { &*(0 as *const u8) }` is Immediate Undefined Behavior.

[valid value]: ../../reference/behavior-considered-undefined.html#invalid-values

## Allocation

<a id="allocated-object"></a> <!-- keep old URLs working -->

An *allocation* is a subset of program memory which is addressable
from Rust, and within which pointer arithmetic is possible. Examples of
allocations include heap allocations, stack-allocated variables,
statics, and consts. The safety preconditions of some Rust operations -
such as `offset` and field projections (`expr.field`) - are defined in
terms of the allocations on which they operate.

An allocation has a base address, a size, and a set of memory
addresses. It is possible for an allocation to have zero size, but
such an allocation will still have a base address. The base address
of an allocation is not necessarily unique. While it is currently the
case that an allocation always has a set of memory addresses which is
fully contiguous (i.e., has no "holes"), there is no guarantee that this
will not change in the future.

An allocation can be either mutable (the common case) or *read-only*.
Read-only allocations are implicitly introduced by the compiler for `static` items without
interior mutability and for `const` items. Writing or creating a mutable reference to a
read-only allocation is undefined behavior, and most atomic operations are not supported
for read-only allocations either (see [here][atomic-ro] for exceptions).
Additionally, some target-specific intrinsics are not supported on read-only
allocations even if their memory write is masked off, such as [`_mm_maskmoveu_si128`].

[atomic-ro]: crate::sync::atomic#atomic-accesses-to-read-only-memory
[`_mm_maskmoveu_si128`]: ../../core/arch/x86/fn._mm_maskmoveu_si128.html

Allocations must behave like "normal" memory: in particular, reads must not have
side-effects, and writes must become visible to other threads using the usual synchronization
primitives.
Allocations must support all atomic operations that are available for the target (as
determined by the `target_has_atomic*` set of cfg flags).
Read-only allocations only have to support the operations [permitted there][atomic-ro].
The precise instructions used for atomic operations are generally not guaranteed, so portable
software should place all Rust allocations in memory regions that support all atomic
instructions.

For any allocation with `base` address, `size`, and a set of
`addresses`, the following are guaranteed:
- For all addresses `a` in `addresses`, `a` is in the range `base .. (base +
  size)` (note that this requires `a < base + size`, not `a <= base + size`)
- `base` is not equal to [`null()`] (i.e., the address with the numerical
  value 0)
- `base + size <= usize::MAX`
- `size <= isize::MAX`

As a consequence of these guarantees, given any address `a` within the set
of addresses of an allocation:
- It is guaranteed that `a - base` does not overflow `isize`
- It is guaranteed that `a - base` is non-negative
- It is guaranteed that, given `o = a - base` (i.e., the offset of `a` within
  the allocation), `base + o` will not wrap around the address space (in
  other words, will not overflow `usize`)

Allocations typically have a fixed size that cannot change. However, allocations created by
directly invoking page table operations of the operating system, e.g. via `mmap`, are allowed to
grow by adding more pages to them at the end. Adding more pages before the beginning, or
unmapping parts of an allocation (i.e., shrinking it or punching holes into it), is currently
not supported. Allocations created via "compiler-recognized" operations, such as `std::alloc`
methods or `libc::malloc`, can never change their size, even if they use `mmap` under the hood.

[`null()`]: null

# Provenance

Pointers are not *simply* an "integer" or "address". For instance, it's uncontroversial
to say that a Use After Free is clearly Undefined Behavior, even if you "get lucky"
and the freed memory gets reallocated before your read/write (in fact this is the
worst-case scenario, UAFs would be much less concerning if this didn't happen!).
As another example, consider that [`wrapping_offset`] is documented to "remember"
the allocation that the original pointer points to, even if it is offset far
outside the memory range occupied by that allocation.
To rationalize claims like this, pointers need to somehow be *more* than just their addresses:
they must have **provenance**.

A pointer value in Rust semantically contains the following information:

* The **address** it points to, which can be represented by a `usize`.
* The **provenance** it has, defining the memory it has permission to access. Provenance can be
  absent, in which case the pointer does not have permission to access any memory.

The exact structure of provenance is not yet specified, but the permission defined by a
pointer's provenance have a *spatial* component, a *temporal* component, and a *mutability*
component:

* Spatial: The set of memory addresses that the pointer is allowed to access.
* Temporal: The timespan during which the pointer is allowed to access those memory addresses.
* Mutability: Whether the pointer may only access the memory for reads, or also access it for
  writes. Note that this can interact with the other components, e.g. a pointer might permit
  mutation only for a subset of addresses, or only for a subset of its maximal timespan.

When an [allocation] is created, it has a unique Original Pointer. For alloc
APIs this is literally the pointer the call returns, and for local variables and statics,
this is the name of the variable/static. (This is mildly overloading the term "pointer"
for the sake of brevity/exposition.)

The Original Pointer for an allocation has provenance that constrains the *spatial*
permissions of this pointer to the memory range of the allocation, and the *temporal*
permissions to the lifetime of the allocation. Provenance is implicitly inherited by all
pointers transitively derived from the Original Pointer through operations like [`offset`],
borrowing, and pointer casts. Some operations may *shrink* the permissions of the derived
provenance, limiting how much memory it can access or how long it's valid for (i.e. borrowing a
subfield and subslicing can shrink the spatial component of provenance, and all borrowing can
shrink the temporal component of provenance). However, no operation can ever *grow* the
permissions of the derived provenance: even if you "know" there is a larger allocation, you
can't derive a pointer with a larger provenance. Similarly, you cannot "recombine" two
contiguous provenances back into one (i.e. with a `fn merge(&[T], &[T]) -> &[T]`).

A reference to a place always has provenance over at least the memory that place occupies.
A reference to a slice always has provenance over at least the range that slice describes.
Whether and when exactly the provenance of a reference gets "shrunk" to *exactly* fit
the memory it points to is not yet determined.

A *shared* reference only ever has provenance that permits reading from memory,
and never permits writes, except inside [`UnsafeCell`].

Provenance can affect whether a program has undefined behavior:

* It is undefined behavior to access memory through a pointer that does not have provenance over
  that memory. Note that a pointer "at the end" of its provenance is not actually outside its
  provenance, it just has 0 bytes it can load/store. Zero-sized accesses do not require any
  provenance since they access an empty range of memory.

* It is undefined behavior to [`offset`] a pointer across a memory range that is not contained
  in the allocation it is derived from, or to [`offset_from`] two pointers not derived
  from the same allocation. Provenance is used to say what exactly "derived from" even
  means: the lineage of a pointer is traced back to the Original Pointer it descends from, and
  that identifies the relevant allocation. In particular, it's always UB to offset a
  pointer derived from something that is now deallocated, except if the offset is 0.

But it *is* still sound to:

* Create a pointer without provenance from just an address (see [`without_provenance`]). Such a
  pointer cannot be used for memory accesses (except for zero-sized accesses). This can still be
  useful for sentinel values like `null` *or* to represent a tagged pointer that will never be
  dereferenceable. In general, it is always sound for an integer to pretend to be a pointer "for
  fun" as long as you don't use operations on it which require it to be valid (non-zero-sized
  offset, read, write, etc).

* Forge an allocation of size zero at any sufficiently aligned non-null address.
  i.e. the usual "ZSTs are fake, do what you want" rules apply.

* [`wrapping_offset`] a pointer outside its provenance. This includes pointers
  which have "no" provenance. In particular, this makes it sound to do pointer tagging tricks.

* Compare arbitrary pointers by address. Pointer comparison ignores provenance and addresses
  *are* just integers, so there is always a coherent answer, even if the pointers are dangling
  or from different provenances. Note that if you get "lucky" and notice that a pointer at the
  end of one allocation is the "same" address as the start of another allocation,
  anything you do with that fact is *probably* going to be gibberish. The scope of that
  gibberish is kept under control by the fact that the two pointers *still* aren't allowed to
  access the other's allocation (bytes), because they still have different provenance.

Note that the full definition of provenance in Rust is not decided yet, as this interacts
with the as-yet undecided [aliasing] rules.

## Pointers Vs Integers

From this discussion, it becomes very clear that a `usize` *cannot* accurately represent a pointer,
and converting from a pointer to a `usize` is generally an operation which *only* extracts the
address. Converting this address back into pointer requires somehow answering the question:
which provenance should the resulting pointer have?

Rust provides two ways of dealing with this situation: *Strict Provenance* and *Exposed Provenance*.

Note that a pointer *can* represent a `usize` (via [`without_provenance`]), so the right type to
use in situations where a value is "sometimes a pointer and sometimes a bare `usize`" is a
pointer type.

## Strict Provenance

"Strict Provenance" refers to a set of APIs designed to make working with provenance more
explicit. They are intended as substitutes for casting a pointer to an integer and back.

Entirely avoiding integer-to-pointer casts successfully side-steps the inherent ambiguity of
that operation. This benefits compiler optimizations, and it is pretty much a requirement for
using tools like [Miri] and architectures like [CHERI] that aim to detect and diagnose pointer
misuse.

The key insight to making programming without integer-to-pointer casts *at all* viable is the
[`with_addr`] method:

```text
/// Creates a new pointer with the given address and the provenance  of `self`.
///
/// This is similar to a `addr as *const T` cast,
/// but copies the provenance of `self` to the new pointer.
/// This avoids the inherent ambiguity of the unary cast.
///
/// This is equivalent to using `wrapping_offset` to offset `self` to the given address,
/// and therefore has all the same capabilities and restrictions.
pub fn with_addr(self, addr: usize) -> Self;
```

So you're still able to drop down to the address representation and do whatever
clever bit tricks you want *as long as* you're able to keep around a pointer
into the allocation you care about that can "reconstitute" the provenance.
Usually this is very easy, because you only are taking a pointer, messing with the address,
and then immediately converting back to a pointer. To make this use case more ergonomic,
we provide the [`map_addr`] method.

To help make it clear that code is "following" Strict Provenance semantics, we also provide an
[`addr`] method which promises that the returned address is not part of a
pointer-integer-pointer roundtrip. In the future we may provide a lint for pointer<->integer
casts to help you audit if your code conforms to strict provenance.

### Using Strict Provenance

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
```

(Yes, if you've been using [`AtomicUsize`] for pointers in concurrent datastructures, you should
be using [`AtomicPtr`] instead. If that messes up the way you atomically manipulate pointers,
we would like to know why, and what needs to be done to fix it.)

Situations where a valid pointer *must* be created from just an address, such as baremetal code
accessing a memory-mapped interface at a fixed address, cannot currently be handled with strict
provenance APIs and should use [exposed provenance](#exposed-provenance).

## Exposed Provenance

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

Exposed Provenance is provided by the [`expose_provenance`] and [`with_exposed_provenance`] methods,
which are equivalent to `as` casts between pointers and integers.
- [`expose_provenance`] is a lot like [`addr`], but additionally adds the provenance of the
  pointer to a global list of 'exposed' provenances. (This list is purely conceptual, it exists
  for the purpose of specifying Rust but is not materialized in actual executions, except in
  tools like [Miri].)
  Memory which is outside the control of the Rust abstract machine (MMIO registers, for example)
  is always considered to be exposed, so long as this memory is disjoint from memory that will
  be used by the abstract machine such as the stack, heap, and statics.
- [`with_exposed_provenance`] can be used to construct a pointer with one of these previously
  'exposed' provenances. [`with_exposed_provenance`] takes only `addr: usize` as arguments, so
  unlike in [`with_addr`] there is no indication of what the correct provenance for the returned
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
[`offset`]: pointer::offset
[`offset_from`]: pointer::offset_from
[`wrapping_offset`]: pointer::wrapping_offset
[`with_addr`]: pointer::with_addr
[`map_addr`]: pointer::map_addr
[`addr`]: pointer::addr
[`AtomicUsize`]: crate::sync::atomic::AtomicUsize
[`AtomicPtr`]: crate::sync::atomic::AtomicPtr
[`expose_provenance`]: pointer::expose_provenance
[`with_exposed_provenance`]: with_exposed_provenance
[Miri]: https://github.com/rust-lang/miri
[CHERI]: https://www.cl.cam.ac.uk/research/security/ctsrd/cheri/
[Strict Provenance]: #strict-provenance
[`UnsafeCell`]: core::cell::UnsafeCell

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

For regions of memory which might overlap, use [`copy`] instead.

`copy_nonoverlapping` is semantically equivalent to C's [`memcpy`], but
with the source and destination arguments swapped,
and `count` counting the number of `T`s instead of bytes.

The copy is "untyped" in the sense that data may be uninitialized or otherwise violate the
requirements of `T`. The initialization state is preserved exactly.

[`memcpy`]: https://en.cppreference.com/w/c/string/byte/memcpy

# Safety

Behavior is undefined if any of the following conditions are violated:

* `src` must be [valid] for reads of `count * size_of::<T>()` bytes or that number must be 0.

* `dst` must be [valid] for writes of `count * size_of::<T>()` bytes or that number must be 0.

* Both `src` and `dst` must be properly aligned.

* The region of memory beginning at `src` with a size of `count *
  size_of::<T>()` bytes must *not* overlap with the region of memory
  beginning at `dst` with the same size.

Like [`read`], `copy_nonoverlapping` creates a bitwise copy of `T`, regardless of
whether `T` is [`Copy`]. If `T` is not [`Copy`], using *both* the values
in the region beginning at `*src` and the region beginning at `*dst` can
[violate memory safety][read-ownership].

Note that even if the effectively copied size (`count * size_of::<T>()`) is
`0`, the pointers must be properly aligned.

[`read`]: crate::ptr::read
[read-ownership]: crate::ptr::read#ownership-of-the-returned-value
[valid]: crate::ptr#safety

# Examples

Manually implement [`Vec::append`]:

```
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

[`Vec::append`]: ../../std/vec/struct.Vec.html#method.append

## fn copy

```rust
pub const unsafe fn copy<T>(src: *const T, dst: *mut T, count: usize)
```

Copies `count * size_of::<T>()` bytes from `src` to `dst`. The source
and destination may overlap.

If the source and destination will *never* overlap,
[`copy_nonoverlapping`] can be used instead.

`copy` is semantically equivalent to C's [`memmove`], but
with the source and destination arguments swapped,
and `count` counting the number of `T`s instead of bytes.
Copying takes place as if the bytes were copied from `src`
to a temporary array and then copied from the array to `dst`.

The copy is "untyped" in the sense that data may be uninitialized or otherwise violate the
requirements of `T`. The initialization state is preserved exactly.

[`memmove`]: https://en.cppreference.com/w/c/string/byte/memmove

# Safety

Behavior is undefined if any of the following conditions are violated:

* `src` must be [valid] for reads of `count * size_of::<T>()` bytes or that number must be 0.

* `dst` must be [valid] for writes of `count * size_of::<T>()` bytes or that number must be 0,
  and `dst` must remain valid even when `src` is read for `count * size_of::<T>()` bytes. (This
  means if the memory ranges overlap, the `dst` pointer must not be invalidated by `src` reads.)

* Both `src` and `dst` must be properly aligned.

Like [`read`], `copy` creates a bitwise copy of `T`, regardless of
whether `T` is [`Copy`]. If `T` is not [`Copy`], using both the values
in the region beginning at `*src` and the region beginning at `*dst` can
[violate memory safety][read-ownership].

Note that even if the effectively copied size (`count * size_of::<T>()`) is
`0`, the pointers must be properly aligned.

[`read`]: crate::ptr::read
[read-ownership]: crate::ptr::read#ownership-of-the-returned-value
[valid]: crate::ptr#safety

# Examples

Efficiently create a Rust vector from an unsafe buffer:

```
use std::ptr;

/// # Safety
///
/// * `ptr` must be correctly aligned for its type and non-zero.
/// * `ptr` must be valid for reads of `elts` contiguous elements of type `T`.
/// * Those elements must not be used after calling this function unless `T: Copy`.
# #[allow(dead_code)]
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

`write_bytes` is similar to C's [`memset`], but sets `count *
size_of::<T>()` bytes to `val`.

[`memset`]: https://en.cppreference.com/w/c/string/byte/memset

# Safety

Behavior is undefined if any of the following conditions are violated:

* `dst` must be [valid] for writes of `count * size_of::<T>()` bytes.

* `dst` must be properly aligned.

Note that even if the effectively copied size (`count * size_of::<T>()`) is
`0`, the pointer must be properly aligned.

Additionally, note that changing `*dst` in this way can easily lead to undefined behavior (UB)
later if the written bytes are not a valid representation of some `T`. For instance, the
following is an **incorrect** use of this function:

```rust,no_run
unsafe {
    let mut value: u8 = 0;
    let ptr: *mut bool = &mut value as *mut u8 as *mut bool;
    let _bool = ptr.read(); // This is fine, `ptr` points to a valid `bool`.
    ptr.write_bytes(42u8, 1); // This function itself does not cause UB...
    let _bool = ptr.read(); // ...but it makes this operation UB! ⚠️
}
```

[valid]: crate::ptr#safety

# Examples

Basic usage:

```
use std::ptr;

let mut vec = vec![0u32; 4];
unsafe {
    let vec_ptr = vec.as_mut_ptr();
    ptr::write_bytes(vec_ptr, 0xfe, 2);
}
assert_eq!(vec, [0xfefefefe, 0xfefefefe, 0, 0]);
```

## fn drop_in_place

```rust
pub const unsafe fn drop_in_place<T: PointeeSized>(to_drop: *mut T) where T: [const] Destruct,
```

* It is *required* to use `drop_in_place` to drop unsized types like
  trait objects, because they can't be read out onto the stack and
  dropped normally.

* It is friendlier to the optimizer to do this over [`ptr::read`] when
  dropping manually allocated memory (e.g., in the implementations of
  `Box`/`Rc`/`Vec`), as the compiler doesn't need to prove that it's
  sound to elide the copy.

* It can be used to drop [pinned] data when `T` is not `repr(packed)`
  (pinned data must not be moved before it is dropped).

Unaligned values cannot be dropped in place, they must be copied to an aligned
location first using [`ptr::read_unaligned`]. For packed structs, this move is
done automatically by the compiler. This means the fields of packed structs
are not dropped in-place.

[`ptr::read`]: self::read
[`ptr::read_unaligned`]: self::read_unaligned
[pinned]: crate::pin

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

Additionally, if `T` is not [`Copy`], using the pointed-to value after
calling `drop_in_place` can cause undefined behavior. Note that `*to_drop =
foo` counts as a use because it will cause the value to be dropped
again. [`write()`] can be used to overwrite data without causing it to be
dropped.

[valid]: self#safety

# Examples

Manually remove the last item from a vector:

```
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

```
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

```
use std::ptr;

let p: *mut i32 = ptr::null_mut();
assert!(p.is_null());
assert_eq!(p as usize, 0); // this pointer has the address 0
```

## fn without_provenance

```rust
pub const fn without_provenance<T>(addr: usize) -> *const T
```

Creates a pointer with the given address and no [provenance][crate::ptr#provenance].

This is equivalent to `ptr::null().with_addr(addr)`.

Without provenance, this pointer is not associated with any actual allocation. Such a
no-provenance pointer may be used for zero-sized memory accesses (if suitably aligned), but
non-zero-sized memory accesses with a no-provenance pointer are UB. No-provenance pointers are
little more than a `usize` address in disguise.

This is different from `addr as *const T`, which creates a pointer that picks up a previously
exposed provenance. See [`with_exposed_provenance`] for more details on that operation.

This is a [Strict Provenance][crate::ptr#strict-provenance] API.

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

Creates a pointer with the given address and no [provenance][crate::ptr#provenance].

This is equivalent to `ptr::null_mut().with_addr(addr)`.

Without provenance, this pointer is not associated with any actual allocation. Such a
no-provenance pointer may be used for zero-sized memory accesses (if suitably aligned), but
non-zero-sized memory accesses with a no-provenance pointer are UB. No-provenance pointers are
little more than a `usize` address in disguise.

This is different from `addr as *mut T`, which creates a pointer that picks up a previously
exposed provenance. See [`with_exposed_provenance_mut`] for more details on that operation.

This is a [Strict Provenance][crate::ptr#strict-provenance] API.

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
[provenance][crate::ptr#provenance].

This is fully equivalent to `addr as *const T`. The provenance of the returned pointer is that
of *some* pointer that was previously exposed by passing it to
[`expose_provenance`][pointer::expose_provenance], or a `ptr as usize` cast. In addition, memory
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
stay conformant with the Rust memory model. It is recommended to use [Strict
Provenance][self#strict-provenance] APIs such as [`with_addr`][pointer::with_addr] wherever
possible.

On most platforms this will produce a value with the same bytes as the address. Platforms
which need to store additional information in a pointer may not support this operation,
since it is generally not possible to actually *compute* which provenance the returned
pointer has to pick up.

This is an [Exposed Provenance][crate::ptr#exposed-provenance] API.

## fn with_exposed_provenance_mut

```rust
pub const fn with_exposed_provenance_mut<T>(addr: usize) -> *mut T
```

Converts an address back to a mutable pointer, picking up some previously 'exposed'
[provenance][crate::ptr#provenance].

This is fully equivalent to `addr as *mut T`. The provenance of the returned pointer is that
of *some* pointer that was previously exposed by passing it to
[`expose_provenance`][pointer::expose_provenance], or a `ptr as usize` cast. In addition, memory
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
stay conformant with the Rust memory model. It is recommended to use [Strict
Provenance][self#strict-provenance] APIs such as [`with_addr`][pointer::with_addr] wherever
possible.

On most platforms this will produce a value with the same bytes as the address. Platforms
which need to store additional information in a pointer may not support this operation,
since it is generally not possible to actually *compute* which provenance the returned
pointer has to pick up.

This is an [Exposed Provenance][crate::ptr#exposed-provenance] API.

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
you need to mutate the pointee, use [`from_mut`]. Specifically, to turn a mutable reference `m:
&mut T` into `*const T`, prefer `from_mut(m).cast_const()` to obtain a pointer that can later be
used for mutation.

## Interaction with lifetime extension

Note that this has subtle interactions with the rules for lifetime extension of temporaries in
tail expressions. This code is valid, albeit in a non-obvious way:
```rust
# type T = i32;
# fn foo() -> T { 42 }
// The temporary holding the return value of `foo` has its lifetime extended,
// because the surrounding expression involves no function call.
let p = &foo() as *const T;
unsafe { p.read() };
```
Naively replacing the cast with `from_ref` is not valid:
```rust,no_run
# use std::ptr;
# type T = i32;
# fn foo() -> T { 42 }
// The temporary holding the return value of `foo` does *not* have its lifetime extended,
// because the surrounding expression involves a function call.
let p = ptr::from_ref(&foo());
unsafe { p.read() }; // UB! Reading from a dangling pointer ⚠️
```
The recommended way to write this code is to avoid relying on lifetime extension
when raw pointers are involved:
```rust
# use std::ptr;
# type T = i32;
# fn foo() -> T { 42 }
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
# type T = i32;
# fn foo() -> T { 42 }
// The temporary holding the return value of `foo` has its lifetime extended,
// because the surrounding expression involves no function call.
let p = &mut foo() as *mut T;
unsafe { p.write(T::default()) };
```
Naively replacing the cast with `from_mut` is not valid:
```rust,no_run
# use std::ptr;
# type T = i32;
# fn foo() -> T { 42 }
// The temporary holding the return value of `foo` does *not* have its lifetime extended,
// because the surrounding expression involves a function call.
let p = ptr::from_mut(&mut foo());
unsafe { p.write(T::default()) }; // UB! Writing to a dangling pointer ⚠️
```
The recommended way to write this code is to avoid relying on lifetime extension
when raw pointers are involved:
```rust
# use std::ptr;
# type T = i32;
# fn foo() -> T { 42 }
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
See the documentation of [`slice::from_raw_parts`] for slice safety requirements.

[`slice::from_raw_parts`]: crate::slice::from_raw_parts

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

```rust,should_panic
use std::ptr;
let danger: *const [u8] = ptr::slice_from_raw_parts(ptr::null(), 0);
unsafe {
    danger.as_ref().expect("references must not be null");
}
```

## fn slice_from_raw_parts_mut

```rust
pub const fn slice_from_raw_parts_mut<T>(data: *mut T, len: usize) -> *mut [T]
```

Forms a raw mutable slice from a pointer and a length.

The `len` argument is the number of **elements**, not the number of bytes.

Performs the same functionality as [`slice_from_raw_parts`], except that a
raw mutable slice is returned, as opposed to a raw immutable slice.

This function is safe, but actually using the return value is unsafe.
See the documentation of [`slice::from_raw_parts_mut`] for slice safety requirements.

[`slice::from_raw_parts_mut`]: crate::slice::from_raw_parts_mut

# Examples

```rust
use std::ptr;

let x = &mut [5, 6, 7];
let raw_pointer = x.as_mut_ptr();
let slice = ptr::slice_from_raw_parts_mut(raw_pointer, 3);

unsafe {
    (*slice)[2] = 99; // assign a value at an index in the slice
};

assert_eq!(unsafe { &*slice }[2], 99);
```

You must ensure that the pointer is valid and not null before dereferencing
the raw slice. A slice reference must never have a null pointer, even if it's empty.

```rust,should_panic
use std::ptr;
let danger: *mut [u8] = ptr::slice_from_raw_parts_mut(ptr::null_mut(), 0);
unsafe {
    danger.as_mut().expect("references must not be null");
}
```

## fn swap

```rust
pub const unsafe fn swap<T>(x: *mut T, y: *mut T)
```

Swaps the values at two mutable locations of the same type, without
deinitializing either.

But for the following exceptions, this function is semantically
equivalent to [`mem::swap`]:

* It operates on raw pointers instead of references. When references are
  available, [`mem::swap`] should be preferred.

* The two pointed-to values may overlap. If the values do overlap, then the
  overlapping region of memory from `x` will be used. This is demonstrated
  in the second example below.

* The operation is "untyped" in the sense that data may be uninitialized or otherwise violate
  the requirements of `T`. The initialization state is preserved exactly.

# Safety

Behavior is undefined if any of the following conditions are violated:

* Both `x` and `y` must be [valid] for both reads and writes. They must remain valid even when the
  other pointer is written. (This means if the memory ranges overlap, the two pointers must not
  be subject to aliasing restrictions relative to each other.)

* Both `x` and `y` must be properly aligned.

Note that even if `T` has size `0`, the pointers must be properly aligned.

[valid]: self#safety

# Examples

Swapping two non-overlapping regions:

```
use std::ptr;

let mut array = [0, 1, 2, 3];

let (x, y) = array.split_at_mut(2);
let x = x.as_mut_ptr().cast::<[u32; 2]>(); // this is `array[0..2]`
let y = y.as_mut_ptr().cast::<[u32; 2]>(); // this is `array[2..4]`

unsafe {
    ptr::swap(x, y);
    assert_eq!([2, 3, 0, 1], array);
}
```

Swapping two overlapping regions:

```
use std::ptr;

let mut array: [i32; 4] = [0, 1, 2, 3];

let array_ptr: *mut i32 = array.as_mut_ptr();

let x = array_ptr as *mut [i32; 3]; // this is `array[0..3]`
let y = unsafe { array_ptr.add(1) } as *mut [i32; 3]; // this is `array[1..4]`

unsafe {
    ptr::swap(x, y);
    // The indices `1..3` of the slice overlap between `x` and `y`.
    // Reasonable results would be for to them be `[2, 3]`, so that indices `0..3` are
    // `[1, 2, 3]` (matching `y` before the `swap`); or for them to be `[0, 1]`
    // so that indices `1..4` are `[0, 1, 2]` (matching `x` before the `swap`).
    // This implementation is defined to make the latter choice.
    assert_eq!([1, 0, 1, 2], array);
}
```

## fn swap_nonoverlapping

```rust
pub const unsafe fn swap_nonoverlapping<T>(x: *mut T, y: *mut T, count: usize)
```

Swaps `count * size_of::<T>()` bytes between the two regions of memory
beginning at `x` and `y`. The two regions must *not* overlap.

The operation is "untyped" in the sense that data may be uninitialized or otherwise violate the
requirements of `T`. The initialization state is preserved exactly.

# Safety

Behavior is undefined if any of the following conditions are violated:

* Both `x` and `y` must be [valid] for both reads and writes of `count *
  size_of::<T>()` bytes.

* Both `x` and `y` must be properly aligned.

* The region of memory beginning at `x` with a size of `count *
  size_of::<T>()` bytes must *not* overlap with the region of memory
  beginning at `y` with the same size.

Note that even if the effectively copied size (`count * size_of::<T>()`) is `0`,
the pointers must be properly aligned.

[valid]: self#safety

# Examples

Basic usage:

```
use std::ptr;

let mut x = [1, 2, 3, 4];
let mut y = [7, 8, 9];

unsafe {
    ptr::swap_nonoverlapping(x.as_mut_ptr(), y.as_mut_ptr(), 2);
}

assert_eq!(x, [7, 8, 3, 4]);
assert_eq!(y, [1, 2, 9]);
```

## fn replace

```rust
pub const unsafe fn replace<T>(dst: *mut T, src: T) -> T
```

Moves `src` into the pointed `dst`, returning the previous `dst` value.

Neither value is dropped.

This function is semantically equivalent to [`mem::replace`] except that it
operates on raw pointers instead of references. When references are
available, [`mem::replace`] should be preferred.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `dst` must be [valid] for both reads and writes or `T` must be a ZST.

* `dst` must be properly aligned.

* `dst` must point to a properly initialized value of type `T`.

Note that even if `T` has size `0`, the pointer must be properly aligned.

[valid]: self#safety

# Examples

```
use std::ptr;

let mut rust = vec!['b', 'u', 's', 't'];

// `mem::replace` would have the same effect without requiring the unsafe
// block.
let b = unsafe {
    ptr::replace(&mut rust[0], 'r')
};

assert_eq!(b, 'b');
assert_eq!(rust, &['r', 'u', 's', 't']);
```

## fn read

```rust
pub const unsafe fn read<T>(src: *const T) -> T
```

Reads the value from `src` without moving it. This leaves the
memory in `src` unchanged.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `src` must be [valid] for reads or `T` must be a ZST.

* `src` must be properly aligned. Use [`read_unaligned`] if this is not the
  case.

* `src` must point to a properly initialized value of type `T`.

Note that even if `T` has size `0`, the pointer must be properly aligned.

Care must be taken around [ownership of the returned value](#ownership-of-the-returned-value).

# Examples

Basic usage:

```
let x = 12;
let y = &x as *const i32;

unsafe {
    assert_eq!(std::ptr::read(y), 12);
}
```

Manually implement [`mem::swap`]:

```
use std::ptr;

fn swap<T>(a: &mut T, b: &mut T) {
    unsafe {
        // Create a bitwise copy of the value at `a` in `tmp`.
        let tmp = ptr::read(a);

        // Exiting at this point (either by explicitly returning or by
        // calling a function which panics) would cause the value in `tmp` to
        // be dropped while the same value is still referenced by `a`. This
        // could trigger undefined behavior if `T` is not `Copy`.

        // Create a bitwise copy of the value at `b` in `a`.
        // This is safe because mutable references cannot alias.
        ptr::copy_nonoverlapping(b, a, 1);

        // As above, exiting here could trigger undefined behavior because
        // the same value is referenced by `a` and `b`.

        // Move `tmp` into `b`.
        ptr::write(b, tmp);

        // `tmp` has been moved (`write` takes ownership of its second argument),
        // so nothing is dropped implicitly here.
    }
}

let mut foo = "foo".to_owned();
let mut bar = "bar".to_owned();

swap(&mut foo, &mut bar);

assert_eq!(foo, "bar");
assert_eq!(bar, "foo");
```

## Ownership of the Returned Value

`read` creates a bitwise copy of `T`, regardless of whether `T` is [`Copy`].
If `T` is not [`Copy`], using both the returned value and the value at
`*src` can violate memory safety. Note that assigning to `*src` counts as a
use because it will attempt to drop the value at `*src`.

[`write()`] can be used to overwrite data without causing it to be dropped.

```
use std::ptr;

let mut s = String::from("foo");
unsafe {
    // `s2` now points to the same underlying memory as `s`.
    let mut s2: String = ptr::read(&s);

    assert_eq!(s2, "foo");

    // Assigning to `s2` causes its original value to be dropped. Beyond
    // this point, `s` must no longer be used, as the underlying memory has
    // been freed.
    s2 = String::default();
    assert_eq!(s2, "");

    // Assigning to `s` would cause the old value to be dropped again,
    // resulting in undefined behavior.
    // s = String::from("bar"); // ERROR

    // `ptr::write` can be used to overwrite a value without dropping it.
    ptr::write(&mut s, String::from("bar"));
}

assert_eq!(s, "bar");
```

[valid]: self#safety

## fn read_unaligned

```rust
pub const unsafe fn read_unaligned<T>(src: *const T) -> T
```

Reads the value from `src` without moving it. This leaves the
memory in `src` unchanged.

Unlike [`read`], `read_unaligned` works with unaligned pointers.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `src` must be [valid] for reads.

* `src` must point to a properly initialized value of type `T`.

Like [`read`], `read_unaligned` creates a bitwise copy of `T`, regardless of
whether `T` is [`Copy`]. If `T` is not [`Copy`], using both the returned
value and the value at `*src` can [violate memory safety][read-ownership].

[read-ownership]: read#ownership-of-the-returned-value
[valid]: self#safety

## On `packed` structs

Attempting to create a raw pointer to an `unaligned` struct field with
an expression such as `&packed.unaligned as *const FieldType` creates an
intermediate unaligned reference before converting that to a raw pointer.
That this reference is temporary and immediately cast is inconsequential
as the compiler always expects references to be properly aligned.
As a result, using `&packed.unaligned as *const FieldType` causes immediate
*undefined behavior* in your program.

Instead you must use the `&raw const` syntax to create the pointer.
You may use that constructed pointer together with this function.

An example of what not to do and how this relates to `read_unaligned` is:

```
#[repr(packed, C)]
struct Packed {
    _padding: u8,
    unaligned: u32,
}

let packed = Packed {
    _padding: 0x00,
    unaligned: 0x01020304,
};

// Take the address of a 32-bit integer which is not aligned.
// In contrast to `&packed.unaligned as *const _`, this has no undefined behavior.
let unaligned = &raw const packed.unaligned;

let v = unsafe { std::ptr::read_unaligned(unaligned) };
assert_eq!(v, 0x01020304);
```

Accessing unaligned fields directly with e.g. `packed.unaligned` is safe however.

# Examples

Read a `usize` value from a byte buffer:

```
fn read_usize(x: &[u8]) -> usize {
    assert!(x.len() >= size_of::<usize>());

    let ptr = x.as_ptr() as *const usize;

    unsafe { ptr.read_unaligned() }
}
```

## fn write

```rust
pub const unsafe fn write<T>(dst: *mut T, src: T)
```

Overwrites a memory location with the given value without reading or
dropping the old value.

`write` does not drop the contents of `dst`. This is safe, but it could leak
allocations or resources, so care should be taken not to overwrite an object
that should be dropped.

Additionally, it does not drop `src`. Semantically, `src` is moved into the
location pointed to by `dst`.

This is appropriate for initializing uninitialized memory, or overwriting
memory that has previously been [`read`] from.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `dst` must be [valid] for writes or `T` must be a ZST.

* `dst` must be properly aligned. Use [`write_unaligned`] if this is not the
  case.

Note that even if `T` has size `0`, the pointer must be properly aligned.

[valid]: self#safety

# Examples

Basic usage:

```
let mut x = 0;
let y = &mut x as *mut i32;
let z = 12;

unsafe {
    std::ptr::write(y, z);
    assert_eq!(std::ptr::read(y), 12);
}
```

Manually implement [`mem::swap`]:

```
use std::ptr;

fn swap<T>(a: &mut T, b: &mut T) {
    unsafe {
        // Create a bitwise copy of the value at `a` in `tmp`.
        let tmp = ptr::read(a);

        // Exiting at this point (either by explicitly returning or by
        // calling a function which panics) would cause the value in `tmp` to
        // be dropped while the same value is still referenced by `a`. This
        // could trigger undefined behavior if `T` is not `Copy`.

        // Create a bitwise copy of the value at `b` in `a`.
        // This is safe because mutable references cannot alias.
        ptr::copy_nonoverlapping(b, a, 1);

        // As above, exiting here could trigger undefined behavior because
        // the same value is referenced by `a` and `b`.

        // Move `tmp` into `b`.
        ptr::write(b, tmp);

        // `tmp` has been moved (`write` takes ownership of its second argument),
        // so nothing is dropped implicitly here.
    }
}

let mut foo = "foo".to_owned();
let mut bar = "bar".to_owned();

swap(&mut foo, &mut bar);

assert_eq!(foo, "bar");
assert_eq!(bar, "foo");
```

## fn write_unaligned

```rust
pub const unsafe fn write_unaligned<T>(dst: *mut T, src: T)
```

Overwrites a memory location with the given value without reading or
dropping the old value.

Unlike [`write()`], the pointer may be unaligned.

`write_unaligned` does not drop the contents of `dst`. This is safe, but it
could leak allocations or resources, so care should be taken not to overwrite
an object that should be dropped.

Additionally, it does not drop `src`. Semantically, `src` is moved into the
location pointed to by `dst`.

This is appropriate for initializing uninitialized memory, or overwriting
memory that has previously been read with [`read_unaligned`].

# Safety

Behavior is undefined if any of the following conditions are violated:

* `dst` must be [valid] for writes.

[valid]: self#safety

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

```
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

```
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
  [`read`], except for the additional guarantee that it won't be elided or reordered across
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
  Here, any address value is possible, including 0 and [`usize::MAX`], so long as the semantics
  of such a read are well-defined by the target hardware. The provenance of the pointer is
  irrelevant, and it can be created with [`without_provenance`]. The access is allowed to trap,
  which must immediately abort the process. It can also cause other side-effects, but those
  must not affect Rust-allocated memory in any way. This access is still not considered
  [atomic], and as such it cannot be used for inter-thread synchronization.

Note that volatile memory operations where T is a zero-sized type are noops and may be ignored.

When invoked during const evaluation, this behaves like a regular read. In particular, such
reads must always follow the first of the two cases above.

[allocation]: crate::ptr#allocated-object
[atomic]: crate::sync::atomic#memory-model-for-atomic-accesses

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

Like [`read`], `read_volatile` creates a bitwise copy of `T`, regardless of whether `T` is
[`Copy`]. If `T` is not [`Copy`], using both the returned value and the value at `*src` can
[violate memory safety][read-ownership]. However, storing non-[`Copy`] types in volatile memory
is almost certainly incorrect.

Behavior is undefined if any of the following conditions are violated:

* `src` must be either [valid] for reads, or `T` must be a ZST, or `src` must point to memory
  outside of all Rust allocations and reading from that memory must not cause any memory inside
  a Rust allocation to be modified.

* `src` must be properly aligned.

* Reading from `src` must produce a properly initialized value of type `T`.

Note that even if `T` has size `0`, the pointer must be properly aligned.

[valid]: self#safety
[read-ownership]: read#ownership-of-the-returned-value

# Examples

Basic usage:

```
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
  [`write`][write()], except for the additional guarantee that it won't be elided or reordered
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
  Here, any address value is possible, including 0 and [`usize::MAX`], so long as the semantics
  of such a write are well-defined by the target hardware. The provenance of the pointer is
  irrelevant, and it can be created with [`without_provenance_mut`]. The access is allowed to
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

[allocation]: crate::ptr#allocated-object
[atomic]: crate::sync::atomic#memory-model-for-atomic-accesses

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

[valid]: self#safety

# Examples

Basic usage:

```
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

```
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

```
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
then this is the same as [`eq`].

# Examples

```
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

  ```
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

```
use std::ptr;

fn a() { println!("a"); }
fn b() { println!("b"); }
assert!(!ptr::fn_addr_eq(a as fn(), b as fn()));
```

[subtype]: https://doc.rust-lang.org/reference/subtyping.html

## fn hash

```rust
pub fn hash<T: PointeeSized, S: hash::Hasher>(hashee: *const T, into: &mut S)
```

Hash a raw pointer.

This can be used to hash a `&T` reference (which coerces to `*const T` implicitly)
by its address rather than the value it points to
(which is what the `Hash for &T` implementation does).

# Examples

```
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