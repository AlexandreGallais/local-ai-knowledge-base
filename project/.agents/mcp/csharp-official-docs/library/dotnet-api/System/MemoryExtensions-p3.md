---
title: "MemoryExtensions class (part 3 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions class (part 3 of 12)

## MemoryExtensions.ContainsAny<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static bool ContainsAny<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> values, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for any occurrence of any of the specified `values` and returns `true` if found. If not found, returns `false`.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `values`: The set of values to search for.
- `comparer`: The comparer to use. If `null`, `EqualityComparer<T>.Default` is used.

Returns: To be added.

To be added.

## MemoryExtensions.ContainsAny<T>(ReadOnlySpan<T>, T, T) method

```csharp
public static bool ContainsAny<T> (this ReadOnlySpan<T> span, T value0, T value1) where T : IEquatable<T>;
```

Searches for an occurrence of `value0` or `value1`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.

Returns: `true` if found. If not found, returns `false`.

To be added.

## MemoryExtensions.ContainsAny<T>(Span<T>, T, T) method

```csharp
public static bool ContainsAny<T> (this Span<T> span, T value0, T value1) where T : IEquatable<T>;
```

Searches for an occurrence of `value0` or `value1`, and returns `true` if found. If not found, returns `false`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.

Returns: `true` if found. If not found, returns `false`.

To be added.

## MemoryExtensions.ContainsAny<T>(ReadOnlySpan<T>, T, T, IEqualityComparer<T>) method

