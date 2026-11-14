---
title: "UTF32Encoding class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/UTF32Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UTF32Encoding class (part 2 of 4)

## UTF32Encoding.GetByteCount(Char*, Int32) method

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
- `ArgumentException`: Error detection is enabled, and `chars` contains an invalid sequence of characters.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF32Encoding.GetBytes` to store the resulting bytes, you call the `UTF32Encoding.GetByteCount` method. To calculate the maximum array size, you call the `UTF32Encoding.GetMaxByteCount`. The `UTF32Encoding.GetByteCount` method generally allocates less memory, while the `UTF32Encoding.GetMaxByteCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw an `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

To ensure that the encoded bytes are decoded properly when they are saved as a file or a stream, you can prefix a stream of encoded bytes with a preamble. Inserting a preamble at the beginning of a byte stream (such as at the beginning of a series of bytes to be written to a file) is the developer's responsibility, and the number of bytes in the preamble Is not reflected in the value returned by the `UTF32Encoding.GetByteCount` method.

## UTF32Encoding.GetByteCount(Char[], Int32, Int32) method

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
- `ArgumentException`: Error detection is enabled, and `chars` contains an invalid sequence of characters.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF32Encoding.GetBytes` to store the resulting bytes, you call the `UTF32Encoding.GetByteCount` method. To calculate the maximum array size, you call the `UTF32Encoding.GetMaxByteCount` method. The `UTF32Encoding.GetByteCount` method generally allocates less memory, while the `UTF32Encoding.GetMaxByteCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

To ensure that the encoded bytes are decoded properly when they are saved as a file or a stream, you can prefix a stream of encoded bytes with a preamble. Inserting a preamble at the beginning of a byte stream (such as at the beginning of a series of bytes to be written to a file) is the developer's responsibility, and the number of bytes in the preamble Is not reflected in the value returned by the `UTF32Encoding.GetByteCount` method.

#### Examples
The following example populates an array with a Latin uppercase and lowercase characters and calls the `GetByteCount` method to determine the number of bytes needed to encode the Latin lowercase characters. It then displays this information along with the total number of bytes needed if a byte order mark is added. It compares this number with the value returned by the `UnicodeEncoding.GetMaxByteCount` method, which indicates maximum number of bytes needed to encode the Latin lowercase characters. The following example populates an array with a combination of Greek and Cyrillic characters and calls the `GetByteCount` method to determine the number of bytes needed to encode the Cyrillic characters. It then displays this information along with the total number of bytes needed if a byte order mark is added. It compares this number with the value returned by the `UnicodeEncoding.GetMaxByteCount` method, which indicates maximum number of bytes needed to encode the Cyrillic characters.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/GetByteCount/getbytecount2.cs._

## UTF32Encoding.GetBytes(Char*, Int32, Byte*, Int32) method

```csharp
public override int GetBytes (char* chars, int charCount, byte* bytes, int byteCount);
```

Encodes a set of characters starting at the specified character pointer into a sequence of bytes that are stored starting at the specified byte pointer.

Parameters:

- `chars`: A pointer to the first character to encode.
- `charCount`: The number of characters to encode.
- `bytes`: A pointer to the location at which to start writing the resulting sequence of bytes.
- `byteCount`: The maximum number of bytes to write.

Returns: The actual number of bytes written at the location indicated by the `bytes` parameter.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.

-or-

`bytes` is `null`.
- `ArgumentOutOfRangeException`: `charCount` or `byteCount` is less than zero.
- `ArgumentException`: Error detection is enabled, and `chars` contains an invalid sequence of characters.

-or-

`byteCount` is less than the resulting number of bytes.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF32Encoding.GetBytes` to store the resulting bytes, you call the `UTF32Encoding.GetByteCount` method. To calculate the maximum array size, you call the `UTF32Encoding.GetMaxByteCount` method. The `UTF32Encoding.GetByteCount` method generally allocates less memory, while the `UTF32Encoding.GetMaxByteCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application uses the `Decoder` or the `Encoder` provided by the `UTF32Encoding.GetDecoder` method or the `UTF32Encoding.GetEncoder` method, respectively.

> **Important:**
>  To ensure that the encoded bytes are decoded properly when they are saved as a file or as a stream, you can prefix a stream of encoded bytes with a preamble. Inserting a preamble at the beginning of a byte stream (such as at the beginning of a series of bytes to be written to a file) is the developer's responsibility. The `UTF32Encoding.GetBytes` method does not prepend a preamble to the beginning of a sequence of encoded bytes.

## UTF32Encoding.GetBytes(Char[], Int32, Int32, Byte[], Int32) method

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
- `ArgumentException`: Error detection is enabled, and `chars` contains an invalid sequence of characters.

-or-

`bytes` does not have enough capacity from `byteIndex` to the end of the array to accommodate the resulting bytes.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF32Encoding.GetBytes` to store the resulting bytes, you call the `UTF32Encoding.GetByteCount` method. To calculate the maximum array size, you call the `UTF32Encoding.GetMaxByteCount` method. The `UTF32Encoding.GetByteCount` method generally allocates less memory, while the `UTF32Encoding.GetMaxByteCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application uses the `Decoder` or the `Encoder` provided by the `UTF32Encoding.GetDecoder` method or the `UTF32Encoding.GetEncoder` method, respectively.

> **Important:**
>  To ensure that the encoded bytes are decoded properly when they are saved as a file or as a stream, you can prefix a stream of encoded bytes with a preamble. Inserting a preamble at the beginning of a byte stream (such as at the beginning of a series of bytes to be written to a file) is the developer's responsibility. The `UTF32Encoding.GetBytes` method does not prepend a preamble to the beginning of a sequence of encoded bytes.

#### Examples
The following example determines the number of bytes required to encode three characters from a character array, then encodes the characters and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/GetBytes/getbytes_chararr.cs._

## UTF32Encoding.GetBytes(String, Int32, Int32, Byte[], Int32) method

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

- `ArgumentNullException`: `s` is `null`.

-or-

`bytes` is `null`.
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
To calculate the exact array size required by `UTF32Encoding.GetBytes` to store the resulting bytes, you call the `UTF32Encoding.GetByteCount` method. To calculate the maximum array size, you call the `UTF32Encoding.GetMaxByteCount` method. The `UTF32Encoding.GetByteCount` method generally allocates less memory, while the `UTF32Encoding.GetMaxByteCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application uses the `Decoder` or the `Encoder` provided by the `UTF32Encoding.GetDecoder` method or the `UTF32Encoding.GetEncoder` method, respectively.

> **Important:**
>  To ensure that the encoded bytes are decoded properly when they are saved as a file or as a stream, you can prefix a stream of encoded bytes with a preamble. Inserting a preamble at the beginning of a byte stream (such as at the beginning of a series of bytes to be written to a file) is the developer's responsibility. The `UTF32Encoding.GetBytes` method does not prepend a preamble to the beginning of a sequence of encoded bytes.

#### Examples
The following example determines the number of bytes required to encode a string, then encodes the string and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/GetBytes/getbytes_string.cs._
