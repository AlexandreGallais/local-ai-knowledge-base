# Base64 class (java.util)

```java
public final class Base64
```

This class consists exclusively of static methods for obtaining
encoders and decoders for the Base64 encoding scheme. The
implementation of this class supports the following types of Base64
as specified in
<a href="http://www.ietf.org/rfc/rfc4648.txt">RFC 4648</a> and
<a href="http://www.ietf.org/rfc/rfc2045.txt">RFC 2045</a>.

<ul>
<li><a id="basic"><b>Basic</b></a>
<p> Uses "The Base64 Alphabet" as specified in Table 1 of
    RFC 4648 and RFC 2045 for encoding and decoding operation.
    The encoder does not add any line feed (line separator)
    character. The decoder rejects data that contains characters
    outside the base64 alphabet.</p></li>

<li><a id="url"><b>URL and Filename safe</b></a>
<p> Uses the "URL and Filename safe Base64 Alphabet" as specified
    in Table 2 of RFC 4648 for encoding and decoding. The
    encoder does not add any line feed (line separator) character.
    The decoder rejects data that contains characters outside the
    base64 alphabet.</p></li>

<li><a id="mime"><b>MIME</b></a>
<p> Uses "The Base64 Alphabet" as specified in Table 1 of
    RFC 2045 for encoding and decoding operation. The encoded output
    must be represented in lines of no more than 76 characters each
    and uses a carriage return {@code '\r'} followed immediately by
    a linefeed {@code '\n'} as the line separator. No line separator
    is added to the end of the encoded output. All line separators
    or other characters not found in the base64 alphabet table are
    ignored in decoding operation.</p></li>
</ul>

<p> Unless otherwise noted, passing a {@code null} argument to a
method of this class will cause a {@link java.lang.NullPointerException
NullPointerException} to be thrown.

@spec https://www.rfc-editor.org/info/rfc2045
     RFC 2045: Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet Message Bodies
@spec https://www.rfc-editor.org/info/rfc4648
     RFC 4648: The Base16, Base32, and Base64 Data Encodings
@author  Xueming Shen
@since   1.8

## Base64.getEncoder()

```java
public static Encoder getEncoder()
```

Returns a {@link Encoder} that encodes using the
<a href="#basic">Basic</a> type base64 encoding scheme.

@return  A Base64 encoder.

## Base64.getUrlEncoder()

```java
public static Encoder getUrlEncoder()
```

Returns a {@link Encoder} that encodes using the
<a href="#url">URL and Filename safe</a> type base64
encoding scheme.

@return  A Base64 encoder.

## Base64.getMimeEncoder()

```java
public static Encoder getMimeEncoder()
```

Returns a {@link Encoder} that encodes using the
<a href="#mime">MIME</a> type base64 encoding scheme.

@return  A Base64 encoder.

## Base64.getMimeEncoder(int, byte[])

```java
public static Encoder getMimeEncoder(int lineLength, byte[] lineSeparator)
```

Returns a {@link Encoder} that encodes using the
<a href="#mime">MIME</a> type base64 encoding scheme
with specified line length and line separators.

@param   lineLength
         the length of each output line (rounded down to nearest multiple
         of 4). If the rounded down line length is not a positive value,
         the output will not be separated in lines
@param   lineSeparator
         the line separator for each output line

@return  A Base64 encoder.

@throws  IllegalArgumentException if {@code lineSeparator} includes any
         character of "The Base64 Alphabet" as specified in Table 1 of
         RFC 2045.

## Base64.getDecoder()

```java
public static Decoder getDecoder()
```

Returns a {@link Decoder} that decodes using the
<a href="#basic">Basic</a> type base64 encoding scheme.

@return  A Base64 decoder.

## Base64.getUrlDecoder()

```java
public static Decoder getUrlDecoder()
```

Returns a {@link Decoder} that decodes using the
<a href="#url">URL and Filename safe</a> type base64
encoding scheme.

@return  A Base64 decoder.

## Base64.getMimeDecoder()

```java
public static Decoder getMimeDecoder()
```

Returns a {@link Decoder} that decodes using the
<a href="#mime">MIME</a> type base64 decoding scheme.

@return  A Base64 decoder.

## Base64.encode(byte[])

```java
public byte[] encode(byte[] src)
```

Encodes all bytes from the specified byte array into a newly-allocated
byte array using the {@link Base64} encoding scheme. The returned byte
array is of the length of the resulting bytes.

@param   src
         the byte array to encode
@return  A newly-allocated byte array containing the resulting
         encoded bytes.

## Base64.encode(byte[], byte[])

```java
public int encode(byte[] src, byte[] dst)
```

Encodes all bytes from the specified byte array using the
{@link Base64} encoding scheme, writing the resulting bytes to the
given output byte array, starting at offset 0.

<p> It is the responsibility of the invoker of this method to make
sure the output byte array {@code dst} has enough space for encoding
all bytes from the input byte array. No bytes will be written to the
output byte array if the output byte array is not big enough.

@param   src
         the byte array to encode
@param   dst
         the output byte array
@return  The number of bytes written to the output byte array

