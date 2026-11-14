---
title: "Encoding class (part 11 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoding class (part 11 of 14)

## Encoding.GetChars(Byte[], Int32, Int32, Char[], Int32) method

```csharp
public abstract int GetChars (byte[] bytes, int byteIndex, int byteCount, char[] chars, int charIndex);
```

When overridden in a derived class, decodes a sequence of bytes from the specified byte array into the specified character array.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `byteIndex`: The index of the first byte to decode.
- `byteCount`: The number of bytes to decode.
- `chars`: The character array to contain the resulting set of characters.
- `charIndex`: The index at which to start writing the resulting set of characters.

Returns: The actual number of characters written into `chars`.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.

-or-

`chars` is `null`.
- `ArgumentOutOfRangeException`: `byteIndex` or `byteCount` or `charIndex` is less than zero.

-or-

`byteIndex` and `byteCount` do not denote a valid range in `bytes`.

-or-

`charIndex` is not a valid index in `chars`.
- `ArgumentException`: `chars` does not have enough capacity from `charIndex` to the end of the array to accommodate the resulting characters.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `Encoding.GetChars` to store the resulting characters, you should use the `Encoding.GetCharCount` method. To calculate the maximum array size, use the `Encoding.GetMaxCharCount` method. The `Encoding.GetCharCount` method generally allows allocation of less memory, while the `Encoding.GetMaxCharCount` method generally executes faster.

`GetChars` gets characters from an input byte sequence. `Encoding.GetChars` is different than `Decoder.GetChars` because `Encoding` expects discrete conversions, while `Decoder` is designed for multiple passes on a single input stream.

If the data to be converted is available only in sequential blocks (such as data read from a stream) or if the amount of data is so large that it needs to be divided into smaller blocks, you should use the `Decoder` or the `Encoder` provided by the `Encoding.GetDecoder` method or the `Encoding.GetEncoder` method, respectively, of a derived class.

> **Note:**
> This method is intended to operate on Unicode characters, not on arbitrary binary data, such as byte arrays. If you need to encode arbitrary binary data into text, you should use a protocol such as uuencode, which is implemented by methods such as `Convert.ToBase64CharArray`.

The `Encoding.GetCharCount` method determines how many characters result in decoding a sequence of bytes, and the `Encoding.GetChars` method performs the actual decoding. The `Encoding.GetChars` method expects discrete conversions, in contrast to the `Decoder.GetChars` method, which handles multiple passes on a single input stream.

Several versions of `Encoding.GetCharCount` and `Encoding.GetChars` are supported. The following are some programming considerations for use of these methods:

- Your app might need to decode multiple input bytes from a code page and process the bytes using multiple calls. In this case, you probably need to maintain state between calls, because byte sequences can be interrupted when processed in batches. (For example, part of an ISO-2022 shift sequence may end one `Encoding.GetChars` call and continue at the beginning of the next `Encoding.GetChars` call. `Encoding.GetChars` will call the fallback for those incomplete sequences, but `Decoder` will remember those sequences for the next call.)

- If your app handles string outputs, the `Encoding.GetString` method is recommended. Since this method must check string length and allocate a buffer, it is slightly slower, but the resulting `String` type is to be preferred.

- The byte version of `GetChars` allows some fast techniques, particularly with multiple calls to large buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `GetChars` version that supports output character buffers is the best choice.

- Consider using the `Decoder.Convert` method instead of `Encoding.GetCharCount`. The conversion method converts as much data as possible and throws an exception if the output buffer is too small. For continuous decoding of a stream, this method is often the best choice.

#### Examples
The following example converts a string from one encoding to another.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/Overview/convert.cs._

The following example encodes a string into an array of bytes, and then decodes a range of the bytes into an array of characters.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetCharCount/getcharsic.cs._

## Encoding.GetDecoder() method

```csharp
public virtual System.Text.Decoder GetDecoder ();
```

When overridden in a derived class, obtains a decoder that converts an encoded sequence of bytes into a sequence of characters.

Returns: A `Decoder` that converts an encoded sequence of bytes into a sequence of characters.

#### Remarks
The `Decoder.GetChars` method converts sequential blocks of bytes into sequential blocks of characters, in a manner similar to the `Encoding.GetChars` method of this class. However, a `Decoder` maintains state information between calls so it correctly decodes byte sequences that span blocks. The `Decoder` also preserves trailing bytes at the end of data blocks and uses the trailing bytes in the next decoding operation. Therefore, `Encoding.GetDecoder` and `Encoding.GetEncoder` are useful for network transmission and file operations, because those operations often deal with blocks of data instead of a complete data stream.

## Encoding.GetEncoder() method

```csharp
public virtual System.Text.Encoder GetEncoder ();
```

When overridden in a derived class, obtains an encoder that converts a sequence of Unicode characters into an encoded sequence of bytes.

Returns: A `Encoder` that converts a sequence of Unicode characters into an encoded sequence of bytes.

