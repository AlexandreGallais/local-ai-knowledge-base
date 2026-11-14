---
title: "ImmutableQueue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableQueue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableQueue class

Namespace: `System.Collections.Immutable`

```csharp
public static class ImmutableQueue
```

Provides a set of initialization methods for instances of the `ImmutableQueue<T>` class.

#### Remarks
`Queue`

## ImmutableQueue.Create<T>() method

```csharp
public static System.Collections.Immutable.ImmutableQueue<T> Create<T> ();
```

Creates an empty immutable queue.

Parameters:

- `T`: The type of items to be stored in the immutable queue.

Returns: An empty immutable queue.

To be added.

## ImmutableQueue.Create<T>(ReadOnlySpan<T>) method

```csharp
public static System.Collections.Immutable.ImmutableQueue<T> Create<T> (scoped ReadOnlySpan<T> items);
```

Creates a new immutable queue that contains the specified array of items.

Parameters:

- `T`: The type of items in the immutable queue.
- `items`: A span that contains the items to prepopulate the queue with.

Returns: A new immutable queue that contains the specified items.

To be added.

## ImmutableQueue.Create<T>(T) method

```csharp
public static System.Collections.Immutable.ImmutableQueue<T> Create<T> (T item);
```

Creates a new immutable queue that contains the specified item.

Parameters:

- `T`: The type of items in the immutable queue.
- `item`: The item to prepopulate the queue with.

Returns: A new immutable queue that contains the specified item.

To be added.

## ImmutableQueue.Create<T>(T[]) method

```csharp
public static System.Collections.Immutable.ImmutableQueue<T> Create<T> (params T[] items);
```

Creates a new immutable queue that contains the specified array of items.

Parameters:

- `T`: The type of items in the immutable queue.
- `items`: An array that contains the items to prepopulate the queue with.

Returns: A new immutable queue that contains the specified items.

To be added.

## ImmutableQueue.CreateRange<T>(IEnumerable<T>) method

```csharp
public static System.Collections.Immutable.ImmutableQueue<T> CreateRange<T> (System.Collections.Generic.IEnumerable<T> items);
```

Creates a new immutable queue that contains the specified items.

Parameters:

- `T`: The type of elements in the queue.
- `items`: The items to add to the queue before immutability is applied.

Returns: An immutable queue that contains the specified items.

To be added.

## ImmutableQueue.Dequeue<T>(IImmutableQueue<T>, T) method

```csharp
public static System.Collections.Immutable.IImmutableQueue<T> Dequeue<T> (this System.Collections.Immutable.IImmutableQueue<T> queue, out T value);
```

Removes the item at the beginning of the immutable queue, and returns the new queue.

Parameters:

- `T`: The type of elements in the immutable queue.
- `queue`: The queue to remove the item from.
- `value`: When this method returns, contains the item from the beginning of the queue.

Returns: The new queue with the item removed.

Exceptions:

- `InvalidOperationException`: The stack is empty.

To be added.
