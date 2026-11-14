---
title: "UnicodeEncoding class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/UnicodeEncoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnicodeEncoding class (part 4 of 4)

## UnicodeEncoding.GetEncoder() method

```csharp
public override System.Text.Encoder GetEncoder ();
```

Obtains an encoder that converts a sequence of Unicode characters into a UTF-16 encoded sequence of bytes.

Returns: A `Encoder` object that converts a sequence of Unicode characters into a UTF-16 encoded sequence of bytes.

#### Remarks
The `Encoder.GetBytes` method converts sequential blocks of characters into sequential blocks of bytes in a manner similar to the `UnicodeEncoding.GetBytes` method of this class. However, a `Encoder` object maintains state information between calls so that it can correctly encode character sequences that span blocks. The `Encoder` object also preserves trailing characters at the end of data blocks and uses the trailing characters in the next encoding operation. For example, a data block might end with an unmatched high surrogate, and the matching low surrogate might be in the next data block. Therefore, `UnicodeEncoding.GetDecoder` and `UnicodeEncoding.GetEncoder` are useful for network transmission and file operations, because those operations often deal with blocks of data instead of a complete data stream.

If error detection is enabled, that is, the `throwOnInvalidBytes` parameter of the constructor is set to `true`, error detection is also enabled in the `Encoder` object returned by this method. If error detection is enabled and an invalid sequence is encountered, the state of the encoder is undefined and processing must stop.

#### Examples
The following example uses an encoder and a decoder to encode a string into an array of bytes, and then decode the bytes into an array of characters.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/GetDecoder/encdec.cs._

## UnicodeEncoding.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current instance.

Returns: The hash code for the current `UnicodeEncoding` object.

To be added.

## UnicodeEncoding.GetMaxByteCount(Int32) method

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
To calculate the exact array size required by `UnicodeEncoding.GetBytes` to store the resulting bytes, the application uses `UnicodeEncoding.GetByteCount`. To calculate the maximum array size, the application should use `UnicodeEncoding.GetMaxByteCount`. The `UnicodeEncoding.GetByteCount` method generally allocates less memory, while the `UnicodeEncoding.GetMaxByteCount` method generally executes faster.

`UnicodeEncoding.GetMaxByteCount` retrieves a worst-case number, including the worst case for the currently selected `EncoderFallback`. If a fallback is chosen with a potentially large string, `UnicodeEncoding.GetMaxByteCount` can return large values.

In most cases, this method retrieves reasonable numbers for small strings. For large strings, you might have to choose between using very large buffers and catching errors in the rare case that a more reasonable buffer is exceeded. You might also want to consider a different approach using `UnicodeEncoding.GetByteCount` or `Encoder.Convert`.

`UnicodeEncoding.GetMaxByteCount` has no relation to `UnicodeEncoding.GetChars`. If your application needs a similar function to use with `UnicodeEncoding.GetChars`, it should use `UnicodeEncoding.GetMaxCharCount`.

> **Note:**
>  `GetMaxByteCount(N)` is not necessarily the same value as `N* GetMaxByteCount(1)`.

#### Examples
The following example demonstrates how to use the `UnicodeEncoding.GetMaxByteCount` method to return the maximum number of bytes required to encode a specified number of characters.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/GetMaxByteCount/getmaxbytecount-int32.cs._

## UnicodeEncoding.GetMaxCharCount(Int32) method

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
To calculate the exact array size required by `UnicodeEncoding.GetChars` to store the resulting characters, the application uses `UnicodeEncoding.GetCharCount`. To calculate the maximum array size, the application should use `UnicodeEncoding.GetMaxCharCount`. The `UnicodeEncoding.GetCharCount` method generally allocates less memory, while the `UnicodeEncoding.GetMaxCharCount` method generally executes faster.

`UnicodeEncoding.GetMaxCharCount` retrieves a worst-case number, including the worst case for the currently selected `DecoderFallback`. If a fallback is chosen with a potentially large string, `UnicodeEncoding.GetMaxCharCount` retrieves large values.

In most cases, this method retrieves reasonable numbers for small strings. For large strings, you might have to choose between using very large buffers and catching errors in the rare case that a more reasonable buffer is exceeded. You might also want to consider a different approach using `UnicodeEncoding.GetCharCount` or `Decoder.Convert`.

`UnicodeEncoding.GetMaxCharCount` has no relation to `UnicodeEncoding.GetBytes`. If your application needs a similar function to use with `UnicodeEncoding.GetBytes`, it should use `UnicodeEncoding.GetMaxByteCount`.

> **Note:**
>  `GetMaxCharCount(N)` is not necessarily the same value as `N* GetMaxCharCount(1)`.

#### Examples
The following example demonstrates how to use the `UnicodeEncoding.GetMaxCharCount` method to return the maximum number of characters produced by decoding a specified number of bytes.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/GetMaxCharCount/getmaxcharcount-int32.cs._

## UnicodeEncoding.GetPreamble() method

```csharp
public override byte[] GetPreamble ();
```

