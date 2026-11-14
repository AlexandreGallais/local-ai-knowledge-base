---
title: "ASCIIEncoding class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/ASCIIEncoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ASCIIEncoding class

Namespace: `System.Text`

```csharp
public class ASCIIEncoding : System.Text.Encoding
```

Represents an ASCII character encoding of Unicode characters.

#### Remarks
Encoding is the process of transforming a set of Unicode characters into a sequence of bytes. Decoding is the process of transforming a sequence of encoded bytes into a set of Unicode characters.

`ASCIIEncoding` corresponds to the Windows code page 20127. Because ASCII is a 7-bit encoding, ASCII characters are limited to the lowest 128 Unicode characters, from U+0000 to U+007F. If you use the default encoder returned by the `ASCII` property or the `ASCIIEncoding.%23ctor` constructor, characters outside that range are replaced with a question mark (?) before the encoding operation is performed.  Because the `ASCIIEncoding` class supports only a limited character set, the `UTF8Encoding`, `UnicodeEncoding`, and `UTF32Encoding` classes are better suited for globalized applications. The following considerations can help you to decide whether to use `ASCIIEncoding`:

- Some protocols require ASCII or a subset of ASCII. In these cases ASCII encoding is appropriate.

- If an 8-bit encoding is expected, then ASCII probably isn't the correct choice. Instead, consider using UTF8 instead of ASCII. For the characters U+0000 through U+007F, the results are identical, but all Unicode characters are representable in UTF-8, which avoids data loss.

> **Caution:**
>  `ASCIIEncoding` does not provide error detection. For security reasons, you should use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.

The `ASCIIEncoding.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `ASCIIEncoding.GetBytes` method performs the actual encoding.

Likewise, the `ASCIIEncoding.GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the `ASCIIEncoding.GetChars` and `ASCIIEncoding.GetString` methods perform the actual decoding.

Note that the default `ASCIIEncoding` constructor by itself might not have the appropriate behavior for your application. You might want to consider setting the `Encoding.EncoderFallback` or `DecoderFallback` property to `EncoderExceptionFallback` or `DecoderExceptionFallback` to prevent sequences with the 8th bit set. Custom behavior might also be appropriate for these cases.

#### Examples
The following example demonstrates how to encode Unicode characters into ASCII. Notice the loss of data that occurs when your application uses `ASCIIEncoding` to encode Unicode characters outside of the ASCII range.

_Code sample not included: ~/snippets/csharp/System.Text/ASCIIEncoding/Overview/snippet.cs._

## ASCIIEncoding.ASCIIEncoding() constructor

```csharp
public ASCIIEncoding ();
```

Initializes a new instance of the `ASCIIEncoding` class.

#### Remarks

> **Caution:**
>  The `ASCIIEncoding` class does not provide error detection. For security reasons, you should use the `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` class and enable error detection.

If you choose to use ASCII encoding, this constructor may not provide the appropriate fallback behavior for your application. It uses the `EncoderReplacementFallback` and `DecoderReplacementFallback` classes to replace every character outside the range of U+0000 through U+007F with a question mark (?). Instead, you can call the `GetEncoding` or `GetEncoding` method and pass it `EncoderExceptionFallback` and `DecoderExceptionFallback` objects to use exception fallback.

> **Note:**
>  `ASCIIEncoding` supports only the Unicode character values between U+0000 and U+007F. Therefore, `UTF8Encoding`, `UnicodeEncoding`, and `UTF32Encoding` are better suited for globalized applications.

#### Examples
The following example demonstrates how to create a new `ASCIIEncoding` instance and display the name of the encoding.

_Code sample not included: ~/snippets/csharp/System.Text/ASCIIEncoding/.ctor/ctor.cs._

## ASCIIEncoding.IsSingleByte property

```csharp
public override bool IsSingleByte { get; }
```

Gets a value indicating whether the current encoding uses single-byte code points.

Returns: This property is always `true`.

#### Remarks
Instead of using the `IsSingleByte` property to determine the size of a byte array for encoding operations  and the size of a character array for decoding operations (for example, so that the size of the byte array is `ASCIIEncoding.IsSingleByte` * the number of characters to be encoded), you should call the `ASCIIEncoding.GetByteCount` or `ASCIIEncoding.GetMaxByteCount` method for encoding operations and the `ASCIIEncoding.GetCharCount` or `ASCIIEncoding.GetMaxCharCount` method for decoding operations. These methods takes the `ASCIIEncoding` object's replacement fallback strategy into account when calculating the required array size.

## ASCIIEncoding.GetByteCount(Char>) method

```csharp
public override int GetByteCount (ReadOnlySpan<char> chars);
```

Calculates the number of bytes produced by encoding the specified character span.

Parameters:

- `chars`: The span that contains the set of characters to encode.

Returns: The number of bytes produced by encoding the specified character span.

#### Remarks
To calculate the exact size required by `ASCIIEncoding.GetBytes` to store the resulting bytes, use `ASCIIEncoding.GetByteCount`. To calculate the maximum size, use `ASCIIEncoding.GetMaxByteCount`. The `ASCIIEncoding.GetByteCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxByteCount` method generally executes faster.

## ASCIIEncoding.GetByteCount(String) method

```csharp
public override int GetByteCount (string chars);
```

Calculates the number of bytes produced by encoding the characters in the specified `String`.

Parameters:

- `chars`: The `String` containing the set of characters to encode.

