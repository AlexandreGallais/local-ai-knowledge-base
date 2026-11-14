---
title: "ConcurrentDictionary<TKey,TValue> class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/ConcurrentDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConcurrentDictionary<TKey,TValue> class

Namespace: `System.Collections.Concurrent`

```csharp
public class ConcurrentDictionary<TKey,TValue> : System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IDictionary<TKey,TValue>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>, System.Collections.IDictionary
```

Represents a thread-safe collection of key/value pairs that can be accessed by multiple threads concurrently.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.

#### Remarks

Like the `Dictionary<T1,T2>` class, `ConcurrentDictionary<T1,T2>` implements the `IDictionary<T1,T2>` interface. In addition, `ConcurrentDictionary<T1,T2>` provides several methods for adding or updating key/value pairs in the dictionary, as described in the following table.

| To do this | Use this method | Usage notes |
|------------|-----------------|-------------|
|Add a new key to the dictionary, if it doesn't already exist in the dictionary|`ConcurrentDictionary<T1,T2>.TryAdd`|This method adds the specified key/value pair, if the key doesn't currently exist in the dictionary. The method returns `true` or `false` depending on whether the new pair was added.|
|Update the value for an existing key in the dictionary, if that key has a specific value|`ConcurrentDictionary<T1,T2>.TryUpdate`|This method checks whether the key has a specified value, and if it does, updates the key with a new value. It's similar to the `Interlocked.CompareExchange` method, except that it's used for dictionary elements.|
|Store a key/value pair in the dictionary unconditionally, and overwrite the value of a key that already exists|The indexer's setter: `dictionary[key] = newValue`| |
|Add a key/value pair to the dictionary, or if the key <example-value> exists, update the value for the key based on the key's existing value|`AddOrUpdate` -or- `AddOrUpdate`|`AddOrUpdate` accepts the key and two delegates. It uses the first delegate if the key doesn't exist in the dictionary; it accepts the key and returns the value that should be added for the key. It uses the second delegate if the key does exist; it accepts the key and its current value, and it returns the new value that should be set for the key. `AddOrUpdate` accepts the key, a value to add, and the update delegate. This is the same as the previous overload, except that it doesn't use a delegate to add a key.|
|Get the value for a key in the dictionary, adding the value to the dictionary and returning it if the key doesn't exist|`GetOrAdd` -or- `GetOrAdd`|These overloads provide lazy initialization for a key/value pair in the dictionary, adding the value only if it's not there. `GetOrAdd` takes the value to be added if the key doesn't exist. `GetOrAdd` takes a delegate that will generate the value if the key doesn't exist.|

All these operations are atomic and are thread-safe with regards to all other operations on the `ConcurrentDictionary<T1,T2>` class. The only exceptions are the methods that accept a delegate, that is, `ConcurrentDictionary<T1,T2>.AddOrUpdate` and `ConcurrentDictionary<T1,T2>.GetOrAdd`. For modifications and write operations to the dictionary, `ConcurrentDictionary<T1,T2>` uses fine-grained locking to ensure thread safety. (Read operations on the dictionary are performed in a lock-free manner.) However, delegates for these methods are called outside the locks to avoid the problems that can arise from executing unknown code under a lock. Therefore, the code executed by these delegates is not subject to the atomicity of the operation.

#### Examples
The following example shows how to construct a `ConcurrentDictionary<T1,T2>` object.

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/ConcurrentDictionaryTKey,TValue/Overview/concdictionary.cs._

## ConcurrentDictionary<TKey,TValue>.ConcurrentDictionary() constructor

```csharp
public ConcurrentDictionary ();
```

Initializes a new instance of the `ConcurrentDictionary<T1,T2>` class that is empty, has the default concurrency level, has the default initial capacity, and uses the default comparer for the key type.

#### Remarks
The default concurrency level is equal to the number of CPUs. The higher the concurrency level is, the more concurrent write operations can take place without interference and blocking. Higher concurrency level values also cause operations that require all locks (for example, table resizing, `ToArray` and `Count`) to become more expensive. The default capacity (DEFAULT_CAPACITY), which represents the initial number of buckets, is a trade-off between the size of a very small dictionary and the number of resizes when constructing a large dictionary. Also, the capacity should not be divisible by a small prime number. The default capacity is 31.

