---
title: "Stack<T> class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Stack`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Stack<T> class (part 2 of 3)

## Stack<T>.Clear() method

```csharp
public void Clear ();
```

Removes all objects from the `Stack<T>`.

#### Remarks
`Stack<T>.Count` is set to zero, and references to other objects from elements of the collection are also released.

The capacity remains unchanged. To reset the capacity of the `Stack<T>`, call `Stack<T>.TrimExcess`. Trimming an empty `Stack<T>` sets the capacity of the `Stack<T>` to the default capacity.

This method is an O(`n`) operation, where `n` is `Stack<T>.Count`.

#### Examples
The following code example demonstrates several methods of the `Stack<T>` generic class, including the `Stack<T>.Clear` method.

The code example creates a stack of strings with default capacity and uses the `Stack<T>.Push` method to push five strings onto the stack. The elements of the stack are enumerated, which does not change the state of the stack. The `Stack<T>.Pop` method is used to pop the first string off the stack. The `Stack<T>.Peek` method is used to look at the next item on the stack, and then the `Stack<T>.Pop` method is used to pop it off.

The `Stack<T>.ToArray` method is used to create an array and copy the stack elements to it, then the array is passed to the `Stack<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the stack with the order of the elements reversed. The elements of the copy are displayed.

An array twice the size of the stack is created, and the `Stack<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Stack<T>.%23ctor` constructor is used again to create a copy of the stack with the order of elements reversed; thus, the three null elements are at the end.

The `Stack<T>.Contains` method is used to show that the string "four" is in the first copy of the stack, after which the `Stack<T>.Clear` method clears the copy and the `Count` property shows that the stack is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/StackT/Overview/source.cs._

## Stack<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether an element is in the `Stack<T>`.

Parameters:

- `item`: The object to locate in the `Stack<T>`. The value can be `null` for reference types.

Returns: `true` if `item` is found in the `Stack<T>`; otherwise, `false`.

#### Remarks
This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `Stack<T>.Count`.

#### Examples
The following code example demonstrates several methods of the `Stack<T>` generic class, including the `Stack<T>.Contains` method.

The code example creates a stack of strings with default capacity and uses the `Stack<T>.Push` method to push five strings onto the stack. The elements of the stack are enumerated, which does not change the state of the stack. The `Stack<T>.Pop` method is used to pop the first string off the stack. The `Stack<T>.Peek` method is used to look at the next item on the stack, and then the `Stack<T>.Pop` method is used to pop it off.

The `Stack<T>.ToArray` method is used to create an array and copy the stack elements to it, then the array is passed to the `Stack<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the stack with the order of the elements reversed. The elements of the copy are displayed.

An array twice the size of the stack is created, and the `Stack<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Stack<T>.%23ctor` constructor is used again to create a copy of the stack with the order of elements reversed; thus, the three null elements are at the end.

The `Stack<T>.Contains` method is used to show that the string "four" is in the first copy of the stack, after which the `Stack<T>.Clear` method clears the copy and the `Count` property shows that the stack is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/StackT/Overview/source.cs._

## Stack<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int arrayIndex);
```

Copies the `Stack<T>` to an existing one-dimensional `Array`, starting at the specified array index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `Stack<T>`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than zero.
- `ArgumentException`: The number of elements in the source `Stack<T>` is greater than the available space from `arrayIndex` to the end of the destination `array`.

#### Remarks
The elements are copied onto the array in last-in-first-out (LIFO) order, similar to the order of the elements returned by a succession of calls to `Stack<T>.Pop`.

This method is an O(`n`) operation, where `n` is `Stack<T>.Count`.

#### Examples
The following code example demonstrates several methods of the `Stack<T>` generic class, including the `Stack<T>.CopyTo` method.

The code example creates a stack of strings with default capacity and uses the `Stack<T>.Push` method to push five strings onto the stack. The elements of the stack are enumerated, which does not change the state of the stack. The `Stack<T>.Pop` method is used to pop the first string off the stack. The `Stack<T>.Peek` method is used to look at the next item on the stack, and then the `Stack<T>.Pop` method is used to pop it off.

The `Stack<T>.ToArray` method is used to create an array and copy the stack elements to it, then the array is passed to the `Stack<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the stack with the order of the elements reversed. The elements of the copy are displayed.

An array twice the size of the stack is created, and the `Stack<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Stack<T>.%23ctor` constructor is used again to create a copy of the stack with the order of elements reversed; thus, the three null elements are at the end.

The `Stack<T>.Contains` method is used to show that the string "four" is in the first copy of the stack, after which the `Stack<T>.Clear` method clears the copy and the `Count` property shows that the stack is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/StackT/Overview/source.cs._

## Stack<T>.EnsureCapacity(Int32) method

```csharp
public int EnsureCapacity (int capacity);
```

Ensures that the capacity of this Stack is at least the specified `capacity`. If the current capacity is less than `capacity`, it is increased to at least the specified `capacity`.

