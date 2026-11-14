---
title: "Encoding class (part 13 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoding class (part 13 of 14)

## Encoding.GetPreamble() method

```csharp
public virtual byte[] GetPreamble ();
```

When overridden in a derived class, returns a sequence of bytes that specifies the encoding used.

Returns: A byte array containing a sequence of bytes that specifies the encoding used.

-or-

A byte array of length zero, if a preamble is not required.

#### Remarks
Optionally, the `Encoding` object provides a preamble that is an array of bytes that can be prefixed to the sequence of bytes resulting from the encoding process. If the preamble contains a byte order mark (in Unicode, code point U+FEFF), it helps the decoder determine the byte order and the transformation format or UTF.

The Unicode byte order mark (BOM) is serialized as follows (in hexadecimal):

- UTF-8: EF BB BF

- UTF-16 big endian byte order: FE FF

- UTF-16 little endian byte order: FF FE

- UTF-32 big endian byte order: 00 00 FE FF

- UTF-32 little endian byte order: FF FE 00 00

You should use the BOM, because it provides nearly certain identification of an encoding for files that otherwise have lost reference to the `Encoding` object, for example, untagged or improperly tagged web data or random text files stored when a business did not have international concerns or other data. Often user problems might be avoided if data is consistently and properly tagged, preferably in UTF-8 or UTF-16.

For standards that provide an encoding type, a BOM is somewhat redundant. However, it can be used to help a server send the correct encoding header. Alternatively, it can be used as a fallback in case the encoding is otherwise lost.

There are some disadvantages to using a BOM. For example, knowing how to limit the database fields that use a BOM can be difficult. Concatenation of files can be a problem also, for example, when files are merged in such a way that an unnecessary character can end up in the middle of data. In spite of the few disadvantages, however, the use of a BOM is highly recommended.

For more information on byte order and the byte order mark, see The Unicode Standard at the Unicode home page.

> **Caution:**
> To ensure that the encoded bytes are decoded properly, you should prefix encoded bytes with a preamble. However, most encodings do not provide a preamble. To ensure that the encoded bytes are decoded properly, you should use a Unicode encoding, that is, `UTF8Encoding`, `UnicodeEncoding`, or `UTF32Encoding`, with a preamble.

#### Examples
The following example determines the byte order of the encoding based on the preamble.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetPreamble/preamble.cs._

## Encoding.GetString(Byte[]) method

```csharp
public virtual string GetString (byte[] bytes);
```

When overridden in a derived class, decodes all the bytes in the specified byte array into a string.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.

Returns: A string that contains the results of decoding the specified sequence of bytes.

Exceptions:

- `ArgumentException`: The byte array contains invalid Unicode code points.
- `ArgumentNullException`: `bytes` is `null`.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
If the data to be converted is available only in sequential blocks (such as data read from a stream) or if the amount of data is so large that it needs to be divided into smaller blocks, you should use the `Decoder` object returned by the `Encoding.GetDecoder` method of a derived class.

See the Remarks section of the `Encoding.GetChars` reference topic for a discussion of decoding techniques and considerations.

Note that the precise behavior of the `Encoding.GetString` method for a particular `Encoding` implementation depends on the fallback strategy defined for that `Encoding` object. For more information, see the "Choosing a Fallback Strategy" section of the Character Encoding in .NET topic.

#### Examples
The following example reads a UTF-8 encoded string from a binary file represented by a `FileStream` object. For files that are smaller than 2,048 bytes, it reads the contents of the entire file into a byte array and calls the `GetString` method to perform the decoding. For larger files, it reads 2,048 bytes at a time into a byte array, calls the `GetCharCount` method to determine how many characters are contained in the array, and then calls the `GetChars` method to perform the decoding.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetString/getstring1.cs._

The example uses the following text, which should be saved to a UTF-8 encoded file named Utf8Example.txt.

```txt
This is a UTF-8-encoded file that contains primarily Latin text, although it
does list the first twelve letters of the Russian (Cyrillic) alphabet:

А б в г д е ё ж з и й к

The goal is to save this file, then open and decode it as a binary stream.
```

