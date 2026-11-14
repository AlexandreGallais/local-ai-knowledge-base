---
title: "MemoryExtensions class (part 10 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions class (part 10 of 12)

## MemoryExtensions.SplitAny(Char>, Range>, Char>, StringSplitOptions) method

```csharp
public static int SplitAny (this ReadOnlySpan<char> source, Span<Range> destination, ReadOnlySpan<char> separators, StringSplitOptions options = System.StringSplitOptions.None);
```

Parses the source `ReadOnlySpan<T>` for one of the specified `separators`, populating the `destination` span with `Range` instances representing the regions between the separators.

Parameters:

- `source`: The source span to parse.
- `destination`: The destination span into which the resulting ranges are written.
- `separators`: Any number of characters that may delimit the regions in this instance. If empty, all Unicode whitespace characters are used as the separators.
- `options`: A bitwise combination of the enumeration values that specifies whether to trim whitespace and include empty ranges.

Returns: The number of ranges written into `destination`.

Delimiter characters are not included in the elements of the returned array.

If the `destination` span is empty, or if the `options` specifies `StringSplitOptions.RemoveEmptyEntries` and `source` is empty, or if `options` specifies both `StringSplitOptions.RemoveEmptyEntries` and `StringSplitOptions.TrimEntries` and the `source` is entirely whitespace, no ranges are written to the destination.

If the span does not contain any of the `separators`, or if `destination`'s length is 1, a single range will be output containing the entire `source`, subject to the processing implied by `options`.

If there are more regions in `source` than will fit in `destination`, the first `destination` length minus 1 ranges are stored in `destination`, and a range for the remainder of `source` is stored in `destination`.

## MemoryExtensions.SplitAny(Char>, Range>, String>, StringSplitOptions) method

```csharp
public static int SplitAny (this ReadOnlySpan<char> source, Span<Range> destination, ReadOnlySpan<string> separators, StringSplitOptions options = System.StringSplitOptions.None);
```

Parses the source `ReadOnlySpan<T>` for one of the specified `separators`, populating the `destination` span with `Range` instances representing the regions between the separators.

Parameters:

- `source`: The source span to parse.
- `destination`: The destination span into which the resulting ranges are written.
- `separators`: Any number of strings that may delimit the regions in this instance.  If empty, all Unicode whitespace characters are used as the separators.
- `options`: A bitwise combination of the enumeration values that specifies whether to trim whitespace and include empty ranges.

Returns: The number of ranges written into `destination`.

Delimiter characters are not included in the elements of the returned array.

If the `destination` span is empty, or if the `options` specifies `StringSplitOptions.RemoveEmptyEntries` and `source` is empty, or if `options` specifies both `StringSplitOptions.RemoveEmptyEntries` and `StringSplitOptions.TrimEntries` and the `source` is entirely whitespace, no ranges are written to the destination.

If the span does not contain any of the `separators`, or if `destination`'s length is 1, a single range will be output containing the entire `source`, subject to the processing implied by `options`.

If there are more regions in `source` than will fit in `destination`, the first `destination` length minus 1 ranges are stored in `destination`, and a range for the remainder of `source` is stored in `destination`.

## MemoryExtensions.SplitAny<T>(ReadOnlySpan<T>, SearchValues<T>) method

```csharp
public static MemoryExtensions.SpanSplitEnumerator<T> SplitAny<T> (this ReadOnlySpan<T> source, System.Buffers.SearchValues<T> separators) where T : IEquatable<T>;
```

Returns a type that allows for enumeration of each element within a split span using the provided separator characters.

Parameters:

- `T`: The type of the elements.
- `source`: The source span to be enumerated.
- `separators`: The `SearchValues<T>` to be used to split the provided span.

Returns: An enumerator that can be used to enumerate each element in a split span using the provided separator characters.

Unlike `MemoryExtensions.SplitAny<T>`, `separators` is not checked for being empty.

An empty `separators` argument will result in no separators being found, regardless of the type of `T`, whereas `MemoryExtensions.SplitAny<T>` uses all Unicode whitespace characters as separators if `separators` is empty and `T` is `Char`.

