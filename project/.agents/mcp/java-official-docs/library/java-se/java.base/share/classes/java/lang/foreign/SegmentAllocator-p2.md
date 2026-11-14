---
title: "SegmentAllocator interface (java.lang.foreign) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/SegmentAllocator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SegmentAllocator interface (java.lang.foreign) (part 2 of 2)

## SegmentAllocator.allocateFrom(ValueLayout.OfLong, long...)

```java
default MemorySegment allocateFrom(ValueLayout.OfLong elementLayout, long... elements)
```

The size of the allocated memory segment is
`elementLayout.byteSize() * elements.length`. The contents of
the source array is copied into the result segment element by element, according
to the byte order and alignment constraint of the given element layout.

Parameters:

- `elementLayout`: the element layout of the array to be allocated
- `elements`: the long elements to be copied to the newly allocated memory block

**Implementation requirements:** The default implementation for this method is equivalent to the
          following code:

Throws:

- `IllegalArgumentException`: if `elementLayout.byteAlignment() > elementLayout.byteSize()`

## SegmentAllocator.allocateFrom(ValueLayout.OfDouble, double...)

```java
default MemorySegment allocateFrom(ValueLayout.OfDouble elementLayout, double... elements)
```

The size of the allocated memory segment is
`elementLayout.byteSize() * elements.length`. The contents of
the source array is copied into the result segment element by element, according
to the byte order and alignment constraint of the given element layout.

Parameters:

- `elementLayout`: the element layout of the array to be allocated
- `elements`: the double elements to be copied to the newly allocated memory block

**Implementation requirements:** The default implementation for this method is equivalent to the
          following code:

Throws:

- `IllegalArgumentException`: if `elementLayout.byteAlignment() > elementLayout.byteSize()`

## SegmentAllocator.allocate(MemoryLayout)

```java
default MemorySegment allocate(MemoryLayout layout)
```

Parameters:

- `layout`: the layout of the block of memory to be allocated

**Implementation requirements:** The default implementation for this method calls
          `this.allocate(layout.byteSize(), layout.byteAlignment())`.

## SegmentAllocator.allocate(MemoryLayout, long)

```java
default MemorySegment allocate(MemoryLayout elementLayout, long count)
```

Parameters:

- `elementLayout`: the array element layout
- `count`: the array element count

**Implementation requirements:** The default implementation for this method calls
          `this.allocate(MemoryLayout.sequenceLayout(count, elementLayout))`.

Throws:

- `IllegalArgumentException`: if `elementLayout.byteSize() * count` overflows
- `IllegalArgumentException`: if `count < 0`

## SegmentAllocator.allocate(long)

```java
default MemorySegment allocate(long byteSize)
```

Parameters:

- `byteSize`: the size (in bytes) of the block of memory to be allocated

**Implementation requirements:** The default implementation for this method calls
          `this.allocate(byteSize, 1)`.

Throws:

- `IllegalArgumentException`: if `byteSize < 0`

## SegmentAllocator.allocate(long, long)

```java
MemorySegment allocate(long byteSize, long byteAlignment)
```

Parameters:

- `byteSize`: the size (in bytes) of the block of memory to be allocated
- `byteAlignment`: the alignment (in bytes) of the block of memory to be allocated

Throws:

- `IllegalArgumentException`: if `byteSize < 0`, `byteAlignment <= 0`, or if `byteAlignment` is not a power of 2

## SegmentAllocator.slicingAllocator(MemorySegment)

```java
static SegmentAllocator slicingAllocator(MemorySegment segment)
```

Returns a segment allocator that responds to allocation requests by returning
consecutive slices obtained from the provided segment. Each new allocation
request will return a new slice starting at the current offset (modulo additional
padding to satisfy alignment constraint), with given size.

The returned allocator throws `IndexOutOfBoundsException` when a slice of
the provided segment with the requested size and alignment cannot be found.

Parameters:

- `segment`: the segment from which the returned allocator should slice from

**Implementation note:** A slicing allocator is not *thread-safe*.

**Returns:** a new slicing allocator

Throws:

- `IllegalArgumentException`: if the `segment` is read-only

## SegmentAllocator.prefixAllocator(MemorySegment)

```java
static SegmentAllocator prefixAllocator(MemorySegment segment)
```

Returns a segment allocator that responds to allocation requests by recycling a
single segment. Each new allocation request will return a new slice starting at
the segment offset `0`, hence the name *prefix allocator*.

Equivalent to (but likely more efficient than) the following code:

The returned allocator throws `IndexOutOfBoundsException` when a slice of
the provided segment with the requested size and alignment cannot be found.

Parameters:

- `segment`: the memory segment to be recycled by the returned allocator

**API note:** A prefix allocator can be useful to limit allocation requests in case a
         client knows that they have fully processed the contents of the allocated
         segment before the subsequent allocation request takes place.

**Implementation note:** While a prefix allocator is *thread-safe*, concurrent access on
          the same recycling allocator might cause a thread to overwrite contents
          written to the underlying segment by a different thread.

**Returns:** an allocator that recycles an existing segment upon each new
        allocation request

Throws:

- `IllegalArgumentException`: if the `segment` is read-only
