---
title: "MemorySegment interface (java.lang.foreign) (part 4 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/MemorySegment.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MemorySegment interface (java.lang.foreign) (part 4 of 8)

## MemorySegment.asByteBuffer()

```java
ByteBuffer asByteBuffer()
```

Wraps this segment in a `ByteBuffer`. Some properties of the returned buffer
are linked to the properties of this segment. More specifically, the resulting
buffer has the following characteristics:

- It is read-only, if this segment is a
read-only segment;

- Its position is set to zero;

- Its capacity and
limit are both set to this segment's
size. For this reason, a byte buffer cannot
be returned if this segment's size is greater than `Integer.MAX_VALUE`;

- It is a direct buffer, if this is a
native segment.

The life-cycle of the returned buffer is tied to that of this segment. That is,
accessing the returned buffer after the scope associated with this segment is no
longer alive, will throw an
`IllegalStateException`. Similarly, accessing the returned buffer from a
thread `T` such that `isAccessible(T) == false` will throw a
`WrongThreadException`.

If this segment is accessible from a single
thread, calling read/write I/O operations on the resulting buffer might result in
unspecified exceptions being thrown. Examples of such problematic operations are
`java.nio.channels.AsynchronousSocketChannel.read(ByteBuffer)` and
`java.nio.channels.AsynchronousSocketChannel.write(ByteBuffer)`.

Finally, the resulting buffer's byte order is
`java.nio.ByteOrder.BIG_ENDIAN`; this can be changed using
`ByteBuffer.order(java.nio.ByteOrder)`.

**Returns:** a `ByteBuffer` view of this memory segment

Throws:

- `UnsupportedOperationException`: if this segment cannot be mapped onto a `ByteBuffer` instance, e.g. if it is a heap segment backed by an array other than `byte[]`), or if its size is greater than `Integer.MAX_VALUE`

## MemorySegment.toArray(ValueLayout.OfByte)

```java
byte[] toArray(ValueLayout.OfByte elementLayout)
```

Copy the contents of this memory segment into a new byte array.

Parameters:

- `elementLayout`: the source element layout. If the byte order associated with the layout is different from the native order, a byte swap operation will be performed on each array element

**Returns:** a new byte array whose contents are copied from this memory segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalStateException`: if this segment's contents cannot be copied into a `byte[]` instance, e.g. its size is greater than `Integer.MAX_VALUE`

## MemorySegment.toArray(ValueLayout.OfShort)

```java
short[] toArray(ValueLayout.OfShort elementLayout)
```

Copy the contents of this memory segment into a new short array.

Parameters:

- `elementLayout`: the source element layout. If the byte order associated with the layout is different from the native order, a byte swap operation will be performed on each array element

**Returns:** a new short array whose contents are copied from this memory segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalStateException`: if this segment's contents cannot be copied into a `short[]` instance, e.g. because `byteSize() % 2 != 0`, or `byteSize() / 2 > Integer.MAX_VALUE`

## MemorySegment.toArray(ValueLayout.OfChar)

```java
char[] toArray(ValueLayout.OfChar elementLayout)
```

Copy the contents of this memory segment into a new char array.

Parameters:

- `elementLayout`: the source element layout. If the byte order associated with the layout is different from the native order, a byte swap operation will be performed on each array element

**Returns:** a new char array whose contents are copied from this memory segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalStateException`: if this segment's contents cannot be copied into a `char[]` instance, e.g. because `byteSize() % 2 != 0`, or `byteSize() / 2 > Integer.MAX_VALUE`

## MemorySegment.toArray(ValueLayout.OfInt)

```java
int[] toArray(ValueLayout.OfInt elementLayout)
```

Copy the contents of this memory segment into a new int array.

Parameters:

- `elementLayout`: the source element layout. If the byte order associated with the layout is different from the native order, a byte swap operation will be performed on each array element.

**Returns:** a new int array whose contents are copied from this memory segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalStateException`: if this segment's contents cannot be copied into a `int[]` instance, e.g. because `byteSize() % 4 != 0`, or `byteSize() / 4 > Integer.MAX_VALUE`

## MemorySegment.toArray(ValueLayout.OfFloat)

```java
float[] toArray(ValueLayout.OfFloat elementLayout)
```

Copy the contents of this memory segment into a new float array.

Parameters:

- `elementLayout`: the source element layout. If the byte order associated with the layout is different from the native order, a byte swap operation will be performed on each array element

**Returns:** a new float array whose contents are copied from this memory segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalStateException`: if this segment's contents cannot be copied into a `float[]` instance, e.g. because `byteSize() % 4 != 0`, or `byteSize() / 4 > Integer.MAX_VALUE`

## MemorySegment.toArray(ValueLayout.OfLong)

```java
long[] toArray(ValueLayout.OfLong elementLayout)
```

Copy the contents of this memory segment into a new long array.

Parameters:

- `elementLayout`: the source element layout. If the byte order associated with the layout is different from the native order, a byte swap operation will be performed on each array element

**Returns:** a new long array whose contents are copied from this memory segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalStateException`: if this segment's contents cannot be copied into a `long[]` instance, e.g. because `byteSize() % 8 != 0`, or `byteSize() / 8 > Integer.MAX_VALUE`

## MemorySegment.toArray(ValueLayout.OfDouble)

```java
double[] toArray(ValueLayout.OfDouble elementLayout)
```

Copy the contents of this memory segment into a new double array.

Parameters:

