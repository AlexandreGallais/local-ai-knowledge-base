---
title: "ConcurrentStack<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/ConcurrentStack`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConcurrentStack<T> class

Namespace: `System.Collections.Concurrent`

```csharp
public class ConcurrentStack<T> : System.Collections.Concurrent.IProducerConsumerCollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.ICollection
```

Represents a thread-safe last in-first out (LIFO) collection.

Parameters:

- `T`: The type of the elements contained in the stack.

#### Remarks

`ConcurrentStack<T>` provides a few main operations:

- `ConcurrentStack<T>.Push` inserts an element at the top of the `ConcurrentStack<T>`.
- `ConcurrentStack<T>.TryPop` removes an element from the top of the `ConcurrentStack<T>`, or returns `false` if the item cannot be removed.
- `ConcurrentStack<T>.TryPeek` returns an element that is at the top of the `ConcurrentStack<T>` but does not remove it from the `ConcurrentStack<T>`.
- The `ConcurrentStack<T>.TryPopRange` and `ConcurrentStack<T>.PushRange` methods provide efficient pushing and popping of multiple elements in a single operation.

#### Examples
The following example shows how to use a `ConcurrentStack<T>` to push and pop individual items:

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/ConcurrentStackT/Overview/concstack_single.cs._

The following example shows how to use a `ConcurrentStack<T>` to push and pop ranges of items:

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/ConcurrentStackT/Overview/concstack_range.cs._

## ConcurrentStack<T>.ConcurrentStack() constructor

```csharp
public ConcurrentStack ();
```

Initializes a new instance of the `ConcurrentStack<T>` class.

To be added.

## ConcurrentStack<T>.ConcurrentStack(IEnumerable<T>) constructor

```csharp
public ConcurrentStack (System.Collections.Generic.IEnumerable<T> collection);
```

Initializes a new instance of the `ConcurrentStack<T>` class that contains elements copied from the specified collection.

Parameters:

- `collection`: The collection whose elements are copied to the new `ConcurrentStack<T>`.

Exceptions:

- `ArgumentNullException`: The `collection` argument is null.

To be added.

## ConcurrentStack<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `ConcurrentStack<T>`.

Returns: The number of elements contained in the `ConcurrentStack<T>`.

#### Remarks
For determining whether the collection contains any items, use of the `IsEmpty` property is recommended rather than retrieving the number of items from the `Count` property and comparing it to 0.

## ConcurrentStack<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether the `ConcurrentStack<T>` is empty.

Returns: `true` if the `ConcurrentStack<T>` is empty; otherwise, `false`.

#### Remarks
For determining whether the collection contains any items, use of this property is recommended rather than retrieving the number of items from the `Count` property and comparing it to 0. However, as this collection is intended to be accessed concurrently, it may be the case that another thread will modify the collection after `ConcurrentStack<T>.IsEmpty` returns, thus invalidating the result.

For a code example, see `ConcurrentStack<T>`.

## ConcurrentStack<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized with the SyncRoot.

Returns: Always returns `false` to indicate access is not synchronized.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentStack<T>` instance is cast to an `ICollection` interface.

## ConcurrentStack<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`. This property is not supported.

Returns: Returns `null`.

Exceptions:

- `NotSupportedException`: The SyncRoot property is not supported

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentStack<T>` instance is cast to an `ICollection` interface.

## ConcurrentStack<T>.Clear() method

```csharp
public void Clear ();
```

Removes all objects from the `ConcurrentStack<T>`.

To be added.

## ConcurrentStack<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int index);
```

Copies the `ConcurrentStack<T>` elements to an existing one-dimensional `Array`, starting at the specified array index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from the `ConcurrentStack<T>`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is a null reference (Nothing in Visual Basic).
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `index` is equal to or greater than the length of the `array` -or- The number of elements in the source `ConcurrentStack<T>` is greater than the available space from `index` to the end of the destination `array`.

To be added.

