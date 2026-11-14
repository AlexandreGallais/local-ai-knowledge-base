---
title: "MemoryExtensions class (part 11 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions class (part 11 of 12)

## MemoryExtensions.Trim<T>(Memory<T>, ReadOnlySpan<T>) method

```csharp
public static Memory<T> Trim<T> (this Memory<T> memory, ReadOnlySpan<T> trimElements) where T : IEquatable<T>;
```

Removes all leading and trailing occurrences of a set of elements specified in a read-only span from a memory region.

Parameters:

- `T`: The type of the elements in the memory region.
- `memory`: The source memory from which the elements are removed.
- `trimElements`: The span which contains the set of elements to remove.

Returns: The trimmed memory region.

#### Remarks

If `trimElements` is empty, the memory is returned unaltered.

## MemoryExtensions.Trim<T>(Memory<T>, T) method

```csharp
public static Memory<T> Trim<T> (this Memory<T> memory, T trimElement) where T : IEquatable<T>;
```

Removes all leading and trailing occurrences of a specified element from a memory region.

Parameters:

- `T`: The type of the elements in the memory region.
- `memory`: The source memory from which the element is removed.
- `trimElement`: The specified element to look for and remove.

Returns: The trimmed memory region.

To be added.

## MemoryExtensions.Trim<T>(ReadOnlyMemory<T>, ReadOnlySpan<T>) method

```csharp
public static ReadOnlyMemory<T> Trim<T> (this ReadOnlyMemory<T> memory, ReadOnlySpan<T> trimElements) where T : IEquatable<T>;
```

Removes all leading and trailing occurrences of a set of elements specified in a read-only span from a read-only memory region.

Parameters:

- `T`: The type of the elements in the read-only memory region.
- `memory`: The source memory from which the elements are removed.
- `trimElements`: The span which contains the set of elements to remove.

Returns: The trimmed read-only memory region.

#### Remarks

If `trimElements` is empty, the memory is returned unaltered.

## MemoryExtensions.Trim<T>(ReadOnlyMemory<T>, T) method

```csharp
public static ReadOnlyMemory<T> Trim<T> (this ReadOnlyMemory<T> memory, T trimElement) where T : IEquatable<T>;
```

Removes all leading and trailing occurrences of a specified element from a read-only memory region.

Parameters:

- `T`: The type of the elements in the read-only memory region.
- `memory`: The source memory from which the element is removed.
- `trimElement`: The specified element to look for and remove.

Returns: The trimmed read-only memory region.

To be added.

## MemoryExtensions.Trim<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static ReadOnlySpan<T> Trim<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> trimElements) where T : IEquatable<T>;
```

Removes all leading and trailing occurrences of a set of elements specified in a read-only span from a read-only span.

Parameters:

- `T`: The type of the elements in the read-only span.
- `span`: The source span from which the elements are removed.
- `trimElements`: The span which contains the set of elements to remove.

Returns: The trimmed read-only span.

#### Remarks

If `trimElements` is empty, the span is returned unaltered.

## MemoryExtensions.Trim<T>(ReadOnlySpan<T>, T) method

```csharp
public static ReadOnlySpan<T> Trim<T> (this ReadOnlySpan<T> span, T trimElement) where T : IEquatable<T>;
```

Removes all leading and trailing occurrences of a specified element from a read-only span.

Parameters:

- `T`: The type of the elements in the read-only span.
- `span`: The source span from which the element is removed.
- `trimElement`: The specified element to look for and remove.

Returns: The trimmed read-only span.

To be added.

## MemoryExtensions.Trim<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static Span<T> Trim<T> (this Span<T> span, ReadOnlySpan<T> trimElements) where T : IEquatable<T>;
```

Removes all leading and trailing occurrences of a set of elements specified in a read-only span from a span.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The source span from which the elements are removed.
- `trimElements`: The span which contains the set of elements to remove.

Returns: The trimmed span.

#### Remarks

If `trimElements` is empty, the span is returned unaltered.

## MemoryExtensions.Trim<T>(Span<T>, T) method

```csharp
public static Span<T> Trim<T> (this Span<T> span, T trimElement) where T : IEquatable<T>;
```

Removes all leading and trailing occurrences of a specified element from a span.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The source span from which the element is removed.
- `trimElement`: The specified element to look for and remove.

Returns: The trimmed span.

To be added.

## MemoryExtensions.TrimEnd(Char>) method

```csharp
public static Memory<char> TrimEnd (this Memory<char> memory);
```

Removes all trailing whitespace characters from a character memory region.

Parameters:

- `memory`: The source memory from which the characters are removed.

Returns: The trimmed character memory region.

To be added.

## MemoryExtensions.TrimEnd(Char>) method

```csharp
public static ReadOnlyMemory<char> TrimEnd (this ReadOnlyMemory<char> memory);
```

