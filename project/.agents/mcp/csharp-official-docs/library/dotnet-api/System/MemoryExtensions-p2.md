---
title: "MemoryExtensions class (part 2 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions class (part 2 of 12)

## MemoryExtensions.AsSpan<T>(T[], Int32, Int32) method

```csharp
public static Span<T> AsSpan<T> (this T[]? array, int start, int length);
```

Creates a new span over the portion of the target array beginning at a specified position for a specified length.

Parameters:

- `T`: The type of the array.
- `array`: The target array.
- `start`: The index at which to begin the span.
- `length`: The number of items in the span.

Returns: The span representation of the array.

Exceptions:

- `ArrayTypeMismatchException`: `array` is covariant, and the array's type is not exactly `T[]`".
- `ArgumentOutOfRangeException`: `start`, `length`, or `start` + `length` is not in the range of `array`.

#### Remarks

Returns `default` when `array` is `null`.

## MemoryExtensions.BinarySearch<T>(ReadOnlySpan<T>, IComparable<T>) method

```csharp
public static int BinarySearch<T> (this ReadOnlySpan<T> span, IComparable<T> comparable);
```

Searches an entire sorted `ReadOnlySpan<T>` for a value using the specified `IComparable<T>` generic interface.

Parameters:

- `T`: The element type of the span.
- `span`: The sorted `ReadOnlySpan<T>` to search.
- `comparable`: The `IComparable<T>` to use when comparing.

Returns: The zero-based index of `comparable` in the sorted `span`, if `comparable` is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `comparable` or, if there is no larger element, the bitwise complement of `ReadOnlySpan<T>.Length`.

Exceptions:

- `ArgumentNullException`: `comparable` is `null`.

To be added.

## MemoryExtensions.BinarySearch<T>(Span<T>, IComparable<T>) method

```csharp
public static int BinarySearch<T> (this Span<T> span, IComparable<T> comparable);
```

Searches an entire sorted `Span<T>` for a value using the specified `IComparable<T>` generic interface.

Parameters:

- `T`: The element type of the span.
- `span`: The sorted `Span<T>` to search.
- `comparable`: The `IComparable<T>` to use when comparing.

Returns: The zero-based index of `comparable` in the sorted `span`, if `comparable` is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `comparable` or, if there is no larger element, the bitwise complement of `Span<T>.Length`.

Exceptions:

- `ArgumentNullException`: `comparable` is `null`.

To be added.

## MemoryExtensions.BinarySearch<T,TComparable>(ReadOnlySpan<T>, TComparable) method

```csharp
public static int BinarySearch<T,TComparable> (this ReadOnlySpan<T> span, TComparable comparable) where TComparable : IComparable<T>, allows ref struct;
```

Searches an entire sorted `ReadOnlySpan<T>` for a value using the specified `TComparable` generic type.

Parameters:

- `T`: The element type of the span.
- `TComparable`: The specific type of `IComparable<T>`.
- `span`: The sorted `ReadOnlySpan<T>` to search.
- `comparable`: The `TComparable` to use when comparing.

Returns: The zero-based index of `comparable` in the sorted `span`, if `comparable` is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `comparable` or, if there is no larger element, the bitwise complement of `ReadOnlySpan<T>.Length`.

Exceptions:

- `ArgumentNullException`: `comparable` is `null`.

To be added.

## MemoryExtensions.BinarySearch<T,TComparable>(Span<T>, TComparable) method

```csharp
public static int BinarySearch<T,TComparable> (this Span<T> span, TComparable comparable) where TComparable : IComparable<T>, allows ref struct;
```

Searches an entire sorted `Span<T>` for a value using the specified `TComparable` generic type.

Parameters:

- `T`: The element type of the span.
- `TComparable`: The specific type of `IComparable<T>`.
- `span`: The sorted `Span<T>` to search.
- `comparable`: The `TComparable` to use when comparing.

Returns: The zero-based index of `comparable` in the sorted `span`, if `comparable` is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `comparable` or, if there is no larger element, the bitwise complement of `Span<T>.Length`.

Exceptions:

- `ArgumentNullException`: `comparable` is `null`.

To be added.

