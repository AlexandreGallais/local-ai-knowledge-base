---
title: "How to use character encoding classes in .NET (part 1 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/character-encoding.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to use character encoding classes in .NET

This article explains how to use the classes that .NET provides for encoding and decoding text by using various encoding schemes. The instructions assume you have read Introduction to character encoding in .NET.

## Encoders and decoders

.NET provides encoding classes that encode and decode text by using various encoding systems. For example, the `System.Text.UTF8Encoding` class describes the rules for encoding to, and decoding from, UTF-8. .NET uses UTF-16 encoding (represented by the `System.Text.UnicodeEncoding` class) for `string` instances. Encoders and decoders are available for other encoding schemes.

Encoding and decoding can also include validation. For example, the `System.Text.UnicodeEncoding` class checks all `char` instances in the surrogate range to make sure they're in valid surrogate pairs. A fallback strategy determines how an encoder handles invalid characters or how a decoder handles invalid bytes.

> **Warning:**
> .NET encoding classes provide a way to store and convert character data. They should not be used to store binary data in string form. Depending on the encoding used, converting binary data to string format with the encoding classes can introduce unexpected behavior and produce inaccurate or corrupted data. To convert binary data to a string form, use the `System.Convert.ToBase64String*` method.

All character encoding classes in .NET inherit from the `System.Text.Encoding` class, which is an abstract class that defines the functionality common to all character encodings. To access the individual encoding objects implemented in .NET, do the following:

- Use the static properties of the `System.Text.Encoding` class, which return objects that represent the standard character encodings available in .NET (ASCII, UTF-7, UTF-8, UTF-16, and UTF-32). For example, the `System.Text.Encoding.Unicode` property returns a `System.Text.UnicodeEncoding` object. Each object uses replacement fallback to handle strings that it cannot encode and bytes that it cannot decode. For more information, see Replacement fallback.

- Call the encoding's class constructor. Objects for the ASCII, UTF-7, UTF-8, UTF-16, and UTF-32 encodings can be instantiated in this way. By default, each object uses replacement fallback to handle strings that it cannot encode and bytes that it cannot decode, but you can specify that an exception should be thrown instead. For more information, see Replacement fallback and Exception fallback.

- Call the `System.Text.Encoding.#ctor(System.Int32)` constructor and pass it an integer that represents the encoding. Standard encoding objects use replacement fallback, and code page and double-byte character set (DBCS) encoding objects use best-fit fallback to handle strings that they cannot encode and bytes that they cannot decode. For more information, see Best-fit fallback.

- Call the `System.Text.Encoding.GetEncoding*` method, which returns any standard, code page, or DBCS encoding available in .NET. Overloads let you specify a fallback object for both the encoder and the decoder.

You can retrieve information about all the encodings available in .NET by calling the `System.Text.Encoding.GetEncodings*` method. .NET supports the character encoding schemes listed in the following table.

