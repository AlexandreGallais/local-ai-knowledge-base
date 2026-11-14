---
title: "MemoryExtensions class (part 4 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions class (part 4 of 12)

## MemoryExtensions.ContainsAnyExceptInRange<T>(Span<T>, T, T) method

```csharp
public static bool ContainsAnyExceptInRange<T> (this Span<T> span, T lowInclusive, T highInclusive) where T : IComparable<T>;
```

Searches for any value outside of the range between `lowInclusive` and `highInclusive`, inclusive.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `lowInclusive`: The lower bound, inclusive, of the excluded range.
- `highInclusive`: The upper bound, inclusive, of the excluded range.

Returns: `true` if any value other than those in the specified range is present in the span.
If all of the values are inside of the specified range, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyInRange<T>(ReadOnlySpan<T>, T, T) method

```csharp
public static bool ContainsAnyInRange<T> (this ReadOnlySpan<T> span, T lowInclusive, T highInclusive) where T : IComparable<T>;
```

Searches for any value in the range between `lowInclusive` and `highInclusive`, inclusive.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `lowInclusive`: The lower bound, inclusive, of the range for which to search.
- `highInclusive`: The upper bound, inclusive, of the range for which to search.

Returns: `true` if found. If not found, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyInRange<T>(Span<T>, T, T) method

```csharp
public static bool ContainsAnyInRange<T> (this Span<T> span, T lowInclusive, T highInclusive) where T : IComparable<T>;
```

Searches for any value in the range between `lowInclusive` and `highInclusive`, inclusive, and returns `true` if found. If not found, returns `false`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `lowInclusive`: The lower bound, inclusive, of the range for which to search.
- `highInclusive`: The upper bound, inclusive, of the range for which to search.

Returns: `true` if found. If not found, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyWhiteSpace(Char>) method

```csharp
public static bool ContainsAnyWhiteSpace (this ReadOnlySpan<char> span);
```

To be added.

Parameters:

- `span`: To be added.

Returns: To be added.

To be added.

## MemoryExtensions.CopyTo<T>(T[], Memory<T>) method

```csharp
public static void CopyTo<T> (this T[]? source, Memory<T> destination);
```

Copies the contents of the array into a memory region.

Parameters:

- `T`: The type of the array.
- `source`: The array to copy items from.
- `destination`: The memory to copy items into.

Exceptions:

- `ArgumentException`: The destination is shorter than the source array.

If `source` and `destination` overlap, this method behaves as if the original values are in a temporary location before the destination is overwritten.

## MemoryExtensions.CopyTo<T>(T[], Span<T>) method

```csharp
public static void CopyTo<T> (this T[]? source, Span<T> destination);
```

Copies the contents of the array into the span.

Parameters:

- `T`: The type of the array.
- `source`: The array to copy items from.
- `destination`: The span to copy items into.

Exceptions:

- `ArgumentException`: The destination Span is shorter than the source array.

If `source` and `destination` overlap, this method behaves as if the original values are in a temporary location before the destination is overwritten.

## MemoryExtensions.Count<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static int Count<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> value) where T : IEquatable<T>;
```

Counts the number of times `value` occurs in `span`.

Parameters:

- `T`: The element type of the span.
- `span`: The span to search.
- `value`: The value for which to search.

Returns: The number of times `value` was found in `span`.

To be added.

## MemoryExtensions.Count<T>(ReadOnlySpan<T>, T) method

```csharp
public static int Count<T> (this ReadOnlySpan<T> span, T value) where T : IEquatable<T>;
```

Counts the number of times the specified `value` occurs in the `span`.

Parameters:

- `T`: The element type of the span.
- `span`: The span to search.
- `value`: The value for which to search.

Returns: The number of times `value` was found in the `span`.

To be added.

## MemoryExtensions.Count<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static int Count<T> (this Span<T> span, ReadOnlySpan<T> value) where T : IEquatable<T>;
```

Counts the number of times the specified `value` occurs in the `span`.

Parameters:

- `T`: The element type of the span.
- `span`: The span to search.
- `value`: The value for which to search.

Returns: The number of times `value` was found in the `span`.

To be added.

## MemoryExtensions.Count<T>(Span<T>, T) method

```csharp
public static int Count<T> (this Span<T> span, T value) where T : IEquatable<T>;
```

Counts the number of times the specified `value` occurs in the `span`.

Parameters:

- `T`: The element type of the span.
- `span`: The span to search.
- `value`: The value for which to search.

Returns: The number of times `value` was found in the `span`.

To be added.

## MemoryExtensions.Count<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static int Count<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Counts the number of times the specified `value` occurs in the `span`.

Parameters:

- `T`: The element type of the span.
- `span`: The span to search.
- `value`: The value for which to search.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The number of times `value` was found in the `span`.

To be added.

## MemoryExtensions.Count<T>(ReadOnlySpan<T>, T, IEqualityComparer<T>) method

```csharp
public static int Count<T> (this ReadOnlySpan<T> span, T value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Counts the number of times the specified `value` occurs in the `span`.

Parameters:

- `T`: The element type of the span.
- `span`: The span to search.
- `value`: The value to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The number of times `value` was found in the `span`.

To be added.

## MemoryExtensions.CountAny<T>(ReadOnlySpan<T>, SearchValues<T>) method

```csharp
public static int CountAny<T> (this ReadOnlySpan<T> span, System.Buffers.SearchValues<T> values) where T : IEquatable<T>;
```

Counts the number of times any of the specified `values` occurs in the `span`.

Parameters:

- `T`: The element type of the span.
- `span`: The span to search.
- `values`: The set of values for which to search.

Returns: The number of times any of the `T` elements in `values` was found in the `span`.

Exceptions:

- `ArgumentNullException`: `values` is `null`.

If `values` is empty, 0 is returned.

## MemoryExtensions.CountAny<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static int CountAny<T> (this ReadOnlySpan<T> span, scoped ReadOnlySpan<T> values) where T : IEquatable<T>;
```

Counts the number of times any of the specified `values` occurs in the `span`.

Parameters:

- `T`: The element type of the span.
- `span`: The span to search.
- `values`: The set of values for which to search.

Returns: The number of times any of the `T` elements in `values` was found in the `span`.

If `values` is empty, 0 is returned.

## MemoryExtensions.CountAny<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static int CountAny<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> values, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Counts the number of times any of the specified `values` occurs in the `span`.

Parameters:

- `T`: The element type of the span.
- `span`: The span to search.
- `values`: The set of values for which to search.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The number of times any of the `T` elements in `values` was found in the `span`.

If `values` is empty, 0 is returned.

## MemoryExtensions.EndsWith(Char>, Char>, StringComparison) method

```csharp
public static bool EndsWith (this ReadOnlySpan<char> span, ReadOnlySpan<char> value, StringComparison comparisonType);
```

Determines whether the end of the `span` matches the specified `value` when compared using the specified `comparisonType` option.

Parameters:

- `span`: The source span.
- `value`: The sequence to compare to the end of the source span.
- `comparisonType`: An enumeration value that determines how `span` and `value` are compared.

Returns: `true` if `value` matches the end of `span`; otherwise, `false`.

To be added.

## MemoryExtensions.EndsWith<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static bool EndsWith<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> value) where T : IEquatable<T>;
```

Determines whether the specified sequence appears at the end of a read-only span.

Parameters:

- `T`: The type of the span.
- `span`: The source span.
- `value`: The sequence to compare to the end of the source span.

Returns: `true` if `value` matches the end of `span`; otherwise, `false`.

To be added.

## MemoryExtensions.EndsWith<T>(ReadOnlySpan<T>, T) method

```csharp
public static bool EndsWith<T> (this ReadOnlySpan<T> span, T value) where T : IEquatable<T>;
```

Determines whether the specified value appears at the end of the span.

Parameters:

- `T`: The type of elements in the span.
- `span`: The span to search.
- `value`: The value to compare.

Returns: `true` if `value` matches the end of `span`; otherwise, `false`.

To be added.

## MemoryExtensions.EndsWith<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static bool EndsWith<T> (this Span<T> span, ReadOnlySpan<T> value) where T : IEquatable<T>;
```

