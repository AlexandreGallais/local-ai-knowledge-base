---
title: "Encoding class (part 4 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoding class (part 4 of 14)

## Encoding.HeaderName property

```csharp
public virtual string HeaderName { get; }
```

When overridden in a derived class, gets a name for the current encoding that can be used with mail agent header tags.

Returns: A name for the current `Encoding` to use with mail agent header tags.

-or-

An empty string (""), if the current `Encoding` cannot be used.

#### Remarks
If you need an encoding for a header name, you should call the `Encoding.GetEncoding` method with the `HeaderName` property. Often the method retrieves a different encoding from the test encoding furnished in the call. Generally only email applications need to retrieve such an encoding.

In some cases, the value of the `BodyName` property corresponds to the international standard that defines that encoding. This doesn't mean that the implementation complies in full with that standard.

Note that `Encoding.WebName` returns the name to use to describe an encoding. The `HeaderName` property defines a different encoding that might work better for an email application, for example. However, use of the property to define the encoding is not recommended.

#### Examples
The following example retrieves the different names for each encoding and displays the encodings with one or more names that are different from `EncodingInfo.Name`. It displays `Encoding.EncodingName` but does not compare against it.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/BodyName/names.cs._

## Encoding.IsBrowserDisplay property

```csharp
public virtual bool IsBrowserDisplay { get; }
```

When overridden in a derived class, gets a value indicating whether the current encoding can be used by browser clients for displaying content.

Returns: `true` if the current `Encoding` can be used by browser clients for displaying content; otherwise, `false`.

#### Examples
The following example checks the values of the Boolean properties of each encoding.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetEncodings/isprops.cs._

## Encoding.IsBrowserSave property

```csharp
public virtual bool IsBrowserSave { get; }
```

When overridden in a derived class, gets a value indicating whether the current encoding can be used by browser clients for saving content.

Returns: `true` if the current `Encoding` can be used by browser clients for saving content; otherwise, `false`.

#### Examples
The following example checks the values of the Boolean properties of each encoding.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetEncodings/isprops.cs._

## Encoding.IsMailNewsDisplay property

```csharp
public virtual bool IsMailNewsDisplay { get; }
```

When overridden in a derived class, gets a value indicating whether the current encoding can be used by mail and news clients for displaying content.

Returns: `true` if the current `Encoding` can be used by mail and news clients for displaying content; otherwise, `false`.

#### Examples
The following example checks the values of the Boolean properties of each encoding.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetEncodings/isprops.cs._

## Encoding.IsMailNewsSave property

```csharp
public virtual bool IsMailNewsSave { get; }
```

When overridden in a derived class, gets a value indicating whether the current encoding can be used by mail and news clients for saving content.

Returns: `true` if the current `Encoding` can be used by mail and news clients for saving content; otherwise, `false`.

#### Examples
The following example checks the values of the Boolean properties of each encoding.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetEncodings/isprops.cs._

## Encoding.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

When overridden in a derived class, gets a value indicating whether the current encoding is read-only.

Returns: `true` if the current `Encoding` is read-only; otherwise, `false`. The default is `true`.

To be added.

## Encoding.IsSingleByte property

```csharp
public virtual bool IsSingleByte { get; }
```

When overridden in a derived class, gets a value indicating whether the current encoding uses single-byte code points.

Returns: `true` if the current `Encoding` uses single-byte code points; otherwise, `false`.

#### Remarks
For a single-byte encoding, for example, `ASCIIEncoding`, this property retrieves `true`.

> **Caution:**
> You should be careful in what your application does with the value for `Encoding.IsSingleByte`. An assumption of how an Encoding will proceed may still be wrong. For example, Windows-1252 has a value of `true` for `Encoding.IsSingleByte`, but Encoding.GetMaxByteCount(1) returns 2. This is because the method considers potential leftover surrogates from a previous decoder operation.

#### Examples
The following example checks the values of the Boolean properties of each encoding.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetEncodings/isprops.cs._

## Encoding.Latin1 property

```csharp
public static System.Text.Encoding Latin1 { get; }
```

