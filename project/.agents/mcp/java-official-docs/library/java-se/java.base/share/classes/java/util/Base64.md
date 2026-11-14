---
title: "Base64 class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Base64.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Base64 class (java.util)

```java
public final class Base64
```

This class consists exclusively of static methods for obtaining
encoders and decoders for the Base64 encoding scheme. The
implementation of this class supports the following types of Base64
as specified in
RFC 4648 and
RFC 2045.

- **Basic**

 Uses "The Base64 Alphabet" as specified in Table 1 of
    RFC 4648 and RFC 2045 for encoding and decoding operation.
    The encoder does not add any line feed (line separator)
    character. The decoder rejects data that contains characters
    outside the base64 alphabet.

- **URL and Filename safe**

 Uses the "URL and Filename safe Base64 Alphabet" as specified
    in Table 2 of RFC 4648 for encoding and decoding. The
    encoder does not add any line feed (line separator) character.
    The decoder rejects data that contains characters outside the
    base64 alphabet.

- **MIME**

 Uses "The Base64 Alphabet" as specified in Table 1 of
    RFC 2045 for encoding and decoding operation. The encoded output
    must be represented in lines of no more than 76 characters each
    and uses a carriage return `'\r'` followed immediately by
    a linefeed `'\n'` as the line separator. No line separator
    is added to the end of the encoded output. All line separators
    or other characters not found in the base64 alphabet table are
    ignored in decoding operation.

 Unless otherwise noted, passing a `null` argument to a
method of this class will cause a NullPointerException to be thrown.

**Since:** 1.8

## Base64.getEncoder()

```java
public static Encoder getEncoder()
```

Returns a `Encoder` that encodes using the
Basic type base64 encoding scheme.

**Returns:** A Base64 encoder.

## Base64.getUrlEncoder()

```java
public static Encoder getUrlEncoder()
```

Returns a `Encoder` that encodes using the
URL and Filename safe type base64
encoding scheme.

**Returns:** A Base64 encoder.

## Base64.getMimeEncoder()

```java
public static Encoder getMimeEncoder()
```

Returns a `Encoder` that encodes using the
MIME type base64 encoding scheme.

**Returns:** A Base64 encoder.

## Base64.getMimeEncoder(int, byte[])

```java
public static Encoder getMimeEncoder(int lineLength, byte[] lineSeparator)
```

Returns a `Encoder` that encodes using the
MIME type base64 encoding scheme
with specified line length and line separators.

Parameters:

- `lineLength`: the length of each output line (rounded down to nearest multiple of 4). If the rounded down line length is not a positive value, the output will not be separated in lines
- `lineSeparator`: the line separator for each output line

**Returns:** A Base64 encoder.

Throws:

- `IllegalArgumentException`: if `lineSeparator` includes any character of "The Base64 Alphabet" as specified in Table 1 of RFC 2045.

## Base64.getDecoder()

```java
public static Decoder getDecoder()
```

Returns a `Decoder` that decodes using the
Basic type base64 encoding scheme.

**Returns:** A Base64 decoder.

## Base64.getUrlDecoder()

```java
public static Decoder getUrlDecoder()
```

Returns a `Decoder` that decodes using the
URL and Filename safe type base64
encoding scheme.

**Returns:** A Base64 decoder.

## Base64.getMimeDecoder()

```java
public static Decoder getMimeDecoder()
```

Returns a `Decoder` that decodes using the
MIME type base64 decoding scheme.

**Returns:** A Base64 decoder.

## Base64.encode(byte[])

```java
public byte[] encode(byte[] src)
```

Encodes all bytes from the specified byte array into a newly-allocated
byte array using the `Base64` encoding scheme. The returned byte
array is of the length of the resulting bytes.

Parameters:

- `src`: the byte array to encode

**Returns:** A newly-allocated byte array containing the resulting
         encoded bytes.

## Base64.encode(byte[], byte[])

```java
public int encode(byte[] src, byte[] dst)
```

Encodes all bytes from the specified byte array using the
`Base64` encoding scheme, writing the resulting bytes to the
given output byte array, starting at offset 0.

 It is the responsibility of the invoker of this method to make
sure the output byte array `dst` has enough space for encoding
all bytes from the input byte array. No bytes will be written to the
output byte array if the output byte array is not big enough.

Parameters:

- `src`: the byte array to encode
- `dst`: the output byte array

**Returns:** The number of bytes written to the output byte array

Throws:

- `IllegalArgumentException`: if `dst` does not have enough space for encoding all input bytes.

## Base64.encodeToString(byte[])

```java
public String encodeToString(byte[] src)
```

Encodes the specified byte array into a String using the `Base64`
encoding scheme.

 This method first encodes all input bytes into a base64 encoded
