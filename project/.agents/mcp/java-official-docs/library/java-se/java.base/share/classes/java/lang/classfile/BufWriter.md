---
title: "BufWriter interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/BufWriter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BufWriter interface (java.lang.classfile)

```java
public sealed interface BufWriter permits BufWriterImpl
```

Advanced `class` file writing support for `AttributeMapper`s.
Supports writing portions of a `class` file to a growable buffer, such
as writing various numerical types (e.g., `u2`, `u4`), to the end
of the buffer, as well as to create constant pool entries.

All numeric values in the `class` file format are big endian.  Writing larger numeric values to smaller
numeric values are always done with truncation, that the least significant
bytes are kept and the other bytes are silently dropped.  As a result,
numeric value writing methods can write both signed and unsigned values, and
users should validate their values before writing if silent dropping of most
significant bytes is not the intended behavior.

**See also:** AttributeMapper#writeAttribute(BufWriter, Attribute)

**Since:** 24

## BufWriter.constantPool()

```java
ConstantPoolBuilder constantPool()
```

**See also:** ClassFileBuilder#constantPool()

## BufWriter.canWriteDirect(ConstantPool)

```java
boolean canWriteDirect(ConstantPool other)
```

This is a shortcut for `constantPool().canWriteDirect(other)`.

Parameters:

- `other`: the other constant pool

**See also:** ConstantPoolBuilder#canWriteDirect(ConstantPool)

## BufWriter.reserveSpace(int)

```java
void reserveSpace(int freeBytes)
```

Ensures that the buffer has at least `freeBytes` bytes of free space
in the end of the buffer.

The writing result is the same without calls to this method, but the
writing process may be slower.

Parameters:

- `freeBytes`: the number of bytes to reserve

**API note:** This is a hint that changes no visible state of the buffer; it helps to
reduce reallocation of the underlying storage by allocating sufficient
space at once.

## BufWriter.writeU1(int)

```java
void writeU1(int x)
```

Writes a byte to the buffer.  `x` is truncated to a byte and
written.

Parameters:

- `x`: the value to truncate to a byte

## BufWriter.writeU2(int)

```java
void writeU2(int x)
```

Writes 2 bytes, or a short, to the buffer.  `x` is truncated to two
bytes and written.

Parameters:

- `x`: the value to truncate to a short

## BufWriter.writeInt(int)

```java
void writeInt(int x)
```

Writes 4 bytes, or an int, to the buffer.

Parameters:

- `x`: the int value

## BufWriter.writeFloat(float)

```java
void writeFloat(float x)
```

Writes a float value, of 4 bytes, to the buffer.

In the conversions, all NaN values of the `float` may or may not be
collapsed into a single "canonical" NaN value.

Parameters:

- `x`: the float value

## BufWriter.writeLong(long)

```java
void writeLong(long x)
```

Writes 8 bytes, or a long, to the buffer.

Parameters:

- `x`: the long value

## BufWriter.writeDouble(double)

```java
void writeDouble(double x)
```

Writes a double value, of 8 bytes, to the buffer.

In the conversions, all NaN values of the `double` may or may not
be collapsed into a single "canonical" NaN value.

Parameters:

- `x`: the double value

## BufWriter.writeBytes(byte[])

```java
void writeBytes(byte[] arr)
```

Writes the contents of a byte array to the buffer.

Parameters:

- `arr`: the byte array

## BufWriter.writeBytes(byte[], int, int)

```java
void writeBytes(byte[] arr, int start, int length)
```

Writes a range of a byte array to the buffer.

Parameters:

- `arr`: the byte array
- `start`: the start offset of the range within the byte array
- `length`: the length of the range

Throws:

- `IndexOutOfBoundsException`: if range is outside the array bounds

## BufWriter.patchInt(int, int, int)

```java
void patchInt(int offset, int size, int value)
```

Patches a previously written integer value.  `value` is truncated
to the given `size` number of bytes and written at the given `offset`.  The end of this buffer stays unchanged.

Parameters:

- `offset`: the offset in this buffer at which to patch
- `size`: the size of the integer value being written, in bytes
- `value`: the integer value to be truncated

**API note:** The `offset` can be obtained by calling `size()` before
writing the previous integer value.

**See also:** #size()

Throws:

- `IndexOutOfBoundsException`: if patched int is outside of bounds

## BufWriter.writeIntBytes(int, long)

```java
void writeIntBytes(int intSize, long intValue)
```

Writes a multibyte value to the buffer.  `intValue` is truncated
to the given `intSize` number of bytes and written.

Parameters:

- `intSize`: the size of the integer value being written, in bytes
- `intValue`: the value to be truncated

## BufWriter.writeIndex(PoolEntry)

```java
void writeIndex(PoolEntry entry)
```

Writes the index of the specified constant pool entry as a u2.  If the `entry` does not belong to the constant pool of this buffer, it will be converted, and the index of the converted
pool entry is written instead.

Parameters:

- `entry`: the constant pool entry

Throws:

- `IllegalArgumentException`: if the entry has invalid index

## BufWriter.writeIndexOrZero(PoolEntry)

```java
void writeIndexOrZero(PoolEntry entry)
```

Writes the index of the specified constant pool entry, or the value
`0` if the specified entry is `null`, as a u2.  If the `entry` does not belong to the constant pool of this buffer, it will be converted, and the index of the converted
pool entry is written instead.

Parameters:

- `entry`: the constant pool entry, may be `null`

Throws:

- `IllegalArgumentException`: if the entry is not `null` and has invalid index

## BufWriter.size()

```java
int size()
```

**See also:** #patchInt(int, int, int)
