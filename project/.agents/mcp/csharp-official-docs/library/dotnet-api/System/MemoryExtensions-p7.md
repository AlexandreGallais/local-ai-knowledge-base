---
title: "MemoryExtensions class (part 7 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions class (part 7 of 12)

## MemoryExtensions.LastIndexOfAny<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static int LastIndexOfAny<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> values) where T : IEquatable<T>;
```

Searches for the last index of any of the specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The set of values to search for.

Returns: The index of the last occurrence of any of the values in the span. If not found, returns -1.

This method is similar to calling LastIndexOf several times with the logical OR operator.

## MemoryExtensions.LastIndexOfAny<T>(Span<T>, SearchValues<T>) method

```csharp
public static int LastIndexOfAny<T> (this Span<T> span, System.Buffers.SearchValues<T> values) where T : IEquatable<T>;
```

Searches for the last index of any of the specified values.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `values`: The set of values to search for.

Returns: The last index of any of the specified values, or -1 if none are found.

This method is similar to calling LastIndexOf several times with the logical OR operator.

## MemoryExtensions.LastIndexOfAny<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static int LastIndexOfAny<T> (this Span<T> span, ReadOnlySpan<T> values) where T : IEquatable<T>;
```

Searches for the last index of any of the specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The set of values to search for.

Returns: The index of the last occurrence of any of the values in the span. If not found, returns -1.

This method is similar to calling LastIndexOf several times with the logical OR operator.

## MemoryExtensions.LastIndexOfAny<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static int LastIndexOfAny<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> values, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the last index of any of the specified values.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `values`: The set of values to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The last index of any of the specified values, or -1 if none of the values are found.

This method is similar to calling LastIndexOf several times with the logical OR operator.

## MemoryExtensions.LastIndexOfAny<T>(ReadOnlySpan<T>, T, T) method

```csharp
public static int LastIndexOfAny<T> (this ReadOnlySpan<T> span, T value0, T value1) where T : IEquatable<T>;
```

Searches for the last index of any of the specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.

Returns: The index of the last occurrence of any of the values in the span. If not found, returns -1.

This method is similar to calling LastIndexOf several times with the logical OR operator.

## MemoryExtensions.LastIndexOfAny<T>(Span<T>, T, T) method

```csharp
public static int LastIndexOfAny<T> (this Span<T> span, T value0, T value1) where T : IEquatable<T>;
```

Searches for the last index of any of the specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.

Returns: The index of the last occurrence of any of the values in the span. If not found, returns -1.

This method is similar to calling LastIndexOf several times with the logical OR operator.

## MemoryExtensions.LastIndexOfAny<T>(ReadOnlySpan<T>, T, T, IEqualityComparer<T>) method

```csharp
public static int LastIndexOfAny<T> (this ReadOnlySpan<T> span, T value0, T value1, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the last index of any of the specified values.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The last index of any of the specified values. If none are found, returns -1.

This method is similar to calling LastIndexOf several times with the logical OR operator.

## MemoryExtensions.LastIndexOfAny<T>(ReadOnlySpan<T>, T, T, T) method

```csharp
public static int LastIndexOfAny<T> (this ReadOnlySpan<T> span, T value0, T value1, T value2) where T : IEquatable<T>;
```

Searches for the last index of any of the specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.
- `value2`: The third value to search for.

Returns: The index of the last occurrence of any of the values in the span. If not found, returns -1.

This method is similar to calling LastIndexOf several times with the logical OR operator.

## MemoryExtensions.LastIndexOfAny<T>(Span<T>, T, T, T) method

```csharp
public static int LastIndexOfAny<T> (this Span<T> span, T value0, T value1, T value2) where T : IEquatable<T>;
```

Searches for the last index of any of the specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.
- `value2`: The third value to search for.

Returns: The index of the last occurrence of any of the values in the span. If not found, returns -1.

This method is similar to calling LastIndexOf several times with the logical OR operator.

## MemoryExtensions.LastIndexOfAny<T>(ReadOnlySpan<T>, T, T, T, IEqualityComparer<T>) method

```csharp
public static int LastIndexOfAny<T> (this ReadOnlySpan<T> span, T value0, T value1, T value2, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the last index of any of the specified values.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.
- `value2`: The third value to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The last index of any of the specified values, or -1 if none are found.

This method is similar to calling LastIndexOf several times with the logical OR operator.

## MemoryExtensions.LastIndexOfAnyExcept<T>(ReadOnlySpan<T>, SearchValues<T>) method

```csharp
public static int LastIndexOfAnyExcept<T> (this ReadOnlySpan<T> span, System.Buffers.SearchValues<T> values) where T : IEquatable<T>;
```

Searches for the last index of any value other than the specified `values`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The values to exclude from the search.

Returns: The index in the span of the last occurrence of any value other than those in `values`.
If all of the values are in `values`, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExcept<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static int LastIndexOfAnyExcept<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> values) where T : IEquatable<T>;
```

Searches for the last index of any value other than the specified `values`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The values to avoid.

Returns: The index in the span of the first occurrence of any value other than those in `values`.
If all of the values are in `values`, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExcept<T>(ReadOnlySpan<T>, T) method

```csharp
public static int LastIndexOfAnyExcept<T> (this ReadOnlySpan<T> span, T value) where T : IEquatable<T>;
```

Searches for the last index of any value other than the specified `value`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value`: The value to avoid.

