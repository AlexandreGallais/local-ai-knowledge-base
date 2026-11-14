---
title: "SortedSet<T>+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedSet`1+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedSet<T>+Enumerator struct

Namespace: `System.Collections.Generic`

```csharp
public struct SortedSet<T>.Enumerator : System.Collections.Generic.IEnumerator<T>, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Enumerates the elements of a `SortedSet<T>` object.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, the `Current` property is undefined. Therefore, you must call the `Enumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `Enumerator.Current`.

`Enumerator.Current` returns the same object until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Enumerator.Current` to the next element.

If `Enumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `Enumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `Enumerator.MoveNext` also return `false`. If the last call to `Enumerator.MoveNext` returned `false`, `Enumerator.Current` is undefined. You cannot set `Enumerator.Current` to the first element of the collection again; you must create a new enumerator object instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The enumerator doesn't have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

## SortedSet<T>+Enumerator.Current property

```csharp
public T Current { get; }
```

Gets the element at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

#### Remarks

`Enumerator.Current` is undefined under any of the following conditions:

- The enumerator is positioned before the first element of the collection. That happens after an enumerator is created or after the `Enumerator.System%23Collections%23IEnumerator%23Reset` method is called. The `Enumerator.MoveNext` method must be called to advance the enumerator to the first element of the collection before reading the value of the `Current` property.

- The last call to `Enumerator.MoveNext` returned `false`, which indicates the end of the collection and that the enumerator is positioned after the last element of the collection.

- The enumerator is invalidated due to changes made in the collection, such as adding, modifying, or deleting elements.

`Enumerator.Current` does not move the position of the enumerator, and consecutive calls to `Enumerator.Current` return the same object until either `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` is called.

## SortedSet<T>+Enumerator.System.Collections.IEnumerator.Current property

```csharp
object? System.Collections.IEnumerator.Current { get; }
```

Gets the element at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the collection or after the last element.

#### Remarks

`Enumerator.System%23Collections%23IEnumerator%23Current` is undefined under any of the following conditions:

- The enumerator is positioned before the first element of the collection. That happens after an enumerator is created or after the `Enumerator.System%23Collections%23IEnumerator%23Reset` method is called. The `Enumerator.MoveNext` method must be called to advance the enumerator to the first element of the collection before reading the value of the `System%23Collections%23IEnumerator%23Current` property.

- The last call to `Enumerator.MoveNext` returned `false`, which indicates the end of the collection and that the enumerator is positioned after the last element of the collection.

- The enumerator is invalidated due to changes made in the collection, such as adding, modifying, or deleting elements.

`Enumerator.System%23Collections%23IEnumerator%23Current` does not move the position of the enumerator, and consecutive calls to `Enumerator.System%23Collections%23IEnumerator%23Current` return the same object until either `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` is called.

## SortedSet<T>+Enumerator.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `Enumerator`.

To be added.

## SortedSet<T>+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the `SortedSet<T>` collection.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
After an enumerator is created, the enumerator is positioned before the first element in the collection, and the first call to the `Enumerator.MoveNext` method advances the enumerator to the first element of the collection.

If `Enumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `Enumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `Enumerator.MoveNext` also return `false`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

## SortedSet<T>+Enumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

## SortedSet<T>+Enumerator.System.Runtime.Serialization.IDeserializationCallback.OnDeserialization(Object) method

```csharp
void IDeserializationCallback.OnDeserialization (object sender);
```

Implements the `ISerializable` interface and raises the deserialization event when the deserialization is complete.

Parameters:

- `sender`: The source of the deserialization event.

Exceptions:

- `SerializationException`: The `SerializationInfo` object associated with the current `SortedSet<T>` instance is invalid.

To be added.

## SortedSet<T>+Enumerator.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Implements the `ISerializable` interface and returns the data needed to serialize the `SortedSet<T>` instance.

Parameters:

- `info`: A `SerializationInfo` object that contains the information required to serialize the `SortedSet<T>` instance.
- `context`: A `StreamingContext` object that contains the source and destination of the serialized stream associated with the `SortedSet<T>` instance.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.
