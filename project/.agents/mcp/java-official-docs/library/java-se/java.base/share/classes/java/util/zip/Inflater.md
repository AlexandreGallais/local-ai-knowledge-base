# Inflater class (java.util.zip)

```java
public class Inflater implements AutoCloseable
```

This class provides support for general purpose decompression using the
popular ZLIB compression library. The ZLIB compression library was
initially developed as part of the PNG graphics standard and is not
protected by patents. It is fully described in the specifications at
the <a href="package-summary.html#package-description">java.util.zip
package description</a>.
<p>
Unless otherwise noted, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be
thrown.
<p>
This class inflates sequences of ZLIB compressed bytes. The input byte
sequence is provided in either a byte array or a {@link ByteBuffer}, via one of the
{@code setInput()} methods. The output byte sequence is written to the
output byte array or {@code ByteBuffer} passed to the {@code inflate()} methods.
<p>
To release the resources used by an {@code Inflater}, an application must close it
by invoking its {@link #end()} or {@link #close()} method.

@apiNote
This class implements {@link AutoCloseable} to facilitate its usage with
{@code try}-with-resources statement. The {@linkplain Inflater#close() close() method} simply
calls {@code end()}.

<p>
The following code fragment demonstrates a trivial compression
and decompression of a string using {@code Deflater} and {@code Inflater}.
{@snippet id="compdecomp" lang="java" class="Snippets" region="DeflaterInflaterExample"}

@see         Deflater
@author      David Connelly
@since 1.1

## Inflater.Inflater(boolean)

```java
public Inflater(boolean nowrap)
```

Creates a new decompressor. If the parameter 'nowrap' is true then
the ZLIB header and checksum fields will not be used. This provides
compatibility with the compression format used by both GZIP and PKZIP.
<p>
Note: When using the 'nowrap' option it is also necessary to provide
an extra "dummy" byte as input. This is required by the ZLIB native
library in order to support certain optimizations.

@param nowrap if true then support GZIP compatible compression

## Inflater.Inflater()

```java
public Inflater()
```

Creates a new decompressor.

## Inflater.setInput(byte[], int, int)

```java
public void setInput(byte[] input, int off, int len)
```

Sets input data for decompression.
<p>
One of the {@code setInput()} methods should be called whenever
{@code needsInput()} returns true indicating that more input data
is required.

@param input the input data bytes
@param off the start offset of the input data
@param len the length of the input data
@see Inflater#needsInput

## Inflater.setInput(byte[])

```java
public void setInput(byte[] input)
```

Sets input data for decompression.
<p>
One of the {@code setInput()} methods should be called whenever
{@code needsInput()} returns true indicating that more input data
is required.

@param input the input data bytes
@see Inflater#needsInput

## Inflater.setInput(ByteBuffer)

```java
public void setInput(ByteBuffer input)
```

Sets input data for decompression.
<p>
One of the {@code setInput()} methods should be called whenever
{@code needsInput()} returns true indicating that more input data
is required.
<p>
The given buffer's position will be advanced as inflate
operations are performed, up to the buffer's limit.
The input buffer may be modified (refilled) between inflate
operations; doing so is equivalent to creating a new buffer
and setting it with this method.
<p>
Modifying the input buffer's contents, position, or limit
concurrently with an inflate operation will result in
undefined behavior, which may include incorrect operation
results or operation failure.

@param input the input data bytes
@see Inflater#needsInput
@since 11

## Inflater.setDictionary(byte[], int, int)

```java
public void setDictionary(byte[] dictionary, int off, int len)
```

Sets the preset dictionary to the given array of bytes. Should be
called when inflate() returns 0 and needsDictionary() returns true
indicating that a preset dictionary is required. The method getAdler()
can be used to get the Adler-32 value of the dictionary needed.
@param dictionary the dictionary data bytes
@param off the start offset of the data
@param len the length of the data
@throws IllegalStateException if the Inflater is closed
@see Inflater#needsDictionary
@see Inflater#getAdler

## Inflater.setDictionary(byte[])

```java
public void setDictionary(byte[] dictionary)
```

Sets the preset dictionary to the given array of bytes. Should be
called when inflate() returns 0 and needsDictionary() returns true
indicating that a preset dictionary is required. The method getAdler()
can be used to get the Adler-32 value of the dictionary needed.
@param dictionary the dictionary data bytes
@throws IllegalStateException if the Inflater is closed
@see Inflater#needsDictionary
@see Inflater#getAdler

## Inflater.setDictionary(ByteBuffer)

```java
public void setDictionary(ByteBuffer dictionary)
```

Sets the preset dictionary to the bytes in the given buffer. Should be
called when inflate() returns 0 and needsDictionary() returns true
indicating that a preset dictionary is required. The method getAdler()
can be used to get the Adler-32 value of the dictionary needed.
<p>
The bytes in given byte buffer will be fully consumed by this method.  On
return, its position will equal its limit.

@param dictionary the dictionary data bytes
@throws IllegalStateException if the Inflater is closed
@see Inflater#needsDictionary
@see Inflater#getAdler
@since 11

## Inflater.getRemaining()

```java
public int getRemaining()
```

Returns the total number of bytes remaining in the input buffer.
This can be used to find out what bytes still remain in the input
buffer after decompression has finished.
@return the total number of bytes remaining in the input buffer

## Inflater.needsInput()

```java
public boolean needsInput()
```

Returns true if no data remains in the input buffer. This can
be used to determine if one of the {@code setInput()} methods should be
called in order to provide more input.

@return true if no data remains in the input buffer

## Inflater.needsDictionary()

```java
public boolean needsDictionary()
```

{@return true if a preset dictionary is needed for decompression}
@see Inflater#setDictionary

## Inflater.finished()

```java
public boolean finished()
```

{@return true if the end of the compressed data stream has been
reached}

## Inflater.inflate(byte[], int, int)

```java
public int inflate(byte[] output, int off, int len) throws DataFormatException
```

Uncompresses bytes into specified buffer. Returns actual number
of bytes uncompressed. A return value of 0 indicates that
needsInput() or needsDictionary() should be called in order to
determine if more input data or a preset dictionary is required.
In the latter case, getAdler() can be used to get the Adler-32
value of the dictionary required.
<p>
If the {@link #setInput(ByteBuffer)} method was called to provide a buffer
for input, the input buffer's position will be advanced by the number of bytes
consumed by this operation, even in the event that a {@link DataFormatException}
is thrown.
<p>
The {@linkplain #getRemaining() remaining byte count} will be reduced by
the number of consumed input bytes.  If the {@link #setInput(ByteBuffer)}
method was called to provide a buffer for input, the input buffer's position
will be advanced the number of consumed bytes.
<p>
These byte totals, as well as
the {@linkplain #getBytesRead() total bytes read}
and the {@linkplain #getBytesWritten() total bytes written}
values, will be updated even in the event that a {@link DataFormatException}
is thrown to reflect the amount of data consumed and produced before the
exception occurred.

@param output the buffer for the uncompressed data
@param off the start offset of the data
@param len the maximum number of uncompressed bytes
@return the actual number of uncompressed bytes
@throws DataFormatException if the compressed data format is invalid
@throws IllegalStateException if the Inflater is closed
@see Inflater#needsInput
@see Inflater#needsDictionary

## Inflater.inflate(byte[])

```java
public int inflate(byte[] output) throws DataFormatException
```

Uncompresses bytes into specified buffer. Returns actual number
of bytes uncompressed. A return value of 0 indicates that
needsInput() or needsDictionary() should be called in order to
determine if more input data or a preset dictionary is required.
In the latter case, getAdler() can be used to get the Adler-32
value of the dictionary required.
<p>
The {@linkplain #getRemaining() remaining byte count} will be reduced by
the number of consumed input bytes.  If the {@link #setInput(ByteBuffer)}
method was called to provide a buffer for input, the input buffer's position
will be advanced the number of consumed bytes.
<p>
These byte totals, as well as
the {@linkplain #getBytesRead() total bytes read}
and the {@linkplain #getBytesWritten() total bytes written}
values, will be updated even in the event that a {@link DataFormatException}
is thrown to reflect the amount of data consumed and produced before the
exception occurred.

@param output the buffer for the uncompressed data
@return the actual number of uncompressed bytes
@throws DataFormatException if the compressed data format is invalid
@throws IllegalStateException if the Inflater is closed
@see Inflater#needsInput
@see Inflater#needsDictionary

## Inflater.inflate(ByteBuffer)

```java
public int inflate(ByteBuffer output) throws DataFormatException
```

Uncompresses bytes into specified buffer. Returns actual number
of bytes uncompressed. A return value of 0 indicates that
needsInput() or needsDictionary() should be called in order to
determine if more input data or a preset dictionary is required.
In the latter case, getAdler() can be used to get the Adler-32
value of the dictionary required.
<p>
On success, the position of the given {@code output} byte buffer will be
advanced by as many bytes as were produced by the operation, which is equal
to the number returned by this method.  Note that the position of the
{@code output} buffer will be advanced even in the event that a
{@link DataFormatException} is thrown.
<p>
The {@linkplain #getRemaining() remaining byte count} will be reduced by
the number of consumed input bytes.  If the {@link #setInput(ByteBuffer)}
method was called to provide a buffer for input, the input buffer's position
will be advanced the number of consumed bytes.
<p>
These byte totals, as well as
the {@linkplain #getBytesRead() total bytes read}
and the {@linkplain #getBytesWritten() total bytes written}
values, will be updated even in the event that a {@link DataFormatException}
is thrown to reflect the amount of data consumed and produced before the
exception occurred.

@param output the buffer for the uncompressed data
@return the actual number of uncompressed bytes
@throws DataFormatException if the compressed data format is invalid
@throws ReadOnlyBufferException if the given output buffer is read-only
@throws IllegalStateException if the Inflater is closed
@see Inflater#needsInput
@see Inflater#needsDictionary
@since 11

## Inflater.getAdler()

```java
public int getAdler()
```

{@return the ADLER-32 value of the uncompressed data}
@throws IllegalStateException if the Inflater is closed

## Inflater.getTotalIn()

```java
public int getTotalIn()
```

Returns the total number of compressed bytes input so far.

@implSpec
This method returns the equivalent of {@code (int) getBytesRead()}
and therefore cannot return the correct value when it is greater
than {@link Integer#MAX_VALUE}.

@deprecated Use {@link #getBytesRead()} instead

@return the total number of compressed bytes input so far
@throws IllegalStateException if the Inflater is closed

## Inflater.getBytesRead()

```java
public long getBytesRead()
```

Returns the total number of compressed bytes input so far.

@return the total (non-negative) number of compressed bytes input so far
@throws IllegalStateException if the Inflater is closed
@since 1.5

## Inflater.getTotalOut()

```java
public int getTotalOut()
```

Returns the total number of uncompressed bytes output so far.

@implSpec
This method returns the equivalent of {@code (int) getBytesWritten()}
and therefore cannot return the correct value when it is greater
than {@link Integer#MAX_VALUE}.

@deprecated Use {@link #getBytesWritten()} instead

@return the total number of uncompressed bytes output so far
@throws IllegalStateException if the Inflater is closed

## Inflater.getBytesWritten()

```java
public long getBytesWritten()
```

Returns the total number of uncompressed bytes output so far.

@return the total (non-negative) number of uncompressed bytes output so far
@throws IllegalStateException if the Inflater is closed
@since 1.5

## Inflater.reset()

```java
public void reset()
```

Resets inflater so that a new set of input data can be processed.
@throws IllegalStateException if the Inflater is closed

## Inflater.end()

```java
public void end()
```

Closes and releases the resources held by this {@code Inflater}
and discards any unprocessed input.
<p>
If the {@code Inflater} is already closed then invoking this method has no effect.

@implSpec Subclasses should override this method to clean up the resources
acquired by the subclass.

@see #close()

## Inflater.close()

```java
public void close()
```

Closes and releases the resources held by this {@code Inflater}
and discards any unprocessed input.

@implSpec This method calls the {@link #end()} method.
@since 25