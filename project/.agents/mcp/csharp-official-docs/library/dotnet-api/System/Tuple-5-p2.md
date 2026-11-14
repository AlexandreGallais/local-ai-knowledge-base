---
title: "Tuple<T1,T2,T3,T4,T5> class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Tuple`5.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Tuple<T1,T2,T3,T4,T5> class (part 2 of 2)

## Tuple<T1,T2,T3,T4,T5>.System.Collections.IStructuralComparable.CompareTo(Object, IComparer) method

```csharp
int IStructuralComparable.CompareTo (object other, System.Collections.IComparer comparer);
```

Compares the current `Tuple<T1,T2,T3,T4,T5>` object to a specified object by using a specified comparer and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

Parameters:

- `other`: An object to compare with the current instance.
- `comparer`: An object that provides custom rules for comparison.

Returns: A signed integer that indicates the relative position of this instance and `other` in the sort order, as shown in the following table.

-  A negative integer

:  This instance precedes `other`.

-  Zero

:  This instance and `other` have the same position in the sort order.

-  A positive integer

:  This instance follows `other`.

Exceptions:

- `ArgumentException`: `other` is not a `Tuple<T1,T2,T3,T4,T5>` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2,T3,T4,T5>` instance is cast to an `IStructuralComparable` interface.

Although this method can be called directly, it is most commonly called by collection-sorting methods that include `IComparer` parameters to order the members of a collection. For example, it is called by the `Sort` method and the `SortedList.Add` method of a `SortedList` object that is instantiated by using the `%23ctor` constructor.

> **Caution:**
>  The `Tuple<T1,T2,T3,T4,T5>.System%23Collections%23IStructuralComparable%23CompareTo` method is intended for use in sorting operations. It should not be used when the primary purpose of a comparison is to determine whether two objects are equal. To determine whether two objects are equal, call the `System%23Collections%23IStructuralEquatable%23Equals` method.

#### Examples
The following example creates an array of `Tuple<T1,T2,T3,T4,T5>` objects that contain career statistical data for running backs in American professional football. The 5-tuple's components consist of the player's name, the number of games in which he played, the number of carries or attempts, the total number of yards gained, and the number of touchdowns scored. The example displays the components of each tuple in the array in unsorted order, sorts the array, and then calls `Tuple<T1,T2,T3,T4,T5>.ToString` to display each tuple in sorted order. To sort the array, the example defines a generic `YardsGained` class that implements the `IComparer` interface and sorts the `Tuple<T1,T2,T3,T4,T5>` objects in descending order by the value of their fourth component (yards gained) rather than by their first component. Note that the example does not directly call the `Tuple<T1,T2,T3,T4,T5>.System%23Collections%23IStructuralComparable%23CompareTo` method. This method is called implicitly by the `Sort` method for each element in the array.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5/System.Collections.IStructuralComparable.CompareTo/compareto2.cs._

## Tuple<T1,T2,T3,T4,T5>.System.Collections.IStructuralEquatable.Equals(Object, IEqualityComparer) method

```csharp
bool IStructuralEquatable.Equals (object other, System.Collections.IEqualityComparer comparer);
```

Returns a value that indicates whether the current `Tuple<T1,T2,T3,T4,T5>` object is equal to a specified object based on a specified comparison method.

Parameters:

- `other`: The object to compare with this instance.
- `comparer`: An object that defines the method to use to evaluate whether the two objects are equal.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2,T3,T4,T5>` instance is cast to an `IStructuralEquatable` interface.