```csharp
public static bool ContainsAny<T> (this ReadOnlySpan<T> span, T value0, T value1, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for an occurrence of either of the specified values.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: `true` if an occurrence of either value is found; otherwise `false`.

To be added.

## MemoryExtensions.ContainsAny<T>(ReadOnlySpan<T>, T, T, T) method

```csharp
public static bool ContainsAny<T> (this ReadOnlySpan<T> span, T value0, T value1, T value2) where T : IEquatable<T>;
```

Searches for an occurrence of `value0`, `value1`, or `value2` in the specified span.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.
- `value2`: The third value to search for.

Returns: `true` if any of the values is found; otherwise, `false`.

To be added.

## MemoryExtensions.ContainsAny<T>(Span<T>, T, T, T) method

```csharp
public static bool ContainsAny<T> (this Span<T> span, T value0, T value1, T value2) where T : IEquatable<T>;
```

Searches for an occurrence of `value0`, `value1`, or `value2` in the specified span.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.
- `value2`: The third value to search for.

Returns: `true` if any of the values is found; otherwise, `false`.

To be added.

## MemoryExtensions.ContainsAny<T>(ReadOnlySpan<T>, T, T, T, IEqualityComparer<T>) method

```csharp
public static bool ContainsAny<T> (this ReadOnlySpan<T> span, T value0, T value1, T value2, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for any occurrence of the specified values in the specified span.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.
- `value2`: The third value to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: `true` if any of the values is found; otherwise, `false`

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(ReadOnlySpan<T>, SearchValues<T>) method

```csharp
public static bool ContainsAnyExcept<T> (this ReadOnlySpan<T> span, System.Buffers.SearchValues<T> values) where T : IEquatable<T>;
```

Searches the specified span for any value other than the specified `values`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `values`: The set of values to exclude from the search.

Returns: `true` if any value other than those in `values` is present in the span. If all of the span's values are in `values`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static bool ContainsAnyExcept<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> values) where T : IEquatable<T>;
```

Searches the specified span for any value other than the specified `values`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `values`: The set of values to exclude from the search.

Returns: `true` if any value other than those in `values` is present in the span. If all of the span's values are in `values`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(ReadOnlySpan<T>, T) method

```csharp
public static bool ContainsAnyExcept<T> (this ReadOnlySpan<T> span, T value) where T : IEquatable<T>;
```

Searches the specified span for any value other than the specified `value`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `value`: The value to exclude from the search.

Returns: `true` if any value other than `value` is present in the span. If all of the span's values are `value`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(Span<T>, SearchValues<T>) method

```csharp
public static bool ContainsAnyExcept<T> (this Span<T> span, System.Buffers.SearchValues<T> values) where T : IEquatable<T>;
```

Searches the specified span for any value other than the specified `values`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `values`: The set of values to exclude from the search.

Returns: `true` if any value other than those in `values` is present in the span. If all of the span's values are in `values`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static bool ContainsAnyExcept<T> (this Span<T> span, ReadOnlySpan<T> values) where T : IEquatable<T>;
```

Searches the specified span for any value other than the specified `values`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `values`: The set of values to exclude from the search.

Returns: `true` if any value other than those in `values` is present in the span. If all of the span's values are in `values`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(Span<T>, T) method

```csharp
public static bool ContainsAnyExcept<T> (this Span<T> span, T value) where T : IEquatable<T>;
```

Searches the specified span for any value other than the specified `value`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `value`: The value to exclude from the search.

Returns: `true` if any value other than `value` is present in the span. If all of the span's values are `value`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static bool ContainsAnyExcept<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> values, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches the specified span for any value other than the specified `values`.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `values`: The values to avoid.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: `true` if any value other than those in `values` is present in the span. If all of the span's values are in `values`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(ReadOnlySpan<T>, T, IEqualityComparer<T>) method

```csharp
public static bool ContainsAnyExcept<T> (this ReadOnlySpan<T> span, T value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches the specified span for any value other than `value`.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value`: The value to avoid.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: `true` if any value other than `value` is present in the span. If all of the span's values are `value`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(ReadOnlySpan<T>, T, T) method

```csharp
public static bool ContainsAnyExcept<T> (this ReadOnlySpan<T> span, T value0, T value1) where T : IEquatable<T>;
```

Searches the specified span for any value other than `value0` or `value1`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `value0`: The first value to exclude from the search.
- `value1`: The second value to exclude from the search.

Returns: `true` if any value other than `value0` or `value1` is present in the span. If all of the span's values are `value0` or `value1`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(Span<T>, T, T) method

```csharp
public static bool ContainsAnyExcept<T> (this Span<T> span, T value0, T value1) where T : IEquatable<T>;
```

Searches the specified span for any value other than `value0` or `value1`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `value0`: The first value to exclude from the search.
- `value1`: The second value to exclude from the search.

Returns: `true` if any value other than `value0` or `value1` is present in the span. If all of the span's values are `value0` or `value1`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(ReadOnlySpan<T>, T, T, IEqualityComparer<T>) method

```csharp
public static bool ContainsAnyExcept<T> (this ReadOnlySpan<T> span, T value0, T value1, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for any value other than `value0` or `value1`.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value0`: The first value to avoid.
- `value1`: The second value to avoid.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: `true` if any value other than `value0` and `value1` is present in the span. If all of the span's values are `value0` or `value1`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(ReadOnlySpan<T>, T, T, T) method

```csharp
public static bool ContainsAnyExcept<T> (this ReadOnlySpan<T> span, T value0, T value1, T value2) where T : IEquatable<T>;
```

Searches for any value other than `value0`, `value1`, or `value2`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `value0`: The first value to exclude from the search.
- `value1`: The second value to exclude from the search.
- `value2`: The third value to exclude from the search.

Returns: `true` if any value other than `value0`, `value1`, or `value2` is present in the span. If all of the span's values are `value0`, `value1`, or `value2`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(Span<T>, T, T, T) method

```csharp
public static bool ContainsAnyExcept<T> (this Span<T> span, T value0, T value1, T value2) where T : IEquatable<T>;
```

Searches for any value other than `value0`, `value1`, or `value2`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `value0`: The first value to exclude from the search.
- `value1`: The second value to exclude from the search.
- `value2`: The third value to exclude from the search.

Returns: `true` if any value other than `value0`, `value1`, or `value2` is present in the span. If all of the span's values are `value0`, `value1`, or `value2`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExcept<T>(ReadOnlySpan<T>, T, T, T, IEqualityComparer<T>) method

```csharp
public static bool ContainsAnyExcept<T> (this ReadOnlySpan<T> span, T value0, T value1, T value2, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for any value other than `value0`, `value1`, or `value2`.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value0`: The first value to avoid.
- `value1`: The second value to avoid.
- `value2`: The third value to avoid.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: `true` if any value other than `value0`, `value1`, and `value2` is present in the span. If all of the span's values are `value0`, `value1`, or `value2`, returns `false`.

To be added.

## MemoryExtensions.ContainsAnyExceptInRange<T>(ReadOnlySpan<T>, T, T) method

```csharp
public static bool ContainsAnyExceptInRange<T> (this ReadOnlySpan<T> span, T lowInclusive, T highInclusive) where T : IComparable<T>;
```

Searches for any value outside of the range between `lowInclusive` and `highInclusive`, inclusive.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `lowInclusive`: The lower bound, inclusive, of the excluded range.
- `highInclusive`: The upper bound, inclusive, of the excluded range.

Returns: `true` if any value other than those in the specified range is present in the span. If all of the span's values are inside of the specified range, returns `false`.

To be added.
