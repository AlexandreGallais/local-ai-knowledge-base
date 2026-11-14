---
title: "ArrayList class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/ArrayList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArrayList class

Namespace: `System.Collections`

```csharp
public class ArrayList : ICloneable, System.Collections.IList
```

Implements the `IList` interface using an array whose size is dynamically increased as required.

#### Remarks

> **Important:**
> We don't recommend that you use the `ArrayList` class for new development. Instead, use the generic `List<T>` class.
> The `ArrayList` class is designed to hold heterogeneous collections of objects. However, it does not always offer the best performance. Instead, we recommend the following:
> - For a heterogeneous collection of objects, use the `List<Object>` (in C#) or `List(Of Object)` (in Visual Basic) type.
> - For a homogeneous collection of objects, use the `List<T>` class.
> For a discussion of the relative performance of these classes, see Performance Considerations. For general information on the use of generic instead of non-generic collection types, see Non-generic collections shouldn't be used.

The `ArrayList` is not guaranteed to be sorted. You must sort the `ArrayList` by calling its `ArrayList.Sort` method prior to performing operations (such as `ArrayList.BinarySearch`) that require the `ArrayList` to be sorted. To maintain a collection that is automatically sorted as new elements are added, you can use the `SortedSet<T>` class.

The capacity of an `ArrayList` is the number of elements the `ArrayList` can hold. As elements are added to an `ArrayList`, the capacity is automatically increased as required through reallocation. The capacity can be decreased by calling `ArrayList.TrimToSize` or by setting the `Capacity` property explicitly.

Elements in this collection can be accessed using an integer index. Indexes in this collection are zero-based.

The `ArrayList` collection accepts `null` as a valid value. It also allows duplicate elements.

Using multidimensional arrays as elements in an `ArrayList` collection is not supported.

#### Examples

The following example shows how to create and initialize an `ArrayList` and how to display its values.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Overview/source.cs._

## ArrayList.ArrayList() constructor

```csharp
public ArrayList ();
```

Initializes a new instance of the `ArrayList` class that is empty and has the default initial capacity.

#### Remarks
The capacity of an `ArrayList` is the number of elements that the `ArrayList` can hold. As elements are added to an `ArrayList`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `ArrayList`.

This constructor is an `O(1)` operation.

## ArrayList.ArrayList(ICollection) constructor

```csharp
public ArrayList (System.Collections.ICollection c);
```

Initializes a new instance of the `ArrayList` class that contains elements copied from the specified collection and that has the same initial capacity as the number of elements copied.

Parameters:

- `c`: The `ICollection` whose elements are copied to the new list.

Exceptions:

- `ArgumentNullException`: `c` is `null`.
- `RankException`: `c` is a multidimensional array.

#### Remarks
The capacity of an `ArrayList` is the number of elements that the `ArrayList` can hold. As elements are added to an `ArrayList`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `ArrayList`.

The elements are copied onto the `ArrayList` in the same order they are read by the `IEnumerator` of the `ICollection`.

This constructor is an `O(n)` operation, where `n` is the number of elements in `c`.

## ArrayList.ArrayList(Int32) constructor

```csharp
public ArrayList (int capacity);
```

Initializes a new instance of the `ArrayList` class that is empty and has the specified initial capacity.

Parameters:

- `capacity`: The number of elements that the new list can initially store.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
The capacity of an `ArrayList` is the number of elements that the `ArrayList` can hold. As elements are added to an `ArrayList`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `ArrayList`.

This constructor is an `O(n)` operation, where `n` is `capacity`.

> **Caution:**
> If `capacity` comes from user input, prefer using the parameterless constructor and letting the collection resize as elements are added. If you must use a user-specified value, either clamp it to a reasonable limit (for example, `Math.Clamp(untrustedValue, 0, 20)`) or verify that the element count matches the specified value.

## ArrayList.Capacity property

```csharp
public virtual int Capacity { get; set; }
```

Gets or sets the number of elements that the `ArrayList` can contain.

Returns: The number of elements that the `ArrayList` can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `ArrayList.Capacity` is set to a value that is less than `ArrayList.Count`.
- `OutOfMemoryException`: There is not enough memory available on the system.

#### Remarks
`ArrayList.Capacity` is the number of elements that the `ArrayList` can store. `ArrayList.Count` is the number of elements that are actually in the `ArrayList`.

`ArrayList.Capacity` is always greater than or equal to `ArrayList.Count`. If `ArrayList.Count` exceeds `ArrayList.Capacity` while adding elements, the capacity is automatically increased by reallocating the internal array before copying the old elements and adding the new elements.

The capacity can be decreased by calling `ArrayList.TrimToSize` or by setting the `Capacity` property explicitly. When the value of `ArrayList.Capacity` is set explicitly, the internal array is also reallocated to accommodate the specified capacity.

Retrieving the value of this property is an `O(1)` operation; setting the property is an `O(n)` operation, where `n` is the new capacity.

## ArrayList.Count property

```csharp
public virtual int Count { get; }
```

Gets the number of elements actually contained in the `ArrayList`.

Returns: The number of elements actually contained in the `ArrayList`.

#### Remarks
`ArrayList.Capacity` is the number of elements that the `ArrayList` can store. `ArrayList.Count` is the number of elements that are actually in the `ArrayList`.

`ArrayList.Capacity` is always greater than or equal to `ArrayList.Count`. If `ArrayList.Count` exceeds `ArrayList.Capacity` while adding elements, the capacity is automatically increased by reallocating the internal array before copying the old elements and adding the new elements.

Retrieving the value of this property is an `O(1)` operation.

## ArrayList.IsFixedSize property

```csharp
public virtual bool IsFixedSize { get; }
```

Gets a value indicating whether the `ArrayList` has a fixed size.

Returns: `true` if the `ArrayList` has a fixed size; otherwise, `false`. The default is `false`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Retrieving the value of this property is an `O(1)` operation.

#### Examples
The following code example shows how to create a fixed-size wrapper around an `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/IsFixedSize/source.cs._

## ArrayList.IsReadOnly property

```csharp
public virtual bool IsReadOnly { get; }
```

Gets a value indicating whether the `ArrayList` is read-only.

Returns: `true` if the `ArrayList` is read-only; otherwise, `false`. The default is `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an `O(1)` operation.

#### Examples
The following code example shows how to create a read-only wrapper around an `ArrayList` and how to determine if an `ArrayList` is read-only.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/ReadOnly/source.cs._

## ArrayList.IsSynchronized property

```csharp
public virtual bool IsSynchronized { get; }
```

Gets a value indicating whether access to the `ArrayList` is synchronized (thread safe).

Returns: `true` if access to the `ArrayList` is synchronized (thread safe); otherwise, `false`. The default is `false`.

#### Remarks
To guarantee the thread safety of the `ArrayList`, all operations must be done through the wrapper returned by the `ArrayList.Synchronized` method.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `ArrayList.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/IsSynchronized/source2.cs._

Retrieving the value of this property is an `O(1)` operation.

The following code example shows how to synchronize an `ArrayList`, determine if an `ArrayList` is synchronized and use a synchronized `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/IsSynchronized/source.cs._

## ArrayList.Item property

```csharp
public virtual object? this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `ArrayList.Count`.

#### Remarks
The `ArrayList.Item` returns an `Object`, so you may need to cast the returned value to the original type in order to manipulate it. It is important to note that `ArrayList` is not a strongly-typed collection. For a strongly-typed alternative, see `List<T>`.

`ArrayList` accepts `null` as a valid value and allows duplicate elements.

This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.

The C# language uses the `this` keyword to define the indexers instead of implementing the `ArrayList.Item` property. Visual Basic <example-value> `ArrayList.Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an `O(1)` operation; setting the property is also an `O(1)` operation.

#### Examples
The following code example creates an `ArrayList` and adds several items. The example demonstrates accessing elements with the `ArrayList.Item` property (the indexer in C#), and changing an element by assigning a new value to the `ArrayList.Item` property for a specified index. The example also shows that the `ArrayList.Item` property cannot be used to access or add elements outside the current size of the list.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Item/source.cs._

The following example uses the `ArrayList.Item` property explicitly to assign values to items in the list. The example defines a class that inherits an `ArrayList` and adds a method to scramble the list items.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Item/source2.cs._

## ArrayList.SyncRoot property

```csharp
public virtual object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ArrayList`.

Returns: An object that can be used to synchronize access to the `ArrayList`.

#### Remarks
To create a synchronized version of the `ArrayList`, use the `ArrayList.Synchronized` method. However, derived classes can provide their own synchronized version of the `ArrayList` using the `SyncRoot` property. The synchronizing code must perform operations on the `ArrayList.SyncRoot` of the `ArrayList`, not directly on the `ArrayList`. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `ArrayList` object.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `ArrayList.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/IsSynchronized/source2.cs._

Retrieving the value of this property is an `O(1)` operation.

## ArrayList.Adapter(IList) method

```csharp
public static System.Collections.ArrayList Adapter (System.Collections.IList list);
```

Creates an `ArrayList` wrapper for a specific `IList`.

Parameters:

- `list`: The `IList` to wrap.

Returns: The `ArrayList` wrapper around the `IList`.

Exceptions:

- `ArgumentNullException`: `list` is `null`.

`ArrayList.Adapter` does not copy the contents of `IList`. Instead, it only creates an `ArrayList` wrapper around `IList`; therefore, changes to the `IList` also affect the `ArrayList`.

The `ArrayList` class provides generic `ArrayList.Reverse`, `ArrayList.BinarySearch` and `ArrayList.Sort` methods. This wrapper can be a means to use those methods on `IList`; however, performing these generic operations through the wrapper might be less efficient than operations applied directly on the `IList`.

This method is an `O(1)` operation.