Parameters:

- `capacity`: The minimum capacity to ensure.

Returns: The new capacity of this stack.

To be added.

## Stack<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.Stack<T>.Enumerator GetEnumerator ();
```

Returns an enumerator for the `Stack<T>`.

Returns: An `Enumerator` for the `Stack<T>`.

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
The following code example demonstrates that the `Stack<T>` generic class is enumerable. The `foreach` statement (`For Each` in Visual Basic) is used to enumerate the stack.

The code example creates a stack of strings with default capacity and uses the `Stack<T>.Push` method to push five strings onto the stack. The elements of the stack are enumerated, which does not change the state of the stack. The `Stack<T>.Pop` method is used to pop the first string off the stack. The `Stack<T>.Peek` method is used to look at the next item on the stack, and then the `Stack<T>.Pop` method is used to pop it off.

The `Stack<T>.ToArray` method is used to create an array and copy the stack elements to it, then the array is passed to the `Stack<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the stack with the order of the elements reversed. The elements of the copy are displayed.

An array twice the size of the stack is created, and the `Stack<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Stack<T>.%23ctor` constructor is used again to create a copy of the stack with the order of elements reversed; thus, the three null elements are at the end.

The `Stack<T>.Contains` method is used to show that the string "four" is in the first copy of the stack, after which the `Stack<T>.Clear` method clears the copy and the `Count` property shows that the stack is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/StackT/Overview/source.cs._

## Stack<T>.Peek() method

```csharp
public T Peek ();
```

Returns the object at the top of the `Stack<T>` without removing it.

Returns: The object at the top of the `Stack<T>`.

Exceptions:

- `InvalidOperationException`: The `Stack<T>` is empty.

#### Remarks
This method is similar to the `Stack<T>.Pop` method, but `Stack<T>.Peek` does not modify the `Stack<T>`.

If type `T` is a reference type, `null` can be pushed onto the `Stack<T>` as a placeholder, if needed.

This method is an O(1) operation.

#### Examples
The following code example demonstrates several methods of the `Stack<T>` generic class, including the `Stack<T>.Peek` method.

The code example creates a stack of strings with default capacity and uses the `Stack<T>.Push` method to push five strings onto the stack. The elements of the stack are enumerated, which does not change the state of the stack. The `Stack<T>.Pop` method is used to pop the first string off the stack. The `Stack<T>.Peek` method is used to look at the next item on the stack, and then the `Stack<T>.Pop` method is used to pop it off.

The `Stack<T>.ToArray` method is used to create an array and copy the stack elements to it, then the array is passed to the `Stack<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the stack with the order of the elements reversed. The elements of the copy are displayed.

An array twice the size of the stack is created, and the `Stack<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Stack<T>.%23ctor` constructor is used again to create a copy of the stack with the order of elements reversed; thus, the three null elements are at the end.

The `Stack<T>.Contains` method is used to show that the string "four" is in the first copy of the stack, after which the `Stack<T>.Clear` method clears the copy and the `Count` property shows that the stack is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/StackT/Overview/source.cs._

## Stack<T>.Pop() method

```csharp
public T Pop ();
```

Removes and returns the object at the top of the `Stack<T>`.

Returns: The object removed from the top of the `Stack<T>`.

Exceptions:

- `InvalidOperationException`: The `Stack<T>` is empty.

#### Remarks
This method is similar to the `Stack<T>.Peek` method, but `Stack<T>.Peek` does not modify the `Stack<T>`.

If type `T` is a reference type, `null` can be pushed onto the `Stack<T>` as a placeholder, if needed.

`Stack<T>` is implemented as an array. This method is an O(1) operation.

#### Examples
The following code example demonstrates several methods of the `Stack<T>` generic class, including the `Stack<T>.Pop` method.

The code example creates a stack of strings with default capacity and uses the `Stack<T>.Push` method to push five strings onto the stack. The elements of the stack are enumerated, which does not change the state of the stack. The `Stack<T>.Pop` method is used to pop the first string off the stack. The `Stack<T>.Peek` method is used to look at the next item on the stack, and then the `Stack<T>.Pop` method is used to pop it off.

The `Stack<T>.ToArray` method is used to create an array and copy the stack elements to it, then the array is passed to the `Stack<T>.%23ctor` constructor that takes `IEnumerable<T>`, creating a copy of the stack with the order of the elements reversed. The elements of the copy are displayed.

An array twice the size of the stack is created, and the `Stack<T>.CopyTo` method is used to copy the array elements beginning at the middle of the array. The `Stack<T>.%23ctor` constructor is used again to create a copy of the stack with the order of elements reversed; thus, the three null elements are at the end.

The `Stack<T>.Contains` method is used to show that the string "four" is in the first copy of the stack, after which the `Stack<T>.Clear` method clears the copy and the `Count` property shows that the stack is empty.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/StackT/Overview/source.cs._