## MemoryExtensions.BinarySearch<T,TComparer>(ReadOnlySpan<T>, T, TComparer) method

```csharp
public static int BinarySearch<T,TComparer> (this ReadOnlySpan<T> span, T value, TComparer comparer) where TComparer : System.Collections.Generic.IComparer<T>, allows ref struct;
```

Searches an entire sorted `ReadOnlySpan<T>` for a specified value using the specified `TComparer` generic type.

Parameters:

- `T`: The element type of the span.
- `TComparer`: The specific type of `IComparer<T>`.
- `span`: The sorted `ReadOnlySpan<T>` to search.
- `value`: The object to locate. The value can be `null` for reference types.
- `comparer`: The `TComparer` to use when comparing.

Returns: The zero-based index of `value` in the sorted `span`, if `value` is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `value` or, if there is no larger element, the bitwise complement of `ReadOnlySpan<T>.Length`.

Exceptions:

- `ArgumentNullException`: `comparer` is `null`.

To be added.

## MemoryExtensions.BinarySearch<T,TComparer>(Span<T>, T, TComparer) method

```csharp
public static int BinarySearch<T,TComparer> (this Span<T> span, T value, TComparer comparer) where TComparer : System.Collections.Generic.IComparer<T>, allows ref struct;
```

Searches an entire sorted `Span<T>` for a specified value using the specified `TComparer` generic type.

Parameters:

- `T`: The element type of the span.
- `TComparer`: The specific type of `IComparer<T>`.
- `span`: The sorted `Span<T>` to search.
- `value`: The object to locate. The value can be `null` for reference types.
- `comparer`: The `TComparer` to use when comparing.

Returns: The zero-based index of `value` in the sorted `span`, if `value` is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `value` or, if there is no larger element, the bitwise complement of `Span<T>.Length`.

Exceptions:

- `ArgumentNullException`: `comparer` is `null`.

To be added.

## MemoryExtensions.CommonPrefixLength<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static int CommonPrefixLength<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> other);
```

Finds the length of any common prefix shared between `span` and `other`.

Parameters:

- `T`: The type of the elements in the spans.
- `span`: The first sequence to compare.
- `other`: The second sequence to compare.

Returns: The length of the common prefix shared by the two spans.  If there's no shared prefix, 0 is returned.

To be added.

## MemoryExtensions.CommonPrefixLength<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static int CommonPrefixLength<T> (this Span<T> span, ReadOnlySpan<T> other);
```

Finds the length of any common prefix shared between `span` and `other`.

Parameters:

- `T`: The type of the elements in the spans.
- `span`: The first sequence to compare.
- `other`: The second sequence to compare.

Returns: The length of the common prefix shared by the two spans.  If there's no shared prefix, 0 is returned.

To be added.

## MemoryExtensions.CommonPrefixLength<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static int CommonPrefixLength<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> other, System.Collections.Generic.IEqualityComparer<T>? comparer);
```

Determines the length of any common prefix shared between `span` and `other`.

Parameters:

- `T`: The type of the elements in the sequences.
- `span`: The first sequence to compare.
- `other`: The second sequence to compare.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The length of the common prefix shared by the two spans.  If there's no shared prefix, 0 is returned.

To be added.

## MemoryExtensions.CommonPrefixLength<T>(Span<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static int CommonPrefixLength<T> (this Span<T> span, ReadOnlySpan<T> other, System.Collections.Generic.IEqualityComparer<T>? comparer);
```

Finds the length of any common prefix shared between `span` and `other`.

Parameters:

- `T`: The type of the elements in the spans.
- `span`: The first sequence to compare.
- `other`: The second sequence to compare.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The length of the common prefix shared by the two spans.  If there's no shared prefix, 0 is returned.

To be added.

## MemoryExtensions.CompareTo(Char>, Char>, StringComparison) method

```csharp
public static int CompareTo (this ReadOnlySpan<char> span, ReadOnlySpan<char> other, StringComparison comparisonType);
```

Compares one character span with another using a specified string comparison, and returns an integer that indicates their relative position in the sort order.

Parameters:

- `span`: The source span.
- `other`: The value to compare with the source span.
- `comparisonType`: An enumeration value that determines how `span` and `other` are compared.

