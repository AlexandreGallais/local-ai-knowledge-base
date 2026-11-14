---
title: "SequenceInputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/SequenceInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SequenceInputStream class (java.io)

```java
public class SequenceInputStream extends InputStream
```

A `SequenceInputStream` represents
the logical concatenation of other input
streams. It starts out with an ordered
collection of input streams and reads from
the first one until end of file is reached,
whereupon it reads from the second one,
and so on, until end of file is reached
on the last of the contained input streams.

**Since:** 1.0

## SequenceInputStream.SequenceInputStream(Enumeration<? extends InputStream>)

```java
public SequenceInputStream(Enumeration<? extends InputStream> e)
```

Initializes a newly created `SequenceInputStream`
by remembering the argument, which must
be an `Enumeration`  that produces
objects whose run-time type is `InputStream`.
The input streams that are  produced by
the enumeration will be read, in order,
to provide the bytes to be read  from this
`SequenceInputStream`. After
each input stream from the enumeration
is exhausted, it is closed by calling its
`close` method.

Parameters:

- `e`: an enumeration of input streams.

**See also:** java.util.Enumeration

## SequenceInputStream.SequenceInputStream(InputStream, InputStream)

```java
public SequenceInputStream(InputStream s1, InputStream s2)
```

Initializes a newly
created `SequenceInputStream`
by remembering the two arguments, which
will be read in order, first `s1`
and then `s2`, to provide the
bytes to be read from this `SequenceInputStream`.

Parameters:

- `s1`: the first input stream to read.
- `s2`: the second input stream to read.

## SequenceInputStream.available()

```java
public int available() throws IOException
```

Returns an estimate of the number of bytes that can be read (or
skipped over) from the current underlying input stream without
blocking by the next invocation of a method for the current
underlying input stream. The next invocation might be
the same thread or another thread.  A single read or skip of this
many bytes will not block, but may read or skip fewer bytes.

This method simply calls `available` of the current underlying
input stream and returns the result.

**Returns:** an estimate of the number of bytes that can be read (or
          skipped over) from the current underlying input stream
          without blocking or `0` if this input stream
          has been closed by invoking its `close()` method

**Since:** 1.1

Throws:

- `IOException`: (inherited documentation)

## SequenceInputStream.read()

```java
public int read() throws IOException
```

(inherited documentation)

This method
tries to read one byte from the current substream. If it
reaches the end of the stream, it calls the `close`
method of the current substream and begins reading from the next
substream.

**Returns:** (inherited documentation)

Throws:

- `IOException`: if an I/O error occurs.

## SequenceInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads up to `len` bytes of data from this input stream into an
array of bytes.  If the end of the last contained stream has been reached
then `-1` is returned.  Otherwise, if `len` is not zero, the
method blocks until at least 1 byte of input is available; if `len`
is zero, no bytes are read and `0` is returned.

The `read` method of `SequenceInputStream`
tries to read the data from the current substream. If it fails to
read any bytes because the substream has reached the end of
the stream, it calls the `close` method of the current
substream and begins reading from the next substream.

Parameters:

- `b`: the buffer into which the data is read.
- `off`: the start offset in array `b` at which the data is written.
- `len`: the maximum number of bytes read.

**Returns:** the total number of bytes read into the buffer, or
            `-1` if there is no more data because the end of
            the last contained stream has been reached.

Throws:

- `NullPointerException`: if the end of the last contained stream has not been reached and `b` is `null`.
- `IndexOutOfBoundsException`: if the end of the last contained stream has not been reached and `off` is negative, `len` is negative, or `len` is greater than `b.length - off`
- `IOException`: if an I/O error occurs.

## SequenceInputStream.close()

```java
public void close() throws IOException
```

(inherited documentation)
A closed `SequenceInputStream`
cannot  perform input operations and cannot
be reopened.

If this stream was created
from an enumeration, all remaining elements
are requested from the enumeration and closed
before the `close` method returns.

Throws:

- `IOException`: (inherited documentation)
