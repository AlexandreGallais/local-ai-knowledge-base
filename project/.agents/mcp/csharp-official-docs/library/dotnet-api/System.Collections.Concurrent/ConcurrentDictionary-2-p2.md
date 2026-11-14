---
title: "ConcurrentDictionary<TKey,TValue> class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/ConcurrentDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConcurrentDictionary<TKey,TValue> class (part 2 of 4)

## ConcurrentDictionary<TKey,TValue>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`. This property is not supported.

Returns: Always returns null.

Exceptions:

- `NotSupportedException`: This property is not supported.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentDictionary<T1,T2>` instance is cast to an `ICollection` interface.

## ConcurrentDictionary<TKey,TValue>.System.Collections.IDictionary.IsFixedSize property

```csharp
bool System.Collections.IDictionary.IsFixedSize { get; }
```

Gets a value that indicates whether the `IDictionary<T1,T2>` has a fixed size.

Returns: `true` if the `IDictionary<T1,T2>` has a fixed size; otherwise, `false`. For `ConcurrentDictionary<T1,T2>`, this property always returns `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ConcurrentDictionary<TKey,TValue>.System.Collections.IDictionary.IsReadOnly property

```csharp
bool System.Collections.IDictionary.IsReadOnly { get; }
```

Gets a value that indicates whether the `IDictionary<T1,T2>` is read-only.

