---
title: "ASCIIEncoding class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/ASCIIEncoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ASCIIEncoding class (part 2 of 3)

## ASCIIEncoding.GetBytes(Char[], Int32, Int32, Byte[], Int32) method

```csharp
public override int GetBytes (char[] chars, int charIndex, int charCount, byte[] bytes, int byteIndex);
```

Encodes a set of characters from the specified character array into the specified byte array.

Parameters:

- `chars`: The character array containing the set of characters to encode.
- `charIndex`: The index of the first character to encode.
- `charCount`: The number of characters to encode.
- `bytes`: The byte array to contain the resulting sequence of bytes.
- `byteIndex`: The index at which to start writing the resulting sequence of bytes.

Returns: The actual number of bytes written into `bytes`.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.

-or-

`bytes` is `null`.
- `ArgumentOutOfRangeException`: `charIndex` or `charCount` or `byteIndex` is less than zero.

-or-

`charIndex` and `charCount` do not denote a valid range in `chars`.

-or-

`byteIndex` is not a valid index in `bytes`.
- `ArgumentException`: `bytes` does not have enough capacity from `byteIndex` to the end of the array to accommodate the resulting bytes.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `ASCIIEncoding.GetBytes` to store the resulting bytes, the application uses `ASCIIEncoding.GetByteCount`. To calculate the maximum array size, the application should use `ASCIIEncoding.GetMaxByteCount`. The `ASCIIEncoding.GetByteCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxByteCount` method generally executes faster.

Data to be converted, such as data read from a stream, can be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `ASCIIEncoding.GetDecoder` method or the `ASCIIEncoding.GetEncoder` method, respectively.

`ASCIIEncoding` does not provide error detection. Any Unicode character greater than U+007F is encoded as the ASCII question mark ("?").

> **Caution:**
>  For security reasons, your application is recommended to use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.

#### Examples
The following example demonstrates how to use the `ASCIIEncoding.GetBytes` method to encode a range of characters from a string and store the encoded characters in a range of elements in a byte array.

_Code sample not included: ~/snippets/csharp/System.Text/ASCIIEncoding/GetBytes/getbytes-string-int32-int32-byte[]-int32.cs._

## ASCIIEncoding.GetBytes(String, Int32, Int32, Byte[], Int32) method

```csharp
public override int GetBytes (string chars, int charIndex, int charCount, byte[] bytes, int byteIndex);
```

Encodes a set of characters from the specified `String` into the specified byte array.

Parameters:

- `chars`: The set of characters to encode.
- `charIndex`: The index of the first character to encode.
- `charCount`: The number of characters to encode.
- `bytes`: The byte array to contain the resulting sequence of bytes.
- `byteIndex`: The index at which to start writing the resulting sequence of bytes.

Returns: The actual number of bytes written into `bytes`.

Exceptions:

- `ArgumentNullException`: `chars` or `bytes` is `null`.
- `ArgumentOutOfRangeException`: `charIndex` or `charCount` or `byteIndex` is less than zero.

-or-

`charIndex` and `charCount` do not denote a valid range in `chars`.

-or-

`byteIndex` is not a valid index in `bytes`.
- `ArgumentException`: `bytes` does not have enough capacity from `byteIndex` to the end of the array to accommodate the resulting bytes.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `ASCIIEncoding.GetBytes` to store the resulting bytes, the application uses `ASCIIEncoding.GetByteCount`. To calculate the maximum array size, the application should use `ASCIIEncoding.GetMaxByteCount`. The `ASCIIEncoding.GetByteCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxByteCount` method generally executes faster.

Data to be converted, such as data read from a stream, can be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `ASCIIEncoding.GetDecoder` method or the `ASCIIEncoding.GetEncoder` method, respectively.

`ASCIIEncoding` does not provide error detection. Any Unicode character greater than U+007F is encoded as the ASCII question mark ("?").

> **Caution:**
> For security reasons, it's recommended to use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.

