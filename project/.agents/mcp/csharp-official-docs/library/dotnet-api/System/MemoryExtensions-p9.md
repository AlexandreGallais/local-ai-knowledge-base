---
title: "MemoryExtensions class (part 9 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions class (part 9 of 12)

## MemoryExtensions.SequenceCompareTo<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static int SequenceCompareTo<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> other) where T : IComparable<T>;
```

Determines the relative order of two read-only sequences by comparing their elements using IComparable{T}.CompareTo(T).

Parameters:

- `T`: The type of elements in the sequence.
- `span`: The first sequence to compare.
- `other`: The second sequence to compare.

Returns: A signed integer that indicates the relative order of `span` and `other`:   - If less than 0, `span` precedes than `other`.   - If 0, `span` equals `other`.   - If greater than 0, `span` follows `other`.

To be added.

## MemoryExtensions.SequenceCompareTo<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static int SequenceCompareTo<T> (this Span<T> span, ReadOnlySpan<T> other) where T : IComparable<T>;
```

Determines the relative order of a span and a read-only span by comparing the elements using IComparable{T}.CompareTo(T).

Parameters:

- `T`: The type of elements in the span.
- `span`: The span to compare.
- `other`: The read-only span to compare.

Returns: A signed integer that indicates the relative order of `span` and `other`:   - If less than 0, `span` precedes than `other`.   - If 0, `span` equals `other`.   - If greater than 0, `span` follows `other`.

To be added.

## MemoryExtensions.SequenceCompareTo<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IComparer<T>) method

```csharp
public static int SequenceCompareTo<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> other, System.Collections.Generic.IComparer<T>? comparer = default);
```

Determines the relative order of the sequences being compared by comparing the elements using IComparable{T}.CompareTo(T).

Parameters:

- `T`: To be added.
- `span`: To be added.
- `other`: To be added.
- `comparer`: To be added.

Returns: To be added.

To be added.

## MemoryExtensions.SequenceEqual<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static bool SequenceEqual<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> other) where T : IEquatable<T>;
```

Determines whether two read-only sequences are equal by comparing the elements using IEquatable{T}.Equals(T).

Parameters:

- `T`: The type of elements in the sequence.
- `span`: The first sequence to compare.
- `other`: The second sequence to compare.

Returns: `true` if the two sequences are equal; otherwise, `false`.

To be added.

## MemoryExtensions.SequenceEqual<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static bool SequenceEqual<T> (this Span<T> span, ReadOnlySpan<T> other) where T : IEquatable<T>;
```

Determines whether a span and a read-only span are equal by comparing the elements using IEquatable{T}.Equals(T).

Parameters:

- `T`: The type of elements in the sequence.
- `span`: The span to compare.
- `other`: The read-only span to compare.

Returns: `true` if the two sequences are equal; otherwise, `false`.

To be added.

## MemoryExtensions.SequenceEqual<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static bool SequenceEqual<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> other, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Determines whether two sequences are equal by comparing the elements using an `IEqualityComparer<T>`.

Parameters:

- `T`: The type of elements in the sequence.
- `span`: The first sequence to compare.
- `other`: The second sequence to compare.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: `true` if the two sequences are equal; otherwise, `false`.

To be added.

## MemoryExtensions.SequenceEqual<T>(Span<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static bool SequenceEqual<T> (this Span<T> span, ReadOnlySpan<T> other, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Determines whether two sequences are equal by comparing the elements using an `IEqualityComparer<T>`.

Parameters:

- `T`: The type of elements in the sequence.
- `span`: The first sequence to compare.
- `other`: The second sequence to compare.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: `true` if the two sequences are equal; otherwise, `false`.

To be added.

## MemoryExtensions.Sort<T>(Span<T>) method

```csharp
public static void Sort<T> (this Span<T> span);
```

Sorts the elements in the entire `Span<T>` using the `IComparable<T>` implementation of each element of the `Span<T>`.

Parameters:

- `T`: The type of the elements of the span.
- `span`: The span of memory to sort.

Exceptions:

