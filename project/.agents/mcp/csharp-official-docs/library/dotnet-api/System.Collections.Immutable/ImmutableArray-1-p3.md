---
title: "ImmutableArray<T> struct (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableArray`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableArray<T> struct (part 3 of 4)

## ImmutableArray<T>.RemoveRange(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> RemoveRange (System.Collections.Generic.IEnumerable<T> items);
```

Removes the specified items from this array.

Parameters:

- `items`: The items to remove if matches are found in this list.

Returns: A new array with the elements removed.

To be added.

## ImmutableArray<T>.RemoveRange(ImmutableArray<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> RemoveRange (System.Collections.Immutable.ImmutableArray<T> items);
```

Removes the specified values from this list.

Parameters:

- `items`: The items to remove if matches are found in this list.

Returns: A new list with the elements removed.

To be added.

## ImmutableArray<T>.RemoveRange(IEnumerable<T>, IEqualityComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> RemoveRange (System.Collections.Generic.IEnumerable<T> items, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Removes the specified items from this array.

Parameters:

- `items`: The items to remove if matches are found in this list.
- `equalityComparer`: The equality comparer to use in the search.

Returns: A new array with the elements removed.

To be added.

## ImmutableArray<T>.RemoveRange(ImmutableArray<T>, IEqualityComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> RemoveRange (System.Collections.Immutable.ImmutableArray<T> items, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Removes the specified items from this list.

Parameters:

- `items`: The items to remove if matches are found in this list.
- `equalityComparer`: The equality comparer to use in the search.

Returns: A new array with the elements removed.

To be added.

## ImmutableArray<T>.RemoveRange(Int32, Int32) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> RemoveRange (int index, int length);
```

Returns an array with the elements at the specified position removed.

Parameters:

- `index`: The 0-based index of the starting element to remove from the array.
- `length`: The number of elements to remove from the array.

Returns: The new array with the specified elements removed.

To be added.

## ImmutableArray<T>.RemoveRange(ReadOnlySpan<T>, IEqualityComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> RemoveRange (ReadOnlySpan<T> items, System.Collections.Generic.IEqualityComparer<T>? equalityComparer = default);
```

Removes the specified values from this list.

Parameters:

- `items`: The items to remove if matches are found in this list.
- `equalityComparer`: The equality comparer to use in the search.

Returns: A new list with the elements removed.

To be added.

## ImmutableArray<T>.RemoveRange(T[], IEqualityComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> RemoveRange (T[] items, System.Collections.Generic.IEqualityComparer<T>? equalityComparer = default);
```

Removes the specified values from this list.

Parameters:

- `items`: The items to remove if matches are found in this list.
- `equalityComparer`: The equality comparer to use in the search.

Returns: A new list with the elements removed.

To be added.

## ImmutableArray<T>.Replace(T, T) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> Replace (T oldValue, T newValue);
```

Finds the first element in the array equal to the specified value and replaces the value with the specified new value.

Parameters:

- `oldValue`: The value to find and replace in the array.
- `newValue`: The value to replace the `oldvalue` with.

Returns: A new array that contains `newValue` even if the new and old values are the same.

Exceptions:

- `ArgumentException`: `oldValue` is not found in the array.

To be added.

## ImmutableArray<T>.Replace(T, T, IEqualityComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> Replace (T oldValue, T newValue, System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Finds the first element in the array equal to the specified value and replaces the value with the specified new value.

Parameters:

- `oldValue`: The value to find and replace in the array.
- `newValue`: The value to replace the `oldvalue` with.
- `equalityComparer`: The equality comparer to use to compare values.

Returns: A new array that contains `newValue` even if the new and old values are the same.

Exceptions:

- `ArgumentException`: `oldValue` is not found in the array.

To be added.

## ImmutableArray<T>.SetItem(Int32, T) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> SetItem (int index, T item);
```

Replaces the item at the specified index with the specified item.

Parameters:

- `index`: The index of the item to replace.
- `item`: The item to add to the list.

Returns: The new array that contains `item` at the specified index.

To be added.

## ImmutableArray<T>.Slice(Int32, Int32) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> Slice (int start, int length);
```

Forms a slice out of the current `ImmutableArray<T>` starting at a specified index for a specified length.

Parameters:

- `start`: The index at which to begin this slice.
- `length`: The desired length for the slice.

Returns: An `ImmutableArray<T>` that consists of `length` elements from the current `ImmutableArray<T>`, starting at `start`.

To be added.

## ImmutableArray<T>.Sort() method

```csharp
public System.Collections.Immutable.ImmutableArray<T> Sort ();
```

Sorts the elements in the immutable array using the default comparer.

Returns: A new immutable array that contains the items in this array, in sorted order.

To be added.

## ImmutableArray<T>.Sort(IComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> Sort (System.Collections.Generic.IComparer<T>? comparer);
```

Sorts the elements in the immutable array using the specified comparer.

Parameters:

- `comparer`: The implementation to use when comparing elements, or `null` to use the default comparer.

Returns: A new immutable array that contains the items in this array, in sorted order.

To be added.

## ImmutableArray<T>.Sort(Comparison<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> Sort (Comparison<T> comparison);
```

