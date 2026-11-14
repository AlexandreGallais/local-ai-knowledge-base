---
title: "InputStream class (java.io) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/InputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InputStream class (java.io)

```java
public abstract class InputStream implements Closeable
```

This abstract class is the superclass of all classes representing
an input stream of bytes.

 Applications that need to define a subclass of `InputStream`
must always provide a method that returns the next byte of input.

**See also:** java.io.BufferedInputStream

**See also:** java.io.ByteArrayInputStream

**See also:** java.io.DataInputStream

**See also:** java.io.FilterInputStream

**See also:** java.io.InputStream#read()

**See also:** java.io.OutputStream

**See also:** java.io.PushbackInputStream

**Since:** 1.0

## InputStream.InputStream()

```java
public InputStream()
```

Constructor for subclasses to call.

## InputStream.nullInputStream()

```java
public static InputStream nullInputStream()
```

Returns a new `InputStream` that reads no bytes. The returned
stream is initially open.  The stream is closed by calling the
`close()` method.  Subsequent calls to `close()` have no
effect.

 While the stream is open, the `available()`, `read()`,
`read(byte[])`, `read(byte[], int, int)`,
`readAllBytes()`, `readNBytes(byte[], int, int)`,
`readNBytes(int)`, `skip(long)`, `skipNBytes(long)`,
and `transferTo()` methods all behave as if end of stream has been
reached.  After the stream has been closed, these methods all throw
`IOException`.

 The `markSupported()` method returns `false`.  The
`mark()` method does nothing, and the `reset()` method
throws `IOException`.

**Returns:** an `InputStream` which contains no bytes

**Since:** 11

## InputStream.read()

```java
public abstract int read() throws IOException
```

Reads the next byte of data from the input stream. The value byte is
returned as an `int` in the range `0` to
`255`. If no byte is available because the end of the stream
has been reached, the value `-1` is returned. This method
blocks until input data is available, the end of the stream is detected,
or an exception is thrown.

**Returns:** the next byte of data, or `-1` if the end of the
            stream is reached.

Throws:

- `IOException`: if an I/O error occurs.

## InputStream.read(byte[])

```java
public int read(byte[] b) throws IOException
```

Reads some number of bytes from the input stream and stores them into
the buffer array `b`. The number of bytes actually read is
returned as an integer.  This method blocks until input data is
available, end of file is detected, or an exception is thrown.

 If the length of `b` is zero, then no bytes are read and
`0` is returned; otherwise, there is an attempt to read at
least one byte. If no byte is available because the stream is at the
end of the file, the value `-1` is returned; otherwise, at
least one byte is read and stored into `b`.

 The first byte read is stored into element `b[0]`, the
next one into `b[1]`, and so on. The number of bytes read is,
at most, equal to the length of `b`. Let *k* be the
number of bytes actually read; these bytes will be stored in elements
`b[0]` through `b[`*k*`-1]`,
leaving elements `b[`*k*`]` through
`b[b.length-1]` unaffected.

Parameters:

- `b`: the buffer into which the data is read.

**Implementation requirements:** The `read(b)` method for class `InputStream`
has the same effect as:

**Returns:** the total number of bytes read into the buffer, or
            `-1` if there is no more data because the end of
            the stream has been reached.

**See also:** java.io.InputStream#read(byte[], int, int)

Throws:

- `IOException`: If the first byte cannot be read for any reason other than the end of the file, if the input stream has been closed, or if some other I/O error occurs.
- `NullPointerException`: if `b` is `null`.

## InputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads up to `len` bytes of data from the input stream into
an array of bytes.  An attempt is made to read as many as
`len` bytes, but a smaller number may be read.
The number of bytes actually read is returned as an integer.

 This method blocks until input data is available, end of file is
detected, or an exception is thrown.

 If `len` is zero, then no bytes are read and
`0` is returned; otherwise, there is an attempt to read at
least one byte. If no byte is available because the stream is at end of
file, the value `-1` is returned; otherwise, at least one
byte is read and stored into `b`.

 The first byte read is stored into element `b[off]`, the
next one into `b[off+1]`, and so on. The number of bytes read
is, at most, equal to `len`. Let *k* be the number of
bytes actually read; these bytes will be stored in elements
`b[off]` through `b[off+`*k*`-1]`,
leaving elements `b[off+`*k*`]` through
`b[off+len-1]` unaffected.

 In every case, elements `b[0]` through