#### Examples
The following example demonstrates how to use the `ASCIIEncoding.GetBytes` method to encode a range of elements from a Unicode character array and store the encoded bytes in a range of elements in a byte array.

_Code sample not included: ~/snippets/csharp/System.Text/ASCIIEncoding/GetBytes/getbytes-char[]-int32-int32-byte[]-int32.cs._

## ASCIIEncoding.GetCharCount(Byte>) method

```csharp
public override int GetCharCount (ReadOnlySpan<byte> bytes);
```

Calculates the number of characters produced by decoding the specified byte span.

Parameters:

- `bytes`: The span containing the set of bytes to decode.

Returns: The number of characters produced by decoding the specified byte span.

#### Remarks
To calculate the exact size required by `ASCIIEncoding.GetChars` to store the resulting characters, use `ASCIIEncoding.GetCharCount`. To calculate the maximum size, use `ASCIIEncoding.GetMaxCharCount`. The `ASCIIEncoding.GetCharCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxCharCount` method generally executes faster.

## ASCIIEncoding.GetCharCount(Byte*, Int32) method

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
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `ASCIIEncoding.GetChars` to store the resulting characters, the application uses `ASCIIEncoding.GetCharCount`. To calculate the maximum array size, the application should use `ASCIIEncoding.GetMaxCharCount`. The `ASCIIEncoding.GetCharCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxCharCount` method generally executes faster.

## ASCIIEncoding.GetCharCount(Byte[], Int32, Int32) method

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
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `ASCIIEncoding.GetChars` to store the resulting characters, the application uses `ASCIIEncoding.GetCharCount`. To calculate the maximum array size, the application should use `ASCIIEncoding.GetMaxCharCount`. The `ASCIIEncoding.GetCharCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxCharCount` method generally executes faster.

#### Examples
The following example demonstrates how to use the `ASCIIEncoding.GetCharCount` method to return the number of characters produced by decoding a range of elements in a byte array.

_Code sample not included: ~/snippets/csharp/System.Text/ASCIIEncoding/GetCharCount/getcharcount-byte[]-int32-int32.cs._

## ASCIIEncoding.GetChars(Byte>, Char>) method

```csharp
public override int GetChars (ReadOnlySpan<byte> bytes, Span<char> chars);
```

Decodes the specified byte span into the specified character span.

Parameters:

- `bytes`: The span containing the bytes to decode.
- `chars`: The span to contain the resulting set of characters.

Returns: The actual number of characters written into `chars`.

#### Remarks
To calculate the exact size required by `ASCIIEncoding.GetChars` to store the resulting characters, use `ASCIIEncoding.GetCharCount`. To calculate the maximum size, use `ASCIIEncoding.GetMaxCharCount`. The `ASCIIEncoding.GetCharCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxCharCount` method generally executes faster.

Data to be converted, such as data read from a stream, can be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, you should use the `Decoder` or the `Encoder` provided by the `ASCIIEncoding.GetDecoder` method or the `ASCIIEncoding.GetEncoder` method, respectively.

`ASCIIEncoding` does not provide error detection. Any byte greater than hexadecimal `0x7F` is decoded as the Unicode question mark ("?").

> **Caution:**
>  For security reasons, you should use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.

## ASCIIEncoding.GetChars(Byte*, Int32, Char*, Int32) method

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
- `ArgumentException`: `charCount` is less than the resulting number of characters.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `ASCIIEncoding.GetChars` to store the resulting characters, the application uses `ASCIIEncoding.GetCharCount`. To calculate the maximum array size, the application should use `ASCIIEncoding.GetMaxCharCount`. The `ASCIIEncoding.GetCharCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxCharCount` method generally executes faster.

Data to be converted, such as data read from a stream, can be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `ASCIIEncoding.GetDecoder` method or the `ASCIIEncoding.GetEncoder` method, respectively.

`ASCIIEncoding` does not provide error detection. Any byte greater than hexadecimal 0x7F is decoded as the Unicode question mark ("?").

> **Caution:**
>  For security reasons, your application is recommended to use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.
