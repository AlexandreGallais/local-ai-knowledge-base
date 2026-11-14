---
title: "Dictionary<TKey,TValue>+AlternateLookup<TAlternateKey> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Dictionary`2+AlternateLookup`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Dictionary<TKey,TValue>+AlternateLookup<TAlternateKey> struct

Namespace: `System.Collections.Generic`

```csharp
public readonly struct Dictionary<TKey,TValue>.AlternateLookup<TAlternateKey> where TAlternateKey : <example-value> ref struct
```

Provides a type that can be used to perform operations on a `Dictionary<T1,T2>` using a `TAlternateKey` as a key <example-value> of a `TKey`.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `TAlternateKey`: The alternate type of a key for performing lookups.

To be added.

## Dictionary<TKey,TValue>+AlternateLookup<TAlternateKey>.Dictionary property

```csharp
public System.Collections.Generic.Dictionary<TKey,TValue> Dictionary { get; }
```

Gets the `Dictionary<T1,T2>` against which this instance performs operations.

Returns: To be added.

To be added.

## Dictionary<TKey,TValue>+AlternateLookup<TAlternateKey>.Item property

```csharp
public TValue this[TAlternateKey key] { get; set; }
```

Gets or sets the value associated with the specified alternate key.

Parameters:

- `key`: The alternate key of the value to get or set.

Returns: The value associated with the specified alternate key. If the specified alternate key is not found, a get operation throws a `KeyNotFoundException`, and a set operation creates a new element with the specified key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `KeyNotFoundException`: The property is retrieved and alternate key does not exist in the collection.

To be added.

## Dictionary<TKey,TValue>+AlternateLookup<TAlternateKey>.ContainsKey(TAlternateKey) method

```csharp
public bool ContainsKey (TAlternateKey key);
```

Determines whether the `Dictionary<T1,T2>` contains the specified alternate key.

Parameters:

- `key`: The alternate key to check.

Returns: `true` if the key is in the dictionary; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## Dictionary<TKey,TValue>+AlternateLookup<TAlternateKey>.Remove(TAlternateKey) method

```csharp
public bool Remove (TAlternateKey key);
```

Removes the value with the specified alternate key from the `Dictionary<T1,T2>`.

Parameters:

- `key`: The alternate key of the element to remove.

Returns: `true` if the element is successfully found and removed; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## Dictionary<TKey,TValue>+AlternateLookup<TAlternateKey>.Remove(TAlternateKey, TKey, TValue) method

```csharp
public bool Remove (TAlternateKey key, out TKey <example-value>, out TValue value);
```

Removes the value with the specified alternate key from the `Dictionary<T1,T2>`, and copies the element to the value parameter.

Parameters:

- `key`: The alternate key of the element to remove.
- `actualKey`: When this method returns, contains the removed key.
- `value`: When this method returns, contains the removed element.

Returns: `true` if the element is successfully found and removed; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## Dictionary<TKey,TValue>+AlternateLookup<TAlternateKey>.TryAdd(TAlternateKey, TValue) method

```csharp
public bool TryAdd (TAlternateKey key, TValue value);
```

Attempts to add the specified key and value to the dictionary.

Parameters:

- `key`: The alternate key of the element to add.
- `value`: The value of the element to add.

Returns: `true` if the key/value pair was added to the dictionary successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## Dictionary<TKey,TValue>+AlternateLookup<TAlternateKey>.TryGetValue(TAlternateKey, TValue) method

```csharp
public bool TryGetValue (TAlternateKey key, out TValue value);
```

Gets the value associated with the specified alternate key.

Parameters:

- `key`: The alternate key of the value to get.
- `value`: When this method returns, contains the value associated with the specified key, if the key is found; otherwise, the default value for the type of the value parameter.

Returns: `true` if an entry was found; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## Dictionary<TKey,TValue>+AlternateLookup<TAlternateKey>.TryGetValue(TAlternateKey, TKey, TValue) method

```csharp
public bool TryGetValue (TAlternateKey key, out TKey <example-value>, out TValue value);
```

Gets the value associated with the specified alternate key.

Parameters:

- `key`: The alternate key of the value to get.
- `actualKey`: When this method returns, contains the actual key <example-value> with the alternate key, if the key is found; otherwise, the default value for the type of the key parameter.
- `value`: When this method returns, contains the value associated with the specified key, if the key is found; otherwise, the default value for the type of the value parameter.

Returns: `true` if an entry was found; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.
