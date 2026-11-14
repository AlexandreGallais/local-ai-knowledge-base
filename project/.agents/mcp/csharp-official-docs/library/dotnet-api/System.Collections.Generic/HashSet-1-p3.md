---
title: "HashSet<T> class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/HashSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HashSet<T> class (part 3 of 4)

## HashSet<T>.IsSubsetOf(IEnumerable<T>) method

```csharp
public bool IsSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether a `HashSet<T>` object is a subset of the specified collection.

Parameters:

- `other`: The collection to compare to the current `HashSet<T>` object.

Returns: `true` if the `HashSet<T>` object is a subset of `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
An empty set is a subset of any other collection, including an empty set; therefore, this method returns `true` if the collection represented by the current `HashSet<T>` object is empty, even if the `other` parameter is an empty set.

This method always returns `false` if `HashSet<T>.Count` is greater than the number of elements in `other`.

If the collection represented by `other` is a `HashSet<T>` collection with the same equality comparer as the current `HashSet<T>` object, this method is an O(`n`) operation. Otherwise, this method is an O(`n` + `m`) operation, where `n` is `HashSet<T>.Count` and `m` is the number of elements in `other`.

#### Examples
The following example creates two disparate `HashSet<T>` objects and compares them to each other. In this example, `lowNumbers` is both a subset and a proper subset of `allNumbers` until `allNumbers` is modified, using the `HashSet<T>.IntersectWith` method, to contain only values that are present in both sets. Once `allNumbers` and `lowNumbers` are identical, `lowNumbers` is still a subset of `allNumbers` but is no longer a proper subset.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/IsProperSubsetOf/Program.cs._

## HashSet<T>.IsSupersetOf(IEnumerable<T>) method

```csharp
public bool IsSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether a `HashSet<T>` object is a superset of the specified collection.

Parameters:

- `other`: The collection to compare to the current `HashSet<T>` object.

Returns: `true` if the `HashSet<T>` object is a superset of `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
All collections, including the empty set, are supersets of the empty set. Therefore, this method returns `true` if the collection represented by the `other` parameter is empty, even if the current `HashSet<T>` object is empty.

This method always returns `false` if `HashSet<T>.Count` is less than the number of elements in `other`.

If the collection represented by `other` is a `HashSet<T>` collection with the same equality comparer as the current `HashSet<T>` object, this method is an O(`n`) operation. Otherwise, this method is an O(`n` + `m`) operation, where `n` is the number of elements in `other` and `m` is `HashSet<T>.Count`.

#### Examples
The following example creates two disparate `HashSet<T>` objects and compares them to each other. In this example, `allNumbers` is both a superset and a proper superset of `lowNumbers` until `allNumbers` is modified, using the `HashSet<T>.IntersectWith` method, to contain only values that are present in both sets. Once `allNumbers` and `lowNumbers` are identical, `allNumbers` is still a superset of `lowNumbers` but is no longer a proper superset.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/IsProperSubsetOf/Program.cs._

## HashSet<T>.OnDeserialization(Object) method

```csharp
public virtual void OnDeserialization (object? sender);
```

Implements the `ISerializable` interface and raises the deserialization event when the deserialization is complete.

Parameters:

- `sender`: The source of the deserialization event.

Exceptions:

- `SerializationException`: The `SerializationInfo` object associated with the current `HashSet<T>` object is invalid.

#### Remarks
Calling this method is an O(`n`) operation, where `n` is `HashSet<T>.Count`.

## HashSet<T>.Overlaps(IEnumerable<T>) method

