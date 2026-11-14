---
title: "ArrayList class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/ArrayList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArrayList class (part 2 of 5)

## ArrayList.Add(Object) method

```csharp
public virtual int Add (object? value);
```

Adds an object to the end of the `ArrayList`.

Parameters:

- `value`: The `Object` to be added to the end of the `ArrayList`. The value can be `null`.

Returns: The `ArrayList` index at which the `value` has been added.

Exceptions:

- `NotSupportedException`: The `ArrayList` is read-only.

-or-

The `ArrayList` has a fixed size.

#### Remarks
`ArrayList` accepts `null` as a valid value and allows duplicate elements.

If `ArrayList.Count` already equals `ArrayList.Capacity`, the capacity of the `ArrayList` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

If `ArrayList.Count` is less than `ArrayList.Capacity`, this method is an `O(1)` operation. If the capacity needs to be increased to accommodate the new element, this method becomes an `O(n)` operation, where `n` is `ArrayList.Count`.

#### Examples
The following code example shows how to add elements to the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Add/source.cs._

## ArrayList.AddRange(ICollection) method

```csharp
public virtual void AddRange (System.Collections.ICollection c);
```

Adds the elements of an `ICollection` to the end of the `ArrayList`.

Parameters:

- `c`: The `ICollection` whose elements should be added to the end of the `ArrayList`. The collection itself cannot be `null`, but it can contain elements that are `null`.

Exceptions:

- `ArgumentNullException`: `c` is `null`.
- `NotSupportedException`: The `ArrayList` is read-only.

-or-

The `ArrayList` has a fixed size.

#### Remarks
`ArrayList` accepts `null` as a valid value and allows duplicate elements.

The order of the elements in the `ICollection` is preserved in the `ArrayList`.

If the new `ArrayList.Count` (the current `ArrayList.Count` plus the size of the collection) will be greater than `ArrayList.Capacity`, the capacity of the `ArrayList` is increased by automatically reallocating the internal array to accommodate the new elements, and the existing elements are copied to the new array before the new elements are added.

If the `ArrayList` can accommodate the new elements without increasing the `ArrayList.Capacity`, this method is an `O(n)` operation, where `n` is the number of elements to be added. If the capacity needs to be increased to accommodate the new elements, this method becomes an `O(n + m)` operation, where `n` is the number of elements to be added and `m` is `ArrayList.Count`.

#### Examples
The following code example shows how to add elements to the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Add/source.cs._

## ArrayList.BinarySearch(Object) method

```csharp
public virtual int BinarySearch (object? value);
```

Searches the entire sorted `ArrayList` for an element using the default comparer and returns the zero-based index of the element.

Parameters:

- `value`: The `Object` to locate. The value can be `null`.

Returns: The zero-based index of `value` in the sorted `ArrayList`, if `value` is found; otherwise, a negative number, which is the bitwise complement of the index of the next element that is larger than `value` or, if there is no larger element, the bitwise complement of `ArrayList.Count`.

Exceptions:

- `ArgumentException`: Neither `value` nor the elements of `ArrayList` implement the `IComparable` interface.
- `InvalidOperationException`: `value` is not of the same type as the elements of the `ArrayList`.

#### Remarks
The `value` parameter and each element of the `ArrayList` must implement the `IComparable` interface, which is used for comparisons. The elements of the `ArrayList` must already be sorted in increasing value according to the sort order defined by the `IComparable` implementation; otherwise, the result might be incorrect.

Comparing `null` with any type is allowed and does not generate an exception when using `IComparable`. When sorting, `null` is considered to be less than any other object.

If the `ArrayList` contains more than one element with the same value, the method returns only one of the occurrences, and it might return any one of the occurrences, not necessarily the first one.

If the `ArrayList` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operation (~) to this negative integer to get the index of the first element that is larger than the search value. When inserting the value into the `ArrayList`, this index should be used as the insertion point to maintain the sort order.

This method is an `O(log n)` operation, where `n` is `ArrayList.Count`.

#### Examples
The following code example shows how to use `ArrayList.BinarySearch` to locate a specific object in the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/BinarySearch/source.cs._

## ArrayList.BinarySearch(Object, IComparer) method

```csharp
public virtual int BinarySearch (object? value, System.Collections.IComparer? comparer);
```

Searches the entire sorted `ArrayList` for an element using the specified comparer and returns the zero-based index of the element.

Parameters:

- `value`: The `Object` to locate. The value can be `null`.
- `comparer`: The `IComparer` implementation to use when comparing elements.

-or-

`null` to use the default comparer that is the `IComparable` implementation of each element.

Returns: The zero-based index of `value` in the sorted `ArrayList`, if `value` is found; otherwise, a negative number, which is the bitwise complement of the index of the next element that is larger than `value` or, if there is no larger element, the bitwise complement of `ArrayList.Count`.

Exceptions:

- `ArgumentException`: `comparer` is `null` and neither `value` nor the elements of `ArrayList` implement the `IComparable` interface.
- `InvalidOperationException`: `comparer` is `null` and `value` is not of the same type as the elements of the `ArrayList`.

#### Remarks
The comparer customizes how the elements are compared. For example, you can use a `CaseInsensitiveComparer` instance as the comparer to perform case-insensitive string searches.

If `comparer` is provided, the elements of the `ArrayList` are compared to the specified value using the specified `IComparer` implementation. The elements of the `ArrayList` must already be sorted in increasing value according to the sort order defined by `comparer`; otherwise, the result might be incorrect.

If `comparer` is `null`, the comparison is done using the `IComparable` implementation provided by the element itself or by the specified value. The elements of the `ArrayList` must already be sorted in increasing value according to the sort order defined by the `IComparable` implementation; otherwise, the result might be incorrect.

