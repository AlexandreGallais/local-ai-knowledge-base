---
title: "Collection<T> class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/Collection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Collection<T> class (part 2 of 3)

## Collection<T>.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `IList`.
- `ArgumentException`: The property is set and the value is of a type that is not assignable to the `IList`.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.

The C# language uses the this keyword to define the indexers instead of implementing the `Collection<T>.System%23Collections%23IList%23Item` property. Visual Basic <example-value> `Collection<T>.System%23Collections%23IList%23Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(1) operation; setting the property is also an O(1) operation.

## Collection<T>.Add(T) method

```csharp
public void Add (T item);
```

Adds an object to the end of the `Collection<T>`.

Parameters:

- `item`: The object to be added to the end of the `Collection<T>`. The value can be `null` for reference types.

#### Remarks
`Collection<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

This method is an O(1) operation.

#### Examples
The following code example demonstrates many of the properties and methods of `Collection<T>`. The code example creates a collection of strings, uses the `Collection<T>.Add` method to add several strings, displays the `Collection<T>.Count`, and lists the strings. The example uses the `Collection<T>.IndexOf` method to find the index of a string and the `Collection<T>.Contains` method to determine whether a string is in the collection. The example inserts a string using the `Collection<T>.Insert` method and retrieves and sets strings using the default `Collection<T>.Item` property (the indexer in C#). The example removes strings by string identity using the `Collection<T>.Remove` method and by index using the `Collection<T>.RemoveAt` method. Finally, the `Collection<T>.Clear` method is used to clear all strings from the collection.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source.cs._

## Collection<T>.Clear() method

```csharp
public void Clear ();
```

Removes all elements from the `Collection<T>`.

#### Remarks
`Collection<T>.Count` is set to zero, and references to other objects from elements of the collection are also released.

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

#### Examples
The following code example demonstrates many of the properties and methods of `Collection<T>`. The code example creates a collection of strings, uses the `Collection<T>.Add` method to add several strings, displays the `Collection<T>.Count`, and lists the strings. The example uses the `Collection<T>.IndexOf` method to find the index of a string and the `Collection<T>.Contains` method to determine whether a string is in the collection. The example inserts a string using the `Collection<T>.Insert` method and retrieves and sets strings using the default `Collection<T>.Item` property (the indexer in C#). The example removes strings by string identity using the `Collection<T>.Remove` method and by index using the `Collection<T>.RemoveAt` method. Finally, the `Collection<T>.Clear` method is used to clear all strings from the collection.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source.cs._

## Collection<T>.ClearItems() method

```csharp
protected virtual void ClearItems ();
```

Removes all elements from the `Collection<T>`.

#### Remarks
`Collection<T>.Count` is set to zero, and references to other objects from elements of the collection are also released.

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

#### Examples
The following code example shows how to derive a collection class from a constructed type of the `Collection<T>` generic class, and how to override the protected `Collection<T>.InsertItem`, `Collection<T>.RemoveItem`, `Collection<T>.ClearItems`, and `Collection<T>.SetItem` methods to provide custom behavior for the `Collection<T>.Add`, `Collection<T>.Insert`, `Collection<T>.Remove`, and `Collection<T>.Clear` methods, and for setting the `Collection<T>.Item` property.

The custom behavior provided by this example is a `Changed` notification event that is raised at the end of each of the protected methods. The `Dinosaurs` class inherits `Collection<string>` (`Collection(Of String)` in Visual Basic) and defines the `Changed` event, which uses a `DinosaursChangedEventArgs` class for the event information, and an enumeration to identify the kind of change.

The code example calls several properties and methods of `Collection<T>` to demonstrate the custom event.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source1.cs._

## Collection<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether an element is in the `Collection<T>`.

Parameters:

- `item`: The object to locate in the `Collection<T>`. The value can be `null` for reference types.

Returns: `true` if `item` is found in the `Collection<T>`; otherwise, `false`.

#### Remarks
If the `Collection<T>` object is created using the parameterless constructor, this method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the list. If type `T` does not implement the `IEquatable<T>` interface, the `Object.Equals` method is used.

If the Collection object is created by passing an `IList<T>` object to the constructor, the `Collection<T>.Contains` method will be determined by the `IEqualityComparer<T>` interface used by that `IList<T>` object.

This method performs a linear search; therefore, the average execution time is proportional to `Collection<T>.Count`. That is, this method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

## Collection<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int index);
```

