---
title: "ImmutableList<T> class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableList`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableList<T> class (part 3 of 4)

## ImmutableList<T>.Sort(Comparison<T>) method

```csharp
public System.Collections.Immutable.ImmutableList<T> Sort (Comparison<T> comparison);
```

Sorts the elements in the entire immutable list using the specified comparer.

Parameters:

- `comparison`: The delegate to use when comparing elements.

Returns: The sorted list.

Exceptions:

- `ArgumentNullException`: `comparison` is `null`.

To be added.

## ImmutableList<T>.Sort(Int32, Int32, IComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableList<T> Sort (int index, int count, System.Collections.Generic.IComparer<T>? comparer);
```

Sorts a range of elements in the immutable list using the specified comparer.

Parameters:

- `index`: The zero-based starting index of the range to sort.
- `count`: The length of the range to sort.
- `comparer`: The implementation to use when comparing elements, or `null` to use the default comparer (`Comparer<T>.Default`).

Returns: The sorted list.

To be added.

## ImmutableList<T>.System.Collections.Generic.ICollection<T>.Add(T) method

```csharp
void ICollection<T>.Add (T item);
```

Adds the specified item to the immutable list.

Parameters:

- `item`: The item to add.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableList<T>.System.Collections.Generic.ICollection<T>.Clear() method

```csharp
void ICollection<T>.Clear ();
```

Removes all items from the immutable list.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableList<T>.System.Collections.Generic.ICollection<T>.Remove(T) method

```csharp
bool ICollection<T>.Remove (T item);
```

Removes the first occurrence of a specific object from the immutable list.

Parameters:

- `item`: The object to remove.

Returns: `true` if `item` was successfully removed from the list; otherwise, `false`. This method also returns `false` if `item` is not found in the original list.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableList<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through the immutable list.

Returns: An enumerator that can be used to iterate through the list.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IEnumerable<T>` interface.

## ImmutableList<T>.System.Collections.Generic.IList<T>.Insert(Int32, T) method

```csharp
void IList<T>.Insert (int index, T item);
```

Inserts an object in the immutable list at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IList<T>` interface.

## ImmutableList<T>.System.Collections.Generic.IList<T>.RemoveAt(Int32) method

```csharp
void IList<T>.RemoveAt (int index);
```

Removes the value at the specified index.

Parameters:

- `index`: The zero-based index of the item to remove.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IList<T>` interface.

## ImmutableList<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int arrayIndex);
```

Copies the entire immutable list to a compatible one-dimensional array, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from immutable list.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `ICollection` interface.

## ImmutableList<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the immutable list.

Returns: An enumerator that can be used to iterate through the list.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IEnumerable` interface.

## ImmutableList<T>.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Adds an item to the immutable list.

Parameters:

- `value`: The object to add to the list.

Returns: The position into which the new element was inserted, or -1 to indicate that the item was not inserted into the list.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IList` interface.

## ImmutableList<T>.System.Collections.IList.Clear() method

```csharp
void IList.Clear ();
```

Removes all items from the immutable list.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IList` interface.

## ImmutableList<T>.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the immutable list contains a specific value.

Parameters:

- `value`: The object to locate in the list.

Returns: `true` if the object is found in the list; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IList` interface.

## ImmutableList<T>.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specific item in the immutable list.

Parameters:

- `value`: The object to locate in the list.

Returns: The index of `value` if found in the list; otherwise, -1.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IList` interface.

## ImmutableList<T>.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Inserts an item into the immutable list at the specified index.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The object to insert into the list.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IList` interface.

## ImmutableList<T>.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Removes the first occurrence of a specific object from the immutable list.

Parameters:

- `value`: The object to remove from the list.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IList` interface.

## ImmutableList<T>.System.Collections.IList.RemoveAt(Int32) method

```csharp
void IList.RemoveAt (int index);
```

Removes the item at the specified index of the immutable list.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IList` interface.

## ImmutableList<T>.System.Collections.Immutable.IImmutableList<T>.Add(T) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.Add (T value);
```

Adds the specified value to this immutable list.

Parameters:

- `value`: The value to add.

Returns: A new list with the element added.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableList<T>.System.Collections.Immutable.IImmutableList<T>.AddRange(IEnumerable<T>) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.AddRange (System.Collections.Generic.IEnumerable<T> items);
```

Adds the specified values to this immutable list.

Parameters:

- `items`: The values to add.

Returns: A new list with the elements added.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableList<T>.System.Collections.Immutable.IImmutableList<T>.Clear() method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.Clear ();
```

Retrieves an empty list that has the same sorting and ordering semantics as this instance.

Returns: An empty list that has the same sorting and ordering semantics as this instance.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableList<T>.System.Collections.Immutable.IImmutableList<T>.Insert(Int32, T) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.Insert (int index, T item);
```

Inserts the specified element at the specified index in the immutable list.

Parameters:

- `index`: The index at which to insert the value.
- `item`: The element to insert.

Returns: A new immutable list that includes the specified element.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableList<T>.System.Collections.Immutable.IImmutableList<T>.InsertRange(Int32, IEnumerable<T>) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.InsertRange (int index, System.Collections.Generic.IEnumerable<T> items);
```

Inserts the specified elements at the specified index in the immutable list.

Parameters:

- `index`: The index at which to insert the elements.
- `items`: The elements to insert.

Returns: A new immutable list that includes the specified elements.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableList<T>.System.Collections.Immutable.IImmutableList<T>.Remove(T, IEqualityComparer<T>) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.Remove (T value, System.Collections.Generic.IEqualityComparer<T> equalityComparer);
```

Removes the element with the specified value from the list.

Parameters:

- `value`: The value of the element to remove from the list.
- `equalityComparer`: The comparer to use to compare elements for equality.

Returns: A new `ImmutableList<T>` with the specified element removed.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableList<T>.System.Collections.Immutable.IImmutableList<T>.RemoveAll(Predicate<T>) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.RemoveAll (Predicate<T> match);
```

Removes all the elements that match the conditions defined by the specified predicate.

Parameters:

- `match`: The delegate that defines the conditions of the elements to remove.

Returns: A new immutable list with the elements removed.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableList<T>.System.Collections.Immutable.IImmutableList<T>.RemoveAt(Int32) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.RemoveAt (int index);
```

Removes the element at the specified index of the immutable list.

Parameters:

- `index`: The index of the element to remove.

Returns: A new list with the element removed.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableList<T>.System.Collections.Immutable.IImmutableList<T>.RemoveRange(IEnumerable<T>, IEqualityComparer<T>) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.RemoveRange (System.Collections.Generic.IEnumerable<T> items, System.Collections.Generic.IEqualityComparer<T> equalityComparer);
```

Removes a range of elements from this immutable list that match the items specified.

Parameters:

- `items`: The range of items to remove from the list, if found.
- `equalityComparer`: The equality comparer to use to compare elements.

Returns: An immutable list with the items removed.

Exceptions:

- `ArgumentNullException`: `items` or `equalityComparer` is `null`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableList<T>.System.Collections.Immutable.IImmutableList<T>.RemoveRange(Int32, Int32) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.RemoveRange (int index, int count);
```

Removes the specified number of elements at the specified location from this list.

Parameters:

- `index`: The starting index of the range of elements to remove.
- `count`: The number of elements to remove.

Returns: A new list with the elements removed.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableList<T>` instance is cast to an `IImmutableList<T>` interface.
