---
title: "SortedSet<T> class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedSet<T> class

Namespace: `System.Collections.Generic`

```csharp
public class SortedSet<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlySet<T>, System.Collections.Generic.ISet<T>, System.Collections.ICollection, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Represents a collection of objects that is maintained in sorted order.

Parameters:

- `T`: The type of elements in the set.

#### Remarks
A `SortedSet<T>` object maintains a sorted order without affecting performance as elements are inserted and deleted. Duplicate elements are not allowed. Changing the sort values of existing items is not supported and may lead to unexpected behavior.

For a thread safe alternative to `SortedSet<T>`, see `ImmutableSortedSet<T>`

#### Examples
The following example demonstrates a `SortedSet<T>` class that is created with the constructor that takes an `IComparer<T>` as a parameter. This comparer (`ByFileExtension`) is used to sort a list of file names by their extensions.

This example demonstrates how to create a sorted set of media file names, remove unwanted elements, view a range of elements, and compare the set with another sorted set.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedSetT/Overview/program.cs._

## SortedSet<T>.SortedSet() constructor

```csharp
public SortedSet ();
```

Initializes a new instance of the `SortedSet<T>` class.

To be added.

## SortedSet<T>.SortedSet(IComparer<T>) constructor

```csharp
public SortedSet (System.Collections.Generic.IComparer<T>? comparer);
```

Initializes a new instance of the `SortedSet<T>` class that uses a specified comparer.

Parameters:

- `comparer`: The default comparer to use for comparing objects.

Exceptions:

- `ArgumentNullException`: `comparer` is `null`.

#### Examples
The following example defines a comparer (`ByFileExtension`) that is used to construct a sorted set that sorts file names by their extensions. This code example is part of a larger example provided for the `SortedSet<T>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedSetT/Overview/program.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedSetT/Overview/program.cs._

## SortedSet<T>.SortedSet(IEnumerable<T>) constructor

```csharp
public SortedSet (System.Collections.Generic.IEnumerable<T> collection);
```

Initializes a new instance of the `SortedSet<T>` class that contains elements copied from a specified enumerable collection.

Parameters:

- `collection`: The enumerable collection to be copied.

#### Remarks
Duplicate elements in the enumerable collection are not copied into the new instance of the `SortedSet<T>` class, and no exceptions are thrown.

This constructor is an `O(n log n)` operation, where `n` is the number of elements in the `collection` parameter.

## SortedSet<T>.SortedSet(IEnumerable<T>, IComparer<T>) constructor

```csharp
public SortedSet (System.Collections.Generic.IEnumerable<T> collection, System.Collections.Generic.IComparer<T>? comparer);
```

Initializes a new instance of the `SortedSet<T>` class that contains elements copied from a specified enumerable collection and that uses a specified comparer.

Parameters:

- `collection`: The enumerable collection to be copied.
- `comparer`: The default comparer to use for comparing objects.

Exceptions:

- `ArgumentNullException`: `collection` is `null`.

To be added.

## SortedSet<T>.SortedSet(SerializationInfo, StreamingContext) constructor

```csharp
protected SortedSet (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `SortedSet<T>` class that contains serialized data.

Parameters:

- `info`: The object that contains the information that is required to serialize the `SortedSet<T>` object.
- `context`: The structure that contains the source and destination of the serialized stream associated with the `SortedSet<T>` object.

To be added.

## SortedSet<T>.Comparer property

```csharp
public System.Collections.Generic.IComparer<T> Comparer { get; }
```

Gets the `IComparer<T>` object that is used to order the values in the `SortedSet<T>`.

Returns: The comparer that is used to order the values in the `SortedSet<T>`.

#### Remarks
The returned comparer can be either the default comparer of the type for a `SortedSet<T>`, or the comparer used for its constructor.

Retrieving the value of this property is an `O(1)` operation.

## SortedSet<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements in the `SortedSet<T>`.

Returns: The number of elements in the `SortedSet<T>`.

#### Remarks
Retrieving the value of this property is an `O(1)` operation.

## SortedSet<T>.Max property

```csharp
public T? Max { get; }
```

Gets the maximum value in the `SortedSet<T>`, as defined by the comparer.

Returns: The maximum value in the set.

#### Remarks
If the `SortedSet<T>` has no elements, then the `Max` property returns the default value of `T`.

## SortedSet<T>.Min property

```csharp
public T? Min { get; }
```

Gets the minimum value in the `SortedSet<T>`, as defined by the comparer.

Returns: The minimum value in the set.

#### Remarks
If the `SortedSet<T>` has no elements, then the `Min` property returns the default value of `T`.

## SortedSet<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value that indicates whether a `ICollection` is read-only.

Returns: `true` if the collection is read-only; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SortedSet<T>` instance is cast to an `ICollection<T>` interface.

A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Getting the value of this property is an `O(1)` operation.

## SortedSet<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value that indicates whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SortedSet<T>` instance is cast to an `ICollection` interface.

## SortedSet<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`. In the default implementation of `KeyCollection`, this property always returns the current instance.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SortedSet<T>` instance is cast to an `ICollection` interface.

This method is an `O(1)` operation.

## SortedSet<T>.Add(T) method

