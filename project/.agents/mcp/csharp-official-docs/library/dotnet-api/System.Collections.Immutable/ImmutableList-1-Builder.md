---
title: "ImmutableList<T>+Builder class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableList`1+Builder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableList<T>+Builder class

Namespace: `System.Collections.Immutable`

```csharp
public sealed class ImmutableList<T>.Builder : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IList<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlyList<T>, System.Collections.IList
```

Represents a list that mutates with little or no memory allocations and that can produce or build on immutable list instances efficiently.

#### Remarks
Although `ImmutableList<T>.AddRange` and other methods already provide fast bulk change operations on the list, the `Builder` class allows multiple combinations of changes to be made to a list with equal efficiency.

## ImmutableList<T>+Builder.Count property

```csharp
public int Count { get; }
```

Gets the number of elements in this immutable list.

Returns: The number of elements in this list.

To be added.

## ImmutableList<T>+Builder.Item property

```csharp
public T this[int index] { get; set; }
```

Gets or sets the value for a given index in the list.

Parameters:

- `index`: The index of the item to get or set.

Returns: The value at the specified index.

To be added.

## ImmutableList<T>+Builder.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value that indicates whether this instance is read-only.

Returns: Always `false`.

To be added.

## ImmutableList<T>+Builder.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value that indicates whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `ICollection` interface.

## ImmutableList<T>+Builder.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `ICollection` interface.

## ImmutableList<T>+Builder.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value that indicates whether the `IList` has a fixed size.

Returns: `true` if the `IList` has a fixed size; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IList` interface.

## ImmutableList<T>+Builder.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value that indicates whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IList` interface.

## ImmutableList<T>+Builder.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the `Object` at the specified index.

Parameters:

- `index`: The index.

Returns: The object at the specified index.

To be added.

## ImmutableList<T>+Builder.Add(T) method

```csharp
public void Add (T item);
```

Adds an item to the immutable list.

Parameters:

- `item`: The item to add to the list.

To be added.

## ImmutableList<T>+Builder.AddRange(IEnumerable<T>) method

```csharp
public void AddRange (System.Collections.Generic.IEnumerable<T> items);
```

Adds a series of elements to the end of this list.

Parameters:

- `items`: The elements to add to the end of the list.

To be added.

## ImmutableList<T>+Builder.BinarySearch(T) method

```csharp
public int BinarySearch (T item);
```

Searches the entire `Builder` for an element using the default comparer and returns the zero-based index of the element.

Parameters:

- `item`: The object to locate. The value can be null for reference types.

Returns: The zero-based index of item in the `Builder`, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `item`.

Exceptions:

- `InvalidOperationException`: The default comparer `Comparer<T>.Default` cannot find an implementation of the `IComparable<T>` generic interface or the `IComparable` interface for type T.

#### Remarks
If the `Builder` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operation (~) to this negative integer to get the index of the first element that is larger than the search value. When inserting the value into the `Builder`, this index should be used as the insertion point to maintain the sort order.

## ImmutableList<T>+Builder.BinarySearch(T, IComparer<T>) method

```csharp
public int BinarySearch (T item, System.Collections.Generic.IComparer<T>? comparer);
```

Searches the entire `Builder` for an element using the specified comparer and returns the zero-based index of the element.

Parameters:

- `item`: The object to locate. This value can be null for reference types.
- `comparer`: The implementation to use when comparing elements, or `null` for the default comparer.

Returns: The zero-based index of item in the `Builder`, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `item`.

Exceptions:

- `InvalidOperationException`: `comparer` is `null`, and the default comparer `Comparer<T>.Default` cannot find an implementation of the `IComparable<T>` generic interface or the `IComparable` interface for type T.

#### Remarks
If the `Builder` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operation (~) to this negative integer to get the index of the first element that is larger than the search value. When inserting the value into the `Builder`, this index should be used as the insertion point to maintain the sort order.

## ImmutableList<T>+Builder.BinarySearch(Int32, Int32, T, IComparer<T>) method

```csharp
public int BinarySearch (int index, int count, T item, System.Collections.Generic.IComparer<T>? comparer);
```

Searches the specified range of the `Builder` for an element using the specified comparer and returns the zero-based index of the element.

Parameters:

- `index`: The zero-based starting index of the range to search.
- `count`: The length of the range to search.
- `item`: The object to locate. This value can be null for reference types.
- `comparer`: The implementation to use when comparing elements, or `null` for the default comparer.

Returns: The zero-based index of item in the `Builder`, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `item`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.
-or-

`count` is less than 0.
- `ArgumentException`: `index` and `count` do not denote a valid range in the `List<T>`.
- `InvalidOperationException`: `comparer` is `null`, and the default comparer `Comparer<T>.Default` cannot find an implementation of the `IComparable<T>` generic interface or the `IComparable` interface for type T.

#### Remarks
If the `Builder` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operation (~) to this negative integer to get the index of the first element that is larger than the search value. When inserting the value into the `Builder`, this index should be used as the insertion point to maintain the sort order.

## ImmutableList<T>+Builder.Clear() method

```csharp
public void Clear ();
```

Removes all items from the immutable list.

To be added.

## ImmutableList<T>+Builder.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether the immutable list contains a specific value.

Parameters:

- `item`: The object to locate in the list.

Returns: `true` if item is found in the list; otherwise, `false`.

To be added.

## ImmutableList<T>+Builder.ConvertAll<TOutput>(Func<T,TOutput>) method

```csharp
public System.Collections.Immutable.ImmutableList<TOutput> ConvertAll<TOutput> (Func<T,TOutput> converter);
```

Creates a new immutable list from the list represented by this builder by using the converter function.

Parameters:

- `TOutput`: The type of the output of the delegate converter function.
- `converter`: The converter function.

Returns: A new immutable list from the list represented by this builder.

To be added.

## ImmutableList<T>+Builder.CopyTo(T[]) method

```csharp
public void CopyTo (T[] array);
```

Copies the entire immutable list to a compatible one-dimensional array, starting at the beginning of the target array.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the immutable list. The array must have zero-based indexing.

To be added.

## ImmutableList<T>+Builder.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int arrayIndex);
```

Copies the entire immutable list to a compatible one-dimensional array, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the immutable list. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in array at which copying begins.

To be added.

## ImmutableList<T>+Builder.CopyTo(Int32, T[], Int32, Int32) method

```csharp
public void CopyTo (int index, T[] array, int arrayIndex, int count);
```

Copies the entire immutable list to a compatible one-dimensional array, starting at the specified index of the target array.

Parameters:

- `index`: The zero-based index in the source immutable list at which copying begins.
- `array`: The one-dimensional array that is the destination of the elements copied from the immutable list. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.
- `count`: The number of elements to copy.

To be added.

## ImmutableList<T>+Builder.Exists(Predicate<T>) method

```csharp
public bool Exists (Predicate<T> match);
```

Determines whether the immutable list contains elements that match the conditions defined by the specified predicate.

Parameters:

- `match`: The delegate that defines the conditions of the elements to search for.

Returns: `true` if the immutable list contains one or more elements that match the conditions defined by the specified predicate; otherwise, `false`.

To be added.

## ImmutableList<T>+Builder.Find(Predicate<T>) method

```csharp
public T? Find (Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the first occurrence within the entire immutable list.

Parameters:

- `match`: The delegate that defines the conditions of the element to search for.

Returns: The first element that matches the conditions defined by the specified predicate, if found; otherwise, the default value for type `T`.

To be added.

## ImmutableList<T>+Builder.FindAll(Predicate<T>) method

```csharp
public System.Collections.Immutable.ImmutableList<T> FindAll (Predicate<T> match);
```

Retrieves all the elements that match the conditions defined by the specified predicate.

Parameters:

- `match`: The delegate that defines the conditions of the elements to search for.

Returns: An immutable list containing all the elements that match the conditions defined by the specified predicate, if found; otherwise, an empty immutable list.

To be added.

## ImmutableList<T>+Builder.FindIndex(Predicate<T>) method

```csharp
public int FindIndex (Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the entire immutable list.

Parameters:

- `match`: The delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the first occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

To be added.

## ImmutableList<T>+Builder.FindIndex(Int32, Predicate<T>) method

```csharp
public int FindIndex (int startIndex, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the range of elements in the immutable list that extends from the specified index to the last element.

Parameters:

- `startIndex`: The zero-based starting index of the search.
- `match`: The delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the first occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

To be added.

## ImmutableList<T>+Builder.FindIndex(Int32, Int32, Predicate<T>) method

```csharp
public int FindIndex (int startIndex, int count, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the range of elements in the immutable list that starts at the specified index and contains the specified number of elements.

Parameters:

- `startIndex`: The zero-based starting index of the search.
- `count`: The number of elements in the section to search.
- `match`: The delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the first occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

To be added.

## ImmutableList<T>+Builder.FindLast(Predicate<T>) method

```csharp
public T? FindLast (Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the last occurrence within the entire immutable list.

Parameters:

- `match`: The delegate that defines the conditions of the element to search for.

Returns: The last element that matches the conditions defined by the specified predicate, found; otherwise, the default value for type `T`.

To be added.
