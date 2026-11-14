# Deflater class (java.util.zip)

```java
public class Deflater implements AutoCloseable
```

This class provides support for general purpose compression using the
popular ZLIB compression library. The ZLIB compression library was
initially developed as part of the PNG graphics standard and is not
protected by patents. It is fully described in the specifications at
the <a href="package-summary.html#package-description">java.util.zip
package description</a>.
<p>
Unless otherwise noted, passing a {@code null} argument to a method
in this class will cause a {@link NullPointerException} to be
thrown.
<p>
This class deflates sequences of bytes into ZLIB compressed data format.
The input byte sequence is provided in either a byte array or a {@link ByteBuffer},
via one of the {@code setInput()} methods. The output byte sequence is
written to the output byte array or {@code ByteBuffer} passed to the
{@code deflate()} methods.
<p>
To release the resources used by a {@code Deflater}, an application must close it
by invoking its {@link #end()} or {@link #close()} method.

@apiNote
This class implements {@link AutoCloseable} to facilitate its usage with
{@code try}-with-resources statement. The {@linkplain Deflater#close() close() method} simply
calls {@code end()}.

<p>
The following code fragment demonstrates a trivial compression
and decompression of a string using {@code Deflater} and {@code Inflater}.
{@snippet id="compdecomp" lang="java" class="Snippets" region="DeflaterInflaterExample"}

@see         Inflater
@author      David Connelly
@since 1.1

## Deflater.DEFLATED

```java
public static final int DEFLATED
```

Compression method for the deflate algorithm (the only one currently
supported).

## Deflater.NO_COMPRESSION

```java
public static final int NO_COMPRESSION
```

Compression level for no compression.

## Deflater.BEST_SPEED

```java
public static final int BEST_SPEED
```

Compression level for fastest compression.

## Deflater.BEST_COMPRESSION

```java
public static final int BEST_COMPRESSION
```

Compression level for best compression.

## Deflater.DEFAULT_COMPRESSION

```java
public static final int DEFAULT_COMPRESSION
```

Default compression level.

## Deflater.FILTERED

```java
public static final int FILTERED
```

Compression strategy best used for data consisting mostly of small
values with a somewhat random distribution. Forces more Huffman coding
and less string matching.

## Deflater.HUFFMAN_ONLY

```java
public static final int HUFFMAN_ONLY
```

Compression strategy for Huffman coding only.

## Deflater.DEFAULT_STRATEGY

```java
public static final int DEFAULT_STRATEGY
```

Default compression strategy.

## Deflater.NO_FLUSH

```java
public static final int NO_FLUSH
```

Compression flush mode used to achieve best compression result.

@see Deflater#deflate(byte[], int, int, int)
@since 1.7

## Deflater.SYNC_FLUSH

```java
public static final int SYNC_FLUSH
```

Compression flush mode used to flush out all pending output; may
degrade compression for some compression algorithms.

@see Deflater#deflate(byte[], int, int, int)
@since 1.7

## Deflater.FULL_FLUSH

```java
public static final int FULL_FLUSH
```

Compression flush mode used to flush out all pending output and
reset the deflater. Using this mode too often can seriously degrade
compression.

@see Deflater#deflate(byte[], int, int, int)
@since 1.7

## Deflater.Deflater(int, boolean)

```java
public Deflater(int level, boolean nowrap)
```

Creates a new compressor using the specified compression level.
If 'nowrap' is true then the ZLIB header and checksum fields will
not be used in order to support the compression format used in
both GZIP and PKZIP.
@param level the compression level (0-9)
@param nowrap if true then use GZIP compatible compression

## Deflater.Deflater(int)

```java
public Deflater(int level)
```

Creates a new compressor using the specified compression level.
Compressed data will be generated in ZLIB format.
@param level the compression level (0-9)

## Deflater.Deflater()

```java
public Deflater()
```

Creates a new compressor with the default compression level.
Compressed data will be generated in ZLIB format.

## Deflater.setInput(byte[], int, int)

```java
public void setInput(byte[] input, int off, int len)
```

Sets input data for compression.
<p>
One of the {@code setInput()} methods should be called whenever
{@code needsInput()} returns true indicating that more input data
is required.
@param input the input data bytes
@param off the start offset of the data
@param len the length of the data
@see Deflater#needsInput

## Deflater.setInput(byte[])

```java
public void setInput(byte[] input)
```

Sets input data for compression.
<p>
One of the {@code setInput()} methods should be called whenever
{@code needsInput()} returns true indicating that more input data
is required.
@param input the input data bytes
@see Deflater#needsInput

## Deflater.setInput(ByteBuffer)

```java
public void setInput(ByteBuffer input)
```

Sets input data for compression.
<p>
One of the {@code setInput()} methods should be called whenever
{@code needsInput()} returns true indicating that more input data
is required.
<p>
The given buffer's position will be advanced as deflate
operations are performed, up to the buffer's limit.
The input buffer may be modified (refilled) between deflate
operations; doing so is equivalent to creating a new buffer
and setting it with this method.
<p>
Modifying the input buffer's contents, position, or limit
concurrently with an deflate operation will result in
undefined behavior, which may include incorrect operation
results or operation failure.

@param input the input data bytes
@see Deflater#needsInput
@since 11

## Deflater.setDictionary(byte[], int, int)

```java
public void setDictionary(byte[] dictionary, int off, int len)
```

Sets preset dictionary for compression. A preset dictionary is used
when the history buffer can be predetermined. When the data is later
uncompressed with Inflater.inflate(), Inflater.getAdler() can be called
in order to get the Adler-32 value of the dictionary required for
decompression.
@param dictionary the dictionary data bytes
@param off the start offset of the data
@param len the length of the data
@throws IllegalStateException if the Deflater is closed
@see Inflater#inflate
@see Inflater#getAdler()

## Deflater.setDictionary(byte[])

```java
public void setDictionary(byte[] dictionary)
```

Sets preset dictionary for compression. A preset dictionary is used
when the history buffer can be predetermined. When the data is later
uncompressed with Inflater.inflate(), Inflater.getAdler() can be called
in order to get the Adler-32 value of the dictionary required for
decompression.
@param dictionary the dictionary data bytes
@throws IllegalStateException if the Deflater is closed
@see Inflater#inflate
@see Inflater#getAdler()

## Deflater.setDictionary(ByteBuffer)

```java
public void setDictionary(ByteBuffer dictionary)
```

Sets preset dictionary for compression. A preset dictionary is used
when the history buffer can be predetermined. When the data is later
uncompressed with Inflater.inflate(), Inflater.getAdler() can be called
in order to get the Adler-32 value of the dictionary required for
decompression.
<p>
The bytes in given byte buffer will be fully consumed by this method.  On
return, its position will equal its limit.

@param dictionary the dictionary data bytes
@throws IllegalStateException if the Deflater is closed
@see Inflater#inflate
@see Inflater#getAdler()

@since 11

## Deflater.setStrategy(int)

```java
public void setStrategy(int strategy)
```

Sets the compression strategy to the specified value.

<p> If the compression strategy is changed, the next invocation
of {@code deflate} will compress the input available so far with
the old strategy (and may be flushed); the new strategy will take
effect only after that invocation.

@param strategy the new compression strategy
@throws    IllegalArgumentException if the compression strategy is
                                    invalid

## Deflater.setLevel(int)

```java
public void setLevel(int level)
```

Sets the compression level to the specified value.

<p> If the compression level is changed, the next invocation
of {@code deflate} will compress the input available so far
with the old level (and may be flushed); the new level will
take effect only after that invocation.

@param level the new compression level (0-9)
@throws    IllegalArgumentException if the compression level is invalid

## Deflater.needsInput()

```java
public boolean needsInput()
```

Returns true if no data remains in the input buffer. This can
be used to determine if one of the {@code setInput()} methods should be
called in order to provide more input.

@return true if the input data buffer is empty and setInput()
should be called in order to provide more input

## Deflater.finish()

```java
public void finish()
```

When called, indicates that compression should end with the current
contents of the input buffer.

## Deflater.finished()

```java
public boolean finished()
```

Returns true if the end of the compressed data output stream has
been reached.
@return true if the end of the compressed data output stream has
been reached

## Deflater.deflate(byte[], int, int)

```java
public int deflate(byte[] output, int off, int len)
```

Compresses the input data and fills specified buffer with compressed
data. Returns actual number of bytes of compressed data. A return value
of 0 indicates that {@link #needsInput() needsInput} should be called
in order to determine if more input data is required.

<p>This method uses {@link #NO_FLUSH} as its compression flush mode.
An invocation of this method of the form {@code deflater.deflate(b, off, len)}
yields the same result as the invocation of
{@code deflater.deflate(b, off, len, Deflater.NO_FLUSH)}.

@param output the buffer for the compressed data
@param off the start offset of the data
@param len the maximum number of bytes of compressed data
@return the actual number of bytes of compressed data written to the
        output buffer
@throws IllegalStateException if the Deflater is closed

## Deflater.deflate(byte[])

```java
public int deflate(byte[] output)
```

Compresses the input data and fills specified buffer with compressed
data. Returns actual number of bytes of compressed data. A return value
of 0 indicates that {@link #needsInput() needsInput} should be called
in order to determine if more input data is required.

<p>This method uses {@link #NO_FLUSH} as its compression flush mode.
An invocation of this method of the form {@code deflater.deflate(b)}
yields the same result as the invocation of
{@code deflater.deflate(b, 0, b.length, Deflater.NO_FLUSH)}.

@param output the buffer for the compressed data
@return the actual number of bytes of compressed data written to the
        output buffer
@throws IllegalStateException if the Deflater is closed

## Deflater.deflate(ByteBuffer)

```java
public int deflate(ByteBuffer output)
```

Compresses the input data and fills specified buffer with compressed
data. Returns actual number of bytes of compressed data. A return value
of 0 indicates that {@link #needsInput() needsInput} should be called
in order to determine if more input data is required.

<p>This method uses {@link #NO_FLUSH} as its compression flush mode.
An invocation of this method of the form {@code deflater.deflate(output)}
yields the same result as the invocation of
{@code deflater.deflate(output, Deflater.NO_FLUSH)}.

@param output the buffer for the compressed data
@return the actual number of bytes of compressed data written to the
        output buffer
@throws ReadOnlyBufferException if the given output buffer is read-only
@throws IllegalStateException if the Deflater is closed
@since 11

## Deflater.deflate(byte[], int, int, int)

```java
public int deflate(byte[] output, int off, int len, int flush)
```

Compresses the input data and fills the specified buffer with compressed
data. Returns actual number of bytes of data compressed.

<p>Compression flush mode is one of the following three modes:

<ul>
<li>{@link #NO_FLUSH}: allows the deflater to decide how much data
to accumulate, before producing output, in order to achieve the best
compression (should be used in normal use scenario). A return value
of 0 in this flush mode indicates that {@link #needsInput()} should
be called in order to determine if more input data is required.

<li>{@link #SYNC_FLUSH}: all pending output in the deflater is flushed,
to the specified output buffer, so that an inflater that works on
compressed data can get all input data available so far (In particular
the {@link #needsInput()} returns {@code true} after this invocation
if enough output space is provided). Flushing with {@link #SYNC_FLUSH}
may degrade compression for some compression algorithms and so it
should be used only when necessary.

<li>{@link #FULL_FLUSH}: all pending output is flushed out as with
{@link #SYNC_FLUSH}. The compression state is reset so that the inflater
that works on the compressed output data can restart from this point
if previous compressed data has been damaged or if random access is
desired. Using {@link #FULL_FLUSH} too often can seriously degrade
compression.
</ul>

<p>In the case of {@link #FULL_FLUSH} or {@link #SYNC_FLUSH}, if
the return value is {@code len}, the space available in output
buffer {@code b}, this method should be invoked again with the same
{@code flush} parameter and more output space. Make sure that
{@code len} is greater than 6 to avoid flush marker (5 bytes) being
repeatedly output to the output buffer every time this method is
invoked.

<p>If the {@link #setInput(ByteBuffer)} method was called to provide a buffer
for input, the input buffer's position will be advanced by the number of bytes
consumed by this operation.

@param output the buffer for the compressed data
@param off the start offset of the data
@param len the maximum number of bytes of compressed data
@param flush the compression flush mode
@return the actual number of bytes of compressed data written to
        the output buffer

@throws IllegalArgumentException if the flush mode is invalid
@throws IllegalStateException if the Deflater is closed
@since 1.7

## Deflater.deflate(ByteBuffer, int)

```java
public int deflate(ByteBuffer output, int flush)
```

Compresses the input data and fills the specified buffer with compressed
data. Returns actual number of bytes of data compressed.

<p>Compression flush mode is one of the following three modes:

<ul>
<li>{@link #NO_FLUSH}: allows the deflater to decide how much data
to accumulate, before producing output, in order to achieve the best
compression (should be used in normal use scenario). A return value
of 0 in this flush mode indicates that {@link #needsInput()} should
be called in order to determine if more input data is required.

<li>{@link #SYNC_FLUSH}: all pending output in the deflater is flushed,
to the specified output buffer, so that an inflater that works on
compressed data can get all input data available so far (In particular
the {@link #needsInput()} returns {@code true} after this invocation
if enough output space is provided). Flushing with {@link #SYNC_FLUSH}
may degrade compression for some compression algorithms and so it
should be used only when necessary.

<li>{@link #FULL_FLUSH}: all pending output is flushed out as with
{@link #SYNC_FLUSH}. The compression state is reset so that the inflater
that works on the compressed output data can restart from this point
if previous compressed data has been damaged or if random access is
desired. Using {@link #FULL_FLUSH} too often can seriously degrade
compression.
</ul>

<p>In the case of {@link #FULL_FLUSH} or {@link #SYNC_FLUSH}, if
the return value is equal to the {@linkplain ByteBuffer#remaining() remaining space}
of the buffer, this method should be invoked again with the same
{@code flush} parameter and more output space. Make sure that
the buffer has at least 6 bytes of remaining space to avoid the
flush marker (5 bytes) being repeatedly output to the output buffer
every time this method is invoked.

<p>On success, the position of the given {@code output} byte buffer will be
advanced by as many bytes as were produced by the operation, which is equal
to the number returned by this method.

<p>If the {@link #setInput(ByteBuffer)} method was called to provide a buffer
for input, the input buffer's position will be advanced by the number of bytes
consumed by this operation.

@param output the buffer for the compressed data
@param flush the compression flush mode
@return the actual number of bytes of compressed data written to
        the output buffer

@throws IllegalArgumentException if the flush mode is invalid
@throws ReadOnlyBufferException if the given output buffer is read-only
@throws IllegalStateException if the Deflater is closed
@since 11

## Deflater.getAdler()

```java
public int getAdler()
```

{@return the ADLER-32 value of the uncompressed data}
@throws IllegalStateException if the Deflater is closed

## Deflater.getTotalIn()

```java
public int getTotalIn()
```

Returns the total number of uncompressed bytes input so far.

@implSpec
This method returns the equivalent of {@code (int) getBytesRead()}
and therefore cannot return the correct value when it is greater
than {@link Integer#MAX_VALUE}.

@deprecated Use {@link #getBytesRead()} instead

@return the total number of uncompressed bytes input so far
@throws IllegalStateException if the Deflater is closed

## Deflater.getBytesRead()

```java
public long getBytesRead()
```

Returns the total number of uncompressed bytes input so far.

@return the total (non-negative) number of uncompressed bytes input so far
@throws IllegalStateException if the Deflater is closed
@since 1.5

## Deflater.getTotalOut()

```java
public int getTotalOut()
```

Returns the total number of compressed bytes output so far.

@implSpec
This method returns the equivalent of {@code (int) getBytesWritten()}
and therefore cannot return the correct value when it is greater
than {@link Integer#MAX_VALUE}.

@deprecated Use {@link #getBytesWritten()} instead

@return the total number of compressed bytes output so far
@throws IllegalStateException if the Deflater is closed

## Deflater.getBytesWritten()

```java
public long getBytesWritten()
```

Returns the total number of compressed bytes output so far.

@return the total (non-negative) number of compressed bytes output so far
@throws IllegalStateException if the Deflater is closed
@since 1.5

## Deflater.reset()

```java
public void reset()
```

Resets deflater so that a new set of input data can be processed.
Keeps current compression level and strategy settings.
@throws IllegalStateException if the Deflater is closed

## Deflater.end()

```java
public void end()
```

Closes and releases the resources held by this {@code Deflater}
and discards any unprocessed input.
<p>
If the {@code Deflater} is already closed then invoking this method has no effect.

@implSpec Subclasses should override this method to clean up the resources
acquired by the subclass.

@see #close()

## Deflater.close()

```java
public void close()
```

Closes and releases the resources held by this {@code Deflater}
and discards any unprocessed input.

@implSpec This method calls the {@link #end()} method.
@since 25