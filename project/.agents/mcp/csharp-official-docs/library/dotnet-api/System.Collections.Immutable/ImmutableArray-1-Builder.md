---
title: "ImmutableArray<T>+Builder class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableArray`1+Builder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableArray<T>+Builder class

Namespace: `System.Collections.Immutable`

```csharp
public sealed class ImmutableArray<T>.Builder : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IList<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlyList<T>
```

Represents a writable array accessor that can be converted into an `ImmutableArray<T>` instance without allocating extra memory.

To be added.

## ImmutableArray<T>+Builder.Capacity property

```csharp
public int Capacity { get; set; }
```

Gets or sets the length of the internal array. When set, the internal array is reallocated to the given capacity if it is not already the specified length.

Returns: The length of the internal array.

To be added.

## ImmutableArray<T>+Builder.Count property

```csharp
public int Count { get; set; }
```

Gets or sets the number of items in the array.

Returns: The number of items in the array.

#### Remarks
If the value is decreased, the array contents are truncated.

If the value is increased, the added elements are initialized to their default value.

## ImmutableArray<T>+Builder.Item property

```csharp
public T this[int index] { get; set; }
```

Gets or sets the item at the specified index.

Parameters:

- `index`: The index of the item to get or set.

Returns: The item at the specified index.

Exceptions:

- `IndexOutOfRangeException`: The specified index is not in the array.

To be added.

## ImmutableArray<T>+Builder.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value that indicates whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

To be added.

## ImmutableArray<T>+Builder.Add(T) method

```csharp
public void Add (T item);
```

Adds the specified item to the array.

Parameters:

- `item`: The object to add to the array.

To be added.

## ImmutableArray<T>+Builder.AddRange(IEnumerable<T>) method

```csharp
public void AddRange (System.Collections.Generic.IEnumerable<T> items);
```

Adds the specified items to the end of the array.

Parameters:

- `items`: The items to add to the array.

To be added.

## ImmutableArray<T>+Builder.AddRange(ImmutableArray<T>) method

```csharp
public void AddRange (System.Collections.Immutable.ImmutableArray<T> items);
```

Adds the specified items to the end of the array.

Parameters:

- `items`: The items to add to the array.

To be added.

## ImmutableArray<T>+Builder.AddRange(ImmutableArray<T>+Builder) method

```csharp
public void AddRange (System.Collections.Immutable.ImmutableArray<T>.Builder items);
```

Adds the specified items to the end of the array.

Parameters:

- `items`: The items to add to the array.

To be added.

## ImmutableArray<T>+Builder.AddRange(ReadOnlySpan<T>) method

```csharp
public void AddRange (scoped ReadOnlySpan<T> items);
```

Adds the specified items to the end of the array.

Parameters:

- `items`: The items to add at the end of the array.

To be added.

## ImmutableArray<T>+Builder.AddRange(T[]) method

```csharp
public void AddRange (params T[] items);
```

Adds the specified items to the end of the array.

Parameters:

- `items`: The items to add to the array.

To be added.

## ImmutableArray<T>+Builder.AddRange(ImmutableArray<T>, Int32) method

```csharp
public void AddRange (System.Collections.Immutable.ImmutableArray<T> items, int length);
```

Adds the specified items to the end of the array.

Parameters:

- `items`: The items to add to the array.
- `length`: The number of elements from the source array to add.

To be added.

## ImmutableArray<T>+Builder.AddRange(T[], Int32) method

```csharp
public void AddRange (T[] items, int length);
```

Adds the specified items to the end of the array.

Parameters:

- `items`: The items to add to the array.
- `length`: The number of elements from the source array to add.

To be added.

## ImmutableArray<T>+Builder.AddRange<TDerived>(ImmutableArray<TDerived>) method

```csharp
public void AddRange<TDerived> (System.Collections.Immutable.ImmutableArray<TDerived> items) where TDerived : T;
```

Adds the specified items that derive from the type currently in the array, to the end of the array.

Parameters:

- `TDerived`: The type that derives from the type of item already in the array.
- `items`: The items to add to the end of the array.

To be added.

## ImmutableArray<T>+Builder.AddRange<TDerived>(ImmutableArray<TDerived>+Builder) method

```csharp
public void AddRange<TDerived> (System.Collections.Immutable.ImmutableArray<TDerived>.Builder items) where TDerived : T;
```

Adds the specified items that derive from the type currently in the array, to the end of the array.

