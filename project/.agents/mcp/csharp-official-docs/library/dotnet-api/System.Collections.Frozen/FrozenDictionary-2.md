---
title: "FrozenDictionary<TKey,TValue> class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Frozen/FrozenDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FrozenDictionary<TKey,TValue> class

Namespace: `System.Collections.Frozen`

```csharp
public abstract class FrozenDictionary<TKey,TValue> : System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IDictionary<TKey,TValue>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>, System.Collections.IDictionary
```

Provides an immutable, read-only dictionary optimized for fast lookup and enumeration.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in this dictionary.

`FrozenDictionary<T1,T2>` is immutable and is optimized for situations where a dictionary is created infrequently but is used frequently at run time. It has a relatively high cost to create but provides excellent lookup performance. Thus, it is ideal for cases where a dictionary is created once, potentially at the startup of an application, and is used throughout the remainder of the life of the application. `FrozenDictionary<T1,T2>` should only be initialized with trusted keys, as the details of the keys impacts construction time.

## FrozenDictionary<TKey,TValue>.Comparer property

```csharp
public System.Collections.Generic.IEqualityComparer<TKey> Comparer { get; }
```

Gets the comparer used by this dictionary.

Returns: To be added.

To be added.

## FrozenDictionary<TKey,TValue>.Count property

```csharp
public int Count { get; }
```

Gets the number of key/value pairs contained in the dictionary.

Returns: To be added.

To be added.

## FrozenDictionary<TKey,TValue>.Empty property

```csharp
public static System.Collections.Frozen.FrozenDictionary<TKey,TValue> Empty { get; }
```

Gets an empty `FrozenDictionary<T1,T2>`.

Returns: To be added.

To be added.

## FrozenDictionary<TKey,TValue>.Item property

```csharp
public ref readonly TValue this[TKey key] { get; }
```

Gets a reference to the value associated with the specified key.

Parameters:

- `key`: The key of the value to get.

Returns: A reference to the value associated with the specified key.

Exceptions:

- `KeyNotFoundException`: `key` does not exist in the collection.

To be added.

## FrozenDictionary<TKey,TValue>.Keys property

```csharp
public System.Collections.Immutable.ImmutableArray<TKey> Keys { get; }
```

Gets a collection containing the keys in the dictionary.

Returns: To be added.

The order of the keys in the dictionary is unspecified, but it is the same order as the associated values returned by the `FrozenDictionary<T1,T2>.Values` property.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Item property

```csharp
TValue System.Collections.Generic.IDictionary<TKey,TValue>.Item[TKey key] { get; set; }
```

Gets or sets the element with the specified key.

Parameters:

- `key`: The key of the element to get or set.

Returns: The element with the specified key.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.ICollection<TKey> System.Collections.Generic.IDictionary<TKey,TValue>.Keys { get; }
```

Gets an `ICollection<T>` containing the keys of the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the keys of the object that implements `IDictionary<T1,T2>`.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.ICollection<TValue> System.Collections.Generic.IDictionary<TKey,TValue>.Values { get; }
```

Gets an `ICollection<T>` containing the values in the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the values in the object that implements `IDictionary<T1,T2>`.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Item property

```csharp
TValue System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Item[TKey key] { get; }
```

Gets the element that has the specified key in the read-only dictionary.

Parameters:

- `key`: The key to locate.

Returns: The element that has the specified key in the read-only dictionary.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.IEnumerable<TKey> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys { get; }
```

Gets an enumerable collection that contains the keys in the read-only dictionary.

Returns: An enumerable collection that contains the keys in the read-only dictionary.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.IEnumerable<TValue> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values { get; }
```

Gets an enumerable collection that contains the values in the read-only dictionary.

Returns: An enumerable collection that contains the values in the read-only dictionary.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.IDictionary.IsFixedSize property

```csharp
bool System.Collections.IDictionary.IsFixedSize { get; }
```

Gets a value indicating whether the `IDictionary` object has a fixed size.

Returns: `true` if the `IDictionary` object has a fixed size; otherwise, `false`.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.IDictionary.IsReadOnly property

```csharp
bool System.Collections.IDictionary.IsReadOnly { get; }
```

Gets a value indicating whether the `IDictionary` object is read-only.

Returns: `true` if the `IDictionary` object is read-only; otherwise, `false`.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.IDictionary.Item property

```csharp
object? System.Collections.IDictionary.Item[object key] { get; set; }
```

Gets or sets the element with the specified key.

Parameters:

- `key`: The key of the element to get or set.

Returns: The element with the specified key, or `null` if the key does not exist.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.IDictionary.Keys property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Keys { get; }
```

Gets an `ICollection` object containing the keys of the `IDictionary` object.

Returns: An `ICollection` object containing the keys of the `IDictionary` object.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.IDictionary.Values property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Values { get; }
```

Gets an `ICollection` object containing the values in the `IDictionary` object.

Returns: An `ICollection` object containing the values in the `IDictionary` object.

