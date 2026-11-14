---
title: "Queue class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/Queue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queue class

Namespace: `System.Collections`

```csharp
public class Queue : ICloneable, System.Collections.ICollection
```

Represents a first-in, first-out collection of objects.

#### Remarks

This class implements a queue as a circular array. Objects stored in a `Queue` are inserted at one end and removed from the other.

> **Important:**
>  We don't recommend that you use the `Queue` class for new development. Instead, we recommend that you use the generic `Queue<T>` class. For more information, see Non-generic collections shouldn't be used on GitHub.

Queues and stacks are useful when you need temporary storage for information; that is, when you might want to discard an element after retrieving its value. Use `Queue` if you need to access the information in the same order that it is stored in the collection. Use `Stack` if you need to access the information in reverse order. Use `ConcurrentQueue<T>` or `ConcurrentStack<T>` if you need to access the collection from multiple threads concurrently.

Three main operations can be performed on a `Queue` and its elements:

-   `Queue.Enqueue` adds an element to the end of the `Queue`.

-   `Queue.Dequeue` removes the oldest element from the start of the `Queue`.

-   `Queue.Peek` returns the oldest element that is at the start of the `Queue` but does not remove it from the `Queue`.

The capacity of a `Queue` is the number of elements the `Queue` can hold. As elements are added to a `Queue`, the capacity is automatically increased as required through reallocation.  The capacity can be decreased by calling `Queue.TrimToSize`.

The growth factor is the number by which the current capacity is multiplied when a greater capacity is required.  The growth factor is determined when the `Queue` is constructed. The default growth factor is 2.0. The capacity of the `Queue` will always increase by at least a minimum of four, regardless of the growth factor. For example, a `Queue` with a growth factor of 1.0 will always increase in capacity by four when a greater capacity is required.

`Queue` accepts `null` as a valid value and allows duplicate elements.

For the generic version of this collection, see `Queue<T>`

#### Examples
The following example shows how to create and add values to a `Queue` and how to print out its values.

_Code sample not included: ~/snippets/csharp/System.Collections/Queue/Overview/source.cs._

## Queue.Queue() constructor

```csharp
public Queue ();
```

Initializes a new instance of the `Queue` class that is empty, has the default initial capacity, and uses the default growth factor.

#### Remarks
The capacity of a `Queue` is the number of elements the `Queue` can hold.  As elements are added to a `Queue`, the capacity is automatically increased as required through reallocation.  The capacity can be decreased by calling `Queue.TrimToSize`.

The growth factor is the number by which the current capacity is multiplied when a greater capacity is required.  The growth factor is determined when the `Queue` is constructed.

This constructor is an `O(1)` operation.

## Queue.Queue(ICollection) constructor

```csharp
public Queue (System.Collections.ICollection col);
```

Initializes a new instance of the `Queue` class that contains elements copied from the specified collection, has the same initial capacity as the number of elements copied, and uses the default growth factor.

Parameters:

- `col`: The `ICollection` to copy elements from.

Exceptions:

- `ArgumentNullException`: `col` is `null`.

#### Remarks
The capacity of a `Queue` is the number of elements the `Queue` can hold.  As elements are added to a `Queue`, the capacity is automatically increased as required through reallocation.  The capacity can be decreased by calling `Queue.TrimToSize`.

The growth factor is the number by which the current capacity is multiplied when a greater capacity is required.  The growth factor is determined when the `Queue` is constructed.

The elements are copied onto the `Queue` in the same order they are read by the `IEnumerator` of the `ICollection`.

This constructor is an `O(n)` operation, where `n` is the number of elements in `col`.

## Queue.Queue(Int32) constructor

```csharp
public Queue (int capacity);
```

Initializes a new instance of the `Queue` class that is empty, has the specified initial capacity, and uses the default growth factor.

Parameters:

- `capacity`: The initial number of elements that the `Queue` can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
The capacity of a `Queue` is the number of elements the `Queue` can hold.  As elements are added to a `Queue`, the capacity is automatically increased as required through reallocation.  The capacity can be decreased by calling `Queue.TrimToSize`.

The growth factor is the number by which the current capacity is multiplied when a greater capacity is required.  The growth factor is determined when the `Queue` is constructed.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Queue`.

This constructor is an `O(n)` operation, where `n` is `capacity`.

## Queue.Queue(Int32, Single) constructor

```csharp
public Queue (int capacity, float growFactor);
```

Initializes a new instance of the `Queue` class that is empty, has the specified initial capacity, and uses the specified growth factor.

Parameters:

- `capacity`: The initial number of elements that the `Queue` can contain.
- `growFactor`: The factor by which the capacity of the `Queue` is expanded.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

-or-

`growFactor` is less than 1.0 or greater than 10.0.

#### Remarks
The capacity of a `Queue` is the number of elements the `Queue` can hold.  As elements are added to a `Queue`, the capacity is automatically increased as required through reallocation.  The capacity can be decreased by calling `Queue.TrimToSize`.

The growth factor is the number by which the current capacity is multiplied when a greater capacity is required.  The growth factor is determined when the `Queue` is constructed. The capacity of the `Queue` will always increase by a minimum value, regardless of the growth factor; a growth factor of 1.0 will not prevent the `Queue` from increasing in size.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Queue`.

This constructor is an `O(n)` operation, where `n` is `capacity`.

## Queue.Count property

```csharp
public virtual int Count { get; }
```

Gets the number of elements contained in the `Queue`.

