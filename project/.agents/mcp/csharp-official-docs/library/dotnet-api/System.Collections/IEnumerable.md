---
title: "IEnumerable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/IEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IEnumerable interface

Namespace: `System.Collections`

```csharp
public interface IEnumerable
```

Exposes an enumerator, which supports a simple iteration over a non-generic collection.

#### Remarks
`IEnumerable` is the base interface for all non-generic collections that can be enumerated. For the generic version of this interface see `IEnumerable<T>`. `IEnumerable` contains a single method, `IEnumerable.GetEnumerator`, which returns an `IEnumerator`. `IEnumerator` provides the ability to iterate through the collection by exposing a `Current` property and `IEnumerator.MoveNext` and `IEnumerator.Reset` methods.

It is a best practice to implement `IEnumerable` and `IEnumerator` on your collection classes to enable the `foreach` (`For Each` in Visual Basic) syntax, however implementing `IEnumerable` is not required. If your collection does not implement `IEnumerable`, you must still follow the iterator pattern to support this syntax by providing a `GetEnumerator` method that returns an interface, class or struct. When using Visual Basic, you must provide an `IEnumerator` implementation, which is returned by `GetEnumerator`. When developing with C# you must provide a class that contains a `Current` property, and `MoveNext` and `Reset` methods as described by `IEnumerator`, but the class does not have to implement `IEnumerator`.

#### Examples
The following code example demonstrates the best practice for iterating a custom collection by implementing the `IEnumerable` and `IEnumerator` interfaces. In this example, members of these interfaces are not explicitly called, but they are implemented to support the use of `foreach` (`For Each` in Visual Basic) to iterate through the collection. This example is a complete Console app. To compile the Visual Basic app, change the **Startup object** to **Sub Main** in the project's **Properties** page.

_Code sample not included: ~/snippets/csharp/System.Collections/IEnumerable/Overview/ienumerator.cs._

## IEnumerable.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. The `IEnumerator.Reset` method also brings the enumerator back to this position.  At this position, the `Current` property is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returns `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

If changes are made to the collection, such as adding, modifying, or deleting elements, the behavior of the enumerator is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

#### Examples
The following code example demonstrates the implementation of the `IEnumerable` interfaces for a custom collection. In this example, `IEnumerable.GetEnumerator` is not explicitly called, but it is implemented to support the use of `foreach` (`For Each` in Visual Basic). This code example is part of a larger example for the `IEnumerable` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IEnumerable/Overview/ienumerator.cs._