@throws  IllegalArgumentException if {@code dst} does not have enough
         space for encoding all input bytes.

## Base64.encodeToString(byte[])

```java
public String encodeToString(byte[] src)
```

Encodes the specified byte array into a String using the {@link Base64}
encoding scheme.

<p> This method first encodes all input bytes into a base64 encoded
byte array and then constructs a new String by using the encoded byte
array and the {@link java.nio.charset.StandardCharsets#ISO_8859_1
ISO-8859-1} charset.

<p> In other words, an invocation of this method has exactly the same
effect as invoking
{@code new String(encode(src), StandardCharsets.ISO_8859_1)}.

@param   src
         the byte array to encode
@return  A String containing the resulting Base64 encoded characters

## Base64.encode(ByteBuffer)

```java
public ByteBuffer encode(ByteBuffer buffer)
```

Encodes all remaining bytes from the specified byte buffer into
a newly-allocated ByteBuffer using the {@link Base64} encoding
scheme.

Upon return, the source buffer's position will be updated to
its limit; its limit will not have been changed. The returned
output buffer's position will be zero and its limit will be the
number of resulting encoded bytes.

@param   buffer
         the source ByteBuffer to encode
@return  A newly-allocated byte buffer containing the encoded bytes.

## Base64.wrap(OutputStream)

```java
public OutputStream wrap(OutputStream os)
```

Wraps an output stream for encoding byte data using the {@link Base64}
encoding scheme.

<p> It is recommended to promptly close the returned output stream after
use, during which it will flush all possible leftover bytes to the underlying
output stream. Closing the returned output stream will close the underlying
output stream.

@param   os
         the output stream.
@return  the output stream for encoding the byte data into the
         specified Base64 encoded format

## Base64.withoutPadding()

```java
public Encoder withoutPadding()
```

Returns an encoder instance that encodes equivalently to this one,
but without adding any padding character at the end of the encoded
byte data.

<p> The encoding scheme of this encoder instance is unaffected by
this invocation. The returned encoder instance should be used for
non-padding encoding operation.

@return an equivalent encoder that encodes without adding any
        padding character at the end

## Base64.decode(byte[])

```java
public byte[] decode(byte[] src)
```

Decodes all bytes from the input byte array using the {@link Base64}
encoding scheme, writing the results into a newly-allocated output
byte array. The returned byte array is of the length of the resulting
bytes.

@param   src
         the byte array to decode

@return  A newly-allocated byte array containing the decoded bytes.

@throws  IllegalArgumentException
         if {@code src} is not in valid Base64 scheme

## Base64.decode(String)

```java
public byte[] decode(String src)
```

Decodes a Base64 encoded String into a newly-allocated byte array
using the {@link Base64} encoding scheme.

<p> An invocation of this method has exactly the same effect as invoking
{@code decode(src.getBytes(StandardCharsets.ISO_8859_1))}

@param   src
         the string to decode

@return  A newly-allocated byte array containing the decoded bytes.

@throws  IllegalArgumentException
         if {@code src} is not in valid Base64 scheme

## Base64.decode(byte[], byte[])

```java
public int decode(byte[] src, byte[] dst)
```

Decodes all bytes from the input byte array using the {@link Base64}
encoding scheme, writing the results into the given output byte array,
starting at offset 0.

<p> It is the responsibility of the invoker of this method to make
sure the output byte array {@code dst} has enough space for decoding
all bytes from the input byte array. No bytes will be written to
the output byte array if the output byte array is not big enough.

<p> If the input byte array is not in valid Base64 encoding scheme
then some bytes may have been written to the output byte array before
IllegalargumentException is thrown.

@param   src
         the byte array to decode
@param   dst
         the output byte array

@return  The number of bytes written to the output byte array

@throws  IllegalArgumentException
         if {@code src} is not in valid Base64 scheme, or {@code dst}
         does not have enough space for decoding all input bytes.

## Base64.decode(ByteBuffer)

```java
public ByteBuffer decode(ByteBuffer buffer)
```

Decodes all bytes from the input byte buffer using the {@link Base64}
encoding scheme, writing the results into a newly-allocated ByteBuffer.

<p> Upon return, the source buffer's position will be updated to
its limit; its limit will not have been changed. The returned
output buffer's position will be zero and its limit will be the
number of resulting decoded bytes

<p> {@code IllegalArgumentException} is thrown if the input buffer
is not in valid Base64 encoding scheme. The position of the input
buffer will not be advanced in this case.

@param   buffer
         the ByteBuffer to decode

@return  A newly-allocated byte buffer containing the decoded bytes

@throws  IllegalArgumentException
         if {@code buffer} is not in valid Base64 scheme

## Base64.wrap(InputStream)

```java
public InputStream wrap(InputStream is)
```

Returns an input stream for decoding {@link Base64} encoded byte stream.

<p> The {@code read}  methods of the returned {@code InputStream} will
throw {@code IOException} when reading bytes that cannot be decoded.

<p> Closing the returned input stream will close the underlying
input stream.

@param   is
         the input stream

@return  the input stream for decoding the specified Base64 encoded
         byte stream