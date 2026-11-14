# DataInputStream class (java.io)

```java
public class DataInputStream extends FilterInputStream implements DataInput
```

A data input stream lets an application read primitive Java data
types from an underlying input stream in a machine-independent
way. An application uses a data output stream to write data that
can later be read by a data input stream.
<p>
A DataInputStream is not safe for use by multiple concurrent
threads. If a DataInputStream is to be used by more than one
thread then access to the data input stream should be controlled
by appropriate synchronization.

@author  Arthur van Hoff
@see     java.io.DataOutputStream
@since   1.0

## DataInputStream.DataInputStream(InputStream)

```java
public DataInputStream(InputStream in)
```

Creates a DataInputStream that uses the specified
underlying InputStream.

@param  in   the specified input stream

## DataInputStream.read(byte[])

```java
public final int read(byte[] b) throws IOException
```

Reads some number of bytes from the contained input stream and
stores them into the buffer array {@code b}. The number of
bytes actually read is returned as an integer. This method blocks
until input data is available, end of file is detected, or an
exception is thrown.

<p>If {@code b} is null, a {@code NullPointerException} is
thrown. If the length of {@code b} is zero, then no bytes are
read and {@code 0} is returned; otherwise, there is an attempt
to read at least one byte. If no byte is available because the
stream is at end of file, the value {@code -1} is returned;
otherwise, at least one byte is read and stored into {@code b}.

<p>The first byte read is stored into element {@code b[0]}, the
next one into {@code b[1]}, and so on. The number of bytes read
is, at most, equal to the length of {@code b}. Let {@code k}
be the number of bytes actually read; these bytes will be stored in
elements {@code b[0]} through {@code b[k-1]}, leaving
elements {@code b[k]} through {@code b[b.length-1]}
unaffected.

<p>The {@code read(b)} method has the same effect as:
<blockquote><pre>
read(b, 0, b.length)
</pre></blockquote>

@param      b   the buffer into which the data is read.
@return     the total number of bytes read into the buffer, or
            {@code -1} if there is no more data because the end
            of the stream has been reached.
@throws     IOException if the first byte cannot be read for any reason
            other than end of file, the stream has been closed and the underlying
            input stream does not support reading after close, or another I/O
            error occurs.
@see        java.io.FilterInputStream#in
@see        java.io.InputStream#read(byte[], int, int)

## DataInputStream.read(byte[], int, int)

```java
public final int read(byte[] b, int off, int len) throws IOException
```

Reads up to {@code len} bytes of data from the contained
input stream into an array of bytes.  An attempt is made to read
as many as {@code len} bytes, but a smaller number may be read,
possibly zero. The number of bytes actually read is returned as an
integer.

<p> This method blocks until input data is available, end of file is
detected, or an exception is thrown.

<p> If {@code len} is zero, then no bytes are read and
{@code 0} is returned; otherwise, there is an attempt to read at
least one byte. If no byte is available because the stream is at end of
file, the value {@code -1} is returned; otherwise, at least one
byte is read and stored into {@code b}.

<p> The first byte read is stored into element {@code b[off]}, the
next one into {@code b[off+1]}, and so on. The number of bytes read
is, at most, equal to {@code len}. Let <i>k</i> be the number of
bytes actually read; these bytes will be stored in elements
{@code b[off]} through {@code b[off+}<i>k</i>{@code -1]},
leaving elements {@code b[off+}<i>k</i>{@code ]} through
{@code b[off+len-1]} unaffected.

<p> In every case, elements {@code b[0]} through
{@code b[off]} and elements {@code b[off+len]} through
{@code b[b.length-1]} are unaffected.

@param      b     the buffer into which the data is read.
@param      off the start offset in the destination array {@code b}
@param      len   the maximum number of bytes read.
@return     the total number of bytes read into the buffer, or
            {@code -1} if there is no more data because the end
            of the stream has been reached.
@throws     NullPointerException If {@code b} is {@code null}.
@throws     IndexOutOfBoundsException If {@code off} is negative,
            {@code len} is negative, or {@code len} is greater than
            {@code b.length - off}
@throws     IOException if the first byte cannot be read for any reason
            other than end of file, the stream has been closed and the underlying
            input stream does not support reading after close, or another I/O
            error occurs.
@see        java.io.FilterInputStream#in
@see        java.io.InputStream#read(byte[], int, int)

## DataInputStream.readFully(byte[])

```java
public final void readFully(byte[] b) throws IOException
```

See the general contract of the {@code readFully}
method of {@code DataInput}.
<p>
Bytes
for this operation are read from the contained
input stream.

@param   b   the buffer into which the data is read.
@throws  NullPointerException if {@code b} is {@code null}.
@throws  EOFException  if this input stream reaches the end before
         reading all the bytes.
