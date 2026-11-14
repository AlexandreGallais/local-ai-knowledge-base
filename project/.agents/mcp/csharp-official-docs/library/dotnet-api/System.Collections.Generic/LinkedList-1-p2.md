---
title: "LinkedList<T> class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/LinkedList`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LinkedList<T> class (part 2 of 3)

## LinkedList<T>.AddLast(LinkedListNode<T>) method

```csharp
public void AddLast (System.Collections.Generic.LinkedListNode<T> node);
```

Adds the specified new node at the end of the `LinkedList<T>`.

Parameters:

- `node`: The new `LinkedListNode<T>` to add at the end of the `LinkedList<T>`.

Exceptions:

- `ArgumentNullException`: `node` is `null`.
- `InvalidOperationException`: `node` belongs to another `LinkedList<T>`.

#### Remarks
`LinkedList<T>` accepts `null` as a valid `LinkedListNode<T>.Value` for reference types and allows duplicate values.

If the `LinkedList<T>` is empty, the new node becomes the `LinkedList<T>.First` and the `LinkedList<T>.Last`.

This method is an O(1) operation.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.AddLast(T) method

```csharp
public System.Collections.Generic.LinkedListNode<T> AddLast (T value);
```

Adds a new node containing the specified value at the end of the `LinkedList<T>`.

Parameters:

- `value`: The value to add at the end of the `LinkedList<T>`.

Returns: The new `LinkedListNode<T>` containing `value`.

#### Remarks
`LinkedList<T>` accepts `null` as a valid `LinkedListNode<T>.Value` for reference types and allows duplicate values.

If the `LinkedList<T>` is empty, the new node becomes the `LinkedList<T>.First` and the `LinkedList<T>.Last`.

This method is an O(1) operation.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.Clear() method

```csharp
public void Clear ();
```

Removes all nodes from the `LinkedList<T>`.

#### Remarks
`LinkedList<T>.Count` is set to zero, and references to other objects from elements of the collection are also released.  `LinkedList<T>.First` and `LinkedList<T>.Last` are set to `null`.

This method is an O(`n`) operation, where `n` is `LinkedList<T>.Count`.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.Contains(T) method

```csharp
public bool Contains (T value);
```

Determines whether a value is in the `LinkedList<T>`.

Parameters:

- `value`: The value to locate in the `LinkedList<T>`. The value can be `null` for reference types.

Returns: `true` if `value` is found in the `LinkedList<T>`; otherwise, `false`.

#### Remarks
This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `LinkedList<T>.Count`.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int index);
```

Copies the entire `LinkedList<T>` to a compatible one-dimensional `Array`, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `LinkedList<T>`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: The number of elements in the source `LinkedList<T>` is greater than the available space from `index` to the end of the destination `array`.

#### Remarks
The elements are copied to the `Array` in the same order in which the enumerator iterates through the `LinkedList<T>`.

This method is an O(`n`) operation, where `n` is `LinkedList<T>.Count`.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.Find(T) method

```csharp
public System.Collections.Generic.LinkedListNode<T>? Find (T value);
```

Finds the first node that contains the specified value.

Parameters:

- `value`: The value to locate in the `LinkedList<T>`.

Returns: The first `LinkedListNode<T>` that contains the specified value, if found; otherwise, `null`.

#### Remarks
The `LinkedList<T>` is searched forward starting at `LinkedList<T>.First` and ending at `LinkedList<T>.Last`.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `LinkedList<T>.Count`.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.FindLast(T) method

```csharp
public System.Collections.Generic.LinkedListNode<T>? FindLast (T value);
```

Finds the last node that contains the specified value.

Parameters:

- `value`: The value to locate in the `LinkedList<T>`.

Returns: The last `LinkedListNode<T>` that contains the specified value, if found; otherwise, `null`.

#### Remarks
The `LinkedList<T>` is searched backward starting at `LinkedList<T>.Last` and ending at `LinkedList<T>.First`.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `LinkedList<T>.Count`.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.LinkedList<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `LinkedList<T>`.

Returns: An `Enumerator` for the `LinkedList<T>`.

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

## LinkedList<T>.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Implements the `ISerializable` interface and returns the data needed to serialize the `LinkedList<T>` instance.

Parameters:

- `info`: A `SerializationInfo` object that contains the information required to serialize the `LinkedList<T>` instance.
- `context`: A `StreamingContext` object that contains the source and destination of the serialized stream associated with the `LinkedList<T>` instance.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## LinkedList<T>.OnDeserialization(Object) method

```csharp
public virtual void OnDeserialization (object? sender);
```

Implements the `ISerializable` interface and raises the deserialization event when the deserialization is complete.

Parameters:

- `sender`: The source of the deserialization event.

Exceptions:

- `SerializationException`: The `SerializationInfo` object associated with the current `LinkedList<T>` instance is invalid.

#### Remarks
This method is an O(`n`) operation, where `n` is `LinkedList<T>.Count`.

## LinkedList<T>.Remove(LinkedListNode<T>) method

```csharp
public void Remove (System.Collections.Generic.LinkedListNode<T> node);
```

Removes the specified node from the `LinkedList<T>`.

Parameters:

- `node`: The `LinkedListNode<T>` to remove from the `LinkedList<T>`.

Exceptions:

- `ArgumentNullException`: `node` is `null`.
- `InvalidOperationException`: `node` is not in the current `LinkedList<T>`.

#### Remarks
This method is an O(1) operation.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.Remove(T) method

```csharp
public bool Remove (T value);
```

Removes the first occurrence of the specified value from the `LinkedList<T>`.

Parameters:

- `value`: The value to remove from the `LinkedList<T>`.

Returns: `true` if the element containing `value` is successfully removed; otherwise, `false`.  This method also returns `false` if `value` was not found in the original `LinkedList<T>`.

#### Remarks
This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `LinkedList<T>.Count`.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.RemoveFirst() method

```csharp
public void RemoveFirst ();
```

Removes the node at the start of the `LinkedList<T>`.

Exceptions:

- `InvalidOperationException`: The `LinkedList<T>` is empty.

#### Remarks
This method is an O(1) operation.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.RemoveLast() method

```csharp
public void RemoveLast ();
```

Removes the node at the end of the `LinkedList<T>`.

Exceptions:

- `InvalidOperationException`: The `LinkedList<T>` is empty.

#### Remarks
This method is an O(1) operation.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.System.Collections.Generic.ICollection<T>.Add(T) method

```csharp
void ICollection<T>.Add (T value);
```

Adds an item at the end of the `ICollection<T>`.

Parameters:

- `value`: The value to add at the end of the `ICollection<T>`.

#### Remarks
`LinkedList<T>` accepts `null` as a valid `LinkedListNode<T>.Value` for reference types and allows duplicate values.

If the `LinkedList<T>` is empty, the new node becomes the `LinkedList<T>.First` and the `LinkedList<T>.Last`.

This method is an O(1) operation.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

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

## LinkedList<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

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

This method is an O(`n`) operation, where `n` is `LinkedList<T>.Count`.
