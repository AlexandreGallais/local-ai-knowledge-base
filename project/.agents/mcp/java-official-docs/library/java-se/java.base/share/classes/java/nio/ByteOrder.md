---
title: "ByteOrder class (java.nio)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/ByteOrder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ByteOrder class (java.nio)

```java
public final class ByteOrder
```

A typesafe enumeration for byte orders.

**Since:** 1.4

## ByteOrder.BIG_ENDIAN

```java
public static final ByteOrder BIG_ENDIAN
```

Constant denoting big-endian byte order.  In this order, the bytes of a
multibyte value are ordered from most significant to least significant.

## ByteOrder.LITTLE_ENDIAN

```java
public static final ByteOrder LITTLE_ENDIAN
```

Constant denoting little-endian byte order.  In this order, the bytes of
a multibyte value are ordered from least significant to most
significant.

## ByteOrder.nativeOrder()

```java
public static ByteOrder nativeOrder()
```

Retrieves the native byte order of the underlying platform.

 This method is defined so that performance-sensitive Java code can
allocate direct buffers with the same byte order as the hardware.
Native code libraries are often more efficient when such buffers are
used.

**Returns:** The native byte order of the hardware upon which this Java
         virtual machine is running

## ByteOrder.toString()

```java
public String toString()
```

Constructs a string describing this object.

 This method returns the string
`"BIG_ENDIAN"` for `BIG_ENDIAN` and
`"LITTLE_ENDIAN"` for `LITTLE_ENDIAN`.

**Returns:** The specified string
