---
title: "MemoryExtensions class (part 1 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions class

Namespace: `System`

```csharp
public static class MemoryExtensions
```

Provides extension methods for the memory-related and span-related types, such as `Memory<T>`, `ReadOnlyMemory<T>`, `Span<T>`, and `ReadOnlySpan<T>`.

To be added.

## MemoryExtensions.AsMemory(String) method

```csharp
public static ReadOnlyMemory<char> AsMemory (this string? text);
```

Creates a new `ReadOnlyMemory<Char>` over the portion of the target string.

Parameters:

- `text`: The target string.

Returns: The read-only character memory representation of the string, or `default` if `text` is `null`.

Returns default when `text` is `null`.

## MemoryExtensions.AsMemory(String, Index) method

```csharp
public static ReadOnlyMemory<char> AsMemory (this string? text, Index startIndex);
```

Creates a new `ReadOnlyMemory<Char>` over a portion of the target string starting at a specified index.

Parameters:

- `text`: The target string.
- `startIndex`: The index at which to begin this slice.

Returns: The read-only character memory representation of the string.

To be added.

## MemoryExtensions.AsMemory(String, Int32) method

```csharp
public static ReadOnlyMemory<char> AsMemory (this string? text, int start);
```

Creates a new `ReadOnlyMemory<Char>` over a portion of the target string starting at a specified character position.

Parameters:

- `text`: The target string.
- `start`: The index at which to begin this slice.

Returns: The read-only character memory representation of the string, or `default` if `text` is `null`.

Exceptions:

- `ArgumentOutOfRangeException`: `start` is not in the range of `text` (`start` is < 0 or > `text.Length`).

Returns default when `text` is `null`.

## MemoryExtensions.AsMemory(String, Range) method

```csharp
public static ReadOnlyMemory<char> AsMemory (this string? text, Range range);
```

Creates a new `ReadOnlyMemory<Char>` over a specified range of the target string.

Parameters:

- `text`: The target string.
- `range`: The range that indicates the start and length of the sliced string.

Returns: The read-only character memory representation of the string.

To be added.

## MemoryExtensions.AsMemory(String, Int32, Int32) method

```csharp
public static ReadOnlyMemory<char> AsMemory (this string? text, int start, int length);
```

Creates a new `ReadOnlyMemory<Char>` over a portion of the target string beginning at a specified position with a length.

Parameters:

- `text`: The target string.
- `start`: The index at which to begin this slice.
- `length`: The desired length for the slice.

Returns: The read-only character memory representation of the string, or `default` if `text` is `null`.

Exceptions:

- `ArgumentOutOfRangeException`: `start`, `length`, or `start` + `length` is not in the range of `text`.

Returns default when `text` is `null`.

## MemoryExtensions.AsMemory<T>(ArraySegment<T>) method

```csharp
public static Memory<T> AsMemory<T> (this ArraySegment<T> segment);
```

Creates a new memory region over the portion of the target array segment.

Parameters:

- `T`: The type of the segment.
- `segment`: The segment to convert.

Returns: The memory representation of the segment.

To be added.

## MemoryExtensions.AsMemory<T>(T[]) method

```csharp
public static Memory<T> AsMemory<T> (this T[]? array);
```

Creates a new memory region over the target array.

Parameters:

- `T`: The type of the array.
- `array`: The array to convert.

Returns: The memory representation of the whole or part of the array.

To be added.

## MemoryExtensions.AsMemory<T>(ArraySegment<T>, Int32) method

```csharp
public static Memory<T> AsMemory<T> (this ArraySegment<T> segment, int start);
```

Creates a new memory region over the portion of the target array segment starting at a specified position to the end of the segment.

Parameters:

- `T`: The type of the array.
- `segment`: The target array segment.
- `start`: The index at which to begin the memory.

Returns: The memory representation of the whole or part of the array.

Exceptions:

- `ArrayTypeMismatchException`: `segment` is covariant, and the type of `segment` is not exactly `T[]`.
- `ArgumentOutOfRangeException`: `start` is less than 0 or greater than `segment.Count`.

#### Remarks

Returns `default` when `segment` is `null`.

## MemoryExtensions.AsMemory<T>(T[], Index) method

```csharp
public static Memory<T> AsMemory<T> (this T[]? array, Index startIndex);
```

Creates a new memory region over the portion of the target array starting at a specified index to the end of the array.

Parameters:

- `T`: The type of the array.
- `array`: The array to convert.
- `startIndex`: The first position of the array.

Returns: The memory representation of the whole or part of the array.

To be added.

## MemoryExtensions.AsMemory<T>(T[], Int32) method

