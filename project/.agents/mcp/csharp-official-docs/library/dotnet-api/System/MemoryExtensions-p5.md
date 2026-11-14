---
title: "MemoryExtensions class (part 5 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions class (part 5 of 12)

## MemoryExtensions.IndexOf<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static int IndexOf<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> value) where T : IEquatable<T>;
```

Searches for the specified sequence and returns the index of its first occurrence.

Parameters:

- `T`: The type of the span and value.
- `span`: The span to search.
- `value`: The sequence to search for.

Returns: The index of the occurrence of the value in the span. If not found, returns -1.

Values are compared using IEquatable{T}.Equals(T).

## MemoryExtensions.IndexOf<T>(ReadOnlySpan<T>, T) method

```csharp
public static int IndexOf<T> (this ReadOnlySpan<T> span, T value) where T : IEquatable<T>;
```

Searches for the specified value and returns the index of its first occurrence.

Parameters:

- `T`: The type of the span and value.
- `span`: The span to search.
- `value`: The value to search for.

Returns: The index of the occurrence of the value in the span. If not found, returns -1.

Values are compared using IEquatable{T}.Equals(T).

## MemoryExtensions.IndexOf<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static int IndexOf<T> (this Span<T> span, ReadOnlySpan<T> value) where T : IEquatable<T>;
```

Searches for the specified sequence and returns the index of its first occurrence.

Parameters:

- `T`: The type of the span and value.
- `span`: The span to search.
- `value`: The sequence to search for.

Returns: The index of the occurrence of the value in the span. If not found, returns -1.

Values are compared using IEquatable{T}.Equals(T).

## MemoryExtensions.IndexOf<T>(Span<T>, T) method

```csharp
public static int IndexOf<T> (this Span<T> span, T value) where T : IEquatable<T>;
```

Searches for the specified value and returns the index of its first occurrence.

Parameters:

- `T`: The type of the span and value.
- `span`: The span to search.
- `value`: The value to search for.

Returns: The index of the occurrence of the value in the span. If not found, returns -1.

Values are compared using `IEquatable{T}.Equals(T)`.

## MemoryExtensions.IndexOf<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static int IndexOf<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the specified sequence and returns the index of its first occurrence.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value`: The sequence to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The index of the first occurrence of the specified sequence. If not found, returns -1.

Values are compared using `IEquatable{T}.Equals(T)`.

## MemoryExtensions.IndexOf<T>(ReadOnlySpan<T>, T, IEqualityComparer<T>) method

```csharp
public static int IndexOf<T> (this ReadOnlySpan<T> span, T value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the specified value and returns the index of its first occurrence.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value`: The value to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The index of the first occurrence of the specified value. If not found, returns -1.

Values are compared using `IEquatable{T}.Equals(T)`.

## MemoryExtensions.IndexOfAny(Char>, String>) method

```csharp
public static int IndexOfAny (this ReadOnlySpan<char> span, System.Buffers.SearchValues<string> values);
```

Searches for the first index of any of the specified substring values.

Parameters:

- `span`: The span to search.
- `values`: The set of values to search for.

Returns: The first index of any of the specified values, or -1 if none are found.

To be added.

## MemoryExtensions.IndexOfAny(Char>, String>) method

```csharp
public static int IndexOfAny (this Span<char> span, System.Buffers.SearchValues<string> values);
```

Searches for the first index of any of the specified substring values.

Parameters:

- `span`: The span to search.
- `values`: The set of values to search for.

Returns: The first index of any of the specified values, or -1 if none are found.

To be added.

## MemoryExtensions.IndexOfAny<T>(ReadOnlySpan<T>, SearchValues<T>) method

```csharp
public static int IndexOfAny<T> (this ReadOnlySpan<T> span, System.Buffers.SearchValues<T> values) where T : IEquatable<T>;
```

Searches for the first index of any of the specified values.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `values`: The set of values to search for.

Returns: The first index of any of the specified values, or -1 if none are found.

This method is similar to calling IndexOf several times with the logical OR operator.

## MemoryExtensions.IndexOfAny<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static int IndexOfAny<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> values) where T : IEquatable<T>;
```

Searches for the first index of any of the specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The set of values to search for.

Returns: The first index of the occurrence of any of the values in the span. If not found, returns -1.

This method is similar to calling IndexOf several times with the logical OR operator.

## MemoryExtensions.IndexOfAny<T>(Span<T>, SearchValues<T>) method

```csharp
public static int IndexOfAny<T> (this Span<T> span, System.Buffers.SearchValues<T> values) where T : IEquatable<T>;
```

Searches for the first index of any of the specified values.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `values`: The set of values to search for.

Returns: The first index of any of the specified values, or -1 if none are found.

This method is similar to calling IndexOf several times with the logical OR operator.

## MemoryExtensions.IndexOfAny<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static int IndexOfAny<T> (this Span<T> span, ReadOnlySpan<T> values) where T : IEquatable<T>;
```

