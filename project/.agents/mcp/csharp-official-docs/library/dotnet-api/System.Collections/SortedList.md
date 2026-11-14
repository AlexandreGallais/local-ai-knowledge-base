---
title: "SortedList class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/SortedList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedList class

Namespace: `System.Collections`

```csharp
public class SortedList : ICloneable, System.Collections.IDictionary
```

Represents a collection of key/value pairs that are sorted by the keys and are accessible by key and by index.

#### Remarks

A `SortedList` element can be accessed by its key, like an element in any `IDictionary` implementation, or by its index, like an element in any `IList` implementation.

> **Important:**
> We don't recommend that you use the `SortedList` class for new development. Instead, we recommend that you use the generic `SortedList<T1,T2>` class. For more information, see Non-generic collections shouldn't be used on GitHub.

A `SortedList` object internally maintains two arrays to store the elements of the list; that is, one array for the keys and another array for the associated values. Each element is a key/value pair that can be accessed as a `DictionaryEntry` object. A key <example-value> be `null`, but a value can be.

The capacity of a `SortedList` object is the number of elements the `SortedList` can hold. As elements are added to a `SortedList`, the capacity is automatically increased as required through reallocation. The capacity can be decreased by calling `SortedList.TrimToSize` or by setting the `Capacity` property explicitly.

The elements of a `SortedList` object are sorted by the keys either according to a specific `IComparer` implementation specified when the `SortedList` is created or according to the `IComparable` implementation provided by the keys themselves. In either case, a `SortedList` does not allow duplicate keys.

The index sequence is based on the sort sequence. When an element is added, it is inserted into `SortedList` in the correct sort order, and the indexing adjusts accordingly. When an element is removed, the indexing also adjusts accordingly. Therefore, the index of a specific key/value pair might change as elements are added or removed from the `SortedList` object.

Operations on a `SortedList` object tend to be slower than operations on a `Hashtable` object because of the sorting. However, the `SortedList` offers more flexibility by allowing access to the values either through the associated keys or through the indexes.

Elements in this collection can be accessed using an integer index.  Indexes in this collection are zero-based.

The `foreach` statement of the C# language (`for each` in Visual Basic) returns an object of the type of the elements in the collection. Since each element of the `SortedList` object is a key/value pair, the element type is not the type of the key or the type of the value. Rather, the element type is `DictionaryEntry`. For example:

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/Overview/remarks.cs._

The `foreach` statement is a wrapper around the enumerator, which allows only reading from, not writing to, the collection.

#### Examples
The following code example shows how to create and initialize a `SortedList` object and how to print out its keys and values.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/Overview/source.cs._

## SortedList.SortedList() constructor

```csharp
public SortedList ();
```

Initializes a new instance of the `SortedList` class that is empty, has the default initial capacity, and is sorted according to the `IComparable` interface implemented by each key added to the `SortedList` object.

#### Remarks
Each key must implement the `IComparable` interface to be capable of comparisons with every other key in the `SortedList` object. The elements are sorted according to the `IComparable` implementation of each key added to the `SortedList`.

The capacity of a `SortedList` object is the number of elements that the `SortedList` can hold. As elements are added to a `SortedList`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `SortedList` object.

This constructor is an `O(1)` operation.

#### Examples
The following code example creates collections using different `SortedList` constructors and demonstrates the differences in the behavior of the collections.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/.ctor/sortedlist_ctor.cs._

## SortedList.SortedList(IComparer) constructor

```csharp
public SortedList (System.Collections.IComparer? comparer);
```

Initializes a new instance of the `SortedList` class that is empty, has the default initial capacity, and is sorted according to the specified `IComparer` interface.

Parameters:

- `comparer`: The `IComparer` implementation to use when comparing keys.

-or-

`null` to use the `IComparable` implementation of each key.

#### Remarks
The elements are sorted according to the specified `IComparer` implementation. If the `comparer` parameter is `null`, the `IComparable` implementation of each key is used; therefore, each key must implement the `IComparable` interface to be capable of comparisons with every other key in the `SortedList` object.

The capacity of a `SortedList` object is the number of elements that the `SortedList` can hold. As elements are added to a `SortedList`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `SortedList` object.

This constructor is an `O(1)` operation.

#### Examples
The following code example creates collections using different `SortedList` constructors and demonstrates the differences in the behavior of the collections.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/.ctor/sortedlist_ctor.cs._

## SortedList.SortedList(IDictionary) constructor

```csharp
public SortedList (System.Collections.IDictionary d);
```

Initializes a new instance of the `SortedList` class that contains elements copied from the specified dictionary, has the same initial capacity as the number of elements copied, and is sorted according to the `IComparable` interface implemented by each key.

Parameters:

- `d`: The `IDictionary` implementation to copy to a new `SortedList` object.

Exceptions:

- `ArgumentNullException`: `d` is `null`.
- `InvalidCastException`: One or more elements in `d` do not implement the `IComparable` interface.

#### Remarks
Each key must implement the `IComparable` interface to be capable of comparisons with every other key in the `SortedList` object. The elements are sorted according to the `IComparable` implementation of each key added to the `SortedList`.

A `Hashtable` object is an example of an `IDictionary` implementation that can be passed to this constructor. The new `SortedList` object contains a copy of the keys and values stored in the `Hashtable`.

