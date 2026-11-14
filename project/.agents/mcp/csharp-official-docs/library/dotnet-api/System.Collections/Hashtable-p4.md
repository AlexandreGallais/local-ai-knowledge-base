---
title: "Hashtable class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/Hashtable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Hashtable class (part 4 of 5)

## Hashtable.Add(Object, Object) method

```csharp
public virtual void Add (object key, object? value);
```

Adds an element with the specified key and value into the `Hashtable`.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add. The value can be `null`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `Hashtable`.
- `NotSupportedException`: The `Hashtable` is read-only.

-or-

The `Hashtable` has a fixed size.

#### Remarks
A key <example-value> be `null`, but a value can be.

An object that has no correlation between its state and its hash code value should typically not be used as the key. For example, String objects are better than StringBuilder objects for use as keys.

You can also use the `Hashtable.Item` property to add new elements by setting the value of a key that does not exist in the `Hashtable`; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the `Hashtable`, setting the `Hashtable.Item` property overwrites the old value. In contrast, the `Hashtable.Add` method does not modify existing elements.

If `Hashtable.Count` is less than the capacity of the `Hashtable`, this method is an `O(1)` operation. If the capacity needs to be increased to accommodate the new element, this method becomes an `O(n)` operation, where `n` is `Hashtable.Count`.

#### Examples
The following example shows how to add elements to the `Hashtable`.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/Add/source.cs._

## Hashtable.Clear() method

```csharp
public virtual void Clear ();
```

Removes all elements from the `Hashtable`.

Exceptions:

- `NotSupportedException`: The `Hashtable` is read-only.

#### Remarks
`Hashtable.Count` is set to zero, and references to other objects from elements of the collection are also released. The capacity remains unchanged.

This method is an `O(n)` operation, where `n` is `Hashtable.Count`.

#### Examples
The following example shows how to clear the values of the `Hashtable`.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/Clear/source.cs._

## Hashtable.Clone() method

```csharp
public virtual object Clone ();
```

Creates a shallow copy of the `Hashtable`.

Returns: A shallow copy of the `Hashtable`.

#### Remarks
A shallow copy of a collection copies only the elements of the collection, whether they are reference types or value types, but it does not copy the objects that the references refer to. The references in the new collection point to the same objects that the references in the original collection point to.

In contrast, a deep copy of a collection copies the elements and everything directly or indirectly referenced by the elements.

The `Hashtable` clone has the same count, the same capacity, the same `IHashCodeProvider` implementation, and the same `IComparer` implementation as the original `Hashtable`.

This method is an `O(n)` operation, where `n` is `Hashtable.Count`.

## Hashtable.Contains(Object) method

```csharp
public virtual bool Contains (object key);
```

Determines whether the `Hashtable` contains a specific key.

Parameters:

- `key`: The key to locate in the `Hashtable`.

Returns: `true` if the `Hashtable` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
`Hashtable.Contains` implements `IDictionary.Contains`. It behaves exactly as `Hashtable.ContainsKey`.

This method is an `O(1)` operation.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following example shows how to determine whether the `Hashtable` contains a specific element.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/Contains/source.cs._

## Hashtable.ContainsKey(Object) method

```csharp
public virtual bool ContainsKey (object key);
```

Determines whether the `Hashtable` contains a specific key.

Parameters:

- `key`: The key to locate in the `Hashtable`.

Returns: `true` if the `Hashtable` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method behaves exactly as `Hashtable.Contains`.

This method is an `O(1)` operation.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following example shows how to determine whether the `Hashtable` contains a specific element.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/Contains/source.cs._

## Hashtable.ContainsValue(Object) method

```csharp
public virtual bool ContainsValue (object? value);
```

Determines whether the `Hashtable` contains a specific value.

Parameters:

- `value`: The value to locate in the `Hashtable`. The value can be `null`.

Returns: `true` if the `Hashtable` contains an element with the specified `value`; otherwise, `false`.

#### Remarks
The values of the elements of the `Hashtable` are compared to the specified value using the `Object.Equals` method.

