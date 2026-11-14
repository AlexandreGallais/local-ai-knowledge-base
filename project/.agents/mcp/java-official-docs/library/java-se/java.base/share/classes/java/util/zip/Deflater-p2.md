---
title: "Deflater class (java.util.zip) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/Deflater.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Deflater class (java.util.zip) (part 2 of 2)

## Deflater.deflate(ByteBuffer, int)

```java
public int deflate(ByteBuffer output, int flush)
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
the return value is equal to the remaining space
of the buffer, this method should be invoked again with the same
`flush` parameter and more output space. Make sure that
the buffer has at least 6 bytes of remaining space to avoid the
flush marker (5 bytes) being repeatedly output to the output buffer
every time this method is invoked.

On success, the position of the given `output` byte buffer will be
advanced by as many bytes as were produced by the operation, which is equal
to the number returned by this method.

If the `setInput(ByteBuffer)` method was called to provide a buffer
for input, the input buffer's position will be advanced by the number of bytes
consumed by this operation.

Parameters:

- `output`: the buffer for the compressed data
- `flush`: the compression flush mode

**Returns:** the actual number of bytes of compressed data written to
        the output buffer

**Since:** 11

Throws:

- `IllegalArgumentException`: if the flush mode is invalid
- `ReadOnlyBufferException`: if the given output buffer is read-only
- `IllegalStateException`: if the Deflater is closed

## Deflater.getAdler()

```java
public int getAdler()
```

Throws:

- `IllegalStateException`: if the Deflater is closed

## Deflater.getTotalIn()

```java
public int getTotalIn()
```

Returns the total number of uncompressed bytes input so far.

**Implementation requirements:** This method returns the equivalent of `(int) getBytesRead()`
and therefore cannot return the correct value when it is greater
than `Integer.MAX_VALUE`.

**Deprecated:** Use `getBytesRead()` instead

**Returns:** the total number of uncompressed bytes input so far

Throws:

- `IllegalStateException`: if the Deflater is closed

## Deflater.getBytesRead()

```java
public long getBytesRead()
```

Returns the total number of uncompressed bytes input so far.

**Returns:** the total (non-negative) number of uncompressed bytes input so far

**Since:** 1.5

Throws:

- `IllegalStateException`: if the Deflater is closed

## Deflater.getTotalOut()

```java
public int getTotalOut()
```

Returns the total number of compressed bytes output so far.

**Implementation requirements:** This method returns the equivalent of `(int) getBytesWritten()`
and therefore cannot return the correct value when it is greater
than `Integer.MAX_VALUE`.

**Deprecated:** Use `getBytesWritten()` instead

**Returns:** the total number of compressed bytes output so far

Throws:

- `IllegalStateException`: if the Deflater is closed

## Deflater.getBytesWritten()

```java
public long getBytesWritten()
```

Returns the total number of compressed bytes output so far.

**Returns:** the total (non-negative) number of compressed bytes output so far

**Since:** 1.5

Throws:

- `IllegalStateException`: if the Deflater is closed

## Deflater.reset()

```java
public void reset()
```

Resets deflater so that a new set of input data can be processed.
Keeps current compression level and strategy settings.

Throws:

- `IllegalStateException`: if the Deflater is closed

## Deflater.end()

```java
public void end()
```

Closes and releases the resources held by this `Deflater`
and discards any unprocessed input.

If the `Deflater` is already closed then invoking this method has no effect.

**Implementation requirements:** Subclasses should override this method to clean up the resources
acquired by the subclass.

**See also:** #close()

## Deflater.close()

```java
public void close()
```

Closes and releases the resources held by this `Deflater`
and discards any unprocessed input.

**Implementation requirements:** This method calls the `end()` method.

**Since:** 25
