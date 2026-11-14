---
title: "Tuple<T1,T2> class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Tuple`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Tuple<T1,T2> class (part 2 of 2)

## Tuple<T1,T2>.System.IComparable.CompareTo(Object) method

```csharp
int IComparable.CompareTo (object obj);
```

Compares the current `Tuple<T1,T2>` object to a specified object and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

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

- `ArgumentException`: `obj` is not a `Tuple<T1,T2>` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2>` instance is cast to an `IComparable` interface.

This method provides the `IComparable.CompareTo` implementation for the `Tuple<T1,T2>` class. Although the method can be called directly, it is most commonly called by the default overloads of collection sorting methods, such as `Sort` and `SortedList.Add`, to order the members of a collection.

> **Caution:**
>  The `Tuple<T1,T2>.System%23IComparable%23CompareTo` method is intended for use in sorting operations. It should not be used when the primary purpose of a comparison is to determine whether two objects are equal. To determine whether two objects are equal, call the `Tuple<T1,T2>.Equals` method.

The `Tuple<T1,T2>.System%23IComparable%23CompareTo` method uses the default object comparer to compare each component.

#### Examples
The following example creates an array of `Tuple<T1,T2>` objects that consist of a student's name and test score. It displays the component of each tuple in the array in unsorted order, sorts the array, and then calls `Tuple<T1,T2>.ToString` to display the value of each tuple in sorted order. The output shows that the array has been sorted by its first component. Note that the example does not directly call the `System%23IComparable%23CompareTo` method. This method is called implicitly by the `Sort` method for each element in the array.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2/System.Collections.IStructuralComparable.CompareTo/compareto1.cs._

## Tuple<T1,T2>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the value of this `Tuple<T1,T2>` instance.

Returns: The string representation of this `Tuple<T1,T2>` object.

#### Remarks
The string returned by this method takes the form (*Item1*, *Item2*), where *Item1* and *Item2* represent the values of the `Tuple<T1,T2>.Item1` and `Tuple<T1,T2>.Item2` properties. If either property value is `null`, it is represented as `Empty`.

#### Examples
The following example illustrates the `Tuple<T1,T2>.ToString` method.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2/ToString/tostring1.cs._
