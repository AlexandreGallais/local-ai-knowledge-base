---
title: "InputStream class (java.io) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/InputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InputStream class (java.io) (part 2 of 2)

## InputStream.available()

```java
public int available() throws IOException
```

Returns an estimate of the number of bytes that can be read (or skipped
over) from this input stream without blocking, which may be 0, or 0 when
end of stream is detected.  The read might be on the same thread or
another thread.  A single read or skip of this many bytes will not block,
but may read or skip fewer bytes.

 Note that while some implementations of `InputStream` will
return the total number of bytes in the stream, many will not.  It is
never correct to use the return value of this method to allocate
a buffer intended to hold all data in this stream.

 A subclass's implementation of this method may choose to throw an
`IOException` if this input stream has been closed by invoking the
`close()` method.

**Implementation requirements:** The `available` method of `InputStream` always returns
`0`.

**API note:** This method should be overridden by subclasses.

**Returns:** an estimate of the number of bytes that can be read (or
            skipped over) from this input stream without blocking or
            `0` when it reaches the end of the input stream.

Throws:

- `IOException`: if an I/O error occurs.

## InputStream.close()

```java
public void close() throws IOException
```

Closes this input stream and releases any system resources associated
with the stream.

**Implementation requirements:** The `close` method of `InputStream` does
nothing.

Throws:

- `IOException`: if an I/O error occurs.

## InputStream.mark(int)

```java
public void mark(int readlimit)
```

Marks the current position in this input stream. A subsequent call to
the `reset` method repositions this stream at the last marked
position so that subsequent reads re-read the same bytes.

 The `readlimit` arguments tells this input stream to
allow that many bytes to be read before the mark position gets
invalidated.

 The general contract of `mark` is that, if the method
`markSupported` returns `true`, the stream somehow
remembers all the bytes read after the call to `mark` and
stands ready to supply those same bytes again if and whenever the method
`reset` is called.  However, the stream is not required to
remember any data at all if more than `readlimit` bytes are
read from the stream before `reset` is called.

 Marking a closed stream should not have any effect on the stream.

Parameters:

- `readlimit`: the maximum limit of bytes that can be read before the mark position becomes invalid.

**Implementation requirements:** The `mark` method of `InputStream` does nothing.

**See also:** java.io.InputStream#reset()

## InputStream.reset()

```java
public void reset() throws IOException
```

Repositions this stream to the position at the time the
`mark` method was last called on this input stream.

 The general contract of `reset` is:

-  If the method `markSupported` returns
`true`, then:

-  If the method `mark` has not been called since
    the stream was created, or the number of bytes read from the stream
    since `mark` was last called is larger than the argument
    to `mark` at that last call, then an
    `IOException` might be thrown.

-  If such an `IOException` is not thrown, then the
    stream is reset to a state such that all the bytes read since the
    most recent call to `mark` (or since the start of the
    file, if `mark` has not been called) will be resupplied
    to subsequent callers of the `read` method, followed by
    any bytes that otherwise would have been the next input data as of
    the time of the call to `reset`.

-  If the method `markSupported` returns
`false`, then:

-  The call to `reset` may throw an
    `IOException`.

-  If an `IOException` is not thrown, then the stream
    is reset to a fixed state that depends on the particular type of the
    input stream and how it was created. The bytes that will be supplied
    to subsequent callers of the `read` method depend on the
    particular type of the input stream.

**Implementation requirements:** The method `reset` for class `InputStream`
does nothing except throw an `IOException`.

**See also:** java.io.InputStream#mark(int)

**See also:** java.io.IOException

Throws:

- `IOException`: if this stream has not been marked or if the mark has been invalidated.

## InputStream.markSupported()

```java
public boolean markSupported()
```

Tests if this input stream supports the `mark` and
`reset` methods. Whether or not `mark` and
`reset` are supported is an invariant property of a
particular input stream instance.

**Implementation requirements:** The `markSupported` method
of `InputStream` returns `false`.

**Returns:** `true` if this stream instance supports the mark
         and reset methods; `false` otherwise.

**See also:** java.io.InputStream#mark(int)

**See also:** java.io.InputStream#reset()

## InputStream.transferTo(OutputStream)

```java
public long transferTo(OutputStream out) throws IOException
```

Reads all bytes from this input stream and writes the bytes to the
given output stream in the order that they are read. On return, this
input stream will be at end of stream. This method does not close either
stream.

This method may block indefinitely reading from the input stream, or
writing to the output stream. The behavior for the case where the input
and/or output stream is *asynchronously closed*, or the thread
interrupted during the transfer, is highly input and output stream
specific, and therefore not specified.

If the total number of bytes transferred is greater than `Long.MAX_VALUE`, then `Long.MAX_VALUE` will be returned.

If an I/O error occurs reading from the input stream or writing to the
output stream, then it may do so after some bytes have been read or
written. Consequently the input stream may not be at end of stream and
one, or both, streams may be in an inconsistent state. It is strongly
recommended that both streams be promptly closed if an I/O error occurs.

Parameters:

- `out`: the output stream, non-null

**Returns:** the number of bytes transferred

**Since:** 9

Throws:

- `IOException`: if an I/O error occurs when reading or writing
- `NullPointerException`: if `out` is `null`