`b[off-1]` and elements `b[off+len]` through
`b[b.length-1]` are unaffected.

Parameters:

- `b`: the buffer into which the data is read.
- `off`: the start offset in array `b` at which the data is written.
- `len`: the maximum number of bytes to read.

**Implementation requirements:** The `read(b, off, len)` method
for class `InputStream` simply calls the method
`read()` repeatedly. If the first such call results in an
`IOException`, that exception is returned from the call to
the `read(b,` `off,` `len)` method.  If
any subsequent call to `read()` results in a
`IOException`, the exception is caught and treated as if it
were end of file; the bytes read up to that point are stored into
`b` and the number of bytes read before the exception
occurred is returned. The default implementation of this method blocks
until the requested amount of input data `len` has been read,
end of file is detected, or an exception is thrown. Subclasses are
encouraged to provide a more efficient implementation of this method.

**Returns:** the total number of bytes read into the buffer, or
            `-1` if there is no more data because the end of
            the stream has been reached.

**See also:** java.io.InputStream#read()

Throws:

- `IOException`: If the first byte cannot be read for any reason other than end of file, or if the input stream has been closed, or if some other I/O error occurs.
- `NullPointerException`: If `b` is `null`.
- `IndexOutOfBoundsException`: If `off` is negative, `len` is negative, or `len` is greater than `b.length - off`

## InputStream.readAllBytes()

```java
public byte[] readAllBytes() throws IOException
```

Reads all remaining bytes from the input stream. This method blocks until
all remaining bytes have been read and end of stream is detected, or an
exception is thrown. This method does not close the input stream.

 When this stream reaches end of stream, further invocations of this
method will return an empty byte array.

 Note that this method is intended for simple cases where it is
convenient to read all bytes into a byte array. It is not intended for
reading input streams with large amounts of data.

 The behavior for the case where the input stream is *asynchronously
closed*, or the thread interrupted during the read, is highly input
stream specific, and therefore not specified.

 If an I/O error occurs reading from the input stream, then it may do
so after some, but not all, bytes have been read. Consequently the input
stream may not be at end of stream and may be in an inconsistent state.
It is strongly recommended that the stream be promptly closed if an I/O
error occurs.

**Implementation requirements:** This method invokes `readNBytes(int)` with a length of
`Integer.MAX_VALUE`.

**Returns:** a byte array containing the bytes read from this input stream

**Since:** 9

Throws:

- `IOException`: if an I/O error occurs
- `OutOfMemoryError`: if an array of the required size cannot be allocated.

## InputStream.readNBytes(int)

```java
public byte[] readNBytes(int len) throws IOException
```

Reads up to a specified number of bytes from the input stream. This
method blocks until the requested number of bytes has been read, end
of stream is detected, or an exception is thrown. This method does not
close the input stream.

 The length of the returned array equals the number of bytes read
from the stream. If `len` is zero, then no bytes are read and
an empty byte array is returned. Otherwise, up to `len` bytes
are read from the stream. Fewer than `len` bytes may be read if
end of stream is encountered.

 When this stream reaches end of stream, further invocations of this
method will return an empty byte array.

 Note that this method is intended for simple cases where it is
convenient to read the specified number of bytes into a byte array. The
total amount of memory allocated by this method is proportional to the
number of bytes read from the stream which is bounded by `len`.
Therefore, the method may be safely called with very large values of
`len` provided sufficient memory is available.

 The behavior for the case where the input stream is *asynchronously
closed*, or the thread interrupted during the read, is highly input
stream specific, and therefore not specified.

 If an I/O error occurs reading from the input stream, then it may do
so after some, but not all, bytes have been read. Consequently the input
stream may not be at end of stream and may be in an inconsistent state.
It is strongly recommended that the stream be promptly closed if an I/O
error occurs.

Parameters:

- `len`: the maximum number of bytes to read

**Implementation note:** The number of bytes allocated to read data from this stream and return
the result is bounded by `2*(long)len`, inclusive.

**Returns:** a byte array containing the bytes read from this input stream

**Since:** 11

Throws:

- `IllegalArgumentException`: if `length` is negative
- `IOException`: if an I/O error occurs
- `OutOfMemoryError`: if an array of the required size cannot be allocated.

## InputStream.readNBytes(byte[], int, int)

```java
public int readNBytes(byte[] b, int off, int len) throws IOException
```