Determines whether the specified sequence appears at the end of a span.

Parameters:

- `T`: The type of the span.
- `span`: The source span.
- `value`: The sequence to compare to the end of the source span.

Returns: `true` if `value` matches the end of `span`; otherwise, `false`.

To be added.

## MemoryExtensions.EndsWith<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static bool EndsWith<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Determines whether the specified sequence appears at the end of the read-only span.

Parameters:

- `T`: To be added.
- `span`: The source span.
- `value`: The sequence to compare to the end of `span`.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: To be added.

To be added.

## MemoryExtensions.EndsWith<T>(ReadOnlySpan<T>, T, IEqualityComparer<T>) method

```csharp
public static bool EndsWith<T> (this ReadOnlySpan<T> span, T value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Determines whether the specified value appears at the end of the span.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `value`: The value to compare.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: `true` if `value` matches the end of `span`; otherwise, `false`.

To be added.

## MemoryExtensions.EnumerateLines(Char>) method

```csharp
public static System.Text.SpanLineEnumerator EnumerateLines (this ReadOnlySpan<char> span);
```

Returns an enumeration of lines over the provided span.

Parameters:

- `span`: A span containing the lines to enumerate.

Returns: An enumeration of lines.

#### Remarks

It is recommended that protocol parsers not utilize this API. See the documentation
for `ReplaceLineEndings` for more information on how newline
sequences are detected.

## MemoryExtensions.EnumerateLines(Char>) method

```csharp
public static System.Text.SpanLineEnumerator EnumerateLines (this Span<char> span);
```

Returns an enumeration of lines over the provided span.

Parameters:

- `span`: A span containing the lines to enumerate.

Returns: An enumeration of lines.

#### Remarks

It is recommended that protocol parsers not utilize this API. See the documentation
for `ReplaceLineEndings` for more information on how newline
sequences are detected.

## MemoryExtensions.EnumerateRunes(Char>) method

```csharp
public static System.Text.SpanRuneEnumerator EnumerateRunes (this ReadOnlySpan<char> span);
```

Returns an enumeration of `Rune` from the provided read-only span.

Parameters:

- `span`: The source span.

Returns: A rune enumerator.

#### Remarks

Invalid sequences will be represented in the enumeration by `ReplacementChar`.

## MemoryExtensions.EnumerateRunes(Char>) method

```csharp
public static System.Text.SpanRuneEnumerator EnumerateRunes (this Span<char> span);
```

Returns an enumeration of `Rune` from the provided span.

Parameters:

- `span`: The source span.

Returns: A rune enumerator.

#### Remarks

Invalid sequences will be represented in the enumeration by `ReplacementChar`.

## MemoryExtensions.Equals(Char>, Char>, StringComparison) method

```csharp
public static bool Equals (this ReadOnlySpan<char> span, ReadOnlySpan<char> other, StringComparison comparisonType);
```

Determines whether this `span` and the specified `other` span have the same characters when compared using the specified `comparisonType` option.

Parameters:

- `span`: The source span.
- `other`: The value to compare with the source span.
- `comparisonType`: An enumeration value that determines how `span` and `other` are compared.

Returns: `true` if equal, `false` otherwise.

To be added.

## MemoryExtensions.IndexOf(Char>, Char>, StringComparison) method

```csharp
public static int IndexOf (this ReadOnlySpan<char> span, ReadOnlySpan<char> value, StringComparison comparisonType);
```

Reports the zero-based index of the first occurrence of the specified `value` in the current `span`.

Parameters:

- `span`: The source span.
- `value`: The value to seek within the source span.
- `comparisonType`: An enumeration value that determines how `span` and `value` are compared.

Returns: The index of the occurrence of the value in the span.

To be added.
