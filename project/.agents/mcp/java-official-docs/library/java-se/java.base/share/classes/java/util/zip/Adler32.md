---
title: "Adler32 class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/Adler32.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Adler32 class (java.util.zip)

```java
public class Adler32 implements Checksum
```

A class that can be used to compute the Adler-32 checksum of a data
stream. An Adler-32 checksum is almost as reliable as a CRC-32 but
can be computed much faster.

 Passing a `null` argument to a method in this class will cause
a `NullPointerException` to be thrown.

**Since:** 1.1

## Adler32.Adler32()

```java
public Adler32()
```

Creates a new Adler32 object.

## Adler32.update(int)

```java
public void update(int b)
```

Updates the checksum with the specified byte (the low eight
bits of the argument b).

## Adler32.update(byte[], int, int)

```java
public void update(byte[] b, int off, int len)
```

Updates the checksum with the specified array of bytes.

Throws:

- `ArrayIndexOutOfBoundsException`: if `off` is negative, or `len` is negative, or `off+len` is negative or greater than the length of the array `b`.

## Adler32.update(ByteBuffer)

```java
public void update(ByteBuffer buffer)
```

Updates the checksum with the bytes from the specified buffer.

The checksum is updated with the remaining bytes in the buffer, starting
at the buffer's position. Upon return, the buffer's position will be
updated to its limit; its limit will not have been changed.

**Since:** 1.8

## Adler32.reset()

```java
public void reset()
```

Resets the checksum to initial value.

## Adler32.getValue()

```java
public long getValue()
```

Returns the checksum value.
