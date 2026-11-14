---
title: "Base64 class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers.Text/Base64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Base64 class

Namespace: `System.Buffers.Text`

```csharp
public static class Base64
```

Converts between binary data and UTF-8 encoded text that is represented in base 64.

To be added.

## Base64.DecodeFromChars(Char>) method

```csharp
public static byte[] DecodeFromChars (ReadOnlySpan<char> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## Base64.DecodeFromChars(Char>, Byte>) method

```csharp
public static int DecodeFromChars (ReadOnlySpan<char> source, Span<byte> destination);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.

Returns: To be added.

To be added.

## Base64.DecodeFromChars(Char>, Byte>, Int32, Int32, Boolean) method

```csharp
public static System.Buffers.OperationStatus DecodeFromChars (ReadOnlySpan<char> source, Span<byte> destination, out int charsConsumed, out int bytesWritten, bool isFinalBlock = true);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `charsConsumed`: To be added.
- `bytesWritten`: To be added.
- `isFinalBlock`: To be added.

Returns: To be added.

To be added.

## Base64.DecodeFromUtf8(Byte>) method

```csharp
public static byte[] DecodeFromUtf8 (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## Base64.DecodeFromUtf8(Byte>, Byte>) method

```csharp
public static int DecodeFromUtf8 (ReadOnlySpan<byte> source, Span<byte> destination);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.

Returns: To be added.

To be added.

## Base64.DecodeFromUtf8(Byte>, Byte>, Int32, Int32, Boolean) method

```csharp
public static System.Buffers.OperationStatus DecodeFromUtf8 (ReadOnlySpan<byte> utf8, Span<byte> bytes, out int bytesConsumed, out int bytesWritten, bool isFinalBlock = true);
```

Decodes the span of UTF-8 encoded text represented as base 64 into binary data. If the input is not a multiple of 4, it will decode as much as it can, to the closest multiple of 4.

Parameters:

- `utf8`: The input span that contains UTF-8 encoded text in base 64 that needs to be decoded.
- `bytes`: The output span that contains the result of the operation, that is, the decoded binary data.
- `bytesConsumed`: When this method returns, contains the number of input bytes consumed during the operation. This can be used to slice the input for subsequent calls, if necessary.
- `bytesWritten`: When this method returns, contains the number of bytes written into the output span. This can be used to slice the output for subsequent calls, if necessary.
- `isFinalBlock`: `true` (default) to indicate that the input span contains the entire data to decode. `false` to indicate that the input span contains partial data with more data to follow.

Returns: One of the enumeration values that indicates the status of the decoding operation.

#### Remarks

The return value can be as follows:

- `Done`: Processing of the entire input span succeeded.
- `DestinationTooSmall`: There is not enough space in the output span to write the decoded input.
- `NeedMoreData`: `isFinalBlock` is `false` and the input is not a multiple of 4. Otherwise, the partial input is considered `InvalidData`.
- `InvalidData`: The input contains bytes outside of the expected base 64 range, or is incomplete (that is, not a multiple of 4) and `isFinalBlock` is `true`.

## Base64.DecodeFromUtf8InPlace(Byte>, Int32) method

```csharp
public static System.Buffers.OperationStatus DecodeFromUtf8InPlace (Span<byte> buffer, out int bytesWritten);
```

Decodes the span of UTF-8 encoded text in base 64 (in-place) into binary data. The decoded binary output is smaller than the text data contained in the input (the operation deflates the data). If the input is not a multiple of 4, the method will not decode any data.

Parameters:

- `buffer`: The input span that contains the base-64 text data that needs to be decoded.
- `bytesWritten`: When this method returns, contains the number of bytes written into the buffer.

Returns: One of the enumeration values that indicates the status of the decoding operation.

#### Remarks

The return value can be as follows:

- `Done`: Processing of the entire input span succeeded.
- `InvalidData`: The input contains bytes outside of the expected base 64 range or is incomplete (that is, not a multiple of 4).

This method cannot return the `DestinationTooSmall` and `NeedMoreData` values.

## Base64.EncodeToChars(Byte>) method

```csharp
public static char[] EncodeToChars (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## Base64.EncodeToChars(Byte>, Char>) method

```csharp
public static int EncodeToChars (ReadOnlySpan<byte> source, Span<char> destination);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.

Returns: To be added.

To be added.

## Base64.EncodeToChars(Byte>, Char>, Int32, Int32, Boolean) method

```csharp
public static System.Buffers.OperationStatus EncodeToChars (ReadOnlySpan<byte> source, Span<char> destination, out int bytesConsumed, out int charsWritten, bool isFinalBlock = true);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `bytesConsumed`: To be added.
- `charsWritten`: To be added.
- `isFinalBlock`: To be added.

Returns: To be added.

To be added.

## Base64.EncodeToString(Byte>) method

```csharp
public static string EncodeToString (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## Base64.EncodeToUtf8(Byte>) method

```csharp
public static byte[] EncodeToUtf8 (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## Base64.EncodeToUtf8(Byte>, Byte>) method

```csharp
public static int EncodeToUtf8 (ReadOnlySpan<byte> source, Span<byte> destination);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.

Returns: To be added.

To be added.

## Base64.EncodeToUtf8(Byte>, Byte>, Int32, Int32, Boolean) method

```csharp
public static System.Buffers.OperationStatus EncodeToUtf8 (ReadOnlySpan<byte> bytes, Span<byte> utf8, out int bytesConsumed, out int bytesWritten, bool isFinalBlock = true);
```

Encodes the span of binary data into UTF-8 encoded text represented as base 64.

Parameters:

- `bytes`: The input span that contains binary data that needs to be encoded.
- `utf8`: The output span that contains the result of the operation, that is, the UTF-8 encoded text in base 64.
- `bytesConsumed`: When this method returns, contains the number of input bytes consumed during the operation. This can be used to slice the input for subsequent calls, if necessary.
- `bytesWritten`: When this method returns, contains the number of bytes written into the output span. This can be used to slice the output for subsequent calls, if necessary.
- `isFinalBlock`: `true` (the default) to indicate that the input span contains the entire data to encode. `false` to indicate that the input span contains partial data with more data to follow.

Returns: One of the enumeration values that indicates the status of the encoding operation.

#### Remarks

The return value can be as follows:

- `Done`: Processing of the entire input span succeeded.
- `DestinationTooSmall`: There isn't enough space in the output span to fit the encoded input.
- `NeedMoreData`: `isFinalBlock` is `false`. Otherwise, if `isFinalBlock` is `true`, the output is padded if the input is not a multiple of 3.

This method cannot return `InvalidData` since that is not possible for base-64 encoding.

## Base64.EncodeToUtf8InPlace(Byte>, Int32, Int32) method

```csharp
public static System.Buffers.OperationStatus EncodeToUtf8InPlace (Span<byte> buffer, int dataLength, out int bytesWritten);
```

Encodes the span of binary data (in-place) into UTF-8 encoded text represented as base 64. The encoded text output is larger than the binary data contained in the input (the operation inflates the data).

Parameters:

- `buffer`: The input span that contains binary data that needs to be encoded. Because the method performs an in-place conversion, it needs to be large enough to store the result of the operation.
- `dataLength`: The number of bytes of binary data contained within the buffer that needs to be encoded. This value must be smaller than the buffer length.
- `bytesWritten`: When this method returns, contains the number of bytes written into the buffer.

Returns: One of the enumeration values that indicates the status of the encoding operation.

#### Remarks

The return value can be as follows:

- `Done`: Processing of the entire buffer succeeded.
- `DestinationTooSmall`: There isn't enough space in the buffer beyond `dataLength` to fit the result of encoding the input.

This method cannot return `NeedMoreData` and `InvalidData`.

## Base64.GetEncodedLength(Int32) method

```csharp
public static int GetEncodedLength (int bytesLength);
```

To be added.

Parameters:

- `bytesLength`: To be added.

Returns: To be added.

To be added.

## Base64.GetMaxDecodedFromUtf8Length(Int32) method

```csharp
public static int GetMaxDecodedFromUtf8Length (int length);
```

Returns the maximum length (in bytes) of the result if you were to decode base-64 encoded text within a byte span with the specified length.

Parameters:

- `length`: The size of the byte span.

Returns: The maximum length (in bytes) of the result.

Exceptions:

- `ArgumentOutOfRangeException`: `length` is less than 0.

To be added.

## Base64.GetMaxDecodedLength(Int32) method

```csharp
public static int GetMaxDecodedLength (int base64Length);
```

To be added.

Parameters:

- `base64Length`: To be added.

Returns: To be added.

To be added.

## Base64.GetMaxEncodedToUtf8Length(Int32) method

```csharp
public static int GetMaxEncodedToUtf8Length (int length);
```

Returns the maximum length (in bytes) of the result if you were to encode binary data within a byte span with the specified length.

Parameters:

- `length`: The size of the byte span.

Returns: The maximum length (in bytes) of the result.

Exceptions:

- `ArgumentOutOfRangeException`: `length` is less than 0 or larger than 1610612733 (since encode inflates the data by 4/3).

To be added.

## Base64.IsValid(Byte>) method

```csharp
public static bool IsValid (ReadOnlySpan<byte> base64TextUtf8);
```

Validates that the specified span of UTF-8 text is comprised of valid base-64 encoded data.

Parameters:

- `base64TextUtf8`: A span of UTF-8 text to validate.

Returns: `true` if `base64TextUtf8` contains a valid, decodable sequence of base-64 encoded data; otherwise, `false`.

If the method returns `true`, the same text passed to `Base64.DecodeFromUtf8` and `Base64.DecodeFromUtf8InPlace` would successfully decode. Any amount of whitespace is allowed anywhere in the input, where whitespace is defined as the characters ' ', '\t', '\r', or '\n' (as bytes).

## Base64.IsValid(Char>) method

```csharp
public static bool IsValid (ReadOnlySpan<char> base64Text);
```

Validates that the specified span of text is comprised of valid base-64 encoded data.

Parameters:

- `base64Text`: A span of text to validate.

Returns: `true` if `base64Text` contains a valid, decodable sequence of base-64 encoded data; otherwise, `false`.

If the method returns `true`, the same text passed to `Convert.FromBase64String` and `Convert.TryFromBase64Chars` would successfully decode (in the case of `Convert.TryFromBase64Chars` assuming sufficient output space). Any amount of whitespace is allowed anywhere in the input, where whitespace is defined as the characters ' ', '\t', '\r', or '\n'.

## Base64.IsValid(Byte>, Int32) method

```csharp
public static bool IsValid (ReadOnlySpan<byte> base64TextUtf8, out int decodedLength);
```

Validates that the specified span of UTF-8 text is comprised of valid base-64 encoded data.

Parameters:

- `base64TextUtf8`: A span of UTF-8 text to validate.
- `decodedLength`: If the method returns `true`, the number of decoded bytes that will result from decoding the input UTF-8 text.

Returns: `true` if `base64TextUtf8` contains a valid, decodable sequence of base-64 encoded data; otherwise, `false`.

If the method returns `true`, the same text passed to `Base64.DecodeFromUtf8` and `Base64.DecodeFromUtf8InPlace` would successfully decode. Any amount of whitespace is allowed anywhere in the input, where whitespace is defined as the characters ' ', '\t', '\r', or '\n' (as bytes).

## Base64.IsValid(Char>, Int32) method

```csharp
public static bool IsValid (ReadOnlySpan<char> base64Text, out int decodedLength);
```

Validates that the specified span of text is comprised of valid base-64 encoded data.

Parameters:

- `base64Text`: A span of text to validate.
- `decodedLength`: If the method returns `true`, the number of decoded bytes that will result from decoding the input text.

Returns: `true` if `base64Text` contains a valid, decodable sequence of base-64 encoded data; otherwise, `false`.

If the method returns `true`, the same text passed to `Convert.FromBase64String` and `Convert.TryFromBase64Chars` would successfully decode (in the case of `Convert.TryFromBase64Chars` assuming sufficient output space). Any amount of whitespace is allowed anywhere in the input, where whitespace is defined as the characters ' ', '\t', '\r', or '\n'.

## Base64.TryDecodeFromChars(Char>, Byte>, Int32) method

```csharp
public static bool TryDecodeFromChars (ReadOnlySpan<char> source, Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## Base64.TryDecodeFromUtf8(Byte>, Byte>, Int32) method

```csharp
public static bool TryDecodeFromUtf8 (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## Base64.TryEncodeToChars(Byte>, Char>, Int32) method

```csharp
public static bool TryEncodeToChars (ReadOnlySpan<byte> source, Span<char> destination, out int charsWritten);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `charsWritten`: To be added.

Returns: To be added.

To be added.

## Base64.TryEncodeToUtf8(Byte>, Byte>, Int32) method

```csharp
public static bool TryEncodeToUtf8 (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.
