---
title: "OrderedDictionary<TKey,TValue>+ValueCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/OrderedDictionary`2+ValueCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OrderedDictionary<TKey,TValue>+ValueCollection class

Namespace: `System.Collections.Generic`

```csharp
public sealed class OrderedDictionary<TKey,TValue>.ValueCollection : System.Collections.Generic.ICollection<TValue>, System.Collections.Generic.IEnumerable<TValue>, System.Collections.Generic.IList<TValue>, System.Collections.Generic.IReadOnlyCollection<TValue>, System.Collections.Generic.IReadOnlyList<TValue>, System.Collections.IList
```

Represents the collection of values in a `OrderedDictionary<T1,T2>`.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `ICollection<T>`.

Returns: The number of elements contained in the `ICollection<T>`.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.ICollection<TValue>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<TValue>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.IList<TValue>.Item property

```csharp
TValue System.Collections.Generic.IList<TValue>.Item[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.IReadOnlyList<TValue>.Item property

```csharp
TValue System.Collections.Generic.IReadOnlyList<TValue>.Item[int index] { get; }
```

Gets the element at the specified index in the read-only list.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element at the specified index in the read-only list.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2.ValueCollection` instance is cast to an `System.Collections.ICollection` interface.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2.ValueCollection` instance is cast to an `System.Collections.ICollection` interface.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the `IList` has a fixed size.

Returns: `true` if the `IList` has a fixed size; otherwise, `false`.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2.ValueCollection` instance is cast to an `System.Collections.IList` interface.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether the `IList` is read-only.

Returns: `true` if the `IList` is read-only; otherwise, `false`.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2.ValueCollection` instance is cast to an `System.Collections.IList` interface.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.CopyTo(TValue[], Int32) method

```csharp
public void CopyTo (TValue[] array, int arrayIndex);
```

Copies the elements of the `ICollection<T>` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection<T>`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.GetEnumerator() method

```csharp
public System.Collections.Generic.OrderedDictionary<TKey,TValue>.ValueCollection.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `ValueCollection`.

Returns: A `Enumerator` for the `ValueCollection`.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.ICollection<TValue>.Add(TValue) method

```csharp
void ICollection<TValue>.Add (TValue item);
```

Adds an item to the `ICollection<T>`.

Parameters:

- `item`: The object to add to the `ICollection<T>`.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.ICollection<TValue>.Clear() method

```csharp
void ICollection<TValue>.Clear ();
```

Removes all items from the `ICollection<T>`.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.ICollection<TValue>.Contains(TValue) method

```csharp
bool ICollection<TValue>.Contains (TValue item);
```

Determines whether the `ICollection<T>` contains a specific value.

Parameters:

- `item`: The object to locate in the `ICollection<T>`.

Returns: `true` if `item` is found in the `ICollection<T>`; otherwise, `false`.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.ICollection<TValue>.Remove(TValue) method

```csharp
bool ICollection<TValue>.Remove (TValue item);
```

Removes the first occurrence of a specific object from the `ICollection<T>`.

Parameters:

- `item`: The object to remove from the `ICollection<T>`.

Returns: `true` if `item` was successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if `item` is not found in the original `ICollection<T>`.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.IEnumerable<TValue>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<TValue> IEnumerable<TValue>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.IList<TValue>.IndexOf(TValue) method

```csharp
int IList<TValue>.IndexOf (TValue item);
```

Determines the index of a specific item in the `IList<T>`.

Parameters:

- `item`: The object to locate in the `IList<T>`.

Returns: The index of `item` if found in the list; otherwise, -1.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.IList<TValue>.Insert(Int32, TValue) method

```csharp
void IList<TValue>.Insert (int index, TValue item);
```

Inserts an item to the `IList<T>` at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert into the `IList<T>`.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.IList<TValue>.RemoveAt(Int32) method

```csharp
void IList<TValue>.RemoveAt (int index);
```

Removes the `IList<T>` item at the specified index.

Parameters:

- `index`: The zero-based index of the item to remove.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2.ValueCollection` instance is cast to an `System.Collections.IEnumerable` interface.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Adds an item to the `IList`.

Parameters:

- `value`: The object to add to the `IList`.

Returns: The position into which the new element was inserted, or -1 to indicate that the item was not inserted into the collection.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.IList.Clear() method

```csharp
void IList.Clear ();
```

Removes all items from the `IList`.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.Generic.OrderedDictionary`2.ValueCollection` instance is cast to an `System.Collections.IList` interface.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the `IList` contains a specific value.

Parameters:

- `value`: The object to locate in the `IList`.

Returns: `true` if the `Object` is found in the `IList`; otherwise, `false`.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specific item in the `IList`.

Parameters:

- `value`: The object to locate in the `IList`.

Returns: The index of `value` if found in the list; otherwise, -1.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Inserts an item to the `IList` at the specified index.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The object to insert into the `IList`.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Removes the first occurrence of a specific object from the `IList`.

Parameters:

- `value`: The object to remove from the `IList`.

To be added.

## OrderedDictionary<TKey,TValue>+ValueCollection.System.Collections.IList.RemoveAt(Int32) method

```csharp
void IList.RemoveAt (int index);
```

Removes the `IList` item at the specified index.

Parameters:

- `index`: The zero-based index of the item to remove.

To be added.