Returns: The number of bytes produced by encoding the specified characters.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.
- `ArgumentOutOfRangeException`: The resulting number of bytes is greater than the maximum number that can be returned as an integer.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `ASCIIEncoding.GetBytes` to store the resulting bytes, the application uses `ASCIIEncoding.GetByteCount`. To calculate the maximum array size, the application should use `ASCIIEncoding.GetMaxByteCount`. The `ASCIIEncoding.GetByteCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxByteCount` method generally executes faster.

#### Examples
The following example demonstrates how to use the `ASCIIEncoding.GetByteCount` method to return the number of bytes required to encode a string using `ASCIIEncoding`.

_Code sample not included: ~/snippets/csharp/System.Text/ASCIIEncoding/GetByteCount/getbytecount-string.cs._

## ASCIIEncoding.GetByteCount(Char*, Int32) method

```csharp
public override int GetByteCount (char* chars, int count);
```

Calculates the number of bytes produced by encoding a set of characters starting at the specified character pointer.

Parameters:

- `chars`: A pointer to the first character to encode.
- `count`: The number of characters to encode.

Returns: The number of bytes produced by encoding the specified characters.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.
- `ArgumentOutOfRangeException`: `count` is less than zero.

-or-

The resulting number of bytes is greater than the maximum number that can be returned as an integer.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `ASCIIEncoding.GetBytes` to store the resulting bytes, the application uses `ASCIIEncoding.GetByteCount`. To calculate the maximum array size, the application should use `ASCIIEncoding.GetMaxByteCount`. The `ASCIIEncoding.GetByteCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxByteCount` method generally executes faster.

## ASCIIEncoding.GetByteCount(Char[], Int32, Int32) method

```csharp
public override int GetByteCount (char[] chars, int index, int count);
```

Calculates the number of bytes produced by encoding a set of characters from the specified character array.

Parameters:

- `chars`: The character array containing the set of characters to encode.
- `index`: The index of the first character to encode.
- `count`: The number of characters to encode.

Returns: The number of bytes produced by encoding the specified characters.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` and `count` do not denote a valid range in `chars`.

-or-

The resulting number of bytes is greater than the maximum number that can be returned as an integer.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `ASCIIEncoding.GetBytes` to store the resulting bytes, the application uses `ASCIIEncoding.GetByteCount`. To calculate the maximum array size, the application should use `ASCIIEncoding.GetMaxByteCount`. The `ASCIIEncoding.GetByteCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxByteCount` method generally executes faster.

#### Examples
The following example demonstrates how to use the `ASCIIEncoding.GetByteCount` method to return the number of bytes required to encode an array of Unicode characters using `ASCIIEncoding`.

_Code sample not included: ~/snippets/csharp/System.Text/ASCIIEncoding/GetByteCount/getbytecount-char[]-int32-int32.cs._

## ASCIIEncoding.GetBytes(Char>, Byte>) method

```csharp
public override int GetBytes (ReadOnlySpan<char> chars, Span<byte> bytes);
```

Encodes the specified character span into the specified byte span.

Parameters:

- `chars`: The character span to encode.
- `bytes`: The span to contain the resulting set of bytes.

Returns: The actual number of bytes written into `bytes`.

#### Remarks
To calculate the exact size required by `ASCIIEncoding.GetBytes` to store the resulting bytes, use `ASCIIEncoding.GetByteCount`. To calculate the maximum size, use `ASCIIEncoding.GetMaxByteCount`. The `ASCIIEncoding.GetByteCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxByteCount` method generally executes faster.

Data to be converted, such as data read from a stream, can be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, use the `Decoder` or the `Encoder` provided by the `ASCIIEncoding.GetDecoder` method or the `ASCIIEncoding.GetEncoder` method, respectively.

`ASCIIEncoding` does not provide error detection. Any Unicode character greater than `U+007F` is encoded as the ASCII question mark ("?").

> **Caution:**
>  For security reasons, you should use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.

## ASCIIEncoding.GetBytes(Char*, Int32, Byte*, Int32) method

```csharp
public override int GetBytes (char* chars, int charCount, byte* bytes, int byteCount);
```

Encodes a set of characters starting at the specified character pointer into a sequence of bytes that are stored starting at the specified byte pointer.

Parameters:

- `chars`: A pointer to the first character to encode.
- `charCount`: The number of characters to encode.
- `bytes`: A pointer to the location at which to start writing the resulting sequence of bytes.
- `byteCount`: The maximum number of bytes to write.

Returns: The actual number of bytes written at the location indicated by `bytes`.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.

-or-

`bytes` is `null`.
- `ArgumentOutOfRangeException`: `charCount` or `byteCount` is less than zero.
- `ArgumentException`: `byteCount` is less than the resulting number of bytes.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `ASCIIEncoding.GetBytes` to store the resulting bytes, the application uses `ASCIIEncoding.GetByteCount`. To calculate the maximum array size, the application should use `ASCIIEncoding.GetMaxByteCount`. The `ASCIIEncoding.GetByteCount` method generally allows allocation of less memory, while the `ASCIIEncoding.GetMaxByteCount` method generally executes faster.

Data to be converted, such as data read from a stream, can be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `ASCIIEncoding.GetDecoder` method or the `ASCIIEncoding.GetEncoder` method, respectively.

`ASCIIEncoding` does not provide error detection. Any Unicode character greater than U+007F is translated to an ASCII question mark ("?").

> **Caution:**
>  For security reasons, your application is recommended to use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.
