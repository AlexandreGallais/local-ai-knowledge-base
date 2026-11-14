---
title: "NRange struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/NRange.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NRange struct

Namespace: `System.Buffers`

```csharp
public readonly struct NRange : IEquatable<System.Buffers.NRange>
```

Represents a range that has start and end indices.

```csharp

            int[] someArray = new int[5] { 1, 2, 3, 4, 5 };
            int[] subArray1 = someArray[0..2]; // { 1, 2 }
            int[] subArray2 = someArray[1..^0]; // { 2, 3, 4, 5 }
            
```

## NRange.NRange(Range) constructor

```csharp
public NRange (Range range);
```

Constructs an `NRange` object using a `Range`.

Parameters:

- `range`: The `Range` to use.

To be added.

## NRange.NRange(NIndex, NIndex) constructor

```csharp
public NRange (System.Buffers.NIndex start, System.Buffers.NIndex end);
```

Constructs an `NRange` object using the start and end `NIndex`.

Parameters:

- `start`: The inclusive start `NIndex` of the `NRange`.
- `end`: The exclusive end `NIndex` of the `NRange`.

To be added.

## NRange.All property

```csharp
public static System.Buffers.NRange All { get; }
```

Creates an NRange object starting from first element to the end.

Returns: To be added.

To be added.

## NRange.End property

```csharp
public System.Buffers.NIndex End { get; }
```

Gets the exclusive end NIndex of the NRange.

Returns: To be added.

To be added.

## NRange.Start property

```csharp
public System.Buffers.NIndex Start { get; }
```

Gets the inclusive start NIndex of the NRange.

Returns: To be added.

To be added.

## NRange.EndAt(NIndex) method

```csharp
public static System.Buffers.NRange EndAt (System.Buffers.NIndex end);
```

Creates an `NRange` object starting from first element in the collection to the end `NIndex`.

Parameters:

- `end`: To be added.

Returns: To be added.

To be added.

## NRange.Equals(NRange) method

```csharp
public bool Equals (System.Buffers.NRange other);
```

Compares the current `NRange` object to another `NRange` object for equality.

Parameters:

- `other`: An object to compare with this object.

Returns: To be added.

To be added.

## NRange.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Compares the current `NRange` object to another object of the same type for equality.

Parameters:

- `value`: An object to compare with this object.

Returns: To be added.

To be added.

## NRange.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: To be added.

To be added.

## NRange.GetOffsetAndLength(IntPtr) method

```csharp
public (IntPtr Offset, IntPtr Length) GetOffsetAndLength (IntPtr length);
```

Calculates the start offset and length of the `NRange` object using a collection length.

Parameters:

- `length`: The length of the collection that the `NRange` will be used with. Must be a positive value.

Returns: To be added.

For performance reasons, the input length parameter isn't validated against negative values.
It's expected NRange will be used with collections that always have a non-negative length/count.
The `NRange` is validated to be inside the length scope, however.

## NRange.op_CheckedExplicit(NRange) method

```csharp
public static Range op_CheckedExplicit (System.Buffers.NRange value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## NRange.op_Explicit(NRange) method

```csharp
public static explicit operator Range (System.Buffers.NRange value);
```

Explicitly converts an `NRange` to a `Range` without doing bounds checks.

Parameters:

- `value`: `NRange` to convert.

Returns: To be added.

To be added.

## NRange.op_Implicit(Range) method

```csharp
public static implicit operator System.Buffers.NRange (Range range);
```

Implicitly converts a `Range` to an `NRange`.

Returns: To be added.

To be added.

## NRange.StartAt(NIndex) method

```csharp
public static System.Buffers.NRange StartAt (System.Buffers.NIndex start);
```

Creates an `NRange` object starting from start `NIndex` to the end of the collection.

Parameters:

- `start`: To be added.

Returns: To be added.

To be added.

## NRange.ToRange() method

```csharp
public Range ToRange ();
```

Converts a `NRange` to a `Range`.

Returns: The converted Range.

To be added.

## NRange.ToRangeUnchecked() method

```csharp
public Range ToRangeUnchecked ();
```

Converts a `NRange` to a `Range` without doing bounds checks.

Returns: The converted Range.

To be added.

## NRange.ToString() method

```csharp
public override string ToString ();
```

Converts the value of the current NRange object to its equivalent string representation.

Returns: To be added.

To be added.