- `elementLayout`: the source element layout. If the byte order associated with the layout is different from the native order, a byte swap operation will be performed on each array element

**Returns:** a new double array whose contents are copied from this memory segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalStateException`: if this segment's contents cannot be copied into a `double[]` instance, e.g. because `byteSize() % 8 != 0`, or `byteSize() / 8 > Integer.MAX_VALUE`

## MemorySegment.getString(long)

```java
String getString(long offset)
```

Reads a null-terminated string from this segment at the given offset, using the
UTF-8 charset.

Calling this method is equivalent to the following code:

Parameters:

- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur

**Returns:** a Java string constructed from the bytes read from the given starting
        address up to (but not including) the first `'\0'` terminator
        character (assuming one is found)

Throws:

- `IllegalArgumentException`: if the size of the string is greater than the largest string supported by the platform
- `IndexOutOfBoundsException`: if `offset < 0`
- `IndexOutOfBoundsException`: if no string terminator (e.g. `'\0'`) is present in this segment between the given `offset` and the end of this segment.
- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`

## MemorySegment.getString(long, Charset)

```java
String getString(long offset, Charset charset)
```

Reads a null-terminated string from this segment at the given offset, using the
provided charset.

This method always replaces malformed-input and unmappable-character
sequences with this charset's default replacement string. The `java.nio.charset.CharsetDecoder` class should be used when more control
over the decoding process is required.

Getting a string from a segment with a known byte offset and
known byte length can be done like so:

Parameters:

- `offset`: offset in bytes (relative to this segment address) at which this access operation will occur
- `charset`: the charset used to decode the string bytes. The `charset` must be a standard charset

**Returns:** a Java string constructed from the bytes read from the given starting
        address up to (but not including) the first `'\0'` terminator
        character (assuming one is found)

Throws:

- `IllegalArgumentException`: if the size of the string is greater than the largest string supported by the platform
- `IndexOutOfBoundsException`: if `offset < 0`
- `IndexOutOfBoundsException`: if no string terminator (e.g. `'\0'`) is present in this segment between the given `offset` and the end of this segment. The byte size of the string terminator depends on the selected `charset`. For instance, this is 1 for `StandardCharsets.US_ASCII` and 2 for `StandardCharsets.UTF_16`
- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if `charset` is not a standard charset

## MemorySegment.setString(long, String)

```java
void setString(long offset, String str)
```

Writes the given string into this segment at the given offset, converting it to
a null-terminated byte sequence using the UTF-8
charset.

Calling this method is equivalent to the following code:

Parameters:

- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur, the final address of this write operation can be expressed as `address() + offset`.
- `str`: the Java string to be written into this segment

Throws:

- `IndexOutOfBoundsException`: if `offset < 0`
- `IndexOutOfBoundsException`: if `offset > byteSize() - (B + 1)`, where `B` is the size, in bytes, of the string encoded using UTF-8 charset `str.getBytes(StandardCharsets.UTF_8).length`)
- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.setString(long, String, Charset)

```java
void setString(long offset, String str, Charset charset)
```

Writes the given string into this segment at the given offset, converting it to a
null-terminated byte sequence using the provided charset.

This method always replaces malformed-input and unmappable-character
sequences with this charset's default replacement string. The `java.nio.charset.CharsetDecoder` class should be used when more control
over the decoding process is required.

If the given string contains any `'\0'` characters, they will be
copied as well. This means that, depending on the method used to read
the string, such as `MemorySegment.getString(long)`, the string
will appear truncated when read again.

Parameters:

- `offset`: offset in bytes (relative to this segment address) at which this access operation will occur, the final address of this write operation can be expressed as `address() + offset`
- `str`: the Java string to be written into this segment
- `charset`: the charset used to encode the string bytes. The `charset` must be a standard charset

Throws:

- `IndexOutOfBoundsException`: if `offset < 0`
- `IndexOutOfBoundsException`: if `offset > byteSize() - (B + N)`, where:
- `B` is the size, in bytes, of the string encoded using the provided charset (e.g. `str.getBytes(charset).length`);
- `N` is the size (in bytes) of the terminator char according to the provided charset. For instance, this is 1 for `StandardCharsets.US_ASCII` and 2 for `StandardCharsets.UTF_16`.
- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if `charset` is not a standard charset
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.ofBuffer(Buffer)

```java
static MemorySegment ofBuffer(Buffer buffer)
```

Creates a memory segment that is backed by the same region of memory that backs
the given `Buffer` instance. The segment starts relative to the buffer's
position (inclusive) and ends relative to the buffer's limit (exclusive).

If the buffer is read-only, the resulting segment
is also read-only. Moreover, if the buffer
is a direct buffer, the returned segment is a
native segment; otherwise, the returned memory segment is a heap segment.

If the provided buffer has been obtained by calling `asByteBuffer()` on a
memory segment whose scope is `S`, the returned segment
will be associated with the same scope `S`. Otherwise, the scope of the
returned segment is an automatic scope that keeps the provided buffer reachable.
As such, if the provided buffer is a direct buffer, its backing memory region will
not be deallocated as long as the returned segment, or any of its slices, are kept
reachable.

Parameters:

- `buffer`: the buffer instance to be turned into a new memory segment

**Returns:** a memory segment, derived from the given buffer instance

Throws:

- `IllegalArgumentException`: if the provided `buffer` is a heap buffer but is not backed by an array; For example, buffers directly or indirectly obtained via (`CharBuffer.wrap(CharSequence)` or int, int) are not backed by an array.
