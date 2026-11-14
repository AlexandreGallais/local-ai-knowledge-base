---
title: "MemoryExtensions class (part 6 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions class (part 6 of 12)

## MemoryExtensions.IndexOfAnyExcept<T>(Span<T>, T) method

```csharp
public static int IndexOfAnyExcept<T> (this Span<T> span, T value) where T : IEquatable<T>;
```

Searches for the first index of any value other than the specified `value`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value`: The value to avoid.

Returns: The index in the span of the first occurrence of any value other than `value`.
If all of the values are `value`, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExcept<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static int IndexOfAnyExcept<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> values, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the first index of any value other than the specified `values`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The values to avoid.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The index in the span of the first occurrence of any value other than those in `values`.

If all of the values are in `values`, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExcept<T>(ReadOnlySpan<T>, T, IEqualityComparer<T>) method

```csharp
public static int IndexOfAnyExcept<T> (this ReadOnlySpan<T> span, T value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the first index of any value other than the specified `value`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value`: The value to avoid.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The index in the span of the first occurrence of any value other than `value`. If all of the values are `value`, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExcept<T>(ReadOnlySpan<T>, T, T) method

```csharp
public static int IndexOfAnyExcept<T> (this ReadOnlySpan<T> span, T value0, T value1) where T : IEquatable<T>;
```

Searches for the first index of any value other than the two specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to avoid.
- `value1`: The second value to avoid.

Returns: The index in the span of the first occurrence of any value other than `value0` and `value1`. If all of the values are `value0` or `value1`, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExcept<T>(Span<T>, T, T) method

```csharp
public static int IndexOfAnyExcept<T> (this Span<T> span, T value0, T value1) where T : IEquatable<T>;
```

Searches for the first index of any value other than the two specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to avoid.
- `value1`: The second value to avoid.

Returns: The index in the span of the first occurrence of any value other than `value0` and `value1`. If all of the values are `value0` or `value1`, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExcept<T>(ReadOnlySpan<T>, T, T, IEqualityComparer<T>) method

```csharp
public static int IndexOfAnyExcept<T> (this ReadOnlySpan<T> span, T value0, T value1, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the first index of any value other than the two specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to avoid.
- `value1`: The second value to avoid.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The index in the span of the first occurrence of any value other than `value0` and `value1`. If all of the values are `value0` or `value1`, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExcept<T>(ReadOnlySpan<T>, T, T, T) method

```csharp
public static int IndexOfAnyExcept<T> (this ReadOnlySpan<T> span, T value0, T value1, T value2) where T : IEquatable<T>;
```

Searches for the first index of any value other than `value0`, `value1`, or `value2`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to avoid.
- `value1`: The second value to avoid.
- `value2`: The third value to avoid.

Returns: The index in the span of the first occurrence of any value other than `value0`, `value1`, and `value2`. If all of the values are `value0`, `value1`, and `value2`, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExcept<T>(Span<T>, T, T, T) method

```csharp
public static int IndexOfAnyExcept<T> (this Span<T> span, T value0, T value1, T value2) where T : IEquatable<T>;
```

Searches for the first index of any value other than `value0`, `value1`, or `value2`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to avoid.
- `value1`: The second value to avoid.
- `value2`: The third value to avoid.

Returns: The index in the span of the first occurrence of any value other than `value0`, `value1`, and `value2`. If all of the values are `value0`, `value1`, and `value2`, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExcept<T>(ReadOnlySpan<T>, T, T, T, IEqualityComparer<T>) method

```csharp
public static int IndexOfAnyExcept<T> (this ReadOnlySpan<T> span, T value0, T value1, T value2, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the first index of any value other than `value0`, `value1`, or `value2`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to avoid.
- `value1`: The second value to avoid.
- `value2`: The third value to avoid.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The index in the span of the first occurrence of any value other than `value0`, `value1`, and `value2`.

If all of the values are `value0`, `value1`, and `value2`, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExceptInRange<T>(ReadOnlySpan<T>, T, T) method

```csharp
public static int IndexOfAnyExceptInRange<T> (this ReadOnlySpan<T> span, T lowInclusive, T highInclusive) where T : IComparable<T>;
```

Searches for the first index of any value outside of the range between `lowInclusive` and `highInclusive`, inclusive.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `lowInclusive`: The lower bound, inclusive, of the excluded range.
- `highInclusive`: The upper bound, inclusive, of the excluded range.

Returns: The index in the span of the first occurrence of any value outside of the specified range.
If all of the values are inside of the specified range, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExceptInRange<T>(Span<T>, T, T) method

```csharp
public static int IndexOfAnyExceptInRange<T> (this Span<T> span, T lowInclusive, T highInclusive) where T : IComparable<T>;
```

Searches for the first index of any value outside of the range between `lowInclusive` and `highInclusive`, inclusive.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `lowInclusive`: The lower bound, inclusive, of the excluded range.
- `highInclusive`: The upper bound, inclusive, of the excluded range.

Returns: The index in the span of the first occurrence of any value outside of the specified range.
If all of the values are inside of the specified range, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExceptWhiteSpace(Char>) method

```csharp
public static int IndexOfAnyExceptWhiteSpace (this ReadOnlySpan<char> span);
```

To be added.

Parameters:

- `span`: To be added.

Returns: To be added.

To be added.

## MemoryExtensions.IndexOfAnyInRange<T>(ReadOnlySpan<T>, T, T) method

```csharp
public static int IndexOfAnyInRange<T> (this ReadOnlySpan<T> span, T lowInclusive, T highInclusive) where T : IComparable<T>;
```

Searches for the first index of any value in the range between `lowInclusive` and `highInclusive`, inclusive.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `lowInclusive`: The lower bound, inclusive, of the range for which to search.
- `highInclusive`: The upper bound, inclusive, of the range for which to search.

Returns: The index in the span of the first occurrence of any value in the specified range.
If all of the values are outside of the specified range, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyInRange<T>(Span<T>, T, T) method

```csharp
public static int IndexOfAnyInRange<T> (this Span<T> span, T lowInclusive, T highInclusive) where T : IComparable<T>;
```

Searches for the first index of any value in the range between `lowInclusive` and `highInclusive`, inclusive.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `lowInclusive`: The lower bound, inclusive, of the range for which to search.
- `highInclusive`: The upper bound, inclusive, of the range for which to search.

Returns: The index in the span of the first occurrence of any value in the specified range.
If all of the values are outside of the specified range, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyWhiteSpace(Char>) method

```csharp
public static int IndexOfAnyWhiteSpace (this ReadOnlySpan<char> span);
```

To be added.

Parameters:

- `span`: To be added.

Returns: To be added.

To be added.

## MemoryExtensions.IsWhiteSpace(Char>) method

```csharp
public static bool IsWhiteSpace (this ReadOnlySpan<char> span);
```

Indicates whether the specified span is empty or contains only whitespace characters.

Parameters:

- `span`: The source span.

Returns: `true` if the span is empty or contains only whitespace characters, `false` otherwise.

To be added.

## MemoryExtensions.LastIndexOf(Char>, Char>, StringComparison) method

```csharp
public static int LastIndexOf (this ReadOnlySpan<char> span, ReadOnlySpan<char> value, StringComparison comparisonType);
```

Reports the zero-based index of the last occurrence of the specified `value` in the current `span`.

Parameters:

- `span`: The source span.
- `value`: The value to seek within the source span.
- `comparisonType`: An enumeration value that determines how `span` and `value` are compared.

Returns: The index of the last occurrence of the value in the span.

To be added.

## MemoryExtensions.LastIndexOf<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static int LastIndexOf<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> value) where T : IEquatable<T>;
```

Searches for the specified sequence and returns the index of its last occurrence.

Parameters:

- `T`: The type of the span and value.
- `span`: The span to search.
- `value`: The sequence to search for.

Returns: The index of the last occurrence of the value in the span. If not found, returns -1.

Values are compared using IEquatable{T}.Equals(T).

## MemoryExtensions.LastIndexOf<T>(ReadOnlySpan<T>, T) method

```csharp
public static int LastIndexOf<T> (this ReadOnlySpan<T> span, T value) where T : IEquatable<T>;
```

Searches for the specified value and returns the index of its last occurrence.

Parameters:

- `T`: The type of the span and value.
- `span`: The span to search.
- `value`: The value to search for.

Returns: The index of the last occurrence of the value in the span. If not found, returns -1.

Values are compared using IEquatable{T}.Equals(T).

## MemoryExtensions.LastIndexOf<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static int LastIndexOf<T> (this Span<T> span, ReadOnlySpan<T> value) where T : IEquatable<T>;
```

Searches for the specified sequence and returns the index of its last occurrence.

Parameters:

- `T`: The type of the span and value.
- `span`: The span to search.
- `value`: The sequence to search for.

Returns: The index of the last occurrence of the value in the span. If not found, returns -1.

Values are compared using IEquatable{T}.Equals(T).

## MemoryExtensions.LastIndexOf<T>(Span<T>, T) method

```csharp
public static int LastIndexOf<T> (this Span<T> span, T value) where T : IEquatable<T>;
```

Searches for the specified value and returns the index of its last occurrence.

Parameters:

- `T`: The type of the span and value.
- `span`: The span to search.
- `value`: The value to search for.

Returns: The index of the last occurrence of the value in the span. If not found, returns -1.

Values are compared using IEquatable{T}.Equals(T).

## MemoryExtensions.LastIndexOf<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static int LastIndexOf<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the specified sequence and returns the index of its last occurrence. If not found, returns -1.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value`: The sequence to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: To be added.

Values are compared using IEquatable{T}.Equals(T).

## MemoryExtensions.LastIndexOf<T>(ReadOnlySpan<T>, T, IEqualityComparer<T>) method

```csharp
public static int LastIndexOf<T> (this ReadOnlySpan<T> span, T value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the specified value and returns the index of its last occurrence. If not found, returns -1.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value`: The value to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: To be added.

Values are compared using IEquatable{T}.Equals(T).

## MemoryExtensions.LastIndexOfAny<T>(ReadOnlySpan<T>, SearchValues<T>) method

```csharp
public static int LastIndexOfAny<T> (this ReadOnlySpan<T> span, System.Buffers.SearchValues<T> values) where T : IEquatable<T>;
```

Searches for the last index of any of the specified values.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `values`: The set of values to search for.

Returns: The last index of any of the specified values, or -1 if none are found.

This method is similar to calling LastIndexOf several times with the logical OR operator.
