---
title: "Collection<T> class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/Collection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Collection<T> class (part 3 of 3)

## Collection<T>.Remove(T) method

```csharp
public bool Remove (T item);
```

Removes the first occurrence of a specific object from the `Collection<T>`.

Parameters:

- `item`: The object to remove from the `Collection<T>`. The value can be `null` for reference types.

Returns: `true` if `item` is successfully removed; otherwise, `false`. This method also returns `false` if `item` was not found in the original `Collection<T>`.

#### Remarks
This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `T`, the type of values in the list.

This method performs a linear search; therefore, the average execution time is proportional to `Collection<T>.Count`. That is, this method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

#### Examples
The following code example demonstrates many of the properties and methods of `Collection<T>`. The code example creates a collection of strings, uses the `Collection<T>.Add` method to add several strings, displays the `Collection<T>.Count`, and lists the strings. The example uses the `Collection<T>.IndexOf` method to find the index of a string and the `Collection<T>.Contains` method to determine whether a string is in the collection. The example inserts a string using the `Collection<T>.Insert` method and retrieves and sets strings using the default `Collection<T>.Item` property (the indexer in C#). The example removes strings by string identity using the `Collection<T>.Remove` method and by index using the `Collection<T>.RemoveAt` method. Finally, the `Collection<T>.Clear` method is used to clear all strings from the collection.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source.cs._

## Collection<T>.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the element at the specified index of the `Collection<T>`.

Parameters:

- `index`: The zero-based index of the element to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `Collection<T>.Count`.

#### Remarks
This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

#### Examples
The following code example demonstrates many of the properties and methods of `Collection<T>`. The code example creates a collection of strings, uses the `Collection<T>.Add` method to add several strings, displays the `Collection<T>.Count`, and lists the strings. The example uses the `Collection<T>.IndexOf` method to find the index of a string and the `Collection<T>.Contains` method to determine whether a string is in the collection. The example inserts a string using the `Collection<T>.Insert` method and retrieves and sets strings using the default `Collection<T>.Item` property (the indexer in C#). The example removes strings by string identity using the `Collection<T>.Remove` method and by index using the `Collection<T>.RemoveAt` method. Finally, the `Collection<T>.Clear` method is used to clear all strings from the collection.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source.cs._

## Collection<T>.RemoveItem(Int32) method

```csharp
protected virtual void RemoveItem (int index);
```

Removes the element at the specified index of the `Collection<T>`.

Parameters:

- `index`: The zero-based index of the element to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `Collection<T>.Count`.

#### Remarks
This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

#### Examples
The following code example shows how to derive a collection class from a constructed type of the `Collection<T>` generic class, and how to override the protected `Collection<T>.InsertItem`, `Collection<T>.RemoveItem`, `Collection<T>.ClearItems`, and `Collection<T>.SetItem` methods to provide custom behavior for the `Collection<T>.Add`, `Collection<T>.Insert`, `Collection<T>.Remove`, and `Collection<T>.Clear` methods, and for setting the `Collection<T>.Item` property.

The custom behavior provided by this example is a `Changed` notification event that is raised at the end of each of the protected methods. The `Dinosaurs` class inherits `Collection<string>` (`Collection(Of String)` in Visual Basic) and defines the `Changed` event, which uses a `DinosaursChangedEventArgs` class for the event information, and an enumeration to identify the kind of change.

The code example calls several properties and methods of `Collection<T>` to demonstrate the custom event.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source1.cs._

## Collection<T>.SetItem(Int32, T) method

```csharp
protected virtual void SetItem (int index, T item);
```

Replaces the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to replace.
- `item`: The new value for the element at the specified index. The value can be `null` for reference types.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than `Collection<T>.Count`.

#### Remarks
`Collection<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

This method is an O(1) operation.

#### Examples
The following code example shows how to derive a collection class from a constructed type of the `Collection<T>` generic class, and how to override the protected `Collection<T>.InsertItem`, `Collection<T>.RemoveItem`, `Collection<T>.ClearItems`, and `Collection<T>.SetItem` methods to provide custom behavior for the `Collection<T>.Add`, `Collection<T>.Insert`, `Collection<T>.Remove`, and `Collection<T>.Clear` methods, and for setting the `Collection<T>.Item` property.

The custom behavior provided by this example is a `Changed` notification event that is raised at the end of each of the protected methods. The `Dinosaurs` class inherits `Collection<string>` (`Collection(Of String)` in Visual Basic) and defines the `Changed` event, which uses a `DinosaursChangedEventArgs` class for the event information, and an enumeration to identify the kind of change.

The code example calls several properties and methods of `Collection<T>` to demonstrate the custom event.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source1.cs._

## Collection<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

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

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

## Collection<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` that can be used to iterate through the collection.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position. At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration. To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.

## Collection<T>.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Adds an item to the `IList`.

Parameters:

- `value`: The `Object` to add to the `IList`.

Returns: The position into which the new element was inserted.

Exceptions:

- `ArgumentException`: `value` is of a type that is not assignable to the `IList`.

#### Remarks
This method is an O(1) operation.

## Collection<T>.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the `IList` contains a specific value.

Parameters:

- `value`: The `Object` to locate in the `IList`.

Returns: `true` if the `Object` is found in the `IList`; otherwise, `false`.

Exceptions:

- `ArgumentException`: `value` is of a type that is not assignable to the `IList`.

#### Remarks
This method determines equality by first determining whether `value` is of type `T` (or null) and then calling `Collection<T>.Contains`.

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

## Collection<T>.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specific item in the `IList`.

Parameters:

- `value`: The `Object` to locate in the `IList`.

Returns: The index of `value` if found in the list; otherwise, -1.

Exceptions:

- `ArgumentException`: `value` is of a type that is not assignable to the `IList`.

#### Remarks
This method determines equality using the default comparer `Comparer<T>.Default`. `Comparer<T>.Default` checks whether type `T` implements `IComparable<T>` and uses that implementation, if available. If not, `Comparer<T>.Default` checks whether type `T` implements `IComparable`. If type `T` does not implement either interface, this method uses `Object.Equals`.

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

## Collection<T>.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Inserts an item into the `IList` at the specified index.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The `Object` to insert into the `IList`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `IList`.
- `ArgumentException`: `value` is of a type that is not assignable to the `IList`.

#### Remarks
If `index` equals the number of items in the `IList`, then `value` is appended to the end.

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

## Collection<T>.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Removes the first occurrence of a specific object from the `IList`.

Parameters:

- `value`: The `Object` to remove from the `IList`.

Exceptions:

- `ArgumentException`: `value` is of a type that is not assignable to the `IList`.

#### Remarks
This method determines equality using the default comparer `Comparer<T>.Default`. `Comparer<T>.Default` checks whether type `T` implements `IComparable<T>` and uses that implementation, if available. If not, `Comparer<T>.Default` checks whether type `T` implements `IComparable`. If type `T` does not implement either interface, this method uses `Object.Equals`.

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.
