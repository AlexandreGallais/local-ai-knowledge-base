---
title: "ImmutableSortedDictionary<TKey,TValue> class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableSortedDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableSortedDictionary<TKey,TValue> class (part 2 of 2)

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.CopyTo(KeyValuePair<TKey,TValue>[], Int32) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.CopyTo (System.Collections.Generic.KeyValuePair<TKey,TValue>[] array, int arrayIndex);
```

Copies the elements of the `ICollection<T>` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection<T>`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Remove(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Remove (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Removes the first occurrence of a specific object from the `ICollection<T>`.

Parameters:

- `item`: The object to remove from the `ICollection<T>`.

Returns: `true` if `item` was successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if `item` is not found in the original `ICollection<T>`.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Add(TKey, TValue) method

```csharp
void IDictionary<TKey,TValue>.Add (TKey key, TValue value);
```

Adds an element with the provided key and value to the generic dictionary.

Parameters:

- `key`: The object to use as the key of the element to add.
- `value`: The object to use as the value of the element to add.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `IDictionary<T1,T2>`.
- `NotSupportedException`: The `IDictionary<T1,T2>` is read-only.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Remove(TKey) method

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

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>> IEnumerable<KeyValuePair<TKey,TValue>>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the dictionary to an array, starting at a particular array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the dictionary. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedDictionary<T1,T2>` instance is cast to an `ICollection` interface.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.IDictionary.Add(Object, Object) method

```csharp
void IDictionary.Add (object key, object value);
```

Adds an element with the provided key and value to the dictionary object.

Parameters:

- `key`: The object to use as the key of the element to add.
- `value`: The object to use as the value of the element to add.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.IDictionary.Clear() method

```csharp
void IDictionary.Clear ();
```

Clears this instance.

Exceptions:

- `NotSupportedException`: The dictionary object is read-only.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.IDictionary.Contains(Object) method

```csharp
bool IDictionary.Contains (object key);
```

Determines whether the immutable dictionary object contains an element with the specified key.

Parameters:

- `key`: The key to locate in the dictionary object.

Returns: `true` if the dictionary contains an element with the key; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.IDictionary.GetEnumerator() method

```csharp
System.Collections.IDictionaryEnumerator IDictionary.GetEnumerator ();
```

Returns an `IDictionaryEnumerator` object for the immutable dictionary object.

Returns: An enumerator object for the dictionary object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.IDictionary.Remove(Object) method

```csharp
void IDictionary.Remove (object key);
```

Removes the element with the specified key from the immutable dictionary object.

Parameters:

- `key`: The key of the element to remove.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator object that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedDictionary<T1,T2>` instance is cast to an `IEnumerable` interface.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.Add(TKey, TValue) method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.Add (TKey key, TValue value);
```

See the `IImmutableDictionary<T1,T2>` interface.

Parameters:

- `key`: Key of the entry to be added.
- `value`: Value of the entry to be added.

Returns: The `IImmutableDictionary<T1,T2>` instance.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.AddRange(KeyValuePair<TKey,TValue>>) method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.AddRange (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> pairs);
```

See the `IImmutableDictionary<T1,T2>` interface.

Parameters:

- `pairs`: Sequence of key/value pairs to be added.

Returns: The `IImmutableDictionary<T1,T2>` instance.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.Clear() method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.Clear ();
```

See the `IImmutableDictionary<T1,T2>` interface.

Returns: The `IImmutableDictionary<T1,T2>` instance.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.Remove(TKey) method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.Remove (TKey key);
```

See the `IImmutableDictionary<T1,T2>` interface.

Parameters:

- `key`: Key of entry to be removed.

Returns: The `IImmutableDictionary<T1,T2>` instance.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.RemoveRange(IEnumerable<TKey>) method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.RemoveRange (System.Collections.Generic.IEnumerable<TKey> keys);
```

See the `IImmutableDictionary<T1,T2>` interface.

Parameters:

- `keys`: Sequence of keys to be removed.

Returns: The `IImmutableDictionary<T1,T2>` instance.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.SetItem(TKey, TValue) method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.SetItem (TKey key, TValue value);
```

See the `IImmutableDictionary<T1,T2>` interface.

Parameters:

- `key`: Key of entry to be updated.
- `value`: Value of entry to be updated.

Returns: The `IImmutableDictionary<T1,T2>` instance.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.System.Collections.Immutable.IImmutableDictionary<TKey,TValue>.SetItems(KeyValuePair<TKey,TValue>>) method

```csharp
System.Collections.Immutable.IImmutableDictionary<TKey,TValue> IImmutableDictionary<TKey,TValue>.SetItems (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> items);
```

Applies a given set of key-value pairs to an immutable dictionary, replacing any conflicting keys in the resulting dictionary.

Parameters:

- `items`: A set of key-value pairs to set on the map.

Returns: The `IImmutableDictionary<T1,T2>` instance.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.ToBuilder() method

```csharp
public System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue>.Builder ToBuilder ();
```

Creates an immutable sorted dictionary with the same contents as this dictionary that can be efficiently mutated across multiple operations by using standard mutable interfaces.

Returns: A collection with the same contents as this dictionary.

#### Remarks
This is an O(1) operation and results in only a single (small) memory allocation. The mutable collection that is returned is not thread safe.

## ImmutableSortedDictionary<TKey,TValue>.TryGetKey(TKey, TKey) method

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

## ImmutableSortedDictionary<TKey,TValue>.TryGetValue(TKey, TValue) method

```csharp
public bool TryGetValue (TKey key, out TValue value);
```

Gets the value associated with the specified key.

Parameters:

- `key`: The key whose value will be retrieved.
- `value`: When this method returns, contains the value associated with the specified key, if the key is found; otherwise, contains the default value for the type of the `value` parameter.

Returns: `true` if the dictionary contains an element with the specified key; otherwise, `false`.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.ValueRef(TKey) method

```csharp
public ref readonly TValue ValueRef (TKey key);
```

Returns a read-only reference to the value associated with the provided `key`.

Parameters:

- `key`: Key of the entry to be looked up.

Returns: A read-only reference to the value associated with the provided `key`.

Exceptions:

- `KeyNotFoundException`: The `key` is not present.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.WithComparers(IComparer<TKey>) method

```csharp
public System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> WithComparers (System.Collections.Generic.IComparer<TKey>? keyComparer);
```

Gets an instance of the immutable sorted dictionary that uses the specified key comparer.

Parameters:

- `keyComparer`: The key <example-value> to use.

Returns: An instance of the immutable dictionary that uses the given comparer.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.WithComparers(IComparer<TKey>, IEqualityComparer<TValue>) method

```csharp
public System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> WithComparers (System.Collections.Generic.IComparer<TKey>? keyComparer, System.Collections.Generic.IEqualityComparer<TValue>? valueComparer);
```

Gets an instance of the immutable sorted dictionary that uses the specified key and value comparers.

Parameters:

- `keyComparer`: The key <example-value> to use.
- `valueComparer`: The value comparer to use.

Returns: An instance of the immutable dictionary that uses the given comparers.

To be added.

## ImmutableSortedDictionary<TKey,TValue>.Empty field

```csharp
public static readonly System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> Empty;
```

Gets an empty immutable sorted dictionary.

To be added.
