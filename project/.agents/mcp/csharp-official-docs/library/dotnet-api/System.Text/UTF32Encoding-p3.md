---
title: "UTF32Encoding class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/UTF32Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UTF32Encoding class (part 3 of 4)

## UTF32Encoding.GetCharCount(Byte*, Int32) method

```csharp
public override int GetCharCount (byte* bytes, int count);
```

Calculates the number of characters produced by decoding a sequence of bytes starting at the specified byte pointer.

Parameters:

- `bytes`: A pointer to the first byte to decode.
- `count`: The number of bytes to decode.

Returns: The number of characters produced by decoding the specified sequence of bytes.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.
- `ArgumentOutOfRangeException`: `count` is less than zero.

-or-

The resulting number of bytes is greater than the maximum number that can be returned as an integer.
- `ArgumentException`: Error detection is enabled, and `bytes` contains an invalid sequence of bytes.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
`UTF32Encoding.GetCharCount` calculates the exact array size required by the `UTF32Encoding.GetChars` method to store the resulting characters. To calculate the maximum array size, call the `UTF32Encoding.GetMaxCharCount` method. The `UTF32Encoding.GetCharCount` method generally allocates less memory, while the `UTF32Encoding.GetMaxCharCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

## UTF32Encoding.GetCharCount(Byte[], Int32, Int32) method

```csharp
public override int GetCharCount (byte[] bytes, int index, int count);
```

Calculates the number of characters produced by decoding a sequence of bytes from the specified byte array.

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

-or-

The resulting number of bytes is greater than the maximum number that can be returned as an integer.
- `ArgumentException`: Error detection is enabled, and `bytes` contains an invalid sequence of bytes.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
The `UTF32Encoding.GetCharCount` method calculates the exact array size required by the `UTF32Encoding.GetChars` method to store the resulting characters. To calculate the maximum array size, call the `UTF32Encoding.GetMaxCharCount` method. The `UTF32Encoding.GetCharCount` method generally allocates less memory, while the `UTF32Encoding.GetMaxCharCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

#### Examples
The following example encodes a string into an array of bytes, and then decodes the bytes into an array of characters.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/GetCharCount/getchars.cs._

## UTF32Encoding.GetChars(Byte*, Int32, Char*, Int32) method

```csharp
public override int GetChars (byte* bytes, int byteCount, char* chars, int charCount);
```

Decodes a sequence of bytes starting at the specified byte pointer into a set of characters that are stored starting at the specified character pointer.

Parameters:

- `bytes`: A pointer to the first byte to decode.
- `byteCount`: The number of bytes to decode.
- `chars`: A pointer to the location at which to start writing the resulting set of characters.
- `charCount`: The maximum number of characters to write.

Returns: The actual number of characters written at the location indicated by `chars`.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.

-or-

`chars` is `null`.
- `ArgumentOutOfRangeException`: `byteCount` or `charCount` is less than zero.
- `ArgumentException`: Error detection is enabled, and `bytes` contains an invalid sequence of bytes.

-or-

`charCount` is less than the resulting number of characters.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF32Encoding.GetChars` to store the resulting characters, call the `UTF32Encoding.GetCharCount` method. To calculate the maximum array size, call the `UTF32Encoding.GetMaxCharCount` method. The `UTF32Encoding.GetCharCount` method generally allocates less memory, while the `UTF32Encoding.GetMaxCharCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

If the range of bytes to be decoded includes the byte order mark (BOM) and the byte array was returned by a method of a non-BOM aware type, the character U+FFFE is included in the character array returned by this method. You can remove it by calling the `String.TrimStart` method.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application uses the `Decoder` or the `Encoder` provided by the `UTF32Encoding.GetDecoder` method or the `UTF32Encoding.GetEncoder` method, respectively.

## UTF32Encoding.GetChars(Byte[], Int32, Int32, Char[], Int32) method

```csharp
public override int GetChars (byte[] bytes, int byteIndex, int byteCount, char[] chars, int charIndex);
```

Decodes a sequence of bytes from the specified byte array into the specified character array.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `byteIndex`: The index of the first byte to decode.
- `byteCount`: The number of bytes to decode.
- `chars`: The character array to contain the resulting set of characters.
- `charIndex`: The index at which to start writing the resulting set of characters.

Returns: The actual number of characters written into `chars`.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.

-or-

`chars` is `null`.
- `ArgumentOutOfRangeException`: `byteIndex` or `byteCount` or `charIndex` is less than zero.

-or-

`byteIndex` and `byteCount` do not denote a valid range in `bytes`.

-or-

`charIndex` is not a valid index in `chars`.
- `ArgumentException`: Error detection is enabled, and `bytes` contains an invalid sequence of bytes.

-or-

`chars` does not have enough capacity from `charIndex` to the end of the array to accommodate the resulting characters.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF32Encoding.GetChars` to store the resulting characters, call the `UTF32Encoding.GetCharCount` method. To calculate the maximum array size, call the `UTF32Encoding.GetMaxCharCount` method. The `UTF32Encoding.GetCharCount` method generally allocates less memory, while the `UTF32Encoding.GetMaxCharCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