## MemoryExtensions.SplitAny<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static MemoryExtensions.SpanSplitEnumerator<T> SplitAny<T> (this ReadOnlySpan<T> source, ReadOnlySpan<T> separators) where T : IEquatable<T>;
```

Returns a type that allows for enumeration of each element within a split span using any of the provided elements.

Parameters:

- `T`: The type of the elements.
- `source`: The source span to be enumerated.
- `separators`: The separators to be used to split the provided span.

Returns: An enumerator that can be used to enumerate each element in a split span using the provided separator characters.

If `T` is `Char` and if `separators` is empty, all Unicode whitespace characters are used as the separators. This matches the behavior of when `String.Split` and related overloads are used with an empty separator array, or when `MemoryExtensions.SplitAny` is used with an empty separator span.

## MemoryExtensions.StartsWith(Char>, Char>, StringComparison) method

```csharp
public static bool StartsWith (this ReadOnlySpan<char> span, ReadOnlySpan<char> value, StringComparison comparisonType);
```

Determines whether a read-only character span begins with a specified value when compared using a specified `StringComparison` value.

Parameters:

- `span`: The source span.
- `value`: The sequence to compare to the beginning of the source span.
- `comparisonType`: An enumeration value that determines how `span` and `value` are compared.

Returns: `true` if `value` matches the beginning of `span`; otherwise, `false`.

To be added.

## MemoryExtensions.StartsWith<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static bool StartsWith<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> value) where T : IEquatable<T>;
```

Determines whether a specified sequence appears at the start of a read-only span.

Parameters:

- `T`: The type of elements in the span.
- `span`: The read-only character span to search.
- `value`: A sequence to search for at the start of `span`.

Returns: `true` if `value` matches the beginning of `span`; otherwise, `false`.

To be added.

## MemoryExtensions.StartsWith<T>(ReadOnlySpan<T>, T) method

```csharp
public static bool StartsWith<T> (this ReadOnlySpan<T> span, T value) where T : IEquatable<T>;
```

Determines whether the specified value appears at the start of the span.

Parameters:

- `T`: The type of elements in the span.
- `span`: The span to search.
- `value`: The value to compare.

Returns: `true` if `value` matches the beginning of `span`; otherwise, `false`.

To be added.