Returns: `true` if the `IDictionary<T1,T2>` is read-only; otherwise, `false`. For `ConcurrentDictionary<T1,T2>`, this property always returns `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ConcurrentDictionary<TKey,TValue>.System.Collections.IDictionary.Item property

```csharp
object? System.Collections.IDictionary.Item[object key] { get; set; }
```

Gets or sets the value associated with the specified key.

Parameters:

- `key`: The key of the value to get or set.

Returns: The value associated with the specified key, or  `null` if `key` is not in the dictionary or `key` is of a type that is not assignable to the key type of the `ConcurrentDictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `key` is  `null`.
- `ArgumentException`: A value is being assigned, and `key` is of a type that is not assignable to the key type or the value type of the `ConcurrentDictionary<T1,T2>`.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.IDictionary.Keys property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Keys { get; }
```

Gets an `ICollection` that contains the keys of the  `IDictionary<T1,T2>`.

Returns: An interface that contains the keys of the `IDictionary<T1,T2>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ConcurrentDictionary<TKey,TValue>.System.Collections.IDictionary.Values property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Values { get; }
```

Gets an `ICollection` that contains the values in the `IDictionary`.

Returns: An interface that contains the values in the `IDictionary`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ConcurrentDictionary<TKey,TValue>.Values property

```csharp
public System.Collections.Generic.ICollection<TValue> Values { get; }
```

Gets a collection that contains the values in the `Dictionary<T1,T2>`.

Returns: A collection that contains the values in the `Dictionary<T1,T2>`.

The property returns a copy of all the values. It's not kept in sync with `ConcurrentDictionary<T1,T2>`.

## ConcurrentDictionary<TKey,TValue>.AddOrUpdate(TKey, Func<TKey,TValue>, Func<TKey,TValue,TValue>) method

```csharp
public TValue AddOrUpdate (TKey key, Func<TKey,TValue> addValueFactory, Func<TKey,TValue,TValue> updateValueFactory);
```

Uses the specified functions to add a key/value pair to the `ConcurrentDictionary<T1,T2>` if the key does not already exist, or to update a key/value pair in the `ConcurrentDictionary<T1,T2>` if the key <example-value> exists.

Parameters:

- `key`: The key to be added or whose value should be updated.
- `addValueFactory`: The function used to generate a value for an absent key.
- `updateValueFactory`: The function used to generate a new value for an existing key based on the key's existing value.

Returns: The new value for the key. This will be either be the result of `addValueFactory` (if the key was absent) or the result of `updateValueFactory` (if the key was present).

Exceptions:

- `ArgumentNullException`: `key`, `addValueFactory`, or `updateValueFactory` is `null`.
- `OverflowException`: The dictionary contains too many elements.

#### Remarks
If you call `ConcurrentDictionary<T1,T2>.AddOrUpdate` simultaneously on different threads, `addValueFactory` may be called multiple times, but its key/value pair might not be added to the dictionary for every call.

For modifications and write operations to the dictionary, `ConcurrentDictionary<T1,T2>` uses fine-grained locking to ensure thread safety (read operations on the dictionary are performed in a lock-free manner). The `addValueFactory` and `updateValueFactory` delegates may be executed multiple times to verify the value was added or updated as expected. However, they are called outside the locks to avoid the problems that can arise from executing unknown code under a lock. Therefore, `ConcurrentDictionary<T1,T2>.AddOrUpdate` is not atomic with regards to all other operations on the `ConcurrentDictionary<T1,T2>` class.

## ConcurrentDictionary<TKey,TValue>.AddOrUpdate(TKey, TValue, Func<TKey,TValue,TValue>) method

```csharp
public TValue AddOrUpdate (TKey key, TValue addValue, Func<TKey,TValue,TValue> updateValueFactory);
```

Adds a key/value pair to the `ConcurrentDictionary<T1,T2>` if the key does not already exist, or updates a key/value pair in the `ConcurrentDictionary<T1,T2>` by using the specified function if the key <example-value> exists.

Parameters:

- `key`: The key to be added or whose value should be updated.
- `addValue`: The value to be added for an absent key.
- `updateValueFactory`: The function used to generate a new value for an existing key based on the key's existing value.

Returns: The new value for the key. This will be either be `addValue` (if the key was absent) or the result of `updateValueFactory` (if the key was present).

Exceptions:

- `ArgumentNullException`: `key` or `updateValueFactory` is `null`.
- `OverflowException`: The dictionary contains too many elements.

#### Examples
The following code example shows how to initialize an `ConcurrentDictionary<T1,T2>` and how to use the AddOrUpdate method to add an additional item to the collection, and update the existing items.

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/ConcurrentDictionaryTKey,TValue/AddOrUpdate/program.cs._

#### Remarks
For modifications and write operations to the dictionary, `ConcurrentDictionary<T1,T2>` uses fine-grained locking to ensure thread safety. (Read operations on the dictionary are performed in a lock-free manner.) The `addValueFactory` and `updateValueFactory` delegates may be executed multiple times to verify the value was added or updated as expected. However, they are called outside the locks to avoid the problems that can arise from executing unknown code under a lock. Therefore, `ConcurrentDictionary<T1,T2>.AddOrUpdate` is not atomic with regards to all other operations on the `ConcurrentDictionary<T1,T2>` class.

## ConcurrentDictionary<TKey,TValue>.AddOrUpdate<TArg>(TKey, Func<TKey,TArg,TValue>, Func<TKey,TValue,TArg,TValue>, TArg) method

```csharp
public TValue AddOrUpdate<TArg> (TKey key, Func<TKey,TArg,TValue> addValueFactory, Func<TKey,TValue,TArg,TValue> updateValueFactory, TArg factoryArgument) where TArg : allows ref struct;
```

Uses the specified functions and argument to add a key/value pair to the `ConcurrentDictionary<T1,T2>` if the key does not already exist, or to update a key/value pair in the `ConcurrentDictionary<T1,T2>` if the key <example-value> exists.

Parameters:

- `TArg`: The type of an argument to pass into `addValueFactory` and `updateValueFactory`.
- `key`: The key to be added or whose value should be updated.
- `addValueFactory`: The function used to generate a value for an absent key.
- `updateValueFactory`: The function used to generate a new value for an existing key based on the key's existing value.
- `factoryArgument`: An argument to pass into `addValueFactory` and `updateValueFactory`.

Returns: The new value for the key. This will be either be the result of `addValueFactory` (if the key was absent) or the result of `updateValueFactory` (if the key was present).

Exceptions:

- `ArgumentNullException`: `key`, `addValueFactory`, or `updateValueFactory` is a null reference (Nothing in Visual Basic).
- `OverflowException`: The dictionary contains too many elements.

#### Remarks
If you call `ConcurrentDictionary<T1,T2>.AddOrUpdate` simultaneously on different threads, `addValueFactory` may be called multiple times, but its key/value pair might not be added to the dictionary for every call.

For modifications and write operations to the dictionary, `ConcurrentDictionary<T1,T2>` uses fine-grained locking to ensure thread safety. (Read operations on the dictionary are performed in a lock-free manner.) The `addValueFactory` and `updateValueFactory` delegates may be executed multiple times to verify the value was added or updated as expected. However, they are called outside the locks to avoid the problems that can arise from executing unknown code under a lock. Therefore, `ConcurrentDictionary<T1,T2>.AddOrUpdate` is not atomic with regards to all other operations on the `ConcurrentDictionary<T1,T2>` class.

## ConcurrentDictionary<TKey,TValue>.Clear() method

```csharp
public void Clear ();
```

Removes all keys and values from the `ConcurrentDictionary<T1,T2>`.

To be added.

## ConcurrentDictionary<TKey,TValue>.ContainsKey(TKey) method

```csharp
public bool ContainsKey (TKey key);
```

Determines whether the `ConcurrentDictionary<T1,T2>` contains the specified key.

Parameters:

- `key`: The key to locate in the `ConcurrentDictionary<T1,T2>`.

Returns: `true` if the `ConcurrentDictionary<T1,T2>` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## ConcurrentDictionary<TKey,TValue>.GetAlternateLookup<TAlternateKey>() method

```csharp
public System.Collections.Concurrent.ConcurrentDictionary<TKey,TValue>.AlternateLookup<TAlternateKey> GetAlternateLookup<TAlternateKey> () where TAlternateKey : <example-value> ref struct;
```

Gets an instance of a type that may be used to perform operations on a `ConcurrentDictionary<T1,T2>` using a `TAlternateKey` as a key <example-value> of a `TKey`.

Parameters:

- `TAlternateKey`: The alternate type of a key for performing lookups.

Returns: The created lookup instance.

Exceptions:

- `InvalidOperationException`: This instance's comparer is not compatible with `TAlternateKey`.

This instance must be using a comparer that implements `IAlternateEqualityComparer<T1,T2>` with
`TAlternateKey` and `TKey`. If it doesn't, an exception will be thrown.

## ConcurrentDictionary<TKey,TValue>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>> GetEnumerator ();
```

