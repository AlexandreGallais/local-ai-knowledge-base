---
title: "UTF8Encoding class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/UTF8Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UTF8Encoding class

Namespace: `System.Text`

```csharp
public class UTF8Encoding : System.Text.Encoding
```

Represents a UTF-8 encoding of Unicode characters.

#### Remarks
Encoding is the process of transforming a set of Unicode characters into a sequence of bytes. Decoding is the process of transforming a sequence of encoded bytes into a set of Unicode characters.

UTF-8 is a Unicode encoding that represents each code point as a sequence of one to four bytes. Unlike the UTF-16 and UTF-32 encodings, the UTF-8 encoding does not require "endianness"; the encoding scheme is the same regardless of whether the processor is big-endian or little-endian. `UTF8Encoding` corresponds to the Windows code page 65001. For more information about the UTFs and other encodings supported by `Text`, see Character Encoding in .NET.

You can instantiate a `UTF8Encoding` object in a number of ways, depending on whether you want to it to provide a byte order mark (BOM) and whether you want to enable error detection. The following table lists the constructors and the `Encoding` property that return a `UTF8Encoding` object.

| Member                                                               | BOM | Error detection           |
|----------------------------------------------------------------------|-----|---------------------------|
| `Encoding.UTF8`       | Yes | No (Replacement fallback) |
| `%23ctor` | No  | No (Replacement fallback) |
|`%23ctor`|Configurable|No (Replacement fallback)|
|`%23ctor`|Configurable|Configurable|

The `UTF8Encoding.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `UTF8Encoding.GetBytes` method performs the actual encoding.

Likewise, the `UTF8Encoding.GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the `UTF8Encoding.GetChars` and `UTF8Encoding.GetString` methods perform the actual decoding.

For an encoder or decoder that is able to save state information when encoding or decoding data that spans multiple blocks (such as string of 1 million characters that is encoded in 100,000-character segments), use the `UTF8Encoding.GetEncoder` and `UTF8Encoding.GetDecoder` properties, respectively.

Optionally, the `UTF8Encoding` object provides a byte order mark (BOM), which is an array of bytes that can be prefixed to the beginning of the byte stream that results from the encoding process. If a UTF-8 encoded byte stream is prefaced with a byte order mark (BOM), it helps the decoder determine the byte order and the transformation format or UTF. Note, however, that the Unicode Standard neither requires nor recommends a BOM in UTF-8 encoded streams. For more information on byte order and the byte order mark, see The Unicode Standard at the Unicode home page.

If the encoder is configured to provide a BOM, you can retrieve it by calling the `UTF8Encoding.GetPreamble` method; otherwise, the method returns an empty array. Note that, even if a `UTF8Encoding` object is configured for BOM support, you must include the BOM at the beginning of the encoded byte stream as appropriate; the encoding methods of the `UTF8Encoding` class do not do this automatically.

> **Caution:**
>  To enable error detection and to make the class instance more secure, you should call the `%23ctor` constructor and set the `throwOnInvalidBytes` parameter to `true`. With error detection enabled, a method that detects an invalid sequence of characters or bytes throws an `ArgumentException` exception. Without error detection, no exception is thrown, and the invalid sequence is generally ignored.

> **Note:**
>  The state of a UTF-8 encoded object is not preserved if the object is serialized and deserialized using different .NET versions.

#### Examples
The following example uses a `UTF8Encoding` object to encode a string of Unicode characters and store them in a byte array. The Unicode string includes two characters, Pi (U+03A0) and Sigma (U+03A3), that are outside the ASCII character range. When the encoded byte array is decoded back to a string, the Pi and Sigma characters are still present.

_Code sample not included: ~/snippets/csharp/System.Text/UTF8Encoding/Overview/snippet.cs._

The following example uses the same string as the previous example, except that it writes the encoded bytes to a file and prefixes the byte stream with a byte order mark (BOM). It then reads the file in two different ways: as a text file by using a `StreamReader` object; and as a binary file. As you would expect, neither newly-read string includes the BOM.

_Code sample not included: ~/snippets/csharp/System.Text/UTF8Encoding/Overview/bom1.cs._

## UTF8Encoding.UTF8Encoding() constructor

```csharp
public UTF8Encoding ();
```

Initializes a new instance of the `UTF8Encoding` class.

#### Remarks
This constructor creates an instance that does not provide a Unicode byte order mark and does not throw an exception when an invalid encoding is detected.

