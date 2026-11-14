---
title: "Stack class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/Stack.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Stack class

Namespace: `System.Collections`

```csharp
public class Stack : ICloneable, System.Collections.ICollection
```

Represents a simple last-in-first-out (LIFO) non-generic collection of objects.

#### Remarks

The capacity of a `Stack` is the number of elements the `Stack` can hold. As elements are added to a `Stack`, the capacity is automatically increased as required through reallocation.

> **Important:**
> We don't recommend that you use the `Stack` class for new development. Instead, we recommend that you use the generic `Stack<T>` class. For more information, see Non-generic collections shouldn't be used on GitHub.

If `Stack.Count` is less than the capacity of the stack, `Stack.Push` is an `O(1)` operation. If the capacity needs to be increased to accommodate the new element, `Stack.Push` becomes an `O(n)` operation, where `n` is `Stack.Count`. `Stack.Pop` is an `O(1)` operation.

`Stack` accepts `null` as a valid value and allows duplicate elements.

#### Examples
The following example shows how to create and add values to a Stack and how to display its values.

_Code sample not included: ~/snippets/csharp/System.Collections/Stack/Overview/source.cs._

## Stack.Stack() constructor

```csharp
public Stack ();
```

Initializes a new instance of the `Stack` class that is empty and has the default initial capacity.

#### Remarks
The capacity of a `Stack` is the number of elements that the `Stack` can hold. As elements are added to a `Stack`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Stack`.

This constructor is an `O(1)` operation.

## Stack.Stack(ICollection) constructor

```csharp
public Stack (System.Collections.ICollection col);
```

Initializes a new instance of the `Stack` class that contains elements copied from the specified collection and has the same initial capacity as the number of elements copied.

Parameters:

- `col`: The `ICollection` to copy elements from.

Exceptions:

- `ArgumentNullException`: `col` is `null`.

#### Remarks
The capacity of a `Stack` is the number of elements that the `Stack` can hold. As elements are added to a `Stack`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Stack`.

The elements are copied onto the `Stack` in the same order they are read by the `IEnumerator` of the `ICollection`.

This constructor is an `O(n)` operation, where `n` is the number of elements in `col`.

## Stack.Stack(Int32) constructor

```csharp
public Stack (int initialCapacity);
```

Initializes a new instance of the `Stack` class that is empty and has the specified initial capacity or the default initial capacity, whichever is greater.

Parameters:

- `initialCapacity`: The initial number of elements that the `Stack` can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `initialCapacity` is less than zero.

#### Remarks
The capacity of a `Stack` is the number of elements that the `Stack` can hold. As elements are added to a `Stack`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Stack`.

This constructor is an `O(n)` operation, where `n` is `initialCapacity`.

## Stack.Count property

```csharp
public virtual int Count { get; }
```

Gets the number of elements contained in the `Stack`.

Returns: The number of elements contained in the `Stack`.

#### Remarks
The capacity is the number of elements that the `Stack` can store. `Stack.Count` is the number of elements that are actually in the `Stack`.

The capacity is always greater than or equal to `Stack.Count`. If `Stack.Count` exceeds the capacity while adding elements, the capacity is automatically increased by reallocating the internal array before copying the old elements and adding the new elements.

Retrieving the value of this property is an `O(1)` operation.

## Stack.IsSynchronized property

```csharp
public virtual bool IsSynchronized { get; }
```

Gets a value indicating whether access to the `Stack` is synchronized (thread safe).

Returns: `true`, if access to the `Stack` is synchronized (thread safe); otherwise, `false`. The default is `false`.

#### Remarks
To guarantee the thread safety of the `Stack`, all operations must be done through the wrapper returned by the `Stack.Synchronized` method.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The following code example shows how to lock the collection using the `Stack.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/Stack/IsSynchronized/source2.cs._

Retrieving the value of this property is an `O(1)` operation.

#### Examples
The following example shows how to synchronize a `Stack`, determine if a `Stack` is synchronized, and use a synchronized `Stack`.

_Code sample not included: ~/snippets/csharp/System.Collections/Stack/IsSynchronized/source.cs._

## Stack.SyncRoot property

```csharp
public virtual object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `Stack`.

Returns: An `Object` that can be used to synchronize access to the `Stack`.

#### Remarks
To create a synchronized version of the `Stack`, use the `Stack.Synchronized` method. However, derived classes can provide their own synchronized version of the `Stack` using the `SyncRoot` property. The synchronizing code must perform operations on the `Stack.SyncRoot` of the `Stack`, not directly on the `Stack`. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `Stack` object.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The following code example shows how to lock the collection using the `Stack.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/Stack/IsSynchronized/source2.cs._

