---
title: "ConcurrentDictionary<TKey,TValue> class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/ConcurrentDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConcurrentDictionary<TKey,TValue> class (part 3 of 4)

## ConcurrentDictionary<TKey,TValue>.GetOrAdd(TKey, TValue) method

```csharp
public TValue GetOrAdd (TKey key, TValue value);
```

Adds a key/value pair to the `ConcurrentDictionary<T1,T2>` if the key does not already exist. Returns the new value, or the existing value if the key exists.

Parameters:

- `key`: The key of the element to add.
- `value`: The value to be added, if the key does not already exist.

Returns: The value for the key. This will be either the existing value for the key if the key is already in the dictionary, or the new value if the key was not in the dictionary.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `OverflowException`: The dictionary contains too many elements.

To be added.

## ConcurrentDictionary<TKey,TValue>.GetOrAdd<TArg>(TKey, Func<TKey,TArg,TValue>, TArg) method

```csharp
public TValue GetOrAdd<TArg> (TKey key, Func<TKey,TArg,TValue> valueFactory, TArg factoryArgument) where TArg : allows ref struct;
```

Adds a key/value pair to the `ConcurrentDictionary<T1,T2>` by using the specified function and an argument if the key does not already exist, or returns the existing value if the key exists.

Parameters:

- `TArg`: The type of an argument to pass into `valueFactory`.
- `key`: The key of the element to add.
- `valueFactory`: The function used to generate a value for the key.
- `factoryArgument`: An argument value to pass into `valueFactory`.

Returns: The value for the key. This will be either the existing value for the key if the key is already in the dictionary, or the new value if the key was not in the dictionary.

Exceptions:

- `ArgumentNullException`: `key` is a `null` reference (Nothing in Visual Basic).
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

## ConcurrentDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Add(KeyValuePair<TKey,TValue>) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.Add (System.Collections.Generic.KeyValuePair<TKey,TValue> keyValuePair);
```

Adds an item to the collection.

Parameters:

- `keyValuePair`: The `KeyValuePair<T1,T2>` to add to the dictionary.

Exceptions:

- `ArgumentNullException`: The `KeyValuePair<T1,T2>.Key` of `keyValuePair` is `null`.
- `OverflowException`: The `Dictionary<T1,T2>` contains too many elements.
- `ArgumentException`: An element with the same key <example-value> exists in the `Dictionary<T1,T2>`.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Contains(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Contains (System.Collections.Generic.KeyValuePair<TKey,TValue> keyValuePair);
```

Gets whether the `ICollection<T>` contains an element with the specified key.

Parameters:

- `keyValuePair`: The key to locate in the `ICollection<T>`.

Returns: `true` if the `ICollection<T>` contains an element with the specified key; otherwise, `false`.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.CopyTo(KeyValuePair<TKey,TValue>[], Int32) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.CopyTo (System.Collections.Generic.KeyValuePair<TKey,TValue>[] array, int index);
```

Copies the elements of the `ICollection` to an array, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the `ICollection`. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.
- `ArgumentException`: `index` is equal to or greater than the length of the `array`.

-or-

The number of elements in the source `ICollection` is greater than the available space from `index` to the end of the destination `array`.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Remove(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Remove (System.Collections.Generic.KeyValuePair<TKey,TValue> keyValuePair);
```

Removes the specified key/value pair from the collection.

Parameters:

- `keyValuePair`: The `KeyValuePair<T1,T2>` to remove.

Returns: `true` if the element is successfully removed; otherwise, `false`. This method also returns false if the key was not found in the original `ICollection<T>`.

Exceptions:

- `ArgumentNullException`: The `KeyValuePair<T1,T2>.Key` property of `keyValuePair` is `null`.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Add(TKey, TValue) method

```csharp
void IDictionary<TKey,TValue>.Add (TKey key, TValue value);
```

Adds the specified key and value to the `IDictionary<T1,T2>`.

Parameters:

- `key`: The object to use as the key of the element to add.
- `value`: The object to use as the value of the element to add.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `ConcurrentDictionary<T1,T2>`.
- `OverflowException`: The dictionary contains too many elements.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Remove(TKey) method

```csharp
bool IDictionary<TKey,TValue>.Remove (TKey key);
```

Removes the element with the specified key from the `IDictionary<T1,T2>`.

Parameters:

- `key`: The key of the element to remove.

