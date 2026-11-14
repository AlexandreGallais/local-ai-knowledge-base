---
title: "UTF8Encoding class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/UTF8Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UTF8Encoding class (part 4 of 5)

## UTF8Encoding.GetDecoder() method

```csharp
public override System.Text.Decoder GetDecoder ();
```

Obtains a decoder that converts a UTF-8 encoded sequence of bytes into a sequence of Unicode characters.

Returns: A decoder that converts a UTF-8 encoded sequence of bytes into a sequence of Unicode characters.

#### Remarks
The `Decoder.GetChars` method converts sequential blocks of bytes into sequential blocks of characters, in a manner similar to the `UTF8Encoding.GetChars` method of this class. However, a `Decoder` maintains state information between calls so it can correctly decode byte sequences that span blocks. The `Decoder` also preserves trailing bytes at the end of data blocks and uses the trailing bytes in the next decoding operation. Therefore, `UTF8Encoding.GetDecoder` and `UTF8Encoding.GetEncoder` are useful for network transmission and file operations, because those operations often deal with blocks of data instead of a complete data stream.

If error detection is enabled, that is, the `throwOnInvalidCharacters` parameter of the constructor is set to `true`, error detection is also enabled in the `Decoder` returned by this method. If error detection is enabled and an invalid sequence is encountered, the state of the decoder is undefined and processing must stop.

#### Examples
The following example uses the `UTF8Encoding.GetDecoder` method to obtain a UTF-8 decoder. The decoder converts a sequence of bytes into a sequence of characters.

_Code sample not included: ~/snippets/csharp/System.Text/UTF8Encoding/GetDecoder/getdecoder-.cs._

## UTF8Encoding.GetEncoder() method

```csharp
public override System.Text.Encoder GetEncoder ();
```

Obtains an encoder that converts a sequence of Unicode characters into a UTF-8 encoded sequence of bytes.

Returns: A `Encoder` that converts a sequence of Unicode characters into a UTF-8 encoded sequence of bytes.

#### Remarks
The `Encoder.GetBytes` method converts sequential blocks of characters into sequential blocks of bytes, in a manner similar to the `UTF8Encoding.GetBytes` method. However, a `Encoder` maintains state information between calls so it can correctly encode character sequences that span blocks. The `Encoder` also preserves trailing characters at the end of data blocks and uses the trailing characters in the next encoding operation. For example, a data block might end with an unmatched high surrogate, and the matching low surrogate might be in the next data block. Therefore, `UTF8Encoding.GetDecoder` and `UTF8Encoding.GetEncoder` are useful for network transmission and file operations, because those operations often deal with blocks of data instead of a complete data stream.

If error detection is enabled, that is, the `throwOnInvalidCharacters` parameter of the constructor is set to `true`, error detection is also enabled in the `Encoder` returned by this method. If error detection is enabled and an invalid sequence is encountered, the state of the encoder is undefined and processing must stop.

#### Examples
The following example uses the `UTF8Encoding.GetEncoder` method to obtain an encoder to convert a sequence of characters into a UTF-8 encoded sequence of bytes.

_Code sample not included: ~/snippets/csharp/System.Text/UTF8Encoding/GetEncoder/getencoder-.cs._

## UTF8Encoding.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current instance.

Returns: The hash code for the current instance.

#### Examples
The following example uses the `UTF8Encoding.GetHashCode` method to return a hash code for `UTF8Encoding` instances. Notice that the hash code returned by this method depends on the constructor used to create the `UTF8Encoding` object.

_Code sample not included: ~/snippets/csharp/System.Text/UTF8Encoding/GetHashCode/gethashcode-.cs._

