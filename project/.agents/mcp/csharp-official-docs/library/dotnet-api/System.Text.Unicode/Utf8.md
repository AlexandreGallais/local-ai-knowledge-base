---
title: "Utf8 class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Unicode/Utf8.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8 class

Namespace: `System.Text.Unicode`

```csharp
public static class Utf8
```

Provides static methods that convert chunked data between UTF-8 and UTF-16 encodings.

To be added.

## Utf8.FromUtf16(Char>, Byte>, Int32, Int32, Boolean, Boolean) method

```csharp
public static System.Buffers.OperationStatus FromUtf16 (ReadOnlySpan<char> source, Span<byte> destination, out int charsRead, out int bytesWritten, bool replaceInvalidSequences = true, bool isFinalBlock = true);
```

Converts a UTF-16 character span to a UTF-8 encoded byte span.

Parameters:

- `source`: A UTF-16 encoded read-only character span.
- `destination`: A UTF-8 encoded byte span.
- `charsRead`: When the method returns, the number of characters read from `source`.
- `bytesWritten`: When the method returns, the number of bytes written to `destination`.
- `replaceInvalidSequences`: `true` to replace invalid UTF-16 sequences in `source` with U+FFFD; `false` to return `OperationStatus.InvalidData` if invalid characters are found in `source`.
- `isFinalBlock`: `true` if the method should not return `OperationStatus.NeedMoreData`; otherwise, `false`.

Returns: A value that indicates that status of the conversion.

#### Remarks

This method corresponds to the UTF8Encoding.GetBytes method, except that it has a different calling convention, different error handling mechanisms, and different performance characteristics.

If 'replaceInvalidSequences' is `true`, the method replaces any ill-formed subsequences in `source` with U+FFFD in `destination` and continues processing the remainder of the buffer. Otherwise, the method returns `InvalidData` if it encounters any ill-formed sequences.

If the method returns an error code, the out parameters indicate how much of the data was successfully transcoded, and the location of the ill-formed subsequence can be deduced from these values.

If 'replaceInvalidSequences' is `true`, the method never returns `InvalidData`. If 'isFinalBlock' is `true`, the method never returns `NeedMoreData`.

## Utf8.IndexOfInvalidSubsequence(Byte>) method

```csharp
public static int IndexOfInvalidSubsequence (ReadOnlySpan<byte> value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## Utf8.IsValid(Byte>) method

```csharp
public static bool IsValid (ReadOnlySpan<byte> value);
```

Validates that the value is well-formed UTF-8.

Parameters:

- `value`: The `ReadOnlySpan<T>` string.

Returns: `true` if value is well-formed UTF-8, `false` otherwise.

To be added.

## Utf8.ToUtf16(Byte>, Char>, Int32, Int32, Boolean, Boolean) method

```csharp
public static System.Buffers.OperationStatus ToUtf16 (ReadOnlySpan<byte> source, Span<char> destination, out int bytesRead, out int charsWritten, bool replaceInvalidSequences = true, bool isFinalBlock = true);
```

Converts a UTF-8 encoded read-only byte span to a UTF-16 encoded character span.

Parameters:

- `source`: A UTF-8 encoded read-only byte span.
- `destination`: A UTF-16 encoded character span.
- `bytesRead`: When the method returns, the number of bytes read from `source`.
- `charsWritten`: When the method returns, the number of characters written to `destination`.
- `replaceInvalidSequences`: `true` to replace invalid UTF-8 sequences in `source` with U+FFFD; `false` to return `OperationStatus.InvalidData` if invalid characters are found in `source`.
- `isFinalBlock`: `true` if the method should not return `OperationStatus.NeedMoreData`; otherwise, `false`.

Returns: A value that indicates the status of the conversion.

#### Remarks

This method corresponds to the UTF8Encoding.GetChars method, except that it has a different calling convention, different error handling mechanisms, and different performance characteristics.

If 'replaceInvalidSequences' is `true`, the method replaces any ill-formed subsequences in `source` with U+FFFD in `destination` and continues processing the remainder of the buffer. Otherwise, the method returns `InvalidData` if it encounters any ill-formed sequences.

If the method returns an error code, the out parameters indicate how much of the data was successfully transcoded, and the location of the ill-formed subsequence can be deduced from these values.

If 'replaceInvalidSequences' is `true`, the method never returns `InvalidData`. If 'isFinalBlock' is `true`, the method never returns `NeedMoreData`.

## Utf8.TryWrite(Byte>, Utf8+TryWriteInterpolatedStringHandler, Int32) method

```csharp
public static bool TryWrite (Span<byte> destination, ref System.Text.Unicode.Utf8.TryWriteInterpolatedStringHandler handler, out int bytesWritten);
```

Writes the specified interpolated string to the UTF-8 byte span.

Parameters:

- `destination`: The span to which the interpolated string should be formatted.
- `handler`: The interpolated string.
- `bytesWritten`: When this method returns, contains the number of characters written to the span.

Returns: `true` if the entire interpolated string could be formatted successfully; otherwise, `false`.

To be added.

## Utf8.TryWrite(Byte>, IFormatProvider, Utf8+TryWriteInterpolatedStringHandler, Int32) method

```csharp
public static bool TryWrite (Span<byte> destination, IFormatProvider? provider, ref System.Text.Unicode.Utf8.TryWriteInterpolatedStringHandler handler, out int bytesWritten);
```

Writes the specified interpolated string to the UTF-8 byte span.

Parameters:

- `destination`: The span to which the interpolated string should be formatted.
- `provider`: An object that supplies culture-specific formatting information.
- `handler`: The interpolated string.
- `bytesWritten`: When this method returns, contains the number of characters written to the span.

Returns: `true` if the entire interpolated string could be formatted successfully; otherwise, `false`.

To be added.