Removes all trailing whitespace characters from a read-only character memory region.

Parameters:

- `memory`: The source memory from which the characters are removed.

Returns: The trimmed read-only character span.

To be added.

## MemoryExtensions.TrimEnd(Char>) method

```csharp
public static ReadOnlySpan<char> TrimEnd (this ReadOnlySpan<char> span);
```

Removes all trailing whitespace characters from a read-only character span.

Parameters:

- `span`: The source span from which the characters are removed.

Returns: The trimmed read-only character span.

To be added.

## MemoryExtensions.TrimEnd(Char>) method

```csharp
public static Span<char> TrimEnd (this Span<char> span);
```

Removes all trailing whitespace characters from a character span.

Parameters:

- `span`: The source span from which the characters are removed.

Returns: The trimmed character span.

To be added.

## MemoryExtensions.TrimEnd(Char>, Char) method

```csharp
public static ReadOnlySpan<char> TrimEnd (this ReadOnlySpan<char> span, char trimChar);
```

Removes all trailing occurrences of a specified character from a read-only span.

Parameters:

- `span`: The source span from which the character is removed.
- `trimChar`: The specified character to look for and remove.

Returns: The trimmed read-only character span.

To be added.

## MemoryExtensions.TrimEnd(Char>, Char>) method

```csharp
public static ReadOnlySpan<char> TrimEnd (this ReadOnlySpan<char> span, ReadOnlySpan<char> trimChars);
```

Removes all trailing occurrences of a set of characters specified in a read-only span from a read-only character span.

Parameters:

- `span`: The source span from which the characters are removed.
- `trimChars`: The span which contains the set of characters to remove.

Returns: The trimmed read-only character span.

#### Remarks

If `trimChars` is empty, whitespace characters are removed instead.

## MemoryExtensions.TrimEnd<T>(Memory<T>, ReadOnlySpan<T>) method

```csharp
public static Memory<T> TrimEnd<T> (this Memory<T> memory, ReadOnlySpan<T> trimElements) where T : IEquatable<T>;
```

Removes all trailing occurrences of a set of elements specified in a read-only span from a memory region.

Parameters:

- `T`: The type of the elements in the memory region.
- `memory`: The source memory from which the elements are removed.
- `trimElements`: The span which contains the set of elements to remove.

Returns: The trimmed memory region.

#### Remarks

If `trimElements` is empty, the memory is returned unaltered.

## MemoryExtensions.TrimEnd<T>(Memory<T>, T) method

```csharp
public static Memory<T> TrimEnd<T> (this Memory<T> memory, T trimElement) where T : IEquatable<T>;
```

Removes all trailing occurrences of a specified element from a character memory region.

Parameters:

- `T`: The type of the elements in the memory region.
- `memory`: The source memory from which the element is removed.
- `trimElement`: The specified element to look for and remove.

Returns: The trimmed memory region.

To be added.

## MemoryExtensions.TrimEnd<T>(ReadOnlyMemory<T>, ReadOnlySpan<T>) method

```csharp
public static ReadOnlyMemory<T> TrimEnd<T> (this ReadOnlyMemory<T> memory, ReadOnlySpan<T> trimElements) where T : IEquatable<T>;
```

Removes all trailing occurrences of a set of elements specified in a read-only span from a read-only memory region.

Parameters:

- `T`: The type of the elements in the read-only memory region.
- `memory`: The source memory from which the elements are removed.
- `trimElements`: The span which contains the set of elements to remove.

Returns: The trimmed read-only memory region.

#### Remarks

If `trimElements` is empty, the memory is returned unaltered.

## MemoryExtensions.TrimEnd<T>(ReadOnlyMemory<T>, T) method

```csharp
public static ReadOnlyMemory<T> TrimEnd<T> (this ReadOnlyMemory<T> memory, T trimElement) where T : IEquatable<T>;
```

Removes all trailing occurrences of a specified element from a read-only memory region.

Parameters:

- `T`: The type of the elements in the read-only memory region.
- `memory`: The source memory from which the element is removed.
- `trimElement`: The specified element to look for and remove.

Returns: The trimmed read-only memory region.

To be added.

## MemoryExtensions.TrimEnd<T>(ReadOnlySpan<T>, ReadOnlySpan<T>) method

```csharp
public static ReadOnlySpan<T> TrimEnd<T> (this ReadOnlySpan<T> span, ReadOnlySpan<T> trimElements) where T : IEquatable<T>;
```

Removes all trailing occurrences of a set of elements specified in a read-only span from a read-only span.

Parameters:

- `T`: The type of the elements in the read-only span.
- `span`: The source span from which the elements are removed.
- `trimElements`: The span which contains the set of elements to remove.

Returns: The trimmed read-only span.

#### Remarks

