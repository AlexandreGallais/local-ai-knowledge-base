---
title: "MemorySegment interface (java.lang.foreign) (part 2 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/MemorySegment.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MemorySegment interface (java.lang.foreign) (part 2 of 8)

In such circumstances, clients have two options. They can use a heap segment backed
by a different array type (e.g. `long[]`), capable of supporting greater maximum
alignment. More specifically, the maximum alignment associated with `long[]` is
set to `ValueLayout.JAVA_LONG.byteAlignment()`, which is 8 bytes:

Alternatively, they can invoke the access operation with an *unaligned layout*.
All unaligned layout constants (e.g. `ValueLayout.JAVA_INT_UNALIGNED`) have
their alignment constraint set to 1:

Clients can use the `MemorySegment.maxByteAlignment()` method to check if
a memory segment supports the alignment constraint of a memory layout, as follows:

#### Zero-length memory segments

When interacting with foreign functions, it is
common for those functions to allocate a region of memory and return a pointer to that
region. Modeling the region of memory with a memory segment is challenging because
the Java runtime has no insight into the size of the region. Only the address of the
start of the region, stored in the pointer, is available. For example, a C function
with return type `char*` might return a pointer to a region containing a single
`char` value, or to a region containing an array of `char` values, where
the size of the array might be provided in a separate parameter. The size of the
array is not readily apparent to the code calling the foreign function and hoping to
use its result. In addition to having no insight into the size of the region of
memory backing a pointer returned from a foreign function, it also has no insight
into the lifetime intended for said region of memory by the foreign function that
allocated it.

The `MemorySegment` API uses *zero-length memory segments* to represent:

- pointers returned from a foreign function;

- pointers passed by a foreign function
        to an upcall stub; and

- pointers read from a memory segment (more on that below).

The address of the zero-length segment is the address stored in the pointer.
The spatial and temporal bounds of the zero-length segment are as follows:

- The size of the segment is zero. Any attempt to access these segments will
    fail with `IndexOutOfBoundsException`. This is a crucial safety feature: as
    these segments are associated with a region of memory whose size is not known, any
    access operations involving these segments cannot be validated. In effect, a
    zero-length memory segment *wraps* an address, and it cannot be used
    without explicit intent (see below);

- The segment is associated with the global scope. Thus, while zero-length
    memory segments cannot be accessed directly, they can be passed, opaquely, to
    other pointer-accepting foreign functions.

To demonstrate how clients can work with zero-length memory segments, consider the
case of a client that wants to read a pointer from some memory segment. This can be
done via the long) access method. This
method accepts an address layout
(e.g. `ValueLayout.ADDRESS`), the layout of the pointer to be read. For instance,
on a 64-bit platform, the size of an address layout is 8 bytes. The access operation
also accepts an offset, expressed in bytes, which indicates the position (relative to
the start of the memory segment) at which the pointer is stored. The access operation
returns a zero-length native memory segment, backed by a region
of memory whose starting address is the 64-bit value read at the specified offset.

The returned zero-length memory segment cannot be accessed directly by the client:
since the size of the segment is zero, any access operation would result in
out-of-bounds access. Instead, the client must, *unsafely*, assign new spatial
bounds to the zero-length memory segment. This can be done via the
`reinterpret(long)` method, as follows:

In some cases, the client might additionally want to assign new temporal bounds to a
zero-length memory segment. This can be done via the
Arena, Consumer) method, which returns a new native segment
with the desired size and the same temporal bounds as those of the provided arena:

Alternatively, if the size of the region of memory backing the zero-length memory
segment is known statically, the client can overlay a
target layout on the address
layout used when reading a pointer. The target layout is then used to dynamically
*expand* the size of the native memory segment returned by the access operation
so that the size of the segment is the same as the size of the target layout . In other
words, the returned segment is no longer a zero-length memory segment, and the pointer
it represents can be dereferenced directly:

All the methods that can be used to manipulate zero-length memory segments
(`reinterpret(long)`, Consumer), Arena, Consumer) and
`AddressLayout.withTargetLayout(MemoryLayout)`) are
*restricted* methods, and should
be used with caution: assigning a segment incorrect spatial and/or temporal bounds
could result in a VM crash when attempting to access the memory segment.

