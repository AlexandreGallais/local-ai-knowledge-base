---
title: "Encoding class (part 3 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoding class (part 3 of 14)

- UTF-16 big endian byte order: 00 41
- UTF-16 little endian byte order: 41 00
- UTF-32 big endian byte order: 00 00 00 41
- UTF-32 little endian byte order: 41 00 00 00

It is generally more efficient to store Unicode characters using the native byte order. For example, it is better to use the little endian byte order on little endian platforms, such as Intel computers.

The `Encoding.GetPreamble` method retrieves an array of bytes that includes the byte order mark (BOM). If this byte array is prefixed to an encoded stream, it helps the decoder to identify the encoding format used.

For more information on byte order and the byte order mark, see The Unicode Standard at the Unicode home page.

Note that the encoding classes allow errors to:

- Silently change to a "?" character.
- Use a "best fit" character.
- Change to an application-specific behavior through use of the `EncoderFallback` and `DecoderFallback` classes with the U+FFFD Unicode replacement character.

You should throw an exception on any data stream error. An app either uses a "throwonerror" flag when applicable or uses the `EncoderExceptionFallback` and `DecoderExceptionFallback` classes. Best fit fallback is often not recommended because it can cause data loss or confusion and is slower than simple character replacements. For ANSI encodings, the best fit behavior is the default.

The following example converts a string from one encoding to another.

> **Note:**
> The `byte[]` array is the only type in this example that contains the encoded data. The .NET `Char` and `String` types are themselves Unicode, so the `Encoding.GetChars` call decodes the data back to Unicode.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/Overview/convert.cs._

## Encoding.Encoding() constructor

```csharp
protected Encoding ();
```

Initializes a new instance of the `Encoding` class.

#### Remarks
Derived classes override this constructor.

## Encoding.Encoding(Int32) constructor

```csharp
protected Encoding (int codePage);
```

Initializes a new instance of the `Encoding` class that corresponds to the specified code page.

Parameters:

- `codePage`: The code page identifier of the preferred encoding.

-or-

0, to use the default encoding.

Exceptions:

- `ArgumentOutOfRangeException`: `codePage` is less than zero.

#### Remarks
Derived classes override this constructor.

Calls to this constructor from a derived class create an `Encoding` object that uses best-fit fallback for both encoding and decoding operations. Both the `Encoding.DecoderFallback` and `Encoding.EncoderFallback` properties are read-only and cannot be modified. To control the fallback strategy for a class derived from `Encoding`, call the `%23ctor` constructor.

## Encoding.Encoding(Int32, EncoderFallback, DecoderFallback) constructor

```csharp
protected Encoding (int codePage, System.Text.EncoderFallback? encoderFallback, System.Text.DecoderFallback? decoderFallback);
```

Initializes a new instance of the `Encoding` class that corresponds to the specified code page with the specified encoder and decoder fallback strategies.

Parameters:

- `codePage`: The encoding code page identifier.
- `encoderFallback`: An object that provides an error-handling procedure when a character cannot be encoded with the current encoding.
- `decoderFallback`: An object that provides an error-handling procedure when a byte sequence cannot be decoded with the current encoding.

Exceptions:

- `ArgumentOutOfRangeException`: `codePage` is less than zero.

#### Remarks
This constructor is `protected`; derived classes override it.

You call this constructor from a derived class to control the fallback encoding and decoding strategies. The `Encoding` class constructors create read-only encoding objects that don't allow encoder or decoder fallback to be set after the object is created.

If either `encoderFallback` or `decoderFallback` is null, best-fit fallback is used as the corresponding fallback strategy.

## Encoding.ASCII property

```csharp
public static System.Text.Encoding ASCII { get; }
```

Gets an encoding for the ASCII (7-bit) character set.

Returns: An encoding for the ASCII (7-bit) character set.

#### Remarks
ASCII characters are limited to the lowest 128 Unicode characters, from U+0000 to U+007F.

When selecting the ASCII encoding for your app, consider the following:

- The ASCII encoding is usually appropriate for protocols that require ASCII.
- If you require 8-bit encoding (which is sometimes incorrectly referred to as "ASCII"), the UTF-8 encoding is recommended over the ASCII encoding. For the characters 0-7F, the results are identical, but use of UTF-8 avoids data loss by allowing representation of all Unicode characters that are representable. Note that the ASCII encoding has an 8th bit ambiguity that can allow malicious use, but the UTF-8 encoding removes ambiguity about the 8th bit.
- Non-ASCII code points fall back during decoding.

The `ASCIIEncoding` object that is returned by this property might not have the appropriate behavior for your app. It uses replacement fallback to replace each string that it cannot encode and each byte that it cannot decode with a question mark ("?") character. Instead, you can call the `GetEncoding` method to instantiate an `ASCIIEncoding` object whose fallback is either an `EncoderFallbackException` or a `DecoderFallbackException`, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/ASCII/encoding.ascii2.cs._

#### Examples

The following example demonstrates the effect of the ASCII encoding on characters that are outside the ASCII range.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/ASCII/ascii.cs._

## Encoding.BigEndianUnicode property

```csharp
public static System.Text.Encoding BigEndianUnicode { get; }
```

Gets an encoding for the UTF-16 format that uses the big endian byte order.

Returns: An encoding object for the UTF-16 format that uses the big endian byte order.

#### Remarks
The `UnicodeEncoding` object that is returned by this property might not have the appropriate behavior for your app. It uses replacement fallback to replace each string that it cannot encode and each byte that it cannot decode with a question mark ("?") character. Instead, you can call the `%23ctor` constructor to instantiate a big endian `UnicodeEncoding` object whose fallback is either an `EncoderFallbackException` or a `DecoderFallbackException`, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/BigEndianUnicode/bigendianunicode1.cs._

The returned `UnicodeEncoding` object has `Encoding.BodyName`, `Encoding.HeaderName`, and `Encoding.WebName` properties, which yield the name "unicodeFFFE". Although the UTF-16 big endian byte order mark is hexadecimal FEFF, the name "unicodeFFFE" was chosen because the byte order mark appears as hexadecimal FFFE on little endian Windows computers.

#### Examples
The following example reads a text file with a UTF-16 encoding using the big endian byte order.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/BigEndianUnicode/bigendianunicode.cs._

The following example determines the number of bytes required to encode a character array, encodes the characters, and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/BigEndianUnicode/getbytes_chararr.cs._

## Encoding.BodyName property

```csharp
public virtual string BodyName { get; }
```

When overridden in a derived class, gets a name for the current encoding that can be used with mail agent body tags.

Returns: A name for the current `Encoding` that can be used with mail agent body tags.

-or-

An empty string (""), if the current `Encoding` cannot be used.

#### Remarks
If you need an encoding for a body name, you should call `Encoding.GetEncoding` with the `BodyName` property. Often the method retrieves a different encoding from the test encoding furnished in the call. Generally only email applications need to retrieve such an encoding; most other applications that need to describe an encoding should use its `Encoding.WebName`.

In some cases, the value of the `BodyName` property corresponds to the international standard that defines that encoding. This doesn't mean that the implementation complies in full with that standard.

#### Examples
The following example retrieves the different names for each encoding and displays the encodings with one or more names that are different from `EncodingInfo.Name`. It displays `Encoding.EncodingName` but does not compare against it.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/BodyName/names.cs._

## Encoding.CodePage property

```csharp
public virtual int CodePage { get; }
```

When overridden in a derived class, gets the code page identifier of the current `Encoding`.

Returns: The code page identifier of the current `Encoding`.

#### Examples
The following example retrieves the different names for each encoding and displays the encodings with one or more names that are different from `EncodingInfo.Name`. It displays `Encoding.EncodingName` but does not compare against it.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/BodyName/names.cs._

## Encoding.DecoderFallback property

```csharp
public System.Text.DecoderFallback DecoderFallback { get; set; }
```

Gets or sets the `DecoderFallback` object for the current `Encoding` object.

