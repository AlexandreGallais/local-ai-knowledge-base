---
title: "ImmutableList class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableList class

Namespace: `System.Collections.Immutable`

```csharp
public static class ImmutableList
```

Provides a set of initialization methods for instances of the `ImmutableList<T>` class.

To be added.

## ImmutableList.Create<T>() method

```csharp
public static System.Collections.Immutable.ImmutableList<T> Create<T> ();
```

Creates an empty immutable list.

Parameters:

- `T`: The type of items to be stored in the .

Returns: An empty immutable list.

To be added.

## ImmutableList.Create<T>(ReadOnlySpan<T>) method

```csharp
public static System.Collections.Immutable.ImmutableList<T> Create<T> (scoped ReadOnlySpan<T> items);
```

Creates a new immutable list that contains the items from the specified span of items.

Parameters:

- `T`: The type of items stored by the collection.
- `items`: A span that contains the items to prepopulate the list with.

Returns: A new immutable list that contains the specified items.

To be added.

## ImmutableList.Create<T>(T) method

```csharp
public static System.Collections.Immutable.ImmutableList<T> Create<T> (T item);
```

Creates a new immutable list that contains the specified item.

Parameters:

- `T`: The type of items in the .
- `item`: The item to prepopulate the list with.

Returns: A new  that contains the specified item.

To be added.

## ImmutableList.Create<T>(T[]) method

```csharp
public static System.Collections.Immutable.ImmutableList<T> Create<T> (params T[] items);
```

Creates a new immutable list that contains the specified array of items.

Parameters:

- `T`: The type of items in the .
- `items`: An array that contains the items to prepopulate the list with.

Returns: A new immutable list that contains the specified items.

To be added.

## ImmutableList.CreateBuilder<T>() method

```csharp
public static System.Collections.Immutable.ImmutableList<T>.Builder CreateBuilder<T> ();
```

Creates a new immutable list builder.

Parameters:

- `T`: The type of items stored by the collection.

Returns: The immutable collection builder.

To be added.

## ImmutableList.CreateRange<T>(IEnumerable<T>) method

```csharp
public static System.Collections.Immutable.ImmutableList<T> CreateRange<T> (System.Collections.Generic.IEnumerable<T> items);
```

Creates a new immutable list that contains the specified items.

Parameters:

- `T`: The type of items in the .
- `items`: The items to add to the list.

Returns: An immutable list that contains the specified items.

To be added.

## ImmutableList.IndexOf<T>(IImmutableList<T>, T) method

