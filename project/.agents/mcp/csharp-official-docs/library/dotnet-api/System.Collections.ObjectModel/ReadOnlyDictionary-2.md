---
title: "ReadOnlyDictionary<TKey,TValue> class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/ReadOnlyDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlyDictionary<TKey,TValue> class

Namespace: `System.Collections.ObjectModel`

```csharp
public class ReadOnlyDictionary<TKey,TValue> : System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IDictionary<TKey,TValue>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>, System.Collections.IDictionary
```

Represents a read-only, generic collection of key/value pairs.

Parameters:

- `TKey`: The type of keys in the dictionary.
- `TValue`: The type of values in the dictionary.

To be added.

## ReadOnlyDictionary<TKey,TValue>.ReadOnlyDictionary(IDictionary<TKey,TValue>) constructor

```csharp
public ReadOnlyDictionary (System.Collections.Generic.IDictionary<TKey,TValue> dictionary);
```

Initializes a new instance of the `ReadOnlyDictionary<T1,T2>` class that is a wrapper around the specified dictionary.

Parameters:

- `dictionary`: The dictionary to wrap.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.

To be added.

## ReadOnlyDictionary<TKey,TValue>.Count property

```csharp
public int Count { get; }
```

Gets the number of items in the dictionary.

Returns: The number of items in the dictionary.

To be added.

## ReadOnlyDictionary<TKey,TValue>.Dictionary property

```csharp
protected System.Collections.Generic.IDictionary<TKey,TValue> Dictionary { get; }
```

Gets the dictionary that is wrapped by this `ReadOnlyDictionary<T1,T2>` object.

Returns: The dictionary that is wrapped by this object.

To be added.

## ReadOnlyDictionary<TKey,TValue>.Empty property

```csharp
public static System.Collections.ObjectModel.ReadOnlyDictionary<TKey,TValue> Empty { get; }
```

Gets an empty `ReadOnlyDictionary<T1,T2>`.

Returns: An empty `ReadOnlyDictionary<T1,T2>`.

The returned instance is immutable and will always be empty.

## ReadOnlyDictionary<TKey,TValue>.Item property

```csharp
public TValue this[TKey key] { get; }
```

Gets the element that has the specified key.

Parameters:

- `key`: The key of the element to get.

Returns: The element that has the specified key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `KeyNotFoundException`: The property is retrieved and `key` is not found.

To be added.

## ReadOnlyDictionary<TKey,TValue>.Keys property

```csharp
public System.Collections.ObjectModel.ReadOnlyDictionary<TKey,TValue>.KeyCollection Keys { get; }
```

Gets a key <example-value> that contains the keys of the dictionary.

Returns: A key <example-value> that contains the keys of the dictionary.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly { get; }
```

Gets a value that indicates whether the dictionary is read-only.

Returns: Always returns `true` to indicate the dictionary is read-only.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Item property

```csharp
TValue System.Collections.Generic.IDictionary<TKey,TValue>.Item[TKey key] { get; set; }
```

Gets the element that has the specified key.

Parameters:

- `key`: The key of the element to get or set.

Returns: The element that has the specified key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `KeyNotFoundException`: The property is retrieved and `key` is not found.
- `NotSupportedException`: The property is set.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.ICollection<TKey> System.Collections.Generic.IDictionary<TKey,TValue>.Keys { get; }
```

Gets a collection that contains the keys of the dictionary.

Returns: A collection that contains the keys of the object that implements `ReadOnlyDictionary<T1,T2>`.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.ICollection<TValue> System.Collections.Generic.IDictionary<TKey,TValue>.Values { get; }
```

Gets a collection that contains the values in the dictionary.

Returns: A collection that contains the values in the object that implements `ReadOnlyDictionary<T1,T2>`.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.IEnumerable<TKey> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys { get; }
```

Gets an enumerable collection that contains the keys in the read-only dictionary.

