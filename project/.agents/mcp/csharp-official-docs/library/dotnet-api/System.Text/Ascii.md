---
title: "Ascii class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Ascii.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Ascii class

Namespace: `System.Text`

```csharp
public static class Ascii
```

Provides helper methods for working with ASCII-encoded text as bytes or characters.

For APIs that take both a source and a destination buffer, the behavior of the method is undefined if the source and destination buffers overlap, unless the description specifies otherwise. The behavior of all APIs is undefined if another thread mutates the buffers while these APIs are operating on them. All case-conversion APIs are culture-unaware.

## Ascii.Equals(Byte>, Byte>) method

```csharp
public static bool Equals (ReadOnlySpan<byte> left, ReadOnlySpan<byte> right);
```

Determines whether the provided buffers contain equal ASCII characters.

Parameters:

- `left`: The buffer to compare with `right`.
- `right`: The buffer to compare with `left`.

Returns: `true` if the corresponding elements in `left` and `right` are equal and ASCII; `false` otherwise.

If both buffers contain equal, but non-ASCII characters, the method returns `false`.

## Ascii.Equals(Byte>, Char>) method

```csharp
public static bool Equals (ReadOnlySpan<byte> left, ReadOnlySpan<char> right);
```

Determines whether the provided buffers contain equal ASCII characters.

Parameters:

- `left`: The buffer to compare with `right`.
- `right`: The buffer to compare with `left`.

Returns: `true` if the corresponding elements in `left` and `right` are equal and ASCII; `false` otherwise.

To be added.

## Ascii.Equals(Char>, Byte>) method

```csharp
public static bool Equals (ReadOnlySpan<char> left, ReadOnlySpan<byte> right);
```

Determines whether the provided buffers contain equal ASCII characters.

Parameters:

- `left`: The buffer to compare with `right`.
- `right`: The buffer to compare with `left`.

Returns: `true` if the corresponding elements in `left` and `right` are equal and ASCII; `false` otherwise.

To be added.

## Ascii.Equals(Char>, Char>) method

```csharp
public static bool Equals (ReadOnlySpan<char> left, ReadOnlySpan<char> right);
```

Determines whether the provided buffers contain equal ASCII characters.

Parameters:

- `left`: The buffer to compare with `right`.
- `right`: The buffer to compare with `left`.

Returns: `true` if the corresponding elements in `left` and `right` are equal and ASCII; `false` otherwise.

To be added.

## Ascii.EqualsIgnoreCase(Byte>, Byte>) method

```csharp
public static bool EqualsIgnoreCase (ReadOnlySpan<byte> left, ReadOnlySpan<byte> right);
```

Determines whether the provided buffers contain equal ASCII characters, ignoring case considerations.

Parameters:

- `left`: The buffer to compare with `right`.
- `right`: The buffer to compare with `left`.

Returns: `true` if the corresponding elements in `left` and `right` are equal ignoring case considerations and ASCII; `false` otherwise.

If both buffers contain equal, but non-ASCII characters, the method returns `false`.

## Ascii.EqualsIgnoreCase(Byte>, Char>) method

```csharp
public static bool EqualsIgnoreCase (ReadOnlySpan<byte> left, ReadOnlySpan<char> right);
```

Determines whether the provided buffers contain equal ASCII characters, ignoring case considerations.

Parameters:

- `left`: The buffer to compare with `right`.
- `right`: The buffer to compare with `left`.

Returns: `true` if the corresponding elements in `left` and `right` are equal ignoring case considerations and ASCII; `false` otherwise.

To be added.

## Ascii.EqualsIgnoreCase(Char>, Byte>) method

```csharp
public static bool EqualsIgnoreCase (ReadOnlySpan<char> left, ReadOnlySpan<byte> right);
```

Determines whether the provided buffers contain equal ASCII characters, ignoring case considerations.

Parameters:

- `left`: The buffer to compare with `right`.
- `right`: The buffer to compare with `left`.

Returns: `true` if the corresponding elements in `left` and `right` are equal ignoring case considerations and ASCII; `false` otherwise.

To be added.

## Ascii.EqualsIgnoreCase(Char>, Char>) method

```csharp
public static bool EqualsIgnoreCase (ReadOnlySpan<char> left, ReadOnlySpan<char> right);
```

Determines whether the provided buffers contain equal ASCII characters, ignoring case considerations.

Parameters:

- `left`: The buffer to compare with `right`.
- `right`: The buffer to compare with `left`.

Returns: `true` if the corresponding elements in `left` and `right` are equal ignoring case considerations and ASCII; `false` otherwise.

To be added.

## Ascii.FromUtf16(Char>, Byte>, Int32) method

