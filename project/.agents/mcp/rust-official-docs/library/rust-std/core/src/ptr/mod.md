---
title: "core::ptr (part 1 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ptr/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ptr

Manually manage memory through raw pointers.

*See also the pointer primitive types.*

#### Safety

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
* For memory accesses of size zero, *every* non-null pointer is valid for reads/writes.
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

These axioms, along with careful use of `offset` for pointer arithmetic,
are enough to correctly implement many useful things in unsafe code. Stronger guarantees
will be provided eventually, as the [aliasing] rules are being determined. For more
information, see the [book] as well as the section in the reference devoted
to undefined behavior.

Note that some operations such as `read` and `write``write()` do allow null pointers if
the total size of the access is zero. However, other operations internally convert pointers into
references. Therefore, the general notion of "valid for reads/writes" excludes null pointers,
and the specific operations that permit null pointers mention that as an exception. Furthermore,
`read_volatile` and `write_volatile` can be used in even more situations; see their
documentation for details.

We say that a pointer is "dangling" if it is not valid for any non-zero-sized accesses. This
means out-of-bounds pointers, pointers to freed memory, null pointers, and pointers created with
`NonNull::dangling` are all dangling.

#### Alignment

Valid raw pointers as defined above are not necessarily properly aligned (where
"proper" alignment is defined by the pointee type, i.e., `*const T` must be
aligned to `align_of::<T>()`). However, most functions require their
arguments to be properly aligned, and will explicitly state
this requirement in their documentation. Notable exceptions to this are
`read_unaligned` and `write_unaligned`.

When a function requires proper alignment, it does so even if the access
has size 0, i.e., even if memory is not actually touched. Consider using
`NonNull::dangling` in such cases.

#### Pointer to reference conversion

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

#### Allocation

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
for read-only allocations either (see here for exceptions).
Additionally, some target-specific intrinsics are not supported on read-only
allocations even if their memory write is masked off, such as `_mm_maskmoveu_si128`.

Allocations must behave like "normal" memory: in particular, reads must not have
side-effects, and writes must become visible to other threads using the usual synchronization
primitives.
Allocations must support all atomic operations that are available for the target (as
determined by the `target_has_atomic*` set of cfg flags).
Read-only allocations only have to support the operations permitted there.
The precise instructions used for atomic operations are generally not guaranteed, so portable
software should place all Rust allocations in memory regions that support all atomic
instructions.

For any allocation with `base` address, `size`, and a set of
`addresses`, the following are guaranteed:
- For all addresses `a` in `addresses`, `a` is in the range `base .. (base +
  size)` (note that this requires `a < base + size`, not `a <= base + size`)
- `base` is not equal to `null()` (i.e., the address with the numerical
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

#### Provenance

Pointers are not *simply* an "integer" or "address". For instance, it's uncontroversial
to say that a Use After Free is clearly Undefined Behavior, even if you "get lucky"
and the freed memory gets reallocated before your read/write (in fact this is the
worst-case scenario, UAFs would be much less concerning if this didn't happen!).
As another example, consider that `wrapping_offset` is documented to "remember"
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
pointers transitively derived from the Original Pointer through operations like `offset`,
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
and never permits writes, except inside `UnsafeCell`.

Provenance can affect whether a program has undefined behavior:

* It is undefined behavior to access memory through a pointer that does not have provenance over
  that memory. Note that a pointer "at the end" of its provenance is not actually outside its
  provenance, it just has 0 bytes it can load/store. Zero-sized accesses do not require any
  provenance since they access an empty range of memory.

* It is undefined behavior to `offset` a pointer across a memory range that is not contained
  in the allocation it is derived from, or to `offset_from` two pointers not derived
  from the same allocation. Provenance is used to say what exactly "derived from" even
  means: the lineage of a pointer is traced back to the Original Pointer it descends from, and
  that identifies the relevant allocation. In particular, it's always UB to offset a
  pointer derived from something that is now deallocated, except if the offset is 0.

But it *is* still sound to:

* Create a pointer without provenance from just an address (see `without_provenance`). Such a
  pointer cannot be used for memory accesses (except for zero-sized accesses). This can still be
  useful for sentinel values like `null` *or* to represent a tagged pointer that will never be
  dereferenceable. In general, it is always sound for an integer to pretend to be a pointer "for
  fun" as long as you don't use operations on it which require it to be valid (non-zero-sized
  offset, read, write, etc).

* Forge an allocation of size zero at any sufficiently aligned non-null address.
  i.e. the usual "ZSTs are fake, do what you want" rules apply.

* `wrapping_offset` a pointer outside its provenance. This includes pointers
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

#### Pointers Vs Integers

From this discussion, it becomes very clear that a `usize` *cannot* accurately represent a pointer,
and converting from a pointer to a `usize` is generally an operation which *only* extracts the
address. Converting this address back into pointer requires somehow answering the question:
which provenance should the resulting pointer have?

Rust provides two ways of dealing with this situation: *Strict Provenance* and *Exposed Provenance*.