Returns: The number of elements contained in the `Queue`.

#### Remarks
The capacity of a `Queue` is the number of elements that the `Queue` can store. `Queue.Count` is the number of elements that are actually in the `Queue`.

The capacity of a `Queue` is always greater than or equal to `Queue.Count`. If `Queue.Count` exceeds the capacity while adding elements, the capacity is automatically increased by reallocating the internal array before copying the old elements and adding the new elements. The new capacity is determined by multiplying the current capacity by the growth factor, which is determined when the `Queue` is constructed. The capacity of the `Queue` will always increase by a minimum value, regardless of the growth factor; a growth factor of 1.0 will not prevent the `Queue` from increasing in size.

The capacity can be decreased by calling `Queue.TrimToSize`.

Retrieving the value of this property is an `O(1)` operation.

## Queue.IsSynchronized property

```csharp
public virtual bool IsSynchronized { get; }
```

Gets a value indicating whether access to the `Queue` is synchronized (thread safe).

Returns: `true` if access to the `Queue` is synchronized (thread safe); otherwise, `false`. The default is `false`.

#### Remarks
To guarantee the thread safety of the `Queue`, all operations must be done through the wrapper returned by the `Queue.Synchronized` method.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `Queue.SyncRoot` during the entire enumeration. Retrieving the value of this property is an `O(1)` operation.

_Code sample not included: ~/snippets/csharp/System.Collections/Queue/IsSynchronized/source2.cs._

The following example shows how to synchronize a `Queue`, determine if a `Queue` is synchronized, and use a synchronized `Queue`.

_Code sample not included: ~/snippets/csharp/System.Collections/Queue/IsSynchronized/source.cs._

## Queue.SyncRoot property

```csharp
public virtual object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `Queue`.

Returns: An object that can be used to synchronize access to the `Queue`.

#### Remarks
To create a synchronized version of the `Queue`, use the `Queue.Synchronized` method. However, derived classes can provide their own synchronized version of the `Queue` using the `SyncRoot` property. The synchronizing code must perform operations on the `Queue.SyncRoot` of the `Queue`, not directly on the `Queue`. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `Queue` object.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `Queue.SyncRoot` during the entire enumeration. Retrieving the value of this property is an `O(1)` operation.

_Code sample not included: ~/snippets/csharp/System.Collections/Queue/IsSynchronized/source2.cs._

## Queue.Clear() method

```csharp
public virtual void Clear ();
```

Removes all objects from the `Queue`.

#### Remarks
`Queue.Count` is set to zero, and references to other objects from elements of the collection are also released.

The capacity remains unchanged. To reset the capacity of the `Queue`, call `Queue.TrimToSize`. Trimming an empty `Queue` sets the capacity of the `Queue` to the default capacity.

This method is an `O(n)` operation, where `n` is `Queue.Count`.

#### Examples
The following example shows how to clear the values of the `Queue`.

_Code sample not included: ~/snippets/csharp/System.Collections/Queue/Clear/source.cs._

## Queue.Clone() method

```csharp
public virtual object Clone ();
```

Creates a shallow copy of the `Queue`.

Returns: A shallow copy of the `Queue`.

#### Remarks
A shallow copy of a collection copies only the elements of the collection, whether they are reference types or value types, but it does not copy the objects that the references refer to. The references in the new collection point to the same objects that the references in the original collection point to.

In contrast, a deep copy of a collection copies the elements and everything directly or indirectly referenced by the elements.

This method is an `O(n)` operation, where `n` is `Queue.Count`.

## Queue.Contains(Object) method

```csharp
public virtual bool Contains (object? obj);
```

Determines whether an element is in the `Queue`.

Parameters:

- `obj`: The `Object` to locate in the `Queue`. The value can be `null`.

Returns: `true` if `obj` is found in the `Queue`; otherwise, `false`.

#### Remarks
This method determines equality by calling `Object.Equals`.

This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is `Queue.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `obj` to determine whether `item` exists.

## Queue.CopyTo(Array, Int32) method

```csharp
public virtual void CopyTo (Array array, int index);
```

Copies the `Queue` elements to an existing one-dimensional `Array`, starting at the specified array index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `Queue`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `Queue` is greater than the available space from `index` to the end of the destination `array`.
- `ArrayTypeMismatchException`: The type of the source `Queue` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The elements are copied to the `Array` in the same order in which the enumerator iterates through the `Queue`.

This method is an `O(n)` operation, where `n` is `Queue.Count`.

#### Examples
The following example shows how to copy a `Queue` into a one-dimensional array.

_Code sample not included: ~/snippets/csharp/System.Collections/Queue/CopyTo/source.cs._

## Queue.Dequeue() method

```csharp
public virtual object? Dequeue ();
```

Removes and returns the object at the beginning of the `Queue`.

Returns: The object that is removed from the beginning of the `Queue`.

Exceptions:

- `InvalidOperationException`: The `Queue` is empty.

#### Remarks
This method is similar to the `Queue.Peek` method, but `Queue.Peek` does not modify the `Queue`.

`null` can be added to the `Queue` as a value. To distinguish between a null value and the end of the `Queue`, check the `Count` property or catch the `InvalidOperationException`, which is thrown when the `Queue` is empty.

This method is an `O(1)` operation.

#### Examples
The following example shows how to add elements to the `Queue`, remove elements from the `Queue`, or view the element at the beginning of the `Queue`.

_Code sample not included: ~/snippets/csharp/System.Collections/Queue/Dequeue/source.cs._