Returns a Unicode byte order mark encoded in UTF-16 format, if the constructor for this instance requests a byte order mark.

Returns: A byte array containing the Unicode byte order mark, if the `UnicodeEncoding` object is configured to supply one. Otherwise, this method returns a zero-length byte array.

#### Remarks
The `UnicodeEncoding` object can provide a preamble, which is a byte array that can be prefixed to the sequence of bytes resulting from the encoding process. Prefacing a sequence of encoded bytes with a byte order mark (code point U+FEFF) helps the decoder determine the byte order and the transformation format or UTF. The Unicode byte order mark (BOM) is serialized as follows (in hexadecimal):

- Big endian byte order: FE FF

- Little endian byte order: FF FE

You can instantiate a `UnicodeEncoding` object whose `UnicodeEncoding.GetPreamble` method returns a valid BOM in the following ways:

- By retrieving the `UnicodeEncoding` object returned by the `Encoding.Unicode` or `BigEndianUnicode` property.

- By calling the parameterless `%23ctor` constructor to instantiate a `UnicodeEncoding` object.

- By supplying `true` as the value of the `byteOrderMark` argument to the `%23ctor` or `%23ctor` constructors.

We recommended that you use the BOM, since it provides nearly certain identification of an encoding for files that otherwise have lost a reference to their encoding, such as untagged or improperly tagged web data or random text files stored when a business did not have international concerns. Often user problems might be avoided if data is consistently and properly tagged.

For standards that provide an encoding type, a BOM is somewhat redundant. However, it can be used to help a server send the correct encoding header. Alternatively, it can be used as a fallback in case the encoding is otherwise lost.

There are some disadvantages to using a BOM. For example, knowing how to limit the database fields that use a BOM can be difficult. Concatenation of files can be a problem also, for example, when files are merged in such a way that an unnecessary character can end up in the middle of data. In spite of the few disadvantages, however, the use of a BOM is highly recommended.

> **Important:**
>  To ensure that the encoded bytes are decoded properly, you should prefix the beginning of a stream of encoded bytes with a preamble. Note that the `UnicodeEncoding.GetBytes` method does not prepend a BOM to a sequence of encoded bytes; supplying a BOM at the beginning of an appropriate byte stream is the developer's responsibility.

#### Examples
The following example demonstrates how to use the `UnicodeEncoding.GetPreamble` method to retrieve the Unicode byte order mark in big endian or little endian byte order for an instance of a `UnicodeEncoding`.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/GetPreamble/getpreamble-.cs._

The following example instantiates two `UnicodeEncoding` objects, the first of which does not provide a BOM, and the second of which does. It then calls the `UnicodeEncoding.GetPreamble` method to write the BOM to a file before writing a Unicode-encoded string. As the console output from the example shows, the file that saves the bytes from the second encoder has three more bytes than the first.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/GetPreamble/GetPreamble1.cs._

You can also compare the files by using the `fc` command in a console window, or you can inspect the files in a text editor that includes a Hex View mode. Note that when the file is opened in an editor that supports UTF-16 encoding, the BOM is not displayed.

## UnicodeEncoding.GetString(Byte[], Int32, Int32) method

```csharp
public override string GetString (byte[] bytes, int index, int count);
```

Decodes a range of bytes from a byte array into a string.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `index`: The index of the first byte to decode.
- `count`: The number of bytes to decode.

Returns: A `String` object containing the results of decoding the specified sequence of bytes.

Exceptions:

- `ArgumentNullException`: `bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` and `count` do not denote a valid range in `bytes`.
- `ArgumentException`: Error detection is enabled, and `bytes` contains an invalid sequence of bytes.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

If the range of bytes to be decoded includes the byte order mark (BOM) and the byte array was returned by a method of a non-BOM aware type, the character U+FFFE is included in the character array returned by this method. You can remove it by calling the `String.TrimStart` method.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` object provided by the `UnicodeEncoding.GetDecoder` or the `UnicodeEncoding.GetEncoder` method, respectively.

#### Examples
The following example initializes an array by calling the `UnicodeEncoding.GetByteCount` method to determine exactly how many bytes are required for an encoded string and then adding the size of the byte order mark (BOM). The example then calls the `UnicodeEncoding.GetPreamble` method to store the BOM to the array before calling the `Encoding.GetBytes` method to store the encoded bytes to the array. The example then calls the `UnicodeEncoding.GetString` method to decode the string.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/GetString/getstring1.cs._

Note that in this case the decoded string differs from the original string, since it begins with a 16-bit byte order mark U+FFFD. This means that the two strings will compare as unequal, and that if the string is output, the BOM will be displayed as the replacement character "?". To remove the BOM at the beginning of the string, you can call the `String.TrimStart` method.

## UnicodeEncoding.CharSize field

```csharp
public const int CharSize = 2;
```

Represents the Unicode character size in bytes. This field is a constant.

#### Remarks
The value of this field is a 32-bit signed constant with a value of 2.

#### Examples
The following example demonstrates how to return the value of `CharSize` and display it.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/CharSize/charsize.cs._
