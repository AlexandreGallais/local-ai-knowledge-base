# Adler32 class (java.util.zip)

```java
public class Adler32 implements Checksum
```

A class that can be used to compute the Adler-32 checksum of a data
stream. An Adler-32 checksum is almost as reliable as a CRC-32 but
can be computed much faster.

<p> Passing a {@code null} argument to a method in this class will cause
a {@link NullPointerException} to be thrown.</p>

@author      David Connelly
@since 1.1

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

@throws ArrayIndexOutOfBoundsException
        if {@code off} is negative, or {@code len} is negative, or
        {@code off+len} is negative or greater than the length of
        the array {@code b}.

## Adler32.update(ByteBuffer)

```java
public void update(ByteBuffer buffer)
```

Updates the checksum with the bytes from the specified buffer.

The checksum is updated with the remaining bytes in the buffer, starting
at the buffer's position. Upon return, the buffer's position will be
updated to its limit; its limit will not have been changed.

@since 1.8

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