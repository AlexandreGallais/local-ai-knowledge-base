# CheckedInputStream class (java.util.zip)

```java
public class CheckedInputStream extends FilterInputStream
```

An input stream that also maintains a checksum of the data being read.
The checksum can then be used to verify the integrity of the input data.

@see         Checksum
@author      David Connelly
@since 1.1

## CheckedInputStream.CheckedInputStream(InputStream, Checksum)

```java
public CheckedInputStream(InputStream in, Checksum cksum)
```

Creates an input stream using the specified Checksum.
@param in the input stream
@param cksum the Checksum

## CheckedInputStream.read()

```java
public int read() throws IOException
```

Reads a byte. Will block if no input is available.
@return the byte read, or -1 if the end of the stream is reached.
@throws    IOException if an I/O error has occurred

## CheckedInputStream.read(byte[], int, int)

```java
public int read(byte[] buf, int off, int len) throws IOException
```

Reads into an array of bytes. If {@code len} is not zero, the method
blocks until some input is available; otherwise, no
bytes are read and {@code 0} is returned.
@param buf the buffer into which the data is read
@param off the start offset in the destination array {@code b}
@param len the maximum number of bytes read
@return    the actual number of bytes read, or -1 if the end
           of the stream is reached.
@throws     NullPointerException If {@code buf} is {@code null}.
@throws     IndexOutOfBoundsException If {@code off} is negative,
{@code len} is negative, or {@code len} is greater than
{@code buf.length - off}
@throws    IOException if an I/O error has occurred

## CheckedInputStream.skip(long)

```java
public long skip(long n) throws IOException
```

Skips specified number of bytes of input.
@param n the number of bytes to skip
@return the actual number of bytes skipped
@throws    IOException if an I/O error has occurred

## CheckedInputStream.getChecksum()

```java
public Checksum getChecksum()
```

Returns the Checksum for this input stream.
@return the Checksum value