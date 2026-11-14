---
title: "StringSegmentComparer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Primitives/StringSegmentComparer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringSegmentComparer class

Namespace: `Microsoft.Extensions.Primitives`

```csharp
public class StringSegmentComparer : System.Collections.Generic.IComparer<Microsoft.Extensions.Primitives.StringSegment>, System.Collections.Generic.IEqualityComparer<Microsoft.Extensions.Primitives.StringSegment>
```

Compares two `StringSegment` objects.

To be added.

## StringSegmentComparer.Ordinal property

```csharp
public static Microsoft.Extensions.Primitives.StringSegmentComparer Ordinal { get; }
```

Gets a `StringSegmentComparer` object that performs a case-sensitive ordinal `StringSegment` comparison.

Returns: To be added.

To be added.

## StringSegmentComparer.OrdinalIgnoreCase property

```csharp
public static Microsoft.Extensions.Primitives.StringSegmentComparer OrdinalIgnoreCase { get; }
```

Gets a `StringSegmentComparer` object that performs a case-insensitive ordinal `StringSegment` comparison.

Returns: To be added.

To be added.

## StringSegmentComparer.Compare(StringSegment, StringSegment) method

```csharp
public int Compare (Microsoft.Extensions.Primitives.StringSegment x, Microsoft.Extensions.Primitives.StringSegment y);
```

Compares two `StringSegment` objects and returns an indication of their relative sort order.

Parameters:

- `x`: The first `StringSegment` to compare.
- `y`: The second `StringSegment` to compare.

Returns: A 32-bit signed integer that indicates the lexical relationship between the two comparands.

#### Remarks

The value returned by this method can have the following meanings:

| Value             | Meaning                  |
|-------------------|--------------------------|
| Less than zero    | `x` is less than `y`.    |
| Zero              | `x` equals `y`.          |
| Greater than zero | `x` is greater than `y`. |

## StringSegmentComparer.Equals(StringSegment, StringSegment) method

```csharp
public bool Equals (Microsoft.Extensions.Primitives.StringSegment x, Microsoft.Extensions.Primitives.StringSegment y);
```

Determines whether two `StringSegment` objects are equal.

Parameters:

- `x`: The first `StringSegment` to compare.
- `y`: The second `StringSegment` to compare.

Returns: `true` if the two `StringSegment` objects are equal; otherwise, `false`.

To be added.

## StringSegmentComparer.GetHashCode(StringSegment) method

```csharp
public int GetHashCode (Microsoft.Extensions.Primitives.StringSegment obj);
```

Returns a hash code for a `StringSegment` object.

Parameters:

- `obj`: The `StringSegment` to get a hash code for.

Returns: A hash code for a `StringSegment`, suitable for use in hashing algorithms and data structures like a hash table.

To be added.
