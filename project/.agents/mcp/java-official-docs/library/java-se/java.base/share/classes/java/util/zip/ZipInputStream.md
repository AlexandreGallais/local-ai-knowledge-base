---
title: "ZipInputStream class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/ZipInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ZipInputStream class (java.util.zip)

```java
public class ZipInputStream extends InflaterInputStream implements ZipConstants
```

An input stream for reading compressed and uncompressed
ZIP file entries from a stream of bytes in the ZIP file
format.

 Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

#### Reading Zip File Entries

The `getNextEntry()` method is used to read the next ZIP file entry
(Local file (LOC) header record in the ZIP format) and position the stream at
the entry's file data. The file data may read using one of the
`ZipInputStream` read methods such
as int, int) read or readAllBytes().
For example:

**API note:** The LOC header contains metadata about the ZIP file entry. `ZipInputStream`
does not read the Central directory (CEN) header for the entry and therefore
will not have access to its metadata such as the external file attributes.
`ZipFile` may be used when the information stored within
the CEN header is required.

**Since:** 1.1

## ZipInputStream.ZipInputStream(InputStream)

```java
public ZipInputStream(InputStream in)
```

Creates a new ZIP input stream.

The UTF-8 charset is used to
decode the entry names.

Parameters:

- `in`: the actual input stream

## ZipInputStream.ZipInputStream(InputStream, Charset)

```java
public ZipInputStream(InputStream in, Charset charset)
```

Creates a new ZIP input stream.

Parameters:

