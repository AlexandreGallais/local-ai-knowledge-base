---
title: "ImmutableSortedSet<T> class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableSortedSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableSortedSet<T> class (part 2 of 3)

## ImmutableSortedSet<T>.System.Collections.Generic.ICollection<T>.CopyTo(T[], Int32) method

```csharp
void ICollection<T>.CopyTo (T[] array, int arrayIndex);
```

Copies the elements of the collection to an array, starting at a particular array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from collection. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Generic.ICollection<T>.Remove(T) method

```csharp
bool ICollection<T>.Remove (T item);
```

Removes the first occurrence of a specific object from the collection.

Parameters:

- `item`: The object to remove from the collection.

Returns: `true` if `item` was successfully removed from the collection; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IEnumerable<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Generic.IList<T>.Insert(Int32, T) method

```csharp
void IList<T>.Insert (int index, T item);
```

Inserts an item in the set at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert into the set.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IList<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Generic.IList<T>.RemoveAt(Int32) method

```csharp
void IList<T>.RemoveAt (int index);
```

Removes the item at the specified index.

Parameters:

- `index`: The zero-based index of the item to remove.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IList<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Generic.ISet<T>.Add(T) method

```csharp
bool ISet<T>.Add (T item);
```

Adds an element to the current set and returns a value to indicate if the element was successfully added.

Parameters:

- `item`: The element to add to the set.

Returns: `true` if the element is added to the set; `false` if the element is already in the set.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `ISet<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Generic.ISet<T>.ExceptWith(IEnumerable<T>) method

```csharp
void ISet<T>.ExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Removes all elements in the specified collection from the current set.

Parameters:

- `other`: The collection of items to remove from the set.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `ISet<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Generic.ISet<T>.IntersectWith(IEnumerable<T>) method

```csharp
void ISet<T>.IntersectWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are also in a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `ISet<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Generic.ISet<T>.SymmetricExceptWith(IEnumerable<T>) method

```csharp
void ISet<T>.SymmetricExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are present either in the current set or in the specified collection, but not both.

Parameters:

- `other`: The collection to compare to the current set.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `ISet<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Generic.ISet<T>.UnionWith(IEnumerable<T>) method

```csharp
void ISet<T>.UnionWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains all elements that are present in either the current set or the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `ISet<T>` interface.

## ImmutableSortedSet<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the set to an array, starting at a particular array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the set. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `ICollection` interface.

## ImmutableSortedSet<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator object that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IEnumerable` interface.

## ImmutableSortedSet<T>.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Adds an item to the set.

Parameters:

- `value`: The object to add to the set.

Returns: The position into which the new element was inserted, or -1 to indicate that the item was not inserted into the collection.

Exceptions:

- `NotSupportedException`: The set is read-only or has a fixed size.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IList` interface.

## ImmutableSortedSet<T>.System.Collections.IList.Clear() method

```csharp
void IList.Clear ();
```

Removes all items from the set.

Exceptions:

- `NotSupportedException`: Thrown in all cases.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IList` interface.

## ImmutableSortedSet<T>.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the set contains a specific value.

Parameters:

- `value`: The object to locate in the set.

Returns: `true` if the object is found in the set; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IList` interface.

## ImmutableSortedSet<T>.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specific item in the set.

Parameters:

- `value`: The object to locate in the set.

Returns: The index of `value` if found in the list; otherwise, -1.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IList` interface.

## ImmutableSortedSet<T>.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Inserts an item into the set at the specified index.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The object to insert into the set.

Exceptions:

- `NotSupportedException`: The set is read-only or has a fixed size.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IList` interface.

## ImmutableSortedSet<T>.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Removes the first occurrence of a specific object from the set.

Parameters:

- `value`: The object to remove from the set.

Exceptions:

- `NotSupportedException`: The set is read-only or has a fixed size.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IList` interface.

## ImmutableSortedSet<T>.System.Collections.IList.RemoveAt(Int32) method

```csharp
void IList.RemoveAt (int index);
```

Removes the item at the specified index of the set.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `NotSupportedException`: The set is read-only or has a fixed size.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IList` interface.

## ImmutableSortedSet<T>.System.Collections.Immutable.IImmutableSet<T>.Add(T) method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.Add (T value);
```

Adds the specified element to this immutable set.

Parameters:

- `value`: The element to add.

Returns: A new set with the element added, or this set if the element is already in the set.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IImmutableSet<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Immutable.IImmutableSet<T>.Clear() method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.Clear ();
```

Retrieves an empty immutable set that has the same sorting and ordering semantics as this instance.

Returns: An empty set that has the same sorting and ordering semantics as this instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IImmutableSet<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Immutable.IImmutableSet<T>.Except(IEnumerable<T>) method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.Except (System.Collections.Generic.IEnumerable<T> other);
```

Removes the elements in the specified collection from the current immutable set.

Parameters:

- `other`: The items to remove from this set.

Returns: The new set with the items removed; or the original set if none of the items were in the set.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IImmutableSet<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Immutable.IImmutableSet<T>.Intersect(IEnumerable<T>) method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.Intersect (System.Collections.Generic.IEnumerable<T> other);
```

Creates an immutable set that contains elements that exist in both this set and the specified set.

Parameters:

- `other`: The collection to compare to the current set.

Returns: A new immutable set that contains any elements that exist in both sets.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IImmutableSet<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Immutable.IImmutableSet<T>.Remove(T) method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.Remove (T value);
```

Removes the specified element from this immutable set.

Parameters:

- `value`: The element to remove.

Returns: A new set with the specified element removed, or the current set if the element cannot be found in the set.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IImmutableSet<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Immutable.IImmutableSet<T>.SymmetricExcept(IEnumerable<T>) method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.SymmetricExcept (System.Collections.Generic.IEnumerable<T> other);
```

Creates an immutable set that contains only elements that are present either in the current set or in the specified collection, but not both.

Parameters:

- `other`: The collection to compare to the current set.

Returns: A new set that contains the elements that are present only in the current set or in the specified collection, but not both.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IImmutableSet<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Immutable.IImmutableSet<T>.Union(IEnumerable<T>) method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.Union (System.Collections.Generic.IEnumerable<T> other);
```

Creates a new immutable set that contains all elements that are present in either the current set or in the specified collection.

Parameters:

- `other`: The collection to add elements from.

Returns: A new immutable set with the items added; or the original set if all the items were already in the set.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IImmutableSet<T>` interface.