## Encoding.GetString(Byte>) method

```csharp
public string GetString (ReadOnlySpan<byte> bytes);
```

When overridden in a derived class, decodes all the bytes in the specified byte span into a string.

Parameters:

- `bytes`: A read-only byte span to decode to a Unicode string.

Returns: A string that contains the decoded bytes from the provided read-only span.

#### Remarks
The `Encoding.GetString` method is designed to optimize performance. Instead of creating a managed byte array and then decoding it, you can instead call this method without having to create any intermediate objects.

If the data to be converted is available only in sequential blocks (such as data read from a stream) or if the amount of data is so large that it needs to be divided into smaller blocks, you should use the `Decoder` object returned by the `Encoding.GetDecoder` method of a derived class.

See the Remarks section of the `Encoding.GetChars` reference topic for a discussion of decoding techniques and considerations.

Note that the precise behavior of the `Encoding.GetString` method for a particular `Encoding` implementation depends on the fallback strategy defined for that `Encoding` object. For more information, see the "Choosing a Fallback Strategy" section of the Character Encoding in .NET topic.

## Encoding.GetString(Byte*, Int32) method

```csharp
public string GetString (byte* bytes, int byteCount);
```

When overridden in a derived class, decodes a specified number of bytes starting at a specified address into a string.

Parameters:

- `bytes`: A pointer to a byte array.
- `byteCount`: The number of bytes to decode.

Returns: A string that contains the results of decoding the specified sequence of bytes.

Exceptions:

- `ArgumentNullException`: `bytes` is a null pointer.
- `ArgumentOutOfRangeException`: `byteCount` is less than zero.
- `DecoderFallbackException`: A fallback occurred (see Character Encoding in .NET for a complete explanation)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
The `Encoding.GetString` method is designed to optimize performance when you have a native pointer to a byte array. Instead of creating a managed byte array and then decoding it, you can instead call this method without having to create any intermediate objects.

If the data to be converted is available only in sequential blocks (such as data read from a stream) or if the amount of data is so large that it needs to be divided into smaller blocks, you should use the `Decoder` object returned by the `Encoding.GetDecoder` method of a derived class.

See the Remarks section of the `Encoding.GetChars` reference topic for a discussion of decoding techniques and considerations.

Note that the precise behavior of the `Encoding.GetString` method for a particular `Encoding` implementation depends on the fallback strategy defined for that `Encoding` object. For more information, see the "Choosing a Fallback Strategy" section of the Character Encoding in .NET topic.

## Encoding.GetString(Byte[], Int32, Int32) method

```csharp
public virtual string GetString (byte[] bytes, int index, int count);
```

When overridden in a derived class, decodes a sequence of bytes from the specified byte array into a string.

Parameters:

- `bytes`: The byte array containing the sequence of bytes to decode.
- `index`: The index of the first byte to decode.
- `count`: The number of bytes to decode.

Returns: A string that contains the results of decoding the specified sequence of bytes.

Exceptions:

- `ArgumentException`: The byte array contains invalid Unicode code points.
- `ArgumentNullException`: `bytes` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` and `count` do not denote a valid range in `bytes`.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.

#### Remarks
If the data to be converted is available only in sequential blocks (such as data read from a stream) or if the amount of data is so large that it needs to be divided into smaller blocks, you should use the `Decoder` or the `Encoder` provided by the `Encoding.GetDecoder` method or the `Encoding.GetEncoder` method, respectively, of a derived class.

See the Remarks section of the `Encoding.GetChars` reference topic for a discussion of decoding techniques and considerations.

#### Examples
The following example reads a UTF-8 encoded string from a binary file that is represented by a `FileStream` object. For files that are smaller than 2,048 bytes, it reads the contents of the entire file into a byte array and calls the `GetString` method to perform the decoding. For larger files, it reads 2,048 bytes at a time into a byte array, calls the `GetCharCount` method to determine how many characters are contained in the array, and then calls the `GetChars` method to perform the decoding.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetString/getstring2.cs._

The example uses the following text, which should be saved to a UTF-8 encoded file named Utf8Example.txt.

```txt
This is a UTF-8-encoded file that contains primarily Latin text, although it
does list the first twelve letters of the Russian (Cyrillic) alphabet:

