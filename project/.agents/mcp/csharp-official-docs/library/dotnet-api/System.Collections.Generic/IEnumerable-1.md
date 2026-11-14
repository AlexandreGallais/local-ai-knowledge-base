---
title: "IEnumerable<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/IEnumerable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IEnumerable<T> interface

Namespace: `System.Collections.Generic`

```csharp
public interface IEnumerable<out T> : System.Collections.IEnumerable where T : allows ref struct
```

Exposes the enumerator, which supports a simple iteration over a collection of a specified type.

Parameters:

- `T`: The type of objects to enumerate.

#### Remarks
`IEnumerable<T>` is the base interface for collections in the `Generic` namespace such as `List<T>`, `Dictionary<T1,T2>`, and `Stack<T>` and other generic collections such as `ObservableCollection<T>` and `ConcurrentStack<T>`. Collections that implement `IEnumerable<T>` can be enumerated by using the `foreach` statement.

For the non-generic version of this interface, see `IEnumerable`.

`IEnumerable<T>` contains a single method that you must implement when implementing this interface; `IEnumerable<T>.GetEnumerator`, which returns an `IEnumerator<T>` object. The returned `IEnumerator<T>` provides the ability to iterate through the collection by exposing a `Current` property.

#### Examples
The following example demonstrates how to implement the `IEnumerable<T>` interface and how to use that implementation to create a LINQ query. When you implement `IEnumerable<T>`, you must also implement `IEnumerator<T>` or, for C# only, you can use the yield keyword. Implementing `IEnumerator<T>` also requires `IDisposable` to be implemented, which you will see in this example.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IEnumerableT/Overview/program.cs._

## IEnumerable<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<out T> GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks
The returned `IEnumerator<T>` provides the ability to iterate through the collection by exposing a `Current` property. You can use enumerators to read the data in a collection, but not to modify the collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, `IEnumerator<T>.Current` is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.

`IEnumerator<T>.Current` returns the same object until `IEnumerator.MoveNext` is called again as `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator<T>.Current` is undefined. You cannot set `IEnumerator<T>.Current` to the first element of the collection again; you must create a new enumerator instance instead.

If changes are made to the collection, such as adding, modifying, or deleting elements, the behavior of the enumerator is undefined.

An enumerator does not have exclusive access to the collection so an enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is invalidated and you may get unexpected results. Also, enumerating a collection is not a thread-safe procedure. To guarantee thread-safety, you should lock the collection during enumerator or implement synchronization on the collection.

Default implementations of collections in the `Generic` namespace aren't synchronized.

#### Examples
The following example demonstrates how to implement the `IEnumerable<T>` interface and uses that implementation to create a LINQ query. When you implement `IEnumerable<T>`, you must also implement `IEnumerator<T>` or, for C# only, you can use the yield keyword. Implementing `IEnumerator<T>` also requires `IDisposable` to be implemented, which you will see in this example.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/IEnumerableT/Overview/program.cs._
