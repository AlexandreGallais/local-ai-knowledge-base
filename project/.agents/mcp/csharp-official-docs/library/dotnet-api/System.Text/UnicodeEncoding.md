---
title: "UnicodeEncoding class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/UnicodeEncoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnicodeEncoding class

Namespace: `System.Text`

```csharp
public class UnicodeEncoding : System.Text.Encoding
```

Represents a UTF-16 encoding of Unicode characters.

#### Remarks
Encoding is the process of transforming a set of Unicode characters into a sequence of bytes. Decoding is the process of transforming a sequence of encoded bytes into a set of Unicode characters.

The Unicode Standard assigns a code point (a number) to each character in every supported script. A Unicode Transformation Format (UTF) is a way to encode that code point. The Unicode Standard uses the following UTFs:

- UTF-8, which represents each code point as a sequence of one to four bytes.
- UTF-16, which represents each code point as a sequence of one to two 16-bit integers.
- UTF-32, which represents each code point as a 32-bit integer.

For more information about the UTFs and other encodings supported by `Text`, see Character Encoding in .NET.

The `UnicodeEncoding` class represents a UTF-16 encoding. The encoder can use either big endian byte order (most significant byte first) or little endian byte order (least significant byte first). For example, the Latin Capital Letter A (code point U+0041) is serialized as follows (in hexadecimal):

- Big endian byte order: 00 00 00 41
- Little endian byte order: 41 00 00 00

It is generally more efficient to store Unicode characters using the native byte order of a particular platform. For example, it is better to use the little endian byte order on little endian platforms, such as Intel computers. The `UnicodeEncoding` class corresponds to the Windows code pages 1200 (little endian byte order) and 1201 (big endian byte order). You can determine the "endianness" of a particular architecture by calling the `IsLittleEndian` method.

Optionally, the `UnicodeEncoding` object provides a byte order mark (BOM), which is an array of bytes that can be prefixed to the sequence of bytes resulting from the encoding process. If the preamble contains a byte order mark (BOM), it helps the decoder determine the byte order and the transformation format or UTF.

If the `UnicodeEncoding` instance is configured to provide a BOM, you can retrieve it by calling the `UnicodeEncoding.GetPreamble` method; otherwise, the method returns an empty array. Note that, even if a `UnicodeEncoding` object is configured for BOM support, you must include the BOM at the beginning of the encoded byte stream as appropriate; the encoding methods of the `UnicodeEncoding` class do not do this automatically.

> **Caution:**
> To enable error detection and to make the class instance more secure, you should instantiate a `UnicodeEncoding` object by calling the `%23ctor` constructor and setting its `throwOnInvalidBytes` argument to `true`. With error detection, a method that detects an invalid sequence of characters or bytes throws a `ArgumentException`. Without error detection, no exception is thrown, and the invalid sequence is generally ignored.

You can instantiate a `UnicodeEncoding` object in a number of ways, depending on whether you want to it to provide a byte order mark (BOM), whether you want big-endian or little-endian encoding, and whether you want to enable error detection. The following table lists the `UnicodeEncoding` constructors and the `Encoding` properties that return a `UnicodeEncoding` object.

| Member                                        | Endianness | BOM | Error detection           |
|-----------------------------------------------|------------|-----|---------------------------|
| `Encoding.BigEndianUnicode` | Big-endian | Yes | No (Replacement fallback) |
|`Encoding.Unicode`|Little-endian|Yes|No (Replacement fallback)|
|`%23ctor`|Little-endian|Yes|No (Replacement fallback)|
|`%23ctor`|Configurable|Configurable|No (Replacement fallback)|
|`%23ctor`|Configurable|Configurable|Configurable|

The `UnicodeEncoding.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `UnicodeEncoding.GetBytes` method performs the actual encoding.

Likewise, the `UnicodeEncoding.GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the `UnicodeEncoding.GetChars` and `UnicodeEncoding.GetString` methods perform the actual decoding.

