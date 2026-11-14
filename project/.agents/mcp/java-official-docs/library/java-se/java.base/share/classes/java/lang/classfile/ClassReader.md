# ClassReader interface (java.lang.classfile)

```java
public sealed interface ClassReader extends ConstantPool permits ClassReaderImpl
```

Advanced {@code class} file reading support for {@link AttributeMapper}s.
Supports reading arbitrary offsets within a {@code class} file and reading
data of various numeric types (e.g., {@code u2}, {@code u4}) in addition to
constant pool access.
<p>
All numeric values in the {@code class} file format are {@linkplain
java.nio.ByteOrder#BIG_ENDIAN big endian}.
<p>
Unless otherwise specified, all out-of-bounds access result in an {@link
IllegalArgumentException} to indicate the {@code class} file data is
malformed.  Since the {@code class} file data is arbitrary, users should
sanity-check the structural integrity of the data before attempting to
interpret the potentially malformed data.

@see AttributeMapper#readAttribute(AttributedElement, ClassReader, int)
@since 24

## ClassReader.customAttributes()

```java
Function<Utf8Entry, AttributeMapper<?>> customAttributes()
```

{@return the table of custom attribute mappers}  This is derived from
the processing option {@link ClassFile.AttributeMapperOption}.

## ClassReader.flags()

```java
int flags()
```

{@return the access flags for the class, as a bit mask}

@see ClassModel#flags()

## ClassReader.thisClassEntry()

```java
ClassEntry thisClassEntry()
```

{@return the constant pool entry describing the name of class}

@see ClassModel#thisClass()

## ClassReader.superclassEntry()

```java
Optional<ClassEntry> superclassEntry()
```

{@return the constant pool entry describing the name of the superclass, if any}

@see ClassModel#superclass()

## ClassReader.classfileLength()

```java
int classfileLength()
```

{@return the length of the {@code class} file, in number of bytes}

## ClassReader.readEntry(int)

```java
PoolEntry readEntry(int offset)
```

{@return the constant pool entry whose index is given at the specified
offset within the {@code class} file}

@apiNote
If only a particular type of entry is expected, use {@link #readEntry(
int, Class) readEntry(int, Class)}.

@param offset the offset of the index within the {@code class} file
@throws ConstantPoolException if the index is out of range of the
        constant pool size, or zero

## ClassReader.readEntry(int, Class<T>)

```java
<T extends PoolEntry> T readEntry(int offset, Class<T> cls)
```

{@return the constant pool entry of a given type whose index is given
at the specified offset within the {@code class} file}
@param <T> the entry type
@param offset the offset of the index within the {@code class} file
@param cls the entry type
@throws ConstantPoolException if the index is out of range of the
        constant pool size, or zero, or the entry is not of the given type

## ClassReader.readEntryOrNull(int)

```java
PoolEntry readEntryOrNull(int offset)
```

{@return the constant pool entry whose index is given at the specified
offset within the {@code class} file, or {@code null} if the index at the
specified offset is zero}

@apiNote
If only a particular type of entry is expected, use {@link #readEntryOrNull(
int, Class) readEntryOrNull(int, Class)}.

@param offset the offset of the index within the {@code class} file
@throws ConstantPoolException if the index is out of range of the
        constant pool size

## ClassReader.readEntryOrNull(int, Class<T>)

```java
<T extends PoolEntry> T readEntryOrNull(int offset, Class<T> cls)
```

{@return the constant pool entry of a given type whose index is given
at the specified offset within the {@code class} file, or {@code null} if
the index at the specified offset is zero}

@param <T> the entry type
@param offset the offset of the index within the {@code class} file
@param cls the entry type
@throws ConstantPoolException if the index is out of range of the
        constant pool size, or zero, or the entry is not of the given type

## ClassReader.readU1(int)

```java
int readU1(int offset)
```

{@return the unsigned byte at the specified offset within the {@code
class} file}  Reads a byte and zero-extends it to an {@code int}.

@param offset the offset within the {@code class} file

## ClassReader.readU2(int)

```java
int readU2(int offset)
```

{@return the unsigned short at the specified offset within the {@code
class} file}  Reads a 2-byte value and zero-extends it to an {@code int}.

@param offset the offset within the {@code class} file

## ClassReader.readS1(int)

```java
int readS1(int offset)
```

{@return the signed byte at the specified offset within the {@code class}
file}  Reads a byte and sign-extends it to an {@code int}.

@param offset the offset within the {@code class} file

## ClassReader.readS2(int)

```java
int readS2(int offset)
```

{@return the signed byte at the specified offset within the {@code class}
file}  Reads a 2-byte value and sign-extends it to an {@code int}.

@param offset the offset within the {@code class} file

## ClassReader.readInt(int)

```java
int readInt(int offset)
```

{@return the signed int at the specified offset within the {@code class}
file}  Reads 4 bytes of value.

@param offset the offset within the {@code class} file

## ClassReader.readLong(int)

```java
long readLong(int offset)
```

{@return the signed long at the specified offset within the {@code class}
file}  Reads 8 bytes of value.

@param offset the offset within the {@code class} file

## ClassReader.readFloat(int)

```java
float readFloat(int offset)
```

{@return the float value at the specified offset within the {@code class}
file}  Reads 4 bytes of value.
<p>
In the conversions, all NaN values of the {@code float} may or may not be
collapsed into a single {@linkplain Float#NaN "canonical" NaN value}.

@param offset the offset within the {@code class} file

## ClassReader.readDouble(int)

```java
double readDouble(int offset)
```

{@return the double value at the specified offset within the {@code
class} file}  Reads 8 bytes of value.
<p>
In the conversions, all NaN values of the {@code double} may or may not
be collapsed into a single {@linkplain Double#NaN "canonical" NaN value}.

@param offset the offset within the {@code class} file

## ClassReader.readBytes(int, int)

```java
byte[] readBytes(int offset, int len)
```

{@return a copy of the bytes at the specified range in the {@code class}
file}

@param offset the offset within the {@code class} file
@param len the length of the range

## ClassReader.copyBytesTo(BufWriter, int, int)

```java
void copyBytesTo(BufWriter buf, int offset, int len)
```

Copy a range of bytes from the {@code class} file to a {@link BufWriter}.

@param buf the {@linkplain BufWriter}
@param offset the offset within the {@code class} file
@param len the length of the range