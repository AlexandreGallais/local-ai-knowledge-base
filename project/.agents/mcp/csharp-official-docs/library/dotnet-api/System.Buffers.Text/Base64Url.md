---
title: "Base64Url class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers.Text/Base64Url.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Base64Url class

Namespace: `System.Buffers.Text`

```csharp
public static class Base64Url
```

Converts between binary data and URL-safe ASCII encoded text that's represented in Base64Url characters.

Base64Url encoding uses the same alphabet as standard Base64 encoding, except that the characters '+' and '/' are replaced with '-' and '_' respectively to make the output URL-safe.

## Base64Url.DecodeFromChars(Char>) method

```csharp
public static byte[] DecodeFromChars (ReadOnlySpan<char> source);
```

Decodes the span of unicode ASCII chars represented as Base64Url into binary data.

Parameters:

- `source`: The input span which contains ASCII chars in Base64Url that needs to be decoded.

Returns: A byte array which contains the result of the decoding operation.

Exceptions:

- `FormatException`: `source` contains a invalid Base64Url character,

more than two padding characters, or a non white space character among the padding characters.

To be added.

## Base64Url.DecodeFromChars(Char>, Byte>) method

```csharp
public static int DecodeFromChars (ReadOnlySpan<char> source, Span<byte> destination);
```

Decodes the span of unicode ASCII chars represented as Base64Url into binary data.

Parameters:

- `source`: The input span which contains ASCII chars in Base64Url that needs to be decoded.
- `destination`: The output span which contains the result of the operation, i.e. the decoded binary data.

Returns: The number of bytes written into the output span. This can be used to slice the output for subsequent calls, if necessary.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the encoded output.
- `FormatException`: `source` contains a invalid Base64Url character,

more than two padding characters, or a non white space character among the padding characters.

To be added.

## Base64Url.DecodeFromChars(Char>, Byte>, Int32, Int32, Boolean) method

```csharp
public static System.Buffers.OperationStatus DecodeFromChars (ReadOnlySpan<char> source, Span<byte> destination, out int charsConsumed, out int bytesWritten, bool isFinalBlock = true);
```

Decodes the span of unicode ASCII chars represented as Base64Url into binary data.

Parameters:

- `source`: The input span which contains unicode ASCII chars in Base64Url that needs to be decoded.
- `destination`: The output span which contains the result of the operation, i.e. the decoded binary data.
- `charsConsumed`: When this method returns, contains the number of input chars consumed during the operation. This can be used to slice the input for subsequent calls, if necessary. This parameter is treated as uninitialized.
- `bytesWritten`: When this method returns, contains the number of bytes written into the output span. This can be used to slice the output for subsequent calls, if necessary. This parameter is treated as uninitialized.
- `isFinalBlock`: `true` when the input span contains the entirety of data to encode; `false` when more data may follow,

such as when calling in a loop. Calls with `false` should be followed up with another call where this parameter is `true` call. The default is `true`.

Returns: One of the enumeration values that indicates the success or failure of the operation.

As padding is optional for Base64Url the `source` length not required to be a multiple of 4 even if `isFinalBlock` is `true`.

If the `source` length is not a multiple of 4 and `isFinalBlock` is `true` the remainders decoded accordingly:

- Remainder of 3 chars - decoded into 2 bytes data, decoding succeeds.

- Remainder of 2 chars - decoded into 1 byte data. decoding succeeds.

- Remainder of 1 char - will cause OperationStatus.InvalidData result.

## Base64Url.DecodeFromUtf8(Byte>) method

```csharp
public static byte[] DecodeFromUtf8 (ReadOnlySpan<byte> source);
```

Decodes the span of UTF-8 encoded text represented as Base64Url into binary data.

Parameters:

- `source`: The input span which contains UTF-8 encoded text in Base64Url that needs to be decoded.

Returns: >A byte array which contains the result of the decoding operation.

Exceptions:

- `FormatException`: `source` contains an invalid Base64Url character,

more than two padding characters, or a non white space character among the padding characters.

To be added.

## Base64Url.DecodeFromUtf8(Byte>, Byte>) method

