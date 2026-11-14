---
title: "IImmutableQueue<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/IImmutableQueue`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IImmutableQueue<T> interface

Namespace: `System.Collections.Immutable`

```csharp
public interface IImmutableQueue<T> : System.Collections.Generic.IEnumerable<T>
```

Represents an immutable first-in, first-out collection of objects.

Parameters:

- `T`: The type of elements in the queue.

#### Remarks
Because `IImmutableQueue<T>` is immutable, when you change `IImmutableQueue<T>` using methods such as `IImmutableQueue<T>.Dequeue` or `IImmutableQueue<T>.Enqueue`,  a new queue will be returned with the changes applied and the original queue remains unchanged.

## IImmutableQueue<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether this immutable queue is empty.

Returns: `true` if this queue is empty; otherwise, `false`.

To be added.

## IImmutableQueue<T>.Clear() method

```csharp
public System.Collections.Immutable.IImmutableQueue<T> Clear ();
```

Returns a new queue with all the elements removed.

Returns: An empty immutable queue.

To be added.

## IImmutableQueue<T>.Dequeue() method

```csharp
public System.Collections.Immutable.IImmutableQueue<T> Dequeue ();
```

Removes the first element in the immutable queue, and returns the new queue.

Returns: The new immutable queue with the first element removed. This value is never `null`.

Exceptions:

- `InvalidOperationException`: The queue is empty.

To be added.

## IImmutableQueue<T>.Enqueue(T) method

```csharp
public System.Collections.Immutable.IImmutableQueue<T> Enqueue (T value);
```

Adds an element to the end of the immutable queue, and returns the new queue.

Parameters:

- `value`: The element to add.

Returns: The new immutable queue with the specified element added.

To be added.

## IImmutableQueue<T>.Peek() method

```csharp
public T Peek ();
```

Returns the element at the beginning of the immutable queue without removing it.

Returns: The element at the beginning of the queue.

Exceptions:

- `InvalidOperationException`: The queue is empty.

To be added.
