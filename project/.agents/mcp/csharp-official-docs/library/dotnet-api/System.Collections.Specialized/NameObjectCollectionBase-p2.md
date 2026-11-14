---
title: "NameObjectCollectionBase class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/NameObjectCollectionBase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NameObjectCollectionBase class (part 2 of 3)

## NameObjectCollectionBase.BaseAdd(String, Object) method

```csharp
protected void BaseAdd (string? name, object? value);
```

Adds an entry with the specified key and value into the `NameObjectCollectionBase` instance.

Parameters:

- `name`: The `String` key of the entry to add. The key can be `null`.
- `value`: The `Object` value of the entry to add. The value can be `null`.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks
If `NameObjectCollectionBase.Count` already equals the capacity, the capacity of the `NameObjectCollectionBase` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

If `NameObjectCollectionBase.Count` is less than the capacity, this method is an O(1) operation. If the capacity needs to be increased to accommodate the new element, this method becomes an O(`n`) operation, where `n` is `NameObjectCollectionBase.Count`.

#### Examples
The following code example uses `NameObjectCollectionBase.BaseAdd` to create a new `NameObjectCollectionBase` with elements from an `IDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase/BaseAdd/nocb_baseadd.cs._

## NameObjectCollectionBase.BaseClear() method

```csharp
protected void BaseClear ();
```

Removes all entries from the `NameObjectCollectionBase` instance.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks
`NameObjectCollectionBase.Count` is set to zero, and references to other objects from elements of the collection are also released.

This method is an O(1) operation.

#### Examples
The following code example uses `NameObjectCollectionBase.BaseClear` to remove all elements from a `NameObjectCollectionBase`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase/BaseClear/nocb_baseclear.cs._

## NameObjectCollectionBase.BaseGet(Int32) method

```csharp
protected object? BaseGet (int index);
```

Gets the value of the entry at the specified index of the `NameObjectCollectionBase` instance.

Parameters:

- `index`: The zero-based index of the value to get.

Returns: An `Object` that represents the value of the entry at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the valid range of indexes for the collection.

#### Remarks
This method is an O(1) operation.

## NameObjectCollectionBase.BaseGet(String) method

```csharp
protected object? BaseGet (string? name);
```

Gets the value of the first entry with the specified key from the `NameObjectCollectionBase` instance.

Parameters:

- `name`: The `String` key of the entry to get. The key can be `null`.

Returns: An `Object` that represents the value of the first entry with the specified key, if found; otherwise, `null`.

#### Remarks
If the collection contains multiple entries with the specified key, this method returns only the first entry. To get the values of subsequent entries with the same key, use the enumerator to iterate through the collection and compare the keys.

> **Caution:**
>  This method returns `null` in the following cases: 1) if the specified key is not found; and 2) if the specified key is found and its associated value is `null`. This method does not distinguish between the two cases.

This method is an O(1) operation.

## NameObjectCollectionBase.BaseGetAllKeys() method

```csharp
protected string?[] BaseGetAllKeys ();
```

Returns a `String` array that contains all the keys in the `NameObjectCollectionBase` instance.

Returns: A `String` array that contains all the keys in the `NameObjectCollectionBase` instance.

#### Remarks
This method is an O(`n`) operation, where `n` is `NameObjectCollectionBase.Count`.

#### Examples
The following code example uses `NameObjectCollectionBase.BaseGetAllKeys` and `NameObjectCollectionBase.BaseGetAllValues` to get an array of the keys or an array of the values.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase/BaseGetAllKeys/nocb_basegetall.cs._

## NameObjectCollectionBase.BaseGetAllValues() method

```csharp
protected object?[] BaseGetAllValues ();
```

Returns an `Object` array that contains all the values in the `NameObjectCollectionBase` instance.

Returns: An `Object` array that contains all the values in the `NameObjectCollectionBase` instance.

#### Remarks
This method is an O(`n`) operation, where `n` is `NameObjectCollectionBase.Count`.

#### Examples
The following code example uses `NameObjectCollectionBase.BaseGetAllKeys` and `NameObjectCollectionBase.BaseGetAllValues` to get an array of the keys or an array of the values.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase/BaseGetAllKeys/nocb_basegetall.cs._

## NameObjectCollectionBase.BaseGetAllValues(Type) method

```csharp
protected object?[] BaseGetAllValues (Type type);
```

Returns an array of the specified type that contains all the values in the `NameObjectCollectionBase` instance.

Parameters:

- `type`: A `Type` that represents the type of array to return.

Returns: An array of the specified type that contains all the values in the `NameObjectCollectionBase` instance.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `ArgumentException`: `type` is not a valid `Type`.

#### Remarks
This method is an O(`n`) operation, where `n` is `NameObjectCollectionBase.Count`.

## NameObjectCollectionBase.BaseGetKey(Int32) method

```csharp
protected string? BaseGetKey (int index);
```

Gets the key of the entry at the specified index of the `NameObjectCollectionBase` instance.

Parameters:

- `index`: The zero-based index of the key to get.

Returns: A `String` that represents the key of the entry at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the valid range of indexes for the collection.

#### Remarks
This method is an O(1) operation.

#### Examples
The following code example uses `NameObjectCollectionBase.BaseGetKey` and `NameObjectCollectionBase.BaseGet` to get specific keys and values.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase/BaseGetKey/nocb_baseget.cs._

## NameObjectCollectionBase.BaseHasKeys() method

```csharp
protected bool BaseHasKeys ();
```

Gets a value indicating whether the `NameObjectCollectionBase` instance contains entries whose keys are not `null`.

Returns: `true` if the `NameObjectCollectionBase` instance contains entries whose keys are not `null`; otherwise, `false`.

#### Remarks
This method is an O(1) operation.

#### Examples
The following code example uses `NameObjectCollectionBase.BaseHasKeys` to determine if the collection contains keys that are not `null`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase/BaseHasKeys/nocb_basehaskeys.cs._

## NameObjectCollectionBase.BaseRemove(String) method

```csharp
protected void BaseRemove (string? name);
```

Removes the entries with the specified key from the `NameObjectCollectionBase` instance.

Parameters:

- `name`: The `String` key of the entries to remove. The key can be `null`.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks
If the `NameObjectCollectionBase` does not contain an element with the specified key, the `NameObjectCollectionBase` remains unchanged. No exception is thrown.

In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an O(`n`) operation, where `n` is `NameObjectCollectionBase.Count`.

#### Examples
The following code example uses `NameObjectCollectionBase.BaseRemove` and `NameObjectCollectionBase.BaseRemoveAt` to remove elements from a `NameObjectCollectionBase`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase/BaseRemove/nocb_baseremove.cs._

## NameObjectCollectionBase.BaseRemoveAt(Int32) method

```csharp
protected void BaseRemoveAt (int index);
```

Removes the entry at the specified index of the `NameObjectCollectionBase` instance.

Parameters:

- `index`: The zero-based index of the entry to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the valid range of indexes for the collection.
- `NotSupportedException`: The collection is read-only.

#### Remarks
In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an O(`n`) operation, where `n` is `NameObjectCollectionBase.Count`.

#### Examples
The following code example uses `NameObjectCollectionBase.BaseRemove` and `NameObjectCollectionBase.BaseRemoveAt` to remove elements from a `NameObjectCollectionBase`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase/BaseRemove/nocb_baseremove.cs._

## NameObjectCollectionBase.BaseSet(Int32, Object) method

```csharp
protected void BaseSet (int index, object? value);
```

Sets the value of the entry at the specified index of the `NameObjectCollectionBase` instance.

Parameters:

- `index`: The zero-based index of the entry to set.
- `value`: The `Object` that represents the new value of the entry to set. The value can be `null`.

Exceptions:

- `NotSupportedException`: The collection is read-only.
- `ArgumentOutOfRangeException`: `index` is outside the valid range of indexes for the collection.

#### Remarks
This method is an O(1) operation.

## NameObjectCollectionBase.BaseSet(String, Object) method

```csharp
protected void BaseSet (string? name, object? value);
```

Sets the value of the first entry with the specified key in the `NameObjectCollectionBase` instance, if found; otherwise, adds an entry with the specified key and value into the `NameObjectCollectionBase` instance.

Parameters:

- `name`: The `String` key of the entry to set. The key can be `null`.
- `value`: The `Object` that represents the new value of the entry to set. The value can be `null`.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks
If the collection contains multiple entries with the specified key, this method sets only the first entry. To set the values of subsequent entries with the same key, use the enumerator to iterate through the collection and compare the keys.

This method is an O(1) operation.

## NameObjectCollectionBase.GetEnumerator() method

```csharp
public virtual System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `NameObjectCollectionBase`.

Returns: An `IEnumerator` for the `NameObjectCollectionBase` instance.

#### Remarks
This enumerator returns the keys of the collection as strings.

The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an O(1) operation.

## NameObjectCollectionBase.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Implements the `ISerializable` interface and returns the data needed to serialize the `NameObjectCollectionBase` instance.

Parameters:

- `info`: A `SerializationInfo` object that contains the information required to serialize the `NameObjectCollectionBase` instance.
- `context`: A `StreamingContext` object that contains the source and destination of the serialized stream associated with the `NameObjectCollectionBase` instance.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `PlatformNotSupportedException`: In all cases.

To be added.
