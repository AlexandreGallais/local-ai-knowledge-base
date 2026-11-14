---
title: "UTF32Encoding class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/UTF32Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UTF32Encoding class (part 4 of 4)

## UTF32Encoding.GetMaxCharCount(Int32) method

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
To calculate the exact array size required by `UTF32Encoding.GetChars` to store the resulting characters, you call the `UTF32Encoding.GetCharCount` method. To calculate the maximum array size, you call the `UTF32Encoding.GetMaxCharCount` method. The `UTF32Encoding.GetCharCount` method generally allocates less memory, while the `UTF32Encoding.GetMaxCharCount` method generally executes faster.

`UTF32Encoding.GetMaxCharCount` is a worst-case number, including the worst case for the currently selected `DecoderFallback`. If a fallback is chosen with a potentially large string, `UTF32Encoding.GetMaxCharCount` can return large values.

In most cases, this method returns reasonable numbers for small strings. For large strings, you might have to choose between using very large buffers and catching errors in the rare case that a more reasonable buffer is exceeded. You might also want to consider a different approach and use `UTF32Encoding.GetCharCount` or `Decoder.Convert`.

`UTF32Encoding.GetMaxCharCount` has no relationship to `UTF32Encoding.GetBytes`. If you need a similar function to use with `UTF32Encoding.GetBytes`, use `UTF32Encoding.GetMaxByteCount`.

> **Note:**
>  `GetMaxCharCount(N)` is not necessarily the same value as `N* GetMaxCharCount(1)`.

#### Examples
The following example encodes a string into an array of bytes, and then decodes the bytes into an array of characters.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/GetCharCount/getchars.cs._

## UTF32Encoding.GetPreamble() method

```csharp
public override byte[] GetPreamble ();
```

Returns a Unicode byte order mark encoded in UTF-32 format, if the `UTF32Encoding` object is configured to supply one.

Returns: A byte array containing the Unicode byte order mark, if the `UTF32Encoding` object is configured to supply one. Otherwise, this method returns a zero-length byte array.

#### Remarks
The `UTF32Encoding` object can provide a preamble, which is an array of bytes that can be prefixed to the sequence of bytes resulting from the encoding process. Prefacing a sequence of encoded bytes with a byte order mark (code points U+0000 U+FEFF) helps the decoder determine the byte order and the transformation format, or UTF. The Unicode byte order mark (BOM) is serialized as follows (in hexadecimal):

- Big endian byte order: 00 00 FE FF

- Little endian byte order: FF FE 00 00

You can instantiate a `UTF32Encoding` object whose `UTF32Encoding.GetPreamble` method returns a valid BOM in the following ways:

- By retrieving the `UTF32Encoding` object returned by the `UTF32` property.

- By calling the parameterless `%23ctor` constructor to instantiate a `UTF32Encoding` object.

- By supplying `true` as the value of the `byteOrderMark` argument to the `UTF32Encoding.%23ctor` and `UTF32Encoding.%23ctor` constructors.

We recommend that you use the BOM, since it provides nearly certain identification of an encoding for files that otherwise have lost reference to the `UTF32Encoding` object, for example, untagged or improperly tagged web data, or random text files stored when a business did not have international concerns or other data. Often, user problems might be avoided if data is consistently and properly tagged.

For standards that provide an encoding type, a BOM is somewhat redundant. However, it can be used to help a server send the correct encoding header. Alternatively, it can be used as a fallback in case the encoding is otherwise lost.

There are some disadvantages to using a BOM. For example, knowing how to limit the database fields that use a BOM can be difficult. Concatenation of files can be a problem also, for example, when files are merged in such a way that an unnecessary character can end up in the middle of data. In spite of the few disadvantages, however, the use of a BOM is highly recommended.

For more information on byte order and the byte order mark, see The Unicode Standard at the Unicode home page.

> **Important:**
>  To ensure that the encoded bytes are decoded properly, you should prefix encoded bytes with a preamble. Note that the `UTF32Encoding.GetBytes` method does not prepend a BOM to a sequence of encoded bytes; supplying a BOM at the beginning of an appropriate byte stream is the developer's responsibility.

#### Examples
The following code example retrieves and displays the byte order mark for different `UTF32Encoding` instances.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/.ctor/getpreamble.cs._

The following example instantiates two `UTF32Encoding` objects, the first of which does not provide a BOM and the second of which does. It then calls the `UTF32Encoding.GetPreamble` method to write the BOM to a file before writing a UTF-32-encoded string. As the output from the example shows, the file that saves the bytes from the second encoder has four more bytes that the first.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/.ctor/getpreamble1.cs._

You can also compare the files by using the `fc` command in a console window, or you can inspect the files in a text editor that includes a Hex View mode. Note that when the file is opened in an editor that supports UTF-32, the BOM is not displayed.

## UTF32Encoding.GetString(Byte[], Int32, Int32) method

```csharp
public override string GetString (byte[] bytes, int index, int count);
```

Decodes a range of bytes from a byte array into a string.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `index`: The index of the first byte to decode.
- `count`: The number of bytes to decode.

Returns: A string that contains the results of decoding the specified sequence of bytes.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` and `count` do not denote a valid range in `bytes`.
- `ArgumentException`: Error detection is enabled, and `bytes` contains an invalid sequence of bytes.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET for a complete explanation).

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
With error detection, an invalid sequence causes this method to throw a `ArgumentException`. Without error detection, invalid sequences are ignored, and no exception is thrown.

If the range of bytes to be decoded includes the byte order mark (BOM), and the byte array was returned by a method of a non-BOM aware type, the character U+FFFE is included in the character array returned by this method. You can remove it by calling the `String.TrimStart` method.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, the application should use the `Decoder` or the `Encoder` provided by the `UTF32Encoding.GetDecoder` method or the `UTF32Encoding.GetEncoder` method, respectively.

#### Examples
The following example encodes a string into two arrays of bytes, one in little-endian order and the other in big-endian order. It then decodes the bytes back into a string.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/GetString/getstring.cs._

The following example initializes an array by calling the `UTF32Encoding.GetByteCount` method to determine exactly how many bytes are required for an encoded string and then adding the size of the byte order mark (BOM). The example then calls the `UTF32Encoding.GetPreamble` method to store the BOM to the array before calling the `UTF32Encoding.GetBytes` method to store the encoded bytes to the array. The example then calls the `UTF32Encoding.GetString` method to decode the string.

_Code sample not included: ~/snippets/csharp/System.Text/UTF32Encoding/GetString/GetString1.cs._

Note that in this case the decoded string differs from the original string, since it begins with a 32-bit byte order mark U+FFFE U+0000. This means that the two strings will compare as unequal, and that if the string is output, the BOM will be displayed as the replacement character "?".
