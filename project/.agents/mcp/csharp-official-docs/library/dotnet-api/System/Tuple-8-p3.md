---
title: "Tuple<T1,T2,T3,T4,T5,T6,T7,TRest> class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Tuple`8.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Tuple<T1,T2,T3,T4,T5,T6,T7,TRest> class (part 3 of 3)

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.System.IComparable.CompareTo(Object) method

```csharp
int IComparable.CompareTo (object obj);
```

Compares the current `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object to a specified object and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

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

- `ArgumentException`: `obj` is not a `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance is cast to an `IComparable` interface.

This method provides the `IComparable.CompareTo` implementation for the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` class. Although the method can be called directly, it is most commonly called by the default overloads of collection-sorting methods, such as `Sort` and `SortedList.Add`, to order the members of a collection.

> **Caution:**
>  The `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.System%23IComparable%23CompareTo` method is intended for use in sorting operations. It should not be used when the primary purpose of a comparison is to determine whether two objects are equal. To determine whether two objects are equal, call the `Equals` method.

This method uses the default object comparer to compare each component.

#### Examples
The following example creates an array of octuples whose components are integers that contain a range of prime numbers. The example displays the elements of the array in unsorted order, sorts the array, and then displays the array in sorted order. The output shows that the array has been sorted by `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item1`, or the tuple's first component. Note that the example does not directly call the `System%23IComparable%23CompareTo` method. This method is called implicitly by the `Sort` method for each element in the array.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/System.Collections.IStructuralComparable.CompareTo/compareto1.cs._

## Tuple<T1,T2,T3,T4,T5,T6,T7,TRest>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the value of this `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance.

Returns: The string representation of this `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object.

#### Remarks
The string returned by this method takes the form (*Item1*, *Item2*, *Item3*, *Item4*, `Item5, Item6, Item7`, *Item8*…), where *Item1*, *Item2*, *Item3*, *Item4*, *Item5*, *Item6*, and *Item7* represent the values of the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item1`, `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item2`, `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item3`, `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item4`, `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item5`, `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item6`, and `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.Item7` properties. *Item8* represents the value of the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>` object's `Next.Item1` property. The value of any additional nested components follow *Item8*. If any of the property values is `null`, it is represented as `Empty`.

#### Examples
The following example creates a 17-tuple that contains population data for the city of Detroit, Michigan, from 1860 to 1900. It then uses the `Tuple<T1,T2,T3,T4,T5,T6,T7,T8>.ToString` method to display the tuple's data.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6,T7,TRest/ToString/tostring1.cs._