The `IEqualityComparer.Equals` implementation is called only if `other` is not `null`, and if it can be successfully cast (in C#) or converted (in Visual Basic) to a `Tuple<T1,T2,T3,T4,T5>` object whose components are of the same types as the current instance. The `System%23Collections%23IStructuralEquatable%23Equals` method first passes the `Tuple<T1,T2,T3,T4,T5>.Item1` values of the `Tuple<T1,T2,T3,T4,T5>` objects to be compared to the `IEqualityComparer.Equals` implementation. If this method call returns `true`, the method is called again and passed the `Tuple<T1,T2,T3,T4,T5>.Item2` values of the two `Tuple<T1,T2,T3,T4,T5>` objects. This continues until the method call returns `false` when it compares a specific pair of `Item` values, or the two `Tuple<T1,T2,T3,T4,T5>.Item5` values are passed to the method.

#### Examples
The following example defines a `DoubleComparer` class that implements the `IEqualityComparer` interface. The example instantiates two `Tuple<T1,T2,T3,T4,T5>` objects by using a random number generator to populate their second through fifth components, casts the first instance to an `IStructuralEquatable` interface, and then uses a `DoubleComparer` object to test the two `Tuple<T1,T2,T3,T4,T5>` objects for approximate equality.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5/Equals/equals2.cs._

## Tuple<T1,T2,T3,T4,T5>.System.Collections.IStructuralEquatable.GetHashCode(IEqualityComparer) method

```csharp
int IStructuralEquatable.GetHashCode (System.Collections.IEqualityComparer comparer);
```

Calculates the hash code for the current `Tuple<T1,T2,T3,T4,T5>` object by using a specified computation method.

Parameters:

- `comparer`: An object whose `IEqualityComparer.GetHashCode` method calculates the hash code of the current `Tuple<T1,T2,T3,T4,T5>` object.

Returns: A 32-bit signed integer hash code.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2,T3,T4,T5>` instance is cast to an `IStructuralEquatable` interface.

The method simply wraps a call to the `comparer` object's `IEqualityComparer.GetHashCode` implementation.

The algorithm used to compute the hash code should return the same hash code for two `Tuple<T1,T2,T3,T4,T5>` objects that are considered to be equal.

## Tuple<T1,T2,T3,T4,T5>.System.IComparable.CompareTo(Object) method

```csharp
int IComparable.CompareTo (object obj);
```

Compares the current `Tuple<T1,T2,T3,T4,T5>` object to a specified object and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

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

- `ArgumentException`: `obj` is not a `Tuple<T1,T2,T3,T4,T5>` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2,T3,T4,T5>` instance is cast to an `IComparable` interface.

This method provides the `IComparable.CompareTo` implementation for the `Tuple<T1,T2,T3,T4,T5>` class. Although the method can be called directly, it is most commonly called by the default overloads of collection-sorting methods, such as `Sort` and `SortedList.Add`, to order the members of a collection.

> **Caution:**
>  The `Tuple<T1,T2,T3,T4,T5>.System%23IComparable%23CompareTo` method is intended for use in sorting operations. It should not be used when the primary purpose of a comparison is to determine whether two objects are equal. To determine whether two objects are equal, call the `Equals` method.

The `System%23IComparable%23CompareTo` method uses the default object  comparer to compare each component.

#### Examples
The following example creates an array of `Tuple<T1,T2,T3,T4,T5>` objects that contain career statistics for running backs in American professional football. The five components consist of the player's name, the number of games in which he played, the number of carries or attempts, the total number of yards gained, and the number of touchdowns scored. The example displays the components of each tuple in the array in unsorted order, sorts the array, and then calls `Tuple<T1,T2,T3,T4,T5>.ToString` to display each tuple in sorted order. The output shows that the array has been sorted by name, which is the first component. Note that the example does not directly call the `Tuple<T1,T2,T3,T4,T5>.System%23IComparable%23CompareTo` method. This method is called implicitly by the `Sort` method for each element in the array.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5/System.Collections.IStructuralComparable.CompareTo/compareto1.cs._

## Tuple<T1,T2,T3,T4,T5>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the value of this `Tuple<T1,T2,T3,T4,T5>` instance.

Returns: The string representation of this `Tuple<T1,T2,T3,T4,T5>` object.

#### Remarks
The string returned by this method takes the form (*Item1*, *Item2*, *Item3*, *Item4*, `Item5`), where *Item1*, *Item2*, *Item3*, *Item4*, and `Item5` represent the values of the `Tuple<T1,T2,T3,T4,T5>.Item1`, `Tuple<T1,T2,T3,T4,T5>.Item2`, `Tuple<T1,T2,T3,T4,T5>.Item3`, `Tuple<T1,T2,T3,T4,T5>.Item4`, and `Tuple<T1,T2,T3,T4,T5>.Item5` properties, respectively. If any of the property values is `null`, it is represented as `Empty`.

#### Examples
The following example illustrates the `Tuple<T1,T2,T3,T4,T5>.ToString` method. It displays an array of 5-tuple objects that contain the name of a state in the United States, its population in 1990 and 2000, its population change in this 10-year period, and the annual rate of population change.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5/ToString/tostring1.cs._