Returns: The index in the span of the last occurrence of any value other than `value`.
If all of the values are `value`, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExcept<T>(Span<T>, SearchValues<T>) method

```csharp
public static int LastIndexOfAnyExcept<T> (this Span<T> span, System.Buffers.SearchValues<T> values) where T : IEquatable<T>;
```

Searches for the last index of any value other than the specified `values`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The values to exclude from the search.

Returns: The index in the span of the last occurrence of any value other than those in `values`.
If all of the values are in `values`, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExcept<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static int LastIndexOfAnyExcept<T> (this Span<T> span, ReadOnlySpan<T> values) where T : IEquatable<T>;
```

Searches for the last index of any value other than the specified `values`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The values to avoid.

Returns: The index in the span of the last occurrence of any value other than those in `values`.
If all of the values are in `values`, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExcept<T>(Span<T>, T) method

```csharp
public static int LastIndexOfAnyExcept<T> (this Span<T> span, T value) where T : IEquatable<T>;
```

Searches for the last index of any value other than the specified `value`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value`: The value to avoid.

Returns: The index in the span of the last occurrence of any value other than `value`.
If all of the values are `value`, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExcept<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static int LastIndexOfAnyExcept<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> values, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the last index of any value other than the specified `values`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The values to avoid.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The index in the span of the first occurrence of any value other than those in `values`.

If all of the values are in `values`, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExcept<T>(ReadOnlySpan<T>, T, IEqualityComparer<T>) method

```csharp
public static int LastIndexOfAnyExcept<T> (this ReadOnlySpan<T> span, T value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the last index of any value other than the specified `value`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value`: The value to avoid.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The index in the span of the last occurrence of any value other than `value`.

If all of the values are `value`, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExcept<T>(ReadOnlySpan<T>, T, T) method

```csharp
public static int LastIndexOfAnyExcept<T> (this ReadOnlySpan<T> span, T value0, T value1) where T : IEquatable<T>;
```

Searches for the last index of any value other than the specified `value0` or `value1`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to avoid.
- `value1`: The second value to avoid.

Returns: The index in the span of the last occurrence of any value other than `value0` and `value1`.
If all of the values are `value0` or `value1`, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExcept<T>(Span<T>, T, T) method

```csharp
public static int LastIndexOfAnyExcept<T> (this Span<T> span, T value0, T value1) where T : IEquatable<T>;
```

Searches for the last index of any value other than the specified `value0` or `value1`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to avoid.
- `value1`: The second value to avoid.

Returns: The index in the span of the last occurrence of any value other than `value0` and `value1`.
If all of the values are `value0` or `value1`, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExcept<T>(ReadOnlySpan<T>, T, T, IEqualityComparer<T>) method

```csharp
public static int LastIndexOfAnyExcept<T> (this ReadOnlySpan<T> span, T value0, T value1, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the last index of any value other than the specified `value0` or `value1`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to avoid.
- `value1`: The second value to avoid.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The index in the span of the last occurrence of any value other than `value0` and `value1`.

If all of the values are `value0` or `value1`, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExcept<T>(ReadOnlySpan<T>, T, T, T) method

```csharp
public static int LastIndexOfAnyExcept<T> (this ReadOnlySpan<T> span, T value0, T value1, T value2) where T : IEquatable<T>;
```

Searches for the last index of any value other than the specified `value0`, `value1`, or `value2`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to avoid.
- `value1`: The second value to avoid.
- `value2`: The third value to avoid.

Returns: The index in the span of the last occurrence of any value other than `value0`, `value1`, and `value2`.
If all of the values are `value0`, `value1`, and `value2`, returns -1.

To be added.
