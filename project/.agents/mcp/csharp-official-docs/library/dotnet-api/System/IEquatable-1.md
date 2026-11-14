---
title: "IEquatable<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IEquatable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IEquatable<T> interface

Namespace: `System`

```csharp
public interface IEquatable<T> where T : allows ref struct
```

Defines a generalized method that a value type or class implements to create a type-specific method for determining equality of instances.

Parameters:

- `T`: The type of objects to compare.

#### Remarks
This interface is implemented by types whose values can be equated (for example, the numeric and string classes). A value type or class implements the `IEquatable<T>.Equals` method to create a type-specific method suitable for determining equality of instances.

> **Note:**
>  The `IComparable<T>` interface defines the `IComparable<T>.CompareTo` method, which determines the sort order of instances of the implementing type. The `IEquatable<T>` interface defines the `IEquatable<T>.Equals` method, which determines the equality of instances of the implementing type.

The `IEquatable<T>` interface is used by generic collection objects such as `Dictionary<T1,T2>`, `List<T>`, and `LinkedList<T>` when testing for equality in such methods as `Contains`, `IndexOf`, `LastIndexOf`, and `Remove`. It should be implemented for any object that might be stored in a generic collection.

For more information about implementing the `IEquatable<T>` interface, see remarks on the `IEquatable<T>.Equals` method.

#### Examples
The following example shows the partial implementation of a `Person` class that implements `IEquatable<T>` and has two properties, `LastName` and `NationalId`. `NationalId` is considered to be a unique identifier, therefore the `IEquatable<T>.Equals` method returns `True` if the `NationalId` property of two `Person` objects is identical; otherwise, it returns `False`.
(Note that the F# example does not handle `null` values for `Person` instances.)

_Code sample not included: ~/snippets/csharp/System/IEquatableT/Equals/EqualsExample.cs._

## IEquatable<T>.Equals(T) method

```csharp
public bool Equals (T? other);
```

Indicates whether the current object is equal to another object of the same type.

Parameters:

- `other`: An object to compare with this object.

Returns: `true` if the current object is equal to the `other` parameter; otherwise, `false`.

#### Remarks
The implementation of the `IEquatable<T>.Equals` method is intended to perform a test for equality with another object of type `T`, the same type as the current object. The `Equals` method is called in the following circumstances:

- When the `Equals` method is called and the `other` argument is a strongly-typed object of type `T`. (If `other` is not of type `T`, the base `Equals` method is called. Of the two methods, `IEquatable<T>.Equals` offers slightly better performance.)

- When the search methods of a number of generic collection objects are called. Some of these types and their methods include the following:

- Some of the generic overloads of the `Array.BinarySearch` method.

- The search methods of the `List<T>` class, including `Contains`, `List<T>.IndexOf`, `List<T>.LastIndexOf`, and `List<T>.Remove`.

- The search methods of the `Dictionary<T1,T2>` class, including `Dictionary<T1,T2>.ContainsKey` and `IDictionary<T1,T2>.Remove`.

- The search methods of the generic `LinkedList<T>` class, including `LinkedList<T>.Contains` and `LinkedList<T>.Remove`.

In other words, to handle the possibility that objects of a class will be stored in an array or a generic collection object, it is a good idea to implement `IEquatable<T>` so that the object can be easily identified and manipulated.

When implementing the `IEquatable<T>.Equals` method, define equality appropriately for the type specified by the generic type argument. For example, if the type argument is `Int32`, define equality appropriately for the comparison of two 32-bit signed integers.

#### Examples
The following example shows the partial implementation of a `Person` class that implements `IEquatable<T>` and has two properties, `LastName` and `NationalId`. `NationalId` is considered to be a unique identifier, therefore the `IEquatable<T>.Equals` method returns `True` if the `NationalId` property of two `Person` objects is identical; otherwise, it returns `False`.
(Note that the F# example does not handle `null` values for `Person` instances.)

_Code sample not included: ~/snippets/csharp/System/IEquatableT/Equals/EqualsExample.cs._

When a `Person` is stored in a `List<T>`, `Contains` uses its `IEquatable<T>.Equals` implementation to search for a match.

_Code sample not included: ~/snippets/csharp/System/IEquatableT/Equals/EqualsExample.cs._
