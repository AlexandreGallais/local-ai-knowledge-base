---
title: "SegmentAllocator interface (java.lang.foreign) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/SegmentAllocator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SegmentAllocator interface (java.lang.foreign)

```java
public interface SegmentAllocator
```

An object that may be used to allocate memory segments.
Clients implementing this interface must implement the long)
method. A segment allocator defines several methods which can be useful to create
segments from several kinds of Java values such as primitives and arrays.

`SegmentAllocator` is a functional interface.
Clients can easily obtain a new segment allocator by using either a lambda expression
or a method reference:

This interface defines factories for commonly used allocators:

- `slicingAllocator(MemorySegment)` obtains an efficient slicing
        allocator, where memory is allocated by repeatedly slicing the provided
        memory segment;

- `prefixAllocator(MemorySegment)` obtains an allocator which wraps a
        segment and recycles its content upon each new allocation request.

Passing a segment allocator to an API can be especially useful in circumstances where
a client wants to communicate *where* the results of a certain operation
(performed by the API) should be stored, as a memory segment. For instance,
Linker.Option...) downcall method handles
can accept an additional `SegmentAllocator` parameter if the underlying
foreign function is known to return a struct by-value. Effectively, the allocator
parameter tells the linker where to store the return value of the foreign function.

**API note:** Unless otherwise specified, the long) method is
         not thread-safe. Furthermore, memory segments allocated by a segment
         allocator can be associated with different lifetimes, and can even be backed
         by overlapping regions of memory. For these reasons, clients should
         generally only interact with a segment allocator they own.

Clients should consider using an arena instead, which, provides
strong thread-safety, lifetime and non-overlapping guarantees.

**Since:** 22

## SegmentAllocator.allocateFrom(String)

```java
default MemorySegment allocateFrom(String str)
```

Converts a Java string into a null-terminated C string using the
UTF-8 charset, storing the result into a
memory segment.

Calling this method is equivalent to the following code:

Parameters:

- `str`: the Java string to be converted into a C string

**Returns:** a new native segment containing the converted C string

## SegmentAllocator.allocateFrom(String, Charset)

```java
default MemorySegment allocateFrom(String str, Charset charset)
```

Converts a Java string into a null-terminated C string using the provided charset,
and storing the result into a memory segment.

This method always replaces malformed-input and unmappable-character
sequences with this charset's default replacement byte array. The
`java.nio.charset.CharsetEncoder` class should be used when more
control over the encoding process is required.

If the given string contains any `'\0'` characters, they will be
copied as well. This means that, depending on the method used to read
the string, such as `MemorySegment.getString(long)`, the string
will appear truncated when read again.

Parameters:

- `str`: the Java string to be converted into a C string
- `charset`: the charset used to encode the string bytes

**Returns:** a new native segment containing the converted C string

**Implementation requirements:** The default implementation for this method copies the contents of the
          provided Java string into a new memory segment obtained by calling
          `this.allocate(B + N)`, where:

- `B` is the size, in bytes, of the string encoded using the
        provided charset (e.g. `str.getBytes(charset).length`);

- `N` is the size (in bytes) of the terminator char according to the
        provided charset. For instance, this is 1 for `StandardCharsets.US_ASCII`
        and 2 for `StandardCharsets.UTF_16`.

Throws:

- `IllegalArgumentException`: if `charset` is not a standard charset

## SegmentAllocator.allocateFrom(ValueLayout.OfByte, byte)

```java
default MemorySegment allocateFrom(ValueLayout.OfByte layout, byte value)
```

The size of the allocated memory segment is the
size of the given layout. The given value is
written into the segment according to the byte order and alignment constraint of
the given layout.

Parameters:

- `layout`: the layout of the block of memory to be allocated
- `value`: the value to be set in the newly allocated memory segment

**Implementation requirements:** The default implementation is equivalent to:

## SegmentAllocator.allocateFrom(ValueLayout.OfChar, char)

```java
default MemorySegment allocateFrom(ValueLayout.OfChar layout, char value)
```

The size of the allocated memory segment is the
size of the given layout.
The given value is written into the segment according to the byte order and
alignment constraint of the given layout.

Parameters:

- `layout`: the layout of the block of memory to be allocated
- `value`: the value to be set in the newly allocated memory segment

