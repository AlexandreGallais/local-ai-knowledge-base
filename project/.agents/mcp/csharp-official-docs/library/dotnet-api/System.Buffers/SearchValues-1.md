---
title: "SearchValues<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/SearchValues`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SearchValues<T> class

Namespace: `System.Buffers`

```csharp
public class SearchValues<T> where T : IEquatable<T>
```

Provides an immutable, read-only set of values optimized for efficient searching.
Instances are created by `SearchValues.Create`, `SearchValues.Create`, or `SearchValues.Create`.

Parameters:

- `T`: The type of the values to search for.

#### Remarks

`SearchValues<T>` instances are optimized for situations where the same set of values is frequently used for searching at run time. When you create the instance, the runtime analyzes the values and picks a search algorithm that's specialized for that set, often using vectorized (SIMD) instructions. That analysis is done once, so create the instance once and cache it, typically in a `static readonly` field.

Passing a `SearchValues<T>` to one of the searching methods on `MemoryExtensions` is usually much faster than passing the values as a span, especially for larger sets of values. Searching a span for a set of values is the primary purpose of the type, so reach for the following methods first:

| Method | Use it to |
|--|--|
| `MemoryExtensions.IndexOfAny` | Find the first position of any of the values. |
| `MemoryExtensions.IndexOfAnyExcept` | Find the first position of anything that isn't one of the values. |
| `MemoryExtensions.LastIndexOfAny` / `MemoryExtensions.LastIndexOfAnyExcept` | Search backwards for the same conditions. |
| `MemoryExtensions.ContainsAny` / `MemoryExtensions.ContainsAnyExcept` | Test whether a span contains any of the values, or anything other than the values. |
| `MemoryExtensions.CountAny` | Count how many elements in the span are in the set. |
| `MemoryExtensions.ReplaceAny` / `MemoryExtensions.ReplaceAnyExcept` | Replace the elements that are (or aren't) in the set. |
| `MemoryExtensions.SplitAny` | Split a span on any of the values. |

#### Common use cases

Validation is one. Instead of testing each element in a loop, describe the set of allowed values once and use `MemoryExtensions.ContainsAnyExcept` to find out whether the input contains anything else:

_Code sample not included: ~/snippets/csharp/System.Buffers/SearchValues/Overview/searchvalues.cs._
Escaping and encoding are another. Use `MemoryExtensions.IndexOfAny` to skip ahead to the next element that needs special treatment, so that everything in between is processed in bulk:

_Code sample not included: ~/snippets/csharp/System.Buffers/SearchValues/Overview/searchvalues.cs._
The same applies to UTF-8 data. Create a `SearchValues<T>` of `Byte` from a UTF-8 literal to search the bytes without transcoding them first. The benefit grows with the number of values: the `MemoryExtensions` overloads that take individual values only go up to three, and passing a longer span of values is slower than using a cached `SearchValues<T>`:

_Code sample not included: ~/snippets/csharp/System.Buffers/SearchValues/Overview/searchvalues.cs._
Starting in .NET 9, you can also search for a set of substrings by creating a `SearchValues<T>` of `String` with `Create`. Such an instance can only be used with the `IndexOfAny` and `ContainsAny` overloads that accept a `SearchValues<string>`:

_Code sample not included: ~/snippets/csharp/System.Buffers/SearchValues/Overview/searchvalues.cs._
You can also create such an instance from a single string. Doing so is a faster alternative to `IndexOf`, because the value is analyzed when the instance is created instead of on every search:

_Code sample not included: ~/snippets/csharp/System.Buffers/SearchValues/Overview/searchvalues.cs._
#### Thread safety

`SearchValues<T>` is immutable and all of its members are thread-safe, so a single cached instance can be shared across the whole app.

## SearchValues<T>.Contains(T) method

```csharp
public bool Contains (T value);
```

Searches for the specified value.

Parameters:

- `value`: The value to search for.

Returns: `true` if `value` was found; otherwise, `false`.

#### Remarks

Testing individual values isn't the primary function of `SearchValues<T>`. The type is designed to search a whole span at once, so prefer the `MemoryExtensions` methods that accept a `SearchValues<T>`, such as `MemoryExtensions.IndexOfAny`, `MemoryExtensions.IndexOfAnyExcept`, `MemoryExtensions.ContainsAny`, or `MemoryExtensions.ContainsAnyExcept`. Those methods can process many elements at a time, whereas calling `Contains` in a loop can't.

Use this method when you only have a single value at hand and there's no span to search, for example:

- You're inspecting or producing elements one at a time as part of a larger operation, such as decoding, transcoding, or transforming each element.
- You've already located an element with one of the searching methods and want to classify the element that follows it.
- You want to reuse an existing set of values as a general-purpose lookup table for a value you got from somewhere else.

The following example turns `\uXXXX` escape sequences back into the characters they represent, but leaves the ones that must stay escaped alone. Because each decoded character is computed on the fly, there's no span to search and `Contains` is the appropriate choice:

_Code sample not included: ~/snippets/csharp/System.Buffers/SearchValues/Overview/searchvalues.cs._
For a `SearchValues<T>` of `String`, this method tests whether the whole `value` is one of the strings in the set, using the `StringComparison` that was specified when the instance was created. It doesn't perform a substring search. Such a lookup is slower than `FrozenSet<T>.Contains`, so only create a `SearchValues<T>` of `String` when you need to search a span for multiple substrings.
