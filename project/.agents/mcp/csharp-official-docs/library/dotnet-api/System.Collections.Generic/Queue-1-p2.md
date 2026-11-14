---
title: "Queue<T> class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Queue`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queue<T> class (part 2 of 3)

## Queue<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int arrayIndex);
```

Copies the `Queue<T>` elements to an existing one-dimensional `Array`, starting at the specified array index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `Queue<T>`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than zero.
- `ArgumentException`: The number of elements in the source `Queue<T>` is greater than the available space from `arrayIndex` to the end of the destination `array`.

#### Remarks
The elements are copied to the `Array` in the same order in which the enumerator iterates through the `Queue<T>`.

This method is an O(`n`) operation, where `n` is `Queue<T>.Count`.

## Queue<T>.Dequeue() method

```csharp
public T Dequeue ();
```

Removes and returns the object at the beginning of the `Queue<T>`.

Returns: The object that is removed from the beginning of the `Queue<T>`.

Exceptions:

- `InvalidOperationException`: The `Queue<T>` is empty.

#### Remarks
This method is similar to the `Queue<T>.Peek` method, but `Queue<T>.Peek` does not modify the `Queue<T>`.

If type `T` is a reference type, `null` can be added to the `Queue<T>` as a value.

This method is an O(1) operation.

#### Examples
The following code example demonstrates several methods of the `Queue<T>` generic class, including the `Queue<T>.Dequeue` method.

The code example creates a queue of strings with default capacity and uses the `Queue<T>.Enqueue` method to queue five strings. The elements of the queue are enumerated, which does not change the state of the queue. The `Queue<T>.Dequeue` method is used to dequeue the first string. The `Queue<T>.Peek` method is used to look at the next item in the queue, and then the `Queue<T>.Dequeue` method is used to dequeue it.

The `Queue<T>.ToArray` method is used to create an array and copy the queue elements to it, then the array is passed to the `Queue<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the queue. The elements of the copy are displayed.

An array twice the size of the queue is created, and the `Queue<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Queue<T>.%23ctor` constructor is used again to create a second copy of the queue containing three null elements at the beginning.

The `Queue<T>.Contains` method is used to show that the string "four" is in the first copy of the queue, after which the `Queue<T>.Clear` method clears the copy and the `Count` property shows that the queue is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/QueueT/Overview/source.cs._

## Queue<T>.Enqueue(T) method

```csharp
public void Enqueue (T item);
```

Adds an object to the end of the `Queue<T>`.

Parameters:

- `item`: The object to add to the `Queue<T>`. The value can be `null` for reference types.

#### Remarks
If `Queue<T>.Count` already equals the capacity, the capacity of the `Queue<T>` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

If `Queue<T>.Count` is less than the capacity of the internal array, this method is an O(1) operation. If the internal array needs to be reallocated to accommodate the new element, this method becomes an O(`n`) operation, where `n` is `Queue<T>.Count`.

#### Examples
The following code example demonstrates several methods of the `Queue<T>` generic class, including the `Queue<T>.Enqueue` method.

The code example creates a queue of strings with default capacity and uses the `Queue<T>.Enqueue` method to queue five strings. The elements of the queue are enumerated, which does not change the state of the queue. The `Queue<T>.Dequeue` method is used to dequeue the first string. The `Queue<T>.Peek` method is used to look at the next item in the queue, and then the `Queue<T>.Dequeue` method is used to dequeue it.