Sorts the elements in the entire `ImmutableArray<T>` using             the specified `Comparison<T>`.

Parameters:

- `comparison`: The `Comparison<T>` to use when comparing elements.

Returns: The sorted list.

Exceptions:

- `ArgumentNullException`: `comparison` is null.

To be added.

## ImmutableArray<T>.Sort(Int32, Int32, IComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> Sort (int index, int count, System.Collections.Generic.IComparer<T>? comparer);
```

Sorts the specified elements in the immutable array using the specified comparer.

Parameters:

- `index`: The index of the first element to sort.
- `count`: The number of elements to include in the sort.
- `comparer`: The implementation to use when comparing elements, or `null` to use the default comparer.

Returns: A new immutable array that contains the items in this array, in sorted order.

To be added.

## ImmutableArray<T>.System.Collections.Generic.ICollection<T>.Add(T) method

```csharp
void ICollection<T>.Add (T item);
```

Throws `NotSupportedException` in all cases.

Parameters:

- `item`: The item to add to the end of the array.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableArray<T>.System.Collections.Generic.ICollection<T>.Clear() method

```csharp
void ICollection<T>.Clear ();
```

Throws `NotSupportedException` in all cases.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableArray<T>.System.Collections.Generic.ICollection<T>.Remove(T) method

```csharp
bool ICollection<T>.Remove (T item);
```

Throws `NotSupportedException` in all cases.

Parameters:

- `item`: The object to remove from the array.

Returns: Throws `NotSupportedException` in all cases.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableArray<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through the array.

Returns: An enumerator that can be used to iterate through the array.

Exceptions:

- `InvalidOperationException`: The `ImmutableArray<T>.IsDefault` property returns `true`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IEnumerable<T>` interface.

## ImmutableArray<T>.System.Collections.Generic.IList<T>.Insert(Int32, T) method

```csharp
void IList<T>.Insert (int index, T item);
```

Throws `NotSupportedException` in all cases.

Parameters:

- `index`: The index of the location to insert the item.
- `item`: The item to insert.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IList<T>` interface.

## ImmutableArray<T>.System.Collections.Generic.IList<T>.RemoveAt(Int32) method

```csharp
void IList<T>.RemoveAt (int index);
```

Throws `NotSupportedException` in all cases.

Parameters:

- `index`: The index.

To be added.

## ImmutableArray<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies this array to another array starting at the specified index.

Parameters:

- `array`: The array to copy this array to.
- `index`: The index in the destination array to start the copy operation.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `ICollection` interface.

## ImmutableArray<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the immutable array.

Returns: An enumerator that iterates through the immutable array.

Exceptions:

- `InvalidOperationException`: The `ImmutableArray<T>.IsDefault` property returns `true`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IEnumerable` interface.

## ImmutableArray<T>.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Throws `NotSupportedException` in all cases.

Parameters:

- `value`: The value to add to the array.

Returns: Throws `NotSupportedException` in all cases.

Exceptions:

- `NotSupportedException`: Thrown in all cases.

To be added.

## ImmutableArray<T>.System.Collections.IList.Clear() method

```csharp
void IList.Clear ();
```

Throws `NotSupportedException` in all cases.

Exceptions:

- `NotSupportedException`: Thrown in all cases.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IList` interface.

## ImmutableArray<T>.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Throws `NotSupportedException` in all cases.

Parameters:

- `value`: The value to check for.

Returns: Throws `NotSupportedException` in all cases.

To be added.

## ImmutableArray<T>.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Gets the value at the specified index.

Parameters:

- `value`: The value to return the index of.

Returns: The value of the element at the specified index.

To be added.

## ImmutableArray<T>.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Throws `NotSupportedException` in all cases.

Parameters:

- `index`: Index that indicates where to insert the item.
- `value`: The value to insert.

Exceptions:

- `NotSupportedException`: Thrown in all cases.

To be added.

## ImmutableArray<T>.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Throws `NotSupportedException` in all cases.

Parameters:

- `value`: The value to remove from the array.

Exceptions:

- `NotSupportedException`: Thrown in all cases.

To be added.

## ImmutableArray<T>.System.Collections.IList.RemoveAt(Int32) method

```csharp
void IList.RemoveAt (int index);
```

Throws `NotSupportedException` in all cases.

Parameters:

- `index`: The index of the item to remove.

Exceptions:

- `NotSupportedException`: Thrown in all cases.

To be added.

## ImmutableArray<T>.System.Collections.Immutable.IImmutableList<T>.Add(T) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.Add (T value);
```

Returns a copy of the original array with the specified item added to the end.

Parameters:

- `value`: The value to add to the end of the array.

Returns: A new array with the specified item added to the end.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableArray<T>.System.Collections.Immutable.IImmutableList<T>.AddRange(IEnumerable<T>) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.AddRange (System.Collections.Generic.IEnumerable<T> items);
```

Returns a copy of the original array with the specified elements added to the end of the array.

Parameters:

- `items`: The elements to add to the end of the array.

Returns: A new array with the elements added to the end.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableArray<T>.System.Collections.Immutable.IImmutableList<T>.Clear() method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.Clear ();
```

Returns an array with all the elements removed.

Returns: An array with all the elements removed.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IImmutableList<T>` interface.
