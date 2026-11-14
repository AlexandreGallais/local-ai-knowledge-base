---
title: "ImmutableDictionary<TKey,TValue> class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableDictionary<TKey,TValue> class (part 2 of 2)

## ImmutableDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.CopyTo(KeyValuePair<TKey,TValue>[], Int32) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.CopyTo (System.Collections.Generic.KeyValuePair<TKey,TValue>[] array, int arrayIndex);
```

Copies the elements of the `ICollection<T>` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection<T>`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Remove(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Remove (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Removes the first occurrence of a specific object from the `ICollection<T>`.

Parameters:

- `item`: The object to remove from the `ICollection<T>`.

Returns: `true` if `item` was successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if `item` is not found in the original `ICollection<T>`.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Add(TKey, TValue) method

```csharp
void IDictionary<TKey,TValue>.Add (TKey key, TValue value);
```

Adds an element with the provided key and value to the immutable dictionary.

Parameters:

- `key`: The object to use as the key of the element to add.
- `value`: The object to use as the value of the element to add.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An element with the same key but a different value already exists in the `IDictionary<T1,T2>`.
- `NotSupportedException`: The `IDictionary<T1,T2>` is read-only.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Remove(TKey) method

```csharp
bool IDictionary<TKey,TValue>.Remove (TKey key);
```

Removes the element with the specified key from the generic dictionary.

Parameters:

- `key`: The key of the element to remove.

Returns: `true` if the element is successfully removed; otherwise, `false`.  This method also returns `false` if `key` was not found in the original generic dictionary.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `NotSupportedException`: The `IDictionary<T1,T2>` is read-only.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>> IEnumerable<KeyValuePair<TKey,TValue>>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int arrayIndex);
```

Copies the elements of the dictionary to an array, starting at a particular array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the dictionary. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableDictionary<T1,T2>` instance is cast to an `ICollection` interface.

## ImmutableDictionary<TKey,TValue>.System.Collections.IDictionary.Add(Object, Object) method

```csharp
void IDictionary.Add (object key, object value);
```

Adds an element with the provided key and value to the immutable dictionary object.

Parameters:

- `key`: The object to use as the key of the element to add.
- `value`: The object to use as the value of the element to add.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>.System.Collections.IDictionary.Clear() method

```csharp
void IDictionary.Clear ();
```

Clears this instance.

Exceptions:

- `NotSupportedException`: The dictionary object is read-only.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>.System.Collections.IDictionary.Contains(Object) method

```csharp
bool IDictionary.Contains (object key);
```

Determines whether the immutable dictionary object contains an element with the specified key.

Parameters:

- `key`: The key to locate in the dictionary object.

Returns: `true` if the dictionary contains an element with the key; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>.System.Collections.IDictionary.GetEnumerator() method

```csharp
System.Collections.IDictionaryEnumerator IDictionary.GetEnumerator ();
```

Returns an `IDictionaryEnumerator` object for the immutable dictionary object.

Returns: An enumerator object for the dictionary object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>.System.Collections.IDictionary.Remove(Object) method

```csharp
void IDictionary.Remove (object key);
```

Removes the element with the specified key from the immutable dictionary object.

Parameters:

- `key`: The key of the element to remove.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator object that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableDictionary<T1,T2>` instance is cast to an `IEnumerable` interface.

## ImmutableDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.Add(TKey, TValue) method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.Add (TKey key, TValue value);
```

See the `IImmutableDictionary<T1,T2>` interface.

Parameters:

- `key`: Key of the entry to be added.
- `value`: Value of the entry to be added.

Returns: A new immutable dictionary that contains the additional key/value pair.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.AddRange(KeyValuePair<TKey,TValue>>) method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.AddRange (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> pairs);
```

See the `IImmutableDictionary<T1,T2>` interface.

Parameters:

- `pairs`: Sequence of key/value pairs to be added to the dictionary.

Returns: A new immutable dictionary that contains the additional key/value pairs.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.Clear() method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.Clear ();
```

Retrieves an empty dictionary that has the same ordering and key-value comparison rules as this dictionary instance.

Returns: The immutable dictionary instance.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.Remove(TKey) method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.Remove (TKey key);
```

See the `IImmutableDictionary<T1,T2>` interface.

Parameters:

- `key`: Key of the entry to be removed.

Returns: A new immutable dictionary with the specified element removed; or this instance if the specified key <example-value> be found in the dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.RemoveRange(IEnumerable<TKey>) method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.RemoveRange (System.Collections.Generic.IEnumerable<TKey> keys);
```

See the `IImmutableDictionary<T1,T2>` interface.

Parameters:

- `keys`: Sequence of keys to be removed.

Returns: A new immutable dictionary with the specified keys removed; or this instance if the specified keys cannot be found in the dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.SetItem(TKey, TValue) method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.SetItem (TKey key, TValue value);
```

See the `IImmutableDictionary<T1,T2>` interface.

Parameters:

- `key`: Key of entry to be added.
- `value`: Value of the entry to be added.

Returns: A new immutable dictionary that contains the specified key/value pair.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.SetItems(KeyValuePair<TKey,TValue>>) method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.SetItems (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> items);
```

Applies a given set of key-value pairs to an immutable dictionary, replacing any conflicting keys in the resulting dictionary.

Parameters:

- `items`: The key-value pairs to set on the map. Any keys that conflict with existing keys will replace the previous values.

Returns: A copy of the immutable dictionary with updated key-value pairs.

To be added.

## ImmutableDictionary<TKey,TValue>.ToBuilder() method

```csharp
public System.Collections.Immutable.ImmutableDictionary<TKey,TValue>.Builder ToBuilder ();
```

Creates an immutable dictionary with the same contents as this dictionary that can be efficiently mutated across multiple operations by using standard mutable interfaces.

Returns: A collection with the same contents as this dictionary that can be efficiently mutated across multiple operations by using standard mutable interfaces.

#### Remarks
This is an O(1) operation and results in only a single (small) memory allocation. The mutable collection that is returned is not thread safe.

## ImmutableDictionary<TKey,TValue>.TryGetKey(TKey, TKey) method

```csharp
public bool TryGetKey (TKey <example-value>, out TKey <example-value>);
```

Determines whether this dictionary contains a specified key.

Parameters:

- `equalKey`: The key to search for.
- `actualKey`: The matching key <example-value> in the dictionary if found, or `equalkey` if no match is found.

Returns: `true` if a match for `equalKey` is found; otherwise, `false`.

#### Remarks
Following are some scenarios where `ImmutableSortedDictionary<T1,T2>.TryGetKey` may be useful:

- You want to reuse a previously stored object reference instead of creating a new reference.

- You want to look up the canonical value of an object

- You want to retrieve more complete data about an object

## ImmutableDictionary<TKey,TValue>.TryGetValue(TKey, TValue) method

```csharp
public bool TryGetValue (TKey key, out TValue value);
```

Gets the value associated with the specified key.

Parameters:

- `key`: The key whose value will be retrieved.
- `value`: When this method returns, contains the value associated with the specified key, if the key is found; otherwise, contains the default value for the type of the `value` parameter. This parameter is passed uninitialized.

Returns: `true` if the object that implements the dictionary contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is null.

To be added.

## ImmutableDictionary<TKey,TValue>.WithComparers(IEqualityComparer<TKey>) method

```csharp
public System.Collections.Immutable.ImmutableDictionary<TKey,TValue> WithComparers (System.Collections.Generic.IEqualityComparer<TKey>? keyComparer);
```

Gets an instance of the immutable dictionary that uses the specified key comparer.

Parameters:

- `keyComparer`: The key <example-value> to use.

Returns: An instance of the immutable dictionary that uses the given comparer.

To be added.

## ImmutableDictionary<TKey,TValue>.WithComparers(IEqualityComparer<TKey>, IEqualityComparer<TValue>) method

```csharp
public System.Collections.Immutable.ImmutableDictionary<TKey,TValue> WithComparers (System.Collections.Generic.IEqualityComparer<TKey>? keyComparer, System.Collections.Generic.IEqualityComparer<TValue>? valueComparer);
```

Gets an instance of the immutable dictionary that uses the specified key and value comparers.

Parameters:

- `keyComparer`: The key <example-value> to use.
- `valueComparer`: The value comparer to use.

Returns: An instance of the immutable dictionary that uses the given comparers.

To be added.

## ImmutableDictionary<TKey,TValue>.Empty field

```csharp
public static readonly System.Collections.Immutable.ImmutableDictionary<TKey,TValue> Empty;
```

Gets an empty immutable dictionary.

To be added.
