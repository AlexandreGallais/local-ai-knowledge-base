---
title: "ImmutableDictionary<TKey,TValue> class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableDictionary<TKey,TValue> class

Namespace: `System.Collections.Immutable`

```csharp
public sealed class ImmutableDictionary<TKey,TValue> : System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IDictionary<TKey,TValue>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>, System.Collections.IDictionary, System.Collections.Immutable.IImmutableDictionary<TKey,TValue>
```

Represents an immutable, unordered collection of keys and values.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.

#### Remarks
When you manipulate an immutable dictionary a copy of the original dictionary is made, manipulations applied and a new immutable dictionary is returned.

#### Examples
This example shows how to create an immutable dictionary and get values from it:

_Code sample not included: ~/snippets/csharp/System.Collections.Immutable/ImmutableDictionary`2/Overview/ImmutableDictionarySnippets.cs._
This example shows how to create a new immutable dictionary by adding and removing values from the original dictionary:

_Code sample not included: ~/snippets/csharp/System.Collections.Immutable/ImmutableDictionary`2/Overview/ImmutableDictionarySnippets.cs._
## ImmutableDictionary<TKey,TValue>.Count property

```csharp
public int Count { get; }
```

Gets the number of key/value pairs in the immutable dictionary.

Returns: The number of key/value pairs in the dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether this instance of the immutable dictionary is empty.

Returns: `true` if this instance is empty; otherwise, `false`.

To be added.

## ImmutableDictionary<TKey,TValue>.Item property

```csharp
public TValue this[TKey key] { get; }
```

Gets the `TValue` associated with the specified key.

Parameters:

- `key`: The type of the key.

Returns: The value associated with the specified key. If no results are found, the operation throws an exception.

To be added.

## ImmutableDictionary<TKey,TValue>.KeyComparer property

```csharp
public System.Collections.Generic.IEqualityComparer<TKey> KeyComparer { get; }
```

Gets the key <example-value> for the immutable dictionary.

Returns: The key comparer.

To be added.

## ImmutableDictionary<TKey,TValue>.Keys property

```csharp
public System.Collections.Generic.IEnumerable<TKey> Keys { get; }
```

Gets the keys in the immutable dictionary.

Returns: The keys in the immutable dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Item property

```csharp
TValue System.Collections.Generic.IDictionary<TKey,TValue>.Item[TKey key] { get; set; }
```

Gets or sets the `TValue` with the specified key.

Parameters:

- `key`: The type of the key.

Returns: An object of type `TValue` associated with the `key`.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.ICollection<TKey> System.Collections.Generic.IDictionary<TKey,TValue>.Keys { get; }
```

Gets the keys.

Returns: A collection containing the keys.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.ICollection<TValue> System.Collections.Generic.IDictionary<TKey,TValue>.Values { get; }
```

Gets the values.

Returns: A collection containing the values.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableDictionary<T1,T2>` instance is cast to an `ICollection` interface.

## ImmutableDictionary<TKey,TValue>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableDictionary<T1,T2>` instance is cast to an `ICollection` interface.

## ImmutableDictionary<TKey,TValue>.System.Collections.IDictionary.IsFixedSize property

```csharp
bool System.Collections.IDictionary.IsFixedSize { get; }
```

Gets a value indicating whether the `IDictionary` object has a fixed size.

Returns: `true` if the `IDictionary` object has a fixed size; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>.System.Collections.IDictionary.IsReadOnly property

```csharp
bool System.Collections.IDictionary.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>.System.Collections.IDictionary.Item property

```csharp
object? System.Collections.IDictionary.Item[object key] { get; set; }
```

Gets or sets the element with the specified key.

Parameters:

- `key`: The key.

Returns: The value stored under the specified key.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.IDictionary.Keys property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Keys { get; }
```

Gets an `ICollection<T>` containing the keys of the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the keys of the object that implements `IDictionary<T1,T2>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>.System.Collections.IDictionary.Values property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Values { get; }
```