Parameters:

- `TDerived`: The type that derives from the type of item already in the array.
- `items`: The items to add to the end of the array.

To be added.

## ImmutableArray<T>+Builder.AddRange<TDerived>(ReadOnlySpan<TDerived>) method

```csharp
public void AddRange<TDerived> (scoped ReadOnlySpan<TDerived> items) where TDerived : T;
```

Adds the specified items to the end of the array.

Parameters:

- `TDerived`: The type that derives from the type of item already in the array.
- `items`: The items to add at the end of the array.

To be added.

## ImmutableArray<T>+Builder.AddRange<TDerived>(TDerived[]) method

```csharp
public void AddRange<TDerived> (TDerived[] items) where TDerived : T;
```

Adds the specified items that derive from the type currently in the array, to the end of the array.

Parameters:

- `TDerived`: The type that derives from the type of item already in the array.
- `items`: The items to add to end of the array.

To be added.

## ImmutableArray<T>+Builder.Clear() method

```csharp
public void Clear ();
```

Removes all items from the array.

To be added.

## ImmutableArray<T>+Builder.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether the array contains a specific value.

Parameters:

- `item`: The object to locate in the array.

Returns: `true` if the object is found; otherwise, `false`.

To be added.

## ImmutableArray<T>+Builder.CopyTo(Span<T>) method

```csharp
public void CopyTo (Span<T> destination);
```

Copies the current contents to the specified `Span<T>`.

Parameters:

- `destination`: The `Span<T>` to copy to.

To be added.

## ImmutableArray<T>+Builder.CopyTo(T[]) method

```csharp
public void CopyTo (T[] destination);
```

Copies the contents of this array to the specified array.

Parameters:

- `destination`: The array to copy to.

To be added.

## ImmutableArray<T>+Builder.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int index);
```

Copies the current contents to the specified array.

Parameters:

- `array`: The array to copy to.
- `index`: The index to start the copy operation.

To be added.

## ImmutableArray<T>+Builder.CopyTo(Int32, T[], Int32, Int32) method

```csharp
public void CopyTo (int sourceIndex, T[] destination, int destinationIndex, int length);
```

Copies the contents of this array to the specified array.

Parameters:

- `sourceIndex`: The index into this collection of the first element to copy.
- `destination`: The array to copy to.
- `destinationIndex`: The index into the destination array to which the first copied element is written.
- `length`: The number of elements to copy.

To be added.

## ImmutableArray<T>+Builder.DrainToImmutable() method

```csharp
public System.Collections.Immutable.ImmutableArray<T> DrainToImmutable ();
```

Returns the current contents as an `ImmutableArray<T>` and sets the collection to a zero length array.

Returns: An immutable array.

If `Builder.Capacity` equals `Builder.Count`, the internal array will be extracted as an `ImmutableArray<T>` without copying the contents. Otherwise, the contents will be copied into a new array. The collection will then be set to a zero length array.

## ImmutableArray<T>+Builder.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<T> GetEnumerator ();
```

Gets an object that can be used to iterate through the collection.

Returns: An object that can be used to iterate through the collection.

To be added.

## ImmutableArray<T>+Builder.IndexOf(T) method

```csharp
public int IndexOf (T item);
```

Determines the index of a specific item in the array.

Parameters:

- `item`: The item to locate in the array.

Returns: The index of `item` if it's found in the list; otherwise, -1.

To be added.

## ImmutableArray<T>+Builder.IndexOf(T, Int32) method

```csharp
public int IndexOf (T item, int startIndex);
```

Determines the index of the specified item.

Parameters:

- `item`: The item to locate in the array.
- `startIndex`: The starting position of the search.

Returns: The index of `item` if it's found in the list; otherwise, -1.

To be added.

## ImmutableArray<T>+Builder.IndexOf(T, Int32, IEqualityComparer<T>) method