Returns: A signed integer that indicates the relative order of `span` and `other`:   - If less than 0, `span` precedes than `other`.   - If 0, `span` equals `other`.   - If greater than 0, `span` follows `other`.

To be added.

## MemoryExtensions.Contains(Char>, Char>, StringComparison) method

```csharp
public static bool Contains (this ReadOnlySpan<char> span, ReadOnlySpan<char> value, StringComparison comparisonType);
```

Indicates whether a specified value occurs within a read-only character span.

Parameters:

- `span`: The source span.
- `value`: The value to seek within the source span.
- `comparisonType`: An enumeration value that determines how the characters in `span` and `value` are compared.

Returns: `true` if `value` occurs within the span, `false` otherwise.

To be added.

## MemoryExtensions.Contains<T>(ReadOnlySpan<T>, T) method

```csharp
public static bool Contains<T> (this ReadOnlySpan<T> span, T value) where T : IEquatable<T>;
```

Indicates whether a specified value is found in a read-only span.

Parameters:

- `T`: The type of the span.
- `span`: The span to search.
- `value`: The value to search for.

Returns: `true` if found, `false` otherwise.

Values are compared using IEquatable{T}.Equals(T).

## MemoryExtensions.Contains<T>(Span<T>, T) method

```csharp
public static bool Contains<T> (this Span<T> span, T value) where T : IEquatable<T>;
```

Indicates whether a specified value is found in a span.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `value`: The value to search for.

Returns: `true` if found, `false` otherwise.

Values are compared using IEquatable{T}.Equals(T).

## MemoryExtensions.Contains<T>(ReadOnlySpan<T>, T, IEqualityComparer<T>) method

```csharp
public static bool Contains<T> (this ReadOnlySpan<T> span, T value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the specified value and returns `true` if found. If not found, returns `false`.

Parameters:

- `T`: To be added.
- `span`: The span to search.
- `value`: The value to search for.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: To be added.

To be added.

## MemoryExtensions.ContainsAny(Char>, String>) method

```csharp
public static bool ContainsAny (this ReadOnlySpan<char> span, System.Buffers.SearchValues<string> values);
```

Searches for any occurrence of any of the specified substring `values`.

Parameters:

- `span`: The span to search.
- `values`: The set of values to search for.

Returns: `true` if found. If not found, returns `false`.

To be added.

## MemoryExtensions.ContainsAny(Char>, String>) method

```csharp
public static bool ContainsAny (this Span<char> span, System.Buffers.SearchValues<string> values);
```

To be added.

Parameters:

- `span`: To be added.
- `values`: To be added.

Returns: To be added.

To be added.

## MemoryExtensions.ContainsAny<T>(ReadOnlySpan<T>, SearchValues<T>) method

```csharp
public static bool ContainsAny<T> (this ReadOnlySpan<T> span, System.Buffers.SearchValues<T> values) where T : IEquatable<T>;
```

Searches for an occurrence of any of the specified `values`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `values`: The set of values to search for.

Returns: `true` if found. If not found, returns `false`.

To be added.

## MemoryExtensions.ContainsAny<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static bool ContainsAny<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> values) where T : IEquatable<T>;
```

Searches for an occurrence of any of the specified `values`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `values`: The set of values to search for.

Returns: `true` if found. If not found, returns `false`.

To be added.

## MemoryExtensions.ContainsAny<T>(Span<T>, SearchValues<T>) method

```csharp
public static bool ContainsAny<T> (this Span<T> span, System.Buffers.SearchValues<T> values) where T : IEquatable<T>;
```

Searches for an occurrence of any of the specified `values` and returns `true` if found. If not found, returns `false`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `values`: The set of values to search for.

Returns: `true` if found. If not found, returns `false`.

To be added.

## MemoryExtensions.ContainsAny<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static bool ContainsAny<T> (this Span<T> span, ReadOnlySpan<T> values) where T : IEquatable<T>;
```

Searches for an occurrence of any of the specified `values` and returns `true` if found. If not found, returns `false`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `values`: The set of values to search for.

Returns: `true` if found. If not found, returns `false`.

To be added.