Returns an enumerator that iterates through the `ConcurrentDictionary<T1,T2>`.

Returns: An enumerator for the `ConcurrentDictionary<T1,T2>`.

#### Remarks
The enumerator returned from the dictionary is safe to use concurrently with reads and writes to the dictionary, however it does not represent a moment-in-time snapshot of the dictionary. The contents exposed through the enumerator may contain modifications made to the dictionary after `ConcurrentDictionary<T1,T2>.GetEnumerator` was called.

## ConcurrentDictionary<TKey,TValue>.GetOrAdd(TKey, Func<TKey,TValue>) method

```csharp
public TValue GetOrAdd (TKey key, Func<TKey,TValue> valueFactory);
```

Adds a key/value pair to the `ConcurrentDictionary<T1,T2>` by using the specified function if the key does not already exist. Returns the new value, or the existing value if the key exists.

Parameters:

- `key`: The key of the element to add.
- `valueFactory`: The function used to generate a value for the key.

Returns: The value for the key. This will be either the existing value for the key if the key is already in the dictionary, or the new value if the key was not in the dictionary.

Exceptions:

- `ArgumentNullException`: `key` or `valueFactory` is `null`.
- `OverflowException`: The dictionary contains too many elements.

#### Remarks
For modifications and write operations to the dictionary, `ConcurrentDictionary<T1,T2>` uses fine-grained locking to ensure thread safety. (Read operations on the dictionary are performed in a lock-free manner.) However, the `valueFactory` delegate is called outside the locks to avoid the problems that can arise from executing unknown code under a lock. Therefore, `ConcurrentDictionary<T1,T2>.GetOrAdd` is not atomic with regards to all other operations on the `ConcurrentDictionary<T1,T2>` class.

Since a key/value can be inserted by another thread while `valueFactory` is generating a value, you cannot trust that just because `valueFactory` executed, its produced value will be inserted into the dictionary and returned. If you call `ConcurrentDictionary<T1,T2>.GetOrAdd` simultaneously on different threads, `valueFactory` may be called multiple times, but only one key/value pair will be added to the dictionary.

The return value depends on the presence of the key in the dictionary and whether a key/value is inserted by another thread after `ConcurrentDictionary<T1,T2>.GetOrAdd` is called but before `valueFactory` generates a value:

| Scenario | Return value |
| -------- | ------------ |
| The key is already in the dictionary. | The existing value is returned. |
| The key is not in the dictionary. `valueFactory` generates a value. On rechecking for the key, no key is found. | The key/value is inserted into the dictionary, and the value is returned. |
| The key is not in the dictionary. `valueFactory` generates a value. While `valueFactory` is generating the value, a different thread inserts a value for the key. After `valueFactory` executes and upon rechecking for the key, the key <example-value> by the other thread is found. | The value inserted by the other thread is returned. |
