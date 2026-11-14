---
title: "UTF32Encoding class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/UTF32Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UTF32Encoding class

Namespace: `System.Text`

```csharp
public sealed class UTF32Encoding : System.Text.Encoding
```

Represents a UTF-32 encoding of Unicode characters.

#### Remarks
Encoding is the process of transforming a set of Unicode characters into a sequence of bytes. Decoding is the process of transforming a sequence of encoded bytes into a set of Unicode characters.

The Unicode Standard assigns a code point (a number) to each character in every supported script. A Unicode Transformation Format (UTF) is a way to encode that code point. The Unicode Standard uses the following UTFs:

- UTF-8, which represents each code point as a sequence of one to four bytes.

- UTF-16, which represents each code point as a sequence of one to two 16-bit integers.

- UTF-32, which represents each code point as a 32-bit integer.

For more information about the UTFs and other encodings supported by `Text`, see Character Encoding in .NET.

The `UTF32Encoding` class represents a UTF-32 encoding. The encoder can use the big endian byte order (most significant byte first) or the little endian byte order (least significant byte first). For example, the Latin Capital Letter A (code point U+0041) is serialized as follows (in hexadecimal):

- Big endian byte order: 00 00 00 41

- Little endian byte order: 41 00 00 00

It is generally more efficient to store Unicode characters using the native byte order. For example, it is better to use the little endian byte order on little endian platforms, such as Intel computers. `UTF32Encoding` corresponds to the Windows code pages 12000 (little endian byte order) and 12001 (big endian byte order). You can determine the "endianness" of a particular architecture by calling the `IsLittleEndian` method.

Optionally, the `UTF32Encoding` object provides a byte order mark (BOM), which is an array of bytes that can be prefixed to the sequence of bytes resulting from the encoding process. If the preamble contains a byte order mark (BOM), it helps the decoder determine the byte order and the transformation format or UTF of a byte array.

If the `UTF32Encoding` instance is configured to provide a BOM, you can retrieve it by calling the `UTF32Encoding.GetPreamble` method; otherwise, the method returns an empty array. Note that, even if a `UTF32Encoding` object is configured for BOM support, you must include the BOM at the beginning of the encoded byte stream as appropriate; the encoding methods of the `UTF32Encoding` class do not do this automatically.

> **Caution:**
> To enable error detection and to make the class instance more secure, you should instantiate a `UTF32Encoding` object by calling the `%23ctor` constructor and setting its `throwOnInvalidBytes` argument to `true`. With error detection, a method that detects an invalid sequence of characters or bytes throws an `ArgumentException` exception. Without error detection, no exception is thrown, and the invalid sequence is generally ignored.

You can instantiate a `UTF32Encoding` object in a number of ways, depending on whether you want to it to provide a byte order mark (BOM), whether you want big-endian or little-endian encoding, and whether you want to enable error detection. The following table lists the `UTF32Encoding` constructors and the `Encoding` properties that return a `UnicodeEncoding` object.

|Member|Endianness|BOM|Error detection|
|------------|----------------|---------|---------------------|
|`Encoding.UTF32`|Little-endian|Yes|No (Replacement fallback)|
|`%23ctor`|Little-endian|Yes|No (Replacement fallback)|
|`%23ctor`|Configurable|Configurable|No (Replacement fallback)|
|`%23ctor`|Configurable|Configurable|Configurable|

The `UTF32Encoding.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `UTF32Encoding.GetBytes` method performs the actual encoding.

Likewise, the `UTF32Encoding.GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the `UTF32Encoding.GetChars` and `UTF32Encoding.GetString` methods perform the actual decoding.

For an encoder or decoder that is able to save state information when encoding or decoding data that spans multiple blocks (such as string of 1 million characters that is encoded in 100,000-character segments), use the `UTF32Encoding.GetEncoder` and `UTF32Encoding.GetDecoder` properties, respectively.