Returns: `true` if the element is successfully removed; otherwise, `false`. This method also returns `false` if `key` was not found in the original `IDictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an array, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the `ICollection`. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.
- `ArgumentException`: `index` is equal to or greater than the length of the `array`.

-or-

The number of elements in the source `ICollection` is greater than the available space from `index` to the end of the destination `array`.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.IDictionary.Add(Object, Object) method

```csharp
void IDictionary.Add (object key, object value);
```

Adds the specified key and value to the dictionary.

Parameters:

- `key`: The object to use as the key.
- `value`: The object to use as the value.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: `key` is of a type that is not assignable to the key type  of the `Dictionary<T1,T2>`.

-or-

`value` is of a type that is not assignable to the type of values in the `Dictionary<T1,T2>`.

-or-

A value with the same key <example-value> exists in the `Dictionary<T1,T2>`.
- `OverflowException`: The dictionary contains too many elements.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.IDictionary.Contains(Object) method

```csharp
bool IDictionary.Contains (object key);
```

Gets a value that indicates the `IDictionary<T1,T2>` contains an element with the specified key.

Parameters:

- `key`: The key to locate in the `IDictionary<T1,T2>`.

Returns: `true` if the `IDictionary<T1,T2>` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.IDictionary.GetEnumerator() method

```csharp
System.Collections.IDictionaryEnumerator IDictionary.GetEnumerator ();
```

Provides a `IDictionaryEnumerator` for the `IDictionary<T1,T2>`.

Returns: A `IDictionaryEnumerator` for the `IDictionary<T1,T2>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ConcurrentDictionary<TKey,TValue>.System.Collections.IDictionary.Remove(Object) method

```csharp
void IDictionary.Remove (object key);
```

Removes the element with the specified key from the `IDictionary`.

Parameters:

- `key`: The key of the element to remove.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the `ConcurrentDictionary<T1,T2>`.

Returns: An enumerator for the `ConcurrentDictionary<T1,T2>`.

#### Remarks
The enumerator returned from the dictionary is safe to use concurrently with reads and writes to the dictionary, however it does not represent a moment-in-time snapshot of the dictionary. The contents exposed through the enumerator may contain modifications made to the dictionary after `ConcurrentDictionary<T1,T2>.GetEnumerator` was called.

## ConcurrentDictionary<TKey,TValue>.ToArray() method

```csharp
public System.Collections.Generic.KeyValuePair<TKey,TValue>[] ToArray ();
```

Copies the key and value pairs stored in the `ConcurrentDictionary<T1,T2>` to a new array.

Returns: A new array containing a snapshot of key and value pairs copied from the `ConcurrentDictionary<T1,T2>`.

To be added.

## ConcurrentDictionary<TKey,TValue>.TryAdd(TKey, TValue) method

```csharp
public bool TryAdd (TKey key, TValue value);
```

Attempts to add the specified key and value to the `ConcurrentDictionary<T1,T2>`.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add. The value can be  `null` for reference types.

Returns: `true` if the key/value pair was added to the `ConcurrentDictionary<T1,T2>` successfully; `false` if the key <example-value> exists.

Exceptions:

- `ArgumentNullException`: `key` is  `null`.
- `OverflowException`: The dictionary contains too many elements.

#### Remarks
This method returns `false` if the key <example-value> exists. Use the `ConcurrentDictionary<T1,T2>.TryUpdate` or `ConcurrentDictionary<T1,T2>.AddOrUpdate` method to update the value in case a key <example-value> exists.

#### Examples
The following example shows how to call the `ConcurrentDictionary<T1,T2>.TryAdd` method:

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/ConcurrentDictionaryTKey,TValue/Overview/concdictionary.cs._

## ConcurrentDictionary<TKey,TValue>.TryGetAlternateLookup<TAlternateKey>(ConcurrentDictionary<TKey,TValue>+AlternateLookup<TAlternateKey>) method

```csharp
public bool TryGetAlternateLookup<TAlternateKey> (out System.Collections.Concurrent.ConcurrentDictionary<TKey,TValue>.AlternateLookup<TAlternateKey> lookup) where TAlternateKey : <example-value> ref struct;
```

Gets an instance of a type that may be used to perform operations on a `ConcurrentDictionary<T1,T2>`
using a `TAlternateKey` as a key <example-value> of a `TKey`.

Parameters:

- `TAlternateKey`: The alternate type of a key for performing lookups.
- `lookup`: The created lookup instance when the method returns `true`, or a default instance that should not be used if the method returns `false`.

Returns: `true` if a lookup could be created; otherwise, `false`.

This instance must be using a comparer that implements `IAlternateEqualityComparer<T1,T2>` with
`TAlternateKey` and `TKey`. If it doesn't, the method will return `false`.

## ConcurrentDictionary<TKey,TValue>.TryGetValue(TKey, TValue) method

```csharp
public bool TryGetValue (TKey key, out TValue value);
```

Attempts to get the value associated with the specified key from the `ConcurrentDictionary<T1,T2>`.

Parameters:

- `key`: The key of the value to get.
- `value`: When this method returns, contains the object from the `ConcurrentDictionary<T1,T2>` that has the specified key, or the default value of the type if the operation failed.

Returns: `true` if the key was found in the `ConcurrentDictionary<T1,T2>`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is  `null`.

To be added.
