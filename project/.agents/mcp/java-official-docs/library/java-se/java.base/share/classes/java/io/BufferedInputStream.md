---
title: "BufferedInputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/BufferedInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BufferedInputStream class (java.io)

```java
public class BufferedInputStream extends FilterInputStream
```

A `BufferedInputStream` adds
functionality to another input stream-namely,
the ability to buffer the input and to
support the `mark` and `reset`
methods. When  the `BufferedInputStream`
is created, an internal buffer array is
created. As bytes  from the stream are read
or skipped, the internal buffer is refilled
as necessary  from the contained input stream,
many bytes at a time. The `mark`
operation  remembers a point in the input
stream and the `reset` operation
causes all the  bytes read since the most
recent `mark` operation to be
reread before new bytes are  taken from
the contained input stream.

**API note:** Once wrapped in a `BufferedInputStream`, the underlying
`InputStream` should not be used directly nor wrapped with
another stream.

**Since:** 1.0

## BufferedInputStream.close(), which is necessary since * closes can be asynchronous. We use nullness of buf[] as primary * indicator that this stream is closed. (The "in" field is also * nulled out on close.)

```java
/* * We null this out with a CAS on close(), which is necessary since * closes can be asynchronous. We use nullness of buf[] as primary * indicator that this stream is closed. (The "in" field is also * nulled out on close.) */ protected volatile byte[] buf
```

The internal buffer array where the data is stored. When necessary,
it may be replaced by another array of
a different size.

## BufferedInputStream.count

```java
protected int count
```

The index one greater than the index of the last valid byte in
the buffer.
This value is always
in the range `0` through `buf.length`;
elements `buf[0]` through `buf[count-1]`
contain buffered input data obtained
from the underlying  input stream.

## BufferedInputStream.pos

```java
protected int pos
```

The current position in the buffer. This is the index of the next
byte to be read from the `buf` array.

This value is always in the range `0`
through `count`. If it is less
than `count`, then  `buf[pos]`
is the next byte to be supplied as input;
if it is equal to `count`, then
the  next `read` or `skip`
operation will require more bytes to be
read from the contained  input stream.

**See also:** java.io.BufferedInputStream#buf

## BufferedInputStream.markpos

```java
protected int markpos
```

The value of the `pos` field at the time the last
`mark` method was called.

This value is always
in the range `-1` through `pos`.
If there is no marked position in  the input
stream, this field is `-1`. If
there is a marked position in the input
stream,  then `buf[markpos]`
is the first byte to be supplied as input
after a `reset` operation. If
`markpos` is not `-1`,
then all bytes from positions `buf[markpos]`
through  `buf[pos-1]` must remain
in the buffer array (though they may be
moved to  another place in the buffer array,
with suitable adjustments to the values
of `count`,  `pos`,
and `markpos`); they may not
be discarded unless and until the difference
between `pos` and `markpos`
exceeds `marklimit`.

**See also:** java.io.BufferedInputStream#mark(int)

**See also:** java.io.BufferedInputStream#pos

## BufferedInputStream.marklimit

```java
protected int marklimit
```

The maximum read ahead allowed after a call to the
`mark` method before subsequent calls to the
`reset` method fail.
Whenever the difference between `pos`
and `markpos` exceeds `marklimit`,
then the  mark may be dropped by setting
`markpos` to `-1`.

**See also:** java.io.BufferedInputStream#mark(int)

**See also:** java.io.BufferedInputStream#reset()

## BufferedInputStream.BufferedInputStream(InputStream)

```java
public BufferedInputStream(InputStream in)
```

Creates a `BufferedInputStream`
and saves its  argument, the input stream
`in`, for later use. An internal
buffer array is created and  stored in `buf`.

Parameters:

- `in`: the underlying input stream.

## BufferedInputStream.BufferedInputStream(InputStream, int)

```java
public BufferedInputStream(InputStream in, int size)
```

Creates a `BufferedInputStream`
with the specified buffer size,
and saves its  argument, the input stream
`in`, for later use.  An internal
buffer array of length  `size`
is created and stored in `buf`.

Parameters:

- `in`: the underlying input stream.
- `size`: the buffer size.

Throws:

- `IllegalArgumentException`: if `size <= 0`.

