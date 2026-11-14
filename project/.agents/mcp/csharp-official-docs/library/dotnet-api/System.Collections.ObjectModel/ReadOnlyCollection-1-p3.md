---
title: "ReadOnlyCollection<T> class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/ReadOnlyCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlyCollection<T> class (part 3 of 3)

## ReadOnlyCollection<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` that can be used to iterate through the collection.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IEnumerable` interface.

## ReadOnlyCollection<T>.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Adds an item to the `IList`.  This implementation always throws `NotSupportedException`.

Parameters:

- `value`: The `Object` to add to the `IList`.

Returns: The position into which the new element was inserted.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IList` interface.

## ReadOnlyCollection<T>.System.Collections.IList.Clear() method

```csharp
void IList.Clear ();
```

Removes all items from the `IList`.  This implementation always throws `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IList` interface.

## ReadOnlyCollection<T>.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the `IList` contains a specific value.

Parameters:

- `value`: The `Object` to locate in the `IList`.

Returns: `true` if the `Object` is found in the `IList`; otherwise, `false`.

Exceptions:

- `ArgumentException`: `value` is not of the type specified for the generic type parameter `T`.

#### Remarks
This method determines equality using the default comparer `EqualityComparer<T>.Default`.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `ReadOnlyCollection<T>.Count`.

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IList` interface.

## ReadOnlyCollection<T>.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specific item in the `IList`.

Parameters:

- `value`: The `Object` to locate in the `IList`.

Returns: The index of `value` if found in the list; otherwise, -1.

Exceptions:

- `ArgumentException`: `value` is not of the type specified for the generic type parameter `T`.

#### Remarks
This method determines equality using the default comparer `EqualityComparer<T>.Default`.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `ReadOnlyCollection<T>.Count`.

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IList` interface.

## ReadOnlyCollection<T>.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Inserts an item to the `IList` at the specified index.  This implementation always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The `Object` to insert into the `IList`.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IList` interface.

## ReadOnlyCollection<T>.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Removes the first occurrence of a specific object from the `IList`.  This implementation always throws `NotSupportedException`.

Parameters:

- `value`: The `Object` to remove from the `IList`.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IList` interface.

## ReadOnlyCollection<T>.System.Collections.IList.RemoveAt(Int32) method

```csharp
void IList.RemoveAt (int index);
```

Removes the `IList` item at the specified index.  This implementation always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IList` interface.