Gets an encoding for the Latin1 character set (ISO-8859-1).

Returns: To be added.

To be added.

## Encoding.Preamble property

```csharp
public virtual ReadOnlySpan<byte> Preamble { get; }
```

When overridden in a derived class, returns a span containing the sequence of bytes that specifies the encoding used.

Returns: A byte span containing a sequence of bytes that specifies the encoding used, or a span of length zero, if a preamble is not required.

#### Remarks
Optionally, the `Encoding` object provides a preamble that is an sequence of bytes that can be prefixed to the bytes resulting from the encoding process. If the preamble contains a byte order mark (in Unicode, code point U+FEFF), it helps the decoder determine the byte order and the transformation format or UTF.

The Unicode byte order mark (BOM) is serialized as follows (in hexadecimal):

- UTF-8: EF BB BF

- UTF-16 big endian byte order: FE FF

- UTF-16 little endian byte order: FF FE

- UTF-32 big endian byte order: 00 00 FE FF

- UTF-32 little endian byte order: FF FE 00 00

You should use the BOM, because it provides nearly certain identification of an encoding for files that otherwise have lost reference to the `Encoding` object, for example, untagged or improperly tagged web data or random text files stored when a business did not have international concerns or other data. Often user problems might be avoided if data is consistently and properly tagged, preferably in UTF-8 or UTF-16.

For standards that provide an encoding type, a BOM is somewhat redundant. However, it can be used to help a server send the correct encoding header. Alternatively, it can be used as a fallback in case the encoding is otherwise lost.

There are some disadvantages to using a BOM. For example, knowing how to limit the database fields that use a BOM can be difficult. Concatenation of files can be a problem also, for example, when files are merged in such a way that an unnecessary character can end up in the middle of data. Despite the few disadvantages, however, the use of a BOM is highly recommended.

For more information on byte order and the byte order mark, see The Unicode Standard at the Unicode home page.

> **Caution:**
> To ensure that the encoded bytes are decoded properly, you should prefix encoded bytes with a preamble. However, most encodings do not provide a preamble. To ensure that the encoded bytes are decoded properly, you should use a Unicode encoding, that is, `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding`, with a preamble.

## Encoding.Unicode property

```csharp
public static System.Text.Encoding Unicode { get; }
```

Gets an encoding for the UTF-16 format using the little endian byte order.

Returns: An encoding for the UTF-16 format using the little endian byte order.

#### Remarks
For information about the encodings supported by .NET and a discussion of which Unicode encoding to use, see Character Encoding in .NET.

The `UnicodeEncoding` object that is returned by this property may not have the appropriate behavior for your app. It uses replacement fallback to replace each string that it cannot encode and each byte that it cannot decode with a question mark ("?") character. Instead, you can call the `%23ctor` constructor to instantiate a little endian `UnicodeEncoding` object whose fallback is either an `EncoderFallbackException` or a `DecoderFallbackException`, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/Unicode/unicode1.cs._

#### Examples
The following example determines the number of bytes required to encode a character array, encodes the characters, and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/BigEndianUnicode/getbytes_chararr.cs._

## Encoding.UTF32 property

```csharp
public static System.Text.Encoding UTF32 { get; }
```

Gets an encoding for the UTF-32 format using the little endian byte order.

Returns: An encoding object for the UTF-32 format using the little endian byte order.

#### Remarks
The `UTF32Encoding` object that is returned by this property may not have the appropriate behavior for your app. It uses replacement fallback to replace each string that it cannot encode and each byte that it cannot decode with the Unicode REPLACEMENT CHARACTER (U+FFFE). Instead, you can call the `%23ctor` constructor to instantiate a `UTF32Encoding` object whose fallback is either an `EncoderFallbackException` or a `DecoderFallbackException`, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/UTF32/encoding.utf32.1.cs._

For a discussion of little endian byte order, see `Encoding`.

For information about the encodings supported by .NET and a discussion of which Unicode encoding to use, see Character Encoding in .NET.