The capacity of a `SortedList` object is the number of elements that the `SortedList` can hold. As elements are added to a `SortedList`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `SortedList` object.

This constructor is an `O(n)` operation, where `n` is the number of elements in `d`.

#### Examples
The following code example creates collections using different `SortedList` constructors and demonstrates the differences in the behavior of the collections.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/.ctor/sortedlist_ctordictionary.cs._

## SortedList.SortedList(Int32) constructor

```csharp
public SortedList (int initialCapacity);
```

Initializes a new instance of the `SortedList` class that is empty, has the specified initial capacity, and is sorted according to the `IComparable` interface implemented by each key added to the `SortedList` object.

Parameters:

- `initialCapacity`: The initial number of elements that the `SortedList` object can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `initialCapacity` is less than zero.
- `OutOfMemoryException`: There is not enough available memory to create a `SortedList` object with the specified `initialCapacity`.

#### Remarks
Each key must implement the `IComparable` interface to be capable of comparisons with every other key in the `SortedList` object. The elements are sorted according to the `IComparable` implementation of each key added to the `SortedList`.

The capacity of a `SortedList` object is the number of elements that the `SortedList` can hold. As elements are added to a `SortedList`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `SortedList` object.

This constructor is an `O(n)` operation, where `n` is `initialCapacity`.

#### Examples
The following code example creates collections using different `SortedList` constructors and demonstrates the differences in the behavior of the collections.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/.ctor/sortedlist_ctorint.cs._

## SortedList.SortedList(IComparer, Int32) constructor

```csharp
public SortedList (System.Collections.IComparer? comparer, int capacity);
```

Initializes a new instance of the `SortedList` class that is empty, has the specified initial capacity, and is sorted according to the specified `IComparer` interface.

Parameters:

- `comparer`: The `IComparer` implementation to use when comparing keys.

-or-

`null` to use the `IComparable` implementation of each key.
- `capacity`: The initial number of elements that the `SortedList` object can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.
- `OutOfMemoryException`: There is not enough available memory to create a `SortedList` object with the specified `capacity`.

#### Remarks
The elements are sorted according to the specified `IComparer` implementation. If the `comparer` parameter is `null`, the `IComparable` implementation of each key is used; therefore, each key must implement the `IComparable` interface to be capable of comparisons with every other key in the `SortedList` object.

The capacity of a `SortedList` object is the number of elements that the `SortedList` can hold. As elements are added to a `SortedList`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `SortedList` object.

This constructor is an `O(n)` operation, where `n` is `capacity`.

#### Examples
The following code example creates collections using different `SortedList` constructors and demonstrates the differences in the behavior of the collections.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/.ctor/sortedlist_ctorint.cs._

## SortedList.SortedList(IDictionary, IComparer) constructor

```csharp
public SortedList (System.Collections.IDictionary d, System.Collections.IComparer? comparer);
```

Initializes a new instance of the `SortedList` class that contains elements copied from the specified dictionary, has the same initial capacity as the number of elements copied, and is sorted according to the specified `IComparer` interface.

Parameters:

- `d`: The `IDictionary` implementation to copy to a new `SortedList` object.
- `comparer`: The `IComparer` implementation to use when comparing keys.

-or-

`null` to use the `IComparable` implementation of each key.

Exceptions:

- `ArgumentNullException`: `d` is `null`.
- `InvalidCastException`: `comparer` is `null`, and one or more elements in `d` do not implement the `IComparable` interface.

#### Remarks
The elements are sorted according to the specified `IComparer` implementation. If the `comparer` parameter is `null`, the `IComparable` implementation of each key is used; therefore, each key must implement the `IComparable` interface to be capable of comparisons with every other key in the `SortedList` object.

A `Hashtable` object is an example of an `IDictionary` implementation that can be passed to this constructor. The new `SortedList` object contains a copy of the keys and values stored in the `Hashtable`.

The capacity of a `SortedList` object is the number of elements that the `SortedList` can hold. As elements are added to a `SortedList`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `SortedList` object.

This constructor is an `O(n)` operation, where `n` is the number of elements in `d`.

#### Examples
The following code example creates collections using different `SortedList` constructors and demonstrates the differences in the behavior of the collections.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/.ctor/sortedlist_ctordictionary.cs._

## SortedList.Capacity property

```csharp
public virtual int Capacity { get; set; }
```

Gets or sets the capacity of a `SortedList` object.

Returns: The number of elements that the `SortedList` object can contain.

Exceptions:

- `ArgumentOutOfRangeException`: The value assigned is less than the current number of elements in the `SortedList` object.
- `OutOfMemoryException`: There is not enough memory available on the system.

#### Remarks
`SortedList.Capacity` is the number of elements that the `SortedList` object can store. `SortedList.Count` is the number of elements that are actually in the `SortedList`.

`SortedList.Capacity` is always greater than or equal to `SortedList.Count`. If `SortedList.Count` exceeds `SortedList.Capacity` while adding elements, the capacity is automatically increased by reallocating the internal array before copying the old elements and adding the new elements.

The capacity can be decreased by calling `SortedList.TrimToSize` or by setting the `Capacity` property explicitly. When the value of `SortedList.Capacity` is set explicitly, the internal array is also reallocated to accommodate the specified capacity.

Retrieving the value of this property is an `O(1)` operation; setting the property is an `O(n)` operation, where `n` is the new capacity.
