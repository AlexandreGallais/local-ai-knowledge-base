---
title: "Array class (part 2 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 2 of 18)

## Array.BinarySearch(Array, Object) method

```csharp
public static int BinarySearch (Array array, object? value);
```

Searches an entire one-dimensional sorted array for a specific element, using the `IComparable` interface implemented by each element of the array and by the specified object.

Parameters:

- `array`: The sorted one-dimensional `Array` to search.
- `value`: The object to search for.

Returns: The index of the specified `value` in the specified `array`, if `value` is found; otherwise, a negative number. If `value` is not found and `value` is less than one or more elements in `array`, the negative number returned is the bitwise complement of the index of the first element that is larger than `value`. If `value` is not found and `value` is greater than all elements in `array`, the negative number returned is the bitwise complement of (the index of the last element plus 1). If this method is called with a non-sorted `array`, the return value can be incorrect and a negative number could be returned, even if `value` is present in `array`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `RankException`: `array` is multidimensional.
- `ArgumentException`: `value` is of a type that is not compatible with the elements of `array`.
- `InvalidOperationException`: `value` does not implement the `IComparable` interface, and the search encounters an element that does not implement the `IComparable` interface.

#### Remarks
This method does not support searching arrays that contain negative indexes. `array` must be sorted before calling this method.