@throws  IOException   the stream has been closed and the contained
         input stream does not support reading after close, or
         another I/O error occurs.
@see     java.io.FilterInputStream#in

## DataInputStream.readFully(byte[], int, int)

```java
public final void readFully(byte[] b, int off, int len) throws IOException
```

See the general contract of the {@code readFully}
method of {@code DataInput}.
<p>
Bytes
for this operation are read from the contained
input stream.

@param      b     the buffer into which the data is read.
@param      off   the start offset in the data array {@code b}.
@param      len   the number of bytes to read.
@throws     NullPointerException if {@code b} is {@code null}.
@throws     IndexOutOfBoundsException if {@code off} is negative,
            {@code len} is negative, or {@code len} is greater than
            {@code b.length - off}.
@throws     EOFException  if this input stream reaches the end before
            reading all the bytes.
@throws     IOException   the stream has been closed and the contained
            input stream does not support reading after close, or
            another I/O error occurs.
@see        java.io.FilterInputStream#in

## DataInputStream.skipBytes(int)

```java
public final int skipBytes(int n) throws IOException
```

See the general contract of the {@code skipBytes}
method of {@code DataInput}.
<p>
Bytes for this operation are read from the contained
input stream.

@param      n   the number of bytes to be skipped.
@return     the actual number of bytes skipped.
@throws     IOException  if the contained input stream does not support
            seek, or the stream has been closed and
            the contained input stream does not support
            reading after close, or another I/O error occurs.

## DataInputStream.readBoolean()

```java
public final boolean readBoolean() throws IOException
```

See the general contract of the {@code readBoolean}
method of {@code DataInput}.
<p>
Bytes for this operation are read from the contained
input stream.

@return     the {@code boolean} value read.
@throws     EOFException  if this input stream has reached the end.
@throws     IOException   the stream has been closed and the contained
            input stream does not support reading after close, or
            another I/O error occurs.
@see        java.io.FilterInputStream#in

## DataInputStream.readByte()

```java
public final byte readByte() throws IOException
```

See the general contract of the {@code readByte}
method of {@code DataInput}.
<p>
Bytes
for this operation are read from the contained
input stream.

@return     the next byte of this input stream as a signed 8-bit
            {@code byte}.
@throws     EOFException  if this input stream has reached the end.
@throws     IOException   the stream has been closed and the contained
            input stream does not support reading after close, or
            another I/O error occurs.
@see        java.io.FilterInputStream#in

## DataInputStream.readUnsignedByte()

```java
public final int readUnsignedByte() throws IOException
```

See the general contract of the {@code readUnsignedByte}
method of {@code DataInput}.
<p>
Bytes
for this operation are read from the contained
input stream.

@return     the next byte of this input stream, interpreted as an
            unsigned 8-bit number.
@throws     EOFException  if this input stream has reached the end.
@throws     IOException   the stream has been closed and the contained
            input stream does not support reading after close, or
            another I/O error occurs.
@see         java.io.FilterInputStream#in

## DataInputStream.readShort()

```java
public final short readShort() throws IOException
```

See the general contract of the {@code readShort}
method of {@code DataInput}.
<p>
Bytes
for this operation are read from the contained
input stream.

@return     the next two bytes of this input stream, interpreted as a
            signed 16-bit number.
@throws     EOFException  if this input stream reaches the end before
              reading two bytes.
@throws     IOException   the stream has been closed and the contained
            input stream does not support reading after close, or
            another I/O error occurs.
@see        java.io.FilterInputStream#in

## DataInputStream.readUnsignedShort()

```java
public final int readUnsignedShort() throws IOException
```

See the general contract of the {@code readUnsignedShort}
method of {@code DataInput}.
<p>
Bytes
for this operation are read from the contained
input stream.

@return     the next two bytes of this input stream, interpreted as an
            unsigned 16-bit integer.
@throws     EOFException  if this input stream reaches the end before
            reading two bytes.
@throws     IOException   the stream has been closed and the contained
            input stream does not support reading after close, or
            another I/O error occurs.
@see        java.io.FilterInputStream#in

## DataInputStream.readChar()

```java
public final char readChar() throws IOException
```

See the general contract of the {@code readChar}
method of {@code DataInput}.
<p>
Bytes
for this operation are read from the contained
input stream.

@return     the next two bytes of this input stream, interpreted as a
            {@code char}.
@throws     EOFException  if this input stream reaches the end before
              reading two bytes.
@throws     IOException   the stream has been closed and the contained
            input stream does not support reading after close, or
            another I/O error occurs.
@see        java.io.FilterInputStream#in