Gets an `ICollection<T>` containing the values in the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the values in the object that implements `IDictionary<T1,T2>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ImmutableDictionary<TKey,TValue>.ValueComparer property

```csharp
public System.Collections.Generic.IEqualityComparer<TValue> ValueComparer { get; }
```

Gets the value comparer used to determine whether values are equal.

Returns: The value comparer used to determine whether values are equal.

Value comparison is used as a performance optimization when updating immutable collections: equal values do not get replaced in order to minimize the amount of copying required.

## ImmutableDictionary<TKey,TValue>.Values property

```csharp
public System.Collections.Generic.IEnumerable<TValue> Values { get; }
```

Gets the values in the immutable dictionary.

Returns: The values in the immutable dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>.Add(TKey, TValue) method

```csharp
public System.Collections.Immutable.ImmutableDictionary<TKey,TValue> Add (TKey key, TValue value);
```

Adds an element with the specified key and value to the immutable dictionary.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add.

Returns: A new immutable dictionary that contains the additional key/value pair.

Exceptions:

- `ArgumentException`: The given key <example-value> exists in the dictionary but has a different value.

#### Remarks
If the given key/value pair already exists in the dictionary, the existing instance of the dictionary is returned.

## ImmutableDictionary<TKey,TValue>.AddRange(KeyValuePair<TKey,TValue>>) method

```csharp
public System.Collections.Immutable.ImmutableDictionary<TKey,TValue> AddRange (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> pairs);
```

Adds the specified key/value pairs to the immutable dictionary.

Parameters:

- `pairs`: The key/value pairs to add.

Returns: A new immutable dictionary that contains the additional key/value pairs.

Exceptions:

- `ArgumentException`: One of the given keys already exists in the dictionary but has a different value.

To be added.

## ImmutableDictionary<TKey,TValue>.Clear() method

```csharp
public System.Collections.Immutable.ImmutableDictionary<TKey,TValue> Clear ();
```

Retrieves an empty immutable dictionary that has the same ordering and key/value comparison rules as this dictionary instance.

Returns: An empty dictionary with equivalent ordering and key/value comparison rules.

To be added.

## ImmutableDictionary<TKey,TValue>.Contains(KeyValuePair<TKey,TValue>) method

```csharp
public bool Contains (System.Collections.Generic.KeyValuePair<TKey,TValue> pair);
```

Determines whether this immutable dictionary contains the specified key/value pair.

Parameters:

- `pair`: The key/value pair to locate.

Returns: `true` if the specified key/value pair is found in the dictionary; otherwise, `false`.

To be added.

## ImmutableDictionary<TKey,TValue>.ContainsKey(TKey) method

```csharp
public bool ContainsKey (TKey key);
```

Determines whether the immutable dictionary contains an element with the specified key.

Parameters:

- `key`: The key to locate.

Returns: `true` if the immutable dictionary contains an element with the specified key; otherwise, `false`.

To be added.

## ImmutableDictionary<TKey,TValue>.ContainsValue(TValue) method

```csharp
public bool ContainsValue (TValue value);
```

Determines whether the immutable dictionary contains an element with the specified value.

Parameters:

- `value`: The value to locate. The value can be `null` for reference types.

Returns: `true` if the dictionary contains an element with the specified value; otherwise, `false`.

To be added.

## ImmutableDictionary<TKey,TValue>.GetEnumerator() method

```csharp
public System.Collections.Immutable.ImmutableDictionary<TKey,TValue>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the immutable dictionary.

Returns: An enumerator that can be used to iterate through the dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>.Remove(TKey) method

```csharp
public System.Collections.Immutable.ImmutableDictionary<TKey,TValue> Remove (TKey key);
```

Removes the element with the specified key from the immutable dictionary.

Parameters:

- `key`: The key of the element to remove.

Returns: A new immutable dictionary with the specified element removed; or this instance if the specified key <example-value> be found in the dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>.RemoveRange(IEnumerable<TKey>) method

```csharp
public System.Collections.Immutable.ImmutableDictionary<TKey,TValue> RemoveRange (System.Collections.Generic.IEnumerable<TKey> keys);
```

Removes the elements with the specified keys from the immutable dictionary.

Parameters:

- `keys`: The keys of the elements to remove.

Returns: A new immutable dictionary with the specified keys removed; or this instance if the specified keys cannot be found in the dictionary.

To be added.

## ImmutableDictionary<TKey,TValue>.SetItem(TKey, TValue) method

```csharp
public System.Collections.Immutable.ImmutableDictionary<TKey,TValue> SetItem (TKey key, TValue value);
```

Sets the specified key and value in the immutable dictionary, possibly overwriting an existing value for the key.

Parameters:

- `key`: The key of the entry to add.
- `value`: The key value to set.

Returns: A new immutable dictionary that contains the specified key/value pair.

#### Remarks
If the specified key/value pair already exists in the dictionary, this method returns the existing instance of the dictionary. If the key <example-value> exists but has a different value, this method returns a new instance of the dictionary with the overwritten value.

## ImmutableDictionary<TKey,TValue>.SetItems(KeyValuePair<TKey,TValue>>) method

```csharp
public System.Collections.Immutable.ImmutableDictionary<TKey,TValue> SetItems (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> items);
```

Sets the specified key/value pairs in the immutable dictionary, possibly overwriting existing values for the keys.

Parameters:

- `items`: The key/value pairs to set in the dictionary. If any of the keys already exist in the dictionary, this method will overwrite their previous values.

Returns: A new immutable dictionary that contains the specified key/value pairs.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Add(KeyValuePair<TKey,TValue>) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.Add (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Adds an item to the `ICollection<T>`.

Parameters:

- `item`: The object to add to the `ICollection<T>`.

To be added.

## ImmutableDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Clear() method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.Clear ();
```

Removes all items from the `ICollection<T>`.

To be added.
