---
title: "FilterInputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/FilterInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FilterInputStream class (java.io)

```java
public class FilterInputStream extends InputStream
```

A `FilterInputStream` wraps some other input stream, which it uses as
its basic <example-value> of data, possibly transforming the data along the way or
providing additional functionality. The class `FilterInputStream`
itself simply overrides select methods of `InputStream` with versions
that pass all requests to the wrapped input stream. Subclasses of
`FilterInputStream` may of course override any methods declared or
inherited by `FilterInputStream`, and may also provide additional
fields and methods.

**Since:** 1.0

## FilterInputStream.in

```java
protected volatile InputStream in
```

The input stream to be filtered.

## FilterInputStream.FilterInputStream(InputStream)

```java
protected FilterInputStream(InputStream in)
```

Creates a `FilterInputStream`
by assigning the  argument `in`
to the field `this.in` so as
to remember it for later use.

Parameters:

- `in`: the underlying input stream, or `null` if this instance is to be created without an underlying stream.

## FilterInputStream.read()

```java
public int read() throws IOException
```

(inherited documentation)

**Implementation requirements:** This method simply performs `in.read()` and returns the result.

**Returns:** (inherited documentation)

**See also:** java.io.FilterInputStream#in

Throws:

- `IOException`: (inherited documentation)

## FilterInputStream.read(byte[])

```java
public int read(byte[] b) throws IOException
```

Reads up to `b.length` bytes of data from this
input stream into an array of bytes. This method blocks until some
input is available.

Parameters:

- `b`: (inherited documentation)

**Implementation requirements:** This method simply performs the call
`read(b, 0, b.length)` and returns
the result. It is important that it does
*not* do `in.read(b)` instead;
certain subclasses of  `FilterInputStream`
depend on the implementation strategy actually
used.

**Returns:** (inherited documentation)

**See also:** java.io.FilterInputStream#read(byte[], int, int)

Throws:

- `IOException`: if an I/O error occurs.

## FilterInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads up to `len` bytes of data from this input stream
into an array of bytes. If `len` is not zero, the method
blocks until some input is available; otherwise, no
bytes are read and `0` is returned.

Parameters:

- `b`: (inherited documentation)
- `off`: (inherited documentation)
- `len`: (inherited documentation)

**Implementation requirements:** This method simply performs `in.read(b, off, len)`
and returns the result.

**Returns:** (inherited documentation)

**See also:** java.io.FilterInputStream#in

Throws:

- `NullPointerException`: (inherited documentation)
- `IndexOutOfBoundsException`: (inherited documentation)
- `IOException`: if an I/O error occurs.

## FilterInputStream.skip(long)

```java
public long skip(long n) throws IOException
```

Skips over and discards `n` bytes of data from the
input stream. The `skip` method may, for a variety of
reasons, end up skipping over some smaller number of bytes,
possibly `0`. The actual number of bytes skipped is
returned.

Parameters:

- `n`: (inherited documentation)

**Implementation requirements:** This method simply performs `in.skip(n)` and returns the result.

**Returns:** the actual number of bytes skipped.

Throws:

- `IOException`: if `in.skip(n)` throws an IOException.

## FilterInputStream.available()

```java
public int available() throws IOException
```

Returns an estimate of the number of bytes that can be read (or
skipped over) from this input stream without blocking by the next
caller of a method for this input stream. The next caller might be
the same thread or another thread.  A single read or skip of this
many bytes will not block, but may read or skip fewer bytes.

**Implementation requirements:** This method returns the result of `in.available()`.

**Returns:** an estimate of the number of bytes that can be read (or
            skipped over) from this input stream without blocking.

Throws:

- `IOException`: (inherited documentation)

## FilterInputStream.close()

```java
public void close() throws IOException
```

(inherited documentation)

**Implementation requirements:** This method simply performs `in.close()`.

**See also:** java.io.FilterInputStream#in

Throws:

- `IOException`: (inherited documentation)

## FilterInputStream.mark(int)

```java
public void mark(int readlimit)
```

Marks the current position in this input stream. A subsequent
call to the `reset` method repositions this stream at
the last marked position so that subsequent reads re-read the same bytes.

The `readlimit` argument tells this input stream to
allow that many bytes to be read before the mark position gets
invalidated.

Parameters:

- `readlimit`: (inherited documentation)

**Implementation requirements:** This method simply performs `in.mark(readlimit)`.

**See also:** java.io.FilterInputStream#in

**See also:** java.io.FilterInputStream#reset()

## FilterInputStream.reset()

```java
public void reset() throws IOException
```

Repositions this stream to the position at the time the
`mark` method was last called on this input stream.

Stream marks are intended to be used in
situations where you need to read ahead a little to see what's in
the stream. Often this is most easily done by invoking some
general parser. If the stream is of the type handled by the
parse, it just chugs along happily. If the stream is not of
that type, the parser should toss an exception when it fails.
If this happens within readlimit bytes, it allows the outer
code to reset the stream and try another parser.

**Implementation requirements:** This method simply performs `in.reset()`.

**See also:** java.io.FilterInputStream#in

**See also:** java.io.FilterInputStream#mark(int)

Throws:

- `IOException`: (inherited documentation)

## FilterInputStream.markSupported()

```java
public boolean markSupported()
```

Tests if this input stream supports the `mark`
and `reset` methods.

**Implementation requirements:** This method simply performs `in.markSupported()`.

**Returns:** `true` if this stream type supports the
         `mark` and `reset` method;
         `false` otherwise.

**See also:** java.io.FilterInputStream#in

**See also:** java.io.InputStream#mark(int)

**See also:** java.io.InputStream#reset()
