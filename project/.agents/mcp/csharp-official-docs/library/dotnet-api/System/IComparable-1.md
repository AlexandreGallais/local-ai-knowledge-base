---
title: "IComparable<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IComparable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IComparable<T> interface

Namespace: `System`

```csharp
public interface IComparable<in T> where T : allows ref struct
```

Defines a generalized comparison method that a value type or class implements to create a type-specific comparison method for ordering or sorting its instances.

Parameters:

- `T`: The type of object to compare.

#### Remarks
This interface is implemented by types whose values can be ordered or sorted and provides a strongly typed comparison method for ordering members of a generic collection object. For example, one number can be larger than a second number, and one string can appear in alphabetical order before another. It requires that implementing types define a single method, `CompareTo`, that indicates whether the position of the current instance in the sort order is before, after, or the same as a second object of the same type. Typically, the method is not called directly from developer code. Instead, it is called automatically by methods such as `Sort` and `SortedList<T1,T2>.Add`.

Typically, types that provide an `IComparable<T>` implementation also implement the `IEquatable<T>` interface. The `IEquatable<T>` interface defines the `IEquatable<T>.Equals` method, which determines the equality of instances of the implementing type.

The implementation of the `CompareTo` method must return an `Int32` that has one of three values, as shown in the following table.

|Value|Meaning|
|-----------|-------------|
|Less than zero|This object precedes the object specified by the `IComparable<T>.CompareTo` method in the sort order.|
|Zero|This current instance occurs in the same position in the sort order as the object specified by the `IComparable<T>.CompareTo` method argument.|
|Greater than zero|This current instance follows the object specified by the `IComparable<T>.CompareTo` method argument in the sort order.|

All numeric types (such as `Int32` and `Double`) implement `IComparable<T>`, as do `String`, `Char`, and `DateTime`. Custom types should also provide their own implementation of `IComparable<T>` to enable object instances to be ordered or sorted.

#### Examples
The following example illustrates the implementation of `IComparable<T>` for a simple `Temperature` object. The example creates a `SortedList<T1,T2>` collection of strings with `Temperature` object keys, and adds several pairs of temperatures and strings to the list out of sequence. In the call to the `SortedList<T1,T2>.Add` method, the `SortedList<T1,T2>` collection uses the `IComparable<T>` implementation to sort the list entries, which are then displayed in order of increasing temperature.

_Code sample not included: ~/snippets/csharp/System/IComparableT/Overview/source.cs._

## IComparable<T>.CompareTo(T) method

```csharp
public int CompareTo (T? other);
```

Compares the current instance with another object of the same type and returns an integer that indicates whether the current instance precedes, follows, or occurs in the same position in the sort order as the other object.

Parameters:

- `other`: An object to compare with this instance.

Returns: A value that indicates the relative order of the objects being compared. The return value has these meanings:

-  Less than zero

:  This instance precedes `other` in the sort order.

-  Zero

:  This instance occurs in the same position in the sort order as `other`.

-  Greater than zero

:  This instance follows `other` in the sort order.

#### Remarks
`IComparable<T>.CompareTo` provides a strongly typed comparison method for ordering members of a generic collection object. Because of this, it is usually not called directly from developer code. Instead, it is called automatically by methods such as `Sort` and `SortedList<T1,T2>.Add`.

This method is only a definition and must be implemented by a specific class or value type to have effect. The meaning of the comparisons specified in the Return Values section ("precedes", "occurs in the same position as", and "follows) depends on the particular implementation.

By definition, any object compares greater than `null`, and two null references compare equal to each other.

#### Examples
The following code example illustrates the implementation of `IComparable<T>` for a simple `Temperature` object. The example creates a `SortedList<T1,T2>` collection of strings with `Temperature` object keys, and adds several pairs of temperatures and strings to the list out of sequence. In the call to the `SortedList<T1,T2>.Add` method, the `SortedList<T1,T2>` collection uses the `IComparable<T>` implementation to sort the list entries, which are then displayed in order of increasing temperature.

_Code sample not included: ~/snippets/csharp/System/IComparableT/Overview/source.cs._