А б в г д е ё ж з и й к

The goal is to save this file, then open and decode it as a binary stream.
```

## Encoding.IsAlwaysNormalized() method

```csharp
public bool IsAlwaysNormalized ();
```

Gets a value indicating whether the current encoding is always normalized, using the default normalization form.

Returns: `true` if the current `Encoding` is always normalized; otherwise, `false`. The default is `false`.

#### Remarks
The default normalization form is `FormC`, which uses full canonical decomposition, followed by the replacement of sequences with their primary composites, if possible.

## Encoding.IsAlwaysNormalized(NormalizationForm) method

```csharp
public virtual bool IsAlwaysNormalized (System.Text.NormalizationForm form);
```

When overridden in a derived class, gets a value indicating whether the current encoding is always normalized, using the specified normalization form.

Parameters:

- `form`: One of the `NormalizationForm` values.

Returns: `true` if the current `Encoding` object is always normalized using the specified `NormalizationForm` value; otherwise, `false`. The default is `false`.

#### Remarks
The default normalization form is `FormC`, which uses full canonical decomposition, followed by the replacement of sequences with their primary composites, if possible.

## Encoding.RegisterProvider(EncodingProvider) method

```csharp
public static void RegisterProvider (System.Text.EncodingProvider provider);
```

Registers an encoding provider.

Parameters:

- `provider`: A subclass of `EncodingProvider` that provides access to additional character encodings.

Exceptions:

- `ArgumentNullException`: `provider` is `null`.

#### Remarks
The `Encoding.RegisterProvider` method allows you to register a class derived from `EncodingProvider` that makes character encodings available on a platform that does not otherwise support them. Once the encoding provider is registered, the encodings that it supports can be retrieved by calling any `Encoding.GetEncoding` overload. If there are multiple encoding providers, the `Encoding.GetEncoding` method attempts to retrieve a specified encoding from each provider starting with the one most recently registered.

Registering an encoding provider by using the `Encoding.RegisterProvider` method also affects the behavior of `GetEncoding` when passed an argument of `0`. The default behavior for `GetEncoding` with `codepage` 0 is to return UTF-8:

- **If the registered provider is `CodePagesEncodingProvider`**:
- On **Windows**, `GetEncoding` with `codepage` 0 returns the encoding that matches the system's active code page.
- On **non-Windows platforms**, it still returns UTF-8.
- **If a custom encoding provider is registered**: The provider can choose which encoding to return when `GetEncoding` is passed an argument of `0`. The provider can also choose to not handle this case by returning `null` from its `EncodingProvider.GetEncoding` method, in which case the default UTF-8 behavior is used.

If multiple providers are registered, `GetEncoding` attempts to retrieve the encoding from the most recently registered provider first.

.NET includes one encoding provider, `CodePagesEncodingProvider`, that makes additional encodings available.

If the same encoding provider is used in multiple calls to the `Encoding.RegisterProvider` method, only the first method call registers the provider. Subsequent calls are ignored.

If the `Encoding.RegisterProvider` method is called to register multiple providers that handle the same encoding, the last registered provider is the used for all encoding and decoding operations. Any previously registered providers are ignored.

## Encoding.TryGetBytes(Char>, Byte>, Int32) method

```csharp
public virtual bool TryGetBytes (ReadOnlySpan<char> chars, Span<byte> bytes, out int bytesWritten);
```

Encodes into a span of bytes a set of characters from the specified read-only span if the destination is large enough.

Parameters:

- `chars`: The span containing the set of characters to encode.
- `bytes`: The byte span to hold the encoded bytes.
- `bytesWritten`: Upon successful completion of the operation, the number of bytes encoded into `bytes`.

Returns: `true` if all of the characters were encoded into the destination; `false` if the destination was too small to contain all the encoded bytes.

To be added.