> **Caution:**
>  For security reasons, we recommend that you enable error detection by calling a constructor with a `throwOnInvalidBytes` parameter and setting its value to `true`.

#### Examples
The following example creates a new `UTF8Encoding` instance and displays its name.

_Code sample not included: ~/snippets/csharp/System.Text/UTF8Encoding/.ctor/ctor.cs._

## UTF8Encoding.UTF8Encoding(Boolean) constructor

```csharp
public UTF8Encoding (bool encoderShouldEmitUTF8Identifier);
```

Initializes a new instance of the `UTF8Encoding` class. A parameter specifies whether to provide a Unicode byte order mark.

Parameters:

- `encoderShouldEmitUTF8Identifier`: `true` to specify that the `UTF8Encoding.GetPreamble` method returns a Unicode byte order mark; otherwise, `false`.

#### Remarks
This constructor creates an instance that does not throw an exception when an invalid encoding is detected.

> **Caution:**
>  For security reasons, you should enable error detection by calling a constructor that includes a `throwOnInvalidBytes` parameter and setting its value to `true`.

The `encoderShouldEmitUTF8Identifier` parameter controls the operation of the `UTF8Encoding.GetPreamble` method. If `true`, the method returns a byte array containing the Unicode byte order mark (BOM) in UTF-8 format.  If `false`, it returns a zero-length byte array. However, setting `encoderShouldEmitUTF8Identifier` to `true` does not cause the `UTF8Encoding.GetBytes` method to prefix the BOM at the beginning of the byte array, nor does it cause the `UTF8Encoding.GetByteCount` method to include the number of bytes in the BOM in the byte count.

#### Examples
The following example creates a new `UTF8Encoding` instance and specifies that a Unicode byte order mark prefix should be emitted by the `UTF8Encoding.GetPreamble` method. The `UTF8Encoding.GetPreamble` method then returns the Unicode byte order mark prefix.

_Code sample not included: ~/snippets/csharp/System.Text/UTF8Encoding/.ctor/ctor-boolean.cs._

## UTF8Encoding.UTF8Encoding(Boolean, Boolean) constructor

```csharp
public UTF8Encoding (bool encoderShouldEmitUTF8Identifier, bool throwOnInvalidBytes);
```

Initializes a new instance of the `UTF8Encoding` class. Parameters specify whether to provide a Unicode byte order mark and whether to throw an exception when an invalid encoding is detected.

Parameters:

- `encoderShouldEmitUTF8Identifier`: `true` to specify that the `UTF8Encoding.GetPreamble` method should return a Unicode byte order mark; otherwise, `false`.
- `throwOnInvalidBytes`: `true` to throw an exception when an invalid encoding is detected; otherwise, `false`.

#### Remarks
The `encoderShouldEmitUTF8Identifier` parameter controls the operation of the `UTF8Encoding.GetPreamble` method. If `true`, the method returns a byte array containing the Unicode byte order mark (BOM) in UTF-8 format.  If `false`, it returns a zero-length byte array. However, setting `encoderShouldEmitUTF8Identifier` to `true` does not cause the `UTF8Encoding.GetBytes` method to prefix the BOM at the beginning of the byte array, nor does it cause the `UTF8Encoding.GetByteCount` method to include the number of bytes in the BOM in the byte count.

If `throwOnInvalidBytes` is `true`, a method that detects an invalid byte sequence throws an `ArgumentException` exception. Otherwise, the method does not throw an exception, and the invalid sequence is ignored.

> **Caution:**
>  For security reasons, you should enable error detection by calling a constructor that includes a `throwOnInvalidBytes` parameter and setting that parameter to `true`.

#### Examples
The following example creates a new `UTF8Encoding` instance, specifying that the `UTF8Encoding.GetPreamble` method should not emit a Unicode byte order mark prefix, and an exception should be thrown when an invalid encoding is detected. The behavior of this constructor is compared to the default `%23ctor` constructor, which does not throw an exception when an invalid encoding is detected. The two `UTF8Encoding` instances encode a character array that contains two high surrogates (U+D801 and U+D802) in a row, which is an invalid character sequence; a high surrogate should always be followed by a low surrogate.

_Code sample not included: ~/snippets/csharp/System.Text/UTF8Encoding/.ctor/ctor-boolean-boolean.cs._

## UTF8Encoding.Preamble property

```csharp
public override ReadOnlySpan<byte> Preamble { get; }
```

