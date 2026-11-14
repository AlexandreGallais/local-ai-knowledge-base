# FileInputStream class (java.io)

```java
public class FileInputStream extends InputStream
```

A {@code FileInputStream} obtains input bytes
from a file in a file system. What files
are  available depends on the host environment.

<p>{@code FileInputStream} is meant for reading streams of raw bytes
such as image data. For reading streams of characters, consider using
{@code FileReader}.

@apiNote
The {@link #close} method should be called to release resources used by this
stream, either directly, or with the {@code try}-with-resources statement.

@implSpec
Subclasses are responsible for the cleanup of resources acquired by the subclass.
Subclasses requiring that resource cleanup take place after a stream becomes
unreachable should use {@link java.lang.ref.Cleaner} or some other mechanism.

@author  Arthur van Hoff
@see     java.io.File
@see     java.io.FileDescriptor
@see     java.io.FileOutputStream
@see     java.nio.file.Files#newInputStream
@since   1.0

## FileInputStream.FileInputStream(String)

```java
public FileInputStream(String name) throws FileNotFoundException
```

Creates a {@code FileInputStream} to read from an existing file
named by the path name {@code name}.
{@linkplain java.nio.file##links Symbolic links}
are automatically redirected to the <i>target</i> of the link.
A new {@code FileDescriptor}
object is created to represent this file
connection.
<p>
If the named file does not exist, is a directory rather than a regular
file, or for some other reason cannot be opened for reading then a
{@code FileNotFoundException} is thrown.

@param      name   the system-dependent file name.
@throws     FileNotFoundException  if the file does not exist,
            is a directory rather than a regular file,
            or for some other reason cannot be opened for
            reading.

## FileInputStream.FileInputStream(File)

```java
public FileInputStream(File file) throws FileNotFoundException
```

Creates a {@code FileInputStream} to read from an existing file
represented by the {@code File} object {@code file}.
{@linkplain java.nio.file##links Symbolic links}
are automatically redirected to the <i>target</i> of the link.
A new {@code FileDescriptor} object
is created to represent this file connection.
<p>
If the named file does not exist, is a directory rather than a regular
file, or for some other reason cannot be opened for reading then a
{@code FileNotFoundException} is thrown.

@param      file   the file to be opened for reading.
@throws     FileNotFoundException  if the file does not exist,
            is a directory rather than a regular file,
            or for some other reason cannot be opened for
            reading.
@see        java.io.File#getPath()

## FileInputStream.FileInputStream(FileDescriptor)

```java
public FileInputStream(FileDescriptor fdObj)
```

Creates a {@code FileInputStream} by using the file descriptor
{@code fdObj}, which represents an existing connection to an
actual file in the file system.
<p>
If {@code fdObj} is null then a {@code NullPointerException}
is thrown.
<p>
This constructor does not throw an exception if {@code fdObj}
is {@link java.io.FileDescriptor#valid() invalid}.
However, if the methods are invoked on the resulting stream to attempt
I/O on the stream, an {@code IOException} is thrown.

@param      fdObj   the file descriptor to be opened for reading.

## FileInputStream.read()

```java
public int read() throws IOException
```

Reads a byte of data from this input stream. This method blocks
if no input is yet available.

@return     the next byte of data, or {@code -1} if the end of the
            file is reached.
@throws     IOException {@inheritDoc}

## FileInputStream.read(byte[])

```java
public int read(byte[] b) throws IOException
```

Reads up to {@code b.length} bytes of data from this input
stream into an array of bytes. This method blocks until some input
is available.

@param      b   {@inheritDoc}
@return     the total number of bytes read into the buffer, or
            {@code -1} if there is no more data because the end of
            the file has been reached.
@throws     IOException  if an I/O error occurs.

## FileInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads up to {@code len} bytes of data from this input stream
into an array of bytes. If {@code len} is not zero, the method
blocks until some input is available; otherwise, no
bytes are read and {@code 0} is returned.

@param      b     {@inheritDoc}
@param      off   {@inheritDoc}
@param      len   {@inheritDoc}
@return     {@inheritDoc}
@throws     NullPointerException {@inheritDoc}
@throws     IndexOutOfBoundsException {@inheritDoc}
@throws     IOException  if an I/O error occurs.

## FileInputStream.readNBytes(int)

```java
public byte[] readNBytes(int len) throws IOException
```

@since 11

## FileInputStream.transferTo(OutputStream)

```java
public long transferTo(OutputStream out) throws IOException
```

{@inheritDoc}

## FileInputStream.skip(long)

```java
public long skip(long n) throws IOException
```

Skips over and discards {@code n} bytes of data from the
input stream.

<p>The {@code skip} method may, for a variety of
reasons, end up skipping over some smaller number of bytes,
possibly {@code 0}. If {@code n} is negative, the method
will try to skip backwards. In case the backing file does not support
backward skip at its current position, an {@code IOException} is
thrown. The actual number of bytes skipped is returned. If it skips
forwards, it returns a positive value. If it skips backwards, it
returns a negative value.

<p>This method may skip more bytes than what are remaining in the
backing file. This produces no exception and the number of bytes skipped
may include some number of bytes that were beyond the EOF of the
backing file. Attempting to read from the stream after skipping past
the end will result in -1 indicating the end of the file.

@param      n   {@inheritDoc}
@return     the actual number of bytes skipped.
@throws     IOException  if n is negative, if the stream does not
            support seek, or if an I/O error occurs.

## FileInputStream.available()

```java
public int available() throws IOException
```

Returns an estimate of the number of remaining bytes that can be read (or
skipped over) from this input stream without blocking by the next
invocation of a method for this input stream. Returns 0 when the file
position is beyond EOF. The next invocation might be the same thread
or another thread. A single read or skip of this many bytes will not
block, but may read or skip fewer bytes.

<p> In some cases, a non-blocking read (or skip) may appear to be
blocked when it is merely slow, for example when reading large
files over slow networks.

@return     an estimate of the number of remaining bytes that can be read
            (or skipped over) from this input stream without blocking.
@throws     IOException  if this file input stream has been closed by calling
            {@code close} or an I/O error occurs.

## FileInputStream.close()

```java
public void close() throws IOException
```

Closes this file input stream and releases any system resources
associated with the stream.

<p> If this stream has an associated channel then the channel is closed
as well.

@apiNote
Overriding {@link #close} to perform cleanup actions is reliable
only when called directly or when called by try-with-resources.

@implSpec
Subclasses requiring that resource cleanup take place after a stream becomes
unreachable should use the {@link java.lang.ref.Cleaner} mechanism.

<p>
If this stream has an associated channel then this method will close the
channel, which in turn will close this stream. Subclasses that override
this method should be prepared to handle possible reentrant invocation.

@throws     IOException  {@inheritDoc}

## FileInputStream.getFD()

```java
public final FileDescriptor getFD() throws IOException
```

Returns the {@code FileDescriptor}
object  that represents the connection to
the actual file in the file system being
used by this {@code FileInputStream}.

@return     the file descriptor object associated with this stream.
@throws     IOException  if an I/O error occurs.
@see        java.io.FileDescriptor

## FileInputStream.getChannel()

```java
public FileChannel getChannel()
```

Returns the unique {@link java.nio.channels.FileChannel FileChannel}
object associated with this file input stream.

<p> The initial {@link java.nio.channels.FileChannel#position()
position} of the returned channel will be equal to the
number of bytes read from the file so far.  Reading bytes from this
stream will increment the channel's position.  Changing the channel's
position, either explicitly or by reading, will change this stream's
file position.

@return  the file channel associated with this file input stream

@since 1.4