#### Examples
The following example demonstrates the behavior of `UTF32Encoding` objects with and without error detection enabled. It creates a byte array whose last four bytes represent an invalid surrogate pair; the high surrogate U+D8FF is followed by an U+01FF, which is outside the range of low surrogates (0xDC00 through 0xDFFF). Without error detection, the UTF32 decoder uses replacement fallback to replace the invalid surrogate pair with REPLACEMENT CHARACTER (U+FFFD).

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/Overview/errordetection.cs._

The following example encodes a string of Unicode characters into a byte array by using a `UTF32Encoding` object. The byte array is then decoded into a string to demonstrate that there is no loss of data.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/Overview/snippet.cs._

The following example uses the same string as the previous one, except that it writes the encoded bytes to a file and prefixes the byte stream with a byte order mark (BOM). It then reads the file in two different ways: as a text file by using a `StreamReader` object; and as a binary file. As you would expect, neither newly-read string includes the BOM.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/Overview/bom1.cs._

## UTF32Encoding.UTF32Encoding() constructor

```csharp
public UTF32Encoding ();
```

Initializes a new instance of the `UTF32Encoding` class.

#### Remarks
This constructor creates an instance that uses the little endian byte order, provides a Unicode byte order mark, and does not throw an exception when an invalid encoding is detected.

> **Caution:**
>  For security reasons, you should enable error detection by calling the `%23ctor` constructor and setting its `throwOnInvalidCharacters` argument to `true`.

#### Examples
The following example retrieves and displays the byte order mark for different `UTF32Encoding` instances.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/.ctor/getpreamble.cs._

## UTF32Encoding.UTF32Encoding(Boolean, Boolean) constructor

```csharp
public UTF32Encoding (bool bigEndian, bool byteOrderMark);
```

Initializes a new instance of the `UTF32Encoding` class. Parameters specify whether to use the big endian byte order and whether the `UTF32Encoding.GetPreamble` method returns a Unicode byte order mark.

Parameters:

- `bigEndian`: `true` to use the big endian byte order (most significant byte first), or `false` to use the little endian byte order (least significant byte first).
- `byteOrderMark`: `true` to specify that a Unicode byte order mark is provided; otherwise, `false`.

#### Remarks
This constructor creates an instance that does not throw an exception when an invalid encoding is detected.

> **Caution:**
>  For security reasons, you should enable error detection by calling the `%23ctor` constructor and setting its `throwOnInvalidCharacters` argument to `true`.

#### Examples
The following example retrieves and displays the byte order mark for different `UTF32Encoding` instances.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/.ctor/getpreamble.cs._

## UTF32Encoding.UTF32Encoding(Boolean, Boolean, Boolean) constructor

```csharp
public UTF32Encoding (bool bigEndian, bool byteOrderMark, bool throwOnInvalidCharacters);
```

Initializes a new instance of the `UTF32Encoding` class. Parameters specify whether to use the big endian byte order, whether to provide a Unicode byte order mark, and whether to throw an exception when an invalid encoding is detected.

Parameters:

- `bigEndian`: `true` to use the big endian byte order (most significant byte first), or `false` to use the little endian byte order (least significant byte first).
- `byteOrderMark`: `true` to specify that a Unicode byte order mark is provided; otherwise, `false`.
- `throwOnInvalidCharacters`: `true` to specify that an exception should be thrown when an invalid encoding is detected; otherwise, `false`.

#### Remarks
If `throwOnInvalidCharacters` is `true`, a method that detects an invalid byte sequence throws `ArgumentException`. Otherwise, the method does not throw an exception, and the invalid sequence is ignored.

> **Caution:**
>  For security reasons, you should enable error detection by calling the `%23ctor` constructor and setting its `throwOnInvalidCharacters` argument to `true`.

#### Examples
The following example demonstrates the behavior of `UTF32Encoding`, both with error detection enabled and without.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/Overview/errordetection.cs._

## UTF32Encoding.Preamble property

```csharp
public override ReadOnlySpan<byte> Preamble { get; }
```

Gets a Unicode byte order mark encoded in UTF-32 format, if this object is configured to supply one.

Returns: A byte span containing the Unicode byte order mark, if this object is configured to supply one; otherwise, a default span.

