---
title: "ArrayList class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/ArrayList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArrayList class (part 5 of 5)

## ArrayList.Repeat(Object, Int32) method

```csharp
public static System.Collections.ArrayList Repeat (object? value, int count);
```

Returns an `ArrayList` whose elements are copies of the specified value.

Parameters:

- `value`: The `Object` to copy multiple times in the new `ArrayList`. The value can be `null`.
- `count`: The number of times `value` should be copied.

Returns: An `ArrayList` with `count` number of elements, all of which are copies of `value`.

Exceptions:

- `ArgumentOutOfRangeException`: `count` is less than zero.

#### Remarks
`ArrayList` accepts `null` as a valid value and allows duplicate elements.

This method is an `O(n)` operation, where `n` is `count`.

#### Examples
The following code example shows how to create and initialize a new `ArrayList` with the same value.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Repeat/source.cs._

## ArrayList.Reverse() method

```csharp
public virtual void Reverse ();
```

Reverses the order of the elements in the entire `ArrayList`.

Exceptions:

- `NotSupportedException`: The `ArrayList` is read-only.

#### Remarks
This method uses `Array.Reverse` to reverse the order of the elements, such that the element at `ArrayList` [i], where i is any index within the range, moves to `ArrayList` [j], where j equals `index` + `index` + `count` - i - 1.

This method is an `O(n)` operation, where `n` is `ArrayList.Count`.

#### Examples
The following code example shows how to reverse the sort order of the values in an `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Reverse/source.cs._

## ArrayList.Reverse(Int32, Int32) method

```csharp
public virtual void Reverse (int index, int count);
```

Reverses the order of the elements in the specified range.

Parameters:

- `index`: The zero-based starting index of the range to reverse.
- `count`: The number of elements in the range to reverse.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`count` is less than zero.
- `ArgumentException`: `index` and `count` do not denote a valid range of elements in the `ArrayList`.
- `NotSupportedException`: The `ArrayList` is read-only.

#### Remarks
This method uses `Array.Reverse` to reverse the order of the elements, such that the element at `ArrayList` [i], where i is any index within the range, moves to `ArrayList` [j], where j equals `index` + `index` + `count` - i - 1.

This method is an `O(n)` operation, where `n` is `count`.

#### Examples
The following code example shows how to reverse the sort order of the values in a range of elements in an `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Reverse/source1.cs._

## ArrayList.SetRange(Int32, ICollection) method

```csharp
public virtual void SetRange (int index, System.Collections.ICollection c);
```

Copies the elements of a collection over a range of elements in the `ArrayList`.

Parameters:

- `index`: The zero-based `ArrayList` index at which to start copying the elements of `c`.
- `c`: The `ICollection` whose elements to copy to the `ArrayList`. The collection itself cannot be `null`, but it can contain elements that are `null`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` plus the number of elements in `c` is greater than `ArrayList.Count`.
- `ArgumentNullException`: `c` is `null`.
- `NotSupportedException`: The `ArrayList` is read-only.

#### Remarks
`ArrayList` accepts `null` as a valid value and allows duplicate elements.

The order of the elements in the `ICollection` is preserved in the `ArrayList`.

This method is an `O(n)` operation, where `n` is `ArrayList.Count`.

#### Examples
The following code example shows how to set and get a range of elements in the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/SetRange/source.cs._

## ArrayList.Sort() method

```csharp
public virtual void Sort ();
```

Sorts the elements in the entire `ArrayList`.

Exceptions:

- `NotSupportedException`: The `ArrayList` is read-only.

#### Remarks
This method uses `Array.Sort`, which uses the QuickSort algorithm. The QuickSort algorithm is a comparison sort (also called an unstable sort), which means that a "less than or equal to" comparison operation determines which of two elements should occur first in the final sorted list. However, if two elements are equal, their original order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal. To perform a stable sort, you must implement a custom `IComparer` interface to use with the other overloads of this method.

On average, this method is an `O(n log n)` operation, where `n` is `ArrayList.Count`; in the worst case it is an ``O(n^2)`` operation.

#### Examples
The following code example shows how to sort the values in an `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Sort/source.cs._

## ArrayList.Sort(IComparer) method

```csharp
public virtual void Sort (System.Collections.IComparer? comparer);
```

Sorts the elements in the entire `ArrayList` using the specified comparer.

Parameters:

- `comparer`: The `IComparer` implementation to use when comparing elements.

-or-

A null reference (`Nothing` in Visual Basic) to use the `IComparable` implementation of each element.

Exceptions:

- `NotSupportedException`: The `ArrayList` is read-only.
- `InvalidOperationException`: An error occurred while comparing two elements.
- `ArgumentException`: `null` is passed for `comparer`, and the elements in the list do not implement `IComparable`.

#### Remarks
Use the `ArrayList.Sort` method to  sort a list of objects with a custom comparer that implements the `IComparer` interface. If you pass `null` for `comparer`, this method uses the `IComparable` implementation of each element. In this case, you must make sure that the objects contained in the list implement the `IComparer` interface or an exception will occur.

