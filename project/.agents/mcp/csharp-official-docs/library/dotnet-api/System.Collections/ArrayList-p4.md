---
title: "ArrayList class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/ArrayList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArrayList class (part 4 of 5)

## ArrayList.IndexOf(Object, Int32, Int32) method

```csharp
public virtual int IndexOf (object? value, int startIndex, int count);
```

Searches for the specified `Object` and returns the zero-based index of the first occurrence within the range of elements in the `ArrayList` that starts at the specified index and contains the specified number of elements.

Parameters:

- `value`: The `Object` to locate in the `ArrayList`. The value can be `null`.
- `startIndex`: The zero-based starting index of the search. 0 (zero) is valid in an empty list.
- `count`: The number of elements in the section to search.

Returns: The zero-based index of the first occurrence of `value` within the range of elements in the `ArrayList` that starts at `startIndex` and contains `count` number of elements, if found; otherwise, -1.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for the `ArrayList`.

-or-

`count` is less than zero.

-or-

`startIndex` and `count` do not specify a valid section in the `ArrayList`.

#### Remarks
The `ArrayList` is searched forward starting at `startIndex` and ending at `startIndex` plus `count` minus 1, if `count` is greater than 0.

This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is `count`.

This method determines equality by calling `Object.Equals`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following code example shows how to determine the index of the first occurrence of a specified element.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/IndexOf/source.cs._

## ArrayList.Insert(Int32, Object) method

```csharp
public virtual void Insert (int index, object? value);
```

Inserts an element into the `ArrayList` at the specified index.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The `Object` to insert. The value can be `null`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than `ArrayList.Count`.
- `NotSupportedException`: The `ArrayList` is read-only.

-or-

The `ArrayList` has a fixed size.

#### Remarks
`ArrayList` accepts `null` as a valid value and allows duplicate elements.

If `ArrayList.Count` already equals `ArrayList.Capacity`, the capacity of the `ArrayList` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

If `index` is equal to `ArrayList.Count`, `value` is added to the end of `ArrayList`.

In collections of contiguous elements, such as lists, the elements that follow the insertion point move down to accommodate the new element. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an `O(n)` operation, where `n` is `ArrayList.Count`.

#### Examples
The following code example shows how to insert elements into the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Insert/source.cs._

## ArrayList.InsertRange(Int32, ICollection) method

```csharp
public virtual void InsertRange (int index, System.Collections.ICollection c);
```

Inserts the elements of a collection into the `ArrayList` at the specified index.

Parameters:

- `index`: The zero-based index at which the new elements should be inserted.
- `c`: The `ICollection` whose elements should be inserted into the `ArrayList`. The collection itself cannot be `null`, but it can contain elements that are `null`.

Exceptions:

- `ArgumentNullException`: `c` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than `ArrayList.Count`.
- `NotSupportedException`: The `ArrayList` is read-only.

-or-

The `ArrayList` has a fixed size.

#### Remarks
`ArrayList` accepts `null` as a valid value and allows duplicate elements.

If the new `ArrayList.Count` (the current `ArrayList.Count` plus the size of the collection) will be greater than `ArrayList.Capacity`, the capacity of the `ArrayList` is increased by automatically reallocating the internal array to accommodate the new elements, and the existing elements are copied to the new array before the new elements are added.

If `index` is equal to `ArrayList.Count`, the elements are added to the end of `ArrayList`.

The order of the elements in the `ICollection` is preserved in the `ArrayList`.

In collections of contiguous elements, such as lists, the elements that follow the insertion point move down to accommodate the new element. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an `O(n + m)` operation, where `n` is the number of elements to be added and `m` is `ArrayList.Count`.

#### Examples
The following code example shows how to insert elements into the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Insert/source.cs._

## ArrayList.LastIndexOf(Object) method

```csharp
public virtual int LastIndexOf (object? value);
```

Searches for the specified `Object` and returns the zero-based index of the last occurrence within the entire `ArrayList`.

Parameters:

- `value`: The `Object` to locate in the `ArrayList`. The value can be `null`.

Returns: The zero-based index of the last occurrence of `value` within the entire the `ArrayList`, if found; otherwise, -1.

#### Remarks
The `ArrayList` is searched backward starting at the last element and ending at the first element.