#### Remarks
The `UTF32Encoding` object can provide a preamble, which is an span of bytes that can be prefixed to the sequence of bytes resulting from the encoding process. Prefacing a sequence of encoded bytes with a byte order mark (code points `U+0000` `U+FEFF`) helps the decoder determine the byte order and the transformation format, or UTF. The Unicode byte order mark (BOM) is serialized as follows (in hexadecimal):

- Big endian byte order: `00 00 FE FF`

- Little endian byte order: `FF FE 00 00`

You can instantiate a `UTF32Encoding` object whose `Preamble` property is a valid BOM in the following ways:

- By retrieving the `UTF32Encoding` object returned by the `UTF32` property.

- By calling the parameterless `%23ctor` constructor to instantiate a `UTF32Encoding` object.

- By supplying `true` as the value of the `byteOrderMark` argument to the `UTF32Encoding.%23ctor` and `UTF32Encoding.%23ctor` constructors.

We recommend that you use the BOM, since it provides nearly certain identification of an encoding for files that otherwise have lost a reference to the `UTF32Encoding` object, such as untagged or improperly tagged web data, or random text files stored when a business did not have international concerns or other data. Often, user problems might be avoided if data is consistently and properly tagged.

For standards that provide an encoding type, a BOM is somewhat redundant. However, it can be used to help a server send the correct encoding header. Alternatively, it can be used as a fallback in case the encoding is otherwise lost.

There are some disadvantages to using a BOM. For example, knowing how to limit the database fields that use a BOM can be difficult. Concatenation of files can be a problem also, for example, when files are merged in such a way that an unnecessary character can end up in the middle of data. In spite of the few disadvantages, however, the use of a BOM is highly recommended.

For more information on byte order and the byte order mark, see The Unicode Standard at the Unicode home page.

> **Important:**
>  To ensure that the encoded bytes are decoded properly, you should prefix encoded bytes with a preamble. Note that the `UTF32Encoding.GetBytes` method does not prepend a BOM to a sequence of encoded bytes; supplying a BOM at the beginning of an appropriate byte stream is the developer's responsibility.

## UTF32Encoding.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Determines whether the specified `Object` is equal to the current `UTF32Encoding` object.

Parameters:

- `value`: The `Object` to compare with the current object.

Returns: `true` if `value` is an instance of `UTF32Encoding` and is equal to the current object; otherwise, `false`.

#### Remarks
Two `UTF32Encoding` objects are considered equal if all of the following conditions are true:

- Both objects use the same byte order.

- Both objects provide the byte order mark, or both do not.

- Both objects use the same encoder fallback.

- Both objects use the same decoder fallback.

#### Examples
The following example creates `UTF32Encoding` objects using different parameter values and then checks them for equality.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/Equals/equals.cs._

## UTF32Encoding.GetByteCount(String) method

```csharp
public override int GetByteCount (string s);
```

Calculates the number of bytes produced by encoding the characters in the specified `String`.

Parameters:

- `s`: The `String` containing the set of characters to encode.

Returns: The number of bytes produced by encoding the specified characters.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: The resulting number of bytes is greater than the maximum number that can be returned as an integer.
- `ArgumentException`: Error detection is enabled, and `s` contains an invalid sequence of characters.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF32Encoding.GetBytes` to store the resulting bytes, you call the `UTF32Encoding.GetByteCount` method. To calculate the maximum array size, you call the `UTF32Encoding.GetMaxByteCount` method. The `UTF32Encoding.GetByteCount` method generally allocates less memory, while the `UTF32Encoding.GetMaxByteCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

To ensure that the encoded bytes are decoded properly when they are saved as a file or as a stream, you can prefix a stream of encoded bytes with a preamble. Inserting the preamble at the beginning of a byte stream (such as at the beginning of a series of bytes to be written to a file) is the developer's responsibility, and the number of bytes in the preamble is not reflected in the value returned by the `UTF32Encoding.GetByteCount` method.

#### Examples
The following example calls the `UnicodeEncoding.GetMaxByteCount` and `GetByteCount` methods to calculate the maximum and actual number of bytes required to encode a string. It also displays the actual number of bytes required to store a byte stream with a byte order mark.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/GetByteCount/getbytecount1.cs._