```csharp
public static System.Buffers.OperationStatus FromUtf16 (ReadOnlySpan<char> source, Span<byte> destination, out int bytesWritten);
```

Copies text from a source buffer to a destination buffer, converting from UTF-16 to ASCII during the copy.

Parameters:

- `source`: The source buffer from which UTF-16 text is read.
- `destination`: The destination buffer to which ASCII text is written.
- `bytesWritten`: When this method returns, contains the number of bytes actually written to `destination`. It's the same as the number of chars actually read from `source`.

Returns: An `OperationStatus` describing the result of the operation.

To be added.

## Ascii.IsValid(Byte) method

```csharp
public static bool IsValid (byte value);
```

Determines whether the provided value is ASCII byte.

Parameters:

- `value`: The value to inspect.

Returns: `true` if `value` is ASCII, `false` otherwise.

To be added.

## Ascii.IsValid(Char) method

```csharp
public static bool IsValid (char value);
```

Determines whether the provided value is ASCII char.

Parameters:

- `value`: The value to inspect.

Returns: `true` if `value` is ASCII, `false` otherwise.

To be added.

## Ascii.IsValid(Byte>) method

```csharp
public static bool IsValid (ReadOnlySpan<byte> value);
```

Determines whether the provided value contains only ASCII bytes.

Parameters:

- `value`: The value to inspect.

Returns: `true` if `value` contains only ASCII bytes or is empty; `false` otherwise.

To be added.

## Ascii.IsValid(Char>) method

```csharp
public static bool IsValid (ReadOnlySpan<char> value);
```

Determines whether the provided value contains only ASCII chars.

Parameters:

- `value`: The value to inspect.

Returns: `true` if `value` contains only ASCII chars or is empty; `false` otherwise.

To be added.

## Ascii.ToLower(Byte>, Byte>, Int32) method

