---
title: "Utf8+TryWriteInterpolatedStringHandler struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Unicode/Utf8+TryWriteInterpolatedStringHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8+TryWriteInterpolatedStringHandler struct

Namespace: `System.Text.Unicode`

```csharp
public ref struct Utf8.TryWriteInterpolatedStringHandler
```

Provides a handler used by the language compiler to format interpolated strings into UTF-8 byte spans.

To be added.

## Utf8+TryWriteInterpolatedStringHandler.Utf8+TryWriteInterpolatedStringHandler(Int32, Int32, Byte>, Boolean) constructor

```csharp
public TryWriteInterpolatedStringHandler (int literalLength, int formattedCount, Span<byte> destination, out bool shouldAppend);
```

Creates a handler used to write an interpolated string into a UTF-8 `Span<T>`.

Parameters:

- `literalLength`: The number of constant characters outside of interpolation expressions in the interpolated string.
- `formattedCount`: The number of interpolation expressions in the interpolated string.
- `destination`: The destination buffer.
- `shouldAppend`: When this method returns, contains `true` if the destination might be long enough to support the formatting, or `false` if it isn't.

This is intended to be called only by compiler-generated code. Arguments are not validated as they'd otherwise be for members intended to be used directly.

## Utf8+TryWriteInterpolatedStringHandler.Utf8+TryWriteInterpolatedStringHandler(Int32, Int32, Byte>, IFormatProvider, Boolean) constructor

```csharp
public TryWriteInterpolatedStringHandler (int literalLength, int formattedCount, Span<byte> destination, IFormatProvider? provider, out bool shouldAppend);
```

Creates a handler used to write an interpolated string into a UTF-8 `Span<T>`.

Parameters:

- `literalLength`: The number of constant characters outside of interpolation expressions in the interpolated string.
- `formattedCount`: The number of interpolation expressions in the interpolated string.
- `destination`: The destination buffer.
- `provider`: An object that supplies culture-specific formatting information.
- `shouldAppend`: When this method returns, contains `true` if the destination might be long enough to support the formatting, or `false` if it isn't.

This is intended to be called only by compiler-generated code. Arguments are not validated as they'd otherwise be for members intended to be used directly.

## Utf8+TryWriteInterpolatedStringHandler.AppendFormatted(Byte>) method

```csharp
public bool AppendFormatted (scoped ReadOnlySpan<byte> utf8Value);
```

Writes the specified span of UTF-8 bytes to the handler.

Parameters:

- `utf8Value`: The span to write.

Returns: To be added.

To be added.

## Utf8+TryWriteInterpolatedStringHandler.AppendFormatted(Char>) method

```csharp
public bool AppendFormatted (scoped ReadOnlySpan<char> value);
```

Writes the specified character span to the handler.

Parameters:

- `value`: The span to write.

Returns: To be added.

To be added.

## Utf8+TryWriteInterpolatedStringHandler.AppendFormatted(String) method

```csharp
public bool AppendFormatted (string? value);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.

Returns: To be added.

To be added.

## Utf8+TryWriteInterpolatedStringHandler.AppendFormatted(Object, Int32, String) method

```csharp
public bool AppendFormatted (object? value, int alignment = 0, string? format = default);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

Returns: To be added.

To be added.

## Utf8+TryWriteInterpolatedStringHandler.AppendFormatted(Byte>, Int32, String) method

```csharp
public bool AppendFormatted (scoped ReadOnlySpan<byte> utf8Value, int alignment = 0, string? format = default);
```

Writes the specified span of UTF-8 bytes to the handler.

Parameters:

- `utf8Value`: The span to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

Returns: To be added.

To be added.

## Utf8+TryWriteInterpolatedStringHandler.AppendFormatted(Char>, Int32, String) method

```csharp
public bool AppendFormatted (scoped ReadOnlySpan<char> value, int alignment = 0, string? format = default);
```

Writes the specified string of chars to the handler.

Parameters:

- `value`: The span to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

Returns: To be added.

To be added.

## Utf8+TryWriteInterpolatedStringHandler.AppendFormatted(String, Int32, String) method

```csharp
public bool AppendFormatted (string? value, int alignment = 0, string? format = default);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

Returns: To be added.

To be added.

## Utf8+TryWriteInterpolatedStringHandler.AppendFormatted<T>(T) method

```csharp
public bool AppendFormatted<T> (T value);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.

Returns: To be added.

To be added.

## Utf8+TryWriteInterpolatedStringHandler.AppendFormatted<T>(T, Int32) method

```csharp
public bool AppendFormatted<T> (T value, int alignment);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.

Returns: To be added.

To be added.

## Utf8+TryWriteInterpolatedStringHandler.AppendFormatted<T>(T, String) method

```csharp
public bool AppendFormatted<T> (T value, string? format);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `format`: The format string.

Returns: To be added.

To be added.

## Utf8+TryWriteInterpolatedStringHandler.AppendFormatted<T>(T, Int32, String) method

```csharp
public bool AppendFormatted<T> (T value, int alignment, string? format);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

Returns: To be added.

To be added.

## Utf8+TryWriteInterpolatedStringHandler.AppendLiteral(String) method

```csharp
public bool AppendLiteral (string value);
```

Writes the specified string to the handler.

Parameters:

- `value`: The string to write.

Returns: `true` if the value could be formatted to the span; otherwise, `false`.

To be added.
