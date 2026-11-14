---
title: "ImmutableQueue<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableQueue`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableQueue<T> class

Namespace: `System.Collections.Immutable`

```csharp
public sealed class ImmutableQueue<T> : System.Collections.Generic.IEnumerable<T>, System.Collections.Immutable.IImmutableQueue<T>
```

Represents an immutable queue.

Parameters:

- `T`: The type of elements in the queue.

To be added.

## ImmutableQueue<T>.Empty property

```csharp
public static System.Collections.Immutable.ImmutableQueue<T> Empty { get; }
```

Gets an empty immutable queue.

Returns: An empty immutable queue.

To be added.

## ImmutableQueue<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether this immutable queue is empty.

Returns: `true` if this queue is empty; otherwise, `false`.

To be added.

## ImmutableQueue<T>.Clear() method

```csharp
public System.Collections.Immutable.ImmutableQueue<T> Clear ();
```

Removes all objects from the immutable queue.

Returns: The empty immutable queue.

To be added.

## ImmutableQueue<T>.Dequeue() method

```csharp
public System.Collections.Immutable.ImmutableQueue<T> Dequeue ();
```

Removes the element at the beginning of the immutable queue, and returns the new queue.

Returns: The new immutable queue; never `null`.

Exceptions:

- `InvalidOperationException`: The queue is empty.

To be added.

## ImmutableQueue<T>.Dequeue(T) method

```csharp
public System.Collections.Immutable.ImmutableQueue<T> Dequeue (out T value);
```

Removes the item at the beginning of the immutable queue, and returns the new queue.

Parameters:

- `value`: When this method returns, contains the element from the beginning of the queue.

Returns: The new immutable queue with the beginning element removed.

Exceptions:

- `InvalidOperationException`: The queue is empty.

To be added.

## ImmutableQueue<T>.Enqueue(T) method

```csharp
public System.Collections.Immutable.ImmutableQueue<T> Enqueue (T value);
```

Adds an element to the end of the immutable queue, and returns the new queue.

Parameters:

- `value`: The element to add.

Returns: The new immutable queue.

To be added.

## ImmutableQueue<T>.GetEnumerator() method

```csharp
public System.Collections.Immutable.ImmutableQueue<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the immutable queue.

Returns: An enumerator that can be used to iterate through the queue.

To be added.

## ImmutableQueue<T>.Peek() method

```csharp
public T Peek ();
```

Returns the element at the beginning of the immutable queue without removing it.

Returns: The element at the beginning of the queue.

Exceptions:

- `InvalidOperationException`: The queue is empty.

To be added.

## ImmutableQueue<T>.PeekRef() method

```csharp
public ref readonly T PeekRef ();
```

Gets a read-only reference to the element at the front of the queue.

Returns: Read-only reference to the element at the front of the queue.

Exceptions:

- `InvalidOperationException`: The queue is empty.

To be added.

## ImmutableQueue<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator  that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableQueue<T>` instance is cast to an `IEnumerable<T>` interface.

## ImmutableQueue<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableQueue<T>` instance is cast to an `IEnumerable` interface.

## ImmutableQueue<T>.System.Collections.Immutable.IImmutableQueue<T>.Clear() method

```csharp
System.Collections.Immutable.IImmutableQueue<T> IImmutableQueue<T>.Clear ();
```

Removes all elements from the immutable queue.

Returns: The empty immutable queue.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableQueue<T>` instance is cast to an `IImmutableQueue<T>` interface.

## ImmutableQueue<T>.System.Collections.Immutable.IImmutableQueue<T>.Dequeue() method

```csharp
System.Collections.Immutable.IImmutableQueue<T> IImmutableQueue<T>.Dequeue ();
```

Removes the element at the beginning of the immutable queue, and returns the new queue.

Returns: The new immutable queue; never `null`.

Exceptions:

- `InvalidOperationException`: The queue is empty.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableQueue<T>` instance is cast to an `IImmutableQueue<T>` interface.

## ImmutableQueue<T>.System.Collections.Immutable.IImmutableQueue<T>.Enqueue(T) method

```csharp
System.Collections.Immutable.IImmutableQueue<T> IImmutableQueue<T>.Enqueue (T value);
```

Adds an element to the end of the immutable queue, and returns the new queue.

Parameters:

- `value`: The element to add.

Returns: The new immutable queue.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableQueue<T>` instance is cast to an `IImmutableQueue<T>` interface.
