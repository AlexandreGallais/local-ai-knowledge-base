---
title: "Deflater class (java.util.zip) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/Deflater.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Deflater class (java.util.zip)

```java
public class Deflater implements AutoCloseable
```

This class provides support for general purpose compression using the
popular ZLIB compression library. The ZLIB compression library was
initially developed as part of the PNG graphics standard and is not
protected by patents. It is fully described in the specifications at
the java.util.zip
package description.

Unless otherwise noted, passing a `null` argument to a method
in this class will cause a `NullPointerException` to be
thrown.

This class deflates sequences of bytes into ZLIB compressed data format.
The input byte sequence is provided in either a byte array or a `ByteBuffer`,
via one of the `setInput()` methods. The output byte sequence is
written to the output byte array or `ByteBuffer` passed to the
`deflate()` methods.

To release the resources used by a `Deflater`, an application must close it
by invoking its `end()` or `close()` method.

**API note:** This class implements `AutoCloseable` to facilitate its usage with
`try`-with-resources statement. The close() method simply
calls `end()`.

The following code fragment demonstrates a trivial compression
and decompression of a string using `Deflater` and `Inflater`.

**See also:** Inflater

**Since:** 1.1

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

**See also:** Deflater#deflate(byte[], int, int, int)

**Since:** 1.7

## Deflater.SYNC_FLUSH

```java
public static final int SYNC_FLUSH
```

Compression flush mode used to flush out all pending output; may
degrade compression for some compression algorithms.

**See also:** Deflater#deflate(byte[], int, int, int)

**Since:** 1.7

## Deflater.FULL_FLUSH

```java
public static final int FULL_FLUSH
```

Compression flush mode used to flush out all pending output and
reset the deflater. Using this mode too often can seriously degrade
compression.

**See also:** Deflater#deflate(byte[], int, int, int)

**Since:** 1.7

## Deflater.Deflater(int, boolean)

```java
public Deflater(int level, boolean nowrap)
```

Creates a new compressor using the specified compression level.
If 'nowrap' is true then the ZLIB header and checksum fields will
not be used in order to support the compression format used in
both GZIP and PKZIP.

Parameters:

- `level`: the compression level (0-9)
- `nowrap`: if true then use GZIP compatible compression

## Deflater.Deflater(int)

```java
public Deflater(int level)
```

Creates a new compressor using the specified compression level.
Compressed data will be generated in ZLIB format.

Parameters:

- `level`: the compression level (0-9)

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

One of the `setInput()` methods should be called whenever
`needsInput()` returns true indicating that more input data
is required.

Parameters:

- `input`: the input data bytes
- `off`: the start offset of the data
- `len`: the length of the data

**See also:** Deflater#needsInput

## Deflater.setInput(byte[])

```java
public void setInput(byte[] input)
```

Sets input data for compression.

One of the `setInput()` methods should be called whenever
`needsInput()` returns true indicating that more input data
is required.

Parameters:

- `input`: the input data bytes

**See also:** Deflater#needsInput

## Deflater.setInput(ByteBuffer)

```java
public void setInput(ByteBuffer input)
```

Sets input data for compression.

One of the `setInput()` methods should be called whenever
`needsInput()` returns true indicating that more input data
is required.

The given buffer's position will be advanced as deflate
operations are performed, up to the buffer's limit.
The input buffer may be modified (refilled) between deflate
operations; doing so is equivalent to creating a new buffer
and setting it with this method.

Modifying the input buffer's contents, position, or limit
concurrently with an deflate operation will result in
undefined behavior, which may include incorrect operation
results or operation failure.

Parameters:

- `input`: the input data bytes

**See also:** Deflater#needsInput

**Since:** 11

## Deflater.setDictionary(byte[], int, int)

```java
public void setDictionary(byte[] dictionary, int off, int len)
```

Sets preset dictionary for compression. A preset dictionary is used
when the history buffer can be predetermined. When the data is later
uncompressed with Inflater.inflate(), Inflater.getAdler() can be called
in order to get the Adler-32 value of the dictionary required for
decompression.

Parameters:

- `dictionary`: the dictionary data bytes
- `off`: the start offset of the data
- `len`: the length of the data

**See also:** Inflater#inflate

**See also:** Inflater#getAdler()

Throws:

- `IllegalStateException`: if the Deflater is closed

## Deflater.setDictionary(byte[])

```java
public void setDictionary(byte[] dictionary)
```

Sets preset dictionary for compression. A preset dictionary is used
when the history buffer can be predetermined. When the data is later
uncompressed with Inflater.inflate(), Inflater.getAdler() can be called
in order to get the Adler-32 value of the dictionary required for
decompression.

Parameters:

- `dictionary`: the dictionary data bytes

**See also:** Inflater#inflate

**See also:** Inflater#getAdler()

Throws:

- `IllegalStateException`: if the Deflater is closed

## Deflater.setDictionary(ByteBuffer)

```java
public void setDictionary(ByteBuffer dictionary)
```

Sets preset dictionary for compression. A preset dictionary is used
when the history buffer can be predetermined. When the data is later
uncompressed with Inflater.inflate(), Inflater.getAdler() can be called
in order to get the Adler-32 value of the dictionary required for
decompression.

The bytes in given byte buffer will be fully consumed by this method.  On
return, its position will equal its limit.

Parameters:

- `dictionary`: the dictionary data bytes

**See also:** Inflater#inflate

**See also:** Inflater#getAdler()

**Since:** 11

Throws:

