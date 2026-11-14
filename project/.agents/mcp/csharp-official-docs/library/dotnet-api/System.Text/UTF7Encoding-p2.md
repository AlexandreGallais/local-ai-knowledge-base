---
title: "UTF7Encoding class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/UTF7Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UTF7Encoding class (part 2 of 3)

## UTF7Encoding.GetBytes(String, Int32, Int32, Byte[], Int32) method

```csharp
public override int GetBytes (string s, int charIndex, int charCount, byte[] bytes, int byteIndex);
```

Encodes a set of characters from the specified `String` into the specified byte array.

Parameters:

- `s`: The `String` containing the set of characters to encode.
- `charIndex`: The index of the first character to encode.
- `charCount`: The number of characters to encode.
- `bytes`: The byte array to contain the resulting sequence of bytes.
- `byteIndex`: The index at which to start writing the resulting sequence of bytes.

Returns: The actual number of bytes written into `bytes`.

Exceptions:

- `ArgumentNullException`: `s` is `null` (`Nothing`).

-or-

`bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `charIndex` or `charCount` or `byteIndex` is less than zero.

-or-

`charIndex` and `charCount` do not denote a valid range in `s`.

-or-

`byteIndex` is not a valid index in `bytes`.
- `ArgumentException`: `bytes` does not have enough capacity from `byteIndex` to the end of the array to accommodate the resulting bytes.
- `EncoderFallbackException`: A fallback occurred (see Character Encoding in .NET for fuller explanation).

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF7Encoding.GetBytes` to store the resulting bytes, the application uses `UTF7Encoding.GetByteCount`. To calculate the maximum array size, the application should use `UTF7Encoding.GetMaxByteCount`. The `UTF7Encoding.GetByteCount` method generally allows allocation of less memory, while the `UTF7Encoding.GetMaxByteCount` method generally executes faster.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `UTF7Encoding.GetDecoder` method or the `UTF7Encoding.GetEncoder` method, respectively.

> **Note:**
>  `UTF7Encoding` does not provide error detection. Invalid characters are encoded as a modified base 64 character. For security reasons, your applications are recommended to use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.

#### Examples
The following code example demonstrates how to use the `UTF7Encoding.GetBytes` method to encode a range of elements from a Unicode character array, and store the encoded bytes in a range of elements in a byte array.

_Code sample not included: ~/snippets/csharp/System.Text/UTF7Encoding/GetBytes/getbytes-char[]-int32-int32-byte[]-int32.cs._

## UTF7Encoding.GetCharCount(Byte*, Int32) method

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

The resulting number of characters is greater than the maximum number that can be returned as an int.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET).

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF7Encoding.GetChars` to store the resulting characters, use `UTF7Encoding.GetCharCount`. To calculate the maximum array size, the application should use `UTF7Encoding.GetMaxCharCount`. The `UTF7Encoding.GetCharCount` method generally allows allocation of less memory, while the `UTF7Encoding.GetMaxCharCount` method generally executes faster.

## UTF7Encoding.GetCharCount(Byte[], Int32, Int32) method

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

The resulting number of characters is greater than the maximum number that can be returned as an int.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF7Encoding.GetChars` to store the resulting characters, use `UTF7Encoding.GetCharCount`. To calculate the maximum array size, the application should use `UTF7Encoding.GetMaxCharCount`. The `UTF7Encoding.GetCharCount` method generally allows allocation of less memory, while the `UTF7Encoding.GetMaxCharCount` method generally executes faster.

#### Examples
The following code example demonstrates how to use the `UTF7Encoding.GetCharCount` method to return the number of characters produced by decoding a range of elements in a byte array.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/GetCharCount/getcharcount-byte[]-int32-int32.cs._

## UTF7Encoding.GetChars(Byte*, Int32, Char*, Int32) method

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

- `ArgumentNullException`: `bytes` is `null` (`Nothing`).

-or-

