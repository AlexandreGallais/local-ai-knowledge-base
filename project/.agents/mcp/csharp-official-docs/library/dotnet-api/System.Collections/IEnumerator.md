---
title: "IEnumerator interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/IEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IEnumerator interface

Namespace: `System.Collections`

```csharp
public interface IEnumerator
```

Supports a simple iteration over a non-generic collection.

#### Remarks
`IEnumerator` is the base interface for all non-generic enumerators. Its generic equivalent is the `IEnumerator<T>` interface.

The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

The `IEnumerator.Reset` method is provided for COM interoperability and does not need to be fully implemented; instead, the implementer can throw a `NotSupportedException`.

Initially, the enumerator is positioned before the first element in the collection. You must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`; otherwise, `IEnumerator.Current` is undefined.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined.

To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset`, if it's implemented, followed by `IEnumerator.MoveNext`. If `IEnumerator.Reset` is not implemented, you must create a new enumerator instance to return to the first element of the collection.

If changes are made to the collection, such as adding, modifying, or deleting elements, the behavior of the enumerator is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example demonstrates the implementation of the `IEnumerable` and `IEnumerator` interfaces for a custom collection. In this example, members of these interfaces are not explicitly called, but they are implemented to support the use of `foreach` (`for each` in Visual Basic) to iterate through the collection.

_Code sample not included: ~/snippets/csharp/System.Collections/IEnumerable/Overview/ienumerator.cs._

## IEnumerator.Current property

```csharp
public object Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

#### Remarks
`IEnumerator.Current` is undefined under any of the following conditions:

- The enumerator is positioned before the first element in the collection, immediately after the enumerator is created.   `IEnumerator.MoveNext` must be called to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

- The last call to `IEnumerator.MoveNext` returned `false`, which indicates the end of the collection.

- The enumerator is invalidated due to changes made in the collection, such as adding, modifying, or deleting elements.

`IEnumerator.Current` returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

#### Examples
The following code example demonstrates the implementation of the `IEnumerator` interfaces for a custom collection. In this example, `IEnumerator.Current` is not explicitly called, but it is implemented to support the use of `foreach` (`for each` in Visual Basic). This code example is part of a larger example for the `IEnumerator` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IEnumerable/Overview/ienumerator.cs._

## IEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the collection.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
After an enumerator is created or after the `IEnumerator.Reset` method is called, an enumerator is positioned before the first element of the collection, and the first call to the `IEnumerator.MoveNext` method moves the enumerator over the first element of the collection.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false` until `IEnumerator.Reset` is called.

If changes are made to the collection, such as adding, modifying, or deleting elements, the behavior of `IEnumerator.MoveNext` is undefined.

#### Examples
The following code example demonstrates the implementation of the `IEnumerator` interfaces for a custom collection. In this example, `IEnumerator.MoveNext` is not explicitly called, but it is implemented to support the use of `foreach` (`for each` in Visual Basic). This code example is part of a larger example for the `IEnumerator` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IEnumerable/Overview/ienumerator.cs._

## IEnumerator.Reset() method

```csharp
public void Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.
- `NotSupportedException`: The enumerator does not support being reset.

#### Remarks
If changes are made to the collection, such as adding, modifying, or deleting elements, the behavior of `IEnumerator.Reset` is undefined.

The `IEnumerator.Reset` method is provided for COM interoperability. It does not necessarily need to be implemented; instead, the implementer can simply throw a `NotSupportedException`.

#### Examples
The following code example demonstrates the implementation of the `IEnumerator` interfaces for a custom collection. In this example, `IEnumerator.Reset` is not explicitly called, but it is implemented to support the use of `foreach` (`for each` in Visual Basic). This code example is part of a larger example for the `IEnumerator` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IEnumerable/Overview/ienumerator.cs._
