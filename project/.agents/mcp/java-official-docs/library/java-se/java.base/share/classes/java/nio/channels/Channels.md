# Channels class (java.nio.channels)

```java
public final class Channels
```

Utility methods for channels and streams.

<p> This class defines static methods that support the interoperation of the
stream classes of the {@link java.io} package with the channel classes
of this package.  </p>


@author Mark Reinhold
@author Mike McCloskey
@author JSR-51 Expert Group
@since 1.4

## Channels.newInputStream(ReadableByteChannel)

```java
public static InputStream newInputStream(ReadableByteChannel ch)
```

Constructs a stream that reads bytes from the given channel.

<p> The {@code read} and {@code transferTo} methods of the resulting stream
will throw an {@link IllegalBlockingModeException} if invoked while the
underlying channel is in non-blocking mode. The {@code transferTo} method
will also throw an {@code IllegalBlockingModeException} if invoked to
transfer bytes to an output stream that writes to an underlying channel in
non-blocking mode.  The stream will not be buffered, and
it will not support the {@link InputStream#mark mark} or {@link
InputStream#reset reset} methods.  The stream will be safe for access by
multiple concurrent threads.  Closing the stream will in turn cause the
channel to be closed.  </p>

@param  ch
        The channel from which bytes will be read

@return  A new input stream

## Channels.newOutputStream(WritableByteChannel)

```java
public static OutputStream newOutputStream(WritableByteChannel ch)
```

Constructs a stream that writes bytes to the given channel.

<p> The {@code write} methods of the resulting stream will throw an
{@link IllegalBlockingModeException} if invoked while the underlying
channel is in non-blocking mode.  The stream will not be buffered.  The
stream will be safe for access by multiple concurrent threads.  Closing
the stream will in turn cause the channel to be closed.  </p>

@param  ch
        The channel to which bytes will be written

@return  A new output stream

## Channels.newInputStream(AsynchronousByteChannel)

```java
public static InputStream newInputStream(AsynchronousByteChannel ch)
```

Constructs a stream that reads bytes from the given channel.

<p> The stream will not be buffered, and it will not support the {@link
InputStream#mark mark} or {@link InputStream#reset reset} methods.  The
stream will be safe for access by multiple concurrent threads.  Closing
the stream will in turn cause the channel to be closed.  </p>

@param  ch
        The channel from which bytes will be read

@return  A new input stream

@since 1.7

## Channels.newOutputStream(AsynchronousByteChannel)

```java
public static OutputStream newOutputStream(AsynchronousByteChannel ch)
```

Constructs a stream that writes bytes to the given channel.

<p> The stream will not be buffered. The stream will be safe for access
by multiple concurrent threads.  Closing the stream will in turn cause
the channel to be closed.  </p>

@param  ch
        The channel to which bytes will be written

@return  A new output stream

@since 1.7

## Channels.newChannel(InputStream)

```java
public static ReadableByteChannel newChannel(InputStream in)
```

Constructs a channel that reads bytes from the given stream.

<p> The resulting channel will not be buffered; it will simply redirect
its I/O operations to the given stream. Reading from the resulting
channel will read from the input stream and thus block until input is
available or end of file is reached. Closing the channel will in turn
cause the stream to be closed.  </p>

@param  in
        The stream from which bytes are to be read

@return  A new readable byte channel

## Channels.newChannel(OutputStream)

```java
public static WritableByteChannel newChannel(OutputStream out)
```

Constructs a channel that writes bytes to the given stream.

<p> The resulting channel will not be buffered; it will simply redirect
its I/O operations to the given stream.  Closing the channel will in
turn cause the stream to be closed.  </p>

@param  out
        The stream to which bytes are to be written

@return  A new writable byte channel

## Channels.newReader(ReadableByteChannel, CharsetDecoder, int)

```java
public static Reader newReader(ReadableByteChannel ch, CharsetDecoder dec, int minBufferCap)
```

Constructs a reader that decodes bytes from the given channel using the
given decoder.

<p> The resulting stream will contain an internal input buffer of at
least {@code minBufferCap} bytes.  The stream's {@code read} methods
will, as needed, fill the buffer by reading bytes from the underlying
channel; if the channel is in non-blocking mode when bytes are to be
read then an {@link IllegalBlockingModeException} will be thrown.  The
resulting stream will not otherwise be buffered, and it will not support
the {@link Reader#mark mark} or {@link Reader#reset reset} methods.
Closing the stream will in turn cause the channel to be closed.  </p>

@param  ch
        The channel from which bytes will be read

@param  dec
        The charset decoder to be used

@param  minBufferCap
        The minimum capacity of the internal byte buffer,
        or {@code -1} if an implementation-dependent
        default capacity is to be used

@return  A new reader

## Channels.newReader(ReadableByteChannel, String)

```java
public static Reader newReader(ReadableByteChannel ch, String csName)
```

Constructs a reader that decodes bytes from the given channel according
to the named charset.

<p> An invocation of this method of the form

{@snippet lang=java :
    Channels.newReader(ch, csname)
}

behaves in exactly the same way as the expression

{@snippet lang=java :
    Channels.newReader(ch, Charset.forName(csName))
}

@param  ch
        The channel from which bytes will be read

@param  csName
        The name of the charset to be used

@return  A new reader

@throws  UnsupportedCharsetException
         If no support for the named charset is available
         in this instance of the Java virtual machine

## Channels.newReader(ReadableByteChannel, Charset)

```java
public static Reader newReader(ReadableByteChannel ch, Charset charset)
```

Constructs a reader that decodes bytes from the given channel according
to the given charset.

<p> An invocation of this method of the form

{@snippet lang=java :
    Channels.newReader(ch, charset)
}

behaves in exactly the same way as the expression

{@snippet lang=java :
    Channels.newReader(ch, charset.newDecoder(), -1)
}

<p> The reader's default action for malformed-input and unmappable-character
errors is to {@linkplain java.nio.charset.CodingErrorAction#REPORT report}
them. When more control over the error handling is required, the constructor
that takes a {@linkplain java.nio.charset.CharsetDecoder} should be used.

@param  ch The channel from which bytes will be read

@param  charset The charset to be used

@return  A new reader

@since 10

## Channels.newWriter(WritableByteChannel, CharsetEncoder, int)

```java
public static Writer newWriter(WritableByteChannel ch, CharsetEncoder enc, int minBufferCap)
```

Constructs a writer that encodes characters using the given encoder and
writes the resulting bytes to the given channel.

<p> The resulting stream will contain an internal output buffer of at
least {@code minBufferCap} bytes.  The stream's {@code write} methods
will, as needed, flush the buffer by writing bytes to the underlying
channel; if the channel is in non-blocking mode when bytes are to be
written then an {@link IllegalBlockingModeException} will be thrown.
The resulting stream will not otherwise be buffered.  Closing the stream
will in turn cause the channel to be closed.  </p>

@implNote
The value of {@code minBufferCap} is ignored.

@param  ch
        The channel to which bytes will be written

@param  enc
        The charset encoder to be used

@param  minBufferCap
        The minimum capacity of the internal byte buffer,
        or {@code -1} if an implementation-dependent
        default capacity is to be used. The value of
        {@code minBufferCap} may be ignored

@return  A new writer

## Channels.newWriter(WritableByteChannel, String)

```java
public static Writer newWriter(WritableByteChannel ch, String csName)
```

Constructs a writer that encodes characters according to the named
charset and writes the resulting bytes to the given channel.

<p> An invocation of this method of the form

{@snippet lang=java :
    Channels.newWriter(ch, csname)
}

behaves in exactly the same way as the expression

{@snippet lang=java :
    Channels.newWriter(ch, Charset.forName(csName))
}

@param  ch
        The channel to which bytes will be written

@param  csName
        The name of the charset to be used

@return  A new writer

@throws  UnsupportedCharsetException
         If no support for the named charset is available
         in this instance of the Java virtual machine

## Channels.newWriter(WritableByteChannel, Charset)

```java
public static Writer newWriter(WritableByteChannel ch, Charset charset)
```

Constructs a writer that encodes characters according to the given
charset and writes the resulting bytes to the given channel.

<p> An invocation of this method of the form

{@snippet lang=java :
    Channels.newWriter(ch, charset)
}

behaves in exactly the same way as the expression

{@snippet lang=java :
    Channels.newWriter(ch, charset.newEncoder(), -1)
}

<p> The writer's default action for malformed-input and unmappable-character
errors is to {@linkplain java.nio.charset.CodingErrorAction#REPORT report}
them. When more control over the error handling is required, the constructor
that takes a {@linkplain java.nio.charset.CharsetEncoder} should be used.

@param  ch
        The channel to which bytes will be written

@param  charset
        The charset to be used

@return  A new writer

@since 10