## MemoryExtensions.StartsWith<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static bool StartsWith<T> (this Span<T> span, ReadOnlySpan<T> value) where T : IEquatable<T>;
```

Determines whether a specified sequence appears at the start of a span.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The span to search.
- `value`: A sequence to search for at the start of `span`.

Returns: `true` if `value` matches the beginning of `span`; otherwise, `false`.

To be added.

## MemoryExtensions.StartsWith<T>(ReadOnlySpan<T>, ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public static bool StartsWith<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Determines whether a specified sequence appears at the start of a read-only span.

Parameters:

- `T`: To be added.
- `span`: The source span.
- `value`: The sequence to compare to the start of `span`.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: To be added.

To be added.

## MemoryExtensions.StartsWith<T>(ReadOnlySpan<T>, T, IEqualityComparer<T>) method

```csharp
public static bool StartsWith<T> (this ReadOnlySpan<T> span, T value, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Determines whether the specified value appears at the start of the span.

Parameters:

- `T`: The type of elements in the span.
- `span`: The span to search.
- `value`: The value to compare.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing elements, or `null` to use the default `IEqualityComparer<T>` for the type of an element.

Returns: `true` if `value` matches the beginning of `span`; otherwise, `false`.

To be added.

## MemoryExtensions.ToLower(Char>, Char>, CultureInfo) method

```csharp
public static int ToLower (this ReadOnlySpan<char> source, Span<char> destination, System.Globalization.CultureInfo? culture);
```

Copies the characters from the source span into the destination, converting each character to lowercase, using the casing rules of the specified culture.

Parameters:

- `source`: The source span.
- `destination`: The destination span which contains the transformed characters.
- `culture`: An object that supplies culture-specific casing rules.

Returns: The number of characters written into the destination span. If the destination is too small, returns -1.

Exceptions:

- `InvalidOperationException`: The source and destination buffers overlap.

#### Remarks

If `culture` is `null`, `CurrentCulture` will be used.

## MemoryExtensions.ToLowerInvariant(Char>, Char>) method

```csharp
public static int ToLowerInvariant (this ReadOnlySpan<char> source, Span<char> destination);
```

Copies the characters from the source span into the destination, converting each character to lowercase, using the casing rules of the invariant culture.

Parameters:

- `source`: The source span.
- `destination`: The destination span which contains the transformed characters.

Returns: The number of characters written into the destination span. If the destination is too small, returns -1.

Exceptions:

- `InvalidOperationException`: The source and destination buffers overlap.

To be added.

## MemoryExtensions.ToLowerOrdinal(Char>, Char>) method

```csharp
public static int ToLowerOrdinal (this ReadOnlySpan<char> source, Span<char> destination);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.

Returns: To be added.

To be added.

## MemoryExtensions.ToUpper(Char>, Char>, CultureInfo) method

```csharp
public static int ToUpper (this ReadOnlySpan<char> source, Span<char> destination, System.Globalization.CultureInfo? culture);
```

Copies the characters from the source span into the destination, converting each character to uppercase, using the casing rules of the specified culture.

Parameters:

- `source`: The source span.
- `destination`: The destination span which contains the transformed characters.
- `culture`: An object that supplies culture-specific casing rules.

Returns: The number of characters written into the destination span. If the destination is too small, returns -1.

Exceptions:

- `InvalidOperationException`: The source and destination buffers overlap.

#### Remarks

If `culture` is `null`, `CurrentCulture` will be used.

## MemoryExtensions.ToUpperInvariant(Char>, Char>) method

```csharp
public static int ToUpperInvariant (this ReadOnlySpan<char> source, Span<char> destination);
```

Copies the characters from the source span into the destination, converting each character to uppercase using the casing rules of the invariant culture.

Parameters:

- `source`: The source span.
- `destination`: The destination span which contains the transformed characters.

Returns: The number of characters written into the destination span. If the destination is too small, returns -1.

Exceptions:

- `InvalidOperationException`: The source and destination buffers overlap.

To be added.

## MemoryExtensions.ToUpperOrdinal(Char>, Char>) method

```csharp
public static int ToUpperOrdinal (this ReadOnlySpan<char> source, Span<char> destination);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.

Returns: To be added.

To be added.

## MemoryExtensions.Trim(Char>) method

```csharp
public static Memory<char> Trim (this Memory<char> memory);
```

Removes all leading and trailing whitespace characters from a character memory region.

Parameters:

- `memory`: The source memory from which the characters are removed.

Returns: The trimmed character memory region.

To be added.

## MemoryExtensions.Trim(Char>) method

```csharp
public static ReadOnlyMemory<char> Trim (this ReadOnlyMemory<char> memory);
```

Removes all leading and trailing whitespace characters from a read-only character memory region.

Parameters:

- `memory`: The source memory from which the characters are removed.

Returns: The trimmed character memory region.

To be added.

## MemoryExtensions.Trim(Char>) method

```csharp
public static ReadOnlySpan<char> Trim (this ReadOnlySpan<char> span);
```

Removes all leading and trailing whitespace characters from a read-only character span.

Parameters:

- `span`: The source span from which the characters are removed.

Returns: The trimmed read-only character span.

To be added.

## MemoryExtensions.Trim(Char>) method

```csharp
public static Span<char> Trim (this Span<char> span);
```

Removes all leading and trailing whitespace characters from a character span.

Parameters:

- `span`: The source span from which the characters are removed.

Returns: The trimmed character span.

To be added.

## MemoryExtensions.Trim(Char>, Char) method

```csharp
public static ReadOnlySpan<char> Trim (this ReadOnlySpan<char> span, char trimChar);
```

Removes all leading and trailing occurrences of a specified character from a read-only character span.

Parameters:

- `span`: The source span from which the character is removed.
- `trimChar`: The specified character to look for and remove.

Returns: The trimmed read-only character span.

To be added.

## MemoryExtensions.Trim(Char>, Char>) method

```csharp
public static ReadOnlySpan<char> Trim (this ReadOnlySpan<char> span, ReadOnlySpan<char> trimChars);
```

Removes all leading and trailing occurrences of a set of characters specified in a read-only span from a read-only character span.

Parameters:

- `span`: The source span from which the characters are removed.
- `trimChars`: The span which contains the set of characters to remove.

Returns: The trimmed read-only character span.

#### Remarks

If `trimChars` is empty, whitespace characters are removed instead.
