---
title: "Queue<T> class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Queue`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queue<T> class

Namespace: `System.Collections.Generic`

```csharp
public class Queue<T> : System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.ICollection
```

Represents a first-in, first-out collection of objects.

Parameters:

- `T`: Specifies the type of elements in the queue.

#### Remarks
This class implements a generic queue as a circular array. Objects stored in a `Queue<T>` are inserted at one end and removed from the other. Queues and stacks are useful when you need temporary storage for information; that is, when you might want to discard an element after retrieving its value. Use `Queue<T>` if you need to access the information in the same order that it is stored in the collection. Use `Stack<T>` if you need to access the information in reverse order. Use `ConcurrentQueue<T>` or `ConcurrentStack<T>` if you need to access the collection from multiple threads concurrently.

Three main operations can be performed on a `Queue<T>` and its elements:

-   `Queue<T>.Enqueue` adds an element to the end of the `Queue<T>`.

-   `Queue<T>.Dequeue` removes the oldest element from the start of the `Queue<T>`.

-   `Queue<T>.Peek` peek returns the oldest element that is at the start of the `Queue<T>` but does not remove it from the `Queue<T>`.

The capacity of a `Queue<T>` is the number of elements the `Queue<T>` can hold. As elements are added to a `Queue<T>`, the capacity is automatically increased as required by reallocating the internal array. The capacity can be decreased by calling `Queue<T>.TrimExcess`.

`Queue<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

#### Examples
The following code example demonstrates several methods of the `Queue<T>` generic class. The code example creates a queue of strings with default capacity and uses the `Queue<T>.Enqueue` method to queue five strings. The elements of the queue are enumerated, which does not change the state of the queue. The `Queue<T>.Dequeue` method is used to dequeue the first string. The `Queue<T>.Peek` method is used to look at the next item in the queue, and then the `Queue<T>.Dequeue` method is used to dequeue it.

The `Queue<T>.ToArray` method is used to create an array and copy the queue elements to it, then the array is passed to the `Queue<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the queue. The elements of the copy are displayed.

An array twice the size of the queue is created, and the `Queue<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Queue<T>.%23ctor` constructor is used again to create a second copy of the queue containing three null elements at the beginning.

The `Queue<T>.Contains` method is used to show that the string "four" is in the first copy of the queue, after which the `Queue<T>.Clear` method clears the copy and the `Count` property shows that the queue is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/QueueT/Overview/source.cs._

## Queue<T>.Queue() constructor

```csharp
public Queue ();
```

Initializes a new instance of the `Queue<T>` class that is empty and has the default initial capacity.

#### Remarks
The capacity of a `Queue<T>` is the number of elements that the `Queue<T>` can hold. As elements are added to a `Queue<T>`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Queue<T>`.

The capacity can be decreased by calling `Queue<T>.TrimExcess`.

This constructor is an O(1) operation.

## Queue<T>.Queue(IEnumerable<T>) constructor

```csharp
public Queue (System.Collections.Generic.IEnumerable<T> collection);
```

Initializes a new instance of the `Queue<T>` class that contains elements copied from the specified collection and has sufficient capacity to accommodate the number of elements copied.

Parameters:

- `collection`: The collection whose elements are copied to the new `Queue<T>`.

Exceptions:

- `ArgumentNullException`: `collection` is `null`.

#### Remarks
The capacity of a `Queue<T>` is the number of elements that the `Queue<T>` can hold. As elements are added to a `Queue<T>`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Queue<T>`.

The capacity can be decreased by calling `Queue<T>.TrimExcess`.

The elements are copied onto the `Queue<T>` in the same order they are read by the `IEnumerator<T>` of the collection.

This constructor is an O(`n`) operation, where `n` is the number of elements in `collection`.

## Queue<T>.Queue(Int32) constructor

```csharp
public Queue (int capacity);
```

Initializes a new instance of the `Queue<T>` class that is empty and has the specified initial capacity.

Parameters:

