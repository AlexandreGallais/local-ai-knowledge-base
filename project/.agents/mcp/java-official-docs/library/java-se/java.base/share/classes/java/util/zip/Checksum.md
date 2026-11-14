# Checksum interface (java.util.zip)

```java
public interface Checksum
```

An interface representing a data checksum.

@author David Connelly
@since 1.1

## Checksum.update(int)

```java
public void update(int b)
```

Updates the current checksum with the specified byte.

@param b the byte to update the checksum with

## Checksum.update(byte[])

```java
default public void update(byte[] b)
```

Updates the current checksum with the specified array of bytes.

@implSpec This default implementation is equal to calling
{@code update(b, 0, b.length)}.

@param b the array of bytes to update the checksum with

@throws NullPointerException
        if {@code b} is {@code null}

@since 9

## Checksum.update(byte[], int, int)

```java
public void update(byte[] b, int off, int len)
```

Updates the current checksum with the specified array of bytes.

@param b the byte array to update the checksum with
@param off the start offset of the data
@param len the number of bytes to use for the update

## Checksum.update(ByteBuffer)

```java
default public void update(ByteBuffer buffer)
```

Updates the current checksum with the bytes from the specified buffer.

The checksum is updated with the remaining bytes in the buffer, starting
at the buffer's position. Upon return, the buffer's position will be
updated to its limit; its limit will not have been changed.

@apiNote For best performance with DirectByteBuffer and other ByteBuffer
implementations without a backing array implementers of this interface
should override this method.

@implSpec The default implementation has the following behavior.<br>
For ByteBuffers backed by an accessible byte array.
<pre>{@code
update(buffer.array(),
       buffer.position() + buffer.arrayOffset(),
       buffer.remaining());
}</pre>
For ByteBuffers not backed by an accessible byte array.
<pre>{@code
byte[] b = new byte[Math.min(buffer.remaining(), 4096)];
while (buffer.hasRemaining()) {
    int length = Math.min(buffer.remaining(), b.length);
    buffer.get(b, 0, length);
    update(b, 0, length);
}
}</pre>

@param buffer the ByteBuffer to update the checksum with

@throws NullPointerException
        if {@code buffer} is {@code null}

@since 9

## Checksum.getValue()

```java
public long getValue()
```

Returns the current checksum value.

@return the current checksum value

## Checksum.reset()

```java
public void reset()
```

Resets the checksum to its initial value.