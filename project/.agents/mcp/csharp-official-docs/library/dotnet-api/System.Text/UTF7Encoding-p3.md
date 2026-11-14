---
title: "UTF7Encoding class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/UTF7Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UTF7Encoding class (part 3 of 3)

## UTF7Encoding.GetMaxByteCount(Int32) method

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

The resulting number of bytes is greater than the maximum number that can be returned as an int.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF7Encoding.GetBytes` to store the resulting bytes, the application uses `UTF7Encoding.GetByteCount`. To calculate the maximum array size, the application should use `UTF7Encoding.GetMaxByteCount`. The `UTF7Encoding.GetByteCount` method generally allows allocation of less memory, while the `UTF7Encoding.GetMaxByteCount` method generally executes faster.

`UTF7Encoding.GetMaxByteCount` is a worst-case number, including the worst case for the currently selected `EncoderFallback`. If a fallback is chosen with a potentially large string, `UTF7Encoding.GetMaxByteCount` can return large values.

In most cases, this method returns reasonable numbers for small strings. For large strings, you might have to choose between using very large buffers and catching errors in the rare case that a more reasonable buffer is exceeded. You might also want to consider a different approach using `UTF7Encoding.GetByteCount` or `Encoder.Convert`. While UTF-7 is very efficient at encoding ASCII data, one byte per character, it is extremely inefficient for other data. As remarked above, `UTF7Encoding.GetMaxByteCount` deals with a worst case. If the data to be encoded is largely ASCII, and especially if the ASCII characters cluster together, UTF-7 is significantly more efficient than the number returned by this method suggests.

`UTF7Encoding.GetMaxByteCount` has no relation to `UTF7Encoding.GetChars`. If your application needs a similar function to use with `UTF7Encoding.GetChars`, it should use `UTF7Encoding.GetMaxCharCount`.

> **Note:**
>  `GetMaxByteCount(N)` is not necessarily the same value as `N* GetMaxByteCount(1)`.

#### Examples
The following code example demonstrates how to use the `UTF7Encoding.GetMaxByteCount` method to return the maximum number of bytes required to encode a specified number of characters.

_Code sample not included: ~/snippets/csharp/System.Text/UTF7Encoding/GetMaxByteCount/getmaxbytecount-int32.cs._

## UTF7Encoding.GetMaxCharCount(Int32) method

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

The resulting number of characters is greater than the maximum number that can be returned as an int.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF7Encoding.GetChars` to store the resulting characters, the application uses `UTF7Encoding.GetCharCount`. To calculate the maximum array size, the application should use `UTF7Encoding.GetMaxCharCount`. The `UTF7Encoding.GetCharCount` method generally allows allocation of less memory, while the `UTF7Encoding.GetMaxCharCount` method generally executes faster.

`UTF7Encoding.GetMaxCharCount` is a worst-case number, including the worst case for the currently selected `DecoderFallback`. If a fallback is chosen with a potentially large string, `UTF7Encoding.GetMaxCharCount` can return large values.

In most cases, this method returns reasonable numbers for small strings. For large strings, you might have to choose between using very large buffers and catching errors in the rare case that a more reasonable buffer is exceeded. You might also want to consider a different approach using `UTF7Encoding.GetCharCount` or `Decoder.Convert`.

`UTF7Encoding.GetMaxCharCount` has no relation to `UTF7Encoding.GetBytes`. If your application needs a similar function to use with `UTF7Encoding.GetBytes`, it should use `UTF7Encoding.GetMaxByteCount`.

> **Note:**
>  `GetMaxCharCount(N)` is not necessarily the same value as `N* GetMaxCharCount(1)`.

#### Examples
The following code example demonstrates how to use the `UTF7Encoding.GetMaxCharCount` method to return the maximum number of characters produced by decoding a specified number of bytes.

_Code sample not included: ~/snippets/csharp/System.Text/UTF7Encoding/GetMaxCharCount/getmaxcharcount-int32.cs._

## UTF7Encoding.GetString(Byte[], Int32, Int32) method

```csharp
public override string GetString (byte[] bytes, int index, int count);
```

Decodes a range of bytes from a byte array into a string.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `index`: The index of the first byte to decode.
- `count`: The number of bytes to decode.

Returns: A `String` containing the results of decoding the specified sequence of bytes.

Exceptions:

- `ArgumentNullException`: `bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` and `count` do not denote a valid range in `bytes`.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET).

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `UTF7Encoding.GetDecoder` method or the `UTF7Encoding.GetEncoder` method, respectively.

> **Note:**
>  `UTF7Encoding` does not provide error detection. When invalid bytes are encountered, `UTF7Encoding` generally emits the invalid bytes. If a byte is larger than hexadecimal 0x7F, the byte value is zero-extended into a Unicode character, the result is stored in the `chars` array, and any shift sequence is terminated. For example, if the byte to encode is hexadecimal 0x81, the resulting character is U+0081. For security reasons, your applications are recommended to use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.

#### Examples
The following code example encodes a string into an array of bytes, and then decodes the bytes back into a string.

_Code sample not included: ~/snippets/csharp/System.Text/UTF7Encoding/GetString/getstring.cs._
