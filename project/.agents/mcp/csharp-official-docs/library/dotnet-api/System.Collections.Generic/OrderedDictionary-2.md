---
title: "OrderedDictionary<TKey,TValue> class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/OrderedDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OrderedDictionary<TKey,TValue> class

Namespace: `System.Collections.Generic`

```csharp
public class OrderedDictionary<TKey,TValue> : System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IDictionary<TKey,TValue>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IList<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>, System.Collections.Generic.IReadOnlyList<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.IDictionary, System.Collections.IList
```

Represents a collection of key/value pairs that are accessible by the key or index.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.

Operations on the collection have algorithmic complexities that are similar to that of the `List<T>` class, except with lookups by key <example-value> in complexity to that of `Dictionary<T1,T2>`.

## OrderedDictionary<TKey,TValue>.OrderedDictionary() constructor

```csharp
public OrderedDictionary ();
```

Initializes a new instance of the `OrderedDictionary<T1,T2>` class that is empty, has the default initial capacity, and uses the default equality comparer for the key type.

To be added.

## OrderedDictionary<TKey,TValue>.OrderedDictionary(IDictionary<TKey,TValue>) constructor

```csharp
public OrderedDictionary (System.Collections.Generic.IDictionary<TKey,TValue> dictionary);
```

Initializes a new instance of the `OrderedDictionary<T1,T2>` class that contains elements copied from the specified `IDictionary<T1,T2>` and uses the default equality comparer for the key type.

Parameters:

- `dictionary`: The `IDictionary<T1,T2>` whose elements are copied to the new `OrderedDictionary<T1,T2>`. The initial order of the elements in the new collection is the order the elements are enumerated from the supplied dictionary.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.

To be added.

## OrderedDictionary<TKey,TValue>.OrderedDictionary(KeyValuePair<TKey,TValue>>) constructor

```csharp
public OrderedDictionary (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> collection);
```

Initializes a new instance of the `OrderedDictionary<T1,T2>` class that contains elements copied from the specified `IEnumerable<T>` and uses the default equality comparer for the key type.

Parameters:

- `collection`: The `IEnumerable<T>` whose elements are copied to the new `OrderedDictionary<T1,T2>`. The initial order of the elements in the new collection is the order the elements are enumerated from the supplied collection.

Exceptions:

- `ArgumentNullException`: `collection` is `null`.

To be added.

## OrderedDictionary<TKey,TValue>.OrderedDictionary(IEqualityComparer<TKey>) constructor

