# ZipInputStream class (java.util.zip)

```java
public class ZipInputStream extends InflaterInputStream implements ZipConstants
```

An input stream for reading compressed and uncompressed
{@linkplain ZipEntry ZIP file entries} from a stream of bytes in the ZIP file
format.
<p> Unless otherwise noted, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be
thrown.
<H2>Reading Zip File Entries</H2>

The {@link #getNextEntry()} method is used to read the next ZIP file entry
(Local file (LOC) header record in the ZIP format) and position the stream at
the entry's file data. The file data may read using one of the
{@code ZipInputStream} read methods such
as {@link #read(byte[], int, int) read} or {@link #readAllBytes() readAllBytes()}.
For example:
   {@snippet lang="java" :
     Path jar = Path.of("foo.jar");
     try (InputStream is = Files.newInputStream(jar);
          ZipInputStream zis = new ZipInputStream(is)) {
         ZipEntry ze;
         while ((ze = zis.getNextEntry()) != null) {
            var bytes = zis.readAllBytes();
            System.out.printf("Entry: %s, bytes read: %s%n", ze.getName(),
                    bytes.length);
         }
     }
   }
@apiNote
The LOC header contains metadata about the ZIP file entry. {@code ZipInputStream}
does not read the Central directory (CEN) header for the entry and therefore
will not have access to its metadata such as the external file attributes.
{@linkplain ZipFile} may be used when the information stored within
the CEN header is required.

@author      David Connelly
@since 1.1

## ZipInputStream.ZipInputStream(InputStream)

```java
public ZipInputStream(InputStream in)
```

Creates a new ZIP input stream.

<p>The UTF-8 {@link java.nio.charset.Charset charset} is used to
decode the entry names.

@param in the actual input stream

## ZipInputStream.ZipInputStream(InputStream, Charset)

```java
public ZipInputStream(InputStream in, Charset charset)
```

Creates a new ZIP input stream.

@param in the actual input stream

@param charset
       The {@linkplain java.nio.charset.Charset charset} to be
       used to decode the ZIP entry name (ignored if the
       <a href="package-summary.html#lang_encoding"> language
       encoding bit</a> of the ZIP entry's general purpose bit
       flag is set).

@since 1.7

## ZipInputStream.getNextEntry()

```java
public ZipEntry getNextEntry() throws IOException
```

Reads the next ZIP file entry and positions the stream at the
beginning of the entry data.
@return the next ZIP file entry, or null if there are no more entries
@throws    ZipException if a ZIP file error has occurred
@throws    IOException if an I/O error has occurred

## ZipInputStream.closeEntry()

```java
public void closeEntry() throws IOException
```

Closes the current ZIP entry and positions the stream for reading the
next entry.
@throws    ZipException if a ZIP file error has occurred
@throws    IOException if an I/O error has occurred

## ZipInputStream.available()

```java
public int available() throws IOException
```

Returns 0 when end of stream is detected for the current ZIP entry or
{@link #closeEntry()} has been called on the current ZIP entry, otherwise
returns 1.
<p>
Programs should not count on this method to return the actual number
of bytes that could be read without blocking.

@return 0 when end of stream is detected for the current ZIP entry or
{@link #closeEntry()} has been called on the current ZIP entry, otherwise 1.
@throws     IOException  if an I/O error occurs.

## ZipInputStream.read()

```java
public int read() throws IOException
```

Reads the next byte of data from the input stream for the current
ZIP entry. This method will block until enough input is available for
decompression.
@return the byte read, or -1 if the end of the stream is reached
@throws    IOException if an I/O error has occurred

## ZipInputStream.readAllBytes()

```java
public byte[] readAllBytes() throws IOException
```

Reads all remaining bytes from the input stream for the current ZIP entry.
This method blocks until all remaining bytes have been read and end of
stream is detected, or an exception is thrown. This method does not close
the input stream.

<p> When this stream reaches end of stream, further invocations of this
method will return an empty byte array.

<p> Note that this method is intended for simple cases where it is
convenient to read all bytes into a byte array. It is not intended for
reading input streams with large amounts of data.

<p> If an I/O error occurs reading from the input stream, then it may do
so after some, but not all, bytes have been read. Consequently, the input
stream may not be at end of stream and may be in an inconsistent state.
It is strongly recommended that the stream be promptly closed if an I/O
error occurs.

@throws OutOfMemoryError {@inheritDoc}

@since 9

## ZipInputStream.readNBytes(int)

```java
public byte[] readNBytes(int len) throws IOException
```

Reads up to a specified number of bytes from the input stream
for the current ZIP entry. This method blocks until the requested number
of bytes has been read, end of stream is detected, or an exception
is thrown. This method does not close the input stream.

<p> The length of the returned array equals the number of bytes read
from the stream. If {@code len} is zero, then no bytes are read and
an empty byte array is returned. Otherwise, up to {@code len} bytes
are read from the stream. Fewer than {@code len} bytes may be read if
end of stream is encountered.

<p> When this stream reaches end of stream, further invocations of this
method will return an empty byte array.

<p> Note that this method is intended for simple cases where it is
convenient to read the specified number of bytes into a byte array. The
total amount of memory allocated by this method is proportional to the
number of bytes read from the stream which is bounded by {@code len}.
Therefore, the method may be safely called with very large values of
{@code len} provided sufficient memory is available.

<p> If an I/O error occurs reading from the input stream, then it may do
so after some, but not all, bytes have been read. Consequently, the input
stream may not be at end of stream and may be in an inconsistent state.
It is strongly recommended that the stream be promptly closed if an I/O
error occurs.

@implNote
This method calls {@code super.readNBytes(int len)}.

 @throws OutOfMemoryError {@inheritDoc}

@since 11

## ZipInputStream.readNBytes(byte[], int, int)

```java
public int readNBytes(byte[] b, int off, int len) throws IOException
```

Reads the requested number of bytes from the input stream into the given
byte array for the current ZIP entry returning the number of
inflated bytes.
This method blocks until {@code len} bytes of input data have
been read, end of stream is detected, or an exception is thrown. The
number of bytes actually read, possibly zero, is returned. This method
does not close the input stream.

<p> In the case where end of stream is reached before {@code len} bytes
have been read, then the actual number of bytes read will be returned.
When this stream reaches end of stream, further invocations of this
method will return zero.

<p> If {@code len} is zero, then no bytes are read and {@code 0} is
returned; otherwise, there is an attempt to read up to {@code len} bytes.

<p> The first byte read is stored into element {@code b[off]}, the next
one in to {@code b[off+1]}, and so on. The number of bytes read is, at
most, equal to {@code len}. Let <i>k</i> be the number of bytes actually
read; these bytes will be stored in elements {@code b[off]} through
{@code b[off+}<i>k</i>{@code -1]}, leaving elements {@code b[off+}<i>k</i>
{@code ]} through {@code b[off+len-1]} unaffected.

<p> If an I/O error occurs reading from the input stream, then it may do
so after some, but not all, bytes of {@code b} have been updated with
data from the input stream. Consequently, the input stream and {@code b}
may be in an inconsistent state. It is strongly recommended that the
stream be promptly closed if an I/O error occurs.

@throws IndexOutOfBoundsException {@inheritDoc}

@since 9

## ZipInputStream.skipNBytes(long)

```java
public void skipNBytes(long n) throws IOException
```

Skips over and discards exactly {@code n} bytes of data from this input
stream for the current ZIP entry.
If {@code n} is zero, then no bytes are skipped.
If {@code n} is negative, then no bytes are skipped.
Subclasses may handle the negative value differently.

<p> This method blocks until the requested number of bytes has been
skipped, end of file is reached, or an exception is thrown.

<p> If end of stream is reached before the stream is at the desired
position, then an {@code EOFException} is thrown.

<p> If an I/O error occurs, then the input stream may be
in an inconsistent state. It is strongly recommended that the
stream be promptly closed if an I/O error occurs.

@since 12

## ZipInputStream.transferTo(OutputStream)

```java
public long transferTo(OutputStream out) throws IOException
```

Reads all bytes from this input stream for the current ZIP entry
and writes the bytes to the given output stream in the order that they
are read. On return, this input stream will be at end of stream.
This method does not close either stream.
<p>
This method may block indefinitely reading from the input stream, or
writing to the output stream. The behavior for the case where the input
and/or output stream is <i>asynchronously closed</i>, or the thread
interrupted during the transfer, is highly input and output stream
specific, and therefore not specified.
<p>
If the total number of bytes transferred is greater than {@linkplain
Long#MAX_VALUE}, then {@code Long.MAX_VALUE} will be returned.
<p>
If an I/O error occurs reading from the input stream or writing to the
output stream, then it may do so after some bytes have been read or
written. Consequently, the input stream may not be at end of stream and
one, or both, streams may be in an inconsistent state. It is strongly
recommended that both streams be promptly closed if an I/O error occurs.

@since 9

## ZipInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads the requested number of bytes from the input stream into the given
byte array for the current ZIP entry returning the number of
inflated bytes. If {@code len} is not zero, the method blocks until some input is
available; otherwise, no bytes are read and {@code 0} is returned.
<p>
If the current entry is compressed and this method returns a nonzero
integer <i>n</i> then {@code buf[off]}
through {@code buf[off+}<i>n</i>{@code -1]} contain the uncompressed
data.  The content of elements {@code buf[off+}<i>n</i>{@code ]} through
{@code buf[off+}<i>len</i>{@code -1]} is undefined, contrary to the
specification of the {@link java.io.InputStream InputStream} superclass,
so an implementation is free to modify these elements during the inflate
operation. If this method returns {@code -1} or throws an exception then
the content of {@code buf[off]} through {@code buf[off+}<i>len</i>{@code
-1]} is undefined.

@param b the buffer into which the data is read
@param off the start offset in the destination array {@code b}
@param len the maximum number of bytes read
@return the actual number of bytes read, or -1 if the end of the
        entry is reached
@throws     IndexOutOfBoundsException if {@code off} is negative,
{@code len} is negative, or {@code len} is greater than
{@code b.length - off}
@throws    ZipException if a ZIP file error has occurred
@throws    IOException if an I/O error has occurred

## ZipInputStream.skip(long)

```java
public long skip(long n) throws IOException
```

Skips over and discards {@code n} bytes of data from this input stream
for the current ZIP entry.
@param n the number of bytes to skip
@return the actual number of bytes skipped
@throws    ZipException if a ZIP file error has occurred
@throws    IOException if an I/O error has occurred
@throws    IllegalArgumentException if {@code n < 0}

## ZipInputStream.close()

```java
public void close() throws IOException
```

Closes this input stream and releases any system resources associated
with the stream.
@throws    IOException if an I/O error has occurred

## ZipInputStream.createZipEntry(String)

```java
protected ZipEntry createZipEntry(String name)
```

Creates a new {@code ZipEntry} object for the specified
entry name.

@param name the ZIP file entry name
@return the ZipEntry just created