```csharp
public static Memory<T> AsMemory<T> (this T[]? array, int start);
```

Creates a new memory region over the portion of the target array starting at a specified position to the end of the array.

Parameters:

- `T`: The type of the array.
- `array`: The target array.
- `start`: The index at which to begin the memory.

Returns: The memory representation of the whole or part of the array.

Exceptions:

- `ArrayTypeMismatchException`: `array` is covariant, and the array's type is not exactly `T[]`.
- `ArgumentOutOfRangeException`: `start` index less than 0 or greater than `array.Length`.

#### Remarks

Returns `default` when `array` is `null`.

## MemoryExtensions.AsMemory<T>(T[], Range) method

```csharp
public static Memory<T> AsMemory<T> (this T[]? array, Range range);
```

Creates a new memory region over the portion of the target array beginning at inclusive start index of the range and ending at the exclusive end index of the range.

Parameters:

- `T`: The type of the array.
- `array`: The array to convert.
- `range`: The range to convert from the array.

Returns: The memory representation of the whole or part of the array.

To be added.

## MemoryExtensions.AsMemory<T>(ArraySegment<T>, Int32, Int32) method

```csharp
public static Memory<T> AsMemory<T> (this ArraySegment<T> segment, int start, int length);
```

Creates a new memory region over the portion of the target array segment beginning at a specified position with a specified length.

Parameters:

- `T`: The type of the array.
- `segment`: The target array segment.
- `start`: The index at which to begin the memory.
- `length`: The number of items in the memory.

Returns: The memory representation of the whole or part of the array.

Exceptions:

- `ArrayTypeMismatchException`: `segment` is covariant, and the array's type is not exactly `T[]`.
- `ArgumentOutOfRangeException`: `start`, `length`, or `start` + `length` is not in the range of `segment`.

#### Remarks

Returns `default` when `segment` is `null`.

## MemoryExtensions.AsMemory<T>(T[], Int32, Int32) method

```csharp
public static Memory<T> AsMemory<T> (this T[]? array, int start, int length);
```

Creates a new memory region over the portion of the target array beginning at a specified position with a specified length.

Parameters:

- `T`: The type of the array.
- `array`: The target array.
- `start`: The index at which to begin the memory region.
- `length`: The number of items in the memory region.

Returns: The memory representation of the whole or part of the array.

Exceptions:

- `ArrayTypeMismatchException`: `array` is covariant, and the array's type is not exactly `T[]`.
- `ArgumentOutOfRangeException`: `start`, `length`, or `start` + `length` is not in the range of `array`.

#### Remarks

Returns `default` when `array` is `null`.

## MemoryExtensions.AsSpan(String) method

```csharp
public static ReadOnlySpan<char> AsSpan (this string? text);
```

Creates a new read-only span over a string.

Parameters:

- `text`: The target string.

Returns: The read-only span representation of the string.

#### Remarks

Returns `default` when `text` is `null`.

## MemoryExtensions.AsSpan(String, Index) method

```csharp
public static ReadOnlySpan<char> AsSpan (this string? text, Index startIndex);
```

Creates a new `ReadOnlySpan<T>` over a portion of the target string from a specified position to the end of the string.

Parameters:

- `text`: The target string.
- `startIndex`: The index at which to begin this slice.

