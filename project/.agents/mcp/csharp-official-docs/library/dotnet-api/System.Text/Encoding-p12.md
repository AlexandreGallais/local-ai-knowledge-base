---
title: "Encoding class (part 12 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoding class (part 12 of 14)

## Encoding.GetEncoding(Int32, EncoderFallback, DecoderFallback) method

```csharp
public static System.Text.Encoding GetEncoding (int codepage, System.Text.EncoderFallback encoderFallback, System.Text.DecoderFallback decoderFallback);
```

Returns the encoding associated with the specified code page identifier. Parameters specify an error handler for characters that cannot be encoded and byte sequences that cannot be decoded.

Parameters:

- `codepage`: The code page identifier of the preferred encoding. For a list of possible values, see `Encoding`.

-or-

0 (zero), to use the default encoding.
- `encoderFallback`: An object that provides an error-handling procedure when a character cannot be encoded with the current encoding.
- `decoderFallback`: An object that provides an error-handling procedure when a byte sequence cannot be decoded with the current encoding.

Returns: The encoding that is associated with the specified code page.

Exceptions:

- `ArgumentOutOfRangeException`: `codepage` is less than zero or greater than 65535.
- `ArgumentException`: `codepage` is not supported by the underlying platform.
- `NotSupportedException`: `codepage` is not supported by the underlying platform.

#### Remarks

> **Note:**
> - Some unsupported code pages cause the exception `ArgumentException` to be thrown, whereas others cause `NotSupportedException`. Therefore, your code must catch all exceptions indicated in the Exceptions section.
> - The code page identifier `65000`, which represents UTF-7, isn't supported.

The `Encoding.GetEncoding` method returns the encodings natively supported by .NET. You can call the `Encoding.GetEncodings` method to get an array of `EncodingInfo` objects that contains information about all available encodings.

In addition to the encodings that are natively available on .NET, the `Encoding.GetEncoding` method returns any additional encodings that are made available by registering an `EncodingProvider` object. If the same encoding has been registered by multiple `EncodingProvider` objects, this method returns the last one registered.

You can also supply a value of 0 for the `codepage` argument. The behavior depends on the encoding configuration of the application:

- **No encoding provider registered**: Returns a `UTF8Encoding`, same as `Default`.
- **`CodePagesEncodingProvider` registered**:
- On **Windows**, returns the encoding that matches the system's active code page.
- On **non-Windows platforms**, always returns a `UTF8Encoding`.
- **A different provider registered**: The behavior is determined by that provider. Consult its documentation for details. If multiple providers are registered, the method returns the encoding from the last registered provider that handles a `codepage` argument of 0.

> **Note:**
> The ANSI code pages can be different on different computers and can change on a single computer, leading to data corruption. For this reason, if the active code page is an ANSI code page, encoding and decoding data using the default code page returned by `Encoding.GetEncoding(0)` is not recommended. For the most consistent results, you should use Unicode, such as UTF-8 (code page 65001) or UTF-16, instead of a specific code page.

To get the encoding associated with the active code page, supply a value of 0 for the `codepage` argument.

`Encoding.GetEncoding` returns a cached instance with default settings. You should use the constructors of derived classes to get an instance with different settings. For example, the `UTF32Encoding` class provides a constructor that lets you enable error detection.

#### Examples
The following example demonstrates the `GetEncoding` method.

_Code sample not included: ~/snippets/csharp/System.Text/EncoderReplacementFallback/Overview/fallEncRpl.cs._

## Encoding.GetEncoding(String, EncoderFallback, DecoderFallback) method

```csharp
public static System.Text.Encoding GetEncoding (string name, System.Text.EncoderFallback encoderFallback, System.Text.DecoderFallback decoderFallback);
```

Returns the encoding associated with the specified code page name. Parameters specify an error handler for characters that cannot be encoded and byte sequences that cannot be decoded.

Parameters:

- `name`: The code page name of the preferred encoding. Any value returned by the `Encoding.WebName` property is valid. Possible values are listed in the Name column of the table that appears in the `Encoding` class topic.
- `encoderFallback`: An object that provides an error-handling procedure when a character cannot be encoded with the current encoding.
- `decoderFallback`: An object that provides an error-handling procedure when a byte sequence cannot be decoded with the current encoding.

Returns: The encoding that is associated with the specified code page.

Exceptions:

- `ArgumentException`: `name` is not a valid code page name.

-or-

The code page indicated by `name` is not supported by the underlying platform.

#### Remarks

The `Encoding.GetEncoding` method returns the encodings natively supported by .NET. You can call the `Encoding.GetEncodings` method to get an array of `EncodingInfo` objects that contains information about all available encodings.

In addition to the encodings that are natively available on .NET, the `Encoding.GetEncoding` method returns any additional encodings that are made available by registering an `EncodingProvider` object. If the same encoding has been registered by multiple `EncodingProvider` objects, this method returns the last one registered.

The code page name `utf-7` is not supported.

> **Note:**
> The ANSI code pages can be different on different computers and can change on a single computer, leading to data corruption. For the most consistent results, you should use a Unicode encoding, such as UTF-8 (code page 65001) or UTF-16, instead of a specific code page.

`Encoding.GetEncoding` returns a cached instance with default settings. You should use the constructors of derived classes to get an instance with different settings. For example, the `UTF32Encoding` class provides a constructor that lets you enable error detection.

#### Examples
The following example demonstrates the `GetEncoding` method.

_Code sample not included: ~/snippets/csharp/System.Text/EncoderReplacementFallback/Overview/fallEncRpl.cs._