Returns: The decoder fallback object for the current `Encoding` object.

Exceptions:

- `ArgumentNullException`: The value in a set operation is `null`.
- `InvalidOperationException`: A value cannot be assigned in a set operation because the current `Encoding` object is read-only.

#### Remarks
The `DecoderFallback` object represents an error handler that is invoked when an encoded byte sequence cannot be decoded into a character. Any one of the following handler types is supported:

- A best-fit fallback handler, which replaces bytes that cannot be decoded with some suitable replacement character.

- A replacement fallback handler, which replaces bytes that cannot be decoded with some arbitrary replacement character. .NET includes one replacement fallback handler, `DecoderFallback`, which by default replaces bytes that cannot be decoded with a question mark ("?") character.

- An exception fallback handler, which throws an exception when bytes cannot be decoded. .NET includes one exception fallback handler, `DecoderExceptionFallback`, which throws a `DecoderFallbackException` when bytes cannot be decoded.

## Encoding.Default property

```csharp
public static System.Text.Encoding Default { get; }
```

Gets the default encoding for this .NET implementation.

Returns: The default encoding for this .NET implementation.

#### Remarks

The `Default` property always returns a `UTF8Encoding` object. This behavior encourages the use of Unicode encodings for better cross-platform compatibility and data integrity.

For the most consistent results across different platforms and .NET implementations, consider using a specific Unicode encoding such as UTF-8 directly instead of relying on the default encoding. You can obtain UTF-8 encoding by calling `UTF8` or `GetEncoding` with "utf-8".

> **Warning:**
> Different computers can use different encodings as the default, and the default encoding can change on a single computer. If you use the `Default` encoding to encode and decode data streamed between computers or retrieved at different times on the same computer, it might translate that data incorrectly. In addition, the encoding returned by the `Default` property uses best-fit fallback to map unsupported characters to characters supported by the code page. For these reasons, using the default encoding is not recommended. To ensure that encoded bytes are decoded properly, you should use a Unicode encoding, such as `UTF8Encoding` or `UnicodeEncoding`. You could also use a higher-level protocol to ensure that the same format is used for encoding and decoding.

The `Default` property always returns the `UTF8Encoding`. UTF-8 is supported on all the operating systems (Windows, Linux, and macOS) on which .NET apps run.

## Encoding.EncoderFallback property

```csharp
public System.Text.EncoderFallback EncoderFallback { get; set; }
```

Gets or sets the `EncoderFallback` object for the current `Encoding` object.

Returns: The encoder fallback object for the current `Encoding` object.

Exceptions:

- `ArgumentNullException`: The value in a set operation is `null`.
- `InvalidOperationException`: A value cannot be assigned in a set operation because the current `Encoding` object is read-only.

#### Remarks
The `EncoderFallback` object represents an error handler that is invoked when a character cannot be converted into an encoded byte sequence. Any one of the following handler types is supported:

- A best-fit fallback handler, which replaces characters that cannot be encoded with some suitable replacement character.

- A replacement fallback handler, which replaces characters that cannot be encoded with some arbitrary replacement character. .NET includes one replacement fallback handler, `EncoderFallback`, which by default replaces characters that cannot be encoded with a question mark ("?") character.

- An exception fallback handler, which throws an exception when characters cannot be encoded. .NET includes one exception fallback handler, `EncoderExceptionFallback`, which throws an `EncoderFallbackException` when characters cannot be decoded.

## Encoding.EncodingName property

```csharp
public virtual string EncodingName { get; }
```

When overridden in a derived class, gets the human-readable description of the current encoding.

Returns: The human-readable description of the current `Encoding`.

#### Remarks
The `EncodingName` property is intended for display. To find a name that can be passed to the `Encoding.GetEncoding` method, use the `WebName` property.

#### Examples
The following example retrieves the different names for each encoding and displays the encodings with one or more names that are different from `EncodingInfo.Name`. It displays `Encoding.EncodingName` but does not compare against it.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/BodyName/names.cs._