#### Remarks
The `Encoder.GetBytes` method converts sequential blocks of characters into sequential blocks of bytes, in a manner similar to the `Encoding.GetBytes` method of this class. However, a `Encoder` maintains state information between calls so it correctly encodes character sequences that span blocks. The `Encoder` also preserves trailing characters at the end of data blocks and uses the trailing characters in the next encoding operation. For example, a data block might end with an unmatched high surrogate, and the matching low surrogate might be in the next data block. Therefore, `Encoding.GetDecoder` and `Encoding.GetEncoder` are useful for network transmission and file operations, because those operations often deal with blocks of data instead of a complete data stream.

## Encoding.GetEncoding(Int32) method

```csharp
public static System.Text.Encoding GetEncoding (int codepage);
```

Returns the encoding associated with the specified code page identifier.

Parameters:

- `codepage`: The code page identifier of the preferred encoding. For a list of possible values, see `Encoding`.

-or-

0 (zero), to use the default encoding.

Returns: The encoding that is associated with the specified code page.

Exceptions:

- `ArgumentOutOfRangeException`: `codepage` is less than zero or greater than 65535.
- `ArgumentException`: `codepage` is not supported by the underlying platform.
- `NotSupportedException`: `codepage` is not supported by the underlying platform.

#### Remarks
The fallback handler depends on the encoding type of `codepage`. If `codepage` is a code page or double-byte character set (DBCS) encoding, a best-fit fallback handler is used. Otherwise, a replacement fallback handler is used. These fallback handlers may not be appropriate for your app. To specify the fallback handler used by the encoding specified by `codepage`, you can call the `GetEncoding` overload.

In modern .NET, the `Encoding.GetEncoding` method returns the encodings natively supported by .NET. You can call the `Encoding.GetEncodings` method to get an array of `EncodingInfo` objects that contains information about all available encodings.

In addition to the encodings that are natively available, the `Encoding.GetEncoding` method returns any additional encodings that are made available by registering an `EncodingProvider` object. If the same encoding has been registered by multiple `EncodingProvider` objects, this method returns the last one registered.

You can also supply a value of 0 for the `codepage` argument. The behavior depends on the encoding configuration of the application:

- **No encoding provider registered**: Returns a `UTF8Encoding`, same as `Default`.
- **`CodePagesEncodingProvider` registered**:
- On **Windows**, returns the encoding that matches the system's active code page.
- On **non-Windows platforms**, always returns a `UTF8Encoding`.
- **A different provider registered**: The behavior is determined by that provider. Consult its documentation for details. If multiple providers are registered, the method returns the encoding from the last registered provider that handles a `codepage` argument of 0.

> **Note:**
> - Some unsupported code pages cause an `ArgumentException` to be thrown, whereas others cause a `NotSupportedException`. Therefore, your code must catch all exceptions indicated in the Exceptions section.
> - The code page identifier `65000`, which represents UTF-7, is not supported.

> **Note:**
> The ANSI code pages can be different on different computers and can change on a single computer, leading to data corruption. For this reason, if the active code page is an ANSI code page, encoding and decoding data using the default code page returned by `Encoding.GetEncoding(0)` is not recommended. For the most consistent results, you should use a Unicode encoding, such as UTF-8 (code page 65001) or UTF-16, instead of a specific code page.

`Encoding.GetEncoding` returns a cached instance with default settings. You should use the constructors of derived classes to get an instance with different settings. For example, the `UTF32Encoding` class provides a constructor that lets you enable error detection.

#### Examples
The following example gets two instances of the same encoding (one by code page and another by name), and checks their equality.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/Equals/equals.cs._

## Encoding.GetEncoding(String) method

```csharp
public static System.Text.Encoding GetEncoding (string name);
```

Returns the encoding associated with the specified code page name.

Parameters:

- `name`: The code page name of the preferred encoding. Any value returned by the `Encoding.WebName` property is valid. For a list of possible values, see `Encoding`.

Returns: The encoding associated with the specified code page.

Exceptions:

- `ArgumentException`: `name` is not a valid code page name.

-or-

The code page indicated by `name` is not supported by the underlying platform.

#### Remarks
The fallback handler depends on the encoding type of `name`. If `name` is a code page or double-byte character set (DBCS) encoding, a best-fit fallback handler is used. Otherwise, a replacement fallback handler is used. These fallback handlers may not be appropriate for your app. To specify the fallback handler used by the encoding specified by `name`, you can call the `GetEncoding` overload.

The `Encoding.GetEncoding` method returns the encodings natively supported by .NET. You can call the `Encoding.GetEncodings` method to get an array of `EncodingInfo` objects that contains information about all available encodings.

In addition to the encodings that are natively available on .NET, the `Encoding.GetEncoding` method returns any additional encodings that are made available by registering an `EncodingProvider` object. If the same encoding has been registered by multiple `EncodingProvider` objects, this method returns the last one registered.

The code page name `utf-7` is not supported.

> **Note:**
> The ANSI code pages can be different on different computers, or they can be changed for a single computer, leading to data corruption. For the most consistent results, use Unicode, such as UTF-8 (code page 65001) or UTF-16, instead of a specific code page.

`Encoding.GetEncoding` returns a cached instance with default settings. You should use the constructors of derived classes to get an instance with different settings. For example, the `UTF32Encoding` class provides a constructor that lets you enable error detection.

#### Examples
The following example gets two instances of the same encoding (one by code page and another by name), and checks their equality.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/Equals/equals.cs._
