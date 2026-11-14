---
title: "HashSet<T> class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/HashSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HashSet<T> class (part 2 of 4)

## HashSet<T>.Clear() method

```csharp
public void Clear ();
```

Removes all elements from a `HashSet<T>` object.

#### Remarks
`HashSet<T>.Count` is set to zero and references to other objects from elements of the collection are also released. The capacity remains unchanged until a call to `HashSet<T>.TrimExcess` is made.

This method is an O(`n`) operation, where `n` is `HashSet<T>.Count`.

#### Examples
The following example creates and populates a `HashSet<T>` collection, then clears it and releases the memory referenced by the collection.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/Clear/Program.cs._

## HashSet<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether a `HashSet<T>` object contains the specified element.

Parameters:

- `item`: The element to locate in the `HashSet<T>` object.

Returns: `true` if the `HashSet<T>` object contains the specified element; otherwise, `false`.

#### Remarks
This method is an O(1) operation.

#### Examples
The following example demonstrates how to remove values from a `HashSet<T>` collection using the `HashSet<T>.Remove` method. In this example, the `HashSet<T>.Contains` method verifies that the set contains a value before removing it.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/Contains/Program.cs._

## HashSet<T>.CopyTo(T[]) method

```csharp
public void CopyTo (T[] array);
```

Copies the elements of a `HashSet<T>` object to an array.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the `HashSet<T>` object. The array must have zero-based indexing.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

#### Remarks
This method is an O(`n`) operation, where `n` is `HashSet<T>.Count`.

## HashSet<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int arrayIndex);
```

Copies the elements of a `HashSet<T>` object to an array, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the `HashSet<T>` object. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than 0.
- `ArgumentException`: `arrayIndex` is greater than the length of the destination `array`.

#### Remarks
This method is an O(`n`) operation, where `n` is `HashSet<T>.Count`.

## HashSet<T>.CopyTo(T[], Int32, Int32) method

```csharp
public void CopyTo (T[] array, int arrayIndex, int count);
```

Copies the specified number of elements of a `HashSet<T>` object to an array, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the `HashSet<T>` object. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.
- `count`: The number of elements to copy to `array`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than 0.

-or-

`count` is less than 0.
- `ArgumentException`: `arrayIndex` is greater than the length of the destination `array`.

-or-

`count` is greater than the available space from `arrayIndex` to the end of the destination `array`.

#### Remarks
This method is an O(`n`) operation, where `n` is `count`.

## HashSet<T>.CreateSetComparer() method

```csharp
public static System.Collections.Generic.IEqualityComparer<System.Collections.Generic.HashSet<T>> CreateSetComparer ();
```

Returns an `IEqualityComparer` object that can be used for equality testing of a `HashSet<T>` object.

Returns: An `IEqualityComparer` object that can be used for deep equality testing of the `HashSet<T>` object.

#### Remarks
The `IEqualityComparer` object checks for equality at only one level; however, you can chain together comparers at additional levels to perform deeper equality testing.

Calling this method is an O(1) operation.

## HashSet<T>.EnsureCapacity(Int32) method

```csharp
public int EnsureCapacity (int capacity);
```

Ensures that this hash set can hold the specified number of elements without any further expansion of its backing storage.

Parameters:

- `capacity`: The minimum capacity to ensure.

Returns: The new capacity of this instance.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks

> **Caution:**
> If `capacity` comes from user input, prefer letting the collection resize itself as elements are added instead of calling this method. If you must use a user-specified value, either clamp it to a reasonable limit (for example, `Math.Clamp(untrustedValue, 0, 20)`) or verify that the element count matches the specified value.

## HashSet<T>.ExceptWith(IEnumerable<T>) method

```csharp
public void ExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Removes all elements in the specified collection from the current `HashSet<T>` object.

Parameters:

- `other`: The collection of items to remove from the `HashSet<T>` object.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
The `HashSet<T>.ExceptWith` method is the equivalent of mathematical set subtraction.

This method is an O(`n`) operation, where `n` is the number of elements in the `other` parameter.

#### Examples
The following example creates two `HashSet<T>` collections with overlapping sets of data. The lower range of values is then removed from the larger set using the `HashSet<T>.ExceptWith` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/.ctor/Program.cs._

## HashSet<T>.GetAlternateLookup<TAlternate>() method

```csharp
public System.Collections.Generic.HashSet<T>.AlternateLookup<TAlternate> GetAlternateLookup<TAlternate> () where TAlternate : allows ref struct;
```

Gets an instance of a type that can be used to perform operations on the current `HashSet<T>` using a `TAlternate` instead of a `T`.