## ConcurrentDictionary<TKey,TValue>.ConcurrentDictionary(KeyValuePair<TKey,TValue>>) constructor

```csharp
public ConcurrentDictionary (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> collection);
```

Initializes a new instance of the `ConcurrentDictionary<T1,T2>` class that contains elements copied from the specified `IEnumerable<T>`, has the default concurrency level, has the default initial capacity, and uses the default comparer for the key type.

Parameters:

- `collection`: The `IEnumerable<T>` whose elements are copied to the new `ConcurrentDictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `collection` or any of its keys is  `null`.
- `ArgumentException`: `collection` contains one or more duplicate keys.

To be added.

## ConcurrentDictionary<TKey,TValue>.ConcurrentDictionary(IEqualityComparer<TKey>) constructor

```csharp
public ConcurrentDictionary (System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Initializes a new instance of the `ConcurrentDictionary<T1,T2>` class that is empty, has the default concurrency level and capacity, and uses the specified `IEqualityComparer<T>`.

Parameters:

- `comparer`: The equality comparison implementation to use when comparing keys.

Exceptions:

- `ArgumentNullException`: `comparer` is `null`.

To be added.

## ConcurrentDictionary<TKey,TValue>.ConcurrentDictionary(KeyValuePair<TKey,TValue>>, IEqualityComparer<TKey>) constructor

```csharp
public ConcurrentDictionary (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> collection, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Initializes a new instance of the `ConcurrentDictionary<T1,T2>` class that contains elements copied from the specified `IEnumerable` has the default concurrency level, has the default initial capacity, and uses the specified  `IEqualityComparer<T>`.

Parameters:

- `collection`: The `IEnumerable<T>` whose elements are copied to the new `ConcurrentDictionary<T1,T2>`.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing keys.

Exceptions:

- `ArgumentNullException`: `collection` or `comparer` is `null`.

To be added.

## ConcurrentDictionary<TKey,TValue>.ConcurrentDictionary(Int32, Int32) constructor

```csharp
public ConcurrentDictionary (int concurrencyLevel, int capacity);
```

Initializes a new instance of the `ConcurrentDictionary<T1,T2>` class that is empty, has the specified concurrency level and capacity, and uses the default comparer for the key type.

Parameters:

- `concurrencyLevel`: The estimated number of threads that will update the `ConcurrentDictionary<T1,T2>` concurrently, or in .NET 8+ only, -1 to indicate the default concurrency level.
- `capacity`: The initial number of elements that the `ConcurrentDictionary<T1,T2>` can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `concurrencyLevel` is less than 1.

-or-

`capacity` is less than 0.

To be added.

## ConcurrentDictionary<TKey,TValue>.ConcurrentDictionary(Int32, KeyValuePair<TKey,TValue>>, IEqualityComparer<TKey>) constructor

```csharp
public ConcurrentDictionary (int concurrencyLevel, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> collection, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Initializes a new instance of the `ConcurrentDictionary<T1,T2>` class that contains elements copied from the specified `IEnumerable`, and uses the specified `IEqualityComparer<T>`.

Parameters:

- `concurrencyLevel`: The estimated number of threads that will update the `ConcurrentDictionary<T1,T2>` concurrently, or in .NET 8+ only, -1 to indicate the default concurrency level.
- `collection`: The `IEnumerable<T>` whose elements are copied to the new `ConcurrentDictionary<T1,T2>`.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing keys.

Exceptions:

- `ArgumentNullException`: `collection` or `comparer` is `null`.
- `ArgumentOutOfRangeException`: `concurrencyLevel` is less than 1.
- `ArgumentException`: `collection` contains one or more duplicate keys.

To be added.

## ConcurrentDictionary<TKey,TValue>.ConcurrentDictionary(Int32, Int32, IEqualityComparer<TKey>) constructor

```csharp
public ConcurrentDictionary (int concurrencyLevel, int capacity, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Initializes a new instance of the `ConcurrentDictionary<T1,T2>` class that is empty, has the specified concurrency level, has the specified initial capacity, and uses the specified `IEqualityComparer<T>`.

Parameters:

- `concurrencyLevel`: The estimated number of threads that will update the `ConcurrentDictionary<T1,T2>` concurrently, or in .NET 8+ only, -1 to indicate the default concurrency level.
- `capacity`: The initial number of elements that the `ConcurrentDictionary<T1,T2>` can contain.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing keys.

Exceptions:

- `ArgumentNullException`: `comparer` is `null`.
- `ArgumentOutOfRangeException`: `concurrencyLevel` or `capacity` is less than 1.

To be added.

## ConcurrentDictionary<TKey,TValue>.Comparer property

```csharp
public System.Collections.Generic.IEqualityComparer<TKey> Comparer { get; }
```

Gets the `IEqualityComparer<T>` that is used to determine equality of keys for the dictionary.

Returns: The `IEqualityComparer<T>` generic interface implementation that is used to determine equality of keys for the current `ConcurrentDictionary<T1,T2>` and to provide hash values for the keys.

#### Remarks

`ConcurrentDictionary<T1,T2>` requires an equality implementation to determine
whether keys are equal. You can specify an implementation of the `IEqualityComparer<T>`
generic interface by using a constructor that accepts a comparer parameter;
if you do not specify one, the default generic equality comparer `Default` is used.

## ConcurrentDictionary<TKey,TValue>.Count property

```csharp
public int Count { get; }
```

Gets the number of key/value pairs contained in the `ConcurrentDictionary<T1,T2>`.

Returns: The number of key/value pairs contained in the `ConcurrentDictionary<T1,T2>`.

Exceptions:

- `OverflowException`: The dictionary contains too many elements.

#### Remarks
This property has snapshot semantics and represents the number of items in the `ConcurrentDictionary<T1,T2>` at the moment when the property was accessed.

## ConcurrentDictionary<TKey,TValue>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether the `ConcurrentDictionary<T1,T2>` is empty.

Returns: `true` if the `ConcurrentDictionary<T1,T2>` is empty; otherwise, `false`.

To be added.

## ConcurrentDictionary<TKey,TValue>.Item property

```csharp
public TValue this[TKey key] { get; set; }
```

Gets or sets the value associated with the specified key.

Parameters:

- `key`: The key of the value to get or set.

Returns: The value of the key/value pair at the specified index.

Exceptions:

- `ArgumentNullException`: `key` is  `null`.
- `KeyNotFoundException`: The property is retrieved and `key` does not exist in the collection.

To be added.

## ConcurrentDictionary<TKey,TValue>.Keys property

```csharp
public System.Collections.Generic.ICollection<TKey> Keys { get; }
```

Gets a collection containing the keys in the `Dictionary<T1,T2>`.

Returns: A collection of keys in the `Dictionary<T1,T2>`.

The property returns a copy of all the keys. It's not kept in sync with `ConcurrentDictionary<T1,T2>`.

## ConcurrentDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly { get; }
```

Gets a value that indicates whether the `ICollection` is read-only.

Returns: `true` if the `ICollection` is read-only; otherwise, `false`.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.IEnumerable<TKey> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys { get; }
```

Gets a collection containing the keys in the `Dictionary<T1,T2>`.

Returns: A collection containing the keys in the `Dictionary<T1,T2>`.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.IEnumerable<TValue> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values { get; }
```

Gets a collection that contains the values in the `Dictionary<T1,T2>`.

Returns: A collection that contains the values in the `Dictionary<T1,T2>`.

To be added.

## ConcurrentDictionary<TKey,TValue>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value that indicates whether access to the `ICollection` is synchronized with the SyncRoot.

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`. For `ConcurrentDictionary<T1,T2>` this property always returns `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentDictionary<T1,T2>` instance is cast to an `ICollection` interface.