If `trimElements` is empty, the span is returned unaltered.

## MemoryExtensions.TrimEnd<T>(ReadOnlySpan<T>, T) method

```csharp
public static ReadOnlySpan<T> TrimEnd<T> (this ReadOnlySpan<T> span, T trimElement) where T : IEquatable<T>;
```

Removes all trailing occurrences of a specified element from a read-only span.

Parameters:

- `T`: The type of the elements in the read-only span.
- `span`: The source span from which the element is removed.
- `trimElement`: The specified element to look for and remove.

Returns: The trimmed read-only span.

To be added.

## MemoryExtensions.TrimEnd<T>(Span<T>, ReadOnlySpan<T>) method

```csharp
public static Span<T> TrimEnd<T> (this Span<T> span, ReadOnlySpan<T> trimElements) where T : IEquatable<T>;
```

Removes all trailing occurrences of a set of elements specified in a read-only span from a span.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The source span from which the elements are removed.
- `trimElements`: The span which contains the set of elements to remove.

Returns: The trimmed span.

#### Remarks

If `trimElements` is empty, the span is returned unaltered.

## MemoryExtensions.TrimEnd<T>(Span<T>, T) method

```csharp
public static Span<T> TrimEnd<T> (this Span<T> span, T trimElement) where T : IEquatable<T>;
```

Removes all trailing occurrences of a specified element from a span.

Parameters:

- `T`: The type of the elements in the span.
- `span`: The source span from which the element is removed.
- `trimElement`: The specified element to look for and remove.

Returns: The trimmed span.

To be added.

## MemoryExtensions.TrimStart(Char>) method

```csharp
public static Memory<char> TrimStart (this Memory<char> memory);
```

Removes all leading whitespace characters from a memory region.

Parameters:

- `memory`: The source memory from which the characters are removed.

Returns: The trimmed character memory region.

To be added.

## MemoryExtensions.TrimStart(Char>) method

```csharp
public static ReadOnlyMemory<char> TrimStart (this ReadOnlyMemory<char> memory);
```

Removes all leading whitespace characters from a read-only memory region.

Parameters:

- `memory`: The source memory from which the characters are removed.

Returns: The trimmed read-only character memory region.

To be added.

## MemoryExtensions.TrimStart(Char>) method

```csharp
public static ReadOnlySpan<char> TrimStart (this ReadOnlySpan<char> span);
```

Removes all leading whitespace characters from a read-only span.

Parameters:

- `span`: The source span from which the characters are removed.

Returns: The trimmed read-only character span.

To be added.

## MemoryExtensions.TrimStart(Char>) method

```csharp
public static Span<char> TrimStart (this Span<char> span);
```

Removes all leading whitespace characters from a span.

Parameters:

- `span`: The source span from which the characters are removed.

Returns: The trimmed character span.

To be added.

## MemoryExtensions.TrimStart(Char>, Char) method

```csharp
public static ReadOnlySpan<char> TrimStart (this ReadOnlySpan<char> span, char trimChar);
```

Removes all leading occurrences of a specified character from the span.

Parameters:

- `span`: The source span from which the character is removed.
- `trimChar`: The specified character to look for and remove.

Returns: The trimmed read-only character span.

To be added.

## MemoryExtensions.TrimStart(Char>, Char>) method

```csharp
public static ReadOnlySpan<char> TrimStart (this ReadOnlySpan<char> span, ReadOnlySpan<char> trimChars);
```

Removes all leading occurrences of a set of characters specified in a read-only span from the span.

Parameters:

- `span`: The source span from which the characters are removed.
- `trimChars`: The span which contains the set of characters to remove.

Returns: The trimmed read-only character span.

#### Remarks

If `trimChars` is empty, whitespace characters are removed instead.

## MemoryExtensions.TrimStart<T>(Memory<T>, ReadOnlySpan<T>) method

```csharp
public static Memory<T> TrimStart<T> (this Memory<T> memory, ReadOnlySpan<T> trimElements) where T : IEquatable<T>;
```

Removes all leading occurrences of a set of elements specified in a read-only span from a memory region.

Parameters:

- `T`: The type of the elements in the memory region.
- `memory`: The source memory from which the elements are removed.
- `trimElements`: The span which contains the set of elements to remove.

Returns: The trimmed memory region.

#### Remarks

If `trimElements` is empty, the memory is returned unaltered.

## MemoryExtensions.TrimStart<T>(Memory<T>, T) method

```csharp
public static Memory<T> TrimStart<T> (this Memory<T> memory, T trimElement) where T : IEquatable<T>;
```

Removes all leading occurrences of a specified element from a memory region.

Parameters:

- `T`: The type of the elements in the memory region.
- `memory`: The source memory region from which the element is removed.
- `trimElement`: The specified element to look for and remove.

Returns: The trimmed memory region.

To be added.
