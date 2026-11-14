---
title: "ImmutableArray<T>+Builder class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableArray`1+Builder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableArray<T>+Builder class (part 2 of 2)

## ImmutableArray<T>+Builder.Remove(T, IEqualityComparer<T>) method

```csharp
public bool Remove (T element, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Removes the first occurrence of the specified element from the builder.
If no match is found, the builder remains unchanged.

Parameters:

- `element`: The element to remove.
- `equalityComparer`: The equality comparer to use in the search.
If `null`, `EqualityComparer<T>.Default` is used.

Returns: A value indicating whether the specified element was found and removed from the collection.

To be added.

## ImmutableArray<T>+Builder.RemoveAll(Predicate<T>) method

```csharp
public void RemoveAll (Predicate<T> match);
```

Removes all the elements that match the conditions defined by the specified predicate.

Parameters:

- `match`: The `Predicate<T>` delegate that defines the conditions of the elements to remove.

To be added.

## ImmutableArray<T>+Builder.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the item at the specified index from the array.

Parameters:

- `index`: The zero-based index of the item to remove.

To be added.

## ImmutableArray<T>+Builder.RemoveRange(IEnumerable<T>) method

```csharp
public void RemoveRange (System.Collections.Generic.IEnumerable<T> items);
```

Removes the specified values from this list.

Parameters:

- `items`: The items to remove if matches are found in this list.

To be added.

## ImmutableArray<T>+Builder.RemoveRange(IEnumerable<T>, IEqualityComparer<T>) method

```csharp
public void RemoveRange (System.Collections.Generic.IEnumerable<T> items, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Removes the specified values from this list.

Parameters:

- `items`: The items to remove if matches are found in this list.
- `equalityComparer`: The equality comparer to use in the search.
If `null`, `EqualityComparer<T>.Default` is used.

To be added.

## ImmutableArray<T>+Builder.RemoveRange(Int32, Int32) method

```csharp
public void RemoveRange (int index, int length);
```

Removes the specified values from this list.

Parameters:

- `index`: The 0-based index into the array for the element to omit from the returned array.
- `length`: The number of elements to remove.

To be added.

## ImmutableArray<T>+Builder.Replace(T, T) method

```csharp
public void Replace (T oldValue, T newValue);
```

Replaces the first equal element in the list with the specified element.

Parameters:

- `oldValue`: The element to replace.
- `newValue`: The element to replace the old element with.

To be added.

## ImmutableArray<T>+Builder.Replace(T, T, IEqualityComparer<T>) method

```csharp
public void Replace (T oldValue, T newValue, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Replaces the first equal element in the list with the specified element.

Parameters:

- `oldValue`: The element to replace.
- `newValue`: The element to replace the old element with.
- `equalityComparer`: The equality comparer to use in the search.
If `null`, `EqualityComparer<T>.Default` is used.

To be added.

## ImmutableArray<T>+Builder.Reverse() method

```csharp
public void Reverse ();
```

Reverses the order of elements in the collection.

To be added.

## ImmutableArray<T>+Builder.Sort() method

```csharp
public void Sort ();
```

Sorts the contents of the array.

To be added.

## ImmutableArray<T>+Builder.Sort(IComparer<T>) method

```csharp
public void Sort (System.Collections.Generic.IComparer<T>? comparer);
```

Sorts the contents of the array.

Parameters:

- `comparer`: The comparer to use for sorting. If comparer is `null`, the default comparer for the elements type in the array is used.

To be added.

## ImmutableArray<T>+Builder.Sort(Comparison<T>) method

```csharp
public void Sort (Comparison<T> comparison);
```

Sorts the elements in the entire array using the specified `Comparison<T>`.

Parameters:

- `comparison`: The `Comparison<T>` to use when comparing elements.

Exceptions:

- `ArgumentNullException`: `comparison` is null.

To be added.

## ImmutableArray<T>+Builder.Sort(Int32, Int32, IComparer<T>) method

```csharp
public void Sort (int index, int count, System.Collections.Generic.IComparer<T>? comparer);
```

Sorts the contents of the array.

Parameters:

- `index`: The starting index for the sort.
- `count`: The number of elements to include in the sort.
- `comparer`: The comparer to use for sorting. If comparer is `null`, the default comparer for the elements type in the array is used.

To be added.

## ImmutableArray<T>+Builder.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through the array.

Returns: An enumerator that iterates through the array.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IEnumerable<T>` interface.

## ImmutableArray<T>+Builder.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the array.

Returns: An enumerator that iterates through the array.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IEnumerable` interface.

## ImmutableArray<T>+Builder.ToArray() method

```csharp
public T[] ToArray ();
```

Creates a new array with the current contents of this `Builder`.

Returns: A new array with the contents of this `Builder`.

To be added.

## ImmutableArray<T>+Builder.ToImmutable() method

```csharp
public System.Collections.Immutable.ImmutableArray<T> ToImmutable ();
```

Returns an immutable array that contains the current contents of this `Builder`.

Returns: An immutable array that contains the current contents of this `Builder`.

To be added.
