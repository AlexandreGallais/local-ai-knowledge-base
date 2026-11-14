---
title: "Debug+AssertInterpolatedStringHandler struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Debug+AssertInterpolatedStringHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Debug+AssertInterpolatedStringHandler struct

Namespace: `System.Diagnostics`

```csharp
public struct Debug.AssertInterpolatedStringHandler
```

Provides an interpolated string handler for `Debug.Assert` that only performs formatting if the assert fails.

To be added.

## Debug+AssertInterpolatedStringHandler.Debug+AssertInterpolatedStringHandler(Int32, Int32, Boolean, Boolean) constructor

```csharp
public AssertInterpolatedStringHandler (int literalLength, int formattedCount, bool condition, out bool shouldAppend);
```

Creates an instance of the handler.

Parameters:

- `literalLength`: The number of constant characters outside of interpolation expressions in the interpolated string.
- `formattedCount`: The number of interpolation expressions in the interpolated string.
- `condition`: The condition Boolean passed to the `Debug` method.
- `shouldAppend`: A value indicating whether formatting should proceed.

#### Remarks

This is intended to be called only by compiler-generated code. Arguments are not validated as they'd otherwise be for members intended to be used directly.

## Debug+AssertInterpolatedStringHandler.AppendFormatted(Char>) method

```csharp
public void AppendFormatted (ReadOnlySpan<char> value);
```

Writes the specified character span to the handler.

Parameters:

- `value`: The span to write.

To be added.

## Debug+AssertInterpolatedStringHandler.AppendFormatted(String) method

```csharp
public void AppendFormatted (string value);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.

To be added.

## Debug+AssertInterpolatedStringHandler.AppendFormatted(Object, Int32, String) method

```csharp
public void AppendFormatted (object value, int alignment = 0, string format = default);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

To be added.

## Debug+AssertInterpolatedStringHandler.AppendFormatted(Char>, Int32, String) method

```csharp
public void AppendFormatted (ReadOnlySpan<char> value, int alignment = 0, string? format = default);
```

Writes the specified string of chars to the handler.

Parameters:

- `value`: The span to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

To be added.

## Debug+AssertInterpolatedStringHandler.AppendFormatted(String, Int32, String) method

```csharp
public void AppendFormatted (string value, int alignment = 0, string format = default);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

To be added.

## Debug+AssertInterpolatedStringHandler.AppendFormatted<T>(T) method

```csharp
public void AppendFormatted<T> (T value);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.

To be added.

## Debug+AssertInterpolatedStringHandler.AppendFormatted<T>(T, Int32) method

```csharp
public void AppendFormatted<T> (T value, int alignment);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.

To be added.

## Debug+AssertInterpolatedStringHandler.AppendFormatted<T>(T, String) method

```csharp
public void AppendFormatted<T> (T value, string format);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `format`: The format string.

To be added.

## Debug+AssertInterpolatedStringHandler.AppendFormatted<T>(T, Int32, String) method

```csharp
public void AppendFormatted<T> (T value, int alignment, string format);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

To be added.

## Debug+AssertInterpolatedStringHandler.AppendLiteral(String) method

```csharp
public void AppendLiteral (string value);
```

Writes the specified string to the handler.

Parameters:

- `value`: The string to write.

To be added.
