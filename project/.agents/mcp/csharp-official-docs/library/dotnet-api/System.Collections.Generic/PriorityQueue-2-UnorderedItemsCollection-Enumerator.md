---
title: "PriorityQueue<TElement,TPriority>+UnorderedItemsCollection+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/PriorityQueue`2+UnorderedItemsCollection+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PriorityQueue<TElement,TPriority>+UnorderedItemsCollection+Enumerator struct

Namespace: `System.Collections.Generic`

```csharp
public struct PriorityQueue<TElement,TPriority>.UnorderedItemsCollection.Enumerator : System.Collections.Generic.IEnumerator<(TElement, TPriority)>
```

Enumerates the element and priority pairs of a `PriorityQueue<T1,T2>`, without any ordering guarantees.

To be added.

## PriorityQueue<TElement,TPriority>+UnorderedItemsCollection+Enumerator.Current property

```csharp
public (TElement Element, TPriority Priority) Current { get; }
```

Gets the element at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

To be added.

## PriorityQueue<TElement,TPriority>+UnorderedItemsCollection+Enumerator.System.Collections.Generic.IEnumerator<System.ValueTuple<TElement,TPriority>>.Current property

```csharp
(TElement Element, TPriority Priority) System.Collections.Generic.IEnumerator<System.ValueTuple<TElement,TPriority>>.Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

To be added.

## PriorityQueue<TElement,TPriority>+UnorderedItemsCollection+Enumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Enumerator` instance is cast to an `IEnumerator` interface.

## PriorityQueue<TElement,TPriority>+UnorderedItemsCollection+Enumerator.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `Enumerator`.

To be added.

## PriorityQueue<TElement,TPriority>+UnorderedItemsCollection+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the `PriorityQueue<T1,T2>.UnorderedItems`.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

To be added.

## PriorityQueue<TElement,TPriority>+UnorderedItemsCollection+Enumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Enumerator` instance is cast to an `IEnumerator` interface.
