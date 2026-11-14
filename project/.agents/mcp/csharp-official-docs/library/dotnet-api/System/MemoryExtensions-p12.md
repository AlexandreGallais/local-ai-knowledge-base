---
title: "MemoryExtensions class (part 12 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions class (part 12 of 12)

## MemoryExtensions.TrimStart<T>(ReadOnlyMemory<T>, ReadOnlySpan<T>) method

```csharp
public static ReadOnlyMemory<T> TrimStart<T> (this ReadOnlyMemory<T> memory, ReadOnlySpan<T> trimElements) where T : IEquatable<T>;
```

Removes all leading occurrences of a set of elements specified in a read-only span from a memory region.

Parameters:

- `T`: The type of the elements in the read-only memory region.
- `memory`: The source memory from which the elements are removed.
- `trimElements`: The span which contains the set of elements to remove.

Returns: The trimmed read-only memory region.

#### Remarks

If `trimElements` is empty, the memory is returned unaltered.

## MemoryExtensions.TrimStart<T>(ReadOnlyMemory<T>, T) method

```csharp
public static ReadOnlyMemory<T> TrimStart<T> (this ReadOnlyMemory<T> memory, T trimElement) where T : IEquatable<T>;
```

Removes all leading occurrences of a specified element from a memory region.

Parameters:

- `T`: The type of the elements in the read-only memory region.
- `memory`: The source memory from which the element is removed.
- `trimElement`: The specified element to look for and remove.

Returns: The trimmed read-only memory region.

To be added.

## MemoryExtensions.TrimStart<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static ReadOnlySpan<T> TrimStart<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> trimElements) where T : IEquatable<T>;
```

Removes all leading occurrences of a set of elements specified in a read-only span from the span.

Parameters:

- `T`: The type of the elements in the read-only span.
- `span`: The source span from which the elements are removed.
- `trimElements`: The span which contains the set of elements to remove.

Returns: The trimmed read-only span.

#### Remarks

If `trimElements` is empty, the span is returned unaltered.

## MemoryExtensions.TrimStart<T>(ReadOnlySpan<T>, T) method

```csharp
public static ReadOnlySpan<T> TrimStart<T> (this ReadOnlySpan<T> span, T trimElement) where T : IEquatable<T>;
```

Removes all leading occurrences of a specified element from the span.

Parameters:

- `T`: The type of the elements in the read-only span.
- `span`: The source span from which the element is removed.
- `trimElement`: The specified element to look for and remove.

Returns: The trimmed read-only span.

To be added.

## MemoryExtensions.TrimStart<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static Span<T> TrimStart<T> (this Span<T> span, ReadOnlySpan<T> trimElements) where T : IEquatable<T>;
```

Removes all leading occurrences of a set of elements specified in a read-only span from the span.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The source span from which the elements are removed.
- `trimElements`: The span which contains the set of elements to remove.

Returns: The trimmed span.

#### Remarks

If `trimElements` is empty, the span is returned unaltered.

## MemoryExtensions.TrimStart<T>(Span<T>, T) method

```csharp
public static Span<T> TrimStart<T> (this Span<T> span, T trimElement) where T : IEquatable<T>;
```

Removes all leading occurrences of a specified element from the span.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The source span from which the element is removed.
- `trimElement`: The specified element to look for and remove.

Returns: The trimmed span.

To be added.

## MemoryExtensions.TryWrite(Char>, MemoryExtensions+TryWriteInterpolatedStringHandler, Int32) method

```csharp
public static bool TryWrite (this Span<char> destination, ref MemoryExtensions.TryWriteInterpolatedStringHandler handler, out int charsWritten);
```

Writes the specified interpolated string to the character span.

Parameters:

- `destination`: The span to which the interpolated string should be formatted.
- `handler`: The interpolated string, passed by reference.
- `charsWritten`: When this method returns, contains the number of characters written to the span.

Returns: `true` if the entire interpolated string could be formatted successfully; otherwise, `false`.

To be added.

## MemoryExtensions.TryWrite(Char>, IFormatProvider, MemoryExtensions+TryWriteInterpolatedStringHandler, Int32) method

```csharp
public static bool TryWrite (this Span<char> destination, IFormatProvider? provider, ref MemoryExtensions.TryWriteInterpolatedStringHandler handler, out int charsWritten);
```

