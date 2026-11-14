---
title: "Stack<T> class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Stack`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Stack<T> class (part 3 of 3)

## Stack<T>.Push(T) method

```csharp
public void Push (T item);
```

Inserts an object at the top of the `Stack<T>`.

Parameters:

- `item`: The object to push onto the `Stack<T>`. The value can be `null` for reference types.

#### Remarks
`Stack<T>` is implemented as an array.

If `Stack<T>.Count` already equals the capacity, the capacity of the `Stack<T>` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

If type `T` is a reference type, `null` can be pushed onto the `Stack<T>` as a placeholder, if needed. It occupies a slot in the stack and is treated like any object.

If `Stack<T>.Count` is less than the capacity of the stack, `Stack<T>.Push` is an O(1) operation. If the capacity needs to be increased to accommodate the new element, `Stack<T>.Push` becomes an O(`n`) operation, where `n` is `Stack<T>.Count`.

#### Examples
The following code example demonstrates several methods of the `Stack<T>` generic class, including the `Stack<T>.Push` method.

The code example creates a stack of strings with default capacity and uses the `Stack<T>.Push` method to push five strings onto the stack. The elements of the stack are enumerated, which does not change the state of the stack. The `Stack<T>.Pop` method is used to pop the first string off the stack. The `Stack<T>.Peek` method is used to look at the next item on the stack, and then the `Stack<T>.Pop` method is used to pop it off.

The `Stack<T>.ToArray` method is used to create an array and copy the stack elements to it, then the array is passed to the `Stack<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the stack with the order of the elements reversed. The elements of the copy are displayed.

An array twice the size of the stack is created, and the `Stack<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Stack<T>.%23ctor` constructor is used again to create a copy of the stack with the order of elements reversed; thus, the three null elements are at the end.

The `Stack<T>.Contains` method is used to show that the string "four" is in the first copy of the stack, after which the `Stack<T>.Clear` method clears the copy and the `Count` property shows that the stack is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/StackT/Overview/source.cs._

## Stack<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

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

## Stack<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int arrayIndex);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

`array` does not have zero-based indexing.

-or-

The number of elements in the source `ICollection` is greater than the available space from `arrayIndex` to the end of the destination `array`.

-or-

The type of the source `ICollection` cannot be cast automatically to the type of the destination `array`.

#### Remarks

> **Note:**
>  If the type of the source `ICollection` cannot be cast automatically to the type of the destination `array`, the non-generic implementations of `ICollection.CopyTo` throw `InvalidCastException`, whereas the generic implementations throw `ArgumentException`.

This method is an O(`n`) operation, where `n` is `Stack<T>.Count`.

## Stack<T>.System.Collections.IEnumerable.GetEnumerator() method

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

## Stack<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the `Stack<T>` to a new array.

Returns: A new array containing copies of the elements of the `Stack<T>`.

#### Remarks
The elements are copied onto the array in last-in-first-out (LIFO) order, similar to the order of the elements returned by a succession of calls to `Stack<T>.Pop`.

This method is an O(`n`) operation, where `n` is `Stack<T>.Count`.

#### Examples
The following code example demonstrates several methods of the `Stack<T>` generic class, including the `Stack<T>.ToArray` method.

The code example creates a stack of strings with default capacity and uses the `Stack<T>.Push` method to push five strings onto the stack. The elements of the stack are enumerated, which does not change the state of the stack. The `Stack<T>.Pop` method is used to pop the first string off the stack. The `Stack<T>.Peek` method is used to look at the next item on the stack, and then the `Stack<T>.Pop` method is used to pop it off.

The `Stack<T>.ToArray` method is used to create an array and copy the stack elements to it, then the array is passed to the `Stack<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the stack with the order of the elements reversed. The elements of the copy are displayed.

An array twice the size of the stack is created, and the `Stack<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Stack<T>.%23ctor` constructor is used again to create a copy of the stack with the order of elements reversed; thus, the three null elements are at the end.

The `Stack<T>.Contains` method is used to show that the string "four" is in the first copy of the stack, after which the `Stack<T>.Clear` method clears the copy and the `Count` property shows that the stack is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/StackT/Overview/source.cs._

## Stack<T>.TrimExcess() method

```csharp
public void TrimExcess ();
```

Sets the capacity to the actual number of elements in the `Stack<T>`, if that number is less than 90 percent of current capacity.

#### Remarks
This method can be used to minimize a collection's memory overhead if no new elements will be added to the collection. The cost of reallocating and copying a large `Stack<T>` can be considerable, however, so the `Stack<T>.TrimExcess` method does nothing if the list is at more than 90 percent of capacity. This avoids incurring a large reallocation cost for a relatively small gain.

This method is an O(`n`) operation, where `n` is `Stack<T>.Count`.

To reset a `Stack<T>` to its initial state, call the `Stack<T>.Clear` method before calling `Stack<T>.TrimExcess` method. Trimming an empty `Stack<T>` sets the capacity of the `Stack<T>` to the default capacity.

## Stack<T>.TrimExcess(Int32) method

```csharp
public void TrimExcess (int capacity);
```

Sets the capacity of a `Stack<T>` object to a specified number of entries.

Parameters:

- `capacity`: The new capacity.

Exceptions:

- `ArgumentOutOfRangeException`: Passed capacity is lower than 0 or entries count.

To be added.

## Stack<T>.TryPeek(T) method

```csharp
public bool TryPeek (out T result);
```

Returns a value that indicates whether there is an object at the top of the `Stack<T>`, and if one is present, copies it to the `result` parameter. The object is not removed from the `Stack<T>`.

Parameters:

- `result`: If present, the object at the top of the `Stack<T>`; otherwise, the default value of `T`.

Returns: `true` if there is an object at the top of the `Stack<T>`; `false` if the `Stack<T>` is empty.

To be added.

## Stack<T>.TryPop(T) method

```csharp
public bool TryPop (out T result);
```

Returns a value that indicates whether there is an object at the top of the `Stack<T>`, and if one is present, copies it to the `result` parameter, and removes it from the `Stack<T>`.

Parameters:

- `result`: If present, the object at the top of the `Stack<T>`; otherwise, the default value of `T`.

Returns: `true` if there is an object at the top of the `Stack<T>`; `false` if the `Stack<T>` is empty.

To be added.
