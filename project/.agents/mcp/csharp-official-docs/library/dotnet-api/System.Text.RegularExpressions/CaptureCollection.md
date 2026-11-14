---
title: "CaptureCollection class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/CaptureCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CaptureCollection class

Namespace: `System.Text.RegularExpressions`

```csharp
public class CaptureCollection : System.Collections.Generic.ICollection<System.Text.RegularExpressions.Capture>, System.Collections.Generic.IEnumerable<System.Text.RegularExpressions.Capture>, System.Collections.Generic.IList<System.Text.RegularExpressions.Capture>, System.Collections.Generic.IReadOnlyCollection<System.Text.RegularExpressions.Capture>, System.Collections.Generic.IReadOnlyList<System.Text.RegularExpressions.Capture>, System.Collections.IList
```

Represents the set of captures made by a single capturing group. The collection is immutable
(read-only) and has no public constructor.

The `CaptureCollection` object contains one or more `Capture` objects.
Instances of the `CaptureCollection` class are returned by the following properties:

The `Group.Captures` property. Each member of the collection represents a substring
captured by a capturing group. If a quantifier is not applied to a capturing group, the
`CaptureCollection` includes a single `Capture` object that represents
the same captured substring as the `Group` object. If a quantifier is applied to a
capturing group, the `CaptureCollection` includes one `Capture` object
for each captured substring, and the `Group` object provides information only about
the last captured substring.

The `Match.Captures` property. In this case, the collection consists of a single
`Capture` object that provides information about the match as a whole. That is, the
`CaptureCollection` object provides the same information as the `Match`
object.