Returns: The read-only span representation of the string.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` is less than 0 or greater than `text`.Length.

To be added.

## MemoryExtensions.AsSpan(String, Int32) method

```csharp
public static ReadOnlySpan<char> AsSpan (this string? text, int start);
```

Creates a new read-only span over a portion of the target string from a specified position to the end of the string.

Parameters:

- `text`: The target string.
- `start`: The index at which to begin this slice.

Returns: The read-only span representation of the string.

Exceptions:

- `ArgumentOutOfRangeException`: `start` is less than 0 or greater than `text.Length`.
- `ArgumentNullException`: Thrown when `text` is `null`.

To be added.

## MemoryExtensions.AsSpan(String, Range) method

```csharp
public static ReadOnlySpan<char> AsSpan (this string? text, Range range);
```

Creates a new `ReadOnlySpan<T>` over a portion of a target string using the range start and end indexes.

Parameters:

- `text`: The target string.
- `range`: The range that has start and end indexes to use for slicing the string.

Returns: The read-only span representation of the string.

Exceptions:

- `ArgumentNullException`: `text` is `null`.
- `ArgumentOutOfRangeException`: `range`'s start or end index is not within the bounds of the string.
- `ArgumentOutOfRangeException`: `range`'s start index is greater than its end index.

To be added.

## MemoryExtensions.AsSpan(String, Int32, Int32) method

```csharp
public static ReadOnlySpan<char> AsSpan (this string? text, int start, int length);
```

Creates a new read-only span over a portion of the target string from a specified position for a specified number of characters.

Parameters:

- `text`: The target string.
- `start`: The index at which to begin this slice.
- `length`: The desired length for the slice.

Returns: The read-only span representation of the string.

Exceptions:

- `ArgumentOutOfRangeException`: `start`, `length`, or `start` + `length` is not in the range of `text`.

#### Remarks

Returns `default` when `text` is `null`.

## MemoryExtensions.AsSpan<T>(ArraySegment<T>) method

```csharp
public static Span<T> AsSpan<T> (this ArraySegment<T> segment);
```

Creates a new span over a target array segment.

Parameters:

- `T`: The type of the array segment.
- `segment`: The array segment to convert.

Returns: The span representation of the array segment.

To be added.

## MemoryExtensions.AsSpan<T>(T[]) method

```csharp
public static Span<T> AsSpan<T> (this T[]? array);
```

Creates a new span over a target array.

Parameters:

- `T`: The type of the array.
- `array`: The array to convert.

Returns: The span representation of the array.

To be added.

## MemoryExtensions.AsSpan<T>(ArraySegment<T>, Index) method

```csharp
public static Span<T> AsSpan<T> (this ArraySegment<T> segment, Index startIndex);
```

Creates a new span over a portion of the target array segment beginning at a specified index and ending at the end of the segment.

Parameters:

- `T`: The type of the array segment.
- `segment`: The target array segment.
- `startIndex`: The index at which to begin the Span.

Returns: The span representation of the array segment.

To be added.

## MemoryExtensions.AsSpan<T>(ArraySegment<T>, Int32) method

```csharp
public static Span<T> AsSpan<T> (this ArraySegment<T> segment, int start);
```

Creates a new span over a portion of a target array segment from a specified position to the end of the segment.

Parameters:

- `T`: The type of the array segment.
- `segment`: The target array segment.
- `start`: The index at which to begin the san.

Returns: The span representation of the array segment.

Exceptions:

- `ArrayTypeMismatchException`: `segment` is covariant, and the array's type is not exactly `T[]`.
- `ArgumentOutOfRangeException`: `start` is less than 0 or greater than `segment.Count`.

#### Remarks

Returns `default` when `segment` is `null`.

## MemoryExtensions.AsSpan<T>(ArraySegment<T>, Range) method

```csharp
public static Span<T> AsSpan<T> (this ArraySegment<T> segment, Range range);
```

Creates a new span over a portion of a target array segment using the range start and end indexes.

Parameters:

- `T`: The type of the array segment.
- `segment`: The target array segment.
- `range`: The range which has start and end indexes to use for slicing the array.

Returns: The span representation of the array segment.

To be added.

## MemoryExtensions.AsSpan<T>(T[], Index) method

```csharp
public static Span<T> AsSpan<T> (this T[]? array, Index startIndex);
```

Creates a new span over the portion of the target array defined by an `Index` value.

Parameters:

- `T`: The array type.
- `array`: The array to convert.
- `startIndex`: The starting index.

Returns: The span representation of the array.

To be added.

## MemoryExtensions.AsSpan<T>(T[], Int32) method

```csharp
public static Span<T> AsSpan<T> (this T[]? array, int start);
```

Creates a new span over a portion of the target array starting at a specified position to the end of the array.

Parameters:

- `T`: The type of the array.
- `array`: The array to convert.
- `start`: The initial index from which the array will be converted.

Returns: The span representation of the array.

To be added.

## MemoryExtensions.AsSpan<T>(T[], Range) method

```csharp
public static Span<T> AsSpan<T> (this T[]? array, Range range);
```

Creates a new span over a portion of a target array defined by a `Range` value.

Parameters:

- `T`: The type of the array.
- `array`: The array to convert.
- `range`: The range of the array to convert.

Returns: The span representation of the array.

To be added.

## MemoryExtensions.AsSpan<T>(ArraySegment<T>, Int32, Int32) method

```csharp
public static Span<T> AsSpan<T> (this ArraySegment<T> segment, int start, int length);
```

Creates a new span over a portion of a target array segment from a specified position for a specified length.

Parameters:

- `T`: The type of the array segment.
- `segment`: The target array segment.
- `start`: The index at which to begin the span.
- `length`: The number of items in the span.

Returns: The span representation of the array.

Exceptions:

- `ArrayTypeMismatchException`: `segment` is covariant, and the array's type is not exactly `T[]`.
- `ArgumentOutOfRangeException`: `start`, `length`, or `start` + `length` is not in the range of `segment`.

#### Remarks

Returns `default` when `segment` is `null`.
