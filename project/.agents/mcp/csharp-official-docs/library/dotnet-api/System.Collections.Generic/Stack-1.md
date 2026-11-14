---
title: "Stack<T> class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Stack`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Stack<T> class

Namespace: `System.Collections.Generic`

```csharp
public class Stack<T> : System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.ICollection
```

Represents a variable size last-in-first-out (LIFO) collection of instances of the same specified type.

Parameters:

- `T`: Specifies the type of elements in the stack.

#### Remarks
`Stack<T>` is implemented as an array.

Stacks and queues are useful when you need temporary storage for information; that is, when you might want to discard an element after retrieving its value. Use `Queue<T>` if you need to access the information in the same order that it is stored in the collection. Use `Stack<T>` if you need to access the information in reverse order.

Use the `ConcurrentStack<T>` and `ConcurrentQueue<T>` types when you need to access the collection from multiple threads concurrently.

A common use for `Stack<T>` is to preserve variable states during calls to other procedures.

Three main operations can be performed on a `Stack<T>` and its elements:

-   `Stack<T>.Push` inserts an element at the top of the `Stack<T>`.

-   `Stack<T>.Pop` removes an element from the top of the `Stack<T>`.

-   `Stack<T>.Peek` returns an element that is at the top of the `Stack<T>` but does not remove it from the `Stack<T>`.

The capacity of a `Stack<T>` is the number of elements the `Stack<T>` can hold. As elements are added to a `Stack<T>`, the capacity is automatically increased as required by reallocating the internal array. The capacity can be decreased by calling `Stack<T>.TrimExcess`.

If `Stack<T>.Count` is less than the capacity of the stack, `Stack<T>.Push` is an O(1) operation. If the capacity needs to be increased to accommodate the new element, `Stack<T>.Push` becomes an O(`n`) operation, where `n` is `Stack<T>.Count`. `Stack<T>.Pop` is an O(1) operation.

`Stack<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

#### Examples
The following code example demonstrates several methods of the `Stack<T>` generic class. The code example creates a stack of strings with default capacity and uses the `Stack<T>.Push` method to push five strings onto the stack. The elements of the stack are enumerated, which does not change the state of the stack. The `Stack<T>.Pop` method is used to pop the first string off the stack. The `Stack<T>.Peek` method is used to look at the next item on the stack, and then the `Stack<T>.Pop` method is used to pop it off.

The `Stack<T>.ToArray` method is used to create an array and copy the stack elements to it, then the array is passed to the `Stack<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the stack with the order of the elements reversed. The elements of the copy are displayed.

An array twice the size of the stack is created, and the `Stack<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Stack<T>.%23ctor` constructor is used again to create a copy of the stack with the order of elements reversed; thus, the three null elements are at the end.

The `Stack<T>.Contains` method is used to show that the string "four" is in the first copy of the stack, after which the `Stack<T>.Clear` method clears the copy and the `Count` property shows that the stack is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/StackT/Overview/source.cs._

## Stack<T>.Stack() constructor

```csharp
public Stack ();
```

Initializes a new instance of the `Stack<T>` class that is empty and has the default initial capacity.

#### Remarks
The capacity of a `Stack<T>` is the number of elements that the `Stack<T>` can hold. As elements are added to a `Stack<T>`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Stack<T>`.

The capacity can be decreased by calling `Stack<T>.TrimExcess`.

This constructor is an O(1) operation.

#### Examples
The following code example demonstrates this constructor and several methods of the `Stack<T>` generic class.

The code example creates a stack of strings with default capacity and uses the `Stack<T>.Push` method to push five strings onto the stack. The elements of the stack are enumerated, which does not change the state of the stack. The `Stack<T>.Pop` method is used to pop the first string off the stack. The `Stack<T>.Peek` method is used to look at the next item on the stack, and then the `Stack<T>.Pop` method is used to pop it off.

The `Stack<T>.ToArray` method is used to create an array and copy the stack elements to it, then the array is passed to the `Stack<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the stack with the order of the elements reversed. The elements of the copy are displayed.

An array twice the size of the stack is created, and the `Stack<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Stack<T>.%23ctor` constructor is used again to create a copy of the stack with the order of elements reversed; thus, the three null elements are at the end.

The `Stack<T>.Contains` method is used to show that the string "four" is in the first copy of the stack, after which the `Stack<T>.Clear` method clears the copy and the `Count` property shows that the stack is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/StackT/Overview/source.cs._

## Stack<T>.Stack(IEnumerable<T>) constructor

