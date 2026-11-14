---
title: "UTF7Encoding class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/UTF7Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UTF7Encoding class

Namespace: `System.Text`

```csharp
public class UTF7Encoding : System.Text.Encoding
```

Represents a UTF-7 encoding of Unicode characters.

#### Remarks
Encoding is the process of transforming a set of Unicode characters into a sequence of bytes. Decoding is the process of transforming a sequence of encoded bytes into a set of Unicode characters.

The UTF-7 encoding represents Unicode characters as sequences of 7-bit ASCII characters. This encoding supports certain protocols for which it is required, most often email or newsgroup protocols. Since UTF-7 is not particularly secure or robust, and most modern systems allow 8-bit encodings, UTF-8 should normally be preferred to UTF-7.

> **Note:**
>  `UTF7Encoding` does not provide error detection. For security reasons, the application should use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.

For more information about the UTFs and other encodings supported by `Text`, see Character Encoding in .NET.

The `UTF7Encoding.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `UTF7Encoding.GetBytes` method performs the actual encoding.

Likewise, the `UTF7Encoding.GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the `UTF7Encoding.GetChars` and `UTF7Encoding.GetString` methods perform the actual decoding.

`UTF7Encoding` corresponds to the Windows code page 65000.

> **Note:**
>  The state of a UTF-7 encoded object is not preserved if the object is serialized and deserialized using different .NET versions.

#### Examples
The following code example demonstrates how to use a `UTF7Encoding` to encode a string of Unicode characters and store them in a byte array. Notice that when the byte array is decoded back to a string, no data is lost.

_Code sample not included: ~/snippets/csharp/System.Text/UTF7Encoding/Overview/snippet.cs._

## UTF7Encoding.UTF7Encoding() constructor

```csharp
public UTF7Encoding ();
```

Initializes a new instance of the `UTF7Encoding` class.

To be added.

## UTF7Encoding.UTF7Encoding(Boolean) constructor

```csharp
public UTF7Encoding (bool allowOptionals);
```

Initializes a new instance of the `UTF7Encoding` class. A parameter specifies whether to allow optional characters.

Parameters:

- `allowOptionals`: `true` to specify that optional characters are allowed; otherwise, `false`.

To be added.

## UTF7Encoding.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Gets a value indicating whether the specified object is equal to the current `UTF7Encoding` object.

Parameters:

- `value`: An object to compare to the current `UTF7Encoding` object.

Returns: `true` if `value` is a `UTF7Encoding` object and is equal to the current `UTF7Encoding` object; otherwise, `false`.

#### Remarks
Two `UTF7Encoding` objects are equal if they both either allow or disallow optional characters, and if their underlying `Encoding.EncoderFallback` and `Encoding.DecoderFallback` properties are equal.

## UTF7Encoding.GetByteCount(String) method

```csharp
public override int GetByteCount (string s);
```

Calculates the number of bytes produced by encoding the characters in the specified `String` object.

Parameters:

- `s`: The `String` object containing the set of characters to encode.

Returns: The number of bytes produced by encoding the specified characters.

Exceptions:

- `ArgumentNullException`: `s` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: The resulting number of bytes is greater than the maximum number that can be returned as an int.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET).

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size that `UTF7Encoding.GetBytes` requires to store the resulting bytes, the application uses `UTF7Encoding.GetByteCount`. To calculate the maximum array size, the application should use `UTF7Encoding.GetMaxByteCount`. The `UTF7Encoding.GetByteCount` method generally allows allocation of less memory, while the `UTF7Encoding.GetMaxByteCount` method generally executes faster.

#### Examples
The following code example demonstrates how to use the `UTF7Encoding.GetByteCount` method to return the number of bytes required to encode a character array.

_Code sample not included: ~/snippets/csharp/System.Text/UTF7Encoding/GetByteCount/getbytecount-char[]-int32-int32.cs._

## UTF7Encoding.GetByteCount(Char*, Int32) method

```csharp
public override int GetByteCount (char* chars, int count);
```

Calculates the number of bytes produced by encoding a set of characters starting at the specified character pointer.

Parameters:

- `chars`: A pointer to the first character to encode.
- `count`: The number of characters to encode.

Returns: The number of bytes produced by encoding the specified characters.

Exceptions:

- `ArgumentNullException`: `chars` is `null` (`Nothing` in Visual Basic .NET).
- `ArgumentOutOfRangeException`: `count` is less than zero.

-or-

The resulting number of bytes is greater than the maximum number that can be returned as an int.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size that `UTF7Encoding.GetBytes` requires to store the resulting bytes, the application uses `UTF7Encoding.GetByteCount`. To calculate the maximum array size, the application should use `UTF7Encoding.GetMaxByteCount`. The `UTF7Encoding.GetByteCount` method generally allows allocation of less memory, while the `UTF7Encoding.GetMaxByteCount` method generally executes faster.

## UTF7Encoding.GetByteCount(Char[], Int32, Int32) method

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

- `ArgumentNullException`: `chars` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` and `count` do not denote a valid range in `chars`.

-or-

The resulting number of bytes is greater than the maximum number that can be returned as an int.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF7Encoding.GetBytes` to store the resulting bytes, the application uses `UTF7Encoding.GetByteCount`. To calculate the maximum array size, the application should use `UTF7Encoding.GetMaxByteCount`. The `UTF7Encoding.GetByteCount` method generally allows allocation of less memory, while the `UTF7Encoding.GetMaxByteCount` method generally executes faster.

#### Examples
The following code example demonstrates how to use the `UTF7Encoding.GetByteCount` method to return the number of bytes required to encode an array of Unicode characters.

_Code sample not included: ~/snippets/csharp/System.Text/UTF7Encoding/GetByteCount/getbytecount-char[]-int32-int32.cs._

## UTF7Encoding.GetBytes(Char*, Int32, Byte*, Int32) method

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

- `ArgumentNullException`: `chars` is `null` (`Nothing`).

-or-

`bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `charCount` or `byteCount` is less than zero.
- `ArgumentException`: `byteCount` is less than the resulting number of bytes.
- `EncoderFallbackException`: A fallback occurred (see Character Encoding in .NET for fuller explanation).

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF7Encoding.GetBytes` to store the resulting bytes, the application uses `UTF7Encoding.GetByteCount`. To calculate the maximum array size, the application should use `UTF7Encoding.GetMaxByteCount`. The `UTF7Encoding.GetByteCount` method generally allows allocation of less memory, while the `UTF7Encoding.GetMaxByteCount` method generally executes faster.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `UTF7Encoding.GetDecoder` method or the `UTF7Encoding.GetEncoder` method, respectively.

> **Note:**
>  `UTF7Encoding` does not provide error detection. Invalid characters are encoded as a modified base 64 character. For security reasons, your applications are recommended to use `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding` and enable error detection.

## UTF7Encoding.GetBytes(Char[], Int32, Int32, Byte[], Int32) method

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

- `ArgumentNullException`: `chars` is `null` (`Nothing`).

-or-

`bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `charIndex` or `charCount` or `byteIndex` is less than zero.

-or-

`charIndex` and `charCount` do not denote a valid range in `chars`.

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
The following code example demonstrates how to use the `UTF7Encoding.GetBytes` method to encode a range of characters from a `String` and store the encoded bytes in a range of elements in a byte array.

_Code sample not included: ~/snippets/csharp/System.Text/UTF7Encoding/GetBytes/getbytes-char[]-int32-int32-byte[]-int32.cs._
