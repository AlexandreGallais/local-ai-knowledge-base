---
title: "StringCollection class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/StringCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringCollection class (part 2 of 3)

## StringCollection.GetEnumerator() method

```csharp
public System.Collections.Specialized.StringEnumerator GetEnumerator ();
```

Returns a `StringEnumerator` that iterates through the `StringCollection`.

Returns: A `StringEnumerator` for the `StringCollection`.

#### Remarks

The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `StringEnumerator.Reset` also brings the enumerator back to this position.  At this position, `StringEnumerator.Current` is undefined. Therefore, you must call `StringEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `StringEnumerator.Current`.

`StringEnumerator.Current` returns the same object until either `StringEnumerator.MoveNext` or `StringEnumerator.Reset` is called. `StringEnumerator.MoveNext` sets `StringEnumerator.Current` to the next element.

If `StringEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `StringEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `StringEnumerator.MoveNext` also return `false`. If the last call to `StringEnumerator.MoveNext` returned `false`, `StringEnumerator.Current` is undefined. To set `StringEnumerator.Current` to the first element of the collection again, you can call `StringEnumerator.Reset` followed by `StringEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an O(1) operation.

## StringCollection.IndexOf(String) method

```csharp
public int IndexOf (string? value);
```

Searches for the specified string and returns the zero-based index of the first occurrence within the `StringCollection`.

Parameters:

- `value`: The string to locate. The value can be `null`.

Returns: The zero-based index of the first occurrence of `value` in the `StringCollection`, if found; otherwise, -1.

#### Remarks
This method determines equality by calling `Object.Equals`. String comparisons are case-sensitive.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `StringCollection.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether `item` exists.

#### Examples
The following code example searches the `StringCollection` for an element.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringCollection/Contains/stringcollectioncontains.cs._

## StringCollection.Insert(Int32, String) method

```csharp
public void Insert (int index, string? value);
```

Inserts a string into the `StringCollection` at the specified index.

Parameters:

- `index`: The zero-based index at which `value` is inserted.
- `value`: The string to insert. The value can be `null`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` greater than `StringCollection.Count`.

#### Remarks
Duplicate strings are allowed in `StringCollection`.

If `index` is equal to `StringCollection.Count`, `value` is added to the end of `StringCollection`.

In collections of contiguous elements, such as lists, the elements that follow the insertion point move down to accommodate the new element. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an O(`n`) operation, where `n` is `StringCollection.Count`.

#### Examples
The following code example adds new elements to the `StringCollection`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringCollection/Add/stringcollectionadd.cs._

## StringCollection.Remove(String) method

```csharp
public void Remove (string? value);
```

Removes the first occurrence of a specific string from the `StringCollection`.

Parameters:

- `value`: The string to remove from the `StringCollection`. The value can be `null`.

#### Remarks
Duplicate strings are allowed in `StringCollection`. Only the first occurrence is removed. To remove all occurrences of the specified string, use `RemoveAt(IndexOf(value))` repeatedly while `StringCollection.IndexOf` does not return -1.

If the `StringCollection` does not contain the specified object, the `StringCollection` remains unchanged. No exception is thrown.

In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method determines equality by calling `Object.Equals`. String comparisons are case-sensitive.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `StringCollection.Count`.

#### Examples
The following code example removes elements from the `StringCollection`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringCollection/Clear/stringcollectionremove.cs._

## StringCollection.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the string at the specified index of the `StringCollection`.

Parameters:

- `index`: The zero-based index of the string to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `StringCollection.Count`.

#### Remarks
In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an O(`n`) operation, where `n` is `StringCollection.Count`.

#### Examples
The following code example removes elements from the `StringCollection`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/StringCollection/Clear/stringcollectionremove.cs._

## StringCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array? array, int index);
```

Copies the entire `StringCollection` to a compatible one-dimensional `Array`, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `StringCollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `StringCollection` is greater than the available space from `index` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `StringCollection` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The specified array must be of a compatible type.

This method uses `Array.Copy` to copy the elements.

This method is an O(`n`) operation, where `n` is `StringCollection.Count`.

## StringCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator? IEnumerable.GetEnumerator ();
```

Returns a `IEnumerator` that iterates through the `StringCollection`.

Returns: A `IEnumerator` for the `StringCollection`.

#### Remarks

The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position. At this position, calling `IEnumerator.Current` throws an exception. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, calling `IEnumerator.Current` throws an exception. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`. If the collection is modified between `IEnumerator.MoveNext` and `IEnumerator.Current`, `IEnumerator.Current` returns the element that it is set to, even if the enumerator is already invalidated.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

This method is an O(1) operation.

## StringCollection.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object? value);
```

Adds an object to the end of the `StringCollection`.

Parameters:

- `value`: The `Object` to be added to the end of the `StringCollection`. The value can be `null`.

Returns: The `StringCollection` index at which the `value` has been added.

Exceptions:

- `NotSupportedException`: The `StringCollection` is read-only.

-or-

The `StringCollection` has a fixed size.

#### Remarks
`StringCollection` accepts `null` as a valid value and allows duplicate elements.

If `StringCollection.Count` already equals the capacity, the capacity of the `StringCollection` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

If `StringCollection.Count` is less than the capacity, this method is an O(1) operation. If the capacity needs to be increased to accommodate the new element, this method becomes an O(`n`) operation, where `n` is `StringCollection.Count`.

## StringCollection.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object? value);
```

Determines whether an element is in the `StringCollection`.

Parameters:

- `value`: The `Object` to locate in the `StringCollection`. The value can be `null`.

Returns: `true` if `value` is found in the `StringCollection`; otherwise, `false`.

#### Remarks
This method determines equality by calling `Object.Equals`.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `StringCollection.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether `item` exists.

## StringCollection.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object? value);
```

Searches for the specified `Object` and returns the zero-based index of the first occurrence within the entire `StringCollection`.

Parameters:

- `value`: The `Object` to locate in the `StringCollection`. The value can be `null`.

Returns: The zero-based index of the first occurrence of `value` within the entire `StringCollection`, if found; otherwise, -1.

#### Remarks
The `StringCollection` is searched forward starting at the first element and ending at the last element.

This method determines equality by calling `Object.Equals`.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `StringCollection.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether `item` exists.
