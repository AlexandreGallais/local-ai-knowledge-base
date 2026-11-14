---
title: "List<T> class (part 6 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/List`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# List<T> class (part 6 of 9)

## List<T>.FindLastIndex(Int32, Int32, Predicate<T>) method

```csharp
public int FindLastIndex (int startIndex, int count, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the `List<T>` that contains the specified number of elements and ends at the specified index.

Parameters:

- `startIndex`: The zero-based starting index of the backward search.
- `count`: The number of elements in the section to search.
- `match`: The `Predicate<T>` delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the last occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `match` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for the `List<T>`.

-or-

`count` is less than 0.

-or-

`startIndex` and `count` do not specify a valid section in the `List<T>`.

#### Remarks
The `List<T>` is searched backward starting at `startIndex` and ending at `startIndex` minus `count` plus 1, if `count` is greater than 0.

The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of the current `List<T>` are individually passed to the `Predicate<T>` delegate.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `count`.

#### Examples
The following example demonstrates the find methods for the `List<T>` class. The example for the `List<T>` class contains `book` objects, of class `Book`, using the data from the Sample XML File: Books (LINQ to XML). The `FillList` method in the example uses LINQ to XML to parse the values from the XML to property values of the `book` objects.

The following table describes the examples provided for the find methods.

|Method|Example|
|------------|-------------|
|`Find`|Finds a book by an ID using the `IDToFind` predicate delegate. C# example uses an anonymous delegate.|
|`FindAll`|Find all books that whose `Genre` property is "Computer" using the `FindComputer` predicate delegate.|
|`FindLast`|Finds the last book in the collection that has a publish date before 2001, using the `PubBefore2001` predicate delegate. C# example uses an anonymous delegate.|
|`FindIndex`|Finds the index of first computer book using the `FindComputer` predicate delegate.|
|`FindLastIndex`|Finds the index of the last computer book using the `FindComputer` predicate delegate.|
|`FindIndex`|Finds the index of first computer book in the second half of the collection, using the `FindComputer` predicate delegate.|
|`FindLastIndex`|Finds the index of last computer book in the second half of the collection, using the `FindComputer` predicate delegate.|

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Find/program.cs._

## List<T>.ForEach(Action<T>) method

```csharp
public void ForEach (Action<T> action);
```

Performs the specified action on each element of the `List<T>`.

Parameters:

- `action`: The `Action<T>` delegate to perform on each element of the `List<T>`.

Exceptions:

- `ArgumentNullException`: `action` is `null`.
- `InvalidOperationException`: An element in the collection has been modified.

#### Remarks
The `Action<T>` is a delegate to a method that performs an action on the object passed to it.  The elements of the current `List<T>` are individually passed to the `Action<T>` delegate.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

Modifying the underlying collection in the body of the `Action<T>` delegate is not supported and causes undefined behavior.

#### Examples
The following example demonstrates the use of the `Action<T>` delegate to print the contents of a `List<T>` object. In this example the `Print` method is used to display the contents of the list to the console.

> **Note:**
> In addition to displaying the contents using the `Print` method, the C# example demonstrates the use of anonymous methods to display the results to the console.

_Code sample not included: ~/snippets/csharp/System/ActionT/Overview/action.cs._

## List<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.List<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `List<T>`.

Returns: A `Enumerator` for the `List<T>`.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, the `Current` property is undefined. Therefore, you must call the `Enumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `Enumerator.Current`.

The `Current` property returns the same object until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Enumerator.Current` to the next element.

If `Enumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `Enumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `Enumerator.MoveNext` also return `false`. If the last call to `Enumerator.MoveNext` returned `false`, `Enumerator.Current` is undefined. You cannot set `Enumerator.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(1) operation.

## List<T>.GetRange(Int32, Int32) method

```csharp
public System.Collections.Generic.List<T> GetRange (int index, int count);
```

Creates a shallow copy of a range of elements in the source `List<T>`.

Parameters:

- `index`: The zero-based `List<T>` index at which the range starts.
- `count`: The number of elements in the range.

