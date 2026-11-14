---
title: "MemorySegment interface (java.lang.foreign) (part 5 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/MemorySegment.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MemorySegment interface (java.lang.foreign) (part 5 of 8)

## MemorySegment.ofArray(byte[])

```java
static MemorySegment ofArray(byte[] byteArray)
```

Creates a heap segment backed by the on-heap region of memory that holds the given
byte array. The scope of the returned segment is an automatic scope that keeps
the given array reachable. The returned segment is always accessible, from any
thread. Its `address()` is set to zero.

Parameters:

- `byteArray`: the primitive array backing the heap memory segment

**Returns:** a heap memory segment backed by a byte array

## MemorySegment.ofArray(char[])

```java
static MemorySegment ofArray(char[] charArray)
```

Creates a heap segment backed by the on-heap region of memory that holds the given
char array. The scope of the returned segment is an automatic scope that keeps
the given array reachable. The returned segment is always accessible, from any
thread. Its `address()` is set to zero.

Parameters:

- `charArray`: the primitive array backing the heap segment

**Returns:** a heap memory segment backed by a char array

## MemorySegment.ofArray(short[])

```java
static MemorySegment ofArray(short[] shortArray)
```

Creates a heap segment backed by the on-heap region of memory that holds the given
short array. The scope of the returned segment is an automatic scope that keeps
the given array reachable. The returned segment is always accessible, from any
thread. Its `address()` is set to zero.

Parameters:

- `shortArray`: the primitive array backing the heap segment

**Returns:** a heap memory segment backed by a short array

## MemorySegment.ofArray(int[])

```java
static MemorySegment ofArray(int[] intArray)
```

Creates a heap segment backed by the on-heap region of memory that holds the given
int array. The scope of the returned segment is an automatic scope that keeps
the given array reachable. The returned segment is always accessible, from any
thread. Its `address()` is set to zero.

Parameters:

- `intArray`: the primitive array backing the heap segment

**Returns:** a heap memory segment backed by an int array

## MemorySegment.ofArray(float[])

```java
static MemorySegment ofArray(float[] floatArray)
```

Creates a heap segment backed by the on-heap region of memory that holds the given
float array. The scope of the returned segment is an automatic scope that keeps
the given array reachable. The returned segment is always accessible, from any
thread. Its `address()` is set to zero.

Parameters:

- `floatArray`: the primitive array backing the heap segment

**Returns:** a heap memory segment backed by a float array

## MemorySegment.ofArray(long[])

```java
static MemorySegment ofArray(long[] longArray)
```

Creates a heap segment backed by the on-heap region of memory that holds the given
long array. The scope of the returned segment is an automatic scope that keeps
the given array reachable. The returned segment is always accessible, from any
thread. Its `address()` is set to zero.

Parameters:

- `longArray`: the primitive array backing the heap segment

**Returns:** a heap memory segment backed by a long array

## MemorySegment.ofArray(double[])

```java
static MemorySegment ofArray(double[] doubleArray)
```

Creates a heap segment backed by the on-heap region of memory that holds the given
double array. The scope of the returned segment is an automatic scope that keeps
the given array reachable. The returned segment is always accessible, from any
thread. Its `address()` is set to zero.

Parameters:

- `doubleArray`: the primitive array backing the heap segment

**Returns:** a heap memory segment backed by a double array

## MemorySegment.NULL

```java
MemorySegment NULL
```

A zero-length native segment modelling the `NULL` address. Equivalent to
`MemorySegment.ofAddress(0L)`.

The maximum byte alignment for
the `NULL` segment is of 262.

## MemorySegment.ofAddress(long)

```java
static MemorySegment ofAddress(long address)
```

Creates a zero-length native segment from the given
address value.

The returned segment is associated with the global scope and is accessible from
any thread.

On 32-bit platforms, the given address value will be normalized such that the
highest-order ("leftmost") 32 bits of the address
of the returned memory segment are set to zero.

Parameters:

- `address`: the address of the returned native segment

**Returns:** a zero-length native segment with the given address

## MemorySegment.copy(MemorySegment, long, MemorySegment, long, long)

```java
static void copy(MemorySegment srcSegment, long srcOffset, MemorySegment dstSegment, long dstOffset, long bytes)
```

Performs a bulk copy from source segment to destination segment. More
specifically, the bytes at offset `srcOffset` through
`srcOffset + bytes - 1` in the source segment are copied into the
destination segment at offset `dstOffset` through
`dstOffset + bytes - 1`.

If the source segment overlaps with the destination segment, then the copying is
performed as if the bytes at offset `srcOffset` through
`srcOffset + bytes - 1` in the source segment were first copied into a
temporary segment with size `bytes`, and then the contents of the temporary
segment were copied into the destination segment at offset `dstOffset`
through `dstOffset + bytes - 1`.

The result of a bulk copy is unspecified if, in the uncommon case, the source
segment and the destination segment do not overlap, but refer to overlapping
regions of the same backing storage using different addresses. For example, this
may occur if the same file is mapped to two segments.

Calling this method is equivalent to the following code:

Parameters:

- `srcSegment`: the source segment
- `srcOffset`: the starting offset, in bytes, of the source segment
- `dstSegment`: the destination segment
- `dstOffset`: the starting offset, in bytes, of the destination segment
- `bytes`: the number of bytes to be copied

Throws:

- `IllegalStateException`: if the scope associated with `srcSegment` is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `srcSegment.isAccessibleBy(T) == false`
- `IllegalStateException`: if the scope associated with `dstSegment` is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `dstSegment.isAccessibleBy(T) == false`
- `IndexOutOfBoundsException`: if `srcOffset > srcSegment.byteSize() - bytes`
- `IndexOutOfBoundsException`: if `dstOffset > dstSegment.byteSize() - bytes`
- `IndexOutOfBoundsException`: if either `srcOffset`, `dstOffset` or `bytes` are `< 0`
- `IllegalArgumentException`: if `dstSegment` is read-only

## MemorySegment.copy(MemorySegment, ValueLayout, long, MemorySegment, ValueLayout, long, long)

```java
static void copy(MemorySegment srcSegment, ValueLayout srcElementLayout, long srcOffset, MemorySegment dstSegment, ValueLayout dstElementLayout, long dstOffset, long elementCount)
```

Performs a bulk copy from source segment to destination segment. More
specifically, if `S` is the byte size of the element layouts, the bytes at
offset `srcOffset` through `srcOffset + (elementCount * S) - 1`
in the source segment are copied into the destination segment at offset
`dstOffset` through `dstOffset + (elementCount * S) - 1`.

The copy occurs in an element-wise fashion: the bytes in the source segment are
interpreted as a sequence of elements whose layout is `srcElementLayout`,
whereas the bytes in the destination segment are interpreted as a sequence of
elements whose layout is `dstElementLayout`. Both element layouts must have
the same size `S`. If the byte order of the two provided element layouts
differs, the bytes corresponding to each element to be copied are swapped
accordingly during the copy operation.

If the source segment overlaps with the destination segment, then the copying is
performed as if the bytes at offset `srcOffset` through
`srcOffset + (elementCount * S) - 1` in the source segment were first copied
into a temporary segment with size `bytes`, and then the contents of the
temporary segment were copied into the destination segment at offset
`dstOffset` through `dstOffset + (elementCount * S) - 1`.

The result of a bulk copy is unspecified if, in the uncommon case, the source
segment and the destination segment do not overlap, but refer to overlapping
regions of the same backing storage using different addresses. For example,
this may occur if the same file is mapped to two
segments.

Parameters:

- `srcSegment`: the source segment
- `srcElementLayout`: the element layout associated with the source segment
- `srcOffset`: the starting offset, in bytes, of the source segment
- `dstSegment`: the destination segment
- `dstElementLayout`: the element layout associated with the destination segment
- `dstOffset`: the starting offset, in bytes, of the destination segment
- `elementCount`: the number of elements to be copied

Throws:

- `IllegalArgumentException`: if the element layouts have different sizes, if the source (resp. destination) segment/offset are incompatible with the alignment constraint in the source (resp. destination) element layout
- `IllegalArgumentException`: if `srcElementLayout.byteAlignment() > srcElementLayout.byteSize()`
- `IllegalArgumentException`: if `dstElementLayout.byteAlignment() > dstElementLayout.byteSize()`
- `IllegalStateException`: if the scope associated with `srcSegment` is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `srcSegment.isAccessibleBy(T) == false`
- `IllegalStateException`: if the scope associated with `dstSegment` is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `dstSegment.isAccessibleBy(T) == false`
- `IllegalArgumentException`: if `dstSegment` is read-only
- `IndexOutOfBoundsException`: if `elementCount * srcLayout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `elementCount * dtsLayout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `srcOffset > srcSegment.byteSize() - (elementCount * srcLayout.byteSize())`
- `IndexOutOfBoundsException`: if `dstOffset > dstSegment.byteSize() - (elementCount * dstLayout.byteSize())`
- `IndexOutOfBoundsException`: if either `srcOffset`, `dstOffset` or `elementCount` are `< 0`

## MemorySegment.get(ValueLayout.OfByte, long)

```java
byte get(ValueLayout.OfByte layout, long offset)
```

Reads a byte from this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be read
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur.

**Returns:** a byte value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`

## MemorySegment.set(ValueLayout.OfByte, long, byte)

```java
void set(ValueLayout.OfByte layout, long offset, byte value)
```

Writes a byte into this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be written
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur.
- `value`: the byte value to be written.

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.get(ValueLayout.OfBoolean, long)

```java
boolean get(ValueLayout.OfBoolean layout, long offset)
```

Reads a boolean from this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be read
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur

**Returns:** a boolean value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`

## MemorySegment.set(ValueLayout.OfBoolean, long, boolean)

```java
void set(ValueLayout.OfBoolean layout, long offset, boolean value)
```

Writes a boolean into this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be written
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur
- `value`: the boolean value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.get(ValueLayout.OfChar, long)

```java
char get(ValueLayout.OfChar layout, long offset)
```

Reads a char from this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be read
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur

**Returns:** a char value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`
