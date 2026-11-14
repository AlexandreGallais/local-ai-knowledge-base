---
title: "OrderedDictionary<TKey,TValue> class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/OrderedDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OrderedDictionary<TKey,TValue> class (part 2 of 3)

## OrderedDictionary<TKey,TValue>.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the `IList` has a fixed size.

Returns: `true` if the `IList` has a fixed size; otherwise, `false`.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2` instance is cast to an `System.Collections.IList` interface.

## OrderedDictionary<TKey,TValue>.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether the `IList` is read-only.

Returns: `true` if the `IList` is read-only; otherwise, `false`.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2` instance is cast to an `System.Collections.IList` interface.

## OrderedDictionary<TKey,TValue>.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

To be added.

## OrderedDictionary<TKey,TValue>.Values property

```csharp
public System.Collections.Generic.OrderedDictionary<TKey,TValue>.ValueCollection Values { get; }
```

Gets a collection containing the values in the `OrderedDictionary<T1,T2>`.

Returns: To be added.

To be added.

## OrderedDictionary<TKey,TValue>.Add(TKey, TValue) method

```csharp
public void Add (TKey key, TValue value);
```

Adds an element with the provided key and value to the `IDictionary<T1,T2>`.

Parameters:

- `key`: The object to use as the key of the element to add.
- `value`: The object to use as the value of the element to add.

Exceptions:

- `ArgumentNullException`: key is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `OrderedDictionary<T1,T2>`.

To be added.

## OrderedDictionary<TKey,TValue>.Clear() method

```csharp
public void Clear ();
```

Removes all items from the `ICollection<T>`.

To be added.

## OrderedDictionary<TKey,TValue>.ContainsKey(TKey) method

```csharp
public bool ContainsKey (TKey key);
```

Determines whether the `IDictionary<T1,T2>` contains an element with the specified key.

Parameters:

- `key`: The key to locate in the `IDictionary<T1,T2>`.

Returns: `true` if the `IDictionary<T1,T2>` contains an element with the key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## OrderedDictionary<TKey,TValue>.ContainsValue(TValue) method

```csharp
public bool ContainsValue (TValue value);
```

Determines whether the `OrderedDictionary<T1,T2>` contains a specific value.

Parameters:

- `value`: The value to locate in the `OrderedDictionary<T1,T2>`. The value can be `null` for reference types.

Returns: `true` if the `OrderedDictionary<T1,T2>` contains an element with the specified value; otherwise, `false`.

To be added.

## OrderedDictionary<TKey,TValue>.EnsureCapacity(Int32) method

```csharp
public int EnsureCapacity (int capacity);
```

Ensures that the dictionary can hold up to `capacity` entries without resizing.

Parameters:

- `capacity`: The desired minimum capacity of the dictionary. The actual capacity provided may be larger.

Returns: The new capacity of the dictionary.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is negative.

To be added.

## OrderedDictionary<TKey,TValue>.GetAt(Int32) method

```csharp
public System.Collections.Generic.KeyValuePair<TKey,TValue> GetAt (int index);
```

Gets the key/value pair at the specified index.

Parameters:

- `index`: The zero-based index of the pair to get.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than or equal to `OrderedDictionary<T1,T2>.Count`.

To be added.

## OrderedDictionary<TKey,TValue>.GetEnumerator() method

```csharp
public System.Collections.Generic.OrderedDictionary<TKey,TValue>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `OrderedDictionary<T1,T2>`.

Returns: A `Enumerator` structure for the `OrderedDictionary<T1,T2>`.

To be added.

## OrderedDictionary<TKey,TValue>.IndexOf(TKey) method

```csharp
public int IndexOf (TKey key);
```

Determines the index of a specific key in the `OrderedDictionary<T1,T2>`.

Parameters:

- `key`: The key to locate.

Returns: The index of `key` if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## OrderedDictionary<TKey,TValue>.Insert(Int32, TKey, TValue) method

```csharp
public void Insert (int index, TKey key, TValue value);
```

Inserts an item into the collection at the specified index.

Parameters:

- `index`: The zero-based index at which item should be inserted.
- `key`: The key to insert.
- `value`: The value to insert.

Exceptions:

- `ArgumentNullException`: key is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `OrderedDictionary<T1,T2>`.
- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than `OrderedDictionary<T1,T2>.Count`.

To be added.

## OrderedDictionary<TKey,TValue>.Remove(TKey) method

```csharp
public bool Remove (TKey key);
```

Removes the element with the specified key from the `IDictionary<T1,T2>`.

Parameters:

- `key`: The key of the element to remove.

Returns: `true` if the element is successfully removed; otherwise, `false`.  This method also returns `false` if `key` was not found in the original `IDictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## OrderedDictionary<TKey,TValue>.Remove(TKey, TValue) method