```csharp
public OrderedDictionary (System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Initializes a new instance of the `OrderedDictionary<T1,T2>` class that is empty, has the default initial capacity, and uses the specified `IEqualityComparer<T>`.

Parameters:

- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing keys, or `null` to use the default `EqualityComparer<T>` for the type of the key.

To be added.

## OrderedDictionary<TKey,TValue>.OrderedDictionary(Int32) constructor

```csharp
public OrderedDictionary (int capacity);
```

Initializes a new instance of the `OrderedDictionary<T1,T2>` class that is empty, has the specified initial capacity, and uses the default equality comparer for the key type.

Parameters:

- `capacity`: The initial number of elements that the `OrderedDictionary<T1,T2>` can contain.

Exceptions:

- `ArgumentOutOfRangeException`: capacity is less than 0.

To be added.

## OrderedDictionary<TKey,TValue>.OrderedDictionary(IDictionary<TKey,TValue>, IEqualityComparer<TKey>) constructor

```csharp
public OrderedDictionary (System.Collections.Generic.IDictionary<TKey,TValue> dictionary, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Initializes a new instance of the `OrderedDictionary<T1,T2>` class that contains elements copied from the specified `IDictionary<T1,T2>` and uses the specified `IEqualityComparer<T>`.

Parameters:

- `dictionary`: The `IDictionary<T1,T2>` whose elements are copied to the new `OrderedDictionary<T1,T2>`. The initial order of the elements in the new collection is the order the elements are enumerated from the supplied dictionary.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing keys, or `null` to use the default `EqualityComparer<T>` for the type of the key.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.

To be added.

## OrderedDictionary<TKey,TValue>.OrderedDictionary(KeyValuePair<TKey,TValue>>, IEqualityComparer<TKey>) constructor

```csharp
public OrderedDictionary (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> collection, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Initializes a new instance of the `OrderedDictionary<T1,T2>` class that contains elements copied from the specified `IEnumerable<T>` and uses the specified `IEqualityComparer<T>`.

Parameters:

- `collection`: The `IEnumerable<T>` whose elements are copied to the new `OrderedDictionary<T1,T2>`. The initial order of the elements in the new collection is the order the elements are enumerated from the supplied collection.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing keys, or `null` to use the default `EqualityComparer<T>` for the type of the key.

Exceptions:

- `ArgumentNullException`: `collection` is `null`.

To be added.

## OrderedDictionary<TKey,TValue>.OrderedDictionary(Int32, IEqualityComparer<TKey>) constructor

```csharp
public OrderedDictionary (int capacity, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Initializes a new instance of the `OrderedDictionary<T1,T2>` class that is empty, has the specified initial capacity, and uses the specified `IEqualityComparer<T>`.

Parameters:

- `capacity`: The initial number of elements that the `OrderedDictionary<T1,T2>` can contain.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing keys, or `null` to use the default `EqualityComparer<T>` for the type of the key.

Exceptions:

- `ArgumentOutOfRangeException`: capacity is less than 0.

To be added.

## OrderedDictionary<TKey,TValue>.Capacity property

```csharp
public int Capacity { get; }
```

Gets the total number of key/value pairs the internal data structure can hold without resizing.

Returns: To be added.

To be added.

## OrderedDictionary<TKey,TValue>.Comparer property

```csharp
public System.Collections.Generic.IEqualityComparer<TKey> Comparer { get; }
```

Gets the `IEqualityComparer<T>` that is used to determine equality of keys for the dictionary.

Returns: To be added.

To be added.

## OrderedDictionary<TKey,TValue>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `ICollection<T>`.

Returns: The number of elements contained in the `ICollection<T>`.

To be added.

## OrderedDictionary<TKey,TValue>.Item property

```csharp
public TValue this[TKey key] { get; set; }
```

Gets or sets the element with the specified key.

Parameters:

- `key`: The key of the element to get or set.

Returns: The element with the specified key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `KeyNotFoundException`: The property is retrieved and `key` does not exist in the collection.

Setting the value of an existing key does not impact its order in the collection.

## OrderedDictionary<TKey,TValue>.Keys property

```csharp
public System.Collections.Generic.OrderedDictionary<TKey,TValue>.KeyCollection Keys { get; }
```

Gets a collection containing the keys in the `OrderedDictionary<T1,T2>`.

Returns: To be added.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.ICollection<TKey> System.Collections.Generic.IDictionary<TKey,TValue>.Keys { get; }
```

Gets an `ICollection<T>` containing the keys of the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the keys of the object that implements `IDictionary<T1,T2>`.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.ICollection<TValue> System.Collections.Generic.IDictionary<TKey,TValue>.Values { get; }
```

Gets an `ICollection<T>` containing the values in the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the values in the object that implements `IDictionary<T1,T2>`.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.IList<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Item property

```csharp
System.Collections.Generic.KeyValuePair<TKey,TValue> System.Collections.Generic.IList<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Item[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.IEnumerable<TKey> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys { get; }
```

Gets an enumerable collection that contains the keys in the read-only dictionary.

Returns: An enumerable collection that contains the keys in the read-only dictionary.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.IEnumerable<TValue> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values { get; }
```

Gets an enumerable collection that contains the values in the read-only dictionary.

Returns: An enumerable collection that contains the values in the read-only dictionary.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyList<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Item property

```csharp
System.Collections.Generic.KeyValuePair<TKey,TValue> System.Collections.Generic.IReadOnlyList<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Item[int index] { get; }
```

Gets the element at the specified index in the read-only list.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element at the specified index in the read-only list.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2` instance is cast to an `System.Collections.ICollection` interface.

## OrderedDictionary<TKey,TValue>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2` instance is cast to an `System.Collections.ICollection` interface.

## OrderedDictionary<TKey,TValue>.System.Collections.IDictionary.IsFixedSize property

```csharp
bool System.Collections.IDictionary.IsFixedSize { get; }
```

Gets a value indicating whether the `IDictionary` object has a fixed size.

Returns: `true` if the `IDictionary` object has a fixed size; otherwise, `false`.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2` instance is cast to an `System.Collections.IDictionary` interface.

## OrderedDictionary<TKey,TValue>.System.Collections.IDictionary.IsReadOnly property

```csharp
bool System.Collections.IDictionary.IsReadOnly { get; }
```

Gets a value indicating whether the `IDictionary` object is read-only.

Returns: `true` if the `IDictionary` object is read-only; otherwise, `false`.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2` instance is cast to an `System.Collections.IDictionary` interface.

## OrderedDictionary<TKey,TValue>.System.Collections.IDictionary.Item property

```csharp
object? System.Collections.IDictionary.Item[object key] { get; set; }
```

Gets or sets the element with the specified key.

Parameters:

- `key`: The key of the element to get or set.

Returns: The element with the specified key, or `null` if the key does not exist.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.IDictionary.Keys property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Keys { get; }
```

Gets an `ICollection` object containing the keys of the `IDictionary` object.

Returns: An `ICollection` object containing the keys of the `IDictionary` object.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2` instance is cast to an `System.Collections.IDictionary` interface.

## OrderedDictionary<TKey,TValue>.System.Collections.IDictionary.Values property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Values { get; }
```

Gets an `ICollection` object containing the values in the `IDictionary` object.

Returns: An `ICollection` object containing the values in the `IDictionary` object.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2` instance is cast to an `System.Collections.IDictionary` interface.