## Encoding.GetEncodings() method

```csharp
public static System.Text.EncodingInfo[] GetEncodings ();
```

Returns an array that contains all encodings.

Returns: An array that contains all encodings.

#### Remarks
This method returns a list of supported encodings, uniquely distinguished by code page. For a table that lists the supported encodings, see `Encoding`.

> **Note:**
> The list of supported encodings that `Encoding.GetEncodings` returns includes any additional encodings made available by any `EncodingProvider` implementations that were registered by calling `Encoding.RegisterProvider`.

To get a specific encoding, use the `Encoding.GetEncoding` method.

`Encoding.GetEncodings` is sometimes used to present the user with a list of encodings in a File **Save as** dialog box. However, many non-Unicode encodings are either incomplete and translate many characters to "?", or have subtly different behavior on different platforms. Consider using UTF-8 or UTF-16 as the default.

#### Examples
The following example checks the values of the Boolean properties of each encoding.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetEncodings/isprops.cs._

## Encoding.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current instance.

Returns: The hash code for the current instance.

To be added.

## Encoding.GetMaxByteCount(Int32) method

```csharp
public abstract int GetMaxByteCount (int charCount);
```

When overridden in a derived class, calculates the maximum number of bytes produced by encoding the specified number of characters.

Parameters:

- `charCount`: The number of characters to encode.

Returns: The maximum number of bytes produced by encoding the specified number of characters.

Exceptions:

- `ArgumentOutOfRangeException`: `charCount` is less than zero.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
The `charCount` parameter actually specifies the number of `Char` objects that represent the Unicode characters to encode, because .NET internally uses UTF-16 to represent Unicode characters. Consequently, most Unicode characters can be represented by one `Char` object, but a Unicode character represented by a surrogate pair, for example, requires two `Char` objects.

To calculate the exact array size required by `Encoding.GetBytes` to store the resulting bytes, you should use the `Encoding.GetByteCount` method. To calculate the maximum array size, use the `Encoding.GetMaxByteCount` method. The `Encoding.GetByteCount` method generally allows allocation of less memory, while the `Encoding.GetMaxByteCount` method generally executes faster.

`Encoding.GetMaxByteCount` retrieves a worst-case number, including the worst case for the currently selected `EncoderFallback`. If a fallback is chosen with a potentially large string, `Encoding.GetMaxByteCount` retrieves large values, particularly in cases where the worst case for the encoding involves switching modes for every character. For example, this can happen for ISO-2022-JP. For more information, see the blog post What's with Encoding.GetMaxByteCount() and Encoding.GetMaxCharCount()?.

In most cases, this method retrieves reasonable values for small strings. For large strings, you might have to choose between using very large buffers and catching errors in the rare case when a more reasonable buffer is too small. You might also want to consider a different approach using `Encoding.GetByteCount` or `Encoder.Convert`.

When using `Encoding.GetMaxByteCount`, you should allocate the output buffer based on the maximum size of the input buffer. If the output buffer is constrained in size, you might use the `Encoding.Convert` method.

Note that `Encoding.GetMaxByteCount` considers potential leftover surrogates from a previous decoder operation. Because of the decoder, passing a value of 1 to the method retrieves 2 for a single-byte encoding, such as ASCII. You should use the `IsSingleByte` property if this information is necessary.

> **Note:**
> `GetMaxByteCount(N)` is not necessarily the same value as `N* GetMaxByteCount(1)`.

#### Examples
The following example determines the number of bytes required to encode a character array, encodes the characters, and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/BigEndianUnicode/getbytes_chararr.cs._

## Encoding.GetMaxCharCount(Int32) method

```csharp
public abstract int GetMaxCharCount (int byteCount);
```

When overridden in a derived class, calculates the maximum number of characters produced by decoding the specified number of bytes.

Parameters:

- `byteCount`: The number of bytes to decode.

Returns: The maximum number of characters produced by decoding the specified number of bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `byteCount` is less than zero.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `Encoding.GetChars` to store the resulting characters, you should use the `Encoding.GetCharCount` method. To calculate the maximum array size, use the `Encoding.GetMaxCharCount` method. The `Encoding.GetCharCount` method generally allows allocation of less memory, while the `Encoding.GetMaxCharCount` method generally executes faster.

`Encoding.GetMaxCharCount` retrieves a worst-case number, including the worst case for the currently selected `DecoderFallback`. If a fallback is chosen with a potentially large string, `Encoding.GetMaxCharCount` retrieves large values.

In most cases, this method retrieves reasonable numbers for small strings. For large strings, you might have to choose between using very large buffers and catching errors in the rare case that a more reasonable buffer is too small. You might also want to consider a different approach using `Encoding.GetCharCount` or `Decoder.Convert`.

`Encoding.GetMaxCharCount` has no relation to `Encoding.GetBytes`. If you needs a similar function to use with `Encoding.GetBytes`, you should use `Encoding.GetMaxByteCount`.

When using `Encoding.GetMaxCharCount`, you should allocate the output buffer based on the maximum size of the input buffer. If the output buffer is constrained in size, you might use the `Decoder.Convert` method.

Note that `Encoding.GetMaxCharCount` considers the worst case for leftover bytes from a previous encoder operation. For most code pages, passing a value of 0 to this method retrieves values greater than or equal to 1.

> **Note:**
> `GetMaxCharCount(N)` is not necessarily the same value as `N* GetMaxCharCount(1)`.

#### Examples
The following example encodes a string into an array of bytes, and then decodes the bytes into an array of characters.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetCharCount/getchars.cs._
