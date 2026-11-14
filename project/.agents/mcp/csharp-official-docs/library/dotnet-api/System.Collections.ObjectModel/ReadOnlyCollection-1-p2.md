---
title: "ReadOnlyCollection<T> class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/ReadOnlyCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlyCollection<T> class (part 2 of 3)

## ReadOnlyCollection<T>.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets the element at the specified index. A `NotSupportedException` occurs if you try to set the item at the specified index.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `IList`.
- `NotSupportedException`: Always thrown if the property is set.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.

The C# language uses the this keyword to define the indexers instead of implementing the `ReadOnlyCollection<T>.System%23Collections%23IList%23Item` property. Visual Basic <example-value> `ReadOnlyCollection<T>.System%23Collections%23IList%23Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(1) operation.

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IDisposable` interface.

## ReadOnlyCollection<T>.Contains(T) method

```csharp
public bool Contains (T value);
```

Determines whether an element is in the `ReadOnlyCollection<T>`.

Parameters:

- `value`: The object to locate in the `ReadOnlyCollection<T>`. The value can be `null` for reference types.

Returns: `true` if `value` is found in the `ReadOnlyCollection<T>`; otherwise, `false`.

#### Remarks
This method determines equality using the default equality comparer `EqualityComparer<T>.Default`.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `ReadOnlyCollection<T>.Count`.

#### Examples
The following code example demonstrates several members of the `ReadOnlyCollection<T>` class. The code example creates a `List<T>` of strings and adds four dinosaur names to it. The code example then wraps the list in a `ReadOnlyCollection<T>`.

After demonstrating the `ReadOnlyCollection<T>.Count`, `ReadOnlyCollection<T>.Contains`, `ReadOnlyCollection<T>.Item`, and `ReadOnlyCollection<T>.System%23Collections%23IList%23IndexOf` members, the code example shows that the `ReadOnlyCollection<T>` is just a wrapper for the original `List<T>` by adding a new item to the `List<T>` and displaying the contents of the `ReadOnlyCollection<T>`.

Finally, the code example creates an array larger than the collection and uses the `ReadOnlyCollection<T>.CopyTo` method to insert the elements of the collection into the middle of the array.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/ReadOnlyCollectionT/Overview/source.cs._

## ReadOnlyCollection<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int index);
```

Copies the entire `ReadOnlyCollection<T>` to a compatible one-dimensional `Array`, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ReadOnlyCollection<T>`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: The number of elements in the source `ReadOnlyCollection<T>` is greater than the available space from `index` to the end of the destination `array`.

#### Remarks
This method uses `Array.Copy` to copy the elements.

The elements are copied to the `Array` in the same order that the enumerator iterates through the `ReadOnlyCollection<T>`.

This method is an O(`n`) operation, where `n` is `ReadOnlyCollection<T>.Count`.

#### Examples
The following code example demonstrates several members of the `ReadOnlyCollection<T>` class. The code example creates a `List<T>` of strings and adds four dinosaur names to it. The code example then wraps the list in a `ReadOnlyCollection<T>`.

After demonstrating the `ReadOnlyCollection<T>.Count`, `ReadOnlyCollection<T>.Contains`, `ReadOnlyCollection<T>.Item`, and `ReadOnlyCollection<T>.System%23Collections%23IList%23IndexOf` members, the code example shows that the `ReadOnlyCollection<T>` is just a wrapper for the original `List<T>` by adding a new item to the `List<T>` and displaying the contents of the `ReadOnlyCollection<T>`.

Finally, the code example creates an array larger than the collection and uses the `ReadOnlyCollection<T>.CopyTo` method to insert the elements of the collection into the middle of the array.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/ReadOnlyCollectionT/Overview/source.cs._

## ReadOnlyCollection<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<T> GetEnumerator ();
```

Returns an enumerator that iterates through the `ReadOnlyCollection<T>`.

Returns: An `IEnumerator<T>` for the `ReadOnlyCollection<T>`.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, `IEnumerator<T>.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.

`IEnumerator<T>.Current` returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator<T>.Current` is undefined. You cannot set `IEnumerator<T>.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.

#### Examples
The following code example uses the enumerator to display the contents of a `ReadOnlyCollection<T>` that wraps a `List<T>`. The enumerator is concealed by the `foreach` statement (`For Each` in Visual Basic).

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/ReadOnlyCollectionT/Overview/source.cs._

## ReadOnlyCollection<T>.IndexOf(T) method

```csharp
public int IndexOf (T value);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the entire `ReadOnlyCollection<T>`.

Parameters:

- `value`: The object to locate in the `List<T>`. The value can be `null` for reference types.

Returns: The zero-based index of the first occurrence of `value` within the entire `ReadOnlyCollection<T>`, if found; otherwise, -1.

#### Remarks
The `ReadOnlyCollection<T>` is searched forward starting at the first element and ending at the last element.

This method determines equality using the default comparer `EqualityComparer<T>.Default`.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `ReadOnlyCollection<T>.Count`.

## ReadOnlyCollection<T>.System.Collections.Generic.ICollection<T>.Add(T) method

```csharp
void ICollection<T>.Add (T value);
```

Adds an item to the `ICollection<T>`.  This implementation always throws `NotSupportedException`.

Parameters:

- `value`: The object to add to the `ICollection<T>`.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `ICollection<T>` interface.

## ReadOnlyCollection<T>.System.Collections.Generic.ICollection<T>.Clear() method

```csharp
void ICollection<T>.Clear ();
```

Removes all items from the `ICollection<T>`.  This implementation always throws `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `ICollection<T>` interface.

## ReadOnlyCollection<T>.System.Collections.Generic.ICollection<T>.Remove(T) method

```csharp
bool ICollection<T>.Remove (T value);
```

Removes the first occurrence of a specific object from the `ICollection<T>`.  This implementation always throws `NotSupportedException`.

Parameters:

- `value`: The object to remove from the `ICollection<T>`.

Returns: `true` if `value` was successfully removed from the `ICollection<T>`; otherwise, `false`.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `ICollection<T>` interface.

## ReadOnlyCollection<T>.System.Collections.Generic.IList<T>.Insert(Int32, T) method

```csharp
void IList<T>.Insert (int index, T value);
```

Inserts an item to the `IList<T>` at the specified index.  This implementation always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The object to insert into the `IList<T>`.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IList<T>` interface.

## ReadOnlyCollection<T>.System.Collections.Generic.IList<T>.RemoveAt(Int32) method

```csharp
void IList<T>.RemoveAt (int index);
```

Removes the `IList<T>` item at the specified index.  This implementation always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IList<T>` interface.

## ReadOnlyCollection<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

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

This method is an O(`n`) operation, where `n` is `ReadOnlyCollection<T>.Count`.

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `ICollection` interface.
