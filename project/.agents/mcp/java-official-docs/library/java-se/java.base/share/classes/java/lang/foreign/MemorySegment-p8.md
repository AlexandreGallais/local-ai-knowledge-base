---
title: "MemorySegment interface (java.lang.foreign) (part 8 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/MemorySegment.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MemorySegment interface (java.lang.foreign) (part 8 of 8)

## MemorySegment.setAtIndex(ValueLayout.OfDouble, long, double)

```java
void setAtIndex(ValueLayout.OfDouble layout, long index, double value)
```

Writes a double into this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be written
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.
- `value`: the double value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.getAtIndex(AddressLayout, long)

```java
MemorySegment getAtIndex(AddressLayout layout, long index)
```

Reads an address from this segment at the given at the given index, scaled by the
given layout size. The read address is wrapped in a native segment, associated
with the global scope. Under normal conditions, the size of the returned segment
is `0`. However, if the provided address layout has a
target layout `T`, then the size
of the returned segment is set to `T.byteSize()`.

Parameters:

- `layout`: the layout of the region of memory to be read
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.

**Returns:** a native segment wrapping an address read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout.
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IllegalArgumentException`: if provided address layout has a target layout `T`, and the address of the returned segment is incompatible with the alignment constraint in `T`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`

## MemorySegment.setAtIndex(AddressLayout, long, MemorySegment)

```java
void setAtIndex(AddressLayout layout, long index, MemorySegment value)
```

Writes an address into this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be written
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.
- `value`: the address value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout.
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`
- `IllegalArgumentException`: if `value` is not a native segment
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.equals(Object)

```java
boolean equals(Object that)
```

Compares the specified object with this memory segment for equality. Returns
`true` if and only if the specified object is also a memory segment, and if
the two segments refer to the same location, in some region of memory.

More specifically, for two segments `s1` and `s2` to be considered
equal, all the following must be true:

- `s1.heapBase().equals(s2.heapBase())`, that is, the two segments
    must be of the same kind; either both are native segments,
    backed by off-heap memory, or both are backed by the same on-heap
    Java object;

- `s1.address() == s2.address()`, that is, the address of the two
    segments should be the same. This means that the two segments either refer to
    the same location in some off-heap region, or they refer to the same offset
    inside their associated Java object.

Parameters:

- `that`: the object to be compared for equality with this memory segment

**API note:** This method does not perform a structural comparison of the contents of
         the two memory segments. Clients can compare memory segments structurally
         by using the `mismatch(MemorySegment)` method instead. Note that
         this method does *not* compare the temporal and spatial bounds of
         two segments. As such, it is suitable to check whether two segments have
         the same address.

**Returns:** `true` if the specified object is equal to this memory segment

**See also:** #mismatch(MemorySegment)

## MemorySegment.hashCode()

```java
int hashCode()
```

## MemorySegment.copy(MemorySegment, ValueLayout, long, Object, int, int)

```java
static void copy(MemorySegment srcSegment, ValueLayout srcLayout, long srcOffset, Object dstArray, int dstIndex, int elementCount)
```

Copies a number of elements from a source memory segment to a destination array.
The elements, whose size and alignment constraints are specified by the given
layout, are read from the source segment, starting at the given offset
(expressed in bytes), and are copied into the destination array, at the
given index.

Supported array types are :
`byte[]`, `char[]`, `short[]`,
`int[]`, `float[]`, `long[]` and `double[]`.

Parameters:

- `srcSegment`: the source segment
- `srcLayout`: the source element layout. If the byte order associated with the layout is different from the native order, a byte swap operation will be performed on each array element
- `srcOffset`: the starting offset, in bytes, of the source segment
- `dstArray`: the destination array
- `dstIndex`: the starting index of the destination array
- `elementCount`: the number of array elements to be copied

Throws:

- `IllegalStateException`: if the scope associated with `srcSegment` is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `srcSegment.isAccessibleBy(T) == false`
- `IllegalArgumentException`: if `dstArray` is not an array, or if it is an array but whose type is not supported
- `IllegalArgumentException`: if the destination array component type does not match `srcLayout.carrier()`
- `IllegalArgumentException`: if `offset` is incompatible with the alignment constraint in the source element layout
- `IllegalArgumentException`: if `srcLayout.byteAlignment() > srcLayout.byteSize()`
- `IndexOutOfBoundsException`: if `elementCount * srcLayout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `srcOffset > srcSegment.byteSize() - (elementCount * srcLayout.byteSize())`
- `IndexOutOfBoundsException`: if `dstIndex > dstArray.length - elementCount`
- `IndexOutOfBoundsException`: if either `srcOffset`, `dstIndex` or `elementCount` are `< 0`

