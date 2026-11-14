---
title: "IStructuralEquatable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/IStructuralEquatable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IStructuralEquatable interface

Namespace: `System.Collections`

```csharp
public interface IStructuralEquatable
```

Defines methods to support the comparison of objects for structural equality.

#### Remarks
Structural equality means that two objects are equal because they have equal values. It differs from reference equality, which indicates that two object references are equal because they reference the same physical object. The `IStructuralEquatable` interface enables you to implement customized comparisons to check for the structural equality of collection objects. That is, you can create your own definition of structural equality and specify that this definition be used with a collection type that accepts the `IStructuralEquatable` interface. The interface has two members: `IStructuralEquatable.Equals`, which tests for equality by using a specified `IEqualityComparer` implementation, and `IStructuralEquatable.GetHashCode`, which returns identical hash codes for objects that are equal.

> **Note:**
>  The `IStructuralEquatable` interface supports only custom comparisons for structural equality. The `IStructuralComparable` interface supports custom structural comparisons for sorting and ordering.

.NET also provides default equality comparers, which are returned by the `EqualityComparer<T>.Default` and `StructuralComparisons.StructuralEqualityComparer` properties. For more information, see the example.

The generic tuple classes (`Tuple<T>`, `Tuple<T1,T2>`, `Tuple<T1,T2,T3>`, and so on) and the `Array` class provide explicit implementations of the `IStructuralEquatable` interface. By casting (in C#) or converting (in Visual Basic) the current instance of an array or tuple to an `IStructuralEquatable` interface value and providing your `IEqualityComparer` implementation as an argument to the `IStructuralEquatable.Equals` method, you can define a custom equality comparison for the array or collection.

#### Examples

The default equality comparer, `EqualityComparer<Object>.Default.Equals`, considers two `NaN` values to be equal. However, in some cases, you may want the comparison of `NaN` values for equality to return `false`, which indicates that the values cannot be compared. The following example defines a `NanComparer` class that implements the `IEqualityComparer` interface. It is used by the third example as an argument to the `Equals` method of the `IStructuralEquatable` interface that tuples implement. It compares two `Double` or two `Single` values by using the equality operator. It passes values of any other type to the default equality comparer.

_Code sample not included: ~/snippets/csharp/System.Collections/IStructuralEquatable/Overview/nanexample1.cs._

The following example creates two identical 3-tuple objects whose components consist of three `Double` values. The value of the second component is `NaN`. The example then calls the `Tuple<T1,T2,T3>.Equals` method, and it calls the `IStructuralEquatable.Equals` method three times. The first time, it passes the default equality comparer that is returned by the `Default` property. The second time, it passes the default equality comparer that is returned by the `StructuralEqualityComparer` property. The third time, it passes the custom `NanComparer` object. As the output from the example shows, the first three method calls return `true`, whereas the fourth call returns `false`.

_Code sample not included: ~/snippets/csharp/System.Collections/IStructuralEquatable/Overview/nanexample1.cs._

## IStructuralEquatable.Equals(Object, IEqualityComparer) method

```csharp
public bool Equals (object? other, System.Collections.IEqualityComparer comparer);
```

Determines whether an object is structurally equal to the current instance.

Parameters:

- `other`: The object to compare with the current instance.
- `comparer`: An object that determines whether the current instance and `other` are equal.

Returns: `true` if the two objects are equal; otherwise, `false`.

#### Remarks
The `IStructuralEquatable.Equals` method supports custom structural comparison of array and tuple objects. This method in turn calls the `comparer` object's `IEqualityComparer.Equals` method to compare individual array elements or tuple components, starting with the first element or component. The individual calls to `IEqualityComparer.Equals` end and the `IStructuralEquatable.Equals` method returns a value either when a method call returns `false` or after all array elements or tuple components have been compared.

#### Examples
The default equality comparer, `EqualityComparer<Object>.Default.Equals`, considers two `NaN` values to be equal. However, in some cases, you may want the comparison of `NaN` values for equality to return `false`, which indicates that the values cannot be compared. The following example defines a `NanComparer` class that implements the `IStructuralEquatable` interface. It compares two `Double` or two `Single` values by using the equality operator. It passes values of any other type to the default equality comparer.

_Code sample not included: ~/snippets/csharp/System.Collections/IStructuralEquatable/Overview/nanexample1.cs._

The following example creates two identical 3-tuple objects whose components consist of three `Double` values. The value of the second component is `NaN`. The example then calls the `Tuple<T1,T2,T3>.Equals` method, and it calls the `IStructuralEquatable.Equals` method three times. The first time, it passes the default equality comparer that is returned by the `Default` property. The second time, it passes the default equality comparer that is returned by the `StructuralEqualityComparer` property. The third time, it passes the custom `NanComparer` object. As the output from the example shows, the first three method calls return `true`, whereas the fourth call returns `false`.

_Code sample not included: ~/snippets/csharp/System.Collections/IStructuralEquatable/Overview/nanexample1.cs._

## IStructuralEquatable.GetHashCode(IEqualityComparer) method

```csharp
public int GetHashCode (System.Collections.IEqualityComparer comparer);
```

Returns a hash code for the current instance.

Parameters:

- `comparer`: An object that computes the hash code of the current object.

Returns: The hash code for the current instance.

#### Remarks
Implement this method to return customized hash codes for collection objects that correspond to the customized comparison for structural equality provided by the `IStructuralEquatable.Equals` method.
