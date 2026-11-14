---
title: "Decoder class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Decoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decoder class

Namespace: `System.Text`

```csharp
public abstract class Decoder
```

Converts a sequence of encoded bytes into a set of characters.

To obtain an instance of an implementation of the `Decoder` class, call the `Encoding.GetDecoder` method of an `Encoding` implementation.

The `Decoder.GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the `Decoder.GetChars` method performs the actual decoding. There are several versions of both of these methods available in the `Decoder` class. For more information, see `Encoding.GetChars`. A `Decoder` object maintains state information between successive calls to `GetChars` or `Decoder.Convert` methods so it can correctly decode byte sequences that span blocks. The `Decoder` also preserves trailing bytes at the end of data blocks and uses the trailing bytes in the next decoding operation. Therefore, `Encoding.GetDecoder` and `Encoding.GetEncoder` are useful for network transmission and file operations because those operations often deal with blocks of data instead of a complete data stream.

> **Note:**
> When the application is done with a stream of data, it should make sure that the state information is flushed by setting the `flush` parameter to `true` in the appropriate method call. If an exception occurs or if the application switches streams, it should call `Decoder.Reset` to clear the internal state of the `Decoder` object.

The following example demonstrates the use of a `Decoder` to convert two different byte arrays into a character array. One of the character's bytes spans the arrays. This is similar to what a `StreamReader` object does internally when reading a stream.

_Code sample not included: ~/snippets/csharp/System.Text/Decoder/Overview/source.cs._

## Decoder.Decoder() constructor

```csharp
protected Decoder ();
```

Initializes a new instance of the `Decoder` class.

#### Remarks
To obtain an instance of an implementation of this class, the application should use the `Encoding.GetDecoder` method of a `Encoding` implementation.

#### Examples
The following example demonstrates two techniques for initializing a new `Decoder` instance.

_Code sample not included: ~/snippets/csharp/System.Text/Decoder/.ctor/ctor.cs._

## Decoder.Fallback property

```csharp
public System.Text.DecoderFallback? Fallback { get; set; }
```

Gets or sets a `DecoderFallback` object for the current `Decoder` object.

Returns: A `DecoderFallback` object.

Exceptions:

- `ArgumentNullException`: The value in a set operation is `null` (`Nothing`).
- `ArgumentException`: A new value cannot be assigned in a set operation because the current `DecoderFallbackBuffer` object contains data that has not been decoded yet.

#### Remarks
The `DecoderFallback` object represents an error handler that is invoked when an encoded byte sequence cannot be converted to a character.

## Decoder.FallbackBuffer property

```csharp
public System.Text.DecoderFallbackBuffer FallbackBuffer { get; }
```

Gets the `DecoderFallbackBuffer` object associated with the current `Decoder` object.

Returns: A `DecoderFallbackBuffer` object.

#### Remarks
The `DecoderFallbackBuffer` object represents data used by the `DecoderFallback` object. The `DecoderFallback` object represents an error handler that is invoked when an encoded byte sequence cannot be converted to a character.

## Decoder.Convert(Byte>, Char>, Boolean, Int32, Int32, Boolean) method

```csharp
public virtual void Convert (ReadOnlySpan<byte> bytes, Span<char> chars, bool flush, out int bytesUsed, out int charsUsed, out bool completed);
```

Converts a span of encoded bytes to UTF-16 encoded characters and stores the result in another span buffer.

Parameters:

- `bytes`: A read-only bytes span containing the sequence to convert.
- `chars`: The span to store the converted characters.
- `flush`: `true` to indicate no further data is to be converted; otherwise, `false`.
- `bytesUsed`: When this method returns, contains the number of bytes that were produced by the conversion. This parameter is passed uninitialized.
- `charsUsed`: When this method returns, contains the number of characters from `chars` that were used in the conversion. This parameter is passed uninitialized.
- `completed`: When this method returns, contains `true` if all the specified characters were converted; otherwise, `false`. This parameter is passed uninitialized.

#### Remarks

The `completed` output parameter indicates whether all the data in the input bytes span was converted and stored in the chars span. This parameter is set to `false` if the number of bytes contained in the input bytes span cannot be converted without exceeding the number of characters in the chars span. In that situation, the application should use the contents of the output buffer or provide a new output buffer, increment the `bytes` parameter by the number of bytes specified by the `bytesUsed` parameter, then call the `Convert` method again to process the remaining input.

The `completed` parameter can also be set to `false`, even though the `bytesUsed` parameter and bytes span length are equal. This situation occurs if there is still data in the `Decoder` object that has not been stored in the `bytes` span.

## Decoder.Convert(Byte*, Int32, Char*, Int32, Boolean, Int32, Int32, Boolean) method

```csharp
public virtual void Convert (byte* bytes, int byteCount, char* chars, int charCount, bool flush, out int bytesUsed, out int charsUsed, out bool completed);
```

Converts a buffer of encoded bytes to UTF-16 encoded characters and stores the result in another buffer.

Parameters:

- `bytes`: The address of a buffer that contains the byte sequences to convert.
- `byteCount`: The number of bytes in `bytes` to convert.
- `chars`: The address of a buffer to store the converted characters.
- `charCount`: The maximum number of characters in `chars` to use in the conversion.
- `flush`: `true` to indicate no further data is to be converted; otherwise, `false`.
- `bytesUsed`: When this method returns, contains the number of bytes that were produced by the conversion. This parameter is passed uninitialized.
- `charsUsed`: When this method returns, contains the number of characters from `chars` that were used in the conversion. This parameter is passed uninitialized.
- `completed`: When this method returns, contains `true` if all the characters specified by `byteCount` were converted; otherwise, `false`. This parameter is passed uninitialized.

Exceptions:

- `ArgumentNullException`: `chars` or `bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `charCount` or `byteCount` is less than zero.
- `ArgumentException`: The output buffer is too small to contain any of the converted input. The output buffer should be at least 2 chars in size to accomodate at least one surrogate character pair.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Decoder.Fallback` is set to `DecoderExceptionFallback`.

#### Remarks

The `completed` output parameter indicates whether all the data in the input buffer was converted and stored in the output buffer. This parameter is set to `false` if the number of bytes specified by the `byteCount` parameter cannot be converted without exceeding the number of characters specified by the `charCount` parameter. In that situation, the application should use the contents of the output buffer or provide a new output buffer, increment the `bytes` parameter by the number of bytes specified by the `bytesUsed` parameter, then call the `Convert` method again to process the remaining input.

The `completed` parameter can also be set to `false`, even though the `bytesUsed` and `byteCount` parameters are equal. This situation occurs if there is still data in the `Decoder` object that has not been stored in the `bytes` buffer.

## Decoder.Convert(Byte[], Int32, Int32, Char[], Int32, Int32, Boolean, Int32, Int32, Boolean) method

```csharp
public virtual void Convert (byte[] bytes, int byteIndex, int byteCount, char[] chars, int charIndex, int charCount, bool flush, out int bytesUsed, out int charsUsed, out bool completed);
```

Converts an array of encoded bytes to UTF-16 encoded characters and stores the result in a character array.

Parameters:

- `bytes`: A byte array to convert.
- `byteIndex`: The first element of `bytes` to convert.
- `byteCount`: The number of elements of `bytes` to convert.
- `chars`: An array to store the converted characters.
- `charIndex`: The first element of `chars` in which data is stored.
- `charCount`: The maximum number of elements of `chars` to use in the conversion.
- `flush`: `true` to indicate that no further data is to be converted; otherwise, `false`.
- `bytesUsed`: When this method returns, contains the number of bytes that were used in the conversion. This parameter is passed uninitialized.
- `charsUsed`: When this method returns, contains the number of characters from `chars` that were produced by the conversion. This parameter is passed uninitialized.
- `completed`: When this method returns, contains `true` if all the characters specified by `byteCount` were converted; otherwise, `false`. This parameter is passed uninitialized.

Exceptions:

- `ArgumentNullException`: `chars` or `bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `charIndex`, `charCount`, `byteIndex`, or `byteCount` is less than zero.

