---
title: "ImmutableDictionary<TKey,TValue>+Builder class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableDictionary`2+Builder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableDictionary<TKey,TValue>+Builder class

Namespace: `System.Collections.Immutable`

```csharp
public sealed class ImmutableDictionary<TKey,TValue>.Builder : System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IDictionary<TKey,TValue>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>, System.Collections.IDictionary
```

Represents a hash map that mutates with little or no memory allocations and that can produce or build on immutable hash map instances efficiently.

#### Remarks
Although `ImmutableDictionary<T1,T2>.AddRange` and other methods already provide fast bulk change operations on a collection, the `Builder` class allows multiple combinations of changes to be made to a set with equal efficiency.

## ImmutableDictionary<TKey,TValue>+Builder.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the immutable dictionary.

Returns: The number of elements contained in the immutable dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.Item property

```csharp
public TValue this[TKey key] { get; set; }
```

Gets or sets the element with the specified key.

Parameters:

- `key`: The element to get or set.

Returns: The element that has the specified key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `KeyNotFoundException`: The property is being retrieved, and `key` is not found.
- `NotSupportedException`: The property is being set, and the `IDictionary<T1,T2>` is read-only.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.KeyComparer property

```csharp
public System.Collections.Generic.IEqualityComparer<TKey> KeyComparer { get; set; }
```

Gets or sets the key comparer.

Returns: The key comparer.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.Keys property

```csharp
public System.Collections.Generic.IEnumerable<TKey> Keys { get; }
```

Gets a collection that contains the keys of the immutable dictionary.

Returns: A collection that contains the keys of the object that implements the immutable dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly { get; }
```

Gets a value that indicates whether the collection is read-only.

Returns: `true` if the collection is read-only; otherwise, `false`.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.Generic.IDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.ICollection<TKey> System.Collections.Generic.IDictionary<TKey,TValue>.Keys { get; }
```

Gets a collection containing the keys of the generic dictionary.

Returns: A collection containing the keys of the object that implements the generic dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.Generic.IDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.ICollection<TValue> System.Collections.Generic.IDictionary<TKey,TValue>.Values { get; }
```

Gets a collection containing the values in the generic dictionary.

Returns: A collection containing the values in the object that implements the generic dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value that indicates whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `ICollection` interface.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `ICollection` interface.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.IDictionary.IsFixedSize property

```csharp
bool System.Collections.IDictionary.IsFixedSize { get; }
```

Gets a value that indicates whether the `IDictionary` object has a fixed size.

Returns: `true` if the `IDictionary` object has a fixed size; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.IDictionary.IsReadOnly property

```csharp
bool System.Collections.IDictionary.IsReadOnly { get; }
```

Gets a value that indicates whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.IDictionary.Item property

```csharp
object? System.Collections.IDictionary.Item[object key] { get; set; }
```

Gets or sets the element with the specified key.

Parameters:

- `key`: The key.

Returns: Value stored under specified key.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.IDictionary.Keys property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Keys { get; }
```

Gets an `ICollection<T>` containing the keys of the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the keys of the object that implements `IDictionary<T1,T2>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.IDictionary.Values property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Values { get; }
```

