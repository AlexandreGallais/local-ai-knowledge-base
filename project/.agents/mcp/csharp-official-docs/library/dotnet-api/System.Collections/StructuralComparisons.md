---
title: "StructuralComparisons class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/StructuralComparisons.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StructuralComparisons class

Namespace: `System.Collections`

```csharp
public static class StructuralComparisons
```

Provides objects for performing a structural comparison of two collection objects.

#### Remarks
The `StructuralComparisons` class returns the following two predefined comparison objects:

- An `IComparer` implementation that can be passed to a method such as `System%23Collections%23IStructuralComparable%23CompareTo` or `System%23Collections%23IStructuralComparable%23CompareTo` to perform a structural comparison of two objects. It is designed to indicate whether the first object precedes, follows, or occurs in the same position as the second object in the sort order.

- An `IEqualityComparer` implementation that can be passed to a method such as `System%23Collections%23IStructuralEquatable%23Equals` or `System%23Collections%23IStructuralEquatable%23Equals` to perform a comparison for structural equality.

The objects can be used to perform a structural comparison or a structural equality comparison of two collection objects, such as array or tuple objects. In structural comparison, two objects are compared based on their values. Objects can be ordered based on some criteria, and two objects are considered equal when they have equal values, not because they reference the same physical object

## StructuralComparisons.StructuralComparer property

```csharp
public static System.Collections.IComparer StructuralComparer { get; }
```

Gets a predefined object that performs a structural comparison of two objects.

Returns: A predefined object that is used to perform a structural comparison of two collection objects.

#### Remarks
When the `IComparer` object returned by this property is passed to the comparison method of a collection object, such as `System%23Collections%23IStructuralComparable%23CompareTo` or `System%23Collections%23IStructuralComparable%23CompareTo`, its `IComparer.Compare` method is called for each member of an array or for each component of a tuple. This implementation of the `IComparer.Compare` method behaves as follows when it compares each item of a collection object with the corresponding item of another collection object:

- It considers two items that are `null` to be equal, and considers a null item to be less than an item that is not null.

- If the first item in the comparison can be cast to an `IStructuralComparable` object (in other words, if it is a collection object that implements the `IStructuralComparable` interface), it calls the `IStructuralComparable.CompareTo` method.

- If the first item in the comparison cannot be cast to an `IStructuralComparable` object (in other words, if it is not a collection object that implements the `IStructuralComparable` interface), it calls the `Comparer.Default.Compare` method.

## StructuralComparisons.StructuralEqualityComparer property

```csharp
public static System.Collections.IEqualityComparer StructuralEqualityComparer { get; }
```

Gets a predefined object that compares two objects for structural equality.

Returns: A predefined object that is used to compare two collection objects for structural equality.

#### Remarks
When the `IEqualityComparer` object returned by this property is passed to the equality comparison method of a collection object, such as `System%23Collections%23IStructuralEquatable%23Equals` or `System%23Collections%23IStructuralEquatable%23Equals`, its `IEqualityComparer.Equals` method is called for each member of an array or for each component of a tuple. This implementation of the `IEqualityComparer.Equals` method behaves as follows when it compares each item of a collection object with the corresponding item of another collection object:

- If both items are `null`, it considers the two items to be equal.

- If one item is null but the other item is not, it considers the two items to be unequal.

- If the first item in the comparison can be cast to an `IStructuralEquatable` object (in other words, if it is a collection object that implements the `IStructuralEquatable` interface), it calls the `IStructuralEquatable.Equals` method.

- If the first item in the comparison cannot be cast to an `IStructuralEquatable` object (in other words, if it is not a collection object that implements the `IStructuralEquatable` interface), it calls the item's `Equals` method.
