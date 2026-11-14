---
title: "ImmutableArray<T> struct (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableArray`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableArray<T> struct (part 4 of 4)

## ImmutableArray<T>.System.Collections.Immutable.IImmutableList<T>.Insert(Int32, T) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.Insert (int index, T element);
```

Returns a new array with the specified value inserted at the specified position.

Parameters:

- `index`: The 0-based index into the array at which the new item should be added.
- `element`: The item to insert at the start of the array.

Returns: A new array with the specified value inserted.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableArray<T>.System.Collections.Immutable.IImmutableList<T>.InsertRange(Int32, IEnumerable<T>) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.InsertRange (int index, System.Collections.Generic.IEnumerable<T> items);
```

Inserts the specified values at the specified index.

Parameters:

- `index`: The index at which to insert the value.
- `items`: The elements to insert.

Returns: A new array with the specified values inserted.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableArray<T>.System.Collections.Immutable.IImmutableList<T>.Remove(T, IEqualityComparer<T>) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.Remove (T value, System.Collections.Generic.IEqualityComparer<T> equalityComparer);
```

Returns an array with the first occurrence of the specified element removed from the array; if no match is found, the current array is returned.

Parameters:

- `value`: The value to remove from the array.
- `equalityComparer`: The equality comparer to use in the search.

Returns: A new array with the value removed.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableArray<T>.System.Collections.Immutable.IImmutableList<T>.RemoveAll(Predicate<T>) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.RemoveAll (Predicate<T> match);
```

Removes all the items from the array that meet the specified condition.

Parameters:

- `match`: The delegate that defines the conditions of the elements to remove.

Returns: A new array with items that meet the specified condition removed.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableArray<T>.System.Collections.Immutable.IImmutableList<T>.RemoveAt(Int32) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.RemoveAt (int index);
```

Returns an array with the element at the specified position removed.

Parameters:

- `index`: The 0-based index of the element to remove from the returned array.

Returns: A new array with the specified item removed.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableArray<T>.System.Collections.Immutable.IImmutableList<T>.RemoveRange(IEnumerable<T>, IEqualityComparer<T>) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.RemoveRange (System.Collections.Generic.IEnumerable<T> items, System.Collections.Generic.IEqualityComparer<T> equalityComparer);
```

Removes the specified items from this array.

Parameters:

- `items`: The items to remove if matches are found in this list.
- `equalityComparer`: The equality comparer to use in the search.

Returns: A new array with the elements removed.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableArray<T>.System.Collections.Immutable.IImmutableList<T>.RemoveRange(Int32, Int32) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.RemoveRange (int index, int count);
```

Returns an array with the elements at the specified position removed.

Parameters:

- `index`: The 0-based index of the starting element to remove from the array.
- `count`: The number of elements to remove from the array.

Returns: The new array with the specified elements removed.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableArray<T>.System.Collections.Immutable.IImmutableList<T>.Replace(T, T, IEqualityComparer<T>) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.Replace (T oldValue, T newValue, System.Collections.Generic.IEqualityComparer<T> equalityComparer);
```

Finds the first element in the array equal to the specified value and replaces the value with the specified new value.

Parameters:

- `oldValue`: The value to find and replace in the array.
- `newValue`: The value to replace the `oldvalue` with.
- `equalityComparer`: The equality comparer to use to compare values.

Returns: A new array that contains `newValue` even if the new and old values are the same.

Exceptions:

- `ArgumentException`: `oldValue` is not found in the array.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableArray<T>.System.Collections.Immutable.IImmutableList<T>.SetItem(Int32, T) method

```csharp
System.Collections.Immutable.IImmutableList<T> IImmutableList<T>.SetItem (int index, T value);
```

Replaces the item at the specified index with the specified item.

Parameters:

- `index`: The index of the item to replace.
- `value`: The value to add to the list.

Returns: The new array that contains `value` at the specified index.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IImmutableList<T>` interface.

## ImmutableArray<T>.System.Collections.IStructuralComparable.CompareTo(Object, IComparer) method

```csharp
int IStructuralComparable.CompareTo (object other, System.Collections.IComparer comparer);
```

Determines whether the current collection element precedes, occurs in the same position as, or follows another element in the sort order.

Parameters:

- `other`: The element to compare with the current instance.
- `comparer`: The object used to compare members of the current array with the corresponding members of other array.

Returns: An integer that indicates whether the current element precedes, is in the same position or follows the other element.

Exceptions:

- `ArgumentException`: The arrays are not the same length.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IStructuralComparable` interface.

## ImmutableArray<T>.System.Collections.IStructuralEquatable.Equals(Object, IEqualityComparer) method

```csharp
bool IStructuralEquatable.Equals (object other, System.Collections.IEqualityComparer comparer);
```

Determines whether this array is structurally equal to the specified array.

Parameters:

- `other`: The array to compare with the current instance.
- `comparer`: An object that determines whether the current instance and other are structurally equal.

Returns: `true` if the two arrays are structurally equal; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IStructuralEquatable` interface.

## ImmutableArray<T>.System.Collections.IStructuralEquatable.GetHashCode(IEqualityComparer) method

```csharp
int IStructuralEquatable.GetHashCode (System.Collections.IEqualityComparer comparer);
```

Returns a hash code for the current instance.

Parameters:

- `comparer`: An object that computes the hash code of the current object.

Returns: The hash code for the current instance.

To be added.

## ImmutableArray<T>.ToBuilder() method

```csharp
public System.Collections.Immutable.ImmutableArray<T>.Builder ToBuilder ();
```

Creates a mutable array that has the same contents as this array and can be efficiently mutated across multiple operations using standard mutable interfaces.

Returns: The new builder with the same contents as this array.

#### Remarks
This is an O(n) operation and copies all the elements of the immutable array into the Builder. The mutable list that is returned is not thread-safe.

## ImmutableArray<T>.Empty field

```csharp
public static readonly System.Collections.Immutable.ImmutableArray<T> Empty;
```

Gets an empty immutable array.

To be added.