Reads the requested number of bytes from the input stream into the given
byte array. This method blocks until `len` bytes of input data have
been read, end of stream is detected, or an exception is thrown. The
number of bytes actually read, possibly zero, is returned. This method
does not close the input stream.

 In the case where end of stream is reached before `len` bytes
have been read, then the actual number of bytes read will be returned.
When this stream reaches end of stream, further invocations of this
method will return zero.

 If `len` is zero, then no bytes are read and `0` is
returned; otherwise, there is an attempt to read up to `len` bytes.

 The first byte read is stored into element `b[off]`, the next
one in to `b[off+1]`, and so on. The number of bytes read is, at
most, equal to `len`. Let *k* be the number of bytes actually
read; these bytes will be stored in elements `b[off]` through
`b[off+`*k*`-1]`, leaving elements `b[off+`*k*
`]` through `b[off+len-1]` unaffected.

 The behavior for the case where the input stream is *asynchronously
closed*, or the thread interrupted during the read, is highly input
stream specific, and therefore not specified.

 If an I/O error occurs reading from the input stream, then it may do
so after some, but not all, bytes of `b` have been updated with
data from the input stream. Consequently the input stream and `b`
may be in an inconsistent state. It is strongly recommended that the
stream be promptly closed if an I/O error occurs.

Parameters:

- `b`: the byte array into which the data is read
- `off`: the start offset in `b` at which the data is written
- `len`: the maximum number of bytes to read

**Returns:** the actual number of bytes read into the buffer

**Since:** 9

Throws:

- `IOException`: if an I/O error occurs
- `NullPointerException`: if `b` is `null`
- `IndexOutOfBoundsException`: If `off` is negative, `len` is negative, or `len` is greater than `b.length - off`

## InputStream.skip(long)

```java
public long skip(long n) throws IOException
```

Skips over and discards `n` bytes of data from this input
stream. The `skip` method may, for a variety of reasons, end
up skipping over some smaller number of bytes, possibly `0`.
This may result from any of a number of conditions; reaching end of file
before `n` bytes have been skipped is only one possibility.
The actual number of bytes skipped is returned. If `n` is
negative, the `skip` method for class `InputStream` always
returns 0, and no bytes are skipped. Subclasses may handle the negative
value differently.

Parameters:

- `n`: the number of bytes to be skipped.

**Implementation requirements:** The `skip` method implementation of this class creates a
byte array and then repeatedly reads into it until `n` bytes
have been read or the end of the stream has been reached. Subclasses are
encouraged to provide a more efficient implementation of this method.
For instance, the implementation may depend on the ability to seek.

**Returns:** the actual number of bytes skipped which might be zero.

**See also:** java.io.InputStream#skipNBytes(long)

Throws:

- `IOException`: if an I/O error occurs.

## InputStream.skipNBytes(long)

```java
public void skipNBytes(long n) throws IOException
```

Skips over and discards exactly `n` bytes of data from this input
stream.  If `n` is zero, then no bytes are skipped.
If `n` is negative, then no bytes are skipped.
Subclasses may handle the negative value differently.

 This method blocks until the requested number of bytes has been
skipped, end of file is reached, or an exception is thrown.

 If end of stream is reached before the stream is at the desired
position, then an `EOFException` is thrown.

 If an I/O error occurs, then the input stream may be
in an inconsistent state. It is strongly recommended that the
stream be promptly closed if an I/O error occurs.

Parameters:

- `n`: the number of bytes to be skipped.

**Implementation note:** Subclasses are encouraged to provide a more efficient implementation
of this method.

**Implementation requirements:** If `n` is zero or negative, then no bytes are skipped.
If `n` is positive, the default implementation of this method
invokes skip() repeatedly with its parameter equal
to the remaining number of bytes to skip until the requested number
of bytes has been skipped or an error condition occurs.  If at any
point the return value of `skip()` is negative or greater than the
remaining number of bytes to be skipped, then an `IOException` is
thrown.  If `skip()` ever returns zero, then `read()` is
invoked to read a single byte, and if it returns `-1`, then an
`EOFException` is thrown.  Any exception thrown by `skip()`
or `read()` will be propagated.

**See also:** java.io.InputStream#skip(long)

**Since:** 12

Throws:

- `EOFException`: if end of stream is encountered before the stream can be positioned `n` bytes beyond its position when this method was invoked.
- `IOException`: if the stream cannot be positioned properly or if an I/O error occurs.