If the range of bytes to be decoded includes the byte order mark (BOM) and the byte array was returned by a method of a non-BOM aware type, the character U+FFFE is included in the character array returned by this method. You can remove it by calling the `String.TrimStart` method.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application uses the `Decoder` or the `Encoder` provided by the `UTF32Encoding.GetDecoder` method or the `UTF32Encoding.GetEncoder` method, respectively.

#### Examples
The following example encodes a string into an array of bytes, and then decodes the bytes into an array of characters.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/GetCharCount/getchars.cs._

## UTF32Encoding.GetDecoder() method

```csharp
public override System.Text.Decoder GetDecoder ();
```

Obtains a decoder that converts a UTF-32 encoded sequence of bytes into a sequence of Unicode characters.

Returns: A `Decoder` that converts a UTF-32 encoded sequence of bytes into a sequence of Unicode characters.

#### Remarks
The `Decoder.GetChars` method converts sequential blocks of bytes into sequential blocks of characters, in a manner similar to the `UTF32Encoding.GetChars` method. However, a `Decoder` maintains state information between calls so it can correctly decode byte sequences that span blocks. The `Decoder` also preserves trailing bytes at the end of data blocks and uses the trailing bytes in the next decoding operation. Therefore, `UTF32Encoding.GetDecoder` and `UTF32Encoding.GetEncoder` are useful for network transmission and file operations, because those operations often deal with blocks of data instead of a complete data stream.

If error detection is enabled, that is, the `throwOnInvalidCharacters` parameter of the constructor was set to `true`, error detection is also enabled in the `Decoder` returned by this method. If error detection is enabled and an invalid sequence is encountered, the state of the decoder is undefined and processing must stop.

#### Examples
The following example uses an encoder and a decoder to encode a string into an array of bytes, and then decode the bytes into an array of characters.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/GetDecoder/encdec.cs._

## UTF32Encoding.GetEncoder() method

```csharp
public override System.Text.Encoder GetEncoder ();
```

Obtains an encoder that converts a sequence of Unicode characters into a UTF-32 encoded sequence of bytes.

Returns: A `Encoder` that converts a sequence of Unicode characters into a UTF-32 encoded sequence of bytes.

#### Remarks
The `Encoder.GetBytes` method converts sequential blocks of characters into sequential blocks of bytes, in a manner similar to the `UTF32Encoding.GetBytes` method. However, a `Encoder` maintains state information between calls so it can correctly encode character sequences that span blocks. The `Encoder` also preserves trailing characters at the end of data blocks and uses the trailing characters in the next encoding operation. For example, a data block might end with an unmatched high-surrogate, and the matching low-surrogate might be in the next data block. Therefore, `UTF32Encoding.GetDecoder` and `UTF32Encoding.GetEncoder` are useful for network transmission and file operations, because those operations often deal with blocks of data instead of a complete data stream.

If error detection is enabled, that is, the `throwOnInvalidCharacters` parameter of the constructor was set to `true`, error detection is also enabled in the `Encoder` returned by this method. If error detection is enabled and an invalid sequence is encountered, the state of the encoder is undefined and processing must stop.

#### Examples
The following example uses an encoder and a decoder to encode a string into an array of bytes, and then decode the bytes into an array of characters.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/GetDecoder/encdec.cs._

## UTF32Encoding.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current instance.

Returns: The hash code for the current `UTF32Encoding` object.

To be added.

## UTF32Encoding.GetMaxByteCount(Int32) method

```csharp
public override int GetMaxByteCount (int charCount);
```

Calculates the maximum number of bytes produced by encoding the specified number of characters.

Parameters:

- `charCount`: The number of characters to encode.

Returns: The maximum number of bytes produced by encoding the specified number of characters.

Exceptions:

- `ArgumentOutOfRangeException`: `charCount` is less than zero.

-or-

The resulting number of bytes is greater than the maximum number that can be returned as an integer.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF32Encoding.GetBytes` to store the resulting bytes, you call the `UTF32Encoding.GetByteCount` method. To calculate the maximum array size, you call the `UTF32Encoding.GetMaxByteCount` method. The `UTF32Encoding.GetByteCount` method generally allocates less memory, while the `UTF32Encoding.GetMaxByteCount` method generally executes faster.

`UTF32Encoding.GetMaxByteCount` is a worst-case number, including the worst case for the currently selected `EncoderFallback`. If a fallback is chosen with a potentially large string,  `UTF32Encoding.GetMaxByteCount` can return large values.

In most cases, this method returns reasonable numbers for small strings. For large strings, you might have to choose between using very large buffers and catching errors in the rare case that a more reasonable buffer is exceeded. You might also want to consider a different approach and use `UTF32Encoding.GetByteCount` or `Encoder.Convert`.

`UTF32Encoding.GetMaxByteCount` has no relationship to `UTF32Encoding.GetChars`. If you need a similar function to use with `UTF32Encoding.GetChars`, use `UTF32Encoding.GetMaxCharCount`.

> **Note:**
>  `GetMaxByteCount(N)` is not necessarily the same value as `N* GetMaxByteCount(1)`.

#### Examples
The following example determines the number of bytes required to encode a string, then encodes the string and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/GetBytes/getbytes_string.cs._
