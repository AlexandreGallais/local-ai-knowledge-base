# ValueLayout interface (java.lang.foreign)

```java
public sealed interface ValueLayout extends MemoryLayout permits ValueLayout.OfBoolean, ValueLayout.OfByte, ValueLayout.OfChar, ValueLayout.OfShort, ValueLayout.OfInt, ValueLayout.OfFloat, ValueLayout.OfLong, ValueLayout.OfDouble, AddressLayout
```

A layout that models values of basic data types. Examples of values modeled by
a value layout are <em>integral</em> values (either signed or unsigned),
<em>floating-point</em> values and <em>address</em> values.
<p>
Each value layout has a size, an alignment (both expressed in bytes),
a {@linkplain ByteOrder byte order}, and a <em>carrier</em>, that is, the Java type
that should be used when {@linkplain MemorySegment#get(OfInt, long) accessing} a
region of memory using the value layout.
<p>

This class defines useful value layout constants for Java primitive types and
addresses.

@apiNote Some characteristics of the Java layout constants are platform-dependent.
         For instance, the byte order of these constants is set to the
         {@linkplain ByteOrder#nativeOrder() native byte order}, thus making it easy
         to work with other APIs, such as arrays and {@link java.nio.ByteBuffer}.

@implSpec implementing classes and subclasses are immutable, thread-safe and
<a href="{@docRoot}/java.base/java/lang/doc-files/ValueBased.html">value-based</a>.

@sealedGraph
@since 22

## ValueLayout.order()

```java
ByteOrder order()
```

{@return the value's byte order}

## ValueLayout.withOrder(ByteOrder)

```java
ValueLayout withOrder(ByteOrder order)
```

{@return a value layout with the same characteristics as this layout, but with the given byte order}

@param order the desired byte order

## ValueLayout.withoutName()

```java
ValueLayout withoutName()
```

{@inheritDoc}

## ValueLayout.carrier()

```java
Class<?> carrier()
```

{@return the carrier associated with this value layout}

## ValueLayout.withName(String)

```java
ValueLayout withName(String name)
```

{@inheritDoc}

## ValueLayout.withByteAlignment(long)

```java
ValueLayout withByteAlignment(long byteAlignment)
```

{@inheritDoc}

@throws IllegalArgumentException {@inheritDoc}

## ValueLayout.varHandle()

```java
VarHandle varHandle()
```

{@return a var handle which can be used to access values described by this value
         layout, in a given memory segment}
<p>
The returned var handle's {@linkplain VarHandle#varType() var type} is the
{@linkplain ValueLayout#carrier() carrier type} of this value layout, and the
list of coordinate types is {@code (MemorySegment, long)}, where the
memory segment coordinate corresponds to the memory segment to be accessed, and
the {@code long} coordinate corresponds to the byte offset into the accessed
memory segment at which the access occurs.
<p>
The returned var handle checks that accesses are aligned according to
this value layout's {@linkplain MemoryLayout#byteAlignment() alignment constraint}.

@apiNote This method is similar, but more efficient than calling
         {@code MemoryLayout#varHandle(PathElement...)} with an empty path
         element array, as it avoids the creation of the var args array.

@apiNote The returned var handle features certain
         <a href="MemoryLayout.html#access-mode-restrictions">access mode restrictions</a>
         common to all memory access var handles derived from memory layouts.

@see MemoryLayout#varHandle(PathElement...)

## ValueLayout.withName(String)

```java
OfBoolean withName(String name)
```

{@inheritDoc}

## ValueLayout.withoutName()

```java
OfBoolean withoutName()
```

{@inheritDoc}

## ValueLayout.withByteAlignment(long)

```java
OfBoolean withByteAlignment(long byteAlignment)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## ValueLayout.withOrder(ByteOrder)

```java
OfBoolean withOrder(ByteOrder order)
```

{@inheritDoc}

## ValueLayout.withName(String)

```java
OfByte withName(String name)
```

{@inheritDoc}

## ValueLayout.withoutName()

```java
OfByte withoutName()
```

{@inheritDoc}

## ValueLayout.withByteAlignment(long)

```java
OfByte withByteAlignment(long byteAlignment)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## ValueLayout.withOrder(ByteOrder)

```java
OfByte withOrder(ByteOrder order)
```

{@inheritDoc}

## ValueLayout.withName(String)

```java
OfChar withName(String name)
```

{@inheritDoc}

## ValueLayout.withoutName()

```java
OfChar withoutName()
```

{@inheritDoc}

## ValueLayout.withByteAlignment(long)

```java
OfChar withByteAlignment(long byteAlignment)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## ValueLayout.withOrder(ByteOrder)

```java
OfChar withOrder(ByteOrder order)
```

{@inheritDoc}

## ValueLayout.withName(String)

```java
OfShort withName(String name)
```

{@inheritDoc}

## ValueLayout.withoutName()

```java
OfShort withoutName()
```

{@inheritDoc}

## ValueLayout.withByteAlignment(long)

```java
OfShort withByteAlignment(long byteAlignment)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## ValueLayout.withOrder(ByteOrder)

```java
OfShort withOrder(ByteOrder order)
```

{@inheritDoc}

## ValueLayout.withName(String)

```java
OfInt withName(String name)
```

{@inheritDoc}

## ValueLayout.withoutName()

```java
OfInt withoutName()
```

{@inheritDoc}

## ValueLayout.withByteAlignment(long)

```java
OfInt withByteAlignment(long byteAlignment)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## ValueLayout.withOrder(ByteOrder)

```java
OfInt withOrder(ByteOrder order)
```

{@inheritDoc}

## ValueLayout.withName(String)

```java
OfFloat withName(String name)
```

{@inheritDoc}

## ValueLayout.withoutName()

```java
OfFloat withoutName()
```

{@inheritDoc}

## ValueLayout.withByteAlignment(long)

```java
OfFloat withByteAlignment(long byteAlignment)
```

{@inheritDoc}

## ValueLayout.withOrder(ByteOrder)

```java
OfFloat withOrder(ByteOrder order)
```

{@inheritDoc}

## ValueLayout.withName(String)

```java
OfLong withName(String name)
```

{@inheritDoc}

## ValueLayout.withoutName()

```java
OfLong withoutName()
```

{@inheritDoc}

## ValueLayout.withByteAlignment(long)

```java
OfLong withByteAlignment(long byteAlignment)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## ValueLayout.withOrder(ByteOrder)

```java
OfLong withOrder(ByteOrder order)
```

{@inheritDoc}

## ValueLayout.withName(String)

```java
OfDouble withName(String name)
```

{@inheritDoc}

## ValueLayout.withoutName()

```java
OfDouble withoutName()
```

{@inheritDoc}

## ValueLayout.withByteAlignment(long)

```java
OfDouble withByteAlignment(long byteAlignment)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## ValueLayout.withOrder(ByteOrder)

```java
OfDouble withOrder(ByteOrder order)
```

{@inheritDoc}

## ValueLayout.ADDRESS

```java
AddressLayout ADDRESS
```

An address layout constant whose size is the same as that of a
machine address ({@code size_t}), byte alignment set to {@code sizeof(size_t)},
byte order set to {@link ByteOrder#nativeOrder()}.

## ValueLayout.JAVA_BYTE

```java
OfByte JAVA_BYTE
```

A value layout constant whose size is the same as that of a Java {@code byte},
byte alignment set to 1, and byte order set to {@link ByteOrder#nativeOrder()}.

## ValueLayout.JAVA_BOOLEAN

```java
OfBoolean JAVA_BOOLEAN
```

A value layout constant whose size is the same as that of a Java {@code boolean},
byte alignment set to 1, and byte order set to {@link ByteOrder#nativeOrder()}.

## ValueLayout.JAVA_CHAR

```java
OfChar JAVA_CHAR
```

A value layout constant whose size is the same as that of a Java {@code char},
byte alignment set to 2, and byte order set to {@link ByteOrder#nativeOrder()}.

## ValueLayout.JAVA_SHORT

```java
OfShort JAVA_SHORT
```

A value layout constant whose size is the same as that of a Java {@code short},
byte alignment set to 2, and byte order set to {@link ByteOrder#nativeOrder()}.

## ValueLayout.JAVA_INT

```java
OfInt JAVA_INT
```

A value layout constant whose size is the same as that of a Java {@code int},
byte alignment set to 4, and byte order set to {@link ByteOrder#nativeOrder()}.

## ValueLayout.JAVA_LONG

```java
OfLong JAVA_LONG
```

A value layout constant whose size is the same as that of a Java {@code long},
byte alignment set to 8, and byte order set to {@link ByteOrder#nativeOrder()}.

## ValueLayout.JAVA_FLOAT

```java
OfFloat JAVA_FLOAT
```

A value layout constant whose size is the same as that of a Java {@code float},
byte alignment set to 4, and byte order set to {@link ByteOrder#nativeOrder()}.

## ValueLayout.JAVA_DOUBLE

```java
OfDouble JAVA_DOUBLE
```

A value layout constant whose size is the same as that of a Java {@code double},
byte alignment set to 8, and byte order set to {@link ByteOrder#nativeOrder()}.

## ValueLayout.ADDRESS_UNALIGNED

```java
AddressLayout ADDRESS_UNALIGNED
```

An unaligned address layout constant whose size is the same as that of a
machine address ({@code size_t}), and byte order set to
{@link ByteOrder#nativeOrder()}.
Equivalent to the following code:
{@snippet lang=java :
ADDRESS.withByteAlignment(1);
}
@apiNote Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.

## ValueLayout.JAVA_CHAR_UNALIGNED

```java
OfChar JAVA_CHAR_UNALIGNED
```

An unaligned value layout constant whose size is the same as that of a Java {@code char}
and byte order set to {@link ByteOrder#nativeOrder()}.
Equivalent to the following code:
{@snippet lang=java :
JAVA_CHAR.withByteAlignment(1);
}
@apiNote Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.

## ValueLayout.JAVA_SHORT_UNALIGNED

```java
OfShort JAVA_SHORT_UNALIGNED
```

An unaligned value layout constant whose size is the same as that of a Java {@code short}
and byte order set to {@link ByteOrder#nativeOrder()}.
Equivalent to the following code:
{@snippet lang=java :
JAVA_SHORT.withByteAlignment(1);
}
@apiNote Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.

## ValueLayout.JAVA_INT_UNALIGNED

```java
OfInt JAVA_INT_UNALIGNED
```

An unaligned value layout constant whose size is the same as that of a Java {@code int}
and byte order set to {@link ByteOrder#nativeOrder()}.
Equivalent to the following code:
{@snippet lang=java :
JAVA_INT.withByteAlignment(1);
}
@apiNote Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.

## ValueLayout.JAVA_LONG_UNALIGNED

```java
OfLong JAVA_LONG_UNALIGNED
```

An unaligned value layout constant whose size is the same as that of a Java {@code long}
and byte order set to {@link ByteOrder#nativeOrder()}.
Equivalent to the following code:
{@snippet lang=java :
JAVA_LONG.withByteAlignment(1);
}
@apiNote Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.

## ValueLayout.JAVA_FLOAT_UNALIGNED

```java
OfFloat JAVA_FLOAT_UNALIGNED
```

An unaligned value layout constant whose size is the same as that of a Java {@code float}
and byte order set to {@link ByteOrder#nativeOrder()}.
Equivalent to the following code:
{@snippet lang=java :
JAVA_FLOAT.withByteAlignment(1);
}
@apiNote Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.

## ValueLayout.JAVA_DOUBLE_UNALIGNED

```java
OfDouble JAVA_DOUBLE_UNALIGNED
```

An unaligned value layout constant whose size is the same as that of a Java {@code double}
and byte order set to {@link ByteOrder#nativeOrder()}.
Equivalent to the following code:
{@snippet lang=java :
JAVA_DOUBLE.withByteAlignment(1);
}
@apiNote Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.