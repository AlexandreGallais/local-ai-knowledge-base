---
title: "Checksum interface (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/Checksum.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Checksum interface (java.util.zip)

```java
public interface Checksum
```

An interface representing a data checksum.

**Since:** 1.1

## Checksum.update(int)

```java
public void update(int b)
```

Updates the current checksum with the specified byte.

Parameters:

- `b`: the byte to update the checksum with

## Checksum.update(byte[])

```java
default public void update(byte[] b)
```

Updates the current checksum with the specified array of bytes.

Parameters:

- `b`: the array of bytes to update the checksum with

**Implementation requirements:** This default implementation is equal to calling
`update(b, 0, b.length)`.

**Since:** 9

Throws:

- `NullPointerException`: if `b` is `null`

## Checksum.update(byte[], int, int)

```java
public void update(byte[] b, int off, int len)
```

Updates the current checksum with the specified array of bytes.

Parameters:

- `b`: the byte array to update the checksum with
- `off`: the start offset of the data
- `len`: the number of bytes to use for the update

## Checksum.update(ByteBuffer)

```java
default public void update(ByteBuffer buffer)
```

Updates the current checksum with the bytes from the specified buffer.

The checksum is updated with the remaining bytes in the buffer, starting
at the buffer's position. Upon return, the buffer's position will be
updated to its limit; its limit will not have been changed.

Parameters:

- `buffer`: the ByteBuffer to update the checksum with

**API note:** For best performance with DirectByteBuffer and other ByteBuffer
implementations without a backing array implementers of this interface
should override this method.

**Implementation requirements:** The default implementation has the following behavior.

For ByteBuffers backed by an accessible byte array.

```java
update(buffer.array(),
       buffer.position() + buffer.arrayOffset(),
       buffer.remaining());
```

For ByteBuffers not backed by an accessible byte array.

```java
byte[] b = new byte[Math.min(buffer.remaining(), 4096)];
while (buffer.hasRemaining()) {
    int length = Math.min(buffer.remaining(), b.length);
    buffer.get(b, 0, length);
    update(b, 0, length);
}
```

**Since:** 9

Throws:

- `NullPointerException`: if `buffer` is `null`

## Checksum.getValue()

```java
public long getValue()
```

Returns the current checksum value.

**Returns:** the current checksum value

## Checksum.reset()

```java
public void reset()
```

Resets the checksum to its initial value.
