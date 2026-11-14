---
title: "MemoryExtensions+TryWriteInterpolatedStringHandler struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions+TryWriteInterpolatedStringHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions+TryWriteInterpolatedStringHandler struct

Namespace: `System`

```csharp
public ref struct MemoryExtensions.TryWriteInterpolatedStringHandler
```

Provides a handler used by the language compiler to format interpolated strings into character spans.

To be added.

## MemoryExtensions+TryWriteInterpolatedStringHandler.MemoryExtensions+TryWriteInterpolatedStringHandler(Int32, Int32, Char>, Boolean) constructor

```csharp
public TryWriteInterpolatedStringHandler (int literalLength, int formattedCount, Span<char> destination, out bool shouldAppend);
```

Creates a handler used to write an interpolated string into a span of characters.

Parameters:

- `literalLength`: The number of constant characters outside of interpolation expressions in the interpolated string.
- `formattedCount`: The number of interpolation expressions in the interpolated string.
- `destination`: The destination buffer.
- `shouldAppend`: When this method returns, contains `true` if the destination may be long enough to support the formatting, or `false` if it won't be.

This is intended to be called only by compiler-generated code. Arguments are not validated as they'd otherwise be for members intended to be used directly.

## MemoryExtensions+TryWriteInterpolatedStringHandler.MemoryExtensions+TryWriteInterpolatedStringHandler(Int32, Int32, Char>, IFormatProvider, Boolean) constructor

```csharp
public TryWriteInterpolatedStringHandler (int literalLength, int formattedCount, Span<char> destination, IFormatProvider? provider, out bool shouldAppend);
```

Creates a handler used to write an interpolated string into a span of characters.

Parameters:

- `literalLength`: The number of constant characters outside of interpolation expressions in the interpolated string.
- `formattedCount`: The number of interpolation expressions in the interpolated string.
- `destination`: The destination buffer.
- `provider`: An object that supplies culture-specific formatting information.
- `shouldAppend`: When this method returns, contains `true` if the destination may be long enough to support the formatting, or `false` if it won't be.

This is intended to be called only by compiler-generated code. Arguments are not validated as they'd otherwise be for members intended to be used directly.

## MemoryExtensions+TryWriteInterpolatedStringHandler.AppendFormatted(Char>) method

```csharp
public bool AppendFormatted (scoped ReadOnlySpan<char> value);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.

Returns: `false` if the operation failed; `true` otherwise.

To be added.

## MemoryExtensions+TryWriteInterpolatedStringHandler.AppendFormatted(String) method

```csharp
public bool AppendFormatted (string? value);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.

Returns: `true` on success; `false` otherwise.

To be added.

## MemoryExtensions+TryWriteInterpolatedStringHandler.AppendFormatted(Object, Int32, String) method

```csharp
public bool AppendFormatted (object? value, int alignment = 0, string? format = default);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.
- `alignment`: The minimum number of characters that should be written for this value. A negative value indicates left-aligned, and the required minimum is the absolute value.
- `format`: The format string.

Returns: `true` on success; `false` otherwise.

To be added.

## MemoryExtensions+TryWriteInterpolatedStringHandler.AppendFormatted(Char>, Int32, String) method

```csharp
public bool AppendFormatted (scoped ReadOnlySpan<char> value, int alignment = 0, string? format = default);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.
- `alignment`: >The minimum number of characters that should be written for this value. If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

Returns: `false` if the operation failed; `true` otherwise.

To be added.

## MemoryExtensions+TryWriteInterpolatedStringHandler.AppendFormatted(String, Int32, String) method

```csharp
public bool AppendFormatted (string? value, int alignment = 0, string? format = default);
```

Writes a specified value to the handler using a specified format string.

Parameters:

- `value`: The value to write.
- `alignment`: The minimum number of characters that should be written for this value. A negative value indicates left-aligned, and the required minimum is the absolute value.
- `format`: The format string.

Returns: `true` on success; `false` otherwise.

To be added.

## MemoryExtensions+TryWriteInterpolatedStringHandler.AppendFormatted<T>(T) method

```csharp
public bool AppendFormatted<T> (T value);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.

Returns: `true` on success; `false` otherwise.

To be added.

## MemoryExtensions+TryWriteInterpolatedStringHandler.AppendFormatted<T>(T, Int32) method

```csharp
public bool AppendFormatted<T> (T value, int alignment);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `alignment`: The minimum number of characters that should be written for this value.A negative value indicates left-aligned, and the required minimum is the absolute value.

Returns: `false` if the operation failed; `true` otherwise.

To be added.

## MemoryExtensions+TryWriteInterpolatedStringHandler.AppendFormatted<T>(T, String) method

```csharp
public bool AppendFormatted<T> (T value, string? format);
```

Writes a specified value to the handler using a specified format string.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `format`: The format string.

Returns: `true` on success; `false` otherwise.

To be added.

## MemoryExtensions+TryWriteInterpolatedStringHandler.AppendFormatted<T>(T, Int32, String) method

```csharp
public bool AppendFormatted<T> (T value, int alignment, string? format);
```

Writes a specified value to the handler using a specified format string.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `alignment`: The minimum number of characters that should be written for this value. A negative value indicates left-aligned, and the required minimum is the absolute value.
- `format`: The format string.

Returns: `true` on success; `false` otherwise.

To be added.

## MemoryExtensions+TryWriteInterpolatedStringHandler.AppendLiteral(String) method

```csharp
public bool AppendLiteral (string value);
```

Writes the specified string to the handler.

Parameters:

- `value`: The string to write.

Returns: `true` if the value could be formatted to the span; otherwise, `false`.

To be added.