Searches for the first index of any of the specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The set of values to search for.

Returns: The first index of the occurrence of any of the values in the span. If not found, returns -1.

This method is similar to calling IndexOf several times with the logical OR operator.

## MemoryExtensions.IndexOfAny<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static int IndexOfAny<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> values, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the first index of any of the specified values.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `values`: The set of values to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The first index of any of the specified values. If not found, returns -1.

This method is similar to calling IndexOf several times with the logical OR operator.

## MemoryExtensions.IndexOfAny<T>(ReadOnlySpan<T>, T, T) method

```csharp
public static int IndexOfAny<T> (this ReadOnlySpan<T> span, T value0, T value1) where T : IEquatable<T>;
```

Searches for the first index of either of the specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.

Returns: The first index of the occurrence of any of the values in the span. If not found, returns -1.

This method is similar to calling IndexOf several times with the logical OR operator.

## MemoryExtensions.IndexOfAny<T>(Span<T>, T, T) method

```csharp
public static int IndexOfAny<T> (this Span<T> span, T value0, T value1) where T : IEquatable<T>;
```

Searches for the first index of any of the specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.

Returns: The first index of the occurrence of any of the values in the span. If not found, returns -1.

This method is similar to calling IndexOf several times with the logical OR operator.

## MemoryExtensions.IndexOfAny<T>(ReadOnlySpan<T>, T, T, IEqualityComparer<T>) method

```csharp
public static int IndexOfAny<T> (this ReadOnlySpan<T> span, T value0, T value1, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the first index of any of the specified values.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The first index of any of the specified values. If not found, returns -1.

This method is similar to calling IndexOf several times with the logical OR operator.

## MemoryExtensions.IndexOfAny<T>(ReadOnlySpan<T>, T, T, T) method

```csharp
public static int IndexOfAny<T> (this ReadOnlySpan<T> span, T value0, T value1, T value2) where T : IEquatable<T>;
```

Searches for the first index of any of the specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.
- `value2`: The third value to search for.

Returns: The first index of the occurrence of any of the values in the span. If not found, returns -1.

This method is similar to calling IndexOf several times with the logical OR operator.

## MemoryExtensions.IndexOfAny<T>(Span<T>, T, T, T) method

```csharp
public static int IndexOfAny<T> (this Span<T> span, T value0, T value1, T value2) where T : IEquatable<T>;
```

Searches for the first index of any of the specified values.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.
- `value2`: The third value to search for.

Returns: The first index of the occurrence of any of the values in the span. If not found, returns -1.

This method is similar to calling IndexOf several times with the logical OR operator.

## MemoryExtensions.IndexOfAny<T>(ReadOnlySpan<T>, T, T, T, IEqualityComparer<T>) method

```csharp
public static int IndexOfAny<T> (this ReadOnlySpan<T> span, T value0, T value1, T value2, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the first index of any of the specified values.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value0`: The first value to search for.
- `value1`: The second value to search for.
- `value2`: The third value to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The first index of any of the specified values. If not found, returns -1.

This method is similar to calling IndexOf several times with the logical OR operator.

## MemoryExtensions.IndexOfAnyExcept<T>(ReadOnlySpan<T>, SearchValues<T>) method

```csharp
public static int IndexOfAnyExcept<T> (this ReadOnlySpan<T> span, System.Buffers.SearchValues<T> values) where T : IEquatable<T>;
```

Searches for the first index of any value other than the specified `values`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The values to exclude from the search.

Returns: The index in the span of the first occurrence of any value other than those in `values`.
If all of the values are in `values`, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExcept<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static int IndexOfAnyExcept<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> values) where T : IEquatable<T>;
```

Searches for the first index of any value other than the specified `values`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The values to avoid.

Returns: The index in the span of the first occurrence of any value other than those in `values`.
If all of the values are in `values`, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExcept<T>(ReadOnlySpan<T>, T) method

```csharp
public static int IndexOfAnyExcept<T> (this ReadOnlySpan<T> span, T value) where T : IEquatable<T>;
```

Searches for the first index of any value other than the specified `value`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value`: The value to avoid.

Returns: The index in the span of the first occurrence of any value other than `value`.
If all of the values are `value`, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExcept<T>(Span<T>, SearchValues<T>) method

```csharp
public static int IndexOfAnyExcept<T> (this Span<T> span, System.Buffers.SearchValues<T> values) where T : IEquatable<T>;
```

Searches for the first index of any value other than the specified `values`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The values to exclude from the search.

Returns: The index in the span of the first occurrence of any value other than those in `values`.
If all of the values are in `values`, returns -1.

To be added.

## MemoryExtensions.IndexOfAnyExcept<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static int IndexOfAnyExcept<T> (this Span<T> span, ReadOnlySpan<T> values) where T : IEquatable<T>;
```

Searches for the first index of any value other than the specified `values`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `values`: The values to avoid.

Returns: The index in the span of the first occurrence of any value other than those in `values`.
If all of the values are in `values`, returns -1.

To be added.
