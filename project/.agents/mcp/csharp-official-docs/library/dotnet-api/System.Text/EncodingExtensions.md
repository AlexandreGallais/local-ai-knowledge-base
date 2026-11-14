---
title: "EncodingExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/EncodingExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EncodingExtensions class

Namespace: `System.Text`

```csharp
public static class EncodingExtensions
```

Provides extension methods for the encoding types, such as `Encoding`, `Encoder`, and `Decoder`.

To be added.

## EncodingExtensions.Convert(Decoder, Byte>, Char>, Boolean, Int64, Boolean) method

```csharp
public static void Convert (this System.Text.Decoder decoder, in System.Buffers.ReadOnlySequence<byte> bytes, System.Buffers.IBufferWriter<char> writer, bool flush, out long charsUsed, out bool completed);
```

Converts a `ReadOnlySequence<T>` to UTF-16 encoded characters and writes the result to `writer`.

Parameters:

- `decoder`: The decoder instance that can convert bytes to `char` values.
- `bytes`: A sequence of bytes to decode.
- `writer`: The buffer to which the decoded characters will be written.
- `flush`: `true` to indicate no further data is to be converted; otherwise `false`.
- `charsUsed`: When this method returns, contains the count of characters that were written to `writer`.
- `completed`: When this method returns, contains `true` if `decoder` contains no partial internal state; otherwise, `false`.
If `flush` is `true`, this will always be set to `true` when the method returns.

Exceptions:

- `DecoderFallbackException`: `bytes` contains data that cannot be decoded and `decoder` is configured to throw when such data is seen.

To be added.

## EncodingExtensions.Convert(Decoder, Byte>, Char>, Boolean, Int64, Boolean) method

```csharp
public static void Convert (this System.Text.Decoder decoder, ReadOnlySpan<byte> bytes, System.Buffers.IBufferWriter<char> writer, bool flush, out long charsUsed, out bool completed);
```

Converts a `ReadOnlySpan<T>` to chars using `decoder` and writes the result to `writer`.

Parameters:

- `decoder`: The decoder instance that can convert bytes to `char` values.
- `bytes`: A sequence of bytes to decode.
- `writer`: The buffer to which the decoded chars will be written.
- `flush`: `true` to indicate no further data is to be converted; otherwise `false`.
- `charsUsed`: When this method returns, contains the count of `char`s which were written to `writer`.
- `completed`: When this method returns, contains `true` if `decoder` contains no partial internal state; otherwise, `false`.
If `flush` is `true`, this will always be set to `true` when the method returns.

Exceptions:

- `DecoderFallbackException`: `bytes` contains data that cannot be encoded and `decoder` is configured to throw when such data is seen.

To be added.

## EncodingExtensions.Convert(Encoder, Char>, Byte>, Boolean, Int64, Boolean) method

```csharp
public static void Convert (this System.Text.Encoder encoder, in System.Buffers.ReadOnlySequence<char> chars, System.Buffers.IBufferWriter<byte> writer, bool flush, out long bytesUsed, out bool completed);
```

Converts a `ReadOnlySequence<T>` to encoded bytes and writes the result to `writer`.

Parameters:

- `encoder`: The encoder instance that can convert `char` values to bytes.
- `chars`: A sequence of characters to encode.
- `writer`: The buffer to which the encoded bytes will be written.
- `flush`: `true` to indicate no further data is to be converted; otherwise `false`.
- `bytesUsed`: When this method returns, contains the count of `byte`s which were written to `writer`.
- `completed`: When this method returns, contains `true` if all input up until `bytesUsed` was converted; otherwise, `false`. If `flush` is `true`, this will always be set to `true` when the method returns.

Exceptions:

- `EncoderFallbackException`: `chars` contains data that cannot be encoded and `encoder` is configured to throw when such data is seen.

To be added.

## EncodingExtensions.Convert(Encoder, Char>, Byte>, Boolean, Int64, Boolean) method

```csharp
public static void Convert (this System.Text.Encoder encoder, ReadOnlySpan<char> chars, System.Buffers.IBufferWriter<byte> writer, bool flush, out long bytesUsed, out bool completed);
```

Converts a `ReadOnlySpan<T>` to bytes using `encoder` and writes the result to `writer`.

Parameters:

- `encoder`: The encoder instance that can convert `char` values to bytes.
- `chars`: A sequence of characters to encode.
- `writer`: The buffer to which the encoded bytes will be written.
- `flush`: `true` to indicate no further data is to be converted; otherwise `false`.
- `bytesUsed`: When this method returns, contains the count of `byte`s which were written to `writer`.
- `completed`: When this method returns, contains `true` if `encoder` contains no partial internal state; otherwise, `false`.
If `flush` is `true`, this will always be set to `true` when the method returns.

Exceptions:

- `EncoderFallbackException`: `chars` contains data that cannot be encoded and `encoder` is configured to throw when such data is seen.

To be added.

## EncodingExtensions.GetBytes(Encoding, Char>) method

```csharp
public static byte[] GetBytes (this System.Text.Encoding encoding, in System.Buffers.ReadOnlySequence<char> chars);
```

Encodes the specified `ReadOnlySequence<T>` into a `Byte` array using the specified `Encoding`.

Parameters:

- `encoding`: The encoding that represents how the data in `chars` should be encoded.
- `chars`: The sequence to encode to bytes.

Returns: A `Byte` array that represents the encoded contents of `chars`.

Exceptions:

- `EncoderFallbackException`: `chars` contains data that cannot be encoded and `encoding` is configured to throw when such data is seen.

