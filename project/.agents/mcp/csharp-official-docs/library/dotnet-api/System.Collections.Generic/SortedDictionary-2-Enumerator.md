---
title: "SortedDictionary<TKey,TValue>+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedDictionary`2+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedDictionary<TKey,TValue>+Enumerator struct

Namespace: `System.Collections.Generic`

```csharp
public struct SortedDictionary<TKey,TValue>.Enumerator : System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.IDictionaryEnumerator
```

Enumerates the elements of a `SortedDictionary<T1,T2>`.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, `Enumerator.Current` is undefined. You must call the `Enumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `Enumerator.Current`.

The `Current` property returns the same object until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Enumerator.Current` to the next element.

If `Enumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `Enumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `Enumerator.MoveNext` also return `false`. If the last call to `Enumerator.MoveNext` returned `false`, `Enumerator.Current` is undefined. You cannot set `Enumerator.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

## SortedDictionary<TKey,TValue>+Enumerator.Current property

```csharp
public System.Collections.Generic.KeyValuePair<TKey,TValue> Current { get; }
```

Gets the element at the current position of the enumerator.

Returns: The element in the `SortedDictionary<T1,T2>` at the current position of the enumerator.

#### Remarks
`Enumerator.Current` is undefined under any of the following conditions:

- The enumerator is positioned before the first element of the collection. That happens after an enumerator is created or after the `Enumerator.System%23Collections%23IEnumerator%23Reset` method is called. The `Enumerator.MoveNext` method must be called to advance the enumerator to the first element of the collection before reading the value of the `Current` property.

- The last call to `Enumerator.MoveNext` returned `false`, which indicates the end of the collection and that the enumerator is positioned after the last element of the collection.

- The enumerator is invalidated due to changes made in the collection, such as adding, modifying, or deleting elements.

`Enumerator.Current` does not move the position of the enumerator, and consecutive calls to `Enumerator.Current` return the same object until either `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` is called.

## SortedDictionary<TKey,TValue>+Enumerator.System.Collections.IDictionaryEnumerator.Entry property

```csharp
System.Collections.DictionaryEntry System.Collections.IDictionaryEnumerator.Entry { get; }
```

Gets the element at the current position of the enumerator as a `DictionaryEntry` structure.

Returns: The element in the collection at the current position of the dictionary, as a `DictionaryEntry` structure.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the collection or after the last element.

#### Remarks

`Enumerator.System%23Collections%23IDictionaryEnumerator%23Entry` is undefined under any of the following conditions:

- The enumerator is positioned before the first element of the collection. That happens after an enumerator is created or after the `Enumerator.System%23Collections%23IEnumerator%23Reset` method is called. The `Enumerator.MoveNext` method must be called to advance the enumerator to the first element of the collection before reading the value of the `System%23Collections%23IDictionaryEnumerator%23Entry` property.

- The last call to `Enumerator.MoveNext` returned `false`, which indicates the end of the collection and that the enumerator is positioned after the last element of the collection.

- The enumerator is invalidated due to changes made in the collection, such as adding, modifying, or deleting elements.

`Enumerator.System%23Collections%23IDictionaryEnumerator%23Entry` does not move the position of the enumerator, and consecutive calls to `Enumerator.System%23Collections%23IDictionaryEnumerator%23Entry` return the same object until either `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` is called.

## SortedDictionary<TKey,TValue>+Enumerator.System.Collections.IDictionaryEnumerator.Key <example-value>

```csharp
object System.Collections.IDictionaryEnumerator.Key { get; }
```

Gets the key of the element at the current position of the enumerator.

Returns: The key of the element in the collection at the current position of the enumerator.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the collection or after the last element.

#### Remarks
`Enumerator.System%23Collections%23IDictionaryEnumerator%23Key` is undefined under any of the following conditions:

- The enumerator is positioned before the first element of the collection. That happens after an enumerator is created or after the `Enumerator.System%23Collections%23IEnumerator%23Reset` method is called. The `Enumerator.MoveNext` method must be called to advance the enumerator to the first element of the collection before reading the value of the `System%23Collections%23IDictionaryEnumerator%23Key` property.

- The last call to `Enumerator.MoveNext` returned `false`, which indicates the end of the collection and that the enumerator is positioned after the last element of the collection.

- The enumerator is invalidated due to changes made in the collection, such as adding, modifying, or deleting elements.

`Enumerator.System%23Collections%23IDictionaryEnumerator%23Key` does not move the position of the enumerator, and consecutive calls to `Enumerator.System%23Collections%23IDictionaryEnumerator%23Key` return the same object until either `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` is called.

## SortedDictionary<TKey,TValue>+Enumerator.System.Collections.IDictionaryEnumerator.Value property

```csharp
object? System.Collections.IDictionaryEnumerator.Value { get; }
```

Gets the value of the element at the current position of the enumerator.

Returns: The value of the element in the collection at the current position of the enumerator.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the collection or after the last element.

#### Remarks
`Enumerator.System%23Collections%23IDictionaryEnumerator%23Value` is undefined under any of the following conditions:

- The enumerator is positioned before the first element of the collection. That happens after an enumerator is created or after the `Enumerator.System%23Collections%23IEnumerator%23Reset` method is called. The `Enumerator.MoveNext` method must be called to advance the enumerator to the first element of the collection before reading the value of the `System%23Collections%23IDictionaryEnumerator%23Value` property.

- The last call to `Enumerator.MoveNext` returned `false`, which indicates the end of the collection and that the enumerator is positioned after the last element of the collection.

- The enumerator is invalidated due to changes made in the collection, such as adding, modifying, or deleting elements.

`Enumerator.System%23Collections%23IDictionaryEnumerator%23Value` does not move the position of the enumerator, and consecutive calls to `Enumerator.System%23Collections%23IDictionaryEnumerator%23Value` return the same object until either `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` is called.

## SortedDictionary<TKey,TValue>+Enumerator.System.Collections.IEnumerator.Current property

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

## SortedDictionary<TKey,TValue>+Enumerator.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `Enumerator`.

To be added.

## SortedDictionary<TKey,TValue>+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the `SortedDictionary<T1,T2>`.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
After an enumerator is created, the enumerator is positioned before the first element in the collection, and the first call to the `Enumerator.MoveNext` method advances the enumerator to the first element of the collection.

If `Enumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `Enumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `Enumerator.MoveNext` also return `false`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

## SortedDictionary<TKey,TValue>+Enumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
After calling the `Enumerator.System%23Collections%23IEnumerator%23Reset` method, you must call the `Enumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of the `Current` property.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.
