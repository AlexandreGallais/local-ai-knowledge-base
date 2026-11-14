---
title: "List<T> class (part 1 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/List`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# List<T> class

Namespace: `System.Collections.Generic`

```csharp
public class List<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IList<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlyList<T>, System.Collections.IList
```

Represents a strongly typed list of objects that can be accessed by index. Provides methods to search, sort, and manipulate lists.

Parameters:

- `T`: The type of elements in the list.

The `List<T>` class is the generic equivalent of the `ArrayList` class. It implements the `IList<T>` generic interface by using an array whose size is dynamically increased as required.

You can add items to a `List<T>` by using the `List<T>.Add` or `List<T>.AddRange` methods.

The `List<T>` class uses both an equality comparer and an ordering comparer.

- Methods such as `List<T>.Contains`, `List<T>.IndexOf`, `List<T>.LastIndexOf`, and `Dictionary<T1,T2>.Remove` use an equality comparer for the list elements. The default equality comparer for type `T` is determined as follows. If type `T` implements the `IEquatable<T>` generic interface, then the equality comparer is the `Equals` method of that interface; otherwise, the default equality comparer is `Equals`.

- Methods such as `List<T>.BinarySearch` and `List<T>.Sort` use an ordering comparer for the list elements. The default comparer for type `T` is determined as follows. If type `T` implements the `IComparable<T>` generic interface, then the default comparer is the `CompareTo` method of that interface; otherwise, if type `T` implements the nongeneric `IComparable` interface, then the default comparer is the `CompareTo` method of that interface. If type `T` implements neither interface, then there is no default comparer, and a comparer or comparison delegate must be provided explicitly.

The `List<T>` is not guaranteed to be sorted. You must sort the `List<T>` before performing operations (such as `List<T>.BinarySearch`) that require the `List<T>` to be sorted.

Elements in this collection can be accessed using an integer index. Indexes in this collection are zero-based.

`List<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

For an immutable version of the `List<T>` class, see `ImmutableList<T>`.

#### Performance considerations

In deciding whether to use the `List<T>` or `ArrayList` class, both of which have similar functionality, remember that the `List<T>` class performs better in most cases and is type safe. If a reference type is used for type `T` of the `List<T>` class, the behavior of the two classes is identical. However, if a value type is used for type `T`, you need to consider implementation and boxing issues.

If a value type is used for type `T`, the compiler generates an implementation of the `List<T>` class specifically for that value type. That means a list element of a `List<T>` object does not have to be boxed before the element can be used, and after about 500 list elements are created, the memory saved by not boxing list elements is greater than the memory used to generate the class implementation.

Make certain the value type used for type `T` implements the `IEquatable<T>` generic interface. If not, methods such as `List<T>.Contains` must call the `Equals` method, which boxes the affected list element. If the value type implements the `IComparable` interface and you own the source code, also implement the `IComparable<T>` generic interface to prevent the `List<T>.BinarySearch` and `List<T>.Sort` methods from boxing list elements. If you do not own the source code, pass an `IComparer<T>` object to the `List<T>.BinarySearch` and `List<T>.Sort` methods.

It's to your advantage to use the type-specific implementation of the `List<T>` class instead of using the `ArrayList` class or writing a strongly typed wrapper collection yourself. That's because your implementation must do what .NET does for you already, and the .NET runtime can share common intermediate language code and metadata, which your implementation cannot.

#### F# considerations

The `List<T>` class is used infrequently in F# code. Instead, Lists, which are immutable, singly-linked lists, are typically preferred. An F# `List` provides an ordered, immutable series of values, and is supported for use in functional-style development. When used from F#, the `List<T>` class is typically referred to by the `ResizeArray<'T>` type abbreviation to avoid naming conflicts with F# Lists.

#### Examples

