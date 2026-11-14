---
title: "Decoder class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Decoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decoder class (part 2 of 3)

## Decoder.GetCharCount(Byte[], Int32, Int32) method

```csharp
public abstract int GetCharCount (byte[] bytes, int index, int count);
```

When overridden in a derived class, calculates the number of characters produced by decoding a sequence of bytes from the specified byte array.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `index`: The index of the first byte to decode.
- `count`: The number of bytes to decode.

Returns: The number of characters produced by decoding the specified sequence of bytes and any bytes in the internal buffer.

Exceptions:

- `ArgumentNullException`: `bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` and `count` do not denote a valid range in `bytes`.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Decoder.Fallback` is set to `DecoderExceptionFallback`.

#### Remarks
This method does not affect the state of the decoder.

To calculate the exact array size that `Decoder.GetChars` requires to store the resulting characters, the application should use `Decoder.GetCharCount`.

If `GetChars` is called with `flush` set to `false`, the decoder stores trailing bytes at the end of the data block in an internal buffer and uses them in the next decoding operation. The application should call `GetCharCount` on a block of data immediately before calling `GetChars` on the same block, so that any trailing bytes from the previous block are included in the calculation.

#### Examples
The following code example demonstrates how to use the `Decoder.GetCharCount` method to calculate the number of characters required to decode the specified range of bytes in the array.

_Code sample not included: ~/snippets/csharp/System.Text/Decoder/GetCharCount/getcharcount-byte[]-int32-int32.cs._

## Decoder.GetCharCount(Byte[], Int32, Int32, Boolean) method

```csharp
public virtual int GetCharCount (byte[] bytes, int index, int count, bool flush);
```

When overridden in a derived class, calculates the number of characters produced by decoding a sequence of bytes from the specified byte array. A parameter indicates whether to clear the internal state of the decoder after the calculation.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `index`: The index of the first byte to decode.
- `count`: The number of bytes to decode.
- `flush`: `true` to simulate clearing the internal state of the encoder after the calculation; otherwise, `false`.

Returns: The number of characters produced by decoding the specified sequence of bytes and any bytes in the internal buffer.

Exceptions:

- `ArgumentNullException`: `bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` and `count` do not denote a valid range in `bytes`.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Decoder.Fallback` is set to `DecoderExceptionFallback`.

#### Remarks
This method does not affect the state of the decoder.

To calculate the exact array size that `Decoder.GetChars` requires to store the resulting characters, the application should use `Decoder.GetCharCount`.

If `GetChars` is called with `flush` set to `false`, the decoder stores trailing bytes at the end of the data block in an internal buffer and uses them in the next decoding operation. The application should call `GetCharCount` on a block of data immediately before calling `GetChars` on the same block, so that any trailing bytes from the previous block are included in the calculation.

## Decoder.GetChars(Byte>, Char>, Boolean) method

```csharp
public virtual int GetChars (ReadOnlySpan<byte> bytes, Span<char> chars, bool flush);
```

When overridden in a derived class, decodes a sequence of span bytes and any bytes in the internal buffer into a set of characters that are stored starting at the specified character pointer. A parameter indicates whether to clear the internal state of the decoder after the conversion.

Parameters:

- `bytes`: A byte span to decode.
- `chars`: A span to write the resulting set of characters.
- `flush`: `true` to clear the internal state of the decoder after the conversion; otherwise, `false`.

Returns: The actual number of characters written at the span indicated by the `chars` parameter.

#### Remarks
Remember that the `Decoder` object saves state between calls to `Decoder.GetChars`. When the application is done with a stream of data, it should set the `flush` parameter to `true` to make sure that the state information is flushed. With this setting, the decoder ignores invalid bytes at the end of the data block and clears the internal buffer.

To calculate the exact span size that `GetChars` requires to store the resulting characters, the application should use `Decoder.GetCharCount`.

If `GetChars` is called with `flush` set to `false`, the decoder stores trailing bytes at the end of the data block in an internal buffer and uses them in the next decoding operation. The application should call `GetCharCount` on a block of data immediately before calling `GetChars` on the same block, so that any trailing bytes from the previous block are included in the calculation.

If your application is to convert many segments of an input stream, consider using the `Decoder.Convert` method. `Decoder.GetChars` will throw an exception if the output span isn't large enough, but `Decoder.Convert` will fill as much space as possible and return the bytes read and chars written, provided the output array allows for at least two characters. Also see the `Encoding.GetChars` topic for more comments.

## Decoder.GetChars(Byte*, Int32, Char*, Int32, Boolean) method

```csharp
public virtual int GetChars (byte* bytes, int byteCount, char* chars, int charCount, bool flush);
```

When overridden in a derived class, decodes a sequence of bytes starting at the specified byte pointer and any bytes in the internal buffer into a set of characters that are stored starting at the specified character pointer. A parameter indicates whether to clear the internal state of the decoder after the conversion.

Parameters:

- `bytes`: A pointer to the first byte to decode.
- `byteCount`: The number of bytes to decode.
- `chars`: A pointer to the location at which to start writing the resulting set of characters.
- `charCount`: The maximum number of characters to write.
- `flush`: `true` to clear the internal state of the decoder after the conversion; otherwise, `false`.

Returns: The actual number of characters written at the location indicated by the `chars` parameter.

Exceptions:

- `ArgumentNullException`: `bytes` is `null` (`Nothing`).

-or-