To be added.

## EncodingExtensions.GetBytes(Encoding, Char>, Byte>) method

```csharp
public static long GetBytes (this System.Text.Encoding encoding, in System.Buffers.ReadOnlySequence<char> chars, System.Buffers.IBufferWriter<byte> writer);
```

Decodes the specified `ReadOnlySequence<T>` to `byte`s using the specified `Encoding` and writes the result to `writer`.

Parameters:

- `encoding`: The encoding that represents how the data in `chars` should be encoded.
- `chars`: The `ReadOnlySequence<T>` whose contents should be encoded.
- `writer`: The buffer to which the encoded bytes will be written.

Returns: The number of bytes written to `writer`.

Exceptions:

- `EncoderFallbackException`: `chars` contains data that cannot be encoded and `encoding` is configured to throw when such data is seen.

To be added.

## EncodingExtensions.GetBytes(Encoding, Char>, Byte>) method

```csharp
public static int GetBytes (this System.Text.Encoding encoding, in System.Buffers.ReadOnlySequence<char> chars, Span<byte> bytes);
```

Encodes the specified `ReadOnlySequence<T>` to `byte`s using the specified `Encoding` and outputs the result to `bytes`.

Parameters:

- `encoding`: The encoding that represents how the data in `chars` should be encoded.
- `chars`: The sequence to encode to bytes.
- `bytes`: The destination buffer to which the encoded bytes will be written.

Returns: The number of bytes written to `bytes`.

Exceptions:

- `ArgumentException`: `bytes` is not large enough to contain the encoded form of `chars`.
- `EncoderFallbackException`: `chars` contains data that cannot be encoded and `encoding` is configured to throw when such data is seen.

To be added.

## EncodingExtensions.GetBytes(Encoding, Char>, Byte>) method

```csharp
public static long GetBytes (this System.Text.Encoding encoding, ReadOnlySpan<char> chars, System.Buffers.IBufferWriter<byte> writer);
```

Encodes the specified `ReadOnlySpan<T>` to `byte`s using the specified `Encoding` and writes the result to `writer`.

Parameters:

- `encoding`: The encoding that represents how the data in `chars` should be encoded.
- `chars`: The sequence to encode to bytes.
- `writer`: The buffer to which the encoded bytes will be written.

Returns: The number of bytes written to `writer`.

Exceptions:

- `EncoderFallbackException`: `chars` contains data that cannot be encoded and `encoding` is configured to throw when such data is seen.

To be added.

## EncodingExtensions.GetChars(Encoding, Byte>, Char>) method

```csharp
public static long GetChars (this System.Text.Encoding encoding, in System.Buffers.ReadOnlySequence<byte> bytes, System.Buffers.IBufferWriter<char> writer);
```

Decodes the specified `ReadOnlySequence<T>` to `char`s using the specified `Encoding` and writes the result to `writer`.

Parameters:

- `encoding`: The encoding that represents how the data in `bytes` should be decoded.
- `bytes`: The sequence whose bytes should be decoded.
- `writer`: The buffer to which the decoded chars will be written.

Returns: The number of chars written to `writer`.

Exceptions:

- `DecoderFallbackException`: `bytes` contains data that cannot be decoded and `encoding` is configured to throw when such data is seen.

To be added.

## EncodingExtensions.GetChars(Encoding, Byte>, Char>) method

```csharp
public static int GetChars (this System.Text.Encoding encoding, in System.Buffers.ReadOnlySequence<byte> bytes, Span<char> chars);
```

Decodes the specified `ReadOnlySequence<T>` to `char`s using the specified `Encoding` and outputs the result to `chars`.

Parameters:

- `encoding`: The encoding that represents how the data in `bytes` is encoded.
- `bytes`: The sequence to decode to characters.
- `chars`: The destination buffer to which the decoded characters will be written.

Returns: The number of chars written to `chars`.

Exceptions:

- `ArgumentException`: `chars` is not large enough to contain the encoded form of `bytes`.
- `DecoderFallbackException`: `bytes` contains data that cannot be decoded and `encoding` is configured to throw when such data is seen.

To be added.

## EncodingExtensions.GetChars(Encoding, Byte>, Char>) method

```csharp
public static long GetChars (this System.Text.Encoding encoding, ReadOnlySpan<byte> bytes, System.Buffers.IBufferWriter<char> writer);
```

Decodes the specified `ReadOnlySpan<T>` to `char`s using the specified `Encoding` and writes the result to `writer`.

Parameters:

- `encoding`: The encoding that represents how the data in `bytes` should be decoded.
- `bytes`: The span of bytes to decode.
- `writer`: The buffer to which the decoded chars will be written.

Returns: The number of chars written to `writer`.

Exceptions:

- `DecoderFallbackException`: `bytes` contains data that cannot be decoded and `encoding` is configured to throw when such data is seen.

To be added.

## EncodingExtensions.GetString(Encoding, Byte>) method

```csharp
public static string GetString (this System.Text.Encoding encoding, in System.Buffers.ReadOnlySequence<byte> bytes);
```

Decodes the specified `ReadOnlySequence<T>` into a `String` using the specified `Encoding`.

Parameters:

- `encoding`: The encoding that represents how the data in `bytes` is encoded.
- `bytes`: The sequence to decode into characters.

Returns: The decoded contents of `bytes`.

Exceptions:

- `DecoderFallbackException`: `bytes` contains data that cannot be decoded and `encoding` is configured to throw when such data is seen.

To be added.
