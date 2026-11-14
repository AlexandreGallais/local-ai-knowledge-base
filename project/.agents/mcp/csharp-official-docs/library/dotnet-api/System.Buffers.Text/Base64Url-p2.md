---
title: "Base64Url class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers.Text/Base64Url.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Base64Url class (part 2 of 2)

## Base64Url.EncodeToUtf8(Byte>, Byte>, Int32, Int32, Boolean) method

```csharp
public static System.Buffers.OperationStatus EncodeToUtf8 (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesConsumed, out int bytesWritten, bool isFinalBlock = true);
```

Encodes the span of binary data into UTF-8 encoded text represented as Base64Url.

Parameters:

- `source`: The input span which contains binary data that needs to be encoded.
- `destination`: The output span which contains the result of the operation, i.e. the UTF-8 encoded text in Base64Url.
- `bytesConsumed`: When this method returns, contains the number of input bytes consumed during the operation. This can be used to slice the input for subsequent calls, if necessary. This parameter is treated as uninitialized.
- `bytesWritten`: When this method returns, contains the number of bytes written into the output span. This can be used to slice the output for subsequent calls, if necessary. This parameter is treated as uninitialized.
- `isFinalBlock`: `true` when the input span contains the entirety of data to encode; `false` when more data may follow,

such as when calling in a loop, subsequent calls with `false` should end with `true` call. The default is `true`.

Returns: One of the enumeration values that indicates the success or failure of the operation.

This implementation of the Base64Url encoding omits the optional padding characters. The encoding uses '-' and '_' instead of the '+' and '/' characters used in standard Base64 encoding.

## Base64Url.GetEncodedLength(Int32) method

```csharp
public static int GetEncodedLength (int bytesLength);
```

Returns the length (in bytes) of the result if you were to encode binary data within a byte span of size `bytesLength`.

Parameters:

- `bytesLength`: The size of the input span.

Returns: The length (in bytes) of the encoded result.

Exceptions:

- `ArgumentOutOfRangeException`: `bytesLength` is less than 0 or greater than 1610612733.

To be added.

## Base64Url.GetMaxDecodedLength(Int32) method

```csharp
public static int GetMaxDecodedLength (int base64Length);
```

Returns the maximum length (in bytes) of the result if you were to decode base 64 encoded text from a span of size `base64Length`.

Parameters:

- `base64Length`: The size of the input span.

Returns: The maximum length (in bytes) of the decoded result.

Exceptions:

- `ArgumentOutOfRangeException`: The specified `base64Length` is less than 0.

To be added.

## Base64Url.IsValid(Byte>) method

```csharp
public static bool IsValid (ReadOnlySpan<byte> utf8Base64UrlText);
```

Validates that the specified span of UTF-8 text is comprised of valid base-64 encoded data.

Parameters:

- `utf8Base64UrlText`: A span of UTF-8 text to validate.

Returns: `true` if `utf8Base64UrlText` contains a valid, decodable sequence of base-64 encoded data; otherwise, `false`.

where whitespace is defined as the characters ' ', '\t', '\r', or '\n' (as bytes).

## Base64Url.IsValid(Char>) method

```csharp
public static bool IsValid (ReadOnlySpan<char> base64UrlText);
```

Validates that the specified span of text is comprised of valid base-64 encoded data.

Parameters:

- `base64UrlText`: A span of text to validate.

Returns: `true` if `base64UrlText` contains a valid, decodable sequence of base-64 encoded data; otherwise, `false`.

If the method returns `true`, the same text passed to `Base64Url.DecodeFromChars` and

`Base64Url.TryDecodeFromChars` would successfully decode (in the case

of `Base64Url.TryDecodeFromChars` assuming sufficient output space).

Any amount of whitespace is allowed anywhere in the input, where whitespace is defined as the characters ' ', '\t', '\r', or '\n'.

## Base64Url.IsValid(Byte>, Int32) method

```csharp
public static bool IsValid (ReadOnlySpan<byte> utf8Base64UrlText, out int decodedLength);
```

Validates that the specified span of UTF-8 text is comprised of valid base-64 encoded data.

Parameters:

- `utf8Base64UrlText`: A span of UTF-8 text to validate.
- `decodedLength`: If the method returns `true`, the number of decoded bytes that will result from decoding the input UTF-8 text.

Returns: `true` if `utf8Base64UrlText` contains a valid, decodable sequence of base-64 encoded data; otherwise, `false`.

where whitespace is defined as the characters ' ', '\t', '\r', or '\n' (as bytes).

## Base64Url.IsValid(Char>, Int32) method

```csharp
public static bool IsValid (ReadOnlySpan<char> base64UrlText, out int decodedLength);
```

Validates that the specified span of text is comprised of valid base-64 encoded data.

Parameters:

- `base64UrlText`: A span of text to validate.
- `decodedLength`: If the method returns `true`, the number of decoded bytes that will result from decoding the input text.

