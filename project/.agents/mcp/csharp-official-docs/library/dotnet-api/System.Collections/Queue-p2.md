---
title: "Queue class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/Queue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queue class (part 2 of 2)

## Queue.Enqueue(Object) method

```csharp
public virtual void Enqueue (object? obj);
```

Adds an object to the end of the `Queue`.

Parameters:

- `obj`: The object to add to the `Queue`. The value can be `null`.

#### Remarks
The capacity of a `Queue` is the number of elements the `Queue` can hold.  As elements are added to a `Queue`, the capacity is automatically increased as required through reallocation.  The capacity can be decreased by calling `Queue.TrimToSize`.

The growth factor is the number by which the current capacity is multiplied when a greater capacity is required.  The growth factor is determined when the `Queue` is constructed. The capacity of the `Queue` will always increase by a minimum value, regardless of the growth factor; a growth factor of 1.0 will not prevent the `Queue` from increasing in size.

If `Queue.Count` is less than the capacity of the internal array, this method is an `O(1)` operation. If the internal array needs to be reallocated to accommodate the new element, this method becomes an `O(n)` operation, where `n` is `Queue.Count`.

#### Examples
The following example shows how to add elements to the `Queue`, remove elements from the `Queue`, or view the element at the beginning of the `Queue`.

_Code sample not included: ~/snippets/csharp/System.Collections/Queue/Dequeue/source.cs._

## Queue.GetEnumerator() method

```csharp
public virtual System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `Queue`.

Returns: An `IEnumerator` for the `Queue`.

#### Remarks
The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an `O(1)` operation.

## Queue.Peek() method

```csharp
public virtual object? Peek ();
```

Returns the object at the beginning of the `Queue` without removing it.

Returns: The object at the beginning of the `Queue`.

Exceptions:

- `InvalidOperationException`: The `Queue` is empty.

#### Remarks
This method is similar to the `Queue.Dequeue` method, but `Queue.Peek` does not modify the `Queue`.

`null` can be added to the `Queue` as a value. To distinguish between a null value and the end of the `Queue`, check the `Count` property or catch the `InvalidOperationException`, which is thrown when the `Queue` is empty.

This method is an `O(1)` operation.

#### Examples
The following example shows how to add elements to the `Queue`, remove elements from the `Queue`, or view the element at the beginning of the `Queue`.

_Code sample not included: ~/snippets/csharp/System.Collections/Queue/Dequeue/source.cs._

## Queue.Synchronized(Queue) method

```csharp
public static System.Collections.Queue Synchronized (System.Collections.Queue queue);
```

Returns a new `Queue` that wraps the original queue, and is thread safe.

Parameters:

- `queue`: The `Queue` to synchronize.

Returns: A `Queue` wrapper that is synchronized (thread safe).

Exceptions:

- `ArgumentNullException`: `queue` is `null`.

#### Remarks
The wrapper returned by this method locks the queue before an operation is performed so that it is performed in a thread-safe manner.

To guarantee the thread safety of the `Queue`, all operations must be done through this wrapper only.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `Queue.SyncRoot` during the entire enumeration. This method is an `O(1)` operation.

_Code sample not included: ~/snippets/csharp/System.Collections/Queue/IsSynchronized/source2.cs._

The following example shows how to synchronize a `Queue`, determine if a `Queue` is synchronized and use a synchronized `Queue`.

_Code sample not included: ~/snippets/csharp/System.Collections/Queue/IsSynchronized/source.cs._

## Queue.ToArray() method

```csharp
public virtual object?[] ToArray ();
```

Copies the `Queue` elements to a new array.

Returns: A new array containing elements copied from the `Queue`.

#### Remarks
The `Queue` is not modified. The order of the elements in the new array is the same as the order of the elements from the beginning of the `Queue` to its end.

This method is an `O(n)` operation, where `n` is `Queue.Count`.

#### Examples
The following example shows how to copy a `Queue` into a one-dimensional array.

_Code sample not included: ~/snippets/csharp/System.Collections/Queue/CopyTo/source.cs._

## Queue.TrimToSize() method

```csharp
public virtual void TrimToSize ();
```

Sets the capacity to the actual number of elements in the `Queue`.

Exceptions:

- `NotSupportedException`: The `Queue` is read-only.

#### Remarks
This method can be used to minimize a queue's memory overhead if no new elements will be added to the queue.

To reset a `Queue` to its initial state, call the `Queue.Clear` method before calling `Queue.TrimToSize`. Trimming an empty `Queue` sets the capacity of the `Queue` to the default capacity.

This method is an `O(n)` operation, where `n` is `Queue.Count`.
