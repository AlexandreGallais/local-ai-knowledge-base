---
title: "MemorySegment interface (java.lang.foreign) (part 1 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/MemorySegment.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MemorySegment interface (java.lang.foreign)

```java
public sealed interface MemorySegment permits AbstractMemorySegmentImpl
```

A memory segment provides access to a contiguous region of memory.

There are two kinds of memory segments:

- A *heap segment* is backed by, and provides access to, a region of
    memory inside the Java heap (an "on-heap" region).

- A *native segment* is backed by, and provides access to, a region of
    memory outside the Java heap (an "off-heap" region).

Heap segments can be obtained by calling one of the `MemorySegment.ofArray(int[])`
factory methods. These methods return a memory segment backed by the on-heap region
that holds the specified Java array.

Native segments can be obtained by calling one of the long)
factory methods, which return a memory segment backed by a newly allocated off-heap
region with the given size and aligned to the given alignment constraint.
Alternatively, native segments can be obtained by
long, long, Arena) mapping a file into a new off-heap
region (in some systems, this operation is sometimes referred to as `mmap`).
Segments obtained in this way are called *mapped* segments, and their contents
can be persisted and loaded to and from the
underlying memory-mapped file.

Both kinds of segments are read and written using the same methods, known as
access operations. An access operation on a memory
segment always and only provides access to the region for which the segment was
obtained.

#### Characteristics of memory segments

Every memory segment has an address, expressed as a
`long` value. The nature of a segment's address depends on the kind of the
segment:

- The address of a heap segment is not a physical address, but rather an offset
within the region of memory which backs the segment. The region is inside the Java
heap, so garbage collection might cause the region to be relocated in physical memory
over time, but this is not exposed to clients of the `MemorySegment` API who
see a stable *virtualized* address for a heap segment backed by the region.
A heap segment obtained from one of the `ofArray(int[])` factory methods has
an address of zero.

- The address of a native segment (including mapped segments) denotes the physical
address of the region of memory which backs the segment.

Every memory segment has a maximum byte alignment,
expressed as a `long` value. The maximum alignment is always a power of two,
derived from the segment address, and the segment type, as explained in more detail
below.

Every memory segment has a size. The size of a heap segment
is derived from the Java array from which it is obtained. This size is predictable
across Java runtimes. The size of a native segment is either passed explicitly
(as in long)) or derived from a `MemoryLayout`
(as in `Arena.allocate(MemoryLayout)`). The size of a memory segment is typically
a positive number but may be zero, but never negative.

The address and size of a memory segment jointly ensure that access operations on the
segment cannot fall *outside* the boundaries of the region of memory that backs
the segment. That is, a memory segment has *spatial bounds*.

Every memory segment is associated with a scope. This ensures that
access operations on a memory segment cannot occur when the region of memory that
backs the memory segment is no longer available (e.g., after the scope associated
with the accessed memory segment is no longer alive).
That is, a memory segment has *temporal bounds*.

Finally, access operations on a memory segment can be subject to additional
thread-confinement checks. Heap segments can be accessed from any thread.
Conversely, native segments can only be accessed compatibly with the
confinement characteristics of the arena
used to obtain them.

#### Accessing memory segments

A memory segment can be read or written using various access operations provided in
this class (e.g. long)). Each access operation takes
a value layout, which specifies the size and shape of the
value, and an offset, expressed in bytes. For instance, to read an `int` from
a segment, using default endianness, the
following code can be used:

If the value to be read is stored in memory using big-endian
encoding, the access operation can be expressed as follows:

Access operations on memory segments are implemented using var handles. The
`ValueLayout.varHandle()` method can be used to obtain a var handle that can be
used to get/set values represented by the given value layout on a memory segment at
the given offset:

Alternatively, a var handle that can be used to access an element of an `int`
array at a given logical index can be created as follows:

Clients can also drop the base offset parameter, in order to make the access
expression simpler. This can be used to implement access operations such as
long):

Var handles for more complex access expressions (e.g. struct field access, pointer
dereference) can be created directly from memory layouts, using
*layout paths*.

#### Slicing memory segments

Memory segments support long) slicing.
Slicing a memory segment returns a new memory segment that is backed by the same
region of memory as the original. The address of the sliced segment is derived from
the address of the original segment, by adding an offset (expressed in bytes). The
size of the sliced segment is either derived implicitly (by subtracting the specified
offset from the size of the original segment), or provided explicitly. In other words,
a sliced segment has *stricter* spatial bounds than those of the original
segment:

