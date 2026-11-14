---
title: "ASCIIEncoding class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/ASCIIEncoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ASCIIEncoding class (part 3 of 3)

## ASCIIEncoding.GetChars(Byte[], Int32, Int32, Char[], Int32) method

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
- `ArgumentException`: `chars` does not have enough capacity from `charIndex` to the end of the array to accommodate the resulting characters.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `ASCIIEncoding.GetChars` to store the resulting characters, the application uses `ASCIIEncoding.GetCharCount`. To calculate the maximum array size, the application should use `ASCIIEncoding.GetMaxCharCount`. The `ASCIIEncoding.GetCharCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxCharCount` method generally executes faster.

Data to be converted, such as data read from a stream, can be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `ASCIIEncoding.GetDecoder` method or the `ASCIIEncoding.GetEncoder` method, respectively.

`ASCIIEncoding` does not provide error detection. Any byte greater than hexadecimal 0x7F is decoded as the Unicode question mark ("?").

> **Caution:**
>  For security reasons, your application is recommended to use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.

#### Examples
The following example demonstrates how to decode a range of elements from a byte array and store the result in a set of elements in a Unicode character array.

_Code sample not included: ~/snippets/csharp/System.Text/ASCIIEncoding/GetChars/getchars-byte[]-int32-int32-char[]-int32.cs._

## ASCIIEncoding.GetDecoder() method

```csharp
public override System.Text.Decoder GetDecoder ();
```

Obtains a decoder that converts an ASCII encoded sequence of bytes into a sequence of Unicode characters.

Returns: A `Decoder` that converts an ASCII encoded sequence of bytes into a sequence of Unicode characters.

#### Remarks
The `Decoder.GetChars` method converts sequential blocks of bytes into sequential blocks of characters, in a manner similar to the `ASCIIEncoding.GetChars` method of this class. However, a `Decoder` maintains state information between calls so it can correctly decode byte sequences that span blocks. The `Decoder` also preserves trailing bytes at the end of data blocks and uses the trailing bytes in the next decoding operation. Therefore, `ASCIIEncoding.GetDecoder` and `ASCIIEncoding.GetEncoder` are useful for network transmission and file operations, because those operations often deal with blocks of data instead of a complete data stream.

## ASCIIEncoding.GetEncoder() method

```csharp
public override System.Text.Encoder GetEncoder ();
```

Obtains an encoder that converts a sequence of Unicode characters into an ASCII encoded sequence of bytes.

Returns: An `Encoder` that converts a sequence of Unicode characters into an ASCII encoded sequence of bytes.

#### Remarks
The `Encoder.GetBytes` method converts sequential blocks of characters into sequential blocks of bytes, in a manner similar to the `ASCIIEncoding.GetBytes` method of this class. However, an `Encoder` maintains state information between calls so it can correctly encode character sequences that span blocks. The `Encoder` also preserves trailing characters at the end of data blocks and uses the trailing characters in the next encoding operation. For example, a data block might end with an unmatched high surrogate, and the matching low surrogate might be in the next data block. Therefore, `ASCIIEncoding.GetDecoder` and `ASCIIEncoding.GetEncoder` are useful for network transmission and file operations, because those operations often deal with blocks of data instead of a complete data stream.

## ASCIIEncoding.GetMaxByteCount(Int32) method

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

#### Remarks
The `ASCIIEncoding.GetByteCount` method calculates the exact array size required by the `ASCIIEncoding.GetBytes` method to store the resulting bytes, whereas the `ASCIIEncoding.GetMaxByteCount` method calculates the maximum array size. The `ASCIIEncoding.GetByteCount` method generally allocates less memory, but the `ASCIIEncoding.GetMaxByteCount` method generally executes faster.

`ASCIIEncoding.GetMaxByteCount` is a worst-case number, including the worst case for the currently selected `EncoderFallback`.  If you choose a replacement fallback with a potentially large string, `ASCIIEncoding.GetMaxByteCount` can return large values.

The `ASCIIEncoding.GetMaxByteCount` method considers potential leftover surrogates from a previous encoding operation. As a result, if the `ASCIIEncoding` object uses the default replacement fallback, or if a custom replacement fallback has been defined with a single possible fallback character, the method returns `charCount` + 1. If the `ASCIIEncoding` object uses a replacement fallback with more than one possible fallback character, the method returns *n* * (`charCount` + 1), where *n* is the maximum number of fallback characters.

`ASCIIEncoding.GetMaxByteCount` has no relation to `ASCIIEncoding.GetChars`. If your application needs a similar function to use with `ASCIIEncoding.GetChars`, it should use `ASCIIEncoding.GetMaxCharCount`.

> **Note:**
>  `GetMaxByteCount(N)` is not necessarily the same value as `N* GetMaxByteCount(1)`.