The following example demonstrates how to add, remove, and insert a simple business object in a `List<T>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/program.cs._

The following example demonstrates several properties and methods of the `List<T>` generic class of type string. (For an example of a `List<T>` of complex types, see the `List<T>.Contains` method.)

The parameterless constructor is used to create a list of strings with the default capacity. The `Capacity` property is displayed and then the `List<T>.Add` method is used to add several items. The items are listed, and the `Capacity` property is displayed again, along with the `Count` property, to show that the capacity has been increased as needed.

The `List<T>.Contains` method is used to test for the presence of an item in the list, the `List<T>.Insert` method is used to insert a new item in the middle of the list, and the contents of the list are displayed again.

The default `Item` property (the indexer in C#) is used to retrieve an item, the `List<T>.Remove` method is used to remove the first instance of the duplicate item added earlier, and the contents are displayed again. The `List<T>.Remove` method always removes the first instance it encounters.

The `List<T>.TrimExcess` method is used to reduce the capacity to match the count, and the `Capacity` and `Count` properties are displayed. If the unused capacity had been less than 10 percent of total capacity, the list would not have been resized.

Finally, the `List<T>.Clear` method is used to remove all items from the list, and the `Capacity` and `Count` properties are displayed.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/source.cs._

## List<T>.List() constructor

```csharp
public List ();
```

Initializes a new instance of the `List<T>` class that is empty and has the default initial capacity.

#### Remarks
The capacity of a `List<T>` is the number of elements that the `List<T>` can hold. As elements are added to a `List<T>`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, using the `%23ctor` constructor and specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `List<T>`.

The capacity can be decreased by calling the `List<T>.TrimExcess` method or by setting the `Capacity` property explicitly. Decreasing the capacity reallocates memory and copies all the elements in the `List<T>`.

This constructor is an O(1) operation.

#### Examples

The following example demonstrates the parameterless constructor of the `List<T>` generic class. The parameterless constructor creates a list with the default capacity, as demonstrated by displaying the `Capacity` property.

The example adds, inserts, and removes items, showing how the capacity changes as these methods are used.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/source.cs._

## List<T>.List(IEnumerable<T>) constructor

```csharp
public List (System.Collections.Generic.IEnumerable<T> collection);
```

Initializes a new instance of the `List<T>` class that contains elements copied from the specified collection and has sufficient capacity to accommodate the number of elements copied.

Parameters:

- `collection`: The collection whose elements are copied to the new list.

Exceptions:

- `ArgumentNullException`: `collection` is `null`.

#### Remarks
The elements are copied onto the `List<T>` in the same order they are read by the enumerator of the collection.

This constructor is an O(*n*) operation, where *n* is the number of elements in `collection`.

#### Examples
The following example demonstrates the `List<T>.%23ctor` constructor and various methods of the `List<T>` class that act on ranges. An array of strings is created and passed to the constructor, populating the list with the elements of the array. The `Capacity` property is then displayed, to show that the initial capacity is exactly what is required to hold the input elements.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/.ctor/source1.cs._

## List<T>.List(Int32) constructor

```csharp
public List (int capacity);
```

Initializes a new instance of the `List<T>` class that is empty and has the specified initial capacity.

Parameters:

- `capacity`: The number of elements that the new list can initially store.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than 0.

#### Remarks
The capacity of a `List<T>` is the number of elements that the `List<T>` can hold. As elements are added to a `List<T>`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `List<T>`.

The capacity can be decreased by calling the `List<T>.TrimExcess` method or by setting the `Capacity` property explicitly. Decreasing the capacity reallocates memory and copies all the elements in the `List<T>`.

This constructor is an O(1) operation.

> **Caution:**
> If `capacity` comes from user input, prefer using the parameterless constructor and letting the collection resize as elements are added. If you must use a user-specified value, either clamp it to a reasonable limit (for example, `Math.Clamp(untrustedValue, 0, 20)`) or verify that the element count matches the specified value.

#### Examples
The following example demonstrates the `%23ctor` constructor. A `List<T>` of strings with a capacity of 4 is created, because the ultimate size of the list is known to be exactly 4. The list is populated with four strings, and a read-only copy is created by using the `List<T>.AsReadOnly` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/.ctor/source.cs._

## List<T>.Capacity property

```csharp
public int Capacity { get; set; }
```

Gets or sets the total number of elements the internal data structure can hold without resizing.

Returns: The number of elements that the `List<T>` can contain before resizing is required.

Exceptions:

- `ArgumentOutOfRangeException`: `List<T>.Capacity` is set to a value that is less than `List<T>.Count`.
- `OutOfMemoryException`: There is not enough memory available on the system.

#### Remarks
`List<T>.Capacity` is the number of elements that the `List<T>` can store before resizing is required, whereas `List<T>.Count` is the number of elements that are actually in the `List<T>`.

`List<T>.Capacity` is always greater than or equal to `List<T>.Count`. If `List<T>.Count` exceeds `List<T>.Capacity` while adding elements, the capacity is increased by automatically reallocating the internal array before copying the old elements and adding the new elements.

If the capacity is significantly larger than the count and you want to reduce the memory used by the `List<T>`, you can decrease capacity by calling the `List<T>.TrimExcess` method or by setting the `Capacity` property explicitly to a lower value. When the value of `List<T>.Capacity` is set explicitly, the internal array is also reallocated to accommodate the specified capacity, and all the elements are copied.

Retrieving the value of this property is an O(1) operation; setting the property is an O(*n*) operation, where *n* is the new capacity.

#### Examples

The following example demonstrates how to check the capacity and count of a `List<T>` that contains a simple business object, and illustrates using the `List<T>.TrimExcess` method to remove extra capacity.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Capacity/program.cs._

The following example shows the `Capacity` property at several points in the life of a list. The parameterless constructor is used to create a list of strings with a capacity of 0, and the `Capacity` property is displayed to demonstrate this. After the `List<T>.Add` method has been used to add several items, the items are listed, and then the `Capacity` property is displayed again, along with the `Count` property, to show that the capacity has been increased as needed.

The `Capacity` property is displayed again after the `List<T>.TrimExcess` method is used to reduce the capacity to match the count. Finally, the `List<T>.Clear` method is used to remove all items from the list, and the `List<T>.Capacity` and `List<T>.Count` properties are displayed again.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/source.cs._

## List<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `List<T>`.

Returns: The number of elements contained in the `List<T>`.

#### Remarks
`List<T>.Capacity` is the number of elements that the `List<T>` can store before resizing is required. `List<T>.Count` is the number of elements that are actually in the `List<T>`.

`List<T>.Capacity` is always greater than or equal to `List<T>.Count`. If `List<T>.Count` exceeds `List<T>.Capacity` while adding elements, the capacity is increased by automatically reallocating the internal array before copying the old elements and adding the new elements.

Retrieving the value of this property is an O(1) operation.

#### Examples

The following example demonstrates how to check the capacity and count of a  `List<T>` that contains a simple business object, and illustrates using the `List<T>.TrimExcess` method to remove extra capacity.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Capacity/program.cs._

The following example shows the value of the `Count` property at various points in the life of a list. After the list has been created and populated and its elements displayed, the `List<T>.Capacity` and `List<T>.Count` properties are displayed. These properties are displayed again after the `List<T>.TrimExcess` method has been called, and again after the contents of the list are cleared.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/source.cs._