`chars` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `byteCount` or `charCount` is less than zero.
- `ArgumentException`: `charCount` is less than the resulting number of characters.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF7Encoding.GetChars` to store the resulting characters, use `UTF7Encoding.GetCharCount`. To calculate the maximum array size, the application should use `UTF7Encoding.GetMaxCharCount`. The `UTF7Encoding.GetCharCount` method generally allows allocation of less memory, while the `UTF7Encoding.GetMaxCharCount` method generally executes faster.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `UTF7Encoding.GetDecoder` method or the `UTF7Encoding.GetEncoder` method, respectively.

> **Note:**
>  `UTF7Encoding` does not provide error detection. When invalid bytes are encountered, `UTF7Encoding` generally emits the invalid bytes. If a byte is larger than hexadecimal 0x7F, the byte value is zero-extended into a Unicode character, the result is stored in the `chars` array, and any shift sequence is terminated. For example, if the byte to encode is hexadecimal 0x81, the resulting character is U+0081. For security reasons, your applications are recommended to use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.

## UTF7Encoding.GetChars(Byte[], Int32, Int32, Char[], Int32) method

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
- `ArgumentException`: `chars` does not have enough capacity from `charIndex` to the end of the array to accommodate the resulting characters.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF7Encoding.GetChars` to store the resulting characters, use `UTF7Encoding.GetCharCount`. To calculate the maximum array size, the application should use `UTF7Encoding.GetMaxCharCount`. The `UTF7Encoding.GetCharCount` method generally allows allocation of less memory, while the `UTF7Encoding.GetMaxCharCount` method generally executes faster.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `UTF7Encoding.GetDecoder` method or the `UTF7Encoding.GetEncoder` method, respectively.

> **Note:**
>  `UTF7Encoding` does not provide error detection. When invalid bytes are encountered, `UTF7Encoding` generally emits the invalid bytes. If a byte is larger than hexadecimal 0x7F, the byte value is zero-extended into a Unicode character, the result is stored in the `chars` array, and any shift sequence is terminated. For example, if the byte to encode is hexadecimal 0x81, the resulting character is U+0081. For security reasons, your applications are recommended to use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.

#### Examples
The following code example demonstrates how to use the `UTF7Encoding.GetChars` method to decode a range of elements in a byte array and store the result in a character array.

_Code sample not included: ~/snippets/csharp/System.Text/UTF7Encoding/GetChars/getchars-byte[]-int32-int32-char[]-int32.cs._

## UTF7Encoding.GetDecoder() method

```csharp
public override System.Text.Decoder GetDecoder ();
```

Obtains a decoder that converts a UTF-7 encoded sequence of bytes into a sequence of Unicode characters.

Returns: A `Decoder` that converts a UTF-7 encoded sequence of bytes into a sequence of Unicode characters.

#### Remarks
The `Decoder.GetChars` method converts sequential blocks of bytes into sequential blocks of characters, in a manner similar to the `UTF7Encoding.GetChars` method of this class. However, a `Decoder` maintains state information between calls so it can correctly decode byte sequences that span blocks. The `Decoder` also preserves trailing bytes at the end of data blocks and uses the trailing bytes in the next decoding operation. Therefore, `UTF7Encoding.GetDecoder` and `UTF7Encoding.GetEncoder` are useful for network transmission and file operations, because those operations often deal with blocks of data instead of a complete data stream.

#### Examples
The following code example demonstrates how to use the `UTF7Encoding.GetDecoder` method to obtain a decoder to convert the UTF-7 encoded bytes into a sequence of characters.

_Code sample not included: ~/snippets/csharp/System.Text/UTF7Encoding/GetDecoder/getdecoder-.cs._

## UTF7Encoding.GetEncoder() method

```csharp
public override System.Text.Encoder GetEncoder ();
```

Obtains an encoder that converts a sequence of Unicode characters into a UTF-7 encoded sequence of bytes.

Returns: A `Encoder` that converts a sequence of Unicode characters into a UTF-7 encoded sequence of bytes.

#### Remarks
The `Decoder.GetChars` method converts sequential blocks of bytes into sequential blocks of characters, in a manner similar to the `UTF7Encoding.GetChars` method. However, a `Decoder` maintains state information between calls so it can correctly decode byte sequences that span blocks. The `Decoder` also preserves trailing bytes at the end of data blocks and uses the trailing bytes in the next decoding operation. Therefore, `UTF7Encoding.GetDecoder` and `UTF7Encoding.GetEncoder` are useful for network transmission and file operations, because those operations often deal with blocks of data instead of a complete data stream.

#### Examples
The following code example demonstrates how to use the `UTF7Encoding.GetEncoder` method to obtain an encoder to convert a sequence of characters into a UTF-7 encoded sequence of bytes.

_Code sample not included: ~/snippets/csharp/System.Text/UTF7Encoding/GetEncoder/getencoder-.cs._

## UTF7Encoding.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `UTF7Encoding` object.

Returns: A 32-bit signed integer hash code.

#### Remarks
The value returned by the `UTF7Encoding.GetHashCode` method is not suitable for distinguishing one `UTF7Encoding` object from another. If your application needs a unique hash code, it should override the `UTF7Encoding.GetHashCode` method.
