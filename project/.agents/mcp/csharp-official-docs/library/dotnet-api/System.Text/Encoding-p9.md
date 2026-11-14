---
title: "Encoding class (part 9 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoding class (part 9 of 14)

## Encoding.GetCharCount(Byte[]) method

```csharp
public virtual int GetCharCount (byte[] bytes);
```

When overridden in a derived class, calculates the number of characters produced by decoding all the bytes in the specified byte array.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.

Returns: The number of characters produced by decoding the specified sequence of bytes.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `GetChars` to store the resulting characters, you should use the `GetCharCount` method. To calculate the maximum array size, you should use the `GetMaxCharCount` method. The `GetCharCount` method generally allows allocation of less memory, while the `Encoding.GetMaxCharCount` method generally executes faster.

The `GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the  `GetChars` method performs the actual decoding. The `Encoding.GetChars` method expects discrete conversions, in contrast to the `Decoder.GetChars` method, which handles multiple passes on a single input stream.

Several versions of `Encoding.GetCharCount` and `Encoding.GetChars` are supported. The following are some programming considerations for use of these methods:

- Your app might need to decode multiple input bytes from a code page and process the bytes using multiple calls. In this case, you probably need to maintain state between calls.

- If your app handles string outputs, you should use the `Encoding.GetString` method. Since this method must check string length and allocate a buffer, it is slightly slower, but the resulting `String` type is to be preferred.

- The byte version of `GetChars` allows some fast techniques, particularly with multiple calls to large buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `GetChars` version that supports output character buffers is the best choice.

- Consider using the `Decoder.Convert` method instead of `Encoding.GetCharCount`. The conversion method converts as much data as possible and throws an exception if the output buffer is too small. For continuous decoding of a stream, this method is often the best choice.

#### Examples
The following example encodes a string into an array of bytes, and then decodes the bytes into an array of characters.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetCharCount/getchars.cs._

## Encoding.GetCharCount(Byte>) method

```csharp
public virtual int GetCharCount (ReadOnlySpan<byte> bytes);
```

When overridden in a derived class, calculates the number of characters produced by decoding the provided read-only byte span.

Parameters:

- `bytes`: A read-only byte span to decode.

Returns: The number of characters produced by decoding the byte span.

#### Remarks
To calculate the exact array size that `Encoding.GetChars` requires to store the resulting characters, you should use the `Encoding.GetCharCount` method. To calculate the maximum array size, use the `Encoding.GetMaxCharCount` method. The `Encoding.GetCharCount` method generally allows allocation of less memory, while the `Encoding.GetMaxCharCount` method generally executes faster.

The `Encoding.GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the `Encoding.GetChars` method performs the actual decoding. The `Encoding.GetChars` method expects discrete conversions, in contrast to the `Decoder.GetChars` method, which handles multiple passes on a single input stream.

Several versions of `Encoding.GetCharCount` and `Encoding.GetChars` are supported. The following are some programming considerations for use of these methods:

- Your app might need to decode multiple input bytes from a code page and process the bytes using multiple calls. In this case, you probably need to maintain state between calls.

- If your app handles string outputs, it is recommended to use the `Encoding.GetString` method. Since this method must check string length and allocate a buffer, it is slightly slower, but the resulting `String` type is to be preferred.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `GetChars` version that supports output character buffers is the best choice.

- Consider using the `Decoder.Convert` method instead of `Encoding.GetCharCount`. The conversion method converts as much data as possible and throws an exception if the output buffer is too small. For continuous decoding of a stream, this method is often the best choice.

## Encoding.GetCharCount(Byte*, Int32) method

```csharp
public virtual int GetCharCount (byte* bytes, int count);
```

When overridden in a derived class, calculates the number of characters produced by decoding a sequence of bytes starting at the specified byte pointer.

Parameters:

- `bytes`: A pointer to the first byte to decode.
- `count`: The number of bytes to decode.

