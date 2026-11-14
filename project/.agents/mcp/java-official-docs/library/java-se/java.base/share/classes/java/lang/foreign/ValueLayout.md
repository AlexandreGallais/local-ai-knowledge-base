---
title: "ValueLayout interface (java.lang.foreign)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/ValueLayout.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ValueLayout interface (java.lang.foreign)

```java
public sealed interface ValueLayout extends MemoryLayout permits ValueLayout.OfBoolean, ValueLayout.OfByte, ValueLayout.OfChar, ValueLayout.OfShort, ValueLayout.OfInt, ValueLayout.OfFloat, ValueLayout.OfLong, ValueLayout.OfDouble, AddressLayout
```

A layout that models values of basic data types. Examples of values modeled by
a value layout are *integral* values (either signed or unsigned),
*floating-point* values and *address* values.

Each value layout has a size, an alignment (both expressed in bytes),
a byte order, and a *carrier*, that is, the Java type
that should be used when long) accessing a
region of memory using the value layout.

This class defines useful value layout constants for Java primitive types and
addresses.

**API note:** Some characteristics of the Java layout constants are platform-dependent.
         For instance, the byte order of these constants is set to the
         native byte order, thus making it easy
         to work with other APIs, such as arrays and `java.nio.ByteBuffer`.

**Implementation requirements:** implementing classes and subclasses are immutable, thread-safe and
value-based.

**sealedGraph:**

**Since:** 22

## ValueLayout.order()

```java
ByteOrder order()
```

## ValueLayout.withOrder(ByteOrder)

```java
ValueLayout withOrder(ByteOrder order)
```

Parameters:

- `order`: the desired byte order

## ValueLayout.withoutName()

```java
ValueLayout withoutName()
```

(inherited documentation)

## ValueLayout.carrier()

```java
Class<?> carrier()
```

## ValueLayout.withName(String)

```java
ValueLayout withName(String name)
```

(inherited documentation)

## ValueLayout.withByteAlignment(long)

```java
ValueLayout withByteAlignment(long byteAlignment)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ValueLayout.varHandle()

```java
VarHandle varHandle()
```

The returned var handle's var type is the
carrier type of this value layout, and the
list of coordinate types is `(MemorySegment, long)`, where the
memory segment coordinate corresponds to the memory segment to be accessed, and
the `long` coordinate corresponds to the byte offset into the accessed
memory segment at which the access occurs.

The returned var handle checks that accesses are aligned according to
this value layout's alignment constraint.

**API note:** This method is similar, but more efficient than calling
         `MemoryLayout#varHandle(PathElement...)` with an empty path
         element array, as it avoids the creation of the var args array.

**API note:** The returned var handle features certain
         access mode restrictions
         common to all memory access var handles derived from memory layouts.

**See also:** MemoryLayout#varHandle(PathElement...)

## ValueLayout.withName(String)

```java
OfBoolean withName(String name)
```

(inherited documentation)

## ValueLayout.withoutName()

```java
OfBoolean withoutName()
```

(inherited documentation)

## ValueLayout.withByteAlignment(long)

```java
OfBoolean withByteAlignment(long byteAlignment)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ValueLayout.withOrder(ByteOrder)

```java
OfBoolean withOrder(ByteOrder order)
```

(inherited documentation)

## ValueLayout.withName(String)

```java
OfByte withName(String name)
```

(inherited documentation)

## ValueLayout.withoutName()

```java
OfByte withoutName()
```

(inherited documentation)

## ValueLayout.withByteAlignment(long)

```java
OfByte withByteAlignment(long byteAlignment)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ValueLayout.withOrder(ByteOrder)

```java
OfByte withOrder(ByteOrder order)
```

(inherited documentation)

## ValueLayout.withName(String)

```java
OfChar withName(String name)
```

(inherited documentation)

## ValueLayout.withoutName()

```java
OfChar withoutName()
```

(inherited documentation)

## ValueLayout.withByteAlignment(long)

```java
OfChar withByteAlignment(long byteAlignment)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ValueLayout.withOrder(ByteOrder)

```java
OfChar withOrder(ByteOrder order)
```

(inherited documentation)

## ValueLayout.withName(String)

```java
OfShort withName(String name)
```

(inherited documentation)

## ValueLayout.withoutName()

```java
OfShort withoutName()
```

(inherited documentation)

## ValueLayout.withByteAlignment(long)

```java
OfShort withByteAlignment(long byteAlignment)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ValueLayout.withOrder(ByteOrder)

```java
OfShort withOrder(ByteOrder order)
```

(inherited documentation)

## ValueLayout.withName(String)

```java
OfInt withName(String name)
```

(inherited documentation)

## ValueLayout.withoutName()

```java
OfInt withoutName()
```

(inherited documentation)

## ValueLayout.withByteAlignment(long)

```java
OfInt withByteAlignment(long byteAlignment)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ValueLayout.withOrder(ByteOrder)

```java
OfInt withOrder(ByteOrder order)
```

(inherited documentation)

## ValueLayout.withName(String)

```java
OfFloat withName(String name)
```

(inherited documentation)

## ValueLayout.withoutName()

```java
OfFloat withoutName()
```

(inherited documentation)

## ValueLayout.withByteAlignment(long)

```java
OfFloat withByteAlignment(long byteAlignment)
```

(inherited documentation)

## ValueLayout.withOrder(ByteOrder)

```java
OfFloat withOrder(ByteOrder order)
```

(inherited documentation)

## ValueLayout.withName(String)

```java
OfLong withName(String name)
```

(inherited documentation)

## ValueLayout.withoutName()

```java
OfLong withoutName()
```

(inherited documentation)

## ValueLayout.withByteAlignment(long)

```java
OfLong withByteAlignment(long byteAlignment)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ValueLayout.withOrder(ByteOrder)