## UTF8Encoding.GetMaxByteCount(Int32) method

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
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF8Encoding.GetBytes` to store the resulting bytes, you call the `UTF8Encoding.GetByteCount` method. To calculate the maximum array size, you call the `UTF8Encoding.GetMaxByteCount` method. The `UTF8Encoding.GetByteCount` method generally allocates less memory, while the `UTF8Encoding.GetMaxByteCount` method generally executes faster.

`UTF8Encoding.GetMaxByteCount` is a worst-case number, including the worst case for the currently selected `EncoderFallback`. If a fallback is chosen with a potentially large string, `UTF8Encoding.GetMaxByteCount` can return large values.

In most cases, this method returns reasonable numbers for small strings. For large strings, you might have to choose between using very large buffers and catching errors in the rare case that a more reasonable buffer is exceeded. You might also want to consider a different approach using `UTF8Encoding.GetByteCount` or `Encoder.Convert`. For example, text in English and many other languages often needs only one UTF-8 byte to represent a character, but the number returned by `UTF8Encoding.GetMaxByteCount` has to allow for the possibility that the string to be converted will consist entirely of characters that each require four bytes.

`UTF8Encoding.GetMaxByteCount` has no relation to `UTF8Encoding.GetChars`. If your application needs a similar function to use with `UTF8Encoding.GetChars`, it should use `UTF8Encoding.GetMaxCharCount`.

> **Note:**
>  `GetMaxByteCount(N)` is not necessarily the same value as `N* GetMaxByteCount(1)`.

#### Examples
The following example uses the `UTF8Encoding.GetMaxByteCount` method to return the maximum number of bytes required to encode a specified number of characters.

_Code sample not included: ~/snippets/csharp/System.Text/UTF8Encoding/GetMaxByteCount/getmaxbytecount-int32.cs._

## UTF8Encoding.GetMaxCharCount(Int32) method

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
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `UTF8Encoding.GetChars` to store the resulting characters, you call the `UTF8Encoding.GetCharCount` method. To calculate the maximum array size, you call the `UTF8Encoding.GetMaxCharCount` method. The `UTF8Encoding.GetCharCount` method generally allocates less memory, while the `UTF8Encoding.GetMaxCharCount` method generally executes faster.

`UTF8Encoding.GetMaxCharCount` is a worst-case number, including the worst case for the currently selected `DecoderFallback`. If a fallback is chosen with a potentially large string, `UTF8Encoding.GetMaxCharCount` can return large values.

In most cases, this method returns reasonable numbers for small strings. For large strings, you might have to choose between using very large buffers and catching errors in the rare case that a more reasonable buffer is exceeded.  You might also want to consider a different approach using `UTF8Encoding.GetCharCount` or `Encoder.Convert`.

`UTF8Encoding.GetMaxCharCount` has no relation to `UTF8Encoding.GetBytes`. If your application needs a similar function to use with `UTF8Encoding.GetBytes`, it should use `UTF8Encoding.GetMaxByteCount`.

> **Note:**
>  `GetMaxCharCount(N)` is not necessarily the same value as `N* GetMaxCharCount(1)`.

#### Examples
The following example uses the `UTF8Encoding.GetMaxCharCount` method to return the maximum number of characters produced by decoding a specified number of bytes.

_Code sample not included: ~/snippets/csharp/System.Text/UTF8Encoding/GetMaxCharCount/getmaxcharcount-int32.cs._

## UTF8Encoding.GetPreamble() method

```csharp
public override byte[] GetPreamble ();
```

Returns a Unicode byte order mark encoded in UTF-8 format, if the `UTF8Encoding` encoding object is configured to supply one.

Returns: A byte array containing the Unicode byte order mark, if the `UTF8Encoding` encoding object is configured to supply one. Otherwise, this method returns a zero-length byte array.

#### Remarks
The `UTF8Encoding` object can provide a preamble, which is a byte array that can be prefixed to the sequence of bytes that result from the encoding process. Prefacing a sequence of encoded bytes with a byte order mark (code point U+FEFF) helps the decoder determine the byte order and the transformation format, or UTF. The Unicode byte order mark (BOM) is serialized as 0xEF 0xBB 0xBF. Note that the Unicode Standard neither requires nor recommends the use of a BOM for UTF-8 encoded streams.

You can instantiate a `UTF8Encoding` object whose `UTF8Encoding.GetPreamble` method returns a valid BOM in the following ways:

- By retrieving the `UTF8Encoding` object returned by the `UTF8` property.

- By calling a `UTF8Encoding` constructor with a `encoderShouldEmitUTF8Identifier` parameter and setting its value set to `true`.

All other `UTF8Encoding` objects are configured to return an empty array rather than a valid BOM.

The BOM provide nearly certain identification of an encoding for files that otherwise have lost a reference to their encoding, such as untagged or improperly tagged web data or random text files stored when a business did not have international concerns. Often user problems might be avoided if data is consistently and properly tagged.

For standards that provide an encoding type, a BOM is somewhat redundant. However, it can be used to help a server send the correct encoding header. Alternatively, it can be used as a fallback in case the encoding is otherwise lost.

There are some disadvantages to using a BOM. For example, knowing how to limit the database fields that use a BOM can be difficult. Concatenation of files can be a problem also, for example, when files are merged in such a way that an unnecessary character can end up in the middle of data. In spite of the few disadvantages, however, the use of a BOM is highly recommended.

For more information on byte order and the byte order mark, see The Unicode Standard at the Unicode home page.

> **Important:**
>  To ensure that the encoded bytes are decoded properly when they are saved as a file or as a stream, you can prefix the beginning of a stream of encoded bytes with a preamble. Note that the `UTF8Encoding.GetBytes` method does not prepend a BOM to a sequence of encoded bytes; supplying a BOM at the beginning of an appropriate byte stream is the developer's responsibility.

#### Examples
The following example uses the `UTF8Encoding.GetPreamble` method to return the Unicode byte order mark encoded in UTF-8 format. Notice that the parameterless constructor for `UTF8Encoding` does not provide a preamble.

_Code sample not included: ~/snippets/csharp/System.Text/UTF8Encoding/GetPreamble/getpreamble-.cs._

The following example instantiates two `UTF8Encoding` objects, the first by calling the parameterless `%23ctor` constructor, which does not provide a BOM, and the second by calling the `%23ctor` constructor with its `encoderShouldEmitUTF8Identifier` argument set to `true`. It then calls the `UTF8Encoding.GetPreamble` method to write the BOM to a file before writing a UF8-encoded string. As the console output from the example shows, the file that saves the bytes from the second encoder has three more bytes than the first.

_Code sample not included: ~/snippets/csharp/System.Text/UTF8Encoding/GetPreamble/getpreamble1.cs._

You can also compare the files by using the `fc` command in a console window, or you can inspect the files in a text editor that includes a Hex View mode. Note that when the file is opened in an editor that supports UTF-8, the BOM is not displayed.
