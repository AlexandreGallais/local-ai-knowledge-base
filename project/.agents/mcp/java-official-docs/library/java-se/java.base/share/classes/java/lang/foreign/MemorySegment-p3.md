---
title: "MemorySegment interface (java.lang.foreign) (part 3 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/MemorySegment.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MemorySegment interface (java.lang.foreign) (part 3 of 8)

## MemorySegment.reinterpret(Arena, Consumer<MemorySegment>)

```java
MemorySegment reinterpret(Arena arena, Consumer<MemorySegment> cleanup)
```

Returns a new memory segment with the same address and size as this segment, but
with the provided arena's scope. As such, the returned segment cannot be accessed
after the provided arena has been closed. Moreover, the returned segment can be
accessed compatibly with the confinement restrictions associated with the provided
arena: that is, if the provided arena is a confined arena,
the returned segment can only be accessed by the arena's owner thread, regardless
of the confinement restrictions associated with this segment. In other words, this
method returns a segment that can be used as any other segment allocated using the
provided arena. However, the returned segment is backed by the same memory region
as that of the original segment. As such, the region of memory backing the
returned segment is deallocated only when this segment's arena is closed.
This might lead to *use-after-free* issues, as the returned segment can be
accessed *after* its region of memory has been deallocated via this
segment's arena.

Clients can specify an optional cleanup action that should be executed when the
provided arena's scope becomes invalid. This cleanup action receives a fresh memory
segment that is obtained from this segment as follows:

That is, the cleanup action receives a segment that is associated with the global
arena's scope, and is accessible from any thread. The size of the segment accepted
by the cleanup action is `byteSize()`.

If this segment is read-only,
the returned segment is also read-only.

The returned memory segment shares a region of backing memory with this segment.
Hence, no memory will be allocated or freed by this method.

Parameters:

- `arena`: the arena to be associated with the returned segment
- `cleanup`: the cleanup action that should be executed when the provided arena is closed (can be `null`)

**API note:** The cleanup action (if present) should take care not to leak the received
         segment to external clients that might access the segment after its
         backing region of memory is no longer available. Furthermore, if the
         provided arena is an automatic arena,
         the cleanup action must not prevent the arena from becoming
         unreachable.
         A failure to do so will permanently prevent the regions of memory
         allocated by the automatic arena from being deallocated.

**Returns:** a new memory segment with unbounded size

Throws:

- `IllegalStateException`: if `arena.scope().isAlive() == false`
- `UnsupportedOperationException`: if this segment is not a native segment
- `IllegalCallerException`: if the caller is in a module that does not have native access enabled

## MemorySegment.reinterpret(long, Arena, Consumer<MemorySegment>)

```java
MemorySegment reinterpret(long newSize, Arena arena, Consumer<MemorySegment> cleanup)
```

Returns a new segment with the same address as this segment, but with the provided
size and the provided arena's scope. As such, the returned segment cannot be
accessed after the provided arena has been closed. Moreover, if the returned
segment can be accessed compatibly with the confinement restrictions associated
with the provided arena: that is, if the provided arena is a confined arena,
the returned segment can only be accessed by the arena's owner thread, regardless
of the confinement restrictions associated with this segment. In other words, this
method returns a segment that can be used as any other segment allocated using the
provided arena. However, the returned segment is backed by the same memory region
as that of the original segment. As such, the region of memory backing the
returned segment is deallocated only when this segment's arena is closed.
This might lead to *use-after-free* issues, as the returned segment can be
accessed *after* its region of memory has been deallocated via this
segment's arena.

Clients can specify an optional cleanup action that should be executed when the
provided arena's scope becomes invalid. This cleanup action receives a fresh memory
segment that is obtained from this segment as follows:

That is, the cleanup action receives a segment that is associated with the global
arena's scope, and is accessible from any thread. The size of the segment accepted
by the cleanup action is `newSize`.

If this segment is read-only,
the returned segment is also read-only.

The returned memory segment shares a region of backing memory with this segment.
Hence, no memory will be allocated or freed by this method.

Parameters:

- `newSize`: the size of the returned segment
- `arena`: the arena to be associated with the returned segment
- `cleanup`: the cleanup action that should be executed when the provided arena is closed (can be `null`).

**API note:** The cleanup action (if present) should take care not to leak the received
         segment to external clients that might access the segment after its
         backing region of memory is no longer available. Furthermore, if the
         provided arena is an automatic arena,
         the cleanup action must not prevent the arena from becoming
         unreachable.
         A failure to do so will permanently prevent the regions of memory
         allocated by the automatic arena from being deallocated.

**Returns:** a new segment that has the same address as this segment, but with the new
        size and its scope set to that of the provided arena.

Throws:

- `UnsupportedOperationException`: if this segment is not a native segment
- `IllegalArgumentException`: if `newSize < 0`
- `IllegalStateException`: if `arena.scope().isAlive() == false`
- `IllegalCallerException`: if the caller is in a module that does not have native access enabled

## MemorySegment.isReadOnly()

```java
boolean isReadOnly()
```

**See also:** #asReadOnly()

## MemorySegment.asReadOnly()

```java
MemorySegment asReadOnly()
```

The resulting segment will be identical to this one, but attempts to overwrite the
contents of the returned segment will cause runtime exceptions.

**See also:** #isReadOnly()

## MemorySegment.isNative()

```java
boolean isNative()
```