## BufferedInputStream.read()

```java
public synchronized int read() throws IOException
```

See
the general contract of the `read`
method of `InputStream`.

**Returns:** the next byte of data, or `-1` if the end of the
            stream is reached.

**See also:** java.io.FilterInputStream#in

Throws:

- `IOException`: if this input stream has been closed by invoking its `close()` method, or an I/O error occurs.

## BufferedInputStream.read(byte[], int, int)

```java
public synchronized int read(byte[] b, int off, int len) throws IOException
```

Reads bytes from this byte-input stream into the specified byte array,
starting at the given offset.

 This method implements the general contract of the corresponding
int, int) read method of
the `InputStream` class.  As an additional
convenience, it attempts to read as many bytes as possible by repeatedly
invoking the `read` method of the underlying stream.  This
iterated `read` continues until one of the following
conditions becomes true:

-  The specified number of bytes have been read,

-  The `read` method of the underlying stream returns
  `-1`, indicating end-of-file, or

-  The `available` method of the underlying stream
  returns zero, indicating that further input requests would block.

 If the first `read` on the underlying stream returns
`-1` to indicate end-of-file then this method returns
`-1`.  Otherwise, this method returns the number of bytes
actually read.

 Subclasses of this class are encouraged, but not required, to
attempt to read as many bytes as possible in the same fashion.

Parameters:

- `b`: destination buffer.
- `off`: offset at which to start storing bytes.
- `len`: maximum number of bytes to read.

**Returns:** the number of bytes read, or `-1` if the end of
            the stream has been reached.

Throws:

- `IOException`: if this input stream has been closed by invoking its `close()` method, or an I/O error occurs.
- `IndexOutOfBoundsException`: (inherited documentation)

## BufferedInputStream.skip(long)

```java
public synchronized long skip(long n) throws IOException
```

See the general contract of the `skip`
method of `InputStream`.

Throws:

- `IOException`: if this input stream has been closed by invoking its `close()` method, `in.skip(n)` throws an IOException, or an I/O error occurs.

## BufferedInputStream.available()

```java
public synchronized int available() throws IOException
```

Returns an estimate of the number of bytes that can be read (or
skipped over) from this input stream without blocking by the next
invocation of a method for this input stream. The next invocation might be
the same thread or another thread.  A single read or skip of this
many bytes will not block, but may read or skip fewer bytes.

This method returns the sum of the number of bytes remaining to be read in
the buffer (`count - pos`) and the result of calling the
in`.available()`.

**Returns:** an estimate of the number of bytes that can be read (or skipped
            over) from this input stream without blocking.

Throws:

- `IOException`: if this input stream has been closed by invoking its `close()` method, or an I/O error occurs.

## BufferedInputStream.mark(int)

```java
public synchronized void mark(int readlimit)
```

See the general contract of the `mark`
method of `InputStream`.

Parameters:

- `readlimit`: the maximum limit of bytes that can be read before the mark position becomes invalid.

**See also:** java.io.BufferedInputStream#reset()

## BufferedInputStream.reset()

```java
public synchronized void reset() throws IOException
```

See the general contract of the `reset`
method of `InputStream`.

If `markpos` is `-1`
(no mark has been set or the mark has been
invalidated), an `IOException`
is thrown. Otherwise, `pos` is
set equal to `markpos`.

**See also:** java.io.BufferedInputStream#mark(int)

Throws:

- `IOException`: if this stream has not been marked or, if the mark has been invalidated, or the stream has been closed by invoking its `close()` method, or an I/O error occurs.

## BufferedInputStream.markSupported()

```java
public boolean markSupported()
```

Tests if this input stream supports the `mark`
and `reset` methods. The `markSupported`
method of `BufferedInputStream` returns
`true`.

**Returns:** a `boolean` indicating if this stream type supports
         the `mark` and `reset` methods.

**See also:** java.io.InputStream#mark(int)

**See also:** java.io.InputStream#reset()

## BufferedInputStream.close()

```java
public void close() throws IOException
```

Closes this input stream and releases any system resources
associated with the stream.
Once the stream has been closed, further read(), available(), reset(),
or skip() invocations will throw an IOException.
Closing a previously closed stream has no effect.

Throws:

- `IOException`: if an I/O error occurs.