```csharp
public Stack (System.Collections.Generic.IEnumerable<T> collection);
```

Initializes a new instance of the `Stack<T>` class that contains elements copied from the specified collection and has sufficient capacity to accommodate the number of elements copied.

Parameters:

- `collection`: The collection to copy elements from.

Exceptions:

- `ArgumentNullException`: `collection` is `null`.

#### Remarks
The capacity of a `Stack<T>` is the number of elements that the `Stack<T>` can hold. As elements are added to a `Stack<T>`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Stack<T>`.

The capacity can be decreased by calling `Stack<T>.TrimExcess`.

The elements are copied onto the `Stack<T>` in the same order they are read by the `IEnumerator<T>` of the collection.

This constructor is an O(`n`) operation, where `n` is the number of elements in `collection`.

#### Examples
The following code example demonstrates this constructor and several methods of the `Stack<T>` generic class.

The code example creates a stack of strings with default capacity and uses the `Stack<T>.Push` method to push five strings onto the stack. The elements of the stack are enumerated, which does not change the state of the stack. The `Stack<T>.Pop` method is used to pop the first string off the stack. The `Stack<T>.Peek` method is used to look at the next item on the stack, and then the `Stack<T>.Pop` method is used to pop it off.

The `Stack<T>.ToArray` method is used to create an array and copy the stack elements to it, then the array is passed to the `Stack<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the stack with the order of the elements reversed. The elements of the copy are displayed.

An array twice the size of the stack is created, and the `Stack<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Stack<T>.%23ctor` constructor is used again to create a copy of the stack with the order of elements reversed; thus, the three null elements are at the end.

The `Stack<T>.Contains` method is used to show that the string "four" is in the first copy of the stack, after which the `Stack<T>.Clear` method clears the copy and the `Count` property shows that the stack is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/StackT/Overview/source.cs._

## Stack<T>.Stack(Int32) constructor

```csharp
public Stack (int capacity);
```

Initializes a new instance of the `Stack<T>` class that is empty and has the specified initial capacity or the default initial capacity, whichever is greater.

Parameters:

- `capacity`: The initial number of elements that the `Stack<T>` can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
The capacity of a `Stack<T>` is the number of elements that the `Stack<T>` can hold. As elements are added to a `Stack<T>`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Stack<T>`.

The capacity can be decreased by calling `Stack<T>.TrimExcess`.

This constructor is an O(`n`) operation, where `n` is `capacity`.

## Stack<T>.Capacity property

```csharp
public int Capacity { get; }
```

Gets the total numbers of elements the internal data structure can hold without resizing.

Returns: To be added.

To be added.

## Stack<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `Stack<T>`.

Returns: The number of elements contained in the `Stack<T>`.

#### Remarks
The capacity of the `Stack<T>` is the number of elements that the `Stack<T>` can store. `Stack<T>.Count` is the number of elements that are actually in the `Stack<T>`.

The capacity is always greater than or equal to `Stack<T>.Count`. If `Stack<T>.Count` exceeds the capacity while adding elements, the capacity is increased by automatically reallocating the internal array before copying the old elements and adding the new elements.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example demonstrates several properties and methods of the `Stack<T>` generic class, including the `Count` property.

The code example creates a stack of strings with default capacity and uses the `Stack<T>.Push` method to push five strings onto the stack. The elements of the stack are enumerated, which does not change the state of the stack. The `Stack<T>.Pop` method is used to pop the first string off the stack. The `Stack<T>.Peek` method is used to look at the next item on the stack, and then the `Stack<T>.Pop` method is used to pop it off.

The `Stack<T>.ToArray` method is used to create an array and copy the stack elements to it, then the array is passed to the `Stack<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the stack with the order of the elements reversed. The elements of the copy are displayed.

An array twice the size of the stack is created, and the `Stack<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Stack<T>.%23ctor` constructor is used again to create a copy of the stack with the order of elements reversed; thus, the three null elements are at the end.

The `Stack<T>.Contains` method is used to show that the string "four" is in the first copy of the stack, after which the `Stack<T>.Clear` method clears the copy and the `Count` property shows that the stack is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/StackT/Overview/source.cs._

## Stack<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.  In the default implementation of `Stack<T>`, this property always returns `false`.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  In the rare case where enumerations contend with write accesses, you must lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection.

Retrieving the value of this property is an O(1) operation.

## Stack<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.  In the default implementation of `Stack<T>`, this property always returns the current instance.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection. The following code shows the use of the `SyncRoot` property.

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