Returns: The number of characters produced by decoding the specified sequence of bytes.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.
- `ArgumentOutOfRangeException`: `count` is less than zero.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size that `Encoding.GetChars` requires to store the resulting characters, you should use the `Encoding.GetCharCount` method. To calculate the maximum array size, use the `Encoding.GetMaxCharCount` method. The `Encoding.GetCharCount` method generally allows allocation of less memory, while the `Encoding.GetMaxCharCount` method generally executes faster.

The `Encoding.GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the `Encoding.GetChars` method performs the actual decoding. The `Encoding.GetChars` method expects discrete conversions, in contrast to the `Decoder.GetChars` method, which handles multiple passes on a single input stream.

Several versions of `Encoding.GetCharCount` and `Encoding.GetChars` are supported. The following are some programming considerations for use of these methods:

- Your app might need to decode multiple input bytes from a code page and process the bytes using multiple calls. In this case, you probably need to maintain state between calls.

- If your app handles string outputs, it is recommended to use the `Encoding.GetString` method. Since this method must check string length and allocate a buffer, it is slightly slower, but the resulting `String` type is to be preferred.

- The byte version of `GetChars` allows some fast techniques, particularly with multiple calls to large buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `GetChars` version that supports output character buffers is the best choice.

- Consider using the `Decoder.Convert` method instead of `Encoding.GetCharCount`. The conversion method converts as much data as possible and throws an exception if the output buffer is too small. For continuous decoding of a stream, this method is often the best choice.

## Encoding.GetCharCount(Byte[], Int32, Int32) method

```csharp
public abstract int GetCharCount (byte[] bytes, int index, int count);
```

When overridden in a derived class, calculates the number of characters produced by decoding a sequence of bytes from the specified byte array.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `index`: The index of the first byte to decode.
- `count`: The number of bytes to decode.

Returns: The number of characters produced by decoding the specified sequence of bytes.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` and `count` do not denote a valid range in `bytes`.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `Encoding.GetChars` to store the resulting characters, you should use the `Encoding.GetCharCount` method. To calculate the maximum array size, use the `Encoding.GetMaxCharCount` method. The `Encoding.GetCharCount` method generally allows allocation of less memory, while the `Encoding.GetMaxCharCount` method generally executes faster.

The `Encoding.GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the `Encoding.GetChars` method performs the actual decoding. The `Encoding.GetChars` method expects discrete conversions, in contrast to the `Decoder.GetChars` method, which handles multiple passes on a single input stream.

Several versions of `Encoding.GetCharCount` and `Encoding.GetChars` are supported. The following are some programming considerations for use of these methods:

- Your app might need to decode multiple input bytes from a code page and process the bytes using multiple calls. In this case, you probably need to maintain state between calls.

- If your app handles string outputs, it is recommended to use the `Encoding.GetString` method. Since this method must check string length and allocate a buffer, it is slightly slower, but the resulting `String` type is to be preferred.

- The byte version of `GetChars` allows some fast techniques, particularly with multiple calls to large buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `GetChars` version that supports output character buffers is the best choice.

- Consider using the `Decoder.Convert` method instead of `Encoding.GetCharCount`. The conversion method converts as much data as possible and throws an exception if the output buffer is too small. For continuous decoding of a stream, this method is often the best choice.

#### Examples
The following example converts a string from one encoding to another.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/Overview/convert.cs._

The following example encodes a string into an array of bytes, and then decodes a range of the bytes into an array of characters.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetCharCount/getcharsic.cs._

## Encoding.GetChars(Byte[]) method

```csharp
public virtual char[] GetChars (byte[] bytes);
```

When overridden in a derived class, decodes all the bytes in the specified byte array into a set of characters.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.

Returns: A character array containing the results of decoding the specified sequence of bytes.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.
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
The following example encodes a string into an array of bytes, and then decodes the bytes into an array of characters.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetCharCount/getchars.cs._