```csharp
public bool Remove (TKey key, out TValue value);
```

Removes the value with the specified key from the `OrderedDictionary<T1,T2>` and copies the element to the value parameter.

Parameters:

- `key`: The key of the element to remove.
- `value`: The removed element.

Returns: `true` if the element is successfully found and removed; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.

## OrderedDictionary<TKey,TValue>.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the `IList<T>` item at the specified index.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than or equal to `OrderedDictionary<T1,T2>.Count`.

To be added.

## OrderedDictionary<TKey,TValue>.SetAt(Int32, TValue) method

```csharp
public void SetAt (int index, TValue value);
```

Sets the value for the key at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.
- `value`: The value to store at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than or equal to `OrderedDictionary<T1,T2>.Count`.

To be added.

## OrderedDictionary<TKey,TValue>.SetAt(Int32, TKey, TValue) method

```csharp
public void SetAt (int index, TKey key, TValue value);
```

Sets the key/value pair at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.
- `key`: The key to store at the specified index.
- `value`: The value to store at the specified index.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than or equal to `OrderedDictionary<T1,T2>.Count`.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Add(KeyValuePair<TKey,TValue>) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.Add (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Adds an item to the `ICollection<T>`.

Parameters:

- `item`: The object to add to the `ICollection<T>`.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Contains(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Contains (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Determines whether the `ICollection<T>` contains a specific value.

Parameters:

- `item`: The object to locate in the `ICollection<T>`.

Returns: `true` if `item` is found in the `ICollection<T>`; otherwise, `false`.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.CopyTo(KeyValuePair<TKey,TValue>[], Int32) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.CopyTo (System.Collections.Generic.KeyValuePair<TKey,TValue>[] array, int arrayIndex);
```

Copies the elements of the `ICollection<T>` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection<T>`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Remove(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Remove (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Removes the first occurrence of a specific object from the `ICollection<T>`.

Parameters:

- `item`: The object to remove from the `ICollection<T>`.

Returns: `true` if `item` was successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if `item` is not found in the original `ICollection<T>`.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>> IEnumerable<KeyValuePair<TKey,TValue>>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.IList<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IndexOf(KeyValuePair<TKey,TValue>) method

```csharp
int IList<KeyValuePair<TKey,TValue>>.IndexOf (System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Determines the index of a specific item in the `IList<T>`.

Parameters:

- `item`: The object to locate in the `IList<T>`.

Returns: The index of `item` if found in the list; otherwise, -1.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.Generic.IList<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Insert(Int32, KeyValuePair<TKey,TValue>) method

```csharp
void IList<KeyValuePair<TKey,TValue>>.Insert (int index, System.Collections.Generic.KeyValuePair<TKey,TValue> item);
```

Inserts an item to the `IList<T>` at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert into the `IList<T>`.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.IDictionary.Add(Object, Object) method

```csharp
void IDictionary.Add (object key, object value);
```

Adds an element with the provided key and value to the `IDictionary` object.

Parameters:

- `key`: The `Object` to use as the key of the element to add.
- `value`: The `Object` to use as the value of the element to add.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.IDictionary.Contains(Object) method

```csharp
bool IDictionary.Contains (object key);
```

Determines whether the `IDictionary` object contains an element with the specified key.

Parameters:

- `key`: The key to locate in the `IDictionary` object.

Returns: `true` if the `IDictionary` contains an element with the key; otherwise, `false`.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.IDictionary.GetEnumerator() method

```csharp
System.Collections.IDictionaryEnumerator IDictionary.GetEnumerator ();
```

Returns an `IDictionaryEnumerator` object for the `IDictionary` object.

Returns: An `IDictionaryEnumerator` object for the `IDictionary` object.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2` instance is cast to an `System.Collections.IDictionary` interface.

## OrderedDictionary<TKey,TValue>.System.Collections.IDictionary.Remove(Object) method

```csharp
void IDictionary.Remove (object key);
```

Removes the element with the specified key from the `IDictionary` object.

Parameters:

- `key`: The key of the element to remove.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2` instance is cast to an `System.Collections.IEnumerable` interface.

## OrderedDictionary<TKey,TValue>.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Adds an item to the `IList`.

Parameters:

- `value`: The object to add to the `IList`.

Returns: The position into which the new element was inserted, or -1 to indicate that the item was not inserted into the collection.

To be added.

## OrderedDictionary<TKey,TValue>.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the `IList` contains a specific value.

Parameters:

- `value`: The object to locate in the `IList`.

Returns: `true` if the `Object` is found in the `IList`; otherwise, `false`.

To be added.