Returns: An enumerable collection that contains the keys in the read-only dictionary.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.IEnumerable<TValue> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values { get; }
```

Gets an enumerable collection that contains the values in the read-only dictionary.

Returns: An enumerable collection that contains the values in the read-only dictionary.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value that indicates whether access to the dictionary is synchronized (thread safe).

Returns: `true` if access to the dictionary is synchronized (thread safe); otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `ICollection` interface.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the dictionary.

Returns: An object that can be used to synchronize access to the dictionary.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `ICollection` interface.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.IDictionary.IsFixedSize property

```csharp
bool System.Collections.IDictionary.IsFixedSize { get; }
```

Gets a value that indicates whether the dictionary has a fixed size.

Returns: `true` if the dictionary has a fixed size; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.IDictionary.IsReadOnly property

```csharp
bool System.Collections.IDictionary.IsReadOnly { get; }
```

Gets a value that indicates whether the dictionary is read-only.

Returns: `true` in all cases.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.IDictionary.Item property

```csharp
object? System.Collections.IDictionary.Item[object key] { get; set; }
```

Gets the element that has the specified key.

Parameters:

- `key`: The key of the element to get or set.

Returns: The element that has the specified key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `NotSupportedException`: The property is set.

-or-

The property is set, `key` does not exist in the collection, and the dictionary has a fixed size.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.IDictionary.Keys property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Keys { get; }
```

Gets a collection that contains the keys of the dictionary.

Returns: A collection that contains the keys of the dictionary.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.IDictionary.Values property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Values { get; }
```

Gets a collection that contains the values in the dictionary.

Returns: A collection that contains the values in the dictionary.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `IDictionary` interface.

## ReadOnlyDictionary<TKey,TValue>.Values property

```csharp
public System.Collections.ObjectModel.ReadOnlyDictionary<TKey,TValue>.ValueCollection Values { get; }
```

Gets a collection that contains the values in the dictionary.

Returns: A collection that contains the values in the object that implements `ReadOnlyDictionary<T1,T2>`.

To be added.

## ReadOnlyDictionary<TKey,TValue>.ContainsKey(TKey) method

```csharp
public bool ContainsKey (TKey key);
```

Determines whether the dictionary contains an element that has the specified key.

Parameters:

- `key`: The key to locate in the dictionary.

Returns: `true` if the dictionary contains an element that has the specified key; otherwise, `false`.

To be added.

## ReadOnlyDictionary<TKey,TValue>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>> GetEnumerator ();
```

Returns an enumerator that iterates through the `ReadOnlyDictionary<T1,T2>`.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Add(KeyValuePair<TKey,TValue>) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.Add (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Throws a `NotSupportedException` exception in all cases.

Parameters:

- `item`: The object to add to the dictionary.

Exceptions:

- `NotSupportedException`: In all cases.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Clear() method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.Clear ();
```

Throws a `NotSupportedException` exception in all cases.

Exceptions:

- `NotSupportedException`: In all cases.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Contains(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Contains (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Determines whether the dictionary contains a specific value.

Parameters:

- `item`: The object to locate in the dictionary.

Returns: `true` if `item` is found in the dictionary; otherwise, `false`.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.CopyTo(KeyValuePair<TKey,TValue>[], Int32) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.CopyTo (System.Collections.Generic.KeyValuePair<TKey,TValue>[] array, int arrayIndex);
```

Copies the elements of the dictionary to an array, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the dictionary. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than 0.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source dictionary is greater than the available space from `arrayIndex` to the end of the destination `array`.

-or-

Type `T` cannot be cast automatically to the type of the destination `array`.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Remove(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Remove (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Throws a `NotSupportedException` exception in all cases.

Parameters:

- `item`: The object to remove from the dictionary.

Returns: Throws a `NotSupportedException` exception in all cases.

Exceptions:

- `NotSupportedException`: In all cases.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Add(TKey, TValue) method

```csharp
void IDictionary<TKey,TValue>.Add (TKey key, TValue value);
```

Throws a `NotSupportedException` exception in all cases.

Parameters:

- `key`: The object to use as the key of the element to add.
- `value`: The object to use as the value of the element to add.

Exceptions:

- `NotSupportedException`: In all cases.

To be added.

## ReadOnlyDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Remove(TKey) method

```csharp
bool IDictionary<TKey,TValue>.Remove (TKey key);
```

Throws a `NotSupportedException` exception in all cases.

Parameters:

- `key`: The key of the element to remove.

Returns: Throws a `NotSupportedException` exception in all cases.

Exceptions:

- `NotSupportedException`: In all cases.

To be added.