- `InvalidOperationException`: One or more elements in `span` do not implement the `IComparable<T>` interface.

To be added.

## MemoryExtensions.Sort<T>(Span<T>, Comparison<T>) method

```csharp
public static void Sort<T> (this Span<T> span, Comparison<T> comparison);
```

Sorts the elements in the entire `Span<T>` using the specified `Comparison<T>`.

Parameters:

- `T`: The type of the elements of the span.
- `span`: The span of memory to sort.
- `comparison`: The method to use when comparing elements.

Exceptions:

- `ArgumentNullException`: `comparison` is `null`.

To be added.

## MemoryExtensions.Sort<T,TComparer>(Span<T>, TComparer) method

```csharp
public static void Sort<T,TComparer> (this Span<T> span, TComparer comparer) where TComparer : System.Collections.Generic.IComparer<T>;
```

Sorts the elements in the entire `Span<T>` using the `TComparer`.

Parameters:

- `T`: The type of the elements of the span.
- `TComparer`: The type of the comparer to use to compare elements.
- `span`: The span of memory to sort.
- `comparer`: The method to use when comparing elements, or `null` to use each element's `IComparable<T>` interface implementation.

Exceptions:

- `InvalidOperationException`: `comparer` is `null`, and one or more elements in `span` do not implement the `IComparable<T>` interface.
- `ArgumentException`: The implementation of `comparer` caused an error during the sort.

To be added.

## MemoryExtensions.Sort<TKey,TValue>(Span<TKey>, Span<TValue>) method

```csharp
public static void Sort<TKey,TValue> (this Span<TKey> keys, Span<TValue> items);
```

Sorts a pair of spans (one containing the keys and the other containing the corresponding items) based on the keys in the first `Span<T>` using the `IComparable<T>` implementation of each key.

Parameters:

- `TKey`: The type of the elements of the key span.
- `TValue`: The type of the elements of the items span.
- `keys`: The span that contains the keys to sort.
- `items`: The span that contains the items that correspond to the keys in `keys`.

Exceptions:

- `ArgumentException`: The length of `keys` isn't equal to the length of `items`.
- `InvalidOperationException`: One or more elements in `keys` do not implement the `IComparable<T>` interface.

To be added.

## MemoryExtensions.Sort<TKey,TValue>(Span<TKey>, Span<TValue>, Comparison<TKey>) method

```csharp
public static void Sort<TKey,TValue> (this Span<TKey> keys, Span<TValue> items, Comparison<TKey> comparison);
```

Sorts a pair of spans (one containing the keys and the other containing the corresponding items) based on the keys in the first `Span<T>` using the specified comparison.

Parameters:

- `TKey`: The type of the elements of the key span.
- `TValue`: The type of the elements of the items span.
- `keys`: The span that contains the keys to sort.
- `items`: The span that contains the items that correspond to the keys in `keys`.
- `comparison`: The `Comparison<T>` to use when comparing elements.

Exceptions:

- `ArgumentNullException`: `comparison` is `null`.
- `ArgumentException`: The length of `keys` isn't equal to the length of `items`.

To be added.

## MemoryExtensions.Sort<TKey,TValue,TComparer>(Span<TKey>, Span<TValue>, TComparer) method

```csharp
public static void Sort<TKey,TValue,TComparer> (this Span<TKey> keys, Span<TValue> items, TComparer comparer) where TComparer : System.Collections.Generic.IComparer<TKey>;
```

Sorts a pair of spans (one containing the keys and the other containing the corresponding items) based on the keys in the first `Span<T>` using the specified comparer.

Parameters:

- `TKey`: The type of the elements of the key span.
- `TValue`: The type of the elements of the items span.
- `TComparer`: The type of the comparer to use to compare elements.
- `keys`: The span that contains the keys to sort.
- `items`: The span that contains the items that correspond to the keys in `keys`.
- `comparer`: The `IComparer<T>` implementation to use when comparing elements, or `null` to use the `IComparable<T>` interface implementation of each element.

Exceptions:

- `ArgumentException`: The length of `keys` isn't equal to the length of `items`.
- `InvalidOperationException`: `comparer` is `null`, and one or more elements in `keys` do not implement the `IComparable<T>` interface.

To be added.

## MemoryExtensions.Split(Char>, Range>, Char, StringSplitOptions) method

```csharp
public static int Split (this ReadOnlySpan<char> source, Span<Range> destination, char separator, StringSplitOptions options = System.StringSplitOptions.None);
```

Parses the source `ReadOnlySpan<T>` for the specified `separator`, populating the `destination` span with `Range` instances representing the regions between the separators.

Parameters:

- `source`: The source span to parse.
- `destination`: The destination span into which the resulting ranges are written.
- `separator`: A character that delimits the regions in this instance.
- `options`: A bitwise combination of the enumeration values that specifies whether to trim whitespace and include empty ranges.

Returns: The number of ranges written into `destination`.

Delimiter characters are not included in the elements of the returned array.

If the `destination` span is empty, or if the `options` specifies `StringSplitOptions.RemoveEmptyEntries` and `source` is empty, or if `options` specifies both `StringSplitOptions.RemoveEmptyEntries` and `StringSplitOptions.TrimEntries` and the `source` is entirely whitespace, no ranges are written to the destination.

If the span does not contain `separator`, or if `destination`'s length is 1, a single range will be output containing the entire `source`, subject to the processing implied by `options`.

If there are more regions in `source` than will fit in `destination`, the first `destination` length minus 1 ranges are stored in `destination`, and a range for the remainder of `source` is stored in `destination`.

## MemoryExtensions.Split(Char>, Range>, Char>, StringSplitOptions) method

```csharp
public static int Split (this ReadOnlySpan<char> source, Span<Range> destination, ReadOnlySpan<char> separator, StringSplitOptions options = System.StringSplitOptions.None);
```

Parses the source `ReadOnlySpan<T>` for the specified `separator`, populating the `destination` span with `Range` instances representing the regions between the separators.

Parameters:

- `source`: The source span to parse.
- `destination`: The destination span into which the resulting ranges are written.
- `separator`: A character that delimits the regions in this instance.
- `options`: A bitwise combination of the enumeration values that specifies whether to trim whitespace and include empty ranges.

Returns: The number of ranges written into `destination`.

Delimiter characters are not included in the elements of the returned array.

If the `destination` span is empty, or if the `options` specifies `StringSplitOptions.RemoveEmptyEntries` and `source` is empty, or if `options` specifies both `StringSplitOptions.RemoveEmptyEntries` and `StringSplitOptions.TrimEntries` and the `source` is entirely whitespace, no ranges are written to the destination.

If the span does not contain `separator`, or if `destination`'s length is 1, a single range will be output containing the entire `source`, subject to the processing implied by `options`.

If there are more regions in `source` than will fit in `destination`, the first `destination` length minus 1 ranges are stored in `destination`, and a range for the remainder of `source` is stored in `destination`.

## MemoryExtensions.Split<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static MemoryExtensions.SpanSplitEnumerator<T> Split<T> (this ReadOnlySpan<T> source, ReadOnlySpan<T> separator) where T : IEquatable<T>;
```

Returns a type that allows for enumeration of each element within a split span using the provided separator span.

Parameters:

- `T`: The type of the elements.
- `source`: The source span to be enumerated.
- `separator`: The separator span to be used to split the provided span.

Returns: An enumerator that can be used to enumerate each element in a split span using the provided separator span.

To be added.

## MemoryExtensions.Split<T>(ReadOnlySpan<T>, T) method

```csharp
public static MemoryExtensions.SpanSplitEnumerator<T> Split<T> (this ReadOnlySpan<T> source, T separator) where T : IEquatable<T>;
```

Returns a type that allows for enumeration of each element within a split span using the provided separator character.

Parameters:

- `T`: The type of the elements.
- `source`: The source span to be enumerated.
- `separator`: The separator character to be used to split the provided span.

Returns: An enumerator that can be used to enumerate each element in a split span using the provided separator character.

To be added.
