---
title: "ImmutableList<T> class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableList`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableList<T> class (part 2 of 4)

## ImmutableList<T>.FindIndex(Int32, Int32, Predicate<T>) method

```csharp
public int FindIndex (int startIndex, int count, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the range of elements in the immutable list that starts at the specified index and contains the specified number of elements.

Parameters:

- `startIndex`: The zero-based starting index of the search.
- `count`: The number of elements in the section to search.
- `match`: The delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the first occurrence of an element that matches the conditions defined by match, if found; otherwise, ?1.

To be added.

## ImmutableList<T>.FindLast(Predicate<T>) method

```csharp
public T? FindLast (Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the last occurrence within the entire immutable list.

Parameters:

- `match`: The delegate that defines the conditions of the element to search for.

Returns: The last element that matches the conditions defined by the specified predicate, if found; otherwise, the default value for type `T`.

To be added.

## ImmutableList<T>.FindLastIndex(Predicate<T>) method

```csharp
public int FindLastIndex (Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the entire immutable list.

Parameters:

- `match`: The delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the last occurrence of an element that matches the conditions defined by `match`, if found; otherwise, ?1.

To be added.

## ImmutableList<T>.FindLastIndex(Int32, Predicate<T>) method

```csharp
public int FindLastIndex (int startIndex, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the immutable list that extends from the first element to the specified index.

Parameters:

- `startIndex`: The zero-based starting index of the backward search.
- `match`: The delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the last occurrence of an element that matches the conditions defined by `match`, if found; otherwise, ?1.

To be added.

## ImmutableList<T>.FindLastIndex(Int32, Int32, Predicate<T>) method

```csharp
public int FindLastIndex (int startIndex, int count, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the immutable list that contains the specified number of elements and ends at the specified index.

Parameters:

- `startIndex`: The zero-based starting index of the backward search.
- `count`: The number of elements in the section to search.
- `match`: The delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the last occurrence of an element that matches the conditions defined by `match`, if found; otherwise, ?1.

To be added.

## ImmutableList<T>.ForEach(Action<T>) method

```csharp
public void ForEach (Action<T> action);
```

Performs the specified action on each element of the immutable list.

Parameters:

- `action`: The delegate to perform on each element of the immutable list.

To be added.

## ImmutableList<T>.GetEnumerator() method

```csharp
public System.Collections.Immutable.ImmutableList<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the immutable list.

Returns: An enumerator  that can be used to iterate through the immutable list.

#### Remarks

> **Caution:**
>  When this enumerator is used as a value type (that is, when it isn't boxed), do not copy it by assigning it to a second variable or by passing it to another method. When this enumerator is disposed of, it returns a mutable reference type stack to a resource pool, and if the value type enumerator is copied (which can easily happen unintentionally if you pass the value around), there is a risk that a stack that has already been returned to the resource pool may still be in use by one of the enumerator copies, leading to data corruption or exceptions.

## ImmutableList<T>.GetRange(Int32, Int32) method

```csharp
public System.Collections.Immutable.ImmutableList<T> GetRange (int index, int count);
```

Creates a shallow copy of a range of elements in the source immutable list.

Parameters:

- `index`: The zero-based index at which the range starts.
- `count`: The number of elements in the range.

Returns: A shallow copy of a range of elements in the source immutable list.

To be added.

## ImmutableList<T>.IndexOf(T) method

```csharp
public int IndexOf (T value);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the entire immutable list.

Parameters:

- `value`: The object to locate in the immutable list. The value can be `null` for reference types.

Returns: The zero-based index of the first occurrence of `value` within the entire immutable list, if found; otherwise, ?1.

To be added.

## ImmutableList<T>.IndexOf(T, Int32, Int32, IEqualityComparer<T>) method

```csharp
public int IndexOf (T item, int index, int count, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the range of elements in the list that starts at the specified index and contains the specified number of elements.

Parameters:

- `item`: The object to locate in the list The value can be null for reference types.
- `index`: The zero-based starting index of the search. 0 (zero) is valid in an empty list.
- `count`: The number of elements in the section to search.
- `equalityComparer`: The equality comparer to use in the search.

Returns: The zero-based index of the first occurrence of item within the range of elements in the list that starts at index and contains count number of elements, if found; otherwise, -1.

To be added.

## ImmutableList<T>.Insert(Int32, T) method

```csharp
public System.Collections.Immutable.ImmutableList<T> Insert (int index, T item);
```

Inserts the specified object into the immutable list at the specified index.

Parameters:

- `index`: The zero-based index at which to insert the object.
- `item`: The object to insert.

Returns: The new immutable list after the object is inserted.

To be added.

## ImmutableList<T>.InsertRange(Int32, IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableList<T> InsertRange (int index, System.Collections.Generic.IEnumerable<T> items);
```

Inserts the elements of a collection into the immutable list at the specified index.

Parameters:

- `index`: The zero-based index at which to insert the elements.
- `items`: The collection whose elements should be inserted.

Returns: The new immutable list after the elements are inserted.

To be added.

## ImmutableList<T>.ItemRef(Int32) method

```csharp
public ref readonly T ItemRef (int index);
```

Gets a read-only reference to the element of the set at the given `index`.

Parameters:

- `index`: The 0-based index of the element in the set to return.

Returns: A read-only reference to the element at the given position.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is negative or not less than `ImmutableList<T>.Count`.

To be added.

## ImmutableList<T>.LastIndexOf(T, Int32, Int32, IEqualityComparer<T>) method

```csharp
public int LastIndexOf (T item, int index, int count, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Searches for the specified object and returns the zero-based index of the last occurrence within the range of elements in the list that contains the specified number of elements and ends at the specified index.

Parameters:

- `item`: The object to locate in the list. The value can be null for reference types.
- `index`: The zero-based starting index of the backward search.
- `count`: The number of elements in the section to search.
- `equalityComparer`: The equality comparer to use in the search.

Returns: The zero-based index of the last occurrence of item within the range of elements in the list that contains count number of elements and ends at index, if found; otherwise, -1.

To be added.

## ImmutableList<T>.Remove(T) method

```csharp
public System.Collections.Immutable.ImmutableList<T> Remove (T value);
```

Removes the first occurrence of the specified object from this immutable list.

Parameters:

- `value`: The object to remove.

Returns: A new list with the object removed, or this list if the specified object is not in this list.

To be added.

## ImmutableList<T>.Remove(T, IEqualityComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableList<T> Remove (T value, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Removes the first occurrence of the object that matches the specified value from this immutable list.

Parameters:

- `value`: The value of the element to remove from the list.
- `equalityComparer`: The equality comparer to use in the search.

Returns: A new list with the object removed, or this list if the specified object is not in this list.

To be added.

## ImmutableList<T>.RemoveAll(Predicate<T>) method

```csharp
public System.Collections.Immutable.ImmutableList<T> RemoveAll (Predicate<T> match);
```

Removes all the elements that match the conditions defined by the specified predicate.

Parameters:

- `match`: The delegate that defines the conditions of the elements to remove.

Returns: The new list with the elements removed.

To be added.

## ImmutableList<T>.RemoveAt(Int32) method

```csharp
public System.Collections.Immutable.ImmutableList<T> RemoveAt (int index);
```

Removes the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to remove.

Returns: A new list with the element removed.

To be added.

## ImmutableList<T>.RemoveRange(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableList<T> RemoveRange (System.Collections.Generic.IEnumerable<T> items);
```

Removes a range of elements from this immutable list.

Parameters:

- `items`: The collection whose elements should be removed if matches are found in this list.

Returns: A new list with the elements removed.

To be added.

## ImmutableList<T>.RemoveRange(IEnumerable<T>, IEqualityComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableList<T> RemoveRange (System.Collections.Generic.IEnumerable<T> items, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Removes the specified values from this list.

Parameters:

- `items`: The items to remove if matches are found in this list.
- `equalityComparer`: The equality comparer to use in the search.

Returns: A new list with the elements removed.

To be added.

## ImmutableList<T>.RemoveRange(Int32, Int32) method

```csharp
public System.Collections.Immutable.ImmutableList<T> RemoveRange (int index, int count);
```

Removes a range of elements, starting from the specified index and containing the specified number of elements, from this immutable list.

Parameters:

- `index`: The starting index to begin removal.
- `count`: The number of elements to remove.

Returns: A new list with the elements removed.

To be added.

## ImmutableList<T>.Replace(T, T) method

```csharp
public System.Collections.Immutable.ImmutableList<T> Replace (T oldValue, T newValue);
```

Replaces the specified element in the immutable list with a new element.

Parameters:

- `oldValue`: The element to replace.
- `newValue`: The element to replace `oldValue` with.

Returns: The new list with the replaced element, even if it is equal to the old element.

Exceptions:

- `ArgumentException`: `oldValue` does not exist in the immutable list.

To be added.

## ImmutableList<T>.Replace(T, T, IEqualityComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableList<T> Replace (T oldValue, T newValue, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Replaces the specified element in the immutable list with a new element.

Parameters:

- `oldValue`: The element to replace in the list.
- `newValue`: The element to replace `oldValue` with.
- `equalityComparer`: The comparer to use to check for equality.

Returns: A new list with the object replaced, or this list if the specified object is not in this list.

To be added.

## ImmutableList<T>.Reverse() method

```csharp
public System.Collections.Immutable.ImmutableList<T> Reverse ();
```

Reverses the order of the elements in the entire immutable list.

Returns: The reversed list.

To be added.

## ImmutableList<T>.Reverse(Int32, Int32) method

```csharp
public System.Collections.Immutable.ImmutableList<T> Reverse (int index, int count);
```

Reverses the order of the elements in the specified range of the immutable list.

Parameters:

- `index`: The zero-based starting index of the range to reverse.
- `count`: The number of elements in the range to reverse.

Returns: The reversed list.

To be added.

## ImmutableList<T>.SetItem(Int32, T) method

```csharp
public System.Collections.Immutable.ImmutableList<T> SetItem (int index, T value);
```

Replaces an element at a given position in the immutable list with the specified element.

Parameters:

- `index`: The position in the list of the element to replace.
- `value`: The element to replace the old element with.

Returns: The new list with the replaced element, even if it is equal to the old element at that position.

To be added.

## ImmutableList<T>.Sort() method

```csharp
public System.Collections.Immutable.ImmutableList<T> Sort ();
```

Sorts the elements in the entire immutable list using the default comparer.

Returns: The sorted list.

To be added.

## ImmutableList<T>.Sort(IComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableList<T> Sort (System.Collections.Generic.IComparer<T>? comparer);
```

Sorts the elements in the entire immutable list using the specified comparer.

Parameters:

- `comparer`: The implementation to use when comparing elements, or `null` to use the default comparer (`Comparer<T>.Default`).

Returns: The sorted list.

To be added.
