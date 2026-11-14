---
title: "Channels class (java.nio.channels)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/Channels.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Channels class (java.nio.channels)

```java
public final class Channels
```

Utility methods for channels and streams.

 This class defines static methods that support the interoperation of the
stream classes of the `java.io` package with the channel classes
of this package.

**Since:** 1.4

## Channels.newInputStream(ReadableByteChannel)

```java
public static InputStream newInputStream(ReadableByteChannel ch)
```

Constructs a stream that reads bytes from the given channel.

 The `read` and `transferTo` methods of the resulting stream
will throw an `IllegalBlockingModeException` if invoked while the
underlying channel is in non-blocking mode. The `transferTo` method
will also throw an `IllegalBlockingModeException` if invoked to
transfer bytes to an output stream that writes to an underlying channel in
non-blocking mode.  The stream will not be buffered, and
it will not support the mark or reset methods.  The stream will be safe for access by
multiple concurrent threads.  Closing the stream will in turn cause the
channel to be closed.

Parameters:

- `ch`: The channel from which bytes will be read

**Returns:** A new input stream

## Channels.newOutputStream(WritableByteChannel)

```java
public static OutputStream newOutputStream(WritableByteChannel ch)
```

Constructs a stream that writes bytes to the given channel.

 The `write` methods of the resulting stream will throw an
`IllegalBlockingModeException` if invoked while the underlying
channel is in non-blocking mode.  The stream will not be buffered.  The
stream will be safe for access by multiple concurrent threads.  Closing
the stream will in turn cause the channel to be closed.

Parameters:

- `ch`: The channel to which bytes will be written

**Returns:** A new output stream

## Channels.newInputStream(AsynchronousByteChannel)

```java
public static InputStream newInputStream(AsynchronousByteChannel ch)
```

Constructs a stream that reads bytes from the given channel.

 The stream will not be buffered, and it will not support the mark or reset methods.  The
stream will be safe for access by multiple concurrent threads.  Closing
the stream will in turn cause the channel to be closed.

Parameters:

- `ch`: The channel from which bytes will be read

**Returns:** A new input stream

**Since:** 1.7

## Channels.newOutputStream(AsynchronousByteChannel)

```java
public static OutputStream newOutputStream(AsynchronousByteChannel ch)
```

Constructs a stream that writes bytes to the given channel.

 The stream will not be buffered. The stream will be safe for access
by multiple concurrent threads.  Closing the stream will in turn cause
the channel to be closed.

Parameters:

- `ch`: The channel to which bytes will be written

**Returns:** A new output stream

**Since:** 1.7

## Channels.newChannel(InputStream)

```java
public static ReadableByteChannel newChannel(InputStream in)
```

Constructs a channel that reads bytes from the given stream.

 The resulting channel will not be buffered; it will simply redirect
its I/O operations to the given stream. Reading from the resulting
channel will read from the input stream and thus block until input is
available or end of file is reached. Closing the channel will in turn
cause the stream to be closed.

Parameters:

- `in`: The stream from which bytes are to be read

**Returns:** A new readable byte channel

## Channels.newChannel(OutputStream)

```java
public static WritableByteChannel newChannel(OutputStream out)
```

Constructs a channel that writes bytes to the given stream.

 The resulting channel will not be buffered; it will simply redirect
its I/O operations to the given stream.  Closing the channel will in
turn cause the stream to be closed.

Parameters:

- `out`: The stream to which bytes are to be written

**Returns:** A new writable byte channel

## Channels.newReader(ReadableByteChannel, CharsetDecoder, int)

```java
public static Reader newReader(ReadableByteChannel ch, CharsetDecoder dec, int minBufferCap)
```

Constructs a reader that decodes bytes from the given channel using the
given decoder.

 The resulting stream will contain an internal input buffer of at
least `minBufferCap` bytes.  The stream's `read` methods
will, as needed, fill the buffer by reading bytes from the underlying
channel; if the channel is in non-blocking mode when bytes are to be
read then an `IllegalBlockingModeException` will be thrown.  The
resulting stream will not otherwise be buffered, and it will not support
the mark or reset methods.
Closing the stream will in turn cause the channel to be closed.

Parameters:

- `ch`: The channel from which bytes will be read
- `dec`: The charset decoder to be used
- `minBufferCap`: The minimum capacity of the internal byte buffer, or `-1` if an implementation-dependent default capacity is to be used

**Returns:** A new reader

## Channels.newReader(ReadableByteChannel, String)

```java
public static Reader newReader(ReadableByteChannel ch, String csName)
```

Constructs a reader that decodes bytes from the given channel according
to the named charset.

 An invocation of this method of the form

behaves in exactly the same way as the expression

Parameters:

- `ch`: The channel from which bytes will be read
- `csName`: The name of the charset to be used

**Returns:** A new reader

Throws:

- `UnsupportedCharsetException`: If no support for the named charset is available in this instance of the Java virtual machine

## Channels.newReader(ReadableByteChannel, Charset)

```java
public static Reader newReader(ReadableByteChannel ch, Charset charset)
```

Constructs a reader that decodes bytes from the given channel according
to the given charset.

 An invocation of this method of the form

behaves in exactly the same way as the expression

 The reader's default action for malformed-input and unmappable-character
errors is to report
them. When more control over the error handling is required, the constructor
that takes a `java.nio.charset.CharsetDecoder` should be used.

Parameters:

- `ch`: The channel from which bytes will be read
- `charset`: The charset to be used

**Returns:** A new reader

**Since:** 10

## Channels.newWriter(WritableByteChannel, CharsetEncoder, int)

```java
public static Writer newWriter(WritableByteChannel ch, CharsetEncoder enc, int minBufferCap)
```

Constructs a writer that encodes characters using the given encoder and
writes the resulting bytes to the given channel.

 The resulting stream will contain an internal output buffer of at
least `minBufferCap` bytes.  The stream's `write` methods
will, as needed, flush the buffer by writing bytes to the underlying
channel; if the channel is in non-blocking mode when bytes are to be
written then an `IllegalBlockingModeException` will be thrown.
The resulting stream will not otherwise be buffered.  Closing the stream
will in turn cause the channel to be closed.

Parameters:

- `ch`: The channel to which bytes will be written
- `enc`: The charset encoder to be used
- `minBufferCap`: The minimum capacity of the internal byte buffer, or `-1` if an implementation-dependent default capacity is to be used. The value of `minBufferCap` may be ignored

**Implementation note:** The value of `minBufferCap` is ignored.

**Returns:** A new writer

## Channels.newWriter(WritableByteChannel, String)

```java
public static Writer newWriter(WritableByteChannel ch, String csName)
```

Constructs a writer that encodes characters according to the named
charset and writes the resulting bytes to the given channel.

 An invocation of this method of the form

behaves in exactly the same way as the expression

Parameters:

- `ch`: The channel to which bytes will be written
- `csName`: The name of the charset to be used

**Returns:** A new writer

Throws:

- `UnsupportedCharsetException`: If no support for the named charset is available in this instance of the Java virtual machine

## Channels.newWriter(WritableByteChannel, Charset)

```java
public static Writer newWriter(WritableByteChannel ch, Charset charset)
```

Constructs a writer that encodes characters according to the given
charset and writes the resulting bytes to the given channel.

 An invocation of this method of the form

behaves in exactly the same way as the expression

 The writer's default action for malformed-input and unmappable-character
errors is to report
them. When more control over the error handling is required, the constructor
that takes a `java.nio.charset.CharsetEncoder` should be used.

Parameters:

- `ch`: The channel to which bytes will be written
- `charset`: The charset to be used

**Returns:** A new writer

**Since:** 10
