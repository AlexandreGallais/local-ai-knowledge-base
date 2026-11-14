---
title: "DefaultInterpolatedStringHandler struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/DefaultInterpolatedStringHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultInterpolatedStringHandler struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public ref struct DefaultInterpolatedStringHandler
```

Provides a handler used by the language compiler to process interpolated strings into `String` instances.

To be added.

## DefaultInterpolatedStringHandler.DefaultInterpolatedStringHandler(Int32, Int32) constructor

```csharp
public DefaultInterpolatedStringHandler (int literalLength, int formattedCount);
```

Creates a handler used to translate an interpolated string into a `String`.

Parameters:

- `literalLength`: The number of constant characters outside of interpolation expressions in the interpolated string.
- `formattedCount`: The number of interpolation expressions in the interpolated string.

#### Remarks

This is intended to be called only by compiler-generated code. Arguments are not validated as they'd otherwise be for members intended to be used directly.

## DefaultInterpolatedStringHandler.DefaultInterpolatedStringHandler(Int32, Int32, IFormatProvider) constructor

```csharp
public DefaultInterpolatedStringHandler (int literalLength, int formattedCount, IFormatProvider? provider);
```

Creates a handler used to translate an interpolated string into a `String`.

Parameters:

- `literalLength`: The number of constant characters outside of interpolation expressions in the interpolated string.
- `formattedCount`: The number of interpolation expressions in the interpolated string.
- `provider`: An object that supplies culture-specific formatting information.

#### Remarks

This is intended to be called only by compiler-generated code. Arguments are not validated as they'd otherwise be for members intended to be used directly.

## DefaultInterpolatedStringHandler.DefaultInterpolatedStringHandler(Int32, Int32, IFormatProvider, Char>) constructor

```csharp
public DefaultInterpolatedStringHandler (int literalLength, int formattedCount, IFormatProvider? provider, Span<char> initialBuffer);
```

Creates a handler used to translate an interpolated string into a `String`.

Parameters:

- `literalLength`: The number of constant characters outside of interpolation expressions in the interpolated string.
- `formattedCount`: The number of interpolation expressions in the interpolated string.
- `provider`: An object that supplies culture-specific formatting information.
- `initialBuffer`: A buffer temporarily transferred to the handler for use as part of its formatting.  Contents may be overwritten.

#### Remarks

This is intended to be called only by compiler-generated code. Arguments are not validated as they'd otherwise be for members intended to be used directly.

## DefaultInterpolatedStringHandler.Text property

```csharp
public ReadOnlySpan<char> Text { get; }
```

Gets a span of the characters appended to the handler.

Returns: To be added.

To be added.

## DefaultInterpolatedStringHandler.AppendFormatted(Char>) method

```csharp
public void AppendFormatted (scoped ReadOnlySpan<char> value);
```

Writes the specified character span to the handler.

Parameters:

- `value`: The span to write.

To be added.

## DefaultInterpolatedStringHandler.AppendFormatted(String) method

```csharp
public void AppendFormatted (string? value);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.

To be added.

## DefaultInterpolatedStringHandler.AppendFormatted(Object, Int32, String) method

```csharp
public void AppendFormatted (object? value, int alignment = 0, string? format = default);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

To be added.

## DefaultInterpolatedStringHandler.AppendFormatted(Char>, Int32, String) method

```csharp
public void AppendFormatted (scoped ReadOnlySpan<char> value, int alignment = 0, string? format = default);
```

Writes the specified string of chars to the handler.

Parameters:

- `value`: The span to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

To be added.

## DefaultInterpolatedStringHandler.AppendFormatted(String, Int32, String) method

```csharp
public void AppendFormatted (string? value, int alignment = 0, string? format = default);
```

Writes the specified value to the handler.

Parameters:

- `value`: The value to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

To be added.

## DefaultInterpolatedStringHandler.AppendFormatted<T>(T) method

```csharp
public void AppendFormatted<T> (T value);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.

To be added.

## DefaultInterpolatedStringHandler.AppendFormatted<T>(T, Int32) method

```csharp
public void AppendFormatted<T> (T value, int alignment);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.

To be added.

## DefaultInterpolatedStringHandler.AppendFormatted<T>(T, String) method

```csharp
public void AppendFormatted<T> (T value, string? format);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `format`: The format string.

To be added.

## DefaultInterpolatedStringHandler.AppendFormatted<T>(T, Int32, String) method

```csharp
public void AppendFormatted<T> (T value, int alignment, string? format);
```

Writes the specified value to the handler.

Parameters:

- `T`: The type of the value to write.
- `value`: The value to write.
- `alignment`: Minimum number of characters that should be written for this value.  If the value is negative, it indicates left-aligned and the required minimum is the absolute value.
- `format`: The format string.

To be added.

## DefaultInterpolatedStringHandler.AppendLiteral(String) method

```csharp
public void AppendLiteral (string value);
```

Writes the specified string to the handler.

Parameters:

- `value`: The string to write.

To be added.

## DefaultInterpolatedStringHandler.Clear() method

```csharp
public void Clear ();
```

Clears the handler.

This method releases any resources used by the handler. The method should be invoked only once and as the last thing performed on the handler. Subsequent use is erroneous, ill-defined, and might destabilize the process, as might using any other copies of the handler after `DefaultInterpolatedStringHandler.Clear` is called on any one of them.

## DefaultInterpolatedStringHandler.ToString() method

```csharp
public override string ToString ();
```

Gets the built `String`.

Returns: The built string.

To be added.

## DefaultInterpolatedStringHandler.ToStringAndClear() method

```csharp
public string ToStringAndClear ();
```

Gets the built `String` and clears the handler.

Returns: The built string.

#### Remarks

This releases any resources used by the handler. The method should be invoked only
once and as the last thing performed on the handler. Subsequent use is erroneous, ill-defined,
and may destabilize the process, as may using any other copies of the handler after ToStringAndClear
is called on any one of them.
