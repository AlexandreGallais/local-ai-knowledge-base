---
title: "ReadOnlyDictionary<TKey,TValue>+KeyCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/ReadOnlyDictionary`2+KeyCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlyDictionary<TKey,TValue>+KeyCollection class

Namespace: `System.Collections.ObjectModel`

```csharp
public sealed class ReadOnlyDictionary<TKey,TValue>.KeyCollection : System.Collections.Generic.ICollection<TKey>, System.Collections.Generic.IEnumerable<TKey>, System.Collections.Generic.IReadOnlyCollection<TKey>, System.Collections.ICollection
```

Represents a read-only collection of the keys of a `ReadOnlyDictionary<T1,T2>` object.

To be added.

## ReadOnlyDictionary<TKey,TValue>+KeyCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of elements in the collection.

Returns: The number of elements in the collection.

To be added.

## ReadOnlyDictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.ICollection<TKey>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<TKey>.IsReadOnly { get; }
```

Gets a value that indicates whether the dictionary is read-only.

Returns: `true` in all cases.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyDictionary<T1,T2>` instance is cast to an `ICollection<T>` interface.

## ReadOnlyDictionary<TKey,TValue>+KeyCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value that indicates whether access to the collection is synchronized (thread safe).

Returns: `true` if access to the collection is synchronized (thread safe); otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `KeyCollection` instance is cast to an `ICollection` interface.

## ReadOnlyDictionary<TKey,TValue>+KeyCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the collection.

Returns: An object that can be used to synchronize access to the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `KeyCollection` instance is cast to an `ICollection` interface.

## ReadOnlyDictionary<TKey,TValue>+KeyCollection.Contains(TKey) method

```csharp
public bool Contains (TKey item);
```

Determines whether the `ICollection<T>` contains a specific value.

Parameters:

- `item`: The object to locate in the `ICollection<T>`.

Returns: `true` if `item` is found in the `ICollection<T>`; otherwise, `false`.

To be added.

## ReadOnlyDictionary<TKey,TValue>+KeyCollection.CopyTo(TKey[], Int32) method

```csharp
public void CopyTo (TKey[] array, int arrayIndex);
```

Copies the elements of the collection to an array, starting at a specific array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the collection. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than 0.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source collection is greater than the available space from `arrayIndex` to the end of the destination `array`.

-or-

Type `T` cannot be cast automatically to the type of the destination `array`.

To be added.

## ReadOnlyDictionary<TKey,TValue>+KeyCollection.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<TKey> GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## ReadOnlyDictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.ICollection<TKey>.Add(TKey) method

```csharp
void ICollection<TKey>.Add (TKey item);
```

Throws a `NotSupportedException` exception in all cases.

Parameters:

- `item`: The object to add to the collection.

Exceptions:

- `NotSupportedException`: In all cases.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `KeyCollection` instance is cast to an `ICollection<T>` interface. The `ICollection<T>` interface specifies that the `ICollection<T>.Add` method should throw a `NotSupportedException` exception if the collection that implements the interface is read-only.

## ReadOnlyDictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.ICollection<TKey>.Clear() method

```csharp
void ICollection<TKey>.Clear ();
```

Throws a `NotSupportedException` exception in all cases.

Exceptions:

- `NotSupportedException`: In all cases.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `KeyCollection` instance is cast to an `ICollection<T>` interface. The `ICollection<T>` interface specifies that the `ICollection<T>.Clear` method should throw a `NotSupportedException` exception if the collection that implements the interface is read-only.

## ReadOnlyDictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.ICollection<TKey>.Remove(TKey) method

```csharp
bool ICollection<TKey>.Remove (TKey item);
```

Throws a `NotSupportedException` exception in all cases.

Parameters:

- `item`: The object to remove from the collection.

Returns: `true` if `item` was successfully removed from the collection; otherwise, `false`. This method also returns `false` if `item` is not found in the original collection.

Exceptions:

- `NotSupportedException`: In all cases.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `KeyCollection` instance is cast to an `ICollection<T>` interface. The `ICollection<T>` interface specifies that the `ICollection<T>.Remove` method should throw a `NotSupportedException` exception if the collection that implements the interface is read-only.

## ReadOnlyDictionary<TKey,TValue>+KeyCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the collection to an array, starting at a specific array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the collection. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source collection is greater than the available space from `index` to the end of the destination `array`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `KeyCollection` instance is cast to an `ICollection` interface.

## ReadOnlyDictionary<TKey,TValue>+KeyCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `KeyCollection` instance is cast to an `IEnumerable` interface.