`chars` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `byteCount` or `charCount` is less than zero.
- `ArgumentException`: `charCount` is less than the resulting number of characters.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Decoder.Fallback` is set to `DecoderExceptionFallback`.

#### Remarks
Remember that the `Decoder` object saves state between calls to `Decoder.GetChars`. When the application is done with a stream of data, it should set the `flush` parameter to `true` to make sure that the state information is flushed. With this setting, the decoder ignores invalid bytes at the end of the data block and clears the internal buffer.

To calculate the exact buffer size that `GetChars` requires to store the resulting characters, the application should use `Decoder.GetCharCount`.

If `GetChars` is called with `flush` set to `false`, the decoder stores trailing bytes at the end of the data block in an internal buffer and uses them in the next decoding operation. The application should call `GetCharCount` on a block of data immediately before calling `GetChars` on the same block, so that any trailing bytes from the previous block are included in the calculation.

If your application is to convert many segments of an input stream, consider using the `Decoder.Convert` method. `Decoder.GetChars` will throw an exception if the output buffer isn't large enough, but `Decoder.Convert` will fill as much space as possible and return the bytes read and chars written, provided the output array allows for at least two characters. Also see the `Encoding.GetChars` topic for more comments.

## Decoder.GetChars(Byte[], Int32, Int32, Char[], Int32) method

```csharp
public abstract int GetChars (byte[] bytes, int byteIndex, int byteCount, char[] chars, int charIndex);
```

When overridden in a derived class, decodes a sequence of bytes from the specified byte array and any bytes in the internal buffer into the specified character array.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `byteIndex`: The index of the first byte to decode.
- `byteCount`: The number of bytes to decode.
- `chars`: The character array to contain the resulting set of characters.
- `charIndex`: The index at which to start writing the resulting set of characters.

Returns: The actual number of characters written into `chars`.

Exceptions:

- `ArgumentNullException`: `bytes` is `null` (`Nothing`).

-or-

`chars` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `byteIndex` or `byteCount` or `charIndex` is less than zero.

-or-

`byteIndex` and `byteCount` do not denote a valid range in `bytes`.

-or-

`charIndex` is not a valid index in `chars`.
- `ArgumentException`: `chars` does not have enough capacity from `charIndex` to the end of the array to accommodate the resulting characters.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Decoder.Fallback` is set to `DecoderExceptionFallback`.

#### Remarks
Remember that the `Decoder` object saves state between calls to `Decoder.GetChars`. When the application is done with a stream of data, it should set the `flush` parameter to `true` to make sure that the state information is flushed. With this setting, the decoder ignores invalid bytes at the end of the data block and clears the internal buffer.

To calculate the exact array size that `GetChars` requires to store the resulting characters, the application should use `Decoder.GetCharCount`.

If `GetChars` is called with `flush` set to `false`, the decoder stores trailing bytes at the end of the data block in an internal buffer and uses them in the next decoding operation. The application should call `GetCharCount` on a block of data immediately before calling `GetChars` on the same block, so that any trailing bytes from the previous block are included in the calculation.

If your application is to convert many segments of an input stream, consider using the `Decoder.Convert` method. `Decoder.GetChars` will throw an exception if the output buffer isn't large enough, but `Decoder.Convert` will fill as much space as possible and return the bytes read and chars written, provided the output array allows for at least two characters. Also see the `Encoding.GetChars` topic for more comments.

#### Examples
The following example demonstrates how to decode a range of elements from a byte array and store them in a Unicode character array. The `Decoder.GetCharCount` method is used to calculate the number of characters needed to store the decoded elements in the array `bytes`. The `Decoder.GetChars` method decodes the specified elements in the byte array and stores them in the new character array.

_Code sample not included: ~/snippets/csharp/System.Text/Decoder/GetChars/getchars-byte[]-int32-int32-char[]-int32.cs._

## Decoder.GetChars(Byte[], Int32, Int32, Char[], Int32, Boolean) method

```csharp
public virtual int GetChars (byte[] bytes, int byteIndex, int byteCount, char[] chars, int charIndex, bool flush);
```

When overridden in a derived class, decodes a sequence of bytes from the specified byte array and any bytes in the internal buffer into the specified character array. A parameter indicates whether to clear the internal state of the decoder after the conversion.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `byteIndex`: The index of the first byte to decode.
- `byteCount`: The number of bytes to decode.
- `chars`: The character array to contain the resulting set of characters.
- `charIndex`: The index at which to start writing the resulting set of characters.
- `flush`: `true` to clear the internal state of the decoder after the conversion; otherwise, `false`.

Returns: The actual number of characters written into the `chars` parameter.

Exceptions:

- `ArgumentNullException`: `bytes` is `null` (`Nothing`).

-or-

`chars` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `byteIndex` or `byteCount` or `charIndex` is less than zero.

-or-

`byteIndex` and `byteCount` do not denote a valid range in `bytes`.

-or-

`charIndex` is not a valid index in `chars`.
- `ArgumentException`: `chars` does not have enough capacity from `charIndex` to the end of the array to accommodate the resulting characters.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Decoder.Fallback` is set to `DecoderExceptionFallback`.

#### Remarks
Remember that the `Decoder` object saves state between calls to `Decoder.GetChars`. When the application is done with a stream of data, it should set the `flush` parameter to `true` to make sure that the state information is flushed. With this setting, the decoder ignores invalid bytes at the end of the data block and clears the internal buffer.

To calculate the exact array size that `GetChars` requires to store the resulting characters, the application should use `Decoder.GetCharCount`.

If `GetChars` is called with `flush` set to `false`, the decoder stores trailing bytes at the end of the data block in an internal buffer and uses them in the next decoding operation. The application should call `GetCharCount` on a block of data immediately before calling `GetChars` on the same block, so that any trailing bytes from the previous block are included in the calculation.

If your application is to convert many segments of an input stream, consider using the `Decoder.Convert` method. `Decoder.GetChars` will throw an exception if the output buffer isn't large enough, but `Decoder.Convert` will fill as much space as possible and return the bytes read and chars written, provided the output array allows for at least two characters. Also see the `Encoding.GetChars` topic for more comments.