To iterate through the members of the collection, you should use the collection iteration construct
provided by your language (such as `foreach` in C#) instead of retrieving the enumerator that
is returned by the `CaptureCollection.GetEnumerator` method.

## CaptureCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of substrings captured by the group.

Returns: The number of items in the `CaptureCollection`.

To be added.

## CaptureCollection.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value that indicates whether the collection is read only.

Returns: `true` in all cases.

#### Remarks

A collection that is read-only does not allow the addition or removal of elements after the collection is created. Note that read-only in this context does not indicate whether individual elements of the collection can be modified, since the `ICollection<T>` interface only supports addition and removal operations. For example, the `IsReadOnly` property of an array that is cast or converted to an `ICollection<T>` object returns `true`, even though individual array elements can be modified.

## CaptureCollection.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value that indicates whether access to the collection is synchronized (thread-safe).

Returns: `false` in all cases.

To be added.

## CaptureCollection.Item property

```csharp
public System.Text.RegularExpressions.Capture this[int i] { get; }
```

Gets an individual member of the collection.

Parameters:

- `i`: The index into the capture collection.

Returns: The captured substring at position `i` in the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.
- `ArgumentOutOfRangeException`: `i` is less than 0 or greater than or equal to
`CaptureCollection.Count`.

To be added.

## CaptureCollection.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the collection.

Returns: An object that can be used to synchronize access to the collection.

To be added.

## CaptureCollection.System.Collections.Generic.IList<System.Text.RegularExpressions.Capture>.Item property

```csharp
System.Text.RegularExpressions.Capture System.Collections.Generic.IList<System.Text.RegularExpressions.Capture>.Item[int index] { get; set; }
```

Gets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element at the specified index.

#### Remarks

This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.
The C# language uses the this keyword to define the indexers instead of implementing the `IList<T>.Item` property. Visual Basic <example-value> `IList<T>.Item` as a default property, which provides the same indexing functionality.

## CaptureCollection.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the collection has a fixed size.

Returns: `true`, since the collection has a fixed size.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `CaptureCollection` instance is cast to an `IList` interface.

A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

## CaptureCollection.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element at the specified index.

#### Remarks

This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.
The C# language uses the this keyword to define the indexers instead of implementing the `IList.Item` property. Visual Basic <example-value> `IList.Item` as a default property, which provides the same indexing functionality.

## CaptureCollection.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int arrayIndex);
```

Copies all the elements of the collection to the given array beginning at the given index.

Parameters:

- `array`: The array the collection is to be copied into.
- `arrayIndex`: The position in the destination array where copying is to begin.

Exceptions:

- `ArgumentOutOfRangeException`: `arrayIndex` is outside the bounds of `array`.

-or-

`arrayIndex` plus `CaptureCollection.Count` is outside the bounds of `array`.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentException`: `array` is multidimensional.
- `IndexOutOfRangeException`: `arrayIndex` is outside the bounds of `array`.

#### Remarks

Because the entire collection is copied into the array starting at the given index, the destination array must be at least as large as the collection.

## CaptureCollection.CopyTo(Capture[], Int32) method

```csharp
public void CopyTo (System.Text.RegularExpressions.Capture[] array, int arrayIndex);
```

Copies the elements of the collection to an `Array`, starting at a particular
`Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from
the collection. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than 0.
- `ArgumentException`: The number of elements in the source collection is greater than the available space from
`arrayIndex` to the end of the destination `array`.

To be added.

## CaptureCollection.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Provides an enumerator that iterates through the collection.

Returns: An object that contains all `Capture` objects within the
`CaptureCollection`.

Instead of calling the `CaptureCollection.GetEnumerator` method to retrieve an enumerator that lets
you iterate through the `Capture` objects in the collection, you should use the
collection iteration construct provided by your programming language (such as `foreach`
in C#).

## CaptureCollection.System.Collections.Generic.ICollection<System.Text.RegularExpressions.Capture>.Add(Capture) method

```csharp
void ICollection<Capture>.Add (System.Text.RegularExpressions.Capture item);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `item`: The object to add to the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## CaptureCollection.System.Collections.Generic.ICollection<System.Text.RegularExpressions.Capture>.Clear() method

```csharp
void ICollection<Capture>.Clear ();
```

Calling this method always throws `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## CaptureCollection.System.Collections.Generic.ICollection<System.Text.RegularExpressions.Capture>.Contains(Capture) method

```csharp
bool ICollection<Capture>.Contains (System.Text.RegularExpressions.Capture item);
```

Determines whether the collection contains a specific value.

Parameters:

- `item`: The object to locate in the collection.

Returns: `true` if `item` is found in the collection; otherwise, `false`.

To be added.

## CaptureCollection.System.Collections.Generic.ICollection<System.Text.RegularExpressions.Capture>.Remove(Capture) method

```csharp
bool ICollection<Capture>.Remove (System.Text.RegularExpressions.Capture item);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `item`: The object to remove from the collection.

Returns: Calling this method always throws `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## CaptureCollection.System.Collections.Generic.IEnumerable<System.Text.RegularExpressions.Capture>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Text.RegularExpressions.Capture> IEnumerable<Capture>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks

The returned `IEnumerator<T>` provides the ability to iterate through the collection by exposing a `Current` property .You can use enumerators to read the data in a collection, but not to modify the collection.
Initially, the enumerator is positioned before the first element in the collection. At this position, `IEnumerator<T>.Current` is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.
`IEnumerator<T>.Current` returns the same object until `IEnumerator.MoveNext` is called again as `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.
If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator<T>.Current` is undefined. You cannot set `IEnumerator<T>.Current` to the first element of the collection again; you must create a new enumerator instance instead.   If changes are made to the collection, such as adding, modifying, or deleting elements, the behavior of the enumerator is undefined.
An enumerator does not have exclusive access to the collection so an enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is invalidated and you may get unexpected results. Also, enumerating a collection is not a thread-safe procedure. To guarantee thread-safety, you should lock the collection during enumerator or implement synchronization on the collection.
Default implementations of collections in the `Generic` namespace aren't synchronized.

## CaptureCollection.System.Collections.Generic.IList<System.Text.RegularExpressions.Capture>.IndexOf(Capture) method

```csharp
int IList<Capture>.IndexOf (System.Text.RegularExpressions.Capture item);
```

Determines the index of a specific item in the collection.

Parameters:

- `item`: The object to locate in the collection.

Returns: The index of `item` if found in the list; otherwise, -1.

#### Remarks

If an object occurs multiple times in the list, the `IList<T>.IndexOf` method always returns the first instance found.

## CaptureCollection.System.Collections.Generic.IList<System.Text.RegularExpressions.Capture>.Insert(Int32, Capture) method

```csharp
void IList<Capture>.Insert (int index, System.Text.RegularExpressions.Capture item);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert into the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## CaptureCollection.System.Collections.Generic.IList<System.Text.RegularExpressions.Capture>.RemoveAt(Int32) method

```csharp
void IList<Capture>.RemoveAt (int index);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## CaptureCollection.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `value`: The object to add to the collection.

Returns: Calling this method always throws `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## CaptureCollection.System.Collections.IList.Clear() method

```csharp
void IList.Clear ();
```

Calling this method always throws `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `CaptureCollection` instance is cast to an `IList` interface.

## CaptureCollection.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the collection contains a specific value.

Parameters:

- `value`: The object to locate in the collection.

Returns: `true` if the `Object` is found in the collection; otherwise, `false`.

#### Remarks

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `value` to determine whether `value` exists.