Returns: `true` if `base64UrlText` contains a valid, decodable sequence of base-64 encoded data; otherwise, `false`.

If the method returns `true`, the same text passed to `Base64Url.DecodeFromChars` and

`Base64Url.TryDecodeFromChars` would successfully decode (in the case

of `Base64Url.TryDecodeFromChars` assuming sufficient output space).

Any amount of whitespace is allowed anywhere in the input, where whitespace is defined as the characters ' ', '\t', '\r', or '\n'.

## Base64Url.TryDecodeFromChars(Char>, Byte>, Int32) method

```csharp
public static bool TryDecodeFromChars (ReadOnlySpan<char> source, Span<byte> destination, out int bytesWritten);
```

Decodes the span of Unicode ASCII chars represented as Base64Url into binary data.

Parameters:

- `source`: The input span which contains ASCII chars in Base64Url that needs to be decoded.
- `destination`: The output span which contains the result of the operation, i.e. the decoded binary data.
- `bytesWritten`: When this method returns, contains the number of bytes written into the output span. This can be used to slice the output for subsequent calls, if necessary. This parameter is treated as uninitialized.

Returns: `true` if bytes decoded successfully; `false` if `destination` is too small.

Exceptions:

- `FormatException`: `source` contains an invalid Base64Url character,

more than two padding characters, or a non white space character among the padding characters.

To be added.

## Base64Url.TryDecodeFromUtf8(Byte>, Byte>, Int32) method

```csharp
public static bool TryDecodeFromUtf8 (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Decodes the span of UTF-8 encoded text represented as Base64Url into binary data.

Parameters:

- `source`: The input span which contains UTF-8 encoded text in Base64Url that needs to be decoded.
- `destination`: The output span which contains the result of the operation, i.e. the decoded binary data.
- `bytesWritten`: When this method returns, contains the number of bytes written into the output span. This can be used to slice the output for subsequent calls, if necessary. This parameter is treated as uninitialized.

Returns: `true` if bytes decoded successfully; `false` if `destination` is too small.

Exceptions:

- `FormatException`: `source` contains an invalid Base64Url character,

more than two padding characters, or a non white space character among the padding characters.

To be added.

## Base64Url.TryEncodeToChars(Byte>, Char>, Int32) method

```csharp
public static bool TryEncodeToChars (ReadOnlySpan<byte> source, Span<char> destination, out int charsWritten);
```

Encodes the span of binary data into Unicode ASCII chars represented as Base64Url.

Parameters:

- `source`: The input span which contains binary data that needs to be encoded.
- `destination`: The output span which contains the result of the operation, i.e. the ASCII chars in Base64Url.
- `charsWritten`: When this method returns, contains the number of chars written into the output span. This can be used to slice the output for subsequent calls, if necessary. This parameter is treated as uninitialized.

Returns: `true` if chars encoded successfully; `false` if `destination` is too small.

This implementation of the Base64Url encoding omits the optional padding characters. The encoding uses '-' and '_' instead of the '+' and '/' characters used in standard Base64 encoding.

## Base64Url.TryEncodeToUtf8(Byte>, Byte>, Int32) method

```csharp
public static bool TryEncodeToUtf8 (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Encodes the span of binary data into UTF-8 encoded chars represented as Base64Url.

Parameters:

- `source`: The input span which contains binary data that needs to be encoded.
- `destination`: The output span which contains the result of the operation, i.e. the UTF-8 encoded text in Base64Url.
- `bytesWritten`: When this method returns, contains the number of chars written into the output span. This can be used to slice the output for subsequent calls, if necessary. This parameter is treated as uninitialized.

Returns: `true` if bytes encoded successfully; `false` if `destination` is too small.

This implementation of the Base64Url encoding omits the optional padding characters. The encoding uses '-' and '_' instead of the '+' and '/' characters used in standard Base64 encoding.

## Base64Url.TryEncodeToUtf8InPlace(Byte>, Int32, Int32) method

```csharp
public static bool TryEncodeToUtf8InPlace (Span<byte> buffer, int dataLength, out int bytesWritten);
```

Encodes the span of binary data (in-place) into UTF-8 encoded text represented as base 64.

The encoded text output is larger than the binary data contained in the input (the operation inflates the data).

Parameters:

- `buffer`: The input span which contains binary data that needs to be encoded.

It needs to be large enough to fit the result of the operation.
- `dataLength`: The amount of binary data contained within the buffer that needs to be encoded

(and needs to be smaller than the buffer length).
- `bytesWritten`: When this method returns, contains the number of bytes written into the buffer. This parameter is treated as uninitialized.

Returns: `true` if bytes encoded successfully; `false` if `buffer` is too small to fit the result.

This implementation of the Base64Url encoding omits the optional padding characters. The encoding uses '-' and '_' instead of the '+' and '/' characters used in standard Base64 encoding.