## DataInputStream.readInt()

```java
public final int readInt() throws IOException
```

See the general contract of the {@code readInt}
method of {@code DataInput}.
<p>
Bytes
for this operation are read from the contained
input stream.

@return     the next four bytes of this input stream, interpreted as an
            {@code int}.
@throws     EOFException  if this input stream reaches the end before
              reading four bytes.
@throws     IOException   the stream has been closed and the contained
            input stream does not support reading after close, or
            another I/O error occurs.
@see        java.io.FilterInputStream#in

## DataInputStream.readLong()

```java
public final long readLong() throws IOException
```

See the general contract of the {@code readLong}
method of {@code DataInput}.
<p>
Bytes
for this operation are read from the contained
input stream.

@return     the next eight bytes of this input stream, interpreted as a
            {@code long}.
@throws     EOFException  if this input stream reaches the end before
              reading eight bytes.
@throws     IOException   the stream has been closed and the contained
            input stream does not support reading after close, or
            another I/O error occurs.
@see        java.io.FilterInputStream#in

## DataInputStream.readFloat()

```java
public final float readFloat() throws IOException
```

See the general contract of the {@code readFloat}
method of {@code DataInput}.
<p>
Bytes
for this operation are read from the contained
input stream.

@return     the next four bytes of this input stream, interpreted as a
            {@code float}.
@throws     EOFException  if this input stream reaches the end before
              reading four bytes.
@throws     IOException   the stream has been closed and the contained
            input stream does not support reading after close, or
            another I/O error occurs.
@see        java.io.DataInputStream#readInt()
@see        java.lang.Float#intBitsToFloat(int)

## DataInputStream.readDouble()

```java
public final double readDouble() throws IOException
```

See the general contract of the {@code readDouble}
method of {@code DataInput}.
<p>
Bytes
for this operation are read from the contained
input stream.

@return     the next eight bytes of this input stream, interpreted as a
            {@code double}.
@throws     EOFException  if this input stream reaches the end before
              reading eight bytes.
@throws     IOException   the stream has been closed and the contained
            input stream does not support reading after close, or
            another I/O error occurs.
@see        java.io.DataInputStream#readLong()
@see        java.lang.Double#longBitsToDouble(long)

## DataInputStream.readLine()

```java
public final String readLine() throws IOException
```

See the general contract of the {@code readLine}
method of {@code DataInput}.
<p>
Bytes
for this operation are read from the contained
input stream.

@deprecated This method does not properly convert bytes to characters.
As of JDK&nbsp;1.1, the preferred way to read lines of text is via the
{@code BufferedReader.readLine()} method.  Programs that use the
{@code DataInputStream} class to read lines can be converted to use
the {@code BufferedReader} class by replacing code of the form:
<blockquote><pre>
    DataInputStream d =&nbsp;new&nbsp;DataInputStream(in);
</pre></blockquote>
with:
<blockquote><pre>
    BufferedReader d
         =&nbsp;new&nbsp;BufferedReader(new&nbsp;InputStreamReader(in));
</pre></blockquote>

@return     the next line of text from this input stream.
@throws     IOException  if an I/O error occurs.
@see        java.io.BufferedReader#readLine()
@see        java.io.FilterInputStream#in

## DataInputStream.readUTF()

```java
public final String readUTF() throws IOException
```

See the general contract of the {@code readUTF}
method of {@code DataInput}.
<p>
Bytes
for this operation are read from the contained
input stream.

@return     a Unicode string.
@throws     EOFException  if this input stream reaches the end before
              reading all the bytes.
@throws     IOException   the stream has been closed and the contained
            input stream does not support reading after close, or
            another I/O error occurs.
@throws     UTFDataFormatException if the bytes do not represent a valid
            modified UTF-8 encoding of a string.
@see        java.io.DataInputStream#readUTF(java.io.DataInput)

## DataInputStream.readUTF(DataInput)

```java
public static final String readUTF(DataInput in) throws IOException
```

Reads from the
stream {@code in} a representation
of a Unicode  character string encoded in
<a href="DataInput.html#modified-utf-8">modified UTF-8</a> format;
this string of characters is then returned as a {@code String}.
The details of the modified UTF-8 representation
are  exactly the same as for the {@code readUTF}
method of {@code DataInput}.

@param      in   a data input stream.
@return     a Unicode string.
@throws     EOFException            if the input stream reaches the end
              before all the bytes.
@throws     IOException   the stream has been closed and the contained
            input stream does not support reading after close, or
            another I/O error occurs.
@throws     UTFDataFormatException  if the bytes do not represent a
              valid modified UTF-8 encoding of a Unicode string.
@see        java.io.DataInputStream#readUnsignedShort()