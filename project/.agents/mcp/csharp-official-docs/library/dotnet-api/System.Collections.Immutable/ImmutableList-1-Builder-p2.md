---
title: "ImmutableList<T>+Builder class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableList`1+Builder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableList<T>+Builder class (part 2 of 3)

## ImmutableList<T>+Builder.FindLastIndex(Predicate<T>) method

```csharp
public int FindLastIndex (Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the entire immutable list.

Parameters:

- `match`: The delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the last occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

To be added.

## ImmutableList<T>+Builder.FindLastIndex(Int32, Predicate<T>) method

```csharp
public int FindLastIndex (int startIndex, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the immutable list that extends from the first element to the specified index.

Parameters:

- `startIndex`: The zero-based starting index of the backward search.
- `match`: The delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the last occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

To be added.

## ImmutableList<T>+Builder.FindLastIndex(Int32, Int32, Predicate<T>) method

```csharp
public int FindLastIndex (int startIndex, int count, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the immutable list that contains the specified number of elements and ends at the specified index.

Parameters:

- `startIndex`: The zero-based starting index of the backward search.
- `count`: The number of elements in the section to search.
- `match`: The delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the last occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

To be added.

## ImmutableList<T>+Builder.ForEach(Action<T>) method

```csharp
public void ForEach (Action<T> action);
```

Performs the specified action on each element of the list.

Parameters:

- `action`: The delegate to perform on each element of the list.

To be added.

## ImmutableList<T>+Builder.GetEnumerator() method

```csharp
public System.Collections.Immutable.ImmutableList<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the list.

To be added.

## ImmutableList<T>+Builder.GetRange(Int32, Int32) method

```csharp
public System.Collections.Immutable.ImmutableList<T> GetRange (int index, int count);
```

Creates a shallow copy of a range of elements in the source immutable list.

Parameters:

- `index`: The zero-based index at which the range starts.
- `count`: The number of elements in the range.

Returns: A shallow copy of a range of elements in the source immutable list.

To be added.

## ImmutableList<T>+Builder.IndexOf(T) method

```csharp
public int IndexOf (T item);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the range of elements in the immutable list.

Parameters:

- `item`: The object to locate in the immutable list. The value can be `null` for reference types.

Returns: The zero-based index of the first occurrence of `item` within the range of elements in the immutable list, if found; otherwise, -1.

To be added.

## ImmutableList<T>+Builder.IndexOf(T, Int32) method

```csharp
public int IndexOf (T item, int index);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the range of elements in the immutable list that extends from the specified index to the last element.

Parameters:

- `item`: The object to locate in the immutable list. The value can be `null` for reference types.
- `index`: The zero-based starting index of the search. 0 (zero) is valid in an empty list.

Returns: The zero-based index of the first occurrence of item within the range of elements in the immutable list that extends from `index` to the last element, if found; otherwise, -1.

To be added.

## ImmutableList<T>+Builder.IndexOf(T, Int32, Int32) method

```csharp
public int IndexOf (T item, int index, int count);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the range of elements in the immutable list that starts at the specified index and contains the specified number of elements.

Parameters:

- `item`: The object to locate in the immutable list. The value can be `null` for reference types.
- `index`: The zero-based starting index of the search. 0 (zero) is valid in an empty list.
- `count`: The number of elements in the section to search.

Returns: The zero-based index of the first occurrence of item within the range of elements in the immutable list that starts at `index` and contains `count` number of elements, if found; otherwise, -1.

To be added.

## ImmutableList<T>+Builder.IndexOf(T, Int32, Int32, IEqualityComparer<T>) method

```csharp
public int IndexOf (T item, int index, int count, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the range of elements in the `Builder` that starts at the specified index and contains the specified number of elements.

Parameters:

- `item`: The object to locate in the immutable list. The value can be `null` for reference types.
- `index`: The zero-based starting index of the search. 0 (zero) is valid in an empty list.
- `count`: The number of elements to search.
- `equalityComparer`: The value comparer to use for comparing elements for equality.

Returns: The zero-based index of the first occurrence of item within the range of elements in the immutable list that starts at `index` and contains `count` number of elements, if found; otherwise, -1

To be added.

## ImmutableList<T>+Builder.Insert(Int32, T) method

```csharp
public void Insert (int index, T item);
```

Inserts an item to the immutable list at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert into the immutable list.

To be added.

## ImmutableList<T>+Builder.InsertRange(Int32, IEnumerable<T>) method

```csharp
public void InsertRange (int index, System.Collections.Generic.IEnumerable<T> items);
```

Inserts the elements of a collection into the immutable list at the specified index.

Parameters:

- `index`: The zero-based index at which the new elements should be inserted.
- `items`: The collection whose elements should be inserted into the immutable list. The collection itself cannot be `null`, but it can contain elements that are null, if type `T` is a reference type.

To be added.

## ImmutableList<T>+Builder.ItemRef(Int32) method

```csharp
public ref readonly T ItemRef (int index);
```

Gets a read-only reference to the value for a given `index` into the list.

Parameters:

- `index`: The index of the desired element.

Returns: A read-only reference to the value at the specified `index`.

To be added.

## ImmutableList<T>+Builder.LastIndexOf(T) method

```csharp
public int LastIndexOf (T item);
```

Searches for the specified object and returns the zero-based index of the last occurrence within the entire immutable list.

Parameters:

- `item`: The object to locate in the immutable list. The value can be `null` for reference types.

Returns: The zero-based index of the last occurrence of `item` within the entire immutable list, if found; otherwise, -1.

To be added.

## ImmutableList<T>+Builder.LastIndexOf(T, Int32) method

```csharp
public int LastIndexOf (T item, int startIndex);
```

Searches for the specified object and returns the zero-based index of the last occurrence within the range of elements in the immutable list that extends from the first element to the specified index.

Parameters:

- `item`: The object to locate in the immutable list. The value can be `null` for reference types.
- `startIndex`: The zero-based starting index of the backward search.

Returns: The zero-based index of the last occurrence of `item` within the range of elements in the immutable list that extends from the first element to `startIndex`, if found; otherwise, -1.

To be added.

## ImmutableList<T>+Builder.LastIndexOf(T, Int32, Int32) method

```csharp
public int LastIndexOf (T item, int startIndex, int count);
```

Searches for the specified object and returns the zero-based index of the last occurrence within the range of elements in the immutable list that contains the specified number of elements and ends at the specified index.

Parameters:

- `item`: The object to locate in the immutable list. The value can be `null` for reference types.
- `startIndex`: The zero-based starting index of the backward search.
- `count`: The number of elements in the section to search.

Returns: The zero-based index of the last occurrence of `item` within the range of elements in the immutable list that contains `count` number of elements and ends at `startIndex`, if found; otherwise, -1.

To be added.

## ImmutableList<T>+Builder.LastIndexOf(T, Int32, Int32, IEqualityComparer<T>) method

```csharp
public int LastIndexOf (T item, int startIndex, int count, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Searches for the specified object and returns the zero-based index of the last occurrence within the range of elements in the immutable list that contains the specified number of elements and ends at the specified index.

Parameters:

- `item`: The object to locate in the immutable list. The value can be `null` for reference types.
- `startIndex`: The zero-based starting index of the search. 0 (zero) is valid in an empty list.
- `count`: The number of elements to search.
- `equalityComparer`: The value comparer to use for comparing elements for equality.

Returns: The zero-based index of the first occurrence of item within the range of elements in the immutable list that starts at `startIndex` and contains `count` number of elements, if found; otherwise, -1

To be added.

## ImmutableList<T>+Builder.Remove(T) method

```csharp
public bool Remove (T item);
```

Removes the first occurrence of a specific object from the immutable list.

Parameters:

- `item`: The object to remove from the list.

Returns: `true` if item was successfully removed from the list; otherwise, `false`. This method also returns `false` if item is not found in the list.

To be added.

## ImmutableList<T>+Builder.Remove(T, IEqualityComparer<T>) method

```csharp
public bool Remove (T item, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Removes the first occurrence matching the specified value from this list.

Parameters:

- `item`: The item to remove.
- `equalityComparer`: The equality comparer to use in the search.
If `null`, `EqualityComparer<T>.Default` is used.

Returns: A value indicating whether the specified element was found and removed from the collection.

To be added.

## ImmutableList<T>+Builder.RemoveAll(Predicate<T>) method

```csharp
public int RemoveAll (Predicate<T> match);
```

Removes all the elements that match the conditions defined by the specified predicate.

Parameters:

- `match`: The delegate that defines the conditions of the elements to remove.

Returns: The number of elements removed from the immutable list.

To be added.

## ImmutableList<T>+Builder.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the item at the specified index of the immutable list.

Parameters:

- `index`: The zero-based index of the item to remove from the list.

To be added.

## ImmutableList<T>+Builder.RemoveRange(IEnumerable<T>) method

```csharp
public void RemoveRange (System.Collections.Generic.IEnumerable<T> items);
```

Removes any first occurrences of the specified values from this list.

Parameters:

- `items`: The items to remove if matches are found in this list.

To be added.

## ImmutableList<T>+Builder.RemoveRange(IEnumerable<T>, IEqualityComparer<T>) method

```csharp
public void RemoveRange (System.Collections.Generic.IEnumerable<T> items, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Removes any first occurrences of the specified values from this list.

Parameters:

- `items`: The items to remove if matches are found in this list.
- `equalityComparer`: The equality comparer to use in the search.
If `null`, `EqualityComparer<T>.Default` is used.

To be added.

## ImmutableList<T>+Builder.RemoveRange(Int32, Int32) method

```csharp
public void RemoveRange (int index, int count);
```

Removes the specified range of values from this list.

Parameters:

- `index`: The starting index to begin removal.
- `count`: The number of elements to remove.

To be added.

## ImmutableList<T>+Builder.Replace(T, T) method

```csharp
public void Replace (T oldValue, T newValue);
```

Replaces the first equal element in the list with the specified element.

Parameters:

- `oldValue`: The element to replace.
- `newValue`: The element to replace the old element with.

Exceptions:

- `ArgumentException`: The old value does not exist in the list.

To be added.

## ImmutableList<T>+Builder.Replace(T, T, IEqualityComparer<T>) method

```csharp
public void Replace (T oldValue, T newValue, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Replaces the first equal element in the list with the specified element.

Parameters:

- `oldValue`: The element to replace.
- `newValue`: The element to replace the old element with.
- `equalityComparer`: The equality comparer to use in the search.
If `null`, `EqualityComparer<T>.Default` is used.

Exceptions:

- `ArgumentException`: The old value does not exist in the list.

To be added.

## ImmutableList<T>+Builder.Reverse() method

```csharp
public void Reverse ();
```

Reverses the order of the elements in the entire immutable list.

To be added.

## ImmutableList<T>+Builder.Reverse(Int32, Int32) method

```csharp
public void Reverse (int index, int count);
```

Reverses the order of the elements in the specified range of the immutable list.

Parameters:

- `index`: The zero-based starting index of the range to reverse.
- `count`: The number of elements in the range to reverse.

To be added.

## ImmutableList<T>+Builder.Sort() method

```csharp
public void Sort ();
```

Sorts the elements in the entire immutable list by using the default comparer.

To be added.
