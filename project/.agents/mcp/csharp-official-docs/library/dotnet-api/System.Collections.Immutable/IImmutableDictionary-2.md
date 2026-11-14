---
title: "IImmutableDictionary<TKey,TValue> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/IImmutableDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IImmutableDictionary<TKey,TValue> interface

Namespace: `System.Collections.Immutable`

```csharp
public interface IImmutableDictionary<TKey,TValue> : System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>
```

Represents an immutable collection of key/value pairs.

Parameters:

- `TKey`: The type of keys in the dictionary.
- `TValue`: The type of values in the dictionary.

#### Remarks
A `IImmutableDictionary<T1,T2>` requires an equality comparer implementation to determine if two keys are equal.

## IImmutableDictionary<TKey,TValue>.Add(TKey, TValue) method

```csharp
public System.Collections.Immutable.IImmutableDictionary<TKey,TValue> Add (TKey key, TValue value);
```

Adds an element with the specified key and value to the dictionary.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add.

Returns: A new immutable dictionary that contains the additional key/value pair.

Exceptions:

- `ArgumentException`: The given key <example-value> exists in the dictionary but has a different value.

#### Remarks
If the given key/value pair already exists in the dictionary, this method returns the existing instance of the dictionary.

## IImmutableDictionary<TKey,TValue>.AddRange(KeyValuePair<TKey,TValue>>) method

```csharp
public System.Collections.Immutable.IImmutableDictionary<TKey,TValue> AddRange (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> pairs);
```

Adds the specified key/value pairs to the dictionary.

Parameters:

- `pairs`: The key/value pairs to add.

Returns: A new immutable dictionary that contains the additional key/value pairs.

Exceptions:

- `ArgumentException`: One of the given keys already exists in the dictionary but has a different value.

To be added.

## IImmutableDictionary<TKey,TValue>.Clear() method

```csharp
public System.Collections.Immutable.IImmutableDictionary<TKey,TValue> Clear ();
```

Retrieves an empty dictionary that has the same ordering and key/value comparison rules as this dictionary instance.

Returns: An empty dictionary with equivalent ordering and key/value comparison rules.

To be added.

## IImmutableDictionary<TKey,TValue>.Contains(KeyValuePair<TKey,TValue>) method

```csharp
public bool Contains (System.Collections.Generic.KeyValuePair<TKey,TValue> pair);
```

Determines whether the immutable dictionary contains the specified key/value pair.

Parameters:

- `pair`: The key/value pair to locate.

Returns: `true` if the specified key/value pair is found in the dictionary; otherwise, `false`.

To be added.

## IImmutableDictionary<TKey,TValue>.Remove(TKey) method

```csharp
public System.Collections.Immutable.IImmutableDictionary<TKey,TValue> Remove (TKey key);
```

Removes the element with the specified key from the immutable dictionary.

Parameters:

- `key`: The key of the element to remove.

Returns: A new immutable dictionary with the specified element removed; or this instance if the specified key <example-value> be found in the dictionary.

To be added.

## IImmutableDictionary<TKey,TValue>.RemoveRange(IEnumerable<TKey>) method

```csharp
public System.Collections.Immutable.IImmutableDictionary<TKey,TValue> RemoveRange (System.Collections.Generic.IEnumerable<TKey> keys);
```

Removes the elements with the specified keys from the immutable dictionary.

Parameters:

- `keys`: The keys of the elements to remove.

Returns: A new immutable dictionary with the specified keys removed; or this instance if the specified keys cannot be found in the dictionary.

To be added.

## IImmutableDictionary<TKey,TValue>.SetItem(TKey, TValue) method

```csharp
public System.Collections.Immutable.IImmutableDictionary<TKey,TValue> SetItem (TKey key, TValue value);
```

Sets the specified key and value in the immutable dictionary, possibly overwriting an existing value for the key.

Parameters:

- `key`: The key of the entry to add.
- `value`: The key value to set.

Returns: A new immutable dictionary that contains the specified key/value pair.

#### Remarks
If the specified key/value pair already exists in the dictionary, this method returns the existing instance. If the key <example-value> exists but has a different value, this method returns a new instance of the dictionary with the overwritten value.

## IImmutableDictionary<TKey,TValue>.SetItems(KeyValuePair<TKey,TValue>>) method

```csharp
public System.Collections.Immutable.IImmutableDictionary<TKey,TValue> SetItems (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> items);
```

Sets the specified key/value pairs in the immutable dictionary, possibly overwriting existing values for the keys.

Parameters:

- `items`: The key/value pairs to set in the dictionary. If any of the keys already exist in the dictionary, this method will overwrite their previous values.

Returns: A new immutable dictionary that contains the specified key/value pairs.

To be added.

## IImmutableDictionary<TKey,TValue>.TryGetKey(TKey, TKey) method

```csharp
public bool TryGetKey (TKey <example-value>, out TKey <example-value>);
```

Determines whether this dictionary contains a specified key.

Parameters:

- `equalKey`: The key to search for.
- `actualKey`: The matching key <example-value> in the dictionary if found, or `equalkey` if no match is found.

Returns: `true` if a match for `equalKey` is found; otherwise, `false`.

#### Remarks
Following are some scenarios where `IImmutableDictionary<T1,T2>.TryGetKey` may be useful:

- You want to reuse a previously stored object reference instead of creating a new reference.

- You want to look up the canonical value of an object

- You want to retrieve more complete data about an object