```csharp
public bool Add (T item);
```

Adds an element to the set and returns a value that indicates if it was successfully added.

Parameters:

- `item`: The element to add to the set.

Returns: `true` if `item` is added to the set; otherwise, `false`.

#### Remarks
The `SortedSet<T>` class does not accept duplicate elements. If `item` is already in the set, this method returns `false` and does not throw an exception.

If `SortedSet<T>.Count` already equals the capacity of the `SortedSet<T>` object, the capacity is automatically adjusted to accommodate the new item.

#### Examples
The following example adds elements to a sorted set. This code example is part of a larger example provided for the `SortedSet<T>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedSetT/Overview/program.cs._

## SortedSet<T>.Clear() method

```csharp
public virtual void Clear ();
```

Removes all elements from the set.

#### Remarks
This method is an `O(n)` operation, where `n` is `SortedSet<T>.Count`.

## SortedSet<T>.Contains(T) method

```csharp
public virtual bool Contains (T item);
```

Determines whether the set contains a specific element.

Parameters:

- `item`: The element to locate in the set.

Returns: `true` if the set contains `item`; otherwise, `false`.

#### Remarks
This method is an `O(log n)` operation.

## SortedSet<T>.CopyTo(T[]) method

```csharp
public void CopyTo (T[] array);
```

Copies the complete `SortedSet<T>` to a compatible one-dimensional array, starting at the beginning of the target array.

Parameters:

- `array`: A one-dimensional array that is the destination of the elements copied from the `SortedSet<T>`.

Exceptions:

- `ArgumentException`: The number of elements in the source `SortedSet<T>` exceeds the number of elements that the destination array can contain.
- `ArgumentNullException`: `array` is `null`.

#### Remarks
The indexing of `array` must be zero-based.

## SortedSet<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int index);
```

Copies the complete `SortedSet<T>` to a compatible one-dimensional array, starting at the specified array index.

Parameters:

- `array`: A one-dimensional array that is the destination of the elements copied from the `SortedSet<T>`. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentException`: The number of elements in the source array is greater than the available space from `index` to the end of the destination array.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.

#### Remarks
This method is an `O(n)` operation, where `n` is `SortedSet<T>.Count`.

## SortedSet<T>.CopyTo(T[], Int32, Int32) method

```csharp
public void CopyTo (T[] array, int index, int count);
```

Copies a specified number of elements from `SortedSet<T>` to a compatible one-dimensional array, starting at the specified array index.

Parameters:

- `array`: A one-dimensional array that is the destination of the elements copied from the `SortedSet<T>`. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.
- `count`: The number of elements to copy.

Exceptions:

- `ArgumentException`: The number of elements in the source array is greater than the available space from `index` to the end of the destination array.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`count` is less than zero.

#### Remarks
This method is an `O(n)` operation, where `n` is `count`.

## SortedSet<T>.CreateSetComparer() method

```csharp
public static System.Collections.Generic.IEqualityComparer<System.Collections.Generic.SortedSet<T>> CreateSetComparer ();
```

Returns an `IEqualityComparer` object that can be used to create a collection that contains individual sets.

Returns: A comparer for creating a collection of sets.

#### Remarks
The `IEqualityComparer` object checks for equality at only one level; however, you can chain together comparers at additional levels to perform deeper equality testing.

Calling this method is an `O(1)` operation.

## SortedSet<T>.CreateSetComparer(IEqualityComparer<T>) method

```csharp
public static System.Collections.Generic.IEqualityComparer<System.Collections.Generic.SortedSet<T>> CreateSetComparer (System.Collections.Generic.IEqualityComparer<T>? memberEqualityComparer);
```

Returns an `IEqualityComparer` object, according to a specified comparer, that can be used to create a collection that contains individual sets.

Parameters:

- `memberEqualityComparer`: The comparer to use for creating the returned comparer.

Returns: A comparer for creating a collection of sets.

#### Remarks
The `memberEqualityComparer` and the current `SortedSet<T>` must have the same definition of equality.

You can use the comparer returned by this method in the `%23ctor` constructor to create a hash table of individual sets.

#### Examples
The following example uses the `SortedSet<T>.CreateSetComparer` method to create a set of sets. This code example is part of a larger example provided for the `SortedSet<T>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedSetT/Overview/program.cs._

## SortedSet<T>.ExceptWith(IEnumerable<T>) method

```csharp
public void ExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Removes all elements that are in a specified collection from the current `SortedSet<T>` object.

Parameters:

- `other`: The collection of items to remove from the `SortedSet<T>` object.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
This method removes any element in the current `SortedSet<T>` that is also in `other`. Duplicate values in `other` are ignored.

This method is an `O(n log m)` operation, where `m` is `SortedSet<T>.Count` and `n` is the number of elements in `other`.

#### Examples
The following example removes elements from a sorted set that are duplicated in another sorted set. This code example is part of a larger example provided for the `SortedSet<T>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedSetT/Overview/program.cs._

## SortedSet<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.SortedSet<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `SortedSet<T>`.

Returns: An enumerator that iterates through the `SortedSet<T>` in sorted order.

#### Remarks
An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

This method is an `O(log n)` operation.