```csharp
public static int DecodeFromUtf8 (ReadOnlySpan<byte> source, Span<byte> destination);
```

Decodes the span of UTF-8 encoded text represented as Base64Url into binary data.

Parameters:

- `source`: The input span which contains UTF-8 encoded text in Base64Url that needs to be decoded.
- `destination`: The output span which contains the result of the operation, i.e. the decoded binary data.

Returns: The number of bytes written into `destination`. This can be used to slice the output for subsequent calls, if necessary.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the encoded output.
- `FormatException`: `source` contains an invalid Base64Url character,

more than two padding characters, or a non white space character among the padding characters.

As padding is optional for Base64Url the `source` length not required to be a multiple of 4.

If the `source` length is not a multiple of 4 the remainders decoded accordingly:

- Remainder of 3 bytes - decoded into 2 bytes data, decoding succeeds.

- Remainder of 2 bytes - decoded into 1 byte data. decoding succeeds.

- Remainder of 1 byte - is invalid input, causes FormatException.

## Base64Url.DecodeFromUtf8(Byte>, Byte>, Int32, Int32, Boolean) method

```csharp
public static System.Buffers.OperationStatus DecodeFromUtf8 (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesConsumed, out int bytesWritten, bool isFinalBlock = true);
```

Decodes the span of UTF-8 encoded text represented as Base64Url into binary data.

Parameters:

- `source`: The input span which contains UTF-8 encoded text in Base64Url that needs to be decoded.
- `destination`: The output span which contains the result of the operation, i.e. the decoded binary data.
- `bytesConsumed`: When this method returns, contains the number of input bytes consumed during the operation. This can be used to slice the input for subsequent calls, if necessary. This parameter is treated as uninitialized.
- `bytesWritten`: When this method returns, contains the number of bytes written into the output span. This can be used to slice the output for subsequent calls, if necessary. This parameter is treated as uninitialized.
- `isFinalBlock`: `true` when the input span contains the entirety of data to encode; `false` when more data may follow,

such as when calling in a loop. Calls with `false` should be followed up with another call where this parameter is `true` call. The default is `true`.

Returns: One of the enumeration values that indicates the success or failure of the operation.

As padding is optional for Base64Url the `source` length not required to be a multiple of 4 even if `isFinalBlock` is `true`.

If the `source` length is not a multiple of 4 and `isFinalBlock` is `true` the remainders decoded accordingly:

- Remainder of 3 bytes - decoded into 2 bytes data, decoding succeeds.

- Remainder of 2 bytes - decoded into 1 byte data. decoding succeeds.

- Remainder of 1 byte - will cause OperationStatus.InvalidData result.

## Base64Url.DecodeFromUtf8InPlace(Byte>) method

```csharp
public static int DecodeFromUtf8InPlace (Span<byte> buffer);
```

Decodes the span of UTF-8 encoded text in Base64Url into binary data, in-place.

The decoded binary output is smaller than the text data contained in the input (the operation deflates the data).

Parameters:

- `buffer`: The input span which contains the base 64 text data that needs to be decoded.

Returns: The number of bytes written into `buffer`. This can be used to slice the output for subsequent calls, if necessary.

Exceptions:

- `FormatException`: `buffer` contains an invalid Base64Url character,

more than two padding characters, or a non white space character among the padding characters.

As padding is optional for Base64Url the `buffer` length not required to be a multiple of 4.

If the `buffer` length is not a multiple of 4 the remainders decoded accordingly:

- Remainder of 3 bytes - decoded into 2 bytes data, decoding succeeds.

- Remainder of 2 bytes - decoded into 1 byte data. decoding succeeds.

- Remainder of 1 byte - is invalid input, causes FormatException.

## Base64Url.EncodeToChars(Byte>) method

```csharp
public static char[] EncodeToChars (ReadOnlySpan<byte> source);
```

Encodes the span of binary data into unicode ASCII chars represented as Base64Url.

Parameters:

- `source`: The input span which contains binary data that needs to be encoded.

Returns: A char array which contains the result of the operation, i.e. the ASCII chars in Base64Url.

