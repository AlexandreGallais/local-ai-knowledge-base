---
title: "Encoding class (part 10 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoding class (part 10 of 14)

## Encoding.GetChars(Byte>, Char>) method

```csharp
public virtual int GetChars (ReadOnlySpan<byte> bytes, Span<char> chars);
```

When overridden in a derived class, decodes all the bytes in the specified read-only byte span into a character span.

Parameters:

- `bytes`: A read-only span containing the sequence of bytes to decode.
- `chars`: The character span receiving the decoded bytes.

Returns: The actual number of characters written at the span indicated by the `chars` parameter.

#### Remarks
`Encoding.GetChars` gets characters from an input byte span. `Encoding.GetChars` is different than `Decoder.GetChars` because `Encoding` expects discrete conversions, while `Decoder` is designed for multiple passes on a single input stream.

If the data to be converted is available only in sequential blocks (such as data read from a stream) or if the amount of data is so large that it needs to be divided into smaller blocks, you should use the `Decoder` or the `Encoder` provided by the `Encoding.GetDecoder` method or the `Encoding.GetEncoder` method, respectively, of a derived class.

The `Encoding.GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the `Encoding.GetChars` method performs the actual decoding. The `Encoding.GetChars` method expects discrete conversions, in contrast to the `Decoder.GetChars` method, which handles multiple passes on a single input stream.

Several versions of `Encoding.GetCharCount` and `Encoding.GetChars` are supported. The following are some programming considerations for use of these methods:

- Your app might need to decode multiple input bytes from a code page and process the bytes using multiple calls. In this case, you probably need to maintain state between calls, because byte sequences can be interrupted when processed in batches. (For example, part of an ISO-2022 shift sequence may end one `Encoding.GetChars` call and continue at the beginning of the next `Encoding.GetChars` call. `Encoding.GetChars` will call the fallback for those incomplete sequences, but `Decoder` will remember those sequences for the next call.)

- If your app handles string outputs, it is recommended to use the `Encoding.GetString` method. Since this method must check string length and allocate a buffer, it is slightly slower, but the resulting `String` type is to be preferred.

- The byte version of `GetChars` allows some fast techniques, particularly with multiple calls to large buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `GetChars` version that supports output character buffers is the best choice.

- Consider using the `Decoder.Convert` method instead of `Encoding.GetCharCount`. The conversion method converts as much data as possible and throws an exception if the output buffer is too small. For continuous decoding of a stream, this method is often the best choice.

## Encoding.GetChars(Byte[], Int32, Int32) method

```csharp
public virtual char[] GetChars (byte[] bytes, int index, int count);
```

When overridden in a derived class, decodes a sequence of bytes from the specified byte array into a set of characters.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `index`: The index of the first byte to decode.
- `count`: The number of bytes to decode.

Returns: A character array containing the results of decoding the specified sequence of bytes.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` and `count` do not denote a valid range in `bytes`.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
`Encoding.GetChars` gets characters from an input byte sequence. `Encoding.GetChars` is different than `Decoder.GetChars` because `Encoding` expects discrete conversions, while `Decoder` is designed for multiple passes on a single input stream.

If the data to be converted is available only in sequential blocks (such as data read from a stream) or if the amount of data is so large that it needs to be divided into smaller blocks, you should use the `Decoder` or the `Encoder` provided by the `Encoding.GetDecoder` method or the `Encoding.GetEncoder` method, respectively, of a derived class.

> **Note:**
> This method is intended to operate on Unicode characters, not on arbitrary binary data, such as byte arrays. If you need to encode arbitrary binary data into text, you should use a protocol such as uuencode, which is implemented by methods such as `Convert.ToBase64CharArray`.

