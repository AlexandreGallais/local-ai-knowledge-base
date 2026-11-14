---
title: "ClassReader interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/ClassReader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassReader interface (java.lang.classfile)

```java
public sealed interface ClassReader extends ConstantPool permits ClassReaderImpl
```

Advanced `class` file reading support for `AttributeMapper`s.
Supports reading arbitrary offsets within a `class` file and reading
data of various numeric types (e.g., `u2`, `u4`) in addition to
constant pool access.

All numeric values in the `class` file format are big endian.

Unless otherwise specified, all out-of-bounds access result in an `IllegalArgumentException` to indicate the `class` file data is
malformed.  Since the `class` file data is arbitrary, users should
sanity-check the structural integrity of the data before attempting to
interpret the potentially malformed data.

**See also:** AttributeMapper#readAttribute(AttributedElement, ClassReader, int)

**Since:** 24

## ClassReader.customAttributes()

```java
Function<Utf8Entry, AttributeMapper<?>> customAttributes()
```

This is derived from
the processing option `ClassFile.AttributeMapperOption`.

## ClassReader.flags()

```java
int flags()
```

**See also:** ClassModel#flags()

## ClassReader.thisClassEntry()

```java
ClassEntry thisClassEntry()
```

**See also:** ClassModel#thisClass()

## ClassReader.superclassEntry()

```java
Optional<ClassEntry> superclassEntry()
```

**See also:** ClassModel#superclass()

## ClassReader.classfileLength()

```java
int classfileLength()
```

## ClassReader.readEntry(int)

```java
PoolEntry readEntry(int offset)
```

Parameters:

- `offset`: the offset of the index within the `class` file

**API note:** If only a particular type of entry is expected, use int, Class) readEntry(int, Class).

Throws:

- `ConstantPoolException`: if the index is out of range of the constant pool size, or zero

## ClassReader.readEntry(int, Class<T>)

```java
<T extends PoolEntry> T readEntry(int offset, Class<T> cls)
```

Parameters:

- `<T>`: the entry type
- `offset`: the offset of the index within the `class` file
- `cls`: the entry type

Throws:

- `ConstantPoolException`: if the index is out of range of the constant pool size, or zero, or the entry is not of the given type

## ClassReader.readEntryOrNull(int)

```java
PoolEntry readEntryOrNull(int offset)
```

Parameters:

- `offset`: the offset of the index within the `class` file

**API note:** If only a particular type of entry is expected, use int, Class) readEntryOrNull(int, Class).

Throws:

- `ConstantPoolException`: if the index is out of range of the constant pool size

## ClassReader.readEntryOrNull(int, Class<T>)

```java
<T extends PoolEntry> T readEntryOrNull(int offset, Class<T> cls)
```

Parameters:

- `<T>`: the entry type
- `offset`: the offset of the index within the `class` file
- `cls`: the entry type

Throws:

- `ConstantPoolException`: if the index is out of range of the constant pool size, or zero, or the entry is not of the given type

## ClassReader.readU1(int)

```java
int readU1(int offset)
```

Reads a byte and zero-extends it to an `int`.

Parameters:

- `offset`: the offset within the `class` file

## ClassReader.readU2(int)

```java
int readU2(int offset)
```

Reads a 2-byte value and zero-extends it to an `int`.

Parameters:

- `offset`: the offset within the `class` file

## ClassReader.readS1(int)

```java
int readS1(int offset)
```

Reads a byte and sign-extends it to an `int`.

Parameters:

- `offset`: the offset within the `class` file

## ClassReader.readS2(int)

```java
int readS2(int offset)
```

Reads a 2-byte value and sign-extends it to an `int`.

Parameters:

- `offset`: the offset within the `class` file

## ClassReader.readInt(int)

```java
int readInt(int offset)
```

Reads 4 bytes of value.

Parameters:

- `offset`: the offset within the `class` file

## ClassReader.readLong(int)

```java
long readLong(int offset)
```

Reads 8 bytes of value.

Parameters:

- `offset`: the offset within the `class` file

## ClassReader.readFloat(int)

```java
float readFloat(int offset)
```

Reads 4 bytes of value.

In the conversions, all NaN values of the `float` may or may not be
collapsed into a single "canonical" NaN value.

Parameters:

- `offset`: the offset within the `class` file

## ClassReader.readDouble(int)

```java
double readDouble(int offset)
```

Reads 8 bytes of value.

In the conversions, all NaN values of the `double` may or may not
be collapsed into a single "canonical" NaN value.

Parameters:

- `offset`: the offset within the `class` file

## ClassReader.readBytes(int, int)

```java
byte[] readBytes(int offset, int len)
```

Parameters:

- `offset`: the offset within the `class` file
- `len`: the length of the range

## ClassReader.copyBytesTo(BufWriter, int, int)

```java
void copyBytesTo(BufWriter buf, int offset, int len)
```

Copy a range of bytes from the `class` file to a `BufWriter`.

Parameters:

- `buf`: the `BufWriter`
- `offset`: the offset within the `class` file
- `len`: the length of the range