| Encoding class | Description |
| -- | -- |
| ASCII | Encodes a limited range of characters by using the lower seven bits of a byte. Because this encoding only supports character values from `U+0000` through `U+007F`, in most cases it is inadequate for internationalized applications. |
| UTF-7 | Represents characters as sequences of 7-bit ASCII characters. Non-ASCII Unicode characters are represented by an escape sequence of ASCII characters. UTF-7 supports protocols such as email and newsgroup. However, UTF-7 is not particularly secure or robust. In some cases, changing one bit can radically alter the interpretation of an entire UTF-7 string. In other cases, different UTF-7 strings can encode the same text. For sequences that include non-ASCII characters, UTF-7 requires more space than UTF-8, and encoding/decoding is slower. Consequently, you should use UTF-8 instead of UTF-7 if possible. |
| UTF-8 | Represents each Unicode code point as a sequence of one to four bytes. UTF-8 supports 8-bit data sizes and works well with many existing operating systems. For the ASCII range of characters, UTF-8 is identical to ASCII encoding and allows a broader set of characters. However, for Chinese-Japanese-Korean (CJK) scripts, UTF-8 can require three bytes for each character, and can cause larger data sizes than UTF-16. Sometimes the amount of ASCII data, such as HTML tags, justifies the increased size for the CJK range. |
| UTF-16 | Represents each Unicode code point as a sequence of one or two 16-bit integers. Most common Unicode characters require only one UTF-16 code point, although Unicode supplementary characters (U+10000 and greater) require two UTF-16 surrogate code points. Both little-endian and big-endian byte orders are supported. UTF-16 encoding is used by the common language runtime to represent `System.Char` and `System.String` values, and it is used by the Windows operating system to represent `WCHAR` values. |
| UTF-32 | Represents each Unicode code point as a 32-bit integer. Both little-endian and big-endian byte orders are supported. UTF-32 encoding is used when applications want to avoid the surrogate code point behavior of UTF-16 encoding on operating systems for which encoded space is too important. Single glyphs rendered on a display can still be encoded with more than one UTF-32 character. |
| ANSI/ISO encoding | Provides support for a variety of code pages. On Windows operating systems, code pages are used to support a specific language or group of languages. For a table that lists the code pages supported by .NET, see the `System.Text.Encoding` class. You can retrieve an encoding object for a particular code page by calling the `System.Text.Encoding.GetEncoding(System.Int32)` method. A code page contains 256 code points and is zero-based. In most code pages, code points 0 through 127 represent the ASCII character set, and code points 128 through 255 differ significantly between code pages. For example, code page 1252 provides the characters for Latin writing systems, including English, German, and French. The last 128 code points in code page 1252 contain the accent characters. Code page 1253 provides character codes that are required in the Greek writing system. The last 128 code points in code page 1253 contain the Greek characters. As a result, an application that relies on ANSI code pages cannot store Greek and German in the same text stream unless it includes an identifier that indicates the referenced code page. |
| Double-byte character set (DBCS) encodings | Supports languages, such as Chinese, Japanese, and Korean, that contain more than 256 characters. In a DBCS, a pair of code points (a double byte) represents each character. The `System.Text.Encoding.IsSingleByte` property returns `false` for DBCS encodings. You can retrieve an encoding object for a particular DBCS by calling the `System.Text.Encoding.GetEncoding(System.Int32)` method. When an application handles DBCS data, the first byte of a DBCS character (the lead byte) is processed in combination with the trail byte that immediately follows it. Because a single pair of double-byte code points can represent different characters depending on the code page, this scheme still does not allow for the combination of two languages, such as Japanese and Chinese, in the same data stream. |

These encodings enable you to work with Unicode characters as well as with encodings that are most commonly used in legacy applications. In addition, you can create a custom encoding by defining a class that derives from `System.Text.Encoding` and overriding its members.

## .NET Core encoding support

By default, .NET Core does not make available any code page encodings other than code page 28591 and the Unicode encodings, such as UTF-8 and UTF-16. However, you can add the code page encodings found in standard Windows apps that target .NET to your app. For more information, see the `System.Text.CodePagesEncodingProvider` topic.

## Selecting an Encoding Class

If you have the opportunity to choose the encoding to be used by your application, you should use a Unicode encoding, preferably either `System.Text.UTF8Encoding` or `System.Text.UnicodeEncoding`. (.NET also supports a third Unicode encoding, `System.Text.UTF32Encoding`.)

If you are planning to use an ASCII encoding (`System.Text.ASCIIEncoding`), choose `System.Text.UTF8Encoding` instead. The two encodings are identical for the ASCII character set, but `System.Text.UTF8Encoding` has the following advantages:

- It can represent every Unicode character, whereas `System.Text.ASCIIEncoding` supports only the Unicode character values between U+0000 and U+007F.

- It provides error detection and better security.

- It has been tuned to be as fast as possible and should be faster than any other encoding. Even for content that is entirely ASCII, operations performed with `System.Text.UTF8Encoding` are faster than operations performed with `System.Text.ASCIIEncoding`.

You should consider using `System.Text.ASCIIEncoding` only for legacy applications. However, even for legacy applications, `System.Text.UTF8Encoding` might be a better choice for the following reasons (assuming default settings):

- If your application has content that is not strictly ASCII and encodes it with `System.Text.ASCIIEncoding`, each non-ASCII character encodes as a question mark (?). If the application then decodes this data, the information is lost.

- If your application has content that is not strictly ASCII and encodes it with `System.Text.UTF8Encoding`, the result seems unintelligible if interpreted as ASCII. However, if the application then uses a UTF-8 decoder to decode this data, the data performs a round trip successfully.

In a web application, characters sent to the client in response to a web request should reflect the encoding used on the client. In most cases, you should set the `System.Web.HttpResponse.ContentEncoding` property to the value returned by the `System.Web.HttpRequest.ContentEncoding` property to display text in the encoding that the user expects.