This implementation of the Base64Url encoding omits the optional padding characters. The encoding uses '-' and '_' instead of the '+' and '/' characters used in standard Base64 encoding.

## Base64Url.EncodeToChars(Byte>, Char>) method

```csharp
public static int EncodeToChars (ReadOnlySpan<byte> source, Span<char> destination);
```

Encodes the span of binary data into Unicode ASCII chars represented as Base64Url.

Parameters:

- `source`: The input span which contains binary data that needs to be encoded.
- `destination`: The output span which contains the result of the operation, i.e. the ASCII chars in Base64Url.

Returns: The number of bytes written into the destination span. This can be used to slice the output for subsequent calls, if necessary.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the encoded output.

This implementation of the Base64Url encoding omits the optional padding characters. The encoding uses '-' and '_' instead of the '+' and '/' characters used in standard Base64 encoding.

## Base64Url.EncodeToChars(Byte>, Char>, Int32, Int32, Boolean) method

```csharp
public static System.Buffers.OperationStatus EncodeToChars (ReadOnlySpan<byte> source, Span<char> destination, out int bytesConsumed, out int charsWritten, bool isFinalBlock = true);
```

Encodes the span of binary data into unicode ASCII chars represented as Base64Url.

Parameters:

- `source`: The input span which contains binary data that needs to be encoded.
- `destination`: The output span which contains the result of the operation, i.e. the ASCII chars in Base64Url.
- `bytesConsumed`: >When this method returns, contains the number of input bytes consumed during the operation. This can be used to slice the input for subsequent calls, if necessary. This parameter is treated as uninitialized.
- `charsWritten`: >When this method returns, contains the number of chars written into the output span. This can be used to slice the output for subsequent calls, if necessary. This parameter is treated as uninitialized.
- `isFinalBlock`: `true` when the input span contains the entirety of data to encode; `false` when more data may follow,

such as when calling in a loop, subsequent calls with `false` should end with `true` call. The default is `true`.

Returns: One of the enumeration values that indicates the success or failure of the operation.

This implementation of the Base64Url encoding omits the optional padding characters. The encoding uses '-' and '_' instead of the '+' and '/' characters used in standard Base64 encoding.

## Base64Url.EncodeToString(Byte>) method

```csharp
public static string EncodeToString (ReadOnlySpan<byte> source);
```

Encodes the span of binary data into Unicode string represented as Base64Url ASCII chars.

Parameters:

- `source`: The input span that contains binary data that needs to be encoded.

Returns: A string that contains the result of the operation, i.e. the ASCII string in Base64Url.

This implementation of the Base64Url encoding omits the optional padding characters. The encoding uses '-' and '_' instead of the '+' and '/' characters used in standard Base64 encoding.

## Base64Url.EncodeToUtf8(Byte>) method

```csharp
public static byte[] EncodeToUtf8 (ReadOnlySpan<byte> source);
```

Encodes the span of binary data into UTF-8 encoded text represented as Base64Url.

Parameters:

- `source`: The input span which contains binary data that needs to be encoded.

Returns: The output byte array which contains the result of the operation, i.e. the UTF-8 encoded text in Base64Url.

This implementation of the Base64Url encoding omits the optional padding characters. The encoding uses '-' and '_' instead of the '+' and '/' characters used in standard Base64 encoding.

## Base64Url.EncodeToUtf8(Byte>, Byte>) method

```csharp
public static int EncodeToUtf8 (ReadOnlySpan<byte> source, Span<byte> destination);
```

Encodes the span of binary data into UTF-8 encoded text represented as Base64Url.

Parameters:

- `source`: The input span which contains binary data that needs to be encoded.
- `destination`: The output span which contains the result of the operation, i.e. the UTF-8 encoded text in Base64Url.

Returns: The number of bytes written into the destination span. This can be used to slice the output for subsequent calls, if necessary.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the encoded output.

This implementation of the Base64Url encoding omits the optional padding characters. The encoding uses '-' and '_' instead of the '+' and '/' characters used in standard Base64 encoding.
