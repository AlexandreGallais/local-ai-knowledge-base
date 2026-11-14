---
title: "ImmutableArray<T> struct (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableArray`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableArray<T> struct (part 2 of 4)

## ImmutableArray<T>.CastUp<TDerived>(ImmutableArray<TDerived>) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> CastUp<TDerived> (System.Collections.Immutable.ImmutableArray<TDerived> items) where TDerived : class, T;
```

Initializes a new instance of the `ImmutableArray<T>` struct based on the contents of an existing instance, allowing a covariant static cast to efficiently reuse the existing array.

Parameters:

- `TDerived`: The type of array element to return.
- `items`: The array to initialize the array with. No copy is made.

Returns: An immutable array instance with elements cast to the new type.

#### Remarks
Covariant upcasts from this method may be reversed by calling the `ImmutableArray<T>.As` or `ImmutableArray<T>.CastArray` method.

## ImmutableArray<T>.Clear() method

```csharp
public System.Collections.Immutable.ImmutableArray<T> Clear ();
```

Returns an array with all the elements removed.

Returns: An array with all of the elements removed.

To be added.

## ImmutableArray<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether the specified item exists in the array.

Parameters:

- `item`: The item to search for.

Returns: `true` if the specified item was found in the array; otherwise `false`.

To be added.

## ImmutableArray<T>.Contains(T, IEqualityComparer<T>) method

```csharp
public bool Contains (T item, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Determines whether the specified item exists in the array.

Parameters:

- `item`: The item to search for.
- `equalityComparer`: The equality comparer to use in the search.
If `null`, `EqualityComparer<T>.Default` is used.

Returns: `true` if an equal value was found in the array; `false` otherwise.

To be added.

## ImmutableArray<T>.CopyTo(Span<T>) method

```csharp
public void CopyTo (Span<T> destination);
```

Copies the elements of current `ImmutableArray<T>` to a `Span<T>`.

Parameters:

- `destination`: The `Span<T>` that is the destination of the elements copied from current `ImmutableArray<T>`.

To be added.

## ImmutableArray<T>.CopyTo(T[]) method

```csharp
public void CopyTo (T[] destination);
```

Copies the contents of this array to the specified array.

Parameters:

- `destination`: The array to copy to.

To be added.

## ImmutableArray<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] destination, int destinationIndex);
```

Copies the contents of this array to the specified array starting at the specified destination index.

Parameters:

- `destination`: The array to copy to.
- `destinationIndex`: The index in `destination` where copying begins.

To be added.

## ImmutableArray<T>.CopyTo(Int32, T[], Int32, Int32) method

```csharp
public void CopyTo (int sourceIndex, T[] destination, int destinationIndex, int length);
```

Copies the specified items in this array to the specified array at the specified starting index.

Parameters:

- `sourceIndex`: The index of this array where copying begins.
- `destination`: The array to copy to.
- `destinationIndex`: The index in `destination` where copying begins.
- `length`: The number of elements to copy from this array.

To be added.

## ImmutableArray<T>.Equals(ImmutableArray<T>) method

```csharp
public bool Equals (System.Collections.Immutable.ImmutableArray<T> other);
```

Indicates whether specified array is equal to this array.

Parameters:

- `other`: An object to compare with this object.

Returns: `true` if `other` is equal to this array; otherwise, `false`.

To be added.

## ImmutableArray<T>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines if this array is equal to the specified object.

Parameters:

- `obj`: The `Object` to compare with this array.

Returns: `true` if this array is equal to `obj`; otherwise, `false`.

To be added.

## ImmutableArray<T>.GetEnumerator() method

```csharp
public System.Collections.Immutable.ImmutableArray<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the contents of the array.

Returns: An enumerator.

To be added.

## ImmutableArray<T>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash code for this instance.

Returns: A hash code for this instance, suitable for use in hashing algorithms and data structures like a hash table.

To be added.

## ImmutableArray<T>.IndexOf(T) method

```csharp
public int IndexOf (T item);
```

Searches the array for the specified item.

Parameters:

- `item`: The item to search for.

Returns: The zero-based index position of the item if it is found, or -1 if it is not.

To be added.

## ImmutableArray<T>.IndexOf(T, Int32) method

```csharp
public int IndexOf (T item, int startIndex);
```

Searches the array for the specified item.

Parameters:

- `item`: The item to search for.
- `startIndex`: The index at which to begin the search.

Returns: The zero-based index position of the item if it is found, or -1 if it is not.

To be added.

## ImmutableArray<T>.IndexOf(T, Int32, IEqualityComparer<T>) method

```csharp
public int IndexOf (T item, int startIndex, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Searches the array for the specified item.

Parameters:

- `item`: The item to search for.
- `startIndex`: The index at which to begin the search.
- `equalityComparer`: The equality comparer to use in the search.

Returns: The zero-based index position of the item if it is found, or -1 if it is not.

To be added.

## ImmutableArray<T>.IndexOf(T, Int32, Int32) method

```csharp
public int IndexOf (T item, int startIndex, int count);
```

Searches the array for the specified item.

Parameters:

- `item`: The item to search for.
- `startIndex`: The index at which to begin the search.
- `count`: The number of elements to search.

Returns: The zero-based index position of the item if it is found, or -1 if it is not.

To be added.

## ImmutableArray<T>.IndexOf(T, Int32, Int32, IEqualityComparer<T>) method

```csharp
public int IndexOf (T item, int startIndex, int count, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Searches the array for the specified item.

Parameters:

- `item`: The item to search for.
- `startIndex`: The index at which to begin the search.
- `count`: The number of elements to search.
- `equalityComparer`: The equality comparer to use in the search.

Returns: The zero-based index position of the item if it is found, or -1 if it is not.

To be added.

## ImmutableArray<T>.Insert(Int32, T) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> Insert (int index, T item);
```

Returns a new array with the specified value inserted at the specified position.

Parameters:

- `index`: The 0-based index into the array at which the new item should be added.
- `item`: The item to insert at the start of the array.

Returns: A new array with the item inserted at the specified index.

To be added.

## ImmutableArray<T>.InsertRange(Int32, IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> InsertRange (int index, System.Collections.Generic.IEnumerable<T> items);
```

Inserts the specified values at the specified index.

Parameters:

- `index`: The index at which to insert the value.
- `items`: The elements to insert.

Returns: A new immutable array with the items inserted at the specified index.

To be added.

## ImmutableArray<T>.InsertRange(Int32, ImmutableArray<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> InsertRange (int index, System.Collections.Immutable.ImmutableArray<T> items);
```

Inserts the specified values at the specified index.

Parameters:

- `index`: The index at which to insert the value.
- `items`: The elements to insert.

Returns: A new immutable array with the items inserted at the specified index.

To be added.

## ImmutableArray<T>.InsertRange(Int32, ReadOnlySpan<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> InsertRange (int index, scoped ReadOnlySpan<T> items);
```

Inserts the specified values at the specified index.

Parameters:

- `index`: The index at which to insert the value.
- `items`: The elements to insert.

Returns: The new immutable collection.

To be added.

## ImmutableArray<T>.InsertRange(Int32, T[]) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> InsertRange (int index, T[] items);
```

Inserts the specified values at the specified index.

Parameters:

- `index`: The index at which to insert the value.
- `items`: The elements to insert.

Returns: The new immutable collection.

To be added.

## ImmutableArray<T>.ItemRef(Int32) method

```csharp
public ref readonly T ItemRef (int index);
```

Gets a read-only reference to the element at the specified `index` in the read-only list.

Parameters:

- `index`: The zero-based index of the element to get a reference to.

Returns: A read-only reference to the element at the specified `index` in the read-only list.

To be added.

## ImmutableArray<T>.LastIndexOf(T) method

```csharp
public int LastIndexOf (T item);
```

Searches the array for the specified item; starting at the end of the array.

Parameters:

- `item`: The item to search for.

Returns: The 0-based index into the array where the item was found; or -1 if it could not be found.

To be added.

## ImmutableArray<T>.LastIndexOf(T, Int32) method

```csharp
public int LastIndexOf (T item, int startIndex);
```

Searches the array for the specified item; starting at the end of the array.

Parameters:

- `item`: The item to search for.
- `startIndex`: The index at which to begin the search.

Returns: The 0-based index into the array where the item was found; or -1 if it could not be found.

To be added.

## ImmutableArray<T>.LastIndexOf(T, Int32, Int32) method

```csharp
public int LastIndexOf (T item, int startIndex, int count);
```

Searches the array for the specified item; starting at the end of the array.

Parameters:

- `item`: The item to search for.
- `startIndex`: The index at which to begin the search.
- `count`: The number of elements to search.

Returns: The 0-based index into the array where the item was found; or -1 if it could not be found.

To be added.

## ImmutableArray<T>.LastIndexOf(T, Int32, Int32, IEqualityComparer<T>) method

```csharp
public int LastIndexOf (T item, int startIndex, int count, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Searches the array for the specified item; starting at the end of the array.

Parameters:

- `item`: The item to search for.
- `startIndex`: The index at which to begin the search.
- `count`: The number of elements to search.
- `equalityComparer`: The equality comparer to use in the search.

Returns: The 0-based index into the array where the item was found; or -1 if it could not be found.

To be added.

## ImmutableArray<T>.OfType<TResult>() method

```csharp
public System.Collections.Generic.IEnumerable<TResult> OfType<TResult> ();
```

Filters the elements of this array to those assignable to the specified type.

Parameters:

- `TResult`: The type to filter the elements of the sequence on.

Returns: An `IEnumerable` that contains elements from the input sequence of type of `TResult`.

To be added.

## ImmutableArray<T>.op_Equality(ImmutableArray<T>, ImmutableArray<T>) method

```csharp
public static bool operator == (System.Collections.Immutable.ImmutableArray<T> left, System.Collections.Immutable.ImmutableArray<T> right);
```

Returns a value that indicates if two arrays are equal.

Parameters:

- `left`: The array to the left of the operator.
- `right`: The array to the right of the operator.

Returns: `true` if the arrays are equal; otherwise, `false`.

To be added.

## ImmutableArray<T>.op_Equality(ImmutableArray<T>>, ImmutableArray<T>>) method

```csharp
public static bool operator == (System.Collections.Immutable.ImmutableArray<T>? left, System.Collections.Immutable.ImmutableArray<T>? right);
```

Returns a value that indicates if two arrays are equal.

Parameters:

- `left`: The array to the left of the operator.
- `right`: The array to the right of the operator.

Returns: `true` if the arrays are equal; otherwise, `false`.

To be added.

## ImmutableArray<T>.op_Inequality(ImmutableArray<T>, ImmutableArray<T>) method

```csharp
public static bool operator != (System.Collections.Immutable.ImmutableArray<T> left, System.Collections.Immutable.ImmutableArray<T> right);
```

Returns a value that indicates whether two arrays are not equal.

Parameters:

- `left`: The array to the left of the operator.
- `right`: The array to the right of the operator.

Returns: `true` if the arrays are not equal; otherwise, `false`.

To be added.

## ImmutableArray<T>.op_Inequality(ImmutableArray<T>>, ImmutableArray<T>>) method

```csharp
public static bool operator != (System.Collections.Immutable.ImmutableArray<T>? left, System.Collections.Immutable.ImmutableArray<T>? right);
```

Checks for inequality between two array.

Parameters:

- `left`: The object to the left of the operator.
- `right`: The object to the right of the operator.

Returns: `true` if the two arrays are not equal; otherwise, `false`.

To be added.

## ImmutableArray<T>.Remove(T) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> Remove (T item);
```

Returns an array with the first occurrence of the specified element removed from the array. If no match is found, the current array is returned.

Parameters:

- `item`: The item to remove.

Returns: A new array with the item removed.

To be added.

## ImmutableArray<T>.Remove(T, IEqualityComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> Remove (T item, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Returns an array with the first occurrence of the specified element removed from the array.

If no match is found, the current array is returned.

Parameters:

- `item`: The item to remove.
- `equalityComparer`: The equality comparer to use in the search.

Returns: A new array with the specified item removed.

To be added.

## ImmutableArray<T>.RemoveAll(Predicate<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> RemoveAll (Predicate<T> match);
```

Removes all the items from the array that meet the specified condition.

Parameters:

- `match`: The delegate that defines the conditions of the elements to remove.

Returns: A new array with items that meet the specified condition removed.

To be added.

## ImmutableArray<T>.RemoveAt(Int32) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> RemoveAt (int index);
```

Returns an array with the element at the specified position removed.

Parameters:

- `index`: The 0-based index of the element to remove from the returned array.

Returns: A new array with the item at the specified index removed.

To be added.
