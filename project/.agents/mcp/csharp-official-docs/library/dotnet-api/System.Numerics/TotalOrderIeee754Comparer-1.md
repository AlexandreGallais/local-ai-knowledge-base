---
title: "TotalOrderIeee754Comparer<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/TotalOrderIeee754Comparer`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TotalOrderIeee754Comparer<T> struct

Namespace: `System.Numerics`

```csharp
public readonly struct TotalOrderIeee754Comparer<T> : IEquatable<System.Numerics.TotalOrderIeee754Comparer<T>>, System.Collections.Generic.IComparer<T>, System.Collections.Generic.IEqualityComparer<T> where T : IFloatingPointIeee754<T>
```

Represents a comparison operation that compares floating-point numbers with IEEE 754 totalOrder semantic.

Parameters:

- `T`: The type of the numbers to be compared, must be an IEEE 754 floating-point type.

To be added.

## TotalOrderIeee754Comparer<T>.Compare(T, T) method

```csharp
public int Compare (T? x, T? y);
```

Compares two numbers with IEEE 754 totalOrder semantic and returns a value indicating whether one is less than, equal to, or greater than the other.

Parameters:

- `x`: The first number to compare.
- `y`: The second number to compare.

Returns: A signed integer that indicates the relative values of `x` and `y`, as shown in the following table.

-  Less than zero: `x` is less than `y`
-  Zero: `x` equals `y`
-  Greater than zero: `x` is greater than `y`

IEEE 754 specification defines totalOrder as <= semantic.
totalOrder(x,y) is `true` when the result of this method is less than or equal to 0.

## TotalOrderIeee754Comparer<T>.Equals(TotalOrderIeee754Comparer<T>) method

```csharp
public bool Equals (System.Numerics.TotalOrderIeee754Comparer<T> other);
```

Indicates whether the current object is equal to another object of the same type.

Parameters:

- `other`: An object to compare with this object.

Returns: `true` if the current object is equal to the `other` parameter; otherwise, `false`.

To be added.

## TotalOrderIeee754Comparer<T>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether this instance and a specified object are equal.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: `true` if the current instance and `obj` are equal; otherwise, `false`. If `obj` is `null`, the method returns `false`.

To be added.

## TotalOrderIeee754Comparer<T>.Equals(T, T) method

```csharp
public bool Equals (T? x, T? y);
```

Determines whether the specified numbers are equal.

Parameters:

- `x`: The first number of type `T` to compare.
- `y`: The second number of type `T` to compare.

Returns: `true` if the specified numbers are equal; otherwise, `false`.

There is no corresponding equals semantic with totalOrder defined by IEEE 754 specification.
This method returns `true` when `TotalOrderIeee754Comparer<T>.Compare` returns 0.

## TotalOrderIeee754Comparer<T>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code.

To be added.

## TotalOrderIeee754Comparer<T>.GetHashCode(T) method

```csharp
public int GetHashCode (T obj);
```

Returns a hash code for the specified number.

Parameters:

- `obj`: The number for which a hash code is to be returned.

Returns: A hash code for the specified number.

To be added.