Retrieving the value of this property is an `O(1)` operation.

## Stack.Clear() method

```csharp
public virtual void Clear ();
```

Removes all objects from the `Stack`.

#### Remarks
`Stack.Count` is set to zero, and references to other objects from elements of the collection are also released.

This method is an `O(n)` operation, where `n` is `Stack.Count`.

#### Examples
The following example shows how to clear the values of the `Stack`.

_Code sample not included: ~/snippets/csharp/System.Collections/Stack/Clear/source.cs._

## Stack.Clone() method

```csharp
public virtual object Clone ();
```

Creates a shallow copy of the `Stack`.

Returns: A shallow copy of the `Stack`.

#### Remarks
A shallow copy of a collection copies only the elements of the collection, whether they are reference types or value types, but it does not copy the objects that the references refer to. The references in the new collection point to the same objects that the references in the original collection point to.

In contrast, a deep copy of a collection copies the elements and everything directly or indirectly referenced by the elements.

This method is an `O(n)` operation, where `n` is `Stack.Count`.

## Stack.Contains(Object) method

```csharp
public virtual bool Contains (object? obj);
```

Determines whether an element is in the `Stack`.

Parameters:

- `obj`: The object to locate in the `Stack`. The value can be `null`.

Returns: `true`, if `obj` is found in the `Stack`; otherwise, `false`.

#### Remarks
This method determines equality by calling the `Object.Equals` method.

This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is `Stack.Count`.

This method tests for equality by passing the `obj` argument to the `Object.Equals` method of individual objects in the collection.

## Stack.CopyTo(Array, Int32) method

```csharp
public virtual void CopyTo (Array array, int index);
```

Copies the `Stack` to an existing one-dimensional `Array`, starting at the specified array index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `Stack`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `Stack` is greater than the available space from `index` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `Stack` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The elements are copied onto the array in last-in-first-out (LIFO) order, similar to the order of the elements returned by a succession of calls to `Stack.Pop`.

This method is an `O(n)` operation, where `n` is `Stack.Count`.

#### Examples
The following example shows how to copy a `Stack` into a one-dimensional array.

_Code sample not included: ~/snippets/csharp/System.Collections/Stack/CopyTo/source.cs._

## Stack.GetEnumerator() method

```csharp
public virtual System.Collections.IEnumerator GetEnumerator ();
```

Returns an `IEnumerator` for the `Stack`.

Returns: An `IEnumerator` for the `Stack`.

#### Remarks

The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an `O(1)` operation.

## Stack.Peek() method

```csharp
public virtual object? Peek ();
```

Returns the object at the top of the `Stack` without removing it.

Returns: The `Object` at the top of the `Stack`.

Exceptions:

- `InvalidOperationException`: The `Stack` is empty.

#### Remarks
This method is similar to the `Stack.Pop` method, but `Stack.Peek` does not modify the `Stack`.

`null` can be pushed onto the `Stack` as a placeholder, if needed. To distinguish between a null value and the end of the stack, check the `Count` property or catch the `InvalidOperationException`, which is thrown when the `Stack` is empty.

This method is an `O(1)` operation.

#### Examples
The following example shows how to add elements to the `Stack`, remove elements from the `Stack`, or view the element at the top of the `Stack`.

_Code sample not included: ~/snippets/csharp/System.Collections/Stack/Peek/source.cs._

## Stack.Pop() method

```csharp
public virtual object? Pop ();
```

Removes and returns the object at the top of the `Stack`.

Returns: The `Object` removed from the top of the `Stack`.

Exceptions:

- `InvalidOperationException`: The `Stack` is empty.

#### Remarks
This method is similar to the `Stack.Peek` method, but `Stack.Peek` does not modify the `Stack`.

`null` can be pushed onto the `Stack` as a placeholder, if needed. To distinguish between a null value and the end of the stack, check the `Count` property or catch the `InvalidOperationException`, which is thrown when the `Stack` is empty.

This method is an `O(1)` operation.

#### Examples
The following example shows how to add elements to the `Stack`, remove elements from the `Stack`, or view the element at the top of the `Stack`.

_Code sample not included: ~/snippets/csharp/System.Collections/Stack/Peek/source.cs._