- `capacity`: The initial number of elements that the `Queue<T>` can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
The capacity of a `Queue<T>` is the number of elements that the `Queue<T>` can hold. As elements are added to a `Queue<T>`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Queue<T>`.

The capacity can be decreased by calling `Queue<T>.TrimExcess`.

This constructor is an O(`n`) operation, where `n` is `capacity`.

> **Caution:**
> If `capacity` comes from user input, prefer using the parameterless constructor and letting the collection resize as elements are added. If you must use a user-specified value, either clamp it to a reasonable limit (for example, `Math.Clamp(untrustedValue, 0, 20)`) or verify that the element count matches the specified value.

## Queue<T>.Capacity property

```csharp
public int Capacity { get; }
```

Gets the total numbers of elements the internal data structure can hold without resizing.

Returns: To be added.

To be added.

## Queue<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `Queue<T>`.

Returns: The number of elements contained in the `Queue<T>`.

#### Remarks
The capacity of a `Queue<T>` is the number of elements that the `Queue<T>` can store. `Queue<T>.Count` is the number of elements that are actually in the `Queue<T>`.

The capacity is always greater than or equal to `Queue<T>.Count`. If `Queue<T>.Count` exceeds the capacity while adding elements, the capacity is increased by automatically reallocating the internal array before copying the old elements and adding the new elements.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example demonstrates several properties and methods of the `Queue<T>` generic class, including the `Count` property.

The code example creates a queue of strings with default capacity and uses the `Queue<T>.Enqueue` method to queue five strings. The elements of the queue are enumerated, which does not change the state of the queue. The `Queue<T>.Dequeue` method is used to dequeue the first string. The `Queue<T>.Peek` method is used to look at the next item in the queue, and then the `Queue<T>.Dequeue` method is used to dequeue it.

The `Queue<T>.ToArray` method is used to create an array and copy the queue elements to it, then the array is passed to the `Queue<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the queue. The elements of the copy are displayed.

An array twice the size of the queue is created, and the `Queue<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Queue<T>.%23ctor` constructor is used again to create a second copy of the queue containing three null elements at the beginning.

The `Queue<T>.Contains` method is used to show that the string "four" is in the first copy of the queue, after which the `Queue<T>.Clear` method clears the copy and the `Count` property shows that the queue is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/QueueT/Overview/source.cs._

## Queue<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.  In the default implementation of `Queue<T>`, this property always returns `false`.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object, which can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection.

Retrieving the value of this property is an O(1) operation.

## Queue<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.  In the default implementation of `Queue<T>`, this property always returns the current instance.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object, which can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection. The following code shows the use of the `SyncRoot` property.

```csharp
ICollection ic = ...;
lock (ic.SyncRoot) {
   // Access the collection.
}
```

```vb
Dim ic As ICollection = ...
SyncLock ic.SyncRoot
   ' Access the collection.
End SyncLock
```

Retrieving the value of this property is an O(1) operation.

## Queue<T>.Clear() method

```csharp
public void Clear ();
```

Removes all objects from the `Queue<T>`.

#### Remarks
`Queue<T>.Count` is set to zero, and references to other objects from elements of the collection are also released.

The capacity remains unchanged. To reset the capacity of the `Queue<T>`, call `Queue<T>.TrimExcess`. Trimming an empty `Queue<T>` sets the capacity of the `Queue<T>` to the default capacity.

This method is an O(`n`) operation, where `n` is `Queue<T>.Count`.

#### Examples
The following code example demonstrates several methods of the `Queue<T>` generic class, including the `Queue<T>.Clear` method.

The code example creates a queue of strings with default capacity and uses the `Queue<T>.Enqueue` method to queue five strings. The elements of the queue are enumerated, which does not change the state of the queue. The `Queue<T>.Dequeue` method is used to dequeue the first string. The `Queue<T>.Peek` method is used to look at the next item in the queue, and then the `Queue<T>.Dequeue` method is used to dequeue it.

The `Queue<T>.ToArray` method is used to create an array and copy the queue elements to it, then the array is passed to the `Queue<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the queue. The elements of the copy are displayed.

An array twice the size of the queue is created, and the `Queue<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Queue<T>.%23ctor` constructor is used again to create a second copy of the queue containing three null elements at the beginning.

The `Queue<T>.Contains` method is used to show that the string "four" is in the first copy of the queue, after which the `Queue<T>.Clear` method clears the copy and the `Count` property shows that the queue is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/QueueT/Overview/source.cs._

## Queue<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether an element is in the `Queue<T>`.

Parameters:

- `item`: The object to locate in the `Queue<T>`. The value can be `null` for reference types.

Returns: `true` if `item` is found in the `Queue<T>`; otherwise, `false`.

#### Remarks
This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the queue.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `Queue<T>.Count`.

#### Examples
The following code example demonstrates several methods of the `Queue<T>` generic class, including the `Queue<T>.Contains` method.

The code example creates a queue of strings with default capacity and uses the `Queue<T>.Enqueue` method to queue five strings. The elements of the queue are enumerated, which does not change the state of the queue. The `Queue<T>.Dequeue` method is used to dequeue the first string. The `Queue<T>.Peek` method is used to look at the next item in the queue, and then the `Queue<T>.Dequeue` method is used to dequeue it.

The `Queue<T>.ToArray` method is used to create an array and copy the queue elements to it, then the array is passed to the `Queue<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the queue. The elements of the copy are displayed.

An array twice the size of the queue is created, and the `Queue<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Queue<T>.%23ctor` constructor is used again to create a second copy of the queue containing three null elements at the beginning.

The `Queue<T>.Contains` method is used to show that the string "four" is in the first copy of the queue, after which the `Queue<T>.Clear` method clears the copy and the `Count` property shows that the queue is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/QueueT/Overview/source.cs._
