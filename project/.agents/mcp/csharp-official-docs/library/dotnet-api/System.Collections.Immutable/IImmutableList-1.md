---
title: "IImmutableList<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/IImmutableList`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IImmutableList<T> interface

Namespace: `System.Collections.Immutable`

```csharp
public interface IImmutableList<T> : System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlyList<T>
```

Represents a list of elements that cannot be modified.

Parameters:

- `T`: The type of elements in the list.

#### Remarks

When you add or remove items from an `IImmutableList<T>`, a copy of the original list is created, with the changes applied. Incremental changes to a list share as much memory as possible with earlier versions of a list and enable garbage collection to clean up any unique list data that is no longer being referenced.

For information on creating an `IImmutableList<T>` implementation, see `ImmutableList<T>`.

## IImmutableList<T>.Add(T) method

```csharp
public System.Collections.Immutable.IImmutableList<T> Add (T value);
```

Makes a copy of the list, and adds the specified object to the end of the copied list.

Parameters:

- `value`: The object to add to the list.

Returns: A new list with the object added.

To be added.

## IImmutableList<T>.AddRange(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.IImmutableList<T> AddRange (System.Collections.Generic.IEnumerable<T> items);
```

Makes a copy of the list and adds the specified objects to the end of the copied list.

Parameters:

- `items`: The objects to add to the list.

Returns: A new list with the elements added.

To be added.

## IImmutableList<T>.Clear() method

```csharp
public System.Collections.Immutable.IImmutableList<T> Clear ();
```

Creates  a list with all the items removed, but with the same sorting and ordering semantics as this list.

Returns: An empty list that has the same sorting and ordering semantics as this instance.

To be added.

## IImmutableList<T>.IndexOf(T, Int32, Int32, IEqualityComparer<T>) method

```csharp
public int IndexOf (T item, int index, int count, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the range of elements in the `IImmutableList<T>` that starts at the specified index and contains the specified number of elements.

Parameters:

- `item`: The object to locate in the `IImmutableList<T>`. This value can be null for reference types.
- `index`: The zero-based starting indexes of the search. 0 (zero) is valid in an empty list.
- `count`: The number of elements in the section to search.
- `equalityComparer`: The equality comparer to use to locate `item`.

Returns: The zero-based index of the first occurrence of `item` within the range of elements in the `IImmutableList<T>` that starts at `index` and contains `count` number of elements if found; otherwise -1.

To be added.

## IImmutableList<T>.Insert(Int32, T) method

```csharp
public System.Collections.Immutable.IImmutableList<T> Insert (int index, T element);
```

Inserts the specified element at the specified index in the immutable list.

Parameters:

- `index`: The zero-based index at which to insert the value.
- `element`: The object to insert.

Returns: A new immutable list that includes the specified element.

To be added.

## IImmutableList<T>.InsertRange(Int32, IEnumerable<T>) method

```csharp
public System.Collections.Immutable.IImmutableList<T> InsertRange (int index, System.Collections.Generic.IEnumerable<T> items);
```

Inserts the specified elements at the specified index in the immutable list.

Parameters:

- `index`: The zero-based index at which the new elements should be inserted.
- `items`: The elements to insert.

Returns: A new immutable list that includes the specified elements.

To be added.

## IImmutableList<T>.LastIndexOf(T, Int32, Int32, IEqualityComparer<T>) method

```csharp
public int LastIndexOf (T item, int index, int count, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Searches for the specified object and returns the zero-based index of the last occurrence within the range of elements in the `IImmutableList<T>` that contains the specified number of elements and ends at the specified index.

Parameters:

- `item`: The object to locate in the list. The value can be `null` for reference types.
- `index`: The zero-based starting index of the search. 0 (zero) is valid in an empty list.
- `count`: The number of elements in the section to search.
- `equalityComparer`: The equality comparer to match `item`.

Returns: Returns `Int32`.

To be added.

## IImmutableList<T>.Remove(T, IEqualityComparer<T>) method

```csharp
public System.Collections.Immutable.IImmutableList<T> Remove (T value, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Removes the first occurrence of a specified object from this immutable list.

Parameters:

- `value`: The object to remove from the list.
- `equalityComparer`: The equality comparer to use to locate `value`.

Returns: A new list with the specified object removed.

To be added.

## IImmutableList<T>.RemoveAll(Predicate<T>) method

```csharp
public System.Collections.Immutable.IImmutableList<T> RemoveAll (Predicate<T> match);
```

Removes all the elements that match the conditions defined by the specified predicate.

Parameters:

- `match`: The delegate that defines the conditions of the elements to remove.

Returns: A new immutable list with the elements removed.

To be added.

## IImmutableList<T>.RemoveAt(Int32) method

```csharp
public System.Collections.Immutable.IImmutableList<T> RemoveAt (int index);
```

Removes the element at the specified index of the immutable list.

Parameters:

- `index`: The index of the element to remove.

Returns: A new list with the element removed.

To be added.

## IImmutableList<T>.RemoveRange(IEnumerable<T>, IEqualityComparer<T>) method

```csharp
public System.Collections.Immutable.IImmutableList<T> RemoveRange (System.Collections.Generic.IEnumerable<T> items, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Removes the specified object from the list.

Parameters:

- `items`: The objects to remove from the list.
- `equalityComparer`: The equality comparer to use to determine if `items` match any objects in the list.

Returns: A new immutable list with the specified objects removed, if `items` matched objects in the list.

To be added.

## IImmutableList<T>.RemoveRange(Int32, Int32) method

```csharp
public System.Collections.Immutable.IImmutableList<T> RemoveRange (int index, int count);
```

Removes a range of elements from the `IImmutableList<T>`.

Parameters:

- `index`: The zero-based starting index of the range of elements to remove.
- `count`: The number of elements to remove.

Returns: A new immutable list with the elements removed.

To be added.

## IImmutableList<T>.Replace(T, T, IEqualityComparer<T>) method

```csharp
public System.Collections.Immutable.IImmutableList<T> Replace (T oldValue, T newValue, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Returns a new list with the first matching element in the list replaced with the specified element.

Parameters:

- `oldValue`: The element to be replaced.
- `newValue`: The element to replace the first occurrence of `oldValue` with.
- `equalityComparer`: The equality comparer to use for matching `oldValue`.

Returns: A new list that contains `newValue`, even if `oldValue` is the same as `newValue`.

Exceptions:

- `ArgumentException`: `oldValue` does not exist in the list.

To be added.

## IImmutableList<T>.SetItem(Int32, T) method

```csharp
public System.Collections.Immutable.IImmutableList<T> SetItem (int index, T value);
```

Replaces an element in the list at a given position with the specified element.

Parameters:

- `index`: The position in the list of the element to replace.
- `value`: The element to replace the old element with.

Returns: A new list that contains the new element, even if the element at the specified location is the same as the new element.

To be added.
