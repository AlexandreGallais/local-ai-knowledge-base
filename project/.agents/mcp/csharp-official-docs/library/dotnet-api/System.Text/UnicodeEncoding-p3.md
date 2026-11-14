---
title: "UnicodeEncoding class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/UnicodeEncoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnicodeEncoding class (part 3 of 4)

## UnicodeEncoding.GetBytes(String, Int32, Int32, Byte[], Int32) method

```csharp
public override int GetBytes (string s, int charIndex, int charCount, byte[] bytes, int byteIndex);
```

Encodes a set of characters from the specified `String` into the specified byte array.

Parameters:

- `s`: The string containing the set of characters to encode.
- `charIndex`: The index of the first character to encode.
- `charCount`: The number of characters to encode.
- `bytes`: The byte array to contain the resulting sequence of bytes.
- `byteIndex`: The index at which to start writing the resulting sequence of bytes.

Returns: The actual number of bytes written into `bytes`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.

-or-

`bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `charIndex` or `charCount` or `byteIndex` is less than zero.

-or-

`charIndex` and `charCount` do not denote a valid range in `s`.

-or-

`byteIndex` is not a valid index in `bytes`.
- `ArgumentException`: Error detection is enabled, and `s` contains an invalid sequence of characters.

-or-

`bytes` does not have enough capacity from `byteIndex` to the end of the array to accommodate the resulting bytes.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UnicodeEncoding.GetBytes` to store the resulting bytes, you call the `UnicodeEncoding.GetByteCount` method. To calculate the maximum array size, you call the `UnicodeEncoding.GetMaxByteCount` method. The `UnicodeEncoding.GetByteCount` method generally allocates less memory, while the `UnicodeEncoding.GetMaxByteCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `UnicodeEncoding.GetDecoder` method or the `UnicodeEncoding.GetEncoder` method, respectively.

> **Important:**
> To ensure that the encoded bytes are decoded properly when they are saved as a file or as a stream, you can prefix a stream of encoded bytes with a preamble. Inserting the preamble at the beginning of a byte stream (such as at the beginning of a series of bytes to be written to a file) is the developer's responsibility. The `UnicodeEncoding.GetBytes` method does not prepend a preamble to the beginning of a sequence of encoded bytes.

#### Examples
The following example demonstrates how to encode a range of elements from a Unicode character array and store the encoded bytes in a range of elements in a byte array.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/GetBytes/getbytes-char[]-int32-int32-byte[]-int32.cs._

## UnicodeEncoding.GetCharCount(Byte*, Int32) method

```csharp
public override int GetCharCount (byte* bytes, int count);
```

Calculates the number of characters produced by decoding a sequence of bytes starting at the specified byte pointer.

Parameters:

- `bytes`: A pointer to the first byte to decode.
- `count`: The number of bytes to decode.

Returns: The number of characters produced by decoding the specified sequence of bytes.

Exceptions:

- `ArgumentNullException`: `bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `count` is less than zero.

-or-

The resulting number of bytes is greater than the maximum number that can be returned as an integer.
- `ArgumentException`: Error detection is enabled, and `bytes` contains an invalid sequence of bytes.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size that `UnicodeEncoding.GetChars` requires to store the resulting characters, the application uses `UnicodeEncoding.GetCharCount`. To calculate the maximum array size, the application should use `UnicodeEncoding.GetMaxCharCount`. The `UnicodeEncoding.GetCharCount` method generally allocates less memory, while the `UnicodeEncoding.GetMaxCharCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

## UnicodeEncoding.GetCharCount(Byte[], Int32, Int32) method

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

- `ArgumentNullException`: `bytes` is `null` (`Nothing`).
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
To calculate the exact array size required by `UnicodeEncoding.GetChars` to store the resulting characters, the application uses `UnicodeEncoding.GetCharCount`. To calculate the maximum array size, the application should use `UnicodeEncoding.GetMaxCharCount`. The `UnicodeEncoding.GetCharCount` method generally allocates less memory, while the `UnicodeEncoding.GetMaxCharCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

#### Examples
The following example demonstrates how to use the `UnicodeEncoding.GetCharCount` method to return the number of characters produced by decoding a range of elements in a byte array using `UnicodeEncoding`.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/GetCharCount/getcharcount-byte[]-int32-int32.cs._

