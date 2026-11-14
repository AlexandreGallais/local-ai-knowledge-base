---
title: "NIndex struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/NIndex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NIndex struct

Namespace: `System.Buffers`

```csharp
public readonly struct NIndex : IEquatable<System.Buffers.NIndex>
```

Represents a type that can be used to index a collection either from the start or the end.

```csharp

            int[] someArray = new int[5] { 1, 2, 3, 4, 5 } ;
            int lastElement = someArray[^1]; // lastElement = 5
            
```

```csharp

int[] someArray = new int[5] { 1, 2, 3, 4, 5 } ;
int lastElement = someArray[^1]; // lastElement = 5
      
```

## NIndex.NIndex(Index) constructor

```csharp
public NIndex (Index index);
```

Constructs an `NIndex` from an `Index`.

Parameters:

- `index`: The `Index` to create the `NIndex` from.

If the NIndex constructed from the end, an index value of 1 points at the last element and an index value of 0 points beyond the last element.

## NIndex.NIndex(IntPtr, Boolean) constructor

```csharp
public NIndex (IntPtr value, bool fromEnd = false);
```

Constructs an `NIndex` using an index value and a Boolean that indicates if the `NIndex` is from the start or from the end.

Parameters:

- `value`: The index value. It must be greater than or equal to zero.
- `fromEnd`: `true` if the index is from the start; `false` if it's from the end.

If the NIndex constructed from the end, an index value of 1 points at the last element and an index value of 0 points beyond the last element.

## NIndex.End property

```csharp
public static System.Buffers.NIndex End { get; }
```

Creates an `NIndex` that points beyond the last element.

Returns: To be added.

To be added.

## NIndex.IsFromEnd property

```csharp
public bool IsFromEnd { get; }
```

Gets a value that indicates whether the `NIndex` is from the start or the end.

Returns: To be added.

To be added.

## NIndex.Start property

```csharp
public static System.Buffers.NIndex Start { get; }
```

Creates an `NIndex` that points at the first element.

Returns: To be added.

To be added.

## NIndex.Value property

```csharp
public IntPtr Value { get; }
```

Gets the `NIndex` value.

Returns: To be added.

To be added.

## NIndex.Equals(NIndex) method

```csharp
public bool Equals (System.Buffers.NIndex other);
```

Compares the current `NIndex` object to another `NIndex` object for equality.

Parameters:

- `other`: An object to compare with this object.

Returns: To be added.

To be added.

## NIndex.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Compares the current NIndex object to another object of the same type for equality.

Parameters:

- `value`: An object to compare with this object.

Returns: To be added.

To be added.

## NIndex.FromEnd(IntPtr) method

```csharp
public static System.Buffers.NIndex FromEnd (IntPtr value);
```

Creates an NIndex from the end at the specified position.

Parameters:

- `value`: The index value from the end.

Returns: To be added.

To be added.

## NIndex.FromStart(IntPtr) method

```csharp
public static System.Buffers.NIndex FromStart (IntPtr value);
```

Creates an `NIndex` from the start at the specified position.

Parameters:

- `value`: The index value from the start.

Returns: To be added.

To be added.

## NIndex.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: To be added.

To be added.

## NIndex.GetOffset(IntPtr) method

```csharp
public IntPtr GetOffset (IntPtr length);
```

Calculates the offset from the start using the given collection length.

Parameters:

- `length`: The length of the collection that the NIndex will be used with. Must be a positive value.

Returns: To be added.

For performance reasons, the input length argument and the returned offset value aren't validated against negative values.
Also, the returned offset might be greater than the input length.
It is expected `NIndex` will be used with collections that always have a non-negative length/count. If the returned offset is negative and
then used to `NIndex` a collection, an `ArgumentOutOfRangeException` is thrown, which has the same effect as the validation.

## NIndex.op_CheckedExplicit(NIndex) method

```csharp
public static Index op_CheckedExplicit (System.Buffers.NIndex value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## NIndex.op_Explicit(NIndex) method

```csharp
public static explicit operator Index (System.Buffers.NIndex value);
```

Converts an `NIndex` to an `Index`.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## NIndex.op_Implicit(Index) method

```csharp
public static implicit operator System.Buffers.NIndex (Index value);
```

Converts a native integer number to an NIndex.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## NIndex.op_Implicit(IntPtr) method

```csharp
public static implicit operator System.Buffers.NIndex (IntPtr value);
```

Converts an integer number to an NIndex.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## NIndex.ToIndex() method

```csharp
public Index ToIndex ();
```

Converts the `NIndex` to an `Index`.

Returns: The converted Index.

To be added.

## NIndex.ToIndexUnchecked() method

```csharp
public Index ToIndexUnchecked ();
```

Converts the `NIndex` to an `Index` without doing bounds checks.

Returns: The converted Index.

To be added.

## NIndex.ToString() method

```csharp
public override string ToString ();
```

Converts the value of the current NIndex object to its equivalent string representation.

Returns: To be added.

To be added.