**Implementation requirements:** Implementations of this interface are immutable, thread-safe and
value-based.

**Since:** 22

## MemorySegment.address()

```java
long address()
```

**API note:** When using this method to pass a segment address to some external
         operation (e.g. a JNI function), clients must ensure that the segment is
         kept reachable
         for the entire duration of the operation. A failure to do so might result
         in the premature deallocation of the region of memory backing the memory
         segment, in case the segment has been allocated with an
         automatic arena.

## MemorySegment.heapBase()

```java
Optional<Object> heapBase()
```

Returns the Java object stored in the on-heap region of memory backing this memory
segment, if any. For instance, if this memory segment is a heap segment created
with the `ofArray(byte[])` factory method, this method will return the
`byte[]` object which was used to obtain the segment. This method returns
an empty `Optional` value if either this segment is a
native segment, or if this segment is
read-only.

**Returns:** the Java object associated with this memory segment, if any

## MemorySegment.spliterator(MemoryLayout)

```java
Spliterator<MemorySegment> spliterator(MemoryLayout elementLayout)
```

Returns a spliterator for this memory segment. The returned spliterator reports
`Spliterator.SIZED`, `Spliterator.SUBSIZED`, `Spliterator.IMMUTABLE`,
`Spliterator.NONNULL` and `Spliterator.ORDERED` characteristics.

The returned spliterator splits this segment according to the specified element
layout; that is, if the supplied layout has size N, then calling
`Spliterator.trySplit()` will result in a spliterator serving approximately
`S/N` elements (depending on whether N is even or not), where `S` is
the size of this segment. As such, splitting is possible as long as
`S/N >= 2`. The spliterator returns segments that have the same lifetime as
that of this segment.

The returned spliterator effectively allows to slice this segment into disjoint
long) slices, which can then be processed in parallel
by multiple threads.

Parameters:

- `elementLayout`: the layout to be used for splitting

**Returns:** the element spliterator for this segment

Throws:

- `IllegalArgumentException`: if `elementLayout.byteSize() == 0`
- `IllegalArgumentException`: if `byteSize() % elementLayout.byteSize() != 0`
- `IllegalArgumentException`: if `elementLayout.byteSize() % elementLayout.byteAlignment() != 0`
- `IllegalArgumentException`: if this segment is incompatible with the alignment constraint in the provided layout.

## MemorySegment.elements(MemoryLayout)

```java
Stream<MemorySegment> elements(MemoryLayout elementLayout)
```

Returns a sequential `Stream` over disjoint slices (whose size matches that
of the specified layout) in this segment. Calling this method is equivalent to
the following code:

Parameters:

- `elementLayout`: the layout to be used for splitting

**Returns:** a sequential `Stream` over disjoint slices in this segment

Throws:

- `IllegalArgumentException`: if `elementLayout.byteSize() == 0`
- `IllegalArgumentException`: if `byteSize() % elementLayout.byteSize() != 0`
- `IllegalArgumentException`: if `elementLayout.byteSize() % elementLayout.byteAlignment() != 0`
- `IllegalArgumentException`: if this segment is incompatible with the alignment constraint in the provided layout

## MemorySegment.scope()

```java
Scope scope()
```

## MemorySegment.isAccessibleBy(Thread)

```java
boolean isAccessibleBy(Thread thread)
```

Parameters:

- `thread`: the thread to be tested

## MemorySegment.byteSize()

```java
long byteSize()
```

## MemorySegment.maxByteAlignment()

```java
long maxByteAlignment()
```

The returned alignment is always a power of two and is derived from
the segment address() and, if it is a heap segment,
the type of the backing heap storage.

This method can be used to ensure that a segment is sufficiently aligned
with a layout:

**Since:** 23

## MemorySegment.asSlice(long, long)

```java
MemorySegment asSlice(long offset, long newSize)
```

Returns a slice of this memory segment, at the given offset. The returned
segment's address is the address of this segment plus the given offset;
its size is specified by the given argument.

