---
title: "Range struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Range.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Range struct

Namespace: `System`

```csharp
public readonly struct Range : IEquatable<Range>
```

Represents a range that has start and end indexes.

`Range` is used by the C# compiler to support the range syntax:

```csharp

            int[] someArray = new int[5] { 1, 2, 3, 4, 5 };
            int[] subArray1 = someArray[0..2]; // { 1, 2 }
            int[] subArray2 = someArray[1..^0]; // { 2, 3, 4, 5 }
            
```

## Range.Range(Index, Index) constructor

```csharp
public Range (Index start, Index end);
```

Instantiates a new `Range` instance with the specified starting and ending indexes.

Parameters:

- `start`: The inclusive start index of the range.
- `end`: The exclusive end index of the range.

To be added.

## Range.All property

```csharp
public static Range All { get; }
```

Gets a `Range` object that starts from the first element to the end.

Returns: A range from the start to the end.

To be added.

## Range.End property

```csharp
public Index End { get; }
```

Gets an `Index` that represents the exclusive end index of the range.

Returns: The end index of the range.

To be added.

## Range.Start property

```csharp
public Index Start { get; }
```

Gets the inclusive start index of the `Range`.

Returns: The inclusive start index of the range.

To be added.

## Range.EndAt(Index) method

```csharp
public static Range EndAt (Index end);
```

Creates a `Range` object starting from the first element in the collection to a specified end index.

Parameters:

- `end`: The position of the last element up to which the `Range` object will be created.

Returns: A range that starts from the first element to `end`.

To be added.

## Range.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Returns a value that indicates whether the current instance is equal to a specified object.

Parameters:

- `value`: An object to compare with this `Range` object.

Returns: `true` if `value` is of type `Range` and is equal to the current instance; otherwise, `false`.

To be added.

## Range.Equals(Range) method

```csharp
public bool Equals (Range other);
```

Returns a value that indicates whether the current instance is equal to another `Range` object.

Parameters:

- `other`: A `Range` object to compare with this `Range` object.

Returns: `true` if the current instance is equal to `other`; otherwise, `false`.

To be added.

## Range.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code.

To be added.

## Range.GetOffsetAndLength(Int32) method

```csharp
public (int Offset, int Length) GetOffsetAndLength (int length);
```

Calculates the start offset and length of the range object using a collection length.

Parameters:

- `length`: A positive integer that represents the length of the collection that the range will be used with.

Returns: The start offset and length of the range.

Exceptions:

- `ArgumentOutOfRangeException`: `length` is outside the bounds of the current range.

For performance reasons, this method doesn't validate `length` to ensure that it is not negative. It does ensure that `length` is within the current `Range` instance.

## Range.StartAt(Index) method

```csharp
public static Range StartAt (Index start);
```

Returns a new `Range` instance starting from a specified start index to the end of the collection.

Parameters:

- `start`: The position of the first element from which the Range will be created.

Returns: A range from `start` to the end of the collection.

To be added.

## Range.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of the current `Range` object.

Returns: The string representation of the range.

To be added.