Returns: A shallow copy of a range of elements in the source `List<T>`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`count` is less than 0.
- `ArgumentException`: `index` and `count` do not denote a valid range of elements in the `List<T>`.

#### Remarks
A shallow copy of a collection of reference types, or a subset of that collection, contains only the references to the elements of the collection. The objects themselves are not copied. The references in the new list point to the same objects as the references in the original list.

A shallow copy of a collection of value types, or a subset of that collection, contains the elements of the collection. However, if the elements of the collection contain references to other objects, those objects are not copied. The references in the elements of the new collection point to the same objects as the references in the elements of the original collection.

In contrast, a deep copy of a collection copies the elements and everything directly or indirectly referenced by the elements.

This method is an O(*n*) operation, where *n* is `count`.

#### Examples
The following example demonstrates the `List<T>.GetRange` method and other methods of the `List<T>` class that act on ranges. At the end of the example, the `List<T>.GetRange` method is used to get three items from the list, beginning with index location 2. The `List<T>.ToArray` method is called on the resulting `List<T>`, creating an array of three elements. The elements of the array are displayed.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/.ctor/source1.cs._

## List<T>.IndexOf(T) method

```csharp
public int IndexOf (T item);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the entire `List<T>`.

Parameters:

- `item`: The object to locate in the `List<T>`. The value can be `null` for reference types.

Returns: The zero-based index of the first occurrence of `item` within the entire `List<T>`, if found; otherwise, -1.

#### Remarks
The `List<T>` is searched forward starting at the first element and ending at the last element.

This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `List<T>.Count`.

## List<T>.IndexOf(T, Int32) method

```csharp
public int IndexOf (T item, int index);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the range of elements in the `List<T>` that extends from the specified index to the last element.

Parameters:

- `item`: The object to locate in the `List<T>`. The value can be `null` for reference types.
- `index`: The zero-based starting index of the search. 0 (zero) is valid in an empty list.

Returns: The zero-based index of the first occurrence of `item` within the range of elements in the `List<T>` that extends from `index` to the last element, if found; otherwise, -1.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes for the `List<T>`.

#### Remarks
The `List<T>` is searched forward starting at `index` and ending at the last element.

This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is the number of elements from `index` to the end of the `List<T>`.

## List<T>.IndexOf(T, Int32, Int32) method

```csharp
public int IndexOf (T item, int index, int count);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the range of elements in the `List<T>` that starts at the specified index and contains the specified number of elements.

Parameters:

- `item`: The object to locate in the `List<T>`. The value can be `null` for reference types.
- `index`: The zero-based starting index of the search. 0 (zero) is valid in an empty list.
- `count`: The number of elements in the section to search.

Returns: The zero-based index of the first occurrence of `item` within the range of elements in the `List<T>` that starts at `index` and contains `count` number of elements, if found; otherwise, -1.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes for the `List<T>`.

-or-

`count` is less than 0.

-or-

`index` and `count` do not specify a valid section in the `List<T>`.

#### Remarks
The `List<T>` is searched forward starting at `index` and ending at `index` plus `count` minus 1, if `count` is greater than 0.

This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `count`.

## List<T>.Insert(Int32, T) method

```csharp
public void Insert (int index, T item);
```

Inserts an element into the `List<T>` at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert. The value can be `null` for reference types.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`index` is greater than `List<T>.Count`.

#### Remarks
`List<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

If `List<T>.Count` already equals `List<T>.Capacity`, the capacity of the `List<T>` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

If `index` is equal to `List<T>.Count`, `item` is added to the end of `List<T>`.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples

The following example demonstrates how to add, remove, and insert a simple business object in a `List<T>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/program.cs._

The following example demonstrates the `List<T>.Insert` method, along with various other properties and methods of the `List<T>` generic class. After the list is created, elements are added. The `List<T>.Insert` method is used to insert an item into the middle of the list. The item inserted is a duplicate, which is later removed using the `List<T>.Remove` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/source.cs._