Comparing `null` with any type is allowed and does not generate an exception when using `IComparable`. When sorting, `null` is considered to be less than any other object.

If the `ArrayList` contains more than one element with the same value, the method returns only one of the occurrences, and it might return any one of the occurrences, not necessarily the first one.

If the `ArrayList` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operation (~) to this negative integer to get the index of the first element that is larger than the search value. When inserting the value into the `ArrayList`, this index should be used as the insertion point to maintain the sort order.

This method is an `O(log n)` operation, where `n` is `ArrayList.Count`.

#### Examples
The following example creates an `ArrayList` of colored animals. The provided `IComparer` performs the string comparison for the binary search. The results of both an iterative search and a binary search are displayed.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/BinarySearch/source2.cs._

## ArrayList.BinarySearch(Int32, Int32, Object, IComparer) method

```csharp
public virtual int BinarySearch (int index, int count, object? value, System.Collections.IComparer? comparer);
```

Searches a range of elements in the sorted `ArrayList` for an element using the specified comparer and returns the zero-based index of the element.

Parameters:

- `index`: The zero-based starting index of the range to search.
- `count`: The length of the range to search.
- `value`: The `Object` to locate. The value can be `null`.
- `comparer`: The `IComparer` implementation to use when comparing elements.

-or-

`null` to use the default comparer that is the `IComparable` implementation of each element.

Returns: The zero-based index of `value` in the sorted `ArrayList`, if `value` is found; otherwise, a negative number, which is the bitwise complement of the index of the next element that is larger than `value` or, if there is no larger element, the bitwise complement of `ArrayList.Count`.

Exceptions:

- `ArgumentException`: `index` and `count` do not denote a valid range in the `ArrayList`.

-or-

`comparer` is `null` and neither `value` nor the elements of `ArrayList` implement the `IComparable` interface.
- `InvalidOperationException`: `comparer` is `null` and `value` is not of the same type as the elements of the `ArrayList`.
- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`count` is less than zero.

#### Remarks
The comparer customizes how the elements are compared. For example, you can use a `CaseInsensitiveComparer` instance as the comparer to perform case-insensitive string searches.

If `comparer` is provided, the elements of the `ArrayList` are compared to the specified value using the specified `IComparer` implementation. The elements of the `ArrayList` must already be sorted in increasing value according to the sort order defined by `comparer`; otherwise, the result might be incorrect.

If `comparer` is `null`, the comparison is done using the `IComparable` implementation provided by the element itself or by the specified value. The elements of the `ArrayList` must already be sorted in increasing value according to the sort order defined by the `IComparable` implementation; otherwise, the result might be incorrect.

Comparing `null` with any type is allowed and does not generate an exception when using `IComparable`. When sorting, `null` is considered to be less than any other object.

If the `ArrayList` contains more than one element with the same value, the method returns only one of the occurrences, and it might return any one of the occurrences, not necessarily the first one.

If the `ArrayList` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operation (~) to this negative integer to get the index of the first element that is larger than the search value. When inserting the value into the `ArrayList`, this index should be used as the insertion point to maintain the sort order.

This method is an `O(log n)` operation, where `n` is `count`.

## ArrayList.Clear() method

```csharp
public virtual void Clear ();
```

Removes all elements from the `ArrayList`.

Exceptions:

- `NotSupportedException`: The `ArrayList` is read-only.

-or-

The `ArrayList` has a fixed size.

#### Remarks
`ArrayList.Count` is set to zero, and references to other objects from elements of the collection are also released.

`ArrayList.Capacity` remains unchanged. To reset the capacity of the `ArrayList`, call `ArrayList.TrimToSize` or set the `Capacity` property directly. Trimming an empty `ArrayList` sets the capacity of the `ArrayList` to the default capacity.

This method is an `O(n)` operation, where `n` is `ArrayList.Count`.

#### Examples
The following code example shows how to trim the unused portions of the `ArrayList` and how to clear the values of the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Clear/source.cs._

## ArrayList.Clone() method

```csharp
public virtual object Clone ();
```

Creates a shallow copy of the `ArrayList`.

Returns: A shallow copy of the `ArrayList`.

#### Remarks
A shallow copy of a collection copies only the elements of the collection, whether they are reference types or value types, but it does not copy the objects that the references refer to. The references in the new collection point to the same objects that the references in the original collection point to.

In contrast, a deep copy of a collection copies the elements and everything directly or indirectly referenced by the elements.

This method is an `O(n)` operation, where `n` is `ArrayList.Count`.

## ArrayList.Contains(Object) method

```csharp
public virtual bool Contains (object? item);
```

Determines whether an element is in the `ArrayList`.

Parameters:

- `item`: The `Object` to locate in the `ArrayList`. The value can be `null`.

Returns: `true` if `item` is found in the `ArrayList`; otherwise, `false`.

#### Remarks
This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is `ArrayList.Count`.

This method determines equality by calling `Object.Equals`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

## ArrayList.CopyTo(Array) method

```csharp
public virtual void CopyTo (Array array);
```

Copies the entire `ArrayList` to a compatible one-dimensional `Array`, starting at the beginning of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ArrayList`. The `Array` must have zero-based indexing.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `ArrayList` is greater than the number of elements that the destination `array` can contain.
- `InvalidCastException`: The type of the source `ArrayList` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The specified array must be of a compatible type.

This method uses `Array.Copy` to copy the elements.

The elements are copied to the `Array` in the same order in which the enumerator iterates through the `ArrayList`.

This method is an `O(n)` operation, where `n` is `ArrayList.Count`.

#### Examples
The following code example shows how to copy an `ArrayList` into a one-dimensional `Array`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/CopyTo/source.cs._
