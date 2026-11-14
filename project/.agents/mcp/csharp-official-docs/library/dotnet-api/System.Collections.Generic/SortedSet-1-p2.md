---
title: "SortedSet<T> class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedSet<T> class (part 2 of 3)

## SortedSet<T>.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
protected virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Implements the `ISerializable` interface and returns the data that you must have to serialize a `SortedSet<T>` object.

Parameters:

- `info`: A `SerializationInfo` object that contains the information that is required to serialize the `SortedSet<T>` object.
- `context`: A `StreamingContext` structure that contains the source and destination of the serialized stream associated with the `SortedSet<T>` object.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

#### Remarks
Calling this method is an `O(n)` operation, where `n` is `SortedSet<T>.Count`.

## SortedSet<T>.GetViewBetween(T, T) method

```csharp
public virtual System.Collections.Generic.SortedSet<T> GetViewBetween (T? lowerValue, T? upperValue);
```

Returns a view of a subset in a `SortedSet<T>`.

Parameters:

- `lowerValue`: The lowest desired value in the view.
- `upperValue`: The highest desired value in the view.

Returns: A subset view that contains only the values in the specified range.

Exceptions:

- `ArgumentException`: `lowerValue` is more than `upperValue` according to the comparer.
- `ArgumentOutOfRangeException`: A tried operation on the view was outside the range specified by `lowerValue` and `upperValue`.

#### Remarks
This method returns a view of the range of elements that fall between `lowerValue` and `upperValue`, as defined by the comparer. This method does not copy elements from the `SortedSet<T>`, but provides a window into the underlying `SortedSet<T>` itself. You can make changes in both the view and in the underlying `SortedSet<T>`.

#### Examples
The following example uses the `SortedSet<T>.GetViewBetween` method to list only the AVI files from a sorted set of media file names. The comparer evaluates file names according to their extensions. The `lowerValue` is "AVI" and the `upperValue` is only one value higher, "AVJ", to get the view of all AVI files. This code example is part of a larger example provided for the `SortedSet<T>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedSetT/Overview/program.cs._

## SortedSet<T>.IntersectWith(IEnumerable<T>) method

```csharp
public virtual void IntersectWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current `SortedSet<T>` object so that it contains only elements that are also in a specified collection.

Parameters:

- `other`: The collection to compare to the current `SortedSet<T>` object.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
This method ignores any duplicate elements in `other`.

If the collection represented by the `other` parameter is a `SortedSet<T>` collection with the same equality comparer as the current `SortedSet<T>` object, this method is an `O(n)` operation. Otherwise, this method is an `O(n + m)` operation, where `n` is `SortedSet<T>.Count` and `m` is the number of elements in `other`.

## SortedSet<T>.IsProperSubsetOf(IEnumerable<T>) method

```csharp
public bool IsProperSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether a `SortedSet<T>` object is a proper subset of the specified collection.

Parameters:

- `other`: The collection to compare to the current `SortedSet<T>` object.

Returns: `true` if the `SortedSet<T>` object is a proper subset of `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
An empty set is a subset of any other collection. Therefore, this method returns `true` if the collection represented by the current `SortedSet<T>` object is empty unless the `other` parameter is also an empty set.

This method always returns `false` if `SortedSet<T>.Count` is greater than or equal to the number of elements in `other`.

If the collection represented by `other` is a `SortedSet<T>` collection with the same equality comparer as the current `SortedSet<T>` object, then this method is an `O(n)` operation. Otherwise, this method is an `O(n + m)` operation, where `n` is `SortedSet<T>.Count` and `m` is the number of elements in `other`.

## SortedSet<T>.IsProperSupersetOf(IEnumerable<T>) method

```csharp
public bool IsProperSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether a `SortedSet<T>` object is a proper superset of the specified collection.

Parameters:

- `other`: The collection to compare to the current `SortedSet<T>` object.

Returns: `true` if the `SortedSet<T>` object is a proper superset of `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
An empty set is a subset of any other collection. Therefore, this method returns `true` if the collection represented by the `other` parameter is empty unless the current `SortedSet<T>` collection is also empty.

This method always returns `false` if `SortedSet<T>.Count` is less than or equal to the number of elements in `other`.

If the collection represented by `other` is a `SortedSet<T>` collection with the same equality comparer as the current `SortedSet<T>` object, this method is an `O(n)` operation. Otherwise, this method is an `O(n + m)` operation, where `n` is the number of elements in `other` and `m` is `SortedSet<T>.Count`.

## SortedSet<T>.IsSubsetOf(IEnumerable<T>) method

```csharp
public bool IsSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether a `SortedSet<T>` object is a subset of the specified collection.

Parameters:

- `other`: The collection to compare to the current `SortedSet<T>` object.

Returns: `true` if the current `SortedSet<T>` object is a subset of `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
An empty set is a subset of any other collection, including an empty set; therefore, this method returns `true` if the collection represented by the current `SortedSet<T>` object is empty, even if the `other` parameter is an empty set.

This method always returns `false` if `SortedSet<T>.Count` is greater than the number of elements in `other`.

If the collection represented by `other` is a `SortedSet<T>` collection with the same equality comparer as the current `SortedSet<T>` object, this method is an `O(n)` operation. Otherwise, this method is an `O(n + m)` operation, where `n` is `SortedSet<T>.Count` and `m` is the number of elements in `other`.

## SortedSet<T>.IsSupersetOf(IEnumerable<T>) method