For an encoder or decoder that is able to save state information when encoding or decoding data that spans multiple blocks (such as string of 1 million characters that is encoded in 100,000-character segments), use the `UnicodeEncoding.GetEncoder` and `UnicodeEncoding.GetDecoder` properties, respectively.

#### Examples
The following example demonstrates how to encode a string of Unicode characters into a byte array by using a `UnicodeEncoding` object. The byte array is decoded into a string to demonstrate that there is no loss of data.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/Overview/snippet.cs._

The following example uses the same string as the previous one, except that it writes the encoded bytes to a file and prefixes the byte stream with a byte order mark (BOM). It then reads the file in two different ways: as a text file by using a `StreamReader` object; and as a binary file. As you would expect, neither newly-read string includes the BOM.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/Overview/bom1.cs._

## UnicodeEncoding.UnicodeEncoding() constructor

```csharp
public UnicodeEncoding ();
```

Initializes a new instance of the `UnicodeEncoding` class.

#### Remarks
This constructor creates an instance that uses the little endian byte order, provides a Unicode byte order mark, and does not throw an exception when an invalid encoding is detected.

> **Caution:**
>  For security reasons, you should enable error detection by calling the `%23ctor` constructor and setting its `throwOnInvalidBytes` argument to `true`.

#### Examples
The following example demonstrates how to create a new `UnicodeEncoding` instance and display the name of the encoding.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/.ctor/ctor.cs._

## UnicodeEncoding.UnicodeEncoding(Boolean, Boolean) constructor

```csharp
public UnicodeEncoding (bool bigEndian, bool byteOrderMark);
```

Initializes a new instance of the `UnicodeEncoding` class. Parameters specify whether to use the big endian byte order and whether the `UnicodeEncoding.GetPreamble` method returns a Unicode byte order mark.

Parameters:

- `bigEndian`: `true` to use the big endian byte order (most significant byte first), or `false` to use the little endian byte order (least significant byte first).
- `byteOrderMark`: `true` to specify that the `UnicodeEncoding.GetPreamble` method returns a Unicode byte order mark; otherwise, `false`.

#### Remarks
This constructor creates an instance that does not throw an exception when an invalid encoding is detected.

> **Caution:**
>  For security reasons, you should enable error detection by calling the `%23ctor` constructor and setting its `throwOnInvalidBytes` argument to `true`.

The `byteOrderMark` parameter controls the operation of the `UnicodeEncoding.GetPreamble` method. If `true`, the method returns a byte array containing the Unicode byte order mark (BOM) in UTF-16 format.  If `false`, it returns a zero-length byte array. However, setting `byteOrderMark` to `true` does not cause the `UnicodeEncoding.GetBytes` method to prefix the BOM at the beginning of the byte array, nor does it cause the `UnicodeEncoding.GetByteCount` method to include the number of bytes in the BOM in the byte count.

#### Examples
The following example demonstrates how to create a new `UnicodeEncoding` instance specifying whether to support little endian or big endian byte ordering and the Unicode byte order mark.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/.ctor/ctor-boolean-boolean.cs._

## UnicodeEncoding.UnicodeEncoding(Boolean, Boolean, Boolean) constructor

```csharp
public UnicodeEncoding (bool bigEndian, bool byteOrderMark, bool throwOnInvalidBytes);
```

Initializes a new instance of the `UnicodeEncoding` class. Parameters specify whether to use the big endian byte order, whether to provide a Unicode byte order mark, and whether to throw an exception when an invalid encoding is detected.

Parameters:

- `bigEndian`: `true` to use the big endian byte order (most significant byte first); `false` to use the little endian byte order (least significant byte first).
- `byteOrderMark`: `true` to specify that the `UnicodeEncoding.GetPreamble` method returns a Unicode byte order mark; otherwise, `false`.
- `throwOnInvalidBytes`: `true` to specify that an exception should be thrown when an invalid encoding is detected; otherwise, `false`.