To be added.

## FrozenDictionary<TKey,TValue>.Values property

```csharp
public System.Collections.Immutable.ImmutableArray<TValue> Values { get; }
```

Gets a collection containing the values in the dictionary.

Returns: To be added.

The order of the values in the dictionary is unspecified, but it is the same order as the associated keys returned by the `FrozenDictionary<T1,T2>.Keys` property.

## FrozenDictionary<TKey,TValue>.ContainsKey(TKey) method

```csharp
public bool ContainsKey (TKey key);
```

Determines whether the dictionary contains the specified key.

Parameters:

- `key`: The key to locate in the dictionary.

Returns: `true` if the dictionary contains an element with the specified key; otherwise, `false`.

To be added.

## FrozenDictionary<TKey,TValue>.CopyTo(KeyValuePair<TKey,TValue>>) method

```csharp
public void CopyTo (Span<System.Collections.Generic.KeyValuePair<TKey,TValue>> destination);
```

Copies the elements of the dictionary to a span of type `KeyValuePair<T1,T2>`.

Parameters:

- `destination`: The span that is the destination of the elements copied from the dictionary.

To be added.

## FrozenDictionary<TKey,TValue>.CopyTo(KeyValuePair<TKey,TValue>[], Int32) method

```csharp
public void CopyTo (System.Collections.Generic.KeyValuePair<TKey,TValue>[] destination, int destinationIndex);
```

Copies the elements of the dictionary to an array of type `KeyValuePair<T1,T2>`, starting at the specified `destinationIndex`.

Parameters:

- `destination`: The array that is the destination of the elements copied from the dictionary.
- `destinationIndex`: The zero-based index in `destination` at which copying begins.

To be added.

## FrozenDictionary<TKey,TValue>.GetAlternateLookup<TAlternateKey>() method

```csharp
public System.Collections.Frozen.FrozenDictionary<TKey,TValue>.AlternateLookup<TAlternateKey> GetAlternateLookup<TAlternateKey> () where TAlternateKey : <example-value> ref struct;
```

Gets an instance of a type that may be used to perform operations on a `FrozenDictionary<T1,T2>` using a `TAlternateKey` as a key <example-value> of a `TKey`.

Parameters:

- `TAlternateKey`: The alternate type of a key for performing lookups.

Returns: The created lookup instance.

Exceptions:

- `InvalidOperationException`: This instance's comparer is not compatible with `TAlternateKey`.

This instance must be using a comparer that implements
`IAlternateEqualityComparer<T1,T2>`
with `TAlternateKey` and `TKey`.
If it doesn't, an exception will be thrown.

## FrozenDictionary<TKey,TValue>.GetEnumerator() method

```csharp
public System.Collections.Frozen.FrozenDictionary<TKey,TValue>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the dictionary.

Returns: An enumerator that iterates through the dictionary.

To be added.

## FrozenDictionary<TKey,TValue>.GetValueRefOrNullRef(TKey) method

```csharp
public ref readonly TValue GetValueRefOrNullRef (TKey key);
```

Gets either a reference to a `TValue` in the dictionary or a `null` reference if the key does not exist in the dictionary.

Parameters:

- `key`: The key used for lookup.

Returns: A reference to a `TValue` in the dictionary or a `null` reference if the key does not exist in the dictionary.

The `null` reference can be detected by calling `Unsafe.IsNullRef<T>`.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Add(KeyValuePair<TKey,TValue>) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.Add (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Adds an item to the `ICollection<T>`.

Parameters:

- `item`: The object to add to the `ICollection<T>`.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Clear() method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.Clear ();
```

Removes all items from the `ICollection<T>`.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Contains(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Contains (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Determines whether the `ICollection<T>` contains a specific value.

Parameters:

- `item`: The object to locate in the `ICollection<T>`.

Returns: `true` if `item` is found in the `ICollection<T>`; otherwise, `false`.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Remove(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Remove (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Removes the first occurrence of a specific object from the `ICollection<T>`.

Parameters:

- `item`: The object to remove from the `ICollection<T>`.

Returns: `true` if `item` was successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if `item` is not found in the original `ICollection<T>`.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Add(TKey, TValue) method

```csharp
void IDictionary<TKey,TValue>.Add (TKey key, TValue value);
```

Adds an element with the provided key and value to the `IDictionary<T1,T2>`.

Parameters:

- `key`: The object to use as the key of the element to add.
- `value`: The object to use as the value of the element to add.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Remove(TKey) method

```csharp
bool IDictionary<TKey,TValue>.Remove (TKey key);
```

Removes the element with the specified key from the `IDictionary<T1,T2>`.

Parameters:

- `key`: The key of the element to remove.

Returns: `true` if the element is successfully removed; otherwise, `false`.  This method also returns `false` if `key` was not found in the original `IDictionary<T1,T2>`.

To be added.

## FrozenDictionary<TKey,TValue>.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>> IEnumerable<KeyValuePair<TKey,TValue>>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.
