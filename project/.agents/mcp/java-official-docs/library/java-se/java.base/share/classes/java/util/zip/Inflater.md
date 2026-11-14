---
title: "Inflater class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/Inflater.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Inflater class (java.util.zip)

```java
public class Inflater implements AutoCloseable
```

This class provides support for general purpose decompression using the
popular ZLIB compression library. The ZLIB compression library was
initially developed as part of the PNG graphics standard and is not
protected by patents. It is fully described in the specifications at
the java.util.zip
package description.

Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

This class inflates sequences of ZLIB compressed bytes. The input byte
sequence is provided in either a byte array or a `ByteBuffer`, via one of the
`setInput()` methods. The output byte sequence is written to the
output byte array or `ByteBuffer` passed to the `inflate()` methods.

To release the resources used by an `Inflater`, an application must close it
by invoking its `end()` or `close()` method.

**API note:** This class implements `AutoCloseable` to facilitate its usage with
`try`-with-resources statement. The close() method simply
calls `end()`.

The following code fragment demonstrates a trivial compression
and decompression of a string using `Deflater` and `Inflater`.

**See also:** Deflater

**Since:** 1.1

## Inflater.Inflater(boolean)

```java
public Inflater(boolean nowrap)
```

Creates a new decompressor. If the parameter 'nowrap' is true then
the ZLIB header and checksum fields will not be used. This provides
compatibility with the compression format used by both GZIP and PKZIP.

Note: When using the 'nowrap' option it is also necessary to provide
an extra "dummy" byte as input. This is required by the ZLIB native
library in order to support certain optimizations.

Parameters:

- `nowrap`: if true then support GZIP compatible compression

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

One of the `setInput()` methods should be called whenever
`needsInput()` returns true indicating that more input data
is required.

Parameters:

- `input`: the input data bytes
- `off`: the start offset of the input data
- `len`: the length of the input data

**See also:** Inflater#needsInput

## Inflater.setInput(byte[])

```java
public void setInput(byte[] input)
```

Sets input data for decompression.

One of the `setInput()` methods should be called whenever
`needsInput()` returns true indicating that more input data
is required.

Parameters:

- `input`: the input data bytes

**See also:** Inflater#needsInput

## Inflater.setInput(ByteBuffer)

```java
public void setInput(ByteBuffer input)
```

Sets input data for decompression.

One of the `setInput()` methods should be called whenever
`needsInput()` returns true indicating that more input data
is required.

The given buffer's position will be advanced as inflate
operations are performed, up to the buffer's limit.
The input buffer may be modified (refilled) between inflate
operations; doing so is equivalent to creating a new buffer
and setting it with this method.

Modifying the input buffer's contents, position, or limit
concurrently with an inflate operation will result in
undefined behavior, which may include incorrect operation
results or operation failure.

Parameters:

- `input`: the input data bytes

**See also:** Inflater#needsInput

**Since:** 11

## Inflater.setDictionary(byte[], int, int)

```java
public void setDictionary(byte[] dictionary, int off, int len)
```

Sets the preset dictionary to the given array of bytes. Should be
called when inflate() returns 0 and needsDictionary() returns true
indicating that a preset dictionary is required. The method getAdler()
can be used to get the Adler-32 value of the dictionary needed.

Parameters:

- `dictionary`: the dictionary data bytes
- `off`: the start offset of the data
- `len`: the length of the data

**See also:** Inflater#needsDictionary

**See also:** Inflater#getAdler

Throws:

- `IllegalStateException`: if the Inflater is closed

## Inflater.setDictionary(byte[])

```java
public void setDictionary(byte[] dictionary)
```

Sets the preset dictionary to the given array of bytes. Should be
called when inflate() returns 0 and needsDictionary() returns true
indicating that a preset dictionary is required. The method getAdler()
can be used to get the Adler-32 value of the dictionary needed.

Parameters:

- `dictionary`: the dictionary data bytes

**See also:** Inflater#needsDictionary

**See also:** Inflater#getAdler

Throws:

- `IllegalStateException`: if the Inflater is closed

## Inflater.setDictionary(ByteBuffer)

```java
public void setDictionary(ByteBuffer dictionary)
```

Sets the preset dictionary to the bytes in the given buffer. Should be
called when inflate() returns 0 and needsDictionary() returns true
indicating that a preset dictionary is required. The method getAdler()
can be used to get the Adler-32 value of the dictionary needed.

The bytes in given byte buffer will be fully consumed by this method.  On
return, its position will equal its limit.

Parameters:

- `dictionary`: the dictionary data bytes

**See also:** Inflater#needsDictionary

**See also:** Inflater#getAdler

**Since:** 11

Throws:

- `IllegalStateException`: if the Inflater is closed

## Inflater.getRemaining()

```java
public int getRemaining()
```

Returns the total number of bytes remaining in the input buffer.
This can be used to find out what bytes still remain in the input
buffer after decompression has finished.

**Returns:** the total number of bytes remaining in the input buffer

## Inflater.needsInput()

```java
public boolean needsInput()
```

Returns true if no data remains in the input buffer. This can
be used to determine if one of the `setInput()` methods should be
called in order to provide more input.

**Returns:** true if no data remains in the input buffer

