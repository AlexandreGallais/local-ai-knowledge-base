# CRC32C class (java.util.zip)

```java
public final class CRC32C implements Checksum
```

A class that can be used to compute the CRC-32C of a data stream.

<p>
CRC-32C is defined in <a href="http://www.ietf.org/rfc/rfc3720.txt">RFC
3720</a>: Internet Small Computer Systems Interface (iSCSI).
</p>

<p>
Passing a {@code null} argument to a method in this class will cause a
{@link NullPointerException} to be thrown.
</p>

@spec https://www.rfc-editor.org/info/rfc3720
     RFC 3720: Internet Small Computer Systems Interface (iSCSI)
@since 9

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

@throws ArrayIndexOutOfBoundsException
        if {@code off} is negative, or {@code len} is negative, or
        {@code off+len} is negative or greater than the length of
        the array {@code b}.

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