Gets a Unicode byte order mark encoded in UTF-8 format, if this object is configured to supply one.

Returns: A byte span containing the Unicode byte order mark, if this object is configured to supply one; otherwise, the default span.

#### Remarks
The `UTF8Encoding` object can provide a preamble, which is a span of bytes that can be prefixed to the sequence of bytes that result from the encoding process. Prefacing a sequence of encoded bytes with a byte order mark (code point `U+FEFF`) helps the decoder determine the byte order and the transformation format, or UTF. The Unicode byte order mark (BOM) is serialized as 0xEF 0xBB 0xBF. Note that the Unicode Standard neither requires nor recommends the use of a BOM for UTF-8 encoded streams.

You can instantiate a `UTF8Encoding` object whose `Preamble` is a valid BOM in the following ways:

- By retrieving the `UTF8Encoding` object returned by the `UTF8` property.

- By calling a `UTF8Encoding` constructor with an `encoderShouldEmitUTF8Identifier` parameter and setting its value set to `true`.

All other `UTF8Encoding` objects are configured to return a default span rather than a valid BOM.

The BOM provides nearly certain identification of an encoding for files that otherwise have lost a reference to their encoding, such as untagged or improperly tagged web data or random text files stored when a business did not have international concerns. Often user problems might be avoided if data is consistently and properly tagged.

For standards that provide an encoding type, a BOM is somewhat redundant. However, it can be used to help a server send the correct encoding header. Alternatively, it can be used as a fallback in case the encoding is otherwise lost.

There are some disadvantages to using a BOM. For example, knowing how to limit the database fields that use a BOM can be difficult. Concatenation of files can be a problem also, for example, when files are merged in such a way that an unnecessary character can end up in the middle of data. In spite of the few disadvantages, however, the use of a BOM is highly recommended.

For more information on byte order and the byte order mark, see The Unicode Standard at the Unicode home page.

> **Important:**
>  To ensure that the encoded bytes are decoded properly when they are saved as a file or as a stream, you can prefix the beginning of a stream of encoded bytes with a preamble. Note that the `UTF8Encoding.GetBytes` method does not prepend a BOM to a sequence of encoded bytes; supplying a BOM at the beginning of an appropriate byte stream is the developer's responsibility.

## UTF8Encoding.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Determines whether the specified object is equal to the current `UTF8Encoding` object.

Parameters:

- `value`: The object to compare with the current instance.

Returns: `true` if `value` is an instance of `UTF8Encoding` and is equal to the current object; otherwise, `false`.

#### Remarks
Two `UTF8Encoding` objects are considered equal if all of the following conditions are true:

- Both objects provide the byte order mark, or both do not.

- Both objects use the same encoder fallback.

- Both objects use the same decoder fallback.

#### Examples
The following example uses the `UTF8Encoding.Equals` method to test whether the current `UTF8Encoding` object is equal to a different `UTF8Encoding` object. Four `UTF8Encoding` objects are created and compared and the results of the comparisons are displayed.

_Code sample not included: ~/snippets/csharp/System.Text/UTF8Encoding/Equals/equals-object.cs._

## UTF8Encoding.GetByteCount(Char>) method

```csharp
public override int GetByteCount (ReadOnlySpan<char> chars);
```

Calculates the number of bytes produced by encoding the specified character span.

Parameters:

- `chars`: The span that contains the set of characters to encode.

Returns: The number of bytes produced by encoding the specified character span.

Exceptions:

- `ArgumentException`: Error detection is enabled, and `chars` contains an invalid sequence of characters.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET).

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact size required by `UTF8Encoding.GetBytes` to store the resulting bytes, you call the `UTF8Encoding.GetByteCount` method. To calculate the maximum size, you call the `UTF8Encoding.GetMaxByteCount` method. The `UTF8Encoding.GetByteCount` method generally allocates less memory, while the `UTF8Encoding.GetMaxByteCount` method generally executes faster.

With error detection, an invalid sequence causes this method to throw an `ArgumentException` exception. Without error detection, invalid sequences are ignored, and no exception is thrown.

To ensure that the encoded bytes are decoded properly when they are saved as a file or as a stream, you can prefix a stream of encoded bytes with a preamble. Inserting the preamble at the beginning of a byte stream (such as at the beginning of a series of bytes to be written to a file) is the developer's responsibility, and the number of bytes in the preamble is not reflected in the value returned by the `UTF8Encoding.GetByteCount` method.