#### Examples
The following example determines the number of bytes required to encode a character array, encodes the characters, and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/BigEndianUnicode/getbytes_chararr.cs._

## Encoding.UTF7 property

```csharp
public static System.Text.Encoding UTF7 { get; }
```

Gets an encoding for the UTF-7 format.

Returns: An encoding for the UTF-7 format.

To be added.

## Encoding.UTF8 property

```csharp
public static System.Text.Encoding UTF8 { get; }
```

Gets an encoding for the UTF-8 format.

Returns: An encoding for the UTF-8 format.

#### Remarks
This property returns a `UTF8Encoding` object that encodes Unicode (UTF-16-encoded) characters into a sequence of one to four bytes per character, and that decodes a UTF-8-encoded byte array to Unicode (UTF-16-encoded) characters. For information about the character encodings supported by .NET and a discussion of which Unicode encoding to use, see Character Encoding in .NET.

The `UTF8Encoding` object that is returned by this property might not have the appropriate behavior for your app.

- It returns a `UTF8Encoding` object that provides a Unicode byte order mark (BOM). To instantiate a UTF8 encoding that doesn't provide a BOM, call any overload of the `UTF8Encoding.%23ctor` constructor.

- It returns a `UTF8Encoding` object that uses replacement fallback to replace each string that it can't encode and each byte that it can't decode with a question mark ("?") character. Instead, you can call the `%23ctor` constructor to instantiate a `UTF8Encoding` object whose fallback is either an `EncoderFallbackException` or a `DecoderFallbackException`, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/UTF8/encoding.utf8.1.cs._

#### Examples
The following example defines an array that consists of the following characters:

- LATIN SMALL LETTER Z (U+007A)

- LATIN SMALL LETTER A (U+0061)

- COMBINING BREVE (U+0306)

- LATIN SMALL LETTER AE WITH ACUTE (U+01FD)

- GREEK SMALL LETTER BETA (U+03B2)

- A surrogate pair (U+D800 U+DD54) that forms GREEK ACROPHONIC ATTIC ONE THOUSAND STATERS (U+10154).

It displays the UTF-16 code units of each character and determines the number of bytes required by a UTF-8 encoder to encode the character array. It then encodes the characters and displays the resulting UTF-8-encoded bytes.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/UTF8/example1.cs._

## Encoding.WebName property

```csharp
public virtual string WebName { get; }
```

When overridden in a derived class, gets the name registered with the Internet Assigned Numbers Authority (IANA) for the current encoding.

Returns: The IANA name for the current `Encoding`.

#### Remarks
The `WebName` property is the same as the `Name` property.

Note that `Encoding.WebName` returns an IANA-registered name for the encoding. When its value is the name of a standard, the implementation of the encoding might not conform in full to that standard. The `HeaderName` property defines a different encoding that might work better for email headers. However, most apps should use `Encoding.WebName` instead.

For more information on the IANA, go to www.iana.org.

The `Encoding.WebName` is the same as the `EncodingInfo.Name` returned by `Encoding.GetEncodings`. Some of the web names are duplicates; see the remarks for `Encoding.GetEncodings` for more information.

#### Examples
The following example includes the `Encoding.WebName` in an HTML header.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/WebName/webname.cs._

The following example retrieves the different names for each encoding and displays the encodings with one or more names that are different from `EncodingInfo.Name`. It displays `Encoding.EncodingName` but does not compare against it.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/BodyName/names.cs._

## Encoding.WindowsCodePage property

```csharp
public virtual int WindowsCodePage { get; }
```

When overridden in a derived class, gets the Windows operating system code page that most closely corresponds to the current encoding.

Returns: The Windows operating system code page that most closely corresponds to the current `Encoding`.

#### Remarks
This property is provided for compatibility with the Windows MultiLanguage (MLang) APIs, for example, in determining font families. For globalization, using one of the Unicode encodings is recommended instead. It is also recommended to use `Encoding.WebName` instead of `Encoding.WindowsCodePage` to identify the code page.

#### Examples
The following example determines the Windows code page that most closely corresponds to each encoding.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/WindowsCodePage/codepage.cs._