## ConcurrentStack<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<T> GetEnumerator ();
```

Returns an enumerator that iterates through the `ConcurrentStack<T>`.

Returns: An enumerator for the `ConcurrentStack<T>`.

#### Remarks
The enumeration represents a moment-in-time snapshot of the contents of the stack. It does not reflect any updates to the collection after `ConcurrentStack<T>.GetEnumerator` was called. The enumerator is safe to use concurrently with reads from and writes to the stack. The enumerator returns items in LIFO (last-in, first-out) order.

## ConcurrentStack<T>.Push(T) method

```csharp
public void Push (T item);
```

Inserts an object at the top of the `ConcurrentStack<T>`.

Parameters:

- `item`: The object to push onto the `ConcurrentStack<T>`. The value can be a null reference (Nothing in Visual Basic) for reference types.

To be added.

## ConcurrentStack<T>.PushRange(T[]) method

```csharp
public void PushRange (T[] items);
```

Inserts multiple objects at the top of the `ConcurrentStack<T>` atomically.

Parameters:

- `items`: The objects to push onto the `ConcurrentStack<T>`.

Exceptions:

- `ArgumentNullException`: `items` is a null reference (Nothing in Visual Basic).

#### Remarks
When adding multiple items to the stack, using PushRange is a more efficient mechanism than using `ConcurrentStack<T>.Push` one item at a time. Additionally, PushRange guarantees that all of the elements will be added atomically, meaning that no other threads will be able to inject elements between the elements being pushed. Items at lower indices in the `items` array will be pushed before items at higher indices.

For a code example, see `ConcurrentStack<T>`.

## ConcurrentStack<T>.PushRange(T[], Int32, Int32) method

```csharp
public void PushRange (T[] items, int startIndex, int count);
```

Inserts multiple objects at the top of the `ConcurrentStack<T>` atomically.

Parameters:

- `items`: The objects to push onto the `ConcurrentStack<T>`.
- `startIndex`: The zero-based offset in `items` at which to begin inserting elements onto the top of the `ConcurrentStack<T>`.
- `count`: The number of elements to be inserted onto the top of the `ConcurrentStack<T>`.

Exceptions:

- `ArgumentNullException`: `items` is a null reference (Nothing in Visual Basic).
- `ArgumentOutOfRangeException`: `startIndex` or `count` is negative. Or `startIndex` is greater than or equal to the length of `items`.
- `ArgumentException`: `startIndex` + `count` is greater than the length of `items`.

#### Remarks
When adding multiple items to the stack, using PushRange is a more efficient mechanism than using `ConcurrentStack<T>.Push` one item at a time. Additionally, PushRange guarantees that all of the elements will be added atomically, meaning that no other threads will be able to inject elements between the elements being pushed. Items at lower indices in the `items` array will be pushed before items at higher indices.

For a code example, see `ConcurrentStack<T>`.

## ConcurrentStack<T>.System.Collections.Concurrent.IProducerConsumerCollection<T>.TryAdd(T) method

```csharp
bool IProducerConsumerCollection<T>.TryAdd (T item);
```

Attempts to add an object to the `IProducerConsumerCollection<T>`.

Parameters:

- `item`: The object to add to the `IProducerConsumerCollection<T>`. The value can be a null reference (Nothing in Visual Basic) for reference types.

Returns: `true` if the object was added successfully; otherwise, `false`.

#### Remarks
For `ConcurrentStack<T>`, this operation will always insert the object onto the top of the `ConcurrentStack<T>` and return true.

## ConcurrentStack<T>.System.Collections.Concurrent.IProducerConsumerCollection<T>.TryTake(T) method

```csharp
bool IProducerConsumerCollection<T>.TryTake (out T item);
```

Attempts to remove and return an object from the `IProducerConsumerCollection<T>`.

Parameters:

- `item`: When this method returns, if the operation was successful, `item` contains the object removed. If no object was available to be removed, the value is unspecified.

Returns: `true` if an element was removed and returned successfully; otherwise, `false`.

#### Remarks
For `ConcurrentStack<T>`, this operation will attempt to pop the object at the top of the `ConcurrentStack<T>`.

## ConcurrentStack<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from the `ConcurrentStack<T>`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is a null reference (Nothing in Visual Basic).
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional. -or- `array` does not have zero-based indexing. -or- `index` is equal to or greater than the length of the `array` -or- The number of elements in the source `ICollection` is greater than the available space from `index` to the end of the destination `array`. -or- The type of the source `ICollection` cannot be cast automatically to the type of the destination `array`.

To be added.

## ConcurrentStack<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` that can be used to iterate through the collection.

