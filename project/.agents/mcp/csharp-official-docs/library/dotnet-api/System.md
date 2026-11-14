---
title: "Index struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Index.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Index struct

Namespace: `System`

```csharp
public readonly struct Index : IEquatable<Index>
```

Represents a type that can be used to index a collection either from the beginning or the end.

`Index` is used by the C# compiler to support the `^` or "index from end" operator:

```csharp

            int[] someArray = new int[5] { 1, 2, 3, 4, 5 };
            int lastElement = someArray[^1]; // lastElement = 5
            
```

## Index.Index(Int32, Boolean) constructor

```csharp
public Index (int value, bool fromEnd = false);
```

Initializes a new `Index` with a specified index position and a value that indicates if the index is from the beginning or the end of a collection.

Parameters:

- `value`: The index value. It has to be greater then or equal to zero.
- `fromEnd`: `true` to index from the end of the collection, or `false` to index from the beginning of the collection.

If the `Index` is constructed from the end, an index value of 1 points to the last element, and an index value of 0 points beyond the last element.

## Index.End property

```csharp
public static Index End { get; }
```

Gets an `Index` that points beyond the last element.

Returns: An index that points beyond the last element.

To be added.

## Index.IsFromEnd property

```csharp
public bool IsFromEnd { get; }
```

Gets a value that indicates whether the index is from the start or the end.

Returns: `true` if the Index is from the end; otherwise, `false`.

To be added.

## Index.Start property

```csharp
public static Index Start { get; }
```

Gets an `Index` that points to the first element of a collection.

Returns: An instance that points to the first element of a collection.

To be added.

## Index.Value property

```csharp
public int Value { get; }
```

Gets the index value.

Returns: The index value.

To be added.

## Index.Equals(Index) method

```csharp
public bool Equals (Index other);
```

Returns a value that indicates whether the current object is equal to another `Index` object.

Parameters:

- `other`: The object to compare with this instance.

Returns: `true` if the current Index object is equal to `other`; otherwise, `false`.

To be added.

## Index.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Indicates whether the current Index object is equal to a specified object.

Parameters:

- `value`: An object to compare with this instance.

Returns: `true` if `value` is of type `Index` and is equal to the current instance; otherwise, `false`.

To be added.

## Index.FromEnd(Int32) method

```csharp
public static Index FromEnd (int value);
```

Creates an `Index` from the end of a collection at a specified index position.

Parameters:

- `value`: The index value from the end of a collection.

Returns: The index value.

To be added.

## Index.FromStart(Int32) method

```csharp
public static Index FromStart (int value);
```

Creates an `Index` from the specified index at the start of a collection.

Parameters:

- `value`: The index position from the start of a collection.

Returns: The index value.

To be added.

## Index.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code.

To be added.

## Index.GetOffset(Int32) method

```csharp
public int GetOffset (int length);
```

Calculates the offset from the start of the collection using the specified collection length.

Parameters:

- `length`: The length of the collection that the Index will be used with. Must be a positive value.

Returns: The offset.

For performance reasons, this method does not validate if `length` or the returned value are negative. It also doesn't validate if the returned value is greater than `length`.
Collections aren't expected to have a negative length/count. If this method's returned offset is negative and is then used to index a collection, the runtime will throw `ArgumentOutOfRangeException`, which will have the same effect as validation.

## Index.op_Implicit(Int32) method

```csharp
public static implicit operator Index (int value);
```

Converts an integer number to an `Index`.

Parameters:

- `value`: The integer to convert.

Returns: An index representing the integer.

To be added.

## Index.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of the current `Index` instance.

Returns: The string representation of the `Index`.

To be added.