#### Examples
The following example demonstrates how to use the `ASCIIEncoding.GetMaxByteCount` method to calculate the bytes required to encode a specified number of characters.

_Code sample not included: ~/snippets/csharp/System.Text/ASCIIEncoding/GetMaxByteCount/getmaxbytecount-int32.cs._

## ASCIIEncoding.GetMaxCharCount(Int32) method

```csharp
public override int GetMaxCharCount (int byteCount);
```

Calculates the maximum number of characters produced by decoding the specified number of bytes.

Parameters:

- `byteCount`: The number of bytes to decode.

Returns: The maximum number of characters produced by decoding the specified number of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `byteCount` is less than zero.

-or-

The resulting number of bytes is greater than the maximum number that can be returned as an integer.

#### Remarks
The `ASCIIEncoding.GetCharCount` method calculates the exact array size required by the `ASCIIEncoding.GetChars` method to store the resulting characters, whereas  the `ASCIIEncoding.GetMaxCharCount` method calculates the maximum array size. The `ASCIIEncoding.GetCharCount` method generally allocates less memory, while the `ASCIIEncoding.GetMaxCharCount` method generally executes faster.

`ASCIIEncoding.GetMaxCharCount` retrieves a worst-case number, including the worst case for the currently selected `DecoderFallback`. If a decoder fallback is present that has a maximum fallback length of *n*, the `ASCIIEncoding.GetMaxCharCount` method returns *n* * `byteCount`.

`ASCIIEncoding.GetMaxCharCount` has no relation to `ASCIIEncoding.GetBytes`. If your application needs a similar function to use with `ASCIIEncoding.GetBytes`, it should use `ASCIIEncoding.GetMaxByteCount`.

> **Note:**
>  `GetMaxCharCount(N)` is not necessarily the same value as `N* GetMaxCharCount(1)`.

#### Examples
The following example demonstrates how to use the `ASCIIEncoding.GetMaxCharCount` method to calculate the maximum number of characters needed to decode a specified number of bytes.

_Code sample not included: ~/snippets/csharp/System.Text/ASCIIEncoding/GetMaxCharCount/getmaxcharcount-int32.cs._

## ASCIIEncoding.GetString(Byte[], Int32, Int32) method

```csharp
public override string GetString (byte[] bytes, int byteIndex, int byteCount);
```

Decodes a range of bytes from a byte array into a string.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `byteIndex`: The index of the first byte to decode.
- `byteCount`: The number of bytes to decode.

Returns: A `String` containing the results of decoding the specified sequence of bytes.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.
- `ArgumentOutOfRangeException`: `byteIndex` or `byteCount` is less than zero.

-or-

`byteIndex` and `byteCount` do not denote a valid range in `bytes`.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
Data to be converted, such as data read from a stream, can be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `ASCIIEncoding.GetDecoder` method or the `ASCIIEncoding.GetEncoder` method, respectively.

`ASCIIEncoding` does not provide error detection. Any byte greater than hexadecimal 0x7F is decoded as the Unicode question mark ("?").

> **Caution:**
> For security reasons, you should use the `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` classes and enable error detection instead of using the `ASCIIEncoding` class.

#### Examples
The following example demonstrates how to use the `ASCIIEncoding.GetString` method to convert a byte array into a `String`.

_Code sample not included: ~/snippets/csharp/System.Text/ASCIIEncoding/GetString/getstring-byte[].cs._

## ASCIIEncoding.TryGetBytes(Char>, Byte>, Int32) method

```csharp
public override bool TryGetBytes (ReadOnlySpan<char> chars, Span<byte> bytes, out int bytesWritten);
```

Encodes into a span of bytes a set of characters from the specified read-only span if the destination is large enough.

Parameters:

- `chars`: The span containing the set of characters to encode.
- `bytes`: The byte span to hold the encoded bytes.
- `bytesWritten`: Upon successful completion of the operation, the number of bytes encoded into `bytes`.

Returns: `true` if all of the characters were encoded into the destination; `false` if the destination was too small to contain all the encoded bytes.

To be added.

## ASCIIEncoding.TryGetChars(Byte>, Char>, Int32) method

```csharp
public override bool TryGetChars (ReadOnlySpan<byte> bytes, Span<char> chars, out int charsWritten);
```

Decodes into a span of chars a set of bytes from the specified read-only span if the destination is large enough.

Parameters:

- `bytes`: A read-only span containing the sequence of bytes to decode.
- `chars`: The character span receiving the decoded bytes.
- `charsWritten`: Upon successful completion of the operation, the number of chars decoded into `chars`.

Returns: `true` if all of the characters were decoded into the destination; `false` if the destination was too small to contain all the decoded chars.

To be added.
