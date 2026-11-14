---
title: "IGrouping<TKey,TElement> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/IGrouping`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IGrouping<TKey,TElement> interface

Namespace: `System.Linq`

```csharp
public interface IGrouping<out TKey,out TElement> : System.Collections.Generic.IEnumerable<out TElement>
```

Represents a collection of objects that have a common key.

Parameters:

- `TKey`: The type of the key of the `IGrouping<T1,T2>`.
- `TElement`: The type of the values in the `IGrouping<T1,T2>`.

#### Remarks
An `IGrouping<T1,T2>` is an `IEnumerable<T>` that additionally has a key. The key <example-value> the attribute that is common to each value in the `IGrouping<T1,T2>`.

The values of an `IGrouping<T1,T2>` are accessed much as the elements of an `IEnumerable<T>` are accessed. For example, you can access the values by using a `foreach` in Visual C# or `For Each` in Visual Basic loop to iterate through the `IGrouping<T1,T2>` object. The Example section contains a code example that shows you how to access both the key and the values of an `IGrouping<T1,T2>` object.

The `IGrouping<T1,T2>` type is used by the `Enumerable.GroupBy` standard query operator methods, which return a sequence of elements of type `IGrouping<T1,T2>`.

#### Examples
The following example demonstrates how to work with an `IGrouping<T1,T2>` object.

In this example, `GroupBy<T1,T2>` is called on the array of `MemberInfo` objects returned by `Type.GetMembers`. `GroupBy<T1,T2>` groups the objects based on the value of their `MemberType` property. Each unique value for `MemberInfo.MemberType` in the array of `MemberInfo` objects becomes a key for a new `IGrouping<T1,T2>` object, and the `MemberInfo` objects that have that key form the `IGrouping<T1,T2>` object's sequence of values.

Finally, the `Enumerable.First` method is called on the sequence of `IGrouping<T1,T2>` objects to obtain just the first `IGrouping<T1,T2>` object.

The example then outputs the key of the `IGrouping<T1,T2>` object and the `Name` property of each value in the `IGrouping<T1,T2>` object's sequence of values. Notice that to access an `IGrouping<T1,T2>` object's sequence of values, you simply use the `IGrouping<T1,T2>` variable itself.

_Code sample not included: ~/snippets/csharp/System.Linq/IGroupingTKey,TElement/Overview/igrouping.cs._

## IGrouping<TKey,TElement>.Key <example-value>

```csharp
public TKey Key { get; }
```

Gets the key of the `IGrouping<T1,T2>`.

Returns: The key of the `IGrouping<T1,T2>`.

#### Remarks
The key of an `IGrouping<T1,T2>` represents the attribute that is common to each value in the `IGrouping<T1,T2>`.

#### Examples
The following example demonstrates how to use the `Key` property to label each `IGrouping<T1,T2>` object in a sequence of `IGrouping<T1,T2>` objects. The `GroupBy<T1,T2>` method is used to obtain a sequence of `IGrouping<T1,T2>` objects. The `foreach` in Visual C# or `For Each` in Visual Basic loop then iterates through each `IGrouping<T1,T2>` object, outputting its key and the number of values it contains.

_Code sample not included: ~/snippets/csharp/System.Linq/IGroupingTKey,TElement/Overview/igrouping.cs._
