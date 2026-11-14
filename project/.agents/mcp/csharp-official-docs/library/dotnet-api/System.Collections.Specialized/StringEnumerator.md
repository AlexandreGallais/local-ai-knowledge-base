---
title: "StringEnumerator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/StringEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringEnumerator class

Namespace: `System.Collections.Specialized`

```csharp
public class StringEnumerator
```

Supports a simple iteration over a `StringCollection`.

#### Remarks
The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `StringEnumerator.Reset` also brings the enumerator back to this position. At this position, calling `StringEnumerator.Current` throws an exception. Therefore, you must call `StringEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `StringEnumerator.Current`.

`StringEnumerator.Current` returns the same object until either `StringEnumerator.MoveNext` or `StringEnumerator.Reset` is called. `StringEnumerator.MoveNext` sets `StringEnumerator.Current` to the next element.

If `StringEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `StringEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `StringEnumerator.MoveNext` also return `false`. If the last call to `StringEnumerator.MoveNext` returned `false`, calling `StringEnumerator.Current` throws an exception. To set `StringEnumerator.Current` to the first element of the collection again, you can call `StringEnumerator.Reset` followed by `StringEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `StringEnumerator.MoveNext` or `StringEnumerator.Reset` throws an `InvalidOperationException`. If the collection is modified between `StringEnumerator.MoveNext` and `StringEnumerator.Current`, `StringEnumerator.Current` returns the element that it is set to, even if the enumerator is already invalidated.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example demonstrates several of the properties and methods of `StringEnumerator`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringEnumerator/Overview/stringenumerator.cs._

## StringEnumerator.Current property

```csharp
public string? Current { get; }
```

Gets the current element in the collection.

Returns: The current element in the collection.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the collection or after the last element.

#### Remarks
After an enumerator is created or after a `StringEnumerator.Reset` is called, `StringEnumerator.MoveNext` must be called to advance the enumerator to the first element of the collection before reading the value of `StringEnumerator.Current`; otherwise, `StringEnumerator.Current` is undefined.

`StringEnumerator.Current` also throws an exception if the last call to `StringEnumerator.MoveNext` returned `false`, which indicates the end of the collection.

`StringEnumerator.Current` does not move the position of the enumerator, and consecutive calls to `StringEnumerator.Current` return the same object until either `StringEnumerator.MoveNext` or `StringEnumerator.Reset` is called.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`. If the collection is modified between `IEnumerator.MoveNext` and `IEnumerator.Current`, `IEnumerator.Current` returns the element that it is set to, even if the enumerator is already invalidated.

#### Examples
The following code example demonstrates several of the properties and methods of `StringEnumerator`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringEnumerator/Overview/stringenumerator.cs._

## StringEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the collection.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
After an enumerator is created or after a `StringEnumerator.Reset` is called, an enumerator is positioned before the first element of the collection, and the first call to `StringEnumerator.MoveNext` moves the enumerator over the first element of the collection.

If `StringEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `StringEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `StringEnumerator.MoveNext` also return `false` until `StringEnumerator.Reset` is called.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`. If the collection is modified between `IEnumerator.MoveNext` and `IEnumerator.Current`, `IEnumerator.Current` returns the element that it is set to, even if the enumerator is already invalidated.

#### Examples
The following code example demonstrates several of the properties and methods of `StringEnumerator`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringEnumerator/Overview/stringenumerator.cs._

## StringEnumerator.Reset() method

```csharp
public void Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
`StringEnumerator.Reset` moves the enumerator to the beginning of the collection, before the first element. After `StringEnumerator.Reset`, `StringEnumerator.MoveNext` must be called to advance the enumerator to the first element of the collection before reading the value of `StringEnumerator.Current`.

#### Examples
The following code example demonstrates several of the properties and methods of `StringEnumerator`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringEnumerator/Overview/stringenumerator.cs._