The `Encoding.GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the `Encoding.GetChars` method performs the actual decoding. The `Encoding.GetChars` method expects discrete conversions, in contrast to the `Decoder.GetChars` method, which handles multiple passes on a single input stream.

Several versions of `Encoding.GetCharCount` and `Encoding.GetChars` are supported. The following are some programming considerations for use of these methods:

- Your app might need to decode multiple input bytes from a code page and process the bytes using multiple calls. In this case, you probably need to maintain state between calls, because byte sequences can be interrupted when processed in batches. (For example, part of an ISO-2022 shift sequence may end one `Encoding.GetChars` call and continue at the beginning of the next `Encoding.GetChars` call. `Encoding.GetChars` will call the fallback for those incomplete sequences, but `Decoder` will remember those sequences for the next call.)

- If your app handles string outputs, it is recommended to use the `Encoding.GetString` method. Since this method must check string length and allocate a buffer, it is slightly slower, but the resulting `String` type is to be preferred.

- The byte version of `GetChars` allows some fast techniques, particularly with multiple calls to large buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `GetChars` version that supports output character buffers is the best choice.

- Consider using the `Decoder.Convert` method instead of `Encoding.GetCharCount`. The conversion method converts as much data as possible and throws an exception if the output buffer is too small. For continuous decoding of a stream, this method is often the best choice.

#### Examples
The following example encodes a string into an array of bytes, and then decodes a range of the bytes into an array of characters.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetCharCount/getcharsic.cs._

## Encoding.GetChars(Byte*, Int32, Char*, Int32) method

```csharp
public virtual int GetChars (byte* bytes, int byteCount, char* chars, int charCount);
```

When overridden in a derived class, decodes a sequence of bytes starting at the specified byte pointer into a set of characters that are stored starting at the specified character pointer.

Parameters:

- `bytes`: A pointer to the first byte to decode.
- `byteCount`: The number of bytes to decode.
- `chars`: A pointer to the location at which to start writing the resulting set of characters.
- `charCount`: The maximum number of characters to write.

Returns: The actual number of characters written at the location indicated by the `chars` parameter.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.

-or-

`chars` is `null`.
- `ArgumentOutOfRangeException`: `byteCount` or `charCount` is less than zero.
- `ArgumentException`: `charCount` is less than the resulting number of characters.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size that `Encoding.GetChars` requires to store the resulting characters, you should use the `Encoding.GetCharCount` method. To calculate the maximum array size, use the `Encoding.GetMaxCharCount` method. The `Encoding.GetCharCount` method generally allows allocation of less memory, while the `Encoding.GetMaxCharCount` method generally executes faster.

`Encoding.GetChars` gets characters from an input byte sequence. `Encoding.GetChars` is different than `Decoder.GetChars` because `Encoding` expects discrete conversions, while `Decoder` is designed for multiple passes on a single input stream.

If the data to be converted is available only in sequential blocks (such as data read from a stream) or if the amount of data is so large that it needs to be divided into smaller blocks, you should use the `Decoder` or the `Encoder` object provided by the `Encoding.GetDecoder` or the `Encoding.GetEncoder` method, respectively, of a derived class.

> **Note:**
> This method is intended to operate on Unicode characters, not on arbitrary binary data, such as byte arrays. If you need to encode arbitrary binary data into text, you should use a protocol such as uuencode, which is implemented by methods such as `Convert.ToBase64CharArray`.

The `Encoding.GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the `Encoding.GetChars` method performs the actual decoding. The `Encoding.GetChars` method expects discrete conversions, in contrast to the `Decoder.GetChars` method, which handles multiple passes on a single input stream.

Several versions of `Encoding.GetCharCount` and `Encoding.GetChars` are supported. The following are some programming considerations for use of these methods:

- Your app might need to decode multiple input bytes from a code page and process the bytes using multiple calls. In this case, you probably need to maintain state between calls, because byte sequences can be interrupted when processed in batches. (For example, part of an ISO-2022 shift sequence may end one `Encoding.GetChars` call and continue at the beginning of the next `Encoding.GetChars` call. `Encoding.GetChars` will call the fallback for those incomplete sequences, but `Decoder` will remember those sequences for the next call.)

- If your app handles string outputs, the `Encoding.GetString` method is recommended. Since this method must check string length and allocate a buffer, it is slightly slower, but the resulting `String` type is to be preferred.

- The byte version of `GetChars` allows some fast techniques, particularly with multiple calls to large buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `GetChars` version that supports output character buffers is the best choice.

- Consider using the `Decoder.Convert` method instead of `Encoding.GetCharCount`. The conversion method converts as much data as possible and throws an exception if the output buffer is too small. For continuous decoding of a stream, this method is often the best choice.
