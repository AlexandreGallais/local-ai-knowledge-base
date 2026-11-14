---
title: "Dictionary<TKey,TValue> class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Dictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Dictionary<TKey,TValue> class (part 4 of 5)

## Dictionary<TKey,TValue>.ContainsKey(TKey) method

```csharp
public bool ContainsKey (TKey key);
```

Determines whether the `Dictionary<T1,T2>` contains the specified key.

Parameters:

- `key`: The key to locate in the `Dictionary<T1,T2>`.

Returns: `true` if the `Dictionary<T1,T2>` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method approaches an O(1) operation.

#### Examples
The following code example shows how to use the `Dictionary<T1,T2>.ContainsKey` method to test whether a key <example-value> prior to calling the `Dictionary<T1,T2>.Add` method. It also shows how to use the `Dictionary<T1,T2>.TryGetValue` method to retrieve values, which is an efficient way to retrieve values when a program frequently tries keys that are not in the dictionary. Finally, it shows the least efficient way to test whether keys exist, by using the `Dictionary<T1,T2>.Item` property (the indexer in C#).

This code example is part of a larger example provided for the `Dictionary<T1,T2>` class (`openWith` is the name of the Dictionary used in this example).

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

## Dictionary<TKey,TValue>.ContainsValue(TValue) method

```csharp
public bool ContainsValue (TValue value);
```

Determines whether the `Dictionary<T1,T2>` contains a specific value.

Parameters:

- `value`: The value to locate in the `Dictionary<T1,T2>`. The value can be `null` for reference types.

Returns: `true` if the `Dictionary<T1,T2>` contains an element with the specified value; otherwise, `false`.

#### Remarks
This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for `TValue`, the type of values in the dictionary.

This method performs a linear search; therefore, the average execution time is proportional to `Dictionary<T1,T2>.Count`. That is, this method is an O(`n`) operation, where `n` is `Dictionary<T1,T2>.Count`.

## Dictionary<TKey,TValue>.EnsureCapacity(Int32) method

```csharp
public int EnsureCapacity (int capacity);
```

Ensures that the dictionary can hold up to a specified number of entries without any further expansion of its backing storage.

Parameters:

- `capacity`: The number of entries.

Returns: The current capacity of the `Dictionary<T1,T2>`.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than 0.

#### Remarks

> **Caution:**
> If `capacity` comes from user input, prefer letting the collection resize itself as elements are added instead of calling this method. If you must use a user-specified value, either clamp it to a reasonable limit (for example, `Math.Clamp(untrustedValue, 0, 20)`) or verify that the element count matches the specified value.

## Dictionary<TKey,TValue>.GetAlternateLookup<TAlternateKey>() method

```csharp
public System.Collections.Generic.Dictionary<TKey,TValue>.AlternateLookup<TAlternateKey> GetAlternateLookup<TAlternateKey> () where TAlternateKey : <example-value> ref struct;
```

Gets an instance of a type that can be used to perform operations on the current `Dictionary<T1,T2>` using a `TAlternateKey` as a key <example-value> of a `TKey`.

Parameters:

- `TAlternateKey`: The alternate type of a key for performing lookups.

Returns: The created lookup instance.

Exceptions:

- `InvalidOperationException`: The dictionary's comparer is not compatible with `TAlternateKey`.

The dictionary must use a comparer that implements `IAlternateEqualityComparer<T1,T2>` with `TAlternateKey` and `TKey`. If it doesn't, an exception is thrown.

## Dictionary<TKey,TValue>.GetEnumerator() method

```csharp
public System.Collections.Generic.Dictionary<TKey,TValue>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `Dictionary<T1,T2>`.

Returns: A `Enumerator` structure for the `Dictionary<T1,T2>`.

#### Remarks
For purposes of enumeration, each item is a `KeyValuePair<T1,T2>` structure representing a value and its key.

The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, `Enumerator.Current` is undefined. You must call the `Enumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `Enumerator.Current`.

The `Current` property returns the same element until the `Enumerator.MoveNext` method is called. `Enumerator.MoveNext` sets `Enumerator.Current` to the next element.

If `Enumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `Enumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `Enumerator.MoveNext` also return `false`. If the last call to `Enumerator.MoveNext` returned `false`, `Enumerator.Current` is undefined. You cannot set `Enumerator.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding elements or changing the capacity, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The only mutating methods that do not invalidate enumerators are `Dictionary<T1,T2>.Remove` and `Dictionary<T1,T2>.Clear`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(1) operation.

## Dictionary<TKey,TValue>.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Implements the `ISerializable` interface and returns the data needed to serialize the `Dictionary<T1,T2>` instance.

Parameters:

- `info`: A `SerializationInfo` object that contains the information required to serialize the `Dictionary<T1,T2>` instance.
- `context`: A `StreamingContext` structure that contains the source and destination of the serialized stream associated with the `Dictionary<T1,T2>` instance.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## Dictionary<TKey,TValue>.OnDeserialization(Object) method

```csharp
public virtual void OnDeserialization (object? sender);
```

Implements the `ISerializable` interface and raises the deserialization event when the deserialization is complete.

Parameters:

- `sender`: The source of the deserialization event.

Exceptions:

- `SerializationException`: The `SerializationInfo` object associated with the current `Dictionary<T1,T2>` instance is invalid.

#### Remarks
This method is an O(`n`) operation, where `n` is `Dictionary<T1,T2>.Count`.

## Dictionary<TKey,TValue>.Remove(TKey) method

```csharp
public bool Remove (TKey key);
```

Removes the value with the specified key from the `Dictionary<T1,T2>`.

Parameters:

- `key`: The key of the element to remove.

Returns: `true` if the element is successfully found and removed; otherwise, `false`.  This method returns `false` if `key` is not found in the `Dictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
If the `Dictionary<T1,T2>` does not contain an element with the specified key, the `Dictionary<T1,T2>` remains unchanged. No exception is thrown.

This method approaches an O(1) operation.

This mutating method can be safely called without invalidating active enumerators on the `Dictionary<T1,T2>` instance. This does not imply thread safety.

#### Examples
The following code example shows how to remove a key/value pair from a dictionary using the `Dictionary<T1,T2>.Remove` method.

This code example is part of a larger example provided for the `Dictionary<T1,T2>` class (`openWith` is the name of the Dictionary used in this example).

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

## Dictionary<TKey,TValue>.Remove(TKey, TValue) method

```csharp
public bool Remove (TKey key, out TValue value);
```

Removes the value with the specified key from the `Dictionary<T1,T2>`, and copies the element to the `value` parameter.

Parameters:

- `key`: The key of the element to remove.
- `value`: The removed element.

Returns: `true` if the element is successfully found and removed; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## Dictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Add(KeyValuePair<TKey,TValue>) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.Add (System.Collections.Generic.KeyValuePair<TKey,TValue> keyValuePair);
```

Adds the specified value to the `ICollection<T>` with the specified key.

Parameters:

- `keyValuePair`: The `KeyValuePair<T1,T2>` structure representing the key and value to add to the `Dictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: The key of `keyValuePair` is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `Dictionary<T1,T2>`.

To be added.

## Dictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Contains(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Contains (System.Collections.Generic.KeyValuePair<TKey,TValue> keyValuePair);
```

Determines whether the `ICollection<T>` contains a specific key and value.

Parameters:

- `keyValuePair`: The `KeyValuePair<T1,T2>` structure to locate in the `ICollection<T>`.

Returns: `true` if `keyValuePair` is found in the `ICollection<T>`; otherwise, `false`.

To be added.

## Dictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.CopyTo(KeyValuePair<TKey,TValue>[], Int32) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.CopyTo (System.Collections.Generic.KeyValuePair<TKey,TValue>[] array, int index);
```

Copies the elements of the `ICollection<T>` to an array of type `KeyValuePair<T1,T2>`, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array of type `KeyValuePair<T1,T2>` that is the destination of the `KeyValuePair<T1,T2>` elements copied from the `ICollection<T>`. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.
- `ArgumentException`: The number of elements in the source `ICollection<T>` is greater than the available space from `index` to the end of the destination `array`.

To be added.

## Dictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Remove(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Remove (System.Collections.Generic.KeyValuePair<TKey,TValue> keyValuePair);
```

Removes a key and value from the dictionary.

Parameters:

- `keyValuePair`: The `KeyValuePair<T1,T2>` structure representing the key and value to remove from the `Dictionary<T1,T2>`.

Returns: `true` if the key and value represented by `keyValuePair` is successfully found and removed; otherwise, `false`. This method returns `false` if `keyValuePair` is not found in the `ICollection<T>`.

To be added.

## Dictionary<TKey,TValue>.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>> IEnumerable<KeyValuePair<TKey,TValue>>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## Dictionary<TKey,TValue>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection<T>` to an array, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from `ICollection<T>`. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.
- `ArgumentException`: `array` is multidimensional.

-or-

`array` does not have zero-based indexing.

-or-

The number of elements in the source `ICollection<T>` is greater than the available space from `index` to the end of the destination `array`.

-or-

The type of the source `ICollection<T>` cannot be cast automatically to the type of the destination `array`.

#### Remarks
Each element copied from a `Dictionary<T1,T2>` is a `KeyValuePair<T1,T2>` structure representing a value and its key.

> **Note:**
>  If the type of the source `ICollection` cannot be cast automatically to the type of the destination `array`, the nongeneric implementations of `ICollection.CopyTo` throw an `InvalidCastException`, whereas the generic implementations throw an `ArgumentException`.

This method is an O(`n`) operation, where `n` is `Dictionary<T1,T2>.Count`.