If the `Array` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operator (~ in C#, `Not` in Visual Basic) to the negative result  to produce an index. If this index is one greater than the upper bound of the array, there are no elements larger than `value` in the array. Otherwise, it is the index of the first element that is larger than `value`.

Either `value` or every element of `array` must implement the `IComparable` interface, which is used for comparisons. The elements of `array` must already be sorted in increasing value according to the sort order defined by the `IComparable` implementation; otherwise, the result might be incorrect.

> **Note:**
> If`value` does not implement the `IComparable` interface, the elements of `array` are not tested for `IComparable` before the search begins. An exception is thrown if the search encounters an element that does not implement `IComparable`.

Duplicate elements are allowed. If the `Array` contains more than one element equal to `value`, the method returns the index of only one of the occurrences, and not necessarily the first one.

`null` can always be compared with any other reference type; therefore, comparisons with `null` do not generate an exception.

> **Note:**
> For every element tested, `value` is passed to the appropriate `IComparable` implementation, even if `value` is `null`. That is, the `IComparable` implementation determines how a given element compares to `null`.

This method is an O(log `n`) operation, where `n` is the `Array.Length` of `array`.

#### Examples
The following code example shows how to use `Array.BinarySearch` to locate a specific object in an `Array`.

> **Note:**
> The array is created with its elements in ascending sort order. The `Array.BinarySearch` method requires the array to be sorted in ascending order.

_Code sample not included: ~/snippets/csharp/System/Array/BinarySearch/source.cs._

## Array.BinarySearch(Array, Object, IComparer) method

```csharp
public static int BinarySearch (Array array, object? value, System.Collections.IComparer? comparer);
```

Searches an entire one-dimensional sorted array for a value using the specified `IComparer` interface.

Parameters:

- `array`: The sorted one-dimensional `Array` to search.
- `value`: The object to search for.
- `comparer`: The `IComparer` implementation to use when comparing elements.

-or-

`null` to use the `IComparable` implementation of each element.

Returns: The index of the specified `value` in the specified `array`, if `value` is found; otherwise, a negative number. If `value` is not found and `value` is less than one or more elements in `array`, the negative number returned is the bitwise complement of the index of the first element that is larger than `value`. If `value` is not found and `value` is greater than all elements in `array`, the negative number returned is the bitwise complement of (the index of the last element plus 1). If this method is called with a non-sorted `array`, the return value can be incorrect and a negative number could be returned, even if `value` is present in `array`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `RankException`: `array` is multidimensional.
- `ArgumentException`: `comparer` is `null`, and `value` is of a type that is not compatible with the elements of `array`.
- `InvalidOperationException`: `comparer` is `null`, `value` does not implement the `IComparable` interface, and the search encounters an element that does not implement the `IComparable` interface.

#### Remarks
This method does not support searching arrays that contain negative indexes. `array` must be sorted before calling this method.

If the `Array` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operator (~ in C#, `Not` in Visual Basic) to the negative result  to produce an index. If this index is one greater than the upper bound of the array, there are no elements larger than `value` in the array. Otherwise, it is the index of the first element that is larger than `value`.

The comparer customizes how the elements are compared. For example, you can use a `CaseInsensitiveComparer` as the comparer to perform case-insensitive string searches.

If `comparer` is not `null`, the elements of `array` are compared to the specified value using the specified `IComparer` implementation. The elements of `array` must already be sorted in increasing value according to the sort order defined by `comparer`; otherwise, the result might be incorrect.

If`comparer` is `null`, the comparison is done using the `IComparable` implementation provided by the element itself or by the specified value. The elements of `array` must already be sorted in increasing value according to the sort order defined by the `IComparable` implementation; otherwise, the result might be incorrect.

> **Note:**
> If `comparer` is `null` and `value` does not implement the `IComparable` interface, the elements of `array` are not tested for `IComparable` before the search begins. An exception is thrown if the search encounters an element that does not implement `IComparable`.

Duplicate elements are allowed. If the `Array` contains more than one element equal to `value`, the method returns the index of only one of the occurrences, and not necessarily the first one.

`null` can always be compared with any other reference type; therefore, comparisons with `null` do not generate an exception.

> **Note:**
> For every element tested, `value` is passed to the appropriate `IComparable` implementation, even if `value` is `null`. That is, the `IComparable` implementation determines how a given element compares to `null`.

This method is an O(log `n`) operation, where `n` is the `Array.Length` of `array`.

## Array.BinarySearch(Array, Int32, Int32, Object) method

```csharp
public static int BinarySearch (Array array, int index, int length, object? value);
```

Searches a range of elements in a one-dimensional sorted array for a value, using the `IComparable` interface implemented by each element of the array and by the specified value.

Parameters:

- `array`: The sorted one-dimensional `Array` to search.
- `index`: The starting index of the range to search.
- `length`: The length of the range to search.
- `value`: The object to search for.

Returns: The index of the specified `value` in the specified `array`, if `value` is found; otherwise, a negative number. If `value` is not found and `value` is less than one or more elements in `array`, the negative number returned is the bitwise complement of the index of the first element that is larger than `value`. If `value` is not found and `value` is greater than all elements in `array`, the negative number returned is the bitwise complement of (the index of the last element plus 1). If this method is called with a non-sorted `array`, the return value can be incorrect and a negative number could be returned, even if `value` is present in `array`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `RankException`: `array` is multidimensional.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `array`.

-or-

`length` is less than zero.
- `ArgumentException`: `index` and `length` do not specify a valid range in `array`.

-or-

`value` is of a type that is not compatible with the elements of `array`.
- `InvalidOperationException`: `value` does not implement the `IComparable` interface, and the search encounters an element that does not implement the `IComparable` interface.

#### Remarks
This method does not support searching arrays that contain negative indexes. `array` must be sorted before calling this method.

If the `Array` does not contain the specified value, the method returns a negative integer. You can apply the bitwise complement operator (~ in C#, `Not` in Visual Basic) to the negative result to produce an index. If this index is one greater than the upper bound of the array, there are no elements larger than `value` in the array. Otherwise, it is the index of the first element that is larger than `value`.

Either `value` or every element of `array` must implement the `IComparable` interface, which is used for comparisons. The elements of `array` must already be sorted in increasing value according to the sort order defined by the `IComparable` implementation; otherwise, the result might be incorrect.

> **Note:**
> If `value` does not implement the `IComparable` interface, the elements of `array` are not tested for `IComparable` before the search begins. An exception is thrown if the search encounters an element that does not implement `IComparable`.

Duplicate elements are allowed. If the `Array` contains more than one element equal to `value`, the method returns the index of only one of the occurrences, and not necessarily the first one.

`null` can always be compared with any other reference type; therefore, comparisons with `null` do not generate an exception.

> **Note:**
> For every element tested, `value` is passed to the appropriate `IComparable` implementation, even if `value` is `null`. That is, the `IComparable` implementation determines how a given element compares to `null`.

This method is an O(log `n`) operation, where `n` is `length`.