- `IllegalStateException`: if the Deflater is closed

## Deflater.setStrategy(int)

```java
public void setStrategy(int strategy)
```

Sets the compression strategy to the specified value.

 If the compression strategy is changed, the next invocation
of `deflate` will compress the input available so far with
the old strategy (and may be flushed); the new strategy will take
effect only after that invocation.

Parameters:

- `strategy`: the new compression strategy

Throws:

- `IllegalArgumentException`: if the compression strategy is invalid

## Deflater.setLevel(int)

```java
public void setLevel(int level)
```

Sets the compression level to the specified value.

 If the compression level is changed, the next invocation
of `deflate` will compress the input available so far
with the old level (and may be flushed); the new level will
take effect only after that invocation.

Parameters:

- `level`: the new compression level (0-9)

Throws:

- `IllegalArgumentException`: if the compression level is invalid

## Deflater.needsInput()

```java
public boolean needsInput()
```

Returns true if no data remains in the input buffer. This can
be used to determine if one of the `setInput()` methods should be
called in order to provide more input.

**Returns:** true if the input data buffer is empty and setInput()
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

**Returns:** true if the end of the compressed data output stream has
been reached

## Deflater.deflate(byte[], int, int)

```java
public int deflate(byte[] output, int off, int len)
```

Compresses the input data and fills specified buffer with compressed
data. Returns actual number of bytes of compressed data. A return value
of 0 indicates that needsInput should be called
in order to determine if more input data is required.

This method uses `NO_FLUSH` as its compression flush mode.
An invocation of this method of the form `deflater.deflate(b, off, len)`
yields the same result as the invocation of
`deflater.deflate(b, off, len, Deflater.NO_FLUSH)`.

Parameters:

- `output`: the buffer for the compressed data
- `off`: the start offset of the data
- `len`: the maximum number of bytes of compressed data

**Returns:** the actual number of bytes of compressed data written to the
        output buffer

Throws:

- `IllegalStateException`: if the Deflater is closed

## Deflater.deflate(byte[])

```java
public int deflate(byte[] output)
```

Compresses the input data and fills specified buffer with compressed
data. Returns actual number of bytes of compressed data. A return value
of 0 indicates that needsInput should be called
in order to determine if more input data is required.

This method uses `NO_FLUSH` as its compression flush mode.
An invocation of this method of the form `deflater.deflate(b)`
yields the same result as the invocation of
`deflater.deflate(b, 0, b.length, Deflater.NO_FLUSH)`.

Parameters:

- `output`: the buffer for the compressed data

**Returns:** the actual number of bytes of compressed data written to the
        output buffer

Throws:

- `IllegalStateException`: if the Deflater is closed

## Deflater.deflate(ByteBuffer)

```java
public int deflate(ByteBuffer output)
```

Compresses the input data and fills specified buffer with compressed
data. Returns actual number of bytes of compressed data. A return value
of 0 indicates that needsInput should be called
in order to determine if more input data is required.

This method uses `NO_FLUSH` as its compression flush mode.
An invocation of this method of the form `deflater.deflate(output)`
yields the same result as the invocation of
`deflater.deflate(output, Deflater.NO_FLUSH)`.

Parameters:

- `output`: the buffer for the compressed data

**Returns:** the actual number of bytes of compressed data written to the
        output buffer

**Since:** 11

Throws:

- `ReadOnlyBufferException`: if the given output buffer is read-only
- `IllegalStateException`: if the Deflater is closed

## Deflater.deflate(byte[], int, int, int)

```java
public int deflate(byte[] output, int off, int len, int flush)
```

Compresses the input data and fills the specified buffer with compressed
data. Returns actual number of bytes of data compressed.

Compression flush mode is one of the following three modes:

- `NO_FLUSH`: allows the deflater to decide how much data
to accumulate, before producing output, in order to achieve the best
compression (should be used in normal use scenario). A return value
of 0 in this flush mode indicates that `needsInput()` should
be called in order to determine if more input data is required.

- `SYNC_FLUSH`: all pending output in the deflater is flushed,
to the specified output buffer, so that an inflater that works on
compressed data can get all input data available so far (In particular
the `needsInput()` returns `true` after this invocation
if enough output space is provided). Flushing with `SYNC_FLUSH`
may degrade compression for some compression algorithms and so it
should be used only when necessary.

- `FULL_FLUSH`: all pending output is flushed out as with
`SYNC_FLUSH`. The compression state is reset so that the inflater
that works on the compressed output data can restart from this point
if previous compressed data has been damaged or if random access is
desired. Using `FULL_FLUSH` too often can seriously degrade
compression.

In the case of `FULL_FLUSH` or `SYNC_FLUSH`, if
the return value is `len`, the space available in output
buffer `b`, this method should be invoked again with the same
`flush` parameter and more output space. Make sure that
`len` is greater than 6 to avoid flush marker (5 bytes) being
repeatedly output to the output buffer every time this method is
invoked.

If the `setInput(ByteBuffer)` method was called to provide a buffer
for input, the input buffer's position will be advanced by the number of bytes
consumed by this operation.

Parameters:

- `output`: the buffer for the compressed data
- `off`: the start offset of the data
- `len`: the maximum number of bytes of compressed data
- `flush`: the compression flush mode

**Returns:** the actual number of bytes of compressed data written to
        the output buffer

**Since:** 1.7

Throws:

- `IllegalArgumentException`: if the flush mode is invalid
- `IllegalStateException`: if the Deflater is closed