```csharp
public bool IsSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether a `SortedSet<T>` object is a superset of the specified collection.

Parameters:

- `other`: The collection to compare to the current `SortedSet<T>` object.

Returns: `true` if the `SortedSet<T>` object is a superset of `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
All collections, including the empty set, are supersets of the empty set. Therefore, this method returns `true` if the collection represented by the `other` parameter is empty, even if the current `SortedSet<T>` object is empty.

This method always returns `false` if `SortedSet<T>.Count` is less than the number of elements in `other`.

If the collection represented by `other` is a `SortedSet<T>` collection with the same equality comparer as the current `SortedSet<T>` object, this method is an `O(n)` operation. Otherwise, this method is an `O(n + m)` operation, where `n` is the number of elements in `other` and `m` is `SortedSet<T>.Count`.

## SortedSet<T>.OnDeserialization(Object) method

```csharp
protected virtual void OnDeserialization (object? sender);
```

Implements the `ISerializable` interface, and raises the deserialization event when the deserialization is completed.

Parameters:

- `sender`: The source of the deserialization event.

Exceptions:

- `SerializationException`: The `SerializationInfo` object associated with the current `SortedSet<T>` object is invalid.

#### Remarks
Calling this method is an `O(n)` operation, where `n` is `SortedSet<T>.Count`.

## SortedSet<T>.Overlaps(IEnumerable<T>) method

```csharp
public bool Overlaps (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current `SortedSet<T>` object and a specified collection share common elements.

Parameters:

- `other`: The collection to compare to the current `SortedSet<T>` object.

Returns: `true` if the `SortedSet<T>` object and `other` share at least one common element; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
Any duplicate elements in `other` are ignored.

This method is an `O(n log m)` operation, where `m` is `SortedSet<T>.Count` and `n` is the number of elements in `other`.

## SortedSet<T>.Remove(T) method

```csharp
public bool Remove (T item);
```

Removes a specified item from the `SortedSet<T>`.

Parameters:

- `item`: The element to remove.

Returns: `true` if the element is found and successfully removed; otherwise, `false`.

#### Remarks
If the `SortedSet<T>` object does not contain the specified element, the object remains unchanged and no exception is thrown.

`item` can be `null` for reference types.

This method is an `O(log n)` operation.

## SortedSet<T>.RemoveWhere(Predicate<T>) method

```csharp
public int RemoveWhere (Predicate<T> match);
```

Removes all elements that match the conditions defined by the specified predicate from a `SortedSet<T>`.

Parameters:

- `match`: The delegate that defines the conditions of the elements to remove.

Returns: The number of elements that were removed from the `SortedSet<T>` collection.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

#### Remarks
`match` must not modify the `SortedSet<T>`. Doing so can cause unexpected results.

Calling this method is an `O(n)` operation, where `n` is `SortedSet<T>.Count`.

#### Examples
The following example removes unwanted elements from a sorted set. This code example is part of a larger example provided for the `SortedSet<T>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedSetT/Overview/program.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedSetT/Overview/program.cs._

## SortedSet<T>.Reverse() method

```csharp
public System.Collections.Generic.IEnumerable<T> Reverse ();
```

Returns an `IEnumerable<T>` that iterates over the `SortedSet<T>` in reverse order.

Returns: An enumerator that iterates over the `SortedSet<T>` in reverse order.

To be added.

## SortedSet<T>.SetEquals(IEnumerable<T>) method

```csharp
public bool SetEquals (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current `SortedSet<T>` object and the specified collection contain the same elements.

Parameters:

- `other`: The collection to compare to the current `SortedSet<T>` object.

Returns: `true` if the current `SortedSet<T>` object is equal to `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
This method ignores the order of elements and any duplicate elements in `other`.

If the collection represented by `other` is a `SortedSet<T>` collection with the same equality comparer as the current `SortedSet<T>` object, this method is an `O(log n)` operation. Otherwise, this method is an `O(n + m)` operation, where `n` is the number of elements in `other` and `m` is `SortedSet<T>.Count`.

## SortedSet<T>.SymmetricExceptWith(IEnumerable<T>) method

```csharp
public void SymmetricExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current `SortedSet<T>` object so that it contains only elements that are present either in the current object or in the specified collection, but not both.

Parameters:

- `other`: The collection to compare to the current `SortedSet<T>` object.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
Any duplicate elements in `other` are ignored.

If the `other` parameter is a `SortedSet<T>` collection with the same equality comparer as the current `SortedSet<T>` object, this method is an `O(n log m)` operation. Otherwise, this method is an `O(n log m) + O(n log n)` operation, where `n` is the number of elements in `other` and `m` is `SortedSet<T>.Count`.

## SortedSet<T>.System.Collections.Generic.ICollection<T>.Add(T) method

```csharp
void ICollection<T>.Add (T item);
```

Adds an item to an `ICollection<T>` object.

Parameters:

- `item`: The object to add to the `ICollection<T>` object.

Exceptions:

- `NotSupportedException`: The `ICollection<T>` is read-only.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SortedSet<T>` instance is cast to an `ICollection<T>` interface.

If `List<T>.Count` is less than `List<T>.Capacity`, this method is an `O(1)` operation. If the capacity must be increased to accommodate the new element, this method becomes an `O(n)` operation, where `n` is `List<T>.Count`.

## SortedSet<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SortedSet<T>` instance is cast to an `IEnumerable<T>` interface.

This method is an `O(log n)` operation.

## SortedSet<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the complete `SortedSet<T>` to a compatible one-dimensional array, starting at the specified array index.

Parameters:

- `array`: A one-dimensional array that is the destination of the elements copied from the `SortedSet<T>`. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentException`: The number of elements in the source array is greater than the available space from `index` to the end of the destination array.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `SortedSet<T>` instance is cast to an `ICollection` interface.