Parameters:

- `TAlternate`: The alternate type of instance for performing lookups.

Returns: The created lookup instance.

Exceptions:

- `InvalidOperationException`: The set's comparer is not compatible with `TAlternate`.

The set must use a comparer that implements `IAlternateEqualityComparer<T1,T2>` with `TAlternate` and `T`. If it doesn't, an exception is thrown.

## HashSet<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.HashSet<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through a `HashSet<T>` object.

Returns: A `Enumerator` object for the `HashSet<T>` object.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, the `Current` property is undefined. Therefore, you must call the `Enumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `Enumerator.Current`.

The `Current` property returns the same object until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Enumerator.Current` to the next element.

If `Enumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `Enumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `Enumerator.MoveNext` also return `false`. If the last call to `Enumerator.MoveNext` returned `false`, `Enumerator.Current` is undefined. You cannot set `Enumerator.Current` to the first element of the collection again; you must create a new enumerator object instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(1) operation.

## HashSet<T>.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Implements the `ISerializable` interface and returns the data needed to serialize a `HashSet<T>` object.

Parameters:

- `info`: A `SerializationInfo` object that contains the information required to serialize the `HashSet<T>` object.
- `context`: A `StreamingContext` structure that contains the source and destination of the serialized stream associated with the `HashSet<T>` object.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## HashSet<T>.IntersectWith(IEnumerable<T>) method

```csharp
public void IntersectWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current `HashSet<T>` object to contain only elements that are present in that object and in the specified collection.

Parameters:

- `other`: The collection to compare to the current `HashSet<T>` object.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
If the collection represented by the `other` parameter is a `HashSet<T>` collection with the same equality comparer as the current `HashSet<T>` object, this method is an O(`n`) operation. Otherwise, this method is an O(`n` + `m`) operation, where `n` is `HashSet<T>.Count` and `m` is the number of elements in `other`.

## HashSet<T>.IsProperSubsetOf(IEnumerable<T>) method

```csharp
public bool IsProperSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether a `HashSet<T>` object is a proper subset of the specified collection.

Parameters:

- `other`: The collection to compare to the current `HashSet<T>` object.

Returns: `true` if the `HashSet<T>` object is a proper subset of `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
An empty set is a subset of any other collection. Therefore, this method returns `true` if the collection represented by the current `HashSet<T>` object is empty unless the `other` parameter is also an empty set.

This method always returns `false` if `HashSet<T>.Count` is greater than or equal to the number of elements in `other`.

If the collection represented by `other` is a `HashSet<T>` collection with the same equality comparer as the current `HashSet<T>` object, then this method is an O(`n`) operation. Otherwise, this method is an O(`n` + `m`) operation, where `n` is `HashSet<T>.Count` and `m` is the number of elements in `other`.

#### Examples
The following example creates two disparate `HashSet<T>` objects and compares them to each other. In this example, `lowNumbers` is both a subset and a proper subset of `allNumbers` until `allNumbers` is modified, using the `HashSet<T>.IntersectWith` method, to contain only values that are present in both sets. Once `allNumbers` and `lowNumbers` are identical, `lowNumbers` is still a subset of `allNumbers` but is no longer a proper subset.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/IsProperSubsetOf/Program.cs._

## HashSet<T>.IsProperSupersetOf(IEnumerable<T>) method

```csharp
public bool IsProperSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether a `HashSet<T>` object is a proper superset of the specified collection.

Parameters:

- `other`: The collection to compare to the current `HashSet<T>` object.

Returns: `true` if the `HashSet<T>` object is a proper superset of `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
An empty set is a subset of any other collection. Therefore, this method returns `true` if the collection represented by the `other` parameter is empty unless the current `HashSet<T>` collection is also empty.

This method always returns `false` if `HashSet<T>.Count` is less than or equal to the number of elements in `other`.

If the collection represented by `other` is a `HashSet<T>` collection with the same equality comparer as the current `HashSet<T>` object, this method is an O(`n`) operation. Otherwise, this method is an O(`n` + `m`) operation, where `n` is the number of elements in `other` and `m` is `HashSet<T>.Count`.

#### Examples
The following example creates two disparate `HashSet<T>` objects and compares them to each other. In this example, `allNumbers` is both a superset and a proper superset of `lowNumbers` until `allNumbers` is modified, using the `HashSet<T>.IntersectWith` method, to contain only values that are present in both sets. Once `allNumbers` and `lowNumbers` are identical, `allNumbers` is still a superset of `lowNumbers` but is no longer a proper superset.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/HashSetT/IsProperSubsetOf/Program.cs._
