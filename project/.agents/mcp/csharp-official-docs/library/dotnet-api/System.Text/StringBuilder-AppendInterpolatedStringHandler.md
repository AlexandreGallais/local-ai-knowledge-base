---
title: "StringBuilder+AppendInterpolatedStringHandler struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/StringBuilder+AppendInterpolatedStringHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringBuilder+AppendInterpolatedStringHandler struct

Namespace: `System.Text`

```csharp
public struct StringBuilder.AppendInterpolatedStringHandler
```

Provides a handler used by the language compiler to append interpolated strings into `StringBuilder` instances.

To be added.

## StringBuilder+AppendInterpolatedStringHandler.StringBuilder+AppendInterpolatedStringHandler(Int32, Int32, StringBuilder) constructor

```csharp
public AppendInterpolatedStringHandler (int literalLength, int formattedCount, System.Text.StringBuilder stringBuilder);
```

Creates a handler used to append an interpolated string into a `StringBuilder`.

Parameters:

- `literalLength`: The number of constant characters outside of interpolation expressions in the interpolated string.
- `formattedCount`: The number of interpolation expressions in the interpolated string.
- `stringBuilder`: The associated StringBuilder to which to append.

#### Remarks

This is intended to be called only by compiler-generated code. Arguments are not validated as they'd otherwise be for members intended to be used directly.

## StringBuilder+AppendInterpolatedStringHandler.StringBuilder+AppendInterpolatedStringHandler(Int32, Int32, StringBuilder, IFormatProvider) constructor

```csharp
public AppendInterpolatedStringHandler (int literalLength, int formattedCount, System.Text.StringBuilder stringBuilder, IFormatProvider? provider);
```

Creates a handler used to translate an interpolated string into a `String`.

Parameters:

- `literalLength`: The number of constant characters outside of interpolation expressions in the interpolated string.
- `formattedCount`: The number of interpolation expressions in the interpolated string.
- `stringBuilder`: The associated StringBuilder to which to append.
- `provider`: An object that supplies culture-specific formatting information.

#### Remarks

This is intended to be called only by compiler-generated code. Arguments are not validated as they'd otherwise be for members intended to be used directly.

## StringBuilder+AppendInterpolatedStringHandler.AppendFormatted(Char>) method

```csharp
public void AppendFormatted (ReadOnlySpan<char> value);
```

Writes the specified character span to the handler.

Parameters:

- `value`: The span to write.

To be added.

## StringBuilder+AppendInterpolatedStringHandler.AppendFormatted(String) method

```csharp
public void AppendFormatted (string? value);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.

To be added.

## StringBuilder+AppendInterpolatedStringHandler.AppendFormatted(Object, Int32, String) method

```csharp
public void AppendFormatted (object? value, int alignment = 0, string? format = default);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.
- `alignment`: The minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

To be added.

## StringBuilder+AppendInterpolatedStringHandler.AppendFormatted(Char>, Int32, String) method

```csharp
public void AppendFormatted (ReadOnlySpan<char> value, int alignment = 0, string? format = default);
```

Writes the specified string of chars to the handler.

Parameters:

- `value`: The span to write.
- `alignment`: The minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

To be added.

## StringBuilder+AppendInterpolatedStringHandler.AppendFormatted(String, Int32, String) method

```csharp
public void AppendFormatted (string? value, int alignment = 0, string? format = default);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.
- `alignment`: The minimum number of characters that should be written for this value. If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

To be added.

## StringBuilder+AppendInterpolatedStringHandler.AppendFormatted<T>(T) method

```csharp
public void AppendFormatted<T> (T value);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.

To be added.

## StringBuilder+AppendInterpolatedStringHandler.AppendFormatted<T>(T, Int32) method

```csharp
public void AppendFormatted<T> (T value, int alignment);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `alignment`: The minimum number of characters that should be written for this value. If the value is negative, it indicates left-aligned and the required minimum is the absolute value.

To be added.

## StringBuilder+AppendInterpolatedStringHandler.AppendFormatted<T>(T, String) method

```csharp
public void AppendFormatted<T> (T value, string? format);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `format`: The format string.

To be added.

## StringBuilder+AppendInterpolatedStringHandler.AppendFormatted<T>(T, Int32, String) method

```csharp
public void AppendFormatted<T> (T value, int alignment, string? format);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `alignment`: The minimum number of characters that should be written for this value. If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

To be added.

## StringBuilder+AppendInterpolatedStringHandler.AppendLiteral(String) method

```csharp
public void AppendLiteral (string value);
```

Writes the specified string to the handler.

Parameters:

- `value`: The string to write.

To be added.