## MemorySegment.copy(Object, int, MemorySegment, ValueLayout, long, int)

```java
static void copy(Object srcArray, int srcIndex, MemorySegment dstSegment, ValueLayout dstLayout, long dstOffset, int elementCount)
```

Copies a number of elements from a source array to a destination memory segment.

The elements, whose size and alignment constraints are specified by the given
layout, are read from the source array, starting at the given index, and are
copied into the destination segment, at the given offset (expressed in bytes).

Supported array types are
`byte[]`, `char[]`, `short[]`,
`int[]`, `float[]`, `long[]` and `double[]`.

Parameters:

- `srcArray`: the source array
- `srcIndex`: the starting index of the source array
- `dstSegment`: the destination segment
- `dstLayout`: the destination element layout. If the byte order associated with the layout is different from the native order, a byte swap operation will be performed on each array element.
- `dstOffset`: the starting offset, in bytes, of the destination segment
- `elementCount`: the number of array elements to be copied

Throws:

- `IllegalStateException`: if the scope associated with `dstSegment` is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `dstSegment.isAccessibleBy(T) == false`
- `IllegalArgumentException`: if `srcArray` is not an array, or if it is an array but whose type is not supported
- `IllegalArgumentException`: if the source array component type does not match `srcLayout.carrier()`
- `IllegalArgumentException`: if `offset` is incompatible with the alignment constraint in the source element layout
- `IllegalArgumentException`: if `dstLayout.byteAlignment() > dstLayout.byteSize()`
- `IllegalArgumentException`: if `dstSegment` is read-only
- `IndexOutOfBoundsException`: if `elementCount * dstLayout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `dstOffset > dstSegment.byteSize() - (elementCount * dstLayout.byteSize())`
- `IndexOutOfBoundsException`: if `srcIndex > srcArray.length - elementCount`
- `IndexOutOfBoundsException`: if either `srcIndex`, `dstOffset` or `elementCount` are `< 0`

## MemorySegment.mismatch(MemorySegment, long, long, MemorySegment, long, long)

```java
static long mismatch(MemorySegment srcSegment, long srcFromOffset, long srcToOffset, MemorySegment dstSegment, long dstFromOffset, long dstToOffset)
```

Finds and returns the relative offset, in bytes, of the first mismatch between the
source and the destination segments. More specifically, the bytes at offset
`srcFromOffset` through `srcToOffset - 1` in the source segment are
compared against the bytes at offset `dstFromOffset` through `dstToOffset - 1`
in the destination segment.

If the two segments, over the specified ranges, share a common prefix then the
returned offset is the length of the common prefix, and it follows that there is a
mismatch between the two segments at that relative offset within the respective
segments. If one segment is a proper prefix of the other, over the specified
ranges, then the returned offset is the smallest range, and it follows that the
relative offset is only valid for the segment with the larger range. Otherwise,
there is no mismatch and `-1` is returned.

Parameters:

- `srcSegment`: the source segment.
- `srcFromOffset`: the offset (inclusive) of the first byte in the source segment to be tested
- `srcToOffset`: the offset (exclusive) of the last byte in the source segment to be tested
- `dstSegment`: the destination segment
- `dstFromOffset`: the offset (inclusive) of the first byte in the destination segment to be tested
- `dstToOffset`: the offset (exclusive) of the last byte in the destination segment to be tested

**Returns:** the relative offset, in bytes, of the first mismatch between the
        source and destination segments, otherwise -1 if no mismatch

**See also:** MemorySegment#mismatch(MemorySegment)

**See also:** Arrays#mismatch(Object[], int, int, Object[], int, int)

Throws:

- `IllegalStateException`: if the scope associated with `srcSegment` is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `srcSegment.isAccessibleBy(T) == false`
- `IllegalStateException`: if the scope associated with `dstSegment` is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `dstSegment.isAccessibleBy(T) == false`
- `IndexOutOfBoundsException`: if `srcFromOffset < 0`, `srcToOffset < srcFromOffset` or `srcToOffset > srcSegment.byteSize()`
- `IndexOutOfBoundsException`: if `dstFromOffset < 0`, `dstToOffset < dstFromOffset` or `dstToOffset > dstSegment.byteSize()`

## MemorySegment.isAlive()

```java
boolean isAlive()
```

## MemorySegment.equals(Object)

```java
boolean equals(Object that)
```

. In that case, it is always
the case that `this.isAlive() == ((Scope)that).isAlive()`.

Parameters:

- `that`: the object to be tested

## MemorySegment.hashCode()

```java
int hashCode()
```

**Implementation requirements:** Implementations of this method obey the general contract of
          `Object.hashCode`.

**See also:** #equals(Object)
