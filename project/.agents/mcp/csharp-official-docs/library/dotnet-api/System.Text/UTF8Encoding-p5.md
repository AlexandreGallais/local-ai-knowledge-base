---
title: "UTF8Encoding class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/UTF8Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UTF8Encoding class (part 5 of 5)

## UTF8Encoding.GetString(Byte[], Int32, Int32) method

```csharp
public override string GetString (byte[] bytes, int index, int count);
```

Decodes a range of bytes from a byte array into a string.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `index`: The index of the first byte to decode.
- `count`: The number of bytes to decode.

Returns: A `String` containing the results of decoding the specified sequence of bytes.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` and `count` do not denote a valid range in `bytes`.
- `ArgumentException`: Error detection is enabled, and `bytes` contains an invalid sequence of bytes.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
With error detection, an invalid sequence causes this method to throw an `ArgumentException` exception. Without error detection, invalid sequences are ignored, and no exception is thrown.

If the range of bytes to be decoded includes the byte order mark (BOM) and the byte array was returned by a method of a non-BOM aware type, the character U+FFFE is included in the character array returned by this method. You can remove it by calling the `String.TrimStart` method.

Data to be converted, such as data read from a stream, might be available only in sequential blocks. In this case, or if the amount of data is so large that it needs to be divided into smaller blocks, use the `Decoder` or the `Encoder` provided by the `UTF8Encoding.GetDecoder` method or the `UTF8Encoding.GetEncoder` method, respectively.

#### Examples
The following example initializes an array by calling the `UTF8Encoding.GetByteCount` method to determine exactly how many bytes are required for an encoded string and then adding the size of the byte order mark (BOM). The example then calls the `UTF8Encoding.GetPreamble` method to store the BOM to the array before calling the `UTF8Encoding.GetBytes` method to store the encoded bytes to the array. The example then calls the `UTF8Encoding.GetString` method to decode the string.

_Code sample not included: ~/snippets/csharp/System.Text/UnicodeEncoding/GetString/getstring1.cs._

Note that in this case the decoded string differs from the original string, since it begins with a 16-bit byte order mark U+FFFD. This means that the two strings will compare as unequal, and that if the string is output, the BOM will be displayed as the replacement character "?". To remove the BOM at the beginning of the string, you can call the `String.TrimStart` method.

## UTF8Encoding.TryGetBytes(Char>, Byte>, Int32) method

```csharp
public override bool TryGetBytes (ReadOnlySpan<char> chars, Span<byte> bytes, out int bytesWritten);
```

Encodes into a span of bytes a set of characters from the specified read-only span if the destination is large enough.

Parameters:

- `chars`: The span containing the set of characters to encode.
- `bytes`: The byte span to hold the encoded bytes.
- `bytesWritten`: Upon successful completion of the operation, the number of bytes encoded into `bytes`.

Returns: `true` if all of the characters were encoded into the destination; `false` if the destination was too small to contain all the encoded bytes.

To be added.

## UTF8Encoding.TryGetChars(Byte>, Char>, Int32) method

```csharp
public override bool TryGetChars (ReadOnlySpan<byte> bytes, Span<char> chars, out int charsWritten);
```

Decodes into a span of chars a set of bytes from the specified read-only span if the destination is large enough.

Parameters:

- `bytes`: A read-only span containing the sequence of bytes to decode.
- `chars`: The character span receiving the decoded bytes.
- `charsWritten`: Upon successful completion of the operation, the number of chars decoded into `chars`.

Returns: `true` if all of the characters were decoded into the destination; `false` if the destination was too small to contain all the decoded chars.

To be added.