## UnicodeEncoding.GetChars(Byte*, Int32, Char*, Int32) method

```csharp
public override int GetChars (byte* bytes, int byteCount, char* chars, int charCount);
```

Decodes a sequence of bytes starting at the specified byte pointer into a set of characters that are stored starting at the specified character pointer.

Parameters:

- `bytes`: A pointer to the first byte to decode.
- `byteCount`: The number of bytes to decode.
- `chars`: A pointer to the location at which to start writing the resulting set of characters.
- `charCount`: The maximum number of characters to write.

Returns: The actual number of characters written at the location indicated by the `chars` parameter.

Exceptions:

- `ArgumentNullException`: `bytes` is `null` (`Nothing`).

-or-

`chars` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `byteCount` or `charCount` is less than zero.
- `ArgumentException`: Error detection is enabled, and `bytes` contains an invalid sequence of bytes.

-or-

`charCount` is less than the resulting number of characters.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size that `UnicodeEncoding.GetChars` requires to store the resulting characters, the application uses `UnicodeEncoding.GetCharCount`. To calculate the maximum array size, the application should use `UnicodeEncoding.GetMaxCharCount`. The `UnicodeEncoding.GetCharCount` method generally allocates less memory, while the `UnicodeEncoding.GetMaxCharCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

If the range of bytes to be decoded includes the byte order mark (BOM) and the byte array was returned by a method of a non-BOM aware type, the character U+FFFE is included in the character array returned by this method. You can remove it by calling the `String.TrimStart` method.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` object provided by the `UnicodeEncoding.GetDecoder` or the `UnicodeEncoding.GetEncoder` method, respectively.

## UnicodeEncoding.GetChars(Byte[], Int32, Int32, Char[], Int32) method

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

- `ArgumentNullException`: `bytes` is `null` (`Nothing`).

-or-

`chars` is `null` (`Nothing`).
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
To calculate the exact array size required by `UnicodeEncoding.GetChars` to store the resulting characters, the application uses `UnicodeEncoding.GetCharCount`. To calculate the maximum array size, the application should use `UnicodeEncoding.GetMaxCharCount`. The `UnicodeEncoding.GetCharCount` method generally allocates less memory, while the `UnicodeEncoding.GetMaxCharCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

If the range of bytes to be decoded includes the byte order mark (BOM) and the byte array was returned by a method of a non-BOM aware type, the character U+FFFE is included in the character array returned by this method. You can remove it by calling the `String.TrimStart` method.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `UnicodeEncoding.GetDecoder` method or the `UnicodeEncoding.GetEncoder` method, respectively.

#### Examples
The following example demonstrates how to use the `UnicodeEncoding.GetChars` method to decode a range of elements in a byte array and store the result in a character array.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/GetChars/getchars-byte[]-int32-int32-char[]-int32.cs._

## UnicodeEncoding.GetDecoder() method

```csharp
public override System.Text.Decoder GetDecoder ();
```

Obtains a decoder that converts a UTF-16 encoded sequence of bytes into a sequence of Unicode characters.

Returns: A `Decoder` that converts a UTF-16 encoded sequence of bytes into a sequence of Unicode characters.

#### Remarks
The `Decoder.GetChars` method converts sequential blocks of bytes into sequential blocks of characters, in a manner similar to the `UnicodeEncoding.GetChars`. However, a `Decoder` maintains state information between calls so it can correctly decode byte sequences that span blocks. The `Decoder` also preserves trailing bytes at the end of data blocks and uses the trailing bytes in the next decoding operation. Therefore, `UnicodeEncoding.GetDecoder` and `UnicodeEncoding.GetEncoder` are useful for network transmission and file operations, because those operations often deal with blocks of data instead of a complete data stream.

If error detection is enabled, that is, the `throwOnInvalidBytes` parameter of the constructor is set to `true`, error detection is also enabled in the `Decoder` returned by this method. If error detection is enabled and an invalid sequence is encountered, the state of the decoder is undefined and processing must stop.

#### Examples
The following example uses an encoder and a decoder to encode a string into an array of bytes, and then decode the bytes into an array of characters.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/GetDecoder/encdec.cs._
