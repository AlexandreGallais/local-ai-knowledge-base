# BufferedOutputStream class (java.io)

```java
public class BufferedOutputStream extends FilterOutputStream
```

The class implements a buffered output stream. By setting up such
an output stream, an application can write bytes to the underlying
output stream without necessarily causing a call to the underlying
system for each byte written.

@apiNote
Once wrapped in a {@code BufferedOutputStream}, the underlying
{@code OutputStream} should not be used directly nor wrapped with
another stream.

@author  Arthur van Hoff
@since   1.0

## BufferedOutputStream.buf

```java
protected byte[] buf
```

The internal buffer where data is stored.

## BufferedOutputStream.count

```java
protected int count
```

The number of valid bytes in the buffer. This value is always
in the range {@code 0} through {@code buf.length}; elements
{@code buf[0]} through {@code buf[count-1]} contain valid
byte data.

## BufferedOutputStream.BufferedOutputStream(OutputStream)

```java
public BufferedOutputStream(OutputStream out)
```

Creates a new buffered output stream to write data to the
specified underlying output stream.

@param   out   the underlying output stream.

## BufferedOutputStream.BufferedOutputStream(OutputStream, int)

```java
public BufferedOutputStream(OutputStream out, int size)
```

Creates a new buffered output stream to write data to the
specified underlying output stream with the specified buffer
size.

@param   out    the underlying output stream.
@param   size   the buffer size.
@throws  IllegalArgumentException if size &lt;= 0.

## BufferedOutputStream.write(int)

```java
public synchronized void write(int b) throws IOException
```

Writes the specified byte to this buffered output stream.

@param      b   the byte to be written.
@throws     IOException  if an I/O error occurs.

## BufferedOutputStream.write(byte[], int, int)

```java
public synchronized void write(byte[] b, int off, int len) throws IOException
```

Writes {@code len} bytes from the specified byte array
starting at offset {@code off} to this buffered output stream.

<p> Ordinarily this method stores bytes from the given array into this
stream's buffer, flushing the buffer to the underlying output stream as
needed.  If the requested length is at least as large as this stream's
buffer, however, then this method will flush the buffer and write the
bytes directly to the underlying output stream.  Thus redundant
{@code BufferedOutputStream}s will not copy data unnecessarily.

@param      b     the data.
@param      off   the start offset in the data.
@param      len   the number of bytes to write.
@throws     IOException  if an I/O error occurs.
@throws     IndexOutOfBoundsException {@inheritDoc}

## BufferedOutputStream.flush()

```java
public synchronized void flush() throws IOException
```

Flushes this buffered output stream. This forces any buffered
output bytes to be written out to the underlying output stream.

@throws     IOException  if an I/O error occurs.
@see        java.io.FilterOutputStream#out