This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is `ArrayList.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following code example shows how to determine the index of the last occurrence of a specified element.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/LastIndexOf/source.cs._

## ArrayList.LastIndexOf(Object, Int32) method

```csharp
public virtual int LastIndexOf (object? value, int startIndex);
```

Searches for the specified `Object` and returns the zero-based index of the last occurrence within the range of elements in the `ArrayList` that extends from the first element to the specified index.

Parameters:

- `value`: The `Object` to locate in the `ArrayList`. The value can be `null`.
- `startIndex`: The zero-based starting index of the backward search.

Returns: The zero-based index of the last occurrence of `value` within the range of elements in the `ArrayList` that extends from the first element to `startIndex`, if found; otherwise, -1.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for the `ArrayList`.

#### Remarks
The `ArrayList` is searched backward starting at `startIndex` and ending at the first element.

This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is the number of elements from the beginning of the `ArrayList` to `startIndex`.

This method determines equality by calling `Object.Equals`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following code example shows how to determine the index of the last occurrence of a specified element.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/LastIndexOf/source.cs._

## ArrayList.LastIndexOf(Object, Int32, Int32) method

```csharp
public virtual int LastIndexOf (object? value, int startIndex, int count);
```

Searches for the specified `Object` and returns the zero-based index of the last occurrence within the range of elements in the `ArrayList` that contains the specified number of elements and ends at the specified index.

Parameters:

- `value`: The `Object` to locate in the `ArrayList`. The value can be `null`.
- `startIndex`: The zero-based starting index of the backward search.
- `count`: The number of elements in the section to search.

Returns: The zero-based index of the last occurrence of `value` within the range of elements in the `ArrayList` that contains `count` number of elements and ends at `startIndex`, if found; otherwise, -1.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for the `ArrayList`.

-or-

`count` is less than zero.

-or-

`startIndex` and `count` do not specify a valid section in the `ArrayList`.

#### Remarks
The `ArrayList` is searched backward starting at `startIndex` and ending at `startIndex` minus `count` plus 1, if `count` is greater than 0.

This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is `count`.

This method determines equality by calling `Object.Equals`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following code example shows how to determine the index of the last occurrence of a specified element. Note that `LastIndexOf` is a backward search; therefore, `count` must be less than or equal to `startIndex` + 1.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/LastIndexOf/source.cs._

## ArrayList.ReadOnly(ArrayList) method

```csharp
public static System.Collections.ArrayList ReadOnly (System.Collections.ArrayList list);
```

Returns a read-only `ArrayList` wrapper.

Parameters:

- `list`: The `ArrayList` to wrap.

Returns: A read-only `ArrayList` wrapper around `list`.

Exceptions:

- `ArgumentNullException`: `list` is `null`.

#### Remarks
To prevent any modifications to `list`, expose `list` only through this wrapper.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection. If changes are made to the underlying collection, the read-only collection reflects those changes.

This method is an `O(1)` operation.

#### Examples
The following code example shows how to create a read-only wrapper around an `ArrayList` and how to determine if an `ArrayList` is read-only.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/ReadOnly/source.cs._

## ArrayList.ReadOnly(IList) method

```csharp
public static System.Collections.IList ReadOnly (System.Collections.IList list);
```

Returns a read-only `IList` wrapper.

Parameters:

- `list`: The `IList` to wrap.

Returns: A read-only `IList` wrapper around `list`.

Exceptions:

- `ArgumentNullException`: `list` is `null`.

#### Remarks
To prevent any modifications to `list`, expose `list` only through this wrapper.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection. If changes are made to the underlying collection, the read-only collection reflects those changes.

This method is an `O(1)` operation.

## ArrayList.Remove(Object) method

```csharp
public virtual void Remove (object? obj);
```

Removes the first occurrence of a specific object from the `ArrayList`.

Parameters:

- `obj`: The `Object` to remove from the `ArrayList`. The value can be `null`.

Exceptions:

- `NotSupportedException`: The `ArrayList` is read-only.

-or-

The `ArrayList` has a fixed size.

#### Remarks
If the `ArrayList` does not contain the specified object, the `ArrayList` remains unchanged. No exception is thrown.

This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is `ArrayList.Count`.

This method determines equality by calling `Object.Equals`.

In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

#### Examples
The following code example shows how to remove elements from the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Remove/source.cs._

## ArrayList.RemoveAt(Int32) method

```csharp
public virtual void RemoveAt (int index);
```

Removes the element at the specified index of the `ArrayList`.

Parameters:

- `index`: The zero-based index of the element to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `ArrayList.Count`.
- `NotSupportedException`: The `ArrayList` is read-only.

-or-

The `ArrayList` has a fixed size.

#### Remarks
After the element is removed, the size of the collection is adjusted and the value of the `Count` property is decreased by one.

In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an `O(n)` operation, where `n` is `ArrayList.Count`.

#### Examples
The following code example shows how to remove elements from the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Remove/source.cs._

## ArrayList.RemoveRange(Int32, Int32) method

```csharp
public virtual void RemoveRange (int index, int count);
```

Removes a range of elements from the `ArrayList`.

Parameters:

- `index`: The zero-based starting index of the range of elements to remove.
- `count`: The number of elements to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`count` is less than zero.
- `ArgumentException`: `index` and `count` do not denote a valid range of elements in the `ArrayList`.
- `NotSupportedException`: The `ArrayList` is read-only.

-or-

The `ArrayList` has a fixed size.

#### Remarks
In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an `O(n)` operation, where `n` is `ArrayList.Count`.

#### Examples
The following code example shows how to remove elements from the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Remove/source.cs._
