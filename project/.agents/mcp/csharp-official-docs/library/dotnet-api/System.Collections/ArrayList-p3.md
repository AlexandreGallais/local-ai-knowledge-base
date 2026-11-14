---
title: "ArrayList class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/ArrayList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArrayList class (part 3 of 5)

## ArrayList.CopyTo(Array, Int32) method

```csharp
public virtual void CopyTo (Array array, int arrayIndex);
```

Copies the entire `ArrayList` to a compatible one-dimensional `Array`, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ArrayList`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `ArrayList` is greater than the available space from `arrayIndex` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `ArrayList` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The specified array must be of a compatible type.

This method uses `Array.Copy` to copy the elements.

The elements are copied to the `Array` in the same order in which the enumerator iterates through the `ArrayList`.

This method is an `O(n)` operation, where `n` is `ArrayList.Count`.

#### Examples
The following code example shows how to copy an `ArrayList` into a one-dimensional `Array`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/CopyTo/source1.cs._

## ArrayList.CopyTo(Int32, Array, Int32, Int32) method

```csharp
public virtual void CopyTo (int index, Array array, int arrayIndex, int count);
```

Copies a range of elements from the `ArrayList` to a compatible one-dimensional `Array`, starting at the specified index of the target array.

Parameters:

- `index`: The zero-based index in the source `ArrayList` at which copying begins.
- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ArrayList`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.
- `count`: The number of elements to copy.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`arrayIndex` is less than zero.

-or-

`count` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

`index` is equal to or greater than the `ArrayList.Count` of the source `ArrayList`.

-or-

The number of elements from `index` to the end of the source `ArrayList` is greater than the available space from `arrayIndex` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `ArrayList` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The specified array must be of a compatible type.

This method uses `Array.Copy` to copy the elements.

The elements are copied to the `Array` in the same order in which the enumerator iterates through the `ArrayList`.

This method is an `O(n)` operation, where `n` is `count`.

#### Examples
The following code example shows how to copy an `ArrayList` into a one-dimensional `Array`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/CopyTo/source1.cs._

## ArrayList.FixedSize(ArrayList) method

```csharp
public static System.Collections.ArrayList FixedSize (System.Collections.ArrayList list);
```

Returns an `ArrayList` wrapper with a fixed size.

Parameters:

- `list`: The `ArrayList` to wrap.

Returns: An `ArrayList` wrapper with a fixed size.

Exceptions:

- `ArgumentNullException`: `list` is `null`.

#### Remarks
This wrapper can be used to prevent additions to and deletions from the original `ArrayList`. The elements can still be modified or replaced.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

This method is an `O(1)` operation.

#### Examples
The following code example shows how to create a fixed-size wrapper around an `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/IsFixedSize/source.cs._

## ArrayList.FixedSize(IList) method

```csharp
public static System.Collections.IList FixedSize (System.Collections.IList list);
```

Returns an `IList` wrapper with a fixed size.

Parameters:

- `list`: The `IList` to wrap.

Returns: An `IList` wrapper with a fixed size.

Exceptions:

- `ArgumentNullException`: `list` is `null`.

#### Remarks
This wrapper can be used to prevent additions to and deletions from the original `IList`. The elements can still be modified or replaced.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

This method is an `O(1)` operation.

## ArrayList.GetEnumerator() method

```csharp
public virtual System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator for the entire `ArrayList`.

Returns: An `IEnumerator` for the entire `ArrayList`.

#### Remarks
The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position. At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration. To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an `O(1)` operation.

#### Examples
The following example gets the enumerator for an `ArrayList`, and the enumerator for a range of elements in the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/GetEnumerator/program.cs._

## ArrayList.GetEnumerator(Int32, Int32) method

```csharp
public virtual System.Collections.IEnumerator GetEnumerator (int index, int count);
```

Returns an enumerator for a range of elements in the `ArrayList`.

Parameters:

- `index`: The zero-based starting index of the `ArrayList` section that the enumerator should refer to.
- `count`: The number of elements in the `ArrayList` section that the enumerator should refer to.

Returns: An `IEnumerator` for the specified range of elements in the `ArrayList`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`count` is less than zero.
- `ArgumentException`: `index` and `count` do not specify a valid range in the `ArrayList`.

#### Remarks
The `foreach` statement of the C# language hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position. At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration. To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an `O(1)` operation.

#### Examples
The following example gets the enumerator for an `ArrayList`, and the enumerator for a range of elements in the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/GetEnumerator/program.cs._

## ArrayList.GetRange(Int32, Int32) method

```csharp
public virtual System.Collections.ArrayList GetRange (int index, int count);
```

Returns an `ArrayList` that represents a subset of the elements in the source `ArrayList`.

Parameters:

- `index`: The zero-based `ArrayList` index at which the range starts.
- `count`: The number of elements in the range.

Returns: An `ArrayList` that represents a subset of the elements in the source `ArrayList`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`count` is less than zero.
- `ArgumentException`: `index` and `count` do not denote a valid range of elements in the `ArrayList`.

#### Remarks
This method does not create copies of the elements. The new `ArrayList` is only a view window into the source `ArrayList`. However, all subsequent changes to the source `ArrayList` must be done through this view window `ArrayList`. If changes are made directly to the source `ArrayList`, the view window `ArrayList` is invalidated and any operations on it will return an `InvalidOperationException`.

This method is an `O(1)` operation.

#### Examples
The following code example shows how to set and get a range of elements in the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/SetRange/source.cs._

## ArrayList.IndexOf(Object) method

```csharp
public virtual int IndexOf (object? value);
```

Searches for the specified `Object` and returns the zero-based index of the first occurrence within the entire `ArrayList`.

Parameters:

- `value`: The `Object` to locate in the `ArrayList`. The value can be `null`.

Returns: The zero-based index of the first occurrence of `value` within the entire `ArrayList`, if found; otherwise, -1.

#### Remarks
The `ArrayList` is searched forward starting at the first element and ending at the last element.

This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is `ArrayList.Count`.

This method determines equality by calling `Object.Equals`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following code example shows how to determine the index of the first occurrence of a specified element.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/IndexOf/source.cs._

## ArrayList.IndexOf(Object, Int32) method

```csharp
public virtual int IndexOf (object? value, int startIndex);
```

Searches for the specified `Object` and returns the zero-based index of the first occurrence within the range of elements in the `ArrayList` that extends from the specified index to the last element.

Parameters:

- `value`: The `Object` to locate in the `ArrayList`. The value can be `null`.
- `startIndex`: The zero-based starting index of the search. 0 (zero) is valid in an empty list.

Returns: The zero-based index of the first occurrence of `value` within the range of elements in the `ArrayList` that extends from `startIndex` to the last element, if found; otherwise, -1.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for the `ArrayList`.

#### Remarks
The `ArrayList` is searched forward starting at `startIndex` and ending at the last element.

This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is the number of elements from `startIndex` to the end of the `ArrayList`.

This method determines equality by calling `Object.Equals`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following code example shows how to determine the index of the first occurrence of a specified element.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/IndexOf/source.cs._
