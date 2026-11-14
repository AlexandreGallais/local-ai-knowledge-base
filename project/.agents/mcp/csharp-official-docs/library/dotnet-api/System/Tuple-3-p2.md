---
title: "Tuple<T1,T2,T3> class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Tuple`3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Tuple<T1,T2,T3> class (part 2 of 2)

## Tuple<T1,T2,T3>.System.Collections.IStructuralEquatable.GetHashCode(IEqualityComparer) method

```csharp
int IStructuralEquatable.GetHashCode (System.Collections.IEqualityComparer comparer);
```

Calculates the hash code for the current `Tuple<T1,T2,T3>` object by using a specified computation method.

Parameters:

- `comparer`: An object whose `IEqualityComparer.GetHashCode` method calculates the hash code of the current `Tuple<T1,T2,T3>` object.

Returns: A 32-bit signed integer hash code.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2,T3>` instance is cast to an `IStructuralEquatable` interface.

The method simply wraps a call to the `comparer` object's `IEqualityComparer.GetHashCode` implementation.

The algorithm used to compute the hash code should return the same hash code for two `Tuple<T1,T2,T3>` objects that are considered to be equal.

## Tuple<T1,T2,T3>.System.IComparable.CompareTo(Object) method

```csharp
int IComparable.CompareTo (object obj);
```

Compares the current `Tuple<T1,T2,T3>` object to a specified object and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

Parameters:

- `obj`: An object to compare with the current instance.

Returns: A signed integer that indicates the relative position of this instance and `obj` in the sort order, as shown in the following table.

-  A negative integer

:  This instance precedes `obj`.

-  Zero

:  This instance and `obj` have the same position in the sort order.

-  A positive integer

:  This instance follows `obj`.

Exceptions:

- `ArgumentException`: `obj` is not a `Tuple<T1,T2,T3>` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2,T3>` instance is cast to an `IComparable` interface.

This method provides the `IComparable.CompareTo` implementation for the `Tuple<T1,T2,T3>` class. Although the method can be called directly, it is most commonly called by the default overloads of collection sorting methods, such as `Sort` and `SortedList.Add`, to order the members of a collection.

> **Caution:**
>  The `Tuple<T1,T2,T3>.System%23IComparable%23CompareTo` method is intended for use in sorting operations. It should not be used when the primary purpose of a comparison is to determine whether two objects are equal. To determine whether two objects are equal, call the `Tuple<T1,T2,T3>.Equals` method.

The `Tuple<T1,T2,T3>.System%23IComparable%23CompareTo` method uses the default object comparer to compare each component.

#### Examples
The following example creates an array of `Tuple<T1,T2,T3>` objects whose components consist of a student's name, mean test score, and number of tests. It displays the components of each tuple in the array in unsorted order, sorts the array, and then calls `Tuple<T1,T2,T3>.ToString` to display each tuple in sorted order. The output shows that the array has been sorted by its first component. Note that the example does not directly call the `Tuple<T1,T2,T3>.System%23IComparable%23CompareTo` method. This method is called implicitly by the `Sort` method for each element in the array.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3/System.Collections.IStructuralComparable.CompareTo/compareto1.cs._

## Tuple<T1,T2,T3>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the value of this `Tuple<T1,T2,T3>` instance.

Returns: The string representation of this `Tuple<T1,T2,T3>` object.

#### Remarks
The string returned by this method takes the form (*Item1*, *Item2*, *Item3*), where *Item1*, *Item2*, and *Item3* represent the values of the `Tuple<T1,T2,T3>.Item1`, `Tuple<T1,T2,T3>.Item2`, and `Tuple<T1,T2,T3>.Item3` properties, respectively. If any of the property values is `null`, it is represented as `Empty`.

#### Examples
The following example illustrates the `Tuple<T1,T2,T3>.ToString` method.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3/ToString/tostring1.cs._