-or-

The length of `chars` - `charIndex` is less than `charCount`.

-or-

The length of `bytes` - `byteIndex` is less than `byteCount`.
- `ArgumentException`: The output buffer is too small to contain any of the converted input. The output buffer should be at least 2 chars in size to accomodate at least one surrogate character pair.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Decoder.Fallback` is set to `DecoderExceptionFallback`.

#### Remarks

The `completed` output parameter indicates whether all the data in the input buffer was converted and stored in the output buffer. This parameter is set to `false` if the number of bytes specified by the `byteCount` parameter cannot be converted without exceeding the number of characters specified by the `charCount` parameter. In that situation, the application should use the contents of the output buffer or provide a new output buffer, increment the `bytes` parameter by the number of bytes specified by the `bytesUsed` parameter, then call the `Convert` method again to process the remaining input.

The `completed` parameter can also be set to `false`, even though the `bytesUsed` and `byteCount` parameters are equal. This situation occurs if there is still data in the `Decoder` object that has not been stored in the `bytes` buffer.

#### Examples

The following example uses the `Encoder.Convert` method to convert a file of UTF-16 characters to UTF-8. It then uses the `Decoder.Convert` method to convert the UTF-8 characters back to UTF-16 characters.

_Code sample not included: ~/snippets/csharp/System.Text/Decoder/Convert/edCvt.cs._

## Decoder.GetCharCount(Byte>, Boolean) method

```csharp
public virtual int GetCharCount (ReadOnlySpan<byte> bytes, bool flush);
```

When overridden in a derived class, calculates the number of characters produced by decoding the sequence of bytes in the span. A parameter indicates whether to clear the internal state of the decoder after the calculation.

Parameters:

- `bytes`: A byte span to decode.
- `flush`: `true` to simulate clearing the internal state of the encoder after the calculation; otherwise, `false`.

Returns: The number of characters produced by decoding the specified sequence of bytes and any bytes in the internal buffer.

#### Remarks
This method does not affect the state of the decoder.

To calculate the exact buffer size that `Decoder.GetChars` requires to store the resulting characters, the application should use `Decoder.GetCharCount`.

If `GetChars` is called with `flush` set to `false`, the decoder stores trailing bytes at the end of the data block in an internal buffer and uses them in the next decoding operation. The application should call `GetCharCount` on a block of data immediately before calling `GetChars` on the same block, so that any trailing bytes from the previous block are included in the calculation.

## Decoder.GetCharCount(Byte*, Int32, Boolean) method

```csharp
public virtual int GetCharCount (byte* bytes, int count, bool flush);
```

When overridden in a derived class, calculates the number of characters produced by decoding a sequence of bytes starting at the specified byte pointer. A parameter indicates whether to clear the internal state of the decoder after the calculation.

Parameters:

- `bytes`: A pointer to the first byte to decode.
- `count`: The number of bytes to decode.
- `flush`: `true` to simulate clearing the internal state of the encoder after the calculation; otherwise, `false`.

Returns: The number of characters produced by decoding the specified sequence of bytes and any bytes in the internal buffer.

Exceptions:

- `ArgumentNullException`: `bytes` is `null` (`Nothing` in Visual Basic .NET).
- `ArgumentOutOfRangeException`: `count` is less than zero.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Decoder.Fallback` is set to `DecoderExceptionFallback`.

#### Remarks
This method does not affect the state of the decoder.

To calculate the exact array size that `Decoder.GetChars` requires to store the resulting characters, the application should use `Decoder.GetCharCount`.

If `GetChars` is called with `flush` set to `false`, the decoder stores trailing bytes at the end of the data block in an internal buffer and uses them in the next decoding operation. The application should call `GetCharCount` on a block of data immediately before calling `GetChars` on the same block, so that any trailing bytes from the previous block are included in the calculation.
