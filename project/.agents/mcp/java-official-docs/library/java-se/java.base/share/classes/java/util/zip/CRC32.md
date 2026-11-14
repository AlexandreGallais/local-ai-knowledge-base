---
title: "CRC32 class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/CRC32.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CRC32 class (java.util.zip)

```java
public class CRC32 implements Checksum
```

A class that can be used to compute the CRC-32 of a data stream.

 Passing a `null` argument to a method in this class will cause
a `NullPointerException` to be thrown.

**Since:** 1.1

## CRC32.CRC32()

```java
public CRC32()
```

Creates a new CRC32 object.

## CRC32.update(int)

```java
public void update(int b)
```

Updates the CRC-32 checksum with the specified byte (the low
eight bits of the argument b).

## CRC32.update(byte[], int, int)

```java
public void update(byte[] b, int off, int len)
```

Updates the CRC-32 checksum with the specified array of bytes.

Throws:

- `ArrayIndexOutOfBoundsException`: if `off` is negative, or `len` is negative, or `off+len` is negative or greater than the length of the array `b`.

## CRC32.update(ByteBuffer)

```java
public void update(ByteBuffer buffer)
```

Updates the CRC-32 checksum with the bytes from the specified buffer.

The checksum is updated with the remaining bytes in the buffer, starting
at the buffer's position. Upon return, the buffer's position will be
updated to its limit; its limit will not have been changed.

**Since:** 1.8

## CRC32.reset()

```java
public void reset()
```

Resets CRC-32 to initial value.

## CRC32.getValue()

```java
public long getValue()
```

Returns CRC-32 value.
