---
title: "Tuple<T1,T2,T3,T4> class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Tuple`4.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Tuple<T1,T2,T3,T4> class (part 2 of 2)

## Tuple<T1,T2,T3,T4>.System.Collections.IStructuralEquatable.Equals(Object, IEqualityComparer) method

```csharp
bool IStructuralEquatable.Equals (object other, System.Collections.IEqualityComparer comparer);
```

Returns a value that indicates whether the current `Tuple<T1,T2,T3,T4>` object is equal to a specified object based on a specified comparison method.

Parameters:

- `other`: The object to compare with this instance.
- `comparer`: An object that defines the method to use to evaluate whether the two objects are equal.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2,T3,T4>` instance is cast to an `IStructuralEquatable` interface.

The `IEqualityComparer.Equals` implementation is called only if `other` is not `null`, and if it can be successfully cast (in C#) or converted (in Visual Basic) to a `Tuple<T1,T2,T3,T4>` object whose components are of the same types as the current instance. The `System%23Collections%23IStructuralEquatable%23Equals` method first passes the `Tuple<T1,T2,T3,T4>.Item1` values of the `Tuple<T1,T2,T3,T4>` objects to be compared to the `IEqualityComparer.Equals` implementation. If this method call returns `true`, the method is called again and passed the `Tuple<T1,T2,T3,T4>.Item2` values of the two `Tuple<T1,T2,T3,T4>` objects. If this method call returns `true` again, the method is called a third time and passed the `Tuple<T1,T2,T3,T4>.Item3` values of the two `Tuple<T1,T2,T3,T4>` objects. If this method call returns `true` again, the method is called for the fourth and final time and passed the `Tuple<T1,T2,T3,T4>.Item4` values of the two `Tuple<T1,T2,T3,T4>` objects.

#### Examples
The following example defines an `Item3And4Comparer` class that implements the `IEqualityComparer` interface and changes the way in which `Tuple<T1,T2,T3,T4>` objects are evaluated for equality. The method always returns `true` when it is passed the `Tuple<T1,T2,T3,T4>.Item1` and `Item2` property values of two `Tuple<T1,T2,T3,T4>` objects, and it calls the `obj.Equals` method to evaluate their `Item3` property values. It this method call returns `true`, it also calls the `obj.Equals` method to evaluate the tuples' `Item4` property values. As a result, the method tests for equality based only on the values of the `Tuple<T1,T2,T3,T4>.Item3` and `Tuple<T1,T2,T3,T4>.Item4` properties. The output illustrates the result for a data set of `Tuple<T1,T2,T3,T4>` objects that record the name of a U.S. city, the month of a year, and the average high and low temperature for that month.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4/Equals/equals2.cs._

## Tuple<T1,T2,T3,T4>.System.Collections.IStructuralEquatable.GetHashCode(IEqualityComparer) method

```csharp
int IStructuralEquatable.GetHashCode (System.Collections.IEqualityComparer comparer);
```

Calculates the hash code for the current `Tuple<T1,T2,T3,T4>` object by using a specified computation method.

Parameters:

- `comparer`: An object whose `IEqualityComparer.GetHashCode` method calculates the hash code of the current `Tuple<T1,T2,T3,T4>` object.

Returns: A 32-bit signed integer hash code.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2,T3,T4>` instance is cast to an `IStructuralEquatable` interface.

The method simply wraps a call to the `comparer` object's `IEqualityComparer.GetHashCode` implementation.

The algorithm used to compute the hash code should return the same hash code for two `Tuple<T1,T2,T3,T4>` objects that are considered to be equal.

## Tuple<T1,T2,T3,T4>.System.IComparable.CompareTo(Object) method

```csharp
int IComparable.CompareTo (object obj);
```

Compares the current `Tuple<T1,T2,T3,T4>` object to a specified object and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

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

- `ArgumentException`: `obj` is not a `Tuple<T1,T2,T3,T4>` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T1,T2,T3,T4>` instance is cast to an `IComparable` interface.

This method provides the `IComparable.CompareTo` implementation for the `Tuple<T1,T2,T3,T4>` class. Although the method can be called directly, it is most commonly called by the default overloads of collection sorting methods, such as `Sort` and `SortedList.Add`, to order the members of a collection.

> **Caution:**
>  The `Tuple<T1,T2,T3,T4>.System%23IComparable%23CompareTo` method is intended for use in sorting operations. It should not be used when the primary purpose of a comparison is to determine whether two objects are equal. To determine whether two objects are equal, call the `Tuple<T1,T2,T3,T4>.Equals` method.

The `Tuple<T1,T2,T3,T4>.System%23IComparable%23CompareTo` method uses the default object comparer to compare each component.

#### Examples
The following example creates an array of `Tuple<T1,T2,T3,T4>` objects whose components consist of a baseball pitcher's name, number of innings pitched, and number of hits and earned runs given up. It displays the components of each tuple in the array in unsorted order, sorts the array, and then calls `Tuple<T1,T2,T3,T4>.ToString` to display each tuple in sorted order. The output shows that the array has been sorted by name, which is the first component. Note that the example does not directly call the `System%23IComparable%23CompareTo` method. This method is called implicitly by the `Sort` method for each element in the array.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4/System.Collections.IStructuralComparable.CompareTo/compareto1.cs._

## Tuple<T1,T2,T3,T4>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the value of this `Tuple<T1,T2,T3,T4>` instance.

Returns: The string representation of this `Tuple<T1,T2,T3,T4>` object.

#### Remarks
The string returned by this method takes the form (*Item1*, *Item2*, *Item3*, *Item4*), where *Item1*, *Item2*, *Item3*, and *Item4* represent the values of the `Tuple<T1,T2,T3,T4>.Item1`, `Tuple<T1,T2,T3,T4>.Item2`, `Tuple<T1,T2,T3,T4>.Item3`, and `Tuple<T1,T2,T3,T4>.Item4` properties, respectively. If any of the property values is `null`, it is represented as `Empty`.

#### Examples
The following example illustrates the `Tuple<T1,T2,T3,T4>.ToString` method. It displays the components of an array of 4-tuple objects that contain the name of a city, a month of the year, and the high and low average temperature for that month.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4/ToString/tostring1.cs._