Equivalent to the following code:

If this segment is read-only,
the returned segment is also read-only.

The returned memory segment shares a region of backing memory with this segment.
Hence, no memory will be allocated or freed by this method.

Parameters:

- `offset`: The new segment base offset (relative to the address of this segment), specified in bytes
- `newSize`: The new segment size, specified in bytes

**See also:** #asSlice(long, long, long)

**Returns:** a slice of this memory segment

Throws:

- `IndexOutOfBoundsException`: if `offset < 0`, `offset > byteSize()`, `newSize < 0`, or `newSize > byteSize() - offset`

## MemorySegment.asSlice(long, long, long)

```java
MemorySegment asSlice(long offset, long newSize, long byteAlignment)
```

Returns a slice of this memory segment, at the given offset, with the provided
alignment constraint. The returned segment's address is the address of this
segment plus the given offset; its size is specified by the given argument.

If this segment is read-only,
the returned segment is also read-only.

The returned memory segment shares a region of backing memory with this segment.
Hence, no memory will be allocated or freed by this method.

Parameters:

- `offset`: The new segment base offset (relative to the address of this segment), specified in bytes
- `newSize`: The new segment size, specified in bytes
- `byteAlignment`: The alignment constraint (in bytes) of the returned slice

**Returns:** a slice of this memory segment

Throws:

- `IndexOutOfBoundsException`: if `offset < 0`, `offset > byteSize()`, `newSize < 0`, or `newSize > byteSize() - offset`
- `IllegalArgumentException`: if this segment cannot be accessed at `offset` under the provided alignment constraint
- `IllegalArgumentException`: if `byteAlignment <= 0`, or if `byteAlignment` is not a power of 2

## MemorySegment.asSlice(long, MemoryLayout)

```java
MemorySegment asSlice(long offset, MemoryLayout layout)
```

Returns a slice of this memory segment with the given layout, at the given offset.
The returned segment's address is the address of this segment plus the given
offset; its size is the same as the size of the provided layout.

Equivalent to the following code:

If this segment is read-only,
the returned segment is also read-only.

The returned memory segment shares a region of backing memory with this segment.
Hence, no memory will be allocated or freed by this method.

Parameters:

- `offset`: The new segment base offset (relative to the address of this segment), specified in bytes
- `layout`: The layout of the segment slice

**See also:** #asSlice(long, long, long)

**Returns:** a slice of this memory segment

Throws:

- `IndexOutOfBoundsException`: if `offset < 0`, `offset > byteSize()`, or `layout.byteSize() > byteSize() - offset`
- `IllegalArgumentException`: if this segment cannot be accessed at `offset` under the alignment constraint specified by `layout`

## MemorySegment.asSlice(long)

```java
MemorySegment asSlice(long offset)
```

Returns a slice of this memory segment, at the given offset. The returned
segment's address is the address of this segment plus the given offset; its size
is computed by subtracting the specified offset from this segment size.

Equivalent to the following code:

If this segment is read-only,
the returned segment is also read-only.

The returned memory segment shares a region of backing memory with this segment.
Hence, no memory will be allocated or freed by this method.

Parameters:

- `offset`: The new segment base offset (relative to the address of this segment), specified in bytes

**See also:** #asSlice(long, long)

**Returns:** a slice of this memory segment

Throws:

- `IndexOutOfBoundsException`: if `offset < 0`, or `offset > byteSize()`

## MemorySegment.reinterpret(long)

```java
MemorySegment reinterpret(long newSize)
```

Returns a new memory segment that has the same address and scope as this segment,
but with the provided size.

If this segment is read-only,
the returned segment is also read-only.

The returned memory segment shares a region of backing memory with this segment.
Hence, no memory will be allocated or freed by this method.

Parameters:

- `newSize`: the size of the returned segment

**Returns:** a new memory segment that has the same address and scope as
        this segment, but the new provided size

Throws:

- `IllegalArgumentException`: if `newSize < 0`
- `UnsupportedOperationException`: if this segment is not a native segment
- `IllegalCallerException`: if the caller is in a module that does not have native access enabled