```csharp
public static System.Buffers.OperationStatus ToLower (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Copies text from a source buffer to a destination buffer, converting ASCII letters to lowercase during the copy.

Parameters:

- `source`: The source buffer from which ASCII text is read.
- `destination`: The destination buffer to which lowercase text is written.
- `bytesWritten`: When this method returns, contains the number of bytes actually written to `destination`. It's the same as the number of bytes actually read from `source`.

Returns: An `OperationStatus` describing the result of the operation.

The source and destination spans must not overlap. If they do, an `InvalidOperationException` will be thrown. If you want to mutate the span in-place, use the `Ascii.ToLowerInPlace` method instead.

## Ascii.ToLower(Byte>, Char>, Int32) method

```csharp
public static System.Buffers.OperationStatus ToLower (ReadOnlySpan<byte> source, Span<char> destination, out int charsWritten);
```

Copies text from a source buffer to a destination buffer, converting ASCII letters to lowercase during the copy.

Parameters:

- `source`: The source buffer from which ASCII text is read.
- `destination`: The destination buffer to which lowercase text is written.
- `charsWritten`: When this method returns, contains the number of characters actually written to `destination`. It's the same as the number of bytes actually read from `source`.

Returns: An `OperationStatus` describing the result of the operation.

To be added.

## Ascii.ToLower(Char>, Byte>, Int32) method

```csharp
public static System.Buffers.OperationStatus ToLower (ReadOnlySpan<char> source, Span<byte> destination, out int bytesWritten);
```

Copies text from a source buffer to a destination buffer, converting ASCII letters to lowercase during the copy.

Parameters:

- `source`: The source buffer from which ASCII text is read.
- `destination`: The destination buffer to which lowercase text is written.
- `bytesWritten`: When this method returns, contains the number of bytes actually written to `destination`. It's the same as the number of characters actually read from `source`.

Returns: An `OperationStatus` describing the result of the operation.

To be added.

## Ascii.ToLower(Char>, Char>, Int32) method

```csharp
public static System.Buffers.OperationStatus ToLower (ReadOnlySpan<char> source, Span<char> destination, out int charsWritten);
```

Copies text from a source buffer to a destination buffer, converting ASCII letters to lowercase during the copy.

Parameters:

- `source`: The source buffer from which ASCII text is read.
- `destination`: The destination buffer to which lowercase text is written.
- `charsWritten`: When this method returns, contains the number of characters actually written to `destination`. It's the same as the number of characters actually read from `source`.

Returns: An `OperationStatus` describing the result of the operation.

In-place conversion is prohibited, please use `Ascii.ToLowerInPlace` for that.

## Ascii.ToLowerInPlace(Byte>, Int32) method

```csharp
public static System.Buffers.OperationStatus ToLowerInPlace (Span<byte> value, out int bytesWritten);
```

Performs in-place uppercase conversion.

Parameters:

- `value`: The ASCII text buffer.
- `bytesWritten`: When this method returns, contains the number of processed bytes.

Returns: An `OperationStatus` describing the result of the operation.

To be added.

## Ascii.ToLowerInPlace(Char>, Int32) method

```csharp
public static System.Buffers.OperationStatus ToLowerInPlace (Span<char> value, out int charsWritten);
```

Performs in-place uppercase conversion.

Parameters:

- `value`: The ASCII text buffer.
- `charsWritten`: When this method returns, contains the number of processed characters.

Returns: An `OperationStatus` describing the result of the operation.

To be added.

## Ascii.ToUpper(Byte>, Byte>, Int32) method

```csharp
public static System.Buffers.OperationStatus ToUpper (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Copies text from a source buffer to a destination buffer, converting ASCII letters to uppercase during the copy.

Parameters:

- `source`: The source buffer from which ASCII text is read.
- `destination`: The destination buffer to which uppercase text is written.
- `bytesWritten`: When this method returns, contains the number of bytes actually written to `destination`. It's the same as the number of bytes actually read from `source`.

Returns: An `OperationStatus` describing the result of the operation.

In-place conversion is prohibited, please use `Ascii.ToUpperInPlace` for that.

## Ascii.ToUpper(Byte>, Char>, Int32) method

```csharp
public static System.Buffers.OperationStatus ToUpper (ReadOnlySpan<byte> source, Span<char> destination, out int charsWritten);
```

Copies text from a source buffer to a destination buffer, converting ASCII letters to uppercase during the copy.

Parameters:

- `source`: The source buffer from which ASCII text is read.
- `destination`: The destination buffer to which uppercase text is written.
- `charsWritten`: When this method returns, contains the number of characters actually written to `destination`. It's the same as the number of bytes actually read from `source`.

Returns: An `OperationStatus` describing the result of the operation.

To be added.

## Ascii.ToUpper(Char>, Byte>, Int32) method

```csharp
public static System.Buffers.OperationStatus ToUpper (ReadOnlySpan<char> source, Span<byte> destination, out int bytesWritten);
```

Copies text from a source buffer to a destination buffer, converting ASCII letters to uppercase during the copy.

Parameters:

- `source`: The source buffer from which ASCII text is read.
- `destination`: The destination buffer to which uppercase text is written.
- `bytesWritten`: When this method returns, contains the number of bytes actually written to `destination`. It's the same as the number of characters actually read from `source`.

Returns: An `OperationStatus` describing the result of the operation.

To be added.

## Ascii.ToUpper(Char>, Char>, Int32) method

```csharp
public static System.Buffers.OperationStatus ToUpper (ReadOnlySpan<char> source, Span<char> destination, out int charsWritten);
```

Copies text from a source buffer to a destination buffer, converting ASCII letters to uppercase during the copy.

Parameters:

- `source`: The source buffer from which ASCII text is read.
- `destination`: The destination buffer to which uppercase text is written.
- `charsWritten`: When this method returns, contains the number of characters actually written to `destination`. It's the same as the number of characters actually read from `source`.

Returns: An `OperationStatus` describing the result of the operation.

In-place conversion is prohibited, please use `Ascii.ToUpperInPlace` for that.

## Ascii.ToUpperInPlace(Byte>, Int32) method

```csharp
public static System.Buffers.OperationStatus ToUpperInPlace (Span<byte> value, out int bytesWritten);
```

Performs in-place lowercase conversion.

Parameters:

- `value`: The ASCII text buffer.
- `bytesWritten`: When this method returns, contains the number of processed bytes.

Returns: An `OperationStatus` describing the result of the operation.

To be added.

## Ascii.ToUpperInPlace(Char>, Int32) method

```csharp
public static System.Buffers.OperationStatus ToUpperInPlace (Span<char> value, out int charsWritten);
```

Performs in-place lowercase conversion.

Parameters:

- `value`: The ASCII text buffer.
- `charsWritten`: When this method returns, contains the number of processed characters.

Returns: An `OperationStatus` describing the result of the operation.

To be added.

## Ascii.ToUtf16(Byte>, Char>, Int32) method

```csharp
public static System.Buffers.OperationStatus ToUtf16 (ReadOnlySpan<byte> source, Span<char> destination, out int charsWritten);
```

Copies text from a source buffer to a destination buffer, converting from ASCII to UTF-16 during the copy.

Parameters:

- `source`: The source buffer from which ASCII text is read.
- `destination`: The destination buffer to which UTF-16 text is written.
- `charsWritten`: When this method returns, contains the number of chars actually written to `destination`. It's the same as the number of bytes actually read from `source`

Returns: An `OperationStatus` describing the result of the operation.

To be added.
