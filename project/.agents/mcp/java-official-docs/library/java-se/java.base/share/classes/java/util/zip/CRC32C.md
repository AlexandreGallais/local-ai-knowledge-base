---
title: "CRC32C class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/CRC32C.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CRC32C class (java.util.zip)

```java
public final class CRC32C implements Checksum
```

A class that can be used to compute the CRC-32C of a data stream.

CRC-32C is defined in RFC
3720: Internet Small Computer Systems Interface (iSCSI).

Passing a `null` argument to a method in this class will cause a
`NullPointerException` to be thrown.

**Since:** 9

## CRC32C.CRC32C()

```java
public CRC32C()
```

Creates a new CRC32C object.

## CRC32C.update(int)

```java
public void update(int b)
```

Updates the CRC-32C checksum with the specified byte (the low eight bits
of the argument b).

## CRC32C.update(byte[], int, int)

```java
public void update(byte[] b, int off, int len)
```

Updates the CRC-32C checksum with the specified array of bytes.

Throws:

- `ArrayIndexOutOfBoundsException`: if `off` is negative, or `len` is negative, or `off+len` is negative or greater than the length of the array `b`.

## CRC32C.update(ByteBuffer)

```java
public void update(ByteBuffer buffer)
```

Updates the CRC-32C checksum with the bytes from the specified buffer.

The checksum is updated with the remaining bytes in the buffer, starting
at the buffer's position. Upon return, the buffer's position will be
updated to its limit; its limit will not have been changed.

## CRC32C.reset()

```java
public void reset()
```

Resets CRC-32C to initial value.

## CRC32C.getValue()

```java
public long getValue()
```

Returns CRC-32C value.