Copies the entire `Collection<T>` to a compatible one-dimensional `Array`, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `Collection<T>`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: The number of elements in the source `Collection<T>` is greater than the available space from `index` to the end of the destination `array`.

#### Remarks
This method uses `Array.Copy` to copy the elements.

The elements are copied to the `Array` in the same order in which the enumerator iterates through the `Collection<T>`.

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

## Collection<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<T> GetEnumerator ();
```

Returns an enumerator that iterates through the `Collection<T>`.

Returns: An `IEnumerator<T>` for the `Collection<T>`.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, `IEnumerator<T>.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.

`IEnumerator<T>.Current` returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator<T>.Current` is undefined. You cannot set `IEnumerator<T>.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration. To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.

## Collection<T>.IndexOf(T) method

```csharp
public int IndexOf (T item);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the entire `Collection<T>`.

Parameters:

- `item`: The object to locate in the `Collection<T>`. The value can be `null` for reference types.

Returns: The zero-based index of the first occurrence of `item` within the entire `Collection<T>`, if found; otherwise, -1.

#### Remarks
The `Collection<T>` is searched forward starting at the first element and ending at the last element.

This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, the average execution time is proportional to `Collection<T>.Count`. That is, this method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

#### Examples
The following code example demonstrates many of the properties and methods of `Collection<T>`. The code example creates a collection of strings, uses the `Collection<T>.Add` method to add several strings, displays the `Collection<T>.Count`, and lists the strings. The example uses the `Collection<T>.IndexOf` method to find the index of a string and the `Collection<T>.Contains` method to determine whether a string is in the collection. The example inserts a string using the `Collection<T>.Insert` method and retrieves and sets strings using the default `Collection<T>.Item` property (the indexer in C#). The example removes strings by string identity using the `Collection<T>.Remove` method and by index using the `Collection<T>.RemoveAt` method. Finally, the `Collection<T>.Clear` method is used to clear all strings from the collection.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source.cs._

## Collection<T>.Insert(Int32, T) method

```csharp
public void Insert (int index, T item);
```

Inserts an element into the `Collection<T>` at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert. The value can be `null` for reference types.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than `Collection<T>.Count`.

#### Remarks
`Collection<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

If `index` is equal to `Collection<T>.Count`, `item` is added to the end of `Collection<T>`.

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

## Collection<T>.InsertItem(Int32, T) method

```csharp
protected virtual void InsertItem (int index, T item);
```

Inserts an element into the `Collection<T>` at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert. The value can be `null` for reference types.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than `Collection<T>.Count`.

#### Remarks
The `Collection<T>.InsertItem` is meant to be overridden in a derived class. For a public method to insert an item in the `Collection<T>`, see `Collection<T>.Insert`.

`Collection<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

If `index` is equal to `Collection<T>.Count`, `item` is added to the end of `Collection<T>`.

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

#### Examples
The following code example shows how to derive a collection class from a constructed type of the `Collection<T>` generic class, and how to override the protected `Collection<T>.InsertItem`, `Collection<T>.RemoveItem`, `Collection<T>.ClearItems`, and `Collection<T>.SetItem` methods to provide custom behavior for the `Collection<T>.Add`, `Collection<T>.Insert`, `Collection<T>.Remove`, and `Collection<T>.Clear` methods, and for setting the `Collection<T>.Item` property.

The custom behavior provided by this example is a `Changed` notification event that is raised at the end of each of the protected methods. The `Dinosaurs` class inherits `Collection<string>` (`Collection(Of String)` in Visual Basic) and defines the `Changed` event, which uses a `DinosaursChangedEventArgs` class for the event information, and an enumeration to identify the kind of change.

The code example calls several properties and methods of `Collection<T>` to demonstrate the custom event.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source1.cs._
