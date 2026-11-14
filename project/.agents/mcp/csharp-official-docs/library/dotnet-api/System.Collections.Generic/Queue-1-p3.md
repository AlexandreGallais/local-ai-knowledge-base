---
title: "Queue<T> class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Queue`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queue<T> class (part 3 of 3)

## Queue<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

`array` does not have zero-based indexing.

-or-

The number of elements in the source `ICollection` is greater than the available space from `index` to the end of the destination `array`.

-or-

The type of the source `ICollection` cannot be cast automatically to the type of the destination `array`.

#### Remarks

> **Note:**
>  If the type of the source `ICollection` cannot be cast automatically to the type of the destination `array`, the non-generic implementations of `ICollection.CopyTo` throw `InvalidCastException`, whereas the generic implementations throw `ArgumentException`.

This method is an O(`n`) operation, where `n` is `Queue<T>.Count`.

## Queue<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` that can be used to iterate through the collection.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.

## Queue<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the `Queue<T>` elements to a new array.

Returns: A new array containing elements copied from the `Queue<T>`.

#### Remarks
The `Queue<T>` is not modified. The order of the elements in the new array is the same as the order of the elements from the beginning of the `Queue<T>` to its end.

This method is an O(`n`) operation, where `n` is `Queue<T>.Count`.

#### Examples
The following code example demonstrates several methods of the `Queue<T>` generic class, including the `Queue<T>.ToArray` method.

The code example creates a queue of strings with default capacity and uses the `Queue<T>.Enqueue` method to queue five strings. The elements of the queue are enumerated, which does not change the state of the queue. The `Queue<T>.Dequeue` method is used to dequeue the first string. The `Queue<T>.Peek` method is used to look at the next item in the queue, and then the `Queue<T>.Dequeue` method is used to dequeue it.

The `Queue<T>.ToArray` method is used to create an array and copy the queue elements to it, then the array is passed to the `Queue<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the queue. The elements of the copy are displayed.

An array twice the size of the queue is created, and the `Queue<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Queue<T>.%23ctor` constructor is used again to create a second copy of the queue containing three null elements at the beginning.

The `Queue<T>.Contains` method is used to show that the string "four" is in the first copy of the queue, after which the `Queue<T>.Clear` method clears the copy and the `Count` property shows that the queue is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/QueueT/Overview/source.cs._

## Queue<T>.TrimExcess() method

```csharp
public void TrimExcess ();
```

Sets the capacity to the actual number of elements in the `Queue<T>`, if that number is less than 90 percent of current capacity.

#### Remarks
This method can be used to minimize a collection's memory overhead if no new elements will be added to the collection. The cost of reallocating and copying a large `Queue<T>` can be considerable, however, so the `Queue<T>.TrimExcess` method does nothing if the list is at more than 90 percent of capacity. This avoids incurring a large reallocation cost for a relatively small gain.

This method is an O(`n`) operation, where `n` is `Queue<T>.Count`.

To reset a `Queue<T>` to its initial state, call the `Queue<T>.Clear` method before calling `Queue<T>.TrimExcess` method. Trimming an empty `Queue<T>` sets the capacity of the `Queue<T>` to the default capacity.

## Queue<T>.TrimExcess(Int32) method

```csharp
public void TrimExcess (int capacity);
```

Sets the capacity of a `Queue<T>` object to the specified number of entries.

Parameters:

- `capacity`: The new capacity.

Exceptions:

- `ArgumentOutOfRangeException`: Passed capacity is lower than entries count.

To be added.

## Queue<T>.TryDequeue(T) method

```csharp
public bool TryDequeue (out T result);
```

Removes the object at the beginning of the `Queue<T>`, and copies it to the `result` parameter.

Parameters:

- `result`: The removed object.

Returns: `true` if the object is successfully removed; `false` if the `Queue<T>` is empty.

To be added.

## Queue<T>.TryPeek(T) method

```csharp
public bool TryPeek (out T result);
```

Returns a value that indicates whether there is an object at the beginning of the `Queue<T>`, and if one is present, copies it to the `result` parameter. The object is not removed from the `Queue<T>`.

Parameters:

- `result`: If present, the object at the beginning of the `Queue<T>`; otherwise, the default value of `T`.

Returns: `true` if there is an object at the beginning of the `Queue<T>`; `false` if the `Queue<T>` is empty.

To be added.