## Inflater.needsDictionary()

```java
public boolean needsDictionary()
```

**See also:** Inflater#setDictionary

## Inflater.finished()

```java
public boolean finished()
```

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

If the `setInput(ByteBuffer)` method was called to provide a buffer
for input, the input buffer's position will be advanced by the number of bytes
consumed by this operation, even in the event that a `DataFormatException`
is thrown.

The remaining byte count will be reduced by
the number of consumed input bytes.  If the `setInput(ByteBuffer)`
method was called to provide a buffer for input, the input buffer's position
will be advanced the number of consumed bytes.

These byte totals, as well as
the total bytes read
and the total bytes written
values, will be updated even in the event that a `DataFormatException`
is thrown to reflect the amount of data consumed and produced before the
exception occurred.

Parameters:

- `output`: the buffer for the uncompressed data
- `off`: the start offset of the data
- `len`: the maximum number of uncompressed bytes

**Returns:** the actual number of uncompressed bytes

**See also:** Inflater#needsInput

**See also:** Inflater#needsDictionary

Throws:

- `DataFormatException`: if the compressed data format is invalid
- `IllegalStateException`: if the Inflater is closed

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

The remaining byte count will be reduced by
the number of consumed input bytes.  If the `setInput(ByteBuffer)`
method was called to provide a buffer for input, the input buffer's position
will be advanced the number of consumed bytes.

These byte totals, as well as
the total bytes read
and the total bytes written
values, will be updated even in the event that a `DataFormatException`
is thrown to reflect the amount of data consumed and produced before the
exception occurred.

Parameters:

- `output`: the buffer for the uncompressed data

**Returns:** the actual number of uncompressed bytes

**See also:** Inflater#needsInput

**See also:** Inflater#needsDictionary

Throws:

- `DataFormatException`: if the compressed data format is invalid
- `IllegalStateException`: if the Inflater is closed

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

On success, the position of the given `output` byte buffer will be
advanced by as many bytes as were produced by the operation, which is equal
to the number returned by this method.  Note that the position of the
`output` buffer will be advanced even in the event that a
`DataFormatException` is thrown.

The remaining byte count will be reduced by
the number of consumed input bytes.  If the `setInput(ByteBuffer)`
method was called to provide a buffer for input, the input buffer's position
will be advanced the number of consumed bytes.

These byte totals, as well as
the total bytes read
and the total bytes written
values, will be updated even in the event that a `DataFormatException`
is thrown to reflect the amount of data consumed and produced before the
exception occurred.

Parameters:

- `output`: the buffer for the uncompressed data

**Returns:** the actual number of uncompressed bytes

**See also:** Inflater#needsInput

**See also:** Inflater#needsDictionary

**Since:** 11

Throws:

- `DataFormatException`: if the compressed data format is invalid
- `ReadOnlyBufferException`: if the given output buffer is read-only
- `IllegalStateException`: if the Inflater is closed

## Inflater.getAdler()

```java
public int getAdler()
```

Throws:

- `IllegalStateException`: if the Inflater is closed

## Inflater.getTotalIn()

```java
public int getTotalIn()
```

Returns the total number of compressed bytes input so far.

**Implementation requirements:** This method returns the equivalent of `(int) getBytesRead()`
and therefore cannot return the correct value when it is greater
than `Integer.MAX_VALUE`.

**Deprecated:** Use `getBytesRead()` instead

**Returns:** the total number of compressed bytes input so far

Throws:

- `IllegalStateException`: if the Inflater is closed

## Inflater.getBytesRead()

```java
public long getBytesRead()
```

Returns the total number of compressed bytes input so far.

**Returns:** the total (non-negative) number of compressed bytes input so far

**Since:** 1.5

Throws:

- `IllegalStateException`: if the Inflater is closed

## Inflater.getTotalOut()

```java
public int getTotalOut()
```

Returns the total number of uncompressed bytes output so far.

**Implementation requirements:** This method returns the equivalent of `(int) getBytesWritten()`
and therefore cannot return the correct value when it is greater
than `Integer.MAX_VALUE`.

**Deprecated:** Use `getBytesWritten()` instead

**Returns:** the total number of uncompressed bytes output so far

Throws:

- `IllegalStateException`: if the Inflater is closed

## Inflater.getBytesWritten()

```java
public long getBytesWritten()
```

Returns the total number of uncompressed bytes output so far.

**Returns:** the total (non-negative) number of uncompressed bytes output so far

**Since:** 1.5

Throws:

- `IllegalStateException`: if the Inflater is closed

## Inflater.reset()

```java
public void reset()
```

Resets inflater so that a new set of input data can be processed.

Throws:

- `IllegalStateException`: if the Inflater is closed

## Inflater.end()

```java
public void end()
```

Closes and releases the resources held by this `Inflater`
and discards any unprocessed input.

If the `Inflater` is already closed then invoking this method has no effect.

**Implementation requirements:** Subclasses should override this method to clean up the resources
acquired by the subclass.

**See also:** #close()

## Inflater.close()

```java
public void close()
```

Closes and releases the resources held by this `Inflater`
and discards any unprocessed input.

**Implementation requirements:** This method calls the `end()` method.

**Since:** 25
