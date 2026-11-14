---
title: "SearchValues class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/SearchValues.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SearchValues class

Namespace: `System.Buffers`

```csharp
public static class SearchValues
```

Provides a set of initialization methods for instances of the `SearchValues<T>` class.

#### Remarks

`SearchValues<T>` instances are optimized for situations where the same set of values is frequently used for searching at run time. Creating an instance is relatively expensive because the values are analyzed to pick a specialized, often vectorized, search algorithm. Create the instance once and cache it, typically in a `static readonly` field, then pass it to the `MemoryExtensions` methods that search a span, such as `MemoryExtensions.IndexOfAny`, `MemoryExtensions.IndexOfAnyExcept`, `MemoryExtensions.ContainsAny`, and `MemoryExtensions.ContainsAnyExcept`.

_Code sample not included: ~/snippets/csharp/System.Buffers/SearchValues/Overview/searchvalues.cs._
For more use cases and examples, see `SearchValues<T>`.

## SearchValues.Create(Byte>) method

```csharp
public static System.Buffers.SearchValues<byte> Create (scoped ReadOnlySpan<byte> values);
```

Creates an optimized representation of `values` used for efficient searching.

Parameters:

- `values`: The set of values.

Returns: The optimized representation of `values` used for efficient searching.

#### Remarks

Cache the returned instance, for example in a `static readonly` field, and reuse it for every search. A UTF-8 literal (`"..."u8`) is a convenient way to specify the set of bytes without allocating a string. Large sets benefit the most, because the `MemoryExtensions` overloads that accept individual values only go up to three:

_Code sample not included: ~/snippets/csharp/System.Buffers/SearchValues/Overview/searchvalues.cs._
## SearchValues.Create(Char>) method

```csharp
public static System.Buffers.SearchValues<char> Create (scoped ReadOnlySpan<char> values);
```

Creates an optimized representation of `values` used for efficient searching.

Parameters:

- `values`: The set of values.

Returns: The optimized representation of `values` used for efficient searching.

#### Remarks

Cache the returned instance, for example in a `static readonly` field, and reuse it for every search. A common use is to validate that an input only contains allowed characters:

_Code sample not included: ~/snippets/csharp/System.Buffers/SearchValues/Overview/searchvalues.cs._
## SearchValues.Create(String>, StringComparison) method

```csharp
public static System.Buffers.SearchValues<string> Create (ReadOnlySpan<string> values, StringComparison comparisonType);
```

Creates an optimized representation of `values` used for efficient searching.

Parameters:

- `values`: The set of values.
- `comparisonType`: Specifies whether to use `StringComparison.Ordinal` or `StringComparison.OrdinalIgnoreCase` search semantics.

Returns: The optimized representation of `values` used for efficient searching.

#### Remarks

Only `Ordinal` or `OrdinalIgnoreCase` can be used.

The returned instance searches for whole substrings, so it can only be used with the `IndexOfAny` and `ContainsAny` overloads that accept a `SearchValues<string>`. If you're searching for individual characters, use `Create` instead.

_Code sample not included: ~/snippets/csharp/System.Buffers/SearchValues/Overview/searchvalues.cs._
Passing a single value is also useful. The resulting instance is a faster alternative to `IndexOf`, because the value is analyzed when the instance is created instead of on every search:

_Code sample not included: ~/snippets/csharp/System.Buffers/SearchValues/Overview/searchvalues.cs._