Writes the specified interpolated string to the character span.

Parameters:

- `destination`: The span to which the interpolated string should be formatted.
- `provider`: An object that supplies culture-specific formatting information.
- `handler`: The interpolated string, passed by reference.
- `charsWritten`: When this method returns, contains the number of characters written to the span.

Returns: `true` if the entire interpolated string could be formatted successfully; otherwise, `false`.

To be added.

## MemoryExtensions.TryWrite(Char>, IFormatProvider, CompositeFormat, Int32, Object[]) method

```csharp
public static bool TryWrite (this Span<char> destination, IFormatProvider? provider, System.Text.CompositeFormat format, out int charsWritten, params object?[] args);
```

Writes the `CompositeFormat` string to the character span, substituting the format item or items with the string representation of the corresponding arguments.

Parameters:

- `destination`: The span to which the string should be formatted.
- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `charsWritten`: When this method returns, contains the number of characters written to the span.
- `args`: An array of objects to format.

Returns: `true` if the entire interpolated string could be formatted successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `format` or `args` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.

## MemoryExtensions.TryWrite(Char>, IFormatProvider, CompositeFormat, Int32, Object>) method

```csharp
public static bool TryWrite (this Span<char> destination, IFormatProvider? provider, System.Text.CompositeFormat format, out int charsWritten, scoped ReadOnlySpan<object?> args);
```

Writes the `CompositeFormat` string to the character span, substituting the format item or items with the string representation of the corresponding arguments.

Parameters:

- `destination`: The span to which the string should be formatted.
- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `charsWritten`: When this method returns, contains the number of characters written to the span.
- `args`: A span of objects to format.

Returns: `true` if the entire interpolated string could be formatted successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.

## MemoryExtensions.TryWrite<TArg0>(Char>, IFormatProvider, CompositeFormat, Int32, TArg0) method

```csharp
public static bool TryWrite<TArg0> (this Span<char> destination, IFormatProvider? provider, System.Text.CompositeFormat format, out int charsWritten, TArg0 arg0);
```

Writes the `CompositeFormat` string to the character span, substituting the format item or items with the string representation of the corresponding arguments.

Parameters:

- `TArg0`: The type of the object to format.
- `destination`: The span to which the string should be formatted.
- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `charsWritten`: When this method returns, contains the number of characters written to the span.
- `arg0`: The object to format.

Returns: `true` if the entire interpolated string could be formatted successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.

## MemoryExtensions.TryWrite<TArg0,TArg1>(Char>, IFormatProvider, CompositeFormat, Int32, TArg0, TArg1) method

```csharp
public static bool TryWrite<TArg0,TArg1> (this Span<char> destination, IFormatProvider? provider, System.Text.CompositeFormat format, out int charsWritten, TArg0 arg0, TArg1 arg1);
```

Writes the `CompositeFormat` string to the character span, substituting the format item or items with the string representation of the corresponding arguments.

Parameters:

- `TArg0`: The type of the first object to format.
- `TArg1`: The type of the second object to format.
- `destination`: The span to which the string should be formatted.
- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `charsWritten`: When this method returns, contains the number of characters written to the span.
- `arg0`: The first object to format.
- `arg1`: The second object to format.

Returns: `true` if the entire interpolated string could be formatted successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.

## MemoryExtensions.TryWrite<TArg0,TArg1,TArg2>(Char>, IFormatProvider, CompositeFormat, Int32, TArg0, TArg1, TArg2) method

```csharp
public static bool TryWrite<TArg0,TArg1,TArg2> (this Span<char> destination, IFormatProvider? provider, System.Text.CompositeFormat format, out int charsWritten, TArg0 arg0, TArg1 arg1, TArg2 arg2);
```

Writes the `CompositeFormat` string to the character span, substituting the format item or items with the string representation of the corresponding arguments.

Parameters:

- `TArg0`: The type of the first object to format.
- `TArg1`: The type of the second object to format.
- `TArg2`: The type of the third object to format.
- `destination`: The span to which the string should be formatted.
- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `charsWritten`: When this method returns, contains the number of characters written to the span.
- `arg0`: The first object to format.
- `arg1`: The second object to format.
- `arg2`: The third object to format.

Returns: `true` if the entire interpolated string could be formatted successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.
