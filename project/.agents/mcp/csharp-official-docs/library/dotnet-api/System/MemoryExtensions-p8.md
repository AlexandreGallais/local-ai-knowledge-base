---
title: "MemoryExtensions class (part 8 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions class (part 8 of 12)

## MemoryExtensions.LastIndexOfAnyExcept<T>(Span<T>, T, T, T) method

```csharp
public static int LastIndexOfAnyExcept<T> (this Span<T> span, T value0, T value1, T value2) where T : IEquatable<T>;
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

## MemoryExtensions.LastIndexOfAnyExcept<T>(ReadOnlySpan<T>, T, T, T, IEqualityComparer<T>) method

```csharp
public static int LastIndexOfAnyExcept<T> (this ReadOnlySpan<T> span, T value0, T value1, T value2, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Searches for the last index of any value other than the specified `value0`, `value1`, or `value2`.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `value0`: The first value to avoid.
- `value1`: The second value to avoid.
- `value2`: The third value to avoid.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: The index in the span of the last occurrence of any value other than `value0`, `value1`, and `value2`.

If all of the values are `value0`, `value1`, and `value2`, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExceptInRange<T>(ReadOnlySpan<T>, T, T) method

```csharp
public static int LastIndexOfAnyExceptInRange<T> (this ReadOnlySpan<T> span, T lowInclusive, T highInclusive) where T : IComparable<T>;
```

Searches for the last index of any value outside of the range between `lowInclusive` and `highInclusive`, inclusive.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `lowInclusive`: The lower bound, inclusive, of the excluded range.
- `highInclusive`: The upper bound, inclusive, of the excluded range.

Returns: The index in the span of the last occurrence of any value outside of the specified range.
If all of the values are inside of the specified range, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExceptInRange<T>(Span<T>, T, T) method

```csharp
public static int LastIndexOfAnyExceptInRange<T> (this Span<T> span, T lowInclusive, T highInclusive) where T : IComparable<T>;
```

Searches for the last index of any value outside of the range between `lowInclusive` and `highInclusive`, inclusive.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `lowInclusive`: The lower bound, inclusive, of the excluded range.
- `highInclusive`: The upper bound, inclusive, of the excluded range.

Returns: The index in the span of the last occurrence of any value outside of the specified range.
If all of the values are inside of the specified range, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyExceptWhiteSpace(Char>) method

```csharp
public static int LastIndexOfAnyExceptWhiteSpace (this ReadOnlySpan<char> span);
```

To be added.

Parameters:

- `span`: To be added.

Returns: To be added.

To be added.

## MemoryExtensions.LastIndexOfAnyInRange<T>(ReadOnlySpan<T>, T, T) method

```csharp
public static int LastIndexOfAnyInRange<T> (this ReadOnlySpan<T> span, T lowInclusive, T highInclusive) where T : IComparable<T>;
```

Searches for the last index of any value in the range between `lowInclusive` and `highInclusive`, inclusive.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `lowInclusive`: The lower bound, inclusive, of the range for which to search.
- `highInclusive`: The upper bound, inclusive, of the range for which to search.

Returns: The index in the span of the last occurrence of any value in the specified range.
If all of the values are outside of the specified range, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyInRange<T>(Span<T>, T, T) method

```csharp
public static int LastIndexOfAnyInRange<T> (this Span<T> span, T lowInclusive, T highInclusive) where T : IComparable<T>;
```

Searches for the last index of any value in the range between `lowInclusive` and `highInclusive`, inclusive.

Parameters:

- `T`: The type of the span and values.
- `span`: The span to search.
- `lowInclusive`: The lower bound, inclusive, of the range for which to search.
- `highInclusive`: The upper bound, inclusive, of the range for which to search.

Returns: The index in the span of the last occurrence of any value in the specified range.
If all of the values are outside of the specified range, returns -1.

To be added.

## MemoryExtensions.LastIndexOfAnyWhiteSpace(Char>) method

```csharp
public static int LastIndexOfAnyWhiteSpace (this ReadOnlySpan<char> span);
```

To be added.

Parameters:

- `span`: To be added.

Returns: To be added.

To be added.

## MemoryExtensions.Max<T>(ReadOnlySpan<T>) method

```csharp
public static T? Max<T> (this ReadOnlySpan<T> span);
```

To be added.

Parameters:

- `T`: To be added.
- `span`: To be added.

Returns: To be added.

To be added.

## MemoryExtensions.Max<T>(ReadOnlySpan<T>, IComparer<T>) method

```csharp
public static T? Max<T> (this ReadOnlySpan<T> span, System.Collections.Generic.IComparer<T>? comparer);
```

To be added.

Parameters:

- `T`: To be added.
- `span`: To be added.
- `comparer`: To be added.

Returns: To be added.

To be added.

## MemoryExtensions.Min<T>(ReadOnlySpan<T>) method

```csharp
public static T? Min<T> (this ReadOnlySpan<T> span);
```

To be added.

Parameters:

- `T`: To be added.
- `span`: To be added.

Returns: To be added.

To be added.

## MemoryExtensions.Min<T>(ReadOnlySpan<T>, IComparer<T>) method

```csharp
public static T? Min<T> (this ReadOnlySpan<T> span, System.Collections.Generic.IComparer<T>? comparer);
```

To be added.

Parameters:

- `T`: To be added.
- `span`: To be added.
- `comparer`: To be added.

Returns: To be added.

To be added.

## MemoryExtensions.Overlaps<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static bool Overlaps<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> other);
```

Determines whether two read-only sequences overlap in memory.

Parameters:

- `T`: The type of elements in the read-only sequence.
- `span`: The first sequence.
- `other`: The second sequence.

Returns: `true` if the two sequences overlap; otherwise, `false`.

To be added.

## MemoryExtensions.Overlaps<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static bool Overlaps<T> (this Span<T> span, ReadOnlySpan<T> other);
```

Determines whether a span and a read-only span overlap in memory.

Parameters:

- `T`: The type of elements in the span.
- `span`: The span to compare.
- `other`: The read-only span to compare.

Returns: `true` if the two sequences overlap; otherwise, `false`.

To be added.

## MemoryExtensions.Overlaps<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, Int32) method

```csharp
public static bool Overlaps<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> other, out int elementOffset);
```

Determines whether two read-only sequences overlap in memory and outputs the element offset.

Parameters:

- `T`: The type of elements in the span.
- `span`: The first sequence.
- `other`: The second sequence.
- `elementOffset`: When the method returns, contains the offset between `span` and `other`.

Returns: `true` if the two sequences overlap; otherwise, `false`.

To be added.

## MemoryExtensions.Overlaps<T>(Span<T>, ReadOnlySpan<T>, Int32) method

```csharp
public static bool Overlaps<T> (this Span<T> span, ReadOnlySpan<T> other, out int elementOffset);
```

Determines whether a span and a read-only span overlap in memory and outputs the element offset.

Parameters:

- `T`: The type of elements in the span.
- `span`: The first sequence to compare.
- `other`: The second sequence to compare.
- `elementOffset`: When the method returns, contains the offset between `span` and `other`.

Returns: `true` if the two sequences overlap; otherwise, `false`.

To be added.

## MemoryExtensions.Replace<T>(Span<T>, T, T) method

```csharp
public static void Replace<T> (this Span<T> span, T oldValue, T newValue) where T : IEquatable<T>;
```

Replaces all occurrences of `oldValue` with `newValue`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span in which the elements should be replaced.
- `oldValue`: The value to be replaced with `newValue`.
- `newValue`: The value to replace all occurrences of `oldValue`.

To be added.

## MemoryExtensions.Replace<T>(ReadOnlySpan<T>, Span<T>, T, T) method

```csharp
public static void Replace<T> (this ReadOnlySpan<T> source, Span<T> destination, T oldValue, T newValue) where T : IEquatable<T>;
```

Copies `source` to `destination`, replacing all occurrences of `oldValue` with `newValue`.

Parameters:

- `T`: The type of the elements in the spans.
- `source`: The span to copy.
- `destination`: The span into which the copied and replaced values should be written.
- `oldValue`: The value to be replaced with `newValue`.
- `newValue`: The value to replace all occurrences of `oldValue`.

Exceptions:

- `ArgumentException`: The `destination` span is shorter than the `source` span.
-or-
`source` and `destination` overlap but don't refer to the same starting location.

To be added.

## MemoryExtensions.Replace<T>(Span<T>, T, T, IEqualityComparer<T>) method

```csharp
public static void Replace<T> (this Span<T> span, T oldValue, T newValue, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Replaces all occurrences of `oldValue` with `newValue`.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span in which the elements should be replaced.
- `oldValue`: The value to be replaced with `newValue`.
- `newValue`: The value to replace all occurrences of `oldValue`.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

To be added.

## MemoryExtensions.Replace<T>(ReadOnlySpan<T>, Span<T>, T, T, IEqualityComparer<T>) method

```csharp
public static void Replace<T> (this ReadOnlySpan<T> source, Span<T> destination, T oldValue, T newValue, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Copies `source` to `destination`, replacing all occurrences of `oldValue` with `newValue`.

Parameters:

- `T`: The type of the elements in the spans.
- `source`: The span to copy.
- `destination`: The span into which the copied and replaced values should be written.
- `oldValue`: The value to be replaced with `newValue`.
- `newValue`: The value to replace all occurrences of `oldValue`.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Exceptions:

- `ArgumentException`: The `destination` span is shorter than the `source` span.
- `ArgumentException`: `source` and `destination` overlap but don't refer to the same starting location.

To be added.

## MemoryExtensions.ReplaceAny<T>(Span<T>, SearchValues<T>, T) method

```csharp
public static void ReplaceAny<T> (this Span<T> span, System.Buffers.SearchValues<T> values, T newValue) where T : IEquatable<T>;
```

Replaces in `span` all occurrences of any of the elements in `values` with `newValue`.

Parameters:

- `T`: The type of the elements in the spans.
- `span`: The span to edit.
- `values`: The values to be replaced with `newValue`.
- `newValue`: The value to replace all occurrences of any of the elements in `values`.

Exceptions:

- `ArgumentNullException`: `values` is `null`.

To be added.

## MemoryExtensions.ReplaceAny<T>(ReadOnlySpan<T>, Span<T>, SearchValues<T>, T) method

```csharp
public static void ReplaceAny<T> (this ReadOnlySpan<T> source, Span<T> destination, System.Buffers.SearchValues<T> values, T newValue) where T : IEquatable<T>;
```

Copies `source` to `destination`, replacing all occurrences of any of the elements in `values` with `newValue`.

Parameters:

- `T`: The type of the elements in the spans.
- `source`: The span to copy.
- `destination`: The span into which the copied and replaced values should be written.
- `values`: The values to be replaced with `newValue`.
- `newValue`: The value to replace all occurrences of any of the elements in `values`.

Exceptions:

- `ArgumentException`: The `destination` span was shorter than the `source` span.
- `ArgumentException`: `source` and `destination` overlap but don't refer to the same starting location.
- `ArgumentNullException`: `values` is `null`.

To be added.

## MemoryExtensions.ReplaceAnyExcept<T>(Span<T>, SearchValues<T>, T) method

```csharp
public static void ReplaceAnyExcept<T> (this Span<T> span, System.Buffers.SearchValues<T> values, T newValue) where T : IEquatable<T>;
```

Replaces in `span` all elements, other than those in `values`, with `newValue`.

Parameters:

- `T`: The type of the elements in the spans.
- `span`: The span to edit.
- `values`: The values to be excluded from replacement with `newValue`.
- `newValue`: The value to replace all occurrences of any elements other than those in `values`.

Exceptions:

- `ArgumentNullException`: `values` is `null`.

To be added.

## MemoryExtensions.ReplaceAnyExcept<T>(ReadOnlySpan<T>, Span<T>, SearchValues<T>, T) method

```csharp
public static void ReplaceAnyExcept<T> (this ReadOnlySpan<T> source, Span<T> destination, System.Buffers.SearchValues<T> values, T newValue) where T : IEquatable<T>;
```

Copies `source` to `destination`, replacing all occurrences of any of the elements other than those in `values` with `newValue`.

Parameters:

- `T`: The type of the elements in the spans.
- `source`: The span to copy.
- `destination`: The span into which the copied and replaced values should be written.
- `values`: The values to be excluded from replacement with `newValue`.
- `newValue`: The value to replace all occurrences of any elements other than those in `values`.

Exceptions:

- `ArgumentException`: The `destination` span was shorter than the `source` span.
- `ArgumentException`: `source` and `destination` overlap but don't refer to the same starting location.
- `ArgumentNullException`: `values` is `null`.

To be added.

## MemoryExtensions.Reverse<T>(Span<T>) method

```csharp
public static void Reverse<T> (this Span<T> span);
```

Reverses the sequence of the elements in the entire span.

Parameters:

- `T`: The type of elements in the span.
- `span`: The span to reverse.

To be added.