The `Queue<T>.ToArray` method is used to create an array and copy the queue elements to it, then the array is passed to the `Queue<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the queue. The elements of the copy are displayed.

An array twice the size of the queue is created, and the `Queue<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Queue<T>.%23ctor` constructor is used again to create a second copy of the queue containing three null elements at the beginning.

The `Queue<T>.Contains` method is used to show that the string "four" is in the first copy of the queue, after which the `Queue<T>.Clear` method clears the copy and the `Count` property shows that the queue is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/QueueT/Overview/source.cs._

## Queue<T>.EnsureCapacity(Int32) method

```csharp
public int EnsureCapacity (int capacity);
```

Ensures that the capacity of this queue is at least the specified `capacity`. If the current capacity is less than `capacity`, it is increased to at least the specified `capacity`.

Parameters:

- `capacity`: The minimum capacity to ensure.

Returns: The new capacity of this queue.

#### Remarks

> **Caution:**
> If `capacity` comes from user input, prefer letting the collection resize itself as elements are added instead of calling this method. If you must use a user-specified value, either clamp it to a reasonable limit (for example, `Math.Clamp(untrustedValue, 0, 20)`) or verify that the element count matches the specified value.

## Queue<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.Queue<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `Queue<T>`.

Returns: An `Enumerator` for the `Queue<T>`.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, `Enumerator.Current` is undefined. Therefore, you must call `Enumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `Enumerator.Current`.

`Enumerator.Current` returns the same object until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Enumerator.Current` to the next element.

If `Enumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `Enumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `Enumerator.MoveNext` also return `false`. If the last call to `Enumerator.MoveNext` returned `false`, `Enumerator.Current` is undefined. You cannot set `Enumerator.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.

#### Examples
The following code example demonstrates that the `Queue<T>` generic class is enumerable. The `foreach` statement (`For Each` in Visual Basic) is used to enumerate the queue.

The code example creates a queue of strings with default capacity and uses the `Queue<T>.Enqueue` method to queue five strings. The elements of the queue are enumerated, which does not change the state of the queue. The `Queue<T>.Dequeue` method is used to dequeue the first string. The `Queue<T>.Peek` method is used to look at the next item in the queue, and then the `Queue<T>.Dequeue` method is used to dequeue it.

The `Queue<T>.ToArray` method is used to create an array and copy the queue elements to it, then the array is passed to the `Queue<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the queue. The elements of the copy are displayed.

An array twice the size of the queue is created, and the `Queue<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Queue<T>.%23ctor` constructor is used again to create a second copy of the queue containing three null elements at the beginning.

The `Queue<T>.Contains` method is used to show that the string "four" is in the first copy of the queue, after which the `Queue<T>.Clear` method clears the copy and the `Count` property shows that the queue is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/QueueT/Overview/source.cs._

## Queue<T>.Peek() method

```csharp
public T Peek ();
```

Returns the object at the beginning of the `Queue<T>` without removing it.

Returns: The object at the beginning of the `Queue<T>`.

Exceptions:

- `InvalidOperationException`: The `Queue<T>` is empty.

#### Remarks
This method is similar to the `Queue<T>.Dequeue` method, but `Queue<T>.Peek` does not modify the `Queue<T>`.

If type `T` is a reference type, `null` can be added to the `Queue<T>` as a value.

This method is an O(1) operation.

#### Examples
The following code example demonstrates several methods of the `Queue<T>` generic class, including the `Queue<T>.Peek` method.

The code example creates a queue of strings with default capacity and uses the `Queue<T>.Enqueue` method to queue five strings. The elements of the queue are enumerated, which does not change the state of the queue. The `Queue<T>.Dequeue` method is used to dequeue the first string. The `Queue<T>.Peek` method is used to look at the next item in the queue, and then the `Queue<T>.Dequeue` method is used to dequeue it.

The `Queue<T>.ToArray` method is used to create an array and copy the queue elements to it, then the array is passed to the `Queue<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the queue. The elements of the copy are displayed.

An array twice the size of the queue is created, and the `Queue<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Queue<T>.%23ctor` constructor is used again to create a second copy of the queue containing three null elements at the beginning.

The `Queue<T>.Contains` method is used to show that the string "four" is in the first copy of the queue, after which the `Queue<T>.Clear` method clears the copy and the `Count` property shows that the queue is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/QueueT/Overview/source.cs._

## Queue<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator<T>` that can be used to iterate through the collection.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, `IEnumerator<T>.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.

`IEnumerator<T>.Current` returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator<T>.Current` is undefined. You cannot set `IEnumerator<T>.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.