The above code creates a native segment that is 100 bytes long; then, it creates a
slice that starts at offset 50 of `segment`, and is 10 bytes long. That is, the
address of the `slice` is `segment.address() + 50`, and its size is 10.
As a result, attempting to read an int value at offset 20 of the `slice` segment
will result in an exception. The temporal bounds of the original
segment is inherited by its slices; that is, when the scope associated with
`segment` is no longer alive, `slice` will
also become inaccessible.

A client might obtain a `Stream` from a segment, which can then be used to slice
the segment (according to a given element layout) and even allow multiple threads to
work in parallel on disjoint segment slices (to do this, the segment has to be
accessible from multiple threads).
The following code can be used to sum all int values in a memory segment in parallel:

#### Alignment

Access operations on a memory segment are constrained not only by the spatial and
temporal bounds of the segment, but also by the *alignment constraint* of the
value layout specified to the operation. An access operation can access only those
offsets in the segment that denote addresses in physical memory that are
*aligned* according to the layout. An address in physical memory is
*aligned* according to a layout if the address is an integer multiple of
the layout's alignment constraint. For example, the address 1000 is aligned according
to an 8-byte alignment constraint (because 1000 is an integer multiple of 8), and to
a 4-byte alignment constraint, and to a 2-byte alignment constraint; in contrast,
the address 1004 is aligned according to a 4-byte alignment constraint, and to
a 2-byte alignment constraint, but not to an 8-byte alignment constraint.
Access operations are required to respect alignment because it can impact
the performance of access operations, and can also determine which access operations
are available at a given physical address. For instance,
atomic access operations
operations using `java.lang.invoke.VarHandle` are only permitted at aligned
addresses. In addition, alignment applies to an access operation whether the segment
being accessed is a native segment or a heap segment.

If the segment being accessed is a native segment, then its
address in physical memory can be combined with the offset to
obtain the *target address* in physical memory. The pseudo-function below
demonstrates this:

For example:

- A native segment with address 1000 can be accessed at offsets 0, 8, 16, 24, etc
    under an 8-byte alignment constraint, because the target addresses
    (1000, 1008, 1016, 1024) are 8-byte aligned.
    Access at offsets 1-7 or 9-15 or 17-23 is disallowed because the target addresses
    would not be 8-byte aligned.

- A native segment with address 1000 can be accessed at offsets 0, 4, 8, 12, etc
    under a 4-byte alignment constraint, because the target addresses
    (1000, 1004, 1008, 1012) are 4-byte aligned.
    Access at offsets 1-3 or 5-7 or 9-11 is disallowed because the target addresses
    would not be 4-byte aligned.

- A native segment with address 1000 can be accessed at offsets 0, 2, 4, 6, etc
    under a 2-byte alignment constraint, because the target addresses
    (1000, 1002, 1004, 1006) are 2-byte aligned.
    Access at offsets 1 or 3 or 5 is disallowed because the target addresses would
    not be 2-byte aligned.

- A native segment with address 1004 can be accessed at offsets 0, 4, 8, 12, etc
    under a 4-byte alignment constraint, and at offsets 0, 2, 4, 6, etc
    under a 2-byte alignment constraint. Under an 8-byte alignment constraint,
    it can be accessed at offsets 4, 12, 20, 28, etc.

- A native segment with address 1006 can be accessed at offsets 0, 2, 4, 6, etc
    under a 2-byte alignment constraint.
    Under a 4-byte alignment constraint, it can be accessed at offsets 2, 6, 10, 14, etc.
    Under an 8-byte alignment constraint, it can be accessed at offsets 2, 10, 18, 26, etc.

- A native segment with address 1007 can be accessed at offsets 0, 1, 2, 3, etc
    under a 1-byte alignment constraint.
    Under a 2-byte alignment constraint, it can be accessed at offsets 1, 3, 5, 7, etc.
    Under a 4-byte alignment constraint, it can be accessed at offsets 1, 5, 9, 13, etc.
    Under an 8-byte alignment constraint, it can be accessed at offsets 1, 9, 17, 25, etc.

