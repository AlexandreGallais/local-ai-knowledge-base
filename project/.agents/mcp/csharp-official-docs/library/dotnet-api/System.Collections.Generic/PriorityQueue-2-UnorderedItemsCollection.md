---
title: "PriorityQueue<TElement,TPriority>+UnorderedItemsCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/PriorityQueue`2+UnorderedItemsCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PriorityQueue<TElement,TPriority>+UnorderedItemsCollection class

Namespace: `System.Collections.Generic`

```csharp
public sealed class PriorityQueue<TElement,TPriority>.UnorderedItemsCollection : System.Collections.Generic.IEnumerable<(TElement, TPriority)>, System.Collections.Generic.IReadOnlyCollection<(TElement, TPriority)>, System.Collections.ICollection
```

Enumerates the contents of a `PriorityQueue<T1,T2>`, without any ordering guarantees.

To be added.

## PriorityQueue<TElement,TPriority>+UnorderedItemsCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of elements in the collection.

Returns: The number of elements in the collection.

To be added.

## PriorityQueue<TElement,TPriority>+UnorderedItemsCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `UnorderedItemsCollection` instance is cast to an `ICollection` interface.

## PriorityQueue<TElement,TPriority>+UnorderedItemsCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `UnorderedItemsCollection` instance is cast to an `ICollection` interface.

## PriorityQueue<TElement,TPriority>+UnorderedItemsCollection.GetEnumerator() method

```csharp
public System.Collections.Generic.PriorityQueue<TElement,TPriority>.UnorderedItemsCollection.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `PriorityQueue<T1,T2>.UnorderedItems`.

Returns: An `Enumerator` for the `PriorityQueue<T1,T2>.UnorderedItems`.

To be added.

## PriorityQueue<TElement,TPriority>+UnorderedItemsCollection.System.Collections.Generic.IEnumerable<System.ValueTuple<TElement,TPriority>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<(TElement Element, TPriority Priority)> IEnumerable<(TElement, TPriority)>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## PriorityQueue<TElement,TPriority>+UnorderedItemsCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

To be added.

## PriorityQueue<TElement,TPriority>+UnorderedItemsCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `UnorderedItemsCollection` instance is cast to an `IEnumerable` interface.
