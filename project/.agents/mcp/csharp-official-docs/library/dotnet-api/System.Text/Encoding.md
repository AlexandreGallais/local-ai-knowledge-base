---
title: "Encoding class (part 1 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoding class

Namespace: `System.Text`

```csharp
public abstract class Encoding : ICloneable
```

Represents a character encoding.

The `Encoding` class represents a character encoding.

Encoding is the process of transforming a set of Unicode characters into a sequence of bytes. In contrast, decoding is the process of transforming a sequence of encoded bytes into a set of Unicode characters. For information about the Unicode Transformation Formats (UTFs) and other encodings supported by `Encoding`, see Character Encoding in .NET.

`Encoding` is intended to operate on Unicode characters instead of arbitrary binary data, such as byte arrays. If you must encode arbitrary binary data into text, you should use a protocol such as uuencode, which is implemented by methods such as `Convert.ToBase64CharArray`.

.NET provides the following implementations of the `Encoding` class to support current Unicode encodings and other encodings:

- `ASCIIEncoding` encodes Unicode characters as single 7-bit ASCII characters. This encoding only supports character values between U+0000 and U+007F. Code page 20127. Also available through the `ASCII` property.

- `UTF7Encoding` encodes Unicode characters using the UTF-7 encoding. This encoding supports all Unicode character values. Code page 65000. Also available through the `UTF7` property.

- `UTF8Encoding` encodes Unicode characters using the UTF-8 encoding. This encoding supports all Unicode character values. Code page 65001. Also available through the `UTF8` property.

- `UnicodeEncoding` encodes Unicode characters using the UTF-16 encoding. Both little endian and big endian byte orders are supported. Also available through the `Unicode` property and the `BigEndianUnicode` property.

- `UTF32Encoding` encodes Unicode characters using the UTF-32 encoding. Both little endian (code page 12000) and big endian (code page 12001) byte orders are supported. Also available through the `UTF32` property.

The `Encoding` class is primarily intended to convert between different encodings and Unicode. Often one of the derived Unicode classes is the correct choice for your app.

Use the `Encoding.GetEncoding` method to obtain other encodings, and call the `Encoding.GetEncodings` method to get a list of all encodings.

#### List of encodings

The following table lists the encodings supported by .NET. It lists each encoding's code page number and the values of the encoding's `Name` and `DisplayName` properties. A check mark in the **.NET support** column indicates that the code page is natively supported by .NET, regardless of the underlying platform. Other encodings are available by using the `CodePagesEncodingProvider` class or by deriving from the `EncodingProvider` class.

> **Note:**
> Code pages whose `Name` property corresponds to an international standard do not necessarily comply in full with that standard.