The alignment constraint used to access a segment is typically dictated by the shape
of the data structure stored in the segment. For example, if the programmer wishes to
store a sequence of 8-byte values in a native segment, then the segment should be
allocated by specifying an 8-byte alignment constraint, either via
long) or `Arena.allocate(MemoryLayout)`. These
factories ensure that the off-heap region of memory backing the returned segment
has a starting address that is 8-byte aligned. Subsequently, the programmer can access
the segment at the offsets of interest -- 0, 8, 16, 24, etc -- in the knowledge that
every such access is aligned.

If the segment being accessed is a heap segment, then determining whether access is
aligned is more complex. The address of the segment in physical memory is not known
and is not even fixed (it may change when the segment is relocated during garbage
collection). This means that the address cannot be combined with the specified offset
to determine a target address in physical memory. Since the alignment constraint
*always* refers to alignment of addresses in physical memory, it is not
possible in principle to determine if any offset in a heap segment is aligned.
For example, suppose the programmer chooses an 8-byte alignment constraint and tries
to access offset 16 in a heap segment. If the heap segment's address 0 corresponds to
physical address 1000, then the target address (1016) would be aligned, but if
address 0 corresponds to physical address 1004, then the target address (1020) would
not be aligned. It is undesirable to allow access to target addresses that are
aligned according to the programmer's chosen alignment constraint, but might not be
predictably aligned in physical memory (e.g. because of platform considerations
and/or garbage collection behavior).

In practice, the Java runtime lays out arrays in memory so that each n-byte element
occurs at an n-byte aligned physical address. The
runtime preserves this invariant even if the array is relocated during garbage
collection. Access operations rely on this invariant to determine if the specified
offset in a heap segment refers to an aligned address in physical memory.
For example:

- The starting physical address of a `short[]` array will be 2-byte aligned
    (e.g. 1006) so that successive short elements occur at 2-byte aligned addresses
    (e.g. 1006, 1008, 1010, 1012, etc). A heap segment backed by a `short[]`
    array can be accessed at offsets 0, 2, 4, 6, etc under a 2-byte alignment
    constraint. The segment cannot be accessed at *any* offset under a 4-byte
    alignment constraint, because there is no guarantee that the target address would
    be 4-byte aligned, e.g., offset 0 would correspond to physical address 1006 while
    offset 1 would correspond to physical address 1007. Similarly, the segment cannot
    be accessed at any offset under an 8-byte alignment constraint, because there is
    no guarantee that the target address would be 8-byte aligned, e.g., offset 2
    would correspond to physical address 1008 but offset 4 would correspond to
    physical address 1010.

- The starting physical address of a `long[]` array will be 8-byte aligned
    (e.g. 1000), so that successive long elements occur at 8-byte aligned addresses
    (e.g., 1000, 1008, 1016, 1024, etc.) A heap segment backed by a `long[]`
    array can be accessed at offsets 0, 8, 16, 24, etc under an 8-byte alignment
    constraint. In addition, the segment can be accessed at offsets 0, 4, 8, 12,
    etc under a 4-byte alignment constraint, because the target addresses (1000, 1004,
    1008, 1012) are 4-byte aligned. And, the segment can be accessed at offsets 0, 2,
    4, 6, etc under a 2-byte alignment constraint, because the target addresses (e.g.
    1000, 1002, 1004, 1006) are 2-byte aligned.

In other words, heap segments feature a *maximum*
alignment which is derived from the size of the elements of the Java array backing the
segment, as shown in the following table:

Maximum alignment of heap segments

    Array type (of backing region)
    Maximum supported alignment (in bytes)

`boolean[]`
    `ValueLayout.JAVA_BOOLEAN.byteAlignment()`
`byte[]`
    `ValueLayout.JAVA_BYTE.byteAlignment()`
`char[]`
    `ValueLayout.JAVA_CHAR.byteAlignment()`
`short[]`
    `ValueLayout.JAVA_SHORT.byteAlignment()`
`int[]`
    `ValueLayout.JAVA_INT.byteAlignment()`
`float[]`
    `ValueLayout.JAVA_FLOAT.byteAlignment()`
`long[]`
    `ValueLayout.JAVA_LONG.byteAlignment()`
`double[]`
    `ValueLayout.JAVA_DOUBLE.byteAlignment()`

Heap segments can only be accessed using a layout whose alignment is smaller or equal
to the maximum alignment associated with the heap segment. Attempting to access a
heap segment using a layout whose alignment is greater than the maximum alignment
associated with the heap segment will fail, as demonstrated in the following example:
