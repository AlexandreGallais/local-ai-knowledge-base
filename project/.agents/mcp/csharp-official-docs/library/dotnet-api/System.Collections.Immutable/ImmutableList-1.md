---
title: "ImmutableList<T> class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableList`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableList<T> class

Namespace: `System.Collections.Immutable`

```csharp
public sealed class ImmutableList<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IList<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlyList<T>, System.Collections.IList, System.Collections.Immutable.IImmutableList<T>
```

Represents an immutable list, which is a strongly typed list of objects that can be accessed by index.

Parameters:

- `T`: The type of elements in the list.

#### Remarks

`ImmutableList<T>` has no public constructor; you begin by retrieving an empty `ImmutableList<T>` by using the `Empty`. You can then call methods, such as `ImmutableList<T>.Add` and `ImmutableList<T>.AddRange`, to populate the collection. Note that these methods return a new object. When you add or remove items from an immutable list, a copy of the original list is made with the items added or removed, and the original list is unchanged.

#### Examples
This example shows how to create an immutable list and iterate over elements in it:

_Code sample not included: ~/snippets/csharp/System.Collections.Immutable/ImmutableList`1/Overview/ImmutableListSnippets.cs._
This example shows how to create a new immutable list by adding and removing items from the original list:

_Code sample not included: ~/snippets/csharp/System.Collections.Immutable/ImmutableList`1/Overview/ImmutableListSnippets.cs._
## ImmutableList<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the list.

Returns: The number of elements in the list.

To be added.

## ImmutableList<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether this list is empty.

Returns: `true` if the list is empty; otherwise, `false`.

To be added.

## ImmutableList<T>.Item property

```csharp
public T this[int index] { get; }
```

Gets the element at the specified index of the list.

Parameters:

- `index`: The index of the element to retrieve.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: In a get operation, `index` is negative or not less than `ImmutableList<T>.Count`.

To be added.

## ImmutableList<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

To be added.

## ImmutableList<T>.System.Collections.Generic.IList<T>.Item property

```csharp
T System.Collections.Generic.IList<T>.Item[int index] { get; set; }
```

Gets or sets the value at the specified index.

Parameters:

- `index`: The zero-based index of the item to access.

Returns: Value stored in the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: In a get operation, `index` is negative or not less than `ImmutableList<T>.Count`.
- `NotSupportedException`: Always thrown from the setter.

To be added.

## ImmutableList<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

This type is immutable, so it is always thread-safe. See the `ICollection` interface.

Returns: Boolean value determining whether the collection is thread-safe.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `ICollection` interface.

## ImmutableList<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

See `ICollection`.

Returns: Object used for synchronizing access to the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `ICollection` interface.

## ImmutableList<T>.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the `IList` has a fixed size.

Returns: `true` if the `IList` has a fixed size; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IList` interface.

## ImmutableList<T>.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IList` interface.

## ImmutableList<T>.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the `Object` at the specified index.

Parameters:

- `index`: The index.

Returns: The value at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: In a get operation, `index` is negative or not less than `ImmutableList<T>.Count`.
- `NotSupportedException`: Always thrown from the setter.

To be added.

## ImmutableList<T>.Add(T) method

```csharp
public System.Collections.Immutable.ImmutableList<T> Add (T value);
```

Adds the specified object to the end of the immutable list.

Parameters:

- `value`: The object to add.

Returns: A new immutable list with the object added.

To be added.

## ImmutableList<T>.AddRange(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableList<T> AddRange (System.Collections.Generic.IEnumerable<T> items);
```

Adds the elements of the specified collection to the end of the immutable list.

Parameters:

- `items`: The collection whose elements will be added to the end of the list.

Returns: A new immutable list with the elements added.

To be added.

## ImmutableList<T>.BinarySearch(T) method

```csharp
public int BinarySearch (T item);
```

Searches the entire sorted list for an element using the default comparer and returns the zero-based index of the element.

Parameters:

- `item`: The object to locate. The value can be `null` for reference types.

Returns: The zero-based index of item in the sorted List, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than item or, if there is no larger element, the bitwise complement of `ICollection.Count`.

Exceptions:

- `InvalidOperationException`: The default comparer cannot find a comparer implementation of the for type T.

To be added.

## ImmutableList<T>.BinarySearch(T, IComparer<T>) method

```csharp
public int BinarySearch (T item, System.Collections.Generic.IComparer<T>? comparer);
```

Searches the entire sorted list for an element using the specified comparer and returns the zero-based index of the element.

Parameters:

- `item`: The object to locate. The value can be null for reference types.
- `comparer`: The comparer implementation to use when comparing elements or null to use the default comparer.

Returns: The zero-based index of item in the sorted List, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than item or, if there is no larger element, the bitwise complement of `ICollection.Count`.

Exceptions:

- `InvalidOperationException`: comparer is `null`, and the default comparer cannot find an comparer implementation for type T.

To be added.

## ImmutableList<T>.BinarySearch(Int32, Int32, T, IComparer<T>) method

```csharp
public int BinarySearch (int index, int count, T item, System.Collections.Generic.IComparer<T>? comparer);
```

Searches a range of elements in the sorted list for an element using the specified comparer and returns the zero-based index of the element.

Parameters:

- `index`: The zero-based starting index of the range to search.
- `count`: The length of the range to search.
- `item`: The object to locate. The value can be null for reference types.
- `comparer`: The comparer implementation to use when comparing elements, or `null` to use the default comparer.

Returns: The zero-based index of item in the sorted list, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than item or, if there is no larger element, the bitwise complement of `count`.

Exceptions:

- `ArgumentOutOfRangeException`: index is less than 0 or `count` is less than 0.
- `ArgumentException`: index and `count` do not denote a valid range in the list.
- `InvalidOperationException`: `comparer` is `null`, and the default comparer cannot find an comparer implementation for type T.

To be added.

## ImmutableList<T>.Clear() method

```csharp
public System.Collections.Immutable.ImmutableList<T> Clear ();
```

Removes all elements from the immutable list.

Returns: An empty list that retains the same sort or unordered semantics that this instance has.

To be added.

## ImmutableList<T>.Contains(T) method

```csharp
public bool Contains (T value);
```

Determines whether this immutable list contains the specified value.

Parameters:

- `value`: The value to locate.

Returns: `true` if the list contains the specified value; otherwise, `false`.

To be added.

## ImmutableList<T>.ConvertAll<TOutput>(Func<T,TOutput>) method

```csharp
public System.Collections.Immutable.ImmutableList<TOutput> ConvertAll<TOutput> (Func<T,TOutput> converter);
```

Converts the elements in the current immutable list to another type, and returns a list containing the converted elements.

Parameters:

- `TOutput`: The type of the elements of the target array.
- `converter`: A delegate that converts each element from one type to another type.

Returns: A list of the target type containing the converted elements from the current `ImmutableList<T>`.

To be added.

## ImmutableList<T>.CopyTo(T[]) method

```csharp
public void CopyTo (T[] array);
```

Copies the entire immutable list to a compatible one-dimensional array, starting at the beginning of the target array.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the immutable list. The array must have zero-based indexing.

To be added.

## ImmutableList<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int arrayIndex);
```

Copies the entire immutable list to a compatible one-dimensional array, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the immutable list. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

To be added.

## ImmutableList<T>.CopyTo(Int32, T[], Int32, Int32) method

```csharp
public void CopyTo (int index, T[] array, int arrayIndex, int count);
```

Copies a range of elements from the immutable list to a compatible one-dimensional array, starting at the specified index of the target array.

Parameters:

- `index`: The zero-based index in the source immutable list at which copying begins.
- `array`: The one-dimensional array that is the destination of the elements copied from the immutable list. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in array at which copying begins.
- `count`: The number of elements to copy.

To be added.

## ImmutableList<T>.Exists(Predicate<T>) method

```csharp
public bool Exists (Predicate<T> match);
```

Determines whether the immutable list contains elements that match the conditions defined by the specified predicate.

Parameters:

- `match`: The delegate that defines the conditions of the elements to search for.

Returns: `true` if the immutable list contains one or more elements that match the conditions defined by the specified predicate; otherwise, `false`.

To be added.

## ImmutableList<T>.Find(Predicate<T>) method

```csharp
public T? Find (Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the first occurrence within the entire immutable list.

Parameters:

- `match`: The delegate that defines the conditions of the element to search for.

Returns: The first element that matches the conditions defined by the specified predicate, if found; otherwise, the default value for type `T`.

To be added.

## ImmutableList<T>.FindAll(Predicate<T>) method

```csharp
public System.Collections.Immutable.ImmutableList<T> FindAll (Predicate<T> match);
```

Retrieves all the elements that match the conditions defined by the specified predicate.

Parameters:

- `match`: The delegate that defines the conditions of the elements to search for.

Returns: An immutable list that contains all the elements that match the conditions defined by the specified predicate, if found; otherwise, an empty immutable list.

To be added.

## ImmutableList<T>.FindIndex(Predicate<T>) method

```csharp
public int FindIndex (Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the entire immutable list.

Parameters:

- `match`: The delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the first occurrence of an element that matches the conditions defined by match, if found; otherwise, -1.

To be added.

## ImmutableList<T>.FindIndex(Int32, Predicate<T>) method

```csharp
public int FindIndex (int startIndex, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the range of elements in the immutable list that extends from the specified index to the last element.

Parameters:

- `startIndex`: The zero-based starting index of the search.
- `match`: The delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the first occurrence of an element that matches the conditions defined by match, if found; otherwise, ?1.

To be added.