byte array and then constructs a new String by using the encoded byte
array and the ISO-8859-1 charset.

 In other words, an invocation of this method has exactly the same
effect as invoking
`new String(encode(src), StandardCharsets.ISO_8859_1)`.

Parameters:

- `src`: the byte array to encode

**Returns:** A String containing the resulting Base64 encoded characters

## Base64.encode(ByteBuffer)

```java
public ByteBuffer encode(ByteBuffer buffer)
```

Encodes all remaining bytes from the specified byte buffer into
a newly-allocated ByteBuffer using the `Base64` encoding
scheme.

Upon return, the source buffer's position will be updated to
its limit; its limit will not have been changed. The returned
output buffer's position will be zero and its limit will be the
number of resulting encoded bytes.

Parameters:

- `buffer`: the source ByteBuffer to encode

**Returns:** A newly-allocated byte buffer containing the encoded bytes.

## Base64.wrap(OutputStream)

```java
public OutputStream wrap(OutputStream os)
```

Wraps an output stream for encoding byte data using the `Base64`
encoding scheme.

 It is recommended to promptly close the returned output stream after
use, during which it will flush all possible leftover bytes to the underlying
output stream. Closing the returned output stream will close the underlying
output stream.

Parameters:

- `os`: the output stream.

**Returns:** the output stream for encoding the byte data into the
         specified Base64 encoded format

## Base64.withoutPadding()

```java
public Encoder withoutPadding()
```

Returns an encoder instance that encodes equivalently to this one,
but without adding any padding character at the end of the encoded
byte data.

 The encoding scheme of this encoder instance is unaffected by
this invocation. The returned encoder instance should be used for
non-padding encoding operation.

**Returns:** an equivalent encoder that encodes without adding any
        padding character at the end

## Base64.decode(byte[])

```java
public byte[] decode(byte[] src)
```

Decodes all bytes from the input byte array using the `Base64`
encoding scheme, writing the results into a newly-allocated output
byte array. The returned byte array is of the length of the resulting
bytes.

Parameters:

- `src`: the byte array to decode

**Returns:** A newly-allocated byte array containing the decoded bytes.

Throws:

- `IllegalArgumentException`: if `src` is not in valid Base64 scheme

## Base64.decode(String)

```java
public byte[] decode(String src)
```

Decodes a Base64 encoded String into a newly-allocated byte array
using the `Base64` encoding scheme.

 An invocation of this method has exactly the same effect as invoking
`decode(src.getBytes(StandardCharsets.ISO_8859_1))`

Parameters:

- `src`: the string to decode

**Returns:** A newly-allocated byte array containing the decoded bytes.

Throws:

- `IllegalArgumentException`: if `src` is not in valid Base64 scheme

## Base64.decode(byte[], byte[])

```java
public int decode(byte[] src, byte[] dst)
```

Decodes all bytes from the input byte array using the `Base64`
encoding scheme, writing the results into the given output byte array,
starting at offset 0.

 It is the responsibility of the invoker of this method to make
sure the output byte array `dst` has enough space for decoding
all bytes from the input byte array. No bytes will be written to
the output byte array if the output byte array is not big enough.

 If the input byte array is not in valid Base64 encoding scheme
then some bytes may have been written to the output byte array before
IllegalargumentException is thrown.

Parameters:

- `src`: the byte array to decode
- `dst`: the output byte array

**Returns:** The number of bytes written to the output byte array

Throws:

- `IllegalArgumentException`: if `src` is not in valid Base64 scheme, or `dst` does not have enough space for decoding all input bytes.

## Base64.decode(ByteBuffer)

```java
public ByteBuffer decode(ByteBuffer buffer)
```

Decodes all bytes from the input byte buffer using the `Base64`
encoding scheme, writing the results into a newly-allocated ByteBuffer.

 Upon return, the source buffer's position will be updated to
its limit; its limit will not have been changed. The returned
output buffer's position will be zero and its limit will be the
number of resulting decoded bytes

 `IllegalArgumentException` is thrown if the input buffer
is not in valid Base64 encoding scheme. The position of the input
buffer will not be advanced in this case.

Parameters:

- `buffer`: the ByteBuffer to decode

**Returns:** A newly-allocated byte buffer containing the decoded bytes

Throws:

- `IllegalArgumentException`: if `buffer` is not in valid Base64 scheme

## Base64.wrap(InputStream)

```java
public InputStream wrap(InputStream is)
```

Returns an input stream for decoding `Base64` encoded byte stream.

 The `read`  methods of the returned `InputStream` will
throw `IOException` when reading bytes that cannot be decoded.

 Closing the returned input stream will close the underlying
input stream.

Parameters:

- `is`: the input stream

**Returns:** the input stream for decoding the specified Base64 encoded
         byte stream