#### Remarks
The `byteOrderMark` parameter controls the operation of the `UnicodeEncoding.GetPreamble` method. If `true`, the method returns a byte array containing the Unicode byte order mark (BOM) in UTF-16 format.  If `false`, it returns a zero-length byte array. However, setting `byteOrderMark` to `true` does not cause the `UnicodeEncoding.GetBytes` method to prefix the BOM at the beginning of the byte array, nor does it cause the `UnicodeEncoding.GetByteCount` method to include the number of bytes in the BOM in the byte count.

If the `throwOnInvalidBytes` parameter is `true`, a method that detects an invalid byte sequence throws `ArgumentException`. Otherwise, the method does not throw an exception, and the invalid sequence is ignored.

> **Caution:**
>  For security reasons, you should use this constructor to create an instance of the `UnicodeEncoding` class and turn on error detection by setting `throwOnInvalidBytes` to `true`.

#### Examples
The following example demonstrates the behavior of `UnicodeEncoding`, both with error detection enabled and without.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/.ctor/errordetection.cs._

## UnicodeEncoding.Preamble property

```csharp
public override ReadOnlySpan<byte> Preamble { get; }
```

Gets a Unicode byte order mark encoded in UTF-16 format, if this object is configured to supply one.

Returns: A byte span containing the Unicode byte order mark, if this object is configured to supply one; otherwise, the default span.

#### Remarks
The `UnicodeEncoding` object can provide a preamble, which is a byte span that can be prepended to the sequence of bytes resulting from the encoding process. Prefacing a sequence of encoded bytes with a byte order mark (code point `U+FEFF`) helps the decoder determine the byte order and the transformation format or UTF. The Unicode byte order mark (BOM) is serialized as follows (in hexadecimal):

- Big endian byte order: `FE FF`

- Little endian byte order: `FF FE`

You can instantiate a `UnicodeEncoding` object whose `Preamble` is a valid BOM in the following ways:

- By retrieving the `UnicodeEncoding` object returned by the `Encoding.Unicode` or `BigEndianUnicode` property.

- By calling the parameterless `%23ctor` constructor to instantiate a `UnicodeEncoding` object.

- By supplying `true` as the value of the `byteOrderMark` argument to the `%23ctor` or `%23ctor` constructors.

We recommended that you use the BOM, since it provides nearly certain identification of an encoding for files that otherwise have lost a reference to their encoding, such as untagged or improperly tagged web data or random text files stored when a business did not have international concerns. Often user problems might be avoided if data is consistently and properly tagged.

For standards that provide an encoding type, a BOM is somewhat redundant. However, it can be used to help a server send the correct encoding header. Alternatively, it can be used as a fallback in case the encoding is otherwise lost.

There are some disadvantages to using a BOM. For example, knowing how to limit the database fields that use a BOM can be difficult. Concatenation of files can be a problem also, for example, when files are merged in such a way that an unnecessary character can end up in the middle of data. In spite of the few disadvantages, however, the use of a BOM is highly recommended.

> **Important:**
>  To ensure that the encoded bytes are decoded properly, you should prefix the beginning of a stream of encoded bytes with a preamble. Note that the `UnicodeEncoding.GetBytes` method does not prepend a BOM to a sequence of encoded bytes; supplying a BOM at the beginning of an appropriate byte stream is the developer's responsibility.

## UnicodeEncoding.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Determines whether the specified `Object` is equal to the current `UnicodeEncoding` object.

Parameters:

- `value`: The object to compare with the current object.

Returns: `true` if `value` is an instance of `UnicodeEncoding` and is equal to the current object; otherwise, `false`.

#### Remarks
Two `UnicodeEncoding` objects are considered equal if all of the following conditions are true:

- Both objects use the same byte order (little-endian or big-endian).

- Both objects provide the byte order mark, or both do not.

- Both objects use the same encoder fallback.

- Both objects use the same decoder fallback.

#### Examples
The following example demonstrates how to use the `UnicodeEncoding.Equals` method to test whether the current `UnicodeEncoding` object is equal to a different `UnicodeEncoding` object. Five `UnicodeEncoding` objects are created and compared, and the results of the comparisons are displayed.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/.ctor/ctor-boolean-boolean.cs._