```java
OfLong withOrder(ByteOrder order)
```

(inherited documentation)

## ValueLayout.withName(String)

```java
OfDouble withName(String name)
```

(inherited documentation)

## ValueLayout.withoutName()

```java
OfDouble withoutName()
```

(inherited documentation)

## ValueLayout.withByteAlignment(long)

```java
OfDouble withByteAlignment(long byteAlignment)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ValueLayout.withOrder(ByteOrder)

```java
OfDouble withOrder(ByteOrder order)
```

(inherited documentation)

## ValueLayout.ADDRESS

```java
AddressLayout ADDRESS
```

An address layout constant whose size is the same as that of a
machine address (`size_t`), byte alignment set to `sizeof(size_t)`,
byte order set to `ByteOrder.nativeOrder()`.

## ValueLayout.JAVA_BYTE

```java
OfByte JAVA_BYTE
```

A value layout constant whose size is the same as that of a Java `byte`,
byte alignment set to 1, and byte order set to `ByteOrder.nativeOrder()`.

## ValueLayout.JAVA_BOOLEAN

```java
OfBoolean JAVA_BOOLEAN
```

A value layout constant whose size is the same as that of a Java `boolean`,
byte alignment set to 1, and byte order set to `ByteOrder.nativeOrder()`.

## ValueLayout.JAVA_CHAR

```java
OfChar JAVA_CHAR
```

A value layout constant whose size is the same as that of a Java `char`,
byte alignment set to 2, and byte order set to `ByteOrder.nativeOrder()`.

## ValueLayout.JAVA_SHORT

```java
OfShort JAVA_SHORT
```

A value layout constant whose size is the same as that of a Java `short`,
byte alignment set to 2, and byte order set to `ByteOrder.nativeOrder()`.

## ValueLayout.JAVA_INT

```java
OfInt JAVA_INT
```

A value layout constant whose size is the same as that of a Java `int`,
byte alignment set to 4, and byte order set to `ByteOrder.nativeOrder()`.

## ValueLayout.JAVA_LONG

```java
OfLong JAVA_LONG
```

A value layout constant whose size is the same as that of a Java `long`,
byte alignment set to 8, and byte order set to `ByteOrder.nativeOrder()`.

## ValueLayout.JAVA_FLOAT

```java
OfFloat JAVA_FLOAT
```

A value layout constant whose size is the same as that of a Java `float`,
byte alignment set to 4, and byte order set to `ByteOrder.nativeOrder()`.

## ValueLayout.JAVA_DOUBLE

```java
OfDouble JAVA_DOUBLE
```

A value layout constant whose size is the same as that of a Java `double`,
byte alignment set to 8, and byte order set to `ByteOrder.nativeOrder()`.

## ValueLayout.ADDRESS_UNALIGNED

```java
AddressLayout ADDRESS_UNALIGNED
```

An unaligned address layout constant whose size is the same as that of a
machine address (`size_t`), and byte order set to
`ByteOrder.nativeOrder()`.
Equivalent to the following code:

**API note:** Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.

## ValueLayout.JAVA_CHAR_UNALIGNED

```java
OfChar JAVA_CHAR_UNALIGNED
```

An unaligned value layout constant whose size is the same as that of a Java `char`
and byte order set to `ByteOrder.nativeOrder()`.
Equivalent to the following code:

**API note:** Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.

## ValueLayout.JAVA_SHORT_UNALIGNED

```java
OfShort JAVA_SHORT_UNALIGNED
```

An unaligned value layout constant whose size is the same as that of a Java `short`
and byte order set to `ByteOrder.nativeOrder()`.
Equivalent to the following code:

**API note:** Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.

## ValueLayout.JAVA_INT_UNALIGNED

```java
OfInt JAVA_INT_UNALIGNED
```

An unaligned value layout constant whose size is the same as that of a Java `int`
and byte order set to `ByteOrder.nativeOrder()`.
Equivalent to the following code:

**API note:** Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.

## ValueLayout.JAVA_LONG_UNALIGNED

```java
OfLong JAVA_LONG_UNALIGNED
```

An unaligned value layout constant whose size is the same as that of a Java `long`
and byte order set to `ByteOrder.nativeOrder()`.
Equivalent to the following code:

**API note:** Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.

## ValueLayout.JAVA_FLOAT_UNALIGNED

```java
OfFloat JAVA_FLOAT_UNALIGNED
```

An unaligned value layout constant whose size is the same as that of a Java `float`
and byte order set to `ByteOrder.nativeOrder()`.
Equivalent to the following code:

**API note:** Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.

## ValueLayout.JAVA_DOUBLE_UNALIGNED

```java
OfDouble JAVA_DOUBLE_UNALIGNED
```

An unaligned value layout constant whose size is the same as that of a Java `double`
and byte order set to `ByteOrder.nativeOrder()`.
Equivalent to the following code:

**API note:** Care should be taken when using unaligned value layouts as they may
         induce performance and portability issues.