```csharp
public bool Overlaps (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current `HashSet<T>` object and a specified collection share common elements.

Parameters:

- `other`: The collection to compare to the current `HashSet<T>` object.

Returns: `true` if the `HashSet<T>` object and `other` share at least one common element; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
This method is an O(`n`) operation, where `n` is the number of elements in `other`.

#### Examples
The following example creates two disparate `HashSet<T>` objects and compares them to each another. In this example, `allNumbers` and `lowNumbers` are shown to share common elements using the `HashSet<T>.Overlaps` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/IsProperSubsetOf/Program.cs._

## HashSet<T>.Remove(T) method

```csharp
public bool Remove (T item);
```

Removes the specified element from a `HashSet<T>` object.

Parameters:

- `item`: The element to remove.

Returns: `true` if the element is successfully found and removed; otherwise, `false`.  This method returns `false` if `item` is not found in the `HashSet<T>` object.

#### Remarks
If the `HashSet<T>` object does not contain the specified element, the object remains unchanged. No exception is thrown.

This method is an O(1) operation.

#### Examples
The following example demonstrates how to remove values from a `HashSet<T>` collection using the `HashSet<T>.Remove` method. In this example, zero is arbitrarily removed from the `HashSet<T>` collection.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/Contains/Program.cs._

## HashSet<T>.RemoveWhere(Predicate<T>) method

```csharp
public int RemoveWhere (Predicate<T> match);
```

Removes all elements that match the conditions defined by the specified predicate from a `HashSet<T>` collection.

Parameters:

- `match`: The `Predicate<T>` delegate that defines the conditions of the elements to remove.

Returns: The number of elements that were removed from the `HashSet<T>` collection.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

#### Remarks
Calling this method is an O(`n`) operation, where `n` is `HashSet<T>.Count`.

#### Examples
The following example demonstrates how to remove values from a `HashSet<T>` collection using the `HashSet<T>.Remove` method. In this example, all odd integers are removed from the `HashSet<T>` collection as specified by the `match` delegate.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/Contains/Program.cs._

## HashSet<T>.SetEquals(IEnumerable<T>) method

```csharp
public bool SetEquals (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether a `HashSet<T>` object and the specified collection contain the same elements.

Parameters:

- `other`: The collection to compare to the current `HashSet<T>` object.

Returns: `true` if the `HashSet<T>` object is equal to `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
The `HashSet<T>.SetEquals` method ignores duplicate entries and the order of elements in the `other` parameter.

If the collection represented by `other` is a `HashSet<T>` collection with the same equality comparer as the current `HashSet<T>` object, this method is an O(`n`) operation. Otherwise, this method is an O(`n` + `m`) operation, where `n` is the number of elements in `other` and `m` is `HashSet<T>.Count`.

#### Examples
The following example creates two disparate `HashSet<T>` objects and compares them to each another. Initially, the two sets are not equal, which is demonstrated by using the `HashSet<T>.SetEquals` method. The `allNumbers` `HashSet<T>` object is then modified, after which the sets are equal.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/IsProperSubsetOf/Program.cs._

## HashSet<T>.SymmetricExceptWith(IEnumerable<T>) method

```csharp
public void SymmetricExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current `HashSet<T>` object to contain only elements that are present either in that object or in the specified collection, but not both.

Parameters:

- `other`: The collection to compare to the current `HashSet<T>` object.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
If the `other` parameter is a `HashSet<T>` collection with the same equality comparer as the current `HashSet<T>` object, this method is an O(`n`) operation. Otherwise, this method is an O(`n` + `m`) operation, where `n` is the number of elements in `other` and `m` is `HashSet<T>.Count`.

#### Examples
The following example creates two `HashSet<T>` collections with overlapping sets of data. The set that contains the lower values is then modified, using the `HashSet<T>.SymmetricExceptWith` method, to contain only the values that are not present in both sets.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/SymmetricExceptWith/Program.cs._

## HashSet<T>.System.Collections.Generic.ICollection<T>.Add(T) method

```csharp
void ICollection<T>.Add (T item);
```

Adds an item to an `ICollection<T>` object.

Parameters:

- `item`: The object to add to the `ICollection<T>` object.

Exceptions:

- `NotSupportedException`: The `ICollection<T>` is read-only.

#### Remarks
If `List<T>.Count` is less than `List<T>.Capacity`, this method is an O(1) operation. If the capacity must be increased to accommodate the new element, this method becomes an O(`n`) operation, where `n` is `List<T>.Count`.

## HashSet<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator<T>` object that can be used to iterate through the collection.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, the `Current` property is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.

The `Current` property returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator<T>.Current` is undefined. You cannot set `IEnumerator<T>.Current` to the first element of the collection again; you must create a new enumerator object instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(1) operation.

## HashSet<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, the `Current` property is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

The `Current` property returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(1) operation.