- `in`: the actual input stream
- `charset`: The charset to be used to decode the ZIP entry name (ignored if the  language encoding bit of the ZIP entry's general purpose bit flag is set).

**Since:** 1.7

## ZipInputStream.getNextEntry()

```java
public ZipEntry getNextEntry() throws IOException
```

Reads the next ZIP file entry and positions the stream at the
beginning of the entry data.

**Returns:** the next ZIP file entry, or null if there are no more entries

Throws:

- `ZipException`: if a ZIP file error has occurred
- `IOException`: if an I/O error has occurred

## ZipInputStream.closeEntry()

```java
public void closeEntry() throws IOException
```

Closes the current ZIP entry and positions the stream for reading the
next entry.

Throws:

- `ZipException`: if a ZIP file error has occurred
- `IOException`: if an I/O error has occurred

## ZipInputStream.available()

```java
public int available() throws IOException
```

Returns 0 when end of stream is detected for the current ZIP entry or
`closeEntry()` has been called on the current ZIP entry, otherwise
returns 1.

Programs should not count on this method to return the actual number
of bytes that could be read without blocking.

**Returns:** 0 when end of stream is detected for the current ZIP entry or
`closeEntry()` has been called on the current ZIP entry, otherwise 1.

Throws:

- `IOException`: if an I/O error occurs.

## ZipInputStream.read()

```java
public int read() throws IOException
```

Reads the next byte of data from the input stream for the current
ZIP entry. This method will block until enough input is available for
decompression.

**Returns:** the byte read, or -1 if the end of the stream is reached

Throws:

- `IOException`: if an I/O error has occurred

## ZipInputStream.readAllBytes()

```java
public byte[] readAllBytes() throws IOException
```

Reads all remaining bytes from the input stream for the current ZIP entry.
This method blocks until all remaining bytes have been read and end of
stream is detected, or an exception is thrown. This method does not close
the input stream.

 When this stream reaches end of stream, further invocations of this
method will return an empty byte array.

 Note that this method is intended for simple cases where it is
convenient to read all bytes into a byte array. It is not intended for
reading input streams with large amounts of data.

 If an I/O error occurs reading from the input stream, then it may do
so after some, but not all, bytes have been read. Consequently, the input
stream may not be at end of stream and may be in an inconsistent state.
It is strongly recommended that the stream be promptly closed if an I/O
error occurs.

**Since:** 9

Throws:

- `OutOfMemoryError`: (inherited documentation)

## ZipInputStream.readNBytes(int)

```java
public byte[] readNBytes(int len) throws IOException
```

Reads up to a specified number of bytes from the input stream
for the current ZIP entry. This method blocks until the requested number
of bytes has been read, end of stream is detected, or an exception
is thrown. This method does not close the input stream.

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

 If an I/O error occurs reading from the input stream, then it may do
so after some, but not all, bytes have been read. Consequently, the input
stream may not be at end of stream and may be in an inconsistent state.
It is strongly recommended that the stream be promptly closed if an I/O
error occurs.

**Implementation note:** This method calls `super.readNBytes(int len)`.

**Since:** 11

Throws:

- `OutOfMemoryError`: (inherited documentation)

## ZipInputStream.readNBytes(byte[], int, int)

```java
public int readNBytes(byte[] b, int off, int len) throws IOException
```

Reads the requested number of bytes from the input stream into the given
byte array for the current ZIP entry returning the number of
inflated bytes.
This method blocks until `len` bytes of input data have
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

 If an I/O error occurs reading from the input stream, then it may do
so after some, but not all, bytes of `b` have been updated with
data from the input stream. Consequently, the input stream and `b`
may be in an inconsistent state. It is strongly recommended that the
stream be promptly closed if an I/O error occurs.

**Since:** 9

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## ZipInputStream.skipNBytes(long)

```java
public void skipNBytes(long n) throws IOException
```

Skips over and discards exactly `n` bytes of data from this input
stream for the current ZIP entry.
If `n` is zero, then no bytes are skipped.
If `n` is negative, then no bytes are skipped.
Subclasses may handle the negative value differently.

 This method blocks until the requested number of bytes has been
skipped, end of file is reached, or an exception is thrown.

 If end of stream is reached before the stream is at the desired
position, then an `EOFException` is thrown.

 If an I/O error occurs, then the input stream may be
in an inconsistent state. It is strongly recommended that the
stream be promptly closed if an I/O error occurs.

**Since:** 12

## ZipInputStream.transferTo(OutputStream)

```java
public long transferTo(OutputStream out) throws IOException
```

Reads all bytes from this input stream for the current ZIP entry
and writes the bytes to the given output stream in the order that they
are read. On return, this input stream will be at end of stream.
This method does not close either stream.

This method may block indefinitely reading from the input stream, or
writing to the output stream. The behavior for the case where the input
and/or output stream is *asynchronously closed*, or the thread
interrupted during the transfer, is highly input and output stream
specific, and therefore not specified.

If the total number of bytes transferred is greater than `Long.MAX_VALUE`, then `Long.MAX_VALUE` will be returned.

If an I/O error occurs reading from the input stream or writing to the
output stream, then it may do so after some bytes have been read or
written. Consequently, the input stream may not be at end of stream and
one, or both, streams may be in an inconsistent state. It is strongly
recommended that both streams be promptly closed if an I/O error occurs.

**Since:** 9

## ZipInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads the requested number of bytes from the input stream into the given
byte array for the current ZIP entry returning the number of
inflated bytes. If `len` is not zero, the method blocks until some input is
available; otherwise, no bytes are read and `0` is returned.

If the current entry is compressed and this method returns a nonzero
integer *n* then `buf[off]`
through `buf[off+`*n*`-1]` contain the uncompressed
data.  The content of elements `buf[off+`*n*`]` through
`buf[off+`*len*`-1]` is undefined, contrary to the
specification of the InputStream superclass,
so an implementation is free to modify these elements during the inflate
operation. If this method returns `-1` or throws an exception then
the content of `buf[off]` through `buf[off+`*len*`-1]` is undefined.

Parameters:

- `b`: the buffer into which the data is read
- `off`: the start offset in the destination array `b`
- `len`: the maximum number of bytes read

**Returns:** the actual number of bytes read, or -1 if the end of the
        entry is reached

Throws:

- `IndexOutOfBoundsException`: if `off` is negative, `len` is negative, or `len` is greater than `b.length - off`
- `ZipException`: if a ZIP file error has occurred
- `IOException`: if an I/O error has occurred

## ZipInputStream.skip(long)

```java
public long skip(long n) throws IOException
```

Skips over and discards `n` bytes of data from this input stream
for the current ZIP entry.

Parameters:

- `n`: the number of bytes to skip

**Returns:** the actual number of bytes skipped

Throws:

- `ZipException`: if a ZIP file error has occurred
- `IOException`: if an I/O error has occurred
- `IllegalArgumentException`: if `n < 0`

## ZipInputStream.close()

```java
public void close() throws IOException
```

Closes this input stream and releases any system resources associated
with the stream.

Throws:

- `IOException`: if an I/O error has occurred

## ZipInputStream.createZipEntry(String)

```java
protected ZipEntry createZipEntry(String name)
```

Creates a new `ZipEntry` object for the specified
entry name.

Parameters:

- `name`: the ZIP file entry name

**Returns:** the ZipEntry just created