```csharp
public static int IndexOf<T> (this System.Collections.Immutable.IImmutableList<T> list, T item);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the list.

Parameters:

- `T`: The type of items in the list.
- `list`: The list to search.
- `item`: The object to locate in the list. The value can be null for reference types.

Returns: The zero-based index of the first occurrence of item within the range of elements in the list that extends from index to the last element, if found; otherwise, -1.

To be added.

## ImmutableList.IndexOf<T>(IImmutableList<T>, T, IEqualityComparer<T>) method

```csharp
public static int IndexOf<T> (this System.Collections.Immutable.IImmutableList<T> list, T item, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the list.

Parameters:

- `T`: The type of items in the list.
- `list`: The list to search.
- `item`: The object to locate in the Immutable list. The value can be null for reference types.
- `equalityComparer`: The equality comparer to use in the search.

Returns: The zero-based index of the first occurrence of item within the range of elements in the immutable list that extends from index to the last element, if found; otherwise, -1.

To be added.

## ImmutableList.IndexOf<T>(IImmutableList<T>, T, Int32) method

```csharp
public static int IndexOf<T> (this System.Collections.Immutable.IImmutableList<T> list, T item, int startIndex);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the range of elements in the immutable list that extends from the specified index to the last element.

Parameters:

- `T`: The type of items in the list.
- `list`: The list to search.
- `item`: The object to locate in the Immutable list. The value can be null for reference types.
- `startIndex`: The zero-based starting index of the search. 0 (zero) is valid in an empty list.

Returns: The zero-based index of the first occurrence of item within the range of elements in the Immutable list that extends from index to the last element, if found; otherwise, -1.

To be added.

## ImmutableList.IndexOf<T>(IImmutableList<T>, T, Int32, Int32) method

```csharp
public static int IndexOf<T> (this System.Collections.Immutable.IImmutableList<T> list, T item, int startIndex, int count);
```

Searches for the specified object and returns the zero-based index of the first occurrence within the range of elements in the immutable list that extends from the specified index to the last element.

Parameters:

- `T`: The type of items in the list.
- `list`: The list to search.
- `item`: The object to locate in the Immutable list. The value can be null for reference types.
- `startIndex`: The zero-based starting index of the search. 0 (zero) is valid in an empty list.
- `count`: The number of elements in the section to search.

Returns: The zero-based index of the first occurrence of item within the range of elements in the Immutable list that extends from index to the last element, if found; otherwise, -1.

To be added.

## ImmutableList.LastIndexOf<T>(IImmutableList<T>, T) method

```csharp
public static int LastIndexOf<T> (this System.Collections.Immutable.IImmutableList<T> list, T item);
```

Searches for the specified object and returns the zero-based index of the last occurrence within the entire immutable list.

Parameters:

- `T`: The type of items in the list.
- `list`: The list to search.
- `item`: The object to locate in the Immutable list. The value can be null for reference types.

Returns: The zero-based index of the last occurrence of item within the entire the Immutable list, if found; otherwise, -1.

To be added.

## ImmutableList.LastIndexOf<T>(IImmutableList<T>, T, IEqualityComparer<T>) method

```csharp
public static int LastIndexOf<T> (this System.Collections.Immutable.IImmutableList<T> list, T item, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Searches for the specified object and returns the zero-based index of the last occurrence within the entire immutable list.

Parameters:

- `T`: The type of items in the list.
- `list`: The list to search.
- `item`: The object to locate in the Immutable list. The value can be null for reference types.
- `equalityComparer`: The equality comparer to use in the search.

Returns: The zero-based index of the last occurrence of item within the entire the Immutable list, if found; otherwise, -1.

To be added.

## ImmutableList.LastIndexOf<T>(IImmutableList<T>, T, Int32) method

```csharp
public static int LastIndexOf<T> (this System.Collections.Immutable.IImmutableList<T> list, T item, int startIndex);
```

Searches for the specified object and returns the zero-based index of the last occurrence within the range of elements in the immutable list that extends from the first element to the specified index.

Parameters:

- `T`: The type of items in the list.
- `list`: The list to search.
- `item`: The object to locate in the Immutable list. The value can be null for reference types.
- `startIndex`: The zero-based starting index of the backward search.

Returns: The zero-based index of the last occurrence of item within the range of elements in the Immutable list that extends from the first element to index, if found; otherwise, -1.

To be added.

## ImmutableList.LastIndexOf<T>(IImmutableList<T>, T, Int32, Int32) method

```csharp
public static int LastIndexOf<T> (this System.Collections.Immutable.IImmutableList<T> list, T item, int startIndex, int count);
```

Searches for the specified object and returns the zero-based index of the last occurrence within the range of elements in the immutable list that extends from the first element to the specified index.

Parameters:

- `T`: The type of items in the list.
- `list`: The list to search.
- `item`: The object to locate in the Immutable list. The value can be null for reference types.
- `startIndex`: The zero-based starting index of the backward search.
- `count`: The number of elements in the section to search.

Returns: The zero-based index of the last occurrence of item within the range of elements in the Immutable list that extends from the first element to index, if found; otherwise, -1.

To be added.

## ImmutableList.Remove<T>(IImmutableList<T>, T) method

```csharp
public static System.Collections.Immutable.IImmutableList<T> Remove<T> (this System.Collections.Immutable.IImmutableList<T> list, T value);
```

Removes the specified value from this list.

Parameters:

- `T`: The type of items in the list.
- `list`: The list to search.
- `value`: The value to remove.

Returns: A new immutable list with the element removed, or this list if the element is not in this list.

To be added.

## ImmutableList.RemoveRange<T>(IImmutableList<T>, IEnumerable<T>) method

```csharp
public static System.Collections.Immutable.IImmutableList<T> RemoveRange<T> (this System.Collections.Immutable.IImmutableList<T> list, System.Collections.Generic.IEnumerable<T> items);
```

Removes the specified values from this list.

Parameters:

- `T`: The type of items in the list.
- `list`: The list to search.
- `items`: The items to remove if matches are found in this list.

Returns: A new immutable list with the elements removed.

To be added.

## ImmutableList.Replace<T>(IImmutableList<T>, T, T) method

```csharp
public static System.Collections.Immutable.IImmutableList<T> Replace<T> (this System.Collections.Immutable.IImmutableList<T> list, T oldValue, T newValue);
```

Replaces the first equal element in the list with the specified element.

Parameters:

- `T`: The type of items in the list.
- `list`: The list to search.
- `oldValue`: The element to replace.
- `newValue`: The element to replace the old element with.

Returns: The new list -- even if the value being replaced is equal to the new value for that position.

Exceptions:

- `ArgumentException`: `oldValue` does not exist in the list.

To be added.

## ImmutableList.ToImmutableList<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Immutable.ImmutableList<TSource> ToImmutableList<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Enumerates a sequence and produces an immutable list of its contents.

Parameters:

- `TSource`: The type of the elements in the sequence.
- `source`: The sequence to enumerate.

Returns: An immutable list that contains the items in the specified sequence.

To be added.

## ImmutableList.ToImmutableList<TSource>(ImmutableList<TSource>+Builder) method

```csharp
public static System.Collections.Immutable.ImmutableList<TSource> ToImmutableList<TSource> (this System.Collections.Immutable.ImmutableList<TSource>.Builder builder);
```

Creates an immutable list from the current contents of the builder's collection.

Parameters:

- `TSource`: The type of the elements in the list.
- `builder`: The builder to create the immutable list from.

Returns: An immutable list that contains the current contents in the builder's collection.

To be added.