In addition, using the `IComparable` implementation means the list performs a comparison sort (also called an unstable sort); that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal. To perform a stable sort, you must implement a custom `IComparer` interface.

On average, this method is an `O(n log n)` operation, where `n` is `ArrayList.Count`; in the worst case it is an ``O(n^2)`` operation.

#### Examples
The following code example shows how to sort the values in an `ArrayList` using the default comparer and a custom comparer that reverses the sort order.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Sort/arraylist_sort2.cs._

## ArrayList.Sort(Int32, Int32, IComparer) method

```csharp
public virtual void Sort (int index, int count, System.Collections.IComparer? comparer);
```

Sorts the elements in a range of elements in `ArrayList` using the specified comparer.

Parameters:

- `index`: The zero-based starting index of the range to sort.
- `count`: The length of the range to sort.
- `comparer`: The `IComparer` implementation to use when comparing elements.

-or-

A null reference (`Nothing` in Visual Basic) to use the `IComparable` implementation of each element.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`count` is less than zero.
- `ArgumentException`: `index` and `count` do not specify a valid range in the `ArrayList`.
- `NotSupportedException`: The `ArrayList` is read-only.
- `InvalidOperationException`: An error occurred while comparing two elements.

#### Remarks
If `comparer` is set to `null`, this method performs a comparison sort (also called an unstable sort); that is, if two elements are equal, their order might not be preserved. In contrast, a stable sort preserves the order of elements that are equal. To perform a stable sort, you must implement a custom `IComparer` interface.

On average, this method is an `O(n log n)` operation, where `n` is `count`; in the worst case it is an `O(n^2)` operation.

#### Examples
The following code example shows how to sort the values in a range of elements in an `ArrayList` using the default comparer and a custom comparer that reverses the sort order.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Sort/arraylist_sort3.cs._

## ArrayList.Synchronized(ArrayList) method

```csharp
public static System.Collections.ArrayList Synchronized (System.Collections.ArrayList list);
```

Returns an `ArrayList` wrapper that is synchronized (thread safe).

Parameters:

- `list`: The `ArrayList` to synchronize.

Returns: An `ArrayList` wrapper that is synchronized (thread safe).

Exceptions:

- `ArgumentNullException`: `list` is `null`.

#### Remarks
To guarantee the thread safety of the `ArrayList`, all operations must be done through this wrapper.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `ArrayList.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/IsSynchronized/source2.cs._

This method is an `O(1)` operation.

The following code example shows how to synchronize an `ArrayList`, determine if an `ArrayList` is synchronized and use a synchronized `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/IsSynchronized/source.cs._

## ArrayList.Synchronized(IList) method

```csharp
public static System.Collections.IList Synchronized (System.Collections.IList list);
```

Returns an `IList` wrapper that is synchronized (thread safe).

Parameters:

- `list`: The `IList` to synchronize.

Returns: An `IList` wrapper that is synchronized (thread safe).

Exceptions:

- `ArgumentNullException`: `list` is `null`.

#### Remarks
To guarantee the thread safety of the `ArrayList`, all operations must be done through this wrapper.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `ArrayList.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/IsSynchronized/source2.cs._

This method is an `O(1)` operation.

## ArrayList.ToArray() method

```csharp
public virtual object?[] ToArray ();
```

Copies the elements of the `ArrayList` to a new `Object` array.

Returns: An `Object` array containing copies of the elements of the `ArrayList`.

#### Remarks
The elements are copied using `Array.Copy`, which is an `O(n)` operation, where `n` is `ArrayList.Count`.

## ArrayList.ToArray(Type) method

```csharp
public virtual Array ToArray (Type type);
```

Copies the elements of the `ArrayList` to a new array of the specified element type.

Parameters:

- `type`: The element `Type` of the destination array to create and copy elements to.

Returns: An array of the specified element type containing copies of the elements of the `ArrayList`.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `InvalidCastException`: The type of the source `ArrayList` cannot be cast automatically to the specified type.

#### Remarks
All of the objects in the `ArrayList` object will be cast to the `Type` specified in the `type` parameter.

The elements are copied using `Array.Copy`, which is an `O(n)` operation, where `n` is `ArrayList.Count`.

#### Examples
The following copy example shows how to copy the elements of an `ArrayList` to a string array.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/ToArray/arraylist_toarray.cs._

## ArrayList.TrimToSize() method

```csharp
public virtual void TrimToSize ();
```

Sets the capacity to the actual number of elements in the `ArrayList`.

Exceptions:

- `NotSupportedException`: The `ArrayList` is read-only.

-or-

The `ArrayList` has a fixed size.

#### Remarks
This method can be used to minimize a collection's memory overhead if no new elements will be added to the collection.

To reset a `ArrayList` to its initial state, call the `ArrayList.Clear` method before calling `ArrayList.TrimToSize`. Trimming an empty `ArrayList` sets the capacity of the `ArrayList` to the default capacity.

This method is an `O(n)` operation, where `n` is `ArrayList.Count`.

#### Examples
The following code example shows how to trim the unused portions of the `ArrayList` and how to clear the values of the `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Collections/ArrayList/Clear/source.cs._
