---
title: "IEnumerator<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/IEnumerator`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IEnumerator<T> interface

Namespace: `System.Collections.Generic`

```csharp
public interface IEnumerator<out T> : IDisposable, System.Collections.IEnumerator where T : allows ref struct
```

Supports a simple iteration over a generic collection.

Parameters:

- `T`: The type of objects to enumerate.

#### Remarks
`IEnumerator<T>` is the base interface for all generic enumerators.

The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, `IEnumerator<T>.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.

`IEnumerator<T>.Current` returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator<T>.Current` is undefined. You cannot set `IEnumerator<T>.Current` to the first element of the collection again; you must create a new enumerator instance instead.

The `IEnumerator.Reset` method is provided for COM interoperability. It does not necessarily need to be implemented; instead, the implementer can simply throw a `NotSupportedException`. However, if you choose to do this, you should make sure no callers are relying on the `IEnumerator.Reset` functionality.

If changes are made to the collection, such as adding, modifying, or deleting elements, the behavior of the enumerator is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration. To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

#### Examples
The following example shows an implementation of the `IEnumerator<T>` interface for a collection class of custom objects. The custom object is an instance of the type `Box`, and the collection class is `BoxCollection`. This code example is part of a larger example provided for the `ICollection<T>` interface.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ICollectionT/Overview/program.cs._

## IEnumerator<T>.Current property

```csharp
public T Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

#### Remarks
`IEnumerator<T>.Current` is undefined under any of the following conditions:

- The enumerator is positioned before the first element in the collection, immediately after the enumerator is created.   `IEnumerator.MoveNext` must be called to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.

- The last call to `IEnumerator.MoveNext` returned `false`, which indicates the end of the collection.

- The enumerator is invalidated due to changes made in the collection, such as adding, modifying, or deleting elements.

`IEnumerator<T>.Current` returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.
