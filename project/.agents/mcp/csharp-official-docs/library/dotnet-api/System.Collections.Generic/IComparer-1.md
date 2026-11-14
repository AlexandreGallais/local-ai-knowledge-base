---
title: "IComparer<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/IComparer`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IComparer<T> interface

Namespace: `System.Collections.Generic`

```csharp
public interface IComparer<in T> where T : allows ref struct
```

Defines a method that a type implements to compare two objects.

Parameters:

- `T`: The type of objects to compare.

#### Remarks
This interface is used with the `List<T>.Sort` and `List<T>.BinarySearch` methods. It provides a way to customize the sort order of a collection. Classes that implement this interface include the `SortedDictionary<T1,T2>` and `SortedList<T1,T2>` generic classes.

The default implementation of this interface is the `Comparer<T>` class. The `StringComparer` class implements this interface for type `String`.

This interface supports ordering comparisons. That is, when the `Comparer<T>.Compare` method returns 0, it means that two objects sort the same. Implementation of exact equality comparisons is provided by the `IEqualityComparer<T>` generic interface.

We recommend that you derive from the `Comparer<T>` class instead of implementing the `IComparer<T>` interface, because the `Comparer<T>` class provides an explicit interface implementation of the `Comparer<T>.System%23Collections%23IComparer%23Compare` method and the `Default` property that gets the default comparer for the object.

#### Examples
The following example implements the `IComparer<T>` interface to compare objects of type `Box` according to their dimensions. This example is part of a larger example provided for the `Comparer<T>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ComparerT/Overview/program.cs._

## IComparer<T>.Compare(T, T) method

```csharp
public int Compare (T? x, T? y);
```

Compares two objects and returns a value indicating whether one is less than, equal to, or greater than the other.

Parameters:

- `x`: The first object to compare.
- `y`: The second object to compare.

Returns: A signed integer that indicates the relative values of `x` and `y`, as shown in the following table.

-  Less than zero

: `x` is less than `y`.

-  Zero

: `x` equals `y`.

-  Greater than zero

: `x` is greater than `y`.

#### Remarks
Implement this method to provide a customized sort order comparison for type `T`.

Comparing `null` with any reference type is allowed and does not generate an exception. A null reference is considered to be less than any reference that is not null.

#### Examples
The following example implements the `IComparer<T>` interface to compare objects of type `Box` according to their dimensions. This example is part of a larger example provided for the `Comparer<T>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ComparerT/Overview/program.cs._