```csharp
public int IndexOf (T item, int startIndex, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Searches the array for the specified item.

Parameters:

- `item`: The item to search for.
- `startIndex`: The index at which to begin the search.
- `equalityComparer`: The equality comparer to use in the search.
If `null`, `EqualityComparer<T>.Default` is used.

Returns: The 0-based index into the array where the item was found; or -1 if it could not be found.

To be added.

## ImmutableArray<T>+Builder.IndexOf(T, Int32, Int32) method

```csharp
public int IndexOf (T item, int startIndex, int count);
```

Determines the index of the specified item.

Parameters:

- `item`: The item to locate in the array.
- `startIndex`: The starting position of the search.
- `count`: The number of elements to search.

Returns: The index of `item` if it's found in the list; otherwise, -1.

To be added.

## ImmutableArray<T>+Builder.IndexOf(T, Int32, Int32, IEqualityComparer<T>) method

```csharp
public int IndexOf (T item, int startIndex, int count, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Determines the index for the specified item.

Parameters:

- `item`: The item to locate in the array.
- `startIndex`: The index at which to begin the search.
- `count`: The starting position of the search.
- `equalityComparer`: The equality comparer to use in the search.

Returns: The index of `item` if it's found in the list; otherwise, -1.

To be added.

## ImmutableArray<T>+Builder.Insert(Int32, T) method

```csharp
public void Insert (int index, T item);
```

Inserts an item in the array at the specified index.

Parameters:

- `index`: The zero-based index at which to insert the item.
- `item`: The object to insert into the array.

To be added.

## ImmutableArray<T>+Builder.InsertRange(Int32, IEnumerable<T>) method

```csharp
public void InsertRange (int index, System.Collections.Generic.IEnumerable<T> items);
```

Inserts the specified values at the specified index.

Parameters:

- `index`: The index at which to insert the value.
- `items`: The elements to insert.

To be added.

## ImmutableArray<T>+Builder.InsertRange(Int32, ImmutableArray<T>) method

```csharp
public void InsertRange (int index, System.Collections.Immutable.ImmutableArray<T> items);
```

Inserts the specified values at the specified index.

Parameters:

- `index`: The index at which to insert the value.
- `items`: The elements to insert.

To be added.

## ImmutableArray<T>+Builder.ItemRef(Int32) method

```csharp
public ref readonly T ItemRef (int index);
```

Gets a read-only reference to the element at the specified index.

Parameters:

- `index`: The item index.

Returns: The read-only reference to the element at the specified index.

Exceptions:

- `IndexOutOfRangeException`: `index` is greater or equal to the array count.

To be added.

## ImmutableArray<T>+Builder.LastIndexOf(T) method

```csharp
public int LastIndexOf (T item);
```

Determines the 0-based index of the last occurrence of the specified item in this array.

Parameters:

- `item`: The item to search for.

Returns: The 0-based index where the item was found; or -1 if it could not be found.

To be added.

## ImmutableArray<T>+Builder.LastIndexOf(T, Int32) method

```csharp
public int LastIndexOf (T item, int startIndex);
```

Determines the 0-based index of the last occurrence of the specified item in this array.

Parameters:

- `item`: The item to search for.
- `startIndex`: The starting position of the search.

Returns: The 0-based index into the array where the item was found; or -1 if it could not be found.

To be added.

## ImmutableArray<T>+Builder.LastIndexOf(T, Int32, Int32) method

```csharp
public int LastIndexOf (T item, int startIndex, int count);
```

Determines the 0-based index of the last occurrence of the specified item in this array.

Parameters:

- `item`: The item to search for.
- `startIndex`: The starting position of the search.
- `count`: The number of elements to search.

Returns: The 0-based index into the array where the item was found; or -1 if it could not be found.

To be added.

## ImmutableArray<T>+Builder.LastIndexOf(T, Int32, Int32, IEqualityComparer<T>) method

```csharp
public int LastIndexOf (T item, int startIndex, int count, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Determines the 0-based index of the last occurrence of the specified item in this array.

Parameters:

- `item`: The item to search for.
- `startIndex`: The starting position of the search.
- `count`: The number of elements to search.
- `equalityComparer`: The equality comparer to use in the search.

Returns: The 0-based index into the array where the item was found; or -1 if it could not be found.

To be added.

## ImmutableArray<T>+Builder.MoveToImmutable() method

```csharp
public System.Collections.Immutable.ImmutableArray<T> MoveToImmutable ();
```

Extracts the internal array as an `ImmutableArray<T>` and replaces it              with a zero length array.

Returns: An immutable array containing the elements of the builder.

Exceptions:

- `InvalidOperationException`: When `Builder.Count` doesn't              equal `Builder.Capacity`.

To be added.

## ImmutableArray<T>+Builder.Remove(T) method

```csharp
public bool Remove (T element);
```

Removes the specified element.

Parameters:

- `element`: The item to remove.

Returns: `true` if `element` was found and removed; otherwise, `false`.

To be added.
