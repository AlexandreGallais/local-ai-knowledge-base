---
title: "ByteArrayInputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ByteArrayInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ByteArrayInputStream class (java.io)

```java
public class ByteArrayInputStream extends InputStream
```

A `ByteArrayInputStream` contains
an internal buffer that contains bytes that
may be read from the stream. An internal
counter keeps track of the next byte to
be supplied by the `read` method.

Closing a `ByteArrayInputStream` has no effect. The methods in
this class can be called after the stream has been closed without
generating an `IOException`.

**See also:** java.io.StringBufferInputStream

**Since:** 1.0

## ByteArrayInputStream.buf

```java
protected byte[] buf
```

An array of bytes that was provided
by the creator of the stream. Elements `buf[0]`
through `buf[count-1]` are the
only bytes that can ever be read from the
stream;  element `buf[pos]` is
the next byte to be read.

## ByteArrayInputStream.pos

```java
protected int pos
```

The index of the next byte to read from the input stream buffer.
This value should always be nonnegative
and not larger than the value of `count`.
The next byte to be read from the input stream buffer
will be `buf[pos]`.

## ByteArrayInputStream.mark

```java
protected int mark
```

The currently marked position in the stream.
ByteArrayInputStream objects are marked at position zero by
default when constructed.  They may be marked at another
position within the buffer by the `mark()` method.
The current buffer position is set to this point by the
`reset()` method.

If no mark has been set, then the value of mark is the offset
passed to the constructor (or 0 if the offset was not supplied).

**Since:** 1.1

## ByteArrayInputStream.count

```java
protected int count
```

The index one greater than the last valid byte in the input
stream buffer.
This value should always be nonnegative
and not larger than the length of `buf`.
It  is one greater than the position of
the last byte within `buf` that
can ever be read  from the input stream buffer.

## ByteArrayInputStream.ByteArrayInputStream(byte[])

```java
public ByteArrayInputStream(byte[] buf)
```

Creates a `ByteArrayInputStream`
so that it  uses `buf` as its
buffer array.
The buffer array is not copied.
The initial value of `pos`
is `0` and the initial value
of  `count` is the length of
`buf`.

Parameters:

- `buf`: the input buffer.

## ByteArrayInputStream.ByteArrayInputStream(byte[], int, int)

```java
public ByteArrayInputStream(byte[] buf, int offset, int length)
```

Creates `ByteArrayInputStream`
that uses `buf` as its
buffer array. The initial value of `pos`
is `offset` and the initial value
of `count` is the minimum of `offset+length`
and `buf.length`.
The buffer array is not copied. The buffer's mark is
set to the specified offset.

Parameters:

- `buf`: the input buffer.
- `offset`: the offset in the buffer of the first byte to read.
- `length`: the maximum number of bytes to read from the buffer.

## ByteArrayInputStream.read()

```java
public synchronized int read()
```

Reads the next byte of data from this input stream. The value
byte is returned as an `int` in the range
`0` to `255`. If no byte is available
because the end of the stream has been reached, the value
`-1` is returned.

This `read` method
cannot block.

**Returns:** (inherited documentation)

## ByteArrayInputStream.read(byte[], int, int)

```java
public synchronized int read(byte[] b, int off, int len)
```

Reads up to `len` bytes of data into an array of bytes from this
input stream.  If `pos` equals `count`, then `-1` is
returned to indicate end of file.  Otherwise, the  number `k` of
bytes read is equal to the smaller of `len` and `count-pos`.
If `k` is positive, then bytes `buf[pos]` through
`buf[pos+k-1]` are copied into `b[off]` through
`b[off+k-1]` in the manner performed by `System.arraycopy`.
The value `k` is added into `pos` and `k` is returned.

Unlike the overridden method
of `InputStream`, this method returns `-1` instead of zero
if the end of the stream has been reached and `len == 0`.

This `read` method cannot block.

Parameters:

- `b`: (inherited documentation)
- `off`: (inherited documentation)
- `len`: (inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `NullPointerException`: (inherited documentation)
- `IndexOutOfBoundsException`: (inherited documentation)

## ByteArrayInputStream.skip(long)

```java
public synchronized long skip(long n)
```

Skips `n` bytes of input from this input stream. Fewer
bytes might be skipped if the end of the input stream is reached.
The actual number `k`
of bytes to be skipped is equal to the smaller
of `n` and  `count-pos`.
The value `k` is added into `pos`
and `k` is returned.

Parameters:

- `n`: (inherited documentation)

**Returns:** the actual number of bytes skipped.

## ByteArrayInputStream.available()

```java
public synchronized int available()
```

Returns the number of remaining bytes that can be read (or skipped over)
from this input stream.

The value returned is `count - pos`,
which is the number of bytes remaining to be read from the input buffer.

**Returns:** the number of remaining bytes that can be read (or skipped
         over) from this input stream without blocking.

## ByteArrayInputStream.markSupported()

```java
public boolean markSupported()
```

Tests if this `InputStream` supports mark/reset.

**Implementation requirements:** The `markSupported` method of `ByteArrayInputStream`
always returns `true`.

**Returns:** true

**Since:** 1.1

## ByteArrayInputStream.mark(int)

```java
public void mark(int readAheadLimit)
```

Set the current marked position in the stream.
ByteArrayInputStream objects are marked at position zero by
default when constructed.  They may be marked at another
position within the buffer by this method.

If no mark has been set, then the value of the mark is the
offset passed to the constructor (or 0 if the offset was not
supplied).

 Note: The `readAheadLimit` for this class
 has no meaning.

**Since:** 1.1

## ByteArrayInputStream.reset()

```java
public synchronized void reset()
```

Resets the buffer to the marked position.  The marked position
is 0 unless another position was marked or an offset was specified
in the constructor.

## ByteArrayInputStream.close()

```java
public void close() throws IOException
```

Closing a `ByteArrayInputStream` has no effect. The methods in
this class can be called after the stream has been closed without
generating an `IOException`.
