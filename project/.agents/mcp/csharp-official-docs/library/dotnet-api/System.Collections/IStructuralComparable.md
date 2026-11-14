---
title: "IStructuralComparable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/IStructuralComparable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IStructuralComparable interface

Namespace: `System.Collections`

```csharp
public interface IStructuralComparable
```

Supports the structural comparison of collection objects.

#### Remarks
The `IStructuralComparable` interface enables you to implement customized comparisons for collection members. That is, you can define precisely what it means for one collection object to precede, follow, or occur in the same position in the sort order as a second collection object. You can then specify that this definition be used with a collection type that accepts the `IStructuralComparable` interface.

The interface has a single member, `IStructuralComparable.CompareTo`, which determines whether the current collection object is less than, equal to, or greater than a second object in the sort order. The actual comparison of the members or elements in the current instance with those in a second object is performed by an `IComparer` interface implementation, which contains the definition of your custom comparison.

> **Note:**
>  The `IStructuralComparable` interface supports only structural comparisons for sorting or ordering. The `IStructuralEquatable` interface supports custom comparisons for structural equality.

.NET provides two default comparers. One is returned by the `StructuralComparer` property; the other is returned by the `Default` property.

The generic tuple classes (`Tuple<T>`, `Tuple<T1,T2>`, `Tuple<T1,T2,T3>`, and so on) and the `Array` class provide explicit implementations of the `IStructuralComparable` interface. By casting (in C#) or converting (in Visual Basic) the current instance of an array or tuple to an `IStructuralComparable` interface value and providing your `IComparer` implementation as an argument to the `IStructuralComparable.CompareTo` method, you can define a custom sort order for the array or collection. However, you do not call the `IStructuralComparable.CompareTo` method directly in most cases. Instead, the `IStructuralComparable.CompareTo` method is called by sorting methods such as `Sort`. In this case, you define your `IComparer` implementation and pass it as an argument to a sorting method or collection object's class constructor. The `IStructuralComparable.CompareTo` method with your custom comparer is then called automatically whenever the collection is sorted.

#### Examples
The following example creates an array of `Tuple<T1,T2,T3,T4,T5,T6>` objects that contains population data for three U.S. cities from 1960 to 2000. The sextuple's first component is the city name. The remaining five components represent the population at ten-year intervals from 1960 to 2000.

The `PopulationComparer` class provides an `IComparer` implementation that allows the array of sextuples to be sorted by any one of its components. Two values are provided to the `PopulationComparer` class in its constructor: the position of the component that defines the sort order, and a Boolean value that indicates whether the tuple objects should be sorted in ascending or descending order.

The example then displays the elements in the array in unsorted order, sorts them by the third component (the population in 1970) and displays them, and then sorts them by the sixth component (the population in 2000) and displays them. Note that the example does not directly call the `IStructuralComparable.CompareTo` method. The method is called implicitly by the `Sort` method for each tuple object in the array.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6/System.Collections.IStructuralComparable.CompareTo/compareto2.cs._

## IStructuralComparable.CompareTo(Object, IComparer) method

```csharp
public int CompareTo (object? other, System.Collections.IComparer comparer);
```

Determines whether the current collection object precedes, occurs in the same position as, or follows another object in the sort order.

Parameters:

- `other`: The object to compare with the current instance.
- `comparer`: An object that compares members of the current collection object with the corresponding members of `other`.

Returns: A signed integer that indicates the relationship of the current collection object to `other` in the sort order: - If less than 0, the current instance precedes `other`. - If 0, the current instance and `other` are equal. - If greater than 0, the current instance follows `other`.

-  -1

:  The current instance precedes `other`.

-  0

:  The current instance and `other` are equal.

-  1

:  The current instance follows `other`.

Exceptions:

- `ArgumentException`: This instance and `other` are not the same type.

#### Remarks
The `IStructuralComparable.CompareTo` method supports custom structural comparison and sorting of array and tuple objects. The `IStructuralComparable.CompareTo` method calls the `comparer` object's `IComparer.Compare` method to compare individual array elements or tuple components, starting with the first element or component. The individual calls to `IComparer.Compare` end and the `IStructuralComparable.CompareTo` method returns a value when one of the following conditions becomes true:

- The `IComparer.Compare` method returns -1.

- The `IComparer.Compare` method returns 1.

- The `IComparer.Compare` method is called for the last element or component in the collection object.

#### Examples
The following example creates an array of `Tuple<T1,T2,T3,T4,T5,T6>` objects that contains population data for three U.S. cities from 1960 to 2000. The sextuple's first component is the city name. The remaining five components represent the population at ten-year intervals from 1960 to 2000.

The `PopulationComparer` class provides an `IComparer` implementation that allows the array of sextuples to be sorted by any one of its components. Two values are provided to the `PopulationComparer` class in its constructor: the position of the component that defines the sort order, and a `Boolean` value that indicates whether the tuple objects should be sorted in ascending or descending order.

The example then displays the elements in the array in unsorted order, sorts them by the third component (the population in 1970) and displays them, and then sorts them by the sixth component (the population in 2000) and displays them. Note that the example does not directly call the `IStructuralComparable.CompareTo` implementation. The method is called implicitly by the `Sort` method for each tuple object in the array.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5,T6/System.Collections.IStructuralComparable.CompareTo/compareto2.cs._
