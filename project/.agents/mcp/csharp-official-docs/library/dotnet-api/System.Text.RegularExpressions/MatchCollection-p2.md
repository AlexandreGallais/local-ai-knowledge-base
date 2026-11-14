---
title: "MatchCollection class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/MatchCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MatchCollection class (part 2 of 2)

## MatchCollection.System.Collections.Generic.IEnumerable<System.Text.RegularExpressions.Match>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Text.RegularExpressions.Match> IEnumerable<Match>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks

The returned `IEnumerator<T>` provides the ability to iterate through the collection by exposing a `Current` property .You can use enumerators to read the data in a collection, but not to modify the collection.
Initially, the enumerator is positioned before the first element in the collection. At this position, `IEnumerator<T>.Current` is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.
`IEnumerator<T>.Current` returns the same object until `IEnumerator.MoveNext` is called again as `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.
If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator<T>.Current` is undefined. You cannot set `IEnumerator<T>.Current` to the first element of the collection again; you must create a new enumerator instance instead.   If changes are made to the collection, such as adding, modifying, or deleting elements, the behavior of the enumerator is undefined.
An enumerator does not have exclusive access to the collection so an enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is invalidated and you may get unexpected results. Also, enumerating a collection is not a thread-safe procedure. To guarantee thread-safety, you should lock the collection during enumerator or implement synchronization on the collection.
Default implementations of collections in the `Generic` namespace aren't synchronized.

## MatchCollection.System.Collections.Generic.IList<System.Text.RegularExpressions.Match>.IndexOf(Match) method

```csharp
int IList<Match>.IndexOf (System.Text.RegularExpressions.Match item);
```

Determines the index of a specific item in the collection.

Parameters:

- `item`: The object to locate in the collection.

Returns: The index of `item` if found in the list; otherwise, -1.

#### Remarks

If an object occurs multiple times in the list, the `IList<T>.IndexOf` method always returns the first instance found.

## MatchCollection.System.Collections.Generic.IList<System.Text.RegularExpressions.Match>.Insert(Int32, Match) method

```csharp
void IList<Match>.Insert (int index, System.Text.RegularExpressions.Match item);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert into the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## MatchCollection.System.Collections.Generic.IList<System.Text.RegularExpressions.Match>.RemoveAt(Int32) method

```csharp
void IList<Match>.RemoveAt (int index);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## MatchCollection.System.Collections.IList.Add(Object) method

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

## MatchCollection.System.Collections.IList.Clear() method

```csharp
void IList.Clear ();
```

Removes all items from the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `MatchCollection` instance is cast to an `IList` interface.

Implementations of this method can vary in how they handle the `ICollection.Count` and the capacity of a collection. Typically, the count is set to zero, and references to other objects from elements of the collection are also released. The capacity can be set to zero or a default value, or it can remain unchanged.

## MatchCollection.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the collection contains a specific value.

Parameters:

- `value`: The object to locate in the collection.

Returns: `true` if the `Object` is found in the collection; otherwise, `false`.

#### Remarks

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `value` to determine whether `value` exists.

## MatchCollection.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specific item in the collection.

Parameters:

- `value`: The object to locate in the collection.

Returns: The index of `value` if found in the list; otherwise, -1.

#### Remarks

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `value` to determine whether `value` exists.

## MatchCollection.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The object to insert into the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## MatchCollection.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `value`: The object to remove from the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## MatchCollection.System.Collections.IList.RemoveAt(Int32) method

```csharp
void IList.RemoveAt (int index);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.