A native segment is created e.g. using the long)
(and related) factory, or by wrapping a
direct buffer.

## MemorySegment.isMapped()

```java
boolean isMapped()
```

A mapped memory segment is created e.g. using the
long, long, Arena) factory, or by
wrapping a
mapped byte buffer.

## MemorySegment.asOverlappingSlice(MemorySegment)

```java
Optional<MemorySegment> asOverlappingSlice(MemorySegment other)
```

Returns a slice of this segment that is the overlap between this and the provided
segment.

Two segments `S1` and `S2` are said to overlap if it is possible to
find at least two slices `L1` (from `S1`) and `L2`
(from `S2`) that are backed by the same region of memory. As such, it is
not possible for a native segment to overlap with a heap
segment; in this case, or when no overlap occurs, an empty `Optional` is
returned.

Parameters:

- `other`: the segment to test for an overlap with this segment

**Returns:** a slice of this segment (where overlapping occurs)

## MemorySegment.fill(byte)

```java
MemorySegment fill(byte value)
```

Fills the contents of this memory segment with the given value.

More specifically, the given value is written into each address of this
segment. Equivalent to (but likely more efficient than) the following code:

But without any regard or guarantees on the ordering of particular memory
elements being set.

This method can be useful to initialize or reset the contents of a memory segment.

Parameters:

- `value`: the value to write into this segment

**Returns:** this memory segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.copyFrom(MemorySegment)

```java
MemorySegment copyFrom(MemorySegment src)
```

Performs a bulk copy from the given source segment to this segment. More specifically,
the bytes at offset `0` through `src.byteSize() - 1` in the source
segment are copied into this segment at offset `0` through
`src.byteSize() - 1`.

Calling this method is equivalent to the following code:

Parameters:

- `src`: the source segment

**Returns:** this segment

Throws:

- `IndexOutOfBoundsException`: if `src.byteSize() > this.byteSize()`
- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalStateException`: if the scope associated with `src` is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `src.isAccessibleBy(T) == false`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.mismatch(MemorySegment)

```java
long mismatch(MemorySegment other)
```

Finds and returns the offset, in bytes, of the first mismatch between
this segment and the given other segment. The offset is relative to the
address of each segment and will be in the
range of 0 (inclusive) up to the size (in bytes) of
the smaller memory segment (exclusive).

If the two segments share a common prefix then the returned offset is
the length of the common prefix, and it follows that there is a mismatch
between the two segments at that offset within the respective segments.
If one segment is a proper prefix of the other, then the returned offset is
the smallest of the segment sizes, and it follows that the offset is only
valid for the larger segment. Otherwise, there is no mismatch and `-1` is returned.

Parameters:

- `other`: the segment to be tested for a mismatch with this segment

**Returns:** the relative offset, in bytes, of the first mismatch between this
and the given other segment, otherwise -1 if no mismatch

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalStateException`: if the scope associated with `other` is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `other.isAccessibleBy(T) == false`

## MemorySegment.isLoaded()

```java
boolean isLoaded()
```

Determines whether all the contents of this mapped segment are resident in physical
memory.

 A return value of `true` implies that it is highly likely
that all the data in this segment is resident in physical memory and
may therefore be accessed without incurring any virtual-memory page
faults or I/O operations. A return value of `false` does not
necessarily imply that this segment's contents are not resident in physical
memory.

 The returned value is a hint, rather than a guarantee, because the
underlying operating system may have paged out some of this segment's data
by the time that an invocation of this method returns.

**Returns:** `true` if it is likely that the contents of this segment
         are resident in physical memory

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `UnsupportedOperationException`: if this segment is not a mapped memory segment, e.g. if `isMapped() == false`

## MemorySegment.load()

```java
void load()
```

Loads the contents of this mapped segment into physical memory.

This method makes a best effort to ensure that, when it returns,
the contents of this segment are resident in physical memory.  Invoking this
method may cause some number of page faults and I/O operations to
occur.

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `UnsupportedOperationException`: if this segment is not a mapped memory segment, e.g. if `isMapped() == false`

## MemorySegment.unload()

```java
void unload()
```

Unloads the contents of this mapped segment from physical memory.

This method makes a best effort to ensure that the contents of this segment
are no longer resident in physical memory. Accessing this segment's contents
after invoking this method may cause some number of page faults and I/O operations
to occur (as this segment's contents might need to be paged back in).

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `UnsupportedOperationException`: if this segment is not a mapped memory segment, e.g. if `isMapped() == false`

## MemorySegment.force()

```java
void force()
```

Forces any changes made to the contents of this mapped segment to be written to
the storage device described by the mapped segment's file descriptor.

If the file descriptor associated with this mapped segment resides on a local
storage device then when this method returns it is guaranteed that all changes
made to this segment since it was created, or since this method was last invoked,
will have been written to that device.

If the file descriptor associated with this mapped segment does not reside on
a local device then no such guarantee is made.

If this segment was not mapped in read/write mode
(`java.nio.channels.FileChannel.MapMode.READ_WRITE`) then invoking this
method may have no effect. In particular, the method has no effect for segments
mapped in read-only or private mapping modes. This method may or may not have an
effect for implementation-specific mapping modes.

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `UnsupportedOperationException`: if this segment is not a mapped memory segment, e.g. if `isMapped() == false`
- `UncheckedIOException`: if there is an I/O error writing the contents of this segment to the associated storage device