**Implementation requirements:** The default implementation is equivalent to:

## SegmentAllocator.allocateFrom(ValueLayout.OfShort, short)

```java
default MemorySegment allocateFrom(ValueLayout.OfShort layout, short value)
```

The size of the allocated memory segment is the
size of the given layout. The given value is
written into the segment according to the byte order and alignment constraint of
the given layout.

Parameters:

- `layout`: the layout of the block of memory to be allocated
- `value`: the value to be set in the newly allocated memory segment

**Implementation requirements:** The default implementation is equivalent to:

## SegmentAllocator.allocateFrom(ValueLayout.OfInt, int)

```java
default MemorySegment allocateFrom(ValueLayout.OfInt layout, int value)
```

The size of the allocated memory segment is the
size of the given layout. The given value is
written into the segment according to the byte order and alignment constraint of
the given layout.

Parameters:

- `layout`: the layout of the block of memory to be allocated
- `value`: the value to be set in the newly allocated memory segment

**Implementation requirements:** The default implementation is equivalent to:

## SegmentAllocator.allocateFrom(ValueLayout.OfFloat, float)

```java
default MemorySegment allocateFrom(ValueLayout.OfFloat layout, float value)
```

The size of the allocated memory segment is the
size of the given layout. The given value is
written into the segment according to the byte order and alignment constraint of
the given layout.

Parameters:

- `layout`: the layout of the block of memory to be allocated
- `value`: the value to be set in the newly allocated memory segment

**Implementation requirements:** The default implementation is equivalent to:

## SegmentAllocator.allocateFrom(ValueLayout.OfLong, long)

```java
default MemorySegment allocateFrom(ValueLayout.OfLong layout, long value)
```

The size of the allocated memory segment is the
size of the given layout. The given value is
written into the segment according to the byte order and alignment constraint of
the given layout.

Parameters:

- `layout`: the layout of the block of memory to be allocated
- `value`: the value to be set in the newly allocated memory segment

**Implementation requirements:** The default implementation is equivalent to:

## SegmentAllocator.allocateFrom(ValueLayout.OfDouble, double)

```java
default MemorySegment allocateFrom(ValueLayout.OfDouble layout, double value)
```

The size of the allocated memory segment is the
size of the given layout. The given value is
written into the segment according to the byte order and alignment constraint of
the given layout.

Parameters:

- `layout`: the layout of the block of memory to be allocated
- `value`: the value to be set in the newly allocated memory segment

**Implementation requirements:** The default implementation is equivalent to:

## SegmentAllocator.allocateFrom(AddressLayout, MemorySegment)

```java
default MemorySegment allocateFrom(AddressLayout layout, MemorySegment value)
```

The address value might be narrowed according to the platform address size
(see `ValueLayout.ADDRESS`).

The size of the allocated memory segment is the
size of the given layout. The given value is
written into the segment according to the byte order and alignment constraint of
the given layout.

Parameters:

- `layout`: the layout of the block of memory to be allocated
- `value`: the value to be set in the newly allocated memory segment

**Implementation requirements:** The default implementation is equivalent to:

Throws:

- `IllegalArgumentException`: if `value` is not a native segment

## SegmentAllocator.allocateFrom(ValueLayout, MemorySegment, ValueLayout, long, long)

```java
default MemorySegment allocateFrom(ValueLayout elementLayout, MemorySegment source, ValueLayout sourceElementLayout, long sourceOffset, long elementCount)
```

The size of the allocated memory segment is the
`elementLayout.byteSize() * elementCount`. The contents of the
source segment is copied into the result segment element by element, according
to the byte order and alignment constraint of the given element layout.

Parameters:

- `elementLayout`: the element layout of the allocated array
- `source`: the source segment
- `sourceElementLayout`: the element layout of the source segment
- `sourceOffset`: the starting offset, in bytes, of the source segment
- `elementCount`: the number of elements in the source segment to be copied

**Implementation requirements:** The default implementation for this method is equivalent to the following code:

Throws:

- `IllegalArgumentException`: if `elementLayout.byteSize() != sourceElementLayout.byteSize()`
- `IllegalArgumentException`: if the source segment/offset are incompatible with the alignment constraint in the source element layout
- `IllegalArgumentException`: if `elementLayout.byteAlignment() > elementLayout.byteSize()`
- `IllegalArgumentException`: if `sourceElementLayout.byteAlignment() > sourceElementLayout.byteSize()`
- `IllegalStateException`: if the scope associated with `source` is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `source.isAccessibleBy(T) == false`
- `IllegalArgumentException`: if `elementCount * sourceElementLayout.byteSize()` overflows
- `IllegalArgumentException`: if `elementCount < 0`
- `IndexOutOfBoundsException`: if `sourceOffset > source.byteSize() - (elementCount * sourceElementLayout.byteSize())`
- `IndexOutOfBoundsException`: if `sourceOffset < 0`

## SegmentAllocator.allocateFrom(ValueLayout.OfByte, byte...)

```java
default MemorySegment allocateFrom(ValueLayout.OfByte elementLayout, byte... elements)
```

The size of the allocated memory segment is
`elementLayout.byteSize() * elements.length`. The contents of the
source array is copied into the result segment element by element, according
to the byte order and alignment constraint of the given element layout.

Parameters:

- `elementLayout`: the element layout of the array to be allocated
- `elements`: the byte elements to be copied to the newly allocated memory block

**Implementation requirements:** The default implementation for this method is equivalent to the
          following code:

Throws:

- `IllegalArgumentException`: if `elementLayout.byteAlignment() > elementLayout.byteSize()`

## SegmentAllocator.allocateFrom(ValueLayout.OfShort, short...)

```java
default MemorySegment allocateFrom(ValueLayout.OfShort elementLayout, short... elements)
```

The size of the allocated memory segment is
`elementLayout.byteSize() * elements.length`. The contents of the
source array are copied into the result segment element by element, according
to the byte order and alignment constraint of the given element layout.

Parameters:

- `elementLayout`: the element layout of the array to be allocated
- `elements`: the short elements to be copied to the newly allocated memory block

**Implementation requirements:** The default implementation for this method is equivalent to the
          following code:

Throws:

- `IllegalArgumentException`: if `elementLayout.byteAlignment() > elementLayout.byteSize()`

## SegmentAllocator.allocateFrom(ValueLayout.OfChar, char...)

```java
default MemorySegment allocateFrom(ValueLayout.OfChar elementLayout, char... elements)
```

The size of the allocated memory segment is
`elementLayout.byteSize() * elements.length`. The contents of the
source array is copied into the result segment element by element, according
to the byte order and alignment constraint of the given element layout.

Parameters:

- `elementLayout`: the element layout of the array to be allocated
- `elements`: the char elements to be copied to the newly allocated memory block

**Implementation requirements:** The default implementation for this method is equivalent to the
          following code:

Throws:

- `IllegalArgumentException`: if `elementLayout.byteAlignment() > elementLayout.byteSize()`

## SegmentAllocator.allocateFrom(ValueLayout.OfInt, int...)

```java
default MemorySegment allocateFrom(ValueLayout.OfInt elementLayout, int... elements)
```

The size of the allocated memory segment is
`elementLayout.byteSize() * elements.length`. The contents of the
source array is copied into the result segment element by element, according
to the byte order and alignment constraint of the given element layout.

Parameters:

- `elementLayout`: the element layout of the array to be allocated
- `elements`: the int elements to be copied to the newly allocated memory block

**Implementation requirements:** The default implementation for this method is equivalent to the
          following code:

Throws:

- `IllegalArgumentException`: if `elementLayout.byteAlignment() > elementLayout.byteSize()`

## SegmentAllocator.allocateFrom(ValueLayout.OfFloat, float...)

```java
default MemorySegment allocateFrom(ValueLayout.OfFloat elementLayout, float... elements)
```

The size of the allocated memory segment is
`elementLayout.byteSize() * elements.length`. The contents of
the source array is copied into the result segment element by element, according
to the byte order and alignment constraint of the given element layout.

Parameters:

- `elementLayout`: the element layout of the array to be allocated
- `elements`: the float elements to be copied to the newly allocated memory block

**Implementation requirements:** The default implementation for this method is equivalent to the
          following code:

Throws:

- `IllegalArgumentException`: if `elementLayout.byteAlignment() > elementLayout.byteSize()`