Gets an `ICollection<T>` containing the values in the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the values in the object that implements `IDictionary<T1,T2>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>+Builder.ValueComparer property

```csharp
public System.Collections.Generic.IEqualityComparer<TValue> ValueComparer { get; set; }
```

Gets or sets the value comparer.

Returns: The value comparer.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.Values property

```csharp
public System.Collections.Generic.IEnumerable<TValue> Values { get; }
```

Gets a collection that contains the values of the immutable dictionary.

Returns: A collection that contains the values of the object that implements the dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.Add(KeyValuePair<TKey,TValue>) method

```csharp
public void Add (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Adds the specified item to the immutable dictionary.

Parameters:

- `item`: The object to add to the dictionary.

Exceptions:

- `NotSupportedException`: The dictionary is read-only.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.Add(TKey, TValue) method

```csharp
public void Add (TKey key, TValue value);
```

Adds an element that has the specified key and value to the immutable dictionary.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add.

Exceptions:

- `ArgumentNullException`: `key` is null.
- `ArgumentException`: An element with the same key but a different value already exists in the dictionary.
- `NotSupportedException`: The dictionary is read-only.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.AddRange(KeyValuePair<TKey,TValue>>) method

```csharp
public void AddRange (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> items);
```

Adds a sequence of values to this collection.

Parameters:

- `items`: The items to add to this collection.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.Clear() method

```csharp
public void Clear ();
```

Removes all items from the immutable dictionary.

Exceptions:

- `NotSupportedException`: The dictionary is read-only.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.Contains(KeyValuePair<TKey,TValue>) method

```csharp
public bool Contains (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Determines whether the immutable dictionary contains a specific value.

Parameters:

- `item`: The object to locate in the dictionary.

Returns: `true` if `item` is found in the dictionary; otherwise, `false`.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.ContainsKey(TKey) method

```csharp
public bool ContainsKey (TKey key);
```

Determines whether the immutable dictionary contains an element that has the specified key.

Parameters:

- `key`: The key to locate in the dictionary.

Returns: `true` if the dictionary contains an element with the key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is null.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.ContainsValue(TValue) method

```csharp
public bool ContainsValue (TValue value);
```

Determines whether the immutable dictionary contains an element that has the specified value.

Parameters:

- `value`: The value to locate in the immutable dictionary. The value can be `null` for reference types.

Returns: `true` if the dictionary contains an element with the specified value; otherwise, `false`.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.GetEnumerator() method

```csharp
public System.Collections.Immutable.ImmutableDictionary<TKey,TValue>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the immutable dictionary.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.GetValueOrDefault(TKey) method

```csharp
public TValue? GetValueOrDefault (TKey key);
```

Gets the value for a given key if a matching key <example-value> in the dictionary.

Parameters:

- `key`: The key to search for.

Returns: The value for the key, or `default(TValue)` if no matching key was found.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.GetValueOrDefault(TKey, TValue) method

```csharp
public TValue GetValueOrDefault (TKey key, TValue defaultValue);
```

Gets the value for a given key if a matching key <example-value> in the dictionary.

Parameters:

- `key`: The key to search for.
- `defaultValue`: The default value to return if no matching key is found in the dictionary.

Returns: The value for the key, or `defaultValue` if no matching key was found.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.Remove(KeyValuePair<TKey,TValue>) method

```csharp
public bool Remove (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Removes the first occurrence of a specific object from the immutable dictionary.

Parameters:

- `item`: The object to remove from the dictionary.

Returns: `true` if `item` was successfully removed from the dictionary; otherwise, `false`. This method also returns false if `item` is not found in the dictionary.

Exceptions:

- `NotSupportedException`: The dictionary is read-only.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.Remove(TKey) method

```csharp
public bool Remove (TKey key);
```

Removes the element with the specified key from the immutable dictionary.

Parameters:

- `key`: The key of the element to remove.

Returns: `true` if the element is successfully removed; otherwise, `false`.  This method also returns `false` if `key` was not found in the dictionary.

Exceptions:

- `ArgumentNullException`: `key` is null.
- `NotSupportedException`: The dictionary is read-only.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.RemoveRange(IEnumerable<TKey>) method

```csharp
public void RemoveRange (System.Collections.Generic.IEnumerable<TKey> keys);
```

Removes any entries with keys that match those found in the specified sequence from the immutable dictionary.

Parameters:

- `keys`: The keys for entries to remove from the dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.CopyTo(KeyValuePair<TKey,TValue>[], Int32) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.CopyTo (System.Collections.Generic.KeyValuePair<TKey,TValue>[] array, int arrayIndex);
```

Copies the elements of the dictionary to an array of type `KeyValuePair<T1,T2>`, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the dictionary. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>> IEnumerable<KeyValuePair<TKey,TValue>>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## ImmutableDictionary<TKey,TValue>+Builder.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int arrayIndex);
```

Copies the elements of the dictionary to an array of type `KeyValuePair<T1,T2>`, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array of type `KeyValuePair<T1,T2>` that is the destination of the elements copied from the dictionary. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `ICollection` interface.