#### Remarks
The enumeration represents a moment-in-time snapshot of the contents of the stack. It does not reflect any updates to the collection after `ConcurrentStack<T>.GetEnumerator` was called. The enumerator is safe to use concurrently with reads from and writes to the stack.

## ConcurrentStack<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the items stored in the `ConcurrentStack<T>` to a new array.

Returns: A new array containing a snapshot of elements copied from the `ConcurrentStack<T>`.

To be added.

## ConcurrentStack<T>.TryPeek(T) method

```csharp
public bool TryPeek (out T result);
```

Attempts to return an object from the top of the `ConcurrentStack<T>` without removing it.

Parameters:

- `result`: When this method returns, `result` contains an object from the top of the `ConcurrentStack<T>` or an unspecified value if the operation failed.

Returns: `true` if and object was returned successfully; otherwise, `false`.

To be added.

## ConcurrentStack<T>.TryPop(T) method

```csharp
public bool TryPop (out T result);
```

Attempts to pop and return the object at the top of the `ConcurrentStack<T>`.

Parameters:

- `result`: When this method returns, if the operation was successful, `result` contains the object removed. If no object was available to be removed, the value is unspecified.

Returns: `true` if an element was removed and returned from the top of the `ConcurrentStack<T>` successfully; otherwise, `false`.

#### Remarks
For a code example, see `ConcurrentStack<T>`.

## ConcurrentStack<T>.TryPopRange(T[]) method

```csharp
public int TryPopRange (T[] items);
```

Attempts to pop and return multiple objects from the top of the `ConcurrentStack<T>` atomically.

Parameters:

- `items`: The `Array` to which objects popped from the top of the `ConcurrentStack<T>` will be added.

Returns: The number of objects successfully popped from the top of the `ConcurrentStack<T>` and inserted in `items`.

Exceptions:

- `ArgumentNullException`: `items` is a null argument (Nothing in Visual Basic).

#### Remarks
When popping multiple items, if there is little contention on the stack, using `TryPopRange` can be more efficient than using `ConcurrentStack<T>.TryPop` once per item to be removed. Nodes fill the `items` array with the first item to be popped at the startIndex, the second item to be popped at startIndex + 1, and so on.

For a code example, see `ConcurrentStack<T>`.

## ConcurrentStack<T>.TryPopRange(T[], Int32, Int32) method

```csharp
public int TryPopRange (T[] items, int startIndex, int count);
```

Attempts to pop and return multiple objects from the top of the `ConcurrentStack<T>` atomically.

Parameters:

- `items`: The `Array` to which objects popped from the top of the `ConcurrentStack<T>` will be added.
- `startIndex`: The zero-based offset in `items` at which to begin inserting elements from the top of the `ConcurrentStack<T>`.
- `count`: The number of elements to be popped from top of the `ConcurrentStack<T>` and inserted into `items`.

Returns: The number of objects successfully popped from the top of the stack and inserted in `items`.

Exceptions:

- `ArgumentNullException`: `items` is a null reference (Nothing in Visual Basic).
- `ArgumentOutOfRangeException`: `startIndex` or `count` is negative. Or `startIndex` is greater than or equal to the length of `items`.
- `ArgumentException`: `startIndex` + `count` is greater than the length of `items`.

#### Remarks
When popping multiple items, if there is little contention on the stack, using TryPopRange can be more efficient than using `ConcurrentStack<T>.TryPop` once per item to be removed. Nodes fill the `items` array with the first item to be popped at the startIndex, the second item to be popped at startIndex + 1, and so on.