This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is `Hashtable.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following example shows how to determine whether the `Hashtable` contains a specific element.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/Contains/source.cs._

## Hashtable.CopyTo(Array, Int32) method

```csharp
public virtual void CopyTo (Array array, int arrayIndex);
```

Copies the `Hashtable` elements to a one-dimensional `Array` instance at the specified index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the `DictionaryEntry` objects copied from `Hashtable`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `Hashtable` is greater than the available space from `arrayIndex` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `Hashtable` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The elements are copied to the `Array` in the same order in which the enumerator iterates through the `Hashtable`.

To copy only the keys in the `Hashtable`, use `Hashtable.Keys.CopyTo`.

To copy only the values in the `Hashtable`, use `Hashtable.Values.CopyTo`.

This method is an `O(n)` operation, where `n` is `Hashtable.Count`.

#### Examples
The following example shows how to copy the list of keys or the list of values in a `Hashtable` into a one-dimensional `Array`.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/CopyTo/source.cs._

## Hashtable.GetEnumerator() method

```csharp
public virtual System.Collections.IDictionaryEnumerator GetEnumerator ();
```

Returns an `IDictionaryEnumerator` that iterates through the `Hashtable`.

Returns: An `IDictionaryEnumerator` for the `Hashtable`.

#### Remarks

The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an `O(1)` operation.

Because serializing and deserializing an enumerator for a `Hashtable` can cause the elements to become reordered, it is not possible to continue enumeration without calling the `IEnumerator.Reset` method.

#### Examples
The following example compares the use of `Hashtable.GetEnumerator` and `foreach` to enumerate the contents of a `Hashtable`.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/GetEnumerator/source2.cs._

## Hashtable.GetHash(Object) method

```csharp
protected virtual int GetHash (object key);
```

Returns the hash code for the specified key.

Parameters:

- `key`: The `Object` for which a hash code is to be returned.

Returns: The hash code for `key`.

Exceptions:

- `NullReferenceException`: `key` is `null`.

#### Remarks
If the hash table was created with a specific `IHashCodeProvider` implementation, this method uses that hash code provider; otherwise, it uses the `Object.GetHashCode` implementation of `key`.

This method is an `O(1)` operation.

## Hashtable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Implements the `ISerializable` interface and returns the data needed to serialize the `Hashtable`.

Parameters:

- `info`: A `SerializationInfo` object containing the information required to serialize the `Hashtable`.
- `context`: A `StreamingContext` object containing the source and destination of the serialized stream associated with the `Hashtable`.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `InvalidOperationException`: The collection was modified.

To be added.

## Hashtable.KeyEquals(Object, Object) method

```csharp
protected virtual bool KeyEquals (object? item, object key);
```

Compares a specific `Object` with a specific key in the `Hashtable`.

Parameters:

- `item`: The `Object` to compare with `key`.
- `key`: The key in the `Hashtable` to compare with `item`.

Returns: `true` if `item` and `key` are equal; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `item` is `null`.

-or-

`key` is `null`.

#### Remarks
If the hash table was created with a specific `IComparer` implementation, this method uses that comparer; that is, `IComparer.Compare` (`item`, `key`). Otherwise, it uses `item.Equals(key)`.

This method is an `O(1)` operation.

## Hashtable.OnDeserialization(Object) method

```csharp
public virtual void OnDeserialization (object? sender);
```

Implements the `ISerializable` interface and raises the deserialization event when the deserialization is complete.

Parameters:

- `sender`: The source of the deserialization event.

Exceptions:

- `SerializationException`: The `SerializationInfo` object associated with the current `Hashtable` is invalid.

#### Remarks
This method is an `O(n)` operation, where `n` is `Hashtable.Count`.

Because serializing and deserializing an enumerator for a `Hashtable` can cause the elements to become reordered, it is not possible to continue enumeration without calling the `IEnumerator.Reset` method.

## Hashtable.Remove(Object) method

```csharp
public virtual void Remove (object key);
```

Removes the element with the specified key from the `Hashtable`.

Parameters:

- `key`: The key of the element to remove.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `NotSupportedException`: The `Hashtable` is read-only.

-or-

The `Hashtable` has a fixed size.

#### Remarks
If the `Hashtable` does not contain an element with the specified key, the `Hashtable` remains unchanged. No exception is thrown.

This method is an `O(1)` operation.

#### Examples
The following example shows how to remove elements from the `Hashtable`.

_Code sample not included: ~/snippets/csharp/System.Collections/Hashtable/Remove/source.cs._
